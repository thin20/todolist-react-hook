import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

PostFiltersForm.propTypes = {
    onSubmit: PropTypes.func,
};

PostFiltersForm.defaultProps = {
    onSubmit: null,
}

function PostFiltersForm(props) {
    const { onSubmit } = props;
    const [searchTerm, setSearchTerm] = useState('');
    // useRef giúp mình tạo ra những object và nó sẽ không bị thay đổi sau những lần render.
    const typingTimeoutRef = useRef(null);

    function handleSearchChange(e) {
        const value = e.target.value;
        setSearchTerm(e.target.value);

        if (!onSubmit) return;

        // SET -- 100 -- CLEAR, SET -- 300 --> SUBMIT
        // SET -- 300 --> SUBMIT
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            const formValues = {
                searchTerm: value,
            };
            onSubmit(formValues);
        }, 300);

    }

    return (
        <form>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search..."
            />
        </form>
    );
}

export default PostFiltersForm;