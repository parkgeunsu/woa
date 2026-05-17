import { Text } from 'components/Atom';
import { Button } from 'components/Button';
import { FlexBox } from 'components/Container';
import Dice from 'components/Dice';
import { IconPic, MergedPic } from 'components/ImagePic';
import { util } from 'components/Libs';
import Msg from 'components/Msg';
import MsgContainer from 'components/MsgContainer';
import Popup from 'components/Popup';
import PopupContainer from 'components/PopupContainer';
import { AppContext } from 'contexts/app-context';
import GameMainFooter from 'pages/GameMainFooter';
import QuickMenu from 'pages/QuickMenu';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';

const EVENT_HEIGHT = 80;
const Wrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--color-b);
  z-index: 9;
`;
const MoveEventBack = styled(MergedPic)`
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
const EventBack = styled(MergedPic)`
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
const getItemType = (spType) => {
  switch (spType) {
    case 0:
      return "hero";
    case 1:
    case 2:
      return spType;
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
      return `3-${spType - 3}`;
    case 12:
      return Math.round(Math.random()) + 4;
    case 13:
      return "gold";
    default:
      return "gold";
  }
}
const actionDice = ({
  diceNum,
  blockType,
  type,
  gameData,
  saveData,
  changeSaveData,
  eventPhase,
  increaseStep,
  setEventPhase,
  setEventBack,
  limitDiceCount,
  timeoutRef,
  setMsg,
  setShowMsg,
  navigate,
  lang,
}) => {
  const isSuccess = limitDiceCount <= diceNum;
  clearTimeout(timeoutRef.current);
  timeoutRef.current = setTimeout(() => {
    switch (blockType) {
      case 0://몬스터
        switch (type) {
          case "save":
            if (isSuccess) {
              if (saveData.info) saveData.info.morality += 3;
              changeSaveData(saveData);
              setMsg(gameData.msg.sentenceFn.increaseDecrease(lang, gameData.msg.info.moral?.[lang] || "Morality", 3));
              setShowMsg(true);
              setEventPhase(2);
            } else {
              if (saveData.info) saveData.info.morality += 1;
              setMsg(gameData.msg.sentenceFn.increaseDecrease(lang, gameData.msg.info.moral?.[lang] || "Morality", 1));
              setShowMsg(true);
              setEventPhase(1);
            }
            break;
          case "run":
            if (isSuccess) {
              increaseStep();
            } else {
              setEventPhase(eventPhase === 0 ? 1 : 3);
            }
            break;
        }
        break;
      case 1://강력한 몬스터
        switch (type) {
          case "run":
            if (isSuccess) {
              increaseStep();
            } else {
              setEventPhase(1);
            }
            break;
        }
        break;
      case 2://금화
        break;
      case 3://보물
        break;
      case 4://성채
        break;
      case 5://함정
        break;
      case 6://포탈
        break;
      case 7://우물
        break;
      case 8://신성한 우물
        break;
      case 9://생명 우물
        break;
      case 10://민가
        switch (type) {
          case "run":
            if (isSuccess) {
              increaseStep();
            } else {
              console.log("실패");
            }
          break;
        }
        break;
      case 11://상점
        switch (type) {
          case "run":
            if (isSuccess) {
              increaseStep();
            } else {
              console.log("실패");
            }
          break;
        }
        break;
      case 12://경비병
        switch (type) {
          case "run":
            if (isSuccess) {
              increaseStep();
            } else {
              console.log("실패");
            }
          break;
          case "run":
            if (isSuccess) {
              increaseStep();
            } else {
              console.log("실패");
            }
          break;
        }
        break;
      case 13://여행자
        switch (type) {
          case "run":
            if (isSuccess) {
              increaseStep();
            } else {
              console.log("실패");
            }
          break;
          case "run":
            if (isSuccess) {
              increaseStep();
            } else {
              console.log("실패");
            }
          break;
        }
        break;
      case 14://주민
        switch (type) {
          case "run":
            if (isSuccess) {
              increaseStep();
            } else {
              console.log("실패");
            }
          break;
          case "run":
            if (isSuccess) {
              increaseStep();
            } else {
              console.log("실패");
            }
          break;
        }
        break;
      case 15://수상한자
        switch (type) {
          case "run":
            if (isSuccess) {
              increaseStep();
            } else {
              console.log("실패");
            }
          break;
          case "run":
            if (isSuccess) {
              increaseStep();
            } else {
              console.log("실패");
            }
          break;
        }
        break;
    }
  }, 500);
}
const action = ({
  blockType,
  type,
  gameData,
  saveData,
  changeSaveData,
  eventPhase,
  increaseStep,
  setEventPhase,
  setEventBack,
  timeoutRef,
  setMsg,
  setShowMsg,
  navigate,
  lang,
}) => {
  const isEmptyEntry = () => {
    let isEmpty = true;
    saveData.eventLineup.save_slot[saveData.eventLineup.select].entry.forEach((entryData) => {
      if (entryData !== '') {
        isEmpty = false;
      }
    });
    if (isEmpty) {
      setShowMsg(true);
      setMsg(gameData.msg.sentence['organizeCard'][lang]);
      return true;
    }
    return false;
  }
  const moveEvent = saveData && saveData.moveEvent;
  if (!moveEvent) return;
  //attack 변수
  let lv = 1,
    enemyNum = 1,
    heroNum = 0,
    enemyPenalty = "",
    allyPenalty = "";
  switch (blockType) {
    case 0://몬스터
      switch(type) {
        case "attack":
          if (isEmptyEntry()) return;
          lv = Math.max((saveData.info?.lv || 1) + Math.round(Math.random() * 10 - 5), 2);
          enemyNum = util.battleEnemyNum(3);
          heroNum = util.appearedBattleHero("moveEvent");
          enemyPenalty = eventPhase === 0 ? util.battlePenalty() : "";
          allyPenalty = eventPhase === 1 ? {
            type: "hp",
            num: "-20",
          } : eventPhase === 3 ? {
            type: "hp",
            num: "-40",
          } : "";
          break;
        case "save":
          break;
      }
      break;
    case 1://강력한 몬스터
      switch(type) {
        case "attack":
          if (isEmptyEntry()) return;
          lv = (saveData.info?.lv || 1) + Math.round(Math.random() * 5 + 5);
          enemyNum = util.battleEnemyNum(7);
          heroNum = util.appearedBattleHero("moveEventStrong");
          enemyPenalty = eventPhase === 0 ? util.battlePenalty() : "";
          allyPenalty = eventPhase === 1 ? {
            type: "hp",
            num: "-50",
          } : "";
          break;
      }
      break;
    case 2://금화
      break;
    case 3://보물
      break;
    case 4://성채
      break;
    case 5://함정
      break;
    case 6://포탈
      break;
    case 7://우물
      break;
    case 8://신성한 우물
      break;
    case 9://생명 우물
      break;
    case 10://민가
      break;
    case 11://상점
      break;
    case 12://경비병
      break;
    case 13://여행자
      break;
    case 14://주민
      break;
    case 15://수상한자
      break;
  }
  //공통 처리
  switch(type) {
    case "attack":
      console.log("attack");
      const battleDataObj = {
        type: "moveEvent",
        title: `${gameData.country.regions[saveData.moveEvent.moveTo].name[lang]}${gameData.msg.grammar.conjunction[lang]} ${gameData.msg.moveEvent[moveEvent.blockType === 0 ? "enemy" : "sEnemy"]?.[lang]}`,
        region: moveEvent.moveTo,
        enemy: {
          lv: lv,
          heroNum: heroNum,
          enemyNum: enemyNum,
          enemyPenalty: enemyPenalty,
          allyPenalty: allyPenalty,
          helper: [],
        },
      };
      util.saveHistory({
        prevLocation: 'moveEvent',
        location: 'battle',
        navigate: navigate,
        callback: () => {
          const historyP = JSON.parse(JSON.stringify(util.loadData('historyParam') || {}));
          util.saveData('historyParam', {
            ...historyP,
            battle: battleDataObj
          });
        },
        state: {
          battle: battleDataObj
        },
        isNavigate: true,
      });
      break;
    case "next":
      increaseStep();
      break;
  }
}
const MoveEvent = ({
  saveData,
  changeSaveData,
  gameMode,
  setGameMode,
  showDim,
  setShowDim,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const context = useContext(AppContext);
  const classification = React.useMemo(() => {
    return context.classification;
  }, [context]);
  const sData = React.useMemo(() => Object.keys(saveData).length === 0 ? util.loadData('saveData') : saveData, [saveData]);
  const lang = React.useMemo(() => {
    return context.setting.lang;
  }, [context]);
  const imgSet = React.useMemo(() => {
    return context.images;
  }, [context]);
  const gameData = React.useMemo(() => {
    return context.gameData;
  }, [context]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [popupInfo, setPopupInfo] = useState({});
  const [showMsg, setShowMsg] = useState(false);
  const [msg, setMsg] = useState("");
  const [currentStep, setCurrentStep] = useState(sData.moveEvent.currentStep);
  const blockType = React.useMemo(() => {
    return sData.moveEvent.blockArr?.type?.[currentStep] || 0;
  }, [sData, currentStep]);
  const [eventPhase, setEventPhase] = useState(0);
  const actionData = React.useMemo(() => {
    if (currentStep + 1 === sData.moveEvent.distance) {
      return gameData.events.lastEvent;
    }
    return gameData.events.eventProcess?.[blockType] || gameData.events.eventProcess[0];
  }, [gameData, blockType, currentStep, sData]);
  const [eventBack, setEventBack] = useState(sData.moveEvent.blockArr?.type?.[currentStep] || 0);
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
    if (sData.moveEvent) {
      const step = sData.moveEvent.currentStep + 1;
      changeSaveData(prev => ({
        ...prev,
        moveEvent: {
          ...prev.moveEvent,
          currentStep: step,
        }
      }));
      setCurrentStep(step);
    }
    setEventPhase(0);
  }
  const decreaseStep = () => {
    if (sData.moveEvent) {
      const step = sData.moveEvent.currentStep - 1;
      changeSaveData(prev => ({
        ...prev,
        moveEvent: {
          ...prev.moveEvent,
          currentStep: step,
        }
      }));
      setCurrentStep(step);
    }
    setEventPhase(0);
  }
  const events = React.useMemo(() => {
    const eventArr = Array.from({length:sData.moveEvent.distance}, () => []);
    return eventArr;
  }, [sData]);
  // const spEvents = React.useMemo(() => {
  //   return Array.from({length:Math.ceil(sData.moveEvent.distance / 4)}, () => {
  //     return {type: util.fnPercent(gameData.percent.bigEventsPercent)};
  //   });
  // }, [sData]);
  const EventAllScroll = useCallback((node) => {
    if (node !== null) {
      node.scrollTo(0, 2000);
    }
  }, []);
  const [showDice, setShowDice] = useState(false);
  const [actionType, setActionType] = useState("");
  const limitDiceCount = React.useMemo(() => {
    return gameData.diceCount.moveEvent[blockType][actionType];
  }, [gameData, blockType, actionType]);
  const leaderDiceSkill = React.useMemo(() => {
    let hasSkill = [false, false];
    for (const [idx, skillData] of sData.ch[sData.info.leaderIdx].hasSkill.entries()) {
      if (skillData.idx === 28) {
        hasSkill[0] = true;
      };
      if (skillData.idx === 29) {
        hasSkill[1] = true;
      };
    };
    return hasSkill;
  }, [sData]);
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    }
  }, []);
  return <>
    <div style={{position:"absolute",right:0,bottom:"40px",zIndex:100, backgroundColor: '#fff'}}>
      <button onClick={() => {
        decreaseStep();
      }}>이전 스텝</button><br/>
      <button onClick={() => {
        increaseStep();
      }}>다음 스텝</button>
    </div>
    <Wrap className="scroll-y" ref={EventAllScroll} >
      <QuickMenu type="move" gameMode={gameMode} showDim={showDim} setShowDim={setShowDim} stay={sData.info.stay} />
      <MoveEventBack className="back" type="areaBackMoveRegion" pic="areaBack2" idx={sData.moveEvent.bg ? sData.moveEvent.bg : 0} completeStep={currentStep / sData.moveEvent.distance * 0.8 + 0.2}/>
      <EventAll size={EVENT_HEIGHT} length={sData.moveEvent.distance}>
        <EventShadow completeStep={(currentStep + 1) / (sData.moveEvent.distance + 1)} />
        {events.map((eventData, eventIdx) => {
          //(한국0, 일본1, 중국2, 몽골3, 사우디아라비아4, 이집트5, 그리스6, 이탈리아7, 영국8, 프랑스9, 스페인10, 포르투칼11)
          const blockHead = gameData.eventsHead[util.getStringToCountryIdx(sData.moveEvent.moveTo || 'korea')],
            blockType = sData.moveEvent.blockArr?.type?.[eventIdx] || 0;
          //idx={eventIdx}
          return <MapPiece idx={eventIdx} size={EVENT_HEIGHT} key={`event${eventIdx}`} {...currentStep === eventIdx && {onClick: () => {setShowEvent(true);}}}>
            <Block type="moveEventBlock" pic="icon200" isAbsolute={true} idx={0} />
            <BlockHead type="moveEventBlockHead" pic="icon200" isAbsolute={true} idx={eventIdx % 3 === 0 ? 9 : blockHead} nowIdx={eventIdx} />
            <BlockType type="moveEventBlockType" pic="icon200" isAbsolute={true} currentStep={currentStep} idx={blockType} nowIdx={eventIdx}/>
          </MapPiece>
        })}
        <MapPiece last idx={sData.moveEvent.distance} size={EVENT_HEIGHT} {...currentStep === sData.moveEvent.distance && {onClick: () => {setShowEvent(true);}}}>
          <Block last type="moveEventBlock" pic="icon200" isAbsolute={true} idx={0} />
          <BlockHead last type="moveEventBlockHead" pic="icon200" isAbsolute={true} idx={gameData.eventsHead[util.getStringToCountryIdx(sData.moveEvent.moveTo || 'korea')]} nowIdx={sData.moveEvent.distance} />
          <BlockType last type="moveEventFinish" pic="img400" isAbsolute={true} currentStep={currentStep} nowIdx={sData.moveEvent.distance} idx={util.getStringToCountryIdx(sData.moveEvent.moveTo || 'korea')} />
        </MapPiece>
        {sData.moveEvent.spBlockArr?.map((spEvent, spEventIdx) => {
          return (
            <EventStatue key={`spEvent${spEventIdx}`} size={EVENT_HEIGHT} idx={spEventIdx} currentStep={currentStep} backPos={[gameData.eventsHead[sData.moveEvent.moveTo || 'korea'], 1]} onClick={() => {
              const canOpen = Math.floor(currentStep / 3)>= spEventIdx + 1,
                opened = spEvent.open,
                getItem = spEvent.get;
              if (!canOpen) {
                setShowMsg(true);
                setMsg(gameData.msg.sentence['moreStepChest'][lang]);
                return;
              }
              //보물상자 열기
              if (canOpen && !opened) {
                changeSaveData(prev => ({
                  ...prev,
                  moveEvent: {
                    ...prev.moveEvent,
                    spBlockArr: prev.moveEvent.spBlockArr.map((spData, spIdx) => {
                      return spEventIdx === spIdx ? {
                        ...spData,
                        open: true,
                      } : spData;
                    })
                  }
                }));
              }
              if (canOpen && opened && getItem) {
                setShowMsg(true);
                setMsg(gameData.msg.sentence['alreadyChest'][lang]);
                return;
              }
              //아이템 획득
              if (canOpen && opened && !getItem) {
                const itemType = getItemType(spEvent.type);
                let acquiredThings = "";
                if (itemType === "hero") {
                  acquiredThings = util.makeCard({
                    heroArr: classification,
                    gachaNum: 1,
                    gachaType: "p",
                    gameData: gameData,
                    saveData: sData,
                  });
                  changeSaveData(prev => ({
                    ...prev,
                    ch: [
                      ...prev.ch,
                      acquiredThings.chDataArr[0],
                    ]
                  }));
                  setPopupType("hero");
							    setShowPopup(true);
                } else if (itemType === "gold") {
                  acquiredThings = gameData.reward.moveEvent.gold;
                  changeSaveData(prev => ({
                    ...prev,
                    info: {
                      ...prev.info,
                      money: prev.info.money + acquiredThings,
                    }
                  }));
                  setShowMsg(true);
                  setMsg(gameData.msg.sentenceFn.getGold(lang, acquiredThings));
                } else {
                  acquiredThings = util.getItem({
                    saveData: sData,
                    gameData: gameData,
                    changeSaveData: changeSaveData,
                    option: {
                      type: 'equip',
                      items: itemType,
                      //아이템종류, 세부종류(검,단검), 매직등급
                      lv: Math.round(Math.random()*100),
                      sealed: false,
                    },
                    isSave: true,
                    theme: theme,
                    lang: lang,
                  });
                  console.log(String(itemType).indexOf("-"));
                  const itemCate = String(itemType).indexOf("-") >= 0 ? itemType.split('-') : [itemType, "0"];
                  const gameItemData = gameData.items.equip[itemCate[0]][itemCate[1]][0][acquiredThings.idx];
                  console.log(acquiredThings);
                  setPopupType("item");
                  setPopupInfo(prev => ({
                    ...prev,
                    hequip: {
                      chSlotIdx: "",
                      gameItem: gameItemData,
                      itemSaveSlot: 0,
                      saveItemData: acquiredThings,
                      itemAreaType: "",//아직 안쓰임
                      type: "hequip",
                    },
                  }));
							    setShowPopup(true);
                }
                changeSaveData(prev => ({
                  ...prev,
                  moveEvent: {
                    ...prev.moveEvent,
                    spBlockArr: prev.moveEvent.spBlockArr.map((spData, spIdx) => {
                      return spEventIdx === spIdx ? {
                        ...spData,
                        get: true,
                      } : spData;
                    })
                  }
                }));
              }
            }}>
              <RewardBlockHead type="moveEventReward" pic="img400" isAbsolute={true} idx={19} />
              <RewardBlockType type="moveEventReward" pic="img400" isAbsolute={true} idx={spEvent.get ? 15 : spEvent.open ? spEvent.type + 1 : 0} distance={sData.moveEvent.distance} nowIdx={spEventIdx} currentStep={currentStep} eventClear={spEvent.get} />
            </EventStatue>
          )
        })}
      </EventAll>
      <EventView frameImg={imgSet.images.frame0} onClick={() => {
        setShowEvent(prev => !prev);
      }}>
        {showEvent && (currentStep === sData.moveEvent.distance ? <>
            <EventBack type="eventBack" pic="img800" idx={1} />
            <EventTitle code="t2" color="main" frameImg={imgSet.images.frame0}>
              {gameData.msg.moveEvent[gameData.events.lastEvent[`action${eventPhase}`].title][lang]}
            </EventTitle>
            <EventText className="eventOrderText" direction="column" alignItems="flex-start">
              {gameData.events.lastEvent[`action${eventPhase}`].list.map((aData, aIdx) => {
                return <Button key={`action_${aIdx}`} size="small" onClick={(e) => {
                  switch(aData.name) {
                    case "save":
                    case "run":
                    case "ignore":
                    case "steal":
                    case "dont":
                      setShowDice(true);
                      break;
                    case "attack":
                    case "drink":
                    case "conversation":
                    case "gamble":
                    case "touchGrail":
                    case "putMoney":
                    case "putItem":
                    case "use":
                      action({
                        blockType: blockType,
                        type: aData.name,
                        gameData: gameData,
                        saveData: sData,
                        changeSaveData: changeSaveData,
                        eventPhase: eventPhase,
                        increaseStep: increaseStep,
                        setEventPhase: setEventPhase,
                        setEventBack: setEventBack,
                        timeoutRef: timeoutRef,
                        setMsg: setMsg,
                        setShowMsg: setShowMsg,
                        navigate: navigate,
                        lang: lang,
                      });
                      break;
                    default:
                      break;
                  }
                  setActionType(aData.name);
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
                  switch(aData.name) {
                    case "save":
                    case "run":
                    case "ignore":
                    case "steal":
                    case "dont":
                      setShowDice(true);
                      break;
                    case "attack":
                    case "next":
                    case "drink":
                    case "conversation":
                    case "gamble":
                    case "touchGrail":
                    case "putMoney":
                    case "putItem":
                    case "use":
                      action({
                        blockType: blockType,
                        type: aData.name,
                        gameData: gameData,
                        saveData: sData,
                        changeSaveData: changeSaveData,
                        eventPhase: eventPhase,
                        increaseStep: increaseStep,
                        setEventPhase: setEventPhase,
                        setEventBack: setEventBack,
                        timeoutRef: timeoutRef,
                        setMsg: setMsg,
                        setShowMsg: setShowMsg,
                        navigate: navigate,
                        lang: lang,
                      });
                      break;
                    default:
                      break;
                  }
                  setActionType(aData.name);
                  e.stopPropagation();
                }}>{aIdx + 1}. {gameData.msg.moveEvent[aData.name][lang]}</Button>
              })}
            </EventText>
          </>
        )}
      </EventView>
      {showDice && <Dice successNum={limitDiceCount} bg={0} num={leaderDiceSkill[1] ? 3 : 2} isPlay={leaderDiceSkill[0] ? 2 : 1} setShowDice={setShowDice} callback={(v) => {
        actionDice({
          diceNum: util.getSum(v.diceArr),
          blockType: blockType,
          type: actionType,
          gameData: gameData,
          saveData: sData,
          changeSaveData: changeSaveData,
          eventPhase: eventPhase,
          increaseStep: increaseStep,
          setEventPhase: setEventPhase,
          setEventBack: setEventBack,
          limitDiceCount: limitDiceCount,
          timeoutRef: timeoutRef,
          setMsg: setMsg,
          setShowMsg: setShowMsg,
          navigate: navigate,
          lang: lang,
        });
      }} />}
    </Wrap>
    <GameMainFooter saveData={sData} changeSaveData={changeSaveData} gameMode={"moveEvent"} setGameMode={setGameMode} stay={sData.info.stay} moveData={sData.moveEvent} actionData={actionData} showEvent={showEvent} setShowEvent={setShowEvent} setShowDim={setShowDim} eventPhase={eventPhase} />
    <PopupContainer>
      {showPopup && <Popup type={popupType} dataObj={popupInfo} saveData={saveData} changeSaveData={changeSaveData} setShowPopup={setShowPopup} setMsg={setMsg} setShowMsg={setShowMsg} />}
    </PopupContainer>
    <MsgContainer>
      {showMsg && <Msg text={msg} setShowMsg={setShowMsg}></Msg>}
    </MsgContainer>
  </>
}

export default MoveEvent;
