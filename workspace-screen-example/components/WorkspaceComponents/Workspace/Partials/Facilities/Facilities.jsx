import * as React from "react";
import PropTypes from "prop-types";
import Touchable from "react-native-platform-touchable";
import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import { Image } from "react-native-expo-image-cache";

import { StatusBarManager } from "@utils/StatusBarManager";

import { styles } from "./styles";

const PREVIEW_ITEMS_COUNT = 6;

export class Facilities extends React.Component {
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape({
            slug: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            appIcon: PropTypes.string
        })).isRequired,
    };

    state = {
        modalVisible: false
    };

    render() {
        return (
            <React.Fragment>
                <View style={styles.container}>
                    {this.renderItemsShort()}
                </View>
                <TouchableOpacity onPress={this.handleModalOpen} style={styles.viewAllButton}>
                    <Text style={styles.buttonText}>{"view all >"}</Text>
                </TouchableOpacity>
                <Modal
                    onRequestClose={this.handleModalClose}
                    visible={this.state.modalVisible}
                    animationType="fade"
                    transparent
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.listContainer}>
                            <Text style={styles.headerTitle}>Facilities</Text>
                            <ScrollView style={styles.scroll}>
                                {this.renderItemsFull()}
                            </ScrollView>
                            <Touchable onPress={this.handleModalClose} style={styles.footerButton}>
                                <Text style={styles.footerButtonText}>Close</Text>
                            </Touchable>
                        </View>
                    </View>
                </Modal>
            </React.Fragment>
        );
    }

    renderItemsShort = () => {
        return this.props.items
            .slice(0, PREVIEW_ITEMS_COUNT)
            .map(({ appIcon, slug }) => (
                <View key={slug}>
                    <Image
                        resizeMode="contain"
                        style={styles.image}
                        source={{ uri: appIcon }}
                        uri={appIcon}
                    />
                </View>
            ));
    }

    renderItemsFull = () => {
        return this.props.items
            .map(({ slug, name, appIcon }, index) => (
                <View key={slug} style={[styles.listItem, index % 2 && styles.darkListItem]}>
                    <Image
                        resizeMode="contain"
                        source={{ uri: appIcon }}
                        style={styles.listItemImage}
                        uri={appIcon}
                    />
                    <Text style={styles.listItemText}>{name}</Text>
                </View>
            ));
    }

    handleModalOpen = () => {
        StatusBarManager.setState("hidden");
        this.setState({ modalVisible: true });
    }

    handleModalClose = () => {
        StatusBarManager.restoreState();
        this.setState({ modalVisible: false });
    }
}
