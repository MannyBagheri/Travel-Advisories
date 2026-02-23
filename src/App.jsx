import { useState } from "react";

import {
  Paper,
  Button,
  Snackbar
} from "@mui/material";

import "./App.css";

import * as api from './util/api.js'

import Header from "./components/Header.jsx";

function App() {

  // Snackbar State & Functions
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const closeSnackbar = () => setSnackbarVisible(false);
  const openSnackbar = (text) => {
    setSnackbarMessage(text);
    setSnackbarVisible(true);
  }

  let refreshDatabase = async () => {
    try {
      let result = await api.util.refreshDatabase();
      if (result.ok) {
        openSnackbar('Database refreshed');
        let alerts = await api.alerts.getSearchData();
        openSnackbar(`${alerts.length} alerts loaded`);
      }
    }
    catch (e) {
      console.error(e.message);
      openSnackbar(e.message);
    }
  }

  return (<>
    <Header appTitle='P1 M_Bagheri'/>

    <Paper elevation={4} sx={{ marginTop: "0.5em", padding: "1em" }}>
      <Button variant="contained" onClick={refreshDatabase} >Refresh Database</Button>
    </Paper>

    <Snackbar
      open={snackbarVisible}
      autoHideDuration={5000}
      onClose={closeSnackbar}
      message={snackbarMessage}
    />
  </>);
};

export default App;