/* eslint-disable max-lines */
import Axios from "axios";
import * as React from "react";
import stripe from "stripe-client";
import { Toaster } from "react-native-toastboard";
import { STRIPE_PUBLISHABLE_KEY } from "react-native-dotenv";

import { checkBookingDates, book } from "@statelessActions";
import { NumberManager } from "@utils/NumberManager";
import { DateManager } from "@utils/DateManager";

import { BookInfoForm } from "../BookInfoForm";
import { BookCardForm } from "../BookCardForm";
import { BookCreationDone } from "../BookCreationDone";

import { BookFormControllerPropTypes } from "./BookFormControllerPropTypes";

export const BookSteps = {
	INFO: "INFO",
	CARD: "CARD",
	DONE: "DONE"
};

const stripeClient = stripe(STRIPE_PUBLISHABLE_KEY);

export class BookFormController extends React.Component {
	static propTypes = BookFormControllerPropTypes;

	state = { step: BookSteps.INFO };

	info = {};

	cancelToken = Axios.CancelToken.source();

	componentWillUnmount() {
		this.cancelToken.cancel();
	}

	render() {
		switch (this.state.step) {
			case BookSteps.INFO: {
				return (
					<BookInfoForm
						prefilledPhone={this.props.prefilledPhone}
						prefilledEmail={this.props.prefilledEmail}
						onTimeChange={this.handleTimeChange}
						onSubmit={this.handleInfoSubmit}
						total={this.total}
					/>
				);
			}
			case BookSteps.CARD: {
				return <BookCardForm total={this.total} onSubmit={this.handleCardSubmit} />;
			}
			case BookSteps.DONE: {
				return <BookCreationDone infoSummary={this.infoSummary} onPress={this.props.onDone} />;
			}
			default: {
				return null;
			}
		}
	}

	get total() {
		const { min, max } = JSON.parse(this.info.time || "{}");

		let hours = 1;
		if (max && min) {
			hours = Number(max.split(":")[0]) - Number(min.split(":")[0]);
		}

		return `£${NumberManager.abbreviate(Number(this.props.total) * hours)}`;
	}

	get infoSummary() {
		return {
			time: DateManager.parsedDateTimeFromTimestamp(this.startTime, this.endTime, { onlyTime: true }),
			date: DateManager.parsedDateFromTimestamp(this.startTime, { isFull: true })
		};
	}

	get startTime() {
		const { min } = JSON.parse(this.info.time || "{}");

		const startTime = new Date(this.info.date);
		startTime.setUTCHours(min.split(":")[0], min.split(":")[1], 0);

		return startTime;
	}

	get endTime() {
		const { max } = JSON.parse(this.info.time || "{}");

		let endTime;
		if (max) {
			endTime = new Date(this.info.date);
			endTime.setUTCHours(max.split(":")[0], max.split(":")[1], 0);
		}

		return endTime;
	}

	handleTimeChange = (time) => {
		this.info.time = time;
		this.forceUpdate();
	}

	handleInfoSubmit = async (modelValues) => {
		this.info = modelValues;

		const data = {
			...(this.endTime ? { endTime: DateManager.toUNIX(this.endTime.getTime()) } : {}),
			startTime: DateManager.toUNIX(this.startTime.getTime())
		};

		let response;
		try {
			response = await checkBookingDates(this.props.id, data, this.cancelToken.token);
		} catch (error) {
			if (Axios.isCancel(error)) {
				return;
			}

			if (error.response && error.response.data && Array.isArray(error.response.data.errors)) {
				throw error;
			}

			return Toaster.error(error);
		}

		this.cancelToken = Axios.CancelToken.source();
		if (!response.data.available) {
			throw {
				response: {
					data: {
						errors: [{
							attribute: "startTime",
							details: "Booking for selected time is booked"
						}]
					}
				}
			};
		}

		this.changeStep(BookSteps.CARD);

		return { cancelUpdate: true };
	}

	handleCardSubmit = async (modelValues) => {
		let token;
		try {
			token = await stripeClient.createToken({
				card: {
					number: modelValues.number,
					exp_month: modelValues.expiry.split("/")[0],
					exp_year: modelValues.expiry.split("/")[1],
					cvc: modelValues.cvc,
					name: modelValues.name
				}
			});
		} catch (error) {
			return Toaster.error(error);
		}

		if (token.error) {
			if (token.error.param === "exp_year" || token.error.param === "exp_month") {
				token.error.param = "expiry";
			}

			throw {
				response: {
					data: {
						errors: [{
							attribute: token.error.param,
							details: token.error.message
						}]
					}
				}
			};
		}

		const data = {
			startTime: DateManager.toUNIX(this.startTime.getTime()),
			endTime: DateManager.toUNIX(this.endTime.getTime()),
			phone: this.info.phone,
			email: this.info.email,
			name: this.info.name,
			paymentToken: token.id
		};

		try {
			await book(this.props.id, data, this.cancelToken.token);
		} catch (error) {
			if (Axios.isCancel(error)) {
				return;
			}

			if (error.response && error.response.data && Array.isArray(error.response.data.errors)) {
				throw error;
			}

			return Toaster.error(error);
		}

		this.changeStep(BookSteps.DONE);

		return { cancelUpdate: true };
	}

	changeStep = (step) => this.setState({ step });
}
