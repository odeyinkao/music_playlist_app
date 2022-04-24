import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import MusicDetails from "./MusicDetails";
import MusicForm from "./MusicForm";
import MusicList from "./MusicList";

const Musics = () => {
  return(
    <div>
      <Routes>             
        <Route path="" element={<MusicList />} />
        <Route path="new" element={<MusicForm />} /> 
        <Route path=":musicId/details" element={<MusicDetails />} /> 
        <Route path=":musicId/edit" element={<MusicForm />} /> 
      </Routes>
      <Outlet />
    </div>
  )
};

export default Musics;