import React from 'react';
import "./portfolio.css";

const Portfolio = () => {
    return (
        <section className='portfolio'>
            <div className="row mx-0">
                <div className="col-sm-12 col-md-4 portfolio__area">
                    <form className="d-flex justify-content-center flex-column mt-2" autoComplete="off">
                        <div className="row">
                            <div className="col-12">
                                <div className="widthfit mx-3 px-2">
                                    <div className="form-group mt-1">
                                        <label htmlFor="github" className="label__style mb-0">GitHub URL</label>
                                        <div>
                                            <input id='github' className="formInputs" name="github" type="text" />
                                        </div>
                                    </div>
                                    <div className="form-group mt-1">
                                        <label htmlFor="deployed" className="label__style mb-0">Portfolio URL</label>
                                        <div>
                                            <input id='deployed' className="formInputs" name="deployed" type="text" />
                                        </div>
                                    </div>
                                    <div className="form-group mt-1">
                                        <label htmlFor="resume" className="label__style mb-0">Resume URL</label>
                                        <div>
                                            <input id='resume' className="formInputs" name="resume" type="text" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex px-4">
                            <button className="btn button" type="submit">Submit</button>
                        </div>
                    </form>
                    <p className="note">
                        <span> Note </span>: You Wont be Able to Submit When the Portfolio is under <b> Review</b> or <b> Reviewed</b>.
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
                                <span>Not Submitted</span>
                            </div>
                            <div className="port_item my-4 d-flex flex-column">
                                <span className="port_grey">Comment:</span>
                                <span></span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="port_item my-4 d-flex flex-column">
                                <span className="port_grey">Batch:</span><span>Not Submitted</span>
                            </div>
                            <div className="port_item my-4 d-flex flex-column "><span className="port_grey">Reviewed By:</span><span>Not Submitted</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Portfolio;