import { useState, useEffect } from "react";

import {
    Paper,
    CardHeader,
    CardContent,
} from '@mui/material';


import Search from "./Search";
import Alert from "./Alert";

import logo from "../assets/target.png";
//import logo from "../assets/airplane.png";

import * as api from "../util/api"

const Home = (props) => {

    const [alerts, setAlerts] = useState([]);
    const [selectedAlert, setSelectedAlert] = useState();

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
            <CardHeader title="Travel Alerts" />
            <CardContent>
                <Search alerts={alerts} onSelection={setSelectedAlert} />
            </CardContent>
        </Paper>
        <Alert alert={selectedAlert} />
    </>);
};

export default Home;