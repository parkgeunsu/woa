import { AppContext } from 'App';
import { util } from 'components/Libs';
import QuickMenu from 'pages/QuickMenu';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  ${({color}) => `
    background-image: linear-gradient(to top, #000, ${color});
  `}
  ${'' /* background: ; */}
`;
const idxToSize = (idx) => {
  switch(idx) {
    case 0:
    case 11:
      return 0.7;
    case 5:
    case 7:
    case 10:
      return 1;
    case 8:
    case 9:
      return 1.5;
    case 1:
    case 2:
    case 3:
    case 4:
    case 6:
      return 2;
    default:
      break;
  }
  return 
}
const idxToOpacity = (idx) => {
  switch(idx) {
    case 0:
      return 0.2;
    case 1:
    case 3:
    case 5:
    case 6:
    case 7:
    case 9:
    case 11:
      return 0.3;
    case 4:
    case 8:
    case 10:
      return 0.5;
    case 2:
      return 0.7;
    default:
      break;
  }
  return 
}
const CountryPattern = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  ${({img, idx}) => `
    background-image: url(${img});
    background-repeat: repeat;
    background-size: ${idxToSize(idx) * 100}px;
    opacity: ${idxToOpacity(idx)};
  `}
`;
const EventAll = styled.div`
  position: relative;
  width: 100%;
  height: ${({size, length}) => {
    const eventHeight = size * 0.7 * (length + 1),
      windowHeight = window.screen.height - 50;
    return eventHeight < windowHeight ? windowHeight : eventHeight}}px;
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
  ${({currentStep, idx}) => {
    if (currentStep !== undefined && currentStep === idx) {
      return  `animation: updown 1.5s infinite alternate ease-in-out;`;
    } else if (currentStep > idx) {
      return `transition: all .5s;filter: grayscale(100%);opacity:0;`;
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
  &:before{
    display: ${({get}) => get ? 'none' : 'block'};
    content:'';
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    ${({size, eventType, eventImg}) => {
      return `
      background-image: url(${eventImg});
      background-position: -${eventType * size * 2}px 0px;
      background-repeat: no-repeat;
      background-size: ${size * 2 * 14}px;
      `
    }}
    ${({currentStep, idx}) => {
      return currentStep > idx * 3 + 3 ? `
        animation: fadeInOut 0.5s infinite alternate ease-in-out;;
      ` : `
        filter: grayscale(1);
        opacity: 0.5;
      `
    }}
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
    filter: ${({max, idx}) => idx * 3 + 3 > max ? `hue-rotate(200deg);` : `hue-rotate(90deg);`}
  }
  @keyframes fadeInOut {
    0%{
      opacity: 1;
    }
    100%{
      opacity: 0.5;
    }
  }
`;
const MoveEvent = ({
  saveData,
  changeSaveData,
  changePage,
  navigate,
  cityIdx,
  gameMode,
  lang,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
  const canvasRef = useRef(null);
  const [countryPattern, setCountryPattern] = useState();
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
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.setAttribute('width', 200);
      canvasRef.current.setAttribute('height', 200);
      const ctx = canvasRef.current.getContext('2d');
      const img = new Image();
      img.addEventListener('load', () => {
        ctx.drawImage(img, 200 * paramData.moveEvent.moveTo, 800, 200, 200, 0, 0, 200, 200);
        if (canvasRef.current !== null) {
          setCountryPattern(canvasRef.current.toDataURL('image/png'));
        }
      });
      img.src = imgSet.images.moveEvent;
    }
  }, [paramData]);
  const EventAllScroll = useCallback((node) => {
    if (node !== null) {
      node.scrollTo(0, 2000);
    }
  }, []);
  const stepAction = useCallback((idx, type) => {
    if (paramData.moveEvent.currentStep === idx) {
      console.log(`현재 스텝은 ${type}`);
    }
  }, [paramData]);
  return <Wrap className="scroll-y" ref={EventAllScroll} color={gameData.eventsCountryColor[paramData.moveEvent.moveTo]} >
    <QuickMenu type="move" changePage={changePage} gameMode={gameMode} navigate={navigate} lang={lang} />
    <canvas style={{
      position:'absolute',
      visibility:'hidden',
      pointerEvents:'none',
    }} ref={canvasRef}></canvas>
    <CountryPattern img={countryPattern} idx={paramData.moveEvent.moveTo} />
    <EventAll size={eventHeight} length={paramData.moveEvent.distance}>
      {events.map((eventData, eventIdx) => {
        //(한국0, 일본1, 중국2, 몽골3, 사우디아라비아4, 이집트5, 그리스6, 이탈리아7, 영국8, 프랑스9, 스페인10, 포르투칼11)
        const block = paramData.moveEvent.blockArr.block[eventIdx],
          blockHead = gameData.eventsHead[paramData.moveEvent.moveTo],
          blockType = paramData.moveEvent.blockArr.type[eventIdx];
        return <MapPiece idx={eventIdx} size={eventHeight} key={`event${eventIdx}`} onClick={() => {
          stepAction(eventIdx, blockType);
        }}>
          <Block img={imgSet.images.moveEvent} size={eventHeight} pos={[block, 0]} />
          <BlockHead img={imgSet.images.moveEvent} size={eventHeight} pos={[blockHead, 1]} idx={eventIdx} />
          <BlockType currentStep={paramData.moveEvent.currentStep} idx={eventIdx} img={imgSet.images.moveEvent} size={eventHeight} pos={[blockType, 2]} />
        </MapPiece>
      })}
      <MapPiece last idx={paramData.moveEvent.distance} size={eventHeight}  onClick={() => {
        stepAction(paramData.moveEvent.distance, 'finish');
      }}>
        <Block last img={imgSet.images.moveEvent} size={eventHeight} pos={[0, 0]} />
        <BlockHead last img={imgSet.images.moveEvent} size={eventHeight} pos={[gameData.eventsHead[paramData.moveEvent.moveTo], 1]} idx={paramData.moveEvent.distance} />
        <BlockType last img={imgSet.images.moveEvent} size={eventHeight} pos={[paramData.moveEvent.moveTo, 3]} />
      </MapPiece>
      {paramData.moveEvent.spBlockArr.map((spEvent, spEventIdx) => {
        return (
          <EventStatue key={`spEvent${spEventIdx}`} size={eventHeight} idx={spEventIdx} max={paramData.moveEvent.distance} eventType={spEvent.type} eventImg={imgSet.images.moveEventCountry} currentStep={paramData.moveEvent.currentStep} eventClear={spEvent.get} backImg={imgSet.images.moveEvent} backPos={[gameData.eventsHead[paramData.moveEvent.moveTo], 1]} />
        )
      })}
    </EventAll>
  </Wrap>
}

export default MoveEvent;
