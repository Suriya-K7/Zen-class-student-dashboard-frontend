import React, { useEffect, useContext } from 'react';
import "./mock.css";
import DataContext from '../../context/DataContext';

const Mock = () => {
    //
    const { mock, loggedUser, fetchMock } = useContext(DataContext);

    useEffect(() => {
        fetchMock();
    }, []);
    //
    return (
        <section className='mock mt-5'>
            {
                mock &&
                mock.map((data) => {
                    return (<div className="task__container" key={data._id} data-bs-toggle="modal" data-bs-target={`#${data._id}`}  >
                        <div className="flexCont">
                            <div className="text-center text-md-start">
                                <div className="title weight-500">{data.interviewRound}</div>
                                <div className="secondaryGreyTextColor">
                                    <div>{loggedUser.name} {loggedUser.lName}</div>
                                </div>
                            </div>
                            <div>
                                <div className="secondaryGreyTextColor text-center">Taken By {data.interviewerName}</div>
                                <div className="ml-3 mr-1">
                                    <div className="marktag tasktag mx-1 px-3 rounded">
                                        Score : - {data.overallScore}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
                })
            }
            {
                mock &&
                mock.map((data) => {
                    return (
                        <div className="modal" id={data._id} key={data._id}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 className="modal-title">{data.interviewRound}</h4>
                                    </div>
                                    <div className="modal-body">
                                        <div className='mock__Data mb-1' >
                                            <div className="mock__title d-flex justify-content-between px-1">
                                                Name <span>:</span>
                                            </div>
                                            <div className="mock__details">
                                                {loggedUser.name} {loggedUser.lName}
                                            </div>
                                        </div>
                                        <div className='mock__Data mb-1' >
                                            <div className="mock__title d-flex justify-content-between px-1">
                                                Interview Date <span>:</span>
                                            </div>
                                            <div className="mock__details">
                                                {data.interviewDate}
                                            </div>
                                        </div>
                                        <div className='mock__Data mb-1' >
                                            <div className="mock__title d-flex justify-content-between px-1">
                                                Interviewer Name <span>:</span>
                                            </div>
                                            <div className="mock__details">
                                                {data.interviewerName}
                                            </div>
                                        </div>
                                        <div className='mock__Data mb-1' >
                                            <div className="mock__title d-flex justify-content-between px-1">
                                                Interview Round <span>:</span>
                                            </div>
                                            <div className="mock__details">
                                                {data.interviewRound}
                                            </div>
                                        </div>
                                        <div className='mock__Data mb-1' >
                                            <div className="mock__title d-flex justify-content-between px-1">
                                                Attended <span>:</span>
                                            </div>
                                            <div className="mock__details">
                                                {data.attended}
                                            </div>
                                        </div>
                                        <div className='mock__Data mb-1' >
                                            <div className="mock__title d-flex justify-content-between px-1">
                                                Comments <span>:</span>
                                            </div>
                                            <div className="mock__details">
                                                {data.comment}
                                            </div>
                                        </div>
                                        <div className='mock__Data mb-1' >
                                            <div className="mock__title d-flex justify-content-between px-1">
                                                Logical Score <span>:</span>
                                            </div>
                                            <div className="mock__details">
                                                {data.logicalScore}
                                            </div>
                                        </div>
                                        <div className='mock__Data mb-1' >
                                            <div className="mock__title d-flex justify-content-between px-1">
                                                Overall Score <span>:</span>
                                            </div>
                                            <div className="mock__details">
                                                {data.overallScore}
                                            </div>
                                        </div>
                                        <div className='mock__Data mb-1' >
                                            <div className="mock__title d-flex justify-content-between align-items-center px-1">
                                                recordingURL <span>:</span>
                                            </div>
                                            <div className="mock__details">
                                                {data.recordingURL}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            {
                !mock.length
                &&
                <h3 className='text-center mt-3'>Mock interwiew not Assigned</h3>
            }
        </section>
    )
}

export default Mock;