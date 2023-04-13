// import AppBar from '@mui/material/AppBar';
// import SettingsIcon from '@mui/icons-material/Settings';
// import SportsIcon from '@mui/icons-material/Sports';
// import PieChartIcon from '@mui/icons-material/PieChart';
// import PeopleIcon from '@mui/icons-material/People';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { Link } from "react-router-dom";

function Header () {
    return(
    <div>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{bgcolor: "#ffeab7"}}>
                <Toolbar>
                    <Link to="/">
                        <HomeIcon />
                    </Link>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 2, color:"black"}}>
                        T&F Data-Hub
                    </Typography>

                    <Button sx={{color: "black"}}>Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    </div>
    );
}

export default Header;