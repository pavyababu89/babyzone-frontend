import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {

  const socialStyle = {
    width: '40px',
    height: '40px',
    backgroundColor: 'black',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  };

  const titleStyle = {
    fontWeight: '700',
    marginBottom: '15px',
    fontSize: '20px'
  };

  return (
    <footer style={{
      backgroundColor: '#FFB2E6',
      padding: '20px 40px',
      marginTop: '40px',
      fontFamily: 'Quicksand, sans-serif'
    }}>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr 1fr',
        gap: '70px',
        alignItems: 'flex-start'
      }}>

        {/* Logo + Address */}
        <div>
          <Link to="/">
            <img
              src="/images/logo.png"   // ✅ FIXED HERE
              alt="BabyZone"
              style={{ height: '70px', marginBottom: '10px' }}
            />
          </Link>

          <p style={{ fontSize: '14px', fontWeight: '600', lineHeight: '22px' }}>
            4th street, pallavaram,<br />
            Near bus stand<br />
            Madurai-234567
          </p>
        </div>

        {/* Top Categories */}
        <div>
          <h5 style={titleStyle}>Top categories</h5>
          {['Baby Fashion', 'Toys', 'Footwear & Accessories', 'Moms & Baby care', 'Furniture & Bedding', 'Rental services'].map((item) => (
            <p key={item} style={{ fontSize: '16px', marginBottom: '8px',whiteSpace:"nowrap" }}>
              <Link to="/products" style={{ color: '#000', textDecoration: 'none', fontWeight: '600' }}>
                {item}
              </Link>
            </p>
          ))}
        </div>

        {/* Customer Support */}
        <div>
          <h5 style={titleStyle}>Customer support</h5>
          {['Help & contact us', 'Delivery information', 'Track your order', 'Returns & exchange', 'Promotion Terms & conditions', 'Terms & conditions'].map((item) => (
            <p key={item} style={{ fontSize: '16px', marginBottom: '8px', fontWeight: '600', whiteSpace:"nowrap"}}>
              {item}
            </p>
          ))}
        </div>

        {/* Useful Links */}
        <div>
          <h5 style={titleStyle}>Useful Links</h5>
          {['Store finder', 'Sitemap', 'Fees and payments policy'].map((item) => (
            <p key={item} style={{ fontSize: '16px', marginBottom: '8px', fontWeight: '600',whiteSpace:"nowrap" }}>
              {item}
            </p>
          ))}
        </div>

        {/* About */}
        <div>
          <h5 style={titleStyle}>About BabyZone</h5>
          {['Privacy Policy', 'Terms & Conditions'].map((item) => (
            <p key={item} style={{ fontSize: '16px', marginBottom: '8px', fontWeight: '600' ,whiteSpace:"nowrap"}}>
              {item}
            </p>
          ))}
        </div>

        {/* Social Media */}
        <div>
          <h5 style={titleStyle}>Social Media</h5>

          <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
            <div style={socialStyle}><FaFacebookF color="#1877F2" size={18} /></div>
            <div style={socialStyle}><FaInstagram color="#E4405F" size={18} /></div>
            <div style={socialStyle}><FaTwitter color="#1DA1F2" size={18} /></div>
            <div style={socialStyle}><FaYoutube color="#FF0000" size={18} /></div>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div style={{
        marginTop: '30px',
        textAlign: 'center',
        fontSize: '13px',
        fontWeight: '600'
      }}>
        © 2026 BabyZone. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;