import './styles/Landing.css';
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { List, ListItem, Divider, ListItemText, ListItemButton } from '@mui/material';
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#474c5b",
  ...theme.typography.body2,
  padding: theme.spacing(4),
  textAlign: 'center',
  color: "white",
  justifyContent: 'center',
}));

const SubItem = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
}));

function Landing() {
    // const [athleteList, setAthleteList] = useEffect([{"Henry Farahani": 1}]);
    // const [teamList, setTeamList] = useEffect([{"Adelphi": 1}]);

    const [dropAthlete, setDropAthlete] = useState(false);
    const [dropTeam, setDropTeam] = useState(false);
    // const athletes = ["Henry Farahani", "Andre Francis", "Kyria Moore", "Alexa Boller", "Maeve Duggan", "Kathryn Lynn", "Kaity Zagar", "Dom Testani", "Nick Monty"];
    const athletes = {"Henry Farahani": 1, "Andre Francis": 2, "Kyria Moore": 3, "Alexa Boller": 4, "Maeve Duggan": 5, "Kathryn Lynn": 6, "Kaity Zagar": 7, "Dom Testani": 8, "Nick Monty": 9};

    return(
        <Box sx={{ width: '100%', justifyContent:'center', marginTop:4, display:'flex' }}>
            <Stack spacing={4} sx={{ width: '90%', justify:'center' }}>
                <Item onClick={() => setDropAthlete(prev => !prev)} sx={{ display:'inline-block'}}>
                    {dropAthlete ? <ExpandLessIcon sx={{ float:"left", fontSize:"100px" }} /> : <ExpandMoreIcon sx={{ float:"left", fontSize:"100px" }} />}
                    <Typography variant="h3" gutterBottom >
                        Athletes {"\n"}
                        <PersonIcon sx={{ fontSize:"100px" }} />
                    </Typography>
                </Item>
                {dropAthlete &&
                    <List>
                        {/* {athletes.map(athlete =>
                            <Link to="/athlete" >
                                <Divider />
                                <ListItemButton sx={{textAlign:"center" }}>
                                    <ListItemText primary={athlete} sx={{}} />
                                </ListItemButton>
                                <Divider />
                            </Link>
                        )} */}

                        {Object.keys(athletes).map(athlete =>
                            <Link to={"/athlete/?id=" + athletes[athlete]} >
                                <Divider />
                                <ListItemButton sx={{textAlign:"center" }}>
                                    <ListItemText primary={athlete} sx={{}} />
                                </ListItemButton>
                                <Divider />
                            </Link>
                        )}
                    </List>
                }
                <Item onClick={() => setDropTeam(prev => !prev)} sx={{ display:'inline-block'}}>
                    {dropTeam ? <ExpandLessIcon sx={{ float:"left", fontSize:"100px" }} /> : <ExpandMoreIcon sx={{ float:"left", fontSize:"100px" }} />}
                    <Typography variant="h3" gutterBottom>
                        Teams {"\n"}
                        <PeopleIcon sx={{ fontSize:"100px" }} />
                    </Typography>
                </Item>
                {dropTeam &&
                    <List>

                    </List>
                }
                <Item>
                    <Typography variant="h3" gutterBottom>
                        Upload Data {"\n"}
                        <UploadIcon sx={{ fontSize:"100px" }} />
                    </Typography>
                </Item>
                <Item>
                    <Typography variant="h3" gutterBottom>
                        Download Data {"\n"}
                        <DownloadIcon sx={{ fontSize:"100px" }} />
                    </Typography>
                </Item>
            </Stack>
        </Box>
    );
}

export default Landing;