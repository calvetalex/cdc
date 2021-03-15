import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';

class CustomModal extends Component {
    render() {
        const {
            onValidate,
            onClose,
            children,
            title,
            validateButton,
            ...otherProps
        } = this.props;
        return (
            <Modal {...otherProps} toggle={ev => onClose(ev)}>
                <ModalHeader toggle={ev => onClose(ev)}>{title}</ModalHeader>
                <ModalBody>
                    {children}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={ev => onClose(ev)}>Fermer</Button>
                    {validateButton ? <Button color="primary" onClick={ev => onValidate(ev)}>Valider</Button> : null}
                </ModalFooter>
            </Modal>
        );
    }
}

CustomModal.propTypes = {
    onValidate: PropTypes.func,
    onClose: PropTypes.func,
    validateButton: PropTypes.bool,
    title: PropTypes.string,
};

CustomModal.defaultProps = {
    onValidate: () => {},
    onClose: () => {},
    validateButton: true,
    title: '',
};

export default CustomModal;
