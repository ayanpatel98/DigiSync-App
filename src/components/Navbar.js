import {React, useContext, useState} from 'react'
import { Link, useLocation, useHistory } from "react-router-dom";
import noteContext from '../context/notes/noteContext';

const Navbar = () => {
    let location = useLocation();
    let history = useHistory();
    const context = useContext(noteContext);
    const {signOut, user} = context;

    const handleSignOut = () =>{
        localStorage.removeItem('token');
        history.push('/');
        signOut();
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/notebook" ? "active" : ""}`} to="/notebook">NoteBook</Link>
                        </li>

                    </ul>
                    {localStorage.getItem('token')
                    ?
                        <>
                            <div className="text-center inline-block">
                                <button className="btn btn-primary mx-1">{user}</button>
                            </div>
                            <form className="d-flex">
                                <button className="btn btn-primary mx-1" onClick={handleSignOut}>Sign Out</button>
                            </form>
                        </>
                    :
                        <form className="d-flex">
                            <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                            <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
                        </form>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar
