import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.state = {};
    }

    componentDidMount() {
        this.updateFormValues(this.props);
        this.onChange();
    }

    componentDidUpdate(prevProps) {
        const { formValues, allowPropsUpdate } = this.props;

        if (formValues !== prevProps.formValues && allowPropsUpdate) {
            this.updateFormValues(this.props);
        }
    }

    onChange() {
        const { onChange } = this.props;
        onChange(this.serializeForm());
    }

    onSubmit(ev) {
        const { onSubmit } = this.props;
        ev.preventDefault();
        onSubmit(this.serializeForm());
    }

    updateFormValues(props) {
        const iterableForm = this.iterableFormInputs();

        if (!props.formValues) {
            return;
        }

        for (let i = 0; i < iterableForm.length; i++) {
            const elem = iterableForm[i];

            if (props.formValues[elem.name] === undefined) {
                continue;
            }
            if (elem.attributes.type && elem.attributes.type.value === 'checkbox') {
                elem.checked = props.formValues[elem.name];
            } else if (props.formValues[elem.name] && props.formValues[elem.name].constructor && (props.formValues[elem.name].constructor === Array || props.formValues[elem.name] === Object)) {
                elem.value = JSON.stringify(props.formValues[elem.name]);
            } else {
                elem.value = props.formValues[elem.name];
            }
        }
    }


    clear() {
        this.formRef.current.reset();
    }

    values() {
        return this.serializeForm();
    }

    iterableFormInputs() {
        const form = this.formRef.current;
        const iterableForm = [];
        for (let i = 0; i < form.elements.length; i++) {
            const elem = form.elements[i];
            if (elem.name) {
                iterableForm.push(elem);
            }
        }
        return iterableForm;
    }

    serializeForm() {
        const serializedForm = {};
        const iterableForm = this.iterableFormInputs();
        for (let i = 0; i < iterableForm.length; i++) {
            const elem = iterableForm[i];
            if (elem.attributes.type && elem.attributes.type.value === 'checkbox') {
                serializedForm[elem.name] = elem.checked;
            } else if (elem.attributes.type && elem.attributes.type.value === 'file') {
                serializedForm[elem.name] = elem.files;
            } else {
                serializedForm[elem.name] = elem.value;
            }
        }
        return serializedForm;
    }

    render() {
        const { children } = this.props;
        return (
            <form onChange={ev => this.onChange(ev)} onSubmit={ev => this.onSubmit(ev)} ref={this.formRef}>
                {children}
            </form>
        );
    }
}

Form.propTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    formValues: PropTypes.object,
    allowPropsUpdate: PropTypes.bool,
};

Form.defaultProps = {
    onSubmit: () => {},
    onChange: () => {},
    formValues: {},
    allowPropsUpdate: false,
};

export default Form;
