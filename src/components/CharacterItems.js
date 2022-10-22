import React, { useState, useLayoutEffect, useContext, useRef } from 'react';
import { AppContext } from 'App';
import styled from 'styled-components';
import { util } from 'components/Libs';
import GuideQuestion from 'components/GuideQuestion';
import PopupContainer from 'components/PopupContainer';
import Popup from 'components/Popup';
import MsgContainer from 'components/MsgContainer';
import Msg from 'components/Msg';
import 'css/ch.css';

const AnimalItemPic = styled.div`
  &:before{content:'';position:absolute;left:0;top:0;width:100%;height:100%;background: url(${({animalType}) => animalType}) no-repeat center center;background-size:100%;filter:brightness(0.3);z-index:1;}
  &:after{content:'';position:absolute;left:3px;top:3px;width:100%;height:100%;background: url(${({animalType}) => animalType}) no-repeat center center;background-size:100%;filter:brightness(.1);}
`;
const ItemPic = styled.span`
  background: url(${({itemPic}) => itemPic}) no-repeat center center;
  background-size: 100%;
  svg{width:100%;height:100%;}
`;
const CharacterItems = ({
  saveData,
  changeSaveData,
  slotIdx,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
	const setting = useContext(AppContext).setting,
    lang = setting.lang;
  const [animalIdx, setAnimalIdx] = useState(gameData.ch[saveData.ch[slotIdx].idx].animal_type);

  // const [saveItems, setSaveItems] = useState(saveData.ch[slotIdx].items);
  const saveItems = useRef(null);
  saveItems.current = saveData.ch[slotIdx].items;
  const gameItem = gameData.items;
  const [invenItems, setInvenItems] = useState(saveData.items);
  const [popupOn, setPopupOn] = useState(false);
  const popupType = useRef('');
  const [popupInfo, setPopupInfo] = useState({});
  const [msgOn, setMsgOn] = useState(false);
  const [kg, setKg] = useState([0,0]);
  const [msg, setMsg] = useState("");
  const handlePopup = (itemType, itemIdx, itemSaveSlot, itemPart, itemGrade, itemWeaponType) => {
    if( itemType ){
      let saveItemData;
      if (itemType === 'equip') {
        saveItemData = saveItems.current[itemSaveSlot];
      } else if (itemType === 'hequip') {
        saveItemData = invenItems['equip'][itemSaveSlot];
      } else {
        saveItemData = invenItems[itemType][itemSaveSlot];
      }
      popupType.current = itemType;
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
    setPopupOn(!popupOn);
  }
  useLayoutEffect(() => {
    setAnimalIdx(gameData.ch[saveData.ch[slotIdx].idx].animal_type);//슬롯이 바뀔때 동물종류 변경
    // setSaveItems();
    saveItems.current = saveData.ch[slotIdx].items;
    let kg = 0;
    saveItems.current.forEach((itemData) => {
      if (Object.keys(itemData).length !== 0) {
        const itemsGrade = itemData.grade < 5 ? 0 : itemData.grade - 5;
        kg += itemData.part === 3 ? gameItem.equip[itemData.part][itemData.weaponType][itemsGrade][itemData.idx].kg : gameItem.equip[itemData.part][0][itemsGrade][itemData.idx].kg;
      }
    })
    setKg([kg, Math.floor(gameData.ch[saveData.ch[slotIdx].idx].st1 / 0.3)/10]);
    setInvenItems(saveData.items);
  }, [slotIdx, saveData]);
  return (
    <>
      <div className="items">
        <dl className="info_group it_group">
          <dt flex="true">
            <div><em>ITEM</em><span>(아이템 착용)</span>
              <GuideQuestion size={20} pos={["right","top"]} colorSet={"black"} onclick={() => {
                popupType.current = 'guide';
                setPopupOn(true);
                setPopupInfo({
                  data:gameData.guide["characterItem"],
                });
              }} />
            </div>
            <div className="kg">{`${kg[0]}kg / ${kg[1]}kg`}</div>
          </dt>
          <dd className="item_area">
            <div className="equip_items">
              <AnimalItemPic animalType={imgSet.animalType[animalIdx]} className={`animal_item_pic animal_type${animalIdx}`}>
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
                { saveItems.current && saveItems.current.map((data, idx) => {
                  const itemChk = Object.keys(data).length;
                  if (itemChk !== 0) {
                    const itemsGrade = data.grade < 5 ? 0 : data.grade - 5;
                    const items = data.part === 3 ? gameItem.equip[data.part][data.weaponType][itemsGrade][data.idx] : gameItem.equip[data.part][0][itemsGrade][data.idx];
                    const itemsHole = data.hole;
                    return (
                      <li key={`equip${idx}`} onClick={() => {handlePopup('equip', data.idx, idx, data.part, data.grade, data.weaponType)}} className={`item item${gameData.animal_type[animalIdx].equip[idx]} ${gameData.itemGrade.txt_e[data.grade].toLowerCase()}`}>
                        <em>
                          {/* <ItemPic className="pic" itemPic={imgSet.itemEquip[items.display]}></ItemPic> */}
                          <ItemPic className="pic">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[items.display], data.color, data.id)}}>
                            </svg>
                          </ItemPic>
                          <span className="hole" flex-center="true">
                            {itemsHole.map((holedata, holeidx) => {
                              const stoneColor = gameItem.hole[data.hole[holeidx]].stone;
                              return <span key={`${idx}_${holeidx}`} className={`hole_slot hole${holeidx} stone_${stoneColor}`}></span>;
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
                  const equipPossible = data.part === 3 && !data.sealed ? items.limit[saveData.ch[slotIdx].job] : true;
                  return (
                    <li key={`hequip${idx}`} onClick={() => {handlePopup('hequip', data.idx, idx, data.part, data.grade, data.weaponType)}} className={`item item${data.part} ${gameData.itemGrade.txt_e[data.grade].toLowerCase()}`} data-itemnum={`equip_${data.idx}`}>
                      <em>
                        <ItemPic className={`pic ${data.sealed ? "sealed" : ""} ${equipPossible ? "possible" : ""}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[items.display], data.color, data.id)}}>
                          </svg>
                        </ItemPic>
                        <span className="hole" flex-center="true">
													{itemsHole.map((holeData, holeidx) => {
														const holePic = holeData !== 0 ? gameItem.hole[holeData.idx].display : 0;
														return (
															<span className={`hole_slot hole${holeidx} ${holePic !== 0 ? 'fixed': ''}`} key={`hole${holeidx}`}>
																<ItemPic className="pic" itemPic={imgSet.itemHole[holePic]} />
															</span>
														);
													})}
												</span>
                      </em>
                    </li>
                  )
                })}
                { invenItems.hole && invenItems.hole.map((data, idx) => {
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
                        <ItemPic className="pic" itemPic={imgSet.itemEtc[items.display]} />
                      </em>
                    </li>
                  )
                })}
              </ul>
            </div>
          </dd>
        </dl>
      </div>
      <PopupContainer>
        {popupOn && <Popup type={popupType.current} dataObj={popupInfo} saveData={saveData} changeSaveData={changeSaveData} showPopup={setPopupOn} msgText={setMsg} showMsg={setMsgOn}/>}
      </PopupContainer>
      <MsgContainer>
        {msgOn && <Msg text={msg} showMsg={setMsgOn}></Msg>}
      </MsgContainer>
    </>
  );
}

export default CharacterItems;
