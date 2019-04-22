import * as React from "react";

import { SelectProps } from "react-formawesome";

import { validator } from "./ClientCreateGeneralInfoForm/ClientCreateGeneralInfoModel";

import { validator as processValidator } from "./ClientCreateClientProcessForm/ClientCreateClientProcessModel";
import {
    ClientCreateFormProps,
    ClientCreateFormPropTypes,
    ClientCreateDataFlat,
    ClientEditProcessData
} from "./ClientCreateFormProps";

import { withEmptyOption } from "@helpers/withEmptyOption";

import { ClientCreateFormView } from "./ClientCreateFormView";

import { setFormUsage, isUsingCustomForm } from "./methods";
import { ClientCreateFormOptionController } from "./ClientCreateFormOptionController";

export class ClientCreateForm extends React.Component<ClientCreateFormProps> {
    public static readonly propTypes = ClientCreateFormPropTypes;

    public readonly state: { isLoading: boolean } = {
        isLoading: true
    };

    protected readonly optionController = new ClientCreateFormOptionController(this.updateParent);

    constructor(props: ClientCreateFormProps) {
        super(props);

        if (props.item) {
            this.optionController.initializeOptions(props.item);
        }
    }

    public componentWillUnmount(): void {
        validator.clear();
        processValidator.clear();
    }

    public render(): React.ReactNode {
        return (
            <ClientCreateFormView
                teamsAsOptions={this.teamsAsOptions}
                usersAsOptions={this.usersAsOptions}
                onCloseModal={this.props.onCloseModal}
                onSubmitInfo={this.handleSubmitInfo}
                item={this.props.item}
                setFormUsage={this.setFormUsageAndUpdate}
                isUsingCustomForm={isUsingCustomForm()}
                partnersAsOptions={this.partnersAsOptions}
                onSubmitProcess={this.handleSubmitProcess}
                optionHandlers={this.optionController.optionHandlers}
                communicationInfo={this.optionController.getCommunicationInfo}
                locationInfo={this.optionController.getLocationInfo}
                sourcingDirection={this.optionController.getSourcingDirection}
                sourcingDirectionSourced={this.optionController.getSourcingDirectionSourced}
                clientHotButtons={this.optionController.getClientHotButtons}
                clientProperties={this.optionController.getClientProperties}
            />
        );
    }

    protected get teamsAsOptions(): SelectProps<number>["options"] {
        return withEmptyOption(this.props.teamItems.map((team) => ({
            value: team.id,
            label: team.name
        })));
    }

    protected get usersAsOptions(): SelectProps<number>["options"] {
        return withEmptyOption(this.props.userItems.map((user) => ({
            value: user.id,
            label: user.full_name
        })));
    }

    protected get partnersAsOptions(): SelectProps<number>["options"] {
        return withEmptyOption(this.props.partnerItems.map((team) => ({
            value: team.id,
            label: team.name
        })));
    }

    protected get updateParent(): any {
        return (): void => this.forceUpdate();
    }

    protected setFormUsageAndUpdate = (formName: string): void => {
        setFormUsage(formName);
        this.forceUpdate();
    }

    protected handleSubmitInfo =
        async (modelValues: ClientCreateDataFlat): Promise<void | { cancelUpdate?: boolean }> => {
            const {
                name,
                email,
                phone,
                address,
                city,
                state,
                country,
                zip,
                website,
                team_id,
                description,
                ...client_profile
            } = modelValues;

            await this.props.onClientSaveInfo({ ...modelValues, client_profile });

            return {
                cancelUpdate: true
            };
        }

    protected handleSubmitProcess =
        async (modelValues: ClientEditProcessData): Promise<void | { cancelUpdate?: boolean }> => {
            await this.props.onClientSaveProcess({
                ...modelValues,
                ...this.optionController.submitData
            });

            return {
                cancelUpdate: true
            };
        }
}
