import * as React from "react";

import { FormGroup, Select, ErrorTip, SelectProps } from "react-formawesome";

export const PartnersSourcingCard: React.SFC<{ partnerOptions: SelectProps<number>["options"] }> =
    (props: { partnerOptions: SelectProps<number>["options"] }): JSX.Element => (
        <div className="card mb-2 full-width">
            <div className="container">
                <div className="card-header mb-0">
                    <span className="card-header-title">Include Client Name in Sourcing?</span>
                    <button type="button" className="link card-header-link" >
                        + Add Partner
                    </button>
                </div>
                <span>Placeholder</span>
            </div>
        </div>
    );
