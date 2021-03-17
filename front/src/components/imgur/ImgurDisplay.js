import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Card, CardImg } from 'reactstrap';
import Backend from '../../backend';
import CardHeader from 'reactstrap/lib/CardHeader';
import CardBody from 'reactstrap/lib/CardBody';

class ImgurDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
        };
        let intervalID;
    }

    componentDidMount() {
        this.getViral();
        this.intervalID = setInterval(this.getViral.bind(this), 300000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    getViral() {
        Backend.imgur.getViralContent().then(posts => {
            const list = [];
            posts = posts.map(p => {
                if (p.images) {
                    return [...p.images.map(i => !i.link.match(/mp4/g) ? i : null).filter(e => e !== null && e !== undefined)]
                }
                return !p.link.match(/mp4/g) ? p : null;
            }).filter(p => p !== null && p !== undefined);
            posts.forEach(p => {
                if (!p.length && p.link) {
                    list.push(p);
                } else if (p && p.length !== 0) {
                    p.forEach(i => list.push(i));
                }
            })
            this.setState({ posts: list });
        });
    }

    renderPosts(data) {
        if (data && data.length !== 0) {
            return (
                <div className="d-flex flex-column align-items-center" style={{ overflow: 'auto' }}>
                    {data.map(p => (
                        <Card key={`meme-${p.id}`} style={{ maxWidth: '512px' }}>
                            <CardImg src={p.link} alt={`meme from ${p.link}`} width="80%" />
                            <CardHeader>
                                <h5>{`Posted by ${p.account_url ? p.account_url : "a guest"}`}</h5>
                            </CardHeader>
                            {p.description ?
                                <CardBody>
                                    {p.description}
                                </CardBody>
                                : null}
                        </Card>))}
                </div>
            );
        }
    }

    render() {
        const { posts } = this.state;

        return (
            <div style={{ maxHeight: '500px' }}>
                <div className="d-flex">
                    <div style={{ maxHeight: '100px', maxWidth: '25%' }}>
                        <img src="https://cdn.kulturegeek.fr/wp-content/uploads/2017/11/Imgur-Logo.jpg" alt="imgur logo" style={{ height: '100%', display: 'block', maxWidth: 'fit-content', maxHeight: '100%', alignSelf: 'center' }} />
                    </div>
                    <div>
                        {posts && posts.length !== 0?
                            this.renderPosts(posts)
                            : <p>Imgur content</p>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default ImgurDisplay;
