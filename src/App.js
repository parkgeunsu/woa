import React, { createContext, useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { back, animalType, icon, etc, iconStar, element, chImg, iconState, itemEquip, itemEtc, itemHole, itemMaterial, itemUpgrade, ringImg, sringImg, ssringImg, land, bgEffect, actionIcon, eff, menu } from 'components/ImgSet';
import { util } from 'components/Libs';
import Main from 'components/Main';
import Menu from 'components/Menu';
import Battle from 'components/Battle';
import Character from 'components/Character';
import Gacha from 'components/Gacha';
import Lineup from 'components/Lineup';
import Shop from 'components/Shop';
import ItemEnhancement from 'components/ItemEnhancement';
import CharacterEnhancement from 'components/CharacterEnhancement';
import Map from 'components/Map';
import 'css/root.css';
import { gameData, version } from 'gamedata/data';
import { save } from 'gamedata/savedata';
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
      speed: 2,
      bgSound: false,
      effSound: false,
    },
    images: {
      back: back,
      menu: menu,
      etc: etc,
      icon: icon,
      iconStar: iconStar,
      chImg: chImg,
      ringImg: ringImg,
      sringImg: sringImg,
      ssringImg: ssringImg,
      animalType: animalType,
      element: element,
      iconState: iconState,
      itemEquip: itemEquip,
      itemEtc: itemEtc,
      itemHole: itemHole,
      itemUpgrade: itemUpgrade,
      itemMaterial: itemMaterial,
      land: land,
      bgEffect: bgEffect,
      eff:eff,
      actionIcon:actionIcon,
    },
    gameData: {
      ...gameData,
    },
  }
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/")[1];
  const [page, setPage] = useState(location);
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
  useEffect(() => { //이미지 프리로드
    back.map((image) => {
      const img = new Image();
      img.src = image;
    });
    for (let v in icon) {
      const img = new Image();
      img.src = icon[v];
    }
    for (let v in etc) {
      const img = new Image();
      img.src = etc[v];
    }
    animalType.map((image) => {
      const img = new Image();
      img.src = image;
    });
    element.map((image) => {
      const img = new Image();
      img.src = image;
    });
    for (let v in chImg) {
      const img = new Image();
      img.src = chImg[v];
    }
    iconState.map((image) => {
      const img = new Image();
      img.src = image;
    });
    itemEquip.map((image) => {
      const img = new Image();
      img.src = image;
    });
    itemEtc.map((image) => {
      const img = new Image();
      img.src = image;
    });
    itemHole.map((image) => {
      const img = new Image();
      img.src = image;
    });
    itemMaterial.map((image) => {
      const img = new Image();
      img.src = image;
    });
    itemUpgrade.map((image) => {
      const img = new Image();
      img.src = image;
    });
    ringImg.map((image) => {
      const img = new Image();
      img.src = image;
    });
    sringImg.map((image) => {
      const img = new Image();
      img.src = image;
    });
    ssringImg.map((image) => {
      const img = new Image();
      img.src = image;
    });
    land.map((image) => {
      const img = new Image();
      img.src = image;
    });
    bgEffect.map((image) => {
      const img = new Image();
      img.src = image;
    });
    actionIcon.map((image) => {
      const img = new Image();
      img.src = image;
    });
    eff.map((image) => {
      const img = new Image();
      img.src = image;
    });
  }, []);
  const changeSaveData = (objData) => {
    setSaveData(objData);
    util.saveData('saveData', objData);
  }
  const scenario = {
    country: "korea",
    period: "joseon2",
    title: "LSS",
    stage: 0
  }
  return (
    <RootContainer value={data} >
      <div style={{height: "100%",overflowY:"overlay",overflowX:"hidden"}} className={`root ${page}`}>
        {location !== "battle" && (
          <Menu saveData={saveData} changePage={changePage} navigate={navigate} />
        )}
        <ContentContainer className="content">
          <Routes>
            <Route path="/" element={<Main changePage={changePage} />} />
            <Route path="/character" element={<Character saveData={saveData} changeSaveData={changeSaveData} />} />
            <Route path="/gacha" element={<Gacha saveData={saveData} changeSaveData={changeSaveData} />} />
            <Route path="/lineup" element={<Lineup saveData={saveData} changeSaveData={changeSaveData} />} />
            <Route path="/battle" element={<Battle saveData={saveData} changeSaveData={changeSaveData} changePage={changePage} navigate={navigate} scenario={scenario} />} />
            <Route path="/characterEnhancement" element={<CharacterEnhancement saveData={saveData} changeSaveData={changeSaveData} changePage={changePage} navigate={navigate} />} />
            <Route path="/itemEnhancement" element={<ItemEnhancement saveData={saveData} changeSaveData={changeSaveData} changePage={changePage} navigate={navigate} />} />
            <Route path="/shop" element={<Shop saveData={saveData} changeSaveData={changeSaveData} changePage={changePage} navigate={navigate} />} />
            <Route path="/map" element={<Map saveData={saveData} changeSaveData={changeSaveData} changePage={changePage} navigate={navigate} />} />
          </Routes>
        </ContentContainer>
        {/* <FooterContainer/> */}
      </div>
    </RootContainer>
  );
}

export default App;
