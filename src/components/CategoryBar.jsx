import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getCategoriesAPI } from '../services/api';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const menuData = {
  "Baby Fashion": {
    "New Baby clothing": [
      "New born onesies & rompers",
      "New born nightwear & sleepsuits",
      "New born baby sets & suits",
      "New born baby dresses & frocks",
      "New born baby leggings & shorts",
      "New born baby t-shirts",
      "New born caps, gloves & mittens",
      "New born inner wear",
      "New born baby jackets",
      "New born baby sweaters"
    ],
    "Baby boys clothing": [
      "Baby boys t-shirts",
      "Baby boys shirts",
      "Baby boys jeans & trousers",
      "Baby boys shorts",
      "Baby boys innerwear & thermals",
      "Baby boys socks",
      "Baby boys sweat shirts & jackets",
      "Baby boys sweaters",
      "Baby boys swim wear",
      "Baby boys sets & suits"
    ],
    "Baby girls clothing": [
      "Baby girls tops & t-shirts",
      "Baby girls dresses & frocks",
      "Baby girls jeans & trousers",
      "Baby girls leggings",
      "Baby girls shorts & skirts",
      "Baby girls sets & suits",
      "Baby girls socks",
      "Baby girls swim wear",
      "Baby girls sweat shirts & jackets",
      "Baby girls sweaters"
    ]
  },

  "Footwear & Accessories": {
    "Baby Footwear": [
      "Baby Booties"
    ],
    "Kids Footwear": [
      "Kids casual shoes",
      "Kids sneakers & sports shoes",
      "Kids bellies",
      "Kids sandals",
      "Kids flip flops"
    ],
    "Fashion Accessories": [
      "Kids bags",
      "Kids hair accessories",
      "Kids caps & gloves",
      "Kids scarfs"
    ]
  },

  "Moms & Babycare": {
    "Breast Feeding": [
      "Electric breast pump",
      "Manual breast pump",
      "Feeding shawls",
      "Breast pads & nipple shields"
    ],
    "Maternity Pillows": [
      "Feeding Pillows",
      "Pregnancy Pillows"
    ],
    "Maternity clothing": [
      "Stretch mark cream",
      "Maternity pads",
      "Disposable maternity panties",
      "Maternity bed mats",
      "Maternity lingerie",
      "Maternity bottom wear",
      "Maternity sleep wear",
      "Maternity tops",
      "Maternity dresses"
    ],
    "Baby feeding & Nursery essentials": [
      "Bibs & burp cloths",
      "Feeding bottles",
      "Muslins",
      "Soothers & pacifiers",
      "Teethers & nibblers",
      "Baby food storage & milk storages",
      "Baby sippers & cups",
      "Weaning plates & bowls",
      "Kids water bottles & lunch box",
      "Bottle warmer & sterilizer"
    ],
    "Bath accessories": [
      "Baby bath tub",
      "Baby bather & chair",
      "Baby bath sponge & bath caps",
      "Bath stands & box",
      "Baby quick dry sheet & changing mats"
    ],
    "Baby hair care": [
      "Baby shampoo",
      "Baby conditioner",
      "Baby hair oil"
    ],
    "Baby grooming": [
      "Baby toothbrush & baby toothpaste",
      "Baby brush & comb",
      "Baby nail cutter & scissors",
      "Cotton buds & pleats"
    ],
    "Diaper and toilet training": [
      "Diaper pants",
      "Diaper & nappy accessories",
      "Baby potty seat & chair"
    ],
    "Baby skincare": [
      "Baby body oil & baby massage oil",
      "Baby body wash",
      "Baby cream & baby lotion",
      "Baby diaper rash cream",
      "Baby powder",
      "Baby wipes & tissues"
    ],
    "Health & Safety": [
      "Baby care equipments",
      "Detergent & cleansers",
      "Humidifiers & air purifiers",
      "Mosquito repellants",
      "Sanitisers & hand cleansing gels",
      "Thermometer"
    ],
    "Diaper bags": [
      "Diaper bags"
    ]
  },

  "Furniture & Bedding": {
    "Baby Bedding": [
      "Baby bedding sets",
      "Baby cot sheets & crib sheets",
      "Baby mattress",
      "Baby mosquito nets",
      "Baby pillows"
    ],
    "Baby furniture & storage": [
      "Baby cots & cribs",
      "Travel baby bed",
      "Baby storage cabinets"
    ],
    "Blankets, quilts & wraps": [
      "Baby blankets",
      "Swaddles",
      "Baby quilts & comforters",
      "Sleeping bags"
    ]
  }
};

