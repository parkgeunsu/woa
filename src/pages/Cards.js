import { Text } from 'components/Atom';
import { Button } from 'components/Button';
import { FlexBox } from 'components/Container';
import { IconPic, MergedPic } from 'components/ImagePic';
import ItemLayout from 'components/ItemLayout';
import { util } from 'components/Libs';
import Msg from 'components/Msg';
import MsgContainer from 'components/MsgContainer';
import Popup from 'components/Popup';
import PopupContainer from 'components/PopupContainer';
import { AppContext } from 'contexts/app-context';
import CharacterAnimalSkill from 'pages/CharacterAnimalSkill';
import CharacterCard from 'pages/CharacterCard';
import CharacterItems from 'pages/CharacterItems';
import CharacterPaging from 'pages/CharacterPaging';
import CharacterRelation from 'pages/CharacterRelation';
import CharacterSkill from 'pages/CharacterSkill';
import CharacterState from 'pages/CharacterState';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

//const CH_MENU_HEIGHT = 50;
const Img = styled.img.attrs(
  ({imgurl}) => ({
    src: imgurl 
  })
)``;
const Wrap = styled.div`
  position: relative;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	overflow: hidden;
  touch-action:none;
`;
const ChArea = styled.div`
	position: relative;
	width: 100%;
	height: calc(100% - 50px);
  overflow: hidden;
`;
const ChCard = styled.div`
  position: absolute;
  left: 50%;
  top: calc(50% - 25px);
  transform: translate(-50%,-50%);
  transition: all 0.5s;
  ${({isZoomCard, frameBack}) => isZoomCard ? `
    width: 100%;
    z-index: 100;
    border: 5px solid transparent;
    border-image: url(${frameBack}) 5 round;
  ` : `
    width: 85%;
    z-index: 1;
  `};
  overflow: hidden;
  font-size: 0;
  ${({chPage, gradeUp}) => {
    const grade = (() => {
      switch(gradeUp) {
        case 1:
          return '#8d4300';
        case 2:
          return '#ccc';
        case 3:
          return '#ffcc15';
        default:
          return '#444';
      }
    })();
    return chPage === 0 ? `
    &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      border: 5px solid ${grade};
      box-sizing: border-box;
      z-index: 6;
      pointer-events: none;
    }
  ` : ""}}
  & > img {
    width: 100%;
    pointer-events: none;
  }
`;
const ChBack = styled(MergedPic)`
  position: absolute;
  top: 0;
`;
const ChInfo = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0;
  overflow: hidden;
  ${'' /* 42% */}
  background: rgba(0,0,0,.8);
  box-sizing: border-box;
  border: 5px solid transparent;
  ${'' /* 5px */}
  border-image: url(${({frameBack}) => frameBack}) 5 round;
  z-index:3;
  span {
    display: inline-block;
    color: var(--color-w);
  }
  .name {
    margin:auto 0;text-align:left;font-size:0.813rem;color:#999;
  }
`;
const ButtonArea = styled(FlexBox)`
  position: relative;
  height: 50px;
  width: 100%;
  background-color: var(--color-b);
`;
const StyledButton = styled(Button)`
  flex-basis: 40px;
`;
const ChOrder = styled.div`
  white-space: nowrap;
  text-align: center;
`;
const StyledIconPic = styled(IconPic)`
  display: inline-block;
  margin: 0 5px 0 0;
  &:last-of-type {
    margin: 0;
  }
  padding-top: 40px;
  width:  40px;
  height: 0;
  font-size: 0;
  ${({selected}) => selected ? `
    opacity: 1;
    filter: unset;
  ` : `
    opacity: .3;
    filter: brightness(10);
  `}
`;
const TopBtnGroup = styled.div`
  position: absolute;
  right: 10px;
  top: 0;
  z-index: 3;
`;
const TopBtn = styled(Button)`
  position: relative;
  padding: 5px;
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.color.lightL};
`;
const CloseBtn = styled(Button)`
  position: absolute;
  right: 0;
  top: 0;
  padding: 5px 10px;
  z-index: 1;
  border-radius: 0;
  background: ${({ theme }) => theme.color.sub};
  div {
    color: ${({ theme }) => theme.color.main};
  }
