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
		}),
	],
});
