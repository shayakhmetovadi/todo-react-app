import React, {useState} from "react";
import { DatePicker } from 'antd';
import { useDispatch } from "react-redux";
import moment from 'moment';
import AllTodoList from './all-todo-list.component';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const AddToDo = () => {
    const [title, setTitle] = useState('')
    const [date, setDate] = useState(moment()._d)

    const dispatch = useDispatch()

    const saveTask = (e) => {
        e.preventDefault()
        let tasks = []
        if(typeof window !== undefined) {
            if(localStorage.getItem('tasks')) {
                tasks = JSON.parse(localStorage.getItem("tasks"))
            }
            tasks.push({
                title,
                date,
                id: new Date(),
                status: false
            })
            localStorage.setItem('tasks', JSON.stringify(tasks))
            
            dispatch({
                type: "ADD_TO_TASKS",
                payload: tasks
            })
            setTitle('')
        }
    }

    const completeAllTasks = () => {
        let tasks = []
        if(typeof window !== undefined) {
            if(localStorage.getItem('tasks')) {
                tasks = JSON.parse(localStorage.getItem("tasks"))
            }
            tasks.map((todo, i) => {
                tasks[i].status = true
            });
            localStorage.setItem('tasks', JSON.stringify(tasks))
            
            dispatch({
                type: "ADD_TO_TASKS",
                payload: tasks
            })
        }
    }

    const handleChangeTitle = (e) => {
        setTitle(e.target.value)
    }
    
    const handleChangeDate = (e) => {
        if(e) { setDate(e._d) }
    }

    return (
        <>
            <div className="flex-between-center">
                <div className="col-side">
                    <button onClick={completeAllTasks} className="btn btn-success"><i className="fas fa-check"></i>All</button>
                </div>
                <form onSubmit={saveTask} className="flex-between-center add-form">
                    <div className="d-flex col-center-input">
                        <input 
                            className="add-task-input" 
                            value={title} 
                            onChange={handleChangeTitle}
                            type="text" 
                            placeholder="Add task" 
                            required
                        />
                        <button type="submit" className="btn btn-success left-radius-none"><i className="fas fa-pencil-alt"></i></button>
                    </div>
                    <div className="col-side-date">
                        <DatePicker defaultValue={moment()} onChange={handleChangeDate} format={dateFormatList} />
                    </div>
                </form>
            </div>
            <AllTodoList/>
        </>
    );
}
export default AddToDo;