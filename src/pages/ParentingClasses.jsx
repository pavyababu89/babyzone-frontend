import Navbar from "../components/Navbar";
import CategoryBar from "../components/CategoryBar";
import Footer from "../components/Footer";
import { useState } from "react";


const ParentingClasses = () => {

const [showModal, setShowModal] = useState(false);
const classes = [
  {
    title: "Child Development",
    date: "28/08/2025",
    days: 10,
    image: "/images/class1.jpg"
  },
  {
    title: "Discipline",
    date: "29/08/2025",
    days: 10,
    image: "/images/class2.jpg"
  },
  {
    title: "Parenting techniques",
    date: "30/08/2025",
    days: 10,
    image: "/images/class3.webp"
  },
  {
    title: "Parenting techniques",
    date: "02/09/2025",
    days: 30,
    image: "/images/class4.png"
  }
];

const workshops = [
  {
    title: "Child care",
    image: "/images/work1.jpg"
  },
  {
    title: "First step with baby",
    image: "/images/work2.webp"
  },
  {
    title: "The Art of Baby Handling",
    image: "/images/work3.jpg"
  }
];
  return (
    <>
      <Navbar />
      <CategoryBar />

      <div style={container}>

        {/* BREADCRUMB */}
        <p style={breadcrumb}>Home / Parenting classes</p>

        {/* ONLINE CLASSES */}
<h2>Online Classes</h2>

<div style={{ overflow: "hidden", width: "100%" }}>
  <div style={{
    display: "flex",
    gap: "20px",
    animation: "scrollLeft 12s linear infinite",
    width: "max-content"
  }}>
    {[...classes, ...classes].map((item, index) => (
      <div key={index} style={card}>
        <img src={item.image} style={cardImg} />
        <div style={cardBody}>
         <h4 style={{ margin: "0 0 5px 0" }}>{item.title}</h4> 
          <div style={{ display: "flex", justifyContent: "space-between" }}>
           <p style={{ margin: "0" }}>Starts on {item.date}</p>   {/* 👈 add */}
            <p style={{ margin: "0" }}>{item.days} Days</p>      
          </div>
          <div style={{ textAlign: "center" }}>
            <button style={btn}>Join class</button>
          </div>
        </div>
      </div>
    ))}
  </div>   {/* 👈 closes inner scroll div */}
</div>     {/* 👈 closes outer scroll div */}

{/* WORKSHOPS */}
<h2 style={{ marginTop: "30px" }}>Workshops</h2>

<div style={cardRow}>
  {workshops.map((item, index) => (
    <div key={index} style={workshopCard}>
      <img src={item.image} style={workshopCardImg} />
      <div style={workshopCardBody}>
        <h4>{item.title}</h4>
        <p>Conducted by James doe</p>
        <p>Senior Doctor</p>
        <p>Wed, 28 Aug, 2025</p>
        <p>Time: 10.00 Am - 1.00Pm</p>
        <button style={btn} onClick={() => setShowModal(true)}>Register</button>
      </div>
    </div>
  ))}
</div>

</div> {/* closes container */}

{/* BANNER */}
<div style={banner}>
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "30px" }}>
    <img src="/images/about.jpg" alt="banner" style={{ height: "80px", borderRadius: "10px" }} />
    <div>
      <p style={{ fontSize: "18px", fontWeight: "700" }}>Free sign In to Join classes and Workshop now</p>
      <button style={btn}>Register</button>
    </div>
  </div>
</div>
          <style>{`
            @keyframes scrollLeft {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }
            `}</style>

            {showModal && (
  <div style={{
    position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)", display: "flex",
    alignItems: "center", justifyContent: "center", zIndex: 9999
  }}>
    <div style={{
      backgroundColor: "#E391C8",
      borderRadius: "16px",
      padding: "40px",
      width: "480px",
      fontFamily: "Quicksand, sans-serif"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Sign in to register</h2>

      <label style={{ fontWeight: "700" }}>Name</label>
      <input type="text" placeholder="Your Name" style={modalInput} />

      <label style={{ fontWeight: "700" }}>Email</label>
      <input type="email" placeholder="Email Id" style={modalInput} />

      <label style={{ fontWeight: "700" }}>Password</label>
      <input type="password" placeholder="Password" style={modalInput} />

      <p style={{ textAlign: "right", color: "#FFD83B", fontWeight: "700", cursor: "pointer" }}>
        Forget password?
      </p>

      <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
        <button onClick={() => setShowModal(false)} style={backBtn}>Back</button>
        <button style={btn}>Register</button>
      </div>
    </div>
  </div>
)}
      <Footer />
    </>
  );
};
const container = {
  padding: "40px",
  fontFamily: "Quicksand, sans-serif"
};

const breadcrumb = {
  color: "#000",
  marginBottom: "10px"
};

const cardRow = {
  display: "flex",
  gap: "40px",
  flexWrap: "wrap",
  justifyContent: "space-evenly"
};

const card = {
  width: "300px",
  height:"340px",
  border: "1px solid #ccc",
  borderRadius: "10px",
  overflow: "hidden",   
  background: "#fff"
};

const cardImg = {
  width: "100%",
  height: "180px",
  objectFit: "cover"
};

const cardBody = {
  padding: "20px",
  lineHeight: "1.4" ,
  textAlign: "left"
};

const btn = {
  marginTop: "10px",
  background: "#FFD83B",
  border: "none",
  padding: "8px 15px",
  borderRadius: "8px",
  cursor: "pointer",
  width: "50%",
  fontSize: "16px",    // 👈 add
  fontWeight: "700" ,
  fontFamily:"Quicksand"
};

const banner = {
  background: "#Ffb2e6",
  padding: "20px",
  textAlign: "center",
  marginTop: "30px",fontFamily:"Quicksand"
};

const workshopCard = {
  width: "400px",
  height: "480px",
  border: "1px solid #ccc",
  borderRadius: "10px",
  overflow: "hidden",
  background: "#fff",
  display: "flex",        // 👈 add
  flexDirection: "column" // 👈 add
};

const workshopCardImg = {
  width: "100%",
  height: "190px",   // 👈 220px → 180px
  objectFit: "cover",
  objectPosition: "top"
};
const workshopCardBody = {
  padding: "20px",
  lineHeight: "1.4",
  fontSize: "15px",      // 👈 increase font size
  fontWeight: "600" ,
  textAlign: "center"     // 👈 increase font weight
};
const modalInput = {
  width: "100%",
  padding: "14px",
  borderRadius: "10px",
  border: "none",
  marginBottom: "16px",
  marginTop: "6px",
  fontSize: "15px",
  boxSizing: "border-box"
};

const backBtn = {
  marginTop: "10px",
  background: "#F5C97A",
  border: "none",
  padding: "8px 15px",
  borderRadius: "8px",
  cursor: "pointer",
  width: "50%",
  fontSize: "16px",
  fontWeight: "700"
};
export default ParentingClasses;