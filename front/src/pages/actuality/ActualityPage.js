// React Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Alert, Input, Row, Col, Container } from 'reactstrap';
import CurrentWeather from '../../components/weather/CurrentWeather';
import Backend from '../../backend';

import * as ProfilesActions from '../../store/actions/profiles';
import ForecastWeather from '../../components/weather/ForecastWeather';
import TwitterAbout from '../../components/Twitter/TwitterDisplaySubject';
import ImgurDisplay from '../../components/imgur/ImgurDisplay';
import CustomCarousel from '../../components/Images/CustomCarousel';

class ActualityPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            current: {
                id: -1,
                name: '',
            },
            data: {},
            error: '',
        };
    }

    async componentDidMount() {
        const { setProfiles } = this.props;

        setProfiles().then(res => res.length !== 0 ? this.setState({ current: res[0] }) : this.setState({ error: 'No profile available. Please contact an administrator' }));
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.state.current.id !== prevState.current.id) {
            Backend.profiles.getProfileModules(this.state.current.name).then(data => this.setState({ data }));
        }
    }

    renderText(data, style={}) {
        return (
            <Col className="h-100" style={{ ...style, border: '1px solid black' }}>
                <div className="text_component">
                    {data.title ? <h1>{data.title}</h1> : null}
                    {data.content ? <p>{data.content}</p> : null}
                </div>
            </Col>
        );
    }

    renderVideo(data, style = {}) {
        return (
            <Col className="h-100" style={{ ...style, border: '1px solid black' }}>
                <iframe src={`${data.url.replace(/watch\?v=/gm, 'embed/')}?controls=0&autoplay=1&playlist=${data.url.match(/watch\?v=(.*)/)[1]}&loop=1`} style={{ height: '100%', width: '100%' }} />
            </Col>
        );
    }

    renderImages(data, style = {}) {
        if (data.length && data.length > 1) {
            return (
                <Col className="h-100" style={{...style, border: '1px solid black' }}>
                    <CustomCarousel items={data} />
                </Col>
            );
        }
        return (
            <Col className="h-100" style={{...style, border: '1px solid black' }}>
                <div className="h-100 d-flex justify-content-center">
                    <img src={data.src} alt={data.alt ? data.alt : 'representation of the subject'} style={{ height: '100%', display: 'block', maxWidth: '100%', maxHeight: '100%', objectFit:'contain' }}/>
                </div>
            </Col>
        );
    }

    renderTweets(data, style = {}) {
        return <Col className="h-100" style={{...style, border: '1px solid black', overflow: 'auto' }}><TwitterAbout twitterOptions={data} /></Col>;
    }

    renderIMGUR(data, style = {}) {
        return <Col className="h-100" style={{ ...style, border: '1px solid black', overflow: 'auto' }}><ImgurDisplay /></Col>;
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

    renderProfile(data, i = 0) {
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
                                    {this.renderProfile(module.subModules, i + 1)}
                                </Row>
                                :
                                <div className="h-50">
                                    {this.renderProfile(module.subModules, i + 1)}
                                </div>
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
                            return this.renderText(service.data);
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
        const { current, data, error } = this.state;

        console.log(data)
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
                <div style={{ maxHeight: '900px', height: '100%' }}>
                    {current.id === -1 ?
                        (error ?
                            <Alert color="info">{error}</Alert>
                            :
                            <p>Loading profiles....</p>

                        ) :
                        this.renderProfile(data.subModules)
                    }
                </div>
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
