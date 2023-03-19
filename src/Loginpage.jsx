import { useState, useEffect, useParams } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";

export function Loginpage() {
  const [signup, setsignup] = useState(null);
  const navigate = useNavigate();
  const formvalidation = yup.object({
    name: yup.string().required().min(4),
    password: yup.string().required(),
  });
  const formvalidation2 = yup.object({
    name: yup.string().required().min(4),
    password: yup.string().required(),
    email: yup.string().email().required(),
  });
  const { values, handleChange, handleSubmit, handleBlur, errors } = useFormik({
    initialValues: { name: "", password: "" },
    validationSchema: formvalidation,
    onSubmit: async (dat) => {
      console.log(dat);
      const data = await fetch("https://rental-shop-database.vercel.app/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dat),
      });
      if (data.status === 401) {
        console.log("❌Error 401");
        setsignup("401");
        localStorage.clear();
      } else {
        if (data.status === 400) {
          setsignup("invalid credentials");
          localStorage.clear();
        } else {
          const result = await data.json();
          localStorage.setItem("tokenlog", result.token);
          localStorage.setItem("user_id", result.user_id);
          navigate("/profile");
        }
        // navigate("/profile");
      }
      // navigate("/profile");
    },
  });
  const Formik = useFormik({
    initialValues: { name: "", password: "", email: "" },
    validationSchema: formvalidation2,
    onSubmit: async (dats) => {
      // console.log(dats);
      const signup = {
        name: dats.name,
        password: dats.password,
        email: dats.email,
        post: [],
        rentalOrder: [],
      };
      //  console.log(JSON.stringify(signup))

      const data = await fetch("https://rental-shop-database.vercel.app//user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signup),
      });
      if (data.status === 401) {
        console.log("❌Error 401");
        setsignup("401");
        localStorage.clear();
      } else {
        if (data.status === 400) {
          setsignup("invalid credentials");
          localStorage.clear();
        } else {
          const result = await data.json();
          // console.log(data);
          localStorage.setItem("tokenlog", result.token);
          localStorage.setItem("user_id", result.user_id);
          navigate("/profile");
        }
        // navigate("/profile");
      }
    },
  });
  const [login, setlogin] = useState(true);

  return (
    <div className="login-form-container">
      {login ? (
        <form className="login-form" onSubmit={handleSubmit} method="post">
          <h2>Login</h2>

          <TextField
            size="small"
            id="outlined-basic"
            type="text"
            label="Name"
            variant="outlined"
            defaultValue={values.name}
            onChange={handleChange}
            name="name"
            onBlur={handleBlur}
            helperText={errors.name}
          />
          <TextField
            size="small"
            id="outlined-basic"
            type="text"
            label="password"
            variant="outlined"
            defaultValue={values.password}
            onChange={handleChange}
            name="password"
            onBlur={handleBlur}
            helperText={errors.password}
          />
          <h4 className="create-account-text" onClick={() => setlogin(false)}>
            Create account
          </h4>
          <div className="login-form-bottom-container">
            <Button
              size="small"
              variant="outlined"
              onClick={() => navigate("/")}
            >
              Close
            </Button>
            <Button
              type="submit"
              color="success"
              variant="contained"
              size="small"
            >
              login
            </Button>
          </div>
        </form>
      ) : (
        <form
          className="login-form"
          onSubmit={Formik.handleSubmit}
          method="post"
        >
          <h2>Signup</h2>
          {/* {signup === "invalid credentials" ? (
            <h6>invalid credentials</h6>
          ) : null} */}
          <TextField
            size="small"
            id="outlined-basic"
            type="text"
            label="Name"
            variant="outlined"
            defaultValue={Formik.values.name}
            onChange={Formik.handleChange}
            name="name"
            onBlur={Formik.handleBlur}
            helperText={Formik.errors.name}
          />
          <TextField
            size="small"
            id="outlined-basic"
            type="text"
            label="password"
            variant="outlined"
            defaultValue={Formik.values.password}
            onChange={Formik.handleChange}
            name="password"
            onBlur={Formik.handleBlur}
            helperText={Formik.errors.password}
          />
          <TextField
            size="small"
            id="outlined-basic"
            type="email"
            label="email"
            variant="outlined"
            defaultValue={Formik.values.email}
            onChange={Formik.handleChange}
            name="email"
            onBlur={Formik.handleBlur}
            helperText={Formik.errors.email}
          />
          <h4 className="create-account-text" onClick={() => setlogin(true)}>
            Login
          </h4>
          <div className="login-form-bottom-container">
            <Button
              size="small"
              variant="outlined"
              onClick={() => navigate("/")}
            >
              Close
            </Button>
            <Button
              type="submit"
              color="success"
              variant="contained"
              size="small"
            >
              signup
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
