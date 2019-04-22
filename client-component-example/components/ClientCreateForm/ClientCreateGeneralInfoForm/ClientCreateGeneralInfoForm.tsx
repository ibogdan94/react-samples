import * as React from "react";

import { Form, FormGroup, Input, SubmitButton, ErrorTip, Select } from "react-formawesome";

import { formErrorParser } from "@helpers/formErrorParser";

import { Loader } from "@components/partials";

import { ClientCreateGeneralInfoFormProps } from "./ClientCreateGeneralInfoFormProps";
import { ClientCreateFormContactCard } from "../ClientCreateContactCard/ClientCreateFormContactCard";

export const ClientCreateGeneralInfoForm: React.SFC<ClientCreateGeneralInfoFormProps> =
    (props: ClientCreateGeneralInfoFormProps): JSX.Element => (
        <Form
            className="form"
            validator={props.validator}
            errorParser={formErrorParser}
            onSubmit={props.onSubmit}
        >
            <div className="card mb-2 full-width">
                <div className="card-header">
                    <span className="card-header-title">Company Info</span>
                </div>
                <div className="container">
                    <div className="flex-row">
                        <div className="flex-row-item">
                            <FormGroup attribute="name" className="form-group" validateOn="blur">
                                <div className="control-container">
                                    <label className="form-label">Company Name</label>
                                    <Input className="form-control" />
                                </div>
                                <ErrorTip className="error-tip" />
                            </FormGroup>

                            <FormGroup attribute="address" className="form-group" validateOn="blur">
                                <div className="control-container">
                                    <label className="form-label">Street Address</label>
                                    <Input className="form-control" />
                                </div>
                                <ErrorTip className="error-tip" />
                            </FormGroup>

                            <FormGroup attribute="city" className="form-group" validateOn="blur">
                                <div className="control-container">
                                    <label className="form-label">City</label>
                                    <Input className="form-control" />
                                </div>
                                <ErrorTip className="error-tip" />
                            </FormGroup>

                            <FormGroup attribute="state" className="form-group" validateOn="blur">
                                <div className="control-container">
                                    <label className="form-label">State</label>
                                    <Input className="form-control" />
                                </div>
                                <ErrorTip className="error-tip" />
                            </FormGroup>

                            <FormGroup attribute="zip" className="form-group" validateOn="blur">
                                <div className="control-container">
                                    <label className="form-label">Zip</label>
                                    <Input className="form-control" />
                                </div>
                                <ErrorTip className="error-tip" />
                            </FormGroup>

                            <FormGroup attribute="country" className="form-group" validateOn="blur">
                                <div className="control-container">
                                    <label className="form-label">Country</label>
                                    <Input className="form-control" />
                                </div>
                                <ErrorTip className="error-tip" />
                            </FormGroup>

                            <FormGroup attribute="phone" className="form-group" validateOn="blur">
                                <div className="control-container">
                                    <label className="form-label">Phone Number</label>
                                    <Input className="form-control" />
                                </div>
                                <ErrorTip className="error-tip" />
                            </FormGroup>
                        </div>

                        <div className="flex-row-item">
                            <FormGroup attribute="email" className="form-group" validateOn="blur">
                                <div className="control-container">
                                    <label className="form-label">Email</label>
                                    <Input className="form-control" />
                                </div>
                                <ErrorTip className="error-tip" />
                            </FormGroup>

                            <FormGroup attribute="website" className="form-group" validateOn="blur">
                                <div className="control-container">
                                    <label className="form-label">Website</label>
                                    <Input className="form-control" />
                                </div>
                                <ErrorTip className="error-tip" />
                            </FormGroup>

                            <FormGroup className="form-group" attribute="team_id" >
                                <div className="control-container">
                                    <label className="form-label">Assigned Team</label>
                                    <div className="select-wrap">
                                        <Select className="form-control" options={props.teamsAsOptions} />
                                    </div>
                                </div>
                                <ErrorTip className="error-tip" />
                            </FormGroup>

                            <FormGroup className="form-group" attribute="client_relations_manager_id" >
                                <div className="control-container">
                                    <label className="form-label">Client Relations Manager</label>
                                    <div className="select-wrap">
                                        <Select className="form-control" options={props.usersAsOptions} />
                                    </div>
                                </div>
                                <ErrorTip className="error-tip" />
                            </FormGroup>

                            <FormGroup className="form-group" attribute="description" validateOn="blur">
                                <div className="control-container">
                                    <label className="form-label">Description</label>
                                    <Input className="form-control" />
                                </div>
                                <ErrorTip className="error-tip" />
                            </FormGroup>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card mb-2 full-width">
                <div className="card-header">
                    <span className="card-header-title">Contacts</span>
                </div>
                <div className="container">
                    <div className="flex-row flex-row-wrap">
                        <div className="flex-row-item">
                            <ClientCreateFormContactCard prefix="contact_primary" title="Primary Contact" />
                        </div>
                        <div className="flex-row-item">
                            <ClientCreateFormContactCard prefix="contact_secondary" title="Secondary Contact" />
                        </div>
                        <div className="flex-row-item">
                            <ClientCreateFormContactCard prefix="contact_secondary_2" title="Alternative Contact" />
                        </div>
                        <div className="flex-row-item">
                            <ClientCreateFormContactCard prefix="contact_accounting" title="Accounting Contact" />
                        </div>
                        <div className="flex-row-item">
                            <ClientCreateFormContactCard prefix="contact_invoices" title="Invoices Contact" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button
                    className="flex-row-item button button-red button-submit"
                    onClick={props.onCloseModal}
                >
                    <span>Close</span>
                </button>
                <SubmitButton
                    loadingComponent={<Loader />}
                    className="flex-row-item button button-blue button-submit ml-1"
                >
                    <span>Save</span>
                </SubmitButton>
            </div>
        </Form>
);
