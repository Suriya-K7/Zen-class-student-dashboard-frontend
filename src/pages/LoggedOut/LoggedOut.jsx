import React from 'react';
import "./loggedout.css";
import { Link } from 'react-router-dom';
import LOGO from "../../assets/logo.png"

const LoggedOut = () => {
    return (
        <div className='loggedOut'>
            <div className="row img__container">
                <img src={LOGO} alt=".." className='logo' />
            </div>
            <div className="body__container p-5 rounded">
                <h3 className='text-center mb-5'>
                    User has beed logged out. Kindly go to Login page
                </h3>
                <div className='text-center'>
                    <Link to='/' className='btn btn-success'>
                        Go To Login
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LoggedOut