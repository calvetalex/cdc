import React, { Component } from 'react';

import {
    Form,
    FormGroup,
    Alert,
    Label,
    Input,
    Button,
} from 'reactstrap';
import Backend from '../../backend';

class UserForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formValues: {
                email: '',
                username: '',
                password: '',
                check: '',
            },
            error: '',
            success: '',
        };
    }

    handleChange(ev) {
        const { formValues } = this.state;
        const newData = { [ev.target.name]: ev.target.value };

        this.setState({ formValues: { ...formValues, ...newData } });
    }

    async submit() {
        const { formValues } = this.state;

        if (!formValues.email || !formValues.username || !formValues.password || formValues.password !== formValues.check) {
            this.setState({ error: 'Incorrect Password' });
            return false;
        }
        try {
            const { password, email, username } = formValues;
            return Backend.user.create({
                password, email, username, admin: true,
            }).then(resp => (!!resp));
        } catch (e) {
            return false;
        }
    }

    renderForm() {
        const { error, success, formValues } = this.state;

        return (
            <div>
                {error ? <Alert color="danger">{error}</Alert> : null}
                {success ? <Alert>{success}</Alert> : null}
                <Form>
                    <FormGroup>
                        <Label for="usernameInput">Username:</Label>
                        <Input id="usernameInput" name="username" onChange={ev => this.handleChange(ev)} value={formValues.username} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="emailInput">Email:</Label>
                        <Input id="emailInput" name="email" onChange={ev => this.handleChange(ev)} value={formValues.email} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="passwordInput">Password:</Label>
                        <Input id="passwordInput" name="password" type="password" onChange={ev => this.handleChange(ev)} value={formValues.password} />
                        <Label for="passwordInput">Confirm password:</Label>
                        <Input id="passwordInput" name="check" type="password" onChange={ev => this.handleChange(ev)} value={formValues.check} />
                    </FormGroup>
                </Form>
                <Button
                    color="success"
                    onClick={() => this.submit().then(resp => (resp ? this.setState({
                        formValues: {
                            username: '', email: '', password: '', check: '',
                        },
                        error: '',
                        success: 'Administrator created',
                    }) : this.setState({ error: 'An error occurred, please retry', success: '' })))}
                >
                    Submit
                </Button>
                <Button
                    color="danger"
                    onClick={() => this.setState({
                        formValues: {
                            username: '', email: '', password: '', check: '',
                        },
                        success: '',
                        error: '',
                    })}
                >
                    Cancel
                </Button>
            </div>
        );
    }

    render() {
        return (
            <div>
                <h1>Add an administrator to your CDC</h1>
                {this.renderForm()}
            </div>
        );
    }
}

export default UserForm;
