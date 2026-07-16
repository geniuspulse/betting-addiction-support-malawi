import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Assessment from './pages/Assessment';
import Programs from './pages/Programs';
import Counsellors from './pages/Counsellors';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <nav className="bg-blue-700 text-white px-8 py-4 flex gap-6">
        <Link to="/" className="font-bold text-lg">BASM</Link>
        <Link to="/programs">Programs</Link>
        <Link to="/counsellors">Counsellors</Link>
        <Link to="/assessment">Assessment</Link>
        <Link to="/dashboard">My Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/counsellors" element={<Counsellors />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
