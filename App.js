

import './App.css';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Checkout from './Checkout';
import Payment from './Payment';
import React, {useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route }
  from 'react-router-dom';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import Orders from './Orders';

const promise = loadStripe("pk_test_51IBlTdG6q5kCOsQFaCYRPG7E8whoyUfbDihCCnsPYdHGBXct7pVCDVoaxumU0Pok1iRtjlLlfW3v0oyFiUt7v8r9006P4vGtG5");

function App() {
  const [{basket}, dispatch] = useStateValue();
  
  useEffect(() => {
    // will only run once when the app component loads...
    auth.onAuthStateChanged(authUser => {
      console.log('The user is >>> ', authUser);

      if (authUser) {
        // the user just logged in / the user was logged in before
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
         //the user is logged out
         dispatch({
           type: 'SET_USER',
           user: null
         })
      }
    })

  }, [])

  return (
    // BEM case convention
    <Router>
      <div className="app">
        <switch>
        <Route path='/orders'>
            <Header />
            <Orders />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/checkout'>  
            <Header />         
            <Checkout />
          </Route>
          <Route path='/Home'>
            <Header />
            <Home />
          </Route>
          <Route path='/payment'>
            <Header />         
            <Elements stripe={promise}><Payment /></Elements>
          </Route>
        </switch>
      </div>
    </Router>
  );
}

export default App;
