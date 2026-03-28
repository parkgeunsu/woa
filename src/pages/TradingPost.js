import { Text } from 'components/Atom';
import { ActionChDisplay, Calculator, RangeSlider } from 'components/Components';
import { FlexBox } from 'components/Container';
import { ItemPic, MergedPic } from 'components/ImagePic';
import ItemLayout from 'components/ItemLayout';
import { util } from 'components/Libs';
import Msg from 'components/Msg';
import MsgContainer from 'components/MsgContainer';
import Npc from 'components/Npc';
import Popup from 'components/Popup';
import PopupContainer from 'components/PopupContainer';
import { AppContext } from 'contexts/app-context';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrap = styled(FlexBox)`
	position: absolute;
	inset: 0;
	padding: 0 0 20px 0;
	box-sizing: border-box;
	overflow: hidden;
`;
const TradingContainer = styled(FlexBox)`
	position: relative;
	margin: 10px auto 0;
	height: 25%;
	width: 90%;
  background: rgba(0,0,0,.7);
  border: 5px solid transparent;
  border-image: url(${({frameBack}) => frameBack}) 5 round;
	box-sizing: border-box;
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
const TradingItemContainer = styled(FlexBox)`
	position: relative;
	width: calc(90% - 10px);
	flex: 1;
  border: 5px solid transparent;
	border-top: none;
  border-image: url(${({frameBack}) => frameBack}) 5 round;
  background: rgba(0,0,0,.7);
	.item_select{width:100%;}
	.item_fix{padding:5px;border-bottom:5px double #ffac2f;}
	.item_button{margin:5px 0 0 0;}
`;
const GreetingText = styled(Text)`
	padding: 10%;
`;
const SliderContainer = styled(FlexBox)`
	position: relative;
	flex: 1;
	margin: 0 10px 0 0;
	padding: 10px;
	height: 100%;
	box-sizing: border-box;
	background: rgba(0,0,0,.5);
`;
const UserContainer = styled(FlexBox)`
	position: relative;
	padding: 10px 20px 0 20px;
	height: calc(25% - 10px);
	width: calc(100% - 40px);
`;
const ItemInfo = styled(FlexBox)`
	padding: 10px;
	width: 100%;
	box-sizing: border-box;
`;
const ItemPicContainer = styled(FlexBox)`
	position: relative;
	width: 30%;
	padding-top: 30%;
	height: 0;
	border-radius: 10%;
	background: radial-gradient( at 30% 30%, rgba(0,0,0,0.3) 0%, var(--color-normal) 100%);
`;
const ItemContent = styled(FlexBox)`
	position: relative;
	margin: 0 0 0 10px;
	width: 70%;
	height: 100%;
`;
const ItemHeader = styled(Text)``;
const ItemDescription = styled(Text)``;
const ItemPrice = styled(FlexBox)`
	position: absolute;
	bottom: 0;
	left: 0;
	height: auto;
`;
const ItemButton = styled(FlexBox)`
	margin: 5px 0 0 0;
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
const TradingPost = ({
	saveData,
	changeSaveData,
	setLoading,
}) => {
  const context = useContext(AppContext);
	const navigate = useNavigate();
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
	const stayIdx = React.useMemo(() => util.getRegionToIdx(sData?.info?.stay), [saveData]);
  // const [modalOn, setModalOn] = useState(false);
	// const [modalInfo, setModalInfo] = useState({});
  // const [modalType, setModalType] = useState();
  const [popupOn, setPopupOn] = useState(false);
  const [popupInfo, setPopupInfo] = useState({});
	const [popupType, setPopupType] = useState('');
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");
	const [selectTab, setSelectTab] = useState("");
	const [rangeValue, setRangeValue] = useState(0);
	const [showCal, setShowCal] = useState(false);
	const [item, setItem] = useState([]);
	const [selectItem, setSelectItem] = useState({save:{},game:{},select:'',selectTab:'',buttonType:[]});
	const actionCh = React.useMemo(() => sData.actionCh['tradingPost'], [sData]);//행동할 캐릭터 데이터
	useEffect(() => {
		console.log(rangeValue)
	}, [rangeValue])
	const shopItem = React.useMemo(() => {
		const cityData = sData.city?.[stayIdx];
		let materialItems = [];
		console.log(cityData?.tradingPost?.goods);
		if (cityData?.tradingPost?.goods) {
			for (const [idx, item] of cityData.tradingPost.goods.entries()) {
				materialItems[idx] = item;
			}
		}
		setItem(materialItems);
		return [
			[...materialItems],
			[...sData.items.material],
		];	
	}, [sData, stayIdx]);
	useEffect(() => {
		setLoading(false);
	}, []);
  return (
		<>
			<Wrap direction="column">
				<Npc imgSet={imgSet} shopType={'tradingPost'} gameData={gameData} lang={lang} selectTab={selectTab} setSelectTab={setSelectTab} navigate={navigate} onClick={() => { 
					setSelectItem({save:{},game:{},select:'',selectTab:'',buttonType:[]});
				}}/>
				<TradingContainer frameBack={imgSet.etc.frameChBack}>
					{selectTab === "" && <GreetingText code="t4" color="main" wordBreak="keep-all">{gameData.shop["tradingPost"].greeting[lang]}</GreetingText>}
					{selectTab !== "" && shopItem.map((scrollData, scrollIdx) => {
							return <ShopItem selected={selectTab === scrollIdx} key={`scrollContent${scrollIdx}`}>
								{scrollData.map((invenData, invenIdx) => {
									const items = gameItem.material[invenData.idx];
									return invenData && <ItemLayout
										gameItem={gameData.items}
										icon={{
											type: 'material',
											pic: 'material',
											idx: items.display,
										}}
										num={6}
										key={`items${invenIdx}`}
										grade={invenData.grade || items?.grade}
										text={invenData?.num ? util.comma(invenData.num) : invenData.num}
										selectColor={selectItem === invenIdx ? 1 : ""}
										onClick={() => {
											if (scrollIdx === 0) {
												setSelectItem({
													save: invenData,
													game: items,
													select: invenIdx,
													buttonType: ['buy','bargaining'],
												});
											} else {
												setSelectItem({
													save: sData.items.material,
													game: items,
													select: invenIdx,
													buttonType: ['sell','bargaining'],
												});
											}
											// let button = ['buy','bargaining'];
											// setSelectItem({
											// 	save:invenData,
											// 	game:items,
											// 	select:invenIdx,
											// 	selectTab:selectTab,
											// 	buttonType:button,
											// });
											// setRangeValue(0);
										}}
									/>
								})
							}
						</ShopItem>
					})}
				</TradingContainer>
				<TradingItemContainer frameBack={imgSet.etc.frameChBack}>
					<ItemInfo justifyContent="flex-start" alignItems="flex-start">
						{selectItem.select !== "" ? 
						<>
							<ItemPicContainer>
								<ItemPic isAbsolute pic="material" type="material" idx={selectItem.game.display} />
							</ItemPicContainer>
							<ItemContent direction="column" justifyContent="flex-start" alignItems="flex-start">
								<ItemHeader code="t3" color={gameData.itemGrade?.color?.[selectItem.save.grade] || "main"} weight="600" align="left">{selectItem.game.na[lang]}</ItemHeader>
								<ItemDescription code="t1" lineHeight="1.2" color="main" align="left">{selectItem.game.txt?.[lang]}</ItemDescription>
								<ItemPrice justifyContent="space-between">
									<Text code="t2" color="main" weight="600">{`${gameData.msg?.itemInfo?.buyPrice?.[lang]}: ${util.comma(selectItem.game.price)}`}</Text>
									<Text code="t2" color="main" weight="600">{`${selectItem.game.kg}kg`}</Text>
								</ItemPrice>
							</ItemContent>
						</> : <></>}
					</ItemInfo>
				</TradingItemContainer>
				<UserContainer justifyContent="space-between">
					<SliderContainer direction="column">
						{selectItem.select !== "" && (
							<>
								{selectTab === 0 ? <RangeSlider min={0} max={item[selectItem.select].num} step={1} value={[rangeValue]} pirce={gameItem.material[item[selectItem.select].idx].price} setValue={setRangeValue} showCal={setShowCal}/> : <RangeSlider min={0} max={selectItem.save[selectItem.select].num} step={1} value={[rangeValue]} pirce={gameItem.material[item[selectItem.select].idx].price} setValue={setRangeValue} showCal={setShowCal}/>}
								<ItemButton justifyContent="flex-end">
								{selectItem.buttonType.map((button, idx) => {
									switch(button) {
										case 'buy':
											return (
												<button text="true" className="button_small" onClick={(e) => {
													if (actionCh.idx === '' || actionCh.idx === undefined) {
														setMsgOn(true);
														setMsg(gameData.msg?.sentenceFn?.selectSkillCh?.(lang,gameData.skill?.[15]?.na) || "Select Character");
														return;
													}
													let saveD = JSON.parse(JSON.stringify(saveData));
													const charData = saveD.ch?.[actionCh.idx];
													if (charData && charData.actionPoint >= (gameData.actionPoint?.itemBuy || 0)) {//행동력 지불
														if (saveD.info.money >= rangeValue * selectItem.game.price) {//소유금이 더 많을경우
															if (saveD.city[stayIdx]?.tradingPost?.goods[selectItem.select] && typeof saveD.city[stayIdx].tradingPost.goods[selectItem.select].num === 'number') { //수량이 정해져 있을경우
																saveD.city[stayIdx].tradingPost.goods[selectItem.select].num -= rangeValue;
																changeSaveData(saveD);
															}
															charData.actionPoint -= (gameData.actionPoint?.itemBuy || 0);
															util.buttonEvent({
																event: e,
																type: 'itemBuy',
																data: {
																	slotIdx: 0,
																	gameItem: selectItem.game,
																	saveItemData: selectItem.save,
																	type:'material',
																	num:rangeValue,
																},
																saveData: saveData,
																changeSaveData: changeSaveData,
																gameData: gameData,
																msgText: setMsg,
																showMsg: setMsgOn,
																showPopup: setPopupOn,
																lang: lang,
															});
															setRangeValue(0);
														} else {
															setMsgOn(true);
															setMsg(gameData.msg?.sentence?.lackMoney?.[lang] || "Not enough money");
														}
													} else {
														setMsgOn(true);
														setMsg(gameData.msg?.sentenceFn?.lackActionPoint?.(lang, gameData.ch?.[charData?.idx]?.na1[lang]) || "Not enough Action Point");
													}
												}} data-buttontype="itemBuy">{gameData.msg?.button?.buy?.[lang] || "Buy"}</button>
											)
										case 'sell':
											return (
												<button text="true" className="button_small" onClick={(e) => {
													if (actionCh.idx === '' || actionCh.idx === undefined) {
														setMsgOn(true);
														setMsg(gameData.msg?.sentenceFn?.selectSkillCh?.(lang,gameData.skill?.[201]?.na) || "Select Character");
														return;
													}
													let saveD = JSON.parse(JSON.stringify(saveData));
													const charData = saveD.ch?.[actionCh.idx];
													if (charData && charData.actionPoint >= (gameData.actionPoint?.itemSell || 0)) {//행동력 지불
														if (rangeValue) {
															charData.actionPoint -= (gameData.actionPoint?.itemSell || 0);
															util.buttonEvent({
																event: e,
																type: 'itemSell',
																data: {
																	slotIdx: 0,
																	gameItem: selectItem.game,
																	itemSaveSlot:selectItem.select,
																	type:'material',
																	num:rangeValue,
																},
																saveData: saveData,
																changeSaveData: changeSaveData,
																gameData: gameData,
																msgText: setMsg,
																showMsg: setMsgOn,
																showPopup: setPopupOn,
																lang: lang,
															});
															setSelectItem({save:{},game:{},select:'',selectTab:'',buttonType:[]});
														} else {
															setMsgOn(true);
															setMsg(gameData.msg?.sentence?.selectQuantity?.[lang] || "Select Quantity");
														}
													} else {
														setMsgOn(true);
														setMsg(gameData.msg?.sentenceFn?.lackActionPoint?.(lang, gameData.ch?.[charData?.idx]?.na1[lang]) || "Not enough Action Point");
													}
												}} data-buttontype="itemSell">{gameData.msg?.button?.sell?.[lang] || "Sell"}</button>
											)
										default:
											break;
									}
								})}
								</ItemButton>
							</>
						)}
					</SliderContainer>
					<ActionPic onClick={() => {
							setPopupInfo({
								ch: sData.ch,
								actionCh: sData.actionCh['tradingPost'].idx,
								type: 'tradingPost',
								setMsg: setMsg,
								setMsgOn: setMsgOn,
							});
							setPopupType('selectCh');
							setPopupOn(true);
						}}>
						<MergedPic isAbsolute pic="card" idx={40 + (sData.ch?.[actionCh.idx]?.grade || 0)} />
						{actionCh.idx === "" && <NoneChText code="t1" color="red" workBreak="keep-all">{gameData.msg.sentence.noneSelectCh[lang]}</NoneChText>}
						<Img imgurl={imgSet.images.transparent800} />
						<ActionChDisplay type={'tradingPost'} saveData={sData} gameData={gameData} actionCh={actionCh} imgSet={imgSet}/>
					</ActionPic>
				</UserContainer>
				{showCal && <Calculator value={rangeValue} max={item[selectItem.select].num} setValue={setRangeValue} showCal={setShowCal}/>}
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

export default TradingPost;
