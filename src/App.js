import React, { useEffect, useState } from 'react';
import './App.css';
import PostList from './components/PostList';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
    const [todoList, setTodoList] = useState([
        { id: 1, title: 'An sang' },
        { id: 2, title: 'An trua' },
        { id: 3, title: 'An toi' },
    ])

    const [postList, setPostList] = useState([]);

    useEffect(() => {
        async function fetchPostList() {
            try {
                const requestUrl = 'http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1';
                const response = await fetch(requestUrl);
                const responseJSON = await response.json();
                console.log({ responseJSON });

                const { data } = responseJSON;
                setPostList([...data]);
            } catch (error) {
                console.log("Failed to fetch post list: ", error.message);
            }
        }

        fetchPostList();

    }, [])

    function onTodoClick(todo) {
        let index = todoList.findIndex(item => {
            return item.id === todo.id;
        })
        if (index < 0) return;
        let newTodoList = [...todoList];
        newTodoList.splice(index, 1);
        setTodoList(newTodoList);
    }

    function onSubmit(formValue) {
        let id = 1;
        if (todoList.length > 0) {
            id = todoList[todoList.length - 1].id + 1;
        }
        const newTodo = {
            ...formValue,
            id: id,
        }
        const newTodos = [...todoList];
        newTodos.push(newTodo);
        setTodoList(newTodos);
    }

    return (
        <div className="App">
            <h1>React hooks - TodoList</h1>
            <TodoForm onSubmit={onSubmit} />
            <TodoList todos={todoList} onTodoClick={onTodoClick} />
            <PostList posts={postList} />
        </div>
    );
}

export default App;
