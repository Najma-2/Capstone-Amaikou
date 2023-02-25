import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

function Login({ setCurrentUser, loggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.error) {
        setErrorMessage(data);
      } else {
        setCurrentUser(data);
      }
    } catch (err) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  // If user is already logged in, redirect to home page
  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <form onSubmit={handleFormSubmit}>
          <h2>Please join the line by logging in!</h2>
          <div>
            <input
              className="login-form-field"
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              className="login-form-field"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input className="login-form-submit" type="submit" value="Login" />
        </form>
        <br />
        <p>Don't have an account?</p>
        <p>
          Feel free to <Link to="/signup">sign up here!</Link>
        </p>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default Login;
