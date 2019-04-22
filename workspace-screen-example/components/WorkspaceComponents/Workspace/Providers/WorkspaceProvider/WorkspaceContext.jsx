import * as React from "react";
import PropTypes from "prop-types";
import hoistNonReactStatics from "hoist-non-react-statics";

export const WorkspaceInfoPropTypes = {
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,

    size: PropTypes.number,
    quantity: PropTypes.number,
    capacity: PropTypes.number,
    createdAt: PropTypes.number,

    visited: PropTypes.bool,
    isLiked: PropTypes.bool,

    deskType: PropTypes.string,
    coverImageUrl: PropTypes.string,
    minContractLength: PropTypes.number,
};

export const LocationPropTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    town: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    postcode: PropTypes.string.isRequired,
    latitude: PropTypes.string.isRequired,
    longitude: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,

    nearby: PropTypes.arrayOf(PropTypes.shape({
        distance: PropTypes.string.isRequired,
        duration: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
    })).isRequired,

    status: PropTypes.string,
    addressOptional: PropTypes.string
};

export const WorkspaceContext = React.createContext({
    workspace: {
        id: 0,
        type: "",
        price: 0,
        status: "",
        description: ""
    },
    location: {
        id: 0,
        nearby: [],
        name: "",
        town: "",
        status: "",
        address: "",
        postcode: "",
        latitude: "0",
        longitude: "0",
        description: ""
    },
    user: {
        id: 0,
        email: "",
    },
    related: []
});

export const WorkspaceContextPropTypes = {
    workspace: PropTypes.shape({
        ...WorkspaceInfoPropTypes,

        facilities: PropTypes.arrayOf(PropTypes.shape({
            slug: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            appIcon: PropTypes.string
        })).isRequired,

        images: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            url: PropTypes.string.isRequired
        })).isRequired
    }).isRequired,

    location: PropTypes.shape(LocationPropTypes).isRequired,

    user: PropTypes.shape({
        id: PropTypes.number,
        email: PropTypes.string
    }).isRequired,

    bookedDates: PropTypes.arrayOf(PropTypes.shape({
        startTime: PropTypes.number,
        endTime: PropTypes.number
    })).isRequired,
    related: PropTypes.arrayOf(PropTypes.shape(WorkspaceInfoPropTypes)).isRequired,
};

export function withWorkspaceContext(WrappedComponent) {
    class Enhanced extends React.Component {
        render() {
            return (
                <WorkspaceContext.Consumer>
                    {this.renderChildren}
                </WorkspaceContext.Consumer>
            );
        }

        renderChildren = (context) => {
            return <WrappedComponent {...this.props} workspaceContext={context} />;
        }
    }

    return hoistNonReactStatics(Enhanced, WrappedComponent);
}
