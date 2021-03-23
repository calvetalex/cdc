import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Row,
    Col,
    Nav,
    NavItem,
} from 'reactstrap';
import UserForm from './UserForm';
import Settings from './Settings';
import ProfileForm from './ProfileForm';

const STATUS = {
    PROFILE: 0,
    USER: 1,
    SETTINGS: 2,
};

class AdminSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            current: STATUS.PROFILE,
            currentId: -1,
        };
    }

    renderSection() {
        const { user } = this.props;
        const { current } = this.state;

        switch (current) {
            case STATUS.PROFILE:
                return <ProfileForm />;
            case STATUS.USER:
                return <UserForm />;
            case STATUS.SETTINGS:
                return <Settings user={user} />;
            default:
                return this.renderProfile();
        }
    }

    render() {
        return (
            <div>
                <h1>Admin Panel</h1>
                <p>You can use this panel to configure your profiles or to add an administrator.</p>
                <Row style={{ background: 'rgb(210,210,210)' }}>
                    <Col sm={12} style={{ border: '1px solid black', padding: '5px' }} style={{ background: 'rgb(180,180,180)' }}>
                        <Nav className="justify-content-between">
                            {Object.keys(STATUS).map(elem => (
                                <NavItem key={`status-${elem}`}>
                                    <button
                                        type="button"
                                        onClick={() => this.setState({ current: STATUS[elem] })}
                                        style={{
                                            width: '100%',
                                            backgroundColor: 'transparent',
                                            backgroundRepeat: 'no-repeat',
                                            border: 'none',
                                            padding: '5px',
                                            cursor: 'pointer',
                                            overflow: 'hidden',
                                            outline: 'none',
                                            fontSize: '22px',
                                        }}
                                    >
                                        <strong>
                                            {elem}
                                        </strong>
                                    </button>
                                </NavItem>
                            ))}
                        </Nav>
                    </Col>
                    <Col sm={12} style={{ border: '1px solid black', padding: '5px' }}>
                        {this.renderSection()}
                    </Col>
                </Row>
            </div>
        );
    }
}

AdminSelector.propTypes = {
    user: PropTypes.object.isRequired,
};

export default AdminSelector;
