import React, { useState,useEffect } from 'react';
import { setSession, getSession } from "../helper/session";
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (getSession()) navigate('/auth');
  }, [])

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    fetch("http://localhost:5000/user/auth", options)
      .then(response => { return response.json() })
      .then((data) => {
        setSession(data);
        navigate('/');
      })
      .catch(err => {
        console.log(err);
      })

  };

  return (
    <div className="flex flex-col place-items-center py-[100px]">
      <div className="flex flex-col shadow rounded px-4 py-2">
        <form onSubmit={handleSubmit} className='flex gap-4 flex-col'>
          <div className="flex justify-between place-items-center">
            <p className='text-3xl'>Log In</p>
            <a type="button" className="text-green-700 hover:underline" href='/register'>Register</a>
          </div>
          <div className='flex gap-2 justify-between'>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
              className='border rounded'
            />
          </div>
          <div className='flex gap-2 justify-between' >
            <label htmlFor="password" >Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
              className='border rounded'
            />
          </div>
          <button type="submit" className='bg-green-700 text-white px-2 py-1  rounded shadow hover:bg-green-800'>Log In</button>
        </form>
      </div>
    </div>

  );
};

export default LoginForm;
