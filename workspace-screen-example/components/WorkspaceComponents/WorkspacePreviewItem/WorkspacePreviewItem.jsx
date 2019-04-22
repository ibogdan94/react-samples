import * as React from "react";
import { withNavigation } from "react-navigation";
import { View, Image, Text, TouchableOpacity, Platform } from "react-native";

import { NumberManager } from "@utils/NumberManager";
import { WorkspaceTypesLabels, DeskTypesDurationLabels, DeskTypeLabels, WorkspaceTypesDurationLabels } from "@constants/API";

import { ImageCarousel } from "@components/WorkspaceComponents/Workspace/Partials";
import { RelatedContainer } from "@components/WorkspaceComponents/RelatedContainer";
import { RowList } from "@components/partials/RowList";

import { Images } from "@assets/Images";

import { styles } from "./styles";
import { LikeButton } from "../LikeButton";
import { WorkspacePreviewItemPropTypes } from "./WorkspacePreviewItemPropTypes";

@withNavigation
export class WorkspacePreviewItem extends React.Component {
    static propTypes = WorkspacePreviewItemPropTypes;

    shouldComponentUpdate(nextProps) {
        if (nextProps.extraData === undefined) {
            return false;
        }

        return this.props.extraData !== nextProps.extraData;
    }

    render() {
        return (
            <RelatedContainer
                defaultWorkspace={this.props.workspace}
                relatedWorkspaces={this.props.related}
                keepSelected
            >
                {this.props.children ? this.props.children(this.renderWorkspaceItem()) : this.renderWorkspaceItem()}
            </RelatedContainer>
        );
    }

    renderWorkspaceItem = () => (workspace, onChange, related) => {
        // const images = workspace.images.filter(({ url }) => url !== workspace.coverImageUrl).slice(0, 6);
        return (
            <View style={[styles.root, this.props.style]}>
                <TouchableOpacity onPress={this.handleNavigate(workspace.id)}>
                {/*<View style={{flex:1, flexDirection: "row"}}>*/}
                    <Image
                        source={{ uri: workspace.coverImageUrl }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    {/*<ImageCarousel*/}
                        {/*carouselStyle={Platform.select({ android: { height: styles.image.height } })}*/}
                        {/*images={[{ url: workspace.coverImageUrl, id: 0 }]}*/}
                        {/*styleImage={{ flex: 1, height: styles.image.height }}*/}
                        {/*style={styles.image}*/}
                    {/*/>*/}
                    {workspace.visited && (
                        <Image
                            source={Images.visitedLogo}
                            style={styles.visitedLogo}
                            resizeMode="contain"
                        />
                    )}
                    {/*<TouchableOpacity onPress={this.handleNavigate(workspace.id)}>*/}
                        {/*<Image*/}
                            {/*source={Images.nextButtonWhite}*/}
                            {/*style={styles.nextButtonWhite}*/}
                            {/*resizeMode="contain"*/}
                        {/*/>*/}
                    {/*</TouchableOpacity>*/}
                {/*</View>*/}

                    <View style={styles.deskContainer}>
                        <View style={{ maxWidth: "70%" }}>
                            <Text style={styles.deskTitle}>
                                {WorkspaceTypesLabels[workspace.type] || workspace.type}
                            </Text>
                            <Text style={styles.nameTitle}>{this.props.location.name}</Text>
                            <Text style={styles.locationTitle}>{this.props.location.address}</Text>
                        </View>
                        <View style={{ alignSelf: "center" }}>
                            <LikeButton key={workspace.id} apiLikeStatus={workspace.isLiked} id={workspace.id} />
                        </View>
                    </View>
                </TouchableOpacity>
                <RowList items={related}>
                    {this.renderItemFooter(
                        onChange,
                        related.length > 1 ? workspace.id : -1
                    )}
                </RowList>
            </View>
        );
    }

    renderItemFooter = (onChange, id) => ({ item }) => (
        <TouchableOpacity onPress={this.handleNavigate(item.id)}>
            <View style={styles.footerTextGroup}>
                <Text
                    style={[styles.itemFooterPriceText, id === item.id && styles.activeDarkText]}
                >
                    £
                    {NumberManager.abbreviate(item.price)}
                </Text>
                <Text
                    style={[styles.itemFooterDurationText, id === item.id && styles.activeDarkText]}
                >
                    {DeskTypesDurationLabels[item.deskType] || WorkspaceTypesDurationLabels[item.type] || "/m"}
                </Text>
            </View>
            <Text
                style={[styles.itemFooterTypeText, id === item.id && styles.activeLightText]}
            >
                {this.footerTextType(item)}
            </Text>
        </TouchableOpacity>
    );

    handleNavigate = (id) => () => {
        this.props.onNavigate && this.props.onNavigate();
        this.props.navigation.navigate("Workspace", { workspaceId: id });
    }

    footerTextType = (workspace) => {
        if (workspace.type !== "private-office" && workspace.type !== "meeting-room") {
            return DeskTypeLabels[workspace.deskType];
        }
        const size = workspace.size ? `${NumberManager.abbreviate(workspace.size)} sq ft` : "";
        const count = workspace.capacity ? `${NumberManager.abbreviate(workspace.capacity)} ppl` : "";

        return [
            size && count ? `${size} • ${count}` : (size || count)
        ].join("");
    }
}
