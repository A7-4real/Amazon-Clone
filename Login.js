import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth } from './firebase';
import './Login.css'

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 

    const signIn = e => {
        e.preventDefault();

        auth 
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                history.push('/home')
            })
            .catch(error => alert(error.message))

        // some fancy firebase login shitt....!
    }

    const register = e => {
        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth)=> {
                console.log(auth);
                if (auth) {
                    history.push('/home')
                }
            })
            .catch(error => alert(error.message))

        //do some firebase register shitt.......
    }

    return (
        <div className='login'>
            <Link to='/home'>
                <img 
                    className='login__logo'
                    src='https://www.freepnglogos.com/uploads/amazon-png-logo-vector/amazon-png-logo-vector-1.png'/>
            </Link>

            <div className='login__container'>
                <h1>Sign-in</h1>

                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)}/>

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button className='login__signInButton' onClick={signIn} type='submit'>Sign In</button>
                </form>

                <p>
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Intrest-Based Ads Notice.
                </p>
                
                <button  className='login__registerButton' type='submit' onClick={register}>Create your Amazon Account</button>
            </div>
        </div>
    )
}

export default Login
