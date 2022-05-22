import React, { useLayoutEffect, useState, createContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { version, gameData } from 'gamedata/data';
import { util } from 'components/Libs';
import { save } from 'gamedata/savedata';
import Menu from 'components/Menu';
import Main from 'components/Main';
import Character from 'components/Character';
import Gacha from 'components/Gacha';
import Lineup from 'components/Lineup';
import Battle from 'components/Battle';
import 'css/root.css';

import { chImg, chStyleImg, ringImg, sringImg, ssringImg, animalType, itemEquip, itemEtc, itemHole, itemUpgrade, itemMaterial } from 'components/ImgSet';

export const AppContext = createContext();

const RootContainer = styled(AppContext.Provider)`
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
  const data = {
    images: {
      chImg: chImg,
      chStyleImg: chStyleImg,
      ringImg: ringImg,
      sringImg: sringImg,
      ssringImg: ssringImg,
      animalType: animalType,
      itemEquip: itemEquip,
      itemEtc: itemEtc,
      itemHole: itemHole,
      itemUpgrade: itemUpgrade,
      itemMaterial: itemMaterial,
    },
    gameData: {
      ...gameData,
    }
  }
  const [page, setPage] = useState("main");
  const slotIdx = 'all';
  const changePage = (pagename) => {
    setPage(pagename);
  }

  const storageVer = util.loadData("version");
  let useSaveData = {}
  if (storageVer === version){ //데이터가 저장되어 있을때
    useSaveData = util.loadData('saveData'); //저장된 데이터
  } else {
    useSaveData = save; //가상데이터
    util.saveData('saveData', save);
    util.saveData('version', version);
  }

  const [saveData, setSaveData] = useState(util.saveCharacter({
    saveData: useSaveData, 
    slotIdx: slotIdx,
    gameData: gameData,
  }));
  const changeSaveData = (objData) => {
    setSaveData(objData);
    // setSaveData(util.saveCharacter({
    //   saveData: objData,
    //   slotIdx: slotIdx,
    //   gameData: gameData,
    // }));
    util.saveData('saveData', objData);
  }
  return (
    <RootContainer value={data} className={`root ${page}`}>
      <Menu saveData={saveData} changePage={changePage} />
      <ContentContainer className="content">
        <Routes>
          <Route path="/" element={<Main changePage={changePage} />} />
          <Route path="/character" element={<Character saveData={saveData} changeSaveData={changeSaveData} />} />
          <Route path="/gacha" element={<Gacha saveData={saveData} changeSaveData={changeSaveData} />} />
          <Route path="/lineup" element={<Lineup saveData={saveData} changeSaveData={changeSaveData} />} />
          <Route path="/battle" element={<Battle saveData={saveData} changeSaveData={changeSaveData} />} />
        </Routes>
      </ContentContainer>
      {/* <FooterContainer/> */}
    </RootContainer>
  );
}

export default App;
