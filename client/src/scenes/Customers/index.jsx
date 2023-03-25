import React, { useState, useMemo, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { useGetUserFilterQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import CustomNoRowsOverlay from "components/CustomNoRowsOverlay";
import Avatar from "@mui/material/Avatar";
import moment from "moment";
import EditUsersActions from "components/actions/EditUsersActions";
import DeleteUsersActions from "components/actions/DeleteUsersActions";

const Customers = () => {
  const theme = useTheme();
  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState([]);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [rowId, setRowId] = useState(null);
  const [rowDelete, setRowDelete] = useState(null);
  const [data, setData] = useState(null);
  const [gridKey, setGridKey] = useState(0);
  const { data: apiData, isLoading } = useGetUserFilterQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  useEffect(() => {
    if (apiData) {
      setData(apiData);
    }
  }, [apiData, data]);

  const columns = useMemo(() => {
    return [
      {
        field: "Avatar",
        renderCell: (params) => <Avatar />,
        sortable: false,
        filterable: false,
        editable: false,
        flex: 0.3,
      },
      {
        field: "_id",
        headerName: "ID",
        editable: false,
        flex: 1,
      },
      {
        field: "name",
        headerName: "Name",
        editable: true,
        flex: 1,
      },
      {
        field: "interests",
        headerName: "Interests",
        type: "singleSelect",
        valueOptions: ["Transporte", "Almacenamiento", "Asesoria"],
        editable: true,
        sortable: true,
        flex: 1,
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
      },
      {
        field: "phoneNumber",
        headerName: "Phone",
        editable: true,
        flex: 0.5,
      },
      {
        field: "city",
        headerName: "City",
        editable: true,
        flex: 1,
      },
      {
        field: "provinces",
        headerName: "Provinces",
        type: "singleSelect",
        valueOptions: [
          "Panama",
          "Panama Oeste",
          "Colon",
          "Bocas del Toro",
          "Chiriqui",
          "Darien",
          "Veraguas",
          "Los Santos",
          "Cocle",
          "Herrera",
        ],
        editable: true,
        sortable: true,
        flex: 1,
      },
      {
        field: "country",
        headerName: "Country",
        editable: true,
        flex: 1,
      },
      {
        field: "occupation",
        headerName: "occupation",
        editable: true,
        flex: 1,
      },
      {
        field: "active",
        headerName: "Active",
        type: "boolean",
        editable: true,
        flex: 1,
      },
      {
        field: "createdAt",
        headerName: "CreatedAt",
        renderCell: (params) =>
          moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
        editable: false,
        flex: 1,
      },
      {
        field: "updatedAt",
        headerName: "UpdatedAt",
        editable: false,
        flex: 1,
      },
      {
        field: "edit",
        headerName: "Edit",
        type: "actions",
        renderCell: (params) => (
          <EditUsersActions {...{ params, rowId, setRowId }} />
        ),
        flex: 0.5,
      },
      {
        field: "delete",
        headerName: "Delete",
        type: "actions",
        renderCell: (params) => (
          <DeleteUsersActions
            {...{ params, rowDelete, setRowDelete, handleDeleteRow }}
          />
        ),
        flex: 0.5,
      },
    ];
  }, [rowId, rowDelete, data]);

  const handleDeleteRow = () => {
    setRowDelete(null);
    setData((prevData) => {
      const updatedData = { ...prevData };
      updatedData.users = updatedData.users.filter(
        (user) => user._id !== rowId
      );
      updatedData.total = updatedData.total - 1;
      return updatedData;
    });
    setGridKey((prevKey) => prevKey + 1); // Force a re-render
  };

  const handleClick = () => {
    console.log("Click in Add");
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="USERS" subtitle="Entire list of users" />
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          key={gridKey}
          editMode="row"
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
          rows={(data && data.users) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch, handleClick },
          }}
          slots={{
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          {...data}
          onRowEditStop={(params) => {
            setRowId(params.id);
          }}
          onRowClick={(params) => {
            setRowDelete(params.id);
          }}
        />
      </Box>
    </Box>
  );
};

export default Customers;
