import React, { useContext } from 'react';
import "./login.css";
import LOGO from "../../assets/logo.png";
import BANNER from "../../assets/banner.png";
import { Link } from 'react-router-dom';
import DataContext from '../../context/DataContext';
import { ToastContainer, Zoom } from "react-toastify";
import { Formik, Form } from 'formik';
import TextField from '../../components/textField/TextField';
import * as Yup from "yup";

const Login = () => {
    const { handleSignIn, isLoading } = useContext(DataContext);

    const validate = Yup.object({
        email: Yup.string()
            .email("Email is Invalid")
            .required("Required"),
        password: Yup.string()
            .required("Required"),
    })

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
                                <Formik
                                    initialValues={{
                                        email: "",
                                        password: ""
                                    }}
                                    validationSchema={validate}
                                    onSubmit={(values) => {
                                        handleSignIn(values);
                                    }}
                                >
                                    {
                                        formik => (
                                            <Form>
                                                <TextField label="Email" name="email" id="email" type="email" />
                                                <TextField label="Password" name="password" id="password" type="password" />
                                                <button type="submit" className="col-12 btn btn-lg btn-block login__btn mt-4 mb-4 d-flex justify-content-center">
                                                    {
                                                        isLoading ? (<span className="spinner-border text-warning"></span>) : "Login"
                                                    }
                                                </button>
                                            </Form>
                                        )
                                    }
                                </Formik>
                                {/* <form onSubmit={handleSignIn}>
                                    <div className="form-group mt-2">
                                        <label htmlFor="email" className="label-style mb-0">Email</label>
                                        <div>
                                            <input
                                                className="form-control"
                                                id="email" name="email"
                                                placeholder="Example : johndoe@mail.com"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
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
                                    <button type="submit" className="col-12 btn btn-lg btn-block login__btn mt-4 mb-4 d-flex justify-content-center">
                                        {
                                            isLoading ? (<span className="spinner-border text-warning"></span>) : "Login"
                                        }
                                    </button>
                                </form> */}
                            </div>
                            <Link to="/forgot" className="btn forgot btn-outline-danger mb-2">Forgot Password?</Link>
                            <Link to="/signup" className="btn forgot btn-outline-success">Not Register? Sign up</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 text-right banner__right pr-0">
                    <img src={BANNER} className="banner" alt=".." />
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
        </div>
    )
}

export default Login;