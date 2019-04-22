import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Form, FormGroup, Input, ErrorTip } from "react-native-formawesome";
import { View, Text, ActivityIndicator, StyleSheet, Image } from "react-native";

import { RFASubmitButton, RFAMaskInput } from "@components/partials/RFAElements";
import { Font, Color } from "@constants/UI";
import { Images } from "@assets/Images";

import { validateOnLength } from "../../../../customValidators/helpers/validateOnLength";
import { commonStyles } from "../commonStyles";

import { validator } from "./BookCardModel";
import { BookCardFormPropTypes } from "./BookCardFormPropTypes";

/* eslint-disable no-magic-numbers */
export class BookCardForm extends React.Component {
	static propTypes = BookCardFormPropTypes;

	componentWillUnmount() {
		validator.clear();
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
				<View style={[commonStyles.shadowContainer, { flex: 1 }]}>
					<View style={commonStyles.shadow}>
						<View style={style.cardDetailsContainer}>
							<Text style={style.cardDetails}>Card details</Text>
							<View style={style.imagesContainer}>
								<Image
									source={Images.mastercardIcon}
									resizeMode="contain"
									style={style.image}
								/>
								<Image
									source={Images.visaIcon}
									resizeMode="contain"
									style={style.image}
								/>
								<Image
									source={Images.americanExpressIcon}
									resizeMode="contain"
									style={style.image}
								/>
							</View>
						</View>
						<FormGroup
							attribute="number"
							validateOn={[validateOnLength("number", 19), "blur"]}
						>
							<RFAMaskInput
								onErrorStyles={commonStyles.inputError}
								underlineColorAndroid="transparent"
								style={commonStyles.input}

								placeholder="Card number"
								keyboardType="number-pad"
								returnKeyType="done"
								maxLength={19}

								type="credit-card"
							/>
							<ErrorTip style={commonStyles.error} />
						</FormGroup>
						<FormGroup validateOn="blur" attribute="name">
							<Input
								onErrorStyles={commonStyles.inputError}
								underlineColorAndroid="transparent"
								style={commonStyles.input}

								placeholder="Cardholder name"
							/>
							<ErrorTip style={commonStyles.error} />
						</FormGroup>
						<View style={commonStyles.inlineContainer}>
							<FormGroup
								validateOn={[validateOnLength("expiry", 5), "blur"]}
								style={{ width: "40%" }}
								attribute="expiry"
							>
								<RFAMaskInput
									onErrorStyles={commonStyles.inputError}
									underlineColorAndroid="transparent"
									style={commonStyles.input}

									keyboardType="number-pad"
									placeholder="Expiry"
									returnKeyType="done"
									maxLength={5}

									options={{ format: "MM/DD" }}
									type="datetime"
								/>
								<ErrorTip style={commonStyles.error} />
							</FormGroup>
							<FormGroup
								validateOn={[validateOnLength("cvc", 3), "blur"]}
								style={{ width: "40%" }}
								attribute="cvc"
							>
								<RFAMaskInput
									onErrorStyles={commonStyles.inputError}
									underlineColorAndroid="transparent"
									style={commonStyles.input}

									keyboardType="number-pad"
									returnKeyType="done"
									placeholder="CVC"
									maxLength={3}

									options={{ mask: "999" }}
									type="custom"
								/>
								<ErrorTip style={commonStyles.error} />
							</FormGroup>
						</View>
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
						<Text style={commonStyles.buttonText}>Pay</Text>
					</RFASubmitButton>
					<Text style={style.secure}>
						<Ionicons name="md-lock" size={Font.size.m} color={Color.gray} />&nbsp;
						This is a secure payment with <Text style={style.secureBold}>stripe</Text>
					</Text>
				</View>
			</Form>
		);
	}

	errorParser = (error) => error.response.data.errors;
}

const style = StyleSheet.create({
	cardDetails: {
		fontSize: Font.size.m,
		fontFamily: Font.type.medium,

		marginTop: 5,
		marginBottom: 5
	},
	imagesContainer: {
		flexDirection: "row"
	},
	cardDetailsContainer: {
		justifyContent: "space-between",
		alignItems: "stretch",

		flexDirection: "row",
		flexWrap: "wrap"
	},
	image: {
		width: 30,
		height: 30,

		marginLeft: 5,
		marginRight: 5
	},
	secure: {
		textAlign: "center",

		marginBottom: 40,

		fontSize: Font.size.s,
		fontFamily: Font.type.medium,

		color: Color.gray
	},
	secureBold: {
		fontSize: Font.size.s,
		fontFamily: Font.type.extraBold,

		color: Color.gray
	}
});
