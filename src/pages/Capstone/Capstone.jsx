import React from 'react';
import "./capstone.css";
import { userDetails } from '../../data';
import { FaExternalLinkAlt } from 'react-icons/fa';

const Capstone = () => {
    return (
        <section className='task__submission'>
            <div className="task__container mt-5" data-bs-toggle="modal" data-bs-target="#myModal">
                <div className="d-flex justify-content-between">
                    <div>
                        <div className="title weight-500 pb-2">{userDetails.name}</div>
                        <div className="row d-flex align-items-center justify-content-evenly secondaryGreyTextColor">
                            <div className="mx-1">{userDetails.batch} - {userDetails.capstone.title}</div>
                        </div>
                    </div>
                    <div>
                        <div className="mx-1 secondaryGreyTextColor text-center pb-2">
                            {userDetails.capstone.date !== "" ?
                                `submitted on ${userDetails.capstone.date}` : "Not Submitted"
                            }
                        </div>
                        <div className="ml-3 mr-1 d-flex align-self-end justify-content-end">
                            <div className="marktag mx-1 px-3 rounded">
                                {userDetails.capstone.score !== "" ?
                                    `score : - ${userDetails.capstone.score}` : "Pending"
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
                                <div className="title ">{userDetails.name}</div>
                                <div className="secondaryGreyTextColor">({userDetails.batch} - First Capstone)</div>
                                <div className="secondaryGreyTextColor">Task Title:- {userDetails.capstone.title}</div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="marktag  rounded">
                                        {userDetails.capstone.score !== "" ?
                                            `score : - ${userDetails.capstone.score}` : "Pending"
                                        }
                                    </div>
                                    <div className="tasktag px-2 rounded">Capstone</div>
                                </div>
                                <div className="secondaryGreyTextColor">
                                    {userDetails.capstone.date !== "" ?
                                        `submitted on ${userDetails.capstone.date}` : "Not Submitted"
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
                            <table className="table">
                                <thead>
                                    <tr >
                                        <th scope="col">Code Submission</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {
                                            userDetails.capstone.feCode !== "" ?
                                                (<td> <a href={userDetails.capstone.feCode} target="_blank" > {userDetails.capstone.feCode}  <FaExternalLinkAlt /> </a>
                                                </td>) : (<td><input type="text" className="code__submission" placeholder='Enter Front-end Source code here' /></td>)
                                        }
                                    </tr>
                                    <tr>
                                        {
                                            userDetails.capstone.feUrl !== "" ?
                                                (<td> <a href={userDetails.capstone.feUrl} target="_blank" > {userDetails.capstone.feUrl}  <FaExternalLinkAlt /> </a>
                                                </td>) : (<td><input type="text" className="code__submission" placeholder='Enter Front-end Deployed URL Here' /></td>)
                                        }
                                    </tr>
                                    <tr>
                                        {
                                            userDetails.capstone.beCode !== "" ?
                                                (<td> <a href={userDetails.capstone.beCode} target="_blank" > {userDetails.capstone.beCode}  <FaExternalLinkAlt /> </a>
                                                </td>) : (<td><input type="text" className="code__submission" placeholder='Enter Back-end Source code here' /></td>)
                                        }
                                    </tr>
                                    <tr>
                                        {
                                            userDetails.capstone.beUrl !== "" ?
                                                (<td> <a href={userDetails.capstone.beUrl} target="_blank" > {userDetails.capstone.beUrl}  <FaExternalLinkAlt /> </a>
                                                </td>) : (<td><input type="text" className="code__submission" placeholder='Enter Back-end Deployed URL Here' /></td>)
                                        }
                                    </tr>
                                </tbody>
                            </table>
                            <div className="text-center"><button className="submit__capstone" type="submit">Submit</button></div>
                            <div className="col-12 marksContainer">
                                <div className="row d-flex align-itmes-center justify-content-between mx-1">
                                    <div className="col-12">
                                        {userDetails.capstone.comment !== "" &&
                                            <div className="mx-2 mt-0 mb-3 py-3 px-2 rounded commentsstudent">{userDetails.capstone.comment}</div>
                                        }
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
        </section>
    )
}

export default Capstone;