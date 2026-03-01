//This is a shortcut for props.alert! 
//This way we are only extracting only what we need from props.
import { useEffect, useState } from "react";

import {Paper, Typography, Divider } from "@mui/material"

const Alert = ({alert}) => {

  const [fullAlert, setFullAlert] = useState(null);

  useEffect(() => {
    if(!alert?.country_code){
      setFullAlert(null);
      return;
    }

    if( alert.region !== undefined || alert.sub_region !== undefined || 
        alert.advisory !== undefined || alert.date !== undefined)
        {
          setFullAlert(alert);
          return;
        }
    
    const controller = new AbortController();

    const load = async () => {
      try {
       const res = await fetch(`/alerts/${alert.country_code}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          setFullAlert(null);
          return;
        }

        const data = await res.json();
        setFullAlert(data);
      } 
      catch (e) {
        if (e.name !== "AbortError") console.error(e);
      }
    };

    load();

    return () => controller.abort();
    }, [alert?.country_code]);

  if (!alert) return <></>; 

  const a = fullAlert || alert;

  const title = `(${a.country_code}) ${a.country_name}`;
  const regionText = a.region || "";
  const advisoryText = a.advisory || "";
  const dateText = a.date || "";

  return (
    <Paper
      elevation={4}
      sx={{
        marginTop: "0.5em",
        paddingY: "1.25em",
        paddingX: "1em",
        textAlign: "center",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 500 }}>
        {title}
      </Typography>

      <Typography variant="h6" sx={{ marginTop: "0.5em", fontWeight: 400 }}>
        {regionText}
      </Typography>

      <Divider sx={{ marginY: "1em" }} />

      <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
        {advisoryText}
      </Typography>

      <Divider sx={{ marginY: "1em" }} />

      <Typography variant="body2">
        {dateText}
      </Typography>
    </Paper>
  );
};

export default Alert;