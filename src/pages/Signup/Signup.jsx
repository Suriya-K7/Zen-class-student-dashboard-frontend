import React, { useContext } from 'react';
import LOGO from "../../assets/logo.png";
import BANNER from "../../assets/banner.png";
import { Link } from 'react-router-dom';
import DataContext from '../../context/DataContext';

const Signup = () => {
    const {
        handleSignUp,
        email,
        setEmail,
        password,
        setPassword,
        name,
        setName,
        cPassword,
        setcPassword,
        qualification,
        setQualification,
        experience,
        setExperience,
        contactNo,
        setContactNo,
        lName,
        setlName
    } = useContext(DataContext);
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
                                <form onSubmit={handleSignUp}>
                                    <div className="form-group mt-2">
                                        <label htmlFor="email" className="label-style mb-0">Email</label>
                                        <div>
                                            <input
                                                className="form-control"
                                                id="email"
                                                name="email"
                                                placeholder="Example : johndoe@mail.com"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="name" className="label-style mb-0">First Name</label>
                                        <div>
                                            <input
                                                className="form-control"
                                                id="name"
                                                name="name"
                                                placeholder="Example : Suriya"
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="lastName" className="label-style mb-0">Last Name</label>
                                        <div>
                                            <input
                                                className="form-control"
                                                id="lastName"
                                                name="lastName"
                                                placeholder="Example : Kesavamurthy"
                                                type="text"
                                                value={lName}
                                                onChange={(e) => setlName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="contactNo" className="label-style mb-0">Contact No</label>
                                        <div>
                                            <input
                                                className="form-control"
                                                id="contactNo"
                                                name="contactNo"
                                                placeholder="Example : 9876543120"
                                                type="text"
                                                value={contactNo}
                                                onChange={(e) => setContactNo(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="Qualification" className="label-style mb-0">Qualification</label>
                                        <div>
                                            <input
                                                className="form-control"
                                                id="Qualification"
                                                name="Qualification"
                                                placeholder="Example : B.E.,"
                                                type="text"
                                                value={qualification}
                                                onChange={(e) => setQualification(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="Experience" className="label-style mb-0">Experience</label>
                                        <div>
                                            <input
                                                className="form-control"
                                                id="Experience"
                                                name="Experience"
                                                placeholder="Example : 8 Years"
                                                type="text"
                                                value={experience}
                                                onChange={(e) => setExperience(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group mt-1">
                                        <label htmlFor="password" className="label-style mb-0">Password</label>
                                        <div>
                                            <input
                                                className="form-control"
                                                id="password"
                                                name="password"
                                                placeholder="Your password"
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group mt-1">
                                        <label htmlFor="cpassword" className="label-style mb-0">Confirm Password</label>
                                        <div>
                                            <input
                                                className="form-control"
                                                id="cpassword"
                                                name="cpassword"
                                                placeholder="Confirm password"
                                                type="password"
                                                value={cPassword}
                                                onChange={(e) => setcPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="col-12 btn btn-lg btn-block login__btn mt-4 mb-4">Register</button>
                                </form>
                            </div>
                            <Link to="/" className="btn forgot btn-outline-success">Go to Login</Link>
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

export default Signup;