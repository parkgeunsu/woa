import { Text } from 'components/Atom';
import { ActionChDisplay } from 'components/Components';
import { FlexBox } from 'components/Container';
import { MergedPic } from 'components/ImagePic';
import ItemLayout from 'components/ItemLayout';
import { util } from 'components/Libs';
import Msg from 'components/Msg';
import MsgContainer from 'components/MsgContainer';
import Npc from 'components/Npc';
import Popup from 'components/Popup';
import PopupContainer from 'components/PopupContainer';
import { AppContext } from 'contexts/app-context';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrap = styled(FlexBox)`
  position: absolute;
  inset: 0;
  padding: 0 0 20px 0;
  box-sizing: border-box;
  overflow: hidden;
`;
const MysteryContent = styled(FlexBox)`
	position: relative;
	margin: 10px auto 0;
	height: 45%;
	width: 90%;
  background: rgba(0,0,0,.7);
  border: 5px solid transparent;
  border-image: url(${({frameBack}) => frameBack}) 5 round;
	box-sizing: border-box;
`;
const GreetingText = styled(Text)`
	padding: 10%;
`;
const ShopItem = styled.div`
	position: absolute;
	inset: 0;
	overflow-y: auto;
	${({selected}) => selected ? `
		pointer-events: unset;
		opacity: 1;
	` : `
		pointer-events: none;
		opacity: 0;
	`};
`;
const UserContainer = styled(FlexBox)`
	position: relative;
	padding: 10px 20px 0 20px;
	height: calc(25% - 10px);
	width: calc(100% - 40px);
`;
const InfoGroup = styled(FlexBox)`
	position: relative;
	flex: 1;
	margin: 0 10px 0 0;
	padding: 10px 20px;
	height: 100%;
	box-sizing: border-box;
	background: rgba(0,0,0,.8);
`;
const ActionPic = styled(FlexBox)`
	position: relative;
	width: auto;
	height: 100%;
	border-radius: 5%;
	overflow: hidden;
  box-sizing: border-box;
  background: rgb(0, 0, 0, 0.5);
  z-index: 3;
`;
const NoneChText = styled(Text)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;
const Img = styled.img.attrs(
	({imgurl}) => ({
		src: imgurl 
	})
)`
	height: 100%;
`;
const Mystery = ({
	saveData,
	changeSaveData,
  setLoading,
}) => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const {state} = useLocation();
  const [selectTab, setSelectTab] = useState(typeof state?.tab === "number" ? state.tab : "");
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
  const sData = React.useMemo(() => Object.keys(saveData).length === 0 ? util.loadData('saveData') : saveData, [saveData]);
  const stayIdx = React.useMemo(() => util.getRegionToIdx(sData?.info?.stay), [sData]);
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
      };
    });
  }, [sData]);
  const actionChIdx = React.useMemo(() => {
    return sData.actionCh.mystery.idx <= entries.length - 1 ? sData.actionCh.mystery.idx : "";
  }, [entries, sData]);
  const saveCh = React.useMemo(() => entries[actionChIdx] || {}, [entries, actionChIdx]);
  const [greeting, setGreeting] = useState(gameData.shop.mystery.greeting[lang]);
  const itemCate = useRef(['equip', 'hole', 'upgrade', 'material', 'etc']);
  const shopItem = React.useMemo(() => {
    const cityData = sData.city[stayIdx];
    return [
      [...cityData.mystery.exp],
      [...cityData.mystery.money],
      [...cityData.mystery.life],
    ];
  }, [stayIdx, sData]);
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <>
			<Wrap direction="column">
				<Npc imgSet={imgSet} shopType={'mystery'} gameData={gameData} lang={lang} selectTab={selectTab} setSelectTab={setSelectTab} navigate={navigate} onClick={() => {
          setSelectTab("");
          const randomIdx = Math.floor(Math.random() * gameData.shop.mystery.randomText.length);
          setGreeting(gameData.shop.mystery.randomText[randomIdx][lang]);
				}}/>
        <MysteryContent frameBack={imgSet.etc.frameChBack}>
          {selectTab === "" && <GreetingText code="t4" color="main" wordBreak="keep-all">{greeting}</GreetingText>}
          {shopItem.map((scrollData, scrollIdx) => {
            return <ShopItem selected={selectTab === scrollIdx} key={`scrollContent${scrollIdx}`}>
              {scrollData.map((itemData, itemIdx) => {
                if (typeof itemData.part === 'number') {
                  const itemsGrade = itemData.grade < 5 ? 0 : itemData.grade - 5;
                  const items = itemData.part === 3 ? gameItem.equip[itemData.part][itemData.weaponType][itemsGrade][itemData.idx] : gameItem.equip[itemData.part][0][itemsGrade][itemData.idx];
                  return items && <ItemLayout 
                    gameItem={gameItem}
                    icon={{
                      type: itemData.type,
                      pic: items.pic,
                      idx: items.display,
                    }}
                    num={5}
                    key={`items${itemIdx}`}
                    grade={itemData.grade}
                    selectColor={itemData.color}
                    onClick={() => {
                      setPopupType("item");
                      setPopupInfo(prev => ({
                        ...prev,
                        item: {
                          isMoveEvent: false,
                          itemAreaType: 'mystery',//아직 안쓰임
                          gameItem: items,
                          itemSaveSlot: itemData.slot,
                          saveItemData: itemData,
                          type: "equip",
                          buttons: ['buy'],
                          location: {
                            name: 'mystery',
                            tab: selectTab,
                          },
                          callback: () => {
                          },
                        }
                      }));
                      setPopupOn(true);
                    }}/>
                } else {
				          const items = gameItem[itemData.type][itemData.idx];
				          const grade = itemData.grade || items?.grade || 0;
                  return <ItemLayout 
                    gameItem={gameItem}
                    icon={{
                      type: itemData.type,
                      pic: items?.pic,
                      idx: items.display
                    }}
                    num={5}
                    key={`items${itemIdx}`}
                    grade={grade}
                    onClick={() => {
                      setPopupType('item');
                      setPopupInfo(prev => ({
                        ...prev,
                        item: {
                          isMoveEvent: false,
                          itemAreaType: 'mystery',//아직 안쓰임
                          gameItem: items,
                          itemSaveSlot: itemData.slot,
                          saveItemData: itemData,
                          type: itemData.type,
                          buttons: ['buy'],
                          location: {
                            name: 'mystery',
                            tab: selectTab,
                          },
                          callback: () => {
                          },
                        }
                      }));
                      setPopupOn(true);
                    }}
                  />
                }
              })}
            </ShopItem>
          })}
        </MysteryContent>
        <UserContainer justifyContent="space-between">
          <InfoGroup>
          </InfoGroup>
          <ActionPic onClick={() => {
            setPopupType('selectCh');
            setPopupInfo(prev => ({
              ...prev,
              selectCh: {
                ch: entries,
                actionChIdx: actionChIdx,
                type: 'mystery',
                setMsg: setMsg,
                setMsgOn: setMsgOn,
              }
            }));
            setPopupOn(true);
          }}>
            <MergedPic isAbsolute pic="card" idx={40 + (saveCh?.grade || 0)} />
            {!actionChIdx && <NoneChText code="t1" color="red">{gameData.msg.sentence.noneSelectCh[lang]}</NoneChText>}
            <Img imgurl={imgSet.images.transparent800} />
            <ActionChDisplay type={'mystery'} chList={entries} gameData={gameData} actionChIdx={actionChIdx} imgSet={imgSet}/>
          </ActionPic>
        </UserContainer>
      </Wrap>
			<PopupContainer>
        {popupOn && <Popup type={popupType} dataObj={popupInfo} saveData={saveData} changeSaveData={changeSaveData} showPopup={setPopupOn} msgText={setMsg} showMsg={setMsgOn} />}
      </PopupContainer>
      <MsgContainer>
        {msgOn && <Msg text={msg} showMsg={setMsgOn}></Msg>}
      </MsgContainer>
    </>
  );
};

export default Mystery;