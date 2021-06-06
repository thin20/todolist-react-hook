import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import './App.css';
import Pagination from './components/Pagination';
import PostList from './components/PostList';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import PostFiltersForm from './components/PostFiltersForm';
import Clock from './components/Clock';
import BetterClock from './components/BetterClock';

function App() {
    const [todoList, setTodoList] = useState([
        { id: 1, title: 'An sang' },
        { id: 2, title: 'An trua' },
        { id: 3, title: 'An toi' },
    ])

    const [postList, setPostList] = useState([]);

    const [pagination, setPagination] = useState({
        _page: 1,
        _limit: 10,
        _totalRow: 1,
    })

    const [filter, setFilter] = useState({
        _limit: 10,
        _page: 1,
        title_like: '',
    })

    const [showClock, setShowClock] = useState(true);



    useEffect(() => {
        async function fetchPostList() {
            try {
                const paramsString = queryString.stringify(filter);
                const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
                console.log(requestUrl);
                const response = await fetch(requestUrl);
                const responseJSON = await response.json();

                const { data, pagination } = responseJSON;
                setPostList([...data]);
                setPagination(pagination);
            } catch (error) {
                console.log("Failed to fetch post list: ", error.message);
            }
        }

        fetchPostList();

    }, [filter])

    function handlePageChange(newPage) {
        console.log('New page: ', newPage);
        setFilter({ ...filter, _page: newPage });
    }

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

    function handleFiltersChange(newFilters) {
        // console.log('New filters: ', newFilters);
        setFilter({
            ...filter,
            page: 1,
            title_like: newFilters.searchTerm,
        })
    }

    return (
        <div className="App">
            <h1>React hooks - TodoList</h1>
            <TodoForm onSubmit={onSubmit} />
            <TodoList todos={todoList} onTodoClick={onTodoClick} />
            <PostFiltersForm onSubmit={handleFiltersChange} />
            <PostList posts={postList} />
            <Pagination pagination={pagination} onPageChange={handlePageChange} />
            <h4>UseEffect cleanup với code đồng hồ</h4>
            <button onClick={() => setShowClock(false)}>Hide Clock</button>
            {showClock && <Clock />}
            <h4>Better Clock</h4>
            <BetterClock />
        </div>
    );
}

export default App;
