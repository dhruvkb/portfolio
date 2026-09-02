set dotenv-load := false

# @ toggles quieting at the recipe-level. Without quiet, each commands is
#   printed to STDERR before execution.
# _ marks a recipe as private and stops it from appearing in `just --list` or
#   `just --summary`.

# Show all available recipes.
@_default:
	just --list --unsorted

# Print the given text with an equal number of `=` characters below it.
@_section text:
	printf "\n{{ text }}\n"
	printf "%0.s=" $(seq 1 $(printf "%s" "{{ text }}" | wc -c))
	printf "\n"

# Setup
# =====

# Install dependencies.
install:
	pnpm i

	pnpm prek install --hook-type pre-commit --hook-type pre-push

alias i := install

# Lint
# ====

# Run one, or all, of `prek`'s hooks on specific, or all, files.
lint hook="" *files="":
	pnpm prek run {{ hook }} {{ if files == "" { "--all-files" } else { "--files" } }} {{ files }}

alias l := lint

# Link
# ====

# Link local checkouts of dependencies, as configured in `links.json`.
link:
	rm -rf links.local.json
	pnpm linkman link

# Restore the published versions of all dependencies.
unlink:
	pnpm linkman unlink
