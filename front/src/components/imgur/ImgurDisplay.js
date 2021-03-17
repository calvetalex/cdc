import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Card, CardImg } from 'reactstrap';
import Backend from '../../backend';

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
                        </Card>))}
                </div>
            );
        }
    }

    render() {
        const { posts } = this.state;

        return (
            <div style={{ maxHeight: '800px' }}>
                <div>
                    {posts && posts.length !== 0?
                        this.renderPosts(posts)
                        : <p>Imgur content</p>
                    }
                </div>
            </div>
        );
    }
}

export default ImgurDisplay;
