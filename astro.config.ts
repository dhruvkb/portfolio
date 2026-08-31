import pf from "@recivi/pf";
import { defineConfig } from "astro/config";

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
		}),
	],
});
