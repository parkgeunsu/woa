import { AppContext } from 'App';
import { Text } from 'components/Atom';
import { Button } from 'components/Button';
import { FlexBox } from 'components/Container';
import { ChPic, IconPic, ItemPic } from 'components/ImagePic';
import Msg from 'components/Msg';
import MsgContainer from 'components/MsgContainer';
import Popup from 'components/Popup';
import PopupContainer from 'components/PopupContainer';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import ItemGradeColor from 'components/ItemGradeColor';
import { util } from 'components/Libs';
import CharacterAnimalSkill from 'pages/CharacterAnimalSkill';
import CharacterCard from 'pages/CharacterCard';
import CharacterItems from 'pages/CharacterItems';
import CharacterPaging from 'pages/CharacterPaging';
import CharacterRelation from 'pages/CharacterRelation';
import CharacterSkill from 'pages/CharacterSkill';
import CharacterState from 'pages/CharacterState';

const Img = styled.img.attrs(
  ({imgurl}) => ({
    src: imgurl 
  })
)``;
const ChWrap = styled.div`
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
  top: calc(50% - 50px);
  transform: translate(-50%,-50%);
  width: 85%;
  border-radius: 20px;
  overflow: hidden;
  font-size: 0;
  z-index: 1;
  & > img {
    width: 100%;
  }
  .lvEffect span{position:absolute;left:0;right:0;bottom:0%;height:1%;z-index:10;opacity:0;background:rgba(255,255,255,.7);}
  .lvEffect span:first-of-type{transition: all 0.5s 0s ease-in;box-shadow:0 0 20px 10px #fff;}
  .lvEffect span:nth-of-type(2){transition: all 0.5s 0.15s ease-in;box-shadow:0 0 20px 10px #fd0;}
  .lvEffect span:nth-of-type(3){transition: all 0.5s 0.3s ease-in;box-shadow:0 0 20px 10px #fa0;}
  .lvEffect span:nth-of-type(4){transition: all 0.5s 0.45s ease-in;box-shadow:0 0 20px 10px #f80;}
  .lvEffect span:nth-of-type(5){transition: all 0.5s 0.6s ease-in;box-shadow:0 0 20px 10px #f60;}
  .lvEffect span:nth-of-type(6){transition: all 0.5s 0.75s ease-in;box-shadow:0 0 20px 10px #f40;}
  .lvEffect span:last-of-type{transition: all 0.5s 0.9s ease-in;box-shadow:0 0 20px 10px #f20;}
  .lvEffect.on span{opacity:.5;bottom:100%;}
`;
const ChBack = styled(ChPic)`
  position: absolute;
  top: 0;
  background-color: var(--color-b);
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
  border: 0px solid transparent;
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
const ChInven = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  height: 50%;
  border: 5px solid transparent;
  background: rgba(0,0,0,.8);
  border-image: url(${({frameBack}) => frameBack}) 5 round;z-index: 3;
  transition: top linear 0.2s;
`;
const InvenToggleButton = styled(Button)`
  position: absolute;
  left: 50%;
  top: -50px;
  height: 50px;
  width: auto; 
  border-radius: 0;
  border: 5px solid transparent;
  border-bottom-width: 0;
  border-image: url(${({frameBack}) => frameBack}) 5 round;
  transform: translate(-50%, 0);
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
  .hole{position:absolute;left:0;right:0;top:0;bottom:0;z-index:3;pointer-events:none;}
  .hole .hole_slot{position:absolute;width:25%;padding-top:25%;border-radius:50%;border:1px solid #000;background:rgba(0,0,0,.7);}
  .hole .hole_slot.fixed{background:rgba(255,172,47,.7)}
  .hole .hole_slot.hole0{left:0;top:0;}
  .hole .hole_slot.hole1{right:0;top:0;}
  .hole .hole_slot.hole2{right:0;bottom:0;}
  .hole .hole_slot.hole3{left:0;bottom:0;}
  .hole .hole_slot.hole4{left:50%;top:50%;transform:translate(-50%,-50%);}
`;
const setSlotIdxFn = (state, paramData) => {
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
  currentTime,
}) => {
  const context = useContext(AppContext);
	const {state} = useLocation();
  const lang = React.useMemo(() => {
    return context.setting.lang;
  }, [context]);
  const imgSet = React.useMemo(() => {
    return context.images;
  }, [context]);
  const gameData = React.useMemo(() => {
    return context.gameData;
  }, [context]);
  const [popupOn, setPopupOn] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [popupInfo, setPopupInfo] = useState({});
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");
  const gameItem = React.useMemo(() => gameData.items, [gameData]);
  const sData = React.useMemo(() => Object.keys(saveData).length === 0 ? util.loadData('saveData') : saveData, [saveData]);
  const invenItems = React.useMemo(() => {
    return sData.items;
  }, [sData]);
  const chLength = React.useMemo(() => sData.ch.length ,[sData]);
  const paramData = React.useMemo(() => {
    return util.loadData('historyParam');
  }, []);
  const [slotIdx, setSlotIdx] = useState(setSlotIdxFn(state, paramData));
  const [chPage, setChPage] = useState(setPageIdxFn(state));
  useEffect(() => {
		setSlotIdx(setSlotIdxFn(state, paramData));
		setChPage(setPageIdxFn(state));
    if (state?.dataObj.invenOpened) {
      invenRef.current.opend = 'opend';
      invenRef.current.style.top = "calc(65% - 10px)";
    } else {
      invenRef.current.opend = '';
      invenRef.current.style.top = "100%";
    }
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
        chSlotIdx: slotIdx,
        gameItem: gameItemData,
        itemSaveSlot: itemSaveSlot,
        saveItemData: saveItemData,
        type: itemType === 'hequip' ? 'equip' : itemType,
      });
    }
    setPopupOn(prev => !prev);
  }, [invenItems, slotIdx]);
  const invenRef = useRef(null);
  return (
    <>
      <ChWrap className="ch_wrap"  backImg={imgSet.back[0]}>
        <ChArea>
          <div style={{position:"absolute",left:0,top:0,zIndex:100, backgroundColor: '#fff'}}>
            <button onClick={() => {
              const option = {
                type:'equip',
                items:Math.ceil(Math.random()*3),//장비만 해당
                //아이템종류, 세부종류(검,단검), 매직등급
                lv:Math.round(Math.random()*100),
                sealed:true,
              }
              util.getItem(sData, gameData, changeSaveData, option, true, lang);
            }}>아이템 추가</button><br/>
            <button onClick={() => {
              const option = {
                type:'equip',
                items:Math.ceil(Math.random()*2),//장비만 해당
                lv:Math.round(Math.random()*100),
                sealed:true,
              }
              util.getItem(sData, gameData, changeSaveData, option, true, lang);
            }}>동물스킬 리셋</button>
            {currentTime}
          </div>
          <ChCard className="ch_card" chPage={chPage}>
            <Img imgurl={imgSet.images.transparent800} />
            {chPage === 0 ? <CharacterCard saveData={sData} slotIdx={slotIdx} /> : <ChBack type="cardBack" pic="card" idx={1} />}
            {chPage === 1 && <CharacterState saveData={sData} slotIdx={slotIdx} />}
            {chPage === 2 && <CharacterAnimalSkill saveData={sData} slotIdx={slotIdx} changeSaveData={changeSaveData} />}
            {chPage === 3 && <CharacterSkill saveData={sData} slotIdx={slotIdx} />}
            {chPage === 4 && <CharacterRelation saveData={sData} slotIdx={slotIdx} />}
            {chPage === 5 && <CharacterItems saveData={sData} slotIdx={slotIdx} changeSaveData={changeSaveData} />}
          </ChCard>
          <CharacterPaging chLength={chLength} saveData={sData} changeChSlot={changeChSlot} slotIdx={slotIdx} />
          <ChInven ref={invenRef} frameBack={imgSet.etc.frameChBack}>
            <InvenToggleButton frameBack={imgSet.etc.frameChBack} onClick={() => {
              if (invenRef.current.opend === 'opend') {
                invenRef.current.opend = '';
                invenRef.current.style.top = "100%";
              } else {
                invenRef.current.opend = 'opend';
                invenRef.current.style.top = "calc(65% - 10px)";
              }
            }}>
              <Text code="t2" color="main">{gameData.msg.menu.inven[lang]}</Text></InvenToggleButton>
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
                        chk = !items.limit[sData.ch[slotIdx].job];
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
                        <ItemGradeColor part={data.part} grade={gameData.itemGrade.txt_e[data.grade].toLowerCase()} sealed={data.sealed} impossible={equipPossible}>
                          <ItemPic type="equip" className={`pic`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[items.display], data.color, data.svgColor || data.id)}}>
                            </svg>
                          </ItemPic>
                          <span className="hole" flex-center="true">
                            {itemsHole.map((holeData, holeidx) => {
                              const holePic = holeData !== 0 ? gameItem.hole[holeData.idx].display : 0;
                              return (
                                <span className={`hole_slot hole${holeidx} ${holePic !== 0 ? 'fixed': ''}`} key={`hole${holeidx}`}>
                                  <ItemPic type="hole" className="pic" pic="itemEtc" idx={holePic} />
                                </span>
                              );
                            })}
                          </span>
                        </ItemGradeColor>
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
                        <ItemGradeColor part="11">
                          <ItemPic type="hole" className="pic" pic="itemEtc" idx={items.display} />
                        </ItemGradeColor>
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
                      }} >
                        <ItemGradeColor part="12">
                          <ItemPic type="upgrade" className="pic" pic="itemEtc" idx={items.display} />
                        </ItemGradeColor>
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
                        <ItemGradeColor part="13">
                          <ItemPic type="material" className="pic" pic="itemEtc" idx={items.display} />
                        </ItemGradeColor>
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
                        <ItemGradeColor part="13">
                          <ItemPic type="etc" className="pic" pic="itemEtc" idx={items.display} />
                        </ItemGradeColor>
                      </ItemList>
                    )
                  })}
                </ul>
              </InvenItems>
          </ChInven>
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
      </ChWrap>
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
