import { Text } from 'components/Atom';
import { IconButton } from "components/Button";
import { FlexBox } from 'components/Container';
import { IconPic } from 'components/ImagePic';
import { Select } from "components/Input";
import { util } from 'components/Libs';
import Modal from 'components/Modal';
import ModalContainer from 'components/ModalContainer';
import Msg from 'components/Msg';
import MsgContainer from 'components/MsgContainer';
import Npc from 'components/Npc';
import Popup from 'components/Popup';
import PopupContainer from 'components/PopupContainer';
import { AppContext } from 'contexts/app-context';
import CharacterCard from "pages/CharacterCard";
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrap = styled(FlexBox)`
  position: absolute;
  inset: 0;
  padding: 0 0 20px 0;
  box-sizing: border-box;
  overflow: hidden;
`;
const WorkArea = styled(FlexBox)`
	position: relative;
	margin: 10px auto 0;
  flex: 1;
	width: 90%;
  box-sizing: border-box;
  background: rgba(0,0,0,.7);
  border: 5px solid transparent;
  border-image: url(${({frameBack}) => frameBack}) 5 round;
`;
const GreetingText = styled(Text)`
	padding: 10%;
`;
const MapArea = styled(FlexBox)`
  width: 100%;
  height: 100%;
  background: #000;
`;
const WorldMap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
const MapPic = styled(IconPic)`
  position: absolute;
  left: 0;
  top: 0;
`;
const CountrySelect = styled(FlexBox)`
  position: absolute;
  left: 5px;
  top: 0px;
  width: auto;
  height: auto;
`;
const FlagIcon = styled(IconPic)`
  margin: 0 10px 0 0;
  width: 50px;
  height: 50px;
`;
const ButtonArea = styled(FlexBox)`
  position: absolute;
  width: calc(100% - 10px);
`;
const ButtonArrow = styled(IconButton)`
  background-position: center 0;
  ${({ direction }) =>
    direction === "left"
      ? `
    transform: rotate(90deg);
  `
      : `
    transform: rotate(-90deg);
  `}
`;const SelectEntryCard = styled(FlexBox)`
  position: absolute;
  left: 7.5%;
  top: 2%;
  width: 85%;
  height: 50%;
  background: #000;
  border: 15px solid;
  border-image: url(${({frameImg}) =>  frameImg}) 30 /
  15px round;
  box-sizing: border-box;
  z-index: 91;
  overflow-y: auto;
  ul {
		display: flex;
		flex-flow: wrap;
		width: 100%;
  }
`;
const EntryGroup = styled(FlexBox)`
  overflow-y: auto;
`;
const EntryList = styled.div`
	position: relative;
  margin: 0 6px 6px 0;
  width: calc(20% - 5px);
  padding-top: calc(20% - 6px);
  font-size: 0;
  border-radius: 10px;
  &:nth-of-type(5n) {
    margin: 0 0 5px 0;
  }
  ${({selected}) => selected && `
    filter: grayscale(1);
  `}
  box-shadow: 2px 2px 0 ${({grade}) => {
    switch(grade) {
      case 1:
        return `#fff`;
      case 2:
        return `#00a90c`;
      case 3:
        return `#0090ff`;
      case 4:
        return `#a800ff`;
      case 5:
        return `#ffcc15`;
      case 6:
        return `#ff2a00`;
      case 7:
        return `#ff8000`;
      default:
        return 'transparent';
    }
  }}
`;
const UserContainer = styled(FlexBox)`
	position: relative;
  flex: 1;
	padding: 10px 20px 0 20px;
	height: calc(25% - 10px);
	width: calc(100% - 40px);
`;
const RegionInfo = styled(FlexBox)`
	position: relative;
	flex: 1;
	margin: 0 10px 0 0;
	padding: 10px 20px;
	height: 100%;
	box-sizing: border-box;
	background: rgba(0,0,0,.8);
  border-radius: 10%;
`;
const SelectEntries = styled(FlexBox)`
  width: 50%;
`;
const EntryCardsWrap = styled(FlexBox)`
  width: 100%;
  flex-wrap: wrap;
  overflow-y: auto;
