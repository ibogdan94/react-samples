import * as PropTypes from "prop-types";

import { CompanyPropTypes, ChildrenProps } from "@containers/CompanyContainer";
import * as TeamContainer from "@containers/TeamContainer";
import * as UserContainer from "@containers/UserContainer";

import { Company } from "@store/reducers/companyReducer";

import { PaginationStatusPropTypes } from "@helpers/reactTableOptions";

export type ClientsListTableProps =
    Omit<ChildrenProps, "partnerItemsPagination">
    & Pick<TeamContainer.ChildrenProps, "teamItems">
    & Pick<UserContainer.ChildrenProps, "userItems">;

export interface ClientsListTableState {
    editItemData?: Company;
    isCreateModalOpen: boolean;
    loading: boolean;
}

export const ClientsListTablePropTypes: { [P in keyof ClientsListTableProps]: PropTypes.Validator<any> } = {
    clientItems: PropTypes.arrayOf(PropTypes.shape(CompanyPropTypes)).isRequired,
    clientItemsPagination: PaginationStatusPropTypes,

    partnerItems: PropTypes.arrayOf(PropTypes.shape(CompanyPropTypes)).isRequired,
    teamItems: PropTypes.arrayOf(PropTypes.shape(TeamContainer.TeamPropTypes)).isRequired,
    userItems: PropTypes.arrayOf(PropTypes.shape(UserContainer.UserPropTypes)).isRequired,

    onFetchCompanyList: PropTypes.func.isRequired,
    onAddClient: PropTypes.func.isRequired,
    onEditClientInfo: PropTypes.func.isRequired,
    onEditClientProcess: PropTypes.func.isRequired
};
