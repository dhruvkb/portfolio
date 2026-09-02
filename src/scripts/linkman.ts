/*
 * Link local checkouts of dependencies into `node_modules`, so that changes to
 * them show up here without cutting a release.
 *
 * pnpm's `overrides` cannot do this. A `link:` override is recorded in
 * `pnpm-lock.yaml`, which then points CI at paths that only exist on my
 * machine, and no combination of `.pnpmfile.cjs` or `--frozen-lockfile` avoids
 * that. This runs after resolution instead, so the lockfile keeps the real,
 * published versions and only `node_modules` differs locally.
 *
 * `links.json` maps package names to paths, relative to the repo root, and is
 * checked in. `links.local.json` is gitignored and shallow-merges over it, so a
 * path can be pointed elsewhere or, by setting it to `null`, left unlinked;
 * `just unlink` writes the latter. Paths that do not exist are skipped, so a
 * machine without the other checkouts needs no configuration at all.
 *
 * Run by `just link` and `just unlink`, and automatically after `pnpm i`.
 */

import {
	existsSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	readlinkSync,
	rmSync,
	symlinkSync,
	writeFileSync,
} from "node:fs";
import { homedir } from "node:os";
import { dirname, isAbsolute, join, resolve, sep } from "node:path";

import { Command } from "commander";

const root = resolve(import.meta.dirname, "../..");
const nodeModules = join(root, "node_modules");
const virtualStore = join(nodeModules, ".pnpm");

/*
 * Linking overwrites the symlink pnpm made, and its target cannot be worked out
 * again afterwards: the virtual store keys packages by their resolved peers, so
 * a store holding several peer variants of one version gives no way to tell
 * which this project resolved to. The target is copied here before being
 * overwritten, and read back on unlink. It lives inside `node_modules` on
 * purpose; losing it means `pnpm i` has already restored the real symlinks.
 */
const storeFile = join(nodeModules, ".linkman.json");

/**
 * Convert the file name into a file path. This function will resolve
 * relative paths to the project root and leave absolute paths unmodified.
 *
 * @param file the name of the file received at the command line
 * @returns the resolved file path
 */
function resolveFilePath(file: string): string {
	return isAbsolute(file) ? file : resolve(root, file);
}

/**
 * Read and parse the JSON file at the given path.
 *
 * A missing file is not an error, but a malformed one is worth reporting
 * because it silently drops every link it was supposed to configure.
 *
 * @param file the path to the file to read
 * @returns the parsed content, or `null` if it could not be read
 */
function readJsonFile(file: string): unknown {
	const filePath = resolveFilePath(file);
	if (!existsSync(filePath)) return null;
	try {
		return JSON.parse(readFileSync(filePath, "utf-8"));
	} catch (error) {
		const reason = error instanceof Error ? error.message : String(error);
		console.warn(`Ignoring ${filePath}, it is not valid JSON: ${reason}`);
		return null;
	}
}

/**
 * Read the links file into a record of package names and paths.
 *
 * @param file the path to the links file
 * @returns a record of package names and paths
 */
function readLinks(file: string): Record<string, string | null> {
	const mapping = readJsonFile(file);
	if (typeof mapping !== "object" || mapping === null) return {};

	const links: Record<string, string | null> = {};
	for (const [name, path] of Object.entries(mapping)) {
		if (path === null) {
			links[name] = null;
		} else if (typeof path === "string") {
			const isHome = path === "~" || path.startsWith(`~${sep}`);
			links[name] = isHome ? join(homedir(), path.slice(1)) : path;
		} else {
			console.warn(`Ignoring ${name} in ${file}, its path is neither a string nor \`null\`.`);
		}
	}
	return links;
}

/**
 * Read the record of pre-link symlink targets.
 *
 * @returns a record of package names and unresolved symlink targets
 */
function readStore(): Record<string, string> {
	const store = readJsonFile(storeFile);
	if (typeof store !== "object" || store === null) return {};

	return Object.fromEntries(
		Object.entries(store).filter(([, target]) => typeof target === "string"),
	) as Record<string, string>;
}

/**
 * Get the unresolved target of the symlink at `node_modules/<name>`.
 *
 * @param name the package name to inspect
 * @returns the target as recorded on disk, or `null` if it is not a symlink
 */
function readSymlink(name: string): string | null {
	try {
		return readlinkSync(join(nodeModules, name));
	} catch {
		// Either nothing is there, or it is the installed copy and not a symlink.
		return null;
	}
}

/**
 * Copy the current symlink target into the store file, so that unlinking can
 * put it back.
 *
 * Only targets inside pnpm's virtual store are recorded; anything else is a
 * link this script made earlier, and recording it would lose the real target.
 *
 * @param name the package name about to be linked
 */
