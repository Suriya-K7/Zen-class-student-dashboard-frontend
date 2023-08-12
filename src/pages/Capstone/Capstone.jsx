import React, { useEffect, useState } from 'react';
import "./capstone.css";
import { FaExternalLinkAlt } from 'react-icons/fa';
import { useContext } from 'react';
import DataContext from '../../context/DataContext';
import api from '../../api/api';
import { ToastContainer, Zoom, toast } from "react-toastify";

const Capstone = () => {
    const { loggedUser,
        token,
        setIsLoading,
        isLoading } = useContext(DataContext);
    const [no, setNo] = useState(0);
    const [capStone, setCapStone] = useState(null);
    const config = {
        headers: { authorization: `bearer ${token}` },
    }

    //
    const [frontEndCode, setFrontEndCode] = useState("");
    const [frontEndURL, setFrontEndURL] = useState("");
    const [backEndCode, setBackEndCode] = useState("");
    const [backEndURL, setBackEndURL] = useState("");

    const fetchCapStone = async () => {
        try {
            const fetcheCapStone = await api.get("student/capstone", config);
            if (fetcheCapStone) {
                setCapStone(fetcheCapStone.data[0]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCapStone();
    }, [no, setNo])

    const handleCapStone = async (e) => {

        e.preventDefault();

        setIsLoading(true);

        const newCapStone = {
            feUrl: frontEndURL,
            feCode: frontEndCode,
            beUrl: backEndURL,
            beCode: backEndCode,
        }

        try {
            const response = await api.post("student/capstone", newCapStone, config);
            toast.success(response.data.message);
            setFrontEndCode("");
            setFrontEndURL("");
            setBackEndCode("");
            setBackEndURL("");
            setNo((prev) => prev + 1);
            setIsLoading(false);
        } catch (error) {
            if (error.response.data.message) {
                toast.error(error.response.data.message)
            } else {
                console.log(error);
            }
            setIsLoading(false);
        }
    }

    return (
        <section className='task__submission'>
            <div className="task__container mt-5" data-bs-toggle="modal" data-bs-target="#myModal">
                <div className="d-flex justify-content-between">
                    <div>
                        <div className="title weight-500 pb-2">
                            {loggedUser.name ? loggedUser.name : loggedUser.student.name}
                            {loggedUser.lName ? loggedUser.lName : loggedUser.student.lName}
                        </div>
                        <div className="row d-flex align-items-center justify-content-evenly secondaryGreyTextColor">
                            <div className="mx-1">
                                {loggedUser.batch ? loggedUser.batch : loggedUser.student.batch} - Zen Class Student Dashboard
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="mx-1 secondaryGreyTextColor text-center pb-2">
                            {capStone ?
                                `submitted on ${capStone.submittedOn.slice(0, 10)}` : "Not Submitted"
                            }
                        </div>
                        <div className="ml-3 mr-1 d-flex align-self-end justify-content-end">
                            <div className="marktag mx-1 px-3 rounded">
                                {capStone ?
                                    `score : - ${capStone.score}` : "Pending"
                                }
                            </div>
                            <div className="tasktag px-2 rounded">Capstone</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Capstone- 1</h4>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                        <div className="mt-2">
                            <div className="px-4 d-flex flex-column gap-1">
                                <div className="title ">
                                    {loggedUser.name ? loggedUser.name : loggedUser.student.name}
                                    {loggedUser.lName ? loggedUser.lName : loggedUser.student.lName}
                                </div>
                                <div className="secondaryGreyTextColor">({loggedUser.batch ? loggedUser.batch : loggedUser.student.batch} - First Capstone)</div>
                                <div className="secondaryGreyTextColor">Task Title:- Zen Class Student Dashboard</div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="marktag  rounded">
                                        {capStone ?
                                            `score : - ${capStone.score}` : "Pending"
                                        }
                                    </div>
                                    <div className="tasktag px-2 rounded">Capstone</div>
                                </div>
                                <div className="secondaryGreyTextColor">
                                    {capStone ?
                                        `submitted on ${capStone.submittedOn.slice(0, 10)}` : "Not Submitted"
                                    }
                                </div>
                            </div>
                            <div className="mx-1 secondaryGreyTextColor">
                                <div className="col-12">
                                    <div className="mx-3 mt-1">
                                        <strong>
                                            Description :
                                        </strong>
                                    </div>
                                    <div className="mx-2 py-1 px-2 ">
                                        <p>To identify and implement the Capstone project as the title given below by meeting all the necessary requirements.</p>
                                        <p><strong>Any specifications on the design?</strong></p>
                                        <ul>
                                            <li>Front-end: Reactjs</li>
                                            <li>Back-end: Nodejs</li>
                                            <li>Database: MongoDB</li>
                                            <li> <strong>Requirements:</strong> </li>
                                            <li>The project should achieve the CODE QUALITY</li>
                                            <li>Use fonts/icons if it’s required in the design.</li>
                                            <li>The use of various charts is required in the design.</li>
                                            <li>
                                                The use of bootstrap/ material CSS is required in the design
                                            </li>
                                        </ul>
                                        <p><strong>How do I submit my work?</strong></p>
                                        <ul>
                                            <li>Push all your work files to GitHub in two different repositories as given below</li>
                                            <li>Front-end repo name project-name-frontend.</li>
                                            <li>Back-end repo name project-name-backend.</li>
                                            <li>
                                                Deploy your front-end application on Netlify(https://www.netlify.com) and back-end application on Render(https://render.com/).
                                            </li>

                                        </ul>
                                        <p><strong>Any basic hints/links/reference sites to solve?</strong></p>
                                        <p>https://getbootstrap.com/docs/4.4/getting-started/introduction/</p>
                                        <p>https://www.chartjs.org/</p>
                                        <p>https://jwt.io/introduction/</p>
                                        <p>https://react-bootstrap.github.io/</p>
                                        <p>https://materializecss.com/</p>
                                        <p>https://tailwindcss.com/</p>
                                        <p>https://expressjs.com/</p>

                                        <p><strong>Terms and Conditions?</strong></p>
                                        <ul>
                                            <ul>
                                                <li>You agree to not share this confidential document with anyone.&nbsp;</li>
                                                <li>You agree to open-source your code (it may even look good on your profile!). Do not mention our company’s name anywhere in the code.</li>
                                                <li>We will never use your source code under any circumstances for any commercial purposes; this is just a basic assessment task.</li>
                                                <li>For capstone, the use case has to be identified by the developer.</li>
                                            </ul>
                                        </ul>
                                        <p>NOTE: Any violation of Terms and conditions is strictly prohibited. You are bound to adhere to it.</p>
                                    </div>
                                </div>
                            </div>
                            {
                                capStone &&
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Code</th>
                                            <th scope="col">Submission</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="codeName">Front-end Source code</td>
                                            <td>
                                                <a href={capStone.feCode} target="_blank" >
                                                    {capStone.feCode}  <FaExternalLinkAlt />
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="codeName">Front-end Deployed URL</td>
                                            <td>
                                                <a href={capStone.feUrl} target="_blank">
                                                    {capStone.feUrl}   <FaExternalLinkAlt />
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="codeName">Back-end Source code</td>
                                            <td>
                                                <a href={capStone.beCode} target="_blank" >
                                                    {capStone.beCode}  <FaExternalLinkAlt />
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="codeName">Back-end Deployed URL</td>
                                            <td>
                                                <a href={capStone.beUrl} target="_blank">
                                                    {capStone.beUrl}   <FaExternalLinkAlt />
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            }
                            {
                                !capStone &&
                                <form onSubmit={handleCapStone}>
                                    <table className="table">
                                        <thead>
                                            <tr >
                                                <th scope="col">Code Submission</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <input
                                                        type="url"
                                                        className="code__submission"
                                                        placeholder='Enter Front-end Source code'
                                                        required
                                                        value={frontEndCode}
                                                        onChange={(e) => setFrontEndCode(e.target.value)}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input
                                                        type="url"
                                                        className="code__submission"
                                                        placeholder='Enter Front-end Deployed URL'
                                                        required
                                                        value={frontEndURL}
                                                        onChange={(e) => setFrontEndURL(e.target.value)}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input
                                                        type="url"
                                                        className="code__submission"
                                                        placeholder='Enter Back-end Source code'
                                                        required
                                                        value={backEndCode}
                                                        onChange={(e) => setBackEndCode(e.target.value)}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input
                                                        type="url"
                                                        className="code__submission"
                                                        placeholder='Enter Back-end Deployed URL'
                                                        required
                                                        value={backEndURL}
                                                        onChange={(e) => setBackEndURL(e.target.value)}
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="text-center">
                                        <button className="submit__capstone" type="submit">
                                            {
                                                isLoading ?
                                                    (<span className="spinner-border spinner-border-sm text-warning"></span>)
                                                    : "Submit"
                                            }
                                        </button>
                                    </div>
                                </form>
                            }
                            <div className="col-12 marksContainer">
                                <div className="row d-flex align-itmes-center justify-content-between mx-1">
                                    <div className="col-12">
                                        <div className="mx-2 mt-3">Comments:</div>
                                        <div className="mx-2 mt-0 mb-3 py-3 px-2 rounded ">
                                            {capStone ?
                                                `${capStone.comment}` : "Not submitted"
                                            }
                                        </div>
                                        <div className="mx-2 mt-3 text-warning"><strong>Warning</strong> :- mark may be deducted automatically from your total score if your submission is beyond the deadline</div>
                                    </div>
                                </div>
                                <hr className="containerDivider mx-1" />
                            </div>
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

export default Capstone;