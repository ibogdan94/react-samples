// tslint:disable no-magic-numbers
import * as React from "react";

import { FormGroup, ErrorTip, Select, TextArea } from "react-formawesome";

import {
    SEND_OPTIONS_TO,
    NUMBER_OF_OPTIONS_TO_SEND,
    OPTION_FILTERING_OPTIONS,
    OPTION_FOLLOW_UP
} from "@constants/profileConstants";

import { getOptionsFromObject } from "../methods";

export const OptionsHandlingCardTable: React.SFC = (): JSX.Element => (
    <table className="table padded-rows table-bordered table-striped">
        <thead>
            <tr className="blued uppercase">
                <th className="w-25">Process</th>
                <th className="w-25">Policy</th>
                <th className="w-50">Detail</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Send Opts to</td>
                <td>
                    <FormGroup attribute="option_handling_send_opts" className="form-group" validateOn="blur">
                        <div className="control-container">
                            <div className="select-wrap">
                                <Select
                                    className="form-control"
                                    options={getOptionsFromObject(SEND_OPTIONS_TO)}
                                />
                            </div>
                        </div>
                        <ErrorTip className="error-tip" />
                    </FormGroup>
                </td>
                <td className="pr-2">
                    <FormGroup attribute="option_handling_send_opts_detail" className="form-group" validateOn="blur">
                        <div className="control-container">
                            <TextArea className="form-control" />
                        </div>
                        <ErrorTip className="error-tip" />
                    </FormGroup>
                </td>
            </tr>

            <tr>
                <td>No. of Opts to Send</td>
                <td>
                    <FormGroup attribute="option_handling_number_of_options" className="form-group" validateOn="blur">
                        <div className="control-container">
                            <div className="select-wrap">
                                <Select
                                    className="form-control"
                                    options={getOptionsFromObject(NUMBER_OF_OPTIONS_TO_SEND)}
                                />
                            </div>
                        </div>
                        <ErrorTip className="error-tip" />
                    </FormGroup>
                </td>
                <td className="pr-2">
                    <FormGroup
                        attribute="option_handling_number_of_options_detail"
                        className="form-group"
                        validateOn="blur"
                    >
                        <div className="control-container">
                            <TextArea className="form-control" />
                        </div>
                        <ErrorTip className="error-tip" />
                    </FormGroup>
                </td>
            </tr>

            <tr>
                <td>Option Filtering</td>
                <td>
                    <FormGroup
                        attribute="option_handling_option_filtering_policy"
                        className="form-group"
                        validateOn="blur"
                    >
                        <div className="control-container">
                            <div className="select-wrap">
                                <Select
                                    className="form-control"
                                    options={getOptionsFromObject(OPTION_FILTERING_OPTIONS)}
                                />
                            </div>
                        </div>
                        <ErrorTip className="error-tip" />
                    </FormGroup>
                </td>
                <td className="pr-2">
                    <FormGroup
                        attribute="option_handling_option_filtering_detail"
                        className="form-group"
                        validateOn="blur"
                    >
                        <div className="control-container">
                            <TextArea className="form-control" />
                        </div>
                        <ErrorTip className="error-tip" />
                    </FormGroup>
                </td>
            </tr>

            <tr>
                <td>Text to include in Opt Sheet - Opening message</td>
                <td colSpan={2} className="pr-2">
                    <FormGroup
                        attribute="option_handling_text_to_include_detail"
                        className="form-group"
                        validateOn="blur"
                    >
                        <div className="control-container">
                            <TextArea className="form-control" />
                        </div>
                        <ErrorTip className="error-tip" />
                    </FormGroup>
                </td>
            </tr>

            <tr>
                <td>Text to include on Opt Sheet email messages</td>
                <td colSpan={2} className="pr-2">
                    <FormGroup
                        attribute="option_handling_text_to_include_detail_email"
                        className="form-group"
                        validateOn="blur"
                    >
                        <div className="control-container">
                            <TextArea className="form-control" />
                        </div>
                        <ErrorTip className="error-tip" />
                    </FormGroup>
                </td>
            </tr>

            <tr>
                <td>Option Follow-Up</td>
                <td>
                    <FormGroup attribute="option_handling_follow_up" className="form-group" validateOn="blur">
                        <div className="control-container">
                            <div className="select-wrap">
                                <Select
                                    className="form-control"
                                    options={getOptionsFromObject(OPTION_FOLLOW_UP)}
                                />
                            </div>
                        </div>
                        <ErrorTip className="error-tip" />
                    </FormGroup>
                </td>
                <td className="pr-2">
                    <FormGroup
                        attribute="option_handling_follow_up_detail"
                        className="form-group"
                        validateOn="blur"
                    >
                        <div className="control-container">
                            <TextArea className="form-control" />
                        </div>
                        <ErrorTip className="error-tip" />
                    </FormGroup>
                </td>
            </tr>

            <tr>
                <td>Option Special Handling Notes</td>
                <td colSpan={2} className="pr-2">
                    <FormGroup attribute="option_special_handlings" className="form-group" validateOn="blur">
                        <div className="control-container">
                            <TextArea className="form-control" />
                        </div>
                        <ErrorTip className="error-tip" />
                    </FormGroup>
                </td>
            </tr>
        </tbody>
    </table>
);
