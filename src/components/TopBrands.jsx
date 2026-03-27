const brands = [
  "/images/b1.png",
  "/images/b2.jpg",
  "/images/b3.webp",
  "/images/b4.jpg",
  "/images/b5.png",
];

const TopBrands = () => {
  return (
    <div style={{ padding: "40px",fontFamily: "Quicksand, sans-serif", overflow: "hidden" }}>
      <h2 style={{ textAlign: "center" }}>Top Brands</h2>

      <div style={{
        display: "flex",
        overflow: "hidden",
        marginTop: "20px",
    
      }}>
        
        {/* Moving container */}
        <div style={{
          display: "flex",
          gap: "30px",
          animation: "scroll 15s linear infinite reverse"
        }}>
          
          {/* Duplicate for infinite effect */}
          {[...brands, ...brands].map((img, i) => (
            <img
              key={i}
              src={img}
              alt="brand"
              style={{
                width: "200px",
                height: "80px",
                objectFit: "contain",
                border: "1px solid #000",
                padding: "10px",
                borderRadius: "6px",
                backgroundColor: "#fff"
              }}
            />
          ))}

        </div>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(50%); }
          }
        `}
      </style>
    </div>
  );
};

export default TopBrands;