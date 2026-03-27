import Navbar from "../components/Navbar";
import CategoryBar from "../components/CategoryBar";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <>
      <Navbar />
      <CategoryBar />

      <div style={container}>

        {/* BREADCRUMB */}
        <p style={breadcrumb}>Home / Contact</p>

        {/* LEFT SIDE */}
        <div style={left}>

          <h3>Reach us</h3>

          <div style={box}>
            <p>📞 +123-456-7890</p>
            <p>✉ support@babyzone.com</p>
          </div>

          <div style={box}>
            <p>🚚 Track orders</p>
            <p>Cancel order</p>
          </div>

          <div style={box}>
            <p>💳 Exchange and</p>
            <p>refund policy</p>
          </div>

          <button style={chatBtn}>Live Chat</button>

        </div>

        {/* RIGHT SIDE */}
        
        <div style={right}>
            <h3>Contact Form</h3>
            <label style={label}>Name</label>
            <input placeholder="Your Name" style={input} />

            <label style={label}>Email</label>
            <input placeholder="Email Id" style={input} />

            <label style={label}>Phone Number</label>
            <input placeholder="Phone Number" style={input} />

            <label style={label}>Queries</label>
            <textarea placeholder="Your Message.." style={textarea}></textarea>

            <div style={{ textAlign: "center" }}>
            <button style={sendBtn}>Send</button>
            </div>
        </div>

      </div>

      {/* FAQ */}
      <div style={faqSection}>

        <h3 style={{ textAlign: "center" }}>FAQ’s</h3>

        <div style={faqItem}>
            <p style={faqQuestion}>Where are the offices of BabyZone located?</p>
            <div style={faqAnswer}>
            Currently our office is located in Madurai while the orders are shipped from our warehouses located across India.
            </div>
        </div>

        <div style={faqItem}>
            <p style={faqQuestion}>How do I know my order has been confirmed?</p>
            <div style={faqAnswer}>
            After checking out during the payment process, you will get confirmation via email and SMS.
            </div>
        </div>

        <div style={faqItem}>
            <p style={faqQuestion}>Are there any hidden charges like Octroi or Entry tax?</p>
            <div style={faqAnswer}>
            You will get the final price during checkout. No extra charges.
            </div>
        </div>

        <div style={faqItem}>
            <p style={faqQuestion}>How long will it take to receive my orders?</p>
            <div style={faqAnswer}>
            Delivery usually takes 3-4 business days. Remote areas may take longer.
            </div>
        </div>

        <div style={faqItem}>
            <p style={faqQuestion}>Will my GST amount be refunded?</p>
            <div style={faqAnswer}>
            Yes, GST amount will be refunded during cancellations and returns.
            </div>
        </div>

</div>
      <Footer />
    </>
  );
};
const container = {
  display: "flex",
  gap: "40px",
  padding: "40px",
  fontFamily: "Quicksand, sans-serif"
};

const left = {
  flex: 1
};

const right = {
  flex: 1,
  background: "#Ffb2e6",
  padding: "25px",
  borderRadius: "12px",
  border: "2px solid #000",
  overflow: "hidden" 
};
const label = {
  marginTop: "15px",
  display: "block",
  fontWeight: "600"
};
const box = {
  border: "3px solid #000",
  padding: "15px",
  borderRadius: "10px",
  marginTop: "15px",
  textAlign:"center",
  color:"black",
  fontWeight:"600"
};
const chatBtn = {
  marginTop: "20px",
  padding: "15px 80px",
  background: "#FFD83B",
  border: "none",
  borderRadius: "10px",
  fontFamily:"Quicksand",
  fontSize:"22px",
  fontWeight:"600",
  boxShadow: "0 4px 10px rgba(0,0,0,0.5)" 
};

const input = {
  width: "100%",
  padding: "14px",
  marginTop: "6px",
  borderRadius: "8px",
  border: "none",
  background: "#fff",
  boxSizing: "border-box"   // 👈 ADD THIS
};

const textarea = {
  width: "100%",
  padding: "14px",
  marginTop: "6px",
  height: "120px",
  borderRadius: "8px",
  border: "none",
  background: "#fff",
  boxSizing: "border-box"   // 👈 ADD THIS
};

const sendBtn = {
  marginTop: "20px",
  background: "#FFD83B",
  padding: "15px 40px",
  border: "none",
  borderRadius: "10px",
  fontWeight: "600",
  cursor: "pointer",
  fontSize:"20px",
  fontFamily:"Quicksand"
};

const faqSection = {
  width: "80%",            // 👈 reduce width
  margin: "40px auto",     // 👈 center horizontally
  background: "#Ffb2e6",
  padding: "25px",
  borderRadius: "12px",
  border: "2px solid #000",
  fontFamily:"Quicksand"
};

const faqItem = {
  marginTop: "15px"
};

const faqQuestion = {
  fontWeight: "600",
  marginBottom: "8px",
  fontSize: "20px"   // 👈 ADD THIS
};

const faqAnswer = {
  background: "#fff",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #000"
};
const breadcrumb = {
  color: "#000",
  margin:"0 auto"
};
export default Contact;