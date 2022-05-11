import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../Styles/loginCss.css';

function Login() {
  const [email, setEmail] = useState('');
  const history = useHistory();
  // console.log(email);
  const [password, setPassword] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);

  const handleDisabled = () => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = email.match(regexEmail);
    const MIN_LENGTH_VALUE = 6;
    const minPasswordValid = password.length > MIN_LENGTH_VALUE;
    if (isEmailValid && minPasswordValid) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  };

  const handleEmail = ({ target }) => {
    setEmail(target.value);
    handleDisabled();
  };

  const handlePassword = ({ target }) => {
    setPassword(target.value);
    handleDisabled();
  };

  const getLocalStorage = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    const loginEmail = { email };
    localStorage.setItem('user', JSON.stringify(loginEmail));
  };

  const handleClick = () => {
    handleDisabled();
    getLocalStorage();
    history.push('/foods');
  };

  return (
    <main className="login-container">
      <div className="title-container">
        <h1>Recipes App</h1>
      </div>
      <div className="form-container">
        <input
          data-testid="email-input"
          type="email"
          name="email"
          value={ email }
          placeholder="E-mail"
          onChange={ handleEmail }
        />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          value={ password }
          placeholder="Password"
          onChange={ handlePassword }
        />
        <button
          data-testid="login-submit-btn"
          type="submit"
          name="enterButton"
          className="login-button"
          onClick={ handleClick }
          disabled={ btnDisabled }
        >
          Enter
        </button>
      </div>
    </main>
  );
}

export default Login;
