import * as React from "react";
import PropTypes from "prop-types";
import { Image, Text } from "react-native";
import Touchable from "react-native-platform-touchable";

import { Images } from "@assets/Images";

import { styles } from "../styles";

export const ScheduleViewingButton = (props) => (
	<Touchable
		activeOpacity={1}
		onPress={props.onPress}
		style={styles.scheduleButton}
	>
		<React.Fragment>
			<Image
				resizeMode="contain"
				style={styles.footerIcon}
				source={Images.scheduleViewingIcon}
			/>
			<Text style={styles.footerButtonText}>
				Schedule viewing
			</Text>
		</React.Fragment>
	</Touchable>
);

ScheduleViewingButton.propTypes = {
	onPress: PropTypes.func.isRequired
};
