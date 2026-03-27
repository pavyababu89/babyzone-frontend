import Navbar from "../components/Navbar";
import CategoryBar from "../components/CategoryBar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";

const TrackOrder = () => {

  const location = useLocation();
  const items = location.state?.items || [];
  const total = location.state?.total || 0;
  const status = location.state?.status || "Placed";
const date = location.state?.date || "";
  const steps = ["Placed", "Dispatched", "In Transit", "Delivered"];
  const currentStep = steps.indexOf(status);

  return (
    <>
      <Navbar />
      <CategoryBar />

      <div style={container}>
        <div style={card}>

          <h2 style={{ marginBottom: "20px" }}>Your Order</h2>

          {/* PRODUCTS */}
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

                <p>
                  Qty: {item.quantity} • ₹{item.product_price}
                </p>
              </div>
            </div>
          ))}

          {/* TOTAL */}
          <p style={{ marginTop: "15px", fontWeight: "600" }}>
            Total Paid: ₹{total}
          </p>

          {date && (
          <p style={{ marginTop: "5px", color: "#666" }}>
            Order Placed: {date}
          </p>
        )}

          {/* TIMELINE */}
          <div style={timeline}>
            {steps.map((stepName, index) => (
              <div key={index}>

                <div style={{
                  ...step,
                  opacity: index <= currentStep ? 1 : 0.4
                }}>

                  <div style={{
                    ...circle,
                    background: index <= currentStep ? "#FFB2E6" : "#ddd"
                  }}>
                    {index === 0 && "🛒"}
                    {index === 1 && "🏠"}
                    {index === 2 && "🚚"}
                    {index === 3 && "👍"}
                  </div>

                  <div>
                    <p><b>{stepName}</b></p>
                    <p>
                      {index === currentStep
                        ? "Current status"
                        : index < currentStep
                        ? "Completed"
                        : "Pending"}
                    </p>
                  </div>

                </div>

                {index !== steps.length - 1 && <div style={line}></div>}

              </div>
            ))}
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};
const container = {
  display: "flex",
  justifyContent: "center",
  padding: "40px",
  fontFamily: "Quicksand, sans-serif"
};

const card = {
  width: "500px",
  border: "1px solid #ccc",
  padding: "20px",
  borderRadius: "10px"
};

const productRow = {
  display: "flex",
  gap: "15px",
  marginBottom: "15px"
};

const productImg = {
  width: "100px",
  borderRadius: "10px"
};

const timeline = {
  background: "#f2f2f2",
  padding: "20px",
  borderRadius: "10px",
  marginTop: "20px"
};

const step = {
  display: "flex",
  alignItems: "center",
  gap: "15px"
};

const circle = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  background: "#FFB2E6",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "18px"
};

const line = {
  height: "30px",
  width: "2px",
  background: "#999",
  margin: "0 19px"
};
export default TrackOrder;