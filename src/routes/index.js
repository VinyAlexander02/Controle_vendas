import React from 'react';
import { ContextProvider } from '../common/context/context';
import { Switch, Route } from 'react-router-dom';
import { Registration } from '../views/registration';
import { Home } from '../views/home';
import { Sells } from '../views/sells';
import { Accompaniment } from '../views/accompaniment';
import { CreateUSer } from '../views/createUser'

export const Routes = () => {
    return (
        <Switch>
            <ContextProvider>
                <Route component={Home} path='/' exact />
                <Route component={Registration} path='/registration' />
                <Route component={Sells} path='/sells' />
                <Route component={Accompaniment} path='/accompaniment' />
                <Route component={CreateUSer} path='/createUser' />
            </ContextProvider>
        </Switch>
    )
}