import React, { useContext, useEffect } from 'react';
import "./webcode.css";
import { FaExternalLinkAlt } from 'react-icons/fa';
import DataContext from '../../context/DataContext';
import { ToastContainer, Zoom } from "react-toastify";
import { Formik, Form } from 'formik';
import TextField from '../../components/textField/TextField';
import * as Yup from "yup";


const Webcode = () => {

    const { loggedUser,
        webCode,
        fetchWebcode,
        handleWebcode,
        trigger,
        setTrigger,
        isLoading } = useContext(DataContext);

    useEffect(() => {
        fetchWebcode();
    }, [trigger, setTrigger])

    const validate = Yup.object({
        feCode: Yup.string()
            .url("Enter Valid URL")
            .required("Required"),
        feUrl: Yup.string()
            .url("Enter Valid URL")
            .required("Required"),
    })

    return (
        <section className='task__submission'>
            <div className="task__container mt-5"
                data-bs-toggle="modal" data-bs-target="#myModal">
                <div className="d-flex justify-content-between flexCont ">
                    <div className="flexCont__data">
                        <div className="title weight-500 pb-2">
                            {loggedUser.name ? loggedUser.name : loggedUser.student.name} {" "}
                            {loggedUser.lName ? loggedUser.lName : loggedUser.student.lName}
                        </div>
                        <div
                            className="row d-flex align-items-center 
                        justify-content-evenly secondaryGreyTextColor">
                            <div className="mx-1">
                                {loggedUser.batch ? loggedUser.batch : loggedUser.student.batch} - Make Up API
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="mx-1 secondaryGreyTextColor text-center pb-2">
                            {webCode ?
                                `submitted on ${webCode.submittedOn.slice(0, 10)}` : "Not Submitted"
                            }
                        </div>
                        <div className="ml-3 mr-1">
                            <div className="marktag tasktag mx-1 px-3 rounded">
                                {webCode ?
                                    `Webcode score : - ${webCode.score}` : "Pending"
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
                            <h4 className="modal-title">Webcode- 1</h4>
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal">
                                Close
                            </button>
                        </div>
                        <div className="mt-2">
                            <div className="px-4 d-flex flex-column gap-1">
                                <div className="title ">
                                    {loggedUser.name ? loggedUser.name : loggedUser.student.name} {" "}
                                    {loggedUser.lName ? loggedUser.lName : loggedUser.student.lName}
                                </div>
                                <div className="secondaryGreyTextColor">
                                    ({loggedUser.batch ? loggedUser.batch : loggedUser.student.batch}
                                    - First Webcode)
                                </div>
                                <div className="secondaryGreyTextColor">
                                    Title:- Make Up API
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="marktag tasktag rounded">
                                        {webCode ?
                                            `score : - ${webCode.score}` : "Pending"
                                        }
                                    </div>
                                </div>
                                <div className="secondaryGreyTextColor">
                                    {webCode ?
                                        `submitted on ${webCode.submittedOn.slice(0, 10)}` : "Not Submitted"
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
                                        <p>Implement the Makeup API using async/await with fetch.</p>
                                        <p><strong>Constraints:</strong></p>
                                        <ul>
                                            <li>All your HTML elements should be created with DOM.</li>
                                            <li>Use the async/await.</li>
                                            <li>Use try-catch to handle errors.</li>
                                            <li>Use fetch() to get the data from Makeup API</li>
                                            <li>All JavaScript codes should be in a
                                                script file named script.js which has
                                                to be imported in your HTML page.</li>
                                            <li>The project should contain either a search
                                                filter(which should highlight the text)
                                                or pagination(shouldn't use any library).</li>
                                        </ul>
                                        <p><strong>How do I process the API data?</strong></p>
                                        <ul>
                                            <li>Display the brand and the name of the product.</li>
                                            <li>Display the price of the product.</li>
                                            <li>Also display the image and product link.</li>
                                            <li>Display the description of the product.</li>
                                        </ul>
                                        <p><strong>Any basic hints to solve?</strong></p>
                                        <p>https://makeup-api.herokuapp.com/api/v1/products.json</p>
                                        <p>https://makeup-api.herokuapp.com/</p>
                                        <p><strong>Terms and Conditions?</strong></p>
                                        <ul>
                                            <li>You have 24 hours to complete before the deadline</li>
                                            <li>Raise a query ticket only in the Zen portal and
                                                get your doubts resolved.&nbsp;</li>
                                            <li>You agree to not share this confidential
                                                document with anyone.</li>
                                            <li>You agree to open-source your code
                                                (it may even look good on your profile!).
                                                Do not mention our company’s name anywhere in the code.</li>
                                            <li>We will never use your source code under any
                                                circumstances for any commercial purposes;
                                                this is just a basic assessment task.&nbsp;</li>
                                            <li>Submit the Netlify URL and GitHub repository URLs</li>
                                        </ul>
                                        <p>NOTE: Any violation of Terms and conditions is
                                            strictly prohibited. You are bound to adhere to it.</p>
                                    </div>
                                </div>
                            </div>
                            {
                                webCode &&
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
                                                <a href={webCode.feCode} target="_blank" >
                                                    {webCode.feCode}  <FaExternalLinkAlt />
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="codeName">Front-end Deployed URL</td>
                                            <td>
                                                <a href={webCode.feUrl} target="_blank">
                                                    {webCode.feUrl}   <FaExternalLinkAlt />
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            }
                            {
                                !webCode &&
                                <Formik
                                    initialValues={{
                                        feCode: "",
                                        feUrl: "",
                                    }}
                                    validationSchema={validate}
                                    onSubmit={(values, { resetForm }) => {
                                        handleWebcode(values);
                                        resetForm({ values: "" });
                                    }}
                                >
                                    {
                                        formik => (
                                            <Form>
                                                <table className="table">
                                                    <thead>
                                                        <tr >
                                                            <th scope="col">Code Submission</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <TextField
                                                                    label="Front End Source Code"
                                                                    placeholder="Enter Front-end Source Code URL"
                                                                    name="feCode"
                                                                    id="feCode"
                                                                    type="url" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <TextField
                                                                    label="Front End Deployed URL"
                                                                    placeholder="Enter Front-end Deployed URL"
                                                                    name="feUrl"
                                                                    id="feUrl"
                                                                    type="url" />
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
                                            </Form>
                                        )
                                    }
                                </Formik>
                            }
                            <div className="col-12 marksContainer">
                                <div className="row d-flex align-itmes-center justify-content-between mx-1">
                                    <div className="col-12">
                                        <div className="mx-2 mt-3">Comments:</div>
                                        <div className="mx-2 mt-0 mb-3 py-3 px-2 rounded commentsstudent">
                                            {webCode ?
                                                `${webCode.comment}` : "Not submitted"
                                            }
                                        </div>
                                    </div>
                                </div>
                                <hr className="containerDivider mx-1" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal">
                                Close
                            </button>
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

export default Webcode;