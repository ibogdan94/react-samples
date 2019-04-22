import * as PropTypes from "prop-types";
import { Property } from "./PropertyCardProps";

export interface PropertySearchPopupProps {
    propertyIndex?: number;

    setOptionRecordField: (optionName: string, index: number, fieldName: string, value: any) => void;
    setShowSearchIndex: (index: number) => void;
    makeAddress: (property: Property) => string;
}

export const PropertySearchPopupPropTypes: { [P in keyof PropertySearchPopupProps]: PropTypes.Validator<any> } = {
    propertyIndex: PropTypes.number,
    setOptionRecordField: PropTypes.func.isRequired,
    setShowSearchIndex: PropTypes.func.isRequired,
    makeAddress: PropTypes.func.isRequired
};
