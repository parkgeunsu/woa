import { Button } from 'components/Button';
import { FlexBox } from 'components/Container';
import { IconPic } from 'components/ImagePic';
import { util } from 'components/Libs';
import Modal from 'components/Modal';
import ModalContainer from 'components/ModalContainer';
import Msg from 'components/Msg';
import MsgContainer from 'components/MsgContainer';
import { AppContext } from 'contexts/app-context';
import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 36px;
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
    button.smallSize{
      width: unset;
      flex: unset;
    }
  ` : ''}
`;
const StyledButton = styled(Button)`
  background: url(${({btnImg}) => btnImg}) no-repeat center center !important;
  background-size: 100% 100% !important;
  font-size: ${({theme}) => theme.font.t2};
  ${({isSelected, theme}) => isSelected ? `
    color: ${theme.color.point3};
  ` : `
    color: ${theme.color.main};
  `}
`;
const StyledIcon = styled(IconPic)`
  width: 16px;
  height: 16px;
  margin: 0 10px;
  transform: scale(-1);
`;
const pickMsgArr = ['drawingEnemy', 'drawingCardLevels', 'pickMapType', 'startExploring'];

const GameMainFooter = ({
  saveData,
  changeSaveData,
  gameMode,
  setGameMode,
  regionIdx,
  setRegionIdx,
  setShowDim,
  stay,
  ...props
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
  const [modalOn, setModalOn] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  const [modalData, setModalData] = useState({});
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");
  const currentStep = React.useMemo(() => {
    return util.exploreArea.checkStep(util.loadData('historyParam')?.roulette) || 0
  }, []);
  const [rouletteIdx, setRouletteIdx] = useState(currentStep);
  const [pickMsg, setPickMsg] = useState(gameData.msg.button[pickMsgArr[currentStep]][lang]);
  const stayIdx = useRef(util.getRegionToIdx(stay));
  return (
    <>
      <Wrapper className="footer">
        {gameMode === '' && <ButtonWrap gameMode={gameMode === ''} isRoot={true}>
          <StyledButton width="100%" isSelected={regionIdx === 0} btnImg={imgSet.button.btnMD} onClick={() => {
            setRegionIdx(prev => prev === 0 ? "" : 0);
            //setGameMode('roulette');
          }}>{gameData.msg.title.village[lang]}</StyledButton>
          <StyledButton width="100%" isSelected={regionIdx === 1} btnImg={imgSet.button.btnMD} onClick={() => {
            setRegionIdx(prev => prev === 1 ? "" : 1);
            //setGameMode('scenarioRegion');
          }}>{gameData.msg.title.activity[lang]}</StyledButton>
        </ButtonWrap>}



        {gameMode === "roulette" && <ButtonWrap alignItems="self-end" gameMode={gameMode === "roulette"}>
          {rouletteIdx === 0 && <StyledButton className="smallSize" btnImg={imgSet.button.btnSD} onClick={() => {
            setRouletteIdx(0);
            setGameMode('');
          }}>{gameData.msg.button['cancel'][lang]}</StyledButton>}
          <StyledButton width="100%" btnImg={imgSet.button.btnMD} onClick={() => {
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
                util.saveHistory({
                  location: 'battle',
                  navigate: navigate,
                  callback: () => {
                    const historyP = JSON.parse(JSON.stringify(util.loadData('historyParam') || {}));
                    util.saveData('historyParam', {
                      ...historyP,
                      battle: {
                        type: "exploring",
                        title: gameData.msg.button["startExploring"]?.[lang] || "Exploring",
                        country: util.getRegionToIdx(stay),
                        scenario: {
                          stay: stay,
                          stageDifficult: props.selectScenario?.stageDifficult,
                        },
                      }
                    });
                  },
                  state: {
                    scenario: {
                      stay: stay,
                      stageDifficult: props.selectScenario.stageDifficult,
                    }
                  },
                  isNavigate: true,
                });
                setRouletteIdx(0);
                return;
              } else {
                const randomIdx = Math.floor(Math.random() * props.rouletteArr[rouletteIdx].cards.length);

                const cloneRouletteEnemy = JSON.parse(JSON.stringify(props.rouletteEnemy || { base: {}, add: {}, lv: {}, map: {} }));
                switch(rouletteIdx) {
                  case 0:
                    //추가 동물
                    let addEnemyNum = 0,
                      addEnemyArray = [];
                    const amount = props.rouletteArr[0].cards[randomIdx]?.amount || 0;
                    while(addEnemyNum < amount) {
                      addEnemyArray.push(util.getRgbColor());
                      addEnemyNum ++;
                    }
                    cloneRouletteEnemy.add = {idx: randomIdx, color: addEnemyArray};
                    break;
                  case 1:
                    cloneRouletteEnemy.lv = {idx: randomIdx, num: props.rouletteArr[1].cards[randomIdx]?.amount || 0};
                    break;
                  case 2:
                    cloneRouletteEnemy.map = {idx: randomIdx, num: props.rouletteArr[2].cards[randomIdx]?.amount || 0};
                    break;
                  default:
                    break;
                }
                props.setRouletteEnemy(cloneRouletteEnemy);
                const historyP = JSON.parse(JSON.stringify(util.loadData('historyParam') || {}));
                util.saveData('historyParam', {
                  ...historyP,
                  roulette: cloneRouletteEnemy,
                });
                setRouletteIdx(prev => {
                  prev += 1;
                  setPickMsg(gameData.msg.button[pickMsgArr[prev]][lang]);
                  return prev;
                });
              }
              const cloneState = [...props.rouletteState];
              cloneState[rouletteIdx] = true;
              props.setRouletteState(cloneState);
          }}>{pickMsg}</StyledButton>
          {rouletteIdx > 0 && <StyledButton width="100%" btnImg={imgSet.button.btnSD} className="smallSize"  onClick={() => {
            props.setRouletteEnemy({base: {},add: {}, lv: {}, map: {}});
            util.saveData('historyParam', {
              ...util.loadData('historyParam'),
              battle: {},
              roulette: { base: {}, add: {}, lv: {}, map: {} }
            });
            setRouletteIdx(0);
            props.setRouletteState([]);
          }}>{gameData.msg.button['reset'][lang]}</StyledButton>}
        </ButtonWrap>}
        {gameMode === "scenarioRegion" && <ButtonWrap alignItems="self-end" gameMode={gameMode === "scenarioRegion"}>
          {Object.keys(props.selectScenario).length <= 0 ? 
            <StyledButton width="100%" btnImg={imgSet.button.btnMD} onClick={() => {
              setGameMode('');
            }}>{gameData.msg.button['cancel'][lang]}</StyledButton> : 
            <>
              <StyledButton width="100%" btnImg={imgSet.button.btnSD} className="smallSize"  onClick={() => {
                setGameMode('');
              }}>{gameData.msg.button['cancel'][lang]}</StyledButton>
              {!props.selectScenario?.dynastyIdx ? 
                <StyledButton width="100%" btnImg={imgSet.button.btnMD}>{gameData.msg.sentence['selectScenario'][lang]}</StyledButton> :
                <StyledButton width="100%" btnImg={imgSet.button.btnMD} type="icon" icon={{
                  pic: 'icon100',
                  type: 'scenario',
                  idx: props.selectScenario?.stageDifficult
                }} onClick={() => {
                console.log('전투개시');
                let isEmptyEntry = true;
                  (props.selectScenario?.type === 'scenario' ? saveData.ch[props.selectScenario?.slotIdx].scenario[props.selectScenario?.chScenarioIdx]?.stage[props.selectScenario?.stageIdx].lineup.slot : saveData.lineup.save_slot[saveData.lineup.select]).entry.forEach((entryData) => {
                    if (entryData !== '') {
                      isEmptyEntry = false;
                    }
                  });
                  if (isEmptyEntry) {
                    setMsgOn(true);
                    setMsg(gameData.msg.sentence['organizeCard'][lang]);
                    return;
                  }
                util.saveHistory({
                  location: 'battle',
                  navigate: navigate,
                    callback: () => {
                      const historyP = JSON.parse(JSON.stringify(util.loadData('historyParam') || {}));
                      util.saveData('historyParam', {
                        ...historyP,
                        battle: {
                          type: "scenarioRegion",
                          country: util.getRegionToIdx(stay),
                          scenario: {
                            stay: stay,
                            slotIdx: props.selectScenario.slotIdx,
                            dynastyIdx: props.selectScenario.dynastyIdx,
                            dynastyScenarioIdx: props.selectScenario.dynastyScenarioIdx,
                            stageIdx: props.selectScenario.stageIdx,
                            stageDifficult: props.selectScenario.stageDifficult,
                            chScenarioIdx: props.selectScenario.chScenarioIdx,
                            type: 'scenario',
                          },
                        }
                      });
                    },
                  state: {
                    scenario: {
                      stay: stay,
                      dynastyIdx: props.selectScenario.dynastyIdx,
                      dynastyScenarioIdx: props.selectScenario.dynastyScenarioIdx,
                      stageIdx: props.selectScenario.stageIdx,
                      stageDifficult: props.selectScenario.stageDifficult,
                      chScenarioIdx: props.selectScenario.chScenarioIdx,
                      type: 'scenario',
                    }
                  },
                  isNavigate: true,
                });
              }}>{`${gameData?.scenario[stay][props.selectScenario.dynastyIdx]?.scenarioList[props.selectScenario.dynastyScenarioIdx].stage?.[props.selectScenario.stageIdx]?.title[lang]} ${gameData.msg.button['startBattle'][lang]}` || ''}</StyledButton>
          }
          </>}
        </ButtonWrap>}
        {gameMode === "moveEvent" && <ButtonWrap alignItems="self-end" gameMode={gameMode === "moveEvent"}>
          <StyledButton width="100%" btnImg={imgSet.button.btnSD} className="smallSize"  onClick={() => {
            setGameMode('');
            util.historyBack(navigate);
            const historyP = JSON.parse(JSON.stringify(util.loadData('historyParam') || {}));
            util.saveData("historyParam", {
              ...historyP,
              moveEvent: {},
            });
          }}>{gameData.msg.button['cancel'][lang]}</StyledButton>
          <StyledButton width="100%" btnImg={imgSet.button.btnSD} className="smallSize"  onClick={() => {
            props.setShowEvent(prev => !prev);
          }}>{gameData.msg.button[props.showEvent ? "hide" : "show"][lang]}</StyledButton>
          {props.actionData && props.actionData[`action${props.eventPhase}`]?.list.map((aData, acIdx) => {
            return <StyledButton key={`actionButton_${acIdx}`} width="100%" btnImg={imgSet.button.btnMD} onClick={() => {
              document.getElementsByClassName("eventOrderText")[0].children[acIdx].click();
            }}>{acIdx + 1}
            </StyledButton>
          })}
        </ButtonWrap>}
      </Wrapper>
			<ModalContainer>
				{modalOn && <Modal submitFn={modalData.submitFn} payment={modalData.payment} imgSet={imgSet} type={"confirm"} dataObj={modalInfo} saveData={saveData} changeSaveData={changeSaveData} onClose={() => {
					setModalOn(false);
				}} gameData={gameData}/>}
			</ModalContainer>
      <MsgContainer>
        {msgOn && <Msg text={msg} showMsg={setMsgOn}></Msg>}
      </MsgContainer>
    </>
  );
}

export default GameMainFooter;
