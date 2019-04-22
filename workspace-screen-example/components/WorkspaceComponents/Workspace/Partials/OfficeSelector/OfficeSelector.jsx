import * as React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";

import { DeskTypesDurationLabels, WorkspaceTypesLabels, WorkspaceTypesDurationLabels } from "@constants/API";
import { NumberManager } from "@utils/NumberManager";

import { Select } from "@components/partials/Select";

import { styles } from "./styles";

export class OfficeSelector extends React.Component {
	static propTypes = {
		items: PropTypes.array.isRequired,
		onChange: PropTypes.func.isRequired
	};

	render() {
		return (
			<Select
				options={this.mappedOptions}
				onChange={this.props.onChange}
				renderLabel={this.renderLabel}
			/>
		);
	}

	get mappedOptions() {
		return this.props.items
			.map(({ id, price, type, capacity, size, deskType }) => ({
				value: id,
				label: { price, type, id, size, capacity, deskType }
			}));
	}

	renderLabel = ({ price, type, id, size, capacity, deskType }, { isActive, isHead }) => (
		<View key={id} style={styles.container}>
			{!isHead && <View style={[styles.circle, isActive && styles.circleActive]} />}
			<View style={styles.itemWrap}>
				<Text style={[styles.title, isActive && styles.titleActive]}>
					{WorkspaceTypesLabels[type] || type}
					- £{NumberManager.abbreviate(price)}&nbsp;
					{this.getDurationLabel(deskType, type)}
				</Text>
				<Text style={styles.info}>
					{!!size && `${NumberManager.abbreviate(size)} sq ft | `}
					{!!capacity && `${NumberManager.abbreviate(capacity)} ppl`}
				</Text>
			</View>
		</View>
	);

	getDurationLabel = (deskType, type) => {
		return DeskTypesDurationLabels[deskType]
			|| WorkspaceTypesDurationLabels[type]
			|| "/m";
	}
}
