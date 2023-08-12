import React, { useContext, useEffect, useState } from 'react';
import "./roadmap.css";
import { roadMap, roadMapData } from '../../data';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import Header from '../../components/header/Header';
import Navbar from '../../components/navbar/Navbar';
import DataContext from '../../context/DataContext';
import api from '../../api/api';
import { ToastContainer, Zoom, toast } from "react-toastify";


const Roadmap = () => {
    const { loggedUser, token, setIsLoading, isLoading } = useContext(DataContext);
    const [day, setDay] = useState(0);
    const [data, setData] = useState(roadMapData[0]);
    const [flag, setFlag] = useState(true);

    //
    const [frontEndCode, setFrontEndCode] = useState("");
    const [frontEndURL, setFrontEndURL] = useState("");
    const [backEndCode, setBackEndCode] = useState("");
    const [backEndURL, setBackEndURL] = useState("");

    //
    useEffect(() => {
        setData(roadMapData[day]);
        setFrontEndCode("");
        setFrontEndURL("");
        setBackEndCode("");
        setBackEndURL("");
    }, [day]);

    // 

    const handleTask = async (e) => {

        e.preventDefault();

        setIsLoading(true)

        const config = {
            headers: {
                authorization: `bearer ${token}`,
            },
        };
        let check = loggedUser.email ? loggedUser.email : loggedUser.student.email;
        check = check + day;
        const newTask = {
            day,
            frontEndCode,
            frontEndURL,
            backEndCode,
            backEndURL,
            task: data.task,
            title: data.title,
            check,
        };

        try {
            const response = await api.post("/student/task", newTask, config);
            toast.success(response.data.message);
            setBackEndCode("");
            setBackEndURL("");
            setFrontEndCode("");
            setFrontEndURL("");
            setIsLoading(false);
        } catch (error) {
            if (error.response.data.message) {
                toast.error(error.response.data.message)
            } else {
                console.log(error);
            }
            setIsLoading(false);
        }
        console.log(newTask);
    }


    return (
        <section className='roadmap'>
            <div className='p-2 d-flex justify-content-between gap-3'>
                <div className="left">
                    <div className="class__head d-flex px-3 
                    justify-content-between align-items-center" >
                        {day === 0 ?
                            <h3 className="classhead m-0 text-white">
                                Join the class on time!
                            </h3>
                            :
                            <>
                                <h3 className="classhead m-0 text-white">
                                    Please watch the recordings
                                </h3>
                                <button
                                    className="play__btn"
                                    data-bs-toggle="modal"
                                    data-bs-target="#myModal">
                                    Play Recordings
                                </button>
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
                                <span
                                    className="session__content__details text-secondary" >
                                    {data.content}
                                </span>
                            </div>
                            <div className="session__content mt-3">Pre-read:</div>
                            <div className="ml-3">
                                <span
                                    className="session__content__details text-secondary" >
                                    {data.preread}
                                </span>
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
                                        <span
                                            className='task__toggle text-white'
                                            data-bs-toggle="collapse"
                                            data-bs-target="#demo"
                                            onClick={() => setFlag(!flag)}>
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
                                                    data.tags.map
                                                        ((tag, index) =>
                                                        (<div
                                                            key={index}
                                                            className="tagItem">{tag}
                                                        </div>))
                                                }
                                            </div>
                                            <div className="p-0">
                                                <form onSubmit={handleTask}>
                                                    <div
                                                        className="task__area"
                                                        style={{ "padding": "16px" }}>
                                                        <div className="submission">
                                                            <div className="form-group mt-2">
                                                                {
                                                                    data.task === "fs"
                                                                        ||
                                                                        data.task === "fe"
                                                                        ||
                                                                        data.task === "fb" ? (
                                                                        <>
                                                                            <label htmlFor="FrontEndSourceCode"
                                                                                className="label__style mb-0">
                                                                                Front-end Source code
                                                                            </label>
                                                                            <div>
                                                                                <input
                                                                                    className="formInputs"
                                                                                    id="FrontEndSourceCode"
                                                                                    name="FrontEndSourceCode"
                                                                                    placeholder="Enter Front-end Source code link"
                                                                                    type="url"
                                                                                    required
                                                                                    value={frontEndCode}
                                                                                    onChange={(e) => setFrontEndCode(e.target.value)}
                                                                                />
                                                                            </div>
                                                                        </>
                                                                    ) : ""
                                                                }

                                                            </div>
                                                            {
                                                                data.task === "fe"
                                                                    ||
                                                                    data.task === "fb" ? (
                                                                    <>
                                                                        <label
                                                                            htmlFor="FrontEndDeployedURL"
                                                                            className="label__style mb-0">
                                                                            Front-end Depolyed URL
                                                                        </label>
                                                                        <div>
                                                                            <input
                                                                                className="formInputs"
                                                                                name="FrontEndDeployedURL"
                                                                                id="FrontEndDeployedURL"
                                                                                placeholder="Enter Front-end Depolyed URL"
                                                                                required
                                                                                value={frontEndURL}
                                                                                onChange={(e) => setFrontEndURL(e.target.value)}
                                                                                type="url"
                                                                            />
                                                                        </div>
                                                                    </>
                                                                ) : ""
                                                            }
                                                            {
                                                                data.task === "bs"
                                                                    ||
                                                                    data.task === "be"
                                                                    ||
                                                                    data.task === "fb" ? (
                                                                    <>
                                                                        <label
                                                                            htmlFor="BackEndSourceCode"
                                                                            className="label__style mb-0">
                                                                            Back-end Source code
                                                                        </label>
                                                                        <div>
                                                                            <input
                                                                                className="formInputs"
                                                                                id="BackEndSourceCode"
                                                                                name="BackEndSourceCode"
                                                                                placeholder="Enter Back-end Source code"
                                                                                required
                                                                                value={backEndCode}
                                                                                onChange={(e) => setBackEndCode(e.target.value)}
                                                                                type="url"
                                                                            />
                                                                        </div>
                                                                    </>
                                                                ) : ""
                                                            }
                                                            {
                                                                data.task === "be"
                                                                    ||
                                                                    data.task === "fb" ? (
                                                                    <>
                                                                        <label
                                                                            htmlFor="BackEndDeployedURL"
                                                                            className="label__style mb-0">
                                                                            Back-end Depolyed URL
                                                                        </label>
                                                                        <div>
                                                                            <input
                                                                                className="formInputs"
                                                                                name="BackEndDeployedURL"
                                                                                id="BackEndDeployedURL"
                                                                                placeholder="Enter Back-end Depolyed URL"
                                                                                required
                                                                                value={backEndURL}
                                                                                onChange={(e) => setBackEndURL(e.target.value)}
                                                                                type="url"
                                                                            />
                                                                        </div>
                                                                    </>
                                                                ) : ""
                                                            }
                                                        </div>
                                                        <div className=' task__submitBtn'>
                                                            <button className='btn'>
                                                                {
                                                                    isLoading ?
                                                                        (<span className="spinner-border spinner-border-sm text-warning"></span>)
                                                                        : "Submit"
                                                                }
                                                            </button>
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
            <ToastContainer
                position="top-right"
                autoClose={1000}
                transition={Zoom}
                draggable={false}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                theme="dark"
            />
        </section>
    )
}

export default Roadmap;