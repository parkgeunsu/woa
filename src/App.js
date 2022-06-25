import Battle from 'components/Battle';
import Character from 'components/Character';
import Gacha from 'components/Gacha';
import { animalType, element, chImg, chStyleImg, iconElement, iconState, itemEquip, itemEtc, itemHole, itemMaterial, itemUpgrade, ringImg, sringImg, ssringImg, land, bgEffect, defenceIcon, eff } from 'components/ImgSet';
import { util } from 'components/Libs';
import Lineup from 'components/Lineup';
import Main from 'components/Main';
import Menu from 'components/Menu';
import 'css/root.css';
import { gameData, version } from 'gamedata/data';
import { save } from 'gamedata/savedata';
import React, { createContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';


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
  .skillEffect {
    position:absolute;left:0;top:0;right:0;bottom:0;z-index:10;pointer-events:none;
    .skillName{
      position:absolute;font-size:30px;transform:translate(-50%,-50%);white-space:nowrap;transition:all 1s ease-in-out;
    }
    .oldName{
      left:50%;top:50%;opacity:0;text-align:center;
    }
    .skillLv{
      color:var(--color-w);
    }
    .skillExp{
      position:relative;
      margin:10px 0 0 0;
      width:150px;
      height:15px;
      border-radius:10px;
      overflow:hidden;
      background-color:var(--color-w);
      em{
        position:absolute;left:0;top:0;bottom:0;
        border-radius:10px;
        background-color:var(--color-blue);
      }
    }
    .newName1{
      left:0;top:100%;
    }
    .newName2{
      left:100%;top:0;
    }
    &.on .skillName{
      left:50%;top:50%;
    }
    &.fadeIn .skillName{
      opacity:1;
    }
    &.fadeOut .skillName{
      opacity:0;
    }
    &.effect0{
      color:var(--color-w);
      text-shadow:0 0 5px var(--color-w),0 0 8px var(--color-w),0 0 20px var(--color-w);
    }
    &.effect1{
      color:var(--color-purple);
      text-shadow:0 0 5px var(--color-w),0 0 8px var(--color-purple),0 0 20px var(--color-purple);
    }
    &.effect2{
      color:var(--color-yellow);
      text-shadow:0 0 5px var(--color-w),0 0 8px var(--color-yellow),0 0 20px var(--color-yellow);
    }
    &.effect3{
      color:var(--color-blue);
      text-shadow:0 0 5px var(--color-w),0 0 8px var(--color-blue),0 0 20px var(--color-blue);
    }
    &.effect4{
      color:var(--color-red);
      text-shadow:0 0 5px var(--color-w),0 0 8px var(--color-red),0 0 20px var(--color-red);
    }
    &.effect5{
      color:var(--color-lightblue);
      text-shadow:0 0 5px var(--color-w),0 0 8px var(--color-lightblue),0 0 20px var(--color-lightblue);
    }
    &.effect6{
      color:var(--color-green);
      text-shadow:0 0 5px var(--color-w),0 0 8px var(--color-green),0 0 20px var(--color-green);
    }
  }
`;
const FooterContainer = styled.div`
  ${'' /* min-height: 35px; */}
`;

const App = () => {
  const data = {
    setting: {
      speed: 1,
      bgSound: false,
      effSound: false,
    },
    images: {
      chImg: chImg,
      chStyleImg: chStyleImg,
      ringImg: ringImg,
      sringImg: sringImg,
      ssringImg: ssringImg,
      animalType: animalType,
      element: element,
      iconState: iconState,
      iconElement: iconElement,
      itemEquip: itemEquip,
      itemEtc: itemEtc,
      itemHole: itemHole,
      itemUpgrade: itemUpgrade,
      itemMaterial: itemMaterial,
      land: land,
      bgEffect: bgEffect,
      defenceIcon: defenceIcon,
      eff:eff,
      defenceIcon:defenceIcon,
    },
    gameData: {
      ...gameData,
    },
    setting: {
      speed: 1,
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
  const [saveData, setSaveData] = useState(
    () => {
      if (useSaveData.ch[0].bSt0) { //캐릭 추가 능력치가 없을 경우
        util.saveData('saveData', useSaveData);
        return useSaveData;
      } else {
        const sData = util.saveCharacter({
          saveData: useSaveData, 
          slotIdx: slotIdx,
          gameData: gameData,
        });
        util.saveData('saveData', sData);
        return sData;
      }
    }
  );
    
  const changeSaveData = (objData) => {
    setSaveData(objData);
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
