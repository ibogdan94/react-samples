// tslint:disable no-magic-numbers
import * as React from "react";

import { FormGroup, Input, ErrorTip, Checkbox, Select, TextArea } from "react-formawesome";
import { SEND_DOCUMENTS_TO, DOCUMENT_HANDLING_KEYS } from "@constants/profileConstants";
import { ConditionalRender } from "@helpers/conditionalRender";

import { getOptionsFromObject } from "../methods";
import { validator } from "./ClientCreateClientProcessModel";

export const DocumentsHandlingCard: React.SFC<{ process: any }> = (props: { process: any }): JSX.Element => {
    const tempState = [];
    if (props.process) {
        if (props.process.doc_handling_other
            || props.process.doc_handling_other_name
            || props.process.doc_handling_other_policy
            || props.process.doc_handling_other_detail) {
                tempState[0] = "";
        }
        if (props.process.doc_handling_other_2
            || props.process.doc_handling_other_name_2
            || props.process.doc_handling_other_policy_2
            || props.process.doc_handling_other_detail_2) {
                tempState[1] = "_2";
        }
    }

    const [additionalDocs, setAdditionalDocs] = React.useState(tempState);

    const handleAddDocument = (event: React.MouseEvent<HTMLButtonElement>): void => {
        if (additionalDocs[0] !== undefined) {
            setAdditionalDocs([additionalDocs[0], "_2"]);
        } else {
            setAdditionalDocs(["", additionalDocs[1]]);
        }
    };

    const handleDeleteDocument = (index: number): any => ((event: React.MouseEvent<HTMLButtonElement>): void => {
        const tempResult = [...additionalDocs];
        const key = tempResult[index];
        validator.setModelValue(`doc_handling_other${key}`, false);
        validator.setModelValue(`doc_handling_other_name${key}`, "");
        validator.setModelValue(`doc_handling_other_policy${key}`, "");
        validator.setModelValue(`doc_handling_other_detail${key}`, "");
        tempResult[index] = undefined;
        setAdditionalDocs(tempResult);
    });

    const shouldRenderAddButton = !additionalDocs || additionalDocs.length < 2 || additionalDocs.includes(undefined);

    return (
        <div className="card mb-2 full-width">
            <div className="container">
                <div className="card-header mb-1">
                    <span className="card-header-title">Document Handling</span>
                </div>
                <table className="table padded-rows table-bordered table-striped">
                    <thead>
                        <tr className="blued uppercase">
                            <th className="w-15">Document Type</th>
                            <th className="w-10">Utilize</th>
                            <th className="w-20">Sent To</th>
                            <th className="w-45">Details</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {renderDocumentHandlingTableRows(DOCUMENT_HANDLING_KEYS)}
                        {renderDocumentHandlingTableAdditionalRows(additionalDocs, handleDeleteDocument)}
                        <ConditionalRender condition={shouldRenderAddButton}>
                            <tr>
                                <td />
                                <td>
                                    <button
                                        type="button"
                                        className="link card-header-link"
                                        onClick={handleAddDocument}
                                    >
                                        + Add Other
                                    </button>
                                </td>
                                <td colSpan={3} />
                            </tr>
                        </ConditionalRender>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

function renderDocumentHandlingTableRows(schema): Array<JSX.Element> {
    return Object.keys(schema).map((key) => (
        <tr key={key}>
            <td>{schema[key]}</td>
            <td>
                <FormGroup attribute={`doc_handling_${key}`} className="form-group" validateOn="blur">
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
                <FormGroup attribute={`doc_handling_${key}_policy`} className="form-group" validateOn="blur">
                    <div className="control-container">
                        <div className="select-wrap">
                            <Select
                                className="form-control"
                                options={getOptionsFromObject(SEND_DOCUMENTS_TO)}
                            />
                        </div>
                    </div>
                    <ErrorTip className="error-tip" />
                </FormGroup>
            </td>
            <td colSpan={2} className="pr-2">
                <FormGroup attribute={`doc_handling_${key}_detail`} className="form-group" validateOn="blur">
                    <div className="control-container">
                        <TextArea className="form-control" />
                    </div>
                    <ErrorTip className="error-tip" />
                </FormGroup>
            </td>
        </tr>
    ));
}

function renderDocumentHandlingTableAdditionalRows(otherDocs: Array<string>, handleDeleteDocument): Array<JSX.Element> {
    return otherDocs.map((key, index) => {
        if (key === undefined) {
            return null;
        }
        return (
            <tr key={key}>
                <td>
                    <FormGroup attribute={`doc_handling_other_name${key}`} className="form-group" validateOn="blur">
                        <div className="control-container">
                            <Input className="form-control" />
                        </div>
                        <ErrorTip className="error-tip" />
                    </FormGroup>
                </td>
                <td>
                    <FormGroup attribute={`doc_handling_other${key}`} className="form-group" validateOn="blur">
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
                    <FormGroup
                        attribute={`doc_handling_other_policy${key}`}
                        className="form-group"
                        validateOn="blur"
                    >
                        <div className="control-container">
                            <div className="select-wrap">
                                <Select
                                    className="form-control"
                                    options={getOptionsFromObject(SEND_DOCUMENTS_TO)}
                                />
                            </div>
                        </div>
                        <ErrorTip className="error-tip" />
                    </FormGroup>
                </td>
                <td className="pr-2">
                    <FormGroup
                        attribute={`doc_handling_other_detail${key}`}
                        className="form-group"
                        validateOn="blur"
                    >
                        <div className="control-container">
                            <TextArea className="form-control" />
                        </div>
                        <ErrorTip className="error-tip" />
                    </FormGroup>
                </td>
                <td>
                    <div className="row-delete">
                        <button type="button" className="keep-color" onClick={handleDeleteDocument(index)} >
                            <i className="far fa-times-circle" />
                        </button>
                    </div>
                </td>
            </tr>
        );
    });
}
