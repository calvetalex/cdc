// React Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import {
    Card, CardHeader, CardBody,
} from 'reactstrap';

class CollapsedCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: true,
        };
    }

    render() {
        const { children, title, ...otherProps } = this.props;
        const { collapsed } = this.state;

        return (
            <Card {...otherProps}>
                <CardHeader style={{ cursor: 'pointer' }} className="d-flex justify-content-between align-items-center" onClick={() => this.setState({ collapsed: !collapsed })}>
                    <h3 className="h4">{title}</h3>
                    <i className={`fa fa-arrow-${collapsed ? 'down' : 'up'} fa-lg`} />
                </CardHeader>
                <CardBody style={{ display: collapsed ? 'none' : null }}>
                    {children}
                </CardBody>
            </Card>
        );
    }
}

CollapsedCard.propTypes = {
    title: PropTypes.string,
};

CollapsedCard.defaultProps = {
    title: 'Untitled section',
};

export default CollapsedCard;
