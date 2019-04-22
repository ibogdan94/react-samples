import { AnyAction } from "redux";

import {Company, Partner} from "@store/reducers/companyReducer";
import {
    ClientCreateData,
    ClientEditData,
    ClientEditProcessData
} from "@components/ProfileComponents/ClientCreateForm/ClientCreateFormProps";

export enum CompanyAction {
    COMPANY_FETCH_LIST = "COMPANY_FETCH_LIST",
    COMPANY_FETCH_LIST_COMPLETE = "COMPANY_FETCH_LIST_COMPLETE",

    COMPANY_ADD_CLIENT = "COMPANY_ADD_CLIENT",
    COMPANY_ADD_CLIENT_COMPLETE = "COMPANY_ADD_CLIENT_COMPLETE",

    COMPANY_EDIT_CLIENT_INFO = "COMPANY_EDIT_CLIENT_INFO",
    COMPANY_EDIT_CLIENT_INFO_COMPLETE = "COMPANY_EDIT_CLIENT_INFO_COMPLETE",

    COMPANY_EDIT_CLIENT_PROCESS = "COMPANY_EDIT_CLIENT_PROCESS",
    COMPANY_EDIT_CLIENT_PROCESS_COMPLETE = "COMPANY_EDIT_CLIENT_PROCESS_COMPLETE",

    PARTNER_GET = "PARTNER_GET",
    PARTNER_GET_COMPLETE = "PARTNER_GET_COMPLETE",

    COMPANY_ERROR = "COMPANY_ERROR"
}

export interface ActionFetchCompaniesList {
    readonly RequestData: FetchListParams & {
        classification: "subclient" | "client" | "owner" | "partner";
    } & FetchListParams;
    readonly ResponseData: {
        items: Array<Company>;
    } & PaginationStatus;
    readonly ComposedData: ActionFetchCompaniesList["RequestData"] & ActionFetchCompaniesList["ResponseData"];
}

export function actionFetchCompaniesList(
    payload: ActionFetchCompaniesList["RequestData"],
    promise?: PromiseBase
): AnyAction {
    return {
        type: CompanyAction.COMPANY_FETCH_LIST,
        payload,
        promise
    };
}

export function actionFetchCompaniesListComplete(payload: ActionFetchCompaniesList["ComposedData"]): AnyAction {
    return {
        type: CompanyAction.COMPANY_FETCH_LIST_COMPLETE,
        payload
    };
}

export function actionAddClient(payload: ClientCreateData, promise?: PromiseBase): AnyAction {
    return {
        type: CompanyAction.COMPANY_ADD_CLIENT,
        payload,
        promise
    };
}

export function actionAddClientComplete(payload: Company): AnyAction {
    return {
        type: CompanyAction.COMPANY_ADD_CLIENT_COMPLETE,
        payload
    };
}

export function actionEditClientInfo(payload: ClientEditData, promise?: PromiseBase): AnyAction {
    return {
        type: CompanyAction.COMPANY_EDIT_CLIENT_INFO,
        payload,
        promise
    };
}

export function actionEditClientInfoComplete(payload: Company): AnyAction {
    return {
        type: CompanyAction.COMPANY_EDIT_CLIENT_INFO_COMPLETE,
        payload
    };
}

export function actionEditClientProcess(payload: ClientEditProcessData, promise?: PromiseBase): AnyAction {
    return {
        type: CompanyAction.COMPANY_EDIT_CLIENT_PROCESS,
        payload,
        promise
    };
}

export function actionEditClientProcessComplete(payload: Company): AnyAction {
    return {
        type: CompanyAction.COMPANY_EDIT_CLIENT_PROCESS_COMPLETE,
        payload
    };
}

export function actionGetPartnerInfo(id: number, promise?: PromiseBase): AnyAction {
    return {
        type: CompanyAction.PARTNER_GET,
        payload: {id},
        promise
    };
}

export function actionGetPartnerInfoComplete(payload: Partner): AnyAction {
    return {
        type: CompanyAction.PARTNER_GET_COMPLETE,
        payload
    };
}

export function actionCompanyError(): AnyAction {
    return {
        type: CompanyAction.COMPANY_ERROR
    };
}
