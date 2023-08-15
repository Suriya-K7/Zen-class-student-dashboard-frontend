import React, { useContext } from 'react';
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
        password,
        setPassword,
        cPassword,
        setcPassword,
        name,
        setName,
        lName,
        setlName,
        qualification,
        setQualification,
        experience,
        setExperience,
        contactNo,
        setContactNo,
        email,
        setEmail,
        Batch,
        setBatch,
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
                                    <TextField label="First Name" name="name" id="name" type="text" />
                                    <TextField label="Last Name" name="lName" id="lName" type="text" />
                                    <TextField label="Email" name="email" id="email" type="email" disabled />
                                    <TextField label="Contact No" name="contactNo" id="contactNo" type="text" />
                                    <TextField label="Batch" name="batch" id="batch" type="text" disabled />
                                    <TextField label="Experience" name="experience" id="experience" type="text" />
                                    <TextField label="Qualification" name="qualification" id="qualification" type="text" />
                                    <TextField label="Password" name="password" id="password" type="password" />
                                    <TextField label="Confirm Password" name="cPassword" id="cPassword" type="password" />
                                    <div className="text-center mt-3"><button className="submit__capstone" type="submit">
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
                {/* <form onSubmit={handleProfileUpdate}>
                    <div className="detailCards">
                        <h3 style={{ color: "var(--theme" }}>
                            Profile Details :
                        </h3>
                        <div className="personalDetails">
                            <label htmlFor="fname" className="label__style mb-0">First Name</label>
                            <div>
                                <input
                                    className="code__submission"
                                    id='fname'
                                    name="Fisrt Name"
                                    placeholder={loggedUser.name}
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <label htmlFor="lname" className="label__style mb-0">Last Name</label>
                            <div>
                                <input
                                    className="code__submission"
                                    id='lname'
                                    name="Last Name"
                                    placeholder={loggedUser.lName}
                                    type="text"
                                    value={lName}
                                    onChange={(e) => setlName(e.target.value)}
                                    required
                                />
                            </div>
                            <label htmlFor="mobile" className="label__style mb-0">Contact No</label>
                            <div>
                                <input
                                    className="code__submission"
                                    id='mobile'
                                    name="mobile"
                                    placeholder={loggedUser.contactNo}
                                    type="text"
                                    value={contactNo}
                                    onChange={(e) => setContactNo(e.target.value)}
                                    required
                                />
                            </div>
                            <label htmlFor="email" className="label__style mb-0">Email</label>
                            <div>
                                <input
                                    className="code__submission"
                                    id='email'
                                    name="email"
                                    type="text"
                                    placeholder={loggedUser.email}
                                    disabled
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <label htmlFor="batch" className="label__style mb-0">Batch</label>
                            <div>
                                <input
                                    className="code__submission"
                                    id='batch'
                                    name="batch"
                                    type='text'
                                    disabled
                                    placeholder={loggedUser.batch}
                                    value={Batch}
                                    onChange={(e) => setBatch(e.target.value)}
                                    required
                                />
                            </div>
                            <label htmlFor="qualification" className="label__style mb-0">Qualification</label>
                            <div>
                                <input
                                    className="code__submission"
                                    id='qualification'
                                    name="qualification"
                                    placeholder={loggedUser.qualification}
                                    type="text"
                                    value={qualification}
                                    onChange={(e) => setQualification(e.target.value)}
                                    required
                                />
                            </div>
                            <label htmlFor="YearofExperience" className="label__style mb-0">Year of Experience</label>
                            <div>
                                <input
                                    className="code__submission"
                                    id='YearofExperience'
                                    name="Year of Experience"
                                    placeholder={loggedUser.experience}
                                    type="text"
                                    value={experience}
                                    onChange={(e) => setExperience(e.target.value)}
                                    required
                                />
                            </div>
                            <label htmlFor="password" className="label__style mb-0">Password</label>
                            <div>
                                <input
                                    className="code__submission"
                                    id='password'
                                    name="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <label htmlFor="cpassword" className="label__style mb-0">Confirm Password</label>
                            <div>
                                <input
                                    className="code__submission"
                                    id='cpassword'
                                    name="Confirm Password"
                                    type="password"
                                    value={cPassword}
                                    onChange={(e) => setcPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="text-center mt-3"><button className="submit__capstone" type="submit">Update</button></div>
                        </div>
                    </div>
                </form> */}
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