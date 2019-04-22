import * as React from "react";

import { validator } from "./ClientCreateGeneralInfoForm/ClientCreateGeneralInfoModel";
import { validator as processValidator } from "./ClientCreateClientProcessForm/ClientCreateClientProcessModel";
import { ClientCreateFormViewProps } from "./ClientCreateFormViewProps";
import { ClientCreateGeneralInfoForm } from "./ClientCreateGeneralInfoForm";
import { ClientCreateClientProcessForm } from "./ClientCreateClientProcessForm";

import { ConditionalRender } from "@helpers/conditionalRender";

export const ClientCreateFormView: React.SFC<ClientCreateFormViewProps> =
    (props: ClientCreateFormViewProps): JSX.Element => {
        const [activeTab, setActiveTab] = React.useState("generalInfo");

        const renderTabs = (isEdit: boolean): JSX.Element => {
            if (isEdit) {
                return (
                    <ul className="menu-tabs">
                        <li className={`menu-item${activeTab === "generalInfo" ? " active" : ""}`}>
                            <a onClick={handleTabClick("generalInfo")}> General Info </a>
                        </li>
                        <li className={`menu-item${activeTab === "clientProcess" ? " active" : ""}`}>
                            <a onClick={handleTabClick("clientProcess")}> Client Process </a>
                        </li>
                        <li className={`menu-item${activeTab === "billing" ? " active" : ""}`}>
                            <a onClick={handleTabClick("billing")}> Billing </a>
                        </li>
                    </ul>
                );
            }

            return (
                <ul className="menu-tabs">
                    <li className="menu-item active">
                        <a onClick={handleTabClick("generalInfo")}> General Info </a>
                    </li>
                    <li className="menu-item disabled">
                        <span> Client Process </span>
                    </li>
                    <li className="menu-item disabled">
                        <span> Billing </span>
                    </li>
                </ul>
            );
        };

        const handleTabClick = (tab: string): any => (
            (): void => setActiveTab(tab)
        );

        return (
            <div>
                <div className="menu">
                    {renderTabs(!!props.item)}
                </div>
                <ConditionalRender condition={activeTab === "generalInfo"}>
                    <ClientCreateGeneralInfoForm
                        validator={validator}
                        teamsAsOptions={props.teamsAsOptions}
                        usersAsOptions={props.usersAsOptions}
                        onCloseModal={props.onCloseModal}
                        onSubmit={props.onSubmitInfo}
                    />
                </ConditionalRender>
                <ConditionalRender condition={activeTab === "clientProcess"}>
                    <ClientCreateClientProcessForm
                        billing={props.item ? props.item.client_profile.client_profile_billing : {}}
                        process={props.item ? props.item.client_profile.client_profile_processes : {}}
                        setFormUsage={props.setFormUsage}
                        validator={processValidator}
                        isUsingCustomForm={props.isUsingCustomForm}
                        partnersAsOptions={props.partnersAsOptions}
                        onCloseModal={props.onCloseModal}
                        onSubmit={props.onSubmitProcess}

                        optionHandlers={props.optionHandlers}
                        communicationInfo={props.communicationInfo}
                        locationInfo={props.locationInfo}
                        sourcingDirection={props.sourcingDirection}
                        sourcingDirectionSourced={props.sourcingDirectionSourced}
                        clientHotButtons={props.clientHotButtons}
                        clientProperties={props.clientProperties}
                    />
                </ConditionalRender>
                <ConditionalRender condition={activeTab === "billing"}>
                    <span>Placeholder</span>
                </ConditionalRender>
            </div>
        );
    };
