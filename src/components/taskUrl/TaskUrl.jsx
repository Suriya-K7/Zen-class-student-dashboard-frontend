import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import "./taskUrl.css"

const TaskUrl = ({ item }) => {
    return (
        <div>
            {
                item.frontEndCode &&
                <h6><a href={item.frontEndCode} target='_blank' className='task__url' >Front End Code <FaExternalLinkAlt /></a> </h6>
            }
            {
                item.frontEndURL &&
                <h6><a href={item.frontEndURL} target='_blank' className='task__url' >Front End Depolyed URL <FaExternalLinkAlt /></a> </h6>
            }
            {
                item.backEndCode &&
                <h6><a href={item.backEndCode} target='_blank' className='task__url' >Back End Code <FaExternalLinkAlt /></a> </h6>
            }
            {
                item.backEndURL &&
                <h6><a href={item.backEndCode} target='_blank' className='task__url' >Back End Depolyed Code <FaExternalLinkAlt /></a> </h6>
            }
            <div className='task__score'>
                Task Score : - {item.score}
            </div>
        </div>
    )
}

export default TaskUrl