import Axios, { AxiosResponse } from "axios";
import { put, call, Effect } from "redux-saga/effects";

import queryString from "query-string";

import {Company, Partner} from "@store/reducers/companyReducer";
import * as CompanyActions from "@store/actions/companyActions";

import { client } from "@httpClient/client";

import {
    ClientCreateData,
    ClientEditData,
    ClientEditProcessData
} from "@components/ProfileComponents/ClientCreateForm/ClientCreateFormProps";

export function* fetchCompaniesListWorker(
    effect: EffectWithPromise<string, CompanyActions.ActionFetchCompaniesList["RequestData"]>
): IterableIterator<Effect> {
    let response: AxiosResponse<{ data: CompanyActions.ActionFetchCompaniesList["ResponseData"] }>;

    try {
        response = yield call(() => client.get("/companies/list", {
            isPrivate: true,
            params: effect.payload,
            cancelToken: effect.promise.cancelToken
        }));
    } catch (error) {
        if (Axios.isCancel(error)) {
            return;
        }

        effect.promise.reject(error);

        return yield put(CompanyActions.actionCompanyError());
    }

    effect.promise.resolve();
    yield put(CompanyActions.actionFetchCompaniesListComplete({
        ...response.data.data,
        classification: effect.payload.classification
    }));
}

export function* addClientWorker(effect: EffectWithPromise<string, ClientCreateData>): IterableIterator<Effect> {
    let response: AxiosResponse<{ data: Company }>;

    try {
        response = yield call(() => client.post("/companies/add_client", effect.payload, { isPrivate: true }));
    } catch (error) {
        effect.promise.reject(error);

        return yield put(CompanyActions.actionCompanyError());
    }

    effect.promise.resolve();
    yield put(CompanyActions.actionAddClientComplete(response.data.data));
}

export function* editClientInfoWorker(effect: EffectWithPromise<string, ClientEditData>): IterableIterator<Effect> {
    let response: AxiosResponse<{ data: Company }>;

    try {
        response = yield call(() => client.post(
            `/companies/client/${effect.payload.id}/edit_info`,
            effect.payload,
            { isPrivate: true })
        );
    } catch (error) {
        effect.promise.reject(error);

        return yield put(CompanyActions.actionCompanyError());
    }

    effect.promise.resolve();
    yield put(CompanyActions.actionEditClientInfoComplete(response.data.data));
}

export function* editClientProcessWorker(
    effect: EffectWithPromise<string, ClientEditProcessData>
): IterableIterator<Effect> {
    let response: AxiosResponse<{ data: Company }>;

    try {
        response = yield call(() => client.post(
            `/companies/client/${effect.payload.id}/edit_process`,
            effect.payload,
            { isPrivate: true })
        );
    } catch (error) {
        effect.promise.reject(error);

        return yield put(CompanyActions.actionCompanyError());
    }

    effect.promise.resolve();
    yield put(CompanyActions.actionEditClientProcessComplete(response.data.data));
}

export function* getPartnerInfoWorker(
    effect: EffectWithPromise<string, { id: number }>
): IterableIterator<Effect> {
    let response: AxiosResponse<{ data: Partner }>;

    try {
        response = yield call(() => client.get(
            `/companies/partner/${effect.payload.id}`,
            { isPrivate: true })
        );
    } catch (error) {
        effect.promise.reject(error);

        return yield put(CompanyActions.actionCompanyError());
    }

    effect.promise.resolve();
    yield put(CompanyActions.actionGetPartnerInfoComplete(response.data.data));
}
