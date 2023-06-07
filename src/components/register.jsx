import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFirstname = (e) => {
    setFirstname(e.target.value);
  };

  const handleLastname = (e) => {
    setLastname(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const data = {
      firstname:firstname,
      lastname:lastname,
      email:email,
      password:password
    }

    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    fetch("http://localhost:5000/user/register",options).then(response => { return response.json() })
    .then(response => {
      navigate('/auth');
    })
    .catch(err => {

      console.log(err);
    })
 
  };

  return (
    <div className="flex flex-col place-items-center py-[100px]">
      <div className="flex flex-col shadow rounded px-4 py-2">
        <form onSubmit={handleRegister} className='flex gap-4 flex-col'>
          <div className="flex justify-between place-items-center">
            <p className='text-3xl'>Register</p>
            <a type="button" className="text-green-700 hover:underline" href='/auth'>Log In</a>
          </div>
          <div className='flex gap-2 justify-between'>
            <label htmlFor="firstname">First Name:</label>
            <input
              type="text"
              id="firstname"
              value={firstname}
              onChange={handleFirstname}
              required
              className='border rounded'
            />
          </div>
          <div className='flex gap-2 justify-between'>
            <label htmlFor="lastname">Last Name:</label>
            <input
              type="lastname"
              id="lastname"
              value={lastname}
              onChange={handleLastname}
              required
              className='border rounded'
            />
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
          <button type="submit" className='bg-green-700 text-white px-2 py-1  rounded shadow hover:bg-green-800'>Register</button>
        </form>
      </div>
    </div>

  );
};

export default RegisterForm;
