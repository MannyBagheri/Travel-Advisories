import {
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";

const Header = (props) => {

  return (<>
    <AppBar position="sticky">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">
          {props.appTitle}
        </Typography>
      </Toolbar >
    </AppBar >
  </>);
};

export default Header;