import React, { useState, useLayoutEffect, useContext } from 'react';
import { AppContext } from 'App';
import styled from 'styled-components';
import { util } from 'components/Libs';
import PopupContainer from 'components/PopupContainer';
import Popup from 'components/Popup';
import MsgContainer from 'components/MsgContainer';
import Msg from 'components/Msg';
import 'css/ch.css';

const AnimalItemPic = styled.div`
  background: url(${({animalType}) => animalType}) no-repeat center center;
  background-size: 100%;
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
  const [animalIdx, setAnimalIdx] = useState(gameData.ch[saveData.ch[slotIdx].idx].animal_type);

  const [saveItems, setSaveItems] = useState(saveData.ch[slotIdx].items);
  const gameItem = gameData.items;
  const invenItems = saveData.items;
  const [popupOn, setPopupOn] = useState(false);
  const [msgOn, setMsgOn] = useState(false);
  const [itemInfo, setItemInfo] = useState({});
  const [itemType, setItemType] = useState('equip');
  const [kg, setKg] = useState([0,0]);
  const [msg, setMsg] = useState("");
  const handlePopup = (itemType, itemIdx, itemSaveSlot) => {
    if( itemType ){
      let saveItemData;
      if (itemType === 'equip') {
        saveItemData = saveItems[itemSaveSlot];
      } else if (itemType === 'hequip') {
        saveItemData = invenItems['equip'][itemSaveSlot];
      } else {
        saveItemData = invenItems[itemType][itemSaveSlot];
      }
      setItemType(itemType);
      setItemInfo({
        slotIdx: slotIdx,
        gameItem: gameItem[itemType === 'hequip' ? 'equip' : itemType][itemIdx],
        itemSaveSlot: itemSaveSlot,
        saveItemData: saveItemData,
        type: itemType === 'hequip' ? 'equip' : itemType,
      });
    }
    setPopupOn(!popupOn);
  }
  useLayoutEffect(() => { //슬롯이 바뀔때 동물종류 변경
    setAnimalIdx(gameData.ch[saveData.ch[slotIdx].idx].animal_type);
  }, [slotIdx]);
  useLayoutEffect(() => {
    setSaveItems(saveData.ch[slotIdx].items);
    let kg = 0;
    saveItems.forEach((itemData) => {
      if (Object.keys(itemData).length !== 0) {
        kg += gameItem.equip[itemData.idx].kg;
      }
    })
    setKg([kg, Math.floor(gameData.ch[saveData.ch[slotIdx].idx].st1 / 0.3)/10]);
  }, [saveData]);
  return (
    <>
      <div className="items">
        <dl className="info_group it_group">
          <dt flex="true">
            <div><em>ITEM</em><span>(아이템 착용)</span></div>
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
                { saveItems && saveItems.map((data, idx) => {
                  const itemChk = Object.keys(data).length;
                  if (itemChk !== 0) {
                    const items = gameItem.equip[data.idx];
                    const itemsHole = data.hole;
                    return (
                      <li key={`equip${idx}`} onClick={() => {handlePopup('equip', data.idx, idx)}} className={`item item${gameData.animal_type[animalIdx].equip[idx]}`}>
                        <em link={`equip_${data.idx}_${idx}`}>
                          {/* <ItemPic className="pic" itemPic={imgSet.itemEquip[items.display]}></ItemPic> */}
                          <ItemPic className="pic">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[items.display], data.color)}}>
                            </svg>
                          </ItemPic>
                          <span className="lv">{data.lv}</span>
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
                  const items = gameItem.equip[data.idx];
                  const itemsHole = data.hole;
                  return (
                    <li key={`hequip${idx}`} onClick={() => {handlePopup('hequip', data.idx, idx)}} className={`item item${gameData.items.equip[data.idx].part}`} data-itemnum={`equip_${data.idx}`}>
                      <em link={`hequip_${data.idx}_${idx}`}>
                        <ItemPic className="pic">
                          <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[items.display], data.color)}}>
                          </svg>
                        </ItemPic>
                        <span className="lv">{data.lv}</span>
                        <span className="hole" flex-center="true">
                          {itemsHole.map((holedata, holeidx) => {
                            const stoneColor = gameItem.hole[data.hole[holeidx]].stone;
                            return <span key={`${idx}_${holeidx}`} className={`hole_slot hole${holeidx} stone_${stoneColor}`}></span>;
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
                      <em link={`hole_${data.idx}_${idx}`}>
                        <ItemPic className="pic" itemPic={imgSet.itemHole[items.display]} />
                      </em>
                    </li>
                  )
                })}
                { invenItems.upgrade && invenItems.upgrade.map((data, idx) => {
                  const items = gameItem.upgrade[data.idx];
                  return (
                    <li key={`upgrade${idx}`} onClick={() => {handlePopup('upgrade', data.idx, idx)}} className="item item12" data-itemnum={`upgrade_${data.idx}`}>
                      <em link={`upgrade_${data.idx}_${idx}`}>
                        <ItemPic className="pic" itemPic={imgSet.itemUpgrade[items.display]} />
                      </em>
                    </li>
                  )
                })}
                { invenItems.material && invenItems.material.map((data, idx) => {
                  const items = gameItem.material[data.idx];
                  return (
                    <li key={`material${idx}`} onClick={() => {handlePopup('material', data.idx, idx)}} className="item item13" data-itemnum={`material_${data.idx}`}>
                      <em link={`material_${data.idx}_${idx}`}>
                        <ItemPic className="pic" itemPic={imgSet.itemMaterial[items.display]} />
                      </em>
                    </li>
                  )
                })}
                { invenItems.etc && invenItems.etc.map((data, idx) => {
                  const items = gameItem.etc[data.idx];
                  return (
                    <li key={`etc${idx}`} onClick={() => {handlePopup('etc', data.idx, idx)}} className="item item13" data-itemnum={`etc_${data.idx}`}>
                      <em link={`etc_${data.idx}_${idx}`}>
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
        {popupOn && <Popup type={itemType} dataObj={itemInfo} saveData={saveData} changeSaveData={changeSaveData} showPopup={setPopupOn} gameData={gameData} imgSet={imgSet} msgText={setMsg} showMsg={setMsgOn}/>}
      </PopupContainer>
      <MsgContainer>
        {msgOn && <Msg text={msg} showMsg={setMsgOn}></Msg>}
      </MsgContainer>
    </>
  );
}

export default CharacterItems;
