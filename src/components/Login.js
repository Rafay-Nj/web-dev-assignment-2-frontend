import React, { useState } from 'react';
import '../styles/Login.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const [isStrong, setIsStrong] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');

    const isStrongPassword = (password) => {
        // Define a regular expression pattern to match the password criteria
        const pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$#!%*?&]{8,}$/;
        return pattern.test(password);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePasswordChange = (e) => {
        setIsStrong(false);
        const { name, value } = e.target;
        const newPassword = e.target.value;
        // setPassword(newPassword);
        setIsStrong(isStrongPassword(newPassword));
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!isStrong){
            setErrorMessage('Password does not meet requirements')
        }
        else if(!formData.email){
            setErrorMessage('Email field is required')
        }
        else if(!formData.password){
            setErrorMessage("Password field is required");
        }
        else{
            
        }

    //     axios.post('' + process.env.REACT_APP_BACKEND_URL + 'api/auth/login', formData)
    //         .then((res) => {
    //             console.log(res.data);
    //             // setMessage(res.data.message);
    //             setFormData({
    //                 email: '',
    //                 password: '',
    //             });
    //             setErrorMessage('');
    //             setMessage("Login Successful");
    //             localStorage.setItem('token', res.data.token);
    //             localStorage.setItem('user', JSON.stringify(res.data.user));
    //             window.location.reload();
    //         })
    //         .catch((err) => {
    //             setErrorMessage(err.response.data.error);
    //             console.log(err.response.data.error)
    //         });

    //     // Add your login logic here (e.g., make an API request to your backend)
    //     // If login fails, set an error message

    //     // Example error message:
    //     // setErrorMessage('Login failed. Please check your credentials.');
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
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
                        onChange={handlePasswordChange}
                        required
                    />
                    {isStrong === true ? (
                        <p className='login__pass__strong'>Password is strong.</p>
                    ) : null }
                    {isStrong === false ? (
                        <p className='login__pass__info'>Password should have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.</p>
                    ) : null }
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {message && <p className="message">{message}</p>}
                <button type="submit">Login</button>
                <div className='signup__button'>Don't have an account? <span onClick={() => navigate('/signup')}>SignUp Now</span></div>
            </form>
        </div>
    );
}

export default Login;
