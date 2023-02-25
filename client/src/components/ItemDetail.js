import React, {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';

function ItemDetail({ currentItem, item, addToCart, loggedIn }) {
  const [itemDetail, setItemDetail] = useState("");
  const {id} = useParams()

  useEffect(() => {
    fetch(`/items/${id}`).then((response) => {
      if (response.ok) {
        response.json().then((items) => {
          setItemDetail(items)
        })
      }
    });
  }, [id])
  
  console.log(itemDetail)
  
  const handleAddToCart = () => {
    if (loggedIn) {
      addToCart(item);
    } else {
      alert('Please log in or sign up to add to your cart!');
    }
  };


  return (
    <div className="show">
      <div className="detail-img-container">
        <img className="detail-img" src={itemDetail.image} alt={`${itemDetail.name} image`} />
      </div>
      <div className="detail-text-container">
        <h1 className="detail-name">{itemDetail.name}</h1>
        <h2 className="detail-cost">{`$${itemDetail.cost}`}</h2>
        <br />
        <p className="detail-description">{itemDetail.description}</p>
        <br />
        <button className="detail-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <br />
        <br />
        
      </div>
    </div>
  );
}

export default ItemDetail;
