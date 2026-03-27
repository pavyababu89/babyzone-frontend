import Navbar from "../components/Navbar";
import CategoryBar from "../components/CategoryBar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {

  const [related, setRelated] = useState([]);
  const [index, setIndex] = useState(0);
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();
  const { setCartCount } = useContext(CartContext);

  const fetchCart = async () => {
    const res = await API.get("cart/?user=testuser");
    setCart(res.data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // 🔥 FETCH RELATED PRODUCTS
  useEffect(() => {
    API.get("products/").then((res) => {
      setRelated(res.data.slice(0, 6));
    });
  }, []);

  const handleNext = () => {
    if (index < related.length - 4) setIndex(index + 1);
  };

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  // 🔥 EMPTY CART CHECK
  // 🔥 EMPTY CART CHECK
if (!cart || cart.items.length === 0) {
  return (
    <>
      <Navbar />
      <CategoryBar />

      <div style={{ textAlign: "center", padding: "80px" }}>
        <h2>Your cart is empty 🛒</h2>

        <button
          style={checkoutBtn}
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>
      </div>

      <Footer />
    </>
  );
}

  // ✅ TOTAL CALCULATION
  const getTotal = () => {
    return cart.items.reduce((sum, item) => {
      return sum + item.product_price * item.quantity;
    }, 0);
  };

  return (
    <>
      <Navbar />
      <CategoryBar />

      <div style={{ overflowX: "hidden" }}>
        <div style={{ padding: "40px" }}>
          <h2 style={{ textAlign: "center" }}>Cart</h2>

          {/* HEADER */}
          <div style={headerRow}>
            <p>Name</p>
            <p>Qty</p>
            <p>Age</p>
            <p>Price</p>
            <p>Total</p>
            <p>Remove</p>
          </div>

          {/* ITEMS */}
          {cart.items.map((item) => (
            <div key={item.id} style={itemRow}>

              {/* NAME */}
              <div style={{ ...nameBox, justifySelf: "start" }}>
                <img
                  src={`https://Shudarshini.pythonanywhere.com${item.product_image}`}
                  style={img}
                />
                <p>{item.product_name}</p>
              </div>

              {/* QTY */}
              <div style={{ display: "flex", gap: "10px", alignItems: "center", justifySelf: "center" }}>
                <button
                  style={qtyBtn}
                  onClick={async () => {
                    if (item.quantity > 1) {
                      await API.post("cart/add/", {
                        user: "testuser",
                        product_id: item.product,
                        quantity: -1
                      });
                      setCartCount(prev => prev - 1);
                      fetchCart();
                    }
                  }}
                >-</button>

                <div style={qtyBox}>{item.quantity}</div>

                <button
                  style={qtyBtn}
                  onClick={async () => {
                    await API.post("cart/add/", {
                      user: "testuser",
                      product_id: item.product,
                      quantity: 1
                    });
                    setCartCount(prev => prev + 1);
                    fetchCart();
                  }}
                >+</button>
              </div>

              {/* AGE */}
              <p style={centerCell}>{item.product_age}</p>

              {/* PRICE */}
              <p style={centerCell}>₹{item.product_price}</p>

              {/* TOTAL */}
              <p style={centerCell}>
                ₹{item.product_price * item.quantity}
              </p>

              {/* REMOVE */}
              <p
                style={{ ...centerCell, cursor: "pointer" }}
                onClick={async () => {
                  await API.post("cart/remove/", { item_id: item.id });
                  setCartCount(prev => prev - item.quantity);
                  fetchCart();
                }}
              >
                🗑
              </p>

            </div>
          ))}

          {/* ✅ TOTAL + CHECKOUT */}
          <div style={{ textAlign: "right", marginTop: "30px", paddingRight: "40px" }}>
            <h2>Total: ₹{getTotal()}</h2>

           <button
          style={checkoutBtn}
        onClick={async () => {

          const user = localStorage.getItem("user");

          // 🔥 LOGIN CHECK
          if (!user) {
            alert("Please login to proceed to checkout");
            return;
          }

          const total = getTotal();
          const items = cart.items;

          // 🔥 CLEAR CART
          for (const item of cart.items) {
            await API.post("cart/remove/", { item_id: item.id });
          }

          setCartCount(0);
          setCart(null);

          navigate("/checkout", {
            state: { total, items }
          });
        }}
      >
        Checkout
      </button>
          </div>

        </div>

        {/* YOU MIGHT ALSO LIKE */}
        <div style={{ marginTop: "30px" }}>
          <h4>You might also like</h4>

          <div style={pinkBox}>
            <div style={carouselWrapper}>

              <button style={arrowLeft} onClick={handlePrev}>‹</button>

              <div style={carouselContainer}>
                <div
                  style={{
                    ...carouselTrack,
                    transform: `translateX(-${index * 240}px)`
                  }}
                >
                  {related.map((item) => (
                    <div key={item.id} style={productCard}>
                      <img
                        src={
                          item.image?.startsWith("http")
                            ? item.image
                            : `https://Shudarshini.pythonanywhere.com${item.image}`
                        }
                        style={productImg}
                      />

                      <p style={productName}>{item.name}</p>
                      <p>₹{item.price}</p>
                      <p>Age: {item.age_group}</p>

                      <div style={{ display: "flex", gap: "5px" }}>
                        {item.color?.split(",").map((c, i) => (
                          <div key={i} style={dot(c)}></div>
                        ))}
                      </div>

                      <div style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "10px",
                        justifyContent: "center"
                      }}>
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

const headerRow = {
  display: "grid",
  gridTemplateColumns: "2.5fr 1fr 1fr 1fr 1fr 1fr",
  fontWeight: "600",
  borderBottom: "1px solid #000",
  padding: "10px 0",
  marginTop: "20px",
  textAlign: "center"
};

const itemRow = {
  display: "grid",
  gridTemplateColumns: "2.5fr 1fr 1fr 1fr 1fr 1fr",
  alignItems: "center",
  padding: "20px 0",
  borderBottom: "1px solid #ccc",
  textAlign: "center"
};

const nameBox = {
  display: "flex",
  gap: "15px",
  alignItems: "center"
};

const img = { width: "70px", borderRadius: "10px" };

const qtyBtn = {
  width: "35px",
  height: "35px",
  border: "1.5px solid #000",
  borderRadius: "6px",
  background: "#fff",
  fontSize: "18px",
  cursor: "pointer"
};

const qtyBox = {
  width: "40px",
  height: "35px",
  border: "1.5px solid #000",
  borderRadius: "6px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "600"
};

const checkoutBtn = {
  background: "#FFD83B",
  border: "none",
  padding: "12px 25px",
  borderRadius: "10px",
  fontFamily: "Quicksand, sans-serif",
  fontWeight: "700",
  fontSize: "18px",
  cursor: "pointer"
};

const centerCell = { justifySelf: "center" };

const carouselWrapper = {
  position: "relative",
  display: "flex",
  alignItems: "center"
};

const carouselContainer = {
  overflow: "hidden",
  width: "100%",
  padding: "0 40px"
};

const carouselTrack = {
  display: "flex",
  transition: "0.4s ease"
};

const productCard = {
  minWidth: "270px",
  maxWidth: "350px",
  margin: "0 10px",
  padding: "10px",
  border: "1.5px solid #000",
  borderRadius: "10px",
  background: "#fff"
};

const productImg = {
  width: "100%",
  height: "150px",
  objectFit: "contain"
};

const productName = { fontWeight: "600" };

const pinkBox = {
  background: "#f5a3d3",
  padding: "20px 40px",
  borderRadius: "10px",
  marginLeft: "-40px",
  marginRight: "-40px"
};

const arrowLeft = {
  position: "absolute",
  left: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 10,
  background: "#FFD83B",
  borderRadius: "50%",
  width: "35px",
  height: "35px",
  border: "none",
  cursor: "pointer"
};

const arrowRight = {
  position: "absolute",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 10,
  background: "#FFD83B",
  borderRadius: "50%",
  width: "35px",
  height: "35px",
  border: "none",
  cursor: "pointer"
};

const dot = (color) => ({
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  backgroundColor: color,
  border: "1px solid #000"
});

const btnSmall = {
  backgroundColor: "#FFD83B",
  border: "none",
  padding: "8px 12px",
  borderRadius: "8px",
  fontWeight: "600",
  cursor: "pointer"
};

export default Cart;