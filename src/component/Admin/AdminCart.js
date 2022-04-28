import { API_URL } from '../../GlobalConstants';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useContext } from "react";
import { cartCtx, currencyFormatter } from '../../App';
import { AdminCartItem } from "./AdminCartItem";
import { Navbar } from './Navbar';







export function AdminCart() {
  const [usercart,admincart, updateCart, setUserCart,setAdminCart,usertotalQty,admintotalQty] = useContext(cartCtx);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/cart/admin`)
      .then((data) => data.json())
      .then((latestCart) => setAdminCart(latestCart));
  }, []);

  const total = admincart.map((item) => item.qty * item.price).reduce((sum, item) => sum + item, 0);

  const CheckOut = () => {



    fetch(`${API_URL}/admin/checkout`,
      {
        method: 'POST',
        body: JSON.stringify(admincart),
        headers: { "Content-Type": "application/json" },
      })
      .then((data) => data.json())
      .then((latestCart) => setAdminCart(latestCart))
      .then(() => window.alert("order Placed"))
      .then(() => navigate('/admin/product'));
  };


  

  return (
    <section className='cart-list'>
      <Navbar/>
      <h2>Purchase item</h2>
      <div className="phone-list-container">
        {admincart.map((mobile) => <AdminCartItem key={mobile._id} mobile={mobile} />)}

      </div>
      <div className='cart-checkout'>
        <h1>{currencyFormatter(total)}</h1>
        <button onClick={() => CheckOut()}>✔ checkout</button></div>

    </section>

  );
}
