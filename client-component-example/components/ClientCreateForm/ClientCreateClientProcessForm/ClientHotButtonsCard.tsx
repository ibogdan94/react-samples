import * as React from "react";

import * as PropTypes from "prop-types";

import { OptionHandlers, OptionHandlersPropTypes } from "../ClientCreateFormProps";

export interface ClientHotButton {
    topic?: string;
    detail?: string;
}

export interface ClientHotButtonsCardProps {
    optionHandlers: OptionHandlers;
    clientHotButtons: Array<ClientHotButton>;
}

export const ClientHotButtonPropTypes: PropTypes.ValidationMap<ClientHotButton> = {
    topic: PropTypes.string,
    detail: PropTypes.string
};

export const ClientHotButtonsCardPropTypes: { [P in keyof ClientHotButtonsCardProps]: PropTypes.Validator<any> } = {
    optionHandlers: PropTypes.shape(OptionHandlersPropTypes).isRequired,
    clientHotButtons: PropTypes.arrayOf(PropTypes.shape(ClientHotButtonPropTypes)).isRequired,
};

export const ClientHotButtonsCard: React.SFC<ClientHotButtonsCardProps> =
    (props: ClientHotButtonsCardProps): JSX.Element => {
        function renderRows(): Array<JSX.Element> {
            const {
                clientHotButtons,
                optionHandlers
            } = props;

            return clientHotButtons.map((item, index) => (
                <tr key={`client_hot_buttons_${index}`}>
                    <td>
                        <div className="form-group">
                            <input
                                className="form-control"
                                onChange={changeEventHandler(optionHandlers.setOptionRecordField, index, "topic")}
                                value={item.topic || ""}
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
                        <span className="card-header-title">Client Hot Buttons</span>
                        <button
                            type="button"
                            className="link card-header-link"
                            onClick={addEventHandler(props.optionHandlers.addOptionRecord)}
                        >
                            + Add Hot Button
                        </button>
                    </div>
                    <table className="table padded-rows table-bordered table-striped">
                        <thead>
                            <tr className="blued uppercase">
                                <th className="w-35">Topic</th>
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
    return (event): void => handler("clientHotButtons");
}

function changeEventHandler(handler: any, index: number, fieldName: string): (event) => void {
    return (event): void => handler("clientHotButtons", index, fieldName, event.target.value);
}

function deleteEventHandler(handler: any, index: number): (event) => void {
    return (event): void => handler("clientHotButtons", index);
}
