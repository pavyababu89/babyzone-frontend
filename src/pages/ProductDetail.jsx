import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import API from "../services/api";

import Navbar from "../components/Navbar";
import CategoryBar from "../components/CategoryBar";
import Footer from "../components/Footer";

import { FaRegHeart } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const isRental = location.state?.isRental || false;

  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("desc");
  const [index, setIndex] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly");
  const { setCartCount } = useContext(CartContext);
  const navigate = useNavigate();

  const handleNext = () => {
    if (index < related.length - 4) setIndex(index + 1);
  };

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  useEffect(() => {
    fetchProduct();
    fetchRelated();
  }, [id]);

  const fetchProduct = async () => {
    const res = await API.get("products/");
    const found = res.data.find((p) => p.id == id);
    setProduct(found);
  };

  const fetchRelated = async () => {
    const res = await API.get("products/");
    setRelated(res.data.slice(0, 6));
  };

  const dot = (color) => ({
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: color.trim().toLowerCase(),
    border: "2px solid #000"
  });

  if (!product.id) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <CategoryBar />

      <div style={{ padding: "30px 40px", fontFamily: "Quicksand" }}>

        {/* BREADCRUMB */}
        <p style={{ fontSize: "14px", color: "#555" }}>
          Home / {product.name}
        </p>

        {/* MAIN SECTION */}
        <div style={{ display: "flex", gap: "40px", marginTop: "20px" }}>

          {/* LEFT IMAGE */}
          <div style={{ flex: 1 }}>
            <div style={{
              height: "400px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "25px"
            }}>
              <img src={product.image} style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }} />
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
              <img src={product.image} style={thumb} />
              <img src={product.image} style={thumb} />
            </div>
          </div>

          {/* RIGHT DETAILS */}
          <div style={{ flex: 1 }}>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2>{product.name}</h2>
              <FaRegHeart size={22} />
            </div>

            <p style={{ fontWeight: "700", fontSize: "20px" }}>
              MRP : ₹ {product.price}
            </p>

            <p style={{ fontSize: "13px", color: "#777" }}>
              Price inclusive of all taxes
            </p>

            {/* COLOR */}
            <div style={{ marginTop: "10px", fontWeight: "600", fontSize: "20px" }}>
              <p>Color</p>
              <div style={{ display: "flex", gap: "8px" }}>
                {product.color?.split(",").map((c, i) => (
                  <div key={i} style={dot(c)}></div>
                ))}
              </div>
            </div>

            {/* QUANTITY */}
            <div style={{ marginTop: "15px", fontWeight: "600", fontSize: "20px" }}>
              <p>Quantity</p>
              <div style={{ display: "flex", gap: "10px", alignItems: "center", marginTop: "5px" }}>
                <button style={qtyBtn} onClick={() => setQty(qty - 1)} disabled={qty === 1}>-</button>
                <div style={qtyBox}>{qty}</div>
                <button style={qtyBtn} onClick={() => setQty(qty + 1)}>+</button>
              </div>
            </div>

            {/* AGE GROUP */}
            <div style={{ marginTop: "15px", fontWeight: "600", fontSize: "20px" }}>
              <p>Age Group</p>
              <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
                <div style={ageBox}>0-12m</div>
                <div style={ageBox}>3-4y</div>
                <div style={ageBox}>4-5y</div>
              </div>
            </div>

            {/* PERIOD - ONLY FOR RENTAL */}
            {isRental && (
              <div style={{ marginTop: "15px", fontWeight: "600", fontSize: "20px" }}>
                <p>Period</p>
                <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
                  {["Monthly", "Weekly", "Daily"].map((p) => (
                    <div
                      key={p}
                      onClick={() => setSelectedPeriod(p)}
                      style={{
                        ...ageBox,
                        background: selectedPeriod === p ? "#FFD83B" : "#fff",
                        border: selectedPeriod === p ? "2px solid #FFD83B" : "1.5px solid #000",
                        cursor: "pointer"
                      }}
                    >
                      {p}
                    </div>
                  ))}
                </div>

                {/* BEST OFFER */}
                <div style={{ marginTop: "15px", fontSize: "16px" }}>
                  <p style={{ fontWeight: "700" }}>1 month: 30 Days</p>
                  <p style={{ color: "#007bff", fontWeight: "700" }}>Best off 30%</p>
                  <p style={{ fontSize: "13px", color: "#777" }}>
                    GST & Add'l charges may apply on discounted price
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "5px" }}>
                    <span style={{ fontWeight: "700" }}>Add Month</span>
                    <select style={{
                      padding: "4px 8px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      fontFamily: "Quicksand"
                    }}>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>6</option>
                      <option>12</option>
                    </select>
                  </div>
                </div>

                <p style={{ marginTop: "10px", fontWeight: "700", fontSize: "20px" }}>
                  MRP : ₹ {product.price}
                </p>
              </div>
            )}

            {/* BUTTONS */}
            <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
              <button
                style={btn}
                onClick={async () => {
                  if (!product?.id) { alert("Product not loaded"); return; }
                  try {
                    await API.post("cart/add/", {
                      user: "testuser",
                      product_id: product.id,
                      quantity: qty || 1
                    });
                    setCartCount(prev => prev + (qty || 1));
                    navigate("/cart");
                  } catch (error) {
                    console.error(error.response?.data || error);
                    alert("Error adding to cart");
                  }
                }}
              >
                Add to cart
              </button>

              <button
                style={btn}
                onClick={() => {
                  navigate("/checkout", {
                    state: {
                      items: [{ ...product, quantity: qty }],
                      total: product.price * qty
                    }
                  });
                }}
              >
                {isRental ? "Book Now" : "Buy Now"}
              </button>
            </div>

            {/* PINCODE */}
            <div style={{ marginTop: "20px", fontWeight: "600", fontSize: "20px" }}>
              <p>Check Pincode</p>
              <div style={{ display: "flex", gap: "10px" }}>
                <input placeholder="Enter pincode" style={input} />
                <button style={btnSmall}>Check</button>
              </div>
            </div>

          </div>
        </div>

        {/* TABS SECTION */}
        <div style={tabBox}>
          <div style={fullGrid}>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <div style={tabItemActive}>Description</div>
              <p style={title}>AT A GLANCE</p>
              <p style={text}>{product.description}</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <div style={tabItem}>Specification</div>
              <p style={title}>FEATURES AND BENEFITS</p>
              <ul style={list}>
                <li>100% responsibly sourced cotton</li>
                <li>Sports style V-neck collar for comfort during play</li>
                <li>Covered back-neck seams to prevent irritation</li>
              </ul>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <div style={tabItem}>Expert advice</div>
              <p style={title}>CARE INSTRUCTION</p>
              <p style={text}>Machine Wash</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <div style={tabItem}>Delivery & return</div>
              <p style={title}>DELIVERY & RETURN</p>
              <p style={text}>Delivered in 3-5 days</p>
            </div>

          </div>
        </div>

        {/* REVIEWS */}
        <div style={reviewMain}>

          <div style={reviewBox}>

            <div style={reviewCard}>
              <div style={reviewHeader}>
                <img src="/images/user1.png" style={avatar} />
                <span style={name}>Arya</span>
              </div>
              <div style={stars}>★★★★★</div>
              <p style={reviewText}>Really amazing and best shirt for hot weather.</p>
            </div>

            <div style={reviewCard}>
              <div style={reviewHeader}>
                <img src="/images/moshin.png" style={avatar} />
                <span style={name}>Marsha</span>
              </div>
              <div style={stars}>★★★★★</div>
              <p style={reviewText}>Amazing product and great quality...delivered product before time.</p>
            </div>

            <div style={reviewCard}>
              <div style={reviewHeader}>
                <img src="/images/deepa.jpg" style={avatar} />
                <span style={name}>Snehal Lad</span>
              </div>
              <div style={stars}>★★★★★</div>
              <p style={reviewText}>Best Fashion store for my little boy...We love to shop from Firstcry...</p>
            </div>

          </div>

          <div style={reviewRight}>
            <p style={{ fontWeight: "600" }}>Write Review</p>
            <textarea placeholder="Type here..." style={textarea}></textarea>
            <button style={submitBtn}>Submit</button>
          </div>

        </div>

        {/* YOU MIGHT ALSO LIKE */}
        <div style={{ marginTop: "30px" }}>
          <h4>You might also like</h4>

          <div style={pinkBox}>
            <div style={carouselWrapper}>

              <button style={arrowLeft} onClick={handlePrev}>‹</button>

              <div style={carouselContainer}>
                <div style={{
                  ...carouselTrack,
                  transform: `translateX(-${index * 240}px)`
                }}>
                  {related.map((item) => (
                    <div key={item.id} style={productCard}>
                      <img src={item.image} style={productImg} />
                      <p style={productName}>{item.name}</p>
                      <p>Price : ₹{item.price}</p>
                      <p>Age: {item.age_group}</p>
                      <div style={{ display: "flex", gap: "5px" }}>
                        {item.color?.split(",").map((c, i) => (
                          <div key={i} style={dot(c)}></div>
                        ))}
                      </div>
                      <div style={{ display: "flex", gap: "10px", marginTop: "10px", justifyContent: "center" }}>
                        <button style={btnSmall}>Buy Now</button>
                        <button style={btnSmall}>Add to cart</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button style={arrowRight} onClick={handleNext}>›</button>

            </div>
          </div>
        </div>

      </div>

      <Footer />
    </>
  );
};

/* STYLES */
const thumb = { width: "80px", height: "80px", border: "1px solid #ccc" };

const btn = {
  backgroundColor: "#FFD83B", border: "none", padding: "12px 25px",
  borderRadius: "10px", fontFamily: "Quicksand", fontSize: "16px",
  fontWeight: "600", cursor: "pointer", whiteSpace: "nowrap"
};

const btnSmall = {
  fontFamily: "Quicksand", backgroundColor: "#FFD83B", border: "none",
  padding: "5px 15px", borderRadius: "8px", fontSize: "18px",
  fontWeight: "600", cursor: "pointer"
};

const ageBox = {
  border: "1.5px solid #000", borderRadius: "12px", padding: "12px 30px",
  fontWeight: "600", textAlign: "center", minWidth: "100px",
  cursor: "pointer", background: "#fff"
};

const input = { padding: "8px", border: "1px solid #ccc" };

const tabBox = {
  marginTop: "40px", border: "2px solid #000",
  borderRadius: "12px", padding: "20px"
};

const fullGrid = {
  display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px"
};

const tabItem = { fontWeight: "600", marginBottom: "20px" };

const tabItemActive = {
  ...tabItem, borderBottom: "4px solid pink",
  paddingBottom: "5px", alignSelf: "flex-start"
};

const title = { fontWeight: "700", fontSize: "13px", marginBottom: "10px", marginTop: "10px" };
const text = { fontSize: "13px", color: "#333", marginTop: "5px" };
const list = { fontSize: "13px", paddingLeft: "25px", marginTop: "5px", lineHeight: "1.6" };

const reviewMain = { display: "flex", gap: "40px", marginTop: "30px", alignItems: "flex-start" };

const reviewBox = {
  flex: 3, background: "#f5a3d3", padding: "25px", borderRadius: "10px",
  display: "flex", justifyContent: "space-between", alignItems: "stretch"
};

const reviewCard = {
  background: "#fff", padding: "15px", borderRadius: "10px",
  width: "250px", display: "flex", flexDirection: "column", gap: "10px"
};

const reviewRight = {
  flex: 1, maxWidth: "250px", display: "flex", flexDirection: "column", gap: "10px"
};

const reviewHeader = { display: "flex", alignItems: "center", gap: "10px" };
const avatar = { width: "40px", height: "40px", borderRadius: "50%" };
const name = { fontWeight: "600" };
const stars = { color: "#FFD700", fontSize: "20px" };
const reviewText = { fontSize: "13px", color: "#333" };

const submitBtn = {
  backgroundColor: "#FFD83B", border: "none", padding: "12px",
  borderRadius: "10px", fontWeight: "600", cursor: "pointer"
};

const textarea = {
  width: "100%", height: "120px", border: "1px solid #000",
  borderRadius: "10px", padding: "10px", resize: "none", fontFamily: "Quicksand"
};

const qtyBtn = {
  width: "40px", height: "40px", fontSize: "20px", border: "1.5px solid #000",
  borderRadius: "6px", background: "#fff", cursor: "pointer"
};

const qtyBox = {
  width: "50px", height: "40px", border: "1.5px solid #000", borderRadius: "6px",
  display: "flex", alignItems: "center", justifyContent: "center",
  fontWeight: "600", fontSize: "16px"
};

const carouselWrapper = { position: "relative", display: "flex", alignItems: "center" };
const carouselContainer = { overflow: "hidden", width: "100%", padding: "0 40px" };
const carouselTrack = { display: "flex", transition: "0.4s ease" };

const productCard = {
  minWidth: "270px", maxWidth: "350px", margin: "0 10px", marginRight: "40px",
  boxSizing: "border-box", padding: "10px", border: "1.5px solid #000",
  borderRadius: "10px", background: "#fff"
};

const productImg = { width: "100%", height: "150px", objectFit: "contain" };
const productName = { fontWeight: "600" };

const pinkBox = {
  background: "#f5a3d3", padding: "20px 40px", borderRadius: "10px",
  marginLeft: "-40px", marginRight: "-40px"
};

const arrowLeft = {
  position: "absolute", left: "5px", top: "50%", transform: "translateY(-50%)",
  zIndex: 10, background: "#FFD83B", border: "none", borderRadius: "50%",
  width: "35px", height: "35px", cursor: "pointer"
};

const arrowRight = {
  position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)",
  zIndex: 10, background: "#FFD83B", border: "none", borderRadius: "50%",
  width: "35px", height: "35px", cursor: "pointer"
};

export default ProductDetail;