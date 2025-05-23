import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import TaskManagementSection from '@/components/sections/TaskManagementSection';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Le composant Home orchestre les sections de la page d'accueil
const Home: React.FC = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <TaskManagementSection />
      <Footer />
    </>
  );
};

export default Home;