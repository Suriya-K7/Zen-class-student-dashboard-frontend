import React, { useContext, useEffect } from 'react';
import "./leave.css";
import { BiPlus } from "react-icons/bi";
import DataContext from '../../context/DataContext';
import { ToastContainer, Zoom } from "react-toastify";
import { Formik, Form } from 'formik';
import RequestField from '../../components/textField/RequestField';
import * as Yup from "yup";

const Leave = () => {
    const { leave,
        trigger,
        setTrigger,
        fetchLeave,
        handleAddLeave,
        handleLeaveCancel,
        isLoading } = useContext(DataContext);


    useEffect(() => {
        fetchLeave();
    }, [trigger, setTrigger]);

    const validate = Yup.object({
        reason: Yup.string()
            .min(6, "Must be at least 6 Characters")
            .required("Required"),
        appliedOn: Yup.date()
            .required("Required"),
    })

    return (
        <section className='leave'>
            <div className="btn__container">
                <button className="btn addBtn" type="button" data-bs-toggle="modal" data-bs-target="#myModal" >
                    <BiPlus />Add Leave
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
                            <div className='text-center'>
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
                            <Formik
                                initialValues={{
                                    reason: "",
                                    appliedOn: "",
                                }}
                                validationSchema={validate}
                                onSubmit={(values, { resetForm }) => {
                                    handleAddLeave(values);
                                    resetForm({ values: "" });
                                }}
                            >
                                {
                                    formik => (
                                        <Form className='className="d-flex justify-content-center w-75 flex-column mt-2'>
                                            <RequestField
                                                label="Date"
                                                placeholder="Enter Date"
                                                name="appliedOn"
                                                id="appliedOn"
                                                type="date" />
                                            <RequestField
                                                label="Reason"
                                                placeholder="Enter Reason"
                                                name="reason"
                                                id="reason"
                                                type="textarea" />
                                            <div className="modal-footer text-center">
                                                <div className='text-center w-100'>
                                                    <button type="submit" className="btn submit__btn w-100">
                                                        {
                                                            isLoading ?
                                                                (<span className="spinner-border spinner-border-sm text-warning">
                                                                </span>)
                                                                : "Create"
                                                        }
                                                    </button>
                                                </div>
                                            </div>
                                        </Form>
                                    )
                                }
                            </Formik>
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