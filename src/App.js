import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Menu from 'components/Menu';
import Main from 'components/Main';
import Character from 'components/Character';
import Gacha from 'components/Gacha';
import Lineup from 'components/Lineup';
import Battle from 'components/Battle';
import 'css/root.css';

const RootContainer = styled.div`
  height: 100%;
  overflow-y: overlay;
  overflow-x: hidden;
`;

const ContentContainer = styled.div`
  display: flex;
  position: relative;
  flex: 1;
  height: 100%;
  background: #fec;
  overflow: hidden;
`;
const FooterContainer = styled.div`
  min-height: 35px;
`;

const App = () => {
  return (
    <RootContainer className="root">
      <Menu />
      <ContentContainer className="content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/character" element={<Character />} />
          <Route path="/gacha" element={<Gacha />} />
          <Route path="/lineup" element={<Lineup />} />
          <Route path="/battle" element={<Battle />} />
        </Routes>
      </ContentContainer>
      <FooterContainer/>
    </RootContainer>
  );
}

export default App;
