import { API_URL } from '../../GlobalConstants';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useContext } from "react";
import { cartCtx, currencyFormatter } from '../../App';
import { UserCartItem } from "./UserCartItem";
import { Navbar } from '../User/Navbar';







export function UserCart() {
  const [usercart,admincart, updateCart, setUserCart,setAdminCart,usertotalQty,admintotalQty] = useContext(cartCtx);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/cart/user`)
      .then((data) => data.json())
      .then((latestCart) => setUserCart(latestCart));
  }, []);

  const total = usercart.map((item) => item.qty * item.price).reduce((sum, item) => sum + item, 0);

  const CheckOut = () => {



    fetch(`${API_URL}/user/checkout`,
      {
        method: 'POST',
        body: JSON.stringify(usercart),
        headers: { "Content-Type": "application/json" },
      })
      .then((data) => data.json())
      .then((latestCart) => setUserCart(latestCart))
      .then(() => window.alert("order Placed"))
      .then(() => navigate('/user/product'));
  };


  

  return (
    <section className='cart-list'>
      <Navbar/>
      <h2>Purchase item</h2>
      <div className="phone-list-container">
        {usercart.map((mobile) => <UserCartItem key={mobile._id} mobile={mobile} />)}

      </div>
      <div className='cart-checkout'>
        <h1>{currencyFormatter(total)}</h1>
        <button onClick={() => CheckOut()}>✔ checkout</button></div>

    </section>

  );
}
