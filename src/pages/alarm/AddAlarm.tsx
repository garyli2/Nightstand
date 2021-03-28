import { Button, Divider, TextField, Typography } from '@material-ui/core';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import TimePicker from '@material-ui/lab/TimePicker';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import React, { useState } from 'react';
import BottomBackBar from '../../components/BottomBackBar';
import StatusBar from '../../components/StatusBar';
import { goBack } from '../utils';
import { getAlarmsArray, saveAlarmsArray, UserAlarm } from './alarmUtils';

interface AddAlarm {
    alarmsState: [UserAlarm[], React.Dispatch<React.SetStateAction<UserAlarm[]>>];
}

export default function AddAlarm(props: AddAlarm) {
    const [selectedTime, setSelectedTime] = useState<Date>(new Date());
    const alarmsState = props.alarmsState, [, setAlarms] = alarmsState;
    

    function handleDateChange(date: MaterialUiPickersDate) {
        if (date) {
            setSelectedTime(date);
        }
    }

    function saveAlarm() {
        const newAlarmsArray = getAlarmsArray();
        const hour = selectedTime.getHours();
        const minute = selectedTime.getMinutes();
        newAlarmsArray.push(new UserAlarm(hour, minute));
        setAlarms(newAlarmsArray);
        saveAlarmsArray(newAlarmsArray);
        goBack();
    }

    return (
        <div className="addAlarmContainer">
            <StatusBar />
            <div className="addAlarmContent">
                <Typography variant="h3">Add Alarm</Typography>
                <div className="addAlarmForm">
                    <Divider />
                    <div className="alarmInputContainer">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                label="Select an alarm time"
                                value={selectedTime}
                                onChange={handleDateChange}
                                renderInput={(params) => (
                                    <TextField {...params} helperText="" />
                                )}
                            />
                        </LocalizationProvider>
                        <Button variant="contained" onClick={saveAlarm}>
                            Save Alarm
                        </Button>
                    </div>
                </div>
            </div>
            <BottomBackBar />
        </div>
    );
}
