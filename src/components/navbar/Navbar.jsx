import React, { useContext } from 'react';
import "./navbar.css";
import Logo from "../../assets/logo.png";
import { navBarLink } from '../../data';
import { NavLink } from 'react-router-dom';
import DataContext from '../../context/DataContext';


const Navbar = () => {
    const { setHead } = useContext(DataContext);
    return (
        <nav className='navbar__side'>
            <div className='nav__header d-flex align-items-center gap-2'>
                <img src={Logo} alt=".." className='img' />
                <h2 className='user'>Student</h2>
            </div>
            <div className='nav__link d-flex flex-column gap-3'>
                {
                    navBarLink.map((nav) => {
                        return (
                            <li key={nav.id} onClick={() => setHead(nav.name)}>
                                <NavLink to={nav.link} className={({ isActive }) =>
                                    isActive ? "nav__item nav-active" : "nav__item text-secondary"
                                }>
                                    <span className='nav__icon'>{nav.icon}</span>
                                    <span className='nav__title'>
                                        {nav.name}
                                    </span>
                                </NavLink>
                            </li>
                        )
                    })
                }
            </div>
        </nav>
    )
}

export default Navbar