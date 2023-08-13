import React, { useEffect } from 'react';
import "./portfolio.css";
import { useContext } from 'react';
import DataContext from '../../context/DataContext';
import { ToastContainer, Zoom } from "react-toastify";

const Portfolio = () => {
    const {
        portfolio,
        portfolioURL,
        setPortfolioURL,
        githubURL,
        setGithubURL,
        resumeURL,
        setResumeURL,
        fetchPortfolio,
        handlePortfolio,
        isLoading,
        trigger,
        setTrigger, } = useContext(DataContext);


    useEffect(() => {
        fetchPortfolio();
    }, [trigger, setTrigger]);

    return (
        <section className='portfolio'>
            <div className="row mx-0">
                <div className="col-sm-12 col-md-4 portfolio__area">
                    <form className="d-flex justify-content-center flex-column mt-2" onSubmit={handlePortfolio}>
                        <div className="row">
                            <div className="col-12">
                                <div className="widthfit mx-3 px-2">
                                    <div className="form-group mt-1">
                                        <label htmlFor="github" className="label__style mb-0">GitHub URL</label>
                                        <div>
                                            <input
                                                id='github'
                                                className="formInputs"
                                                name="github"
                                                type="url"
                                                required
                                                value={portfolioURL}
                                                onChange={(e) => setPortfolioURL(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group mt-1">
                                        <label htmlFor="deployed" className="label__style mb-0">Portfolio URL</label>
                                        <div>
                                            <input
                                                id='deployed'
                                                className="formInputs"
                                                name="deployed"
                                                type="url"
                                                required
                                                value={githubURL}
                                                onChange={(e) => setGithubURL(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group mt-1">
                                        <label htmlFor="resume" className="label__style mb-0">Resume URL</label>
                                        <div>
                                            <input
                                                id='resume'
                                                className="formInputs"
                                                name="resume"
                                                type="url"
                                                required
                                                value={resumeURL}
                                                onChange={(e) => setResumeURL(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex px-4">
                            <button className="btn button" type="submit">
                                {
                                    isLoading ?
                                        (<span className="spinner-border spinner-border-sm text-warning">
                                        </span>)
                                        : "Submit"
                                }
                            </button>
                        </div>
                    </form>
                    <p className="note">
                        <span> Note </span>: You Wont be Able to Submit When the Portfolio is under
                        <b> Review</b> or <b> Reviewed</b>.
                    </p>
                </div>
                <div className=" col-sm-12 col-md-8 review__area text-center">
                    <div className="border-bottom text-center">
                        <h3 className='review__header'>Portfolio Review</h3>
                    </div>
                    <div className="row secondaryGreyTextColor">
                        <div className="col-6">
                            <div className="port_item my-4 d-flex flex-column">
                                <span className="port_grey">Status:</span>
                                <span>{portfolio ? `${portfolio.status}` : "Not Submitted"}</span>
                            </div>
                            <div className="port_item my-4 d-flex flex-column">
                                <span className="port_grey">Comment:</span>
                                <span>{portfolio ? `${portfolio.comment}` : "Not Submitted"}</span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="port_item my-4 d-flex flex-column">
                                <span className="port_grey">Date:</span>
                                <span>{portfolio ? `${portfolio.submittedOn.slice(0, 10)}` : "Not Submitted"}</span>
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