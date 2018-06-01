import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Message, MessageHeader } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';

class LoginForm extends React.Component {
    state = {
        data: { email: "", password: "" },
        loading: false,
        errors: {},
        isNull: true
    }

    onChange = e =>
        this.setState({
            isNull: false,
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });

    onSubmit = () => {
        const errors = this.validate(this.state.data)
        this.setState({ errors })
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            this.props
                .submit(this.state.data)
                .catch(err => this.setState({ errors: err.response.data.errors, loading: false }))
        }
    }
    validate = (data) => {
        const errors = {};
        if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
        if (!data.password) errors.password = "can't be blank";
        return errors
    }




    render() {
        const { data, errors, isNull, loading } = this.state;

        return (
            <Form onSubmit={this.onSubmit} loading={loading}>
                {errors.global && (
                    <Message negative>
                        <MessageHeader>Somthing went wrong</MessageHeader>
                        <p>{errors.global}</p>
                    </Message>
                )}

                <Form.Field error={!!errors.email}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="example@example.com"
                        value={data.email}
                        onChange={this.onChange}
                    />
                    {errors.email && <InlineError text={errors.email} />}
                </Form.Field>
                <Form.Field error={!!errors.password}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Make it secure"
                        value={data.password}
                        onChange={this.onChange}
                    />
                    {errors.email && <InlineError text={errors.password} />}
                </Form.Field>
                <Button primary disabled={isNull}>Login</Button>
            </Form>

        );
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired,
}

export default LoginForm;
