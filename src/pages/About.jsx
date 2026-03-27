import Navbar from "../components/Navbar";
import CategoryBar from "../components/CategoryBar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <Navbar />
      <CategoryBar />

      <div style={container}>
       {/* BREADCRUMB */}
        <p style={breadcrumb}>Home / About</p>

        <h2 style={heading}>About Us</h2>

        {/* TOP SECTION */}
        <div style={topSection}>

          {/* LEFT TEXT */}
          <div style={textSection}>

           <h3 style={subHeading}>Our Mission</h3>
            <p style={{ fontWeight:"600" }}>
              To empower parents by providing thoughtfully designed, safe, and sustainable baby essentials that make childcare easier and more enjoyable for every family. To be the go-to online store for parents seeking reliable, expert-curated baby products, ensuring peace of mind with every purchase.
            </p>

            <h3 style={{ marginTop: "20px",fontSize:"24px" }}>Our Vision</h3>
            <p style={{ fontWeight:"600" }}>
              To create a world where every new parent has access to the best resources and products, fostering a generation of healthy, happy, and thriving children. To become the most beloved and trusted global community for parents.
            </p>

          </div>

          {/* RIGHT IMAGE */}
          <div style={imageWrapper}>
  
            {/* BIG PINK CIRCLE */}
            <div style={bigCircle}></div>

            {/* IMAGE */}
            <img
                src="/images/about.jpg"
                alt="Mother"
                style={image}
            />

            </div>
            </div>

        {/* MAP SECTION */}
        <div style={mapSection}>
          <img
            src="/images/map.jpg"
            alt="Location map"
            style={mapImage}
          />
        </div>

      </div>

      <Footer />
    </>
  );
};
const container = {
  padding: "40px",
  fontFamily: "Quicksand, sans-serif"
};

const heading = {
  textAlign: "center",
  marginBottom: "30px"
};

const topSection = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "40px",
  flexWrap: "wrap"
};

const textSection = {
  flex: 1,
  minWidth: "300px",
  lineHeight: "1.6"
};

const imageWrapper = {
  flex: 1,
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "300px"
};

const image = {
  width: "280px",
  height: "280px",
  borderRadius: "50%",
  objectFit: "cover",
  position: "relative",
  zIndex: 2,
 
};

const mapSection = {
  marginTop: "40px"
};

const mapImage = {
  width: "95%",        // 👈 reduce size
  borderRadius: "10px",
  display: "block",
  margin: "0 auto" ,
  height:"450px"    // 👈 center it
};
const subHeading = {
  fontSize: "24px",   // 👈 increase
  fontWeight: "700",
  marginBottom: "10px"
};
const bigCircle = {
  width: "350px",
  height: "350px",
  backgroundColor: "#F8A8D8",
  borderRadius: "50%",
  position: "absolute",
  right: "-50px",   // 👈 pushes to right
 zIndex: 1
};
const breadcrumb = {
  color: "#000",
  marginBottom: "10px"
};
export default About;