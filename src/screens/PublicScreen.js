/* This example requires Tailwind CSS v2.0+ */
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import AllMusics from '../components/Musics/AllMusics';
import Playlist from '../components/Musics/Playlist';
import PublicNavigation from '../components/Navigation/PublicNavigation';
import Pricing from '../components/Plans/Pricing';
import Footer from '../components/UI/Footer';

const PublicScreen = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicNavigation />
      <Routes>
        <Route path='/*' element={<Playlist className="w-6/12 my-4 m-auto flex-1"/>} />
        <Route path="/all-music" element={<AllMusics />} />
        <Route path="/plans" element={<Pricing />} />
      </Routes>
      <Footer />
    </div>
  )
};

export default PublicScreen;
