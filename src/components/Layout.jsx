import Navbar from "./Navbar";
import CategoryBar from "./CategoryBar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <CategoryBar />
      {children}
    </>
  );
};

export default Layout;