import { ColorSet } from 'components/ColorSet';
import { util } from 'components/Libs';
import { LoadImage } from 'components/LoadImage';
import 'css/root.css';
import { gameData, version } from 'gamedata/data';
import { saveNew } from 'gamedata/savedata';
import Battle from 'pages/Battle';
import Character from 'pages/Character';
import CharacterEnhancement from 'pages/CharacterEnhancement';
import CombinedItem from 'pages/CombinedItem';
import EquipmentShop from 'pages/EquipmentShop';
import Recruitment from 'pages/Gacha';
import Header from 'pages/Header';
import Inven from 'pages/Inven';
import ItemEnhancement from 'pages/ItemEnhancement';
import Lineup from 'pages/Lineup';
import Menu from 'pages/Menu';
import Sail from 'pages/Sail';
import Setting from 'pages/Setting';
import Shipyard from 'pages/Shipyard';
import StartGame from 'pages/StartGame';
import ToolShop from 'pages/ToolShop';
import TradingPost from 'pages/TradingPost';
import { createContext, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

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
  background: url(${({page, imgSet}) => {
    switch(page) {
      case 'main':
        return imgSet[2];
        break;
      case 'start':
        return imgSet[1];
        break;
      case 'setting':
        return imgSet[2];
        break;
      case 'recruitment':
        return imgSet[3];
        break;
      default:
        return ``;
    }
  }}) no-repeat center center;
  background-size: cover;
`;
const ContentContainer = styled.div`
  display: flex;
  position: relative;
  flex: 1;
  height: 100%;
  overflow: hidden;
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
    images: LoadImage(),
    gameData: {
      ...gameData,
    },
  }
  const theme = {
    color: ColorSet,
  }
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/")[1];
  const [page, setPage] = useState(location || 'main');
  const [pageData, setPageData] = useState({});
  const slotIdx = 'all';
  const [cityIdx, setCityIdx] = useState(0);
  const changePage = (pagename, pageData) => {
    console.log(pagename);
    pageData && setPageData(pageData);
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
    const storageVer = util.loadData("version"),
      continueGame = util.loadData("continueGame");
    let useSaveData = {}
    if (!continueGame) { //신규 게임
      //save 는 가상데이터
      saveNew.city = setCity(gameData.city.port, data.setting.lang);
      useSaveData = saveNew;
      util.saveData('saveData', saveNew);
      util.saveData('version', version);
      setSaveData(saveNew);
    } else {
      util.saveData('continueGame', true);
      if (storageVer !== version) { //데이터 버전이 다를 경우
        //버전 업데이트 통신
        useSaveData = util.loadData("saveData");
        util.saveData('version', version);
      } else {
        useSaveData = util.loadData("saveData");
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
    }
    util.getTimeGap(useSaveData, changeSaveData);//시간 저장
    
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
    <ThemeProvider theme={theme}>
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
        <Wrapper page={page} imgSet={data.images.back} className={`root ${page}`}>
          {location !== "battle" && location !== "" && location !== "main" && location !== "start" && (location !== "recruitment" && pageData?.begin) && (
            <Header saveData={saveData} changePage={changePage} navigate={navigate} />
          )}
          <ContentContainer className="content">
            <Routes>
              <Route path="/" element={<Menu type="new" changePage={changePage} />} />
              <Route path="/start" element={<StartGame saveData={saveData} changeSaveData={changeSaveData} changePage={changePage} navigate={navigate} pageData={pageData} />} />
              <Route path="/setting" element={<Setting changePage={changePage} />} />
              <Route path="/character" element={<Character saveData={saveData} changeSaveData={changeSaveData} navigate={navigate} cityIdx={cityIdx} />} pageData={pageData} />
              <Route path="/inven" element={<Inven saveData={saveData} changeSaveData={changeSaveData} navigate={navigate} cityIdx={cityIdx} pageData={pageData} />} />
              <Route path="/recruitment" element={<Recruitment saveData={saveData} changeSaveData={changeSaveData} changePage={changePage} navigate={navigate} cityIdx={cityIdx} pageData={pageData} />} />
              <Route path="/lineup" element={<Lineup saveData={saveData} changeSaveData={changeSaveData} cityIdx={cityIdx} pageData={pageData} />} />
              <Route path="/battle" element={<Battle saveData={saveData} changeSaveData={changeSaveData} changePage={changePage} navigate={navigate} scenario={scenario} cityIdx={cityIdx} pageData={pageData} />} />
              <Route path="/characterEnhancement" element={<CharacterEnhancement saveData={saveData} changeSaveData={changeSaveData} changePage={changePage} navigate={navigate} cityIdx={cityIdx} pageData={pageData} />} />
              <Route path="/itemEnhancement" element={<ItemEnhancement saveData={saveData} changeSaveData={changeSaveData} changePage={changePage} navigate={navigate} cityIdx={cityIdx} pageData={pageData} />} />
              <Route path="/combinedItem" element={<CombinedItem saveData={saveData} changeSaveData={changeSaveData} changePage={changePage} navigate={navigate} cityIdx={cityIdx} pageData={pageData} />} />
              <Route path="/equipmentShop" element={<EquipmentShop saveData={saveData} changeSaveData={changeSaveData} changePage={changePage} cityIdx={cityIdx} pageData={pageData} />} />
              <Route path="/toolShop" element={<ToolShop saveData={saveData} changeSaveData={changeSaveData} changePage={changePage} navigate={navigate} cityIdx={cityIdx} pageData={pageData} />} />
              <Route path="/shipyard" element={<Shipyard saveData={saveData} changeSaveData={changeSaveData} changePage={changePage} navigate={navigate} cityIdx={cityIdx} pageData={pageData} />} />
              <Route path="/tradingPost" element={<TradingPost saveData={saveData} changeSaveData={changeSaveData} changePage={changePage} navigate={navigate} cityIdx={cityIdx} pageData={pageData} />} />
              <Route path="/map" element={<Sail saveData={saveData} changeSaveData={changeSaveData} changePage={changePage} navigate={navigate} cityIdx={cityIdx} pageData={pageData} />} />
            </Routes>
          </ContentContainer>
        </Wrapper>
      </RootContainer>
    </ThemeProvider>
  );
}

export default App;
