import Footer from "../footer/Footer";
import { Navbar } from "../navbar/Navbar";
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> 
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
