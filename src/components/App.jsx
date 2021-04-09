import React from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Main from './main/Main'
import './App.less'
import Card from './card/Card'

const App = () => {
    const dispatch = useDispatch()

    return (
        <BrowserRouter>
            <div className="container">
                <Switch>
                <Route exact path='/' component={Main} />
                <Route path='/card/:username/:reponame' component={Card} />
                <Redirect to='/'/>
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App
