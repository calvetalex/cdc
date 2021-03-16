import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoginForm from '../../components/Login/LoginForm';
import AdminSelector from '../../components/admin/AdminSelector';

class Admin extends Component {
    render() {
        const { user } = this.props;

        if (!user || Object.keys(user).length === 0) {
            return <LoginForm />;
        }
        return (
            <AdminSelector user={user} />
        );
    }
}

const mapState = state => ({
    user: state.user,
});

Admin.propTypes = {
    user: PropTypes.object.isRequired,
};

export default connect(
    mapState,
    null,
)(Admin);
