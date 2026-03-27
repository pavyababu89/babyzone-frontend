import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

import Navbar from "../components/Navbar";
import CategoryBar from "../components/CategoryBar";
import Footer from "../components/Footer";
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const { categoryId } = useParams();

  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
     window.scrollTo(0, 0);
    fetchProducts();
    fetchCategoryName();
  }, [categoryId]);

  const fetchProducts = async () => {
    try {
      const res = await API.get(`products/?category=${categoryId}`);
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategoryName = async () => {
    try {
      const res = await API.get("categories/");
      const cat = res.data.find((c) => c.id == categoryId);
      setCategoryName(cat?.name);
    } catch (err) {
      console.log(err);
    }
  };

  const optionStyle = {
    fontFamily: "Quicksand, sans-serif",
    fontSize: "16px",
    fontWeight:"600"
  };

  const selectStyle = {
    padding: "10px 14px",
    fontSize: "16px",
    fontFamily: "Quicksand, sans-serif",
    borderRadius: "6px",
    border: "1px solid #000",
    height: "40px",
    minWidth: "180px",
    cursor: "pointer",
    fontWeight:"600"
  };

  return (
    <>
      <Navbar />
      <CategoryBar />

      <div style={{ padding: "20px 40px", fontFamily: "Quicksand" }}>

        {/* ✅ BREADCRUMB */}
        <p style={{
          fontSize: "16px",
          color: "#000",
          marginBottom: "20px"
        }}>
          Home / {categoryName}
        </p>

        {/* TOP RIGHT SORT */}
        <div style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "20px",
            marginBottom: "20px",
            fontSize:"20px",
            fontWeight:"700"
            }}>

            {/* ✅ PERIOD (ONLY FOR RENTAL) */}
            {categoryName === "Rental Services" && (
                <div>
                Period{" "}
                <select style={selectStyle}>
                    <option style={optionStyle}>Monthly</option>
                    <option style={optionStyle}>Daily</option>
                    <option style={optionStyle}>Weekly</option>
                    <option style={optionStyle}>Years</option>
                </select>
                </div>
            )}

            {/* SORT */}
            <div>
                Sort by{" "}
                <select style={selectStyle}>
                <option style={optionStyle}>New arrivals</option>
                <option style={optionStyle}>Price low to high</option>
                <option style={optionStyle}>Price high to low</option>
                <option style={optionStyle}>Offers</option>
                </select>
            </div>

            </div>

        <div style={{ display: "flex", gap: "50px" }}>

          {/* FILTER */}
          <div style={{
            width: "270px",
            border: "1px solid #000",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.5)"
          }}>
            <h3>Filters</h3>

            <p><strong>Gender</strong></p>
            <p><input type="checkbox" /> Boy</p>
            <p><input type="checkbox" /> Girl</p>

            <p><strong>Age group</strong></p>
            <p><input type="checkbox" /> 0-6 months</p>
            <p><input type="checkbox" /> 7-12 months</p>
            <p><input type="checkbox" /> Kids</p>
            <p><input type="checkbox" /> Adults</p>

            <div style={{
              border: "1px solid #000",
              borderRadius: "10px",
              padding: "10px",
              marginTop: "10px",
              maxHeight: "120px",
              overflowY: "auto"
            }}>
              <p><strong>Brands</strong></p>
              <p><input type="checkbox" /> Babyhug</p>
              <p><input type="checkbox" /> Babyoye</p>
              <p><input type="checkbox" /> Kookie kids</p>
              <p><input type="checkbox" /> Carter’s</p>
              <p><input type="checkbox" /> Dapper Dudes</p>
            </div>

            <div style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
              marginTop: "10px",
              maxHeight: "120px",
              overflowY: "auto"
            }}>
              <p><strong>Color</strong></p>

              {["blue", "white", "red", "yellow", "black"].map((c) => (
                <p key={c}>
                  <input type="checkbox" />{" "}
                  <span style={{
                    display: "inline-block",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: c,
                    marginRight: "5px"
                  }}></span>
                  {c}
                </p>
              ))}
            </div>

            <p><strong>Discount</strong></p>
            <p><input type="checkbox" /> Upto 10%</p>
            <p><input type="checkbox" /> 10%-20%</p>
            <p><input type="checkbox" /> 20%-30%</p>
            <p><input type="checkbox" /> 30%-40%</p>

            <p><strong>Price</strong></p>
            <p><input type="checkbox" /> ₹ 0-250</p>
            <p><input type="checkbox" /> ₹ 250-1000</p>
            <p><input type="checkbox" /> ₹ 1000-3000</p>
            <p><input type="checkbox" /> ₹ 3000-5000</p>

            <p><strong>Curated collection</strong></p>
            <p><input type="checkbox" /> Trending now</p>
            <p><input type="checkbox" /> Fast moving</p>
            <p><input type="checkbox" /> Extra warm</p>

            <p><strong>Premium</strong></p>
            <p><input type="checkbox" /> Show premium products</p>
          </div>

          {/* PRODUCTS */}
          <div style={{ flex: 1 }}>

            {/* ✅ HEADING WITH UNDERLINE */}
            <h2 style={{
              marginBottom: "25px",
              borderBottom: "1.5px solid #000",
              paddingBottom: "5px"
            }}>
              {categoryName}
            </h2>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 300px)",
              justifyContent: "space-between",
              gap: "20px",
            }}>
              {products.map((item) => {

                return (
                 <div
                    key={item.id}
                    onClick={() => navigate(`/product/${item.id}`)}   // ✅ ADD THIS
                    style={{
                        border: "2px solid #000",
                        borderRadius: "10px",
                        padding: "15px",
                        backgroundColor: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        cursor: "pointer"   // optional
                    }}
                    >

                    <div>
                      <div style={{
                        width: "100%",
                        height: "150px",
                        overflow: "hidden",      // ✅ prevents overflow
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                        }}>
                        <img
                            src={item.image}
                            alt={item.name}
                            style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            }}
                        />
                        </div>

                      <div style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        
                        }}>
                        <FaRegHeart style={{
                            fontSize: "18px",
                            color: "#000",     // ✅ black border
                            cursor: "pointer"
                            }} />
                        </div>

                      <h4 style={{ margin: "10px 0",fontSize:"20px",fontWeight:"600" }}>{item.name}</h4>

                      <p style={{ fontSize: "14px", margin: "4px 0" }}>
                        Price : ₹ {item.price}
                        {categoryName === "Rental Services" && item.duration && ` for ${item.duration}`}
                        </p>

                      <p style={{ fontSize: "15px" }}>
                        Age: {item.age_group}
                      </p>

                      {categoryName !== "Moms & Babycare" ? (
                    <>
                        <p style={{ fontSize: "13px", margin: "4px 0" }}>Color:</p>

                        <div style={{ display: "flex", gap: "6px", marginBottom: "10px" }}>
                        {item.color?.split(",").map((c, index) => (
                            <div key={index} style={dot(c)}></div>
                        ))}
                        </div>
                    </>
                    ) : (
                    <div style={{ height: "35px" }}></div>   // ✅ placeholder space
                    )}
                    </div>

                    <div style={{
  display: "flex",
  gap: "10px",
  marginTop: "auto"
}}>

            {/* BUY / BOOK BUTTON */}
            <button
              style={btn}
             onClick={(e) => {
              e.stopPropagation();
              if (categoryName === "Rental Services") {
                navigate(`/product/${item.id}`, {
                  state: { isRental: true }
                });
              } else {
                navigate("/checkout", {
                  state: { items: [item], total: item.price }
                });
              }
            }}
            >
              {categoryName === "Rental Services" ? "Book Now" : "Buy Now"}
            </button>

            {/* ADD TO CART */}
            <button
              style={btn}
              onClick={async (e) => {
                e.stopPropagation();

                try {
                  await API.post("cart/add/", {
                    user: "testuser",
                    product_id: item.id,
                    quantity: 1
                  });

                  alert("Added to cart");

                } catch (err) {
                  console.log(err);
                }
              }}
            >
              Add to Cart
            </button>

          </div>

                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

const btn = {
  flex: 1,
  backgroundColor: "#FFD83B",
  border: "none",
  padding: "12px 0",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "18px",
  textAlign: "center",
  fontFamily: "Quicksand, sans-serif"
};

const dot = (color) => ({
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  backgroundColor: color.trim().toLowerCase(),
  border: "2px solid #000"
});

export default Products;