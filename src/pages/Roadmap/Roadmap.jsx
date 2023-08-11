import React, { useContext, useEffect, useState } from 'react';
import "./roadmap.css";
import { roadMap, roadMapData } from '../../data';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import Header from '../../components/header/Header';
import Navbar from '../../components/navbar/Navbar';
import DataContext from '../../context/DataContext';


const Roadmap = () => {
    const [day, setDay] = useState(0);
    const [data, setData] = useState(roadMapData[0]);
    const [flag, setFlag] = useState(true);

    //


    //
    useEffect(() => {
        setData(roadMapData[day]);
    }, [day]);

    console.log(data);
    return (
        <section className='roadmap'>
            <div className='p-2 d-flex justify-content-between gap-3'>
                <div className="left">
                    <div className="class__head d-flex px-3 justify-content-between align-items-center" >
                        {day === 0 ?
                            <h3 className="classhead m-0 text-white">Join the class on time!</h3>
                            :
                            <>
                                <h3 className="classhead m-0 text-white">Please watch the recordings</h3>
                                <button className="play__btn" data-bs-toggle="modal" data-bs-target="#myModal">Play Recordings</button>
                            </>
                        }
                    </div>
                    <div className="session__container">
                        <div className="session__area">
                            <span className='session__details'>
                                <span className='session__title' >{data.title}</span>
                                <br />
                                {data.time}
                            </span>
                            <hr />
                            <div className="session__content">Contents:</div>
                            <div className="ml-3">
                                <span className="session__content__details text-secondary" >{data.content}</span>
                            </div>
                            <div className="session__content mt-3">Pre-read:</div>
                            <div className="ml-3">
                                <span className="session__content__details text-secondary" >{data.preread}</span>
                            </div>
                        </div>
                    </div>
                    {data.activity !== "" ?
                        <div className="activity ml-1 mt-3 mb-2">Activities</div> : ''
                    }
                    {
                        data.activity &&
                        <div className="session__container">
                            <div className="session__area">
                                <div className="accordion">
                                    <div className="d-flex justify-content-between">
                                        <div className='task__link'>
                                            {data.activity}
                                        </div>
                                        <span className='task__toggle text-white' data-bs-toggle="collapse" data-bs-target="#demo" onClick={() => setFlag(!flag)}>
                                            {
                                                flag ?
                                                    <FaAngleDown />
                                                    :
                                                    <FaAngleUp />
                                            }
                                        </span>
                                    </div>
                                    <div className="collapse" id="demo" >
                                        <div className="card-body">
                                            <div className="tagsList">
                                                <div className="tagTitle">
                                                    Tags:
                                                </div>
                                                {
                                                    data.tags !== "" &&
                                                    data.tags.map((tag, index) => (<div key={index} className="tagItem">{tag}</div>))
                                                }
                                            </div>
                                            <div className="p-0">
                                                <form>
                                                    <div className="task__area" style={{ "padding": "16px" }}>
                                                        {
                                                            data.task === "be" ? (
                                                                <div className="submission">
                                                                    <div className="form-group mt-2">
                                                                        <label htmlFor="62b3eb017fc5ae0f749f95a7_sourceCodeFrontEnd" className="label__style mb-0">
                                                                            Back-end Source code</label>
                                                                        <div>
                                                                            <input className="formInputs" name="62b3eb017fc5ae0f749f95a7_sourceCodeFrontEnd" placeholder="Enter Front-end Source code link" type="text" />
                                                                        </div>
                                                                    </div>
                                                                    <label htmlFor="comments" className="label__style mb-0">Back-end Depolyed URL</label>
                                                                    <div>
                                                                        <input className="formInputs" name="comments" placeholder="Enter Back-end Depolyed URL" />
                                                                    </div>
                                                                </div>
                                                            ) : data.task === "fe" ? (
                                                                <div className="submission">
                                                                    <div className="form-group mt-2">
                                                                        <label htmlFor="62b3eb017fc5ae0f749f95a7_sourceCodeFrontEnd" className="label__style mb-0">
                                                                            Front-end Source code</label>
                                                                        <div>
                                                                            <input className="formInputs" name="62b3eb017fc5ae0f749f95a7_sourceCodeFrontEnd" placeholder="Enter Front-end Source code link" type="text" />
                                                                        </div>
                                                                    </div>
                                                                    <label htmlFor="comments" className="label__style mb-0">Front-end Depolyed URL</label>
                                                                    <div>
                                                                        <input className="formInputs" name="comments" placeholder="Enter Front-end Depolyed URL" />
                                                                    </div>
                                                                </div>
                                                            ) : data.task === "fb" ? (
                                                                <div className="submission">
                                                                    <div className="form-group mt-2">
                                                                        <label htmlFor="62b3eb017fc5ae0f749f95a7_sourceCodeFrontEnd" className="label__style mb-0">
                                                                            Front-end Source code</label>
                                                                        <div>
                                                                            <input className="formInputs" name="62b3eb017fc5ae0f749f95a7_sourceCodeFrontEnd" placeholder="Enter Front-end Source code link" type="text" />
                                                                        </div>
                                                                    </div>
                                                                    <label htmlFor="comments" className="label__style mb-0">Front-end Depolyed URL</label>
                                                                    <div>
                                                                        <input className="formInputs" name="comments" placeholder="Enter Front-end Depolyed URL" />
                                                                    </div>
                                                                    <label htmlFor="comments" className="label__style mb-0">Back-end Source code</label>
                                                                    <div>
                                                                        <input className="formInputs" name="comments" placeholder="Enter Back-end Source code" />
                                                                    </div>
                                                                    <label htmlFor="comments" className="label__style mb-0">Back-end Depolyed URL</label>
                                                                    <div>
                                                                        <input className="formInputs" name="comments" placeholder="Enter Back-end Depolyed URL" />
                                                                    </div>
                                                                </div>
                                                            ) : ""
                                                        }
                                                        <div className=' task__submitBtn'>
                                                            <button className='btn'>Submit</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className="right">
                    <div className="roadmap__container justify-self-center">
                        <div className="roadmap__area">
                            <div className="progress__head">
                                Sessions Roadmap
                            </div>
                            <div className="sessionsContainer">
                                {
                                    roadMap.map((item) => {
                                        return (
                                            <div key={item.no} className="roadmap_icon_container completed" onClick={() => setDay(Number(item.no))}>
                                                <h6>{item.no}</h6>
                                                <div className={item.dir}></div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Recording Link</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <a className='recording__link text-dark' href={data.link} target='_blank'>{data.link}</a>
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

export default Roadmap;