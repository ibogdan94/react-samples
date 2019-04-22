import * as PropTypes from "prop-types";

import { SelectProps, SelectPropTypes } from "react-formawesome";

import { CompanyPropTypes } from "@containers/CompanyContainer";

import { Company } from "@store/reducers/companyReducer";

import {
    CommunicationInfo,
    LocationInfo,
    CommunicationInfoPropTypes,
    LocationInfoPropTypes,
    ClientHotButton,
    ClientHotButtonPropTypes
} from "./ClientCreateClientProcessForm";

import {
    SourcingDirectionPartner,
    SourcingDirectionPartnerPropTypes
} from "./ClientCreateClientProcessForm/SourcingDirectionCardProps";

import {
    OptionHandlers,
    OptionHandlersPropTypes,
    ClientCreateDataFlat,
    ClientEditProcessData
} from "./ClientCreateFormProps";
import { PropertyRecord, PropertyRecordPropTypes } from "./ClientCreateClientProcessForm/PropertyCardProps";

export interface ClientCreateFormViewProps {
    teamsAsOptions: SelectProps<number>["options"];
    usersAsOptions: SelectProps<number>["options"];
    partnersAsOptions: SelectProps<number>["options"];

    optionHandlers: OptionHandlers;
    communicationInfo: Array<CommunicationInfo>;
    locationInfo: Array<LocationInfo>;
    sourcingDirection: Array<SourcingDirectionPartner>;
    sourcingDirectionSourced: Array<SourcingDirectionPartner>;
    clientHotButtons: Array<ClientHotButton>;
    clientProperties: Array<PropertyRecord>;

    item?: Company;
    isUsingCustomForm?: boolean;

    setFormUsage: (formName: string) => void;
    onSubmitInfo: (data: ClientCreateDataFlat) => Promise<void | { cancelUpdate?: boolean }>;
    onSubmitProcess: (data: ClientEditProcessData) => Promise<void | { cancelUpdate?: boolean }>;
    onCloseModal: () => void;
}

export const ClientCreateFormViewPropTypes: { [P in keyof ClientCreateFormViewProps]: PropTypes.Validator<any> } = {
    item: PropTypes.shape(CompanyPropTypes),

    teamsAsOptions: PropTypes.arrayOf(PropTypes.shape(SelectPropTypes)),
    usersAsOptions: PropTypes.arrayOf(PropTypes.shape(SelectPropTypes)),
    partnersAsOptions: PropTypes.arrayOf(PropTypes.shape(SelectPropTypes)),

    isUsingCustomForm: PropTypes.bool,
    optionHandlers: PropTypes.shape(OptionHandlersPropTypes),
    communicationInfo: PropTypes.arrayOf(PropTypes.shape(CommunicationInfoPropTypes)),
    locationInfo: PropTypes.arrayOf(PropTypes.shape(LocationInfoPropTypes)),
    sourcingDirection: PropTypes.arrayOf(PropTypes.shape(SourcingDirectionPartnerPropTypes)),
    sourcingDirectionSourced: PropTypes.arrayOf(PropTypes.shape(SourcingDirectionPartnerPropTypes)),
    clientHotButtons: PropTypes.arrayOf(PropTypes.shape(ClientHotButtonPropTypes)),
    clientProperties: PropTypes.arrayOf(PropTypes.shape(PropertyRecordPropTypes)),

    setFormUsage: PropTypes.func.isRequired,
    onSubmitInfo: PropTypes.func.isRequired,
    onSubmitProcess: PropTypes.func.isRequired,
    onCloseModal: PropTypes.func.isRequired,
};
