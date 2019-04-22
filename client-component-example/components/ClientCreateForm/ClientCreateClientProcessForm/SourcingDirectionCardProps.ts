import * as PropTypes from "prop-types";

import { SelectProps, SelectPropTypes } from "react-formawesome";

import { OptionHandlers, OptionHandlersPropTypes } from "../ClientCreateFormProps";

import { CustomAreaPropTypes } from "@components/AdminComponents";

import { AreaInterface } from "@store/reducers/customAreasReducer";

// TODO: Move this interface to AreasReducer when Areas are implemented
export interface PartnerArea {
    id: number;
    status: string;

    address?: string;
    area_all?: number;
    area_name?: string;
    city_all?: number;
    city_name?: string;
    country_all?: number;
    country_name?: string;
    county_all?: number;
    county_name?: string;
    latitude?: number;
    longitude?: number;
    metro_area_all?: string;
    metro_area_name?: string;
    neighborhood_all?: string;
    neighborhood_name?: string;
    notes_detail?: string;
    state_all?: number;
    state_name?: string;
    unsourced_reason?: string;
    custom_zone?: AreaInterface;
}

export interface SourcingDirectionPartner {
    partnerId?: number;
    areas?: Array<PartnerArea & { used: boolean }>;
    detail?: string;
    sourced?: boolean;
}

export interface SourcingDirectionCardProps {
    partnerOptions: SelectProps<number>["options"];
    optionHandlers: OptionHandlers;
    sourcingDirection: Array<SourcingDirectionPartner>;

    use?: boolean;
}

export interface FlatSourcingDirectionPartner extends Omit<SourcingDirectionPartner, "areas" | "partnerId"> {
    area_id: number;
    partner_id: number;
    used: number;
}

export const PartnerAreaPropTypes: { [P in keyof PartnerArea]: PropTypes.Validator<any> } = {
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,

    address: PropTypes.string,
    area_all: PropTypes.number,
    area_name: PropTypes.string,
    city_all: PropTypes.number,
    city_name: PropTypes.string,
    country_all: PropTypes.number,
    country_name: PropTypes.string,
    county_all: PropTypes.number,
    county_name: PropTypes.string,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    metro_area_all: PropTypes.number,
    metro_area_name: PropTypes.string,
    neighborhood_all: PropTypes.number,
    neighborhood_name: PropTypes.string,
    notes_detail: PropTypes.string,
    state_all: PropTypes.number,
    state_name: PropTypes.string,
    unsourced_reason: PropTypes.string,
    custom_zone: PropTypes.shape(CustomAreaPropTypes)
};

export const SourcingDirectionPartnerPropTypes: { [P in keyof SourcingDirectionPartner]: PropTypes.Validator<any> } = {
    partnerId: PropTypes.number,
    areas: PropTypes.arrayOf(PropTypes.shape({ ...PartnerAreaPropTypes, used: PropTypes.bool })),
    detail: PropTypes.string,
    sourced: PropTypes.bool
};

export const SourcingDirectionCardPropTypes: { [P in keyof SourcingDirectionCardProps]: PropTypes.Validator<any> } = {
    partnerOptions: PropTypes.shape(SelectPropTypes).isRequired,
    optionHandlers: PropTypes.shape(OptionHandlersPropTypes).isRequired,
    sourcingDirection: PropTypes.arrayOf(PropTypes.shape(SourcingDirectionPartnerPropTypes)).isRequired,

    use: PropTypes.bool
};
