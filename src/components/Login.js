import React, { useState } from 'react';
import '../styles/Login.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import axios from 'axios';
import data from '../data/data.json'

function Login() {
    const navigate = useNavigate();
    const [isStrong, setIsStrong] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [passToggle, setPassToggle] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');

    const isStrongPassword = (password) => {
        // Define a regular expression pattern to match the password criteria
        const pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$#!%*?&]{8,}$/;
        return pattern.test(password);
    };

    function generateRandomToken() {
        const timestamp = new Date().getTime(); // Current timestamp
        const randomString = Math.random().toString(36).substr(2, 10); // Random alphanumeric string
        const uniqueToken = `${timestamp}-${randomString}`;
        return uniqueToken;
      }

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
        setErrorMessage('')

        if (!isStrong) {
            setErrorMessage('Password does not meet requirements')
        }
        else {
            let userFound = false;
            data.map((item) => {
                console.log(item);
                if (item.email === formData.email && item.password === formData.password) {
                    setFormData({
                        email: '',
                        password: '',
                    });
                    setErrorMessage('');
                    userFound = true;
                    setMessage("Login Successful");
                    localStorage.setItem('token', generateRandomToken());
                    localStorage.setItem('user', JSON.stringify(item));
                    window.location.reload();
                }
            })
            if(!userFound){
                setErrorMessage("Invalid Credentials");
            }
        }
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
                        type={passToggle ? "password" : "text"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handlePasswordChange}
                        required
                    />
                    {passToggle ? <FaEyeSlash className='pass__toggle' style={{ color: '#a0a0a0' }} onClick={() => setPassToggle(!passToggle)} /> : <FaEye className='pass__toggle' onClick={() => setPassToggle(!passToggle)} />}
                    {isStrong === true ? (
                        <p className='login__pass__strong'>Password is strong.</p>
                    ) : null}
                    {isStrong === false ? (
                        <p className='login__pass__info'>Password should have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.</p>
                    ) : null}
                </div>
                {errorMessage && <p className="login__error__message">{errorMessage}</p>}
                {message && <p className="message">{message}</p>}
                <button type="submit">Login</button>
                <div className='signup__button'>Don't have an account? <span onClick={() => navigate('/signup')}>SignUp Now</span></div>
            </form>
        </div>
    );
}

export default Login;
