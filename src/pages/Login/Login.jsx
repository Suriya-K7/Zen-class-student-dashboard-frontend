import React, { useContext } from "react";
import "./login.css";
import LOGO from "../../assets/logo.png";
import BANNER from "../../assets/banner.png";
import { Link } from "react-router-dom";
import DataContext from "../../context/DataContext";
import { ToastContainer, Zoom } from "react-toastify";
import { Formik, Form } from "formik";
import TextField from "../../components/textField/TextField";
import * as Yup from "yup";

const Login = () => {
  const { handleSignIn, isLoading } = useContext(DataContext);

  const validate = Yup.object({
    email: Yup.string().email("Email is Invalid").required("Required"),
    password: Yup.string().required("Required"),
  });

  return (
    <div className='loginPage'>
      <div className='row m-0'>
        <div className='col-md-8'>
          <div className='row img__container'>
            <img
              src={LOGO}
              alt='..'
              className='logo'
            />
          </div>
          <div className='row'>
            <div className='col-md-12 d-flex flex-column justify-content-center align-items-center'>
              <div className='col-10 col-md-8 col-lg-6'>
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  validationSchema={validate}
                  onSubmit={(values) => {
                    handleSignIn(values);
                  }}
                >
                  {(formik) => (
                    <Form>
                      <TextField
                        label='Email'
                        name='email'
                        id='email'
                        type='email'
                        placeholder='Enter Register Email'
                      />
                      <TextField
                        label='Password'
                        name='password'
                        id='password'
                        type='password'
                        placeholder='Enter Password'
                      />
                      <button
                        type='submit'
                        className='col-12 btn btn-lg btn-block login__btn mt-4 mb-4 d-flex justify-content-center'
                      >
                        {isLoading ? (
                          <span className='spinner-border text-warning'></span>
                        ) : (
                          "Login"
                        )}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
              <Link
                to='/forgot'
                className='btn forgot btn-outline-danger mb-2'
              >
                Forgot Password?
              </Link>
              <Link
                to='/signup'
                className='btn forgot btn-outline-success'
              >
                Not Register? Sign up
              </Link>
              <button
                className='btn mt-2 instruction forgot'
                data-bs-toggle='modal'
                data-bs-target='#myModal'
              >
                Demo Credentials
              </button>
            </div>
          </div>
        </div>
        <div className='col-md-4 text-right banner__right pr-0'>
          <img
            src={BANNER}
            className='banner'
            alt='..'
          />
        </div>
      </div>
      <div
        className='modal'
        id='myModal'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Welcome to Zen Student Dashboard</h4>
            </div>
            <div className='modal-body'>
              for Student Login use below ID or create new one: <br />
              <span className='mx-5'> Email : usraising@gmail.com</span> <br />
              <span className='mx-5'> password : suriya@123</span> <br />
              <span className='mx-5'> Email : usraise@live.com</span> <br />
              <span className='mx-5'> password : suriya@123</span> <br />
              <hr />
              for Mentor Login use below ID
              <br />
              <span className='mx-5'> Email : mentor@gmail.com</span> <br />
              <span className='mx-5'> password : mentor@123</span> <br />
              <hr />
              <span className='text-secondary text-justify'>
                Note: This Student Dashboard project includes features tailored
                for students, such as attending classes, submitting tasks,
                checking the dashboard, submitting webcode and capstone
                projects, raising queries, submitting porfolio, and requesting
                leave. Mentor login provides exclusive access for task
                evaluation only.
              </span>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-danger'
                data-bs-dismiss='modal'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position='top-right'
        autoClose={1000}
        transition={Zoom}
        draggable={false}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme='dark'
      />
    </div>
  );
};

export default Login;
