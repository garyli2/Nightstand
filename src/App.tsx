import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import './App.global.css';
import Alarm from './pages/alarm/Alarm';
import AddAlarm from './pages/alarm/AddAlarm';
import AlarmDisplay from './pages/alarm/AlarmDisplay';
import { getAlarmsArray, UserAlarm } from './pages/alarm/alarmUtils';
import { intervalToDuration } from 'date-fns/esm';
import { addDays, milliseconds } from 'date-fns';

const MS_TO_DAY = 1 * 24 * 60 * 60 * 1000;


export default function App() {
    const isAlarmActiveState = useState(false), [isAlarmActive, setIsAlarmActive] = isAlarmActiveState;
    const [alarmGoingOff, setAlarmGoingOff] = useState<UserAlarm | null>(null);
    const alarmsState = useState(getAlarmsArray()), [alarms] = alarmsState;
    const alarmTimeoutIdMapState = useState(new Map<string, number>()), [alarmTimeoutIdMap, setAlarmTimeoutIdMap] = alarmTimeoutIdMapState;

    // logic for setting setTimeout for each of our alarms
    useEffect(() => {
        for (const alarm of alarms) {
            if (alarmTimeoutIdMap.get(alarm.id) !== undefined) { return }
            // Alarm is either ahead, behind or at our current temporal position
            // ahead:
            // Alarm hour: 10, minute: 10
            // Cur hour: 8, 10

            // behind:
            // Alarm hour: 5, minute: 10
            // Cur hour: 8, 10
            // meaning it will happen tomorrow
            const nowDate = new Date(), alarmDate = new Date();
            const nowHour = nowDate.getHours(), nowMinute = nowDate.getMinutes();
            const alarmHour = alarm.time.hour, alarmMinute = alarm.time.minute;
            let timeDurationFromNowToAlarm: number;
            alarmDate.setHours(alarmHour);
            alarmDate.setMinutes(alarmMinute);
            alarmDate.setSeconds(0);
            // ahead
            if (alarmHour > nowHour || alarmHour === nowHour && alarmMinute > nowMinute) {
                timeDurationFromNowToAlarm = milliseconds(intervalToDuration({
                    start: nowDate,
                    end: alarmDate
                }));
            } else if (alarmHour !== nowHour || alarmMinute !== nowMinute) { // alarm is next day
                timeDurationFromNowToAlarm = milliseconds(intervalToDuration({
                    start: nowDate,
                    end: addDays(alarmDate, 1)
                }));
            } else { // the alarm is right now. should only happen once, when the app is opened when an alarm is supposed to go off
                setAlarmGoingOff(alarm);
                setIsAlarmActive(true);
                timeDurationFromNowToAlarm = MS_TO_DAY;
            }

            // set a setTimeout
            const timeoutID = setTimeout(() => {
                setIsAlarmActive(true);
                setAlarmGoingOff(alarm);
                // remove the settimeout id since it has happened
                const newIdMap = new Map(alarmTimeoutIdMap);
                newIdMap.delete(alarm.id);
                setAlarmTimeoutIdMap(newIdMap);

            }, timeDurationFromNowToAlarm);
            const newIdMap = new Map(alarmTimeoutIdMap);
            newIdMap.set(alarm.id, timeoutID as unknown as number);
            setAlarmTimeoutIdMap(newIdMap);
        }

    }, [alarms, alarmTimeoutIdMap])

    if (alarmGoingOff && isAlarmActive) {
        return <AlarmDisplay alarmToDisplay={alarmGoingOff} isAlarmActiveState={isAlarmActiveState} />;
    }

    return (
        <Router>
            <Switch>
                <Route exact path="/alarm/" >
                    <Alarm alarmsState={alarmsState} alarmTimeoutIdMapState={alarmTimeoutIdMapState} />
                </Route>
                <Route exact path="/alarm/add">
                    <AddAlarm alarmsState={alarmsState} />
                </Route>
                <Route path="/" component={Dashboard} />
            </Switch>
        </Router>
    );
}
