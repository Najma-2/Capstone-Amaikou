import React from 'react';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';

const Cart = ({items, cartItems, currentCart, user, updateQuantity, removeFromCart, setCartItems, loggedIn}) => {

  const nav = useNavigate();
  
  const tally = {};

  cartItems.map(item=>{

    tally[item.item_id] = (tally[item.item_id] || 0) + item.quantity

  })

  const talliedItems = Object.keys(tally).map(key=>
    
    items.find( item=> item.id === parseInt(key) )
    
  )

  const calculateTotal = () => {
    let newTotal = 0;

    Object.keys(tally).map(key=>{
      const itemFromCart = talliedItems.find(item=> item?.id === parseInt(key));
      const itemQuantity = tally[key];
      const subTotal = parseFloat(itemFromCart?.cost) * itemQuantity;
      newTotal += subTotal;
    });
    
    newTotal = (Math.round(newTotal * 100) / 100).toFixed(2);
    return newTotal;
  };

  const cartCards = Object.keys(tally).map(key=>{

    const itemFromCart = talliedItems.find(item=> item?.id === parseInt(key));
    
    return<CartItem
      key={itemFromCart?.id}

      item = {itemFromCart}
      quantity = {tally[key]}
      
      setCartItems={setCartItems}
      removeFromCart={removeFromCart}

    />}

  );


  const clearCart=()=>{
    fetch(`/carts/${cartItems[0]?.cart_id}`,{
      method:"DELETE"
    })
    .then(()=>{
        setCartItems([])
        nav("/")
    })
  }


  return (
    <div className="cart-container">
      
      <h1 className="cart-title">{loggedIn? "" : "Login To View "}Your Shopping Cart</h1>
      
      {cartCards}
      
      {loggedIn ?
        <>
          <h2 className="cart-total">Total: ${calculateTotal()}</h2>
          <button className="clear-button" onClick={() => clearCart()}>Checkout Cart</button>
        </>
        :
        <></>
      }
    </div>
  );
};

export default Cart;
