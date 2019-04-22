import { StyleSheet } from "react-native";

import { shadowArea, Color, Font, filledButton, buttonText, backgroundInput } from "@constants/UI";

export const styles = StyleSheet.create({
	shadowContainer: {
		padding: 1,
		paddingBottom: 4,

		marginBottom: 10
	},
	shadow: {
		...shadowArea,

		borderRadius: 5,

		padding: 12
	},
	separatorHorizontal: {
		width: "100%",

		height: 1,

		backgroundColor: Color.grayLight,

		marginTop: 10,
		marginBottom: 10
	},
	error: {
		color: Color.redError,
		fontFamily: Font.type.light
	},
	selectedContainerStyles: {
		elevation: 0,
		borderWidth: 0,
		shadowColor: "transparent",

		paddingLeft: 7,
		paddingRight: 7
	},
	optionsContainerStyles: {
		padding: 0
	},
	inlineContainer: {
		flexDirection: "row",
		justifyContent: "space-between",

		alignItems: "baseline"
	},
	inlineContainerText: {
		fontFamily: Font.type.regular,
		fontSize: Font.size.m,

		flex: 1
	},
	rootSelectStyles: {
		width: "auto",

		flex: 2,

		paddingLeft: 0,
		paddingRight: 0
	},
	input: {
		...backgroundInput,

		marginBottom: 10,
		marginTop: 10
	},
	inputError: {
		borderColor: Color.redError,
		borderWidth: 1
	},
	button: {
		...filledButton,

		backgroundColor: Color.red,

		marginBottom: 25
	},
	text: {
		...buttonText,

		color: "#fff"
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
		padding: 10,

		alignItems: "center"
	},
	doneImage: {
		width: 70,
		height: 70,

		marginBottom: 7,

		alignSelf: "center"
	}
});
