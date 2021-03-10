import React from 'react';
import { useHistory } from 'react-router';
import { AppProperties } from './AppToolbar';

export default function AppButton(props: AppProperties) {
    const history = useHistory();
    const { name, icon, path } = props;
    return (
        <div
            className="appButton" 
            onClick={() => {
                history.push(path);
            }}
        >
            {icon}
            <h2>{name}</h2>
        </div>
    );
}
