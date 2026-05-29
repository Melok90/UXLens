import React from 'react';
import Hero from '../components/Hero';
import Filters from '../components/Filters';
import ComparisonGrid from '../components/ComparisonGrid';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Filters />
      <ComparisonGrid />
    </>
  );
}
