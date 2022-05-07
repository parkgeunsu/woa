import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Main from './pages/Main';
import Character from './pages/Character';
import Battle from './pages/Battle';
import Gacha from './pages/Gacha';

const App = () => {
  return (
    <div className="woa">
      <Link to="/">메인</Link>
      <Link to="/character">캐릭</Link>
      <Link to="/battle">전투</Link>
      <Link to="/gacha">뽑기</Link>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/character" element={<Character />} />
        <Route path="/battle" element={<Battle />} />
        <Route path="/gacha" element={<Gacha />} />
      </Routes>
    </div>
  );
}

export default App;
