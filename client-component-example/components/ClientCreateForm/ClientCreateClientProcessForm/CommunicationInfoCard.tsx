import * as React from "react";

import * as PropTypes from "prop-types";

import { OptionHandlers, OptionHandlersPropTypes } from "../ClientCreateFormProps";

export interface CommunicationInfo {
    subject?: string;
    detail?: string;
}

export interface CommunicationInfoCardProps {
    optionHandlers: OptionHandlers;
    communicationInfo: Array<CommunicationInfo>;
}

export const CommunicationInfoPropTypes: PropTypes.ValidationMap<CommunicationInfo> = {
    subject: PropTypes.string,
    detail: PropTypes.string
};

export const CommunicationInfoCardPropTypes: { [P in keyof CommunicationInfoCardProps]: PropTypes.Validator<any> } = {
    optionHandlers: PropTypes.shape(OptionHandlersPropTypes).isRequired,
    communicationInfo: PropTypes.arrayOf(PropTypes.shape(CommunicationInfoPropTypes)).isRequired,
};

export const CommunicationInfoCard: React.SFC<CommunicationInfoCardProps> =
    (props: CommunicationInfoCardProps): JSX.Element => {
        function renderRows(): Array<JSX.Element> {
            const {
                communicationInfo,
                optionHandlers
            } = props;

            return communicationInfo.map((item, index) => (
                <tr key={`communication_info_${index}`}>
                    <td>
                        <div className="form-group">
                            <input
                                className="form-control"
                                onChange={changeEventHandler(optionHandlers.setOptionRecordField, index, "subject")}
                                value={item.subject || ""}
                            />
                        </div>
                    </td>
                    <td>
                        <div className="form-group">
                            <textarea
                                className="form-control"
                                onChange={changeEventHandler(optionHandlers.setOptionRecordField, index, "detail")}
                                value={item.detail || ""}
                            />
                        </div>
                    </td>
                    <td>
                        <div className="row-delete">
                            <button
                                type="button"
                                className="keep-color"
                                onClick={deleteEventHandler(props.optionHandlers.deleteOptionRecord, index)}
                            >
                                <i className="far fa-times-circle" />
                            </button>
                        </div>
                    </td>
                </tr>
            ));
        }

        return (
            <div className="card mb-2 full-width">
                <div className="container">
                    <div className="card-header">
                        <span className="card-header-title">Communication Info</span>
                        <button
                            type="button"
                            className="link card-header-link"
                            onClick={addEventHandler(props.optionHandlers.addOptionRecord)}
                        >
                            + Add Subject
                        </button>
                    </div>
                    <table className="table padded-rows table-bordered table-striped">
                        <thead>
                            <tr className="blued uppercase">
                                <th className="w-35">Policy</th>
                                <th className="w-55">Detail</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {renderRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

function addEventHandler(handler: any): (event) => void {
    return (event): void => handler("communicationInfo");
}

function changeEventHandler(handler: any, index: number, fieldName: string): (event) => void {
    return (event): void => handler("communicationInfo", index, fieldName, event.target.value);
}

function deleteEventHandler(handler: any, index: number): (event) => void {
    return (event): void => handler("communicationInfo", index);
}
