import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

class ProgressForm extends React.Component {
    state = {
        data: {
            progress: 0
        },
        loading: false,
        disabled: true,
        errors: {}
    };

    onChange = e =>
        this.setState({
            ...this.state,
            data: { ...this.state.data, [e.target.name]: e.target.value },
            disabled: false
        });

    onSubmit = e => {
        const data = {
            goodreadsId: this.props.book.goodreadsId,
            userId: this.props.book.userId,
            progress: this.state.data.progress
        }
        e.preventDefault();
        const errors = this.validate(this.state.data.progress);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            this.props
                .submit(data).then(() => this.props.showForm())
                .catch(err =>
                    this.setState({ errors: err.response.data.errors, loading: false })
                );

        }
    };

    validate = data => {

        const errors = {};

        if (data > this.props.book.pages) { errors.progress = "Progress can't be over 100%" }
        if (data < this.props.book.progress) { errors.progress = "You can't go back in progress" }
        return errors;
    };

    render() {
        const { data, errors, loading } = this.state;
        return (
            <Form onSubmit={this.onSubmit} loading={loading}>
                <Form.Field error={!!errors.progress}>
                    <label htmlFor="progress">How many pages did you read today ?</label>
                    <input
                        type="number"
                        id="progress"
                        name="progress"
                        placeholder=""
                        value={data.progress}
                        onChange={this.onChange}
                    />
                    {errors.progress && <InlineError text={errors.progress} />}
                </Form.Field>
                <Button primary disabled={this.state.disabled}>Submit</Button>
            </Form>
        );
    }
};
ProgressForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default ProgressForm;