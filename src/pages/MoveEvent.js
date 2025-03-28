import { AppContext } from 'App';
import { Text } from 'components/Atom';
import { Button } from 'components/Button';
import { FlexBox } from 'components/Container';
import { ChPic, IconPic } from 'components/ImagePic';
import { util } from 'components/Libs';
import GameMainFooter from 'pages/GameMainFooter';
import QuickMenu from 'pages/QuickMenu';
import React, { useCallback, useContext, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';

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
    const eventHeight = size * 0.7 * (length + 1),
      windowHeight = window.screen.height - 50;
    return eventHeight < windowHeight ? windowHeight : eventHeight}}px;
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
  ${({currentStep, nowIdx}) => {
    if (currentStep !== undefined && currentStep === nowIdx) {
      return  `animation: updown 1.5s infinite alternate ease-in-out;`;
    } else if (currentStep > nowIdx) {
      return `
        transition: all .5s;
        filter: grayscale(100%);
        opacity: 0;
      `;
    }
  }}
  z-index: 2;
  @keyframes updown {
    0%{
      transform: translate(0,0) scale(1);
    }
    100%{
      transform: translate(0,-10px) scale(1.5);
      filter: contrast(300%);
    }
  }
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
const MoveEvent = ({
  saveData,
  changeSaveData,
  cityIdx,
  gameMode,
  setGameMode,
  showDim,
  setShowDim,
}) => {
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
  const eventHeight = React.useMemo(() => {
    return 80;
  }, []);
  const currentStep = paramData.moveEvent.currentStep;
  const blockType = paramData.moveEvent.blockArr.type[currentStep];
  const [actionData, setActionData] = useState({});
  const [showEvent, setShowEvent] = useState(true);
  useLayoutEffect(() => {
    console.log(gameData.events.eventProcess[blockType]);
    setActionData(gameData.events.eventProcess[blockType]);
  }, [currentStep]);
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
  const stepAction = useCallback((idx, type) => {
    if (currentStep === idx) {
      console.log(`현재 스텝은 ${type}`);
    }
  }, [paramData]);
  return <>
    <Wrap className="scroll-y" ref={EventAllScroll} >
      <QuickMenu type="move" gameMode={gameMode} showDim={showDim} setShowDim={setShowDim} stay={sData.info.stay} />
      <MoveEventBack className="back" type="areaBackMoveRegion" pic="areaBack" idx={paramData.moveEvent.bg ? paramData.moveEvent.bg : 0} completeStep={currentStep / paramData.moveEvent.distance * 0.8 + 0.2}/>
      <EventAll size={eventHeight} length={paramData.moveEvent.distance}>
        <EventShadow completeStep={(currentStep + 1) / (paramData.moveEvent.distance + 1)} />
        {events.map((eventData, eventIdx) => {
          //(한국0, 일본1, 중국2, 몽골3, 사우디아라비아4, 이집트5, 그리스6, 이탈리아7, 영국8, 프랑스9, 스페인10, 포르투칼11)
          const blockHead = gameData.eventsHead[util.getStringToCountryIdx(paramData.moveEvent.moveTo)],
            blockType = paramData.moveEvent.blockArr.type[eventIdx];
          //idx={eventIdx}
          return <MapPiece idx={eventIdx} size={eventHeight} key={`event${eventIdx}`} onClick={() => {
            stepAction(eventIdx, blockType);
          }}>
            <Block type="moveEventBlock" pic="icon200" isAbsolute={true} idx={0} />
            <BlockHead type="moveEventBlockHead" pic="icon200" isAbsolute={true} idx={eventIdx % 3 === 0 ? 9 : blockHead} nowIdx={eventIdx} />
            <BlockType type="moveEventBlockType" pic="icon200" isAbsolute={true} currentStep={currentStep} idx={blockType} nowIdx={eventIdx} />
          </MapPiece>
        })}
        <MapPiece last idx={paramData.moveEvent.distance} size={eventHeight}  onClick={() => {
          stepAction(paramData.moveEvent.distance, 'finish');
        }}>
          <Block last type="moveEventBlock" pic="icon200" isAbsolute={true} idx={0} />
          <BlockHead last type="moveEventBlockHead" pic="icon200" isAbsolute={true} idx={gameData.eventsHead[util.getStringToCountryIdx(paramData.moveEvent.moveTo)]} nowIdx={paramData.moveEvent.distance} />
          <BlockType last type="moveEventFinish" pic="img400" isAbsolute={true} idx={util.getStringToCountryIdx(paramData.moveEvent.moveTo)} />
        </MapPiece>
        {paramData.moveEvent.spBlockArr.map((spEvent, spEventIdx) => {
          return (
            <EventStatue key={`spEvent${spEventIdx}`} size={eventHeight} idx={spEventIdx} eventImg={imgSet.images.moveEventCountry} currentStep={currentStep}  backPos={[gameData.eventsHead[paramData.moveEvent.moveTo], 1]}>
              <RewardBlockHead type="moveEventReward" pic="img400" isAbsolute={true} idx={19} />
              <RewardBlockType type="moveEventReward" pic="img400" isAbsolute={true} idx={spEvent.get ? spEvent.type + 1 : 0} distance={paramData.moveEvent.distance} nowIdx={spEventIdx} currentStep={currentStep} eventClear={spEvent.get} />
            </EventStatue>
          )
        })}
      </EventAll>
      <EventView frameImg={imgSet.images.frame0} onClick={() => {
        setShowEvent(prev => !prev);
      }}>
        {showEvent && 
          <>
            <EventBack pic="eventBack" idx={paramData.moveEvent.blockArr.type[currentStep]} />
            <EventTitle code="t2" color="main" frameImg={imgSet.images.frame0}>
              {gameData.msg.moveEvent["eventText" + blockType][lang]}
            </EventTitle>
            <EventText direction="column" alignItems="flex-start">
              {gameData.events.eventProcess[blockType].action.map((actionData, actionIdx) => {
                return <Button key={`action_${actionIdx}`} size="small" onClick={(e) => {
                  e.stopPropagation();
                  console.log(actionIdx, actionData.name)
                }}>{actionIdx + 1}. {gameData.msg.moveEvent[actionData.name][lang]}</Button>
              })}
            </EventText>
          </>
        }
      </EventView>
    </Wrap>
    <GameMainFooter saveData={sData} gameMode={"moveEvent"} setGameMode={setGameMode} stay={sData.info.stay} moveData={paramData.moveEvent} actionData={actionData} showEvent={showEvent} setShowEvent={setShowEvent} />
  </>
}

export default MoveEvent;
