import { useState,useEffect } from "react";
import * as React from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { Routes, Route, Link, useNavigate  } from "react-router-dom";
export function Item({ carditem,userOrderitemCount}) {
  // console.log("card",carditem)
    const token = localStorage.getItem("tokenlog");
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 1,
      border: `0px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
      backgroundColor: "red",
    },
  }));
  const [cardclick, setcardclick] = useState(false);
  const cardexpand = () => {
    setcardclick(!cardclick);
  };
  const cardclose = () => {
    setcardclick(!cardclick);
  };
  const id = localStorage.getItem("user_id");
   const navigate =useNavigate()

  const addcard =async (carditem) => {
    // console.log("cardclick",carditem)
    if(id ){
      const data = await fetch(`https://rental-shop-database.vercel.app/order/user/item/${id}/${carditem.prodect_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(carditem),
      });
       if(data.status === 400) {
        alert("Product already exists")
        userOrderitemCount()
       }else{
    if(data.status === 200) {
      userOrderitemCount()
       }else{
        alert("Your item cannot be accepted")
       }
      }
    } else{
      navigate("/profile/login")

    }
   
    // console.log(carditem)
  }


  const styles = {
    width: "70% ",
    height: "80%",
    zIndex: 1000,
    position: "absolute",
    boxShadow: "0px 0px 100px 10px rgba(0, 0, 0, 0.9)",
    overflow: "hidden",
    top: "auto",
  };
  const discriptionstyles = {
    width: "90%",
    height: "25%",
    fontSize: "10px",
    textAlign: "center",
    paddingTop: "10px",
  };
  const cardratestyle = {
    fontSize: "medium",
    paddingTop: "0px",
    marginBottom: "0%",
  };

  const [like, setlike] = useState(0);
  return (
    <div
      className="card-container"
      style={cardclick ? styles : null}
     
    >
      {cardclick ? (
        <div className="card-top-close-icon" onClick={cardclose}>
          <CloseIcon />
        </div>
      ) : null}
      <img className="card-img" src={carditem.img} alt=""  onClick={cardclick ? null : cardexpand}/>
      <h2 className="card-title">{carditem.Name}</h2>
      {cardclick ? (
        <span style={discriptionstyles}>{carditem.discription}</span>
      ) : (
        <p className="card-discription">{carditem.discription}</p>
      )}
      {cardclick ? (
        <h2 style={cardratestyle} className="card-rate">
         Perday : Rs{carditem.rental}
        </h2>
      ) : null}
      <div className="card-bottom-icon-container">
        <StyledBadge badgeContent={like} color="secondary">
          <FavoriteIcon
            className="like-icon"
            sx={{
              zIndex: 0,
            }}
            onClick={() => setlike(like + 1)} />
        </StyledBadge>
    <AddShoppingCartIcon className="add-item-icon" onClick={()=>addcard(carditem)}/>
      </div>
    </div>
  );
  }
