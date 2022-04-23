import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { useFormik } from "formik";
import * as yup from 'yup';
import { API_URL} from './GlobalConstants';

const formValidationSchema= yup.object({
  model:yup
      .string()
      .required("why not fill tis field🎃"),
  img:yup
      .string()
      .required("why not fill this field🎃"),
  company:yup
      .string()
      .required("why not fill tis field🎃"),
  price:yup
      .number()
      .required("why not fill tis field🎃"),
 
})


export function EditMobile() {
    const { id } = useParams();
    
    const [mobile, setMobile] = useState(null);

    useEffect(() => {
      fetch(`${API_URL}/mobilelist/${id}`,{method:"GET"})
      .then((data) => data.json())
      .then((mv) => setMobile(mv))
      
    },[id])
   
 return mobile ? <UpdateMobile mobile={mobile}  /> : ""; 
 
}

function UpdateMobile({mobile}){
  
  const formik = useFormik({
    initialValues: {
      model: mobile.model,
      img: mobile.img,
      company: mobile.company,
      price: mobile.price,
      },
    // validate: validateForm,
    validationSchema: formValidationSchema,
    onSubmit: (updateMobile) => {
      console.log("onSumbit", updateMobile)
      editMobile(updateMobile);
    }
  });
  
  
  const navigate = useNavigate();
  const editMobile = (updateMobile) => {

   
    
    
    fetch(`${API_URL}/mobilelist/${mobile._id}`,
    {
      method:"PUT",
      body:JSON.stringify(updateMobile),
      headers:{'Content-Type':'application/json'},
    }).then(() => navigate("/"))
    

  
  };

  return (

    <form onSubmit={formik.handleSubmit} className='add-mobile-form'>
      <TextField
        id="model"
        name="model"
        value={formik.values.model}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        label='Enter the model'
        variant="standard" 
        error={formik.errors.model && formik.touched.model}
        helperText={formik.errors.model && formik.touched.model && formik.errors.model}/>


      <TextField
        className='add-mobile-input'
        id="img"
        name="img"
        value={formik.values.img}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        label='Enter the img'        
        variant="standard" 
        error={formik.errors.img && formik.touched.img}
        helperText={formik.errors.img && formik.touched.img && formik.errors.img}/>
        

      <TextField
        id="company"
        name="company"
        value={formik.values.company}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        label='Enter the company'       
        variant="standard"
        error={formik.errors.company && formik.touched.company}
        helperText={formik.errors.company && formik.touched.company && formik.errors.company} />
        

      <TextField
        id="price"
        name="price"
        value={formik.values.price}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        label='Enter the price'
        variant="standard" 
        error={formik.errors.price && formik.touched.price}
        helperText={formik.errors.price && formik.touched.price && formik.errors.price}/>
        




      <Button type='submit' variant="outlined" >Save</Button>

    </form>

  );
}