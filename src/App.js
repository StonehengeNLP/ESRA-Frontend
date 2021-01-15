import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom'

// pages 
import  Home from './pages/Home'
import Paper from './pages/Paper'
import SearchResult from './pages/SearchResult'

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0,0);
    }, [pathname])

    return null;
}

export const App = () => {
    return (
        <Router>
            <ScrollToTop />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/search" component={SearchResult} />
                <Route path="/paper/:id/" component={props => <Paper {...props} />} key={window.location.pathname}/>
            </Switch>
        </Router>
    )
}
