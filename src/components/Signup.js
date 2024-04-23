import { React, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import noteContext from '../context/notes/noteContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const Signup = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })
    let history = useHistory();
    const context = useContext(noteContext);
    const { getUser } = context;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            history.push("/");
            toast.success("You Have Signed Up!", { autoClose: 2000 });
            getUser();
        }
        else {
            alert("Invalid credentials");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="btn-group dropstart m-1">
            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                Signup
            </button>
            <form className="dropdown-menu p-4" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" placeholder="email@example.com"
                        value={credentials.name} onChange={onChange} id="name" name="name" aria-describedby="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleDropdownFormEmail2" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="emailSignup" placeholder="email@example.com"
                        value={credentials.email} onChange={onChange} name="email" aria-describedby="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleDropdownFormPassword2" className="form-label">Password</label>
                    <input type="password" className="form-control" id="passwordSignup" placeholder="Password"
                        value={credentials.password} onChange={onChange} name="password" />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    )
}

export default Signup