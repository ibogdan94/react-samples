import * as PropTypes from "prop-types";

import { SelectProps, SelectPropTypes } from "react-formawesome";
import { ModelValidator } from "react-formawesome-core";

import { ClientCreateGeneralInfoModel } from "./ClientCreateGeneralInfoModel";
import { ClientCreateDataFlat } from "../ClientCreateFormProps";

export interface ClientCreateGeneralInfoFormProps {
    isEdit?: boolean;
    validator: ModelValidator<ClientCreateGeneralInfoModel>;

    teamsAsOptions: SelectProps<number>["options"];
    usersAsOptions: SelectProps<number>["options"];
    onCloseModal: () => void;
    onSubmit: (modelValues: ClientCreateDataFlat) => Promise<void | { cancelUpdate?: boolean }>;
}

export const ClientCreateGeneralInfoFormPropTypes:
    { [P in keyof ClientCreateGeneralInfoFormProps]: PropTypes.Validator<any> } = {
        isEdit: PropTypes.bool,
        validator: PropTypes.object.isRequired,

        teamsAsOptions: PropTypes.arrayOf(PropTypes.shape(SelectPropTypes)).isRequired,
        usersAsOptions: PropTypes.arrayOf(PropTypes.shape(SelectPropTypes)).isRequired,
        onCloseModal: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired
};
