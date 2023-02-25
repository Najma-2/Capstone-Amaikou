import React, { Component } from 'react';
import ItemCard from './ItemCard'

function ItemContainer({user, items, setCurrentItem, loggedIn,addToCart, handleCurrentCart, handleAddToCart }){

    return(
    
        <div className="item-area">
            {items?.map((item) => <ItemCard handleAddToCart={handleAddToCart} handleCurrentCart={handleCurrentCart} user={user} setCurrentItem={setCurrentItem} loggedIn={loggedIn} addToCart={addToCart}  item={item}/>)}
        </div>
    )  
    
}

export default ItemContainer