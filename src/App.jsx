import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from './components/loader/Loader';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import AdminLogin from './components/admin/AdminLogin';
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
import ContactForm from './pages/ContactPage';
import CareersPage from './pages/CareersPage';
import PeoplePage from './pages/admin/PeoplePage';
import ProtectedRoute from '../ProtectedRoute';
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import PublicLayout from './components/layout/PublicLayout';
import PeopleUpload from './pages/admin/PeopleUpload';
import PeoplesPage from './pages/PeoplesPage';

// This component contains the routing logic
const AppContent = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/firm" element={<AboutPage />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/our-people" element={<PeoplesPage />} />
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
        <Route path="*" element={<LandingPage />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute redirectTo="/admin-login" />}>
        <Route element={<AdminLayout />}>
          <Route path="" element={<AdminDashboard />} />  {/* Default admin route */}
          <Route path="people" element={<PeoplePage />} />  {/* People page route */}
          <Route path="upload/people" element={<PeopleUpload />} />  {/* People page route */}
        </Route>
      </Route>

      <Route path="/admin-login" element={<AdminLogin />} />
    </Routes>
  );
};

// Main App component
const App = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 10, 100));
      if (progress === 100) {
        clearInterval(interval);
        setLoading(false);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <Router>
      {loading ? <Loader progress={progress} /> : <AppContent />}
    </Router>
  );
};

export default App;
