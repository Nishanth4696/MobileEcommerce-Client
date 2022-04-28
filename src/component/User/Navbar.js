import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { useNavigate} from "react-router-dom"
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Button } from '@mui/material';
import { useContext } from "react";
import { cartCtx} from '../../App';
import { Link } from 'react-router-dom';





export function Navbar(){
  const [usercart,admincart, updateCart, setUserCart,setAdminCart,usertotalQty,admintotalQty] = useContext(cartCtx);
    const navigate = useNavigate();

    return(
        <div>
        <AppBar  style={{padding:'0px', position:'sticky'}}>
         <Toolbar>
               
                <Button  style={{color:"white"}} onClick={()=>navigate('/user')}>Home</Button>
                <Button  style={{color:"white"}} onClick={()=>navigate('/user/product')}>Product</Button>
                <Button  style={{color:"white"}} onClick={()=>navigate('/user/addmobile')}>Add Mobile</Button>
                
                <Button style={{marginLeft:'1050px', color:'blue',fontSize:'20px'}}>Hi &nbsp;<span style={{color:"white"}}>User</span></Button>

                
                
                
                <IconButton  style={{marginLeft:'auto'}} color='inherit' aria-label='Cart' onClick={()=>navigate("/user/cart")}>
                <Badge badgeContent={usertotalQty } color="success">
                     <ShoppingCartCheckoutIcon color="action" />
                </Badge>
                
            </IconButton>
            
        </Toolbar>
      </AppBar>

      
      </div>
    )
}