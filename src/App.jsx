import { useState } from "react";

import {
  Snackbar, createTheme, ThemeProvider
} from "@mui/material";

import "./App.css";

import Header from "./components/Header.jsx";
import Bookmarks from "./components/Bookmarks.jsx";
import Home from "./components/Home.jsx";

function App() {

  // Snackbar State & Functions
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const closeSnackbar = () => setSnackbarVisible(false);
  const openSnackbar = (text) => {
    setSnackbarMessage(text);
    setSnackbarVisible(true);
  }

  const theme = createTheme({ palette: { primary: { main: "#051f39", contrastText: "#ff8e80"}}});

  const [page, setPage] = useState("home");

  return (<ThemeProvider theme={theme}>
    <Header appTitle='Travel Advisories ' log ={openSnackbar} page ={page} setPage ={setPage} />

      {page === "home" && <Home log={openSnackbar} />}
      {page === "bookmarks" && <Bookmarks log={openSnackbar} />}

    <Snackbar
      sx={{ zIndex: 99 }}
      open={snackbarVisible}
      autoHideDuration={5000}
      onClose={closeSnackbar}
      message={snackbarMessage}
    />
  </ThemeProvider>);
};

export default App;