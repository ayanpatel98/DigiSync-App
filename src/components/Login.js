import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();


const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let history = useHistory();
    const context = useContext(noteContext);
    const { getUser } = context;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            history.push("/");
            getUser();
            toast.success("You Logged In!", { autoClose: 2000 });

        }
        else {
            alert("Invalid credentials");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        // <div className="btn-group dropstart m-1">
        <div className="btn-group m-1">
            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="inside outside">
                Login
            </button>
            <form className="dropdown-menu p-4" onSubmit={handleSubmit} style={{left: 'unset', right:'0', width: '300px'}}>
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
                <div className="mb-3">
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="dropdownCheck2" />
                        <label className="form-check-label" htmlFor="dropdownCheck2">
                            Remember me
                        </label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login
