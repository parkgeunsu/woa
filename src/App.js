import React, { createContext, useEffect, useState, useRef } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { back, animalType, icon, etc, iconStar, element, chImg, iconState, itemEtc, itemHole, itemMaterial, itemUpgrade, ringImg, sringImg, ssringImg, land, bgEffect, actionIcon, passive, eff, menu, weather, job } from 'components/ImgSet';
import { util } from 'components/Libs';
import Main from 'components/Main';
import Menu from 'components/Menu';
import Battle from 'components/Battle';
import Character from 'components/Character';
import Inven from 'components/Inven';
import Gacha from 'components/Gacha';
import Lineup from 'components/Lineup';
import ToolShop from 'components/ToolShop';
import Shipyard from 'components/Shipyard';
import EquipmentShop from 'components/EquipmentShop';
import TradingPost from 'components/TradingPost';
import ItemEnhancement from 'components/ItemEnhancement';
import CombinedItem from 'components/CombinedItem';
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
const setCity = (data, lang) => {
  let cityD = {...data};
  cityD[0].tradingPost = [//교역소 상품생성
    {idx:3,num:''},{idx:13,num:1200},{idx:15,num:100},{idx:23,num:500},{idx:34,num:''},{idx:33,num:250},{idx:45,num:300},
  ];
  let accessory = [];//도구상 악세사리 생성
  for (let i = 0; i < 20; i ++) {
    accessory[i] = {...util.getItem(false, gameData, false, {
      type:'equip',
      items:Math.round(Math.random())+4,//악세사리만 해당
      lv:Math.round(Math.random()*100),
      sealed:false,
      }, false, lang),
    }
  }
  cityD[0].toolShop.accessory = accessory;
  let items = [[],[],[],[]];//장비상 아이템 생성
  for (let i = 0; i < 20; i ++) {
    for (let j = 1; j < 4; j ++) {
        items[j - 1][i] = {...util.getItem(false, gameData, false, {
        type:'equip',
        items:j,//장비만 해당
        //아이템종류, 세부종류(검,단검), 매직등급
        lv:Math.round(Math.random()*100),
        sealed:false,
        }, false, lang),
      };
    }
  }
  cityD[0].equipmentShop.helm = items[0];
  cityD[0].equipmentShop.armor = items[1];
  cityD[0].equipmentShop.weapon = items[2];
  return cityD;
}
const App = () => {
  const data = {
    setting: {
      speed: 2,
      lang:'ko',//ko & en
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
      itemEtc: itemEtc,
      itemHole: itemHole,
      itemUpgrade: itemUpgrade,
      itemMaterial: itemMaterial,
      land: land,
      bgEffect: bgEffect,
      passive:passive,
      eff:eff,
      actionIcon:actionIcon,
      weather:weather,
      job:job
    },
    gameData: {
      ...gameData,
    },
  }
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/")[1];
  const [page, setPage] = useState(location);
  const slotIdx = 'all';
  const [cityIdx, setCityIdx] = useState(0);
  const changePage = (pagename) => {
    setPage(pagename);
  }
  const changeSaveData = (objData) => {
    setSaveData(objData);
    util.saveData('saveData', objData);
  }
  const [saveData, setSaveData] = useState({});
  // useEffect(() => {
  //   setCityData(city(gameData.city.port));
  // }, [cityIdx]);
  useEffect(() => {
    const storageVer = util.loadData("version");
    let useSaveData = {}
    if (storageVer === version) { //데이터가 저장되어 있을때
      useSaveData = util.loadData('saveData'); //저장된 데이터
    } else {
      save.city = setCity(gameData.city.port, data.setting.lang);
      useSaveData = save; //가상데이터
      util.saveData('saveData', save);
      util.saveData('version', version);
    }
    if (useSaveData.newGame) { //신규 게임인지 판단
      // console.log('new game');
    }
    setSaveData(() => {
      if (useSaveData.ch[0].bSt0) { //캐릭 전투능력치 설정이 안되어 있을 경우
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
    });
    util.getTimeGap(useSaveData, changeSaveData);//시간 저장
    //이미지 프리로드
    back.forEach((image) => {
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
    animalType.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
    element.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
    for (let v in chImg) {
      const img = new Image();
      img.src = chImg[v];
    }
    iconState.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
    itemEtc.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
    itemHole.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
    itemMaterial.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
    itemUpgrade.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
    ringImg.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
    sringImg.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
    ssringImg.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
    land.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
    bgEffect.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
    actionIcon.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
    passive.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
    eff.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
    weather.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
    job.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
    return () => {
      localStorage.setItem('closeTime', new Date());
    }
  }, []);
  const scenario = {
    country: "korea",
    period: "joseon2",
    title: "LSS",
    stage: 0
  }
  return (
    <RootContainer value={data}>
      <svg style={{position:"absolute",width:0,height:0,visibility:"hidden"}}xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100">
				<radialGradient id="radial_rainbow" cx="43.5693" cy="42.9141" r="43.8667" gradientUnits="userSpaceOnUse">
					<stop offset="0" style={{"stopColor":"#FF0000"}}/>
					<stop offset="0.25" style={{"stopColor":"#FF8800"}}/>
					<stop offset="0.5" style={{"stopColor":"#FFFF00"}}/>
					<stop offset="0.7" style={{"stopColor":"#008800"}}/>
					<stop offset="0.8" style={{"stopColor":"#0000FF"}}/>
					<stop offset="0.95" style={{"stopColor":"#000088"}}/>
					<stop offset="1" style={{"stopColor":"#880088"}}/>
				</radialGradient>
				<linearGradient id="linear_rainbow" gradientUnits="userSpaceOnUse" x1="6.1328" y1="50.0005" x2="93.8662" y2="50.0005">
					<stop offset="0" style={{"stopColor":"#FF0000"}}/>
					<stop offset="0.17" style={{"stopColor":"#FF8800"}}/>
					<stop offset="0.33" style={{"stopColor":"#FFFF00"}}/>
					<stop offset="0.50" style={{"stopColor":"#008800"}}/>
					<stop offset="0.66" style={{"stopColor":"#0000FF"}}/>
					<stop offset="0.83" style={{"stopColor":"#000088"}}/>
					<stop offset="1" style={{"stopColor":"#880088"}}/>
				</linearGradient>
				<linearGradient id="Mottled" gradientUnits="userSpaceOnUse" x1="6.1328" y1="50.0005" x2="93.8662" y2="50.0005">
					<stop offset="0" style={{"stopColor":"#000000"}}/>
					<stop offset="0.17" style={{"stopColor":"#ffffff"}}/>
					<stop offset="0.33" style={{"stopColor":"#000000"}}/>
					<stop offset="0.50" style={{"stopColor":"#ffffff"}}/>
					<stop offset="0.66" style={{"stopColor":"#000000"}}/>
					<stop offset="0.83" style={{"stopColor":"#ffffff"}}/>
					<stop offset="1" style={{"stopColor":"#000000"}}/>
				</linearGradient>
			</svg>
      <div style={{height: "100%",overflowY:"overlay",overflowX:"hidden"}} className={`root ${page}`}>
        {location !== "battle" && (
          <Menu saveData={saveData} changePage={changePage} navigate={navigate} />
        )}
        <ContentContainer className="content">
          <Routes>
            <Route path="/" element={<Main changePage={changePage} cityIdx={cityIdx} />} />
            <Route path="/character" element={<Character saveData={saveData} changeSaveData={changeSaveData} />} cityIdx={cityIdx} />
            <Route path="/inven" element={<Inven saveData={saveData} changeSaveData={changeSaveData} cityIdx={cityIdx} />} />
            <Route path="/gacha" element={<Gacha saveData={saveData} changeSaveData={changeSaveData} cityIdx={cityIdx} />} />
            <Route path="/lineup" element={<Lineup saveData={saveData} changeSaveData={changeSaveData} cityIdx={cityIdx} />} />
            <Route path="/battle" element={<Battle saveData={saveData} changeSaveData={changeSaveData} changePage={changePage} navigate={navigate} scenario={scenario} cityIdx={cityIdx} />} />
            <Route path="/characterEnhancement" element={<CharacterEnhancement saveData={saveData} changeSaveData={changeSaveData} changePage={changePage} navigate={navigate} cityIdx={cityIdx} />} />
            <Route path="/itemEnhancement" element={<ItemEnhancement saveData={saveData} changeSaveData={changeSaveData} changePage={changePage} navigate={navigate} cityIdx={cityIdx} />} />
            <Route path="/combinedItem" element={<CombinedItem saveData={saveData} changeSaveData={changeSaveData} changePage={changePage} navigate={navigate} cityIdx={cityIdx} />} />
            <Route path="/equipmentShop" element={<EquipmentShop saveData={saveData} changeSaveData={changeSaveData} changePage={changePage} navigate={navigate} cityIdx={cityIdx} />} />
            <Route path="/toolShop" element={<ToolShop saveData={saveData} changeSaveData={changeSaveData} changePage={changePage} navigate={navigate} cityIdx={cityIdx} />} />
            <Route path="/shipyard" element={<Shipyard saveData={saveData} changeSaveData={changeSaveData} changePage={changePage} navigate={navigate} cityIdx={cityIdx} />} />
            <Route path="/tradingPost" element={<TradingPost saveData={saveData} changeSaveData={changeSaveData} changePage={changePage} navigate={navigate} cityIdx={cityIdx} />} />
            <Route path="/map" element={<Map saveData={saveData} changeSaveData={changeSaveData} changePage={changePage} navigate={navigate} cityIdx={cityIdx} />} />
          </Routes>
        </ContentContainer>
        {/* <FooterContainer/> */}
      </div>
    </RootContainer>
  );
}

export default App;
