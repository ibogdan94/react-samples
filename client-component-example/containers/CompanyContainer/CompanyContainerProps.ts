import * as PropTypes from "prop-types";

import { ActionFetchCompaniesList } from "@store/actions";
import { Company } from "@store/reducers/companyReducer";
import {
    ClientCreateData,
    ClientEditData,
    ClientEditProcessData
} from "@components/ProfileComponents/ClientCreateForm/ClientCreateFormProps";

import { PaginationStatusPropTypes } from "@helpers/reactTableOptions";

export interface ChildrenProps {
    clientItems: Array<Company>;
    clientItemsPagination: PaginationStatus;
    partnerItems: Array<Company>;
    partnerItemsPagination: PaginationStatus;

    onFetchCompanyList: (payload: ActionFetchCompaniesList["RequestData"]) => Promise<void>;
    onAddClient: (data: ClientCreateData) => Promise<void>;
    onEditClientInfo: (data: ClientEditData) => Promise<void>;
    onEditClientProcess: (data: ClientEditProcessData) => Promise<void>;
}

export interface CompanyContainerI {
    readonly OwnProps: {
        children: (childrenProps: ChildrenProps) => React.ReactNode;
        classification: Array<"subclient" | "client" | "owner" | "partner">;
        pagination?: {[key: string]: Partial<PaginationParams>};
        fields?: {[key: string]: Array<string>};
    };
    readonly InjectedProps: {
        clientItems: Array<Company>;
        clientItemsPagination: PaginationStatus;
        partnerItems: Array<Company>;
        partnerItemsPagination: PaginationStatus;

        actionFetchCompaniesList: (
            payload: ActionFetchCompaniesList["RequestData"],
            promise: PromiseBase
        ) => void;
        actionAddClient: (payload: ClientCreateData, promise: PromiseBase) => void;
        actionEditClientInfo: (payload: ClientEditData, promise: PromiseBase) => void;
        actionEditClientProcess: (payload: ClientEditProcessData, promise: PromiseBase) => void;
    };
    readonly ComposedProps: CompanyContainerI["OwnProps"] & CompanyContainerI["InjectedProps"];
}

export const CompanyPropTypes: { [P in keyof Company]: PropTypes.Validator<any> } = {
    address: PropTypes.string,
    client_profile: PropTypes.object,
    partner_profile: PropTypes.object,
    city: PropTypes.string,
    classification: PropTypes.string.isRequired,
    country: PropTypes.string,
    description: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.number.isRequired,
    mirror_parent_client: PropTypes.number,
    name: PropTypes.string.isRequired,
    needs_completion: PropTypes.number,
    owner_id: PropTypes.number,
    phone: PropTypes.string.isRequired,
    state: PropTypes.string,
    team_id: PropTypes.number,
    user_id: PropTypes.number,
    website: PropTypes.string,
    zip: PropTypes.string
};

export const CompanyContainerPropTypes:
    { [P in keyof CompanyContainerI["ComposedProps"]]: PropTypes.Validator<any> }
    = {
    clientItems: PropTypes.arrayOf(PropTypes.shape(CompanyPropTypes)).isRequired,
    clientItemsPagination: PaginationStatusPropTypes,
    partnerItems: PropTypes.arrayOf(PropTypes.shape(CompanyPropTypes)).isRequired,
    partnerItemsPagination: PaginationStatusPropTypes,

    children: PropTypes.func.isRequired,
    classification: PropTypes.arrayOf(PropTypes.string).isRequired,
    pagination: PropTypes.object,
    fields: PropTypes.object,

    actionFetchCompaniesList: PropTypes.func.isRequired,
    actionAddClient: PropTypes.func.isRequired,
    actionEditClientInfo: PropTypes.func.isRequired,
    actionEditClientProcess: PropTypes.func.isRequired
};
