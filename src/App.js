import './App.css';
import {createContext, useContext, useEffect, useState} from 'react';
import { API_URL } from './GlobalConstants';


const cartCtx = createContext();

const initial_Cart= [];

function App() {
  const [cart, setCart] = useState(initial_Cart);

  useEffect(()=>{
    fetch(`${API_URL}/cart`)
    .then((data) =>data.json())
    .then((latestCart) => setCart(latestCart))
  },[])

  const updateCart = ({mobile, action})=> {

    const entireCart=[];

    fetch(`${API_URL}/cart`, 
      {
        method:'PUT',
        body:JSON.stringify(mobile),
        headers:{"Content-Type": "application/json"},  
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
  const [cart, updateCart] = useContext(cartCtx);
  return(
    <div className="cart-container">
      <img src={mobile.img} alt={mobile.model} className='cart-image'/>
      <div>
        <h2 className='cart-name'>{mobile.model}</h2>
        <p className='cart-company'>{mobile.company}</p>
        
        <p className='cart-Quantity'><span>price: </span>{mobile.price}</p>
        <button>➖</button>  {mobile.qty}  <button onClick={()=> updateCart({mobile, action:'add'})}>➕</button>
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
