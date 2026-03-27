import Navbar from "../components/Navbar";
import CategoryBar from "../components/CategoryBar";

import Banner from "../components/Banner";
import CategoryCircles from "../components/CategoryCircles";
import NewArrivals from "../components/NewArrivals";
import TopSelling from "../components/TopSelling";
import TopBrands from "../components/TopBrands";
import HappyCustomers from "../components/HappyCustomers";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <CategoryBar />

      <Banner />
      <CategoryCircles />
      <NewArrivals />
      <TopSelling />
      <TopBrands />
      <HappyCustomers />
      <Footer />
    </>
  );
};

export default Home;