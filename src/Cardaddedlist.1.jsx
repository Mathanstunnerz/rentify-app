import { useState, useEffect } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
export function Cardaddedlist({ userOrderitemCount }) {
  const [Orderlist, setOrderlist] = useState([]);
  const [paymentuserid, setPaymentuserid] = useState([]);
  // console.log(paymentuserid)
  const id = localStorage.getItem("user_id");
  const userorderitem = () => {
    fetch(`https://rental-shop-database.vercel.app/user/post/items/${id}`)
      .then((response) => response.json())
      .then((res) => setOrderlist(res.rentalOrder));
  };
  useEffect(() => {
    userorderitem();
  }, []);
  const navigate = useNavigate();
  const [paymenticon, setPaymenticon] = useState(false);
  return (
    <div>
      {paymenticon ? (
        <div className="paycontainer">
          <RendalConformation
            setpaymenticon={setPaymenticon}
            paymentuserid={paymentuserid}
            setPaymenticon={setPaymenticon}
          />
        </div>
      ) : null}
      <Button
        variant="outlined"
        onClick={() => navigate("/")}
        sx={{ margin: "10PX" }}
        startIcon={<ArrowBackIcon />}
      >
        Back
      </Button>

      <div className="card-added-list-container">
        {Orderlist.map((nm, key) => (
          <Orderlistcard
            nm={nm}
            key={key}
            setPaymenticon={setPaymenticon}
            userorderitem={userorderitem}
            userOrderitemCount={userOrderitemCount}
            setPaymentuserid={setPaymentuserid}
          />
        ))}
      </div>
    </div>
  );
}
function Orderlistcard({
  nm,
  userorderitem,
  userOrderitemCount,
  setPaymenticon,
  setPaymentuserid,
}) {
  const [date, setdate] = useState(false);
  const [oneday, setoneday] = useState("");
  const [age, setAge] = React.useState("");
  const id = localStorage.getItem("user_id");
  const navigate = useNavigate();
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const logout = async (nm) => {
    setAnchorElUser(null);
    const deleteorder = await fetch(
      `https://rental-shop-database.vercel.app/userOrder/delete/${nm.prodect_id}/${id}`,
      {
        method: "PUT",
      }
    );

    if (deleteorder.status === 200) {
      userorderitem();
      userOrderitemCount();
    } else {
      alert(deleteorder.status);
    }
  };
  const usersetpayment = (nm) => {
    setPaymentuserid(nm);
    setPaymenticon(true);
  };
  return (
    <div className="order-card-container">
      <div className="order-card-list-container">
        <div className="product-container">
          <img className="orderlist-img" src={nm.img} />
          <div className="orderlist-title-container">
            <h2 className="orderlist-title">
              {nm.Name}
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <MoreVertIcon />
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
                    <Typography textAlign="center" onClick={() => logout(nm)}>
                      remove
                      <DeleteIcon />
                    </Typography>
                  </MenuItem>
                </Menu>{" "}
              </Box>
            </h2>
            <p className="orderlist-discription">{nm.discription}</p>
            <h4 className="orderlist-rental-title">
              Rental-Perday: Rs {nm.rental}
            </h4>
          </div>
        </div>
        <div className="date-container">
          <CalendarTodayIcon onClick={() => usersetpayment(nm)} />
        </div>
      </div>
    </div>
  );
}

