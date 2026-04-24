
import { Text } from 'components/Atom';
import { FlexBox } from 'components/Container';
import { IconPic } from 'components/ImagePic';
import { Select } from 'components/Input';
import ItemLayout from 'components/ItemLayout';
import { util } from 'components/Libs';
import Msg from "components/Msg";
import MsgContainer from "components/MsgContainer";
import Npc from 'components/Npc';
import Popup from 'components/Popup';
import PopupContainer from 'components/PopupContainer';
import Tooltip from 'components/Tooltip';
import TooltipContainer from 'components/TooltipContainer';
import { AppContext } from 'contexts/app-context';
import CharacterCard from 'pages/CharacterCard';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';

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
  width: 90%;
  height: calc(70% - 10px);
  box-sizing: border-box;
  background: rgba(0,0,0,.7);
  border: 5px solid transparent;
  border-image: url(${({ frameBack }) => frameBack}) 5 round;
`;
const GreetingText = styled(Text)`
  padding: 10%;
`;
const WorkHeader = styled(FlexBox)`
	height: auto;
`;
const LvName = styled(FlexBox)`
  margin: 0 0 0 15px;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const StyledSelect = styled(Select)`
  position: relative;
  height: auto;
  width: auto;
  padding: 5px 10px;
  background: ${({ theme }) => theme.color.main};
`;
const ChList = styled.div`
  padding: 10px;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  overflow-y: auto;
`;
const ChUl = styled.ul`
  display: flex;
  width: 100%;
  height: auto;
  flex-direction: row;
  flex-wrap: wrap;
`;
const ChLi = styled.li`
  position: relative;
  margin: 0 3px 3px 0;
  width: calc(20% - 2.4px);
  height: 0;
  padding-top: calc(20% - 2.4px);
  overflow: hidden;
  border-radius: 10px;
  font-size: 0;
  ${({ used }) => used ? "" : `
    filter: grayscale(1) brightness(0.8);
  `}
  &:nth-of-type(5n) {
    margin: 0 0 3px 0;
  }
`;
const LeaderCh = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
  z-index: 10;
