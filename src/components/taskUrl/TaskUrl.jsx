import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import "./taskUrl.css"

const TaskUrl = ({ task }) => {
    return (
        <div>
            {
                task.frontEndCode &&
                <h6><a href={task.frontEndCode} target='_blank' className='task__url' >Front End Code <FaExternalLinkAlt /></a> </h6>
            }
            {
                task.frontEndURL &&
                <h6><a href={task.frontEndURL} target='_blank' className='task__url' >Front End Depolyed URL <FaExternalLinkAlt /></a> </h6>
            }
            {
                task.backEndCode &&
                <h6><a href={task.backEndCode} target='_blank' className='task__url' >Back End Code <FaExternalLinkAlt /></a> </h6>
            }
            {
                task.backEndURL &&
                <h6><a href={task.backEndCode} target='_blank' className='task__url' >Back End Depolyed Code <FaExternalLinkAlt /></a> </h6>
            }
            <div className='task__score'>
                Task Score : - {task.score}
            </div>
        </div>
    )
}

export default TaskUrl