import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar'
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import About from "./components/About";
import Cart from "./components/Cart";
import ItemDetail from "./components/ItemDetail";
import Logo from "./asssets/Logo.png"



function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [items, setItems] = useState([]);
  const [currentCart, setCurrentCart] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const [currentItem, setCurrentItem] = useState({});
  const [cart, setCart] = useState([]);
  const [error, setError] = useState()
  
 
  const [quantity, setQuantity] = useState([]);


  useEffect(() => {
    async function fetchUser() {
      const response = await fetch('/users');
      const data = await response.json();
      setCurrentUser(data);
    }
    
    fetchUser();
  }, []);
  
  const setCurrentUser = (user) => {
    setUser(user);
    setLoggedIn(true);
    setCurrentCart(user.cart);
  }
  
  const logOut = () => {
    setUser({});
    setLoggedIn(false);
    setCurrentCart([]);
  }
  
  useEffect(() => {
    fetch("/items").then((response) => {
      if (response.ok) {
        response.json().then((items) => {
          setItems(items)
        })
      }
    });
  }, [])

  
  // console.log()

  useEffect(() => {
    fetch("/cart_items").then((response) => {
      if (response.ok) {
        response.json().then((cartItems) => {
          setCartItems(cartItems)
        })
      }
    });
  }, [])

  useEffect(() => {
    fetch("/carts").then((response) => {
      if (response.ok) {
        response.json().then((cart) => {
          setCart(cart)
        })
      }
    });
  }, [])

  // console.log(user[0]?.cart.cart_items)

  function handleAddToCart(id) {
    fetch(`/cart_items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        quantity: 1,
        cart_id: user[0]?.cart.id,
        item_id: id,

      }),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            handleCurrentCart(data);
            setCartItems(data)
          });
        } else {
          res.json().then((data) => setError(data.error));
        }
      })
      .catch((error) => {
        console.error(error);
        setError('Error adding item to cart');
      });
  }

  function handleCurrentCart(newCartItem){
    setCurrentCart([...cartItems, newCartItem])
  }

  const handleItemClick = (item) => {
    setCurrentItem(item);
  }

  function removeFromCart(id) {
    const cartItemId = cartItems.find(cartItem=>cartItem.item_id===id).id

    fetch(`http://localhost:3000/cart_items/${cartItemId}`, { 
      method: "DELETE"
    })
    .then(response =>{
      if(response.ok){
        setCartItems(prev=>prev.filter(cartItem=>cartItem.item_id!==id));
      }
    })

    .catch(error => console.log(error));
  }
  
  
  return (
    <div className="App">
     <div className="logo-container">
        <img className="Logo" src= {Logo}/>
      </div>
      <Navbar logOut={logOut} loggedIn={loggedIn} />
      <Routes>
        <Route exact path='/' element={<Home  handleAddToCart={handleAddToCart} handleCurrentCart={handleCurrentCart} user={user} items={items} />} />

        <Route exact path='/about' element={<About />} />

        <Route exact path='/login' element={loggedIn ? <Navigate to="/" /> : <Login setCurrentUser={setCurrentUser} />} />

        <Route exact path='/signup' element={loggedIn ? <Navigate to="/" /> : <Signup />} />

        <Route exact path='/carts' element={<Cart loggedIn={loggedIn} setCartItems={setCartItems} items={items} handleAddToCart={handleAddToCart} handleCurrentCart={handleCurrentCart}  currentCart={currentCart} user={user} cartItems={cartItems} removeFromCart={removeFromCart}/>} />

        <Route exact path='/item/:id' element={<ItemDetail item={items} currentItem={currentItem} addToCart={handleAddToCart} loggedIn={loggedIn} />} />
      </Routes>
    </div>
  );
}

export default App;
