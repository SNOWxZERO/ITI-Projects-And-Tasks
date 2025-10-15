import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./Router";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Latex from "./components/Latex";
import { RouterProvider } from "react-router";
import UserProvider from "./Context/UserContext";
import ProblemProvider from "./Context/ProblemContext";
import TabsProvider from "./Context/TabsContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00751F",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: "#f44336",
    },
    background: {
      default: "#fff",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Latex>
      <UserProvider>
        <ProblemProvider>
          <TabsProvider>
            <ThemeProvider theme={theme}>
              <RouterProvider router={router} />
            </ThemeProvider>
          </TabsProvider>
        </ProblemProvider>
      </UserProvider>
    </Latex>
  </React.StrictMode>
);
