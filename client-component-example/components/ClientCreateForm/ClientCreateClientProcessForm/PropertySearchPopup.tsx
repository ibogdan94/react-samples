import * as React from "react";

import { getClientPropertyList } from "@httpClient/actions";

import { Property } from "./PropertyCardProps";
import { PropertySearchPopupProps, PropertySearchPopupPropTypes } from "./PropertySearchPopupProps";

export class PropertySearchPopup extends React.Component<PropertySearchPopupProps> {
    public static readonly propTypes = PropertySearchPopupPropTypes;

    protected propertyOptions = [];
    protected searchName = "";
    protected searchAddress = "";

    constructor(props: PropertySearchPopupProps) {
        super(props);
    }

    public render(): React.ReactNode {
        const propertyList = this.propertyOptions.map((item, optionIndex) => {
            return (
                <div
                    className="property-result"
                    key={`property_search_item_${item.id}`}
                    onClick={this.selectChangeEventHandler(this.props.propertyIndex, optionIndex)}
                >
                    <div className="name">
                        <span>{item.name}</span>
                    </div>
                    <div className="address">
                        <span>{this.props.makeAddress(item)}</span>
                    </div>
                </div>
            );
        });

        return (
            <div className="property-search-container">
                <div className="property-search-box">
                    <div className="text-right pt-1 pr-1">
                        <i onClick={this.hide} className="modal-close fas fa-times" />
                    </div>
                    <div className="popup-header">
                        <div className="form-group">
                            <div className="control-container">
                                <input
                                    className="form-control"
                                    onChange={this.handleSearchNameChange}
                                    placeholder="(City, State/Prov, Country)"
                                    type="text"
                                    value={this.searchName}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="control-container">
                                <input
                                    className="form-control"
                                    onChange={this.handleSearchAddressChange}
                                    placeholder="(Apartment Name)"
                                    type="text"
                                    value={this.searchAddress}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="popup-body">
                        {propertyList}
                    </div>
                    <div className="popup-footer">
                        <div>
                            <span>Property Profile Not Found?</span>
                        </div>
                        <div>
                            <button className="button button-blue" onClick={this.handleNewPropertyPH}>
                                <span>Create New Profile</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    protected handleNewPropertyPH(event): void {
        event.preventDefault();
    }

    protected handleSearchNameChange = async (event): Promise<void> => {
        this.searchName = event.target.value;
        this.forceUpdate();
        await this.search(event.target.value, this.searchAddress);
    }

    protected handleSearchAddressChange = async (event): Promise<void> => {
        this.searchAddress = event.target.value;
        this.forceUpdate();
        await this.search(this.searchName, event.target.value);
    }

    protected search = async (name: string, address: string): Promise<void> => {
        if (!name && !address) {
            this.propertyOptions = [];
            this.forceUpdate();
            return;
        }

        const propertyResponse = await getClientPropertyList(name, address);

        if (propertyResponse && propertyResponse.data && propertyResponse.data.data) {
            this.propertyOptions = propertyResponse.data.data.items;
            this.forceUpdate();
        }
    }

    protected hide = (): void => {
        this.props.setShowSearchIndex(-1);
    }

    protected selectChangeEventHandler(index: number, propertyIndex: number): (event) => void {
        return (event): void => {
            this.props.setOptionRecordField(
                "clientProperties",
                index,
                "property",
                this.propertyOptions[propertyIndex]
            );
            this.props.setOptionRecordField(
                "clientProperties",
                index,
                "property_id",
                this.propertyOptions[propertyIndex].id
            );
            this.hide();
        };
    }
}
