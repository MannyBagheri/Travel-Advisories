import { useState, useEffect } from "react";

import {
    Paper
} from '@mui/material';

import logo from "../assets/target.png";
//import logo from "../assets/airplane.png";

import * as api from "../util/api"

const Home = (props) => {

    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const loadAlerts = async () => {
        let result = await api.alerts.getSearchData();
        setAlerts(result);
        props.log(`${result.length} alerts loaded`);
        }
        loadAlerts();
  }, []);

  
    return (<>
        <Paper elevation={4} sx={{ marginTop: "0.5em" }}>
            <img src={logo} style={{ width: "40%", maxWidth: "200px", margin: "1em" }} />
        </Paper>
    </>);
};

export default Home;