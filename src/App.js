import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';

function App() {
  const[isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    // Check if the authentication token is present in localStorage
    const token = localStorage.getItem('token');
    console.log(localStorage.getItem('token'))
    console.log(localStorage.getItem('user'))

    if (token) {
      setIsAuthenticated(true);
      setUser(JSON.parse(localStorage.getItem('user')));
      console.log(JSON.parse(localStorage.getItem('user')))
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Profile user={user} /> : <Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
