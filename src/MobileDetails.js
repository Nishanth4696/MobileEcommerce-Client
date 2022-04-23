import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { API_URL} from './GlobalConstants'

 export function MobileDetails() {
  
  const { id  } = useParams();
  const history = useNavigate();
  const [mobile, setMobile] = useState({});

  useEffect(() => {
    fetch(`${API_URL}/mobilelist/${id}`,{method:"GET"})
    .then((data) => data.json())
    .then((mv) => setMobile(mv))
  },[id])
 

 
  return (
    <div className="movie-detail-container">
      <Button onClick={() => history(-1)} variant="outlined" startIcon={<ArrowBackIcon />}> Back </Button>
      
      
        <div className="movie-specs">
        <h3 className="movie-name">{mobile.model}</h3>

        <p className="movie-rating" >{mobile.img} </p>
        </div>

   <p className="movie-summary">{mobile.company}</p> 
   <p className="movie-summary">{mobile.price}</p> 
   
    

  </div>
 
  );
}
