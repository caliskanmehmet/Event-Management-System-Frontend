import React, {useEffect} from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList
} from 'recharts';
import axios from "axios";

export default function ParticipantCountGraphComponent(props) {
    const [events, setEvents] = React.useState([])


    useEffect(() => {
        // Update the events using the browser API
        axios.get("http://localhost:8080/events", { headers: {"Authorization" : `Bearer ${props.user.accessToken}`} })
            .then(res => {
                console.log("Graph component fetch:",res.data);
                setEvents(res.data)
            })
    },[]);

    return (
        <BarChart
            width={600}
            height={600}
            data={events}
            margin={{ top: 30, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title">
                {/*<Label value="Pages of my website" offset={0} position="insideBottom" />*/}
            </XAxis>
            <YAxis label={{ value: 'Katılımcı Sayısı', angle: -90, position: 'insideLeft' }} />
            <Tooltip/>
            <Bar dataKey="participantCount" fill="#82ca9d">
                <LabelList dataKey="title" position="top" />
            </Bar>
        </BarChart>
        );
}