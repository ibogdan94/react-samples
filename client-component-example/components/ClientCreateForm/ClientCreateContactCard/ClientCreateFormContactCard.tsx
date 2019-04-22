import * as React from "react";

import { FormGroup, Input, ErrorTip } from "react-formawesome";

import { ClientCreateFormContactCardProps } from "./ClientCreateFormContactCardProps";

export const ClientCreateFormContactCard: React.SFC<ClientCreateFormContactCardProps> =
    (props: ClientCreateFormContactCardProps): JSX.Element => (
        <div className="card">
            <div className="card-header-sm">
                <span className="card-header-title">{props.title}</span>
            </div>
            <FormGroup attribute={props.prefix} className="form-group" validateOn="blur">
                <label className="form-label">Name</label>
                <Input className="form-control" />
                <ErrorTip className="error-tip" />
            </FormGroup>
            <FormGroup attribute={`${props.prefix}_title`} className="form-group" validateOn="blur">
                <label className="form-label">Title</label>
                <Input className="form-control" />
                <ErrorTip className="error-tip" />
            </FormGroup>
            <FormGroup attribute={`${props.prefix}_direct_phone`} className="form-group" validateOn="blur">
                <label className="form-label">Direct Phone No.</label>
                <Input className="form-control" />
                <ErrorTip className="error-tip" />
            </FormGroup>
            <FormGroup attribute={`${props.prefix}_cell`} className="form-group" validateOn="blur">
                <label className="form-label">Cell Phone No.</label>
                <Input className="form-control" />
                <ErrorTip className="error-tip" />
            </FormGroup>
            <FormGroup attribute={`${props.prefix}_email`} className="form-group" validateOn="blur">
                <label className="form-label">Email</label>
                <Input className="form-control" />
                <ErrorTip className="error-tip" />
            </FormGroup>
        </div>
    );
