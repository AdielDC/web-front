import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Principal from './components/Principal/Principal';
import Registro from './components/Registro/Registro';
import Trajes from './components/Traje/Trajes';
import Login from './components/Login/Login';
import Tradicion from './components/Tradicion/Tradicion';
import Lengua from './components/Lengua/Lengua';
import Anuncios from './components/Anuncios/Anuncios';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/Principal' element={<Principal />} />
          <Route path='/Registro' element={<Registro />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Trajes' element={<Trajes />} />
          <Route path='/Tradicion' element={<Tradicion />} />
          <Route path='/Lengua' element={<Lengua />} />
          <Route path='/Anuncios' element={<Anuncios />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
