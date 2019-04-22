// tslint:disable no-magic-numbers
import * as React from "react";

import { FormGroup, ErrorTip, Select, TextArea } from "react-formawesome";

import {
    SEND_POST_MOVE_IN_INSTRUCTIONS_TO,
    DEPARTURE_INSTRUCTIONS_TIMING,
    POST_ARRIVAL_TIMING,
    WELLNESS_CHECK_TIMING
} from "@constants/profileConstants";

import { getOptionsFromObject } from "../methods";

export const PostMoveInCard: React.SFC = (): JSX.Element => {
    const timingRows = [
        {
            title: "Departure Instructions",
            fieldName: "post_move_departure_instructions",
            timingOptionsObject: DEPARTURE_INSTRUCTIONS_TIMING
        },
        {
            title: "Post Arrival Call",
            fieldName: "post_move_arrival_call",
            timingOptionsObject: POST_ARRIVAL_TIMING
        },
        {
            title: "Post Arrival Email",
            fieldName: "post_move_arrival_email",
            timingOptionsObject: POST_ARRIVAL_TIMING
        },
        {
            title: "Wellness Check",
            fieldName: "post_move_wellness_check",
            timingOptionsObject: WELLNESS_CHECK_TIMING
        }
    ];
    return (
        <div className="card mb-2 full-width">
            <div className="container">
                <div className="card-header mb-1">
                    <span className="card-header-title">Post Move-In</span>
                </div>
                <table className="table padded-rows table-bordered table-striped">
                    <thead>
                        <tr className="blued uppercase">
                            <th className="w-15">Process</th>
                            <th className="w-20">To Who?</th>
                            <th className="w-20">Timing</th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timingRows.map(renderSelectRow)}

                        <tr>
                            <td>Extensions/Date Changes</td>
                            <td colSpan={3} className="pr-2">
                                <FormGroup
                                    attribute="post_move_extensions_detail"
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
                            <td>Incidental Charges</td>
                            <td colSpan={3} className="pr-2">
                                <FormGroup
                                    attribute="post_move_incidental_detail"
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
                    </tbody>
                </table>
            </div>
        </div>
    );
};

function renderSelectRow({ title, fieldName, timingOptionsObject }): JSX.Element {
    return (
        <tr key={fieldName}>
            <td>{title}</td>
            <td>
                <FormGroup
                    attribute={`${fieldName}_policy`}
                    className="form-group"
                    validateOn="blur"
                >
                    <div className="control-container">
                        <div className="select-wrap">
                            <Select
                                className="form-control"
                                options={getOptionsFromObject(SEND_POST_MOVE_IN_INSTRUCTIONS_TO)}
                            />
                        </div>
                    </div>
                    <ErrorTip className="error-tip" />
                </FormGroup>
            </td>
            <td>
                <FormGroup
                    attribute={`${fieldName}_frequency`}
                    className="form-group"
                    validateOn="blur"
                >
                    <div className="control-container">
                        <div className="select-wrap">
                            <Select
                                className="form-control"
                                options={getOptionsFromObject(timingOptionsObject)}
                            />
                        </div>
                    </div>
                    <ErrorTip className="error-tip" />
                </FormGroup>
            </td>
            <td className="pr-2">
                <FormGroup
                    attribute={`${fieldName}_direction`}
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
    );
}
