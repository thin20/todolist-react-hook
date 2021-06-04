import React, { useState } from 'react';
import PropTypes from 'prop-types';

TodoForm.propTypes = {
    onSubmit: PropTypes.func,
};

TodoForm.defaultProps = {
    onSubmit: null,
}

function TodoForm(props) {
    const { onSubmit } = props;
    const [value, setValue] = useState('');

    function handleChange(event) {
        const value = event.target.value;
        setValue(value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!onSubmit) return;
        const formValues = {
            title: value,
        }
        onSubmit(formValues);
        setValue('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={value} onChange={handleChange} />
            <button type="submit">Add todo</button>
        </form>
    );
}

export default TodoForm;