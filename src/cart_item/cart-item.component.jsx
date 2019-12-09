import React from 'react';

import './cart-item.styles.scss';

const CartItem = ({ item: { img_link, price, name, quantity } }) => (
  <div className='cart-item'>
    <img src={img_link} alt='item' />
    <div className='item-details'>
      <span className='name'>{name}</span>
      <span className='price'>
        {quantity} x ${price}
      </span>
    </div>
  </div>
);

export default CartItem;