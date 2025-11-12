import { Routes, Route } from 'react-router-dom'; 
import { AppShell } from '@mantine/core';

// Your existing page imports
import { RegisterPage } from './components/pages/RegisterPage';
import { Header } from './components/Header';
import { Hero } from './sections/Hero';
import { Footer } from './sections/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { LoginPage } from './components/pages/LoginPage';
import { DashboardPage } from './components/pages/DashboardPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { FormPage } from './components/pages/FormPage';
import { VerifyEmailPage } from './components/pages/VerifyEmailPage';
import { AboutPage } from './components/pages/AboutPage';
import { ResultsPage } from './components/pages/ResultsPage';
import { ContactPage } from './components/pages/ContactPage';
import { AuthCallbackPage } from './components/pages/AuthCallbackPage';

// --- ΠΡΟΣΘΗΚΗ ΤΩΝ IMPORTS ΓΙΑ ΤΙΣ ΝΕΕΣ ΣΕΛΙΔΕΣ ---
import { RequestPasswordResetPage } from './components/pages/RequestPasswordResetPage';
import { ResetPasswordPage } from './components/pages/ResetPasswordPage';


function App() {
  
  const HEADER_HEIGHT = 65;
  const HEADER_PADDING_TOP = 20;
  const FOOTER_HEIGHT = 280; 

  return (
    <AppShell
      header={{ height: HEADER_HEIGHT + HEADER_PADDING_TOP }}
      footer={{ height: FOOTER_HEIGHT }}
      padding="md"
    >
      <ScrollToTop />
      <AppShell.Header 
        withBorder={false} 
        style={{ background: 'transparent', paddingTop: `${HEADER_PADDING_TOP}px` }}
      >
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <Routes>
          {/* Existing Routes */}
          <Route path="/" element={<Hero />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />

          {/* --- ΠΡΟΣΘΗΚΗ ΤΩΝ ΝΕΩΝ ROUTES ΕΔΩ --- */}
          <Route path="/request-password-reset" element={<RequestPasswordResetPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/project/:projectId"
            element={
              <ProtectedRoute>
                <FormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/project/:projectId/results"
            element={
              <ProtectedRoute>
                <ResultsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AppShell.Main>
      
      <AppShell.Footer style={{ position: 'static' }}>
        <Footer /> 
      </AppShell.Footer>
    </AppShell>
  );
}

export default App;