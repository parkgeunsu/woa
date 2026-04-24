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
import TabMenu from 'components/TabMenu';
import { AppContext } from 'contexts/app-context';
import 'css/shop.css';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ShopWrap = styled.div`
	display: flex;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	flex-direction: column;
	padding: 0 0 20px 0;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	overflow: hidden;
`;
const ShopTop = styled.div`
	position: relative;
	padding: 0 20px;
	width: 100%;
	box-sizing: border-box;
`;
const ShopScrollContent = styled.div`
	position: relative;
	margin: 0 auto;
	width: calc(100% - 40px);
	height: 100%;
	box-sizing: border-box;
  background: rgba(0,0,0,.7);
  border: 5px solid transparent;
  border-image: url(${({frameBack}) => frameBack}) 5 round;
`;
const ShopItem = styled.div`
	position: absolute;
	inset: 0;
  background: rgba(0,0,0,.8);
  overflow-y: auto;
	overflow-x: hidden;
	${({selected}) => selected ? `
		pointer-events: unset;
		opacity: 1;
	` : `
		pointer-events: none;
		opacity: 0;
	`};
`;
const InvenItems = styled.div`
  padding: 5px;
  height: auto;
  box-sizing: border-box;
`;
const InvenTitle = styled(FlexBox)`
  height: auto;
`;
const StyledIconPic = styled(IconPic)`
  margin: 0 5px 0 0;
  width: 20px;
  height: 20px;
`;
const buttonType = (button, itemData) => {
	if (itemData.sealed) {
		button.unshift('evaluate');
	} else {
		if (itemData.slot) {
			button.unshift('socket');
		}
		button.unshift('equip', 'enhance');
	}
	return button;
}

