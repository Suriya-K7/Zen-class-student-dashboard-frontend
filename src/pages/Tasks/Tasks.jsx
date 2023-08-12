import React, { useEffect, useState } from 'react';
import "./tasks.css";
// import { userDetails, roadMapData, taskData } from '../../data';
import TaskUrl from '../../components/taskUrl/TaskUrl';
import { useContext } from 'react';
import DataContext from '../../context/DataContext';
import api from '../../api/api';

const Tasks = () => {
    const { loggedUser, token } = useContext(DataContext);
    const name = loggedUser.name ? loggedUser.name : loggedUser.student.name;
    const batch = loggedUser.batch ? loggedUser.batch : loggedUser.student.batch;
    const [DBTask, setDBTask] = useState([]);
    const config = {
        headers: { authorization: `bearer ${token}` },
    }

    const fetchTask = async () => {
        try {
            const fetchedTask = await api.get("student/task", config);
            if (fetchedTask) {
                setDBTask(fetchedTask.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchTask();
    }, []);

    return (
        <section className='task__submission'>
            {
                DBTask &&
                DBTask.map((item) => {
                    return (<div
                        className="task__container"
                        key={item._id}
                        data-bs-toggle="modal"
                        data-bs-target={`#${item._id}`}>
                        <div className="flexCont">
                            <div>
                                <div className="title weight-500">{name}</div>
                                <div className="row 
                                d-flex 
                                align-items-center 
                                justify-content-evenly 
                                secondaryGreyTextColor">
                                    <div className="mx-1">({batch})</div>
                                    <div className="mx-1">
                                    </div>
                                    <div className="">{item.title}</div>
                                </div>
                            </div>
                            <div>
                                <div
                                    className="mx-1 secondaryGreyTextColor">
                                    submitted on
                                    {item.submittedOn.slice(0, 10)}
                                </div>
                                <div
                                    className="ml-3 mr-1 d-flex 
                                align-self-end justify-content-end">
                                    <div
                                        className="marktag mx-1 px-3 rounded">
                                        score : - {item.score}
                                    </div>
                                    <div
                                        className="tasktag px-2 rounded">
                                        Task</div>
                                </div>
                            </div>
                        </div>
                    </div>)
                })
            }
            {
                DBTask &&
                DBTask.map((item) => {
                    return (
                        <div
                            className="modal"
                            key={item._id}
                            id={`${item._id}`}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 className="modal-title">
                                            {item.title}
                                        </h4>
                                    </div>
                                    <div className="modal-body">
                                        <TaskUrl item={item} />
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            data-bs-dismiss="modal">
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            {
                !DBTask.length
                &&
                <h3 className='text-center mt-3'>Task has not been Submitted</h3>
            }
        </section>
    )
}

export default Tasks;