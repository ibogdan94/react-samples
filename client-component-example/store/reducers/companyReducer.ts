import { AnyAction } from "redux";

import { CompanyAction } from "../actions/companyActions";
import { Team } from "./teamReducer";

import { initialPagination } from "@helpers/reactTableOptions";

export interface ClientProfile {
    client_relations_manager_id?: number;
    contact_accounting?: string;
    contact_accounting_cell?: string;
    contact_accounting_direct_phone?: string;
    contact_accounting_email?: string;
    contact_accounting_title?: string;
    contact_invoices?: string;
    contact_invoices_cell?: string;
    contact_invoices_direct_phone?: string;
    contact_invoices_email?: string;
    contact_invoices_title?: string;
    contact_primary?: string;
    contact_primary_cell?: string;
    contact_primary_direct_phone?: string;
    contact_primary_email?: string;
    contact_primary_title?: string;
    contact_secondary?: string;
    contact_secondary_cell?: string;
    contact_secondary_direct_phone?: string;
    contact_secondary_email?: string;
    contact_secondary_title?: string;
    contact_secondary_2?: string;
    contact_secondary_2_cell?: string;
    contact_secondary_2_direct_phone?: string;
    contact_secondary_2_email?: string;
    contact_secondary_2_title?: string;

    client_profile_billing?: any;
    client_profile_processes?: any;
}

export interface Company {
    id: number;
    name: string;
    phone: string;
    classification: string;

    address?: string;
    city?: string;
    country?: string;
    state?: string;
    // TODO: add partner_profile interface
    partner_profile?: any;
    client_profile?: ClientProfile;
    needs_completion?: number;
    mirror_parent_client?: number;
    email?: string;
    zip?: number;
    website?: string;
    team?: Team;
    team_id?: number;
    user_id?: number;
    owner_id?: number;
    description?: string;
}

export interface PartnerProfile {
    website?: string;
    partner_type: string;
    rating_business?: string;
    rating_defects?: string;
    rating_rates?: string;
    rating_responsiveness?: string;
    rating_inspections?: string;
    rating_updated?: string;
    rating_comments?: string;
    office_name?: string;
    office_type?: string;
    reservation_system_used?: string;
    property?: string;
    phone_after_1: string;
    phone_after_2: string;
    email_request_one: string;
    email_request_two: string;
    email_reservation: string;
    email_service: string;
    email_service_esc: string;
    leader_senior?: string;
    leader_senior_title?: string;
    leader_senior_phone_direct?: string;
    leader_senior_phone_cell?: string;
    leader_senior_email?: string;
    contact_primary: string;
    contact_primary_title: string;
    contact_primary_phone_direct: string;
    contact_primary_phone_cell: string;
    contact_primary_email: string;
    contact_accounting: string;
    contact_accounting_title: string;
    contact_accounting_phone_direct: string;
    contact_accounting_phone_cell: string;
    contact_accounting_email: string;
    warning_service_failures?: string;
    warning_defects?: string;
    warning_client?: string;
    warning_other?: string;
    warning_comments?: string;
    warning_updated?: string;
    lockbox: boolean;
    meet_greet_fee?: string;
    concierge: boolean;
    rental_office: boolean;
    fed_ex?: string;
    kiosk: boolean;
    reminders: boolean;
    agreement_operating: boolean;
    agreement_operating_updated?: string;
    agreement_sla: boolean;
    agreement_sla_updated?: string;
    agreement_insurance: boolean;
    agreement_insurance_updated?: string;
    agreement_mwob: boolean;
    agreement_mwob_updated?: string;
    spend_currency_type?: string;
    spend_currency_value?: number;
    avg_los_type?: string;
    avg_los_value: number;
    survey_type?: string;
    survey_value: number; // can be negative
    overall_score_type?: string;
    overall_score_value: number;
    tot_arrivals_type?: string;
    tot_arrivals_value: number;
    mad_type?: string;
    mad_value: number; // can be negative
    mad_percent_type?: string;
    mad_percent_value: number;
    arrival_inst_timely_total?: string;
    arrival_inst_timely_percent: number;
    inspect_completed_total?: string;
    inspect_completed_percent: number;
    photos_received_total?: string;
    photos_received_percent: number;
    inspect_received_timely_total?: string;
    inspect_received_timely_percent: number;
    mad_comments?: string;
    gen_comments?: string;
    classification: string;
    reminder_alert_email?: string;
    lockbox_codes?: string;
    common_codes?: string;
    service_probation_date?: string;
    newly_added_date?: string;
    created_at: string;
    updated_at: string;
    mad_number?: string;
    warning_service_probation: boolean;
    warning_newly_added: boolean;
    activate_system: boolean;
    partner_id?: number;
    oscar_enabled: boolean;
}

export interface Partner {
    id: number;

    owner_id?: number;
    team_id?: number;
    user_id?: number;
    name: string;
    description?: string;
    email: string;
    phone: string;
    city: string;
    state: string;
    country: string;
    zip: string;
    address: string;
    classification: string;
    website?: string;
    needs_completion: boolean;
    created_at: string;
    updated_at: string;
    mirror_parent_client?: number;
    partner_profile?: PartnerProfile;
}

export interface CompanyReducerState {
    clientItems: Array<Company>;
    clientItemsPagination: PaginationStatus;
    partnerItems: Array<Partner>;
    partnerItemsPagination: PaginationStatus;
    partner?: Partner;
}

export const initialState: CompanyReducerState = {
    clientItems: [],
    clientItemsPagination: {
        ...initialPagination,
        total: 0
    },
    partnerItems: [],
    partnerItemsPagination: {
        ...initialPagination,
        total: 0
    },
    partner: null
};

export const companyReducer = (state = initialState, action: AnyAction): CompanyReducerState => {
    switch (action.type) {
        case CompanyAction.COMPANY_FETCH_LIST_COMPLETE: {
            return {
                ...state,
                [`${action.payload.classification}ItemsPagination`]: {
                    offset: Number(action.payload.offset),
                    total: Number(action.payload.total),
                    limit: Number(action.payload.limit)
                },
                [`${action.payload.classification}Items`]: action.payload.items
            };
        }

        case CompanyAction.COMPANY_ADD_CLIENT_COMPLETE: {
            return {
                ...state,
                clientItems: [
                    ...state.clientItems,
                    action.payload
                ]
            };
        }

        case CompanyAction.COMPANY_EDIT_CLIENT_INFO_COMPLETE:
        case CompanyAction.COMPANY_EDIT_CLIENT_PROCESS_COMPLETE: {
            const index = state.clientItems.findIndex(({ id }) => id === action.payload.id);

            if (index === -1) {
                return state;
            }

            return {
                ...state,
                clientItems: [
                    ...state.clientItems.slice(0, index),
                    action.payload,
                    ...state.clientItems.slice(index + 1),
                ]
            };
        }

        case CompanyAction.PARTNER_GET_COMPLETE: {
            return {
                ...state,
                partner: action.payload
            };
        }

        default:
            return state;
    }
};

