import { StyleSheet } from "react-native";

import { image, Font, Color } from "@constants/UI";

export const styles = StyleSheet.create({
    container: {
        marginBottom: 10
    },
    image: {
        ...image
    },
    typeText: {
        color: Color.red,

        fontFamily: Font.type.medium,
        fontSize: Font.size.s,

        marginTop: 10
    },
    locationNameText: {
        fontFamily: Font.type.medium,
        fontSize: Font.size.m,
    },
    locationAddressText: {
        color: Color.gray,

        fontFamily: Font.type.medium,
        fontSize: Font.size.s,

        marginTop: 2
    }
});
