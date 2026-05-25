import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Filters from './components/Filters';
import ComparisonGrid from './components/ComparisonGrid';
import Footer from './components/Footer';
import SystemsPage from './pages/SystemsPage';

export type ComponentState = 'default' | 'hover' | 'focus' | 'disabled' | 'error' | 'open' | 'alert' | 'transactional' | 'acknowledgment' | 'loading';
export type ComponentVariant = 'default' | 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'icon' | 'alert' | 'transactional' | 'acknowledgment';
export type ComponentType = 'button' | 'input' | 'switch' | 'select' | 'datepicker' | 'modal' | 'radio' | 'tag';

function HomePage() {
  return (
    <>
      <Hero />
      <Filters />
      <ComparisonGrid />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 md:px-10 py-12 flex flex-col gap-12">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/systems" element={<SystemsPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