const selectTabFn = (state, shopType, typeList) => {
	if (!state || Object.keys(state).length <= 0) {
		return shopType === "inven" ? 0 : "";
	}
	return state?.tab ? state.tab : "";
}
const SHOP_HORIZONTAL_NUM = 6; //가로 갯수
const ShopList = ({
	gameData,
	shopType,
	list,
	selectTab,
	setPopupType,
	setPopupInfo,
	setPopupOn,
}) => {
	const gameItem = gameData.items;
	return <>
		{list.map((itemData, idx) => {
			if (typeof itemData.part === 'number') { // 장비인지
				const itemsGrade = itemData.grade < 5 ? 0 : itemData.grade - 5;
				const items = itemData.part === 3 ? gameItem.equip[itemData.part][itemData.weaponType][itemsGrade][itemData.idx] : gameItem.equip[itemData.part][0][itemsGrade][itemData.idx];
				return items && <ItemLayout 
					gameItem={gameItem}
					icon={{
						type: "equip",
						pic: items.pic,
						idx: items.display,
						mergeColor: itemData.color,
					}}
					num={SHOP_HORIZONTAL_NUM}
					key={`items${idx}`}
					grade={itemData.grade}
					itemsHole={itemData.hole}
					sealed={itemData.sealed}
					favorite={itemData.favorite}
					onClick={() => {
						console.log(itemData,"aaa");
						setPopupType("item");
						let buttons = [];
						switch(shopType) {
							case 'equipment':
								buttons = selectTab === 3 ? ['sell'] : ['buy'];
								break;
							case 'accessory':
								buttons = selectTab === 2 ? ['sell'] : ['buy'];
								break;
							case 'tool':
								buttons = selectTab === 2 ? ['sell'] : ['buy'];
								break;
							case 'inven':
								buttons = ['sell'];
								break;
							default:
								break;
						}
						setPopupInfo(prev => ({
							...prev,
							item: {
								isMoveEvent: false,
          			itemAreaType: 'equipment',//아직 안쓰임
								gameItem: items,
          			itemSaveSlot: itemData.slot,
								saveItemData: itemData,
								type: shopType,
								buttons: buttons,
								location: {
									name: shopType,
									tab: selectTab,
								},
								callback: () => {
									// saveData.city[stayIdx][shopType][typeList[selectTab].na].splice(selectedItem.itemSaveSlot, 1);//도시 아이템 삭제
								},
							}
						}));
      			setPopupOn((prev) => !prev);
					}}/>
			} else {
				const items = gameItem[itemData.type][itemData.idx];
				const grade = itemData.grade || items?.grade || 0;
				return items && <ItemLayout 
					gameItem={gameItem}
					icon={{
						type: itemData.type,
						pic: items?.pic,
						idx: items.display
					}}
					num={SHOP_HORIZONTAL_NUM}
					key={`items${idx}`}
					grade={grade}
					text={itemData.num}
					onClick={() => {
						setPopupType("item");
						let buttons = [];
						switch(shopType) {
							case 'equipment':
								buttons = selectTab === 3 ? ['sell'] : ['buy'];
								break;
							case 'accessory':
								buttons = selectTab === 2 ? ['sell'] : ['buy'];
								break;
							case 'tool':
								buttons = selectTab === 2 ? ['sell'] : ['buy'];
								break;
							case 'inven':
								buttons = ['sell'];
								break;
							default:
								break;
						}
						console.log(itemData)
						setPopupInfo(prev => ({
							...prev,
							item: {
								isMoveEvent: false,
          			itemAreaType: 'equipment',//아직 안쓰임
								gameItem: items,
          			itemSaveSlot: itemData.slot,
								saveItemData: itemData,
								type: shopType,
								buttons: buttons,
								location: {
									name: shopType,
									tab: selectTab,
								},
								callback: () => {
									// saveData.city[stayIdx][shopType][typeList[selectTab].na].splice(selectedItem.itemSaveSlot, 1);//도시 아이템 삭제
								},
							}
						}));
      			setPopupOn((prev) => !prev);
					}} />
			}
		})}
	</>
}
const Img = styled.img.attrs(
	({imgurl}) => ({
		src: imgurl 
	})
)`
	height: 100%;
`;
const ShopContainer = styled(FlexBox)`
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
const UserContainer = styled(FlexBox)`
	position: relative;
	padding: 10px 20px 0 20px;
	height: calc(25% - 10px);
	width: calc(100% - 40px);
