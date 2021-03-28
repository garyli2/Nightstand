import React from 'react';
import { BsClockFill } from 'react-icons/bs';
import AppButton from './AppButton';

export type AppProperties = {
    name: string;
    icon: JSX.Element;
    path: string;
};

const APPS: AppProperties[] = [
    {
        name: 'Alarm',
        icon: <BsClockFill className="appIcon" size={70} />,
        path: '/alarm',
    },
];

export default function AppToolbar() {
    return (
        <div className="bottomToolBarContainer">
            {APPS.map((p: AppProperties) => {
                return (
                    <AppButton
                        name={p.name}
                        icon={p.icon}
                        path={p.path}
                        key={p.name}
                    />
                );
            })}
        </div>
    );
}
