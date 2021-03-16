// React Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Carousel, CarouselItem, CarouselIndicators, CarouselControl } from 'reactstrap';
import Backend from '../../backend';

import * as ProfilesActions from '../../store/actions/profiles';

class ActualityPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            current: {
                id: -1,
                name: '',
            },
            data: {},
        };
    }

    async componentDidMount() {
        const { setProfiles } = this.props;

        setProfiles().then(res => res.length !== 0 ? this.setState({ current: res[0] }) : null);
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.state.current.id !== prevState.current.id) {
            Backend.profiles.getProfileModules(this.state.current.name).then(data => this.setState({ data }));
        }
    }

    renderText(data) {
        return (
            <div className="text_component">
                {data.title ? <h1>{data.title}</h1> : null}
                {data.content ? <p>{data.content}</p> : null}
            </div>
        );
    }

    renderVideo(data) {
        return (<iframe src={`${data.url.replace(/watch\?v=/gm, 'embed/')}?controls=0&autoplay=1&playlist=${data.url.match(/watch\?v=(.*)/)[1]}&loop=1`} style={{ height: '100%' }} />);
    }

    renderImages(data) {
        if (data.length && data.length > 1) {
            return (<p>insert here Carousel item</p>);
        }
        return <img src={data.src} alt={data.alt ? data.alt : 'representation of the subject'} />;
    }

    renderTweets(data) {
        return <p>Render Tweets</p>;
    }

    renderIMGUR(data) {
        return <p>render IMGUR here</p>;
    }

    renderWeather(data) {
        return <p>render weather here</p>;
    }

    renderProfile(data) {
        if (!data || Object.keys(data).length === 0) {
            return null;
        }
        console.log(data);
        return (data.modules.map(module => {
            if (module.subModules && module.subModules.length !== 0) {
                return (
                    <div className="h-100">
                        <Row vertical={module.split === 1} className="h-100">
                            {module.subModules.map(subModule => {
                                <Col className="h-100">
                                    {this.renderProfile(subModule)}
                                </Col>
                            })}
                        </Row>
                    </div>
                );
            }
            return module.services.map(service => {
                switch (service.service_type) {
                    case 0:
                        return this.renderText(service.data);
                    case 1:
                        return this.renderVideo(service.data);
                    case 2:
                        return this.renderImages(service.data);
                    case 3:
                        return this.renderTweets(service.data);
                    case 4:
                        return this.renderIMGUR(service.data);
                    case 5:
                        return this.renderWeather(service.data);
                    default:
                        return renderText(service.data);
                }
            })
        }))
    }

    render() {
        const { current, data } = this.state;

        return (
            <div className="d-flex flex-column h-100">
                <h1>Display here</h1>
                {current.id === -1 ?
                    <p>Loading profiles....</p>
                    :
                    this.renderProfile(data)
                }
            </div>
        );
    }
}

const mapState = state => ({
    profiles: state.profiles,
});

const mapDispatch = {
    setProfiles: ProfilesActions.setProfiles,
};

export default connect(
    mapState,
    mapDispatch,
)(ActualityPage);
