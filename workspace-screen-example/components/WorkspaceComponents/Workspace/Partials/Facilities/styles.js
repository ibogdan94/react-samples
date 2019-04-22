import { StyleSheet, Dimensions } from "react-native";

import { Color, buttonText, Font, modalOverlay } from "@constants/UI";

const IMAGE_WIDTH_PERCENTAGE = .0676;
const MODAL_SCROLL_HEIGHT_PERCETAGE = .6;

export const styles = StyleSheet.create({
    image: {
        width: Dimensions.get("window").width * IMAGE_WIDTH_PERCENTAGE,
        height: Dimensions.get("window").width * IMAGE_WIDTH_PERCENTAGE,

        tintColor: Color.red,

        margin: 2,
    },
    container: {
        justifyContent: "space-between",
        alignItems: "stretch",

        flexDirection: "row",
        flexWrap: "wrap"
    },
    viewAllButton: {
        width: "100%",

        paddingTop: 10,
        paddingBottom: 5
    },
    buttonText: {
        ...buttonText,

        width: "100%",
        textAlign: "center",

        color: Color.red
    },
    modalOverlay: {
        ...modalOverlay
    },
    listContainer: {
        backgroundColor: "#fff",

        borderRadius: 5
    },
    listItem: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 25,

        flexDirection: "row",
        alignItems: "center"
    },
    darkListItem: {
        backgroundColor: Color.darkWhite,
    },
    listItemText: {
        fontSize: Font.size.m,
        fontFamily: Font.type.regular,

        color: Color.grayDark
    },
    listItemImage: {
        width: Dimensions.get("window").width * IMAGE_WIDTH_PERCENTAGE,
        height: Dimensions.get("window").width * IMAGE_WIDTH_PERCENTAGE,

        tintColor: Color.red,

        marginRight: 25
    },
    scroll: {
        maxHeight: Dimensions.get("window").height * MODAL_SCROLL_HEIGHT_PERCETAGE,

        borderColor: "transparent",
        borderTopColor: Color.grayLight,
        borderWidth: 1
    },
    headerTitle: {
        textAlign: "center",

        color: Color.grayDark,

        fontSize: Font.size.l,
        fontFamily: Font.type.medium,

        padding: 12
    },
    footerButton: {
        padding: 12,

        borderColor: "transparent",
        borderTopColor: Color.grayLight,
        borderWidth: 1
    },
    footerButtonText: {
        fontFamily: Font.type.regular,
        fontSize: Font.size.l,

        width: "100%",
        textAlign: "center",

        color: Color.red
    }
});
