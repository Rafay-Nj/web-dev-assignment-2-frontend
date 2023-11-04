import React from 'react'
import '../styles/Profile.css'

function Profile() {

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload();
    }
    return (
        <div className='profile'>
            <div className='profile__title'>Welcome to your Profile</div>
            <div className='profile__subtitle'>You are logged in!</div>
            <div className='profile__text__section'>
                <div className="profile__text">Full Name:</div>
                <div className="profile__text2">{JSON.parse(localStorage.getItem('user'))?.fullname}</div>
            </div>
            <div className='profile__text__section'>
                <div className="profile__text">Email:</div>
                <div className="profile__text2">{JSON.parse(localStorage.getItem('user'))?.email}</div>
            </div>
            {/* <div className='profile__text__section'>
                <div className="profile__text">logged in token:</div>
                <div className="profile__text2">{localStorage.getItem('token')}</div>
            </div> */}
            <button className="profile__button" onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Profile
