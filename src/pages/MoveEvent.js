import { AppContext } from 'App';
import { util } from 'components/Libs';
import React, { useCallback, useContext, useState } from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, #000, ${({color}) => color});
`;
const EventAll = styled.div`
  position: relative;
  width: 100%;
  height: ${({size, length}) => {
    const eventHeight = size * 0.7 * (length + 1),
      windowHeight = window.screen.height - 50;
    return eventHeight < windowHeight ? windowHeight : eventHeight}}px;
`;
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
    //0,1,2,3,7,8,9,13,14,15
    //4,5,6,10,11,12,16,17,18
    if (last && idx % 4) {
      return `translate(-50%, -50%) scaleX(-1);`
    } else {
      return `translate(-50%, -50%);`
    }
  }}
`;
const Block = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  ${({img, pos, size, last}) => {
    const sizeUp = last ? 2 : 1;
    return `
      background: url(${img}) no-repeat ${pos[0] * -size * sizeUp}px ${pos[1] * -size * sizeUp}px;
      background-size: ${size * sizeUp * 12}px;
    `
  }}
`;
const BlockHead = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  ${({img, pos, size, idx, last}) => {
    const sizeUp = last ? 2 : 1;
    return `
      background: url(${img}) no-repeat ${pos[0] * -size * sizeUp}px ${pos[1] * -size * sizeUp}px;
      background-size: ${size* sizeUp * 12}px;
      ${idx !== 0 && idx % 3 === 0 ? 'filter: hue-rotate(90deg);' : ''} 
    `
  }}
  z-index: 1;
`;
const BlockType = styled.div`
  position: absolute;
  top: -35%;
  width: 100%;
  height: 100%;
  ${({img, pos, size, last}) => {
    const sizeUp = last ? 2 : 1;
    return `
      background: url(${img}) no-repeat ${pos[0] * -size * sizeUp}px ${pos[1] * -size * sizeUp}px;
      background-size: ${size * sizeUp * 12}px;
    `
  }}
  z-index: 2;
`;
const EventStatue = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  ${({size, idx}) => `
    left: calc(50% + ${idx % 2 === 0 ? -size * 1.5 : size * 1.5}px);
    bottom: ${size + 15 + (idx * size * 1.5)}px;
    width: ${size * 2}px;
    height: ${size * 2}px;
    z-index: ${30 - (idx * 3 + 4)};
  `}
  &:before{
    content:'';
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    ${({size, eventType, eventImg, country}) => {
      return `
      background-image: url(${eventImg});
      background-position: -${eventType * size * 2}px 0px;
      background-repeat: no-repeat;
      background-size: ${size * 2 * 14}px;
      `
    }}
    filter: grayscale(1);
    opacity: 0.5;
  }
  &:after{
    content:'';
    position: absolute;
    top: 40%;
    width: 100%;
    height: 100%;
    ${({size, backImg, backPos}) => {
      return `
      background-image: url(${backImg});
      background-position: ${backPos[0] * -size * 2}px ${backPos[1] * -size * 2}px;
      background-repeat: no-repeat;
      background-size: ${size * 2 * 12}px;
      `
    }}
    opacity: 0.5;
  }
`;
const MoveEvent = ({
  saveData,
  changeSaveData,
  changePage,
  navigate,
  cityIdx,
  pageData,
  lang,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
  const [currentStep, setCurrentStep] = useState(0);
  const paramData = React.useMemo(() => {
    return util.loadData('historyParam');
  }, []);
  const eventHeight = React.useMemo(() => {
    return 80;
  }, []);
  const events = React.useMemo(() => {
    const eventArr = Array.from({length:paramData.moveEvent.distance}, () => []);
    return eventArr;
  }, [paramData]);
  const spEvents = React.useMemo(() => {
    return Array.from({length:Math.ceil(paramData.moveEvent.distance / 4)}, () => {
      return {type: util.fnPercent(gameData.percent.bigEventsPercent)};
    });
  }, [paramData]);
  const randomBlockType = useCallback(() => {
    return util.fnPercent(gameData.percent.eventsPercent);
  } ,[]);
  const EventAllScroll = useCallback((node) => {
    if (node !== null) {
      node.scrollTo(0, 2000);
    }
  }, []);
  const stepAction = useCallback((idx, type) => {
    if (currentStep === idx) {
      console.log(`현재 스텝은 ${type}`);
    }
  }, [currentStep]);
  return <Wrap className="scroll-y" ref={EventAllScroll} color={gameData.eventsCountryColor[paramData.moveEvent.moveTo]}>
    <EventAll size={eventHeight} length={paramData.moveEvent.distance}>
      {events.map((eventData, eventIdx) => {
        //(한국0, 일본1, 중국2, 몽골3, 사우디아라비아4, 이집트5, 그리스6, 이탈리아7, 영국8, 프랑스9, 스페인10, 포르투칼11)
        const block = Math.floor(Math.random() * gameData.events.block.length),
          blockHead = gameData.eventsHead[paramData.moveEvent.moveTo],
          blockType = randomBlockType();
        return <MapPiece idx={eventIdx} size={eventHeight} key={`event${eventIdx}`} onClick={() => {
          stepAction(eventIdx, blockType);
        }}>
          <Block img={imgSet.images.moveEvent} size={eventHeight} pos={[block, 0]} />
          <BlockHead img={imgSet.images.moveEvent} size={eventHeight} pos={[blockHead, 1]} idx={eventIdx} />
          <BlockType img={imgSet.images.moveEvent} size={eventHeight} pos={[blockType, 2]} />
        </MapPiece>
      })}
      <MapPiece last idx={paramData.moveEvent.distance} size={eventHeight}  onClick={() => {
        stepAction(paramData.moveEvent.distance, 'finish');
      }}>
        <Block last img={imgSet.images.moveEvent} size={eventHeight} pos={[0, 0]} />
        <BlockHead last img={imgSet.images.moveEvent} size={eventHeight} pos={[gameData.eventsHead[paramData.moveEvent.moveTo], 1]} idx={paramData.moveEvent.distance} />
        <BlockType last img={imgSet.images.moveEvent} size={eventHeight} pos={[paramData.moveEvent.moveTo, 3]} />
      </MapPiece>
      {spEvents.map((spEvent, spEventIdx) => {
        return (
          <EventStatue key={`spEvent${spEventIdx}`} size={eventHeight} idx={spEventIdx} eventType={spEvent.type} eventImg={imgSet.images.moveEventCountry} backImg={imgSet.images.moveEvent} backPos={[Math.floor(Math.random() * gameData.events.block.length), 0]} />
        )
      })}
    </EventAll>
  </Wrap>
}

export default MoveEvent;
