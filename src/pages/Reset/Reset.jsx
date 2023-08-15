import React, { useEffect } from 'react';
import './reset.css';
import LOGO from "../../assets/logo.png";
import BANNER from "../../assets/banner.png";
import { Link, useParams } from 'react-router-dom';
import { useContext } from 'react';
import DataContext from '../../context/DataContext';
import { ToastContainer, Zoom } from "react-toastify";
import { Formik, Form } from 'formik';
import TextField from '../../components/textField/TextField';
import * as Yup from "yup";

const Reset = () => {
    const {
        handleReset,
        setResetToken,
        isLoading
    } = useContext(DataContext);

    const { id } = useParams();

    useEffect(() => {
        setResetToken(id);
    });

    const validate = Yup.object({
        password: Yup.string()
            .max(15, "Must be less than 15 Characters")
            .min(6, "Must be at least 6 Characters")
            .required("Required"),
        cPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Password Must Match")
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
                                        password: "",
                                        cPassword: ""
                                    }}
                                    validationSchema={validate}
                                    onSubmit={(values, { resetForm }) => {
                                        handleReset(values);
                                        resetForm({ values: "" });
                                    }}
                                >
                                    {
                                        formik => (
                                            <Form>
                                                <TextField
                                                    label="New Password"
                                                    name="password"
                                                    id="password"
                                                    type="password"
                                                    placeholder="Enter New Password"
                                                />
                                                <TextField
                                                    label="Confirm Password"
                                                    name="cPassword"
                                                    id="cPassword"
                                                    type="password"
                                                    placeholder="Confirm New Password"
                                                />
                                                <button type="submit" className="col-12 btn btn-lg btn-block login__btn mt-4 mb-4 d-flex justify-content-center">
                                                    {
                                                        isLoading ? (<span className="spinner-border text-warning"></span>) : "Update Password"
                                                    }
                                                </button>
                                            </Form>
                                        )
                                    }
                                </Formik>
                            </div>
                            <Link to="/" className="btn forgot btn-outline-success ">Go to Login</Link>
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

export default Reset;