import PropTypes from "prop-types";

export const BookFormControllerPropTypes = {
	id: PropTypes.number.isRequired,
	total: PropTypes.string.isRequired,

	prefilledPhone: PropTypes.string,
	prefilledEmail: PropTypes.string,

	onDone: PropTypes.func.isRequired
};
