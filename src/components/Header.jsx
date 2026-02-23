import { useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  IconButton
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

const Header = (props) => {

const [anchor, setAnchor] = useState(null);

  return (<>
    <AppBar position="sticky">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">
          {props.appTitle}
        </Typography>

        <IconButton color="inherit" onClick={e => setAnchor(e.target)}>
          <MenuIcon />
        </IconButton>
        <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
          <MenuItem>Refresh Database</MenuItem>
        </Menu>

      </Toolbar >
    </AppBar >
  </>);
};

export default Header;