import React, {useEffect} from "react"
import Typography from "@material-ui/core/Typography";
import axios from "axios";

export default function UserInfo(props) {
    const [userDetails, setUserDetails] = React.useState({});

    useEffect(() => {
        // Get user details
        axios.get( `http://localhost:8080/clients/${props.user.username}`,
            { headers: {"Authorization" : `Bearer ${props.user.accessToken}`} })
            .then(res => {
                console.log(res.data)
                setUserDetails(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    },[]);

    return(
        <div>
            <Typography variant="h6" gutterBottom>
                Kullanıcı Bilgileri
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                İsim: {userDetails.name}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                Soyisim: {userDetails.surname}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                E-Mail: {userDetails.email}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                TC Kimlik No: {userDetails.tcKimlikNo}
            </Typography>
        </div>
    )
}