import { useState } from 'react';
import { Navigate } from 'react-router';
import { Link } from "react-router-dom"

function Signup({setCurrentUser}) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    email: '',
  });
  const [created, setCreated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const createUser = async (event) => {
    event.preventDefault();

    const { first_name, last_name, username, email, password } = formData;

    const user = {
      first_name,
      last_name,
      username,
      email,
      password,
    };

    try {
      const response = await fetch('/signup', {
        
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        setCreated(true);
        setCurrentUser(data.user)
        setErrorMessage('');
      } else {
        setErrorMessage(data.message || 'Your signup did not go through.');
      }
    } catch (error) {
      setErrorMessage('Your signup did not go through. Make sure all parts of this project are running before attempting again!');
    }
  };

  if (created) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="signup-container">
      {errorMessage && <div><p>{errorMessage}</p></div>}
      <div className="signup-card">
        <form onSubmit={createUser}>
          <h1>Please join our Ethereal Family!</h1>
          <br />
          <div>
            <input className="signup-form-field" onChange={handleChange} type="text" name="first_name" placeholder="First Name" />
          </div>
          <div>
            <input className="signup-form-field" onChange={handleChange} type="text" name="last_name" placeholder="Last Name" />
          </div>
          <div>
            <input className="signup-form-field" onChange={handleChange} type="text" name="email" placeholder="Email" />
          </div>
          <div>
            <input className="signup-form-field" onChange={handleChange} type="text" name="username" placeholder="Username" />
          </div>
          <div>
            <input className="signup-form-field" onChange={handleChange} type="password" name="password" placeholder="Password" />
          </div>
          <input className="signup-form-submit" type="submit" value="Sign Up"   />
        </form>
        <br />
        <p>
          Already signed up? <Link to="/login">Please log in!</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
