import * as React from "react";

import { FormGroup, ErrorTip, Checkbox, Select, TextArea } from "react-formawesome";

import { SEND_ARRIVAL_INSTRUCTIONS_TO, PRE_ARRIVAL_CALL, MOBILE_APP } from "@constants/profileConstants";

import { getOptionsFromObject } from "../methods";

export const ArrivalInstructionsCard: React.SFC = (): JSX.Element => (
    <div className="card mb-2 full-width">
        <div className="container">
            <div className="card-header mb-1">
                <span className="card-header-title">Arrival Instructions</span>
            </div>
            <table className="table padded-rows table-bordered table-striped">
                <thead>
                    <tr className="blued uppercase">
                        <th className="w-15">Process</th>
                        <th className="w-20">Policy / To Who?</th>
                        <th>Detail</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Send Arrival Instructions to</td>
                        <td>
                            <FormGroup attribute="arrival_send_to_policy" className="form-group" validateOn="blur">
                                <div className="control-container">
                                    <div className="select-wrap">
                                        <Select
                                            className="form-control"
                                            options={getOptionsFromObject(SEND_ARRIVAL_INSTRUCTIONS_TO)}
                                        />
                                    </div>
                                </div>
                                <ErrorTip className="error-tip" />
                            </FormGroup>
                        </td>
                        <td className="pr-2">
                            <FormGroup attribute="arrival_send_to_detail" className="form-group" validateOn="blur">
                                <div className="control-container">
                                    <TextArea className="form-control" />
                                </div>
                                <ErrorTip className="error-tip" />
                            </FormGroup>
                        </td>
                    </tr>

                    <tr>
                        <td>Text Arrival Instructions</td>
                        <td>
                            <FormGroup attribute="arrival_text_instructions" className="form-group" validateOn="blur">
                                <div className="control-container">
                                    <div className="form-control bb-0">
                                        <label className="switch">
                                            <Checkbox values={[true, false]} />
                                            <span className="slider round" />
                                        </label>
                                    </div>
                                </div>
                                <ErrorTip className="error-tip" />
                            </FormGroup>
                        </td>
                        <td className="pr-2">
                            <FormGroup
                                attribute="arrival_text_instructions_detail"
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
                        <td>Pre-Arrival Call</td>
                        <td>
                            <FormGroup attribute="prearrival_call_policy" className="form-group" validateOn="blur">
                                <div className="control-container">
                                    <div className="select-wrap">
                                        <Select
                                            className="form-control"
                                            options={getOptionsFromObject(PRE_ARRIVAL_CALL)}
                                        />
                                    </div>
                                </div>
                                <ErrorTip className="error-tip" />
                            </FormGroup>
                        </td>
                        <td className="pr-2">
                            <FormGroup attribute="prearrival_call_direction" className="form-group" validateOn="blur">
                                <div className="control-container">
                                    <TextArea className="form-control" />
                                </div>
                                <ErrorTip className="error-tip" />
                            </FormGroup>
                        </td>
                    </tr>

                    <tr>
                        <td>Mobile App</td>
                        <td>
                            <FormGroup attribute="arrival_mobile_policy" className="form-group" validateOn="blur">
                                <div className="control-container">
                                    <div className="select-wrap">
                                        <Select
                                            className="form-control"
                                            options={getOptionsFromObject(MOBILE_APP)}
                                        />
                                    </div>
                                </div>
                                <ErrorTip className="error-tip" />
                            </FormGroup>
                        </td>
                        <td className="pr-2">
                            <FormGroup attribute="arrival_mobile_details" className="form-group" validateOn="blur">
                                <div className="control-container">
                                    <TextArea className="form-control" />
                                </div>
                                <ErrorTip className="error-tip" />
                            </FormGroup>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);
