import React, {useState} from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { DatePicker } from 'antd';
import moment from 'moment';
import { customStyles } from './modalStyle';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const dateFormat = 'YYYY/MM/DD';

const EachTodo = ({todo: {title, date, id, status}, removeTask, completeTask}) => {
    const dispatch = useDispatch()
    const [modalOpen, setModalOpen] = useState(false)
    const [editTitle, setEditTitle] = useState(title)
    const [editDate, setEditDate] = useState(date)
    const handleChangeTitle = (e) => {
        setEditTitle(e.target.value)
    }
    const handleChangeDate = (e) => {
        setEditDate(e._d)
    }
    const editTask = () => {
        let tasks = []
        if(typeof window !== undefined) {
            if(localStorage.getItem('tasks')) {
                tasks = JSON.parse(localStorage.getItem("tasks"))
            }
            tasks.map((todo, i) => {
                if(todo.id === id) {
                    tasks[i].title = editTitle
                    tasks[i].date = editDate
                }
            });
            localStorage.setItem("tasks", JSON.stringify(tasks))
            dispatch({
                type: "ADD_TO_TASKS",
                payload: tasks
            })
        }
    }
    return (
        <>
            <div className="flex-between-center border-top border-bottom pt-3 pb-3">
                <div className="col-side">
                    <button onClick={() => removeTask(id)} className="btn btn-danger right-radius-none"><i className="fas fa-times"></i></button>
                    <button onClick={() => completeTask(id)} className="btn btn-success left-radius-none"><i className="fas fa-check"></i></button>
                </div>
                <p 
                    className={`mb-0 col-center ${status ? "text-decoration-line-through" : ""}`}
                    onClick={() => {setModalOpen(true)}}
                >
                    {title}
                </p>
                <span className={`col-side ${status ? "text-decoration-line-through" : ""}`}>{JSON.stringify(date).slice(1,11)}</span>
            </div>
            <Modal
                isOpen={modalOpen}
                ariaHideApp={false}
                onRequestClose={()=> setModalOpen(false)}
                style={customStyles}
                contentLabel="Edit To do"
            >
                <div className="close-modal" onClick={()=> setModalOpen(false)}>X</div>
                <h3 className="h3 text-center m-4">Edit task</h3>
                <form onSubmit={editTask} className="d-flex mb-4">
                    <input className="form-control" type="text" value={editTitle} onChange={handleChangeTitle}/>
                    <DatePicker defaultValue={moment(JSON.stringify(editDate).slice(1,11), dateFormat)} onChange={handleChangeDate} format={dateFormatList} />
                    <button type="submit" className="btn btn-primary">Save</button>
                </form>   
            </Modal>
        </>
    )
}
export default EachTodo;