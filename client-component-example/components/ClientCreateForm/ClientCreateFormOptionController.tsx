import { Company } from "@store/reducers/companyReducer";

import { getPartnerAreas, getClientProperty } from "@httpClient/actions";

import {
    OptionHandlers, ClientEditProcessData
} from "./ClientCreateFormProps";

import { SourcingDirectionPartner } from "./ClientCreateClientProcessForm/SourcingDirectionCardProps";
import { LocationInfo, CommunicationInfo, ClientHotButton } from "./ClientCreateClientProcessForm";
import { validator as processValidator } from "./ClientCreateClientProcessForm/ClientCreateClientProcessModel";

import { flattenSourcingDirection } from "./methods";

import { validator } from "./ClientCreateGeneralInfoForm/ClientCreateGeneralInfoModel";

import { CLIENT_PROCESS_BOOLEAN_FIELDS } from "@constants/profileConstants";
import { Property } from "./ClientCreateClientProcessForm/PropertyCardProps";

export class ClientCreateFormOptionController {
    protected communicationInfo = [];
    protected locationInfo = [];
    protected sourcingDirection = [];
    protected sourcingDirectionSourced = [];
    protected clientHotButtons = [];
    protected clientProperties = [];
    protected updateParent = null;

    constructor(updateParent: () => void) {
        this.updateParent = updateParent;
    }

    public get optionHandlers(): OptionHandlers {
        return {
            addOptionRecord: this.addOptionRecord,
            setOptionRecordField: this.setOptionRecordField,
            deleteOptionRecord: this.deleteOptionRecord,
            setOptionRecordPartnerField: this.setOptionRecordPartnerField,
            setOptionRecordAreaField: this.setOptionRecordAreaField
        };
    }

    public get submitData(): Partial<ClientEditProcessData> {
        const clientProfileProcessesPartners =
            flattenSourcingDirection(this.sourcingDirection, 0).concat(
                flattenSourcingDirection(this.sourcingDirectionSourced, 1)
            );
        return {
            communication_subjects: this.communicationInfo,
            client_location_types: this.locationInfo,
            client_profile_processes_partners: clientProfileProcessesPartners,
            client_hot_buttons: this.clientHotButtons,
            client_properties: this.clientProperties
        };
    }

    public get getCommunicationInfo(): Array<CommunicationInfo> {
        return this.communicationInfo;
    }

    public get getLocationInfo(): Array<LocationInfo> {
        return this.locationInfo;
    }

    public get getSourcingDirection(): Array<SourcingDirectionPartner> {
        return this.sourcingDirection;
    }

    public get getSourcingDirectionSourced(): Array<SourcingDirectionPartner> {
        return this.sourcingDirectionSourced;
    }

    public get getClientHotButtons(): Array<ClientHotButton> {
        return this.clientHotButtons;
    }

    public get getClientProperties(): Array<ClientHotButton> {
        return this.clientProperties;
    }

    public initializeOptions = async (company: Company): Promise<void> => {
        const {
            team,
            client_profile: clientProfile,
            ...generalInfo
        } = company;

        Object.keys(generalInfo)
            .filter((key) => !!generalInfo[key])
            .forEach((key) => {
                validator.setModelValue(key, company[key]);
            });

        if (clientProfile) {
            const {
                client_profile_billing: clientProfileBilling,
                client_profile_processes: clientProfileProcesses,
                ...restClientProfile
            } = clientProfile;

            Object.keys(restClientProfile)
                .filter((profileKey) => !!restClientProfile[profileKey])
                .forEach((profileKey) => {
                    validator.setModelValue(profileKey, restClientProfile[profileKey]);
                });

            if (clientProfileProcesses) {
                const {
                    client_profile_processes_partners,
                    client_hot_buttons,
                    client_location_types,
                    client_properties,
                    communication_subjects,
                    ...restClientProcesses
                } = clientProfileProcesses;

                this.communicationInfo = [...communication_subjects];
                this.locationInfo = [...client_location_types];
                this.clientHotButtons = [...client_hot_buttons];

                if (client_properties) {
                    client_properties.forEach(async (property: Property) => {
                        const propertyResponse = await getClientProperty(property.property_id);

                        if (propertyResponse && propertyResponse.data) {
                            this.clientProperties.push({ ...property, property: propertyResponse.data.data });
                        }
                    });
                }

                Object.keys(restClientProcesses)
                    .filter((processKey) => !!restClientProcesses[processKey])
                    .forEach((processKey) => {
                        let value = restClientProcesses[processKey];
                        if (CLIENT_PROCESS_BOOLEAN_FIELDS.includes(processKey)) {
                            value = !!value;
                        }
                        processValidator.setModelValue(processKey, value);
                    });

                if (client_profile_processes_partners) {
                    client_profile_processes_partners.forEach(async (partner) => {
                        const areasResponse = await getPartnerAreas(partner.partner_id);
                        let areas = [];

                        if (areasResponse && areasResponse.data && areasResponse.data.data) {
                            areas = areasResponse.data.data.items;
                        }
                        if (partner.process_partner_areas) {
                            areas.forEach((area) => {
                                const partnerArea = partner.process_partner_areas.find((item) => (
                                    item.area_id === area.id
                                ));

                                area.used = partnerArea ? partnerArea.used : false;
                            });
                        }

                        const newPartner = {
                            partnerId: Number(partner.partner_id),
                            areas,
                            detail: partner.detail
                        };
                        if (!!partner.sourced) {
                            this.sourcingDirectionSourced.push(newPartner);
                        } else {
                            this.sourcingDirection.push(newPartner);
                        }
                    });
                }
            }
        }
    }

    protected addOptionRecord = (optionName: string): void => {
        this[optionName].push({});
        this.updateParent();
    }

    protected setOptionRecordField = (optionName: string, index: number, fieldName: string, value: any): void => {
        this[optionName][index][fieldName] = value;
        this.updateParent();
    }

    protected setOptionRecordPartnerField = async (optionName: string, index: number, value: any): Promise<void> => {
        this[optionName][index].partnerId = value;
        if (!value) {
            this[optionName][index].areas = [];
        } else {
            const areas = await getPartnerAreas(value);
            if (areas && areas.data && areas.data.data) {
                this[optionName][index].areas = areas.data.data.items;
            }
        }
        this.updateParent();
    }

    protected setOptionRecordAreaField =
        (optionName: string, index: number, areaIndex: number, value: any): void => {
            this[optionName][index].areas[areaIndex].used = value;
            this.updateParent();
        }

    protected deleteOptionRecord = (optionName: string, index: number): any => {
        this[optionName].splice(index, 1);
        this.updateParent();
    }
}
// tslint:disable max-file-line-count
