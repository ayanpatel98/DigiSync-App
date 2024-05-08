import { React, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import newsContext from '../context/news/newsContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const Signup = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", passwordConfirm: "" })
    let navigate = useNavigate();
    const context = useContext(newsContext);
    const { getUser } = context;

    // Hangle for Signup
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (credentials.password != credentials.passwordConfirm) {
            toast.error("Password does not match");
        }
        else {
            setCredentials({ name: "", email: "", password: "", passwordConfirm: "" });

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
                navigate("/");
                toast.success("You Have Signed Up!", { autoClose: 2000 });
                getUser();
            }
            else {
                toast.error(json.error);
            }
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        // Signup Form section
        <div className="btn-group m-1">
            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="inside outside">
                Signup
            </button>
            <form className="dropdown-menu p-4" onSubmit={handleSubmit}
                style={{ left: 'unset', right: '0', width: '300px' }} noValidate>
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
                <div className="mb-3">
                    <label htmlFor="exampleDropdownFormPassword3" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="passwordConfirmSignup" placeholder="Confirm Password"
                        value={credentials.passwordConfirm} onChange={onChange} name="passwordConfirm" />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    )
}

export default Signup;