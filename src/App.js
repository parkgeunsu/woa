import { FlexBox } from 'components/Container';
import { ChPic } from 'components/ImagePic';
import { util } from 'components/Libs';
import { ColorSet, FontSet } from 'components/Theme';
import 'css/keyFrameAnimation.css';
import 'css/root.css';
import { gameData, version } from 'gamedata/data';
import { saveNew } from 'gamedata/savedata';
import Battle from 'pages/Battle';
import CardPlacement from 'pages/CardPlacement';
import Cards from 'pages/Cards';
import CharacterList from 'pages/CharacterList';
import Composite from 'pages/Composite';
import EnhancingCards from 'pages/EnhancingCards';
import EnhancingStickers from 'pages/EnhancingStickers';
import Recruitment from 'pages/Gacha';
import GameMain from 'pages/GameMain';
import Header from 'pages/Header';
import InvenShop from 'pages/InvenShop';
import Menu from 'pages/Menu';
import MoveEvent from 'pages/MoveEvent';
import Sail from 'pages/Sail';
import Setup from 'pages/Setup';
import Shipyard from 'pages/Shipyard';
import StartGame from 'pages/StartGame';
import TradingPost from 'pages/TradingPost';
import React, { createContext, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import TestSkill from 'pages/TestSkill';

export const AppContext = createContext();

const RootContainer = styled(AppContext.Provider)`
  height: 100%;
  overflow-y: overlay;
  overflow-x: hidden;
`;
const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  background: #000;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    ${({location}) => location === "" ? `background: linear-gradient(#000, rgba(0,0,0,0), #000);` : ''}
  }
`;
const CountryBackground = styled(ChPic)`
  margin: auto;
  padding-top: 175%;
  width: 100%;
  height: 0;
