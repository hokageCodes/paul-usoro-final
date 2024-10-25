import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from './components/loader/Loader';
import LandingPage from './pages/LandingPage';
import Footer from './components/footer/Footer';
import { Navbar } from './components/navbar/Navbar';
import AboutPage from './pages/AboutPage';
import ExpertisePage from './pages/ExpertisePage';
import AdrAdvocacyPage from './pages/expertise/AdrAdvocacyPage';
import BankingFinancePage from './pages/expertise/BankingFinancePage';
import CapitalMarkePage from './pages/expertise/CapitalMarkePage';
import CommunicationLawPage from './pages/expertise/CommunicationLawPage';
import EnergyEnvPage from './pages/expertise/EnergyEnvPage';
import MergersPage from './pages/expertise/MergersPage';
import AviationPage from './pages/expertise/Aviation';
import GeneralPracticePage from './pages/expertise/GeneralPractice';
import LabourLawPage from './pages/expertise/Labour';
import TransportLawPage from './pages/expertise/TransportLaw';
import ProjectFinancePage from './pages/expertise/ProjectFinance';
import MaritimePage from './pages/expertise/Maritime';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) return prev + 10;
        clearInterval(interval);
        setLoading(false);
        return prev;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {loading ? (
        <Loader percent={progress} />
      ) : (
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/firm" element={<AboutPage />} />
            <Route path="/expertise" element={<ExpertisePage />} />
            <Route path="/expertise/adr-and-advocacy" element={<AdrAdvocacyPage />} />
            <Route path="/expertise/banking-and-finance" element={<BankingFinancePage />} />
            <Route path="/expertise/capital-market-law" element={<CapitalMarkePage />} />
            <Route path="/expertise/communication-law" element={<CommunicationLawPage />} />
            <Route path="/expertise/energy-and-environmental-law" element={<EnergyEnvPage />} />
            <Route path="/expertise/general-commercial-practice" element={<GeneralPracticePage />} />
            <Route path="/expertise/labour-and-industrial-relations" element={<LabourLawPage />} />
            <Route path="/expertise/maritime" element={<MaritimePage />} />
            <Route path="/expertise/corporate-restructuring,-mergers-and-acquisitions" element={<MergersPage />} />
            <Route path="/expertise/project-finance" element={<ProjectFinancePage />} />
            <Route path="/expertise/transportation-law" element={<TransportLawPage />} />
            <Route path="/expertise/aviation" element={<AviationPage />} />
          </Routes>
          <Footer />
        </Router>
      )}
    </>
  );
};

export default App;
