import { AppContext } from 'App';
import { Icon } from 'components/Atom';
import { Button } from 'components/Button';
import { FlexBox } from 'components/Container';
import { util } from 'components/Libs';
import Msg from 'components/Msg';
import MsgContainer from 'components/MsgContainer';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 36px;
  z-index: 10;
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
const StyledIcon = styled(Icon)`
  margin: 0 10px;
  transform: scale(-1);
`;
const pickMsgArr = ['drawingEnemy', 'drawingCardLevels', 'pickMapType', 'startExploring'];
const checkStep = (data) => {
  if (!data) return 0;
  if (Object.keys(data.map).length !== 0) {
    return 3;
  }
  if (Object.keys(data.lv).length !== 0) {
    return 2;
  }
  if (Object.keys(data.add).length !== 0) {
    return 1;
  }
  return 0;
}
const GameMainFooter = ({
  saveData,
  gameMode,
  setGameMode,
  stay,
  rouletteState,
  setRouletteState,
  selectRoulettePos,
  setSelectRoulettePos,
  rouletteArr,
  rouletteEnemy,
  setRouletteEnemy,
  selectScenario,
  selectMoveRegion,
}) => {
  const navigate = useNavigate();
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
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");
  const currentStep = React.useMemo(() => {
    return checkStep(util.loadData('historyParam')?.roulette) || 0
  }, []);
  const [rouletteIdx, setRouletteIdx] = useState(currentStep);
  const [isRouletteSpin, setRouletteSpin] = useState(false);
  const sec = useRef(0);
  const interval = useRef(0);
  const [pickMsg, setPickMsg] = useState(gameData.msg.button[pickMsgArr[currentStep]][lang]);
  const stayIdx = useRef(util.getCountryToIdx(stay));
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
                  util.saveData('historyParam', {
                    ...util.loadData('historyParam'),
                    scenario: {
                      stay: stay,
                      stageDifficult: selectScenario.stageDifficult,
                    }
                  });
                  navigate('../battle');
                });
                setRouletteIdx(0);
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

              const cloneRouletteEnemy = {
                ...rouletteEnemy,
              }
              switch(rouletteIdx) {
                case 0:
                  //추가 동물
                  let addEnemyNum = 0,
                    addEnemyArray = [];
                  while(addEnemyNum <  + rouletteArr[0].cards[clonePos[0]].amount) {
                    addEnemyArray.push(util.getRgbColor());
                    addEnemyNum ++;
                  }
                  cloneRouletteEnemy.add = {idx: clonePos[0], color: addEnemyArray};
                  break;
                case 1:
                  cloneRouletteEnemy.lv = {idx: clonePos[1], num: rouletteArr[1].cards[clonePos[1]].amount};
                  break;
                case 2:
                  cloneRouletteEnemy.map = {idx: clonePos[2], num: rouletteArr[2].cards[clonePos[2]].amount};
                  break;
                default:
                  break;
              }
              setRouletteEnemy(cloneRouletteEnemy);
              util.saveData('historyParam', {
                ...util.loadData('historyParam'),
                roulette: cloneRouletteEnemy,
              });
              setRouletteIdx(prev => {
                prev += 1;
                setPickMsg(gameData.msg.button[pickMsgArr[prev]][lang]);
                return prev;
              });
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
            <StyledButton btnImg={imgSet.button.btnMD} type="icon" icon={imgSet.icon[`iconDifficult${selectScenario?.stageDifficult}`]} onClick={() => {
              console.log('전투개시');
              util.saveHistory(() => {
                util.saveData('historyParam', {
                  ...util.loadData('historyParam'),
                  scenario: {
                    stay: stay,
                    dynastyIdx: selectScenario.dynastyIdx,
                    dynastyScenarioIdx: selectScenario.dynastyScenarioIdx,
                    stageIdx: selectScenario.stageIdx,
                    stageDifficult: selectScenario.stageDifficult,
                  }
                });
                navigate('../battle');
              });
            }}>{gameData.scenario[stay][selectScenario.dynastyIdx]?.scenarioList[selectScenario.dynastyScenarioIdx].stage[selectScenario.stageIdx].title[lang]} {gameData.msg.button['startBattle'][lang]}</StyledButton>
          }
        </ButtonWrap>
        <ButtonWrap alignItems="self-end" gameMode={gameMode === 'moveRegion'}>
          <StyledButton btnImg={imgSet.button.btnSD} className="backBtn"  onClick={() => {
            setGameMode('');
          }}>{gameData.msg.button['cancel'][lang]}</StyledButton>
          <StyledButton btnImg={imgSet.button.btnMD} onClick={() => {
            if (selectMoveRegion === '') {
              setMsgOn(true);
              setMsg(gameData.msg.sentence['selectMoveCountry'][lang]);
            } else if (stayIdx.current === selectMoveRegion) {
              setMsgOn(true);
              setMsg(gameData.msg.sentence['sameCountry'][lang]);
            } else {
              console.log('지역이동');
              util.saveHistory(() => {
                const distance = util.getDistanceToEvent(gameData.country[stayIdx.current].distancePosition, gameData.country[selectMoveRegion]?.distancePosition) + gameData.countryEventsNum;
                util.saveData('historyParam', {
                  ...util.loadData('historyParam'),
                  moveEvent: {
                    stay: stay,
                    moveTo: selectMoveRegion,
                    distance: distance,
                    blockArr: {
                      block: Array.from({length:distance}, () => Math.floor(Math.random() * gameData.events.block.length)),
                      type: Array.from({length:distance}, () => util.fnPercent(gameData.percent.eventsPercent)),
                    },
                    spBlockArr: Array.from({length:Math.floor(distance / 4) + 1}, () => { return {type: util.fnPercent(gameData.percent.bigEventsPercent), get: false}}),
                    currentStep: 0,
                  }
                });
                navigate('../moveEvent');
              });
            }
          }}>
            <FlexBox>
              {stayIdx.current === selectMoveRegion ? <>
                {gameData.msg.sentence['sameCountry'][lang]}
              </> : <>
                {gameData.msg.regions[stay][lang]} <StyledIcon url={imgSet.icon.iconBack} /> {gameData.msg.regions[util.getIdxToCountry(selectMoveRegion)][lang]}
              </>
              }
            </FlexBox>
          </StyledButton>
        </ButtonWrap>
      </Wrapper>
      <MsgContainer>
        {msgOn && <Msg text={msg} showMsg={setMsgOn}></Msg>}
      </MsgContainer>
    </>
  );
}

export default GameMainFooter;
