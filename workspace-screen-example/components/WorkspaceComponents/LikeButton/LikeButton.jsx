import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { TouchableOpacity, Image } from "react-native";

import { Images } from "@assets/Images";
import { switchLike } from "@store/actions";

import { styles } from "./styles";
import { LikeButtonPropTypes } from "./LikeButtonPropTypes";

const mapStateToProps = (state) => ({
	authorized: state.securityReducer.authorized,
	ids: state.savedWorkspacesReducer.ids,
	/* Perform force update, because 'ids' is immutable object */
	size: state.savedWorkspacesReducer.ids.size
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
	switchLike
}, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export class LikeButton extends React.Component {
	static propTypes = LikeButtonPropTypes;

	render() {
		if (!this.props.authorized) {
			return null;
		}

		return (
			<TouchableOpacity
				onPress={this.handlePress}
				hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}
			>
				<Image
					source={this.props.ids.has(this.props.id) ? Images.heartFilled : Images.heartEmpty}
					resizeMode="stretch"
					style={styles.like}
				/>
			</TouchableOpacity>
		);
	}

	handlePress = () => {
		this.props.switchLike(this.props.id);
	}
}
