import * as React from "react";
import { LinearGradient } from "expo";

import { styles } from "../styles";

export const HeaderGradient = (props) => (
	<LinearGradient
		colors={["rgba(47, 55, 75, .5)", "rgba(47, 55, 75, 0)"]}
		style={styles.header}
		start={[0, 0]}
		end={[0, 1]}
	>
		{props.children}
	</LinearGradient>
);
