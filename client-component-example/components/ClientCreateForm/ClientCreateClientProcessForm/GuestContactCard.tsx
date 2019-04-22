import * as React from "react";

import { FormGroup, ErrorTip, Checkbox, TextArea } from "react-formawesome";

import { GUEST_CONTACT_CHECKBOX_FIELDS } from "@constants/profileConstants";

export const GuestContactCard: React.SFC = (): JSX.Element => (
    <div className="card mb-2 full-width">
        <div className="container">
            <div className="flex-row">
                <div className="flex-row-item">
                    <div className="card-header mb-0">
                        <span className="card-header-title">Guest Contact</span>
                    </div>

                    <FormGroup className="form-group mr-3" attribute="guest_contact_policy" >
                        <div className="control-container">
                            <div className="select-wrap">
                                <select name="" id="" className="form-control" >
                                    <option />
                                    <option value="None">None</option>
                                    <option value="Partial">Partial</option>
                                    <option value="Full">Full</option>
                                </select>
                            </div>
                        </div>
                        <ErrorTip className="error-tip" />
                    </FormGroup>

                    <div className="flex-row">
                        <div className="flex-row-item mr-3">
                            {renderGuestContactColumn(0)}
                        </div>

                        <div className="flex-row-item mr-3">
                            {renderGuestContactColumn(1)}
                        </div>
                    </div>

                    <FormGroup className="form-group" attribute="guest_contact_detail" validateOn="blur">
                        <div className="control-container">
                            <TextArea className="form-control" />
                        </div>
                        <ErrorTip className="error-tip" />
                    </FormGroup>
                </div>

                <div className="flex-row-item">
                    <div className="card-header mb-0">
                        <span className="card-header-title">Client Portal?</span>
                    </div>
                    <FormGroup className="form-group" attribute="client_portal_policy">
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

                    <FormGroup className="form-group" attribute="client_portal_detail" validateOn="blur">
                        <div className="control-container">
                            <TextArea className="form-control" />
                        </div>
                        <ErrorTip className="error-tip" />
                    </FormGroup>

                    <div className="card-header mb-0 mt-2">
                        <span className="card-header-title">Needs Assessment?</span>
                    </div>
                    <FormGroup className="form-group" attribute="client_needs_assessment">
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
                    <FormGroup
                        className="form-group"
                        attribute="client_needs_assessment_detail"
                        validateOn="blur"
                    >
                        <div className="control-container">
                            <TextArea className="form-control" />
                        </div>
                        <ErrorTip className="error-tip" />
                    </FormGroup>
                </div>
            </div>
        </div>
    </div>
);

function renderGuestContactColumn(index: number): React.ReactNode {
    return Object.keys(GUEST_CONTACT_CHECKBOX_FIELDS[index]).map((key) => {
        return (
            <FormGroup key={key} className="form-group" attribute={key}>
                <div className="control-container">
                    <label className="form-label" htmlFor={key}>{GUEST_CONTACT_CHECKBOX_FIELDS[index][key]}</label>
                    <div className="form-control checkbox-container bb-0">
                        <Checkbox id={key} values={[true, false]} />
                    </div>
                </div>
                <ErrorTip className="error-tip" />
            </FormGroup>
        );
    });
}
