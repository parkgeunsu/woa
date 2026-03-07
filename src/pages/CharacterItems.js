import { Text } from "components/Atom";
import { FlexBox } from "components/Container";
import { IconPic, ItemPic } from "components/ImagePic";
import InfoGroup from "components/InfoGroup";
import ItemGradeColor from "components/ItemGradeColor";
import Msg from "components/Msg";
import MsgContainer from "components/MsgContainer";
import Popup from "components/Popup";
import PopupContainer from "components/PopupContainer";
import { AppContext } from 'contexts/app-context';
import React, { useCallback, useContext, useState } from "react";
import styled from "styled-components";

const Wrap = styled(FlexBox)`
  position: absolute;
  top: 0;
  padding: 25px 20px 20px;
  box-sizing: border-box;
`;
const ActionType = styled.div`
  position: absolute;
  right: 5px;
  bottom: 5px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: ${({ theme }) => `0 0 10px 5px ${theme.color.red}`};
  z-index: 10;
`;
const EquipItems = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;
const EquipItem = styled.ul``;
const ItemList = styled.li`
  position: absolute;
  width: calc(20% - 5px);
  height: 0;
  padding-top: calc(20% - 5px);
  border: 1px solid ${({ gradeColor }) => gradeColor || "#fff"};
  &:first-of-type {
    left: 3%;
    top: 5px;
  }
  &:nth-of-type(2) {
    right: 3%;
    top: 5px;
  }
  &:nth-of-type(3) {
    left: 3%;
    top: 20%;
  }
  &:nth-of-type(4) {
    right: 3%;
    top: 20%;
  }
  &:nth-of-type(5) {
    left: 3%;
    top: 40%;
  }
  &:nth-of-type(6) {
    right: 3%;
    top: 40%;
  }
  &:nth-of-type(7) {
    left: 3%;
    top: 60%;
  }
  &:nth-of-type(8) {
    right: 3%;
    top: 60%;
  }
  ${({ empty }) =>
    empty
      ? `
    background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-grey) 100%);
  `
      : ""};
  .txt {
    position: absolute;
    left: 2px;
    right: 2px;
    bottom: 2px;
   font-size: 0.688rem;
    text-align: center;
    z-index: 1;
  }
  .pic {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    width: 100%;
  }
  .pic.impossible svg {
    filter: invert(1);
  }
`;
const Hole = styled(FlexBox)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 3;
  pointer-events: none;
  .hole_slot {
    width: 15%;
    padding-top: 15%;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.7);
  }
  .hole_slot.fixed {
    background: rgba(255, 172, 47, 0.7);
  }
`;
const EmptyIconPic = styled(IconPic)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  filter: grayscale(1);
  opacity: 0.5;
`;
// .item.item1{background-image:radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-red) 100%);}
// .item.item2{background-image:radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-green) 100%);}
// .item.item3{background-image:radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-blue) 100%);}
// .item.item4{background-image:radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-lightblue) 100%);}
// .item.item5{background-image:radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-yellow) 100%);}

