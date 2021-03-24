import React, { Component } from "react";
import { connect } from "react-redux";

import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import CollapsedCard from "../CollapsedCard";

import ServiceConfig from './Config.json';
import * as ProfilesActions from "../../store/actions/profiles";

const DIRECTION = {
    DEFAULT: 0,
    VERTICAL: 1,
    HORIZONTAL: 2,
};

const IService = {
    id: 1,
    fk_module_id: 2,
    place: 0,
    service_type: 2,
    data: {},
};

const IModule = {
    id: 2,
    fk_parent_id: 1,
    split: DIRECTION.DEFAULT,
};

class ProfileForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: {
                id: 1,
                name: "",
                services: [{...IService}],
                subModules: [{ ...IModule }],
            },
        };
    }

    async componentDidMount() {
        console.log("GET PROFILES HERE TO ENABLE UPDATE");
    }

    addService(parent) {
        const { profile } = this.state;

        const service = { ...IService };
        service.fk_module_id = parent;
        this.setState({ profile: {...profile, services: [...profile.services, service]} });
    }

    removeService(parentID) {
        const { profile } = this.state;
        this.setState({ profile: {...profile, services: profile.services.filter(e => e.fk_module_id !== parentID)} });
    }

    splitModule(id, direction) {
        const { profile } = this.state;

        const currentModule = profile.subModules.find((elem) => elem.id === id);
        currentModule.split = direction;
        const subModule1 = { ...IModule };
        const subModule2 = { ...IModule };
        subModule1.fk_parent_id = id;
        subModule2.fk_parent_id = id;
        subModule1.id = -profile.subModules.length - 1;
        subModule2.id = -profile.subModules.length - 2;
        this.setState({
            profile: {
                ...profile,
                subModules: [...profile.subModules, subModule1, subModule2],
                services: [...profile.services.filter(e => e.fk_module_id !== id), {...IService, fk_module_id: subModule1.id}, {...IService, fk_module_id: subModule2.id}],
            },
        });
    }

    handleChange(element, ev) {
        const { profile } = this.state;
        const newData = { [ev.target.name]: ev.target.value };

        console.log("TARGET ", element);
        console.log("EVENT NAME: " + ev.target.name + " VALUE: " + ev.target.value)
        console.log(`DEFAULT ? ${+ev.target.value === DIRECTION.DEFAULT}`)
        if (element.fk_parent_id) {
            if (!profile.subModules.find((e) => e.fk_parent_id === element.id)) {
                console.log("SPLIT")
                return this.splitModule(element.id, +ev.target.value);
            } else if (+ev.target.value === DIRECTION.DEFAULT) {
                console.log("UNSPLIT")
                return this.setState({
                    profile: {
                        ...profile,
                        subModules: profile.subModules
                            .map((e) => {
                                console.log(e)
                                if (e.id === element.id) {
                                    e.split = DIRECTION.DEFAULT;
                                }
                                return e.fk_parent_id !== element.id ? e : null;
                            })
                            .filter((e) => e !== null && e !== undefined),
                        services: [...profile.services.filter(e => profile.subModules.find(m => m.id === e.fk_module_id).fk_parent_id !== element.id), {...IService, fk_module_id: element.id}],
                    },
                });
            } else {
                console.log("CHANGE SPLIT")
                return this.setState({ profile: {...profile, subModules: profile.subModules.map(e => {
                    if (e.id === element.id) {
                        e.split = +ev.target.value;
                    }
                    return e;
                })} })
            }
        } else if (element.fk_module_id) {
            return this.setState({
                profile: {
                    ...profile,
                    services: profile.services.map((elem) => {
                        if (elem.id === element.id) {
                            return { ...elem, data: {...elem.data, ...newData }};
                        }
                        return elem;
                    }),
                },
            });
        }
        console.log("no changes");
    }

    renderService(moduleID) {
        const { profile } = this.state;

        return profile.services.map(e => {
            if (e.fk_module_id === moduleID) {
                const data = ServiceConfig.services.find(s => s.service_type === e.service_type);
                return (
                    <div style={{ margin: '.3em' }}>
                        <Input type="select" name="service-type" onChange={ev => this.setState({ profile: {...profile, services: profile.services.map(serv => serv.id === e.id ? {...serv, service_type: +ev.target.value, data: {}} : e)} })}>
                            {ServiceConfig.services.map(opt => (
                                <option value={opt.service_type} selected={opt.service_type === e.service_type}>{opt.name}</option>
                            ))}
                        </Input>
                        {data.data ?
                            <div>
                                <h4>{data.name}</h4>
                                {data.data.map(d => (
                                    <div>
                                        <Label>{`${d.name} :`}</Label>
                                        {d.content === "select" ?
                                            <Input type="select" name={d.name} onChange={(ev) => this.setState({ profile: {...profile, services: profile.services.map(serv => serv.id === e.id ? {...serv, data: {...serv.data, [ev.target.name]: d.values[ev.target.value]}} : serv)} })}>
                                                <option value={-1}>-- SELECT --</option>
                                                {d.values.map((opt, idx) => <option value={idx}>{opt}</option>)}
                                            </Input>
                                            :
                                            <Input type={d.content} name={d.name} onChange={ev => this.handleChange(e, ev)} />
                                        }
                                    </div>
                                ))}
                            </div>
                            : "This service does not require any user action to work."
                        }
                    </div>
                )
            }
            return null;
        }).filter(e => e !== null && e !== undefined);
    }

    renderModules(parentId) {
        const { profile } = this.state;
        console.log(profile);

        const modules = profile.subModules
            .map((module) => {
                if (module.fk_parent_id !== parentId) {
                    return null;
                }
                return (
                    <div key={`module-${module.id}`} style={{ margin: '1em', border: '1px solid black', padding: '1.5em', boxShadow: '.2em .2em .1em .1em teal'}}>
                        <FormGroup>
                            <Label for="splitInput">
                                Do you want to split the screen ?
                            </Label>
                            <Input
                                id="splitInput"
                                name="split"
                                type="select"
                                onChange={(ev) => this.handleChange(module, ev)}
                            >
                                <option value={0}>DEFAULT</option>
                                <option value={1}>VERTICAL</option>
                                <option value={2}>HORIZONTAL</option>
                            </Input>
                            {module.split !== DIRECTION.DEFAULT ? (
                                <CollapsedCard title="sub modules">
                                    {this.renderModules(module.id)}
                                </CollapsedCard>
                            ) : (
                                this.renderService(module.id)
                            )}
                        </FormGroup>
                    </div>
                );
            })
            .filter((e) => e !== null && e !== undefined);
        if (modules.length !== 0) {
            return modules.map((e) => e);
        }
        return null;
    }

    render() {
        const { profile } = this.state;

        return (
            <div>
                <h1>Here will be the form to update / create profiles...</h1>
                <Form>
                    <FormGroup>
                        <h3>Create a new profile:</h3>
                        <Label for="nameInput">Profile name:</Label>
                        <Input
                            id="nameInput"
                            name="name"
                            onChange={(ev) =>
                                this.setState({
                                    profile: {
                                        ...profile,
                                        name: ev.target.value,
                                    },
                                })
                            }
                        />
                    </FormGroup>
                    {this.renderModules(profile.id)}
                </Form>
            </div>
        );
    }
}

const mapState = (state) => ({
    profiles: state.profiles,
});

const mapDispatch = {
    setProfiles: ProfilesActions.setProfiles,
    addProfile: ProfilesActions.addProfile,
};

export default connect(mapState, mapDispatch)(ProfileForm);
