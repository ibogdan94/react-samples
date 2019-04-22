import * as React from "react";
import PropTypes from "prop-types";
import { Image, View, Text } from "react-native";

import { WorkspaceTypesLabels } from "@constants/API";
import { NumberManager } from "@utils/NumberManager";

import { styles } from "./styles";

export const WorkspaceInfoItem = (props) => (
    <View style={styles.container}>
        <Image
            resizeMode="cover"
            style={styles.image}
            source={props.coverImageUrl ? { uri: props.coverImageUrl } : undefined}
        />
        <Text style={styles.typeText}>
            {WorkspaceTypesLabels[props.type] || props.type}
            {!!props.size && `- ${NumberManager.abbreviate(props.size)} sq ft |`}
            {!!props.capacity &&` ${NumberManager.abbreviate(props.capacity)} ppl`}
        </Text>
        <Text style={styles.locationNameText}>{props.locationName}</Text>
        <Text style={styles.locationAddressText}>{props.locationAddress}</Text>
    </View>
);

WorkspaceInfoItem.propTypes = {
    size: PropTypes.number,
    capacity: PropTypes.number,
    coverImageUrl: PropTypes.string,

    type: PropTypes.string.isRequired,
    locationName: PropTypes.string.isRequired,
    locationAddress: PropTypes.string.isRequired
};
