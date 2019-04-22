import * as React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Form, FormGroup, ErrorTip, Input } from "react-native-formawesome";

import { RFASubmitButton, RFATimeRangeSelector, RFADateSelector } from "@components/partials/RFAElements";

import { commonStyles } from "../commonStyles";

import { validator } from "./BookInfoModel";
import { BookInfoFormPropTypes } from "./BookInfoFormPropTypes";

export class BookInfoForm extends React.Component {
	static propTypes = BookInfoFormPropTypes;

	constructor(props) {
		super(props);

		const currentHours = (new Date()).getUTCHours();

		const MAX_HOURS = 19;
		const MIN_HOURS = 8;

		let defaultMinHours;
		let defaultMaxHours;

		if (currentHours < MIN_HOURS) {
			defaultMaxHours = MIN_HOURS + 1;
			defaultMinHours = MIN_HOURS;
		} else if (currentHours + 1 > MAX_HOURS) {
			defaultMaxHours = MAX_HOURS;
			defaultMinHours = MAX_HOURS - 1;
		} else {
			defaultMaxHours = currentHours + 2;
			defaultMinHours = currentHours + 1;
		}

		const date = new Date();
		date.setUTCHours(defaultMinHours);

		validator.setDefaults({
			date: Date.now(),
			time: JSON.stringify({
				min: `${String(defaultMinHours).padStart(2, "0")}:00`,
				max: `${String(defaultMaxHours).padStart(2, "0")}:00`,
			}),
			phone: props.prefilledPhone,
			email: props.prefilledEmail
		});
		validator.dropToDefaults();
	}

	render() {
		return (
			<Form
				errorParser={this.errorParser}
				onSubmit={this.props.onSubmit}
				validator={validator}
				style={{ flex: 1 }}
			>
				<View style={commonStyles.shadowContainer}>
					<View style={commonStyles.shadow}>
						<FormGroup attribute="date">
							<RFADateSelector onChange={this.handleDateChange} label="Date" />
						</FormGroup>
						<View style={commonStyles.separatorHorizontal} />
						<FormGroup style={{ marginBottom: 5 }} attribute="time">
							<RFATimeRangeSelector
								label="Time"
								headerTitle="Booking time"
								onChange={this.handleTimeChange}
								currentDate={validator.modelValues.date}

								onlyRange
							/>
						</FormGroup>

						{/* Display errors from server */}
						<FormGroup attribute="startTime">
							<ErrorTip style={commonStyles.error} />
						</FormGroup>
						<FormGroup attribute="endTime">
							<ErrorTip style={commonStyles.error} />
						</FormGroup>
						{/*  */}

					</View>
				</View>
				<View style={[commonStyles.shadowContainer, { flex: 1 }]}>
					<View style={commonStyles.shadow}>
						<FormGroup validateOn="blur" attribute="phone">
							<Input
								style={commonStyles.input}
								onErrorStyles={commonStyles.inputError}
								underlineColorAndroid="transparent"

								placeholder="Phone number"
								keyboardType="phone-pad"
								returnKeyType="done"
								maxLength={11}
							/>
							<ErrorTip style={commonStyles.error} />
						</FormGroup>
						<FormGroup validateOn="blur" attribute="email">
							<Input
								underlineColorAndroid="transparent"
								onErrorStyles={commonStyles.inputError}
								placeholder="Email"
								keyboardType="email-address"
								style={commonStyles.input}
							/>
							<ErrorTip style={commonStyles.error} />
						</FormGroup>
						<FormGroup validateOn="blur" attribute="name">
							<Input
								underlineColorAndroid="transparent"
								onErrorStyles={commonStyles.inputError}
								placeholder="Meeting name"
								style={commonStyles.input}
							/>
							<ErrorTip style={commonStyles.error} />
						</FormGroup>
					</View>
				</View>
				<View>
					<View style={commonStyles.shadowContainer}>
						<View style={[commonStyles.shadow, commonStyles.inlineContainer]}>
							<Text style={commonStyles.inlineContainerLeft}>Total</Text>
							<Text style={commonStyles.inlineContainerTextRight}>{this.props.total}</Text>
						</View>
					</View>
					<RFASubmitButton
						loadingComponent={<ActivityIndicator size="small" color="#fff" />}
						style={commonStyles.button}
					>
						<Text style={commonStyles.buttonText}>Next</Text>
					</RFASubmitButton>
				</View>
			</Form>
		);
	}

	handleDateChange = (timestamp) => {
		if (timestamp > Date.now()) {
			validator.setModelValue("time", JSON.stringify({
				min: "08:00",
				max: "09:00"
			}));
		} else {
			validator.dropToDefaults();
		}

		this.props.onTimeChange(validator.modelValues.time);
	}

	handleTimeChange = (time) => {
		this.props.onTimeChange(JSON.stringify(time));
	}

	errorParser = (error) => error.response.data.errors;
}
