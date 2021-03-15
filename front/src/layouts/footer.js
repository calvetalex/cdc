import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

export default class Footer extends Component {
    render() {
        return (
            <footer className="main-footer">
                <Container fluid>
                    <Row className="d-flex p-2">
                        <Col sm="6">
                            <p>
                                Nearmi &copy;
                                {new Date().getFullYear()}
                            </p>
                        </Col>
                    </Row>
                </Container>
            </footer>
        );
    }
}
