import React, { useLayoutEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { version, gameData } from 'gamedata/data';
import { saveData } from 'gamedata/savedata';
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
  ${'' /* min-height: 35px; */}
`;
const App = () => {
  const [page, setPage] = useState("main");
  const changePage = (pagename) => {
    setPage(pagename);
  }
  useLayoutEffect(() => {
    const storageVer = localStorage.getItem("version");
    const saveCache = localStorage.getItem("savedata");
    if(version !== storageVer){
      localStorage.setItem("version", version);
      localStorage.setItem("gamedata", JSON.stringify(gameData));
    }
    if(!saveCache){
      localStorage.setItem("savedata", JSON.stringify(saveData));
    }
  }, [])
  return (
    <RootContainer className={`root ${page}`}>
      <Menu changePage={changePage} />
      <ContentContainer className="content">
        <Routes>
          <Route path="/" element={<Main changePage={changePage} />} />
          <Route path="/character" element={<Character />} />
          <Route path="/gacha" element={<Gacha />} />
          <Route path="/lineup" element={<Lineup />} />
          <Route path="/battle" element={<Battle />} />
        </Routes>
      </ContentContainer>
      {/* <FooterContainer/> */}
    </RootContainer>
  );
}

export default App;
