import React, { useState } from 'react';
import '../styles/Signup.css'; // Import the CSS file
import { FaChevronLeft } from 'react-icons/fa';
// import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const [successfull, setSuccessfull] = useState(false);
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isStrong, setIsStrong] = useState(null);

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

    const isStrongPassword = (password) => {
        // Define a regular expression pattern to match the password criteria
        const pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$#!%*?&]{8,}$/;
        return pattern.test(password);
    };

    React.useEffect(() => {
        if (successfull) {
            const timeOutId = setTimeout(() => {
                navigate('/');
            }, 3000);
            return () => clearTimeout(timeOutId);
        }
    }, [successfull]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('')

        if (isStrong === false) {
            setErrorMessage('Password should have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.')
        }
        else if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Confirm Password should match Password')
        }
        else {
            const data = {
                fullname: formData.fullname,
                email: formData.email,
                password: formData.password
            };

            // fetch('../data/data.json')
            //     .then((response) => {
            //         if (!response.ok) {
            //             throw new Error('Network response was not ok');
            //         }
            //         return response.json();
            //     })
            //     .then((json) => {
            //         const updatedData = [...json, data];
            //         console.log(json);
            //         const blob = new Blob([JSON.stringify(updatedData)], { type: 'application/json' });
            //         const url = URL.createObjectURL(blob);

            //         // Create a download link and trigger the download
            //         const a = document.createElement('a');
            //         a.href = url;
            //         a.download = 'data.json';
            //         a.click();

            //         // Reset form fields
            //         setFormData({
            //             fullname: '',
            //             email: '',
            //             password: '',
            //             confirmPassword: '',
            //         });
            //         setMessage("Signup Successfull");

            //         setSuccessfull(true);
            //     })
            //     .catch((error) => {
            //         console.error('Error:', error);
            //     });
                setFormData({
                    fullname: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                });
                setMessage("Signup Successfull");

                setSuccessfull(true);
        }

    };

    return (
        <div className="container">
            <div className="login__button" onClick={() => navigate('/')}><FaChevronLeft style={{ marginRight: '5px' }} /> Back to Login</div>
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <div className="form-group">
                    <label htmlFor="fullname">Full Name:</label>
                    <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        value={formData.fullname}
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
                        onChange={handlePasswordChange}
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
