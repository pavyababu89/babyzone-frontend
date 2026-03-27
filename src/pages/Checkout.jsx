import Navbar from "../components/Navbar";
import CategoryBar from "../components/CategoryBar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";


const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
   const [showSuccess, setShowSuccess] = useState(false);
   const navigate = useNavigate();
  const [form, setForm] = useState({
  email: "",
  country: "",
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  phone: ""
});
const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value
  });
};
const isFormValid = () => {
  return Object.values(form).every((value) => value.trim() !== "");
};
 
  const location = useLocation();
  const total = location.state?.total || 1699; // fallback
  const items = location.state?.items || [];
  console.log(items); 
const handlePayment = async () => {

    if (!isFormValid()) {
      alert("Please fill all fields");
      return;
    }

    if (!paymentMethod) {
      alert("Please select payment method");
      return;
    }

    if (paymentMethod === "cod") {
      alert("Order placed successfully (Cash on Delivery)");
      return;
    }

    const res = await API.post("create-order/", {
      amount: total + 99
    });

    const options = {
      key: "rzp_test_SVofyayLRKoQ3r",
      amount: res.data.amount,
      currency: "INR",
      name: "Baby Store",
      description: "Order Payment",
      order_id: res.data.id,

      handler: function (response) {
        alert("Payment Successful 🎉");
        console.log(response);
      },

      prefill: {
        name: form.firstName,
        email: form.email,
        contact: form.phone
      },

      theme: {
        color: "#FFD83B"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };  

  return (
    <>
      <Navbar />
      <CategoryBar />

      <div style={{ padding: "40px 80px",fontFamily: "Quicksand, sans-serif" }}>

        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          Checkout
        </h2>

        <div style={container}>

          {/* LEFT */}
          <div style={left}>

            {/* CONTACT */}
            <h3>Contact</h3>
            <input name="email" placeholder="Email (for order updates)" style={input} onChange={handleChange}/>

            <div style={checkboxRow}>
              <input type="checkbox" />
              <span>Send me order updates, news and offers</span>
            </div>

            <hr style={divider} />

            {/* ADDRESS */}
            <h3>Delivery address</h3>

            <input name="country" placeholder="Country/Region" style={input} onChange={handleChange} />

            <div style={row}>
            <input name="firstName"  placeholder="First name" style={input} onChange={handleChange} />
            <input  name="lastName" placeholder="Last name" style={input} onChange={handleChange} />
            </div>

            <input name="address" placeholder="Address" style={input}  onChange={handleChange}/>

            <div style={rowThree}>
            <input name="city" placeholder="City" style={input} onChange={handleChange}/>
            <input  name="state" placeholder="State" style={input} onChange={handleChange}/>
            <input name="pincode" placeholder="Pincode" style={input} onChange={handleChange}/>
            </div>

            <input name="phone" placeholder="Phone number" style={input} onChange={handleChange}/>

            <div style={checkboxRow}>
              <input type="checkbox" />
              <span>Save this information for next time</span>
            </div>

            {/* PAYMENT */}
            <h3>Choose your payment method</h3>
           <div style={paymentBox}>
            <input
                type="radio"
                name="payment"
                value="online"
                onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span style={{ marginLeft: "10px" }}>
                Secure transaction (UPI, cards, wallet, net banking)
            </span>
            </div>

            <div style={paymentBox}>
            <input
                type="radio"
                name="payment"
                value="cod"
                onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span style={{ marginLeft: "10px" }}>
                Cash on delivery
            </span>
            </div>
</div>
          {/* RIGHT */}
          <div style={right}>

            <h3>Order Summary</h3>

           
            {/* PRODUCT (DYNAMIC) */}
            {items.map((item) => (
            <div style={productRow} key={item.id}>
                
                <img
                src={`http://127.0.0.1:8000${item.product_image}`}
                style={productImg}
                />

                <div>
                <p style={{ fontWeight: "600" }}>
                    {item.product_name}
                </p>
                <p>Qty: {item.quantity}</p>
                <p>Price: ₹{item.product_price}</p>
                </div>

            </div>
            ))}

            {/* COUPON */}
            <input
              placeholder="Discount code or gift card"
              style={couponInput}
            />

            {/* PRICE DETAILS */}
            <div style={priceRow}>
              <span>Sub total</span>
              <span>₹{total}</span>
            </div>

            <div style={priceRow}>
              <span>Shipping</span>
              <span>₹99</span>
            </div>

            <hr />

            <div style={priceRow}>
              <strong>Total</strong>
              <strong>₹{total + 99}</strong>
            </div>

          </div>

        </div>

        {/* ORDER BUTTON */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "30px" }}>
            <button
                style={orderBtn}
                onClick={async () => {

                    // ✅ VALIDATION (keep same)
                    if (!isFormValid()) {
                    alert("Please fill all fields");
                    return;
                    }

                    if (!paymentMethod) {
                    alert("Please select a payment method");
                    return;
                    }

                    // ✅ COD FLOW
                    if (paymentMethod === "cod") {
                    alert("Order placed successfully (Cash on Delivery)");
                    return;
                    }

                    // 🔥 RAZORPAY STARTS HERE

                    const res = await API.post("/create-order/", {
                    amount: total + 99
                    });

                    const options = {
                    key: "rzp_test_SVofyayLRKoQ3r",   // 👈 your key
                    amount: res.data.amount,
                    currency: "INR",
                    name: "Baby Store",
                    description: "Order Payment",
                    order_id: res.data.id,

                    handler: async function (response) {

                    try {
                        await API.post("/order/create/", {
                        items: items,
                        total: total + 99,
                        payment_id: response.razorpay_payment_id,

                        // ✅ ADD THIS
                        name: form.firstName + " " + form.lastName,
                        address: form.address + ", " + form.city + ", " + form.state + " - " + form.pincode
                        });

                        console.log("Order saved");

                    } catch (error) {
                        console.error("Error saving order:", error);
                    }

                    // ✅ ALWAYS SHOW POPUP
                    setShowSuccess(true);
                    },

                    prefill: {
                        name: form.firstName,
                        email: form.email,
                        contact: form.phone
                    },

                    theme: {
                        color: "#FFD83B"
                    }
                    };

                    const rzp = new window.Razorpay(options);
                    rzp.open();

                }}
                >
                Order Now
                </button>
        </div>

      </div>
                {showSuccess && (
  <div style={overlay}>
    <div style={popup}>

      <h2>Your Order is confirmed</h2>

      <div style={tick}>✔</div>

      <p>Thank you for shopping with us</p>
      <p>Your order will be delivered in 7 working days</p>

      <div style={btnRow}>
        <button
          style={btn}
          onClick={() =>
            navigate("/track-order", {
                state: {
                items: items,
                total: total + 99,
                status: "Placed",
                 date: new Date().toLocaleString("en-IN", {   // 👈 add this
                dateStyle: "medium",
                timeStyle: "short"
              }) 
                }
            })
            }
        >
          Track Order
        </button>

        <button
          style={btn}
          onClick={() => setShowSuccess(false)}
        >
          Back
        </button>
      </div>

    </div>
  </div>
)}
      <Footer />
    </>
  );
};

