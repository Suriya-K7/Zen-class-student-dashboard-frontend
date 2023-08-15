import React, { useEffect } from 'react';
import "./tasks.css";
import TaskUrl from '../../components/taskUrl/TaskUrl';
import { useContext } from 'react';
import DataContext from '../../context/DataContext';


const Tasks = () => {
    const { loggedUser, fetchTask, DBTask } = useContext(DataContext);

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
                            <div className='flexCont__data'>
                                <div className="title weight-500">
                                    {loggedUser.name + " " + loggedUser.lName}
                                </div>
                                <div className="row 
                                d-flex 
                                align-items-center 
                                justify-content-evenly 
                                secondaryGreyTextColor">
                                    <div className="mx-1">({loggedUser.batch})</div>
                                    <div className="mx-1">
                                    </div>
                                    <div className="">{item.title}</div>
                                </div>
                            </div>
                            <div className='d-flex flex-column align-items-center gap-3'>
                                <div
                                    className="secondaryGreyTextColor">
                                    submitted on{" "}
                                    {item.submittedOn.slice(0, 10)}
                                </div>
                                <div
                                    className="ml-3 mr-1">
                                    <div
                                        className="marktag tasktag mx-1 px-3 rounded">
                                        Task score : - {item.score}
                                    </div>
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
                <h3 className='text-center mt-3 padding__left'>Task has not been Submitted</h3>
            }
        </section>
    )
}

export default Tasks;