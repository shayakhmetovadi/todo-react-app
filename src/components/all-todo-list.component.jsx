import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Input} from 'antd'
import EachTodo from './each-todo.component';

const { Search } = Input;

const AllTodoList = () => {
    const [keyword, setKeyword] = useState("");

    const {todos} = useSelector(state => ({...state}))
    const dispatch = useDispatch()
    const removeTask = (id) => {
        let tasks = []
        if(typeof window !== undefined) {
            if(localStorage.getItem('tasks')) {
                tasks = JSON.parse(localStorage.getItem("tasks"))
            }
            tasks.map((todo, i) => {
                if(todo.id === id) {
                    tasks.splice(i, 1)
                }
            });
            localStorage.setItem("tasks", JSON.stringify(tasks))
            dispatch({
                type: "ADD_TO_TASKS",
                payload: tasks
            })
        }
    }
    const completeTask = (id) => {
        let tasks = []
        if(typeof window !== undefined) {
            if(localStorage.getItem('tasks')) {
                tasks = JSON.parse(localStorage.getItem("tasks"))
            }
            tasks.map((todo, i) => {
                if(todo.id === id) {
                    tasks[i].status = !tasks[i].status
                }
            });
            localStorage.setItem("tasks", JSON.stringify(tasks))
            dispatch({
                type: "ADD_TO_TASKS",
                payload: tasks
            })
        }
    }
    const handleSearchChange = (e) => {
        e.preventDefault()
        setKeyword(e.target.value.toLowerCase())
    };
    const searched = (keyword) => (todo) => todo.title.toLowerCase().includes(keyword)
    return (
        <div className="mt-5">
            <Search value={keyword} onChange={handleSearchChange} className="search-input" placeholder="input search loading with enterButton" enterButton />

            {
                todos.filter(searched(keyword)).map(
                    todo =>  
                        <EachTodo 
                            key={todo.id} 
                            todo={todo} 
                            removeTask={removeTask}
                            completeTask={completeTask}
                        />
                    
                )
            }
            
        </div>
    )
}

export default AllTodoList;
