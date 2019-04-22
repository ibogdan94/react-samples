import PropTypes from "prop-types";

export const BookInfoFormPropTypes = {
	onTimeChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	total: PropTypes.string.isRequired,

	prefilledPhone: PropTypes.string,
	prefilledEmail: PropTypes.string
};
