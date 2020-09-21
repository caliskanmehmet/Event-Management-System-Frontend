import React, {useEffect} from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList
} from 'recharts';
import axios from "axios";

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
            <YAxis label={{ value: 'Başvuru gününe göre katılımcı sayısı', angle: -90, position: 'insideLeft' }} />
            <Tooltip/>
            <Bar dataKey="participantCount" fill="#82ca9d">
                <LabelList dataKey="title" position="top" />
            </Bar>
        </BarChart>
    );
}