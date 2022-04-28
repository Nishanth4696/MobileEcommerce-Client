// import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from 'yup';
import { API_URL} from '../../GlobalConstants';
import { Navbar } from '../User/Navbar';



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



export function UserAddMobile() { 
  const navigate = useNavigate();


  const formik = useFormik({
    initialValues: {model:'', img:'', company:'',price:''},
    // validate: validateForm,
    validationSchema: formValidationSchema,
    onSubmit: (newMobile) => {
      console.log("onSumbit", newMobile)
      addMobile(newMobile);
    }
  });

  const addMobile = (newMobile) => {

    console.log("adding");
    
    console.log(newMobile);
    // setMovies([...Movies, newMobile]); 
      fetch(`${API_URL}/mobilelist`,
      {
               
        method:"POST",
        body:JSON.stringify(newMobile),
        headers:{'Content-Type':'application/json'},
      })
      .then(() =>navigate("/user/product"))
  };

  
  return (

    <section>
    <Navbar/>
    <form  onSubmit={formik.handleSubmit} className='add-mobile-form'>
      <TextField
        id="model"
        name="model"
        value={formik.values.model}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        label='Enter the model'
        variant="outlined" 
        error={formik.errors.model && formik.touched.model}
        helperText={formik.errors.model && formik.touched.model && formik.errors.model}/>


      <TextField
        className='add-movie-input'
        id="img"
        name="img"
        value={formik.values.img}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        label='Enter the img'        
        variant="outlined" 
        error={formik.errors.img && formik.touched.img}
        helperText={formik.errors.img && formik.touched.img && formik.errors.img}/>
        

      <TextField
        id="company"
        name="company"
        value={formik.values.company}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        label='Enter the company'       
        variant="outlined"
        error={formik.errors.company && formik.touched.company}
        helperText={formik.errors.company && formik.touched.company && formik.errors.company} />
        

      <TextField
        id="price"
        name="price"
        value={formik.values.price}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        label='Enter the price'
        variant="outlined" 
        error={formik.errors.price && formik.touched.price}
        helperText={formik.errors.price && formik.touched.price && formik.errors.price}/>
        




      <Button variant="contained" style={{width:'200px',margin:'auto'}} type='submit'>Add</Button>
       

    </form>
    </section>
  );
}
