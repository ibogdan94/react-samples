import * as React from "react";

import { RelatedContainerPropTypes } from "./RelatedContainerPropTypes";

export class RelatedContainer extends React.PureComponent {
	static propTypes = RelatedContainerPropTypes;

	constructor(props) {
		super(props);

		this.workspaceMap = new Map();

		this.workspaceMap.set(props.defaultWorkspace.id, props.defaultWorkspace);
		props.relatedWorkspaces.forEach((item) => this.workspaceMap.set(item.id, item));

		this.state = {
			selectedWorkspaceId: props.defaultWorkspace.id
		};
	}

	render() {
		return this.props.children(
			this.workspaceMap.get(this.state.selectedWorkspaceId),
			this.selectWorkspace,
			this.relatedData
		);
	}

	get relatedData() {
		const list = this.props.keepSelected
			? Array.from(this.workspaceMap.keys())
			: Array.from(this.workspaceMap.keys())
				.filter((workspaceId) => this.state.selectedWorkspaceId !== workspaceId);

		return list.map((workspaceId) => this.workspaceMap.get(workspaceId));
	}

	selectWorkspace = (selectedWorkspaceId) => {
		this.setState({ selectedWorkspaceId }, () => {
			this.props.onSelect && this.props.onSelect(selectedWorkspaceId);
		});
	}
}
