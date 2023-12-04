import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import logoImage from '../assets/Logo.png'; // Import your logo image here
import './SignUp.css';

function SignUp() {
  const navigate = useNavigate(); // Create useNavigate instance for redirection

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
        username: event.target.elements.username.value,
        password: event.target.elements.password.value,
        email: event.target.elements.email.value,
        first_name: event.target.elements.firstName.value,
        last_name: event.target.elements.lastName.value,
        mbti: event.target.elements.mbti.value,
        gender: event.target.elements.gender.value,
        mbti_variant: event.target.elements.mbti_variant.value
    };

    const response = await fetch('http://localhost:8000/account/signup/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      localStorage.setItem('token', responseData.token); // Store the token in localStorage
      localStorage.setItem('username', responseData.username); // Store the user id in localStorage
      navigate(`/dashboard/${responseData.username}`); // Redirect to the user-specific dashboard
  } else {
      // Handle error
      console.error('Response not OK:', response);
      alert("Failed to sign up. Please try again.");
  }
  };

return (
  <div className="signup-container">
    <form className="signup-form" onSubmit={handleSubmit}>
      <img src={logoImage} alt="Emo AI Logo" className="signup-logo" /> {/* Add this line */}
      <h1>Sign Up</h1>
      <input type="text" placeholder="Username" name="username" />
      <input type="email" placeholder="E-mail" name="email" />
      <input type="password" placeholder="Password" name="password" />
      <input type="password" placeholder="Confirm Password" name="confirmPassword" />
      <input type="text" placeholder="Last Name" name="lastName" />
      <input type="text" placeholder="First Name" name="firstName" />
      <select name="gender" className="signup-dropdown">
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Non-binary">Non-binary</option>
        <option value="Other">Other</option>
      </select>
      <select name="mbti" className="signup-dropdown">
      <option value="">Select Your MBTI Type</option>
      {/* Analysts */}
      <optgroup label="Analysts">
          <option value="INTJ">INTJ</option>
          <option value="INTP">INTP</option>
          <option value="ENTJ">ENTJ</option>
          <option value="ENTP">ENTP</option>
      </optgroup>
      {/* Diplomats */}
      <optgroup label="Diplomats">
          <option value="INFJ">INFJ</option>
          <option value="INFP">INFP</option>
          <option value="ENFJ">ENFJ</option>
          <option value="ENFP">ENFP</option>
      </optgroup>
      {/* Sentinels */}
      <optgroup label="Sentinels">
          <option value="ISTJ">ISTJ</option>
          <option value="ISFJ">ISFJ</option>
          <option value="ESTJ">ESTJ</option>
          <option value="ESFJ">ESFJ</option>
      </optgroup>
      {/* Explorers */}
      <optgroup label="Explorers">
          <option value="ISTP">ISTP</option>
          <option value="ISFP">ISFP</option>
          <option value="ESTP">ESTP</option>
          <option value="ESFP">ESFP</option>
      </optgroup>
      </select>

      <select name="mbti_variant" className="signup-dropdown">
      <option value="">Select Variant</option>
      <option value="A">Assertive (A)</option>
      <option value="T">Turbulent (T)</option>
      </select>
      <button type="submit">Sign Up</button>
      <div className="signup-links">
        <Link to="/signin">Already have an account? Sign In</Link>
      </div>
    </form>
  </div>
);
}

export default SignUp;
