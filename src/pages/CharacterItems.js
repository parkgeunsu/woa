import { AppContext } from 'App';
import { Text } from 'components/Atom';
import { FlexBox } from 'components/Container';
import { IconPic, ItemPic } from 'components/ImagePic';
import InfoGroup from 'components/InfoGroup';
import { util } from 'components/Libs';
import Msg from 'components/Msg';
import MsgContainer from 'components/MsgContainer';
import Popup from 'components/Popup';
import PopupContainer from 'components/PopupContainer';
import 'css/ch.css';
import React, { useCallback, useContext, useState } from 'react';
import styled from 'styled-components';

const Wrap = styled(FlexBox)`
  position: absolute;
  top: 0;
  padding: 25px 20px 20px;
  box-sizing: border-box;
`;
const EquipItems = styled.div`
  position: relative;
  width: 100%;
`;
const EquipItem = styled.ul``;
const ItemList = styled.li`
  position: absolute;
  width: calc(20% - 5px);
  height: 0;
  padding-top: calc(20% - 5px);
  border: 1px solid #fff;
  &:first-of-type {
    left: 6%;
    top: 5px;
  }
  &:nth-of-type(2) {
    right: 6%;
    top: 5px;
  }
  &:nth-of-type(3) {
    left: 6%;
    top: calc(27% + 2px);
  }
  &:nth-of-type(4) {
    right: 6%;
    top: calc(27% + 2px);
  }
  &:nth-of-type(5) {
    left: 6%;
    bottom: calc(27% + 2px);
  }
  &:nth-of-type(6) {
    right: 6%;
    bottom: calc(27% + 2px);
  }
  &:nth-of-type(7) {
    left: 6%;
    bottom: 5px;
  }
  &:nth-of-type(8) {
    right: 6%;
    bottom: 5px;
  }
  ${({empty}) => empty ? `
    background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-grey) 100%);
  ` : ''};
  .txt{position:absolute;left:2px;right:2px;bottom:2px;font-size:0.688rem;text-align:center;z-index:1;}
  .pic{position:absolute;left:0;right:0;bottom:0;top:0;width:100%;}
  .pic.sealed svg{filter:brightness(0.3) drop-shadow(0px 0px 1px #fff);}
  .pic.sealed:before{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);content:'?';z-index:1;font-size:1.25rem;}
  .pic.impossible svg{filter:invert(1);}
  .hole{position:absolute;left:0;right:0;top:0;bottom:0;z-index:3;pointer-events:none;}
  .hole .hole_slot{position:absolute;width:25%;padding-top:25%;border-radius:50%;border:1px solid #000;background:rgba(0,0,0,.7);}
  .hole .hole_slot.fixed{background:rgba(255,172,47,.7)}
  .hole .hole_slot.hole0{left:0;top:0;}
  .hole .hole_slot.hole1{right:0;top:0;}
  .hole .hole_slot.hole2{right:0;bottom:0;}
  .hole .hole_slot.hole3{left:0;bottom:0;}
  .hole .hole_slot.hole4{left:50%;top:50%;transform:translate(-50%,-50%);}
`;
const EmptyIconPic = styled(IconPic)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  filter: grayscale(1);
  opacity: .5;
`;
// .item.item1{background-image:radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-red) 100%);}
// .item.item2{background-image:radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-green) 100%);}
// .item.item3{background-image:radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-blue) 100%);}
// .item.item4{background-image:radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-lightblue) 100%);}
// .item.item5{background-image:radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-yellow) 100%);}

const AnimalItemPic = styled(IconPic)`
  position: relative;
  padding-top: 100%;
  width: 100%;
  height: 0;
  ${'' /* &:before{
    content:'';
    position:absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    ${({pic, size, idx}) => {
      return `
        background: url(${pic}) no-repeat -${(idx % 10) * size}px -${Math.floor(idx / 10) * size}px;
        background-size: ${size * 10}px;
      `;
    }}
    filter:brightness(0.3);
    z-index:1;
  }
  &:after{
    content:'';
    position:absolute;
    left:3px;
    top:3px;
    width:100%;
    height:100%;
    ${({pic, size, idx}) => {
      return `
        background: url(${pic}) no-repeat -${(idx % 10) * size}px -${Math.floor(idx / 10) * size}px;
        background-size: ${size * 10}px;
      `;
    }}
    filter:brightness(.1);
  } */}
`;
const PossibleKg = styled(FlexBox)`
  margin: 0 0 10px 0;
  height: auto;
