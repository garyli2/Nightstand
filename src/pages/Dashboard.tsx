import React, { useEffect, useState } from 'react';

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
    return <h1 id="time">{timeString}</h1>;
}

export default function Dashboard() {
    return (
        <div className="dashboardContainer">
            <div className="timeContainer">
                <Time />
            </div>

            <div className="bottomToolBarContainer" />
        </div>
    );
}
