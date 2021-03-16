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
                        <section style={{ height: '100%' }}>
                            <Container fluid className="h-100">
                                {children}
                            </Container>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}
