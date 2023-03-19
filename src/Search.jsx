import * as React from "react";
import { Item } from "./Item";
import { useState, useEffect} from "react";
import { useNavigate,useParams} from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
export function Search({ fileterdata,userOrderitemCount}) {
  // const{id} = useParams()
  // // if(fileterdata.length != 0){
  // //   navigate("/")
  // // }
  // console.log(fileterdata)
const navigate =useNavigate()
  const [data,setdata] =useState([])
const user =()=>{
  if(fileterdata){

      setdata(fileterdata)
  
   
  }else{
    navigate("/")
  }
 
}
useEffect(()=>{
  user()
},[fileterdata])
  return ( <span>
     <Button
          variant="outlined"
          onClick={() => navigate("/")}
          sx={{ margin: "10PX" }}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
    <div className="dashboard-container">
   
      {data.map((carditem,index)=>(<Item key={index} carditem={carditem} userOrderitemCount={userOrderitemCount}/>))  }
    </div>
    </span>
  );
}
