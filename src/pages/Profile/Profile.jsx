import React, { useContext, useEffect } from 'react';
import "./profile.css"
import DataContext from '../../context/DataContext';
import { ToastContainer, Zoom } from "react-toastify";
import { Formik, Form } from 'formik';
import TextField from '../../components/textField/TextField';
import * as Yup from "yup";

const Profile = () => {

    const {
        handleProfileUpdate,
        loggedUser,
        isLoading,
        handleHead
    } = useContext(DataContext);

    const validate = Yup.object({
        name: Yup.string()
            .max(15, "Must be less than 15 Characters")
            .min(6, "Must be at least 6 Characters")
            .required("Required"),
        lName: Yup.string()
            .max(15, "Must be less than 15 Characters")
            .min(6, "Must be at least 6 Characters")
            .required("Required"),
        email: Yup.string()
            .email("Email is Invalid")
            .required("Required"),
        batch: Yup.string()
            .required("Required"),
        contactNo: Yup.string()
            .max(15, "Must be less than 15 Characters")
            .min(10, "Must be at least 10 Characters")
            .required("Required"),
        experience: Yup.string()
            .max(10, "Must be less than 10 Characters")
            .min(1, "Must be at least 1 Characters")
            .required("Required"),
        qualification: Yup.string()
            .max(35, "Must be less than 35 Characters")
            .min(2, "Must be at least 2 Characters")
            .required("Required"),
        password: Yup.string()
            .max(15, "Must be less than 15 Characters")
            .min(6, "Must be at least 6 Characters")
            .required("Required"),
        cPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Password Must Match")
            .required("Required"),

    })

    useEffect(() => {
        handleHead("Update Profile")
    }, [])
    return (
        <section className='profile'>
            <div className='container mt-5'>
                <Formik
                    initialValues={{
                        name: loggedUser.name,
                        lName: loggedUser.lName,
                        email: loggedUser.email,
                        contactNo: loggedUser.contactNo,
                        batch: loggedUser.batch,
                        experience: loggedUser.experience,
                        qualification: loggedUser.qualification,
                        password: "",
                        cPassword: ""
                    }}
                    validationSchema={validate}
                    onSubmit={(values, { resetForm }) => {
                        handleProfileUpdate(values);
                        resetForm({ values: "" });
                    }}
                >
                    {
                        formik => (
                            <Form>
                                <div className="detailCards">
                                    <h3 style={{ color: "var(--theme" }}>
                                        Profile Details :
                                    </h3>
                                    <TextField
                                        label="First Name"
                                        name="name"
                                        id="name"
                                        type="text"
                                        placeholder="Enter First Name"
                                    />
                                    <TextField
                                        label="Last Name"
                                        name="lName"
                                        id="lName"
                                        type="text"
                                        placeholder="Enter Last Name"
                                    />
                                    <TextField
                                        label="Email"
                                        name="email"
                                        id="email"
                                        type="email"
                                        disabled
                                    />
                                    <TextField
                                        label="Contact No"
                                        name="contactNo"
                                        id="contactNo"
                                        type="text"
                                        placeholder="Enter Contact No."
                                    />
                                    <TextField
                                        label="Batch"
                                        name="batch"
                                        id="batch"
                                        type="text"
                                        disabled
                                    />
                                    <TextField
                                        label="Experience"
                                        name="experience"
                                        id="experience"
                                        type="text"
                                        placeholder="Enter Experience in Years"
                                    />
                                    <TextField
                                        label="Qualification"
                                        name="qualification"
                                        id="qualification"
                                        type="text"
                                        placeholder="Enter Qualification"
                                    />
                                    <TextField
                                        label="Password"
                                        name="password"
                                        id="password"
                                        type="password"
                                        placeholder="Enter Password"
                                    />
                                    <TextField
                                        label="Confirm Password"
                                        name="cPassword"
                                        id="cPassword"
                                        type="password"
                                        placeholder="Confirm Password"
                                    />
                                    <div className="text-center mt-3">
                                        <button className="submit__capstone" type="submit">
                                            {
                                                isLoading ? (<span className="spinner-border spinner-border-sm text-warning"></span>) : "Update"
                                            }
                                        </button>
                                    </div>

                                </div>
                            </Form>
                        )
                    }
                </Formik>
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

export default Profile;