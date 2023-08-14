import React from 'react';
import "./header.css";
import Users from "../../assets/users.png";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import DataContext from '../../context/DataContext';

const Header = () => {
    const { head, handleLogout, loggedUser } = useContext(DataContext);
    return (
        <header className="top__header d-flex align-items-center justify-content-between">
            <h1 className="heading ">{head}</h1>
            <div className="user__profile d-flex gap-3">
                <h5 className="mt-3 mr-3 user__name">{loggedUser.name} {loggedUser.lName}</h5>
                <div className="flex-icons">
                    <div className="d-flex align-items-center justify-content-center dropdown">
                        <span className="dropdown" type="button" data-bs-toggle="dropdown">
                            <div className='user__logo d-flex align-items-center justify-content-center'>
                                {loggedUser.name.toUpperCase()[0]}{loggedUser.lName.toUpperCase()[0]}
                            </div>
                        </span>
                        <ul className="dropdown-menu">
                            <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                            <li><a className="dropdown-item" onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;