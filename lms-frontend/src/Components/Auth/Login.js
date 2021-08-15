import React, { useState } from 'react'
import { useToasts } from 'react-toast-notifications';

import { login as loginUser } from '../../actions/auth';
import { useDispatch } from 'react-redux';

function Login() {
  const { addToast } = useToasts();
  const dispatch = useDispatch();

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ emailError, setEmailError ] = useState(false);
  const [ passwordError, setPasswordError ] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (email && password){
      const res = await dispatch(loginUser({ email, password }));
      if(res.status === 200){
        addToast('Logged in  Successfully', { appearance: 'success', autoDismiss: true, });
      } else {
        addToast('Login Error', { appearance: 'error', autoDismiss: true, });
      }
      setEmail('')
      setPassword('')
    } else {
      handleErrors();
    }
  }

  const handleErrors = () => {
    addToast('Please Enter the Details', { appearance: 'error', autoDismiss: true, });
    if (!password) {
      setPasswordError(true);
    }

    if (!email) {
      setEmailError(true);
    }
  };

  return (
    <div className="container">
      <form noValidate onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" placeholder="name@example.com"
            value={email} onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(false)
            }}
          />
           {emailError ? <div className="text-danger">Please enter your email.</div> : ''}
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={password}
            onChange={(e) => setPassword(e.target.value)} />
            {passwordError ? <div className="text-danger">Please enter your password.</div> : ''}
        </div>
        <button type="submit" className="btn btn-primary">Sign In</button>
      </form>
    </div>
  )
}

export default Login
