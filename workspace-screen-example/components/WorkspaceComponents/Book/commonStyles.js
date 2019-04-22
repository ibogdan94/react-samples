import { StyleSheet } from "react-native";

import { Color, shadowArea, Font, filledButton, buttonText, backgroundInput } from "@constants/UI";

export const commonStyles = StyleSheet.create({
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
	buttonText: {
		...buttonText,

		color: "#fff"
	},
	inlineContainer: {
		flexDirection: "row",
		justifyContent: "space-between",

		alignItems: "baseline"
	},
	inlineContainerLeft: {
		fontFamily: Font.type.regular,
		fontSize: Font.size.m,

		flex: 1
	},
	inlineContainerTextRight: {
		fontFamily: Font.type.medium,
		fontSize: Font.size.m,
	}
});
