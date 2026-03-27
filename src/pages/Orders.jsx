import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CategoryBar from "../components/CategoryBar";
import Footer from "../components/Footer";
import API from "../services/api";

const Orders = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/");
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  return (
    <>
      <Navbar />
      <CategoryBar />

      <div style={container}>
        <h2>Your Orders</h2>

        {orders.map((order) => (
          <div style={card} key={order.id}>

            <p><b>Name:</b> {order.name}</p>
            <p><b>Address:</b> {order.address}</p>
            <p><b>Total:</b> ₹{order.total_price}</p>
            <p><b>Status:</b> {order.status}</p>
            <p><b>Date:</b> {new Date(order.created_at).toLocaleString()}</p>

          </div>
        ))}

      </div>

      <Footer />
    </>
  );
};
const container = {
  padding: "40px",
  fontFamily: "Quicksand, sans-serif"
};

const card = {
  border: "1px solid #ccc",
  padding: "20px",
  borderRadius: "10px",
  marginTop: "15px"
};
export default Orders;