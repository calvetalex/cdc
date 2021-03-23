import React, { Component } from "react";
import { connect } from "react-redux";

import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import CollapsedCard from "../CollapsedCard";

import * as ProfilesActions from "../../store/actions/profiles";

const DIRECTION = {
    DEFAULT: 0,
    VERTICAL: 1,
    HORIZONTAL: 2,
};

const IService = {
    id: 1,
    fk_module_id: 1,
    place: -1,
    service_type: -1,
    data: JSON,
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
                services: [],
                subModules: [{ ...IModule }],
            },
        };
    }

    async componentDidMount() {
        console.log("GET PROFILES HERE");
    }

    addService(parent) {
        const { profile } = this.state;

        const service = { ...IService };
        service.fk_module_id = parent;
        profile.services.push({ service });
        this.setState({ profile });
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
                            return { ...elem, ...newData };
                        }
                        return elem;
                    }),
                },
            });
        }
        console.log("no changes");
    }

    renderService(moduleID) {
        return <p>Here will be the service choice</p>;
    }

    renderModules(parentId) {
        const { profile } = this.state;
        console.log(profile.subModules);

        const modules = profile.subModules
            .map((module) => {
                if (module.fk_parent_id !== parentId) {
                    return null;
                }
                return (
                    <div key={`module-${module.id}`}>
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
