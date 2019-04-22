import * as React from "react";
import PropTypes from "prop-types";
import { View, Platform } from "react-native";
import { Image } from "react-native-expo-image-cache";

import { Carousel } from "@components/partials/Carousel";

import { styles, imageHeight } from "./styles";

export class ImageCarousel extends React.PureComponent {
    static propTypes = {
        images: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            url: PropTypes.string.isRequired
        })).isRequired,
        styleImage: PropTypes.any,
        carouselStyle: PropTypes.any
    };

    render() {
        return (
            <View style={[styles.root, this.props.style]}>
                <Carousel
                    style={[
                        Platform.select({ android: { height: imageHeight, width: "100%" } }),
                        this.props.carouselStyle
                    ]}
                    renderItem={this.renderImage}
                    itemsList={this.props.images}
                >
                    {this.renderChildren}
                </Carousel>
            </View>
        );
    }

    renderChildren = (Dots) => {
        return (
            this.props.images.length > 1
                ? <View style={styles.dotsContainer}><Dots /></View>
                : null
        );
    }

    renderImage = ({ url, id }) => {
        return (
            <Image
                uri={url}
                key={id}
                resizeMode="cover"
                source={{ uri: url }}
                style={[styles.image, this.props.styleImage]}
            />
        );
    }
}
