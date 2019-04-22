import * as React from "react";
import PropTypes from "prop-types";
import { Text, Image } from "react-native";
import Touchable from "react-native-platform-touchable";

import { Images } from "@assets/Images";

import { styles } from "../styles";

export const BookButton = (props) => (
	<Touchable
		activeOpacity={1}
		onPress={props.onPress}
		style={styles.bookButton}
	>
		<React.Fragment>
			<Image
				resizeMode="contain"
				style={styles.footerIcon}
				source={Images.requestToBookIcon}
			/>
			<Text style={styles.footerButtonText}>Book</Text>
		</React.Fragment>
	</Touchable>
);

BookButton.propTypes = {
	onPress: PropTypes.func.isRequired
};
