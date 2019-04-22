import { StyleSheet } from "react-native";

import { Color, Font, image } from "@constants/UI";

export const styles = StyleSheet.create({
    root: {
        marginTop: 15,
        marginBottom: 15
    },
    image: {
        ...image,

        backgroundColor: Color.grayLight,

        overflow: "hidden"
    },
    visitedLogo: {
        height: 30,
        width: 30,

        position: "absolute",
        top: 3.5,
        right: 0
    },
    nextButtonWhite: {
        height: 25,
        width: 25,
        position: "absolute",
        top: 70,
        right: 0
    },
    deskContainer: {
        justifyContent: "space-between",
        alignItems: "stretch",
        flexDirection: "row",

        marginBottom: 5,
        marginTop: 5
    },
    deskTitle: {
        fontSize: Font.size.m,
        fontFamily: Font.type.medium,

        color: Color.red
    },
    nameTitle: {
        fontSize: Font.size.m,
        fontFamily: Font.type.medium,

        color: Color.grayDark,

        lineHeight: 18
    },
    locationTitle: {
        fontSize: Font.size.m,
        fontFamily: Font.type.medium,

        color: Color.gray
    },
    footerTextGroup: {
		flexDirection: "row",

		justifyContent: "center"
    },
    itemFooterPriceText: {
		fontFamily: Font.type.regular,
		fontSize: Font.size.m
    },
    activeDarkText: {
		fontFamily: Font.type.medium,

		color: Color.red
    },
    itemFooterDurationText: {
		color: Color.gray,

		marginLeft: 3,

		fontFamily: Font.type.regular,
		fontSize: Font.size.m
    },
    activeLightText: {
		fontFamily: Font.type.medium,

		color: Color.redLight
    },
    itemFooterTypeText: {
		color: Color.gray,

		fontFamily: Font.type.regular,
		fontSize: Font.size.s,

		marginTop: 3,

		textAlign: "center"
	},
});
