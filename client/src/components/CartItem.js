import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
function CartItem({ item, quantity, setCartItems, user, removeFromCart }) {
  const [newQuantity, setNewQuantity] = useState(item?.quantity);
  
  const handleClick = (e) => {
    e.preventDefault();

    fetch(`/cart_items`,{
      method:"PATCH",
      headers: { 'Content-Type': 'application/json' },

      body:JSON.stringify({
        item_id: item.id,
        quantity: newQuantity
      })

    })
    .then(response=>{

      if(response.ok){

        response.json()
        .then(data=>{
          setCartItems(data)
        })

      }
    })
  }

  const handleChange = (e) => {
    setNewQuantity( parseInt( e.target.value ) )
  }


  return (
    <div className="cart-card" >
      <img className="cart-link item-image" onClick={handleClick} src={item?.image} alt={item?.name} />
      <h2 className="cart-link cart-item-name" onClick={handleClick}>{item?.name}</h2>
      <h3 className="cart-cost">$ {item?.cost} </h3>
      <h4 className="cart-quantity">Quantity:{quantity}
        <form onSubmit={handleClick}>
          <div>
            <input className="update-cart-field" onChange={handleChange} type="number" id="quantity" name="quantity" min="1" max="100" step="1" value={newQuantity} />
          </div>
          <div>
            <input className="update-cart-quantity" type="submit" value="Update Quantity" />
          </div>
        </form>
      </h4>
      <button className="item-button" onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
    </div>
  );
}

export default CartItem;

