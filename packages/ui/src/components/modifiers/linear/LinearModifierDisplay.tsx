import type { LinearModifier } from "@tme/library/src/modifiers/blueprints/LinearModifier";
import { ModifierMark } from "../mark/ModifierMark";
import styles from "./LinearModifierDisplay.module.css";

export interface LinearModifierDisplayProps {
	modifier: LinearModifier;
	float: number;
}

export const LinearModifierDisplay = (props: LinearModifierDisplayProps) => {
	const flavor = props.modifier.getDescription(props.float);
	const activeBreakpoint = props.modifier.float.getBreakpoint(props.float) as {
		min: number;
		value: number;
	};

	return (
		<div className={styles.root}>
			<div className={styles.grid}>
				<ModifierMark kanji="进" color="#5dd49a" />
				<div>
					<div className={styles.label}>LINEAR</div>
					<div className={styles.titleRow}>
						<div className={styles.title}>{flavor.title}</div>
						<span className={styles.value}>+{activeBreakpoint.value}</span>
					</div>
					<div className={styles.description}>{flavor.description}</div>
					{flavor.disclaimer && (
						<div className={styles.disclaimer}>{flavor.disclaimer}</div>
					)}
				</div>
			</div>
		</div>
	);
};
