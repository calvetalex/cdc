import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

class PrivateRoute extends Component {
    renderRoute(props, ComponentToDisplay) {
        return (<ComponentToDisplay {...props} />);
    }

    render() {
        const { component, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={props => this.renderRoute(props, component)}
            />
        );
    }
}

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
    isAuth: PropTypes.func.isRequired,
};

export default PrivateRoute;
