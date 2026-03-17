import { useState, useEffect } from "react";

import {
    Paper,
    CardHeader,
    CardContent,
    Fab
} from '@mui/material';

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';


import Search from "./Search";
import Alert from "./Alert";

//import logo from "../assets/target.png";
import logo from "../assets/airplane.png";

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

    const onSelect = async (item) => {
    setSelectedAlert(item);

    if (!item?.country_code) return;

    let full = await api.alerts.getOne(item.country_code);
    if (full) setSelectedAlert(full);
  };

    const toggleBookmark = async () => {
        if (!selectedAlert?.country_code) return;

        const code = selectedAlert.country_code;
        const next = !selectedAlert.bookmarked;

        let response = await api.alerts.setBookmark(code, next);

        if (!response.ok) {
        props.log("Bookmark update failed");
        return;
        }

        // Update selected alert so the icon changes immediately
        setSelectedAlert({ ...selectedAlert, bookmarked: next });

        // Optional: keep list in sync too (not required but nice)
        setAlerts(prev =>
        prev.map(a => a.country_code === code ? { ...a, bookmarked: next } : a)
        );

        props.log(next ? "Bookmarked" : "Bookmark removed");
    };

    const isBookmarked = !!selectedAlert?.bookmarked;

    return (<>
        <Paper elevation={4} sx={{ marginTop: "0.5em" }}>
            <img src={logo} style={{ width: "40%", maxWidth: "200px", margin: "1em" }} />
            <CardHeader title="Travel Alerts" />
            <CardContent>
                <Search alerts={alerts} onSelection={onSelect} />
            </CardContent>
        </Paper>

        <Alert alert={selectedAlert} />

                {selectedAlert?.country_code && (
          <Fab
            color="primary"
            sx={{
              zIndex: 100,
              border: "2px solid #e1e1e1",
              position: "absolute",
              bottom: "1em",
              right: "1em"
            }}
            onClick={toggleBookmark}
          >
            {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </Fab>
        )}
    </>);
};

export default Home;