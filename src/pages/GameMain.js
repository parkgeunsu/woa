import { Text } from 'components/Atom';
import { FlexBox } from 'components/Container';
import { IconPic } from 'components/ImagePic';
import { util } from 'components/Libs';
import { AppContext } from 'contexts/app-context';
import GameMainFooter from 'pages/GameMainFooter';
import QuickMenu from 'pages/QuickMenu';
import Roulette from 'pages/Roulette';
import Scenario from 'pages/Scenario';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrap = styled(FlexBox)``;

const CountryTitle = styled(FlexBox)`
  position: absolute;
  left: 50%;
  top: 50px;
  padding: 10px 40px;
  width: 270px;
  height: 90px;
  box-sizing: border-box;
  transform: translate(-50%, -50%);
  background: url(${({back}) => back}) no-repeat center center;
  background-size: 100%;
`;
const StyledText = styled(Text)`
  ${({theme}) => `text-shadow:0 0 10px ${theme.color.menu}, 0 0 2px ${theme.color.sub}`}
`;
const EventIconGroup = styled(FlexBox)`
  position: absolute;
  inset: 5% 10% 5% 10%;
  width: 80%;
  height: 90%;
  place-content: start;
  row-gap: 7%;
  column-gap: 4%;
`;
const EventIcon = styled.div`
  position: relative;
  width: 22%;
  padding-top: 22%;
  height: 0;
  background: rgba(0,0,0,.7);
  border-radius: 10px;
  box-shadow: 0 0 10px ${({theme}) => theme.color.sub}, 0 0 5px ${({theme}) => theme.color.sub}, 0 0 2px ${({theme}) => theme.color.sub};
`;
const EventText = styled(Text)`
  position: absolute;
  left: 50%;
  top: 105%;
  transform: translate(-50%, 0);
  text-shadow: 0 0 5px ${({theme}) => theme.color.sub}, 0 0 2px ${({theme}) => theme.color.sub};
  white-space: nowrap;
`;
const GameMain = ({
  saveData,
  changeSaveData,
  gameMode,
  setGameMode,
  showDim,
  setShowDim,
  setLoading,
}) => {
  const navigate = useNavigate();
  const {state} = useLocation();
  const context = useContext(AppContext);
  const classification = React.useMemo(() => {
    return context.classification;
  }, [context]);
  const lang = React.useMemo(() => {
    return context.setting.lang;
  }, [context]);
  const imgSet = React.useMemo(() => {
    return context.images;
  }, [context]);
  const gameData = React.useMemo(() => {
    return context.gameData;
  }, [context]);
  const sData = React.useMemo(() => {
    return (Object.keys(saveData).length === 0 ? util.loadData('saveData') : saveData) || {};
  }, [saveData]);
  const stay = React.useMemo(() => sData?.info?.stay, [sData]);
  const regionEvent = ["regionScenario", "regionEvent", "exploreRegions", "heroScenario"];
  const [regionIdx, setRegionIdx] = useState(typeof state?.tab === "number" ? state.tab : "");
  //roulette
  const [rouletteState, setRouletteState] = useState([]);
  const [selectRoulettePos, setSelectRoulettePos] = useState([]);
  const historyParam = util.loadData('historyParam');
  const [selectScenario, setSelectScenario] = useState(historyParam?.scenario || {});
  const [rouletteEnemy, setRouletteEnemy] = useState(historyParam?.roulette || {base: {},add: {}, lv: {}, map: {}});
  const rouletteArr = useRef([
    {cards:[
      gameData.roulette[0],
      gameData.roulette[1],
      gameData.roulette[2],
      gameData.roulette[3],
    ]},
    {cards:[
      gameData.roulette[4],
      gameData.roulette[6],
      gameData.roulette[7],
      gameData.roulette[5],
      gameData.roulette[8],
      gameData.roulette[5],
      gameData.roulette[10],
    ]},
    {cards:[
      gameData.roulette[12],
      gameData.roulette[13],
      gameData.roulette[14],
      gameData.roulette[15],
    ]},
  ]);
  const gameModeAttr = (gameMode) => {
    switch (gameMode) {
      case "roulette":
        return {
          rouletteState: rouletteState,
          setRouletteState: setRouletteState,
          selectRoulettePos: selectRoulettePos,
          setSelectRoulettePos: setSelectRoulettePos,
          rouletteArr: rouletteArr.current,
          rouletteEnemy: rouletteEnemy,
          setRouletteEnemy: setRouletteEnemy,
          selectScenario: selectScenario,
        };
      case "scenarioRegion":
        return {
          selectScenario: selectScenario,
        };
      default: 
        return {};
    }
  }
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <Wrap direction="column">
      <div style={{position:"absolute",right:0,bottom:0,zIndex:100, backgroundColor: '#fff'}}>
        <button onClick={() => {
          util.getItem({
            saveData: sData,
            gameData: gameData,
            changeSaveData: changeSaveData,
            option: {
              type:'equip',
              items:Math.ceil(Math.random()*3),//장비만 해당
              //아이템종류, 세부종류(검,단검), 매직등급
              lv:Math.round(Math.random()*100),
              sealed:true,
            },
            isSave: true,
            lang: lang,
          });
        }}>아이템 추가</button><br/>
        <button onClick={() => {
          const card = util.makeCard({
            heroArr: classification,
            gachaNum: 1,
            gachaType: "p",
            gameData: gameData,
            saveData: sData,
          });
          const newSaveDataAdd = {
            ...sData,
            ch: [...sData.ch, card.chDataArr[0]]
          };
          changeSaveData(newSaveDataAdd);
        }}>영웅 추가</button><br/>
        <button onClick={() => {
          if (sData.ch.length > 0) {
            const newSaveDataDel = {
              ...sData,
              ch: sData.ch.slice(0, -1)
            };
            changeSaveData(newSaveDataDel);
          }
        }}>영웅 삭제</button><br/>
        <button onClick={() => {
          const stay = Math.floor(Math.random() * 28);
          if (sData.info.stay) {
            const newSaveDataDel = {
              ...sData,
              info: {
                ...sData.info,
                stay: util.getIdxToRegion(stay),
              }
            };
            changeSaveData(newSaveDataDel);
          }
        }}>도시 이동</button><br/>
        <button onClick={() => {
          util.saveData("continueGame", false);
        }}>데이터 초기화</button>
        {/* <button onClick={() => {
          const option = {
            type:'equip',
            items:Math.ceil(Math.random()*2),//장비만 해당
            lv:Math.round(Math.random()*100),
            sealed:true,
          }
          util.getItem({
            saveData: sData,
            gameData: gameData,
            changeSaveData: changeSaveData,
            option: option,
            isSave: true,
            lang: lang,
          });
        }}>동물스킬 리셋</button> */}
      </div>
      <QuickMenu type="main" stay={stay} gameMode={gameMode} showDim={showDim} setShowDim={setShowDim}/>
      {gameMode === "roulette" && <Roulette saveData={sData} rouletteState={rouletteState} setRouletteState={setRouletteState} selectRoulettePos={selectRoulettePos} setSelectRoulettePos={setSelectRoulettePos} rouletteArr={rouletteArr.current} rouletteEnemy={rouletteEnemy} setRouletteEnemy={setRouletteEnemy} />}
      {gameMode === "scenarioRegion" && <Scenario saveData={sData} changeSaveData={changeSaveData} stay={stay} selectScenario={selectScenario} setSelectScenario={setSelectScenario} />}

      {regionIdx === "" && <CountryTitle alignItems="center" back={imgSet.back.countryTitle}>
        <StyledText code="t4" color="shadow">{gameData.country.regions[util.getRegionToIdx(stay)]?.name[lang]}</StyledText>
      </CountryTitle>}
      {regionIdx === 0 &&<EventIconGroup alignItems="flex-start" justifyContent="flex-start" flexWrap="wrap">
        {gameData.country.regions[util.getRegionToIdx(stay)].shop.map((shop, idx) => {
          return (
            <EventIcon idx={shop} key={`shop_${shop}`} onClick={() => {
              setLoading(true);
              util.saveHistory({
                location: gameData.shopName[shop],
                prevLocation: 'gameMain',
                navigate: navigate,
                isNavigate: true,
                state: {
                  tab: 0,
                }
              });//히스토리 저장
            }}>
              <IconPic isAbsolute type="shop" pic="town" idx={shop} />
              <EventText code="t1" color="main">{gameData.shop[gameData.shopName[shop]]?.name[lang]}</EventText>
            </EventIcon>
          );
        })}
      </EventIconGroup>}
      {regionIdx === 1 && <EventIconGroup alignItems="flex-start" justifyContent="flex-start" flexWrap="wrap">
        {regionEvent.map((event, idx) => {
          return (
            <EventIcon idx={idx} key={`event_${idx}`} onClick={() => {
              switch(idx) {
                case 0: //regionScenario
                  break;
                case 1: //regionEvent
                  break;
                case 2: //heroScenario
                  setGameMode('scenarioRegion');
                  break;
                case 3: //exploreRegions
                  setGameMode('roulette');
                  break;
                default:
                  break;
              }
            }}>
              <IconPic isAbsolute type="event" pic="town" idx={idx} />
              <EventText code="t1" color="main">{gameData.msg.button[event][lang]}</EventText>
            </EventIcon>
          );
        })}
      </EventIconGroup>}
      <GameMainFooter saveData={sData} changeSaveData={changeSaveData} gameMode={gameMode} setGameMode={setGameMode} regionIdx={regionIdx} setRegionIdx={setRegionIdx} stay={stay} 
      {...gameModeAttr(gameMode)}  />
    </Wrap>
  );
};

export default GameMain;
