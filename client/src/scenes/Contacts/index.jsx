import React, { useMemo, useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import { useGetUserFilterQuery } from "state/api";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Contacts = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState([]);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState(null);
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
        filterable: true,
        editable: false,
        flex: 1,
      },
      {
        field: "name",
        headerName: "Name",
        filterable: true,
        editable: false,
        flex: 1,
      },
      {
        field: "interests",
        headerName: "Interests",
        sortable: true,
        filterable: true,
        editable: false,
        flex: 1,
      },
      {
        field: "email",
        headerName: "Email",
        filterable: true,
        editable: false,
        flex: 1,
      },
      {
        field: "phoneNumber",
        headerName: "Phone",
        filterable: true,
        editable: false,
        flex: 0.5,
      },
      {
        field: "city",
        headerName: "City",
        filterable: true,
        editable: false,
        flex: 1,
      },
      {
        field: "provinces",
        headerName: "Provinces",
        filterable: true,
        editable: false,
        flex: 1,
      },
      {
        field: "country",
        headerName: "Country",
        filterable: true,
        editable: false,
        flex: 1,
      },
      {
        field: "occupation",
        headerName: "occupation",
        filterable: true,
        editable: false,
        flex: 1,
      },
      {
        field: "active",
        headerName: "Active",
        type: "boolean",
        filterable: true,
        editable: false,
        flex: 1,
      },
    ];
  }, []);

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="GENERAL INFORMATION USERS"
        subtitle="List of Contacts for Future Reference"
      />
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
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
