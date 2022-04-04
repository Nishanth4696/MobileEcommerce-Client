import './App.css';
import {createContext, useEffect, useState} from 'react';


const cartCtx = createContext()

function App() {
  // const [cart, setCart] = useState([]);

  // const updateCart = ()=> {
  //     fetch(`${API}/cart`, 
  //     {
  //       method:'POST',
  //       body:JSON.stringify(entireCart),
  //       headers:{contentType:'application/json'},  
  //     })
  //     .then((data) =>data.json())
  //     .then((latestCart) => setCart(latestCart))
  //   }
  return(
    <div className='App'>
        <cartCtx >
            <PhoneList />
        </cartCtx>
    </div>
  );

  
}



function PhoneList(){
  const [mobiles, setMobiles]= useState([]);

  useEffect(()=> {
    fetch('http://localhost:9000/mobile')
    .then((data) => data.json())
    .then((mbs)=> setMobiles(mbs))
  },[])
 
  return (
    <div className="phone-list-container">
      {mobiles.map((mobile)=> <Phone mobile={mobile}/>)}
      
    </div>
  );
}

function Phone({mobile}){
  
  return(
    <div className="phone-container">
      <img src={mobile.img} alt={mobile.model} className='phone-image'/>
      <h2 className='phone-name'>{mobile.model}</h2>
      <p className='phone-company'>{mobile.company}</p>
      <button className='phone-cart'>Add to Cart</button>
    </div>
  );
}

export default App;
