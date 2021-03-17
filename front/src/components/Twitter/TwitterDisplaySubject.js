import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ListGroup, ListGroupItem } from 'reactstrap';
import Backend from '../../backend';
import Container from 'reactstrap/lib/Container';

class TwitterAbout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tweets: [],
        };
        let intervalID;
    }

    static formatDate(date) {
        const newDate = new Date(date);
        return `${newDate.getDate()} / ${newDate.getMonth() + 1} / ${newDate.getFullYear()}`;
    }

    componentDidMount() {
        this.getTweets();
        this.intervalID = setInterval(this.getTweets.bind(this), 300000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    getTweets() {
        const { twitterOptions } = this.props;
        if (twitterOptions.subject) {
            Backend.twitter.getTweetsAbout(twitterOptions.subject).then(res => this.setState({ tweets: res }));
        }
    }

    render() {
        const { twitterOptions } = this.props;
        const { tweets } = this.state;

        console.log(tweets)
        return (
            <div className="h-100" style={{ padding: '10px', overflow: 'auto' }}>
                <div style={{ maxHeight: '60px', margin: '15px' }} className="d-flex align-items-center">
                    <img src="https://upload.wikimedia.org/wikipedia/fr/thumb/c/c8/Twitter_Bird.svg/1200px-Twitter_Bird.svg.png" alt="logo twitter" style={{ width: 'auto', height: '60px' }} />
                    {twitterOptions.subject ?
                        <h3 style={{ marginLeft: '10px' }}>{`You are looking for : ${twitterOptions.subject}`}</h3>
                        : null
                    }
                </div>
                <Container  style={{ overflow: 'auto' }}>
                    <ListGroup>
                        { tweets ? tweets.map(tweet => {
                            if (tweet.lang !== "en" && tweet.lang !== "fr") {
                                return null;
                            }
                            return (
                            <ListGroupItem key={`tweets-item-${tweet.id}`}>
                                <div style={{ margin: '5px', width: '100%' }} className="d-flex justify-content-between">
                                    <span>{tweet.user}</span>
                                    <span>{TwitterAbout.formatDate(tweet.created_at)}</span>
                                </div>
                                {tweet.text}
                            </ListGroupItem>
                            );
                        }) : null}
                    </ListGroup>
                </Container>
            </div>
        );
    }
}

TwitterAbout.propTypes = {
    twitterOptions: PropTypes.object.isRequired,
};

export default TwitterAbout;
