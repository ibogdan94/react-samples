import * as React from "react";

import { PropertyCardProps, Property } from "./PropertyCardProps";
import { ConditionalRender } from "@helpers/conditionalRender";
import { PropertySearchPopup } from "./PropertySearchPopup";

export const PropertyCard: React.SFC<PropertyCardProps> = (props: PropertyCardProps): JSX.Element => {
    const [showSearchIndex, setShowSearchIndex] = React.useState(-1);

    function addEventHandler(): void {
        props.optionHandlers.addOptionRecord("clientProperties");
    }

    function inputChangeEventHandler(index: number): (event) => void {
        return (event): void => props.optionHandlers.setOptionRecordField(
            "clientProperties",
            index,
            "detail",
            event.target.value
        );
    }

    function checkboxChangeEventHandler(index: number): (event) => void {
        return (event): void => props.optionHandlers.setOptionRecordField(
            "clientProperties",
            index,
            "use_location",
            event.target.checked
        );
    }

    function deleteEventHandler(index: number): () => void {
        return (): void => props.optionHandlers.deleteOptionRecord("clientProperties", index);
    }

    function toggleShowSearch(index: number): (event) => void {
        return (event): void => {
            setShowSearchIndex(index);
        };
    }

    function makeAddress(property: Property): string {
        const result = [];
        ["address", "city", "state", "zip"].forEach((key) => {
            if (!!property[key]) {
                result.push(property[key]);
            }
        });

        return result.join(", ");
    }

    function renderRows(): Array<JSX.Element> {
        return props.clientProperties.map((property, index) => (
            <tr key={`client_property_${index}`}>
                <td>
                    {renderProperty(property.property || {} as any, index)}
                </td>
                <td>
                    <div className="form-group">
                        <label className="switch use_dont">
                            <input
                                type="checkbox"
                                checked={!!property.use_location}
                                onChange={checkboxChangeEventHandler(index)}
                            />
                            <span className="slider round" />
                        </label>
                    </div>
                </td>
                <td>
                    <div className="form-group">
                        <div className="control-container">
                            <textarea
                                className="form-control"
                                onChange={inputChangeEventHandler(index)}
                                value={property.detail || ""}
                            />
                        </div>
                    </div>
                </td>
                <td>
                    <div className="row-delete">
                        <button
                            type="button"
                            className="keep-color"
                            onClick={deleteEventHandler(index)}
                        >
                            <i className="far fa-times-circle" />
                        </button>
                    </div>
                </td>
            </tr>
        ));
    }

    function renderProperty(property: Property, index: number): JSX.Element {
        return (
            <ConditionalRender condition={showSearchIndex === index}>
                <PropertySearchPopup
                    setOptionRecordField={props.optionHandlers.setOptionRecordField}
                    setShowSearchIndex={setShowSearchIndex}
                    propertyIndex={index}
                    makeAddress={makeAddress}
                />
                <div className="form-group">
                    <div>
                        <input
                            className="form-control w-90"
                            type="text"
                            value={property.name || ""}
                            onFocus={toggleShowSearch(index)}
                        />
                    </div>
                    <div>
                        <span>{makeAddress(property)}</span>
                    </div>
                </div>
            </ConditionalRender>
        );
    }

    return (
        <div className="card mb-2 full-width">
            <div className="container">
                <div className="card-header">
                    <span className="card-header-title">
                        Property Must Use / Do Not Use
                    </span>
                    <button type="button" className="link card-header-link" onClick={addEventHandler} >
                        + Add Property
                    </button>
                </div>
                <table className="table padded-rows table-bordered table-striped">
                    <thead>
                        <tr className="blued uppercase">
                            <th className="w-30">Property / Area</th>
                            <th className="w-10">Policy</th>
                            <th className="w-50">Detail</th>
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
