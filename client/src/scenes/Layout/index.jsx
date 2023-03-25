import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import ClientProvider from "components/ClientProvider";

function Dashboard() {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar />
      <Box flexGrow={1}>
        <Navbar />
        {/* client provider -Notification */}
        <ClientProvider />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Dashboard;
