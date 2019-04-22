import * as React from "react";

import { SourcingDirectionCardProps, PartnerArea, SourcingDirectionPartner } from "./SourcingDirectionCardProps";

export const SourcingDirectionCard: React.SFC<SourcingDirectionCardProps> =
    (props: SourcingDirectionCardProps): JSX.Element => {

        function addEventHandler(handler: any): (event) => void {
            return (): void => handler(`sourcingDirection${props.use ? "Sourced" : ""}`);
        }

        function inputChangeEventHandler(handler: any, index: number, fieldName: string): (event) => void {
            return (event): void => handler(
                `sourcingDirection${props.use ? "Sourced" : ""}`,
                index,
                fieldName,
                event.target.value
            );
        }

        function selectChangeEventHandler(handler: any, index: number): (event) => void {
            return (event): void => handler(
                `sourcingDirection${props.use ? "Sourced" : ""}`,
                index,
                event.target.value
            );
        }

        function checkboxChangeEventHandler(handler: any, index: number, areaIndex: number): (event) => void {
            return (event): void => handler(
                `sourcingDirection${props.use ? "Sourced" : ""}`,
                index,
                areaIndex,
                event.target.checked
            );
        }

        function deleteEventHandler(handler: any, index: number): (event) => void {
            return (): void => handler(`sourcingDirection${props.use ? "Sourced" : ""}`, index);
        }

        function renderAreas(partner: SourcingDirectionPartner, index: number): Array<JSX.Element> {
            if (!partner || !partner.areas) {
                return null;
            }

            const setOptionRecordAreaField = props.optionHandlers.setOptionRecordAreaField;

            return partner.areas.map((area, areaIndex) => (
                <div className="flex-row" key={`partner_area_${area.id}`}>
                    <div
                        className="flex-row-item form-group"
                        key={`sourcing_direction_partner_option_${partner.partnerId}_area_${area.id}_label`}
                    >
                        <span>{getAreaName(area)}</span>
                    </div>
                    <div
                        className="form-group mr-1"
                        key={`sourcing_direction_partner_option_${partner.partnerId}_area_${area.id}`}
                    >
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={!!area.used}
                                onChange={checkboxChangeEventHandler(setOptionRecordAreaField, index, areaIndex)}
                            />
                            <span className="slider round" />
                        </label>
                    </div>
                </div>
            ));
        }

        function renderRows(): Array<JSX.Element> {
            const {
                setOptionRecordField,
                deleteOptionRecord,
                setOptionRecordPartnerField: selectPartner
            } = props.optionHandlers;

            return props.sourcingDirection.map((item, index) => (
                <tr key={`sourcing_direction_${index}`}>
                    <td>
                        <div className="form-group">
                            <div className="control-container">
                                <div className="select-wrap">
                                    <select
                                        className="form-control"
                                        onChange={selectChangeEventHandler(selectPartner, index)}
                                        value={item.partnerId || ""}
                                    >
                                        {generateOptions(props.partnerOptions)}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>{renderAreas(item, index)}</td>
                    <td>
                        <div className="form-group">
                            <div className="control-container">
                                <textarea
                                    className="form-control"
                                    onChange={inputChangeEventHandler(setOptionRecordField, index, "detail")}
                                    value={item.detail || ""}
                                />
                            </div>
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
                        <span className="card-header-title">
                            {`Sourcing Direction - ${props.use ? "Must Use" : "Do Not Use"}`}
                        </span>
                        <button
                            type="button"
                            className="link card-header-link"
                            onClick={addEventHandler(props.optionHandlers.addOptionRecord)}
                        >
                            + Add Housing Partner
                        </button>
                    </div>
                    <table className="table padded-rows table-bordered table-striped">
                        <thead>
                            <tr className="blued uppercase">
                                <th className="w-20">Housing Partner</th>
                                <th className="w-45">Geozone</th>
                                <th className="w-25">Detail</th>
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

function generateOptions(options): Array<JSX.Element> {
    return options.map((item) => (
        <option
            key={`sourcing_direction_partner_option_${item.value}`}
            value={item.value}
        >
            {item.label}
        </option>
    ));
}

function getAreaName(area: PartnerArea): string {
    if (!!area.custom_zone) {
        return area.custom_zone.name;
    }

    const keys = ["country", "state", "county", "city", "area", "neighborhood"];
    let result = "";
    for (const key of keys) {
        if (area[`${key}_all`]) {
            result = result ? `${result} — ${area[`${key}_name`]} — All` : `${area[`${key}_name`]} — All`;
            break;
        }

        if (area[`${key}_name`]) {
            result = result ? `${result} — ${area[`${key}_name`]}` : `${area[`${key}_name`]}`;
        }
    }

    return result;
}
