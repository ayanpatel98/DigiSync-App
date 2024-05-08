import React, { useContext, useState } from 'react';
import newsContext from '../context/news/newsContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
toast.configure();

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const navigate = useNavigate();
    const context = useContext(newsContext);
    const { getUser } = context;

    // Handle for login
    const handleSubmit = async (e) => {
        e.preventDefault();
        setCredentials({ email: "", password: "" });

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        if (json.success) {
            // Save the auth token in the local storage and redirect
            localStorage.setItem('token', json.authtoken);
            navigate('/');
            getUser();
            toast.success("You Logged In!", { autoClose: 2000 });
        }
        else {
            toast.error(json.error);
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        // Login form Section
        <div className="btn-group m-1">
            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="inside outside">
                Login
            </button>
            <form className="dropdown-menu p-4" onSubmit={handleSubmit} id="loginForm"
                style={{ left: 'unset', right: '0', width: '300px' }} noValidate>
                <div className="mb-3">
                    <label htmlFor="exampleDropdownFormEmail2" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="email@example.com"
                        value={credentials.email} onChange={onChange} name="email" aria-describedby="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleDropdownFormPassword2" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password"
                        value={credentials.password} onChange={onChange} name="password" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login;