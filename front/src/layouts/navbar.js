/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import Cookies from 'js-cookie';

export default class Navbar extends Component {
    logout() {
        Cookies.remove('token');
        Cookies.remove('refresh-token');
    }

    render() {
        return (
            <nav className="navbar">
                <div className="container-fluid">
                    <div className="navbar-holder d-flex align-items-center justify-content-between">
                        <div className="navbar-header">
                            <div className="navbar-brand d-none d-sm-inline-block">
                                <div className="brand-text d-none d-lg-inline-block">
                                    <strong>Connected Device Configuration</strong>
                                </div>
                                <div className="brand-text d-none d-sm-inline-block d-lg-none">
                                    <strong>CDC</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}
