import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "theme";
import { createTheme } from "@mui/material/styles";
import HomePage from "scenes/HomePage";
import Layout from "scenes/Layout";
import Admin from "scenes/Admin";
import Customers from "scenes/Customers";
import Contacts from "scenes/Contacts";
import Form from "scenes/Form";
import Bar from "scenes/Bar";
import Pie from "scenes/Pie";
import LineChart from "components/LineChart";
import Geography from "./scenes/Geography";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/admin" replace />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/users" element={<Customers />} />
              <Route path="/admin/contacts" element={<Contacts />} />
              <Route path="/admin/form" element={<Form />} />
              <Route path="/admin/bar" element={<Bar />} />
              <Route path="/admin/pie" element={<Pie />} />
              <Route path="/admin/line" element={<LineChart />} />
              <Route path="/admin/geography" element={<Geography />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
