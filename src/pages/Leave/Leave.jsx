import React, { useContext, useEffect, useRef, useState } from 'react';
import "./leave.css";
import { BiPlus } from "react-icons/bi";
import DataContext from '../../context/DataContext';
import api from '../../api/api';
import { ToastContainer, Zoom, toast } from "react-toastify";

const Leave = () => {
    const { token } = useContext(DataContext);
    const [reason, setReason] = useState("");
    const [appliedOn, setAppliedOn] = useState("");
    const [leave, setLeave] = useState([]);
    const [clicked, setClicked] = useState(0);
    const id = useRef();
    const config = {
        headers: { authorization: `bearer ${token}` },
    }

    const fetchLeave = async () => {
        try {
            const fetchedLeave = await api.get("student/leave", config);
            if (fetchedLeave) {
                setLeave(fetchedLeave.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddLeave = async () => {
        const data = {
            reason, appliedOn
        }
        try {
            const response = await api.post("student/leave", data, config);
            setReason("");
            setAppliedOn("");
            toast.success(response.data.message);
            setClicked((prev) => prev + 1);
        } catch (error) {
            if (error.response.data.message) {
                toast.error(error.response.data.message)
            } else {
                console.log(error);
            }
        }
    }

    const handleLeaveCancel = async (data) => {
        try {
            const response = await api.delete(`student/leave/${data}`, config);
            toast.success(response.data.message);
            setClicked((prev) => prev + 1);
        } catch (error) {
            if (error.response.data.message) {
                toast.error(error.response.data.message)
            } else {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        fetchLeave();
    }, [clicked]);

    return (
        <section className='leave'>
            <div className="btn__container">
                <button className="btn addBtn" type="button" data-bs-toggle="modal" data-bs-target="#myModal" >
                    <BiPlus />Add
                </button>
            </div>
            <br />
            {
                leave &&
                leave.map((data) => {
                    return (<div
                        className="task__container"
                        key={data._id}
                        data-bs-toggle="modal"
                        data-bs-target={`#leaveModal${data._id}`} >
                        <div className="flexCont">
                            <div>
                                <div className="title weight-500">Reason</div>
                                <div className="row d-flex align-items-center justify-content-evenly secondaryGreyTextColor">
                                    <div className="mx-1">{data.reason}</div>
                                </div>
                            </div>
                            <div className='d-flex flex-column align-items-center'>
                                <div className="mx-1 secondaryGreyTextColor">Applied on {data.appliedOn}</div>
                                <div className="ml-3 mr-1">
                                    <div className="marktag mx-1 px-3 rounded">
                                        Status : - {data.status}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
                })
            }
            <div className="modal" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Add Leave</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body  d-flex flex-column gap-1">
                            <form
                                onSubmit={(e) => e.preventDefault()}
                                className="d-flex justify-content-center flex-column mt-2">
                                <div className="form-group mt-1">
                                    <label htmlFor="date" className="label__style mb-0">On</label>
                                    <div>
                                        <input
                                            className="formInputs"
                                            id="date"
                                            name="date"
                                            type="date"
                                            value={appliedOn}
                                            onChange={(e) => setAppliedOn(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group mt-1">
                                    <label htmlFor="reason" className='label__style'>Reason</label>
                                    <textarea
                                        id='reason'
                                        className="formInputs"
                                        rows="5"
                                        name="reason"
                                        type="text"
                                        placeholder="Enter Reason"
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <div className="modal-footer">
                                    <div className='text-center w-100'>
                                        <button
                                            type="submit" onClick={handleAddLeave}
                                            className="btn submit__btn w-100" >Create</button>
                                    </div>
                                </div>
                            </form>
                            <button className="btn btn-danger w-25" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {
                leave && leave.map((data) => {
                    return (
                        <div className="modal" id={`leaveModal${data._id}`} key={data._id}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 className="modal-title">Confirm Leave Cancellation </h4>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                    </div>
                                    <div className="modal-body">
                                        <button type="reset"
                                            className="btn submit__btn"
                                            data-bs-dismiss="modal"
                                            ref={id}
                                            onClick={() => handleLeaveCancel(data._id)
                                            } >Confirm</button>
                                        <button type="submit" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            {
                !leave.length
                &&
                <h3 className='text-center mt-3'>No Leave Request raised</h3>
            }
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

export default Leave;