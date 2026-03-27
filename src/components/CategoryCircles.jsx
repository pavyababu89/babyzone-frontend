import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Boys fashion", image: "/images/boysf.jpg", id: 2 },
  { name: "Girls fashion", image: "/images/girlsf.jpg", id: 2 }, // same category
  { name: "Footwear", image: "/images/footwear.webp", id: 4 },
  { name: "Accessories", image: "/images/accessories.jpg", id: 4},
  { name: "Toys", image: "/images/toys.jpg", id: 3 },
  { name: "Beds", image: "/images/beds.jpg", id: 6 },
];

const CategoryCircles = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      padding: "40px",
      textAlign: "center",
      fontFamily: "Quicksand, sans-serif"
    }}>

      <h2 style={{ marginBottom: "30px" }}>Categories</h2>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap"
      }}>
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => navigate(`/products/${cat.id}`)}   // ✅ navigation
            style={{
              textAlign: "center",
              cursor: "pointer",
              transition: "0.3s"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          >

            <div style={{
              width: "170px",
              height: "220px",
              borderRadius: "50%",
              border: "4px solid #FFB2E6",
              overflow: "hidden",
              marginBottom: "10px"
            }}>
              <img
                src={cat.image}
                alt={cat.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
              />
            </div>

            <p style={{ fontWeight: "600" }}>{cat.name}</p>

          </div>
        ))}
      </div>

    </div>
  );
};

export default CategoryCircles;