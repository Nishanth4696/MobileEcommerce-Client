import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import {Route, Routes, useNavigate} from "react-router-dom"
import { MobileDetails } from './MobileDetails';
import { PhoneList } from "./App";
import { Cart } from "./App";
import Toolbar from '@mui/material/Toolbar';
import { AddMobile } from './AddMobile';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Button } from '@mui/material';
import { EditMobile } from './EditMobile';


export function Navbar({totalQty}){
    const navigate = useNavigate();
    return(
        <div>
        <AppBar position="sticky">
         <Toolbar>
                <Button  style={{color:"white"}} onClick={()=>navigate('/')}>Home</Button>
                <Button  style={{color:"white"}} onClick={()=>navigate('/addmobile')}>Add Mobile</Button>
            <IconButton  style={{marginLeft:'auto'}} color='inherit' aria-label='Cart' onClick={()=>navigate("/cart")}>
                <Badge badgeContent={totalQty} color="success">
                     <ShoppingCartCheckoutIcon color="action" />
                </Badge>
                
            </IconButton>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/"  element={<PhoneList />}/>
        <Route path="/cart"  element={<Cart />}/>
        <Route path="/phonedetails/:id"  element={<MobileDetails />}/>
        <Route path="/addmobile"  element={<AddMobile />}/>
        <Route path="/editmobile/edit/:id"  element={<EditMobile />}/>
      </Routes>
      </div>
    )
}