`;
const ActionDetail = styled(FlexBox)`
	position: relative;
	width: auto;
	height: 100%;
	border-radius: 5%;
	overflow: hidden;
  box-sizing: border-box;
  background: rgb(0, 0, 0, 0.5);
  z-index: 3;
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
const InvenShop = ({
	shopType,
	saveData,
	changeSaveData,
	setLoading,
}) => {
  const navigate = useNavigate();
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
  const sData = React.useMemo(() => Object.keys(saveData).length === 0 ? util.loadData('saveData') : saveData, [saveData]);
	const stayIdx = React.useMemo(() => util.getRegionToIdx(sData?.info?.stay), [sData]);
  const [popupOn, setPopupOn] = useState(state?.items ? true : false);
  const [popupInfo, setPopupInfo] = useState(state?.items ? {
		item: {
      isMoveEvent: false,
      itemAreaType: "",//아직 안쓰임
			gameItem: state?.items?.gameItem,
      itemSaveSlot: state?.itemSaveSlot,
			saveItemData: state?.items?.saveItemData,
			type: state?.items?.saveItemData.type,
			buttons: ['sell'],
			location: {
				name: state?.location,
				tab: state?.location === "tool" ? 2 : 3,
			}
		},
	} : {});
  const [popupType, setPopupType] = useState(state?.items ? 'item' : '');
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");
	const shopItem = React.useMemo(() => {
		if(Object.keys(sData).length === 0) return [];
		const cityData = sData.city[stayIdx];
		switch (shopType) {
			case 'equipment':
				return [
					[...cityData.equipment?.helm],
					[...cityData.equipment?.armor],
					[...cityData.equipment?.weapon],
					[[...sData.items.equip],[...sData.items.hole],[...sData.items.upgrade],[...sData.items.material],[...sData.items.etc]],
				];
			case 'tool':
				return [
					[...cityData.tool?.upgrade],
					[...cityData.tool?.etc],
					[[...sData.items.equip],[...sData.items.hole],[...sData.items.upgrade],[...sData.items.material],[...sData.items.etc]],
				];
			case 'accessory':
				return [
					[...cityData.accessory?.ring],
					[...cityData.accessory?.amulet],
					[[...sData.items.equip],[...sData.items.hole],[...sData.items.upgrade],[...sData.items.material],[...sData.items.etc]],
				];
			case 'inven':
				return [
					[...sData.items.equip],
					[...sData.items.hole],
					[...sData.items.upgrade],
					[...sData.items.material],
					[...sData.items.etc],
				];
			default: 
				break;
		}
	}, [stayIdx, sData, shopType]);
	const typeList = React.useMemo(() => {
		switch (shopType) {
			case 'equipment':
				return [
					{na:'helm',itemCate:'equip',icon:10},
					{na:'armor',itemCate:'equip',icon:11},
					{na:'weapon',itemCate:'equip',icon:12},
					{na:'inven',itemCate:'equip',icon:13},
				];
			case 'tool':
				return [
					{na:'upgrade',itemCate:'upgrade',icon:15},
					{na:'etc',itemCate:'etc',icon:17},
					{na:'inven',itemCate:'equip',icon:13},
				];
			case 'accessory':
				return [
					{na:'ring',itemCate:'equip',icon:18},
					{na:'amulet',itemCate:'equip',icon:19},
					{na:'inven',itemCate:'equip',icon:13},
				];
			case 'inven':
				return [
					{na:'equip',itemCate:'equip',icon:11},
					{na:'hole',itemCate:'hole',icon:14},
					{na:'upgrade',itemCate:'upgrade',icon:15},
					{na:'material',itemCate:'material',icon:16},
					{na:'etc',itemCate:'etc',icon:17},
				];
			default:
				break;
		}
	}, [shopType]);
	const invenNa = useRef(['equip', 'hole', 'upgrade', 'material', 'etc']);
	const invenIcon = useRef([1, 4, 5, 6, 7]);
	const [selectTab, setSelectTab] = useState(selectTabFn(state, shopType, typeList));
	const [greeting, setGreeting] = useState(shopType !== "inven" ? gameData.shop[shopType].greeting[lang] : "");
	useEffect(() => {
		setSelectTab(selectTabFn(state, shopType, typeList));
	}, [state, shopType, typeList]);
	const entries = React.useMemo(() => {
		return Object.keys(sData).length !== 0 ? sData.entry.map((entryIdx) => {
			return {
				...sData.ch[entryIdx],
				slotIdx: entryIdx,
			};
		}) : [];
	}, [sData]);
	const actionChIdx = React.useMemo(() => {
		return Object.keys(sData).length !== 0 && shopType !== 'inven' ? sData.actionCh[shopType].idx <= entries.length - 1 ? sData.actionCh[shopType].idx : "" : "";
	}, [entries, sData]);//행동할 캐릭터 데이터
	const saveCh = React.useMemo(() => entries[actionChIdx] || {}, [entries, actionChIdx]);
	useEffect(() => {
		if (Object.keys(sData).length !== 0 && shopType !== 'inven') {
			setPopupInfo(prev => ({
				...prev,
				selectCh: {
					ch: entries,
					actionChIdx: actionChIdx,
					type: shopType,
					setMsg: setMsg,
					setMsgOn: setMsgOn,
				}
			}));
		}
	}, [sData, shopType]);
	useEffect(() => {
		setLoading(false);
	}, []);
  return (
		<>
			<ShopWrap>
				{shopType !== "inven" ?
				<>
					<Npc imgSet={imgSet} shopType={shopType} gameData={gameData} lang={lang} selectTab={selectTab} setSelectTab={setSelectTab} navigate={navigate} onClick={() => {
						setSelectTab("");
						const randomIdx = Math.floor(Math.random() * gameData.shop[shopType].randomText.length);
						setGreeting(gameData.shop[shopType].randomText[randomIdx][lang]);
					}}/>
					<ShopContainer frameBack={imgSet.etc.frameChBack}>
						{selectTab === "" && <GreetingText code="t4" color="main" wordBreak="keep-all">{greeting}</GreetingText>}
						{shopItem.map((scrollData, scrollIdx) => {
							return <ShopItem selected={selectTab === scrollIdx} key={`scrollContent${scrollIdx}`}>
								{typeList[scrollIdx].na === 'inven' ? 
									scrollData.map((invenData, invenIdx) => {
										return (
											<InvenItems key={`inven${invenIdx}`}>
												<InvenTitle justifyContent="flex-start" alignItems="center">
                					<StyledIconPic type="item" pic="icon100" idx={invenIcon.current[invenIdx]} />
													<Text code="t3" color="main">{gameData.msg.menu[invenNa.current[invenIdx]][lang]}</Text>
												</InvenTitle>
												<ShopList 
													gameData={gameData}
													shopType={shopType} 
													list={invenData}
													selectTab={selectTab} 
													setPopupType={setPopupType}
													setPopupInfo={setPopupInfo}
													setPopupOn={setPopupOn}
												/>
											</InvenItems>
										)
									})
								: 
									<ShopList 
										gameData={gameData}
										shopType={shopType} 
										list={scrollData} 
										selectTab={selectTab}
										setPopupType={setPopupType}
										setPopupInfo={setPopupInfo}
										setPopupOn={setPopupOn}
									/>
								}
							</ShopItem>
						})}
					</ShopContainer>
					<UserContainer justifyContent="space-between">
						<ActionDetail></ActionDetail>
						<ActionPic onClick={() => {
								setPopupType('selectCh');
								setPopupOn(true);
							}}>
							<MergedPic isAbsolute pic="card" idx={40 + (saveCh?.grade || 0)} />
							{actionChIdx === "" && <NoneChText code="t1" color="red" workBreak="keep-all">{gameData.msg.sentence.noneSelectCh[lang]}</NoneChText>}
							<Img imgurl={imgSet.images.transparent800} />
							<ActionChDisplay type={shopType} chList={entries} gameData={gameData} actionChIdx={actionChIdx} imgSet={imgSet} />
						</ActionPic>
					</UserContainer>
				</>
				:
				<>
					<ShopTop>
						<TabMenu list={typeList} selectTab={selectTab} setSelectTab={setSelectTab} className="transition" />
					</ShopTop>
					<ShopScrollContent frameBack={imgSet.etc.frameChBack}>
						{shopItem.map((scrollData, scrollIdx) => {
							return <ShopItem selected={selectTab === scrollIdx} key={`scrollContent${scrollIdx}`}>
								<div key={`inven${scrollIdx}`}>
									<ShopList 
										gameData={gameData}
										shopType={shopType}
										list={scrollData}
										selectTab={selectTab}
										setPopupType={setPopupType}
										setPopupInfo={setPopupInfo}
										setPopupOn={setPopupOn}
									/>
								</div>
							</ShopItem>
						})}
					</ShopScrollContent>
				</>
				}
			</ShopWrap>
			<PopupContainer>
        {popupOn && <Popup type={popupType} dataObj={popupInfo} saveData={sData} changeSaveData={changeSaveData} showPopup={setPopupOn} msgText={setMsg} showMsg={setMsgOn} />}
      </PopupContainer>
      <MsgContainer>
        {msgOn && <Msg text={msg} showMsg={setMsgOn}></Msg>}
      </MsgContainer>
		</>
  );
}

export default InvenShop;
