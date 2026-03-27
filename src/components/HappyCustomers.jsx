import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
const customers = [
  {
    name: "Bosky",
    review: "Very fast service and products are genuine.Definitely I am satisfied!",
    image: "/images/bosky.jpg"
  },
  {
    name: "Tulip",
    review: "Amazing products. Reasonable prices.Gr8 Customer service.Cheers!!!!!",
    image: "/images/tulip.jpg"
  },
  {
    name: "Deepa",
    review: "Great range of products right from new-born essentials..Excellent product quality and delivery",
    image: "/images/deepa.jpg"
  },
  {
    name: "Moshin",
    review: "Great site for baby products,I'm shopping here since 2012.The quality of product and services is nver changed .Keep it up.",
    image: "/images/moshin.png"
  }
];

const HappyCustomers = () => {
  return (
    <div style={{ padding: "40px",fontFamily: "Quicksand", textAlign: "center" }}>
      <h2 style={{ marginBottom:"30px" }}>Our Happy Customer</h2>


      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "40px",
        marginTop: "20px"
      }}>
        {customers.map((c, i) => (
          <div key={i} style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "20px",
            position: "relative",
            minHeight: "220px"
          }}>

            <img
              src={c.image}
              alt={c.name}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                position: "absolute",
                top: "-35px",
                left: "50%",
                transform: "translateX(-50%)"
              }}
            />

            <h4 style={{ marginTop: "40px" }}>{c.name}</h4>

            <div style={{ color: "#FFD83B",fontSize:"26px" }}>★★★★★</div>

            <p style={{ fontSize: "16px",fontWeight:"600" }}>{c.review}</p>

            <div style={{
      position: "absolute",
      bottom: "15px",
      right: "15px",
      display: "flex",
      gap: "15px",
      alignItems: "center",
      fontSize: "14px"
    }}>
      
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <FaThumbsDown />
        <span>0</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <FaThumbsUp />
        <span>5</span>
      </div>

    </div>

  </div>

        ))}
      </div>

      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <button style={{
            backgroundColor: "#FFD83B",
            border: "none",
            padding: "10px 40px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize:"20px",
            fontStyle:"Quicksand"
        }}>
            View More
        </button>
        </div>
    </div>
  );
};

export default HappyCustomers;