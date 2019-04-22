import * as React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity, Image, Text, View, Modal, WebView } from "react-native";

import { Images } from "@assets/Images";
import { modalOverlay, containerStatic, Color, filledButton, buttonText } from "@constants/UI";

import { StatusBarManager } from "@utils/StatusBarManager";

import { styles as commonStyles } from "../styles";

export class VideoPlayer extends React.Component {
    static propTypes = {
        uri: PropTypes.string.isRequired
    };

    state = {
        isVisible: false
    }

    render() {
        return (
            <React.Fragment>
                <TouchableOpacity
                    onPress={this.handleModalOpen}
                    style={[commonStyles.underImageContainerItem, { paddingRight: containerStatic.paddingRight }]}
                >
                    <Image
                        source={Images.videoButton}
                        style={styles.videoButton}
                        resizeMode="contain"
                    />
                    <Text style={commonStyles.underImageContainerItemText}>Video</Text>
                </TouchableOpacity>
                <Modal
                    transparent
                    animationType="fade"
                    visible={this.state.isVisible}
                    onRequestClose={this.handleModalClose}
                >
                    <View style={styles.modal}>
                        <View style={styles.relativeContainer}>
                            <WebView
                                source={{ uri: this.embed }}
                                style={styles.webView}
                            />
                            <TouchableOpacity style={styles.closeButton} onPress={this.handleModalClose}>
                                <Text style={styles.closeButtonText}>Back</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </React.Fragment>
        );
    }

    get embed() {
        const matches = (new RegExp(/[\\?\\&]v=([^\\?\\&]+)/g)).exec(this.props.uri);

        return (matches && matches[1])
            ? `https://youtube.com/embed/${matches[1]}`
            : this.props.uri;
    }

    handleModalOpen = () => {
        this.setState({ isVisible: true });

        StatusBarManager.setState("hidden");
    };

    handleModalClose = () => {
        this.setState({ isVisible: false });

        StatusBarManager.restoreState();
    };

}

const styles = StyleSheet.create({
    videoButton: {
        height: 38,
        width: 38
    },
    modal: {
        ...modalOverlay,

        paddingLeft: 0,
        paddingRight: 0,

        height: "100%",
    },
    closeButton: {
        ...filledButton,

        backgroundColor: Color.red,
    },
    closeButtonText: {
        ...buttonText,

        color: "#fff"
    },
    relativeContainer: {
        position: "relative",

        flex: 1
    },
    webView: {
        flex: 1,

        borderRadius: 5,

        overflow: "hidden",

        margin: 2
    }
});
