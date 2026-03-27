import { useEffect, useState } from "react";
import { getNewArrivalsAPI } from "../services/api";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getNewArrivalsAPI();
      console.log(res.data); // 👈 check data
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{
      padding: "40px",
      fontFamily: "Quicksand, sans-serif"
    }}>

      <h2>New Arrivals</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "70px"
      }}>
        {products.map((item) => (
          <div key={item.id} style={{
            border: "2px solid #000",
            borderRadius: "10px",
            padding: "15px",
            position:"relative"
          }}>
            
           <img
                src={item.image}
                alt={item.name}
                style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "contain"
                }}
                />
            

             <h4 style={{ fontSize: "20px", marginBottom: "30px" ,fontWeight:'700'}}>
            {item.name}
            </h4>

            <p style={{ fontSize: "16px", marginBottom: "30px" }}>
            MRP :₹ {item.price}
            </p>
            
            <button
                style={{
                backgroundColor: "#FFD83B",
                border: "none",
                padding: "12px 40px",
                borderRadius: "15px",
                fontWeight: "600",
                cursor: "pointer",
                position: "absolute",   // ✅
                bottom: "15px",
                right: "15px",
                fontSize: "20px",
                fontFamily:"Quicksand"
            }}
            >
            Buy
            </button>

          </div>
        ))}
      </div>

    </div>
  );
};

export default NewArrivals;