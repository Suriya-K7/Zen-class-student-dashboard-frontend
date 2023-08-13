import React, { useContext, useEffect, useState } from 'react';
import "./queries.css";
import { BiPlus } from "react-icons/bi";
import DataContext from '../../context/DataContext';
import api from '../../api/api';
import { ToastContainer, Zoom, toast } from "react-toastify";

const Queries = () => {
    const { token } = useContext(DataContext);
    const [queryTitle, setQueryTitle] = useState("");
    const [queryDesc, setQueryDesc] = useState("");
    const [query, setQuery] = useState([]);
    const [clicked, setClicked] = useState(0);
    const config = {
        headers: { authorization: `bearer ${token}` },
    }

    const fetchQuery = async () => {
        try {
            const fetchedQuery = await api.get("student/query", config);
            if (fetchedQuery) {
                setQuery(fetchedQuery.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddQuery = async () => {

        const data = {
            queryTitle, queryDesc
        }
        try {
            const response = await api.post("student/query", data, config);
            setQueryTitle("");
            setQueryDesc("");
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

    const handleQueryCancel = async (data) => {
        try {
            const response = await api.delete(`student/query/${data}`, config);
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
        fetchQuery();
    }, [clicked]);

    return (
        <section className='leave'>
            <div className="btn__container">
                <button className="btn addBtn" type="button" data-bs-toggle="modal" data-bs-target="#myModal" >
                    <BiPlus />Add Query
                </button>
            </div>
            <br />
            {
                query &&
                query.map((data) => {
                    return (
                        <div className="task__container" key={data._id} data-bs-toggle="modal" data-bs-target={`#${data._id}`} >
                            <div className="d-flex flex-column gap-2 align-items-center">
                                <div>
                                    <div className="query__group">
                                        <div className="title weight-500">Query Title:</div>
                                        <div className="secondaryGreyTextColor">
                                            {data.queryTitle}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="query__group">
                                        <div className="title weight-500">Query Description:</div>
                                        <div className="secondaryGreyTextColor">
                                            {data.queryDesc}
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex flex-column align-items-center'>
                                    <div className="secondaryGreyTextColor">Applied on {data.appliedOn.slice(0, 10)}</div>
                                    <div className="ml-3 mr-1">
                                        <div className="marktag mx-1 px-3 rounded">
                                            Status : - {data.status}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            <div className="modal" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Add Query</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body d-flex flex-column gap-1">
                            <form onSubmit={(e) => e.preventDefault()} className="d-flex justify-content-center flex-column mt-2">
                                <div className="form-group mt-1">
                                    <label htmlFor="title" className="label__style mb-0">Query Title</label>
                                    <div>
                                        <input
                                            className="formInputs"
                                            id="title"
                                            name="title"
                                            type="text"
                                            value={queryTitle}
                                            placeholder="Enter Query Title"
                                            onChange={(e) => setQueryTitle(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group mt-1">
                                    <label htmlFor="Description" className='label__style'>Query Description</label>
                                    <textarea
                                        id='Description'
                                        className="formInputs"
                                        rows="5"
                                        name="Description"
                                        placeholder="Enter Description"
                                        value={queryDesc}
                                        onChange={(e) => setQueryDesc(e.target.value)}

                                    ></textarea>
                                </div>
                                <div className="modal-footer text-center">
                                    <div className='text-center w-100'>
                                        <button type="submit" onClick={handleAddQuery} className="btn submit__btn">Create</button>
                                    </div>
                                </div>
                            </form>
                            <button className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            {
                query && query.map((data) => {
                    return (
                        <div className="modal" id={data._id} >
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 className="modal-title">Delete Query - {data.queryTitle} </h4>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                    </div>
                                    <div className="modal-body  d-flex flex-column gap-1">
                                        <div className="d-flex gap-3">
                                            <button className="btn btn-danger" onClick={() => handleQueryCancel(data._id)} data-bs-dismiss="modal">Confirm Delete</button>
                                            <button className="btn btn-info" data-bs-dismiss="modal">Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
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

export default Queries;