`;
const ChInven = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,.8);
  z-index: 3;
`;
const InvenItems = styled.div`
  padding: 5px;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
`;
const InvenTitle = styled(FlexBox)`
  height: auto;
`;
const InvenText = styled(Text)``;
const StyledIconPic = styled(IconPic)`
  margin: 0 5px 0 0;
  width: 20px;
  height: 20px;
`;
const Items = styled(FlexBox)`
  margin: 0 0 10px 0;
  height: auto;
  &:last-of-type {
    margin: 0;
  }
`;
const ItemList = styled.div`
  position: relative;
  margin: 1%;
  width: 14.66%;
  height: 0;
  padding-top: 14.66%;
  box-sizing: border-box;
  border-radius: 10%;
  background-position: center center;
  background-repeat: no-repeat;
  box-shadow: rgb(0, 0, 0) 0px 0px 10px;
  overflow: hidden;
  .txt{
    position:absolute;
    left:2px;
    right:2px;
    bottom:2px;
    font-size:0.688rem;
    text-align:center;
    z-index:1;
  }
  .pic{
    position:absolute;
    left:0;
    right:0;
    bottom:0;
    top:0;
    width:100%;
  }
`;
const Home = ({
  saveData,
  changeSaveData,
  setLoading,
}) => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const {state} = useLocation();
  const [selectTab, setSelectTab] = useState(typeof state?.tab === "number" ? state.tab : "");
  const theme = useTheme();
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");
  const [popupOn, setPopupOn] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [popupInfo, setPopupInfo] = useState({});
  const [tooltipOn, setTooltipOn] = useState(false);
  const [tooltip, setTooltip] = useState('');
  const [tooltipPos, setTooltipPos] = useState([0,0]);
  const lang = React.useMemo(() => {
    return context.setting.lang;
  }, [context]);
  const imgSet = React.useMemo(() => {
    return context.images;
  }, [context]);
  const gameData = React.useMemo(() => {
    return context.gameData;
  }, [context]);
  const gameItem = React.useMemo(() => {
    return gameData.items;
  }, [gameData]);
  const selectList = React.useMemo(() => {
    return gameData.stateName.map((data) => {
      return gameData.msg.state[data]?.[lang];
    });
  }, [gameData, lang]);
  const sData = React.useMemo(() => Object.keys(saveData).length === 0 ? util.loadData('saveData') : saveData, [saveData]);
  const [selectSort, setSelectSort] = useState(0);

  const memberNum = React.useMemo(() => {
    return Math.round(sData.info.morality / 20) + Math.ceil(sData.info.lv / 10);
  }, [sData]);
  const selectSortList = React.useMemo(() => {
    return {
      ...sData,
      ch: sData.ch
        .map((data, idx) => ({ ...data, slotIdx: idx }))
        .sort((a, b) => b[`st${selectSort}`] - a[`st${selectSort}`])
    };
  }, [sData, selectSort]);
  const [leaderCard, setLeaderCard] = useState(0);

  useEffect(() => {
    const newIdx = selectSortList.ch.findIndex(
      (data) => data.slotIdx === sData.info.leaderIdx
    );
    setLeaderCard(newIdx !== -1 ? newIdx : 0);
  }, [selectSortList, sData.info.leaderIdx]);

  const [greeting, setGreeting] = useState(
    gameData.shop.home.greeting[lang]
  );

  const handlePopup = useCallback((saveObj) => {
    const {itemType, itemData, itemSaveSlot} = saveObj,
      itemIdx = itemData.idx,
      itemPart = itemData.part,
      itemGrade = itemData.grade,
      itemWeaponType = itemData.weaponType;
    if( itemType ){
      let saveItemData;
      if (itemType === 'hequip') {
        saveItemData = sData.items['equip'][itemSaveSlot];
      } else {
        saveItemData = sData.items[itemType][itemSaveSlot];
      }
      setPopupType("item");
      const itemsGrade = itemGrade < 5 ? 0 : itemGrade - 5;
      let gameItemData = '',
        buttons = [];
      if (itemType === 'hequip' || itemType === 'equip') {
        gameItemData = itemPart === 3 ? gameItem['equip'][itemPart][itemWeaponType][itemsGrade][itemIdx] : gameItem['equip'][itemPart][0][itemsGrade][itemIdx];
        buttons = ['sell', 'wear', 'socket', 'upgrade', 'evaluate']
      } else {
        gameItemData = gameItem[itemType][itemIdx];
        buttons = ['sell', 'evaluate'];
      }
      setPopupInfo(prev => ({
        ...prev,
        item: {
          isMoveEvent: false,
          itemAreaType: 'homeInven',//아직 안쓰임
          gameItem: gameItemData,
          itemSaveSlot: itemSaveSlot,
          saveItemData: saveItemData,
          type: itemType === 'hequip' ? 'equip' : itemType,
          buttons: buttons,
          location: {
            name: "home",
            tab: 2
          },
        }
      }));
    }
    setPopupOn(prev => !prev);
  }, [sData, gameItem]);
  
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <Wrap direction="column">
        <Npc
          imgSet={imgSet}
          shopType="home"
          gameData={gameData}
          lang={lang}
          selectTab={selectTab}
          setSelectTab={setSelectTab}
          navigate={navigate}
          onClick={() => {
            setSelectTab("");
            const randomIdx = Math.floor(
              Math.random() * gameData.shop.home.randomText.length
            );
            setGreeting(gameData.shop.home.randomText[randomIdx][lang]);
          }}
        />

        <WorkArea frameBack={imgSet.etc.frameChBack} direction="column" alignItems="flex-end">
          {selectTab === "" ? (
            <GreetingText code="t4" color="main">{greeting}</GreetingText>
          ) : (
            <WorkHeader direction="row" justifyContent="space-between" alignItems="center">
              {selectTab === 0 && <>
                <Text style={{margin: "0 0 0 10px"}} code="t3" color="main">
                  {gameData.msg.title.leader[lang]}
                </Text>
                <LvName justifyContent="flex-start">
                  <Text code="t5" color="main" weight="600">
                    {`Lv.${sData.ch[sData.info.leaderIdx].lv} ${gameData.ch[sData.ch[sData.info.leaderIdx].idx].na1[lang]}`}
                  </Text>
                </LvName>
              </>}
              {selectTab === 1 && <>
                <Text style={{margin: "0 0 0 10px"}} code="t3" color="main">
                  {gameData.msg.title.memberNum[lang]}
                </Text>
                <LvName justifyContent="flex-start">
                  <Text code="t5" color="main" weight="600">
                    {`${sData.entry.length} / ${memberNum}`}
                  </Text>
                </LvName>
              </>}
              {(selectTab === 0 || selectTab === 1 || selectTab === 3) && <StyledSelect
                selectIdx={selectSort}
                setSelectIdx={setSelectSort}
                selectOption={selectList}
                title={`${gameData.msg.state.align[lang]}`}
                onClick={(idx) => {
                  setSelectSort(idx);
                }}
              />}
            </WorkHeader>
          )}

          {/* ✅ Leader 선택 */}
          {selectTab === 0 && (
            <ChList>
              <ChUl>
                {selectSortList.ch.map((data, idx) => {
                  const isLeader = leaderCard === idx;
                  return <ChLi
                    key={idx}
                    used={isLeader}
                    onClick={() => {
                      const entry = [
                        data.slotIdx,
                        ...sData.entry.filter((e) => e !== data.slotIdx),
                      ];

                      setLeaderCard(idx);
                      changeSaveData({
                        ...sData,
                        info: {
                          ...sData.info,
                          leaderIdx: data.slotIdx,
                        },
                        entry,
                      });
                    }}
                  >
                    <CharacterCard
                      usedType="thumb"
                      saveCharacter={data}
                      saveData={sData}
                      showNum={data[`st${selectSort}`]}
                      slotIdx={idx}
                    />
                    {isLeader && <LeaderCh>
                      <IconPic type="scenario" pic="icon100" idx={4} />
                    </LeaderCh>}
                  </ChLi>
                })}
              </ChUl>
            </ChList>
          )}
          {selectTab === 1 && (
            <ChList>
              <ChUl>
                {selectSortList.ch.map((data, idx) => {
                  const isEntry = sData.entry.includes(data.slotIdx);
                  const isLeader = data.slotIdx === sData.info.leaderIdx;
                  return (
                    <ChLi
                      key={idx}
                      used={isEntry}
                      isLeader={isLeader}
                      onClick={() => {
                        let newEntry = [...sData.entry];
                        if (!isEntry) {
                          if (sData.entry.length >= memberNum) {
                            setMsgOn(true);
                            setMsg(gameData.msg.sentence.needMoreMemberNum[lang]);
                            return;
                          }
                          newEntry.push(data.slotIdx);
                        } else {
                          if (isLeader) {
                            setMsgOn(true);
                            setMsg(gameData.msg.sentence.noRemoveLeader[lang]);
                            return;
                          }
                          newEntry = newEntry.filter(
                            (e) => e !== data.slotIdx
                          );
                        }
                        changeSaveData({
                          ...sData,
                          entry: newEntry,
                          actionCh: {
                            equipment: {idx: ""},
                            church: {idx: ""},
                            temple: {idx: ""},
                            mystery: {idx: ""},
                            tavern: {idx: ""},
                            townHall: {idx: ""},
                            guild: {idx: ""},
                            port: {idx: ""},
                            accessory: {idx: ""},
                            tool: {idx: ""},
                            shipyard: {idx: ""},
                            tradingPost: {idx: ""},
                            blacksmith: {idx: ""},
                            training: {idx: ""},
                            training2: {idx: ""},
                            composite: {idx: ""},
                            recruitment: {idx: ""}
                          }
                        });
                      }}
                    >
                      <CharacterCard
                        usedType="thumb"
                        saveCharacter={data}
                        saveData={sData}
                        showNum={data[`st${selectSort}`]}
                        slotIdx={idx}
                      />
                      {isLeader && <LeaderCh>
                        <IconPic type="scenario" pic="icon100" idx={4} />
                      </LeaderCh>}
                    </ChLi>
                  );
                })}
              </ChUl>
            </ChList>
          )}
          {selectTab === 2 && <ChInven>
            <InvenItems>
              <InvenTitle justifyContent="flex-start" alignItems="center">
                <StyledIconPic type="item" pic="icon100" idx={1} />
                <InvenText code="t3" color="main">{gameData.msg.menu.equip[lang]}</InvenText>
              </InvenTitle>
              <Items flexWrap="wrap" justifyContent="flex-start">
                {sData.items.equip && sData.items.equip.map((data, idx) => {
                  const itemsGrade = data.grade < 5 ? 0 : data.grade - 5;
                  const items = data.part === 3 ? gameItem.equip[data.part][data.weaponType][itemsGrade][data.idx] : gameItem.equip[data.part][0][itemsGrade][data.idx];
                  const itemsHole = data.hole;
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
                          pic: items.pic,
                          idx: items.display,
                          mergeColor: data.color,
                        }}
                        part={data.part}
                        grade={data.grade}
                        itemsHole={itemsHole}
                        sealed={data.sealed}
                      />
                    </ItemList>
                  )
                })}
              </Items>
              <InvenTitle justifyContent="flex-start" alignItems="center">
                <StyledIconPic type="item" pic="icon100" idx={4} />
                <InvenText code="t3" color="main">{gameData.msg.menu.hole[lang]}</InvenText>
              </InvenTitle>
              <Items flexWrap="wrap" justifyContent="flex-start">
                {sData.items.hole && sData.items.hole.map((data, idx) => {
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
                          pic: items.pic,
                          idx: items.display
                        }}
                        part="11"
                        grade={data.grade || items.grade}
                        sealed={items.sealed}
                      />
                    </ItemList>
                  )
                })}
              </Items>
              <InvenTitle justifyContent="flex-start" alignItems="center">
                <StyledIconPic type="item" pic="icon100" idx={5} />
                <InvenText code="t3" color="main">{gameData.msg.menu.upgrade[lang]}</InvenText>
              </InvenTitle>
              <Items flexWrap="wrap" justifyContent="flex-start">
                {sData.items.upgrade && sData.items.upgrade.map((data, idx) => {
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
                          pic: items.pic,
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
              </Items>
              <InvenTitle justifyContent="flex-start" alignItems="center">
                <StyledIconPic type="item" pic="icon100" idx={6} />
                <InvenText code="t3" color="main">{gameData.msg.menu.material[lang]}</InvenText>
              </InvenTitle>
              <Items flexWrap="wrap" justifyContent="flex-start">
                {sData.items.material && sData.items.material.map((data, idx) => {
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
                          pic: items.pic,
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
              </Items>
              <InvenTitle justifyContent="flex-start" alignItems="center">
                <StyledIconPic type="item" pic="icon100" idx={7} />
                <InvenText code="t3" color="main">{gameData.msg.menu.etc[lang]}</InvenText>
              </InvenTitle>
              <Items flexWrap="wrap" justifyContent="flex-start">
                {sData.items.etc && sData.items.etc.map((data, idx) => {
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
                          pic: items.pic,
                          idx: items.display
                        }}
                        part="13"
                        grade={items.grade}
                        sealed={items.sealed}
                      />
                    </ItemList>
                  )
                })}
              </Items>
            </InvenItems>
          </ChInven>}
          {selectTab === 3 && (
            <ChList>
              <ChUl>
                {selectSortList.ch.map((data, idx) => {
                  const isLeader = data.slotIdx === sData.info.leaderIdx;
                  return (
                    <ChLi
                      key={idx}
                      isLeader={isLeader}
                      used={true}
                      onClick={() => {
                        util.saveHistory({
                          prevLocation: 'home',
                          location: 'cards',
                          navigate: navigate,
                          callback: () => {
                            util.saveData('historyParam', {
                              ...util.loadData('historyParam'),
                              cards: {
                                isAll: true,
                                chSlotIdx: data.slotIdx,
                                chTabIdx: 0,
                              }
                            });
                          },
                          state: {
                            dataObj: {
                              isAll: true,
                              chSlotIdx: data.slotIdx,
                              chTabIdx: 0,
                            }
                          },
                          prevState: {
                            tab: 3,
                          },
                          isNavigate: true,
                        });//히스토리 저장
                      }}
                    >
                      <CharacterCard
                        usedType="thumb"
                        saveCharacter={data}
                        saveData={sData}
                        showNum={data[`st${selectSort}`]}
                        slotIdx={idx}
                      />
                      {isLeader && <LeaderCh>
                        <IconPic type="scenario" pic="icon100" idx={4} />
                      </LeaderCh>}
                    </ChLi>
                  );
                })}
              </ChUl>
            </ChList>
          )}
        </WorkArea>
      </Wrap>
      <PopupContainer>
        {popupOn && <Popup type={popupType} dataObj={popupInfo} saveData={sData} changeSaveData={changeSaveData} showPopup={setPopupOn} msgText={setMsg} showMsg={setMsgOn} setTooltip={setTooltip} setTooltipPos={setTooltipPos} setTooltipOn={setTooltipOn} theme={theme}/>}
      </PopupContainer>
      <MsgContainer>
        {msgOn && <Msg text={msg} showMsg={setMsgOn} />}
      </MsgContainer>
			<TooltipContainer>
				{tooltipOn && <Tooltip isDark={true} pos={tooltipPos} text={tooltip} showTooltip={setTooltipOn} />}
			</TooltipContainer>
    </>
  );
};

export default Home;
