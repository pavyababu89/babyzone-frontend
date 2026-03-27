import { useEffect, useState } from "react";
import { getTopSellingAPI } from "../services/api";

const TopSelling = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getTopSellingAPI();
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{
      padding: "40px",
      fontFamily: "Quicksand, sans-serif",
      backgroundColor:"#ffb2e6"
    }}>

      <h2>Top Selling</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "70px"
      }}>
        {products.map((item) => (
         <div key={item.id} style={{
        backgroundColor: "#f5f5f5",
        borderRadius: "15px",
        padding: "15px",
        textAlign: "center"
        }}>
        
        {/* IMAGE */}
        <div style={{
            backgroundColor: "white",
            borderRadius: "15px",
            padding: "10px",
            marginBottom: "10px"
        }}>
            <img
            src={item.image}
            alt={item.name}
            style={{
                width: "100%",
                height: "220px",
                objectFit: "contain"
            }}
            />
        </div>

        {/* NAME */}
        <h4 style={{
            fontSize: "16px",
            fontWeight: "600",
            margin: "10px 0"
        }}>
            {item.name}
        </h4>

        {/* BUTTON */}
        <button
            style={{
            backgroundColor: "#FFD83B",
            border: "none",
            padding: "15px 30px",
            borderRadius: "20px",
            fontWeight: "600",
            cursor: "pointer",
            fontFamily:"Quicksand",
            fontSize:"20px"
            }}
        >
            Shop Now
        </button>

        </div>
        ))}
      </div>

    </div>
  );
};

export default TopSelling;