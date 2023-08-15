import React, { useEffect } from 'react';
import "./portfolio.css";
import { useContext } from 'react';
import DataContext from '../../context/DataContext';
import { ToastContainer, Zoom } from "react-toastify";
import { Formik, Form } from 'formik';
import RequestField from '../../components/textField/RequestField';
import * as Yup from "yup";

const Portfolio = () => {
    const {
        portfolio,
        fetchPortfolio,
        handlePortfolio,
        isLoading,
        trigger,
        setTrigger, } = useContext(DataContext);


    useEffect(() => {
        fetchPortfolio();
    }, [trigger, setTrigger]);

    const validate = Yup.object({
        portfolioURL: Yup.string().url()
            .required("Required"),
        githubURL: Yup.string().url()
            .required("Required"),
        resumeURL: Yup.string().url()
            .required("Required"),
    })

    return (
        <section className='portfolio'>
            <div className="row mx-0">
                <div className="col-sm-12 col-md-6 portfolio__area">

                    <Formik
                        initialValues={{
                            githubURL: "",
                            portfolioURL: "",
                            resumeURL: ""
                        }}
                        validationSchema={validate}
                        onSubmit={(values, { resetForm }) => {
                            handlePortfolio(values);
                            resetForm({ values: "" });
                        }}
                    >
                        {
                            formik => (
                                <Form>
                                    <div className="widthfit mx-3 px-2">
                                        <RequestField
                                            label="Github URL"
                                            name="githubURL"
                                            id="githubURL"
                                            placeholder="Enter Github URL"
                                            type="url" />
                                        <RequestField
                                            label="Portfolio URL"
                                            name="portfolioURL"
                                            id="portfolioURL"
                                            placeholder="Enter Portfolio URL"
                                            type="url" />
                                        <RequestField
                                            label="Resume URL"
                                            name="resumeURL"
                                            id="resumeURL"
                                            placeholder="Enter Resume URL"
                                            type="url" />
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <button className="btn button" type="submit">
                                            {
                                                isLoading ?
                                                    (<span
                                                        className="spinner-border spinner-border-sm text-warning">
                                                    </span>)
                                                    : "Submit"
                                            }
                                        </button>
                                    </div>
                                </Form>
                            )
                        }
                    </Formik>
                    <p className="note">
                        <span> Note </span>: You Wont be Able to Submit When the Portfolio is under
                        <b> Review</b> or <b> Reviewed</b>.
                    </p>
                </div>
                <div className=" col-sm-12 col-md-6 review__area text-center">
                    <div className="border-bottom text-center">
                        <h3 className='review__header'>Portfolio Review</h3>
                    </div>
                    <div className="row secondaryGreyTextColor">
                        <div className="col-12 col-sm-6">
                            <div className="port_item my-4 d-flex flex-column">
                                <span className="port_grey">Status:</span>
                                <span>{portfolio ? `${portfolio.status}` : "Not Submitted"}</span>
                            </div>
                            <div className="port_item my-4 d-flex flex-column">
                                <span className="port_grey">Comment:</span>
                                <span>{portfolio ? `${portfolio.comment}` : "Not Submitted"}</span>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6">
                            <div className="port_item my-4 d-flex flex-column">
                                <span className="port_grey">Date:</span>
                                <span>
                                    {portfolio ? `${portfolio.submittedOn.slice(0, 10)}` : "Not Submitted"}
                                </span>
                            </div>
                            <div className="port_item my-4 d-flex flex-column ">
                                <span className="port_grey">Reviewed By:</span>
                                <span>{portfolio ? `${portfolio.reveiwedBy}` : "Not Submitted"}</span>
                            </div>
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

export default Portfolio;