const CategoryBar = () => {
  const [categories, setCategories] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const barRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchCategories();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (barRef.current && !barRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getCategoriesAPI();
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const noDropdown = ['Toys', 'Rental Services', 'Offers'];

  return (
    <div
      ref={barRef}
      style={{
        backgroundColor: '#FFB2E6',
        padding: '25px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: 'Quicksand, sans-serif',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1000
      }}
    >
      {/* All Categories */}
      <div style={{ position: 'relative' }}>
        <span
          onClick={() => setActiveDropdown(activeDropdown === 'all' ? null : 'all')}
          style={{ fontWeight: '600', cursor: 'pointer', fontSize: '16px' }}
        >
          All categories ▾
        </span>

        {activeDropdown === 'all' && (
  <div style={{
    position: 'fixed',
    top: 'auto',
    left: 0,
    right: 0,
    background: '#fff',
    padding: '28px 40px',
    boxShadow: '0 6px 24px rgba(0,0,0,0.12)',
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    zIndex: 9999,
    overflowY: 'auto',
    maxHeight: '70vh'
  }}>
    {Object.entries(menuData).map(([categoryName, sections]) => (
      <div key={categoryName} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>

        {/* Main category heading */}
        <h3 style={{
          fontFamily: 'Quicksand, sans-serif',
          fontWeight: '700',
          fontSize: '24px',
          margin: '10px 0',
          color: '#EE0606'
        }}>
          {categoryName}
        </h3>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {Object.entries(sections).map(([section, items]) => (
            <div key={section} style={{ flex: '1 1 200px' }}>
              <h4 style={{
                marginBottom: '10px',
                marginTop: 0,
                fontWeight: '700',
                fontSize: '18px',
                fontFamily: 'Quicksand, sans-serif'
              }}>
                {section}
              </h4>

              {items.map((item) => (
                <p
                  key={item}
                  style={{
                    margin: '0 0 6px 0',
                    cursor: 'pointer',
                    fontSize: '16px',
                    color: '#000',
                    fontFamily: 'Quicksand, sans-serif',
                    whiteSpace: 'normal',
                    wordBreak: 'break-word'
                  }}
                  onMouseEnter={(e) => (e.target.style.color = '#EE0606')}
                  onMouseLeave={(e) => (e.target.style.color = '#000')}
                >
                  {item}
                </p>
              ))}

            </div>
          ))}
        </div>

        <hr style={{ margin: '16px 0', borderColor: '#eee' }} />
      </div>
    ))}
  </div>
)}
      </div>

      {/* Dynamic Categories */}
      {categories.map((cat) => (
        <div key={cat.id} style={{ position: 'relative' }}>
          {noDropdown.includes(cat.name) ? (
            <Link
                to={`/products/${cat.id}`}
                style={{
                  textDecoration: "none",
                  color: location.pathname.includes(`/products/${cat.id}`) ? "#EE0606" : "#000",
                  fontWeight: location.pathname.includes(`/products/${cat.id}`) ? "700" : "600",
                  fontSize: "16px"
                }}
              >
              {cat.name}
            </Link>
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>

              {/* TEXT → NAVIGATE */}
              <Link
                to={`/products/${cat.id}`}
                style={{
                  textDecoration: "none",
                  color: location.pathname.includes(`/products/${cat.id}`) ? "#EE0606" : "#000",
                  fontWeight: location.pathname.includes(`/products/${cat.id}`) ? "700" : "600",
                  fontSize: "16px"
                }}
              >
                {cat.name}
              </Link>

              {/* ARROW → DROPDOWN */}
              <span
                onClick={(e) => {
                  e.stopPropagation(); // 🔥 prevents navigation
                  setActiveDropdown(activeDropdown === cat.id ? null : cat.id);
                }}
                style={{ cursor: "pointer", fontSize: "14px" }}
              >
                ▾
              </span>

            </div>

              {/* Full-width Dropdown */}
              {activeDropdown === cat.id && menuData[cat.name] && (
                <div
                  style={{
                    position: 'fixed',
                    left: 0,
                    right: 0,
                    background: '#fff',
                    padding: '28px 40px',
                    boxShadow: '0 6px 24px rgba(0,0,0,0.12)',
                    display: 'flex',
                    gap: '20px',
                    flexWrap: 'wrap',         // wrap for many-column categories
                    zIndex: 9999,
                    overflowX: 'auto'
                  }}
                >
                  {Object.entries(menuData[cat.name]).map(([section, items]) => (
                    <div
                      key={section}
                      style={{
                        minWidth: '200px',
                        maxWidth:'220px',
                        flex: '0 0 auto'
                      }}
                    >
                      <h4 style={{
                        marginBottom: '10px',
                        marginTop: 0,
                        fontWeight: '700',
                        fontSize: '18px',
                        fontFamily: 'Quicksand, sans-serif'
                      }}>
                        {section}
                      </h4>

                      {items.map((item) => (
                        <p
                          key={item}
                          style={{
                            margin: '0 0 6px 0',
                            cursor: 'pointer',
                            fontSize: '16px',
                            color: '#000',
                            fontFamily: 'Quicksand, sans-serif',
                            transition: 'color 0.15s',
                             whiteSpace: 'normal',   // ← add this
                            wordBreak: 'break-word'
                          }}
                          onMouseEnter={(e) => (e.target.style.color = '#EE0606')}
                          onMouseLeave={(e) => (e.target.style.color = '#000')}
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      ))}

      {/* Offers */}
      <Link
        to="/offers"
        style={{ fontWeight: '600', color: '#000', textDecoration: 'none', fontSize: '14px' }}
      >
        Offers
      </Link>
    </div>
  );
};

export default CategoryBar;