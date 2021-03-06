import React from "react";
import { useDispatch } from "react-redux";
import { userForgotpass } from "../../Admin/redux/actions/userActions";
import { Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

function AdminForgotpassword() {
  const dispatch = useDispatch();
  const { handleChange, handleSubmit, handleBlur, errors, values, touched } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: formvalidationSchema,
      onSubmit: (values) => {
        dispatch(userForgotpass(values));
        // console.log(values);
      },
    });
  return (
    <div className="forgotpage">
      <div className="brand">
        <Typography
          sx={{
            fontSize: { xs: "50px", sm: "60px" },
            fontFamily: "Aladin",
            fontWeight: "bold"
            
          }}
          variant="h1"
        >
          Mobile Store
        </Typography>
      </div>
      <div className="formcontainer">
        <form onSubmit={handleSubmit}>
          <div>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Roboto Condensed",
                fontSize: { sm: "35px", xs: "28px" },
              }}
            >
              Forgot Password
            </Typography>
            <Typography
              variant="p"
              sx={{
                fontFamily: "Roboto Condensed",
                fontSize: "20px",
              }}
            >
              Please enter the registered mail to get the password reset link
            </Typography>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email && touched.email}
              value={values.email}
              helperText={errors.email && touched.email && errors.email}
              name="email"
              id="email"
              label="Email"
              placeholder="Enter Email"
              fullWidth
              sx={{ margin: "5px" }}
            />

            <Button type="submit" variant="contained" color="success">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminForgotpassword;

const formvalidationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter the valid email")
    .required("Required Field"),
});
