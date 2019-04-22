import * as React from "react";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch, ActionCreatorsMapObject } from "redux";

import Axios from "axios";

import { awaitAction } from "@helpers/awaitAction";
import { initialPagination } from "@helpers/reactTableOptions";

import { StoreState } from "@store/reducers/rootReducer";
import {
    actionFetchCompaniesList,
    actionAddClient,
    actionEditClientInfo,
    actionEditClientProcess
} from "@store/actions/companyActions";

import { Preloader } from "@components/partials";

import { CompanyContainerI, CompanyContainerPropTypes, ChildrenProps } from "./CompanyContainerProps";
import {
    ClientCreateData,
    ClientEditData,
    ClientEditProcessData
} from "@components/ProfileComponents/ClientCreateForm/ClientCreateFormProps";

const mapStateToProps = (state: StoreState): Partial<CompanyContainerI["InjectedProps"]> => ({
    clientItems: state.companyReducer.clientItems,
    clientItemsPagination: state.companyReducer.clientItemsPagination,
    partnerItems: state.companyReducer.partnerItems,
    partnerItemsPagination: state.companyReducer.partnerItemsPagination,
});

const mapDispatchToProps = (dispatch: Dispatch): ActionCreatorsMapObject => bindActionCreators({
    actionFetchCompaniesList,
    actionAddClient,
    actionEditClientInfo,
    actionEditClientProcess
}, dispatch);

@(connect(mapStateToProps, mapDispatchToProps) as any)
export class CompanyContainer extends React.Component<CompanyContainerI["OwnProps"], { isLoading: boolean }> {
    public static readonly propTypes = CompanyContainerPropTypes;

    public readonly cancelToken = Axios.CancelToken.source();

    public readonly state: { isLoading: boolean } = {
        isLoading: true
    };

    public async componentDidMount(): Promise<void> {
        try {
            await Promise.all(this.props.classification.map((classification): Promise<void> => {
                const pagination = {
                    ...initialPagination,
                    ...this.props.pagination ? this.props.pagination[classification] || {} : {}
                };
                return (
                    awaitAction(
                        (promise) => this.injectedProps.actionFetchCompaniesList({
                            classification,
                            ...pagination,
                            fields: this.props.fields ? this.props.fields[classification] || [] : []
                        }, promise),
                        this.cancelToken.token
                    )
                );
            }));
        } catch (error) {
            return this.setState({ isLoading: false });
        }

        this.setState({ isLoading: false });
    }

    public componentWillUnmount(): void {
        this.cancelToken.cancel();
    }

    public render(): React.ReactNode {
        if (this.state.isLoading) {
            return <Preloader />;
        }

        return this.props.children(this.childrenProps);
    }

    protected get injectedProps(): CompanyContainerI["InjectedProps"] {
        return this.props as any;
    }

    protected get childrenProps(): ChildrenProps {
        return {
            clientItems: this.injectedProps.clientItems,
            clientItemsPagination: this.injectedProps.clientItemsPagination,
            partnerItems: this.injectedProps.partnerItems,
            partnerItemsPagination: this.injectedProps.partnerItemsPagination,
            onFetchCompanyList: this.handleFetchCompaniesList,
            onAddClient: this.handleAddClient,
            onEditClientInfo: this.handleEditClientInfo,
            onEditClientProcess: this.handleEditClientProcess
        };
    }

    protected handleAddClient = (data: ClientCreateData): Promise<void> => {
        return awaitAction((promiseBase) => this.injectedProps.actionAddClient(data, promiseBase));
    }

    protected handleEditClientInfo = (data: ClientEditData): Promise<void> => {
        return awaitAction((promiseBase) => this.injectedProps.actionEditClientInfo(data, promiseBase));
    }

    protected handleEditClientProcess = (data: ClientEditProcessData): Promise<void> => {
        return awaitAction((promiseBase) => this.injectedProps.actionEditClientProcess(data, promiseBase));
    }

    protected handleFetchCompaniesList = (params: FetchListParams & {
        classification: "subclient" | "client" | "owner" | "partner",
    }): Promise<void> => {
        return awaitAction((promiseBase) => this.injectedProps.actionFetchCompaniesList({
            ...params
        }, promiseBase));
    }
}
