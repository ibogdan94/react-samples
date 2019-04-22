import * as React from "react";

import * as PropTypes from "prop-types";

import { OptionHandlers, OptionHandlersPropTypes } from "../ClientCreateFormProps";

export interface LocationInfo {
    name?: string;
    description?: string;
}

export interface LocationInfoCardProps {
    optionHandlers: OptionHandlers;
    locationInfo: Array<LocationInfo>;
}

export const LocationInfoPropTypes: PropTypes.ValidationMap<LocationInfo> = {
    name: PropTypes.string,
    description: PropTypes.string
};

export const LocationInfoCardPropTypes: { [P in keyof LocationInfoCardProps]: PropTypes.Validator<any> } = {
    optionHandlers: PropTypes.shape(OptionHandlersPropTypes).isRequired,
    locationInfo: PropTypes.arrayOf(PropTypes.shape(LocationInfoPropTypes)).isRequired,
};

export const LocationInfoCard: React.SFC<LocationInfoCardProps> = (props: LocationInfoCardProps): JSX.Element => {
    function renderRows(): Array<JSX.Element> {
        const {
            setOptionRecordField,
            deleteOptionRecord
        } = props.optionHandlers;
        return props.locationInfo.map((item, index) => (
            <tr key={`location_info_${index}`}>
                <td>
                    <div className="form-group">
                        <input
                            className="form-control"
                            onChange={inputChangeEventHandler(setOptionRecordField, index, "name")}
                            value={item.name || ""}
                        />
                    </div>
                </td>
                <td>
                    <div className="form-group">
                        <textarea
                            className="form-control"
                            onChange={inputChangeEventHandler(setOptionRecordField, index, "description")}
                            value={item.description || ""}
                        />
                    </div>
                </td>
                <td>
                    <div className="row-delete">
                        <button
                            type="button"
                            className="keep-color"
                            onClick={deleteEventHandler(deleteOptionRecord, index)}
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
                    <span className="card-header-title">Location Info</span>
                    <button
                        type="button"
                        className="link card-header-link"
                        onClick={addEventHandler(props.optionHandlers.addOptionRecord)}
                    >
                        + Add Location
                    </button>
                </div>
                <table className="table padded-rows table-bordered table-striped">
                    <thead>
                        <tr className="blued uppercase">
                            <th className="w-35">Location</th>
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
    return (event): void => handler("locationInfo");
}

function inputChangeEventHandler(handler: any, index: number, fieldName: string): (event) => void {
    return (event): void => handler("locationInfo", index, fieldName, event.target.value);
}

function deleteEventHandler(handler: any, index: number): (event) => void {
    return (event): void => handler("locationInfo", index);
}
