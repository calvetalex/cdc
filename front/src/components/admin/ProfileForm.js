import React, { Component } from 'react';

class ProfileForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: {},
        };
    }

    async componentDidMount() {
        console.log('GET PROFILES HERE');
    }

    render() {
        return <h1>Here will be the form to update / create profiles...</h1>;
    }
}

export default ProfileForm;
