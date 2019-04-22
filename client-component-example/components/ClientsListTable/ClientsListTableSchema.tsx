export const clientsListTableSchema = (): any => [
    {
        Header: "Name",
        accessor: "name",
        width: 400
    },
    {
        Header: "Description",
        accessor: "description",
        searchable: false
    },
    {
        Header: "City",
        accessor: "city"
    },
    {
        Header: "State",
        accessor: "state",
        width: 150
    },
    {
        Header: "Country",
        accessor: "country",
        width: 150
    },
    {
        Header: "Zip",
        accessor: "zip",
        width: 100,
        searchable: false
    }
];
