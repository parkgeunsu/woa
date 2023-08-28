import { AppContext } from 'App';
import { Button } from 'components/Button';
import { FlexBox } from 'components/Container';
import { util } from 'components/Libs';
import Msg from 'components/Msg';
import MsgContainer from 'components/MsgContainer';
import { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 36px;
`;
const ButtonWrap = styled(FlexBox)`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
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
const StyledButton = styled(Button)`
  background: url(${({btnImg}) => btnImg}) no-repeat center center !important;
  background-size: 100% 100% !important;
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
  selectScenario,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");
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
          <StyledButton btnImg={imgSet.button.btnMD} onClick={() => {
            setGameMode('roulette');
          }}>{gameData.msg.button['exploreRegions'][lang]}</StyledButton>
          <StyledButton btnImg={imgSet.button.btnMD} onClick={() => {
            setGameMode('scenario');
          }}>{gameData.msg.button['scenarios'][lang]}</StyledButton>
          <StyledButton btnImg={imgSet.button.btnMD} onClick={() => {
            setGameMode('moveRegion');
          }}>{gameData.msg.button['moveRegion'][lang]}</StyledButton>
        </ButtonWrap>
        <ButtonWrap alignItems="self-end" gameMode={gameMode === 'roulette'}>
          {rouletteIdx === 0 && <StyledButton className="backBtn" btnImg={imgSet.button.btnSD} onClick={() => {
            setRouletteIdx(0);
            setGameMode('');
          }}>{gameData.msg.button['cancel'][lang]}</StyledButton>}
          <StyledButton btnImg={imgSet.button.btnMD} onClick={() => {
            if (!isRouletteSpin) {
              if (rouletteIdx === 3) {//탐색시작
                let isEmptyEntry = true;
                saveData.lineup.save_slot[saveData.lineup.select].entry.forEach((entryData) => {
                  if (entryData !== '') {
                    isEmptyEntry = false;
                  }
                });
                if (isEmptyEntry) {
                  setMsgOn(true);
                  setMsg(gameData.msg.sentence['organizeCard'][lang]);
                  return;
                }
                util.saveHistory(() => {
                  navigate('battle');
                  changePage('battle', {
                    scenario:{
                      stay: 0,
                      dynastyIdx: 6,
                      dynastyScenarioIdx: 0,
                      stageIdx: 0
                    }
                  });
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
          }}>{pickMsg}</StyledButton>
        </ButtonWrap>
        <ButtonWrap alignItems="self-end" gameMode={gameMode === 'scenario'}>
          <StyledButton btnImg={imgSet.button.btnSD} className="backBtn"  onClick={() => {
            setGameMode('');
          }}>{gameData.msg.button['cancel'][lang]}</StyledButton>
          {Object.keys(selectScenario).length === 0 ? 
            <StyledButton btnImg={imgSet.button.btnMD}>{gameData.msg.sentence['selectScenario'][lang]}</StyledButton> :
            <StyledButton btnImg={imgSet.button.btnMD} type="icon" icon={imgSet.icon[`iconDifficult${selectScenario.stageDifficult}`]} onClick={() => {
              console.log('전투개시');
              util.saveHistory(() => {
                util.saveData('historyParam', {scenario: selectScenario});
                navigate('battle');
                changePage('battle', {
                  scenario:{
                    stay: selectScenario.stay,
                    dynastyIdx: selectScenario.dynastyIdx,
                    dynastyScenarioIdx: selectScenario.dynastyScenarioIdx,
                    stageIdx: selectScenario.stageIdx,
                    stageDifficult: selectScenario.stageDifficult,
                  }
                });
              });
            }}>{gameData.scenario[selectScenario.stay][selectScenario.dynastyIdx].scenarioList[selectScenario.dynastyScenarioIdx].stage[selectScenario.stageIdx].title[lang]} {gameData.msg.button['startBattle'][lang]}</StyledButton>
          }
        </ButtonWrap>
        <ButtonWrap alignItems="self-end" gameMode={gameMode === 'moveRegion'}>
          <StyledButton btnImg={imgSet.button.btnSD} className="backBtn"  onClick={() => {
            setGameMode('');
          }}>{gameData.msg.button['cancel'][lang]}</StyledButton>
          <StyledButton btnImg={imgSet.button.btnMD} onClick={() => {
          }}>{'pickMsg'}</StyledButton>
        </ButtonWrap>
      </Wrapper>
      <MsgContainer>
        {msgOn && <Msg text={msg} showMsg={setMsgOn}></Msg>}
      </MsgContainer>
    </>
  );
}

export default GameMainFooter;