`;
const CharacterItems = ({
  saveData,
  changeSaveData,
  slotIdx,
}) => {
  const context = useContext(AppContext);
  const lang = React.useMemo(() => {
    return context.setting.lang;
  }, [context]);
  // const imgSet = React.useMemo(() => {
  //   return context.images;
  // }, [context]);
  const gameData = React.useMemo(() => {
    return context.gameData;
  }, [context]);
  const saveCh = React.useMemo(() => saveData.ch[slotIdx], [saveData, slotIdx]);
  const chData = React.useMemo(() => gameData.ch[saveCh.idx], [gameData, saveCh]);
  const animalIdx = React.useMemo(() => chData.animal_type, [chData]);

  const saveItems = React.useMemo(() => {
    return saveCh.items
  }, [saveCh, saveData]);
  const gameItem = React.useMemo(() => gameData.items, [gameData]);
  const possibleKg = React.useMemo(() => {
    let kg = 0;
    saveItems.forEach((itemData) => {
      if (Object.keys(itemData).length !== 0) {
        const itemsGrade = itemData.grade < 5 ? 0 : itemData.grade - 5;
        kg += itemData.part === 3 ? gameItem.equip[itemData.part][itemData.weaponType][itemsGrade][itemData.idx].kg : gameItem.equip[itemData.part][0][itemsGrade][itemData.idx].kg;
      }
    })
    return [kg.toFixed(1), Math.floor(chData.st1 / 0.3)/10];
  }, [saveCh, chData, gameItem, saveItems]);
  const animalPic = useCallback((node) => {
    if (node !== null) {
      node.setAttribute('size', node.getBoundingClientRect().width)
    }
  }, []);
  const [popupOn, setPopupOn] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [popupInfo, setPopupInfo] = useState({});
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");
  const handlePopup = useCallback((itemType, itemIdx, itemSaveSlot, itemPart, itemGrade, itemWeaponType) => {
    if( itemType ){
      const saveItemData = saveItems[itemSaveSlot];
      setPopupType(itemType);
      const itemsGrade = itemGrade < 5 ? 0 : itemGrade - 5;
      let gameItemData = '';
      if (itemType === 'hequip' || itemType === 'equip') {
        gameItemData = itemPart === 3 ? gameItem['equip'][itemPart][itemWeaponType][itemsGrade][itemIdx] : gameItem['equip'][itemPart][0][itemsGrade][itemIdx];
      } else {
        gameItemData = gameItem[itemType][itemIdx];
      }
      setPopupInfo({
        slotIdx: slotIdx,
        gameItem: gameItemData,
        itemSaveSlot: itemSaveSlot,
        saveItemData: saveItemData,
        type: itemType === 'hequip' ? 'equip' : itemType,
      });
    }
    setPopupOn(prev => !prev);
  }, [saveItems, slotIdx]);
  return (
    <>
      <Wrap className="items">
        <InfoGroup title={gameData.msg.menu.equipment[lang]} guideClick={() => {
          setPopupType('guide');
          setPopupOn(true);
          setPopupInfo({
            data:gameData.guide["characterItem"],
          });
        }}>
          <PossibleKg justifyContent="flex-end">
            <Text code="t5" color="main" weight="600">{`${possibleKg[0]}kg / ${possibleKg[1]}kg`}</Text>
          </PossibleKg>
          <EquipItems>
            <AnimalItemPic ref={animalPic} pic="animalType" idx={animalIdx} className={`animal_item_pic animal_type${animalIdx}`} />
            <EquipItem className="e_items">
              {saveItems && saveItems.map((data, idx) => {
                const itemChk = Object.keys(data).length;
                if (itemChk !== 0) {
                  const itemsGrade = data.grade < 5 ? 0 : data.grade - 5;
                  const items = data.part === 3 ? gameItem.equip[data.part][data.weaponType][itemsGrade][data.idx] : gameItem.equip[data.part][0][itemsGrade][data.idx];
                  const itemsHole = data.hole;
                  return (
                    <ItemList key={`equip${idx}`} onClick={() => {handlePopup('equip', data.idx, idx, data.part, data.grade, data.weaponType)}} className={`item item${gameData.animal_type[animalIdx].equip[idx]} ${gameData.itemGrade.txt_e[data.grade].toLowerCase()}`}>
                      <em>
                        <ItemPic type="equip" className="pic">
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
                      </em>
                    </ItemList>
                  )
                } else {
                  const emptyItem = gameData.animal_type[animalIdx].equip[idx];
                  switch(emptyItem) {
                    case 1:
                      return <ItemList empty={true} key={idx}>
                        <EmptyIconPic type="item" pic="icon100" idx={0} />
                      </ItemList>
                    case 2:
                      return <ItemList empty={true} key={idx}>
                        <EmptyIconPic type="item" pic="icon100" idx={1} />
                      </ItemList>
                    case 3:
                      return <ItemList empty={true} key={idx}>
                        <EmptyIconPic type="item" pic="icon100" idx={2} />
                      </ItemList>
                    case 4:
                      return <ItemList empty={true} key={idx}>
                        <EmptyIconPic type="item" pic="icon100" idx={8} />
                      </ItemList>
                    case 5:
                      return <ItemList empty={true} key={idx}>
                        <EmptyIconPic type="item" pic="icon100" idx={9} />
                      </ItemList>
                    case 10:
                      return <ItemList empty={true} key={idx}>
                        <EmptyIconPic type="item" pic="icon100" idx={3} />
                      </ItemList>
                    default:
                      break;
                  } 
                }
              })}
            </EquipItem>
          </EquipItems>
        </InfoGroup>
      </Wrap>
      <PopupContainer>
        {popupOn && <Popup type={popupType} dataObj={popupInfo} saveData={saveData} changeSaveData={changeSaveData} showPopup={setPopupOn} msgText={setMsg} showMsg={setMsgOn} />}
      </PopupContainer>
      <MsgContainer>
        {msgOn && <Msg text={msg} showMsg={setMsgOn}></Msg>}
      </MsgContainer>
    </>
  );
}

export default CharacterItems;
