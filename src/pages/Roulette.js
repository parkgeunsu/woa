import { AppContext } from 'App';
import { Text } from 'components/Atom';
import { Button } from 'components/Button';
import { FlexBox } from 'components/Container';
import { util } from 'components/Libs';
import { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
const BASE_ENEMY_NUM = 3;
const makeAnimalIcon = (color) => {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
    <path fill="#fff" d="M9.84,19.86c-5,0-9.07-3.87-9.07-8.63c0-1.59,0.46-3.14,1.33-4.49C1.78,3.7,3,1,3.06,0.88L3.4,0.14l0.73,0.39
    C4.2,0.56,5.75,1.41,7.19,2.99C8.06,2.73,8.95,2.6,9.84,2.6c0.91,0,1.81,0.13,2.69,0.39c1.5-1.56,3.11-2.38,3.18-2.41l0.74-0.37
    l0.32,0.76c0.05,0.12,1.15,2.76,0.79,5.73c0.88,1.36,1.35,2.92,1.35,4.53C18.91,15.99,14.84,19.86,9.84,19.86z"/>
    <path fill="${color || '#BF8117'}" d="M16.75,6.9c0.45-2.91-0.7-5.62-0.7-5.62s-1.79,0.9-3.3,2.61c-0.91-0.33-1.89-0.51-2.92-0.51
      c-1.02,0-2,0.18-2.9,0.5C5.5,2.14,3.76,1.21,3.76,1.21S2.49,3.96,2.9,6.93c-0.86,1.24-1.36,2.71-1.36,4.3
      c0,4.34,3.71,7.86,8.29,7.86c4.58,0,8.29-3.52,8.29-7.86C18.14,9.63,17.63,8.14,16.75,6.9z M16.66,10.47
      c0.1-0.02,0.21,0.04,0.23,0.14c0.03,0.1-0.04,0.21-0.14,0.23l-1.51,0.37c-0.02,0-0.03,0.01-0.05,0.01c-0.09,0-0.17-0.06-0.19-0.15
      c-0.03-0.1,0.04-0.21,0.14-0.23L16.66,10.47z M15.3,2.8c0,0,0.41,1.17,0.31,2.79c-0.57-0.52-1.22-0.97-1.93-1.32
      C14.54,3.34,15.3,2.8,15.3,2.8z M12.66,8.61c0.55,0,1,0.45,1,1c0,0.55-0.45,1-1,1s-1-0.45-1-1C11.66,9.06,12.1,8.61,12.66,8.61z
      M7.02,8.61c0.55,0,1,0.45,1,1c0,0.55-0.45,1-1,1s-1-0.45-1-1C6.02,9.06,6.47,8.61,7.02,8.61z M4.3,2.88c0,0,0.74,0.53,1.59,1.45
      c-0.7,0.36-1.34,0.81-1.9,1.34C3.89,4.05,4.3,2.88,4.3,2.88z M2.79,10.61c0.03-0.1,0.13-0.17,0.23-0.14l1.51,0.37
      c0.1,0.03,0.17,0.13,0.14,0.23c-0.02,0.09-0.1,0.15-0.19,0.15c-0.02,0-0.03,0-0.05-0.01l-1.51-0.37
      C2.83,10.82,2.76,10.72,2.79,10.61z M4.53,13.57l-1.46,0.54C3.05,14.12,3.02,14.12,3,14.12c-0.08,0-0.15-0.05-0.18-0.13
      c-0.04-0.1,0.01-0.21,0.11-0.25l1.46-0.54c0.1-0.04,0.21,0.01,0.25,0.11C4.68,13.42,4.63,13.53,4.53,13.57z M4.51,12.25H2.95
      c-0.11,0-0.19-0.09-0.19-0.19c0-0.11,0.09-0.19,0.19-0.19h1.55c0.11,0,0.19,0.09,0.19,0.19C4.7,12.17,4.61,12.25,4.51,12.25z
      M11.99,14.37c-0.96,0-1.79-0.58-2.15-1.4c-0.36,0.82-1.19,1.4-2.15,1.4c-1.28,0-2.32-1.04-2.32-2.32c0-0.11,0.09-0.19,0.19-0.19
      c0.11,0,0.19,0.09,0.19,0.19c0,1.07,0.87,1.93,1.93,1.93c1.08,0,1.96-0.87,1.96-1.93c0-0.11,0.09-0.19,0.19-0.19
      s0.19,0.09,0.19,0.19c0,1.07,0.88,1.93,1.96,1.93c1.07,0,1.94-0.87,1.94-1.93c0-0.11,0.09-0.19,0.19-0.19s0.19,0.09,0.19,0.19
      C14.31,13.33,13.27,14.37,11.99,14.37z M15.18,11.87h1.55c0.11,0,0.19,0.09,0.19,0.19c0,0.11-0.09,0.19-0.19,0.19h-1.55
      c-0.11,0-0.19-0.09-0.19-0.19C14.98,11.95,15.07,11.87,15.18,11.87z M16.86,13.99c-0.03,0.08-0.1,0.13-0.18,0.13
      c-0.02,0-0.04,0-0.07-0.01l-1.46-0.54c-0.1-0.04-0.15-0.15-0.11-0.25c0.04-0.1,0.15-0.15,0.25-0.11l1.46,0.54
      C16.85,13.78,16.9,13.89,16.86,13.99z"/>
  </svg>`
}
const StyledAnimalIcon = styled.div`
  display: inline-block;
  margin: 0 0 0 1px;
  width: 16px;
  height: 16px;
  vertical-align: middle;
  &:first-of-type{
    margin: 0 0 0 5px;
  }
`;
const AnimalIcon = ({
  color,
}) => {
  return <StyledAnimalIcon dangerouslySetInnerHTML={{__html:makeAnimalIcon(color)}}></StyledAnimalIcon>
}
const Wrap = styled(FlexBox)`
  position: absolute;
  left: 0;
  top: ${({roulette}) => roulette ? '0%' : '-100%'};
  width: 100%;
  height: 100%;
  transition: top 1s;
  z-index: 10;
`;
const SpinContainer = styled(FlexBox)`
  flex: 1;
  width: 80%;
  z-index: 1;
`;
const SpinArea = styled.div`
  position: relative;
  margin: 0 5px;
  padding-top: calc(30% - 20px);
  width: 30%;
  border: 10px solid transparent;
  background: #000;
  border-image: url(${({frameMain}) => frameMain}) 20 stretch;
  border-radius: 10px;
  box-sizing: border-box;
  overflow: hidden;
`;
const makeKeyframes = (size) => {
  return `
    @keyframes upDown${size}{
      0% {
        top: 0;
      }
      100% {
        top: -${size * 100}%;
      }
    }
  `;
}
const SpinGroup = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  transition: top 1s ease-in-out;
  ${({stopPos, size, state}) => {
    if(typeof stopPos === 'number') {
      return `top: ${stopPos * -100}%`;
    } else {
      return `
        top: 0;
        ${state ? `animation: upDown${size} 0.${size}s infinite linear;` : ''};
      `;
    }}
  };
  ${({size}) => makeKeyframes(size)};
`;
const SpinCards = styled.div`
  position: absolute;
  left: 0;
  top: ${({idx}) => 100 * idx}%;
  width: 100%;
  height: 100%;
  background: url(${({url}) => url}) no-repeat center center;
  background-size: 100%;
`;
const ResultContainer = styled(FlexBox)`
  padding: 0 30px;
  flex-direction: column;
  flex: 1;
  box-sizing: border-box;
`;
const ExploringInfo = styled(FlexBox)`
  background: ${({theme}) => theme.color.shadow};
  border: 5px solid transparent;
  border-image: url(${({frameMain}) => frameMain}) 5 round;
  box-sizing: border-box;
`;
const ButtonGroup = styled(FlexBox)`
  width: 100%;
  button {
    width: unset;
  }
  & > button:last-of-type{
    flex: 1;
  }
`;
const pickMsgArr = ['drawingEnemy', 'drawingCardLevels', 'pickMapType'];
const Roulette = ({
  gameMode,
  setGameMode,
  navigate,
  changePage,
  lang,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
  const sData = util.loadData('saveData');
  const [rouletteState, setRouletteState] = useState([]);
  const [selectRoulettePos, setSelectRoulettePos] = useState([]);
  const [isRouletteSpin, setRouletteSpin] = useState(false);
  const [pickMsg, setPickMsg] = useState(gameData.msg.button[pickMsgArr[0]][lang]);
  const [enemy, setEnemy] = useState({base: [],add: [], lv: '', map: ''});
  const sec = useRef(0);
  const interval = useRef(0);
  const rouletteIdx = useRef(0);
  const [rouletteArr, setRouletteArr] = useState([
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
  useEffect(() => {
    if (gameMode === 'roulette') {
      setRouletteState(Array.from({length:rouletteArr.length}, () => false));
      setSelectRoulettePos(Array.from({length:rouletteArr.length}, () => ''));

      let enemyNum = 0,
        enemyArray = [];
      while(enemyNum < BASE_ENEMY_NUM) {
        enemyArray.push(util.getRgbColor());
        enemyNum ++;
      }
      setEnemy(prev => {
        return {
          ...prev,
          base: enemyArray,
        }
      });
    }
  }, [gameMode]);
  return (
    <Wrap roulette={gameMode === 'roulette'} direction="column">
      <SpinContainer>
        {rouletteArr.map((data, idx) => {
          return (
            <SpinArea key={`data${idx}`} frameMain={imgSet.etc.frameMain}>
              <SpinGroup state={rouletteState[idx]} stopPos={selectRoulettePos[idx]} size={data.cards.length} direction="column">
                {data.cards.map((cardsData, cardsIdx) => <SpinCards idx={cardsIdx} key={`cardsIdx${cardsIdx}`} url={imgSet.icon[`iconRoulette${cardsData.idx}`]} />)}
                <SpinCards idx={data.cards.length} url={data.cards[0].url} />
              </SpinGroup>
            </SpinArea>
          )
        })}
      </SpinContainer>
      <ResultContainer>
        <ExploringInfo direction="column" frameMain={imgSet.etc.frameMain}>
          <Text code="t3" color="main">지역 : {sData.info.stay}</Text>
          <Text code="t3" color="main">탐색 동물 : 
          {enemy.base.map((colorData, idx) => <AnimalIcon key={`color${idx}`} color={colorData}/>)}
          {enemy.add.length > 0 && ' + '} 
          {enemy.add.map((colorData, idx) => <AnimalIcon key={`color${idx}`} color={colorData}/>)} ({enemy.base.length + enemy.add.length})</Text>
          <Text code="t3" color="main">동물 LV : {enemy.lv !== '' ? sData.info.lv + (enemy.lv < 0 ? 0 : enemy.lv) : sData.info.lv} Lv</Text>
          <Text code="t3" color="main">맵 종류 : {enemy.map && gameData.msg.state[enemy.map][lang]}</Text>
          <Text code="t3" color="main">옵션 : </Text>
        </ExploringInfo>
        <ButtonGroup>
          {rouletteIdx.current === 0 && <Button onClick={() => {
            rouletteIdx.current = 0;
            setGameMode('');
          }}>{gameData.msg.button['cancel'][lang]}</Button>}
          <Button onClick={() => {
            if (!isRouletteSpin) {
              console.log(rouletteIdx.current);
              if (rouletteIdx.current === 3) {//탐색시작
                navigate('battle');
                changePage('battle');
                return;
              }
              interval.current = setInterval(() => {
                sec.current += 0.1;
              }, 10);
              const cloneState = [...rouletteState];
              cloneState[rouletteIdx.current] = true;
              setRouletteState(cloneState);
              setRouletteSpin(true);
              setPickMsg(gameData.msg.button['stop'][lang]);
            } else {
              clearInterval(interval.current);
              interval.current = null;
              setRouletteSpin(false);
              const clonePos = [...selectRoulettePos];
              clonePos[rouletteIdx.current] = Math.round(sec.current) % rouletteArr[rouletteIdx.current].cards.length;
              setSelectRoulettePos(clonePos);
              if (rouletteIdx.current >= rouletteArr.length - 1) {
                setPickMsg(gameData.msg.button['startExploring'][lang]);
                //추가 동물
                let addEnemyNum = 0,
                  addEnemyArray = [];
                while(addEnemyNum <  + rouletteArr[0].cards[clonePos[0]].amount) {
                  addEnemyArray.push(util.getRgbColor());
                  addEnemyNum ++;
                }
                setEnemy(prev => {
                  return {
                    ...prev,
                    add: addEnemyArray,
                    lv: rouletteArr[1].cards[clonePos[1]].amount,
                    map: rouletteArr[2].cards[clonePos[2]].amount
                  }
                });
              } else {
                setPickMsg(gameData.msg.button[pickMsgArr[rouletteIdx.current]][lang]);
              }
              rouletteIdx.current ++;
              sec.current = 0;
            }
          }}>{pickMsg}</Button>
        </ButtonGroup>
      </ResultContainer>
    </Wrap>
  );
}

export default Roulette;