import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EventIcon from '@material-ui/icons/Event';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {Link} from "react-router-dom";

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

export default mainListItems;
