import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import './App.global.css';
import Timer from './pages/Timer';

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/timer" component={Timer} />
                <Route path="/" component={Dashboard} />
            </Switch>
        </Router>
    );
}
