// tslint:disable no-magic-numbers
import * as React from "react";

import { FormGroup, Input, ErrorTip, Checkbox, Select, SelectProps, TextArea } from "react-formawesome";
import { SENDING_OPTIONS, OPT_GENERATION_OPTIONS, PRICING_DIRECTION_OPTIONS } from "@constants/profileConstants";
import { withEmptyOption } from "@helpers/withEmptyOption";
import { OptionsHandlingCardTable } from "./OptionsHandlingCardTable";

export const HousingRequestHandlingCard: React.SFC = (): JSX.Element => (
    <div className="card mb-2 full-width">
        <div className="container">
            <div className="card-header mb-1">
                <span className="card-header-title">Housing Request Handling</span>
            </div>
            <div className="flex-row">
                <div className="flex-row-item mr-3">
                    <FormGroup attribute="counselor_title" className="form-group" validateOn="blur">
                        <div className="control-container">
                            <label className="form-label">Counselor Title</label>
                            <Input className="form-control" />
                        </div>
                        <ErrorTip className="error-tip" />
                    </FormGroup>

                    <FormGroup attribute="americas_email" className="form-group" validateOn="blur">
                        <div className="control-container">
                            <label className="form-label">Americas Housing Requests Email</label>
                            <Input className="form-control" />
                        </div>
                        <ErrorTip className="error-tip" />
                    </FormGroup>

                    <FormGroup attribute="emea_email" className="form-group" validateOn="blur">
                        <div className="control-container">
                            <label className="form-label">EMEA Housing Requests Email</label>
                            <Input className="form-control" />
                        </div>
                        <ErrorTip className="error-tip" />
                    </FormGroup>

                    <FormGroup attribute="apac_email" className="form-group" validateOn="blur">
                        <div className="control-container">
                            <label className="form-label">APAC Housing Requests Email</label>
                            <Input className="form-control" />
                        </div>
                        <ErrorTip className="error-tip" />
                    </FormGroup>
                </div>

                <div className="flex-row-item">
                    <FormGroup attribute="request_handling_detail" className="form-group" validateOn="blur">
                        <div className="control-container">
                            <TextArea className="form-control" rows={6} />
                        </div>
                        <ErrorTip className="error-tip" />
                    </FormGroup>
                </div>
            </div>
        </div>
    </div>
);
