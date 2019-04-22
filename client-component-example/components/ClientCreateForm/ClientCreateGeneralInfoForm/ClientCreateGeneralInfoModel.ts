import * as ClassValidator from "react-formawesome-core/class-validator";
import * as LocalValidator from "@validators";
import { ModelValidator } from "react-formawesome-core";

// tslint:disable: variable-name
export class ClientCreateGeneralInfoModel {
    @ClassValidator.IsDefined({
        groups: ["name"],
        message: "Name is required"
    })
    @ClassValidator.IsNotEmpty({
        groups: ["name"],
        message: "Name is required"
    })
    public name: string = undefined;

    @LocalValidator.IsEmail({
        groups: ["email"],
        message: "Email is invalid"
    })
    @ClassValidator.ValidateIf((o) => !!o.email && !!o.email.length)
    public email: string = undefined;

    @ClassValidator.IsDefined({
        groups: ["phone"],
        message: "Phone is required"
    })
    @ClassValidator.IsNotEmpty({
        groups: ["phone"],
        message: "Phone is required"
    })
    public phone: string = undefined;

    public address?: string = undefined;

    public city?: string = undefined;

    public state?: string = undefined;

    @ClassValidator.IsNumberString({
        groups: ["zip"],
        message: "Zip Code should be a number"
    })
    @ClassValidator.ValidateIf((o) => !!o.zip && !!o.zip.length)
    public zip?: string = undefined;

    public country?: string = undefined;

    public website?: string = undefined;

    public description?: string = undefined;

    public team_id?: number = undefined;

    public client_relations_manager_id?: number = undefined;

    public contact_primary?: string = undefined;

    public contact_primary_title?: string = undefined;

    public contact_primary_direct_phone?: string = undefined;

    public contact_primary_cell?: string = undefined;

    @LocalValidator.IsEmail({
        groups: ["contact_primary_email"],
        message: "Email is invalid"
    })
    @ClassValidator.ValidateIf((o) => !!o.contact_primary_email && !!o.contact_primary_email.length)
    public contact_primary_email?: string = undefined;

    public contact_secondary?: string = undefined;

    public contact_secondary_title?: string = undefined;

    public contact_secondary_direct_phone?: string = undefined;

    public contact_secondary_cell?: string = undefined;

    @LocalValidator.IsEmail({
        groups: ["contact_secondary_email"],
        message: "Email is invalid"
    })
    @ClassValidator.ValidateIf((o) => !!o.contact_secondary_email && !!o.contact_secondary_email.length)
    public contact_secondary_email?: string = undefined;

    public contact_secondary_2?: string = undefined;

    public contact_secondary_2_title?: string = undefined;

    public contact_secondary_2_direct_phone?: string = undefined;

    public contact_secondary_2_cell?: string = undefined;

    @LocalValidator.IsEmail({
        groups: ["contact_secondary_2_email"],
        message: "Email is invalid"
    })
    @ClassValidator.ValidateIf((o) => !!o.contact_secondary_2_email && !!o.contact_secondary_2_email.length)
    public contact_secondary_2_email?: string = undefined;

    public contact_accounting?: string = undefined;

    public contact_accounting_title?: string = undefined;

    public contact_accounting_direct_phone?: string = undefined;

    public contact_accounting_cell?: string = undefined;

    @LocalValidator.IsEmail({
        groups: ["contact_accounting_email"],
        message: "Email is invalid"
    })
    @ClassValidator.ValidateIf((o) => !!o.contact_accounting_email && !!o.contact_accounting_email.length)
    public contact_accounting_email?: string = undefined;

    public contact_invoices?: string = undefined;

    public contact_invoices_title?: string = undefined;

    public contact_invoices_direct_phone?: string = undefined;

    public contact_invoices_cell?: string = undefined;

    @LocalValidator.IsEmail({
        groups: ["contact_invoices_email"],
        message: "Email is invalid"
    })
    @ClassValidator.ValidateIf((o) => !!o.contact_invoices_email && !!o.contact_invoices_email.length)
    public contact_invoices_email?: string = undefined;
}

export const validator = new ModelValidator<ClientCreateGeneralInfoModel>(
    ClientCreateGeneralInfoModel, undefined, { skipAttributeCheck: true }
);
