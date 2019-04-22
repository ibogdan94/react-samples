import * as ClassValidator from "react-formawesome-core/class-validator";
import * as LocalValidator from "@validators";
import { ModelValidator } from "react-formawesome-core";

// tslint:disable: variable-name
export class ClientCreateClientProcessModel {
    // Guest Contact
    public guest_contact_policy?: string = undefined;

    public guest_contact_needs_assessment?: boolean = undefined;
    public guest_contact_postarrival?: boolean = undefined;
    public guest_contact_ccauth?: boolean = undefined;
    public guest_contact_opts_review?: boolean = undefined;
    public guest_contact_wellness?: boolean = undefined;
    public guest_contact_departure?: boolean = undefined;

    public guest_contact_presentation?: boolean = undefined;
    public guest_contact_move_in_instructions?: boolean = undefined;
    public guest_contact_background_check?: boolean = undefined;
    public guest_contact_prearrival?: boolean = undefined;
    public guest_contact_cra_ntv?: boolean = undefined;

    public guest_contact_detail?: string = undefined;

    // Client Portal?
    public client_portal_policy?: boolean = undefined;
    public client_portal_detail?: string = undefined;

    // Needs Assessment?
    public client_needs_assessment?: boolean = undefined;
    public client_needs_assessment_detail?: string = undefined;

    // Options Handling/Sourcing
    //   Option Form
    public option_handling_std_form?: boolean = undefined;
    public option_handling_custom_form?: boolean = undefined;
    public option_handling_client_dir_form?: boolean = undefined;
    public option_handling_no_form?: boolean = undefined;

    public option_handling_hours_to_send_domestic?: string = undefined;
    public option_handling_hours_to_send_international?: string = undefined;
    public option_handling_sending?: string = undefined;
    public option_handling_opt_generation?: string = undefined;
    public option_handling_pricing_direction?: string = undefined;

    //     Option Custom Form
    public option_handling_use_client_logo?: boolean = undefined;
    public option_handling_cover_email?: boolean = undefined;
    public option_handling_remove_nomad_phone?: boolean = undefined;
    public option_handling_powered_by_nomad?: boolean = undefined;

    //   Processes
    public option_handling_send_opts?: string = undefined;
    public option_handling_send_opts_detail?: string = undefined;
    public option_handling_number_of_options?: string = undefined;
    public option_handling_number_of_options_detail?: string = undefined;
    public option_handling_option_filtering_policy?: string = undefined;
    public option_handling_option_filtering_detail?: string = undefined;
    public option_handling_text_to_include_detail?: string = undefined;
    public option_handling_text_to_include_detail_email?: string = undefined;
    public option_handling_follow_up?: string = undefined;
    public option_handling_follow_up_detail?: string = undefined;
    public option_special_handlings?: string = undefined;

    // Document Handling
    public doc_handling_cra?: boolean = undefined;
    public doc_handling_cra_policy?: string = undefined;
    public doc_handling_cra_detail?: string = undefined;
    public doc_handling_ntv?: boolean = undefined;
    public doc_handling_ntv_policy?: string = undefined;
    public doc_handling_ntv_detail?: string = undefined;
    public doc_handling_ccform?: boolean = undefined;
    public doc_handling_ccform_policy?: string = undefined;
    public doc_handling_ccform_detail?: string = undefined;
    public doc_handling_bgform?: boolean = undefined;
    public doc_handling_bgform_policy?: string = undefined;
    public doc_handling_bgform_detail?: string = undefined;

    //   Document Handling (Optional)
    public doc_handling_other?: boolean = undefined;
    public doc_handling_other_name?: string = undefined;
    public doc_handling_other_policy?: string = undefined;
    public doc_handling_other_detail?: string = undefined;

    public doc_handling_other_2?: boolean = undefined;
    public doc_handling_other_name_2?: string = undefined;
    public doc_handling_other_policy_2?: string = undefined;
    public doc_handling_other_detail_2?: string = undefined;

    // Hotel Options
    public hotel_opts_allowed?: boolean = undefined;
    public hotel_opts_allowed_policy?: string = undefined;
    public hotel_opts_allowed_policy_detail?: string = undefined;
    public hotel_special_handling_detail?: string = undefined;

    // Invoicing Direction
    public invoicing_where_to_send_email?: string = undefined;
    public invoicing_where_to_send_email_detail?: string = undefined;
    public invoicing_include_policy?: string = undefined;
    public invoicing_include_detail?: string = undefined;
    public invoicing_oscar_ledger_changes_policy?: string = undefined;
    public invoicing_oscar_ledger_changes_detail?: string = undefined;
    public invoicing_payment_terms_policy?: string = undefined;
    public invoicing_payment_terms_detail?: string = undefined;
    public invoiving_direct_bill?: boolean = undefined;
    public invoiving_direct_bill_detail?: string = undefined;
    public invoicing_night_day?: boolean = undefined;
    public invoicing_night_day_detail?: string = undefined;

    // Arrival Instructions
    public arrival_send_to_policy?: string = undefined;
    public arrival_send_to_detail?: string = undefined;
    public arrival_text_instructions?: boolean = undefined;
    public arrival_text_instructions_detail?: string = undefined;
    public prearrival_call_policy?: string = undefined;
    public prearrival_call_direction?: string = undefined;
    public arrival_mobile_policy?: string = undefined;
    public arrival_mobile_details?: string = undefined;

    // Post Move-In
    public post_move_departure_instructions_policy?: string = undefined;
    public post_move_departure_instructions_direction?: string = undefined;
    public post_move_departure_instructions_frequency?: string = undefined;
    public post_move_arrival_call_policy?: string = undefined;
    public post_move_arrival_call_frequency?: string = undefined;
    public post_move_arrival_call_direction?: string = undefined;
    public post_move_arrival_email_policy?: string = undefined;
    public post_move_arrival_email_frequency?: string = undefined;
    public post_move_arrival_email_direction?: string = undefined;
    public post_move_wellness_check_policy?: string = undefined;
    public post_move_wellness_check_frequency?: string = undefined;
    public post_move_wellness_check_direction?: string = undefined;
    public post_move_extensions_detail?: string = undefined;
    public post_move_incidental_detail?: string = undefined;

    // Housing Request Handling
    public counselor_title?: string = undefined;
    public americas_email?: string = undefined;
    public emea_email?: string = undefined;
    public apac_email?: string = undefined;
    public request_handling_detail?: string = undefined;
}

export const validator = new ModelValidator<ClientCreateClientProcessModel>(
    ClientCreateClientProcessModel, undefined, { skipAttributeCheck: true }
);
