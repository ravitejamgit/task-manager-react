import React, { useState, useEffect } from 'react';
import {
  signUpUser,
  loginUser,
  setUserLoggedIn,
} from '../Utils/LocalStorageHelpers';
import { useNavigate } from 'react-router-dom';
import { Alert } from '../Components/Alert';

export default function Login({setAlertMessage}) {
  // Forms
  const loginFormEmpty = {
    userName: '',
    password: '',
  };

  const signUpFormEmpty = {
    id: '',
    name: '',
    userName: '',
    email: '',
    password: '',
  };

  // State for forms
  const [loginForm, setLoginForm] = useState(() => loginFormEmpty);
  const [signUpForm, setSignUpForm] = useState(() => signUpFormEmpty);
  const [loginFormData, setLoginFormData] = useState(() => loginForm);
  const [signUpFormData, setSignUpFormData] = useState(() => signUpForm);
  const [view, setView] = useState('login');
  const [showAlert, setShowAlert] = useState('');

  let navigate = useNavigate();

  // Login Handlers
  const loginHandler = (event) => {
    var key = event.currentTarget.name;
    var val = event.currentTarget.value;
    setLoginForm((previous) => ({
      ...previous,
      [key]: val,
    }));
  };

  const signUpHandler = (event) => {
    var key = event.currentTarget.name;
    var val = event.currentTarget.value;

    setSignUpForm((previous) => ({
      ...previous,
      [key]: val,
    }));
  };

  const handleSetView = (view) => {
    setSignUpForm(signUpFormEmpty);
    setLoginForm(loginFormEmpty);
    setView(view);
  };

  const login = (event) => {
    if (event.currentTarget.name === 'login') {
      if (loginForm.userName === '') {
        setAlertMessage({
          message: 'Please enter username!!!',
          type: 'warning'
        })
        return;
      }
      if (loginForm.password === '') {
        setAlertMessage({
          message: 'Please enter password!!!',
          type: 'warning'
        })
        return;
      }
      var user = loginUser(loginForm);
      if (user) {
        setUserLoggedIn(user);
        setLoginForm(loginFormEmpty);
        setAlertMessage({
          message: 'Welcome, ' + user.name,
          type: 'success'
        });
        navigate('/dashboard');
      } else {
        setAlertMessage({
          message: 'Invalid Creadentials',
          type: 'error'
        });
        setLoginForm(loginFormEmpty);
      }
      return;
    } else if (event.currentTarget.name === 'clear') {
      setLoginForm(loginFormEmpty);
    }
  };

  const signUp = (event) => {
    if (event.currentTarget.name === 'signUp') {
      if (signUpForm.userName === '') {
        setAlertMessage({
          message: `Username can't be empty!!`,
          type: 'warning'
        })
        return;
      }
      if (signUpForm.name === '') {
        setAlertMessage({
          message: `Name can't be empty!!`,
          type: 'warning'
        })
        return;
      }
      if (signUpForm.email === '') {
        setAlertMessage({
          message: `Email can't be empty!!`,
          type: 'warning'
        })
        return;
      }
      if (signUpForm.password === '') {
        setAlertMessage({
          message: `Password can't be empty!!`,
          type: 'warning'
        })
        return;
      }

      signUpForm.id = Date.now();
      signUpUser(signUpForm);
      setAlertMessage({
          message: `Signup successfull...`,
          type: 'success'
        })
      setSignUpForm(signUpFormEmpty);
      setView('login');
      return;
    } else if (event.currentTarget.name === 'clear') {
      setSignUpForm(signUpFormEmpty);
    }
  };

  if (view === 'signUp') {
    return (
      <div className="signUpBody">
        <div className="signUpContainer">
          <div className="signUpHeaderSection">
            <h3>Sign up </h3>
          </div>
          <div className="signUpInputSection">
            <input
              type="text"
              name="name"
              onChange={signUpHandler}
              value={signUpForm.name}
              placeholder="Name"
            />
            <input
              type="text"
              name="userName"
              onChange={signUpHandler}
              value={signUpForm.userName}
              placeholder="User Name"
            />
            <input
              type="email"
              name="email"
              onChange={signUpHandler}
              value={signUpForm.email}
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              onChange={signUpHandler}
              value={signUpForm.password}
              placeholder="Password"
            />
          </div>
          <div className="signUpButtonSection">
            <button name="signUp" onClick={signUp}>
              Sign Up
            </button>
            {/* <button name="clear" onClick={signUp}>
              Clear
            </button> */}
          </div>
          <div className="signUpLinksSection">
            <button onClick={() => handleSetView('login')}>Login</button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="loginBody">
        <div className="loginContainer">
          <div className="loginHeaderSection">
            <h3>Login </h3>
          </div>
          <div className="loginInputSection">
            <input
              type="text"
              name="userName"
              onChange={loginHandler}
              value={loginForm.userName}
              placeholder="User name"
            />
            <input
              type="password"
              name="password"
              onChange={loginHandler}
              value={loginForm.password}
              placeholder="Password"
            />
          </div>
          <div className="loginButtonSection">
            <button name="login" onClick={login}>
              Login
            </button>
            {/* <button name="clear" onClick={login}>
              Clear
            </button> */}
          </div>
          <div className="loginLinksSection">
            <button onClick={() => handleSetView('signUp')}>
              New User, Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }
}
