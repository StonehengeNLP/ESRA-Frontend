import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// pages 
import  Home from './pages/Home'

export const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                
            </Switch>
        </Router>
    )
}