`;
const EntryCards = styled.div`
  position: relative;
  margin: 0.5%;
  padding-top: 24%;
  width: 24%;
  border-radius: 10%;
  background: ${({ theme }) => theme.color.shadow};
  box-sizing: border-box;
  ${({selected, theme}) => selected && `outline: 2px solid ${theme.color.point2};`}
  span {
    display: inline-block;
    position: absolute;
  }
  box-shadow: 2px 2px 0 ${({grade}) => {
    switch(grade) {
      case 1:
        return `#fff`;
      case 2:
        return `#00a90c`;
      case 3:
        return `#0090ff`;
      case 4:
        return `#a800ff`;
      case 5:
        return `#ffcc15`;
      case 6:
        return `#ff2a00`;
      case 7:
        return `#ff8000`;
      default:
        return 'transparent';
    }
  }}
`;
const ItemButton = styled(FlexBox)`
  margin: 10px 0;
  border-radius: 20px;
  background: ${({theme}) => theme.color.grey3};
`;
const StyledIcon = styled(IconPic)`
  margin: 5px 0;
  width: 16px;
  height: 16px;
  transform: rotate(270deg);
`;
const Gate = ({
	saveData,
	changeSaveData,
  setGameMode,
  setShowDim,
  setLoading,
}) => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [selectTab, setSelectTab] = useState("");
  const lang = React.useMemo(() => {
    return context.setting.lang;
  }, [context]);
  const imgSet = React.useMemo(() => {
    return context.images;
  }, [context]);
  const gameData = React.useMemo(() => {
    return context.gameData;
  }, [context]);
  const sData = React.useMemo(() => Object.keys(saveData).length === 0 ? util.loadData('saveData') : saveData, [saveData]);
  const [modalOn, setModalOn] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  const [modalData, setModalData] = useState({});
  const [popupOn, setPopupOn] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [popupInfo, setPopupInfo] = useState({});
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");
  const entries = React.useMemo(() => {
    return sData.entry.map((entryIdx) => {
      return {
        ...sData.ch[entryIdx],
        slotIdx: entryIdx,
        hp: sData.ch[entryIdx].bSt0,
        hp_: sData.ch[entryIdx].bSt0,
      };
    });
  }, [sData]);
  const [selectMoveRegion, setSelectMoveRegion] = useState('');
  const [moveRegionEntry, setMoveRegionEntry] = useState([sData.info.leaderIdx]);
  const stay = React.useMemo(() => sData?.info?.stay, [sData]);
  const stayIdx = React.useMemo(() => util.getRegionToIdx(stay), [stay]);
  const flagIconIdx = React.useMemo(() => {
    return util.getStringToCountryIdx(selectMoveRegion);
  }, [selectMoveRegion]);
  const ticketIdx = React.useMemo(() => (flagIconIdx + 30) * 1, [flagIconIdx]);
  const [showEntryList, setShowEntryList] = useState(false);
  const currentCountryIdx = useRef(0);
  const [countryList, setCountryList] = useState([]); //국가 선택 글자
  const ticketNum = React.useMemo(() => {
    return util.isCondition("items", "etc", ticketIdx)
  }, [ticketIdx]);
  const emptyList = React.useMemo(() => {
    return moveRegionEntry.length < entries.length ? Array.from({length: entries.length - moveRegionEntry.length}, () => "") : [];
  }, [moveRegionEntry]);
  const sortEntry = (idx) => {
    return moveRegionEntry.findIndex((entry) => {
      return entry === idx;
    });
  }
  const [greeting, setGreeting] = useState(gameData.shop.gate.greeting[lang]);
  useEffect(() => {
    setLoading(false);
  }, []);
  useEffect(() => {
    setCountryList(
      gameData.country?.regions?.map((data) => {
        return data.name?.[lang] || "";
      }) || []
    );
  }, [lang, gameData.country]);
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <>
			<Wrap direction="column">
        <Npc imgSet={imgSet} shopType={'gate'} gameData={gameData} lang={lang} selectTab={selectTab} setSelectTab={setSelectTab} navigate={navigate} onClick={() => {
          setSelectTab("");
          const randomIdx = Math.floor(Math.random() * gameData.shop.gate.randomText.length);
          setGreeting(gameData.shop.gate.randomText[randomIdx][lang]);
				}}/>
        <WorkArea frameBack={imgSet.etc.frameChBack}direction="column" alignItems="center" justifyContent="center">
          {selectTab === "" ? <GreetingText code="t4" color="main" wordBreak="keep-all">{greeting}</GreetingText> : <>
          <MapArea alignItems="center">
            <WorldMap>
              <MapPic type="worldMap" pic="map800" idx={selectMoveRegion !== "" ? selectMoveRegion + 1 : stayIdx + 1} />
            </WorldMap>
          </MapArea>
          <ButtonArea justifyContent="space-between">
            <ButtonArrow
              direction="left"
              size={30}
              icon={imgSet.button.btnArrow}
              onClick={() => {
                setSelectMoveRegion((prev) => {
                  const num = prev === "" ? currentCountryIdx.current : ++prev;
                  currentCountryIdx.current++;
                  const regionLength = gameData.country?.regions?.length || 1;
                  return num > regionLength - 1 ? 0 : num;
                });
              }}
            />
            <ButtonArrow
              direction="right"
              size={30}
              icon={imgSet.button.btnArrow}
              onClick={() => {
                setSelectMoveRegion((prev) => {
                  const num = prev === "" ? currentCountryIdx.current : --prev;
                  currentCountryIdx.current--;
                  const regionLength = gameData.country?.regions?.length || 1;
                  return num < 0 ? regionLength - 1 : num;
                });
              }}
            />
          </ButtonArea>
          <CountrySelect>
            <FlagIcon type="flag" pic="icon200" idx={flagIconIdx === "" ? 21 : flagIconIdx}/>
            <Select
              style={{flex:1}}
              selectIdx={selectMoveRegion}
              setSelectIdx={setSelectMoveRegion}
              onClick={(idx) => {
                setSelectMoveRegion(idx);
              }}
              fontColor={"grey"}
              selectOption={countryList}
              title={gameData.msg?.title?.["selectRegion"]?.[lang] || "Select Region"}
            />
          </CountrySelect></>}
        </WorkArea>
        {showEntryList && <SelectEntryCard frameImg={imgSet.images.frame0} onClick={() => {
          setShowEntryList(false);
        }}>
          <EntryGroup justifyContent="flex-start" alignItems="flex-start" flexWrap="wrap">
            {entries.map((chData, chIdx) => {
              return (
                <EntryList grade={chData.grade} selected={sortEntry(chData.slotIdx) >= 0} onClick={(e) => {
                  e.stopPropagation();
                  if (moveRegionEntry[chIdx] === sData.info.leaderIdx) {
                    setMsgOn(true);
                    setMsg(gameData.msg.sentence['noRemoveLeader'][lang]);
                    return;
                  }
                  const entryClone = [...moveRegionEntry];
                  const selectedIdx = sortEntry(chData.slotIdx);
                  if (selectedIdx >= 0) {
                    entryClone.splice(selectedIdx, 1);
                  } else {
                    entryClone.push(chData.slotIdx);
                  }
                  setMoveRegionEntry(entryClone);
                }} key={`chData_${chIdx}`}>
                  <CharacterCard usedType="thumb" saveData={sData} gameData={gameData} saveCharacter={chData} />
                </EntryList>
              );
            })}
          </EntryGroup>
        </SelectEntryCard>}
        <UserContainer justifyContent="space-between">
          <RegionInfo direction="column">
            {selectMoveRegion !== "" && selectMoveRegion !== stayIdx && (
              <>
                <Text code="t2" color="main">
                  {gameData.msg.title.entryTicket[lang]} 
                </Text>
                <Text code="t2" color="main">
                  {`${ticketNum} / ${util.getDistanceToEvent(
                    gameData.country?.regions[stayIdx]?.distancePosition,
                    gameData.country?.regions[selectMoveRegion]?.distancePosition,
                    gameData.countryEventsNum
                  )}`}
                </Text>
              </>
            )}
            <ItemButton direction="column" alignItems="center" justifyContent="center" onClick={(e) => {
              if (selectMoveRegion === '') {
                setMsgOn(true);
                setMsg(gameData.msg.sentence['selectMoveCountry'][lang]);
              } else if (stayIdx === selectMoveRegion) {
                setMsgOn(true);
                setMsg(gameData.msg.sentence['sameCountry'][lang]);
              } else {
                if (moveRegionEntry.length === 0) {
                  setMsgOn(true);
                  setMsg(gameData.msg.sentence['createTravelEntry'][lang]);
                } else {
                  const countryCode = util.getStringToCountryIdx(selectMoveRegion),
                    itemIdx = 30 + countryCode,
                    isCondition = util.isCondition("items", "etc", itemIdx),
                    conditionName = gameData.items.etc[itemIdx].na[lang],
                    conditionNum = moveRegionEntry.length;
                  if (isCondition < conditionNum) {
                    setMsgOn(true);
                    setMsg(gameData.msg.sentenceFn.lackOfCondition(lang, conditionName));
                  } else {
                    setModalOn(true);
                    setModalData({
                      submitFn: () => {//moveEvent로 이동
                        setShowDim(false);
                        changeSaveData(util.deleteItems({
                          saveData: sData,
                          itemObj: {
                            type: "items",
                            cate: "etc",
                            idx: itemIdx,
                          },
                          num: conditionNum,
                        }));//인벤에서 아이템 제거
                        util.saveHistory({
                          prevLocation: 'gate',
                          location: 'moveEvent',
                          navigate: navigate,
                          callback: () => {
                            //조건 체크
                            setGameMode("moveEvent");
                            const distance = util.getDistanceToEvent(gameData.country.regions[stayIdx].distancePosition, gameData.country.regions[selectMoveRegion]?.distancePosition) + gameData.countryEventsNum;
                            //const historyP = JSON.parse(JSON.stringify(util.loadData('historyParam') || {}));
                            changeSaveData(prev => ({
                              ...prev,
                              moveEvent: {
                                ch: moveRegionEntry,
                                moveTo: selectMoveRegion,
                                bg: Math.floor(Math.random() * 6),
                                distance: distance,
                                blockArr: {
                                  type: Array.from({length:distance}, (v, idx) => {
                                    return idx % 3 === 0 ? Math.round(Math.random()) : util.fnPercent(gameData.percent.eventsPercent)
                                  }),
                                },
                                spBlockArr: Array.from({length:Math.floor(distance / 4) + 1}, () => { return {type: util.fnPercent(gameData.percent.bigEventsPercent), get: false, open: false}}),
                                currentStep: 0,
                              }
                            }))
                          },
                          isNavigate: true,
                        });
                      },
                    });
                    setModalInfo({
                      type: 'confirm',
                      msg: `${gameData.msg.sentence.questionMoveCountry[lang]}<br/><span class="des">${gameData.msg.sentenceFn.useItem(lang, conditionName)}</span>`,
                      info: {},
                      bt: [
                        {txt:gameData.msg.button.use[lang],action:'itemEn'},{txt:gameData.msg.button.cancel[lang],action:'popClose'}
                      ],
                    })
                    console.log('지역이동');
                  }
                }
              }
            }}>
              {stayIdx === selectMoveRegion ? <Text code="t2" color="main">
              {gameData.msg.sentence['sameCountry'][lang]}
            </Text> : <>
              <Text code="t1" color="main">{gameData.country.regions[util.getRegionToIdx(stay)].name[lang]}</Text>
              <StyledIcon type="commonBtn" pic="icon100" idx="0" />
              <Text code="t2" color="main">{selectMoveRegion !== '' && gameData.country.regions[selectMoveRegion].name[lang]}</Text>
              <Text code="t3" color="point2">{selectMoveRegion !== '' && gameData.msg.button.move[lang]}</Text>
            </>
            }
            </ItemButton>
          </RegionInfo>
          <SelectEntries>
            <EntryCardsWrap justifyContent="flex-start" alignItems="flex-start" alignContent="flex-start" onClick={() => {
              setShowEntryList(true);
            }}>
              {moveRegionEntry.map((eCard, cardIdx) => {
                return (
                  <EntryCards grade={sData.ch[eCard].grade} key={`entry${cardIdx}`} onClick={() => {
                    if (moveRegionEntry[cardIdx] === sData.info.leaderIdx) {
                      if (showEntryList) {
                        setMsgOn(true);
                        setMsg(gameData.msg.sentence['noRemoveLeader'][lang]);
                      }
                      return;
                    }
                    setMoveRegionEntry(prev => {
                      prev.splice(cardIdx, 1);
                      return [...prev];
                    });
                  }}>
                    <CharacterCard
                      usedType="thumb"
                      saveCharacter={sData.ch[eCard]}
                      saveData={sData}
                      gameData={gameData}
                    />
                  </EntryCards>
                );
              })}
              {emptyList.map((eCard, cardIdx) => {
                return (
                  <EntryCards grade="" selected={cardIdx === 0}
                    key={`entry${cardIdx}`}
                  />
                );
              })}
            </EntryCardsWrap>
          </SelectEntries>
        </UserContainer>
      </Wrap>
			<PopupContainer>
        {popupOn && <Popup type={popupType} dataObj={popupInfo} saveData={saveData} changeSaveData={changeSaveData} showPopup={setPopupOn} msgText={setMsg} showMsg={setMsgOn} />}
      </PopupContainer>
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
};

export default Gate;