import { useState, useEffect } from "react";
import * as React from "react";
import { Item } from "./Item";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
export function Dashboard({ userOrderitemCount, fileterdata }) {
  const [itemdata, setitemdata] = useState([]);
  const [load,setload] =useState(true)
  const maindata = async () => {
   await fetch("https://rental-shop-database.vercel.app/allitem")
      .then((res) => res.json())
      .then((data) =>{
        setload(false)
        setitemdata(data)
      });
  };
  useEffect(() => {
    maindata();
    // data(fileterdata);
  }, []);

  return (
    <div className="dashboard-container">
        
      {load?<CircularProgress /> : null}

      {itemdata.map((carditem, index) => (
        <Item
          key={index}
          carditem={carditem}
          userOrderitemCount={userOrderitemCount}
        />
      ))}
    </div>
  );
}
