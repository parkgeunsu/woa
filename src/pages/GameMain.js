import { Text } from 'components/Atom';
import { FlexBox } from 'components/Container';
import { IconPic } from 'components/ImagePic';
import { util } from 'components/Libs';
import { AppContext } from 'contexts/app-context';
import GameMainFooter from 'pages/GameMainFooter';
import MoveRegion from 'pages/MoveRegion';
import QuickMenu from 'pages/QuickMenu';
import Roulette from 'pages/Roulette';
import Scenario from 'pages/Scenario';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
const ShopGroup = styled(FlexBox)`
  position: absolute;
  inset: 15% 10% 25% 10%;
  width: 80%;
  height: 60%;
`;
const ShopIcon = styled.div`
  position: absolute;
  ${({idx}) => {
    switch(idx % 3) {
      case 0: 
        return `
          left: 0;
          top: ${Math.floor(idx / 3) * 25}%;
        `;
      case 1: 
        return `
          left: 50%;
          top: ${Math.floor(idx / 3) * 25}%;
          transform: translateX(-50%);
        `;
      case 2: 
        return `
          right: 0;
          top: ${Math.floor(idx / 3) * 25}%;
        `;
    }
  }}
  width: 20%;
  padding-top: 20%;
  height: 0;
  box-shadow: 0 0 10px ${({theme}) => theme.color.sub}, 0 0 5px ${({theme}) => theme.color.sub}, 0 0 2px ${({theme}) => theme.color.sub};
`;
const ShopText = styled(Text)`
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translate(-50%, 0);
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
    // if (Object.keys(saveData).length === 0) {
    //   util.saveData('continueGame', false);
    // }
    return (Object.keys(saveData).length === 0 ? util.loadData('saveData') : saveData) || {};
  }, [saveData]);
  const stay = React.useMemo(() => sData?.info?.stay, [sData]);
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
  const [selectMoveRegion, setSelectMoveRegion] = useState('');
  const [moveRegionEntry, setMoveRegionEntry] = useState([]);
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
      case "moveRegion":
        return {
          selectMoveRegion: selectMoveRegion,
          moveRegionEntry: moveRegionEntry,
          setMoveRegionEntry: setMoveRegionEntry,
          setShowDim: setShowDim,
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
      <div style={{position:"absolute",right:"20%",bottom:0,zIndex:100, backgroundColor: '#fff'}}>
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
        }}>동물스킬 리셋</button>
      </div>
      <QuickMenu type="main" stay={stay} gameMode={gameMode} showDim={showDim} setShowDim={setShowDim}/>
      <CountryTitle alignItems="center" back={imgSet.back.countryTitle}>
        <StyledText code="t4" color="shadow">{gameData.country.regions[util.getRegionToIdx(stay)]?.name[lang]}</StyledText>
      </CountryTitle>
      {gameMode === "roulette" && <Roulette saveData={sData} rouletteState={rouletteState} setRouletteState={setRouletteState} selectRoulettePos={selectRoulettePos} setSelectRoulettePos={setSelectRoulettePos} rouletteArr={rouletteArr.current} rouletteEnemy={rouletteEnemy} setRouletteEnemy={setRouletteEnemy} />}
      {gameMode === "scenarioRegion" && <Scenario saveData={sData} changeSaveData={changeSaveData} stay={stay} selectScenario={selectScenario} setSelectScenario={setSelectScenario} />}
      {gameMode === "moveRegion" && <MoveRegion saveData={sData} stay={stay} selectMoveRegion={selectMoveRegion} setSelectMoveRegion={setSelectMoveRegion} 
      moveRegionEntry={moveRegionEntry} setMoveRegionEntry={setMoveRegionEntry} />}
      <ShopGroup alignItems="center" justifyContent="space-around">
        {gameData.country.regions[util.getRegionToIdx(stay)].shop.map((shop, idx) => {
          return (
            <ShopIcon idx={shop} key={`shop_${idx}`} onClick={() => {
              setLoading(true);
              switch(shop) {
                case 0: //집
                  util.saveHistory({
                    location: 'home',
                    navigate: navigate,
                    isNavigate: true,
                  });//히스토리 저장
                  break;
                case 1: //무기상
                  util.saveHistory({
                    location: 'equipment',
                    navigate: navigate,
                    isNavigate: true,
                  });//히스토리 저장
                  break;
                case 2: //도구상
                  util.saveHistory({
                    location: 'tool',
                    navigate: navigate,
                    isNavigate: true,
                  });//히스토리 저장
                  break;
                case 3: //악세사리상
                  util.saveHistory({
                    location: 'accessory',
                    navigate: navigate,
                    isNavigate: true,
                  });//히스토리 저장
                  break;
                  break;
                case 4: //연금술소
                  util.saveHistory({//합성
                    location: 'composite',
                    navigate: navigate,
                    callback: () => {},
                    isNavigate: true,
                  });//히스토리 저장
                  break;
                case 5: //훈련소
                  util.saveHistory({//카드 강화
                    location: 'training',
                    navigate: navigate,
                    callback: () => {},
                    isNavigate: true,
                  });//히스토리 저장
                  break;
                case 6: //교역소
                  util.saveHistory({
                    location: 'tradingPost',
                    navigate: navigate,
                    callback: () => {},
                    isNavigate: true,
                  });
                  break;
                case 7: //대장간
                  util.saveHistory({//아이템 강화
                    location: 'blacksmith',
                    navigate: navigate,
                    callback: () => {},
                    isNavigate: true,
                  });//히스토리 저장
                  break;
                case 8: //교회
                  util.saveHistory({
                    location: 'church',
                    navigate: navigate,
                    isNavigate: true,
                  });//히스토리 저장
                  break;
                case 9: //절
                  util.saveHistory({
                    location: 'temple',
                    navigate: navigate,
                    isNavigate: true,
                  });//히스토리 저장
                  break;
                case 10: //비밀상점
                  util.saveHistory({
                    location: 'mystery',
                    navigate: navigate,
                    isNavigate: true,
                  });//히스토리 저장
                  break;
                case 11: //조선소
                  util.saveHistory({
                    location: 'shipyard',
                    navigate: navigate,
                    isNavigate: true,
                  });//히스토리 저장
                  break;
                case 12: //항구
                  util.saveHistory({
                    location: 'port',
                    navigate: navigate,
                    isNavigate: true,
                  });//히스토리 저장
                  break;
                case 13: //마을회관
                  util.saveHistory({
                    location: 'townhall',
                    navigate: navigate,
                    isNavigate: true,
                  });//히스토리 저장
                  break;
                case 14: //길드
                  util.saveHistory({
                    location: 'guild',
                    navigate: navigate,
                    isNavigate: true,
                  });//히스토리 저장
                  break;
                case 15: //주점
                  util.saveHistory({
                    location: 'tavern',
                    navigate: navigate,
                    isNavigate: true,
                  });//히스토리 저장
                  break;
                default:
                  break;
              }
            }}>
              <IconPic isAbsolute type="shop" pic="icon200" idx={shop} />
              <ShopText code="t1" color="main">{gameData.shop[gameData.shopName[shop]]?.name[lang]}</ShopText>
            </ShopIcon>
          );
        })}
      </ShopGroup>
      <GameMainFooter saveData={sData} changeSaveData={changeSaveData} gameMode={gameMode} setGameMode={setGameMode} stay={stay} 
      {...gameModeAttr(gameMode)}  />
    </Wrap>
  );
};

export default GameMain;
