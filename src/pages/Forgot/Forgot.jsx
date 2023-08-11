import React, { useContext } from 'react';
import LOGO from "../../assets/logo.png";
import BANNER from "../../assets/banner.png";
import { Link } from 'react-router-dom';
import { ToastContainer, Zoom } from "react-toastify";
import DataContext from '../../context/DataContext';

const Forgot = () => {
    const { handleForgot, email, setEmail } = useContext(DataContext);
    return (
        <div className="loginPage">
            <div className="row m-0">
                <div className="col-md-8">
                    <div className="row img__container">
                        <img src={LOGO} alt=".." className='logo' />
                    </div>
                    <div className="row">
                        <div className="col-md-12 d-flex flex-column justify-content-center align-items-center">
                            <div className="col-10 col-md-8 col-lg-6">
                                <form onSubmit={handleForgot}>
                                    <div className="form-group mt-5">
                                        <label htmlFor="email" className="label-style mb-0">Enter Resigtered Email</label>
                                        <div>
                                            <input
                                                className="form-control"
                                                id="email"
                                                name="email"
                                                placeholder="Example : johndoe@mail.com" type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="col-12 btn btn-lg btn-block login__btn mt-4 mb-4">
                                        Send Reset Link
                                    </button>
                                </form>
                            </div>
                            <Link to="/" className="btn forgot btn-outline-success ">Go to Login</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 text-right banner__right pr-0">
                    <img src={BANNER} className="banner" alt=".." />
                </div>
            </div>
        </div>
    )
}

export default Forgot