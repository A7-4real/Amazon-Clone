import React from 'react';
import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { BrowserRouter as Router, Switch, Route, Link }
  from 'react-router-dom'
import { useStateValue } from './StateProvider';
import { ShoppingBasket } from '@material-ui/icons';
import { auth } from './firebase';

function Header() {
    const [{basket, user}, dispatch] = useStateValue();

    const handleAuthenticaton = () => {
        if(user) {
            auth.signOut();
        }
    }


    return (
        <div className='header'>
            <Link to='/Home'>
                <img className='header_logo'
                    src='https://www.pinclipart.com/picdir/big/358-3584545_amazon-web-services-logo-png-transparent-svg-vector.png' alt='logo' />
            </Link>
            <div className='header_search'>
                <input
                    className='header_searchInput'
                    type='text' />

                <SearchIcon
                    className='header_searchIcon' />

            </div>

            <div className='header_nav'>
                <Link to={!user && '/login'}>
                <div onClick={handleAuthenticaton}className='header_option'>
                    <span className='header_optionLineOne'>Hello {!user ? 'Guest' : user.email}</span>
                    <span className='header_optionLineTwo'>{user ? 'Sign Out' : 'Sign In'}</span>
                </div>
                </Link>

                <div className='header_option'>
                    <span className='header_optionLineOne'>Return</span>
                    <span className='header_optionLineTwo'>& Orders</span>
                </div>

                <div className='header_option'>
                    <span className='header_optionLineOne'>Your</span>
                    <span className='header_optionLineTwo'>Prime</span>
                </div>


                <Link to='/checkout'>
                <div className='header_optionBasket'>
                    <ShoppingCartIcon />
                    <span className='header_optionLlineTwo header_basketCount'>{basket?.length}</span>
                </div>
                </Link>
            </div>
        </div>


    )
}

export default Header