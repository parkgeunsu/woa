import { AppContext } from 'App';
import { Text } from 'components/Atom';
import { Button } from 'components/Button';
import { FlexBox } from 'components/Container';
import { ChPic, IconPic } from 'components/ImagePic';
import { util } from 'components/Libs';
import Msg from 'components/Msg';
import MsgContainer from 'components/MsgContainer';
import GameMainFooter from 'pages/GameMainFooter';
import QuickMenu from 'pages/QuickMenu';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const EVENT_HEIGHT = 80;
const Wrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--color-b);
`;
const MoveEventBack = styled(ChPic)`
  position: absolute;
  top: 50%;
  margin: auto;
  padding-top: 175%;
  width: 100%;
  height: 0;
  opacity: ${({completeStep}) => completeStep};
  transform: translate(0, -50%);
  pointer-events: none;
`;
const EventAll = styled.div`
  position: relative;
  width: 100%;
  height: ${({size, length}) => {
    const EVENT_HEIGHT = size * 0.7 * (length + 1),
      windowHeight = window.screen.height - 50;
    return EVENT_HEIGHT < windowHeight ? windowHeight : EVENT_HEIGHT}}px;
`;
const EventShadow = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: ${({completeStep}) => (completeStep * 100 + 30) >= 100 ? `transparent` : `linear-gradient(0deg, transparent ${completeStep * 100 + 5}% , #000 ${completeStep * 100 + 30}%, #000 100%)`};
  z-index: 90;
  pointer-events: none;
`;
const lastPos = (idx) => {
  if (idx < 4 || (idx > 6 && idx < 10) || (idx > 12 && idx < 16) || (idx > 18 && idx < 22) || (idx > 24 && idx < 28)) {
    return true;
  } else {
    return false;
  }
}
const MapPiece = styled.div`
  position: absolute;
  ${({idx, size, last}) => {
    const sizeUp = last ? 2 : 1;
    if (idx < 4 || (idx > 11 && idx < 16) || (idx > 23 && idx < 28)) {
      return `
        left: calc(50% + ${size * 0.8 * (idx % 4) - (window.screen.width * 0.5) / 2}px);
        bottom: ${last ? size * 0.5 * idx - size : size * 0.5 * idx}px;
        width: ${size * sizeUp}px;
        height: ${size * sizeUp}px;
        z-index: ${30 - idx};
      `
    } else if (idx < 9) {
      return `
        left: calc(50% + ${size * 0.8 * (Math.abs(idx % 4 - 2)) - (window.screen.width * 0.5) / 2}px);
        bottom: ${last ? size * 0.5 * idx - size : size * 0.5 * idx}px;
        width: ${size * sizeUp}px;
        height: ${size * sizeUp}px;
        z-index: ${30 - idx};
      `
    } else if (idx < 12 || (idx > 20 && idx < 24)) {
      return `
        left: calc(50% + ${size * 0.8 * (Math.abs(idx % 4 - 4)) - (window.screen.width * 0.5) / 2}px);
        bottom: ${last ? size * 0.5 * idx - size : size * 0.5 * idx}px;
        width: ${size * sizeUp}px;
        height: ${size * sizeUp}px;
        z-index: ${30 - idx};
      `
    } else if (idx < 21) {
      return `
        left: calc(50% + ${size * 0.8 * (Math.abs(idx % 4 - 2)) - (window.screen.width * 0.5) / 2}px);
        bottom: ${last ? size * 0.5 * idx - size : size * 0.5 * idx}px;
        width: ${size * sizeUp}px;
        height: ${size * sizeUp}px;
        z-index: ${30 - idx};
      `
    } else if (idx < 26) {
      return `
        left: calc(50% + ${size * 0.8 * (Math.abs(idx % 4 + 2)) - (window.screen.width * 0.5) / 2}px);
        bottom: ${last ? size * 0.5 * idx - size : size * 0.5 * idx}px;
        width: ${size * sizeUp}px;
        height: ${size * sizeUp}px;
        z-index: ${30 - idx};
      `
    }
  }}
  transform: ${({idx, last}) => {
    if (last && lastPos(idx)) {
      return `translate(-50%, -50%) scaleX(-1);`
    } else {
      return `translate(-50%, -50%);`
    }
  }}
`;
const Block = styled(IconPic)`
`;
const BlockHead = styled(IconPic)`
  z-index: 1;
`;
const BlockType = styled(IconPic)`
  top: -35%;
  ${({currentStep, nowIdx, last}) => {
    if (currentStep !== undefined && currentStep === nowIdx) {
      return  `animation: ${last ? "moveEventLastSelect" : "moveEventSelect"} 1.5s infinite alternate ease-in-out;`;
    } else if (currentStep > nowIdx) {
      return `
        transition: all .5s;
        filter: grayscale(100%);
        opacity: 0;
      `;
    }
  }}
  z-index: 2;
`;
const EventStatue = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  ${({size, idx}) => `
    left: calc(50% + ${idx % 2 === 0 ? -size * 1.5 : size * 1.5}px);
    bottom: ${size + (idx * size * 1.5)}px;
    width: ${size * 2}px;
    height: ${size * 2}px;
    z-index: ${30 - (idx * 3 + 4)};
  `}
`;
const RewardBlockHead = styled(IconPic)`
  top: 30%;
`;
const RewardBlockType = styled(IconPic)`
  top: -10%;
  transform: scale(0.8);
`;
const EventView = styled.div`
  position: absolute;
  left: 7.5%;
  top: 5%;
  width: 85%;
  background: #000;
  border: 15px solid;
  border-image: url(${({frameImg}) =>  frameImg}) 30 /
  15px round;
  box-sizing: border-box;
  z-index: 91;
`;
const EventBack = styled(ChPic)`
  margin: auto;
  padding-top: 100%;
  width: 100%;
  height: 0;
`;
const EventTitle = styled(Text)`
  padding: 5px 0;
  border: 5px solid;
  border-image: url(${({frameImg}) =>  frameImg}) 20 /
  10px 0 round;
`;
const EventText = styled(FlexBox)`
  padding: 10px;
  height: auto;
  width: auto;
`;
const action = ({
  type,
  gameData,
  saveData,
  changeSaveData,
  increaseStep,
  setEventPhase,
  setEventBack,
  timeoutRef,
  setMsg,
  setMsgOn,
  paramData,
  navigate,
  lang,
}) => {
  switch(type) {
    case "attack":
      let lv = 2,
        enemyNum = 0;
      if (paramData.moveEvent.blockArr.type[paramData.moveEvent.currentStep] === 0) {
        lv = Math.max(saveData.info.lv + Math.round(Math.random() * 10 - 5), 2);
        enemyNum = util.battleEnemyNum(3);
      } else {
        lv = saveData.info.lv + Math.round(Math.random() * 5 + 5);
        enemyNum = util.battleEnemyNum(7);
      }
      console.log("attack");
      const lv1Hero = util.appearedLv1Hero("moveEvent"),
        enemyPenalty = util.battlePenalty();
      util.saveHistory({
        location: 'battle',
        navigate: navigate,
        callback: () => {
          util.saveData('historyParam', {
            ...util.loadData('historyParam'),
            battle: {
              type: "moveEvent",
              title: gameData.msg.moveEvent[ paramData.moveEvent.currentStep === 0 ? "enemy" : "sEnemy"][lang],
              country: paramData.moveEvent.moveTo,
              enemy: {
                lv: lv,
                lv1Hero: lv1Hero,
                enemyNum: enemyNum,
                enemyPenalty: enemyPenalty,
                allyPenalty: "",
                helper: [],
              },
            }
          });
        },
        state: {
          battle: {
            type: "moveEvent",
            title: gameData.msg.moveEvent[ paramData.moveEvent.currentStep === 0 ? "enemy" : "sEnemy"][lang],
            country: paramData.moveEvent.moveTo,
            enemy: {
              lv: lv,
              lv1Hero: lv1Hero,
              enemyNum: enemyNum,
              enemyPenalty: enemyPenalty,
              allyPenalty: "",
              helper: [],
            },
          }
        },
        isNavigate: true,
      });
      break;
    case "save":
      if (saveData.info.morality + Math.random() * 100 > 100) {
        //setEventBack(21);
        //timeoutRef = setTimeout(() => {
          const cloneSaveData = {...saveData};
          saveData.info.morality += 1;
          setMsg(gameData.msg.sentenceFn.increaseDecrease(lang, gameData.msg.info.moral[lang], 1));
          setMsgOn(true);
          changeSaveData(cloneSaveData);
        //}, 2000);
      } else {
        setEventPhase(1);
      }
      console.log(saveData.info.morality)
      break;
    case "run":
      increaseStep();
      break;
    case "drink":
      break;
    case "ignore":
      increaseStep();
      break;
    case "conversation":
      break;
    case "gamble":
      break;
    case "steal":
      increaseStep();
      break;
    case "touchGrail":
      break;
    case "putMoney":
      break;
    case "putItem":
      break;
    case "dont":
      increaseStep();
      break;
    case "use":
      break;
    default:
      break;
  }
}
const MoveEvent = ({
  saveData,
  changeSaveData,
  cityIdx,
  gameMode,
  setGameMode,
  showDim,
  setShowDim,
}) => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const sData = React.useMemo(() => {
    return Object.keys(saveData).length > 0 ? saveData : util.loadData("saveData");
  }, [saveData]);
  const lang = React.useMemo(() => {
    return context.setting.lang;
  }, [context]);
  const imgSet = React.useMemo(() => {
    return context.images;
  }, [context]);
  const gameData = React.useMemo(() => {
    return context.gameData;
  }, [context]);
  const paramData = React.useMemo(() => {
    return util.loadData('historyParam');
  }, []);
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");
  const [currentStep, setCurrentStep] = useState(paramData.moveEvent.currentStep);
  const blockType = paramData.moveEvent.blockArr.type[currentStep];
  const [eventPhase, setEventPhase] = useState(0);
  const actionData = React.useMemo(() => {
    return currentStep + 1 === paramData.moveEvent.distance ? gameData.events.lastEvent : gameData.events.eventProcess[blockType];
  }, [gameData, blockType, currentStep, paramData]);
  const [eventBack, setEventBack] = useState(paramData.moveEvent.blockArr.type[currentStep]);
  const [showEvent, setShowEvent] = useState(true);
  const timeoutRef = useRef(null);
  // useLayoutEffect(() => {
  //   timeoutRef.current = setTimeout(() => {
  //     setShowEvent(true);
  //   }, 1000);
  //   return () => {
  //     clearTimeout(timeoutRef.current);
  //   }
  // }, []);
  const increaseStep = () => {
    const cloneParam = util.loadData('historyParam');
    cloneParam.moveEvent.currentStep = cloneParam.moveEvent.currentStep + 1;
    util.saveData('historyParam', cloneParam);
    setCurrentStep(cloneParam.moveEvent.currentStep);
    setEventPhase(0);
  }
  const events = React.useMemo(() => {
    const eventArr = Array.from({length:paramData.moveEvent.distance}, () => []);
    return eventArr;
  }, [paramData]);
  // const spEvents = React.useMemo(() => {
  //   return Array.from({length:Math.ceil(paramData.moveEvent.distance / 4)}, () => {
  //     return {type: util.fnPercent(gameData.percent.bigEventsPercent)};
  //   });
  // }, [paramData]);
  const EventAllScroll = useCallback((node) => {
    if (node !== null) {
      node.scrollTo(0, 2000);
    }
  }, []);
  return <>
    <Wrap className="scroll-y" ref={EventAllScroll} >
      <QuickMenu type="move" gameMode={gameMode} showDim={showDim} setShowDim={setShowDim} stay={sData.info.stay} />
      <MoveEventBack className="back" type="areaBackMoveRegion" pic="areaBack" idx={paramData.moveEvent.bg ? paramData.moveEvent.bg : 0} completeStep={currentStep / paramData.moveEvent.distance * 0.8 + 0.2}/>
      <EventAll size={EVENT_HEIGHT} length={paramData.moveEvent.distance}>
        <EventShadow completeStep={(currentStep + 1) / (paramData.moveEvent.distance + 1)} />
        {events.map((eventData, eventIdx) => {
          //(한국0, 일본1, 중국2, 몽골3, 사우디아라비아4, 이집트5, 그리스6, 이탈리아7, 영국8, 프랑스9, 스페인10, 포르투칼11)
          const blockHead = gameData.eventsHead[util.getStringToCountryIdx(paramData.moveEvent.moveTo)],
            blockType = paramData.moveEvent.blockArr.type[eventIdx];
          //idx={eventIdx}
          return <MapPiece idx={eventIdx} size={EVENT_HEIGHT} key={`event${eventIdx}`}>
            <Block type="moveEventBlock" pic="icon200" isAbsolute={true} idx={0} />
            <BlockHead type="moveEventBlockHead" pic="icon200" isAbsolute={true} idx={eventIdx % 3 === 0 ? 9 : blockHead} nowIdx={eventIdx} />
            <BlockType type="moveEventBlockType" pic="icon200" isAbsolute={true} currentStep={currentStep} idx={blockType} nowIdx={eventIdx} />
          </MapPiece>
        })}
        <MapPiece last idx={paramData.moveEvent.distance} size={EVENT_HEIGHT}>
          <Block last type="moveEventBlock" pic="icon200" isAbsolute={true} idx={0} />
          <BlockHead last type="moveEventBlockHead" pic="icon200" isAbsolute={true} idx={gameData.eventsHead[util.getStringToCountryIdx(paramData.moveEvent.moveTo)]} nowIdx={paramData.moveEvent.distance} />
          <BlockType last type="moveEventFinish" pic="img400" isAbsolute={true} currentStep={currentStep} nowIdx={paramData.moveEvent.distance} idx={util.getStringToCountryIdx(paramData.moveEvent.moveTo)} />
        </MapPiece>
        {paramData.moveEvent.spBlockArr.map((spEvent, spEventIdx) => {
          return (
            <EventStatue key={`spEvent${spEventIdx}`} size={EVENT_HEIGHT} idx={spEventIdx} currentStep={currentStep}  backPos={[gameData.eventsHead[paramData.moveEvent.moveTo], 1]}>
              <RewardBlockHead type="moveEventReward" pic="img400" isAbsolute={true} idx={19} />
              <RewardBlockType type="moveEventReward" pic="img400" isAbsolute={true} idx={spEvent.get ? spEvent.type + 1 : 0} distance={paramData.moveEvent.distance} nowIdx={spEventIdx} currentStep={currentStep} eventClear={spEvent.get} />
            </EventStatue>
          )
        })}
      </EventAll>
      <EventView frameImg={imgSet.images.frame0} onClick={() => {
        setShowEvent(prev => !prev);
      }}>
        {showEvent && (currentStep + 1 === paramData.moveEvent.distance ? <>
            <EventBack type="eventBack" pic="img800" idx={1} />
            <EventTitle code="t2" color="main" frameImg={imgSet.images.frame0}>
              {gameData.msg.moveEvent[gameData.events.lastEvent[`action${eventPhase}`].title][lang]}
            </EventTitle>
            <EventText className="eventOrderText" direction="column" alignItems="flex-start">
              {gameData.events.lastEvent[`action${eventPhase}`].list.map((aData, aIdx) => {
                return <Button key={`action_${aIdx}`} size="small" onClick={(e) => {
                  action({
                    type: aData.name,
                    gameData: gameData,
                    saveData: saveData,
                    changeSaveData: changeSaveData,
                    increaseStep: increaseStep,
                    setEventPhase: setEventPhase,
                    setEventBack: setEventBack,
                    timeoutRef: timeoutRef.current,
                    setMsg: setMsg,
                    setMsgOn: setMsgOn,
                    paramData: paramData,
                    navigate: navigate,
                    lang: lang,
                  });
                  e.stopPropagation();
                }}>{aIdx + 1}. {gameData.msg.moveEvent[aData.name][lang]}</Button>
              })}
            </EventText>
          </> : <>
            <EventBack type="eventBack" pic="img800" idx={gameData.events.eventProcess[blockType][`action${eventPhase}`].picIdx} />
            <EventTitle code="t2" color="main" frameImg={imgSet.images.frame0}>
              {gameData.msg.moveEvent[gameData.events.eventProcess[blockType][`action${eventPhase}`].title][lang]}
            </EventTitle>
            <EventText className="eventOrderText" direction="column" alignItems="flex-start">
              {gameData.events.eventProcess[blockType][`action${eventPhase}`].list.map((aData, aIdx) => {
                return <Button key={`action_${aIdx}`} size="small" onClick={(e) => {
                  action({
                    type: aData.name,
                    gameData: gameData,
                    saveData: saveData,
                    changeSaveData: changeSaveData,
                    increaseStep: increaseStep,
                    setEventPhase: setEventPhase,
                    setEventBack: setEventBack,
                    timeoutRef: timeoutRef.current,
                    setMsg: setMsg,
                    setMsgOn: setMsgOn,
                    paramData: paramData,
                    navigate: navigate,
                    lang: lang,
                  });
                  e.stopPropagation();
                }}>{aIdx + 1}. {gameData.msg.moveEvent[aData.name][lang]}</Button>
              })}
            </EventText>
          </>
        )}
      </EventView>
    </Wrap>
    <GameMainFooter saveData={sData} gameMode={"moveEvent"} setGameMode={setGameMode} stay={sData.info.stay} moveData={paramData.moveEvent} actionData={actionData} showEvent={showEvent} setShowEvent={setShowEvent} setShowDim={setShowDim} eventPhase={eventPhase} />
    <MsgContainer>
      {msgOn && <Msg text={msg} showMsg={setMsgOn}></Msg>}
    </MsgContainer>
  </>
}

export default MoveEvent;
