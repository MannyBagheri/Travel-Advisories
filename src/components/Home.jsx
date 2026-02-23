import {
    Paper
} from '@mui/material';

import logo from "../assets/target.png";
//import logo from "../assets/airplane.png";

const Home = (props) => {

    return (<>
        <Paper elevation={4} sx={{ marginTop: "0.5em" }}>
            <img src={logo} style={{ width: "40%", maxWidth: "200px", margin: "1em" }} />
        </Paper>
    </>);
};

export default Home;