function rememberTarget(name: string) {
	const target = readSymlink(name);
	if (!target) return;

	const resolved = resolve(join(nodeModules, dirname(name)), target);
	if (!resolved.startsWith(`${virtualStore}${sep}`)) return;

	const store = readStore();
	if (store[name] === target) return;
	store[name] = target;
	writeFileSync(storeFile, `${JSON.stringify(store, null, "\t")}\n`);
}

/**
 * Search pnpm's virtual store for the package's installed copy.
 *
 * This is the fallback for packages linked before the store file existed. It
 * can only guess when the store holds several peer variants of a version.
 *
 * @param name the package name to look for
 * @returns the path to the installed copy, or `null` if there is none
 */
function findInVirtualStore(name: string): string | null {
	if (!existsSync(virtualStore)) return null;

	// pnpm names virtual store directories `<scope>+<name>@<version>`, with the
	// resolved peers, if any, appended in brackets.
	const prefix = `${name.replace("/", "+")}@`;
	const dirs = readdirSync(virtualStore)
		.filter((dir) => dir.startsWith(prefix))
		.map((dir) => join(virtualStore, dir, "node_modules", name))
		.filter((dir) => existsSync(dir));

	if (dirs.length > 1) {
		console.warn(
			`The store holds ${dirs.length} copies of ${name} and no record of which one was linked over. Run \`rm -rf node_modules\` and \`pnpm i\` if the wrong one is restored.`,
		);
	}
	return dirs[0] ?? null;
}

/**
 * Point `node_modules/<name>` at the given directory.
 *
 * A relative target is interpreted, as symlinks always are, relative to the
 * link's own directory, which is how pnpm writes its links.
 *
 * @param name the package name to link
 * @param target the path to the target directory
 * @returns `true` if a new symlink was created, `false` if it already existed
 */
function createSymlink(name: string, target: string): boolean {
	const link = join(nodeModules, name);
	if (readSymlink(name) === target) return false;

	mkdirSync(dirname(link), { recursive: true });
	rmSync(link, { force: true, recursive: true });
	symlinkSync(target, link, "dir");
	return true;
}

/**
 * Point the package in `node_modules` to the given source code path.
 *
 * @param name the package name to link
 * @param path the path to the source code to link to
 */
function linkSingle(name: string, path: string) {
	const target = resolveFilePath(path);
	if (!existsSync(target)) {
		console.warn(`Cannot link ${name}, ${target} does not exist.`);
		return;
	}
	rememberTarget(name);
	if (createSymlink(name, target)) console.log(`Linked ${name} to ${target}`);
}

/**
 * Point the package in `node_modules` back to the copy in the store.
 *
 * @param name the package name to point back to the store
 */
function unlinkSingle(name: string) {
	const remembered = readStore()[name];
	const target =
		remembered && existsSync(resolve(join(nodeModules, dirname(name)), remembered))
			? remembered
			: findInVirtualStore(name);

	if (target) {
		if (createSymlink(name, target)) console.log(`Unlinked ${name}`);
	} else {
		console.warn(
			`Cannot unlink ${name}, it is not in the store. Run \`rm -rf node_modules\` and \`pnpm i\`.`,
		);
	}
}

/**
 * Get whether there is anything to do: `NO_LINKMAN` opts out entirely, and
 * before the first install there is no `node_modules` to link into.
 *
 * @returns `true` if the commands should run, `false` otherwise
 */
function getCanRun() {
	if (process.env.NO_LINKMAN === "1" || process.env.NO_LINKMAN === "true") {
		console.log("Doing nothing, `NO_LINKMAN` is set.");
		return false;
	}
	if (!existsSync(nodeModules)) {
		console.warn("Doing nothing, `node_modules` does not exist. Run `pnpm i` first.");
		return false;
	}
	return true;
}

/**
 * Read the links from `links.json` and apply them to `node_modules`.
 *
 * The local overrides file is left alone. This also runs after `pnpm i`, which
 * must not undo an earlier `just unlink`; discarding the overrides is `just
 * link`'s job.
 */
function linkAll() {
	if (!getCanRun()) return;

	const links = { ...readLinks("links.json"), ...readLinks("links.local.json") };
	for (const [name, path] of Object.entries(links)) {
		if (path) linkSingle(name, path);
	}
}

/**
 * Unlink all packages listed in `links.json`.
 *
 * Create the local overrides file.
 */
function unlinkAll() {
	if (!getCanRun()) return;

	const links = { ...readLinks("links.json"), ...readLinks("links.local.json") };
	for (const name of Object.keys(links)) {
		unlinkSingle(name);
	}

	const disabled = Object.fromEntries(Object.keys(links).map((name) => [name, null]));
	writeFileSync(join(root, "links.local.json"), `${JSON.stringify(disabled, null, "\t")}\n`);
}

const program = new Command();
program.name("linkman").description("Link or unlink packages into `node_modules`");
program.command("link").description("Link packages").action(linkAll);
program.command("unlink").description("Unlink packages").action(unlinkAll);
program.parse();
