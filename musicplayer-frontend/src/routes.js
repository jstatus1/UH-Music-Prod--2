import React, {Component} from 'react'
import {Router, Route, Switch, Redirect} from 'react-router'
import NavBar from './components/Navbar/header'
import history from './utils/history'


import MainRegisterForm from './components/profile/main_register_form'
class Routes extends Component
{
    render()
    {
        return(
            <div>
                <Router history={history}>
                    <div>
                    <NavBar/>
                        <Switch>
                            <Route exact path='/'></Route>
                            <Route  path='/register' component={MainRegisterForm}></Route>
                            
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default Routes