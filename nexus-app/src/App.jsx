import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Hero from './components/Hero';
import AuthModal from './components/AuthModal';
import DashboardLayout from './components/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import AssistantPage from './pages/AssistantPage';
import CommunityPage from './pages/CommunityPage';
import ProductivityPage from './pages/ProductivityPage';
import LearningPage from './pages/LearningPage';

function AppContent() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const { currentUser } = useAuth();

  const handleGetStarted = () => {
    setAuthMode('register');
    setAuthModalOpen(true);
  };

  if (!currentUser) {
    return (
      <>
        <Hero onGetStarted={handleGetStarted} />
        <AuthModal 
          isOpen={authModalOpen} 
          onClose={() => setAuthModalOpen(false)} 
          defaultMode={authMode}
        />
      </>
    );
  }

  return (
    <Router>
      <DashboardLayout currentPage="dashboard">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/assistant" element={<AssistantPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/productivity" element={<ProductivityPage />} />
          <Route path="/learning" element={<LearningPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
