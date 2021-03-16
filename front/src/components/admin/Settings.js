import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Settings extends Component {
    render() {
        const { user } = this.props;

        return (
            <div>
                <h1>Setting Page</h1>
                <div style={{ margin: '1em' }}>
                    <h3>Current informations:</h3>
                    <div style={{ margin: '3px' }}>
                        <p>
                            {`Username: ${user.username}`}
                        </p>
                        <p>
                            {`Email: ${user.email}`}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

Settings.propTypes = {
    user: PropTypes.object.isRequired,
};

export default Settings;
