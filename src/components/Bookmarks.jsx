import { useEffect, useState } from "react";

import{ Paper, CardHeader, Box} from "@mui/material"

import Alert from "./Alert";
import * as api from "../util/api";

const Bookmarks = (props) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
    const load = async () => {
      let data = await api.alerts.getBookmarks();

      data.sort((a, b) => {
        const ta = a.bookmarked_at ? new Date(a.bookmarked_at).getTime() : 0;
        const tb = b.bookmarked_at ? new Date(b.bookmarked_at).getTime() : 0;
        return tb - ta;
      });

      setItems(data);
      props.log(`${data.length} bookmarks loaded`);
    };

    load();
  }, []);

  return (
    <Paper elevation={4} sx={{ marginTop: "0.5em" }}>
      <CardHeader title="Bookmarks" />

      {/* scrolling list */}
      <Box sx={{ maxHeight: "70vh", overflowY: "auto", paddingX: "0.5em", paddingBottom: "0.5em" }}>
        {items.map((a) => (
          <Alert key={a.country_code} alert={a} />
        ))}
      </Box>
    </Paper>
  );
};

export default Bookmarks;