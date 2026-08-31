import type { BaseProps } from "@recivi/pf/types/props";

export interface PdfProps extends BaseProps {
	/** the title for the page; This also gets baked into the compiled PDF. */
	title: string;
	/** optional tag to filter projects, roles and certs by */
	filterTag?: string;
	/** whether to include the human languages section */
	includeLangs?: boolean;
}
