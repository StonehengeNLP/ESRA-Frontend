import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// pages 
import  Home from './pages/Home'
import Paper from './pages/Paper'
import SearchResult from './pages/SearchResult'

export const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/search" component={SearchResult} />
                <Route path="/paper/:id" component={Paper} />
            </Switch>
        </Router>
    )
}
