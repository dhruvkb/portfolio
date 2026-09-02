import pf from "@recivi/pf";
import { defineConfig } from "astro/config";

import browserstack from "./src/assets/icons/browserstack.svg?raw";
import fac2r from "./src/assets/icons/fac2r.svg?raw";
import finrep from "./src/assets/icons/finrep.svg?raw";
import hackerearth from "./src/assets/icons/hackerearth.svg?raw";
import img from "./src/assets/icons/img.svg?raw";
import mathesar from "./src/assets/icons/mathesar.svg?raw";
import pls from "./src/assets/icons/pls.svg?raw";
import portfolio from "./src/assets/icons/portfolio.svg?raw";
import skyscraper from "./src/assets/icons/skyscraper.svg?raw";
import starlight from "./src/assets/icons/starlight.svg?raw";
import styleguide from "./src/assets/icons/styleguide.svg?raw";
import typer from "./src/assets/icons/typer.svg?raw";
import yojak from "./src/assets/icons/yojak.svg?raw";

// https://astro.build/config
export default defineConfig({
	site: "https://dhruvkb.dev",
	devToolbar: {
		enabled: false,
	},
	integrations: [
		pf({
			reciviDataFile: import.meta.env.DEV
				? "../../dhruvkb/recivi/recivi.json"
				: "https://github.com/dhruvkb/recivi/raw/main/recivi.json",
			title: "@dhruvkb",
			icons: {
				packs: {
					dhruvkb: {
						browserstack,
						fac2r,
						finrep,
						hackerearth,
						img,
						mathesar,
						pls,
						portfolio,
						skyscraper,
						starlight,
						styleguide,
						typer,
						yojak,
					},
				},
				aliases: {
					vocabulary: { pack: "simple-icons", name: "creativecommons" },
					omniport: { pack: "dhruvkb", name: "img" },
					platform: { pack: "dhruvkb", name: "browserstack" },
					// Some brands have Lucide icons, which we don't like.
					github: { pack: "simple-icons", name: "github" },
					linkedin: { pack: "simple-icons", name: "linkedin" },
					instagram: { pack: "simple-icons", name: "instagram" },
				},
			},
			head: {
				elements: [
					{ tag: "link", attrs: { rel: "preconnect", href: "https://fonts.googleapis.com" } },
					{
						tag: "link",
						attrs: { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
					},
					// Provides the following fonts:
					// - Space Grotesk: web and print display font
					// - IBM Plex Sans: print body font
					// - JetBrains Mono: web and print monospace font
					{
						tag: "link",
						attrs: {
							href: [
								"https://fonts.googleapis.com/css2?",
								"&display=swap",
								"&family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700",
								"&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800",
								"&family=Space+Grotesk:wght@300..700",
							].join(""),
							rel: "stylesheet",
						},
					},
					{ tag: "link", attrs: { rel: "preconnect", href: "https://rsms.me" } },
					// Provides the following font:
					// - Inter: web body font
					{ tag: "link", attrs: { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" } },
				],
			},
			css: {
				customCss: {
					Root: ["./src/styles/props.css", "./src/styles/universal.css"],
					Web: ["./src/styles/web.css"],
					Print: ["./src/styles/print.css"],
				},
			},
			components: {
				Footer: "./src/components/defs/Footer.astro",
				Period: "./src/components/defs/Period.astro",
				PfDate: "./src/components/defs/PfDate.astro",
			},
			locale: {
				bcp47: "en-IN",
			},
		}),
	],
});
