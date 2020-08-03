import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EventIcon from '@material-ui/icons/Event';
import BarChartIcon from '@material-ui/icons/BarChart';
import {Link} from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddEventDialog from "./AddEventDialog";
import ParticipantCountGraphContainer from "./ParticipantCountGraph/ParticipantCountGraphContainer";

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

export const mainListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <EventIcon />
            </ListItemIcon>
            <ListItemText primary="Etkinlikler" />
        </ListItem>
        <Link to="/logout">
            <ListItem button key= "Logout">
                <ListItemIcon>{<ExitToAppIcon />}</ListItemIcon>
                <ListItemText secondary= "Çıkış Yap" />
            </ListItem>
        </Link>


    </div>
);
