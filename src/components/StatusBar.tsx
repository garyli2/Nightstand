import React, { useEffect, useState } from 'react';
import { BiWifi, BiWifiOff } from 'react-icons/bi';

export default function StatusBar() {
    const [wifiEnabled, setWifiEnabled] = useState(navigator.onLine);

    function onlineEventHandler() {
        setWifiEnabled(true);
    }

    function offlineEventHandler() {
        setWifiEnabled(false);
    }
    
    useEffect(() => {
        window.addEventListener('online', onlineEventHandler);
        window.addEventListener('offline', offlineEventHandler);

        return () => {
            window.removeEventListener('online', onlineEventHandler);
            window.removeEventListener('offline', offlineEventHandler);
        }
    }, [navigator.onLine]);

    return (
        <div className="statusBarContainer">
            {wifiEnabled ? (
                <BiWifi className="wifiIndicatorIcon" size={30} />
            ) : (
                <BiWifiOff className="wifiIndicatorIcon" size={30} />
            )}
        </div>
    );
}
