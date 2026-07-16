import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './LanguageContext';
import Navbar from './components/Navbar';
import SOSButton from './components/SOSButton';

// Pages
import Home from './pages/Home';
import Assessment from './pages/Assessment';
import Dashboard from './pages/Dashboard';
import Checkin from './pages/Checkin';
import RecoveryWallet from './pages/RecoveryWallet';
import UrgeSupportPage from './pages/UrgeSupportPage';
import Programs from './pages/Programs';
import Training from './pages/Training';
import Counsellors from './pages/Counsellors';
import Community from './pages/Community';
import Library from './pages/Library';
import Emergency from './pages/Emergency';
import Achievements from './pages/Achievements';
import FamilySupport from './pages/FamilySupport';

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-blue-600 selection:text-white relative">
        <div>
          {/* Main Navigation */}
          <Navbar />

          {/* Main App Content routes */}
          <main className="pb-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/assessment" element={<Assessment />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/checkin" element={<Checkin />} />
              <Route path="/recovery-wallet" element={<RecoveryWallet />} />
              <Route path="/urgency-support" element={<UrgeSupportPage />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/training" element={<Training />} />
              <Route path="/counsellors" element={<Counsellors />} />
              <Route path="/community" element={<Community />} />
              <Route path="/library" element={<Library />} />
              <Route path="/emergency" element={<Emergency />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/family-support" element={<FamilySupport />} />
            </Routes>
          </main>
        </div>

        {/* Global floating SOSButton always visible */}
        <SOSButton />

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 py-6 text-center text-xs border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 space-y-1">
            <p className="font-semibold text-slate-200">© 2026 Betting Addiction Support Malawi (BASM)</p>
            <p>Tiyeni tizithandizana • Free and confidential rehabilitation resources</p>
          </div>
        </footer>
      </div>
    </LanguageProvider>
  );
}
