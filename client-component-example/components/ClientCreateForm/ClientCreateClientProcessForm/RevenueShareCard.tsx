import * as React from "react";

// FIXME: Fix parameter type when client_profile_billing is added
export const RevenueShareCard: React.SFC<{ billing: any }> = (props: { billing: any }): JSX.Element => (
    <div className="card mb-2 full-width">
        <div className="container">
            <div className="card-header">
                <span className="card-header-title">Revenue Share</span>
            </div>
            <table className="table padded-rows table-bordered table-striped">
                <thead>
                    <tr className="blued uppercase">
                        <th>Name</th>
                        <th>Currency</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Client Referral Fee (Domestic)</td>
                        <td>{props.billing.client_referral_fee_domestic_currency}</td>
                        <td>{props.billing.client_referral_fee_domestic_amount}</td>
                    </tr>
                    <tr>
                        <td>Client Referral Fee (International)</td>
                        <td>{props.billing.client_referral_fee_international_currency}</td>
                        <td>{props.billing.client_referral_fee_international_amount}</td>
                    </tr>
                    <tr>
                        <td>Client Referral Fee (Zones)</td>
                        <td>{props.billing.client_referral_fee_zones_currency}</td>
                        <td>{props.billing.client_referral_fee_zones_amount}</td>
                    </tr>
                    <tr>
                        <td>Client Referral Fee (Canadian)</td>
                        <td>{props.billing.client_referral_fee_canadian_currency}</td>
                        <td>{props.billing.client_referral_fee_canadian_amount}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);
