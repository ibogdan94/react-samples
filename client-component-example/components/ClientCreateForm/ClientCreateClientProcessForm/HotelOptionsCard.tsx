// tslint:disable no-magic-numbers
import * as React from "react";

import { FormGroup, ErrorTip, Checkbox, Select, TextArea } from "react-formawesome";
import { NUMBER_OF_HOTEL_OPTIONS } from "@constants/profileConstants";

import { getOptionsFromObject } from "../methods";

export const HotelOptionsCard: React.SFC = (): JSX.Element => (
    <div className="card mb-2 full-width">
        <div className="container">
            <div className="card-header mb-1">
                <span className="card-header-title">Hotel Options</span>
            </div>
            <table className="table padded-rows table-striped table-bordered">
                <thead>
                    <tr className="blued uppercase">
                        <th className="w-15">Hotel Process</th>
                        <th className="w-10">Policy</th>
                        <th className="w-20"># of Opt.</th>
                        <th className="w-55">Detail</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Hotels Opts Allowed</td>
                        <td>
                            <FormGroup attribute="hotel_opts_allowed" className="form-group" validateOn="blur">
                                <div className="control-container">
                                    <div className="form-control bb-0">
                                        <label className="switch">
                                            <Checkbox values={[true, false]} />
                                            <span className="slider round" />
                                        </label>
                                    </div>
                                </div>
                            </FormGroup>
                        </td>
                        <td>
                            <FormGroup attribute="hotel_opts_allowed_policy" className="form-group" validateOn="blur">
                                <div className="control-container">
                                    <div className="select-wrap">
                                        <Select
                                            className="form-control"
                                            options={getOptionsFromObject(NUMBER_OF_HOTEL_OPTIONS)}
                                        />
                                    </div>
                                </div>
                                <ErrorTip className="error-tip" />
                            </FormGroup>
                        </td>
                        <td className="pr-2">
                            <FormGroup
                                attribute="hotel_opts_allowed_policy_detail"
                                className="form-group"
                                validateOn="blur"
                            >
                                <div className="control-container">
                                    <TextArea className="form-control" rows={3} />
                                </div>
                                <ErrorTip className="error-tip" />
                            </FormGroup>
                        </td>
                    </tr>

                    <tr>
                        <td>Hotel Special Handling Notes</td>
                        <td colSpan={3} className="pr-2">
                            <FormGroup
                                attribute="hotel_special_handling_detail"
                                className="form-group"
                                validateOn="blur"
                            >
                                <div className="control-container">
                                    <TextArea className="form-control" rows={3} />
                                </div>
                            </FormGroup>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);
