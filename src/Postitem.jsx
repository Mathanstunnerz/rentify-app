import * as React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import  keygen from "keygenerator";
export function Postitem() {
  const navigate = useNavigate();

  const formvalidation = yup.object({
    Name: yup.string().required().min(4),
    img: yup.string().url().required(),
    discription: yup.string().required(),
    rental: yup.string().required(),
    prodect_id: yup.string().required(),
  });
  const { values, handleChange, handleSubmit, handleBlur, errors } = useFormik({
    initialValues: { Name: "", img: "", discription: "", rental: "", prodect_id:keygen._()},
    validationSchema: formvalidation,
    onSubmit: async (ddd) => {
      const usertoken = localStorage.getItem("user_id")
     const data = await fetch(`https://rental-shop-database.vercel.app/post/user/item/${usertoken}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ddd),
    });
    if(data.status === 400){
      alert(data.message);
    }else{
      const data2 = await fetch("https://rental-shop-database.vercel.app/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ddd),
      });
      navigate("/profile");
      if(data2.status === 400){
        navigate("/profile");
      }
      
    }
  }
  });
  return (
    <div className="post-form-container">
      <form className="post-form" onSubmit={handleSubmit}>
        <TextField
          size="small"
          id="outlined-basic"
          type="text"
          label="Name"
          variant="outlined"
          defaultValue={values.Name}
          onChange={handleChange}
          name="Name"
          onBlur={handleBlur}
          helperText={errors.Name}
        />
        <TextField
          size="small"
          id="outlined-basic"
          type="url"
          label="url"
          variant="outlined"
          defaultValue={values.img}
          onChange={handleChange}
          name="img"
          onBlur={handleBlur}
          helperText={errors.img}
        />
        <TextField
          size="small"
          id="outlined-basic"
          type="text"
          label="discription"
          variant="outlined"
          defaultValue={values.discription}
          onChange={handleChange}
          name="discription"
          onBlur={handleBlur}
          helperText={errors.discription}
        />
        <TextField
          size="small"
          id="outlined-basic"
          type="number"
          label="rental-Perday"
          variant="outlined"
          defaultValue={values.rental}
          onChange={handleChange}
          name="rental"
          onBlur={handleBlur}
          helperText={errors.rental}
        />
        <div className="form-bottom-container">
          <Button
            size="small"
            variant="outlined"
            onClick={() => navigate("/profile")}
          >
            Close
          </Button>
          <Button
            type="submit"
            color="success"
            variant="contained"
            size="small"
          >
            confirm
          </Button>
        </div>
      </form>
    </div>
  );
}
