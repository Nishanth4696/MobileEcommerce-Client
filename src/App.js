import './App.css';
import {createContext, useContext, useEffect, useState} from 'react';
import { API_URL } from './GlobalConstants';


const cartCtx = createContext();

const initial_Cart= [
  {
    "_id":"624ab2606128df35980277ad",
    "model":"OnePlus 9 5G",
    "img":"https://m.media-amazon.com/images/I/61fy+u9uqPL._SX679_.jpg",
    "company":"Oneplus",
    "qty":2
  },
  {
    "_id":"624ab2606128df35980277ae",
    "model":"Iphone 13 mini",
    "img":"https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-mini-blue-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1645572315986",
    "company":"Apple",
    "qty":4
  }
];

function App() {
  const [cart, setCart] = useState(initial_Cart);

  const updateCart = ({mobile, action})=> {

    const entireCart=[];

    if(action ==='add'){
      const updateItem = cart.find(item => item._id === mobile._id)
      if(updateItem){

      }
      else{
        setCart([...cart, {...mobile, qty:1}]);
      }
    }
      fetch(`${API_URL}/cart`, 
      {
        method:'POST',
        body:JSON.stringify(entireCart),
        headers:{contentType:'application/json'},  
      })
      .then((data) =>data.json())
      .then((latestCart) => setCart(latestCart))
    }
  return(
    <div className='App'>
        <cartCtx.Provider value={[cart, updateCart]} >
            <PhoneList />
            <Cart />
        </cartCtx.Provider>
    </div>
  );

  
}

function Cart(){
  const [cart, updateCart] = useContext(cartCtx);
  return(
    <section className='cart-list'>
      <h2>Purchase item</h2>
       <div className="phone-list-container">
      {cart.map((mobile)=> <CartItem key={mobile._id} mobile={mobile}/>)}
      
    </div>
    <div className='cart-checkout'><button>✔ checkout</button></div>
    
    </section>
   
  );
}

function CartItem({mobile}){
  
  return(
    <div className="cart-container">
      <img src={mobile.img} alt={mobile.model} className='cart-image'/>
      <div>
        <h2 className='cart-name'>{mobile.model}</h2>
        <p className='cart-company'>{mobile.company}</p>
        <p className='cart-Quantity'><span>Quantity: </span>{mobile.qty}</p>
      </div>
      
    </div>
  );
}





function PhoneList(){
  const [mobiles, setMobiles]= useState([]);

  useEffect(()=> {
    fetch(`${API_URL}/mobile`)
    .then((data) => data.json())
    .then((mbs)=> setMobiles(mbs))
  },[])
 
  return (
    <div className="phone-list-container">
      {mobiles.map((mobile)=> <Phone key={mobile._id} mobile={mobile}/>)}
      
    </div>
  );
}

function Phone({mobile}){
  const [cart, updateCart] = useContext(cartCtx);
  return(
    <div className="phone-container">
      <img src={mobile.img} alt={mobile.model} className='phone-image'/>
      <h2 className='phone-name'>{mobile.model}</h2>
      <p className='phone-company'>{mobile.company}</p>
      <button className='phone-cart' onClick={()=> updateCart({mobile, action:'add'})}>Add to Cart</button>
    </div>
  );
}

export default App;
