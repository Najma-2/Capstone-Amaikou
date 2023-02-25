import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Cart from './Cart';


function ItemCard({ item, user, handleCurrentCart, handleAddToCart }) {
  const [redirect, setRedirect] = useState(false);

  const [currentItem, setCurrentItem] = useState({})
 
  


const handleItemClick = (item) => {
  setCurrentItem(item);
}




  // const handleAddToCart = async () => {
  //   const response = await axios.post('/cart_items', {
  //     user_id: user?.id,
  //     item_id: item.id,
  //     cart_id: user.id,
  //     quantity,
  //   });
  //   handleCurrentCart(response.data)
  // };

  // function CurrentItem(item, setCurrentItem) {
  //   setCurrentItem(item);
  // }


  const handleClick = () => {
    setCurrentItem(item)
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={`item/${item.id}`} />;
  }

  return (
    <div className="card">
      <div onClick={handleClick}>
        <img src={item.image} alt={`${item.name} image`} className="item-image" />
        <br /><br />
        <h2 className="item-name">{item.name}</h2>
        <br />
        <h3>{`$${item.cost}`}</h3>
        <br/>
      </div>
      <button className="item-button" onClick={() => handleAddToCart(item.id)}>Add to Cart</button>
    </div>
  );
}

export default ItemCard;
