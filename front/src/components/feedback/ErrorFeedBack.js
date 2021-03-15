// react core
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// components
import { Alert } from 'reactstrap';
import Modal from '../Modal';

class ErrorFeedBack extends Component {
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
                title="Erreur"
            >
                <b>Une erreur est survenue.</b>
                <br />
                <small>Si le problème persiste, merci de nous en faire part afin que nous puissions le régler.</small>
                <br />
                <Alert color="danger">{children}</Alert>
            </Modal>
        );
    }
}

ErrorFeedBack.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
};

ErrorFeedBack.defaultProps = {
    isOpen: true,
    onClose: () => {},
};

export default ErrorFeedBack;
