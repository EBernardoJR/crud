import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import Home from './components/home/home'
import UserCrud from './components/user/userCrud'


export default props =>
    <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route path='/users' component={UserCrud}></Route>
        <Redirect from='*' to='/'></Redirect>
    </Switch>