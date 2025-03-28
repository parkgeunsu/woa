import { AppContext } from 'App';
import { Text } from 'components/Atom';
import { FlexBox } from 'components/Container';
import { util } from 'components/Libs';
import GameMainFooter from 'pages/GameMainFooter';
import MoveRegion from 'pages/MoveRegion';
import QuickMenu from 'pages/QuickMenu';
import Roulette from 'pages/Roulette';
import Scenario from 'pages/Scenario';
import React, { useContext, useRef, useState } from 'react';
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
const CardGroup = styled.div`
  width: 100%;
  height: 100%;
  perspective: 650px;
  perspective-origin: 50% 20%;
  transform-style: preserve-3d;
  backface-visibility: hidden;
`;
const GameMain = ({
  saveData,
  changeSaveData,
  cityIdx,
  gameMode,
  setGameMode,
  showDim,
  setShowDim,
}) => {
  const context = useContext(AppContext);
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
    return Object.keys(saveData).length === 0 ? util.loadData('saveData') : saveData;
  }, [saveData]);
  const stay = React.useMemo(() => sData.info.stay, [sData]);
  //roulette
  const [rouletteState, setRouletteState] = useState([]);
  const [selectRoulettePos, setSelectRoulettePos] = useState([]);
  const [selectScenario, setSelectScenario] = useState(util.loadData('historyParam')?.scenario ? util.loadData('historyParam').scenario : {});
  const [rouletteEnemy, setRouletteEnemy] = useState(util.loadData('historyParam')?.roulette ? util.loadData('historyParam').roulette : {base: {},add: {}, lv: {}, map: {}});
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
      case "scenario":
        return {
          selectScenario: selectScenario,
        };
      case "moveRegion":
        return {
          selectMoveRegion: selectMoveRegion,
        };
      default: 
        return {};
    }
  }
  return (
    <Wrap direction="column">
      <QuickMenu type="main" stay={stay} gameMode={gameMode} showDim={showDim} setShowDim={setShowDim}/>
      <CountryTitle alignItems="center" back={imgSet.back.countryTitle}>
        <StyledText code="t4" color="shadow">{gameData.country.regions[util.getCountryToIdx(stay)].name[lang]}</StyledText>
      </CountryTitle>
      <Roulette gameMode={gameMode} saveData={sData} rouletteState={rouletteState} setRouletteState={setRouletteState} selectRoulettePos={selectRoulettePos} setSelectRoulettePos={setSelectRoulettePos} rouletteArr={rouletteArr.current} rouletteEnemy={rouletteEnemy} setRouletteEnemy={setRouletteEnemy} />
      <Scenario gameMode={gameMode} saveData={sData} changeSaveData={changeSaveData} stay={stay} selectScenario={selectScenario} setSelectScenario={setSelectScenario} />
      <MoveRegion gameMode={gameMode} saveData={sData} stay={stay} selectMoveRegion={selectMoveRegion} setSelectMoveRegion={setSelectMoveRegion} />
      <CardGroup>
      </CardGroup>
      <GameMainFooter saveData={sData} gameMode={gameMode} setGameMode={setGameMode} stay={stay} 
      {...gameModeAttr(gameMode)}  />
    </Wrap>
  );
};

export default GameMain;
