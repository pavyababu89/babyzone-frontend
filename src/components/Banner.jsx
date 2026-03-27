import { useState, useEffect } from "react";

const images = [
  "/images/Banner.png",
  "/images/Banner1.png",
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  // 👉 AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // every 3 sec

    return () => clearInterval(interval);
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div style={{
      position: "relative",
      margin: "20px 0px",
      borderRadius: "5px",
      overflow: "hidden"
    }}>

      {/* IMAGE */}
      <img
        src={images[current]}
        alt="banner"
        style={{
          width:"100%",
          height: "400px",
          objectFit: "cover"
        }}
      />

      {/* LEFT ARROW */}
      <div onClick={prevSlide} style={arrowLeft}>
        ❮
      </div>

      {/* RIGHT ARROW */}
      <div onClick={nextSlide} style={arrowRight}>
        ❯
      </div>

    </div>
  );
};

const arrowCommon = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  background: "black",
  color: "white",
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontSize: "20px",
  zIndex: 1
};

const arrowLeft = {
  ...arrowCommon,
  left: "15px"
};

const arrowRight = {
  ...arrowCommon,
  right: "15px"
};

export default Banner;