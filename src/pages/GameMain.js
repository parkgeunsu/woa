import { AppContext } from 'App';
import { Text } from 'components/Atom';
import { FlexBox } from 'components/Container';
import { util } from 'components/Libs';
import CharacterCard from 'pages/CharacterCard';
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
  width: 270px;
  height: 90px;
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

const Cards = styled.div`
  position: absolute;
  left: 50%;
  top: ${({idx}) => {
    return `${80 - idx * 1.5}%`; //10%
  }};
  transform-origin: 50% 50%;
  transform: translate(-50%, -50%) rotateX(70deg) rotateY(0deg) rotateZ(0deg);
  box-shadow: ${({shadow}) => `0 0 20px ${shadow}`};
`;
const CardBack = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background:url(${({cardBack}) => cardBack}) no-repeat center center;
  background-size:100%;
`;
const GameMain = ({
  saveData,
  changeSaveData,
  cityIdx,
  gameMode,
  setGameMode,
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
  return (
    <Wrap direction="column">
      <QuickMenu type="main" gameMode={gameMode} />
      <CountryTitle alignItems="center" back={imgSet.back[8]}>
        <StyledText code="t7" color="shadow">{gameData.msg.regions[stay][lang]}</StyledText>
      </CountryTitle>
      <Roulette gameMode={gameMode} saveData={sData} rouletteState={rouletteState} setRouletteState={setRouletteState} selectRoulettePos={selectRoulettePos} setSelectRoulettePos={setSelectRoulettePos} rouletteArr={rouletteArr.current} rouletteEnemy={rouletteEnemy} setRouletteEnemy={setRouletteEnemy} />
      <Scenario gameMode={gameMode} saveData={sData} changeSaveData={changeSaveData} stay={stay} selectScenario={selectScenario} setSelectScenario={setSelectScenario} />
      <MoveRegion gameMode={gameMode} saveData={sData} stay={stay} selectMoveRegion={selectMoveRegion} setSelectMoveRegion={setSelectMoveRegion} />
      <CardGroup>
        {sData.ch?.map((cardData, idx) => {
          const shadowColor = gameData.chGradeColor[cardData.grade];
          return (
            <Cards shadow={shadowColor} idx={idx} key={`card${idx}`} onTouchStart={(e) => {

            }} onTouchMove={(e) => {

            }} onTouchEnd={() => {

            }}>
              <CharacterCard usedType="gameMain" size="90" equalSize={false} saveData={sData} slotIdx={idx} />
              <CardBack cardBack={imgSet.etc.imgCardBack} />
            </Cards>
          );
        })}
      </CardGroup>
      <GameMainFooter saveData={sData} gameMode={gameMode} setGameMode={setGameMode} stay={stay} rouletteState={rouletteState} setRouletteState={setRouletteState} selectRoulettePos={selectRoulettePos} setSelectRoulettePos={setSelectRoulettePos} rouletteArr={rouletteArr.current} rouletteEnemy={rouletteEnemy} setRouletteEnemy={setRouletteEnemy} selectScenario={selectScenario} selectMoveRegion={selectMoveRegion} />
    </Wrap>
  );
};

export default GameMain;
