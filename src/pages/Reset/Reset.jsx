import React, { useEffect } from 'react';
import './reset.css';
import LOGO from "../../assets/logo.png";
import BANNER from "../../assets/banner.png";
import { Link, useParams } from 'react-router-dom';
import { useContext } from 'react';
import DataContext from '../../context/DataContext';

const Reset = () => {
    const {
        handleReset,
        password,
        cPassword,
        setPassword,
        setcPassword,
        setResetToken,
    } = useContext(DataContext);
    const { id } = useParams();
    useEffect(() => {
        setResetToken(id);
    });

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
                                <form onSubmit={handleReset}>
                                    <div className="form-group mt-5">
                                        <label htmlFor="password" className="label-style mb-0">New Password</label>
                                        <div>
                                            <input
                                                className="form-control"
                                                id="password"
                                                name="password"
                                                placeholder="New Password" type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="cpassword" className="label-style mb-0">Confirm Password</label>
                                        <div>
                                            <input
                                                className="form-control"
                                                id="cpassword"
                                                name="cpassword"
                                                placeholder="Confirm Password" type="password"
                                                value={cPassword}
                                                onChange={(e) => setcPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="col-12 btn btn-lg btn-block login__btn mt-4 mb-4">
                                        Reset Password
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

export default Reset;