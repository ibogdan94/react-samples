import * as React from "react";
import PropTypes from "prop-types";
import { Text, Image } from "react-native";
import Touchable from "react-native-platform-touchable";

import { Images } from "@assets/Images";

import { styles } from "../styles";

export const RequestToBookButton = (props) => (
	<Touchable
		activeOpacity={1}
		onPress={props.onPress}
		style={styles.requestToBookButton}
	>
		<React.Fragment>
			<Image
				resizeMode="contain"
				style={styles.footerIcon}
				source={Images.requestToBookIcon}
			/>
			<Text style={styles.footerButtonText}>Request to book</Text>
		</React.Fragment>
	</Touchable>
);

RequestToBookButton.propTypes = {
	onPress: PropTypes.func.isRequired
};