const AnimalItemPic = styled(IconPic)`
  position: absolute;
  right: 0;
  bottom: 0;
  padding-top: 70%;
  width: 70%;
  height: 0;
`;
const PossibleKg = styled(FlexBox)`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100px;
  height: auto;
`;
const PossibleKgBar = styled.div`
  position: relative;
  margin: 0 0 5px 0;
  width: 100%;
  height: 10px;
  border: ${({ theme }) => `1px solid ${theme.color.grey1};`};
  background: ${({ theme }) => theme.color.grey3};
  border-radius: 20px;
  overflow: hidden;
`;
const PossibleKgCurrentBar = styled.span`
  display: inline-block;
  position: absolute;
  left: 0;
  width: ${({ percent }) => (percent > 100 ? 100 : percent)}%;
  height: 100%;
  border-radius: 20px;
  transition: width linear 0.5s;
`;
const State = styled(FlexBox)`
  position: absolute;
  left: 25%;
  right: 25%;
  top: 0;
  width: 50%;
  height: 100%;
  ul {
    width: 100%;
  }
`;
const StateList = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StateText = styled(Text)`
  margin: 0 10px 0 0;
`;
const ItemBox = styled(FlexBox)`
  display: ${({ isShow }) => (isShow ? "flex" : "none")};
  position: absolute;
  top: 0;
  right: calc(23% - 2px);
  bottom: 15%;
  left: calc(23% - 2px);
  width: auto;
  height: auto;
  border: 5px solid transparent;
  background: rgba(0,0,0,.8);
  border-image: url(${({frameBack}) => frameBack}) 5 round;
  overflow-y: auto;
  z-index:2;
`;
const ItemBoxNoList = styled(FlexBox)`
  padding: 20px;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
`;
const ItemBoxList = styled.div`
  position: relative;
  padding-top: calc(25% - 5px);
  width: calc(25% - 5px);
  height: 0;
  border: 1px solid ${({ gradeColor }) => gradeColor || "#fff"};
  .txt {
    position: absolute;
    left: 2px;
    right: 2px;
    bottom: 2px;
   font-size: 0.688rem;
    text-align: center;
    z-index: 1;
  }
  .pic {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    width: 100%;
  }
  .pic.impossible svg {
    filter: invert(1);
  }
`;
const CharacterItems = ({ saveData, changeSaveData, slotIdx }) => {
  const context = useContext(AppContext);
  const lang = React.useMemo(() => {
    return context.setting.lang;
  }, [context]);
  const imgSet = React.useMemo(() => {
    return context.images;
  }, [context]);
  const gameData = React.useMemo(() => {
    return context.gameData;
  }, [context]);
  const saveCh = React.useMemo(() => saveData.ch[slotIdx], [saveData, slotIdx]);
  const chData = React.useMemo(
    () => gameData.ch[saveCh.idx],
    [gameData, saveCh]
  );
  const animalIdx = React.useMemo(() => chData.animal_type, [chData]);

  const saveItems = React.useMemo(() => {
    return saveCh.items;
  }, [saveCh]);
  const gameItem = React.useMemo(() => gameData.items, [gameData]);
  
  const possibleKgStatus = React.useMemo(() => {
    let currentKg = 0;
    saveItems.forEach((itemData) => {
      if (itemData && Object.keys(itemData).length !== 0) {
        const itemsGrade = itemData.grade < 5 ? 0 : itemData.grade - 5;
        currentKg +=
          itemData.part === 3
            ? gameItem.equip[itemData.part][itemData.weaponType][itemsGrade][
                itemData.idx
              ].kg
            : gameItem.equip[itemData.part][0][itemsGrade][itemData.idx].kg;
      }
    });
    const chGrade = saveCh.grade - gameData.ch[saveCh.idx].grade;
    const maxKg = Math.floor((chData.st1 / 0.3 + (saveCh.kg / gameData.animal_size.kg[chData.animal_type][1] - 1) * 100) / 10 * gameData.addGradeArr[chGrade + 1]);
    
    return {
      current: currentKg,
      max: maxKg,
      percent: (currentKg / maxKg) * 100
    };
  }, [saveCh, chData, gameItem, saveItems, gameData.animal_size.kg]);

  const animalPic = useCallback((node) => {
    if (node !== null) {
      node.setAttribute("size", node.getBoundingClientRect().width);
    }
  }, []);
  
  const [popupOn, setPopupOn] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [popupInfo, setPopupInfo] = useState({});
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");

  const [itemBoxShow, setItemBoxShow] = useState(false);
  const [possibleEquipItem, setPossibleEquipItem] = useState([]);
  const handlePopup = useCallback(
    ({itemType, itemIdx, itemSaveSlot, itemPart, itemGrade, itemWeaponType}) => {
      if (itemType) {
        const saveItemData = itemType === "hequip" ? saveData.items.equip[itemSaveSlot] : saveItems[itemSaveSlot];
        setPopupType(itemType);
        const itemsGrade = itemGrade < 5 ? 0 : itemGrade - 5;
        let gameItemData = "";
        if (itemType === "hequip" || itemType === "equip") {
          gameItemData =
            itemPart === 3
              ? gameItem["equip"][itemPart][itemWeaponType][itemsGrade][itemIdx]
              : gameItem["equip"][itemPart][0][itemsGrade][itemIdx];
        } else {
          gameItemData = gameItem[itemType][itemIdx];
        }
        setPopupInfo({
          chSlotIdx: slotIdx,
          gameItem: gameItemData,
          itemSaveSlot: itemSaveSlot,
          saveItemData: saveItemData,
          type: itemType === "hequip" ? "equip" : itemType,
        });
      }
      setPopupOn((prev) => !prev);
    },
    [saveItems, slotIdx, gameItem]
  );

  const emptyIconMap = {
    1: 0,
    2: 1,
    3: 2,
    4: 8,
    5: 9,
    10: 3
  };

  return (
    <>
      <Wrap className="items">
        <InfoGroup
          pointTitle={`Lv.${saveCh.lv} ${chData.na1[lang]}`}
          title={`${gameData.msg.grammar.conjunction[lang]} ${gameData.msg.menu.equipment[lang]}`}
          guideClick={() => {
            setPopupType("guide");
            setPopupOn(true);
            setPopupInfo({
              data: gameData.guide["characterItem"],
            });
          }}
        >
          <PossibleKg
            direction="column"
            alignItems="flex-start"
            justifyContent="flex-start"
          >
            <PossibleKgBar>
              <PossibleKgCurrentBar
                className="gradient_dark_g"
                percent={possibleKgStatus.percent}
              />
            </PossibleKgBar>
            <Text
              code="t2"
              color="main"
            >{`${possibleKgStatus.current.toFixed(1)}kg / ${possibleKgStatus.max.toFixed(1)}kg`}</Text>
          </PossibleKg>
          <AnimalItemPic
            ref={animalPic}
            pic="animalType"
            idx={animalIdx}
          />
          <ActionType>
            <IconPic
              type="element"
              isAbsolute={true}
              isThumb={true}
              pic="icon100"
              idx={saveCh.newActionType[0] + 1}
            />
          </ActionType>
          <EquipItems>
            <EquipItem className="e_items">
              {saveItems &&
                saveItems.map((data, idx) => {
                  const itemChk = data && Object.keys(data).length;
                  if (itemChk) {
                    const itemsGrade = data.grade < 5 ? 0 : data.grade - 5;
                    const items =
                      data.part === 3
                        ? gameItem.equip[data.part][data.weaponType][
                            itemsGrade
                          ][data.idx]
                        : gameItem.equip[data.part][0][itemsGrade][data.idx];
                    const itemsHole = data.hole;
                    return (
                      <ItemList
                        key={`equip${idx}`}
                        gradeColor={gameData.itemGrade.color[data.grade]}
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePopup({
                            itemType: "equip",
                            itemIdx: data.idx,
                            itemSaveSlot: idx,
                            itemPart: data.part,
                            itemGrade: data.grade,
                            itemWeaponType: data.weaponType
                          });
                        }}
                      >
                        <ItemGradeColor
                          part={gameData.animal_type[animalIdx].equip[idx]}
                          grade={gameData.itemGrade.txt_e[
                            data.grade
                          ].toLowerCase()}
                        >
                          <ItemPic type="equip" pic="equip" idx={items.display} />
                          <Hole alignItems="flex-end" justifyContent="space-between">
                            {itemsHole.map((holeData, holeidx) => {
                              const holePic =
                                holeData !== 0
                                  ? gameItem.hole[holeData.idx].display
                                  : 0;
                              return (
                                <span
                                  className={`hole_slot ${
                                    holePic !== 0 ? "fixed" : ""
                                  }`}
                                  key={`hole${holeidx}`}
                                >
                                  <ItemPic
                                    type="hole"
                                    className="pic"
                                    pic="itemEtc"
                                    idx={holePic}
                                  />
                                </span>
                              );
                            })}
                          </Hole>
                        </ItemGradeColor>
                      </ItemList>
                    );
                  } else {
                    const emptyItemType = gameData.animal_type[animalIdx].equip[idx];
                    const iconIdx = emptyIconMap[emptyItemType];
                    
                    if (iconIdx !== undefined) {
                      return (
                        <ItemList empty={true} key={idx} onClick={() => {
                          const equipType = gameData.animal_type[animalIdx].equip[idx];
                          setItemBoxShow(true);
                          setPossibleEquipItem(saveData?.items?.equip.map((value, index) => ({value, index})).filter((itemData) => {
                            return itemData.value.part === equipType;
                          }));
                        }}>
                          <EmptyIconPic type="item" pic="icon100" idx={iconIdx} />
                        </ItemList>
                      );
                    }
                    return null;
                  }
                })}
            </EquipItem>
            <State alignItems="flex-start">
              <ul>
                {gameData.battleStateName.map((bData, idx) => {
                  return (
                    <StateList key={idx} className={bData}>
                      <StateText code="t2" color="main">
                        {gameData.msg.state[bData][lang]}
                      </StateText>
                      <Text code="t4" color="set">
                        {(saveCh["bSt" + idx] || 0) + (saveCh["iSt" + idx] || 0)}
                      </Text>
                    </StateList>
                  );
                })}
              </ul>
            </State>
            <ItemBox isShow={itemBoxShow} frameBack={imgSet.etc.frameChBack} justifyContent="flex-start" alignItems="flex-start" alignContent="flex-start"flexWrap="wrap" onClick={() => {
              setItemBoxShow(false);
            }}>
              {possibleEquipItem.length > 0 ? possibleEquipItem.map((itemData, idx) => {
                const itemDataValue = itemData.value;
                const itemsGrade = itemDataValue.grade < 5 ? 0 : itemDataValue.grade - 5;
                const items = itemDataValue.part === 3 ? gameItem.equip[itemDataValue.part][itemDataValue.weaponType][itemsGrade][itemDataValue.idx] : gameItem.equip[itemDataValue.part][0][itemsGrade][itemDataValue.idx];
                const itemsHole = itemDataValue.hole;
                const equipPossible = (() => {
                  let chk;
                  if (itemData.sealed) {
                    chk = true;
                  } else {
                    chk = !items.limit[saveCh.job];
                  }
                  return chk;
                })();
                return items && (
                  <ItemBoxList key={`hequip${idx}`} onClick={(e) => {
                    e.stopPropagation();
                    handlePopup({
                      itemType: 'hequip',
                      itemIdx: itemDataValue.idx,
                      itemSaveSlot: itemData.index,
                      itemPart: itemDataValue.part,
                      itemGrade: itemDataValue.grade,
                      itemWeaponType: itemDataValue.weaponType
                    });
                  }} data-itemnum={`equip_${itemDataValue.idx}`}>
                    <ItemGradeColor part={itemDataValue.part} grade={gameData.itemGrade.txt_e[itemDataValue.grade].toLowerCase()} sealed={itemDataValue.sealed} impossible={equipPossible}>
                      <ItemPic type="equip" pic="equip" idx={items.display} />
                      <Hole alignItems="flex-end" justifyContent="space-between">
                        {itemsHole.map((holeData, holeidx) => {
                          const holePic = holeData !== 0 ? gameItem.hole[holeData.idx].display : 0;
                          return (
                            <span className={`hole_slot ${holePic !== 0 ? 'fixed': ''}`} key={`hole${holeidx}`}>
                              <ItemPic type="hole" className="pic" pic="itemEtc" idx={holePic} />
                            </span>
                          );
                        })}
                      </Hole>
                    </ItemGradeColor>
                  </ItemBoxList>
                )
              }) : <ItemBoxNoList justifyContent="center" alignItems="center"><Text code="t2" color="main">{gameData.msg.sentence.noWearableItems[lang]}</Text></ItemBoxNoList>}
            </ItemBox>
          </EquipItems>
        </InfoGroup>
      </Wrap>
      <PopupContainer>
        {popupOn && (
          <Popup
            type={popupType}
            dataObj={popupInfo}
            saveData={saveData}
            changeSaveData={changeSaveData}
            showPopup={setPopupOn}
            msgText={setMsg}
            showMsg={setMsgOn}
          />
        )}
      </PopupContainer>
      <MsgContainer>
        {msgOn && <Msg text={msg} showMsg={setMsgOn}></Msg>}
      </MsgContainer>
    </>
  );
};

export default CharacterItems;
