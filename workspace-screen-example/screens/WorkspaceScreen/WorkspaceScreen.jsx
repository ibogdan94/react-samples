import * as React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {API_URL} from "react-native-dotenv";
import {ScrollView, View, TouchableOpacity, Image, Share} from "react-native";

import {WorkspaceProvider, RelatedContainer} from "@components/WorkspaceComponents";
import {BackButton} from "@components/NavigationComponents";

import {BottomTabs} from "@containers/BottomTabs";

import {WorkspaceTypes, DeskTypes} from "@constants/API";
import {Images} from "@assets/Images";

import {StatusBarManager} from "@utils/StatusBarManager";

import {BookButton} from "./partials/BookButton";
import {HeaderGradient} from "./partials/HeaderGradient";
import {RequestToBookButton} from "./partials/RequestToBookButton";
import {ScheduleViewingButton} from "./partials/ScheduleViewingButton";
import {workspaceDataComposer} from "./partials/workspaceDataComposer";
import {createWorkspaceLayout} from "./partials/createWorkspaceLayout";

import {styles} from "./styles";
import {NavigationPropTypes} from "../../navigation/NavigationPropTypes";

const mapStateToProps = (state) => ({
  authorized: state.securityReducer.authorized
});

@connect(mapStateToProps)
export class WorkspaceScreen extends React.Component {
  static propTypes = {
    ...NavigationPropTypes,
    authorized: PropTypes.bool.isRequired
  };
  static navigationOptions = ({navigation}) => ({
    headerTransparent: true,
    header: (
      <HeaderGradient>
        <BackButton white onPress={() => navigation.pop()}/>
        <TouchableOpacity
          style={styles.shareButton}
          hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}
          onPress={
            () => Share.share({url: `${API_URL}/indepth/${navigation.state.params.selectedWorkspaceId}`})
          }
        >
          <Image resizeMode="contain" style={styles.shareButtonIcon} source={Images.shareIcon}/>
        </TouchableOpacity>
      </HeaderGradient>
    )
  });

  constructor(props) {
    super(props);

    this.willFocusListener = props.navigation.addListener("willFocus", () => {
      StatusBarManager.setState("hidden");
    });
    this.willBlurListener = props.navigation.addListener("willBlur", () => {
      StatusBarManager.restoreState();
    });

    props.navigation.setParams({selectedWorkspaceId: props.navigation.getParam("workspaceId")});
  }

  componentWillUnmount() {
    if (this.props.navigation.state.params) {
      delete this.props.navigation.state.params.workspaceId;
      delete this.props.navigation.state.params.selectedWorkspaceId;
    }

    this.willBlurListener.remove();
    this.willFocusListener.remove();
  }

  render() {
    return (
      <BottomTabs>
        <WorkspaceProvider id={this.props.navigation.getParam("workspaceId")}>
          <View style={styles.root}>
            {workspaceDataComposer(this.renderComposed)}
          </View>
        </WorkspaceProvider>
      </BottomTabs>
    );
  }

  isMonthlyWorkspace = (workspace) => {
    return workspace.type === WorkspaceTypes["private-office"]
      || workspace.deskType === DeskTypes.monthly_fixed_desk
      || workspace.deskType === DeskTypes.monthly_hot_desk;
  }

  renderFooter = (workspace, location) => {
    return this.isMonthlyWorkspace(workspace)
      ? (
        <React.Fragment>
          <RequestToBookButton
            onPress={this.handleNavigateWithInfo("RequestToBook", workspace, location)}
          />
          <ScheduleViewingButton
            onPress={this.handleNavigateWithInfo("ScheduleViewing", workspace, location)}
          />
        </React.Fragment>
      )
      : (
        <BookButton
          onPress={this.handleNavigateWithInfo("BookCreation", workspace, location)}
        />
      );
  }

  renderComposed = (location, workspace, related) => (
    <RelatedContainer
      onSelect={this.setWorkspaceIdToParams}
      defaultWorkspace={workspace}
      relatedWorkspaces={related}
      keepSelected
    >
      {
        (workspaceData, onChange, related) => (
          <React.Fragment>
            <ScrollView>
              {createWorkspaceLayout(location, workspaceData, onChange, related)}
            </ScrollView>
            {this.renderFooter(workspaceData, location)}
          </React.Fragment>
        )
      }
    </RelatedContainer>
  )

  handleNavigateWithInfo = (route, workspace, location) => () => {
    const workspaceInfo = JSON.stringify({
      id: workspace.id,
      type: workspace.type,
      duration: workspace.duration,
      bookedDates: workspace.bookedDates,

      price: workspace.price,

      locationName: location.name,
      locationAddress: location.address,

      size: workspace.size,
      capacity: workspace.capacity,

      coverImageUrl: workspace.coverImageUrl
        || (workspace.images[0] ? workspace.images[0].url : undefined)
    });

    if (!this.props.authorized) {
      return this.props.navigation.navigate("SignIn", {
        redirectRouteName: route,
        action: "create booking",
        actionParams: {workspaceInfo}
      });
    }

    this.props.navigation.navigate(route, {
      workspaceInfo
    });
  }

  setWorkspaceIdToParams = (selectedWorkspaceId) => {
    this.props.navigation.setParams({
      selectedWorkspaceId
    });
  }

}
