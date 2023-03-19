import { useState, useEffect } from "react";

import reactLogo from "./assets/react.svg";
import "./App.css";
import * as React from "react";
import { Navbar } from "./Navbar";
import AddIcon from "@mui/icons-material/Add";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { Cardaddedlist } from "./Cardaddedlist.1";
import { Profile } from "./Profile";
import { Postitem } from "./Postitem";
import { Loginpage } from "./Loginpage";
import { Search } from "./Search";
import { Editprofile } from "./Editprofile";
function App() {
  const [count, setCount] = useState(0);
  const [signupname, setsignupname] = useState(null);
  const [userOrderdata, setuserOrderdata] = useState([]);
  const [fileterdata, setfilterdata] = useState(null);
  const id = localStorage.getItem("user_id");
  const userOrderitemCount = () => {
    fetch(`https://rentify-9dur.onrender.com/user/post/items/${id}`)
      .then((response) => response.json())
      .then((res) => setuserOrderdata(res.rentalOrder));
  };

  useEffect(() => {
    userOrderitemCount();
  }, [fileterdata]);
  return (
    <div className="App">
      <Navbar userOrderdata={userOrderdata} setfilterdata={setfilterdata} />

      <Routes>
        <Route
         
          path="/"
          element={<Dashboard userOrderitemCount={userOrderitemCount} />}
        />

        <Route
          path="/Editprofile"
          element={<Editprofile  />}
        />
        <Route
          path="/search/:id"
          element={
            <Search
              userOrderitemCount={userOrderitemCount}
              fileterdata={fileterdata}
            />
          }
        />
        <Route
          path="/Cardaddedlist"
          element={
            <Prodect>
              <Cardaddedlist userOrderitemCount={userOrderitemCount} />
            </Prodect>
          }
        />
        <Route
          path="/profile"
          element={
            <Prodect>
              <Profile signupname={signupname} />
            </Prodect>
          }
        />
        <Route path="/profile/post" element={<Postitem />} />
        <Route
          path="/profile/login"
          element={<Loginpage setsignupname={setsignupname} />}
        />
      </Routes>
    </div>
  );
}
function Prodect({ children }) {
  const token = localStorage.getItem("tokenlog");
  return token ? (
    <section>{children}</section>
  ) : (
    <Navigate replace to="/profile/login" />
  );
}
export default App;
