// react core
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// components
import { Alert } from 'reactstrap';
import Modal from '../Modal';

class SuccessFeedBack extends Component {
    render() {
        const {
            isOpen,
            onClose,
            children,
        } = this.props;
        return (
            <Modal
                isOpen={isOpen}
                onClose={() => onClose()}
                validateButton={false}
                title="Succès"
            >
                <Alert color="success">{children}</Alert>
            </Modal>
        );
    }
}

SuccessFeedBack.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
};

SuccessFeedBack.defaultProps = {
    isOpen: true,
    onClose: () => {},
};

export default SuccessFeedBack;
