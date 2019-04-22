import { StyleSheet, Dimensions } from "react-native";

import { Color, Font, filledButton, shadowArea } from "@constants/UI";

const { height } = Dimensions.get("window");
const mapPercentage = 0.31;

const footerButton = {
    ...filledButton,

    flexDirection: "row",
    justifyContent: "center",

    position: "absolute",
    bottom: 15,
    borderRadius: 100,

    /* eslint-disable-next-line no-magic-numbers */
    width: (Dimensions.get("window").width / 2) - 18
};

export const styles = StyleSheet.create({
    shareButton: {
        marginRight: 15,
        width: 24,
        height: 24
    },
    shareButtonIcon: {
        width: "100%",
        height: "100%",
        tintColor: "#fff"
    },
    root: {
        flex: 1
    },
    mapConainer: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: Color.grayLight,
        borderBottomColor: Color.grayLight
    },
    map: {
        width: "100%",
        height: height * mapPercentage,
    },
    header: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,

        paddingBottom: 10,
        paddingTop: 15,

        justifyContent: "space-between",
        alignItems: "stretch",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    transportIcon: {
        width: 12.37,
        height: 10.55,

        marginTop: 3,
        marginRight: 7
    },
    typeText: {
        color: Color.red,

        fontFamily: Font.type.medium,
        fontSize: Font.size.m
    },
    nameText: {
        fontFamily: Font.type.medium,
        fontSize: Font.size.l
    },
    locationText: {
        color: Color.gray,

        fontFamily: Font.type.medium,
        fontSize: Font.size.m
    },
    text: {
        fontFamily: Font.type.regular,
        fontSize: Font.size.m
    },
    subwayContainer: {
        backgroundColor: Color.darkWhite,

        flexDirection: "row",

        paddingTop: 10,
        paddingBottom: 10
    },
    subwayTextContainer: {
        flex: 1,
        justifyContent: "space-between"
    },
    subwayItem: {
        flex: 1,
        flexDirection: "row",

        paddingLeft: 20
    },
    subwayName: {
        fontFamily: Font.type.medium,
        fontSize: Font.size.s
    },
    subwayInfo: {
        color: Color.gray,
        fontFamily: Font.type.regular,
        fontSize: Font.size.s
    },
    likeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        marginTop: 10,
        marginBottom: 10
    },
    facilitiesContainer: {
        marginTop: 20,
        marginBottom: 20,
        paddingBottom: 10,
        paddingTop: 10,

        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: Color.grayLight,
        borderBottomColor: Color.grayLight
    },
    selectContainer: {
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10
    },
    infoContainer: {
        marginBottom: 80,
        marginTop: 20
    },
    scheduleButton: {
        ...footerButton,

        backgroundColor: Color.grayDark,

        left: 15
    },
    bookButton: {
        ...footerButton,
        backgroundColor: Color.red,

        /* eslint-disable-next-line no-magic-numbers */
        left: footerButton.width / 2 + 18
    },
    requestToBookButton: {
        ...footerButton,
        backgroundColor: Color.red,

        right: 15
    },
    footerButtonText: {
        fontSize: Font.size.s,
        fontFamily: Font.type.regular,
        color: "#fff",

        paddingTop: 8,
        paddingBottom: 8
    },
    footerIcon: {
        width: 20,
        height: 20,
        marginRight: 5
    },
    underImageContainer: {
        ...shadowArea,

        paddingTop: 7,
        paddingBottom: 7,

        flexDirection: "row"
    },
    underImageContainerItem: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        flex: 1
    },
    underImageContainerItemText: {
        marginLeft: 10,

        fontFamily: Font.type.regular,
        fontSize: Font.size.s
    },
    visitedLogo: {
        width: 30,
        height: 40
    }
});
