// tslint:disable no-magic-numbers
import * as React from "react";

import { FormGroup, ErrorTip, Checkbox, Select, SelectProps } from "react-formawesome";

import { SENDING_OPTIONS, OPT_GENERATION_OPTIONS, PRICING_DIRECTION_OPTIONS } from "@constants/profileConstants";

import { ConditionalRender } from "@helpers/conditionalRender";

import { OptionsHandlingCardTable } from "./OptionsHandlingCardTable";

import { getOptionsFromObject } from "../methods";

export const OptionsHandlingCard: React.SFC<{ isUsingCustomForm: boolean, setFormUsage: (formName: string) => void }> =
    (props: { isUsingCustomForm: boolean, setFormUsage: (formName: string) => void }): JSX.Element => {
        function handleSetFormUsage(formName: string): any {
            return (): any => props.setFormUsage(formName);
        }

        function renderFormCheckbox(attribute: string, label: string): JSX.Element {
            return renderCheckboxGroup(attribute, label, false, handleSetFormUsage(attribute));
        }

        return (
            <div className="card mb-2 full-width">
                <div className="container">
                    <div className="card-header mb-1">
                        <span className="card-header-title">Options Handling / Sourcing</span>
                    </div>
                    <div className="card-header-sm mb-2 ml-1">
                        <span className="card-header-title">Option Form</span>
                    </div>

                    <div className="flex-row">
                        <div className="flex-row-item ml-2">
                            {renderFormCheckbox("option_handling_std_form", "Use NTH Standard Form")}
                            {renderFormCheckbox("option_handling_custom_form", "Use NTH Customized Form")}
                            <ConditionalRender condition={props.isUsingCustomForm}>
                                {renderCustomizedFormOptions()}
                            </ConditionalRender>
                        </div>

                        <div className="flex-row-item">
                            {renderFormCheckbox("option_handling_client_dir_form", "Use Client Directed Form")}
                            {renderFormCheckbox("option_handling_no_form", "Use Option Email Only (No Form)")}
                        </div>

                        <div className="flex-row-item flex-double">
                            <FormGroup className="form-group" attribute="option_handling_hours_to_send_domestic" >
                                <div className="control-container">
                                    <label className="form-label">Hours to Send Opts (Domestic)</label>
                                    <div className="select-wrap">
                                        <Select className="form-control" options={businessHoursAsOptions(5)} />
                                    </div>
                                </div>
                                <ErrorTip className="error-tip" />
                            </FormGroup>
                            <FormGroup className="form-group" attribute="option_handling_hours_to_send_international" >
                                <div className="control-container">
                                    <label className="form-label">Hours to Send Opts (International)</label>
                                    <div className="select-wrap">
                                        <Select className="form-control" options={businessHoursAsOptions(24)} />
                                    </div>
                                </div>
                                <ErrorTip className="error-tip" />
                            </FormGroup>

                            <FormGroup className="form-group" attribute="option_handling_sending" >
                                <div className="control-container">
                                    <label className="form-label">Opt Sending</label>
                                    <div className="select-wrap">
                                        <Select
                                            className="form-control"
                                            options={getOptionsFromObject(SENDING_OPTIONS)}
                                        />
                                    </div>
                                </div>
                                <ErrorTip className="error-tip" />
                            </FormGroup>

                            <FormGroup className="form-group" attribute="option_handling_opt_generation" >
                                <div className="control-container">
                                    <label className="form-label">Opt Generation</label>
                                    <div className="select-wrap">
                                        <Select
                                            className="form-control"
                                            options={getOptionsFromObject(OPT_GENERATION_OPTIONS)}
                                        />
                                    </div>
                                </div>
                                <ErrorTip className="error-tip" />
                            </FormGroup>

                            <FormGroup className="form-group" attribute="option_handling_pricing_direction" >
                                <div className="control-container">
                                    <label className="form-label">Pricing Direction</label>
                                    <div className="select-wrap">
                                        <Select
                                            className="form-control"
                                            options={getOptionsFromObject(PRICING_DIRECTION_OPTIONS)}
                                        />
                                    </div>
                                </div>
                                <ErrorTip className="error-tip" />
                            </FormGroup>
                        </div>
                    </div>
                    <OptionsHandlingCardTable />
                </div>
            </div>
        );
    };

function businessHoursAsOptions(max: number): SelectProps["options"] {
    const result = [{ value: "", label: "" }];
    for (let i = 1; i <= max; i++) {
        const option = `${i} Business Hours Destination Location`;
        result.push({
            value: option,
            label: option
        });
    }
    return result;
}

function renderCustomizedFormOptions(): JSX.Element {
    return (
        <div className="pl-1">
            {renderCheckboxGroup("option_handling_use_client_logo", "Use Client Logo", true)}
            {renderCheckboxGroup("option_handling_cover_email", "Cover Email", true)}
            {renderCheckboxGroup("option_handling_remove_nomad_phone", "Remove Nomad Phone No.", true)}
            {renderCheckboxGroup("option_handling_powered_by_nomad", "Remove Powered by Nomad", true)}
        </div>
    );
}

function renderCheckboxGroup(attribute: string, label: string, reverse: boolean, handler?: () => void): JSX.Element {
    let checkboxContainer: JSX.Element;

    if (reverse) {
        checkboxContainer = (
            <div className="control-container">
                <div className="p-5-px bb-0">
                    <Checkbox id={attribute} values={[true, false]} onChange={handler} />
                </div>
                <label className="form-label" htmlFor={attribute}>
                    {label}
                </label>
            </div>
        );
    } else {
        checkboxContainer = (
            <div className="control-container">
                <label className="form-label" htmlFor={attribute}>
                    {label}
                </label>
                <div className="form-control checkbox-container bb-0">
                    <Checkbox id={attribute} values={[true, false]} onChange={handler} />
                </div>
            </div>
        );
    }

    return (
        <FormGroup className="form-group" attribute={attribute}>
            {checkboxContainer}
            <ErrorTip className="error-tip" />
        </FormGroup>
    );
}
