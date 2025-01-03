import React, { useState } from 'react'
import authservices from '../auth/authservices';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    
    const navigate = useNavigate();

    const [userItems, setUserItems] = useState({
        email: '',
        password: '',
        isAdmin: true,
    });

    const handleLogin = async() => {
        if (!validationssignup()) {
            return true;
        }
        try {
           await authservices.userLogin(userItems).then((res) => {
                console.log("login page", res);
                if (res.status) {
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('is_admin', res.is_admin);
                    if (!res.is_admin) {
                    localStorage.setItem('contact_number', res.data.contact_number);
                    localStorage.setItem('email', res.data.email);
                    localStorage.setItem('name', res.data.name);
                    }
                    alert(res.massage);
                    navigate('/');
                }else{
                    alert(res.massage);
                }
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const validationssignup = () => {
        
        if (userItems.email === '' || !validateEmail(userItems.email)) {
            alert('Email is required');
            return false;
        }else
        if (userItems.password === '') {
            alert('Password is required');
            return false;
        }
        
        return true;
    }

    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };


  return (
    <div>
        <div style={{display: 'flex', flexDirection : 'column', gap:'15px', justifyContent:'center', alignItems : 'flex-start' }}>
           
            <div style={{display: 'flex', flexDirection : 'column', alignItems : 'flex-start'}}>
                <label htmlFor="password">Email:</label>
                <input type="email" name="email" id="email" 
                value={userItems.email}
                onChange={(e) => setUserItems({...userItems, email: e.target.value})}

                />
            </div>
            <div style={{display: 'flex', flexDirection : 'column', alignItems : 'flex-start'}}>   
                <label htmlFor="password">password</label>
                <input type="password" name="password" id="password" 
                value={userItems.password}
                onChange={(e) => setUserItems({...userItems, password: e.target.value})}

                />
            </div>
            <div style={{display: 'flex', flexDirection : 'row', alignItems : 'flex-start', gap:'3'}}>   
                <input type="checkbox" name="checkbox" id="checkbox" 
                checked={userItems.isAdmin}
                   onChange={(e) => setUserItems({...userItems, isAdmin: e.target.checked})}
                />
                <label htmlFor="is_admin">is admin</label>
            </div>
        </div>
            <div onClick={handleLogin}>
                <button type="submit">Login</button>
            </div>
            <span style={{cursor:'pointer'}} onClick={() => navigate('/signup')}>new account create</span>
    </div>
  )
}

export default Login