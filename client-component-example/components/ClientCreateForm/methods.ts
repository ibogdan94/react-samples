import { validator as processValidator } from "./ClientCreateClientProcessForm/ClientCreateClientProcessModel";
import {
    SourcingDirectionPartner,
    FlatSourcingDirectionPartner
} from "./ClientCreateClientProcessForm/SourcingDirectionCardProps";
import { SelectProps } from "react-formawesome";
import { withEmptyOption } from "@helpers/withEmptyOption";

export function isUsingCustomForm(): boolean {
    return !!processValidator.modelValues.option_handling_custom_form;
}

export function setFormUsage(formName: string): void {
    [
        "option_handling_std_form",
        "option_handling_custom_form",
        "option_handling_client_dir_form",
        "option_handling_no_form",
        "option_handling_use_client_logo",
        "option_handling_cover_email",
        "option_handling_remove_nomad_phone",
        "option_handling_powered_by_nomad"
    ].map((option) => {
        processValidator.setModelValue(option, false);
    });
    processValidator.setModelValue(formName, true);
}

export function flattenSourcingDirection(
    arr: Array<SourcingDirectionPartner>,
    sourced: number
): Array<FlatSourcingDirectionPartner> {
    const result = [];

    arr.forEach((partner) => {
        if (partner.areas && !!partner.areas.length) {
            partner.areas.forEach((area) => {
                result.push({
                    detail: partner.detail,
                    sourced,
                    used: Number(!!area.used),
                    partner_id: partner.partnerId,
                    area_id: area.id
                });
            });
        } else {
            result.push({
                detail: partner.detail,
                sourced,
                partner_id: partner.partnerId
            });
    }
    });

    return result;
}

export function getOptionsFromObject(optionsObject): SelectProps["options"] {
    return withEmptyOption(Object.keys(optionsObject).map((key) => ({
        value: key,
        label: optionsObject[key]
    })));
}