function RendalConformation({ setPaymenticon, paymentuserid, setpaymenticon }) {
  const [age, setAge] = React.useState("");
  const [plan, setplan] = useState(false);
  const [rental, setrental] = useState();

  // console.log(rental)
  const token = localStorage.getItem("tokenlog");
  const handleChange11 = (event) => {
    setAge(event.target.value);
  };
  const navigate = useNavigate();
  const formvalidation = yup.object({
    StartDate: yup.string().required(),
    EndDate: yup.string().required(),
    Name: yup.string().required().min(4),
    Email: yup.string().email().required(),
    mobilenumber: yup.string().required().min(10),
  });
  const { values, handleChange, handleSubmit, handleBlur, errors } = useFormik({
    initialValues: {
      StartDate: "",
      EndDate: "",
      Name: "",
      Email: "",
      mobilenumber: "",
    },
    validationSchema: formvalidation,
    onSubmit: (dat) => {
      setplan(true);
      paymentdetails(dat, paymentuserid);
    },
  });
  const paymentdetails = (dat, paymentuserid) => {
    const { StartDate, EndDate, Email, Name } = dat;
    const total =
      parseInt(EndDate.slice(9, 10)) - parseInt(StartDate.slice(9, 10));
    const totalcost = paymentuserid.rental;

    // console.log(dat)
    // console.log(total)
    const fg = {
      Name: Name,
      StartDate: StartDate,
      EndDate: EndDate,
      totaldays: total === 0 ? 1 : total,
      totalamount: total === 0 ? totalcost : totalcost * total,
      Email: Email,
    };
    setrental(fg);
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  const [productownername, setproductownername] = useState();
  // console.log(productownername)
  async function displayRazorpay(
    rental,
    paymentuserid) {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const data = {
      totalamount: rental.totalamount,
    };
    //  console.log("data",data)
    // creating a new order

    //  console.log("sd",sd)
    const result = await fetch("https://rentify-9dur.onrender.com/razorpay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    // const { name } = await fetch(
    //   `https://rentify-9dur.onrender.com/find/${paymentuserid.prodect_id}`,
    //   {
    //     method: "GET",
    //   }
    // ).then((res) => res.json());

    // console.log("ownername",ownername)
    // Getting the order details back
    const { amount, order_id, currency } = result;
    // console.log(result)
    const options = {
      key: "rzp_test_ajGeKyvp3lw7rJ", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: `ownername`,
      description: "Test Transaction",
      image: "logo",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await fetch("https://rental-shop-database.vercel.app/success", {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        });

        alert(result.data.msg);
      },
      prefill: {
        name: "mathan",
        email: "mathanstunnerz",
        contact: "9566610064",
      },
      notes: {
        address: "Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  return (
    <div className="rendal-conform-container">
      {plan ? (
        <div className="payment-container">
          <h2>Rentify</h2>
          <img
            className="payment-img"
            src="https://static.vecteezy.com/system/resources/previews/002/264/860/non_2x/receiving-online-payment-vector.jpg"
          />
          <h6 className="payment-totalmaount">
            Total : Rs{rental.totalamount} - Rental : {rental.totaldays}days
          </h6>
          <div className="payment-bottom-icon-container">
            <Button onClick={() => setplan(false)}>Back</Button>
            <Button
              onClick={() => {
                displayRazorpay(
                  rental,
                  paymentuserid,

                );
                setpaymenticon(false);
              }}
            >
              Pay
            </Button>
          </div>
        </div>
      ) : (
        <span>
          <h6>Set date</h6>
          <div className="fill-order-form-container">
            <form onSubmit={handleSubmit} className="fill-order-form-container">
              <h6> start</h6>
              <TextField
                size="small"
                id="outlined-basic"
                type="date"
                variant="outlined"
                defaultValue={values.StartDate}
                onChange={handleChange}
                name="StartDate"
                onBlur={handleBlur}
                helperText={errors.StartDate}
              />
              <h6>End</h6>
              <TextField
                size="small"
                id="outlined-basic"
                type="date"
                variant="outlined"
                defaultValue={values.EndDate}
                onChange={handleChange}
                name="EndDate"
                onBlur={handleBlur}
                helperText={errors.EndDate}
              />
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
                type="email"
                label="Email"
                variant="outlined"
                defaultValue={values.Email}
                onChange={handleChange}
                name="Email"
                onBlur={handleBlur}
                helperText={errors.Email}
              />
              <TextField
                size="small"
                id="outlined-basic"
                type="number"
                label="Mobile number"
                variant="outlined"
                defaultValue={values.mobilenumber}
                onChange={handleChange}
                name="mobilenumber"
                onBlur={handleBlur}
                helperText={errors.mobilenumber}
              />
              <div className="form-bottom-container">
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setPaymenticon(false)}
                >
                  Close
                </Button>
                <Button
                  type="submit"
                  color="success"
                  variant="contained"
                  size="small"
                >
                  Confrom
                </Button>
              </div>
            </form>
          </div>
        </span>
      )}
    </div>
  );
}
