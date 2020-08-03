import React, {PureComponent, useEffect} from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, LabelList
} from 'recharts';
import axios from "axios";

const data = [
    {
        name: 'Page A', uv: 4000, pv: 2400
    },
    {
        name: 'Page B', uv: 3000, pv: 1398
    },
    {
        name: 'Page C', uv: 2000, pv: 9800
    },
    {
        name: 'Page D', uv: 2780, pv: 3908
    },
    {
        name: 'Page E', uv: 1890, pv: 4800
    },
    {
        name: 'Page F', uv: 2390, pv: 3800
    },
    {
        name: 'Page G', uv: 3490, pv: 4300
    },
];

export default function EnrollmentDateGraphComponent(props) {
    const [enrollments, setEnrollments] = React.useState([])


    useEffect(() => {
        // Update the events using the browser API
        axios.get(`http://localhost:8080/events/getEnrollments/${props.event.eventKey}`,
            { headers: {"Authorization" : `Bearer ${props.user.accessToken}`} })
            .then(res => {
                console.log("new fetch:", res.data)
                setEnrollments(res.data)
            })
    },[]);

    return (
        <BarChart
            width={600}
            height={600}
            data={enrollments}
            margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="localDate">
                {/*<Label value="Pages of my website" offset={0} position="insideBottom" />*/}
            </XAxis>
            <YAxis label={{ value: 'Participant Enrollment Count per Date', angle: -90, position: 'insideLeft' }} />
            <Tooltip/>
            <Bar dataKey="participantCount" fill="#82ca9d">
                <LabelList dataKey="title" position="top" />
            </Bar>
        </BarChart>
    );
}