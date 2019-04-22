import PropTypes from "prop-types";

export const LikeButtonPropTypes = {
	id: PropTypes.number.isRequired,
	apiLikeStatus: PropTypes.bool.isRequired,

	ids: PropTypes.instanceOf(Set).isRequired,
	switchLike: PropTypes.func.isRequired,

	authorized: PropTypes.bool.isRequired
};