/* STYLES */

const container = {
  display: "flex",
  gap: "40px"
};

const left = {
  flex: 2
};

const right = {
  flex: 1,
  background: "#FFB2E6",
  padding: "20px",
  borderRadius: "12px"
};

const input = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  border: "1px solid #ccc",
  borderRadius: "6px"
};

const row = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "10px"
};

const rowThree = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "10px"
};

const checkboxRow = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
  marginTop: "10px"
};

const divider = {
  margin: "20px 0"
};

const paymentBox = {
  border: "1px solid #000",
  padding: "12px",
  borderRadius: "8px",
  marginTop: "10px",
  display: "flex",
  alignItems: "center"
};

const productRow = {
  display: "flex",
  gap: "15px",
  marginTop: "15px"
};

const productImg = {
  width: "80px",
  borderRadius: "10px"
};

const couponInput = {
  width: "100%",
  padding: "10px",
  marginTop: "15px",
  borderRadius: "8px",
  border: "none"
};

const priceRow = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "10px"
};

const orderBtn = {
  background: "#FFD83B",
  border: "none",
  padding: "14px 30px",
  borderRadius: "10px",
  fontWeight: "600",
  cursor: "pointer",
  fontFamily: "Quicksand, sans-serif",
  fontSize: "16px"
};
const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999
};

const popup = {
  background: "#fff",
  padding: "40px",
  borderRadius: "20px",
  textAlign: "center",
  width: "400px",
  fontFamily: "Quicksand, sans-serif"
};

const tick = {
  fontSize: "60px",
  color: "#FFD83B",
  margin: "20px 0"
};

const btnRow = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px"
};

const btn = {
  padding: "12px 25px",
  background: "#FFD83B",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer"
};
export default Checkout;