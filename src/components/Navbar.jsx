import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { CartContext } from "../context/CartContext";
import AuthModal from "./AuthModal";
import {useNavigate } from 'react-router-dom';

const announcements = [
  '🏷️ Get Rs.250 additional off on cart value of Rs.2999 and above',
  'Autumn winter 2025 is here! Dress your little one in soft, breathable fabrics for ultimate comfort and style!',
];

const Navbar = () => {
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [authType, setAuthType] = useState(null);
  const [user, setUser] = useState(null);

  const location = useLocation();
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();
  const [listening, setListening] = useState(false);

  // 🔥 Announcement slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncement((prev) =>
        prev === announcements.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // 🔥 Load logged-in user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const linkStyle = (path) => ({
    textDecoration: 'none',
    color: location.pathname === path ? '#EE0606' : '#333'
  });

  return (
    <>
      {/* Announcement Bar */}
      <div style={{
        backgroundColor: '#FFD83B',
        textAlign: 'center',
        padding: '12px',
        fontSize: '16px',
        fontWeight: '700',
        fontFamily: 'Quicksand, sans-serif'
      }}>
        {announcements[currentAnnouncement]}
      </div>

      {/* Navbar */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 40px',
        backgroundColor: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        fontFamily: 'Quicksand, sans-serif'
      }}>

        {/* LEFT */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="/">
            <img src="/images/logo.png" alt="BabyZone" style={{ height: '70px' }} />
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: '2px solid #000',
              borderRadius: '25px',
              padding: '8px 16px',
              width: '300px'
            }}>
              <span>🔍</span>
              <input
                type="text"
                placeholder="Search here"
                style={{ border: 'none', outline: 'none', width: '100%' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              onClick={() => setListening(!listening)}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: '2px solid #000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                background: listening ? 'linear-gradient(135deg, #FFD83B, #FFB2E6)' : 'white'
              }}
            >
              <FaMicrophone color={listening ? '#fff' : '#000'} />
            </div>

            {listening && (
              <div style={{
                padding: '10px 20px',
                border: '2px solid #000',
                borderRadius: '25px',
                fontSize: '15px',
                fontWeight: '600',
                fontFamily: 'Quicksand, sans-serif',
                background: 'white'
              }}>
                Ask something
              </div>
            )}
          </div>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', fontWeight: '700' }}>
          <Link to="/" style={linkStyle('/')}>Home</Link>
          <Link to="/about" style={linkStyle('/about')}>About</Link>
          <Link to="/contact" style={linkStyle('/contact')}>Contact</Link>
          <Link to="/forum" style={linkStyle('/forum')}>Forum</Link>
          <Link to="/parenting-classes" style={linkStyle('/parenting-classes')}>Parenting Classes</Link>

          {/* ACCOUNT */}
          <div style={{ position: 'relative' }}>
            <span
              onClick={() => setShowDropdown(!showDropdown)}
              style={{ cursor: 'pointer' }}
            >
              {user ? user : "Account"} ▾
            </span>

            {showDropdown && (
              <div style={{
                position: 'absolute',
                top: '30px',
                right: '0',
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '8px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                padding: '10px',
                width: '140px',
                zIndex: 9999
              }}>

                {user ? (
                  <span
                    onClick={() => {
                      localStorage.removeItem("user");
                      setUser(null);
                      setShowDropdown(false);
                      navigate('/');
                    }}
                    style={{ display: 'block', padding: '6px', cursor: 'pointer' }}
                  >
                    Logout
                  </span>
                ) : (
                  <>
                    <span
                      onClick={() => setAuthType("login")}
                      style={{ display: 'block', padding: '6px', cursor: 'pointer' }}
                    >
                      Login
                    </span>

                    <span
                      onClick={() => setAuthType("register")}
                      style={{ display: 'block', padding: '6px', cursor: 'pointer' }}
                    >
                      Register
                    </span>
                  </>
                )}

              </div>
            )}
          </div>

          {/* CART */}
          <Link to="/cart" style={{ textDecoration: 'none', color: '#333' }}>
            🛒 Cart
            <span style={{
              backgroundColor: '#EE0606',
              color: 'white',
              borderRadius: '50%',
              padding: '2px 6px',
              fontSize: '11px',
              marginLeft: '4px',
            }}>
              {cartCount}
            </span>
          </Link>
        </div>
      </nav>

      {/* AUTH MODAL */}
      {authType && (
        <AuthModal
          type={authType}
          onClose={() => setAuthType(null)}
          switchMode={() =>
            setAuthType(authType === "login" ? "register" : "login")
          }
          setUser={setUser} 
        />
      )}
    </>
  );
};
const container = {
  display: "flex",
  justifyContent: "center",
  padding: "40px",
  fontFamily: "Quicksand, sans-serif"
};

const card = {
  width: "500px",
  border: "1px solid #ccc",
  padding: "20px",
  borderRadius: "10px"
};

const productRow = {
  display: "flex",
  gap: "15px",
  marginBottom: "15px"
};

const productImg = {
  width: "100px",
  borderRadius: "10px"
};

const timeline = {
  background: "#f2f2f2",
  padding: "20px",
  borderRadius: "10px",
  marginTop: "20px"
};

const step = {
  display: "flex",
  alignItems: "center",
  gap: "15px"
};

const circle = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  background: "#FFB2E6",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "18px"
};

const line = {
  height: "30px",
  width: "2px",
  background: "#999",
  margin: "0 19px"
};
export default Navbar;