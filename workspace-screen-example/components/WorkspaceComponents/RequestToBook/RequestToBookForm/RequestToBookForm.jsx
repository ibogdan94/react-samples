import Axios from "axios";
import * as React from "react";
import PropTypes from "prop-types";
import {Toaster} from "react-native-toastboard";
import Touchable from "react-native-platform-touchable";
import {Form, FormGroup, Input, ErrorTip} from "react-native-formawesome";
import {ActivityIndicator, Text, Image, View, TextInput, StyleSheet, Platform} from "react-native";
import RNPickerSelect from "react-native-picker-select";

import {RFADateSelector, RFAMultiSwitcher, RFASubmitButton, RFASelect} from "@components/partials/RFAElements";
import {requestToBook} from "@statelessActions";
import {DateManager} from "@utils/DateManager";
import {Images} from "@assets/Images";

import {durationMappedOptions} from "./utils/durationMappedOptions";
import {userInputPlaceholder} from "./utils/userInputPlaceholder";

import {validator, TenantType, TenantTypeLabel} from "./RequestToBookModel";
import {styles} from "./styles";
import {DurationTypes} from "../../../../constants/API";

export class RequestToBookForm extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    duration: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onPressDone: PropTypes.func.isRequired,

    prefilledName: PropTypes.string,
    prefilledPhone: PropTypes.string,
    prefilledEmail: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.cancelToken = Axios.CancelToken.source();
    this.state = {isSent: false, units: 1};

    validator.setDefaults({
      ...validator.modelContainer.defaults,
      name: props.prefilledName,
      phone: props.prefilledPhone,
      email: props.prefilledEmail
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
        <View style={{flex: 1, justifyContent: "space-between"}}>
          <View style={[styles.shadowContainer, {paddingLeft: 7, paddingRight: 7}]}>
            <View style={styles.shadow}>
              <View styles={styles.doneContainer}>
                <Image
                  resizeMode="contain"
                  style={styles.doneImage}
                  source={Images.bookingRequestSentIcon}
                />
                <Text style={styles.doneTitle}>Booking request sent!</Text>
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
        style={{flex: 1}}
        validator={validator}
        onSubmit={this.handleSubmit}
        errorParser={this.errorParser}
      >
        <View style={styles.shadowContainer}>
          <FormGroup style={[styles.shadow, {paddingTop: 0, paddingBottom: 0}]} attribute="duration">
            <View style={styles.inlineContainer}>
              <Text style={styles.inlineContainerText}>Duration</Text>
              <RFASelect
                selectedContainerStyles={styles.selectedContainerStyles}
                optionsContainerStyles={styles.optionsContainerStyles}
                style={styles.rootSelectStyles}
                options={durationMappedOptions}
              />
            </View>
            <ErrorTip style={[styles.error, {marginBottom: 10}]}/>
          </FormGroup>
        </View>
        {
          this.props.duration === DurationTypes.monthly && this.props.type === "desk" &&
          this.renderUnitsPicker()
        }
        <View style={styles.shadowContainer}>
          <FormGroup style={styles.shadow} attribute="startTime">
            <RFADateSelector label="Start date"/>
            <ErrorTip style={[styles.error, {marginTop: 10}]}/>
          </FormGroup>
        </View>
        <View style={styles.shadowContainer}>
          <FormGroup style={styles.shadow} attribute="tenantType">
            <RFAMultiSwitcher
              onChange={() => this.forceUpdate()}
              items={Object.keys(TenantType)}
              labels={TenantTypeLabel}
            />
            <ErrorTip style={[styles.error, {marginTop: 10}]}/>
          </FormGroup>
        </View>
        <View style={styles.shadowContainer}>
          <View style={styles.shadow}>
            <FormGroup validateOn="blur" attribute="name">
              <Input
                {...this.commonInputStyles}
                placeholder={userInputPlaceholder(validator.modelValues.tenantType).name}
              />
              <ErrorTip style={styles.error}/>
            </FormGroup>
            <FormGroup validateOn="blur" attribute="email">
              <Input
                {...this.commonInputStyles}
                placeholder={userInputPlaceholder(validator.modelValues.tenantType).email}
                keyboardType="email-address"
              />
              <ErrorTip style={styles.error}/>
            </FormGroup>
            <FormGroup validateOn="blur" attribute="phone">
              <Input
                {...this.commonInputStyles}
                placeholder={userInputPlaceholder(validator.modelValues.tenantType).phone}
                keyboardType="phone-pad"
                returnKeyType="done"
                maxLength={15}
              />
              <ErrorTip style={styles.error} />
            </FormGroup>
            <FormGroup style={{position: "relative"}} validateOn="blur" attribute="information">
              <Input
                {...this.commonInputStyles}
                placeholder={userInputPlaceholder(validator.modelValues.tenantType).information}
                nativeRef={(visibleInput) => this.visibleInput = visibleInput}
                textAlignVertical="top"
                blurOnSubmit
                height={120}
                multiline
              />
              <TextInput
                style={{...StyleSheet.absoluteFillObject, color: "transparent"}}
                underlineColorAndroid="transparent"
                onFocus={this.handleDirtyHack}
                caretHidden
              />
              <ErrorTip style={styles.error} />
            </FormGroup>
          </View>
        </View>
        <RFASubmitButton
          loadingComponent={<ActivityIndicator size="small" color="#fff" />}
          style={styles.button}
        >
          <Text style={styles.text}>Send</Text>
        </RFASubmitButton>
      </Form>
    );
  }

  get commonInputStyles() {
    return {
      underlineColorAndroid: "transparent",
      onErrorStyles: styles.inputError,
      style: styles.input
    };
  }

  /*
    KeyboardAvoidingView has no effect on multiline TextInput
    https://github.com/facebook/react-native/issues/16826#issuecomment-390108973
   */
  handleDirtyHack = () => setTimeout(this.visibleInput.focus, 1000);

  errorParser = (error) => error.response.data.errors;

  renderUnitsPicker = () => {
    return (
      <View style={styles.shadowContainer}>
        <FormGroup style={[styles.shadow, {paddingTop: 0, paddingBottom: 0}]} attribute="amount">
          <View style={styles.inlineContainer}>
            <Text style={styles.inlineContainerPicker}>Amount</Text>
            <View style={styles.arrowContainer}>
              <RNPickerSelect
                placeholder={{}}
                items={this.renderUnitsPickerValues()}
                onValueChange={(value) => this.setState({units: value})}
                style={styles}
                value={this.state.units}
              />
              {
                Platform.OS === "android" &&
                <Text style={styles.amountValue}>{this.state.units}</Text>
              }
              <Image resizeMode="stretch" style={styles.arrow} source={Images.backButton}/>
            </View>
          </View>
        </FormGroup>
      </View>
    );
  };

  renderUnitsPickerValues = () => {
    const items = [];
    Array.from({length: 15}).map((x, i) => {
      i++;
      items.push({
        "label": i.toString(),
        "value": i
      });
    });
    return items;
  };

  handleSubmit = async (modelValues) => {
    const data = {
      ...modelValues,
      units: this.state.units,
      startTime: DateManager.toUNIX(modelValues.startTime)
    };

    try {
      await requestToBook(this.props.id, data, this.cancelToken.token);
    } catch (error) {
      if (Axios.isCancel(error)) {
        return;
      }
      if (error.response && error.response.data && Array.isArray(error.response.data.errors)) {
        throw error;
      }
      return Toaster.error(error);
    }
    this.setState({isSent: true});

    return {cancelUpdate: true};
  }
}