`;
const BackgroundShadow = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0.5;
  background: #000;
  z-index: 1;
`;
const ContentContainer = styled(FlexBox)`
  position: absolute;
  width: 100%;
  ${({location}) => location === "recruitment" || location === "battle" ? `
    top: 0px;
    height: 100%;
  ` : `
    top: 50px;
    height: calc(100% - 50px);
  `};
  overflow: hidden;
  z-index: 2;
  .skillEffect {
    position:absolute;left:0;top:0;right:0;bottom:0;z-index:10;pointer-events:none;
    .skillName{
      position:absolute;font-size:1.875rem;transform:translate(-50%,-50%);white-space:nowrap;transition:all 1s ease-in-out;
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
const setCity = (data, lang) => {
  let cityD = {...data};
  cityD[0].tradingPost = [//교역소 상품생성
    {idx:3,num:''},{idx:13,num:1200},{idx:15,num:100},{idx:23,num:500},{idx:34,num:''},{idx:33,num:250},{idx:45,num:300},
  ];
  let accessory = [];//도구상 악세사리 생성
  for (let i = 0; i < 20; i ++) {
    accessory[i] = {...util.getItem({
      saveData: false,
      gameData: gameData,
      changeSaveData: false,
      option: {
        type:'equip',
        items:Math.round(Math.random())+4,//악세사리만 해당
        lv:Math.round(Math.random()*100),
        sealed:false,
      },
      isSave: false,
      lang:lang
    })}
  }
  cityD[0].tool.accessory = accessory;
  let items = [[],[],[],[]];//장비상 아이템 생성
  for (let i = 0; i < 20; i ++) {
    for (let j = 1; j < 4; j ++) {
      items[j - 1][i] = {...util.getItem({
        saveData: false,
        gameData: gameData,
        changeSaveData: false,
        option: {
          type:'equip',
          items:j,//장비만 해당
          //아이템종류, 세부종류(검,단검), 매직등급
          lv:Math.round(Math.random()*100),
          sealed:false,
        },
        isSave: false,
        lang: lang,
      })}
    }
  }
  cityD[0].shop.helm = items[0];
  cityD[0].shop.armor = items[1];
  cityD[0].shop.weapon = items[2];
  return cityD;
}
const App = ({
  loadData,
}) => {
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/")[1];
  const [saveData, setSaveData] = useState({});
  const [gameMode, setGameMode] = useState('');
  const slotIdx = 'all';
  const [cityIdx] = useState(0); //setCityIdx
  const [showDim, setShowDim] = useState(false);
  const paramData = React.useMemo(() => {
    return util.loadData('historyParam');
  }, []);
  const theme = {
    color: ColorSet,
    font: FontSet,
  }
  const [contextData, setContextData] = useState({
    images: loadData,
    gameData: {
      ...gameData,
    },
    setting: {
      lang: 'ko',
      bgm: true,
      efm: true,
      resolution: 1,
      bge: false,
      speed: 1,
    }
  });
  const setBack = (location) => {
    switch(location) {
      case "cardsList":
      case "cards":
        return {
          pic: "areaBack",
          idx: 0
        };
      case "inven":
        return {
          pic: "areaBack",
          idx: 1
        };
      case "cardPlacement":
        return {
          pic: "areaBack",
          idx: 2
        };
      case "enhancingCards":
        return {
          pic: "areaBack",
          idx: 3
        };
      case "enhancingStickers":
        return {
          pic: "areaBack",
          idx: 4
        };
      case "composite":
        return {
          pic: "areaBack",
          idx: 5
        };
      case "shop":
        return {
          pic: "areaBack",
          idx: 6
        };
      case "tool":
        return {
          pic: "areaBack",
          idx: 7
        };
      case "trade":
        return {
          pic: "areaBack",
          idx: 8
        };
      case "ship":
        return {
          pic: "areaBack",
          idx: 9
        };
      case "prison":
        return {
          pic: "areaBack",
          idx: 10
        };
      case "post":
        return {
          pic: "areaBack",
          idx: 12
        };
      case "secretShop":
        return {
          pic: "areaBack",
          idx: 13
        };
      case "battleWin":
        return {
          pic: "areaBack",
          idx: 16
        };
      case "battleLose":
        return {
          pic: "areaBack",
          idx: 17
        };
      case "sail":
        return {
          pic: "areaBack",
          idx: 18
        };
      case "gameMain":
      case "message":
      case "setup":
        return {
          pic:"country",
          idx:location === "" ? Math.floor(Math.random() * 28) : util.getCountryToIdx(saveData?.info?.stay)
        };
      default:
        return {
          pic:"country",
          idx:location === "" ? Math.floor(Math.random() * 28) : util.getCountryToIdx(saveData?.info?.stay)
        };
    }
  }
  const changeSaveData = (objData) => {
    setSaveData(objData);
    util.saveData('saveData', objData);
  }
  const setLang = (data) => {
    const setting = util.loadData('setting');
    setting.lang = data;
    util.saveData('setting', setting);
    const cloneContextData = {...contextData};
    cloneContextData.setting.lang = data;
    setContextData(cloneContextData);
  }
  const setSpeed = (data) => {
    const setting = util.loadData('setting');
    setting.speed = data;
    util.saveData('setting', setting);
    let cloneContextData = {...contextData};
    cloneContextData.setting.speed = data;
    setContextData(cloneContextData);
  }
  const setBgm = (data) => {
    const setting = util.loadData('setting');
    setting.bgm = data;
    util.saveData('setting', setting);
    let cloneContextData = {...contextData};
    cloneContextData.setting.bgm = data;
    setContextData(cloneContextData);
  }
  const setEfm = (data) => {
    const setting = util.loadData('setting');
    setting.efm = data;
    util.saveData('setting', setting);
    let cloneContextData = {...contextData};
    cloneContextData.setting.efm = data;
    setContextData(cloneContextData);
  }
  const setResolution = (data) => {
    const setting = util.loadData('setting');
    setting.resolution = data;
    util.saveData('setting', setting);
    let cloneContextData = {...contextData};
    cloneContextData.setting.resolution = data;
    setContextData(cloneContextData);
  }
  const setBge = (data) => {
    const setting = util.loadData('setting');
    setting.bgm = data;
    util.saveData('setting', setting);
    let cloneContextData = {...contextData};
    cloneContextData.setting.bge = data;
    setContextData(cloneContextData);
  }
  // useEffect(() => {
  //   setCityData(city(gameData.city.port));
  // }, [cityIdx]);
  useEffect(() => {
    // setContextData();
    const storageVer = util.loadData('version'),
      continueGame = util.loadData('continueGame');
    let useSaveData = {}
    if (!continueGame) { //신규 게임
      if (location !== '') {
        navigate('../');
      }
      //save 는 가상데이터
      saveNew.city = setCity(gameData.city.port, contextData.setting.lang);
      useSaveData = saveNew;
      util.saveData('saveData', saveNew);
      util.saveData('version', version);
      util.saveData('setting', {
        lang: 'ko',
        bgm: true,
        efm: true,
        resolution: 1,
        speed: 2,
      });
      util.saveData('history',[]);
      setSaveData(saveNew);
    } else {
      if (storageVer !== version) { //데이터 버전이 다를 경우
        //버전 업데이트 통신
        useSaveData = util.loadData("saveData");
        util.saveData('version', version);
      } else {
        useSaveData = util.loadData("saveData");
      }
      const setting = util.loadData('setting');
      let cloneContextData = {...contextData};
      cloneContextData.setting = setting;
      setContextData(cloneContextData);
      setSaveData(() => {
        if (useSaveData.ch[0].bSt0) { //캐릭 전투능력치 설정이 안되어 있을 경우
          util.saveData('saveData', useSaveData);
          return useSaveData;
        } else {
          const sData = util.saveCharacter({
            saveData: useSaveData, 
            chSlotIdx: slotIdx,
            gameData: gameData,
          });
          util.saveData('saveData', sData);
          return sData;
        }
      });
      if (!location || location === 'start') {
        util.saveHistory({
          location: 'gameMain',
          navigate: navigate,
          callback: () => {},
          isNavigate: false,
        });
      }
      // const history = util.loadData('history');
      // if ((history === null || history === undefined || history.length === 0 || history[0] === '') && 
      // changePage('gameMain', {aa: 1, bb: 2});
    }
    //util.getTimeGap(useSaveData, changeSaveData);//시간 저장
    
    return () => {
      localStorage.setItem('closeTime', new Date());
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <RootContainer value={contextData}>
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
        <Wrapper location={location} className={`root ${location}`}>
          {location !== "battle" && location !== "" && location !== "main" && location !== "start" && (location !== "recruitment" && !paramData?.start?.begin) && location.indexOf('test') < 0 && (
            <Header saveData={saveData} />
          )}
          <CountryBackground {...setBack(location)} />
          {showDim && (location === "gameMain" || location === "setup" || location === "chat") && <BackgroundShadow />}
          <ContentContainer location={location} direction="column" className="content">
            <Routes>
              <Route path="/" element={<Menu type="new" />} />

              <Route path="/start" element={<StartGame saveData={saveData} changeSaveData={changeSaveData} setLang={setLang} />} />

              <Route path="/setup" element={<Setup setLang={setLang} setSpeed={setSpeed} setBgm={setBgm} setEfm={setEfm} setRes={setResolution} setBge={setBge} />} />

              <Route path="/gameMain" element={<GameMain saveData={saveData} changeSaveData={changeSaveData} cityIdx={cityIdx} gameMode={gameMode} setGameMode={setGameMode} showDim={showDim} setShowDim={setShowDim} />} />

              <Route path="/cardsList" element={<CharacterList saveData={saveData} changeSaveData={changeSaveData} cityIdx={cityIdx} />} />

              <Route path="/cards" element={<Cards saveData={saveData} changeSaveData={changeSaveData} cityIdx={cityIdx} />} />

              <Route path="/inven" element={<InvenShop shopType="inven" saveData={saveData} changeSaveData={changeSaveData} cityIdx={cityIdx} />} />

              <Route path="/recruitment" element={<Recruitment saveData={saveData} changeSaveData={changeSaveData} cityIdx={cityIdx} />} />

              <Route path="/cardPlacement" element={<CardPlacement saveData={saveData} changeSaveData={changeSaveData} cityIdx={cityIdx} />} />

              <Route path="/battle" element={<Battle saveData={saveData} changeSaveData={changeSaveData} cityIdx={cityIdx} />} />

              <Route path="/moveEvent" element={<MoveEvent saveData={saveData} changeSaveData={changeSaveData} cityIdx={cityIdx} gameMode={gameMode} setGameMode={setGameMode}  showDim={showDim} setShowDim={setShowDim} />} />

              <Route path="/enhancingCards" element={<EnhancingCards saveData={saveData} changeSaveData={changeSaveData} cityIdx={cityIdx} />} />

              <Route path="/enhancingStickers" element={<EnhancingStickers saveData={saveData} changeSaveData={changeSaveData} cityIdx={cityIdx} />} />

              <Route path="/composite" element={<Composite saveData={saveData} changeSaveData={changeSaveData} cityIdx={cityIdx} />} />

              <Route path="/shop" element={<InvenShop shopType="shop" saveData={saveData} changeSaveData={changeSaveData} cityIdx={cityIdx} />} />

              <Route path="/tool" element={<InvenShop shopType="tool" saveData={saveData} changeSaveData={changeSaveData} cityIdx={cityIdx} />} />

              <Route path="/shipyard" element={<Shipyard saveData={saveData} changeSaveData={changeSaveData} cityIdx={cityIdx} />} />

              <Route path="/tradingPost" element={<TradingPost saveData={saveData} changeSaveData={changeSaveData} cityIdx={cityIdx} />} />

              <Route path="/map" element={<Sail saveData={saveData} changeSaveData={changeSaveData} cityIdx={cityIdx} />} />

              <Route path="/testSkill" element={<TestSkill />} saveData={saveData} />
            </Routes>
          </ContentContainer>
        </Wrapper>
      </RootContainer>
    </ThemeProvider>
  );
}

export default App;

