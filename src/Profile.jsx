import { useState, useEffect } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import IconButton from "@mui/material/IconButton";
export function Profile() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  const [userpostdata, setuserpostdata] = useState([]);
  const data = userpostdata;

  const id = localStorage.getItem("user_id");

  const userpostitem = () => {
    fetch(`https://rentify-9dur.onrender.com/user/post/items/${id}`)
      .then((response) => response.json())
      .then((res) => setuserpostdata(res.post));
  };
  useEffect(() => {
    userpostitem();
  }, []);
  const [userdata, setuserdata] = useState([]);

  useEffect(() => {
    fetch(`https://rentify-9dur.onrender.com/user/${id}`)
      .then((response) => response.json())
      .then((res) => setuserdata(res));
  }, []);
  const navigate = useNavigate();
  return (
    <div className="profile-container">
      <div className="profile-top-icon-conatiner">
        <Button
          variant="outlined"
          onClick={() => navigate("/")}
          sx={{ margin: "10PX" }}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <MoreVertIcon  />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem>
              <Typography textAlign="center" onClick={logout}>
                Logout
              </Typography>
            </MenuItem>
          </Menu>{" "}
        </Box>
      </div>
      <div className="profile-img-container">
        <Avatar
          alt="Remy Sharp"
          src={userdata.dp}
          sx={{ width: 150, height: 150 }}
        />

        <h4 className="profile-name">{userdata.name}</h4>
        <h4 className="profile-name">{userdata.bio}</h4>
        <span className="profile-post-icon">
          <h2 onClick={() => navigate("/Editprofile")} className="profile-EDIT-icon">
            Edit Profile
          </h2>
          <h2
            onClick={() => navigate("/profile/post")}
            className="profile-EDIT-icon"
          >
            Add Post
          </h2>
        </span>
      </div>
      <hr />
      <div className="profilePost-container">
        {data.map((dd,key) => (
          <Postitems  key={key} dd={dd} userpostitem={userpostitem} />
        ))}
      </div>
    </div>
  );
}
function Postitems({ dd, userpostitem }) {
  const id = localStorage.getItem("user_id");
  const deleteitem = async (dd) => {
    // console.log(dd.prodect_id);
    const productid = dd.prodect_id
 
    await fetch(
      `https://rental-shop-database.vercel.app/useritem/delete/${productid}/${id}`,
      {
        method: "PUT",
      }
    );
    await fetch(`https://rental-shop-database.vercel.app/pageitem/deleteitem/${productid}`, {
      method: "DELETE",
    });

    userpostitem();
  };
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 1,
      border: `0px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
      backgroundColor: "red",
    },
  }));
  const [like, setlike] = useState(0);
  return (
    <div className="card-container">
      <img className="card-img" src={dd.img} alt="" />
      <h2 className="card-title">{dd.Name}</h2>
      <div className="card-bottom-icon-container">
        <StyledBadge badgeContent={like} color="secondary">
          <FavoriteIcon
            className="like-icon"
            sx={{
              zIndex: 0,
            }}
            onClick={() => setlike(like + 1)}
          />
        </StyledBadge>

        <DeleteIcon className="add-item-icon" onClick={() => deleteitem(dd)} />
      </div>
    </div>
  );
}
