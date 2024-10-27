/* eslint-disable react/prop-types */
import { Navbar } from './components/navbar/Navbar';
import Footer from './components/footer/Footer';

const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
    <Footer />
  </>
);

export default PublicLayout;
