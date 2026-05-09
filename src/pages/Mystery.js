import { Text } from 'components/Atom';
import { ActionChDisplay } from 'components/Components';
import { FlexBox } from 'components/Container';
import { IconPic, MergedPic } from 'components/ImagePic';
import ItemLayout from 'components/ItemLayout';
import { util } from 'components/Libs';
import Msg from 'components/Msg';
import MsgContainer from 'components/MsgContainer';
import Npc from 'components/Npc';
import Popup from 'components/Popup';
import PopupContainer from 'components/PopupContainer';
import Tooltip from 'components/Tooltip';
import TooltipContainer from 'components/TooltipContainer';
import { AppContext } from 'contexts/app-context';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';

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
const PossibleItemLayout = styled(ItemLayout)`
  ${({isPossible}) => isPossible ? `
    filter: grayscale(0%);
  ` : `
    filter: grayscale(100%);
  `}
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
	padding: 10px;
	height: 100%;
	box-sizing: border-box;
	background: rgba(0,0,0,.8);
`;
const Payment = styled(FlexBox)`
  height: auto;
`;
const PossibleEquipItem = styled(FlexBox)`
  overflow-y: auto;
`;
const PossbileItemContainer = styled.div`
  margin: 0 5px 5px 0;
  padding-top: calc(20% - 4px);
  width: calc(20% - 4px);
  height: 0;
  position: relative;
  background-color: ${({ theme, groupIdx }) => `${theme.color["point" + (groupIdx + 1)]}`};
  border: 1px solid ${({ theme }) => theme.color.grey1};
  border-radius: 5px;
  box-sizing: border-box;
  &:nth-of-type(5n) {
    margin: 0 0 5px 0;
  }
`;
const PossibleEquipItemIcon = styled(IconPic)``;
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
  const theme = useTheme();
  const sData = React.useMemo(() => Object.keys(saveData).length === 0 ? util.loadData('saveData') : saveData, [saveData]);
  const stayIdx = React.useMemo(() => util.getRegionToIdx(sData?.info?.stay), [sData]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [popupInfo, setPopupInfo] = useState({});
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltip, setTooltip] = useState('');
  const [tooltipPos, setTooltipPos] = useState([0,0]);
  const [showMsg, setShowMsg] = useState(false);
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
				}} onMenuClick={(idx) => {
          if (actionChIdx !== "" && (idx === 1 || idx === 2)) {
            const isHasSkillCh = saveCh.hasSkill.findIndex(hSkill => hSkill.idx === 15);
            if (isHasSkillCh < 0) {
              const saveD = {...sData};
              saveD.actionCh.mystery.idx = "";
              changeSaveData(saveD);
              console.log(actionChIdx);
            }
          }
        }}/>
        <MysteryContent frameBack={imgSet.etc.frameChBack}>
          {selectTab === "" && <GreetingText code="t4" color="main" wordBreak="keep-all">{greeting}</GreetingText>}
          {shopItem.map((scrollData, scrollIdx) => {
            const payType = scrollIdx === 0 ? "exp" : scrollIdx === 1 ? "money" : "life";
            return <ShopItem selected={selectTab === scrollIdx} key={`scrollContent${scrollIdx}`}>
              {scrollData.map((itemData, itemIdx) => {
                if (typeof itemData.part === 'number') {
                  const itemsGrade = itemData.grade < 5 ? 0 : itemData.grade - 5;
                  const items = itemData.part === 3 ? gameItem.equip[itemData.part][itemData.weaponType][itemsGrade][itemData.idx] : gameItem.equip[itemData.part][0][itemsGrade][itemData.idx];
                  const itemPrice = util.itemPrice({
                    gameItem: items,
                    saveItemData: itemData,
                    payType: payType,
                    skill: gameData.skill[15],//협상
                    skLv: util.getHasSkillLv({
                      saveData: sData,
                      skillIdx: 15,
                      chData: sData.ch[sData.actionCh?.["mystery"]?.idx],
                    }),
                  });
                  return items && <ItemLayout 
                    gameItem={gameItem}
                    icon={{
                      type: itemData.type,
                      pic: items.pic,
                      idx: items.display,
										  mergeColor: itemData.color,
                    }}
                    num={5}
                    key={`items${itemIdx}`}
                    grade={itemData.grade}
                    tier={itemData.tier || 0}
                    text={itemPrice.buy.str}
                    selectColor={itemData.color}
                    onClick={() => {
                      console.log(itemPrice.buy.str);
                      setPopupType("item");
                      setPopupInfo(prev => ({
                        ...prev,
                        item: {
                          isMoveEvent: false,
                          itemAreaType: 'mystery',
                          gameItem: items,
                          itemSaveSlot: itemData.slot,
                          saveItemData: itemData,
                          type: "equip",
                          payType: payType,
                          buttons: ['buy'],
                          tab: selectTab,
                        }
                      }));
                      setShowPopup(true);
                    }}/>
                } else {
				          const items = gameItem[itemData.type][itemData.idx];
				          const itemsGrade = itemData.grade || items?.grade || 0;
                  const itemPrice = util.itemPrice({
                    gameItem: items,
                    saveItemData: itemData,
                    payType: payType,
                    skill: gameData.skill[15],//협상
                    skLv: util.getHasSkillLv({
                      saveData: sData,
                      skillIdx: 15,
                      chData: sData.ch[sData.actionCh?.["mystery"]?.idx],
                    }),
                  });
                  const isPossible = actionChIdx !== "" && saveCh.possibleEquipment.flat()[itemData.idx - 50];
                  return <PossibleItemLayout 
                    isPossible={!isPossible}
                    gameItem={gameItem}
                    icon={{
                      type: itemData.type,
                      pic: items?.pic,
                      idx: items.display,
										  mergeColor: itemData.color,
                    }}
                    num={5}
                    key={`items${itemIdx}`}
                    grade={itemsGrade}
                    tier={itemData.tier || 0}
                    text={itemPrice.buy.str}
                    onClick={() => {
                      if (selectTab === 0 && actionChIdx === "") {
                        setShowMsg(true);
                        setMsg(gameData.msg.sentence.selectActionHero[lang]);
                        return;
                      }
                      if (isPossible) {
                        setShowMsg(true);
                        setMsg(gameData.msg.sentence.equippedItem[lang]);
                        return;
                      }
                      setPopupType('item');
                      setPopupInfo(prev => ({
                        ...prev,
                        item: {
                          isMoveEvent: false,
                          itemAreaType: 'mystery',
                          gameItem: items,
                          itemSaveSlot: itemData.slot,
                          saveItemData: itemData,
                          type: itemData.type,
                          payType: payType,
                          buttons: ['buy'],
                          callback: () => {
                          },
                          tab: selectTab,
                        }
                      }));
                      setShowPopup(true);
                    }}
                  />
                }
              })}
            </ShopItem>
          })}
        </MysteryContent>
        <UserContainer justifyContent="space-between">
          <InfoGroup direction="column" justifyContent="flex-start">
            <Payment justifyContent="space-between">
              <Text code="t3" color="main">
                {selectTab === 0 && gameData.msg.info.hasExp[lang]}
                {selectTab === 1 && gameData.msg.title.money[lang]}
                {selectTab === 2 && gameData.msg.info.hasSoul[lang]}
              </Text>
              <Text code="t4" color="point2">
                {selectTab === 0 && util.comma(sData.ch[sData.actionCh.mystery.idx]?.hasExp)}
                {selectTab === 1 && util.comma(sData.info.money)}
                {selectTab === 2 && util.comma(sData.info.heroSoul || 0)}
              </Text>
            </Payment>
            {selectTab === 0 && <PossibleEquipItem direction="row" flexWrap="wrap" justifyContent="flex-start" alignItems="flex-start" alignContent="flex-start">
              {actionChIdx !== "" && saveCh.possibleEquipment.map((itemGroup, index) => {
                return (itemGroup.map((item, itemIndex) => {
                  const iconNum = index === 1 ? 4 : index === 2 ? 8 : index === 3 ? 19 : index === 4 ? 22 : 0;
                  return item !== 0 && <PossbileItemContainer groupIdx={index} key={`possibleEquipItem${index}_${itemIndex}`} onClick={(e) => {
                    setTooltipPos(e.target.getBoundingClientRect());
                    setTooltip(gameData.items.equipName[index][itemIndex][lang]);
                    setShowTooltip(true);
                  }}>
                    <PossibleEquipItemIcon pic="icon200" idx={itemIndex + iconNum} isAbsolute />
                  </PossbileItemContainer>
                }))
              })}
            </PossibleEquipItem>}
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
                setShowMsg: setShowMsg,
              }
            }));
            setShowPopup(true);
          }}>
            <MergedPic isAbsolute pic="card" idx={40 + (saveCh?.grade || 0)} />
            {!actionChIdx && <NoneChText code="t1" color="red">{gameData.msg.sentence.noneSelectCh[lang]}</NoneChText>}
            <Img imgurl={imgSet.images.transparent800} />
            <ActionChDisplay type={'mystery'} chList={entries} gameData={gameData} actionChIdx={actionChIdx} imgSet={imgSet}/>
          </ActionPic>
        </UserContainer>
      </Wrap>
			<PopupContainer>
        {showPopup && <Popup type={popupType} dataObj={popupInfo} saveData={saveData} changeSaveData={changeSaveData} setShowPopup={setShowPopup} setMsg={setMsg} setShowMsg={setShowMsg} setTooltip={setTooltip} setTooltipPos={setTooltipPos} setShowTooltip={setShowTooltip} theme={theme}/>}
      </PopupContainer>
      <MsgContainer>
        {showMsg && <Msg text={msg} setShowMsg={setShowMsg}></Msg>}
      </MsgContainer>
			<TooltipContainer>
				{showTooltip && <Tooltip isDark={true} pos={tooltipPos} text={tooltip} setShowTooltip={setShowTooltip} />}
			</TooltipContainer>
    </>
  );
};

export default Mystery;