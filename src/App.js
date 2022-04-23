import './App.css';
import {createContext, useContext, useEffect, useState} from 'react';
import { API_URL } from './GlobalConstants';
import { Navbar } from './Navbar';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'



const cartCtx = createContext();

const currencyFormatter = (number)=> new Intl.NumberFormat('en-IN', {style: "currency", currency:'INR'}).format(number);

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

    fetch(`${API_URL}/cart?type=${action}`, 
      {
        method:'PUT',
        body:JSON.stringify(mobile),
        headers:{"Content-Type": "application/json"},  
      })
      .then((data) =>data.json())
      .then((latestCart) => setCart(latestCart))
    }

    const totalQty = cart.map((item) => item.qty).reduce((sum, qty) => sum + qty, 0)
  return(
    <div className='App'>
        <cartCtx.Provider value={[cart, updateCart, setCart]} >
          <Navbar totalQty={totalQty}/>
           
            
        </cartCtx.Provider>
    </div>
  );

  
}







export function PhoneList(){
  const [mobiles, setMobiles]= useState([]);

  const getMobiles = () =>{
    fetch(`${API_URL}/mobilelist`)
    .then((data) => data.json())
    .then((mbs)=> setMobiles(mbs))
  }
  useEffect(getMobiles,[])

  const deleteMobile = (id) =>{
    fetch(`${API_URL}/mobilelist/${id}`,{ method:"DELETE" })
    .then(() => getMobiles());
  }
 
  return (
    <div className="phone-list-container">
      {mobiles.map((mobile)=> <Phone key={mobile._id} mobile={mobile} deleteMobile={deleteMobile}/>)}
     
    </div>
    
  );
}

function Phone({mobile, deleteMobile}){
  const [cart, updateCart] = useContext(cartCtx);
  const navigate = useNavigate();
  return(
    <div className="phone-container" >
      <img src={mobile.img} alt={mobile.model} className='phone-image' onClick={()=>navigate(`/phonedetails/${mobile._id}`)}/>
      <h2 className='phone-name'>{mobile.model}</h2>
      <p className='phone-company'>{mobile.company}</p>
      <h2 className='phone-price'>{currencyFormatter(mobile.price)}</h2>
      <button className='phone-cart' onClick={()=> updateCart({mobile, action:'increment'})}>Add to Cart</button>
     
              <IconButton 
                onClick={() =>deleteMobile(mobile._id)}
                  className="movie-show-button"
                  aria-label="delete" 
                  color="error">
                    <DeleteIcon />
                </IconButton>
            
             
              <IconButton 
                onClick={() =>{ navigate("/editmobile/edit/" + mobile._id)
                 
                }} 
                style={{ marginLeft:"auto" }}
                className="movie-show-button"
                  aria-label="delete" 
                  color="primary">
                    <EditIcon />
                </IconButton>
            
    </div>
  );
}



export function Cart(){
  const [cart, updateCart, setCart] = useContext(cartCtx);
        const navigate = useNavigate();

  useEffect(()=>{
    fetch(`${API_URL}/cart`)
    .then((data) =>data.json())
    .then((latestCart) => setCart(latestCart))
  },[])

  const total = cart.map((item) => item.qty * item.price).reduce((sum, item) => sum + item, 0)
  
  const CheckOut = ()=> {

   

    fetch(`${API_URL}/checkout`, 
      {
        method:'POST',
        body:JSON.stringify(cart),
        headers:{"Content-Type": "application/json"},  
      })
      .then((data) =>data.json())
      .then((latestCart) => setCart(latestCart))
      .then(()=>window.alert("order Placed"))
      .then(()=>navigate('/'))
        }


  

  return(
    <section className='cart-list'>
      <h2>Purchase item</h2>
       <div className="phone-list-container">
      {cart.map((mobile)=> <CartItem key={mobile._id} mobile={mobile}/>)}
      
    </div>
    <div className='cart-checkout'>
      <h1>{currencyFormatter(total)}</h1>
      <button onClick={()=>CheckOut()}>✔ checkout</button></div>
    
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
        
        <p className='cart-Quantity'><span>price:</span>{currencyFormatter(mobile.price)}</p>
        
        <button onClick={()=> updateCart({mobile, action:'decrement'})}>➖</button>  {mobile.qty}  <button onClick={()=> updateCart({mobile, action:'increment'})}>➕</button>
      </div>
      <p className='cart-Total'><span>Subtotal:</span>{currencyFormatter(mobile.price * mobile.qty)  }</p>
      
    </div>
  );
}

export default App;
