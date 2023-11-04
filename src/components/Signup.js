import React, { useState } from 'react';
import '../styles/Signup.css'; // Import the CSS file
import { FaChevronLeft } from 'react-icons/fa';
// import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // if (formData.password !== formData.confirmPassword) {
        //     setErrorMessage('Passwords do not match.');
        // } else if (formData.password.length < 6) {
        //     setErrorMessage('Password should be at least 6 characters long.');
        // } else {
        //     // Submit the form or send data to your backend API
        //     setErrorMessage('');
        //     console.log(formData);
        //     axios.post('' + process.env.REACT_APP_BACKEND_URL + 'api/auth/signup', formData)
        //         .then((res) => {
        //             console.log(res.data);
        //             setMessage(res.data.message);
        //             setFormData({
        //                 username: '',
        //                 email: '',
        //                 password: '',
        //                 confirmPassword: '',
        //             });
        //         })
        //         .catch((err) => {
        //             setErrorMessage(err.response);
        //             console.log(err.response)
        //         });
        //     // Add your API call or form submission logic here
        // }
    };

    return (
        <div className="container">
            <div className="login__button" onClick={() => navigate('/')}><FaChevronLeft style={{marginRight: '5px'}} /> Back to Login</div>
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {message && <p className="message">{message}</p>}
                <button type="submit">Sign Up</button>
                <div className='lg__button'>Already have an account? <span onClick={() => navigate('/')}>Log In</span></div>
            </form>
        </div>
    );
}

export default Signup;
