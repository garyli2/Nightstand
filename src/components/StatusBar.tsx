import React from 'react';
import { BiWifi, BiWifiOff } from 'react-icons/bi';

export default function StatusBar() {
    return (
        <div className="statusBarContainer">
            {navigator.onLine ? (
                <BiWifi className="wifiIndicatorIcon" size={30} />
            ) : (
                <BiWifiOff className="wifiIndicatorIcon" size={30} />
            )}
        </div>
    );
}
