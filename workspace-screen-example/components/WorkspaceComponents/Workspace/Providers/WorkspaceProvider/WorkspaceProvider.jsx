import Axios from "axios";
import * as React from "react";
import PropTypes from "prop-types";
import {Toaster} from "react-native-toastboard";
import {View, ActivityIndicator, InteractionManager} from "react-native";

import {getWorkspace} from "@statelessActions";

import {Color} from "@constants/UI";

import {WorkspaceContext} from "./WorkspaceContext";

const WorkspaceProviderPropTypes = {
  id: PropTypes.number
};

export class WorkspaceProvider extends React.Component {
  static propTypes = WorkspaceProviderPropTypes;

  state = {
    loading: true,
  };

  workspaceData = {};
  cancelToken = Axios.CancelToken.source();

  componentDidMount() {
    this.cancellableLoading = InteractionManager.runAfterInteractions(async () => {
      let response;
      try {
        response = await getWorkspace(this.props.id, this.cancelToken.token);
      } catch (error) {
        if (Axios.isCancel(error)) {
          return;
        }

        return Toaster.error(error);
      }

      this.workspaceData = response.data;

      //@dirty hack
      this.workspaceData.workspace["bookedDates"] =
        this.workspaceData.bookedDates ? this.workspaceData.bookedDates : [];
      this.setState({loading: false});
    });
  }

  componentWillUnmount() {
    this.cancellableLoading && this.cancellableLoading.cancel();
    this.cancelToken.cancel();
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{flex: 1, justifyContent: "center"}}>
          <ActivityIndicator color={Color.gray} size="large"/>
        </View>
      );
    }

    return (
      <WorkspaceContext.Provider value={this.childContext}>
        {this.props.children}
      </WorkspaceContext.Provider>
    );
  }

  get childContext() {
    return {
      ...this.workspaceData,
    };
  }
}