`;
const ChState = styled.div`
  position: absolute;
  inset: 0;
  border: 5px solid transparent;
  background: rgba(0,0,0,.8);
  border-image: url(${({frameBack}) => frameBack}) 5 round;z-index: 3;
`;
const States = styled.div`
  position: absolute;
  inset: 10%;
  width: 80%;
`;
const StateList = styled(FlexBox)`
  margin: 0 0 5px 0;
  width: auto;
  height: auto;
  &:last-of-type{
    margin: 0;
  }
`;
const StateName = styled(Text)`
  padding: 0 0 0 5px;
  width: 22%;
  color: #999;
  b {
    display:block;
    font-size:0.875rem;
    color:#fff;
    font-weight:600;
  }
`;
const StateCurrent = styled(Text)`
  width:48%;
  letter-spacing:-1px;
`;
const StateTotal = styled(Text)`
  padding: 0 5px 0 0;
  width:30%;
`;
const ChStory = styled.div`
  position: absolute;
  inset: 0;
  border: 5px solid transparent;
  background: rgba(0,0,0,.8);
  border-image: url(${({frameBack}) => frameBack}) 5 round;z-index: 3;
`;
const Storys = styled.div`
  padding: 5px;
  height: 100%;
  box-sizing: border-box;
`;
const ChInven = styled.div`
  position: absolute;
  inset: 0;
  border: 5px solid transparent;
  background: rgba(0,0,0,.8);
  border-image: url(${({frameBack}) => frameBack}) 5 round;
  z-index: 3;
`;
const InvenItems = styled.div`
  padding: 5px;
  height: 100%;
  box-sizing: border-box;
  .h_items {
    display: flex;
    flex-flow: wrap;
    width: 100%;
  }
`;
const InvenTitle = styled(Text)`

`;
const ItemList = styled.li`
  position: relative;
  margin: 0 4.5px 4.5px 0;
  width: calc(12.5% - 4px);
  height: 0;
  padding-top: calc(12.5% - 4px);
  box-sizing: border-box;
  border: 1px solid #fff;
  background-position: center center;
  background-repeat: no-repeat;
  &:nth-of-type(8n) {
    margin:0 0 4.5px 0;
  }
  .txt{position:absolute;left:2px;right:2px;bottom:2px;font-size:0.688rem;text-align:center;z-index:1;}
  .pic{position:absolute;left:0;right:0;bottom:0;top:0;width:100%;}
`;
const Hole = styled(FlexBox)`
  position:absolute;
  inset: 5%;
  z-index:3;
  width: 90%;
  height: 90%;
  pointer-events:none;
  .hole_slot{
    width: 15%;
    padding-top: 15%;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.7);
  }
  .hole_slot.fixed {
    background: rgba(255, 172, 47, 0.7);
  }
