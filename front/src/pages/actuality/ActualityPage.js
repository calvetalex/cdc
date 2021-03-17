// React Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Carousel, CarouselItem, CarouselIndicators, CarouselControl, Input, Row, Col, Container } from 'reactstrap';
import CurrentWeather from '../../components/weather/CurrentWeather';
import Backend from '../../backend';

import * as ProfilesActions from '../../store/actions/profiles';
import ForecastWeather from '../../components/weather/ForecastWeather';
import TwitterAbout from '../../components/Twitter/TwitterDisplaySubject';

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
            <Col className="h-100" style={{ border: '1px solid black' }}>
                <div className="text_component">
                    {data.title ? <h1>{data.title}</h1> : null}
                    {data.content ? <p>{data.content}</p> : null}
                </div>
            </Col>
        );
    }

    renderVideo(data) {
        return (
            <Col className="h-100" style={{ border: '1px solid black' }}>
                <iframe src={`${data.url.replace(/watch\?v=/gm, 'embed/')}?controls=0&autoplay=1&playlist=${data.url.match(/watch\?v=(.*)/)[1]}&loop=1`} style={{ height: '100%', width: '100%' }} />
            </Col>
        );
    }

    renderImages(data) {
        if (data.length && data.length > 1) {
            return (<Col className="h-100" style={{ border: '1px solid black' }}><p>insert here Carousel item</p></Col>);
        }
        return <Col className="h-100" style={{ border: '1px solid black' }}><img src={data.src} alt={data.alt ? data.alt : 'representation of the subject'} /></Col>;
    }

    renderTweets(data) {
        return <Col className="h-100" style={{ border: '1px solid black' }}><TwitterAbout twitterOptions={data} /></Col>;
    }

    renderIMGUR(data) {
        return <Col className="h-100" style={{ border: '1px solid black' }}><p>render IMGUR here</p></Col>;
    }

    renderWeather(data) {
        return (
            <Col className="h-100" style={{ border: '1px solid black' }}>
                {data.type === "current" ?
                    <CurrentWeather weatherData={data} />
                    :
                    <ForecastWeather weatherData={data} />
                }
            </Col>
        );
    }

    renderProfile(data) {
        if (!data || Object.keys(data).length === 0) {
            return null;
        }
        try {
            return (data.map(module => {
                if (module.subModules && module.subModules.length !== 0) {
                    return (
                        <Container style={{ maxWidth: 'unset' }} className="h-100" key={`module-${module.id}-linkedTo-${module.fk_parent_id}`}>
                            {module.split === 1 ?
                                <Row className="h-100">
                                    {this.renderProfile(module.subModules)}
                                </Row>
                                :
                                <Row className="h-50">
                                    {this.renderProfile(module.subModules)}
                                </Row>
                            }
                        </Container>
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
                });
            }));
        } catch (e) {
            console.error(e);
            console.log(data);
        }
    }

    render() {
        const { profiles } = this.props;
        const { current, data } = this.state;

        return (
            <div className="d-flex flex-column h-100">
                <div className="d-flex justify-content-between" style={{ width: '100%', marginBottom: '1em' }}>
                    <h1>Profile preview:</h1>
                    {profiles ?
                        <Input type="select" style={{ width: '30%' }} name="profile" onChange={(ev) => this.setState({ current: profiles.find(elem => elem.id === Number(ev.target.value)) })}>
                            {profiles.map(p => <option value={p.id} key={`profile-${p.name}`}>{p.name}</option>)}
                        </Input>
                        : null }
                </div>
                {current.id === -1 ?
                    <p>Loading profiles....</p>
                    :
                    this.renderProfile(data.subModules)
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
