// tslint:disable no-magic-numbers
import * as React from "react";

import { FormGroup, Input, ErrorTip, Checkbox, Select, SelectProps, TextArea } from "react-formawesome";

export const InvoicingDirectionCard: React.SFC = (): JSX.Element => (
    <div className="card mb-2 full-width">
        <div className="container">
            <div className="card-header mb-1">
                <span className="card-header-title">Invoicing Direction</span>
            </div>
            <table className="table padded-rows table-bordered table-striped">
                <thead>
                    <tr className="blued uppercase">
                        <th className="w-15">Process</th>
                        <th className="w-20">Policy</th>
                        <th>Detail</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Where to Send (email address)</td>
                        <td>
                            <FormGroup
                                attribute="invoicing_where_to_send_email"
                                className="form-group"
                                validateOn="blur"
                            >
                                <div className="control-container">
                                    <Input className="form-control" />
                                </div>
                                <ErrorTip className="error-tip" />
                            </FormGroup>
                        </td>
                        <td className="pr-2">
                            <FormGroup
                                attribute="invoicing_where_to_send_email_detail"
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
                        <td>Include on Invoice</td>
                        <td>
                            <FormGroup attribute="invoicing_include_policy" className="form-group" validateOn="blur">
                                <div className="control-container">
                                    <Input className="form-control" />
                                </div>
                                <ErrorTip className="error-tip" />
                            </FormGroup>
                        </td>
                        <td className="pr-2">
                            <FormGroup attribute="invoicing_include_detail" className="form-group" validateOn="blur">
                                <div className="control-container">
                                    <TextArea className="form-control" />
                                </div>
                                <ErrorTip className="error-tip" />
                            </FormGroup>
                        </td>
                    </tr>

                    <tr>
                        <td>Invoicing Oscar Ledge Changes</td>
                        <td>
                            <FormGroup
                                attribute="invoicing_oscar_ledger_changes_policy"
                                className="form-group"
                                validateOn="blur"
                            >
                                <div className="control-container">
                                    <Input className="form-control" />
                                </div>
                                <ErrorTip className="error-tip" />
                            </FormGroup>
                        </td>
                        <td className="pr-2">
                            <FormGroup
                                attribute="invoicing_oscar_ledger_changes_detail"
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
                        <td>Payment Terms</td>
                        <td>
                            <FormGroup
                                attribute="invoicing_payment_terms_policy"
                                className="form-group"
                                validateOn="blur"
                            >
                                <div className="control-container">
                                    <div className="select-wrap">
                                        <Select
                                            className="form-control"
                                            options={getOptionsFromRange(60)}
                                        />
                                    </div>
                                </div>
                                <ErrorTip className="error-tip" />
                            </FormGroup>
                        </td>
                        <td className="pr-2">
                            <FormGroup
                                attribute="invoicing_payment_terms_detail"
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
                        <td>Direct Bill</td>
                        <td>
                            <FormGroup attribute="invoiving_direct_bill" className="form-group" validateOn="blur">
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
                                attribute="invoiving_direct_bill_detail"
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
                        <td>Night/Day</td>
                        <td>
                            <FormGroup attribute="invoicing_night_day" className="form-group" validateOn="blur">
                                <div className="control-container">
                                    <div className="form-control bb-0">
                                        <label className="switch day_night">
                                            <Checkbox values={[true, false]} />
                                            <span className="slider round" />
                                        </label>
                                    </div>
                                </div>
                                <ErrorTip className="error-tip" />
                            </FormGroup>
                        </td>
                        <td className="pr-2">
                            <FormGroup attribute="invoicing_night_day_detail" className="form-group" validateOn="blur">
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

function getOptionsFromRange(max: number): SelectProps["options"] {
    const result = [{ value: "", label: "" }];
    for (let i = 1; i <= max; i++) {
        const option = String(i);
        result.push({ value: option, label: option });
    }
    return result;
}
