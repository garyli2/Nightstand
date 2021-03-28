import React, { useEffect, useState } from 'react';
import { UserAlarm } from './alarmUtils';
import sound from '../../../assets/alarm.mp3';

interface AlarmDisplayProps {
    isAlarmActiveState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    alarmToDisplay: UserAlarm;
}

export default function AlarmDisplay(props: AlarmDisplayProps) {
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);
    const [, setIsAlarmDisplayActive] = props.isAlarmActiveState; 
    const [audio] = useState(new Audio(sound));

    useEffect(() => {
        if (!isPlayingAudio) {
            audio.play();
            setIsPlayingAudio(true);
        }

        return () => {
            audio.pause();
        };
    }, []);
    
    return (
        <>
            <div style={{ height: '100vh', width: '100vw' }}>
                <h1>Alarm going off!</h1>
                <p>{props.alarmToDisplay.id} waking you up...</p>
                <p onClick={() => {
                    setIsAlarmDisplayActive(false);
                }}>Stop alarm</p>
            </div>
        </>
    );
}
