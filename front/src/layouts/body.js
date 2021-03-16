import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Navbar from './navbar';

export default class Body extends Component {
    render() {
        const { children } = this.props;
        return (
            <div className="page">
                <Navbar />
                <div className="page-content d-flex align-items-stretch">
                    <div className="content-inner">
                        <section>
                            <Container fluid>
                                {children}
                            </Container>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}
