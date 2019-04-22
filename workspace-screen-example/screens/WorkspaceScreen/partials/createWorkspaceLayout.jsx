import * as React from "react";
import { View, Text, Image } from "react-native";

import { ImageCarousel, Facilities, OfficeSelector } from "@components/WorkspaceComponents/Workspace";
import { MapPreview, MapMarker } from "@components/MapComponents";
import { LikeButton } from "@components/WorkspaceComponents";

import { Images } from "@assets/Images";

import { containerStatic } from "@constants/UI";
import { WorkspaceTypesLabels } from "@constants/API";

import { styles } from "../styles";
import { VideoPlayer } from "./VideoPlayer";

const sortSubwayByDistance = (nearby) => {
	return nearby
		.sort((prev, next) => Number(prev.duration.replace(/\D/g, "")) - Number(next.duration.replace(/\D/g, "")));
};

const renderUnderImageContainer = (visited, videoLink) => {
	if (!visited && !videoLink) {
		return null;
	}

	return (
		<View style={styles.underImageContainer}>
			{visited && (
				<View style={[styles.underImageContainerItem, { paddingLeft: containerStatic.paddingLeft }]}>
					<Image
						source={Images.visitedLogo}
						style={styles.visitedLogo}
						resizeMode="stretch"
					/>
					<Text style={styles.underImageContainerItemText}>Visited by Kikmoov</Text>
				</View>
			)}
			{!!videoLink && <VideoPlayer uri={videoLink} />}
		</View>
	);
};

export const createWorkspaceLayout = (locationData, workspaceData, onChange, related) => {
	return (
		<React.Fragment>
			<ImageCarousel images={workspaceData.images} />
			{renderUnderImageContainer(workspaceData.visited, locationData.videoLink)}
			<View style={containerStatic}>
				<View style={styles.likeContainer}>
					<View style={{ maxWidth: "70%" }}>
						<Text style={styles.typeText}>
							{WorkspaceTypesLabels[workspaceData.type] || workspaceData.type}
						</Text>
						<Text style={styles.nameText}>{locationData.name}</Text>
						<Text style={styles.locationText}>{locationData.address}</Text>
					</View>
					<LikeButton key={workspaceData.id} apiLikeStatus={workspaceData.isLiked} id={workspaceData.id} />
				</View>
				<Text style={styles.text}>{workspaceData.description}</Text>
				{!!workspaceData.facilities.length && (
					<View style={styles.facilitiesContainer}>
						<Facilities items={workspaceData.facilities} />
					</View>
				)}
			</View>
			<View style={styles.selectContainer}>
				<OfficeSelector items={related} onChange={onChange} />
			</View>
			<View style={styles.mapConainer}>
				<MapPreview
					zoom={.999}
					style={styles.map}
					region={{ latitude: locationData.latitude, longitude: locationData.longitude }}
				>
					<MapMarker
						title={`${locationData.address}, ${locationData.town}, ${locationData.postcode}`}
						coordinate={{ latitude: locationData.latitude, longitude: locationData.longitude }}
					/>
				</MapPreview>
				<View style={styles.subwayContainer}>
					{sortSubwayByDistance(locationData.nearby).slice(0, 2).map(({ duration, name }) => (
						<View key={name} style={styles.subwayItem}>
							<Image style={styles.transportIcon} source={Images.transportIcon} />
							<View style={styles.subwayTextContainer}>
								<Text style={styles.subwayName}>{name}</Text>
								<Text style={styles.subwayInfo}>
									{duration}
								</Text>
							</View>
						</View>
					))}
				</View>
			</View>
			<View style={[containerStatic, styles.infoContainer]}>
				<Text style={styles.text}>{locationData.description}</Text>
			</View>
		</React.Fragment>
	);
};
