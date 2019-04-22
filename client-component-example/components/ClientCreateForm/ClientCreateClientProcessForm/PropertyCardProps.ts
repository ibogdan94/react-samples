import * as PropTypes from "prop-types";

import { OptionHandlers, OptionHandlersPropTypes } from "../ClientCreateFormProps";

// TODO: Move this interface to PropertyReducer when Properties are implemented
export interface Property {
    property_id: number;

    address?: string;
    name?: string;
    city?: string;
    state?: string;
    zip?: string;
}

export interface PropertyRecord {
    property_id?: number;
    property?: Property;
    detail?: string;
    use_location?: boolean;
}

export interface PropertyCardProps {
    optionHandlers: OptionHandlers;
    clientProperties: Array<PropertyRecord>;
}

export const PropertyPropTypes: PropTypes.ValidationMap<Property> = {
    property_id: PropTypes.number.isRequired,

    address: PropTypes.string,
    name: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip: PropTypes.string
};

export const PropertyRecordPropTypes: { [P in keyof PropertyRecord]: PropTypes.Validator<any> } = {
    property_id: PropTypes.number,
    property: PropTypes.shape(PropertyPropTypes),
    detail: PropTypes.string,
    use_location: PropTypes.bool
};

export const PropertyCardPropTypes: { [P in keyof PropertyCardProps]: PropTypes.Validator<any> } = {
    optionHandlers: PropTypes.shape(OptionHandlersPropTypes).isRequired,
    clientProperties: PropTypes.arrayOf(PropTypes.shape(PropertyRecordPropTypes)).isRequired,
};
