import {Platform, StyleSheet} from "react-native";

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
	},
    inlineContainerPicker: {
        fontFamily: Font.type.regular,
        fontSize: Font.size.m,

        flex: 1,
        paddingBottom: Platform.select({ ios: 13, android: 15 })
    },
    inputIOS: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        fontFamily: Font.type.regular,
        fontSize: Font.size.m,
        paddingRight: 2, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        paddingHorizontal: 15,
        paddingVertical: 12,
        backgroundColor: "#fff",
		color: "#fff",
		marginRight: -15
    },
    arrow: {
        width: 4,
        height: 7,

        tintColor: "#000",

        transform: [{ rotateZ: "180deg" }],

        marginLeft: 4
    },
	amountValue: {
        fontFamily: Font.type.regular,
        fontSize: Font.size.m,
	},
    arrowContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
});
