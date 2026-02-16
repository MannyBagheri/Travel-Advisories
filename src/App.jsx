import { useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Paper,
  Button
} from "@mui/material";

import "./App.css";

function App() {

  let [log, setLog] = useState('');

  let refreshDatabase = async () => {
    try {
      let result = await fetch("http://localhost:9000/db/refresh", { method: 'POST' });
      if (result.ok) {
        setLog('Database refreshed');
        result = await fetch("http://localhost:9000/alerts");
        let alerts = await result.json();
        setLog(`${alerts.length} alerts loaded`);
      }
    }
    catch (e) {
      console.error(e.message);
      setLog(e.message);
    }
  }

  return (<>
    <AppBar position="sticky">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">
          INFO-3139 P1 ( Manny Bagheri )
        </Typography>
      </Toolbar >
    </AppBar >
    <Paper elevation={4} sx={{ marginTop: "0.5em", padding: "1em" }}>
      <Button variant="contained" onClick={refreshDatabase} >Refresh Database</Button>
    </Paper>
    {
      log && <Paper elevation={4} sx={{ marginTop: "0.5em", padding: "1em" }}>
        {log}
      </Paper>
    }
  </>);
};

export default App;