import React from 'react';
import PropTypes from 'prop-types';

TodoList.propTypes = {
    todos: PropTypes.array,
    onTodo: PropTypes.func,
};

TodoList.defaultProps = {
    todos: [],
    onTodoClick: null,
}

function TodoList(props) {
    const { todos, onTodoClick } = props;

    function handleClick(todo) {
        if (onTodoClick) {
            onTodoClick(todo);
        }
    }

    return (
        <div>
            <ul className="todo-list">
                {
                    todos.map((todo, index) =>
                        <li key={index}
                            onClick={() => handleClick(todo)}
                        >
                            {todo.title}
                        </li>
                    )
                }
            </ul>
        </div>
    );
}

export default TodoList;