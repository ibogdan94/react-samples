import Axios from "axios";
import * as React from "react";
import PropTypes from "prop-types";
import { Toaster } from "react-native-toastboard";
import Touchable from "react-native-platform-touchable";
import { ActivityIndicator, Text, View, Image } from "react-native";
import { Form, FormGroup, ErrorTip, Input } from "react-native-formawesome";

import { RFADateSelector, RFATimeRangeSelector, RFASubmitButton } from "@components/partials/RFAElements";
import { addViewingToSchedule } from "@statelessActions";
import { Images } from "@assets/Images";

import { DateManager } from "@utils/DateManager";

import { validator } from "./ScheduleViewingModel";
import { styles } from "./styles";

export class ScheduleViewingForm extends React.Component {
	static propTypes = {
		id: PropTypes.number.isRequired,
		onPressDone: PropTypes.func.isRequired,

		prefilledPhone: PropTypes.string
	};

	cancelToken = Axios.CancelToken.source();
	state = {
		isSent: false
	};

	constructor(props) {
		super(props);

		const currentHours = (new Date()).getUTCHours();

		const MAX_HOURS = 19;
		const MIN_HOURS = 8;

		let defaultMinHours;
		if (currentHours < MIN_HOURS) {
			defaultMinHours = MIN_HOURS;
		} else if (currentHours + 1 > MAX_HOURS) {
			defaultMinHours = MAX_HOURS;
		} else {
			defaultMinHours = currentHours + 1;
		}

		validator.setDefaults({
			date: Date.now(),
			time: JSON.stringify({
				min: `${String(defaultMinHours).padStart(2, "0")}:00`
			}),
			phone: props.prefilledPhone
		});
		validator.dropToDefaults();
	}

	componentWillUnmount() {
		this.cancelToken.cancel();
		validator.clear();
		validator.dropToDefaults();
	}

	render() {
		if (this.state.isSent) {
			return (
				<View style={{ flex: 1, justifyContent: "space-between" }}>
					<View style={[styles.shadowContainer, { paddingLeft: 7, paddingRight: 7 }]}>
						<View style={styles.shadow}>
							<View styles={styles.doneContainer}>
								<Image
									resizeMode="contain"
									style={styles.doneImage}
									source={Images.viewingRequestIcon}
								/>
								<Text style={styles.doneTitle}>Viewing request sent!</Text>
								<Text style={styles.doneInfo}>We will get back to you soon.</Text>
							</View>
						</View>
					</View>
					<Touchable style={styles.button} onPress={this.props.onPressDone}>
						<Text style={styles.text}>Done</Text>
					</Touchable>
				</View>
			);
		}

		return (
			<Form
				errorParser={this.errorParser}
				onSubmit={this.handleSubmit}
				validator={validator}
				style={{ flex: 1 }}
			>
				<View style={styles.shadowContainer}>
					<View style={styles.shadow}>
						<FormGroup attribute="date">
							<RFADateSelector onChange={this.handleDateChange} label="Date" />
						</FormGroup>
						<View style={styles.separatorHorizontal} />
						<FormGroup style={{ marginBottom: 5 }} attribute="time">
							<RFATimeRangeSelector
								label="Time"
								headerTitle="Viewing time"
								currentDate={validator.modelValues.date}
							/>
						</FormGroup>

						{/* Display errors from server */}
						<FormGroup attribute="startTime">
							<ErrorTip style={styles.error} />
						</FormGroup>
						<FormGroup attribute="endTime">
							<ErrorTip style={styles.error} />
						</FormGroup>
						{/*  */}

					</View>
				</View>
				<View style={[styles.shadowContainer, { flex: 1 }]}>
					<FormGroup validateOn="blur" style={styles.shadow} attribute="phone">
						<Input
							style={styles.input}
							onErrorStyles={styles.inputError}
							underlineColorAndroid="transparent"

							placeholder="Phone number"
							keyboardType="phone-pad"
							returnKeyType="done"
							maxLength={11}
						/>
						<ErrorTip style={styles.error} />
					</FormGroup>
				</View>
				<RFASubmitButton
					loadingComponent={<ActivityIndicator size="small" color="#fff" />}
					style={styles.button}
				>
					<Text style={styles.text}>Request</Text>
				</RFASubmitButton>
			</Form>
		);
	}

	handleDateChange = (timestamp) => {
		if (timestamp > Date.now()) {
			validator.setModelValue("time", JSON.stringify({
				min: "08:00"
			}));
		} else {
			validator.dropToDefaults();
		}

		this.forceUpdate();
	}

	errorParser = (error) => error.response.data.errors;

	handleSubmit = async (modelValues) => {
		const { min, max } = JSON.parse(modelValues.time || "{}");

		const startTime = new Date(modelValues.date);
		startTime.setUTCHours(min.split(":")[0], min.split(":")[1], 0);

		let endTime;
		if (max) {
			endTime = new Date(modelValues.date);
			endTime.setUTCHours(max.split(":")[0], max.split(":")[1], 0);
		}

		const data = {
			...(endTime ? { endTime: DateManager.toUNIX(endTime.getTime()) } : {}),
			startTime: DateManager.toUNIX(startTime.getTime()),
			phone: modelValues.phone
		};

		try {
			await addViewingToSchedule(this.props.id, data, this.cancelToken.token);
		} catch (error) {
			if (Axios.isCancel(error)) {
				return;
			}

			if (error.response && error.response.data && Array.isArray(error.response.data.errors)) {
				throw error;
			}

			return Toaster.error(error);
		}
		this.setState({ isSent: true });

		return {
			cancelUpdate: true
		};
	}
}
