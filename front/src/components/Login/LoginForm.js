import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
    Form, FormGroup, Input, InputGroup, InputGroupText, InputGroupAddon, Alert, Button,
} from 'reactstrap';
import Spinner from '../Spinner';
import * as UserAction from '../../store/actions/user';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formValues: {
                email: '',
                password: '',
            },
            isLoading: false,
            error: '',
        };
    }

    handleChange(ev) {
        const { formValues } = this.state;
        const newData = { [ev.target.name]: ev.target.value };
        this.setState({ formValues: { ...formValues, ...newData } });
    }

    login() {
        const { setUser } = this.props;
        const { formValues } = this.state;

        this.setState({ isLoading: true });
        setUser(formValues).then((user) => {
            if (!user || Object.keys(user).length === 0) {
                this.setState({ isLoading: false, error: 'Veuillez vérifier les informations fournies' });
            }
        });
    }

    render() {
        const { isLoading, error } = this.state;
        return (
            <div className="d-flex flex-column align-items-center" style={{ margin: 'auto', marginTop: '15em' }}>
                {isLoading ?
                    <Spinner />
                    :
                    null
                }
                <h1>CDC Admin Panel</h1>
                <Form style={{ margin: '3em' }} action="/">
                    {error ?
                        <Alert color="danger">
                            {error}
                        </Alert>
                        : null
                    }
                    <FormGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Email</InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="emailInput" name="email" placeholder="example@gmail.com" onChange={ev => this.handleChange(ev)} />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Mot de passe</InputGroupText>
                            </InputGroupAddon>
                            <Input type="password" id="passwordInput" name="password" onChange={ev => this.handleChange(ev)} />
                        </InputGroup>
                    </FormGroup>
                    <Button color="primary" onClick={() => this.login()}>Connexion</Button>
                </Form>
            </div>
        );
    }
}

LoginForm.propTypes = {
    setUser: PropTypes.func.isRequired,
};

const mapDispatch = {
    setUser: UserAction.setUser,
};

export default connect(
    null,
    mapDispatch,
)(LoginForm);
