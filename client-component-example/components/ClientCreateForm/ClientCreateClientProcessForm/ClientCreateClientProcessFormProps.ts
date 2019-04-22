import * as PropTypes from "prop-types";

import { SelectProps, SelectPropTypes } from "react-formawesome";
import { ModelValidator } from "react-formawesome-core";

import { ClientCreateClientProcessModel } from "./ClientCreateClientProcessModel";
import { ClientEditProcessData, OptionHandlers, OptionHandlersPropTypes } from "../ClientCreateFormProps";
import { CommunicationInfo, CommunicationInfoPropTypes } from "./CommunicationInfoCard";
import { LocationInfo, LocationInfoPropTypes } from "./LocationInfoCard";
import { SourcingDirectionPartner, SourcingDirectionPartnerPropTypes } from "./SourcingDirectionCardProps";
import { ClientHotButton, ClientHotButtonPropTypes } from "./ClientHotButtonsCard";
import { PropertyRecord, PropertyRecordPropTypes } from "./PropertyCardProps";

export interface ClientCreateClientProcessFormProps {
    validator: ModelValidator<ClientCreateClientProcessModel>;
    optionHandlers: OptionHandlers;
    communicationInfo: Array<CommunicationInfo>;
    locationInfo: Array<LocationInfo>;
    sourcingDirection: Array<SourcingDirectionPartner>;
    sourcingDirectionSourced: Array<SourcingDirectionPartner>;
    clientHotButtons: Array<ClientHotButton>;
    clientProperties: Array<PropertyRecord>;
    billing: any;
    partnersAsOptions: SelectProps<number>["options"];

    // FIXME: add ClientProfileProcesses description
    process?: any;
    isEdit?: boolean;
    isUsingCustomForm?: boolean;
    setFormUsage?: (formName: string) => void;

    onCloseModal: () => void;
    onSubmit: (modelValues: ClientEditProcessData) => Promise<void | { cancelUpdate?: boolean }>;
}

export const ClientCreateClientProcessFormPropTypes:
    { [P in keyof ClientCreateClientProcessFormProps]: PropTypes.Validator<any> } = {
        validator: PropTypes.object.isRequired,
        optionHandlers: PropTypes.shape(OptionHandlersPropTypes).isRequired,
        communicationInfo: PropTypes.arrayOf(PropTypes.shape(CommunicationInfoPropTypes)).isRequired,
        locationInfo: PropTypes.arrayOf(PropTypes.shape(LocationInfoPropTypes)).isRequired,
        sourcingDirection: PropTypes.arrayOf(PropTypes.shape(SourcingDirectionPartnerPropTypes)).isRequired,
        sourcingDirectionSourced: PropTypes.arrayOf(PropTypes.shape(SourcingDirectionPartnerPropTypes)).isRequired,
        clientHotButtons: PropTypes.arrayOf(PropTypes.shape(ClientHotButtonPropTypes)).isRequired,
        clientProperties: PropTypes.arrayOf(PropTypes.shape(PropertyRecordPropTypes)).isRequired,
        billing: PropTypes.object.isRequired,

        process: PropTypes.object,
        isEdit: PropTypes.bool,
        isUsingCustomForm: PropTypes.bool,
        setFormUsage: PropTypes.func,

        partnersAsOptions: PropTypes.arrayOf(PropTypes.shape(SelectPropTypes)).isRequired,
        onCloseModal: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired
};
