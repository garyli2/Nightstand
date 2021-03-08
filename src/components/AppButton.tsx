/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useHistory } from 'react-router';
// eslint-disable-next-line import/no-cycle
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
