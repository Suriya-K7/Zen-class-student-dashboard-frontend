import React, { useEffect, useState } from 'react';
import "./tasks.css";
import { userDetails, roadMapData, taskData } from '../../data';
import TaskUrl from '../../components/taskUrl/TaskUrl';

const Tasks = () => {
    const [no, setNo] = useState(1);
    const [task, setTask] = useState([]);
    const [data, setData] = useState(roadMapData[1]);
    useEffect(() => {
        const temp = taskData.find((item) => item.day === roadMapData[no].day)
        setTask(temp);
        setData(roadMapData[no]);
    }, [no]);
    return (
        <section className='task__submission'>
            {
                roadMapData.map((roadmap) => {
                    return roadmap.activity ?
                        (<div className="task__container" key={roadmap.day} onClick={() => setNo(roadmap.day)} data-bs-toggle="modal" data-bs-target="#myModal">
                            <div className="flexCont">
                                <div>
                                    <div className="title weight-500">{userDetails.name}</div>
                                    <div className="row d-flex align-items-center justify-content-evenly mx-1 secondaryGreyTextColor">
                                        <div className="mx-1">({userDetails.batch})</div>
                                        <div className="mx-1">
                                        </div>
                                        <div className="">{roadmap.title}</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="mx-1 secondaryGreyTextColor">submitted on 30/04/2023</div>
                                    <div className="ml-3 mr-1 d-flex align-self-end justify-content-end">
                                        <div className="marktag mx-1 px-3 rounded">
                                            score : - {taskData.find((item) => item.day === roadMapData[roadmap.day].day).score}
                                        </div>
                                        <div className="tasktag px-2 rounded">Task</div>
                                    </div>
                                </div>
                            </div>
                        </div>) : ""
                })
            }
            <div className="modal" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{data.title}</h4>
                        </div>
                        <div className="modal-body">
                            <TaskUrl task={task} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Tasks;