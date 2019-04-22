import * as React from "react";
import PropTypes from "prop-types";
import { View, Text, Image } from "react-native";
import Touchable from "react-native-platform-touchable";

import { Images } from "@assets/Images";

import { styles } from "./styles";
import { commonStyles } from "../commonStyles";

export const BookCreationDone = (props) => (
	<View style={{ flex: 1, justifyContent: "space-between" }}>
		<View style={[commonStyles.shadowContainer, { paddingLeft: 7, paddingRight: 7 }]}>
			<View style={[commonStyles.shadow, { padding: 0 }]}>
				<View style={styles.header}>
					<Text style={styles.headerText}>{props.infoSummary.time}</Text>
					<Text style={styles.headerText}>{props.infoSummary.date}</Text>
				</View>
				<View style={styles.doneContainer}>
					<Image
						resizeMode="contain"
						style={styles.doneImage}
						source={Images.bookingRequestSentIcon}
					/>
					<Text style={styles.doneTitle}>Booking successfull!</Text>
					<Text style={styles.doneInfo}>
						A confirmation email has been sent.
					</Text>
				</View>
			</View>
		</View>
		<Touchable style={commonStyles.button} onPress={props.onPress}>
			<Text style={commonStyles.buttonText}>Done</Text>
		</Touchable>
	</View>
);

BookCreationDone.propTypes = {
	onPress: PropTypes.func.isRequired,
	infoSummary: PropTypes.shape({
		time: PropTypes.string.isRequired,
		date: PropTypes.string.isRequired
	}).isRequired
};
