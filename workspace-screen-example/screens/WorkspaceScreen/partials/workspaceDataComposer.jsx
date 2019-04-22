import * as React from "react";

import { DataPuller } from "@components/WorkspaceComponents/Workspace";

export const workspaceDataComposer = (renderMethod) => (
	<DataPuller field="location">
		{(location) => (
			<DataPuller field="workspace">
				{(workspace) => (
					<DataPuller field="related">
						{(related) => {
							return renderMethod(location, workspace, related);
						}}
					</DataPuller>
				)}
			</DataPuller>
		)}
	</DataPuller>
);
