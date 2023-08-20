import { AppContext } from 'App';
import { Button } from 'components/Button';
import { FlexBox } from 'components/Container';
import { util } from 'components/Libs';
import { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
`;
const ButtonWrap = styled(FlexBox)`
  position: absolute;
  left: 0;
  top: 0;
  ${({gameMode}) => {
    return gameMode ? `
      opacity: 1;
      pointer-events: unset;
      z-index: 2;
    ` : `
      opacity: 0;
      pointer-events: none;
      z-index: 1;
    `;
  }}
  transition: all 0.5s;
  ${({isRoot}) => !isRoot ? `
    button {
      width: 100%;
      flex: 1;
    }
    button.backBtn{
      width: unset;
      flex: unset;
    }
  ` : ''}
`;
const pickMsgArr = ['drawingEnemy', 'drawingCardLevels', 'pickMapType'];
const GameMainFooter = ({
  navigate,
  saveData,
  changePage,
  gameMode,
  setGameMode,
  lang,
  rouletteState,
  setRouletteState,
  selectRoulettePos,
  setSelectRoulettePos,
  rouletteArr,
  setEnemy,
}) => {
  const gameData = useContext(AppContext).gameData;
  const imgSet = useContext(AppContext).images;
  const [rouletteIdx, setRouletteIdx] = useState(0);
  const [isRouletteSpin, setRouletteSpin] = useState(false);
  const sec = useRef(0);
  const interval = useRef(0);
  const [pickMsg, setPickMsg] = useState(gameData.msg.button[pickMsgArr[0]][lang]);
  useEffect(() => {

  }, []);
  return (
    <>
      <Wrapper className="footer">
        <ButtonWrap gameMode={gameMode === ''} isRoot={true}>
          <Button onClick={() => {
            setGameMode('roulette');
          }}>{gameData.msg.button['exploreRegions'][lang]}</Button>
          <Button onClick={() => {
            setGameMode('scenario');
          }}>{gameData.msg.button['scenarios'][lang]}</Button>
          <Button onClick={() => {
            setGameMode('moveRegion');
          }}>{gameData.msg.button['moveRegion'][lang]}</Button>
        </ButtonWrap>
        <ButtonWrap gameMode={gameMode === 'roulette'}>
          {rouletteIdx === 0 && <Button className="backBtn" onClick={() => {
            setRouletteIdx(0);
            setGameMode('');
          }}>{gameData.msg.button['cancel'][lang]}</Button>}
          <Button onClick={() => {
            if (!isRouletteSpin) {
              if (rouletteIdx === 3) {//탐색시작
                navigate('battle');
                changePage('battle', {
                  scenario:{
                    country: 0,
                    period: 6,
                    scenario: 0,
                    stage: 0
                  }
                });
                return;
              }
              interval.current = setInterval(() => {
                sec.current += 0.1;
              }, 10);
              const cloneState = [...rouletteState];
              cloneState[rouletteIdx] = true;
              setRouletteState(cloneState);
              setRouletteSpin(true);
              setPickMsg(gameData.msg.button['stop'][lang]);
            } else {
              clearInterval(interval.current);
              interval.current = null;
              setRouletteSpin(false);
              const clonePos = [...selectRoulettePos];
              clonePos[rouletteIdx] = Math.round(sec.current) % rouletteArr[rouletteIdx].cards.length;
              setSelectRoulettePos(clonePos);
              if (rouletteIdx >= rouletteArr.length - 1) {
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
                setPickMsg(gameData.msg.button[pickMsgArr[rouletteIdx]][lang]);
              }
              setRouletteIdx(prev => ++prev);
              sec.current = 0;
            }
          }}>{pickMsg}</Button>
        </ButtonWrap>
        <ButtonWrap gameMode={gameMode === 'scenario'}>
          <Button onClick={() => {
            setGameMode('');
          }}>{gameData.msg.button['cancel'][lang]}</Button>
          <Button onClick={() => {
          }}>{'pickMsg'}</Button>
        </ButtonWrap>
        <ButtonWrap gameMode={gameMode === 'moveRegion'}>
          <Button onClick={() => {
            setGameMode('');
          }}>{gameData.msg.button['cancel'][lang]}</Button>
          <Button onClick={() => {
          }}>{'pickMsg'}</Button>
        </ButtonWrap>
      </Wrapper>
    </>
  );
}

export default GameMainFooter;
