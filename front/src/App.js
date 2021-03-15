import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import Body from './layouts/body';

import PrivateRoute from './components/PrivateRoute';
import _404 from './pages/404';
import ActualityPage from './pages/actuality/ActualityPage';
import Example from './pages/example/Example';


class App extends Component {
    render() {
        return (
            <Body>
                <Switch>
                    <PrivateRoute exact path="/" component={ActualityPage} />
                    <PrivateRoute exact path="/admin" component={Example} />
                    <PrivateRoute path="*" component={_404} />
                </Switch>
            </Body>
        );
    }
}

export default App;
