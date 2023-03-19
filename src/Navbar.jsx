import * as React from "react";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `0px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export function Navbar({ userOrderdata, setfilterdata }) {
  const [inputdata, setinputdata] = useState(null);

  const querydataapi = async (inputdata) => {
    await fetch(
      `https://rental-shop-database.vercel.app/filter?Name=${inputdata}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length) {
          setfilterdata(data);
          navigate(`/search/${inputdata}`);
        }
      });
  };
  const [userdata, setuserdata] = useState([]);
  const [count, setcount] = useState([]);

  const usertoken = localStorage.getItem("user_id");
  const user = async () => {
    await fetch(`https://rentify-9dur.onrender.com/user/${usertoken}`)
      .then((response) => response.json())
      .then((res) => {
        setuserdata(res);
        setcount(res.rentalOrder);
      });
  };
  useEffect(() => {
    user();
  }, [userOrderdata,usertoken]);

  const navigate = useNavigate();

  const [navresponsive, setresponsive] = useState(true);
  const menuClick = () => {
    setresponsive(!navresponsive);
  };
  return (
    <div className="navbar-container">
      <h2 className="logo-text">Rentify</h2>

      <div className="screach-bar-container">
        <input
          class="form-control"
          type="search"
          placeholder="Search"
          aria-label="Search"
          autoComplete="On"
          defaultValue=""
          onChange={(event) => {
            setinputdata(event.target.value);
          }}
        />
        <button
          class=" searchbutton"
          type="submit"
          onClick={() => querydataapi(inputdata)}
          onBlur={() => querydataapi(inputdata)}
        >
          Search
        </button>
      </div>

      <div className="navbar-router-container">
        <ul
          type="none"
          className={
            navresponsive
              ? "navbar-profile-container"
              : "navbar-profile-container active"
          }
        >
          <li>
            <IconButton
              aria-label="cart"
              onClick={() => {
                setresponsive(!navresponsive);
                navigate("/Cardaddedlist");
              }}
              className="shopping-cart-icon"
            >
              <StyledBadge badgeContent={count.length} color="secondary">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </li>
          <li>
            <Avatar
              sx={{ width: 35, height: 35 }}
              className="profile-icon"
              alt="Remy Sharp"
              src={userdata.dp}
              onClick={() => {
                navigate("/profile");
                setresponsive(!navresponsive);
              }}
            />
          </li>
        </ul>
      </div>
      <span className="navbar-menu-icon">
        <MenuIcon
          sx={{
            position: "relative",
            right: "10px",
          }}
          onClick={menuClick}
        />
      </span>
    </div>
  );
}
