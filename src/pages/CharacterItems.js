import { AppContext } from 'App';
import { FlexBox } from 'components/Container';
import { ItemPic } from 'components/ImagePic';
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
  .animal_item_pic{position:relative;margin:0 auto;width:60%;padding-top:60%;}
  .animal_item_pic .line span{position:absolute;width:0;height:2px;background:transparent;border-top:1px solid #fff;border-bottom:1px solid #fff;z-index:2;}
  .equip_items{position:relative;width:100%;}
  .has_items{padding:5px 0;}
  .h_items{display:flex;flex-flow:wrap;width:100%;}
  .item_area{position:relative;display:flex;flex-direction:column;overflow:hidden;}
  .e_items .item{position:absolute;width:calc(15% - 5px);padding-top:calc(15% - 5px);border:1px solid #fff;}
  .e_items .item:first-of-type{left:6%;top:5px;}
  .e_items .item:nth-of-type(2){left:6%;top:calc(25% + 2px);}
  .e_items .item:nth-of-type(3){left:6%;bottom:calc(25% + 2px);}
  .e_items .item:nth-of-type(4){left:6%;bottom:5px;}
  .e_items .item:nth-of-type(5){right:6%;top:5px;}
  .e_items .item:nth-of-type(6){right:6%;top:calc(25% + 2px);}
  .e_items .item:nth-of-type(7){right:6%;bottom:calc(25% + 2px);}
  .e_items .item:last-of-type{right:6%;bottom:5px;}
  .e_items .item0{border:none;}
  .h_items li{position:relative;margin:0 4.5px 4.5px 0;width:calc(12.5% - 4px);padding-top:calc(12.5% - 4px);box-sizing:border-box;border:1px solid #fff;background-position:center center;background-repeat:no-repeat;}
  .h_items li:nth-of-type(8n){margin:0 0 4.5px 0;}

  .item0{border:none;}
`;
const AnimalItemPic = styled.div`
  &:before{
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
  }
`;
const PossibleKg = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: 1rem;
  font-weight: 600;
`;
const CharacterItems = ({
  navigate,
  saveData,
  changeSaveData,
  slotIdx,
  lang,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
  const saveCh = React.useMemo(() => saveData.ch[slotIdx], [saveData, slotIdx]);
  const chData = React.useMemo(() => gameData.ch[saveCh.idx], [gameData, saveCh]);
  const animalIdx = React.useMemo(() => chData.animal_type, [chData]);

  const saveItems = React.useMemo(() => {
    return saveCh.items
  }, [saveCh, saveData]);
  const gameItem = React.useMemo(() => gameData.items, [gameData]);
  const invenItems = React.useMemo(() => saveData.items, [saveData]);
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
  const [animalSize, setAnimalSize] = useState(0);
  const animalPic = useCallback((node) => {
    if (node !== null) {
      setAnimalSize(node.getBoundingClientRect().width);
    }
  }, []);
  const [popupOn, setPopupOn] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [popupInfo, setPopupInfo] = useState({});
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");
  const handlePopup = useCallback((itemType, itemIdx, itemSaveSlot, itemPart, itemGrade, itemWeaponType) => {
    if( itemType ){
      let saveItemData;
      if (itemType === 'equip') {
        saveItemData = saveItems[itemSaveSlot];
      } else if (itemType === 'hequip') {
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
        slotIdx: slotIdx,
        gameItem: gameItemData,
        itemSaveSlot: itemSaveSlot,
        saveItemData: saveItemData,
        type: itemType === 'hequip' ? 'equip' : itemType,
      });
    }
    setPopupOn(prev => !prev);
  }, [slotIdx]);
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
          <PossibleKg>{`${possibleKg[0]}kg / ${possibleKg[1]}kg`}</PossibleKg>
          <div className="equip_items">
            <AnimalItemPic ref={animalPic} size={animalSize} pic="animalType" idx={animalIdx} className={`animal_item_pic animal_type${animalIdx}`}>
              <span className="line line1"><span className="l1"></span><span className="l2"></span><span className="dot"></span></span>
              <span className="line line2"><span className="l1"></span><span className="l2"></span><span className="dot"></span></span>
              <span className="line line3"><span className="l1"></span><span className="l2"></span><span className="dot"></span></span>
              <span className="line line4"><span className="l1"></span><span className="l2"></span><span className="dot"></span></span>
              <span className="line line5"><span className="l1"></span><span className="l2"></span><span className="dot"></span></span>
              <span className="line line6"><span className="l1"></span><span className="l2"></span><span className="dot"></span></span>
              <span className="line line7"><span className="l1"></span><span className="l2"></span><span className="dot"></span></span>
              <span className="line line8"><span className="l1"></span><span className="l2"></span><span className="dot"></span></span>
            </AnimalItemPic>
            <ul className="e_items">
              {saveItems && saveItems.map((data, idx) => {
                const itemChk = Object.keys(data).length;
                if (itemChk !== 0) {
                  const itemsGrade = data.grade < 5 ? 0 : data.grade - 5;
                  const items = data.part === 3 ? gameItem.equip[data.part][data.weaponType][itemsGrade][data.idx] : gameItem.equip[data.part][0][itemsGrade][data.idx];
                  const itemsHole = data.hole;
                  return (
                    <li key={`equip${idx}`} onClick={() => {handlePopup('equip', data.idx, idx, data.part, data.grade, data.weaponType)}} className={`item item${gameData.animal_type[animalIdx].equip[idx]} ${gameData.itemGrade.txt_e[data.grade].toLowerCase()}`}>
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
                    </li>
                  )
                } else {
                  return <li key={idx} className={`item item${gameData.animal_type[animalIdx].equip[idx]}`}></li>
                }
              })}
            </ul>
          </div>
          <div className="has_items scroll-y">
            <ul className="h_items">
              { invenItems.equip && invenItems.equip.map((data, idx) => {
                const itemsGrade = data.grade < 5 ? 0 : data.grade - 5;
                const items = data.part === 3 ? gameItem.equip[data.part][data.weaponType][itemsGrade][data.idx] : gameItem.equip[data.part][0][itemsGrade][data.idx];
                const itemsHole = data.hole;
                const equipPossible = (() => {
                  let chk;
                  if (data.sealed) {
                    chk = true;
                  } else {
                    chk = !items.limit[saveData.ch[slotIdx].job];
                  }
                  return chk;
                })();
                return (
                  <li key={`hequip${idx}`} onClick={() => {handlePopup('hequip', data.idx, idx, data.part, data.grade, data.weaponType)}} className={`item item${data.part} ${gameData.itemGrade.txt_e[data.grade].toLowerCase()}`} data-itemnum={`equip_${data.idx}`}>
                    <em>
                      <ItemPic type="equip" className={`pic ${data.sealed ? "sealed" : ""} ${equipPossible ? "impossible" : ""}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[items.display], data.color, data.svgColor || data.id)}}>
                        </svg>
                      </ItemPic>
                      <span className="hole" flex-center="true">
                        {itemsHole.map((holeData, holeidx) => {
                          const holePic = holeData !== 0 ? gameItem.hole[holeData.idx].display : 0;
                          return (
                            <span className={`hole_slot hole${holeidx} ${holePic !== 0 ? 'fixed': ''}`} key={`hole${holeidx}`}>
                              <ItemPic type="hole" className="pic" itemPic="itemEtc" idx={holePic} />
                            </span>
                          );
                        })}
                      </span>
                    </em>
                  </li>
                )
              })}
              {/* { invenItems.hole && invenItems.hole.map((data, idx) => {
                const items = gameItem.hole[data.idx];
                return (
                  <li key={`hole${idx}`} onClick={() => {handlePopup('hole', data.idx, idx)}} className="item item11" data-itemnum={`hole_${data.idx}`}>
                    <em>
                      <ItemPic className="pic" itemPic={imgSet.itemHole[items.display]} />
                    </em>
                  </li>
                )
              })}
              { invenItems.upgrade && invenItems.upgrade.map((data, idx) => {
                const items = gameItem.upgrade[data.idx];
                return (
                  <li key={`upgrade${idx}`} onClick={() => {handlePopup('upgrade', data.idx, idx)}} className="item item12" data-itemnum={`upgrade_${data.idx}`}>
                    <em>
                      <ItemPic className="pic" itemPic={imgSet.itemUpgrade[items.display]} />
                    </em>
                  </li>
                )
              })}
              { invenItems.material && invenItems.material.map((data, idx) => {
                const items = gameItem.material[data.idx];
                return (
                  <li key={`material${idx}`} onClick={() => {handlePopup('material', data.idx, idx)}} className="item item13" data-itemnum={`material_${data.idx}`}>
                    <em>
                      <ItemPic className="pic" itemPic={imgSet.itemMaterial[items.display]} />
                    </em>
                  </li>
                )
              })}
              { invenItems.etc && invenItems.etc.map((data, idx) => {
                const items = gameItem.etc[data.idx];
                return (
                  <li key={`etc${idx}`} onClick={() => {handlePopup('etc', data.idx, idx)}} className="item item13" data-itemnum={`etc_${data.idx}`}>
                    <em>
                      <ItemPic className="pic" itemPic={imgSet.images.itemEtc[items.display]} />
                    </em>
                  </li>
                )
              })} */}
            </ul>
          </div>
        </InfoGroup>
      </Wrap>
      <PopupContainer>
        {popupOn && <Popup type={popupType} dataObj={popupInfo} saveData={saveData} changeSaveData={changeSaveData} showPopup={setPopupOn} msgText={setMsg} showMsg={setMsgOn} navigate={navigate} lang={lang} />}
      </PopupContainer>
      <MsgContainer>
        {msgOn && <Msg text={msg} showMsg={setMsgOn}></Msg>}
      </MsgContainer>
    </>
  );
}

export default CharacterItems;
