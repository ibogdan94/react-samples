import { StyleSheet } from "react-native";

import { Color, Font } from "@constants/UI";

export const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center"
	},
	itemWrap: {
		paddingTop: 7,
		paddingBottom: 7
	},
	title: {
		fontSize: Font.size.m,
		fontFamily: Font.type.regular,

		color: Color.gray
	},
	info: {
		fontSize: Font.size.s,
		fontFamily: Font.type.regular,

		color: Color.gray
	},
	titleActive: {
		color: "#000"
	},
	circle: {
		width: 17,
		height: 17,

		marginRight: 12,

		borderRadius: 8.5,

		borderWidth: 2.5,
		borderColor: Color.grayLight
	},
	circleActive: {
		borderWidth: 5,
		borderColor: Color.red
	}
});
