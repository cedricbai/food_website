import React from 'react';
import { connect } from 'react-redux';
import CheckoutItem from '../checkout-item/checkout-item.component.jsx';
import StripeCheckoutButton from '../stripe-button/stripe-button.component';
import {createStructuredSelector} from 'reselect';
import { selectCartItems, selectCartTotal } from '../redux/cart/cart.selectors';
import './checkout.styles.scss';

const CheckoutPage = ({cartItems, total}) => (
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='checkout-block'>
                <span>Product</span>
            </div>
            <div className='checkout-block'>
                <span>Description</span>
            </div>
            <div className='checkout-block'>
                <span>Quantity</span>
            </div>
            <div className='checkout-block'>
                <span>Price</span>
            </div>
            <div className='checkout-block'>
                <span>Remove</span>
            </div>
        </div>
        {cartItems.map(cartItem => (
          <CheckoutItem key={cartItem.id} cartItem={cartItem} />
        ))}
        <div className='total'>
            <span>
                TOTAL: ${total}
            </span>
        </div>
        <div className='test-warning'>
      *Please use the following test credit card for payments*
      <br />
      4241 4241 4241 4241 - Exp: 04/21 - CVV: 123
    </div>
    <StripeCheckoutButton price={total} />
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);