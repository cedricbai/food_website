import React from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { auth } from './firebase/firebase.utils';
import { ReactComponent as Logo } from './assets/crown.svg';
import CartIcon from './cart-icon.component.jsx';
import CartDropdown from './cart-dropdown.component.jsx';
import { selectCartHidden } from './redux/cart/cart.selectors';
import { selectCurrentUser } from './redux/user/user.selectors';
import './header.styles.scss';

const Header = ({currentUser, hidden}) => (
    <div className='header'>
       <Link className='logo-container' to="/">
           <Logo className='logo' />
       </Link>
       <div className='options'>
           <Link className='option' to='/shop'>
               SHOP
           </Link>
           {
               currentUser ?
               <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
               :
               <Link className='option' to='/signin'>
                   SIGN IN
               </Link>
           }
           <CartIcon />
       </div>
       {
            hidden ? null :
            <CartDropdown />
       }
    </div>
)
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);