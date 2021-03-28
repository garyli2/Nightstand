import {
    Button,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
} from '@material-ui/core';
import React from 'react';
import BottomBackBar from '../../components/BottomBackBar';
import StatusBar from '../../components/StatusBar';
import { MdDelete } from 'react-icons/md';
import { saveAlarmsArray, UserAlarm } from './alarmUtils';

import { useHistory } from 'react-router';

interface AlarmProps {
    alarmsState: [UserAlarm[], React.Dispatch<React.SetStateAction<UserAlarm[]>>];
    alarmTimeoutIdMapState: [Map<string, number>, React.Dispatch<React.SetStateAction<Map<string, number>>>];
}

export default function Alarm(props: AlarmProps) {
    const history = useHistory();
    const alarmArrayState = props.alarmsState;
    const [alarmArray, setAlarmArray] = alarmArrayState;
    const [alarmTimeoutIdMap, setAlarmTimeoutIdMap] = props.alarmTimeoutIdMapState

    return (
        <div className="alarmContainer">
            <StatusBar />
            <div className="alarmContentContainer">
                <Typography variant="h3">Alarm</Typography>
                <div className="alarmListContainer">
                    <Divider />
                    <div className="addAlarmButtonContainer">
                        <Button onClick={directToAddAlarm}>Add Alarm</Button>
                    </div>

                    <List dense={false}>
                        {alarmArray.map((alarm) => (
                            <AlarmListing
                                key={alarm.id}
                                alarm={alarm}
                            />
                        ))}
                    </List>
                </div>
            </div>
            <BottomBackBar />
        </div>
    );

    function directToAddAlarm() {
        history.push('/alarm/add');
    }

    function AlarmListing(props: AlarmListingProps) {
        const hour = props.alarm.time.hour.toString().padStart(2, '0');
        const minute = props.alarm.time.minute.toString().padStart(2, '0');
        const curAlarm = props.alarm;

        function deleteAlarm() {
            const withoutDeletedAlarmArray = alarmArray.filter(
                (alarm) => alarm.id !== curAlarm.id
            );
            const newIdMap = new Map(alarmTimeoutIdMap);
            setAlarmArray(withoutDeletedAlarmArray);
            saveAlarmsArray(withoutDeletedAlarmArray);
            
            // stop settimeout from happening
            const setTimeoutID = newIdMap.get(curAlarm.id);
            clearTimeout(setTimeoutID);

            // remove settimeout id from map
            newIdMap.delete(curAlarm.id);
            setAlarmTimeoutIdMap(newIdMap);
        }

        return (
            <ListItem>
                <ListItemText
                    primary={hour + ':' + minute}
                    secondary="No specific days set"
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={deleteAlarm}>
                        <MdDelete />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

interface AlarmListingProps {
    alarm: UserAlarm;
}
