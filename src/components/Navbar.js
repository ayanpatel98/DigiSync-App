import { React, useContext, useState } from 'react'
import { Link, useLocation, useHistory } from "react-router-dom";
import newsContext from '../context/news/newsContext';
import Login from './Login';
import Signup from './Signup';

const Navbar = () => {
    let location = useLocation();
    let history = useHistory();
    const context = useContext(newsContext);
    const { signOut, user, isLoggedIn } = context;

    const handleSignOut = () => {
        localStorage.removeItem('token');
        history.push('/');
        signOut();
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark position-sticky top-0" style={{ zIndex: '6' }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">DigiSync</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        {
                            (isLoggedIn)
                                ?

                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === "/bookmarks" ? "active" : ""}`} to="/bookmarks">Bookmarked News</Link>
                                </li>
                                :
                                ''
                        }

                    </ul>
                    {localStorage.getItem('token')
                        ?
                        <>
                            <div className="text-center inline-block">
                                <div className="btn-group dropstart">
                                    <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        Hi, {user}
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-dark ">
                                        <li className='text-center'><button className="btn btn-primary mx-1" onClick={handleSignOut}>Sign Out</button></li>
                                    </ul>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <Login />
                            <Signup />
                        </>

                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar