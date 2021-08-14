import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router';

import { getUser, register as registerUser } from '../../actions/auth';

export default function Register() {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const history = useHistory();

  useEffect(()=>{
    dispatch(getUser())
  },[dispatch])

  const admin = useSelector((state) => state.auth.user);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    contactNo: '',
    role: '',
  });

  let options =  [
      { value: 'admin', label: 'Admin' },
      { value: 'lecture', label: 'Lecture' },
      { value: 'labInstructor', label: 'Lab Instructor' },
      { value: 'student', label: 'Student' },
    ];



  const [rePassword, setRePassword] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [contactNoError, setContactNoError] = useState(false);
  const [roleError, setRoleError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.name && user.email && user.password && user.contactNo && user.role && user.password === rePassword) {
      const res = await dispatch(registerUser({ ...user }));
      if(res.status === 200){
        addToast('Registered Successfully', { appearance: 'success', autoDismiss: true, });
        history.push('/login')
      } else if(res.response.status === 409){
        addToast('User already exits. Please Login', { appearance: 'error', autoDismiss: true, });
      } else {
        addToast('Register Error', { appearance: 'error', autoDismiss: true, });
      }
      setUser({
        name: '',
        email: '',
        password: '',
        contactNo: '',
        role: '',
      })
    } else {
      handleErrors();
    }
  };

  const handleErrors = () => {
    if (!user.password || user.password !== rePassword) {
      setPasswordError(true);
    }
    if (!user.name) {
      setNameError(true);
    }
    if (!user.email) {
      setEmailError(true);
    }
    if (!user.contactNo) {
      setContactNoError(true);
    }
    if (!user.role) {
      setRoleError(true);
    }
  };

  return (
    <div className="container">
      <div className="rounded border p-5 bg-light w-75 d-flex flex-column mx-auto" style={{ marginTop: 25 }}>
        <div className="card-body">
          <h2 className="card-title">Register { admin ? 'a System User' : ''}</h2>
          <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={user.name}
                placeholder="Name"
                required
                onChange={(e) => {
                  setUser({ ...user, name: e.target.value });
                  setNameError(false);
                }}
              />
              {nameError ? <div className="text-danger">Please enter your name.</div> : ''}
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                required
                placeholder="user@sliit.lk"
                value={user.email}
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                  setEmailError(false);
                }}
              />
              {emailError ? <div className="text-danger">Please enter your email.</div> : ''}
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                required
                value={user.password}
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                  setPasswordError(false);
                }}
              />
              {passwordError ? <div className="text-danger">Please enter your password.</div> : ''}
            </div>
            <div className="col-md-6">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                required
                value={rePassword}
                onChange={(e) => {
                  setRePassword(e.target.value);
                  setPasswordError(false);
                }}
              />
              {passwordError ? <div className="text-danger">Please confirm your password.</div> : ''}
            </div>
            <div className="col-md-6">
              <label className="form-label">Contact Number</label>
              <input
                type="tel"
                className="form-control"
                required
                placeholder="771234567"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                value={user.contactNo}
                onChange={(e) => {
                  setUser({ ...user, contactNo: e.target.value });
                  setContactNoError(false);
                }}
              />
              {contactNoError ? <div className="text-danger">Please enter your contact Number.</div> : ''}
            </div>
            <div className="col-md-6">
              <label className="form-label">Register As</label>
              <Select
                options={options}
                onChange={(e) => {
                  setUser({ ...user, role: e.value });
                  setRoleError(false);
                }}
              />
              {roleError ? <div className="text-danger">Please enter your registration type.</div> : ''}
            </div>
            <button type="submit" className="btn btn-outline-primary col-md-4 mx-auto">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}