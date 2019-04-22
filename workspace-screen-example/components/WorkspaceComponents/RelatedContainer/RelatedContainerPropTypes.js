import PropTypes from "prop-types";

const RequireProps = {
	// Only 'id' is required for container
	id: PropTypes.number.isRequired,
	// Another data validating in responsible components
};

export const RelatedContainerPropTypes = {
	children: PropTypes.func.isRequired,
	defaultWorkspace: PropTypes.shape(RequireProps).isRequired,
	relatedWorkspaces: PropTypes.arrayOf(PropTypes.shape(RequireProps)).isRequired,

	onSelect: PropTypes.func,

	keepSelected: PropTypes.bool
};
