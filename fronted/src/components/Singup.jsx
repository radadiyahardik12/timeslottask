import React, { useState } from 'react'
import authservices from '../auth/authservices';
import { useNavigate } from 'react-router-dom';

const Singup = () => {
    
    const navigate = useNavigate();

    const [userItems, setUserItems] = useState({
        name: '',
        email: '',
        password: '',
        rePassword: '',
        isAdmin: true,
        contact: ''
    });

    const handleSigneUp = async() => {
        if (!validationssignup()) {
            return true;
        }
        try {
           await authservices.SignUpUser(userItems).then((res) => {
                console.log("signup page", res);
                if (res.status) {
                    alert(res.massage);
                    navigate('/login');
                }else{
                    alert(res.massage);
                }
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const validationssignup = () => {
        if (userItems.name === '') {
            alert('Name is required');
            return false;
        }else if (userItems.email === '' || !validateEmail(userItems.email)) {
            alert('Email is required');
            return false;
        }else if (userItems.contact === '' && !userItems.isAdmin) {
            alert('contact is required');
            return false;
        }else if (userItems.password === '') {
            alert('Password is required');
            return false;
        }else if (userItems.password !== userItems.rePassword) {
            alert('Passwords do not match');
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

    console.log("userItems", userItems.isAdmin)

  return (
    <div>
        <div style={{display: 'flex', flexDirection : 'column', gap:'15px', justifyContent:'center', alignItems : 'flex-start' }}>
            <div style={{display: 'flex', flexDirection : 'column', alignItems : 'flex-start'}}>
                <label htmlFor="text">User Name:</label>
                <input type="text" name="text" id="text"
                value={userItems.name}
                onChange={(e) => setUserItems({...userItems, name: e.target.value})}
                />
            </div>
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
            <div style={{display: 'flex', flexDirection : 'column', alignItems : 'flex-start'}}>   
                <label htmlFor="re-password">re-password</label>
                <input type="password" name="re-password" id="re-password" 
                value={userItems.rePassword}
                onChange={(e) => setUserItems({...userItems, rePassword: e.target.value})}
                />
            </div>
            {
               userItems.isAdmin ? <></> : 
                    <div style={{display: 'flex', flexDirection : 'column', alignItems : 'flex-start'}}>
                        <label htmlFor="number">Contact</label>
                        <input type="number" name="number" id="number" 
                        value={userItems.contact}
                        onChange={(e) => setUserItems({...userItems, contact: e.target.value})}

                        />
                    </div>
            }
            <div style={{display: 'flex', flexDirection : 'row', alignItems : 'flex-start', gap:'3'}}>   
                <input type="checkbox" name="checkbox" id="checkbox" 
                checked={userItems.isAdmin}
                   onChange={(e) => setUserItems({...userItems, isAdmin: e.target.checked})}
                />
                <label htmlFor="is_admin">is admin</label>
            </div>
        </div>
            <div onClick={handleSigneUp}>
                <button type="submit">SignUP</button>
            </div>
            <span style={{cursor:'pointer'}} onClick={() => navigate('/login')}>already account created</span>
    </div>
  )
}

export default Singup