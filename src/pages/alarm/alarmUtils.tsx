import settings from 'electron-settings';
import uuid from 'uuid-random';

// represents an alarm that the user has set
export class UserAlarm {
    id: string;
    time: {
        hour: number;
        minute: number;
    };

    constructor(hour: number, minute: number) {
        this.time = {
            hour: hour,
            minute: minute,
        };
        this.id = uuid();
    }
}

// represents an alarm that has just been deserialized directly from electron-settings
// time is a string since electron-setting's deserialization isn't nested
export interface StoredUserAlarm {
    id: string;
    time: string;
}

// 8am is a good time to get up, birds are chipping..
export const DEFAULT_ALARM: UserAlarm = new UserAlarm(8, 0);

export function getAlarmsArray() {
    if (!alarmSettingsExist()) {
        initAlarmsSetting();
    }

    const rawAlarmSetting = settings.getSync('alarms');

    const alarmArray: UserAlarm[] = [];

    if (rawAlarmSetting instanceof Array) {
        rawAlarmSetting.map((alarm) => {
            if (alarm) {
                const alarmString = alarm.toString();
                alarmArray.push(deserializeUserAlarm(alarmString));
            }
        });
    }
    return alarmArray;
}

export function alarmSettingsExist() {
    return settings.getSync('alarms') !== undefined;
}

export function initAlarmsSetting() {
    settings.setSync('alarms', [serializeUserAlarm(DEFAULT_ALARM)]);
}

export function saveAlarmsArray(alarms: UserAlarm[]) {
    // serialize each element first
    const serialized: string[] = [];
    alarms.map((alarm) => {
        serialized.push(serializeUserAlarm(alarm));
    });
    settings.setSync('alarms', serialized);
}

export function serializeUserAlarm(alarm: UserAlarm): string {
    return JSON.stringify(alarm);
}

export function deserializeUserAlarm(alarmString: string): UserAlarm {
    return JSON.parse(alarmString);
}

export function getCurrentActiveAlarm() {
    const alarmArray = getAlarmsArray();
    const now = new Date();
    const curHour = now.getHours(),
        curMinute = now.getMinutes();

    for (const alarm of alarmArray) {
        const alarmHour = alarm.time.hour,
            alarmMinute = alarm.time.minute;
        if (curHour === alarmHour && curMinute === alarmMinute) {
            return alarm;
        }
    }
    return null;
}
