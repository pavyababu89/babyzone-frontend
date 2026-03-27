import Navbar from "../components/Navbar";
import CategoryBar from "../components/CategoryBar";
import Footer from "../components/Footer";
import { useState } from "react";

const Forum = () => {
  const forumCards = [
    { title: "Pregnancy", image: "/images/f1.jpg" },
    { title: "Parenting", image: "/images/class3.webp" },
    { title: "Childcare", image: "/images/f2.jpg" },
    { title: "Product Reviews", image: "/images/f3.jpg" }
  ];

  const blogs = [
    {
      title: "The Story of My Rainbow Baby",
      image: "/images/f4.jpg",
      text: "What does it mean when I say that my daughter is my 'Rainbow Baby'? A 'Rainbow Baby' is a baby that is born following a miscarriage or an infant loss. Just like a beautiful and...."
    },
    {
      title: "Baby Dry Skin: Symptoms, Causes and Treatment",
      image: "/images/f5.jpg",
      text: "For a parent, their baby's health is of utmost importance. This means taking care of their internal health by ensuring the right kind of nutrition and choosing products that not only secure their well-being but also their comfort. .."
    },
    {
      title: "Raisins for babies- Health benefits and risks",
      image: "/images/f6.jpg",
      text: "Many of us love a good old raisin- they are small, wrinkled packets of energy that have been around since medieval times and are famous for being a natural source of minerals, vitamins, and carbohydrates..."
    },
    {
      title: "Hernia in Babies – Types, Causes, Signs and Treatment",
      image: "/images/f7.webp",
      text: "A hernia is a lump that develops under the skin, in the tummy or groin region, and in variable sizes. When the muscles across the tummy area and the pelvic region weaken or develop a gap, it can lead to the protrusion of organs ..."
    }
  ];

  const groups = [
    { name: "Pregnancy", image: "/images/f1.jpg" },
    { name: "Parenting", image: "/images/class3.webp" },
    { name: "Child care", image: "/images/f2.jpg" },
    { name: "Product reviews", image: "/images/f3.jpg" }
  ];

  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showForumChat, setShowForumChat] = useState(false);
  const [activeGroup, setActiveGroup] = useState("Parenting");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, sender: "Benny", text: "Hi everyone !", time: "12:00 AM, 25/08/2025", self: false },
    { id: 2, sender: "User2", text: "Hi everyone !", time: "1:00 PM, 25/08/2025", self: false },
    { id: 3, sender: "User3", text: "Hi everyone !", time: "12:00 AM, 25/08/2025", self: false },
    { id: 4, sender: "me", text: "Hi everyone !", time: "12:00 AM, 25/08/2025", self: true }
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        sender: "me",
        text: message,
        time: new Date().toLocaleString("en-IN", { timeStyle: "short", dateStyle: "short" }),
        self: true
      }]);
      setMessage("");
    }
  };

  return (
    <>
      <Navbar />
      <CategoryBar />

      {/* MAIN FORUM PAGE */}
      {!showForumChat && (
        <div style={container}>

          <p style={breadcrumb}>Home / Forum</p>

          <button style={joinBtn} onClick={() => setShowJoinModal(true)}>Join Forum</button>

          {/* CATEGORY CARDS */}
          <div style={cardRow}>
            {forumCards.map((item, index) => (
              <div key={index} style={card}>
                <img src={item.image} style={cardImg} alt={item.title} />
                <div style={overlay}>
                  <div>
                    <p style={cardTitle}>{item.title}</p>
                    <p style={cardSub}>Join forum to ask or share something</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <button style={smallBtn} onClick={() => setShowJoinModal(true)}>Join</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* BLOG SECTION */}
          <div style={blogHeader}>
            <button style={joinBtn}>Blogs</button>
            <span style={viewMore}>View more</span>
          </div>

          <div style={blogGrid}>
            {blogs.map((item, index) => (
              <div key={index} style={blogCard}>
                <img src={item.image} style={blogImg} alt={item.title} />
                <div>
                  <h4>{item.title}</h4>
                  <p style={blogText}>{item.text}</p>
                  <button style={smallBtn}>Read more</button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* FORUM CHAT PAGE */}
      {showForumChat && (
        <div style={{ padding: "20px 40px", fontFamily: "Quicksand, sans-serif" }}>

          <p style={breadcrumb}>Home / Forum / Chat</p>

          <div style={{ display: "flex", gap: "20px", height: "600px" }}>

            {/* LEFT SIDEBAR */}
            <div style={sideBar}>
              <img src="/images/f1.jpg" style={avatarImg} alt="avatar" />
              <div style={sideItem}>🏠<span>Home</span></div>
              <div style={{ ...sideItem, background: "#FFB2E6", borderRadius: "10px" }}>
                💬<span>Chat</span>
              </div>
              <div style={sideItem}>🔔<span>Notification</span></div>
              <div
                style={{ ...sideItem, marginTop: "auto", cursor: "pointer" }}
                onClick={() => setShowForumChat(false)}
              >
                🚪<span>Leave</span>
              </div>
            </div>

            {/* GROUPS PANEL */}
            <div style={groupPanel}>
              <h3 style={{ marginBottom: "16px", fontSize: "18px" }}>Groups</h3>
              {groups.map((g) => (
                <div
                  key={g.name}
                  onClick={() => setActiveGroup(g.name)}
                  style={{
                    ...groupItem,
                    background: activeGroup === g.name ? "#FFB2E6" : "#fff",
                    border: activeGroup === g.name ? "2px solid #FFB2E6" : "1px solid #ddd"
                  }}
                >
                  <img src={g.image} style={groupImg} alt={g.name} />
                  <span style={{ fontWeight: "600", flex: 1, fontSize: "15px" }}>{g.name}</span>
                  <span style={{ fontSize: "13px", color: "#555" }}>500 Users</span>
                </div>
              ))}
            </div>

            {/* CHAT PANEL */}
            <div style={chatPanel}>

              {/* CHAT HEADER */}
              <div style={chatHeader}>
                <img src="/images/f1.jpg" style={chatAvatar} alt="Benny" />
                <div>
                  <p style={{ margin: 0, fontWeight: "700", fontSize: "16px" }}>Benny</p>
                  <p style={{ margin: 0, fontSize: "13px", color: "#555" }}>Active</p>
                </div>
                <span style={{ marginLeft: "auto", fontSize: "22px", cursor: "pointer" }}>⋮</span>
              </div>

              {/* MESSAGES */}
              <div style={chatBody}>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      display: "flex",
                      flexDirection: msg.self ? "row-reverse" : "row",
                      alignItems: "flex-end",
                      gap: "10px",
                      marginBottom: "16px"
                    }}
                  >
                    <img
                      src={msg.self ? "/images/f3.jpg" : "/images/f2.jpg"}
                      style={chatAvatar}
                      alt="user"
                    />
                    <div style={{ maxWidth: "60%" }}>
                      <div style={{
                        background: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: "12px",
                        padding: "10px 16px",
                        fontSize: "15px"
                      }}>
                        {msg.text}
                      </div>
                      <p style={{
                        fontSize: "12px",
                        color: "#888",
                        margin: "4px 0 0",
                        textAlign: msg.self ? "right" : "left"
                      }}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* MESSAGE INPUT */}
              <div style={chatFooter}>
                <input
                  style={chatInput}
                  placeholder="Type Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
                />
                <button style={sendBtn} onClick={sendMessage}>➤</button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* JOIN MODAL */}
      {showJoinModal && (
        <div style={modalOverlay}>
          <div style={modalBox}>

            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Sign in to Join</h2>

            <label style={modalLabel}>Name</label>
            <input style={modalInput} placeholder="Your Name" />

            <label style={modalLabel}>Email</label>
            <input style={modalInput} placeholder="Email Id" />

            <label style={modalLabel}>Password</label>
            <div style={{ position: "relative" }}>
              <input style={modalInput} type="password" placeholder="Password" />
              <span style={eyeIcon}>🙈</span>
            </div>

            <p style={{ textAlign: "right", color: "#000", cursor: "pointer", fontWeight: "600" }}>
              Forget password?
            </p>

            <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
              <button
                style={{ ...modalBtn, background: "#f0a500" }}
                onClick={() => setShowJoinModal(false)}
              >
                Back
              </button>
              <button
                style={{ ...modalBtn, background: "#FFD83B" }}
                onClick={() => {
                  setShowJoinModal(false);
                  setShowForumChat(true);
                }}
              >
                Register
              </button>
            </div>

          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

/* ── STYLES ── */

const container = { padding: "40px", fontFamily: "Quicksand, sans-serif" };
const breadcrumb = { color: "#777", marginBottom: "10px" };

const joinBtn = {
  background: "#FFD83B", border: "none", padding: "10px 60px",
  borderRadius: "10px", fontWeight: "600", marginBottom: "20px",
  fontFamily: "Quicksand", fontSize: "20px", cursor: "pointer"
};

const cardRow = {
  display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
  gap: "20px", marginBottom: "30px"
};

const card = {
  height: "290px", borderRadius: "10px",
  overflow: "hidden", position: "relative", border: "2px solid black"
};

const cardImg = { width: "100%", height: "100%", objectFit: "cover" };

const overlay = {
  position: "absolute", bottom: "0",
  background: "rgba(0,0,0,0.6)", color: "#fff",
  width: "100%", padding: "10px", boxSizing: "border-box",
  display: "flex", flexDirection: "column", alignItems: "flex-start"
};

const cardTitle = { fontWeight: "600", fontSize: "16px", margin: "0" };
const cardSub = { fontSize: "14px", margin: "0" };

const smallBtn = {
  background: "#FFD83B", border: "none", padding: "8px 30px",
  borderRadius: "6px", marginTop: "8px", fontWeight: "600",
  fontSize: "17px", cursor: "pointer", alignSelf: "flex-end", fontFamily: "Quicksand"
};

const blogHeader = { display: "flex", justifyContent: "space-between", alignItems: "center" };
const viewMore = { color: "#007bff", cursor: "pointer", fontSize: "20px", fontWeight: "600" };
const blogGrid = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" };

const blogCard = {
  display: "flex", gap: "15px", border: "1px solid #ccc",
  borderRadius: "10px", padding: "15px", minHeight: "250px"
};

const blogImg = {
  width: "140px", height: "160px", objectFit: "cover",
  borderRadius: "10px", flexShrink: 0
};

const blogText = { fontSize: "16px", color: "#000" };

const modalOverlay = {
  position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
  background: "rgba(0,0,0,0.4)", display: "flex",
  justifyContent: "center", alignItems: "center", zIndex: 9999
};

const modalBox = {
  background: "#F8A8C7", padding: "40px",
  borderRadius: "20px", width: "500px", fontFamily: "Quicksand, sans-serif"
};

const modalLabel = { fontWeight: "700", fontSize: "18px", display: "block", marginBottom: "6px" };

const modalInput = {
  width: "100%", padding: "14px", borderRadius: "10px",
  border: "none", marginBottom: "16px", fontSize: "16px", boxSizing: "border-box"
};

const eyeIcon = {
  position: "absolute", right: "14px", top: "50%",
  transform: "translateY(-80%)", cursor: "pointer"
};

const modalBtn = {
  padding: "12px 40px", border: "none", borderRadius: "10px",
  fontWeight: "700", fontSize: "16px", cursor: "pointer", fontFamily: "Quicksand"
};

const sideBar = {
  width: "120px", border: "1px solid #ddd", borderRadius: "12px",
  padding: "16px 10px", display: "flex", flexDirection: "column",
  alignItems: "center", gap: "18px"
};

const avatarImg = { width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover" };

const sideItem = {
  display: "flex", flexDirection: "column", alignItems: "center",
  gap: "4px", fontSize: "13px", fontWeight: "600", padding: "8px",
  width: "100%", textAlign: "center", cursor: "pointer"
};

const groupPanel = {
  width: "280px", border: "1px solid #ddd",
  borderRadius: "12px", padding: "16px", overflowY: "auto"
};

const groupItem = {
  display: "flex", alignItems: "center", gap: "10px",
  padding: "10px", borderRadius: "10px", marginBottom: "10px", cursor: "pointer"
};

const groupImg = { width: "45px", height: "45px", borderRadius: "50%", objectFit: "cover" };

const chatPanel = {
  flex: 1, border: "1px solid #ddd", borderRadius: "12px",
  display: "flex", flexDirection: "column", overflow: "hidden"
};

const chatHeader = {
  background: "#FFB2E6", padding: "14px 20px",
  display: "flex", alignItems: "center", gap: "12px"
};

const chatAvatar = { width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" };

const chatBody = { flex: 1, padding: "20px", overflowY: "auto", background: "#fff" };

const chatFooter = {
  display: "flex", gap: "10px", padding: "14px 20px", borderTop: "1px solid #eee"
};

const chatInput = {
  flex: 1, padding: "12px 16px", borderRadius: "20px",
  border: "1px solid #ddd", fontSize: "15px", fontFamily: "Quicksand"
};

const sendBtn = {
  background: "#FFB2E6", border: "none", borderRadius: "50%",
  width: "44px", height: "44px", fontSize: "18px", cursor: "pointer"
};

export default Forum;