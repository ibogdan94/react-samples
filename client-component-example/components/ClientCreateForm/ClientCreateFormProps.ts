import * as PropTypes from "prop-types";

import * as TeamContainer from "@containers/TeamContainer";
import * as UserContainer from "@containers/UserContainer";
import * as CompanyContainer from "@containers/CompanyContainer";

import { Company, ClientProfile } from "@store/reducers/companyReducer";
import { CommunicationInfo, LocationInfo, ClientHotButton } from "./ClientCreateClientProcessForm";
import { PropertyRecord } from "./ClientCreateClientProcessForm/PropertyCardProps";

export interface ClientCreateData {
    name: string;
    email: string;
    phone: string;

    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    description?: string;
    website?: string;
    team_id?: number;
    client_profile?: ClientProfile;
}

export interface ClientEditData extends ClientCreateData {
    id: number;
}

export interface ClientEditProcessData {
    id: number;

    guest_contact_policy?: string;
    guest_contact_detail?: string;

    guest_contact_needs_assessment?: number;
    guest_contact_postarrival?: number;
    guest_contact_ccauth?: number;
    guest_contact_opts_review?: number;
    guest_contact_wellness?: number;
    guest_contact_departure?: number;
    guest_contact_presentation?: number;
    guest_contact_move_in_instructions?: number;
    guest_contact_background_check?: number;
    guest_contact_prearrival?: number;
    guest_contact_cra_ntv?: number;

    client_portal_policy?: number;
    client_portal_detail?: string;
    client_needs_assessment?: number;
    client_needs_assessment_detail?: string;

    option_handling_std_form?: number;
    option_handling_custom_form?: number;
    option_handling_client_dir_form?: number;
    option_handling_no_form?: number;

    option_handling_hours_to_send_domestic?: string;
    option_handling_hours_to_send_international?: string;
    option_handling_sending?: string;
    option_handling_opt_generation?: string;
    option_handling_pricing_direction?: string;

    option_handling_use_client_logo?: number;
    option_handling_cover_email?: number;
    option_handling_remove_nomad_phone?: number;
    option_handling_powered_by_nomad?: number;

    option_handling_send_opts?: string;
    option_handling_send_opts_detail?: string;
    option_handling_number_of_options?: string;
    option_handling_number_of_options_detail?: string;
    option_handling_option_filtering_policy?: string;
    option_handling_option_filtering_detail?: string;
    option_handling_text_to_include_detail?: string;
    option_handling_text_to_include_detail_email?: string;
    option_handling_follow_up?: string;
    option_handling_follow_up_detail?: string;
    option_special_handlings?: string;

    doc_handling_cra?: number;
    doc_handling_cra_policy?: string;
    doc_handling_cra_detail?: string;
    doc_handling_ntv?: number;
    doc_handling_ntv_policy?: string;
    doc_handling_ntv_detail?: string;
    doc_handling_ccform?: number;
    doc_handling_ccform_policy?: string;
    doc_handling_ccform_detail?: string;
    doc_handling_bgform?: number;
    doc_handling_bgform_policy?: string;
    doc_handling_bgform_detail?: string;

    doc_handling_other?: number;
    doc_handling_other_name?: string;
    doc_handling_other_policy?: string;
    doc_handling_other_detail?: string;
    doc_handling_other_2?: number;
    doc_handling_other_name_2?: string;
    doc_handling_other_policy_2?: string;
    doc_handling_other_detail_2?: string;

    hotel_opts_allowed?: number;
    hotel_opts_allowed_policy?: string;
    hotel_opts_allowed_policy_detail?: string;
    hotel_special_handling_detail?: string;

    invoicing_where_to_send_email?: string;
    invoicing_where_to_send_email_detail?: string;
    invoicing_include_policy?: string;
    invoicing_include_detail?: string;
    invoicing_oscar_ledger_changes_policy?: string;
    invoicing_oscar_ledger_changes_detail?: string;
    invoicing_payment_terms_policy?: string;
    invoicing_payment_terms_detail?: string;
    invoiving_direct_bill?: number;
    invoiving_direct_bill_detail?: string;
    invoicing_night_day?: number;
    invoicing_night_day_detail?: string;

    arrival_send_to_policy?: string;
    arrival_send_to_detail?: string;
    arrival_text_instructions?: number;
    arrival_text_instructions_detail?: string;
    prearrival_call_policy?: string;
    prearrival_call_direction?: string;
    arrival_mobile_policy?: string;
    arrival_mobile_details?: string;

    post_move_departure_instructions_policy?: string;
    post_move_departure_instructions_direction?: string;
    post_move_departure_instructions_frequency?: string;
    post_move_arrival_call_policy?: string;
    post_move_arrival_call_frequency?: string;
    post_move_arrival_call_direction?: string;
    post_move_arrival_email_policy?: string;
    post_move_arrival_email_frequency?: string;
    post_move_arrival_email_direction?: string;
    post_move_wellness_check_policy?: string;
    post_move_wellness_check_frequency?: string;
    post_move_wellness_check_direction?: string;
    post_move_extensions_detail?: string;
    post_move_incidental_detail?: string;

    counselor_title?: string;
    americas_email?: string;
    emea_email?: string;
    apac_email?: string;
    request_handling_detail?: string;

    communication_subjects?: Array<CommunicationInfo>;
    client_location_types?: Array<LocationInfo>;
    client_profile_processes_partners?: any;
    client_hot_buttons?: Array<ClientHotButton>;
    client_properties?: Array<PropertyRecord>;
}

export type ClientCreateDataFlat = Omit<ClientCreateData, "client_profile"> & ClientProfile;

export interface ClientCreateFormProps extends
    Pick<TeamContainer.ChildrenProps, "teamItems">,
    Pick<UserContainer.ChildrenProps, "userItems">,
    Pick<CompanyContainer.ChildrenProps, "partnerItems"> {
        item?: Company;

        onClientSaveInfo: (data: ClientCreateData) => Promise<void>;
        onClientSaveProcess: (data: ClientEditProcessData) => Promise<void>;
        onCloseModal: () => void;
}

export const ClientCreateFormPropTypes: { [P in keyof ClientCreateFormProps]: PropTypes.Validator<any> } = {
    item: PropTypes.shape(CompanyContainer.CompanyPropTypes),

    teamItems: PropTypes.arrayOf(PropTypes.shape(TeamContainer.TeamPropTypes)).isRequired,
    userItems: PropTypes.arrayOf(PropTypes.shape(UserContainer.UserPropTypes)).isRequired,

    partnerItems: PropTypes.arrayOf(PropTypes.shape(CompanyContainer.CompanyPropTypes)).isRequired,

    onClientSaveInfo: PropTypes.func.isRequired,
    onClientSaveProcess: PropTypes.func.isRequired,
    onCloseModal: PropTypes.func.isRequired,
};

export interface OptionHandlers {
    addOptionRecord: (optionName: string) => any;
    setOptionRecordField: (optionName: string, index: number, fieldName: string, value: any) => any;
    deleteOptionRecord: (optionName: string, index: number) => any;
    setOptionRecordPartnerField: (optionName: string, index: number, value: any) => any;
    setOptionRecordAreaField: (optionName: string, index: number, areaIndex: number, value: any) => any;
}

export const OptionHandlersPropTypes: PropTypes.ValidationMap<OptionHandlers> = {
    addOptionRecord: PropTypes.func.isRequired,
    setOptionRecordField: PropTypes.func.isRequired,
    deleteOptionRecord: PropTypes.func.isRequired,
    setOptionRecordPartnerField: PropTypes.func.isRequired,
    setOptionRecordAreaField: PropTypes.func.isRequired
};