`;
const setSlotIdxFn = (state, paramData, navigate) => {
  if (!state && Object.keys(paramData).length === 0) {
    navigate('../');
    return 0;
  }
  if (!state) {
		return paramData.cards.selectIdx || 0;
	}
  return state.dataObj.chSlotIdx;
}
const setPageIdxFn = (state) => {
  if (!state) {
		return 0;
	}
  return state.dataObj.chTabIdx;
}
const Cards = ({
  saveData,
  changeSaveData,
}) => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
	const {state} = useLocation();
  const isMoveEvent = React.useMemo(() => {
    return util.loadData("historyParam")?.moveEvent && Object.keys(util.loadData("historyParam").moveEvent)?.length > 0;
  }, []);
  const lang = React.useMemo(() => {
    return context.setting.lang;
  }, [context]);
  const imgSet = React.useMemo(() => {
    return context.images;
  }, [context]);
  const gameData = React.useMemo(() => {
    return context.gameData;
  }, [context]);
  const [isZoomCard, setZoomCard] = useState(false);
  const [popupOn, setPopupOn] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [popupInfo, setPopupInfo] = useState({});
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");
  const gameItem = React.useMemo(() => gameData.items, [gameData]);
  const sData = React.useMemo(() => Object.keys(saveData).length === 0 ? util.loadData('saveData') ?? {} : {...saveData}, [saveData]);
  const [showInven, setShowInven] = useState(state?.dataObj.invenOpened);
  const [showSetting, setShowSetting] = useState(false);
  const [showState, setShowState] = useState(false);
  const invenItems = React.useMemo(() => {
    return sData.items;
  }, [sData]);
  const entries = React.useMemo(() => {
    return sData.entry.map((entryIdx) => {
      return sData.ch[entryIdx];
    });
  }, [sData]);
  const chLength = React.useMemo(() => entries.length ,[sData]);
  const paramData = React.useMemo(() => {
    return util.loadData('historyParam');
  }, []);
  const [slotIdx, setSlotIdx] = useState(setSlotIdxFn(state, paramData, navigate));
  const [chPage, setChPage] = useState(setPageIdxFn(state));
  useEffect(() => {
		setSlotIdx(setSlotIdxFn(state, paramData, navigate));
		setChPage(setPageIdxFn(state));
	}, [state, paramData]);
  const changeChPage = (idx) => {
    setChPage(idx);
  }
  const changeChSlot = (idx) => {
    setSlotIdx(idx);
  }
  const handlePopup = useCallback((saveObj) => {
		const {itemType, itemData, itemSaveSlot} = saveObj,
      itemIdx = itemData.idx,
      itemPart = itemData.part,
      itemGrade = itemData.grade,
      itemWeaponType = itemData.weaponType;
    if( itemType ){
      let saveItemData;
      if (itemType === 'hequip') {
        saveItemData = invenItems['equip'][itemSaveSlot];
      } else {
        saveItemData = invenItems[itemType][itemSaveSlot];
      }
      setPopupType(itemType);
      const itemsGrade = itemGrade < 5 ? 0 : itemGrade - 5;
      let gameItemData = '';
      if (itemType === 'hequip' || itemType === 'equip') {
        gameItemData = itemPart === 3 ? gameItem['equip'][itemPart][itemWeaponType][itemsGrade][itemIdx] : gameItem['equip'][itemPart][0][itemsGrade][itemIdx];
      } else {
        gameItemData = gameItem[itemType][itemIdx];
      }
      setPopupInfo({
        isMoveEvent: isMoveEvent,
        chSlotIdx: slotIdx,
        gameItem: gameItemData,
        itemSaveSlot: itemSaveSlot,
        saveItemData: saveItemData,
        type: itemType === 'hequip' ? 'equip' : itemType,
      });
    }
    setPopupOn(prev => !prev);
  }, [invenItems, slotIdx, isMoveEvent, gameItem]);
  return (
    <>
      <Wrap className="ch_wrap">
        <ChArea>
          {entries.length > 0 && <ChCard className="ch_card" isZoomCard={isZoomCard} gradeUp={sData.ch[slotIdx]?.gradeUp} chPage={chPage} frameBack={imgSet.etc.frameChBack} onClick={() => {
            if (chPage === 0) {
              setZoomCard(prev => !prev);
            }
          }}>
            <Img imgurl={imgSet.images.transparent800} />
            {chPage === 0 ? <CharacterCard chList={entries} saveData={sData} slotIdx={slotIdx} isZoomCard={isZoomCard} /> : <ChBack type="cardBack" pic="card" idx={0} />}
            {chPage === 1 && <CharacterState chList={entries} saveData={sData} slotIdx={slotIdx} changeSaveData={changeSaveData} />}
            {chPage === 2 && <CharacterAnimalSkill chList={entries} saveData={sData} slotIdx={slotIdx} changeSaveData={changeSaveData} />}
            {chPage === 3 && <CharacterSkill chList={entries} slotIdx={slotIdx} />}
            {chPage === 4 && <CharacterRelation chList={entries} saveData={sData} slotIdx={slotIdx} />}
            {chPage === 5 && <CharacterItems chList={entries} saveData={sData} slotIdx={slotIdx} changeSaveData={changeSaveData} />}
          </ChCard>}
          <CharacterPaging chList={entries} saveData={sData} changeChSlot={changeChSlot} slotIdx={slotIdx} />
          <TopBtnGroup>
            <FlexBox>
              <TopBtn>
                <IconPic type="quickMenu" pic="icon100" idx={1} onClick={() => {
                  setShowInven(prev => !prev);
                }} />
              </TopBtn>
              <TopBtn>
                <IconPic type="state" pic="icon100" idx={9} onClick={() => {
                  setShowState(prev => !prev);
                }} />
              </TopBtn>
              <TopBtn>
                <IconPic type="item" pic="icon100" idx={7} onClick={() => {
                  setShowSetting(prev => !prev);
                }} />
              </TopBtn>
            </FlexBox>
          </TopBtnGroup>
          {showState && <ChState frameBack={imgSet.etc.frameChBack}>
            <CloseBtn onClick={() => {
              setShowState(false);
            }}>
              <Text code="t1">{gameData.msg.button.close[lang]}</Text>
            </CloseBtn>
            <States>
              {gameData.battleStateName?.map((bData, idx) => {
                const chStats = saveData.ch?.[slotIdx] || {};
                return (
                  <StateList justifyContent="space-between" key={idx} className={bData}>
                    <StateName code="t2" align="left" color="grey">{gameData.msg?.state?.[bData]?.[lang]}<b>{gameData.msg?.state?.[bData]?.en}</b></StateName>
                    <StateCurrent code="t4" color="#0b7" weight="600" align="center">{`${chStats['bSt'+idx] || 0} + `}<b>{`${chStats['iSt'+idx] || 0}`}</b></StateCurrent>
                    <StateTotal code="t6" color="#0b7" align="right" weight="600" className="total">{(chStats['bSt'+idx] || 0) + (chStats['iSt'+idx] || 0)}</StateTotal>
                  </StateList>
                )
              })}
            </States>
          </ChState>}
          {showSetting && <ChStory frameBack={imgSet.etc.frameChBack}>
            <CloseBtn onClick={() => {
              setShowSetting(false);
            }}>
              <Text code="t1">{gameData.msg.button.close[lang]}</Text>
            </CloseBtn>
            <Storys className="scroll-y">
              <ul>
                <li>
                  별칭 변경{slotIdx}
                </li>
              </ul>
            </Storys>
          </ChStory>}
          {showInven && <ChInven frameBack={imgSet.etc.frameChBack}>
            <CloseBtn onClick={() => {
              setShowInven(false);
            }}>
              <Text code="t1">{gameData.msg.button.close[lang]}</Text>
            </CloseBtn>
            <InvenItems className="has_items scroll-y">
              <InvenTitle code="t3" color="main">{gameData.msg.menu.equip[lang]}</InvenTitle>
              <ul className="h_items">
                {invenItems.equip && invenItems.equip.map((data, idx) => {
                  const itemsGrade = data.grade < 5 ? 0 : data.grade - 5;
                  const items = data.part === 3 ? gameItem.equip[data.part][data.weaponType][itemsGrade][data.idx] : gameItem.equip[data.part][0][itemsGrade][data.idx];
                  const itemsHole = data.hole;
                  const equipPossible = (() => {
                    let chk;
                    if (data.sealed) {
                      chk = true;
                    } else {
                      chk = !sData.ch[slotIdx].possibleEquipment[items.part - 1][items.category]; //!items.limit[sData.ch[slotIdx].job];
                    }
                    return chk;
                  })();
                  return items && (
                    <ItemList key={`hequip${idx}`} onClick={() => {
                      handlePopup({
                        itemType: 'hequip',
                        itemData: data,
                        itemSaveSlot: idx,
                      });
                    }} data-itemnum={`equip_${data.idx}`}>
                      <ItemLayout 
                        gameItem={gameItem}
                        isEquip
                        icon={{
                          type: "equip",
                          pic: "equip",
                          idx: items.display,
                          mergeColor: data.color,
                        }}
                        part={data.part}
                        grade={data.grade}
                        itemsHole={itemsHole}
                        impossible={equipPossible}
                        sealed={data.sealed}
                      />
                    </ItemList>
                  )
                })}
              </ul>
              <InvenTitle code="t3" color="main">{gameData.msg.menu.hole[lang]}</InvenTitle>
              <ul className="h_items">
                { invenItems.hole && invenItems.hole.map((data, idx) => {
                  const items = gameItem.hole[data.idx];
                  return (
                    <ItemList key={`hole${idx}`} data-itemnum={`hole_${data.idx}`} onClick={() => {
                      handlePopup({
                        itemType: 'hole',
                        itemData: data,
                        itemSaveSlot: idx,
                      });
                    }}>
                      <ItemLayout 
                        gameItem={gameItem}
                        isEquip
                        icon={{
                          type: "hole",
                          pic: "itemEtc",
                          idx: items.display
                        }}
                        part="11"
                        grade={items.grade}
                        sealed={items.sealed}
                      />
                    </ItemList>
                  )
                })}
              </ul>
              <InvenTitle code="t3" color="main">{gameData.msg.menu.upgrade[lang]}</InvenTitle>
              <ul className="h_items">
                { invenItems.upgrade && invenItems.upgrade.map((data, idx) => {
                  const items = gameItem.upgrade[data.idx];
                  return (
                    <ItemList key={`upgrade${idx}`} data-itemnum={`upgrade_${data.idx}`}  onClick={() => {
                      handlePopup({
                        itemType: 'upgrade',
                        itemData: data,
                        itemSaveSlot: idx,
                      });
                    }}>
                      <ItemLayout 
                        gameItem={gameItem}
                        isEquip
                        icon={{
                          type: "upgrade",
                          pic: "itemEtc",
                          idx: items.display
                        }}
                        text={data.num || ""}
                        part="12"
                        grade={items.grade}
                        sealed={items.sealed}
                      />
                    </ItemList>
                  )
                })}
              </ul>
              <InvenTitle code="t3" color="main">{gameData.msg.menu.material[lang]}</InvenTitle>
              <ul className="h_items">
                { invenItems.material && invenItems.material.map((data, idx) => {
                  const items = gameItem.material[data.idx];
                  return (
                    <ItemList key={`material${idx}`} data-itemnum={`material_${data.idx}`} onClick={() => {
                      handlePopup({
                        itemType: 'material',
                        itemData: data,
                        itemSaveSlot: idx,
                      });
                    }}>
                      <ItemLayout 
                        gameItem={gameItem}
                        isEquip
                        icon={{
                          type: "material",
                          pic: "material",
                          idx: items.display
                        }}
                        text={data.num || 1}
                        part="13"
                        grade={items.grade}
                        sealed={items.sealed}
                      />
                    </ItemList>
                  )
                })}
              </ul>
              <InvenTitle code="t3" color="main">{gameData.msg.menu.etc[lang]}</InvenTitle>
              <ul className="h_items">
                { invenItems.etc && invenItems.etc.map((data, idx) => {
                  const items = gameItem.etc[data.idx];
                  return (
                    <ItemList key={`etc${idx}`} data-itemnum={`etc_${data.idx}`} onClick={() => {
                      handlePopup({
                        itemType: 'etc',
                        itemData: data,
                        itemSaveSlot: idx,
                      });
                    }}>
                      <ItemLayout 
                        gameItem={gameItem}
                        isEquip
                        icon={{
                          type: "etc",
                          pic: "itemEtc",
                          idx: items.display
                        }}
                        part="13"
                        grade={items.grade}
                        sealed={items.sealed}
                      />
                    </ItemList>
                  )
                })}
              </ul>
            </InvenItems>
          </ChInven>}
          <ChInfo frameBack={imgSet.etc.frameChBack} className="ch_info" />
          {/* <CharacterItemEnhance saveData={sData} slotIdx={slotIdx} />
          <CharacterChEnhance saveData={sData} slotIdx={slotIdx} /> */}
        </ChArea>
        <ButtonArea justifyContent="flex-start">
          <StyledButton onClick={() => {
            setSlotIdx((prevSlot) => {
              prevSlot--;
              return prevSlot < 0 ? chLength - 1 : prevSlot;
            });
          }}>이전</StyledButton>
          <ChOrder className="scroll-x">
          {gameData.chMenu.map((data, idx) => {
            return (
              <StyledIconPic selected={idx === chPage} key={`chmenubutton${idx}`} pic="icon100" idx={idx} onClick={() => {
                changeChPage(idx)
              }} />
            )
          })}
          </ChOrder>
          <StyledButton onClick={() => {
            setSlotIdx((prevSlot) => {
              prevSlot++;
              return prevSlot > chLength - 1 ? 0 : prevSlot;
            });
          }}>다음</StyledButton>
        </ButtonArea>
      </Wrap>
      <PopupContainer>
        {popupOn && <Popup type={popupType} dataObj={popupInfo} saveData={sData} changeSaveData={changeSaveData} showPopup={setPopupOn} msgText={setMsg} showMsg={setMsgOn} />}
      </PopupContainer>
      <MsgContainer>
        {msgOn && <Msg text={msg} showMsg={setMsgOn}></Msg>}
      </MsgContainer>
    </>
  );
}

export default Cards;
