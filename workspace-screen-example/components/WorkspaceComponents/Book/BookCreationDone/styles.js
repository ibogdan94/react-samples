import { StyleSheet } from "react-native";

import { Font, Color } from "@constants/UI";

export const styles = StyleSheet.create({
	header: {
		padding: 10,
		alignItems: "center",

		backgroundColor: Color.darkWhite
	},
	headerText: {
		fontFamily: Font.type.medium,
		fontSize: Font.size.m
	},
	doneTitle: {
		fontFamily: Font.type.medium,
		fontSize: Font.size.m,

		marginBottom: 3,

		textAlign: "center"
	},
	doneInfo: {
		fontFamily: Font.type.regular,
		fontSize: Font.size.m,

		textAlign: "center"
	},
	doneContainer: {
		paddingTop: 10,
		paddingBottom: 15,
		paddingLeft: 65,
		paddingRight: 65,

		alignItems: "center"
	},
	doneImage: {
		width: 70,
		height: 70,

		marginBottom: 7,

		alignSelf: "center"
	}
});
