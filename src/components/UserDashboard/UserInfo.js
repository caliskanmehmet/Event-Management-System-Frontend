import React from "react"
import Typography from "@material-ui/core/Typography";

export default function UserInfo(props) {

    return(
        <div>
            <Typography variant="h6" gutterBottom>
                User Info
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                Name:
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                Surname:
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                E-Mail:
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                TC Kimlik No:
            </Typography>
        </div>
    )
}