
import * as React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
export function Editprofile (){
  const navigate = useNavigate();
  const [userdata, setuserdata] = useState([]);

  const usertoken = localStorage.getItem("user_id")
  const user = async()=>{
    await fetch(`https://rentify-9dur.onrender.com/user/${usertoken}`)
    .then((response) => response.json())
    .then((res) => setuserdata(res));
  }
  useEffect(() => {
    user()
  }, []);
  const formvalidation = yup.object({
    name: yup.string(),
    dp: yup.string().url(),
    bio: yup.string(),
  });
 
  const { values, handleChange, handleSubmit, handleBlur, errors } = useFormik({
    initialValues: { name: "" , dp:"" ,bio:"" },
    validationSchema: formvalidation,
    onSubmit: async (ddd) => {
 
      const msg = { name: ddd.name ===""? userdata.name : ddd.name , dp: ddd.dp === "" ? userdata.dp : ddd.dp , bio: ddd.bio ===""? userdata.bio : ddd.bio  }
      console.log(msg)
    
     
      const data = await fetch(`http://localhost:4050/user/updateprofile/${usertoken}`, {
       method: "PUT",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(msg),
     });
     if(data.status === 400){
       alert(data.message);
     }else{
       navigate("/profile");
     }
    }
  });
  return (
    <div className="post-form-container">
      <form className="post-form" onSubmit={handleSubmit}>
        <input
          size="small"
          id="outlined-basic"
          type="text"
           placeholder="Name"
          autoComplete="off"
          variant="outlined"
          defaultValue={userdata.name}
          onChange={handleChange}
          name="name"
          className="profile-edit-input"
          onBlur={handleBlur}
          helperText={handleBlur && errors.name ? errors.name : null}
        />
        <input
          size="small"
          id="outlined-basic"
          type="url"
          autoComplete="off"
          placeholder="Dp url"
          variant="outlined"
          defaultValue={userdata.dp}
          onChange={handleChange}
          name="dp"
          className="profile-edit-input"
          onBlur={handleBlur}
          helperText={handleBlur && errors.dp ?errors.dp :null}
        />
        <input
          size="small"
          id="outlined-basic"
          type="text"
          placeholder="Bio"
          autoComplete="off"
          variant="outlined"
          defaultValue={userdata.bio}
          onChange={handleChange}
          name="bio"
          className="profile-edit-input"
          onBlur={handleBlur}
          helperText={ handleBlur && errors.bio ? errors.bio : null}
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


