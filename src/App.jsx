import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ServerDetails from "./pages/ServerDetails";
import NavBar from "./pages/NavBar";
import Home from "./pages/Home";
import Forms from "./pages/Forms";
import KernelSpace from "./pages/KernelSpace";
import BluePrint from "./pages/BluePrint";
import Foreman from './pages/Foreman';

function App() {
  return (
    <>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checker" element={<Forms />} />
          <Route path="/serverdetails" element={<ServerDetails />} />
          <Route path="/kernelspace" element={<KernelSpace />} />
          <Route path="/BluePrint" element={<BluePrint />} />
          <Route path="/Foreman" element={<Foreman/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
