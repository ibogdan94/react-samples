import { StyleSheet, Dimensions } from "react-native";

import { Color } from "@constants/UI";

const { width } = Dimensions.get("window");

export const heightRatio = 1.03933;
export const imageHeight = width * heightRatio;

export const styles = StyleSheet.create({
    root: {
        width,

        position: "relative",

        backgroundColor: Color.gray
    },
    image: {
        width,
        height: imageHeight
    },
    dotsContainer: {
        position: "absolute",
        bottom: 15,
        left: 0,
        right: 0,

        flexDirection: "row",
        justifyContent: "center"
    }
});
