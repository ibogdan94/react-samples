import * as React from "react";

import ReactTable, { TableProps } from "react-table";

import { toast } from "react-toastify";

import { getReactTableOptions, DEFAULT_PAGE_SIZE } from "@helpers/reactTableOptions";
import { conditionalRender } from "@helpers/conditionalRender";

import { Company } from "@store/reducers/companyReducer";

import { ChildrenProps } from "@containers/CompanyContainer";
import * as TeamContainer from "@containers/TeamContainer";
import * as UserContainer from "@containers/UserContainer";

import { Modal, NoItemsFound, PaginationTable } from "@components/partials";

import { ClientsListTableProps, ClientsListTablePropTypes, ClientsListTableState } from "./ClientsListTableProps";
import { clientsListTableSchema } from "./ClientsListTableSchema";
import { ClientCreateForm } from "../ClientCreateForm";
import { ClientCreateData, ClientEditProcessData } from "../ClientCreateForm/ClientCreateFormProps";

import { VALIDATION_ERROR } from "@httpClient/client";

export class ClientsListTable extends React.Component<ClientsListTableProps, ClientsListTableState> {
    public static readonly propTypes = ClientsListTablePropTypes;

    public readonly state: ClientsListTableState = {
        isCreateModalOpen: false,
        loading: false
    };

    public render(): React.ReactNode {
        return (
            <div className="card card-container">
                <div className="card-header">
                    <span className="card-header-title">Clients</span>
                    <button
                        type="button"
                        className="button button-blue button-add-element"
                        onClick={this.handleOpenCreateModal}
                    >
                        <span>+ New Client</span>
                    </button>
                </div>
                <PaginationTable
                    withSearch
                    tableOptions={this.options}
                    onFetch={this.handleFetchClientsList}
                    pagination={this.props.clientItemsPagination}
                />
                <Modal
                    isOpen={this.state.isCreateModalOpen}
                    onClose={this.handleCloseCreateModal}
                    title="New Client Profile"
                >
                    <ClientCreateForm
                        onClientSaveInfo={this.handleAddClient}
                        onClientSaveProcess={this.handleEditClientProcess}
                        onCloseModal={this.handleCloseCreateModal}
                        teamItems={this.props.teamItems}
                        userItems={this.props.userItems}
                        partnerItems={this.props.partnerItems}
                    />
                </Modal>
                <Modal
                    isOpen={!!this.state.editItemData}
                    onClose={this.handleCloseEditModal}
                    title={`${!!this.state.editItemData ? this.state.editItemData.name : ""} Profile`}
                >
                    <ClientCreateForm
                        item={this.state.editItemData}
                        onClientSaveInfo={this.handleEditClientInfo}
                        onClientSaveProcess={this.handleEditClientProcess}
                        onCloseModal={this.handleCloseEditModal}
                        teamItems={this.props.teamItems}
                        userItems={this.props.userItems}
                        partnerItems={this.props.partnerItems}
                    />
                </Modal>
            </div>
        );
    }

    protected get options(): Partial<TableProps<Company>> {
        return {
            ...getReactTableOptions({
                columns: clientsListTableSchema(),
                showPagination: this.props.clientItems.length > DEFAULT_PAGE_SIZE,
                data: this.props.clientItems,
                pageSize: 25,

                className: "table th-dividers header-sort",
                tbodyTrClassName: "table-row",
                theadTrClassName: "blued"
            }),
            loading: this.state.loading,
            getTrGroupProps: this.getTrGroupProps
        };
    }

    protected getTrGroupProps = (state: any, data: any): React.HTMLProps<HTMLElement> => {
        return {
            onClick: this.handleOpenEditModal(data.original)
        };
    }

    protected handleOpenEditModal = (editItemData: Company): VoidFunction => (): void => {
        this.setState({ editItemData });
    }

    protected handleCloseEditModal = (): void => {
        this.setState({ editItemData: undefined });
    }

    protected handleOpenCreateModal = (): void => {
        this.setState({ isCreateModalOpen: true });
    }

    protected handleCloseCreateModal = (): void => {
        this.setState({ isCreateModalOpen: false });
    }

    protected handleAddClient = async (data: ClientCreateData): Promise<void> => {
        await this.props.onAddClient(data);

        this.handleCloseCreateModal();
        toast.success("Client has been added");
    }

    protected handleEditClientInfo = async (data: ClientCreateData): Promise<void> => {
        try {
            await this.props.onEditClientInfo({ id: this.state.editItemData.id, ...data });
        } catch (error) {
            if (
                error.response
                && error.response.status === VALIDATION_ERROR
            ) {
                if (!!error.response.data.error) {
                    Object.values(error.response.data.error).forEach((message: string) => {
                        toast.error(message);
                    });
                }
            }

            throw error;
        }

        this.handleCloseEditModal();
        toast.success("Client has been updated");
    }

    protected handleEditClientProcess = async (data: Omit<ClientEditProcessData, "id">): Promise<void> => {
        try {
            await this.props.onEditClientProcess({ id: this.state.editItemData.id, ...data });
        } catch (error) {
            if (
                error.response
                && error.response.status === VALIDATION_ERROR
            ) {
                if (!!error.response.data.error) {
                    Object.values(error.response.data.error).forEach((message: string) => {
                        toast.error(message);
                    });
                }
            }

            throw error;
        }

        this.handleCloseEditModal();
        toast.success("Client has been updated");
    }

    protected handleFetchClientsList = (fetchParams: FetchListParams): Promise<void> => {
        return this.props.onFetchCompanyList({ classification: "client", ...fetchParams });
    }
}

export const renderClientsListTable =
    (teamCompanyProps: ChildrenProps & Pick<TeamContainer.ChildrenProps, "teamItems">): any =>
        (userProps: Pick<UserContainer.ChildrenProps, "userItems">): React.ReactNode => {
            const props = {
                ...teamCompanyProps,
                ...userProps
            };

            return <ClientsListTable {...props} />;
        };
