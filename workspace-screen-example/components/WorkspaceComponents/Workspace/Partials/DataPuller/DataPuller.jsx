import * as React from "react";
import PropTypes from "prop-types";

import { withWorkspaceContext, WorkspaceContextPropTypes } from "../../Providers";

@withWorkspaceContext
export class DataPuller extends React.Component {
    static propTypes = {
        workspaceContext: PropTypes.shape(WorkspaceContextPropTypes).isRequired,
        field: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired
    };

    render() {
        return this.props.children(this.props.workspaceContext[this.props.field]);
    }
}
