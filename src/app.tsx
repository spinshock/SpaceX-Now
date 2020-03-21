import React, { useState, useCallback } from 'react';
import { Switch, Route } from 'react-router-dom';
import LaunchList, { LaunchListState } from './components/launch-list';
import './app.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import Navbar from './components/navbar';
import LaunchDetails from './components/launch-details/launch-details';

const agpqClient = new ApolloClient({
    uri: 'https://spacexdata.herokuapp.com/graphql',
});

const App: React.FC = () => {
    const [state, setState] = useState({} as LaunchListState);
    const setStateWrap = useCallback((s: LaunchListState): void => {
        setState(s);
    }, []);
    return (
        <ApolloProvider client={agpqClient}>
            <Navbar>
                <div id="main">
                    <Switch>
                        <Route exact path="/launches">
                            <LaunchList
                                state={state}
                                updateState={setStateWrap}
                            />
                        </Route>
                        <Route
                            path="/launches/:launchId"
                            component={LaunchDetails}
                        />
                    </Switch>
                </div>
            </Navbar>
        </ApolloProvider>
    );
};

export default App;
