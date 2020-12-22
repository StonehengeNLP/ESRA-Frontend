import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// pages 
import  Home from './pages/Home'
import SearchResult from './pages/SearchResult'

export const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/search?key=:key" component={SearchResult} />
            </Switch>
        </Router>
    )
}
