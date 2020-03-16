import React, { FunctionComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import LaunchList from './components/launches/launch-list';
import './app.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Navbar from './components/navbar';

const agpqClient = new ApolloClient({
    uri: 'https://spacexdata.herokuapp.com',
});

const App: FunctionComponent = () => (
    <ApolloProvider client={agpqClient}>
        <Navbar>
            <div id="main">
                <Switch>
                    <Route path="/launches">
                        <LaunchList />
                    </Route>
                </Switch>
            </div>
        </Navbar>
    </ApolloProvider>
);

export default App;
