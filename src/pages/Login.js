import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/loginCss.css';

function Login() {
  const [email, setEmail] = useState('');
  // console.log(email);
  const [password, setPassword] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);

  const handleDisabled = () => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = email.match(regexEmail);
    const MIN_LENGTH_VALUE = 6;
    const minPasswordValid = password.length >= MIN_LENGTH_VALUE;
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
  };

  // useEffect(() => {
  //   handleDisabled();
  // }, [email, password]);

  return (
    <main>
      <div className="logincss">
        <h2>Login</h2>
        <input
          data-testid="email-input"
          type="email"
          name="email"
          value={ email }
          placeholder="Digite seu email"
          onChange={ handleEmail }
        />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          value={ password }
          placeholder="Digite sua senha"
          onChange={ handlePassword }
        />
        <Link to="/foods">
          <button
            data-testid="login-submit-btn"
            type="submit"
            name="enterButton"
            onClick={ handleClick }
            disabled={ btnDisabled }
          >
            Enter
          </button>
        </Link>
      </div>
    </main>
  );
}

export default Login;
