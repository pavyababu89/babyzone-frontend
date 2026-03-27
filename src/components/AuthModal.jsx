import { useState } from "react";
import API from "../services/api";

const AuthModal = ({ type, onClose, switchMode, setUser }) => {

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      if (type === "login") {
        const res = await API.post("login/", { email, password });

            // ✅ Save user
            localStorage.setItem("user", email);
            setUser(email); 

            alert("Login successful ✅");
            onClose();
      } else {
        await API.post("register/", { name, email, password });
        alert("Registered successfully ✅");
      }

      setError("");
      onClose();

    } catch (err) {
    console.log(err.response?.data || err); 
      setError("Something went wrong ❌");
    }
  };

  return (
    <div style={overlay}>
      <div style={modal}>

        {/* CLOSE */}
        <div style={close} onClick={onClose}>✕</div>

        <h2 style={{ textAlign: "center" }}>
          {type === "login" ? "Log In" : "Register"}
        </h2>

        <div style={content}>

          {/* LEFT IMAGE */}
          <img
            src={type === "login" ? "/images/f7.webp" : "/images/about.jpg"}
            style={image}
            alt="auth"
          />

          {/* FORM */}
          <div style={form}>

            {/* NAME (ONLY REGISTER) */}
            {type === "register" && (
              <>
                <label style={label}>Name</label>
                <input
                  style={input}
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </>
            )}

            {/* EMAIL */}
            <label style={label}>Email</label>
            <input
              style={input}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* PASSWORD */}
            <label style={label}>Password</label>

            <div style={{ position: "relative", width: "100%" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                style={input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span
                style={eye}
                onClick={() => setShowPassword(!showPassword)}
              >
                👁
              </span>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <p style={{ color: "red", fontSize: "14px" }}>
                {error}
              </p>
            )}

            {/* FORGOT PASSWORD */}
            {type === "login" && (
              <p style={{ color: "red", textAlign: "right", cursor: "pointer" }}>
                Forgot password?
              </p>
            )}

            {/* BUTTON */}
            <button style={btn} onClick={handleSubmit}>
              {type === "login" ? "Log In" : "Register"}
            </button>

            {/* SWITCH */}
            <p style={{ textAlign: "center" }}>
              {type === "login"
                ? "Don’t have an account?"
                : "Already have an account?"}

              <span
                onClick={switchMode}
                style={{ color: "red", cursor: "pointer", marginLeft: "5px" }}
              >
                {type === "login" ? "Register" : "Log In"}
              </span>
            </p>

            <p style={{ textAlign: "center" }}>Or</p>

            <button style={socialBtn}>Continue with Google</button>
            <button style={socialBtn}>Continue with Facebook</button>

          </div>
        </div>
      </div>
    </div>
  );
};
const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999
};

const modal = {
  width: "900px",
  background: "#F8A8C7",
  borderRadius: "20px",
  padding: "20px",
  position: "relative",
  fontFamily: "Quicksand, sans-serif"
};

const close = {
  position: "absolute",
  top: "15px",
  right: "20px",
  cursor: "pointer",
  fontSize: "20px"
};

const content = {
  display: "flex",
  gap: "20px"
};

const image = {
  width: "50%",
  borderRadius: "15px"
};

const form = {
  width: "50%",
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};

const label = {
  fontSize: "16px",
  fontWeight: "600"
};

const input = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  width: "100%"
};

const btn = {
  background: "#FFD83B",
  padding: "10px",
  border: "none",
  borderRadius: "8px",
  marginTop: "10px",
  cursor: "pointer"
};

const socialBtn = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  marginTop: "5px"
};

const eye = {
  position: "absolute",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer"
};
export default AuthModal;