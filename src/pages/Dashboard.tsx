import React, { useEffect, useState } from 'react';
import AppToolbar from '../components/AppToolbar';
import StatusBar from '../components/StatusBar';

function Time() {
    const [time, setTime] = useState<Date>(new Date());
    useEffect(() => {
        const updateTime = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(updateTime);
        };
    }, []);

    const timeString = time.toLocaleString('en-CA', {
        hour: '2-digit',
        hour12: false,
        minute: '2-digit',
        second: '2-digit',
    });

    const dateString = time.toLocaleString('en-CA', {
        weekday: 'long',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    return (
        <>
            <h1 id="time">{timeString}</h1>
            <h3 id="date">{dateString}</h3>
        </>
    );
}

export default function Dashboard() {
    return (
        <div className="dashboardContainer">
            <StatusBar />
            <div className="timeContainer">
                <Time />
            </div>

            <AppToolbar />
        </div>
    );
}
