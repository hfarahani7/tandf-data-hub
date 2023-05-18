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
import { List, Divider, ListItemText, ListItemButton } from '@mui/material';
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

function fetchAthletes() {
    return(
        fetch("https://tf-data-hub-default-rtdb.firebaseio.com/Athletes.json", {
        method: "GET"
    })
    .then(res => res.json())
    );
}

function fetchTeams() {
    return(
        fetch("https://tf-data-hub-default-rtdb.firebaseio.com/Teams.json", {
        method: "GET"
    })
    .then(res => res.json())
    );
}

function Landing() {
    const [pageloading, setLoading]= useState(true);
    const [dropAthlete, setDropAthlete] = useState(false);
    const [dropTeam, setDropTeam] = useState(false);
    const [athletes, setAthletes] = useState({});
    const [teams, setTeams] = useState({});

    useEffect(() => {
        const temp = {};
        fetchAthletes().then(data  => {
            for (const athlete in data) {
                if (data[athlete] !== null) {
                    const tempRow = (data[athlete].firstName + " " + data[athlete].lastName);
                    temp[tempRow] = parseInt(athlete);
                }
            }
            setAthletes(temp);
            setLoading(false);
        });

        fetchTeams().then(data  => {
            const temp1 = data;
            setTeams(temp1);
        });
    }, [])
    
    if(pageloading) {
        return(<div> Loading </div>)
    }

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
                        {Object.keys(teams).map(team => 
                            <Link to={"/team/?id=" + teams[team].id} >
                                <Divider />
                                <ListItemButton sx={{textAlign:"center"}}>
                                    <ListItemText primary={team} sx={{}} />
                                </ListItemButton>
                                <Divider />
                            </Link>
                        )}
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