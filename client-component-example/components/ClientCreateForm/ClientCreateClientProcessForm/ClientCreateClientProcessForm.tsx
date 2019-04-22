import * as React from "react";

import { Form, SubmitButton } from "react-formawesome";

import { formErrorParser } from "@helpers/formErrorParser";

import { Loader } from "@components/partials/Loader";

import { ClientCreateClientProcessFormProps } from "./ClientCreateClientProcessFormProps";

import { GuestContactCard } from "./GuestContactCard";
import { PartnersSourcingCard } from "./PartnersSourcingCard";
import { RevenueShareCard } from "./RevenueShareCard";
import { CommunicationInfoCard } from "./CommunicationInfoCard";
import { SourcingDirectionCard } from "./SourcingDirectionCard";
import { PropertyCard } from "./PropertyCard";
import { LocationInfoCard } from "./LocationInfoCard";
import { OptionsHandlingCard } from "./OptionsHandlingCard";
import { DocumentsHandlingCard } from "./DocumentsHandlingCard";
import { HotelOptionsCard } from "./HotelOptionsCard";
import { InvoicingDirectionCard } from "./InvoicingDirectionCard";
import { ArrivalInstructionsCard } from "./ArrivalInstructionsCard";
import { PostMoveInCard } from "./PostMoveInCard";
import { ClientHotButtonsCard } from "./ClientHotButtonsCard";
import { HousingRequestHandlingCard } from "./HousingRequestHandlingCard";

export const ClientCreateClientProcessForm: React.SFC<ClientCreateClientProcessFormProps> =
    (props: ClientCreateClientProcessFormProps): JSX.Element => (
        <Form
            className="form"
            validator={props.validator}
            errorParser={formErrorParser}
            onSubmit={props.onSubmit}
        >
            <GuestContactCard />

            <PartnersSourcingCard partnerOptions={props.partnersAsOptions} />

            <RevenueShareCard billing={props.billing} />

            <CommunicationInfoCard
                optionHandlers={props.optionHandlers}
                communicationInfo={props.communicationInfo}
            />

            <SourcingDirectionCard
                optionHandlers={props.optionHandlers}
                sourcingDirection={props.sourcingDirection}
                partnerOptions={props.partnersAsOptions}
            />

            <SourcingDirectionCard
                use={true}
                optionHandlers={props.optionHandlers}
                sourcingDirection={props.sourcingDirectionSourced}
                partnerOptions={props.partnersAsOptions}
            />

            <PropertyCard
                optionHandlers={props.optionHandlers}
                clientProperties={props.clientProperties}
            />

            <LocationInfoCard
                optionHandlers={props.optionHandlers}
                locationInfo={props.locationInfo}
            />

            <OptionsHandlingCard
                isUsingCustomForm={props.isUsingCustomForm}
                setFormUsage={props.setFormUsage}
            />

            <DocumentsHandlingCard
                process={props.process}
            />

            <HotelOptionsCard />

            <InvoicingDirectionCard />

            <ArrivalInstructionsCard />

            <PostMoveInCard />

            <ClientHotButtonsCard
                optionHandlers={props.optionHandlers}
                clientHotButtons={props.clientHotButtons}
            />

            <HousingRequestHandlingCard />

            <div className="modal-footer">
                <button
                    className="flex-row-item button button-red button-submit"
                    onClick={props.onCloseModal}
                >
                    <span>Close</span>
                </button>
                <SubmitButton
                    loadingComponent={<Loader />}
                    className="flex-row-item button button-blue button-submit ml-1"
                >
                    <span>Save Client</span>
                </SubmitButton>
            </div>
        </Form>
    );
