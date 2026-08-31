import type { BaseProps } from "@recivi/pf/types/props";

export type KaomojiMood = "happy" | "angry";

export interface RandomKaomojiProps extends BaseProps {
	/* the mood of the kaomoji */
	mood?: KaomojiMood;
}
