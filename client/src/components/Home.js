import React, { Component } from 'react'
import ItemContainer from './ItemContainer'


function Home ({user,items, handleCurrentCart, setCurrentItem, handleAddToCart}){


    
        return (
            <div>
                <ItemContainer  handleAddToCart={handleAddToCart} setCurentItem={setCurrentItem} handleCurrentCart={handleCurrentCart}  user={user} items={items}/>
            </div>
        )
    
}

export default Home