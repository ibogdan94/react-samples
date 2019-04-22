import PropTypes from "prop-types";

import { NavigationPropTypes } from "../../../navigation/NavigationPropTypes";

const workspacePropTypes = {
    images: PropTypes.array.isRequired,
    price: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,

    isLiked: PropTypes.bool.isRequired,
    visited: PropTypes.bool.isRequired,

    coverImageUrl: PropTypes.string,
    deskType: PropTypes.string,
    size: PropTypes.number
};

export const WorkspacePreviewItemPropTypes = {
    workspace: PropTypes.shape(workspacePropTypes).isRequired,
    related: PropTypes.arrayOf(PropTypes.shape(workspacePropTypes)).isRequired,

    location: PropTypes.shape({
		name: PropTypes.string.isRequired,
		address: PropTypes.string.isRequired
	}).isRequired,

    onNavigate: PropTypes.func,

    children: PropTypes.func,

    extraData: PropTypes.any,

    ...NavigationPropTypes
};
