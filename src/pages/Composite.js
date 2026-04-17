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
import TabMenu from 'components/TabMenu';
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
const WorkArea = styled(FlexBox)`
	position: relative;
	margin: 10px auto 0;
  flex: 1;
	width: 90%;
  box-sizing: border-box;
  background: rgba(0,0,0,.7);
  border: 5px solid transparent;
  border-image: url(${({frameBack}) => frameBack}) 5 round;
`;
const GreetingText = styled(Text)`
	padding: 10%;
`;
const EvaluateItem = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;
	aspect-ratio: 1 / 1;
	height: 50%;
	z-index: 2;
	transform: translate(-50%, -50%);
`;
const ButtonGroup = styled.div`
	position: absolute;
	right: 5%;
	bottom: 10px;
	z-index: 1;
	transition: all .5s;
`;
const CombineBox = styled(FlexBox)`
	position: relative;
	margin: 0 10px 0 20px;
	padding-top: 60%;
	width: 60%;
	height: 0;
`;
const BackPic = styled(MergedPic)`
	position: absolute;
	inset: 0;
`;
const ItemBox = styled(FlexBox)`
	position: absolute;
	width: 80%;
	height: 80%;
	left: 10%;
	top: 10%;
`;
const ItemButton = styled(FlexBox)`
	flex: 1;
`;
const UserContainer = styled(FlexBox)`
	position: relative;
	padding: 10px 20px 0 20px;
	height: calc(25% - 10px);
	width: calc(100% - 40px);
`;
const ItemMaterial = styled(FlexBox)`
	position: relative;
	flex: 1;
	height: 100%;
`;
const ScrollArea = styled(FlexBox)`
	position: relative;
	flex: 1;
	padding: 5px;
	height: 100%;
	overflow-y: auto;
	box-sizing: border-box;
	background: rgba(0,0,0,.8);
`;
const ActionPic = styled(FlexBox)`
	position: relative;
	margin: 0 0 0 10px;
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
const combineList = [
	{na:'equip',icon:11,keyName:"equip"},
	{na:'hole',icon:14,keyName:"hole"},
	{na:'upgrade',icon:15,keyName:"upgrade"},
	{na:'material',icon:13,keyName:"material"},
	{na:'etc',icon:16,keyName:"etc"},
];
const getItem = ({
	cate,
	itemData,
	gameData,
}) => {
	const gameItem = gameData.items;
	switch(cate) {
		case "equip":
			const itemsGrade = itemData.grade < 5 ? 0 : itemData.grade - 5;
			return itemData.part === 3 ? gameItem.equip[itemData.part][itemData.weaponType][itemsGrade][itemData.idx] : gameItem.equip[itemData.part][0][itemsGrade][itemData.idx];
		case "hole":
		case "upgrade":
		case "material":
		case "etc":
			return gameItem[cate]?.[itemData.idx];
		default:
			break;
	}

}
const Composite = ({
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
  const [popupOn, setPopupOn] = useState(false);
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");
	const [selectTab, setSelectTab] = useState("");
	const [selectItemTab, setSelectItemTab] = useState(0);
	const [item, setItem] = useState([]);
	const [selectIdx, setSelectIdx] = useState(0);
	const [selectItem0, setSelectItem0] = useState({});
	const [selectItem1, setSelectItem1] = useState({
		save: Array.from({ length: 16 }, () => ({})),
		game: Array.from({ length: 16 }, () => ({})),
		select: Array.from({ length: 16 }, () => ('')),
		selectTab: Array.from({ length: 16 }, () => (''))
	});//합성 선택 아이템 save, game
	const entries = React.useMemo(() => {
		return sData.entry.map((entryIdx) => {
			return {
				...sData.ch[entryIdx],
				slotIdx: entryIdx,
			};
		});
	}, [sData]);
	const actionChIdx = React.useMemo(() => {
		return sData.actionCh.composite.idx <= entries.length - 1 ? sData.actionCh.composite.idx : "";
	}, [entries, sData]);
	const saveCh = React.useMemo(() => entries[actionChIdx] || {}, [entries, actionChIdx]);
  const [popupInfo, setPopupInfo] = useState({
		ch: entries,
		selectIdx: actionChIdx,
		type: 'composite'
	});
	const [greeting, setGreeting] = useState(gameData.shop.composite.greeting[lang]);
	useEffect(() => {
		// equip, hole, upgrade, material, etc
		if (saveData && Object.keys(saveData).length !== 0) {
			setItem(saveData.items);
			let baseSelectItem = { save: [], select: [], game: [] };
			let possibleColorantIdx = '';
			let pHole = [];
			
			// Note: selectItem.select is an array, we shouldn't use it as an index directly.
			// Re-evaluating the original intent which seems to be related to 'hole' logic.
			// But for now, ensuring syntax is clear and doesn't crash.
			if (saveData.items.equip && typeof selectIdx === 'number' && saveData.items.equip[selectIdx]) {
				// Original code had selectItem.select[selectIdx] but it was messy.
				const targetItem = saveData.items.equip[selectIdx];
				for (const [idx, data] of targetItem.hole.entries()) {
					if (data) {
						baseSelectItem.save[idx] = data;
						baseSelectItem.game[idx] = gameItem.hole[data.idx];
						pHole[idx] = false;
					} else {
						pHole[idx] = true;
						if (typeof possibleColorantIdx !== 'number') {
							possibleColorantIdx = idx;
						}
					}
				}
				// setSelectItem(baseSelectItem); // This might cause infinite loops if not careful
			}
		}
	}, [saveData, selectItem1.select, gameItem.hole]);
	useEffect(() => {
		setLoading(false);
	}, []);
	return (
		<>
			<Wrap direction="column">
				<Npc imgSet={imgSet} shopType={'composite'} gameData={gameData} lang={lang} selectTab={selectTab} setSelectTab={setSelectTab} navigate={navigate} onClick={() => {
					setSelectTab("");
          const randomIdx = Math.floor(Math.random() * gameData.shop.composite.randomText.length);
          setGreeting(gameData.shop.composite.randomText[randomIdx][lang]);
				}}/>
				<WorkArea frameBack={imgSet.etc.frameChBack}direction="row" alignItems="center">
					{selectTab === "" && <GreetingText code="t4" color="main" wordBreak="keep-all">{greeting}</GreetingText>}
					{selectTab === 0 && <>
						{selectItem0.save && <EvaluateItem>
							<ItemLayout
								gameItem={selectItem0.game}
								icon={{
									type: "equip",
									pic: "equip",
									idx: selectItem0.game.display,
									mergeColor: selectItem0.save.color,
								}}
								num={1}
								sealed={selectItem0.save.sealed}
							/>
						</EvaluateItem>}
						<ButtonGroup>
							<button className="button_big" text="true" onClick={(e) => {
								e.stopPropagation();
								console.log('감정');
								if (selectItem0.save.sealed) {
									util.buttonEvent({
										event: e,
										type: 'itemEvaluate',
										data: {
											slotIdx: 0,
											selectItem: selectItem0,
											setSelectItem: setSelectItem0,
											gameItem: selectItem0.game,
											itemSaveSlot: selectItem0.select,
											saveItemData: selectItem0.save,
											type: 'equip',
										},
										saveData: sData,
										changeSaveData: changeSaveData,
										gameData: gameData,
										msgText: setMsg,
										showMsg: setMsgOn,
										showPopup: setPopupOn,
										lang: lang,
									}, () => {
										// util.saveHistory({
										// 	prevLocation: 'inven',
										// 	navigate: navigate,
										// 	callback: () => {},
										// 	state: {
										// 		dataObj: {
										// 			saveItemData: saveData.items.equip[selectedItem.itemSaveSlot],
										// 			gameItem: selectedItem.gameItem,
										// 			itemSaveSlot: selectedItem.itemSaveSlot,
										// 			selectTab: selectTab,
										// 			type: typeList[selectTab].itemCate,
										// 			selectSlot: selectSlot,
										// 		}
										// 	},
										// 	isNavigate: true,
										// });
									});
								} else {
									setMsgOn(true);
									setMsg(gameData.msg.sentence.sealedItem[lang]);
								}
							}}>{gameData.msg.button.emotions[lang]}</button>
						</ButtonGroup>
					</>}
					{selectTab === 1 && 
						<>
							<CombineBox  justifyContent="center" alignItems="center">
								<BackPic pic="img800" idx={71} />
								<ItemBox flexWrap="wrap">
									{selectItem1.save && selectItem1.save.map((data, idx) => {
										const cate = selectItem1.selectTab[idx];
										const items = getItem({
											cate: cate,
											itemData: data,
											gameData: gameData,
										});
										const isEquip = cate === "equip";
										return <ItemLayout 
											gameItem={gameData.items}
											icon={{
												type: cate,
												pic: isEquip ? "equip" : cate === "material" ? "material" : "itemEtc",
												idx: items?.display,
												mergeColor: data.color,
											}}
											text={data.num || ""}
											num={4}
											key={`item${idx}`}
											{...isEquip && {
												sealed: data.sealed,
												itemsHole: data.hole}
											}
											grade={data.grade || items?.grade}
											{...cate === "etc" && {text: items?.displayText}}
											selectColor={selectIdx === idx ? 2 : ""}
											onClick={() => {
												setSelectIdx(idx);
												if (selectIdx === idx && Object.keys(selectItem1.save[idx]).length !== 0) {
													let cloneSelectItem = {...selectItem1};
													cloneSelectItem.save[idx] = {};
													cloneSelectItem.game[idx] = {};
													cloneSelectItem.select[idx] = '';
													cloneSelectItem.selectTab[idx] = '';
													setSelectItem1(cloneSelectItem);
												}
											}}
										/>
									})}
								</ItemBox>
							</CombineBox>
							<ItemButton direction="column" justifyContent="center" alignItems="center">
								<button className="button_big" text="true" onClick={(e) => {
									e.stopPropagation();
									if (actionChIdx === '' || actionChIdx === undefined) {
										setMsgOn(true);
										setMsg(gameData.msg.sentenceFn?.selectSkillCh?.(lang, gameData.skill?.[203]?.na?.[lang]) || "Select Character");
										return;
									}
									
									let recipeNum = 0;
									for (const data of selectItem1.select) {
										if (data !== '') {
											recipeNum++;
										}
									}

									if (!recipeNum) {
										setMsgOn(true);
										setMsg(gameData.msg.sentence?.selectItem?.[lang] || "Select Item");
									} else {
										let success = false;
										if (gameData.recipe[recipeNum]) {
											for (const recipeData of gameData.recipe[recipeNum]) {
												if (Object.keys(recipeData).length !== 0) {
													let matchedIndices = new Set();
													let tempItemsToRemove = [];
													let itemsToRemove = [];
													let allMatched = recipeData.entry.every((requirement) => {
														let matchIdx = selectItem1.selectTab.findIndex((cate, sIdx) => {
															if (matchedIndices.has(sIdx) || !cate) return false;
															if (cate !== requirement.cate) return false;
															
															if (typeof requirement.idx === 'number') {
																return selectItem1.game[sIdx]?.idx === requirement.idx;
															} else if (typeof requirement.idx === 'string' && requirement.idx.indexOf('g') >= 0) {
																return Number(selectItem1.save[sIdx]?.grade) === Number(requirement.idx.substr(1));
															}
															return false;
														});

														if (matchIdx !== -1) {
															matchedIndices.add(matchIdx);
															tempItemsToRemove.push({ cate: selectItem1.selectTab[matchIdx], idx: selectItem1.select[matchIdx] });
															return true;
														}
														return false;
													});

													if (allMatched) {
														itemsToRemove = tempItemsToRemove;
														// SUCCESS
														success = true;
														setSelectItem1({
															save: Array.from({ length: 16 }, () => ({})),
															game: Array.from({ length: 16 }, () => ({})),
															select: Array.from({ length: 16 }, () => ('')),
															selectTab: Array.from({ length: 16 }, () => (''))
														});
														
														let newItems = { ...saveData.items };
														const categoriesToUpdate = new Set(itemsToRemove.map(r => r.cate));
														
														categoriesToUpdate.forEach(cate => {
															const indicesToRemove = itemsToRemove
																.filter(r => r.cate === cate)
																.map(r => r.idx);
															newItems[cate] = newItems[cate].filter((_, idx) => !indicesToRemove.includes(idx));
														});

														for (const getItem of recipeData.get) {
															let newItemObj;
															if (typeof getItem.idx === 'number') {
																newItemObj = gameData.items[getItem.cate][getItem.idx];
															} else if (typeof getItem.idx === 'object') {
																const ranCount = Math.floor(Math.random() * getItem.idx.length);
																newItemObj = gameData.items[getItem.cate][getItem.idx[ranCount]];
															} else if (typeof getItem.idx === 'string' && getItem.idx.indexOf('g') >= 0) {
																const option = {
																	type: 'equip',
																	items: Math.ceil(Math.random() * 3),
																	grade: getItem.idx.substr(1),
																	lv: Math.round(Math.random() * 100),
																	sealed: true,
																};
																util.getItem({
																	saveData: { ...saveData, items: newItems },
																	gameData: gameData,
																	changeSaveData: (updatedSData) => {
																		newItems = updatedSData.items;
																	},
																	option: option,
																	isSave: true,
																	lang: lang
																});
																continue;
															}
															if (newItemObj) {
																newItems[getItem.cate] = [newItemObj, ...newItems[getItem.cate]];
															}
														}

														const newSaveData = JSON.parse(JSON.stringify(saveData));
														newSaveData.items = newItems;
														changeSaveData(newSaveData);
														break; // Exit recipe loop
													}
												}
											}
										}
										if (!success) {
											setMsgOn(true);
											setMsg(gameData.msg.sentence?.none?.[lang] || "No Recipe found");
										}
									}
								}}>{gameData.msg.button?.composite?.[lang] || "Synthesis"}</button>
								<button className="button_big" text="true" onClick={(e) => {
									e.stopPropagation();
									setSelectItem1({
										save: Array.from({ length: 16 }, () => ({})),
										game: Array.from({ length: 16 }, () => ({})),
										select: Array.from({ length: 16 }, () => ('')),
										selectTab: Array.from({ length: 16 }, () => (''))
									});
									console.log('슬롯 비우기');
								}}>{gameData.msg.button?.reset?.[lang] || "Reset"}</button>
							</ItemButton>
						</>
					}
				</WorkArea>
				<UserContainer justifyContent="space-between">
					<ItemMaterial direction="column" justifyContent="flex-start" alignItems="flex-start">
						<TabMenu list={combineList} selectTab={selectItemTab} setSelectTab={setSelectItemTab} hiddenText={true} />
						<ScrollArea flexWrap="wrap" justifyContent="flex-start" alignItems="flex-start">
							{item[combineList[selectItemTab].keyName] && item[combineList[selectItemTab].keyName].map((data, idx) => {
								const cate = combineList[selectItemTab].keyName;
								let select = false;
								for (const [selectIndex, selectData] of selectItem1.selectTab.entries()) {
									if (selectData === cate && selectItem1.select[selectIndex] === idx) {
										select = true;
										return;//return 시 선택된 아이템이 인벤창에서 사라짐
									}
								};
								const items = getItem({
									cate: cate,
									itemData: data,
									gameData: gameData,
								});
								const isEquip = cate === "equip";
								return <ItemLayout 
									gameItem={gameData.items}
									icon={{
										type: combineList[selectItemTab].keyName,
										pic: isEquip ? "equip" : cate === "material" ? "material" : "itemEtc",
										idx: items?.display,
										mergeColor: data.color,
									}}
									text={data.num || ""}
									num={5}
									key={`items${idx}`}
									{...isEquip && {
										sealed: data.sealed,
										itemsHole: data.hole}
									}
									grade={data.grade || items?.grade}
									{...cate === "etc" && {text: items?.displayText}}
									selectColor={select ? 0 : ""}
									onClick={() => {
										if (selectTab === 0) {
											console.log(data, items, idx)
											setSelectItem0({
												save: data,
												game: items,
												select: idx,
											});
										} else if (selectTab === 1) {
											let cloneSelectItem = {...selectItem1};
											for (const [selectIndex, selectData] of cloneSelectItem.selectTab.entries()) {
												if (selectData === cate && selectItem1.select[selectIndex] === idx) {
													cloneSelectItem.save[selectIndex] = {};
													cloneSelectItem.game[selectIndex] = {};
													cloneSelectItem.select[selectIndex] = '';
													cloneSelectItem.selectTab[selectIndex] = '';
													break;
												}
											}
											cloneSelectItem.save[selectIdx] = data;
											cloneSelectItem.game[selectIdx] = items;
											cloneSelectItem.select[selectIdx] = idx;
											cloneSelectItem.selectTab[selectIdx] = combineList[selectItemTab].keyName;
											if (cate === "upgrade" || cate === "etc") {
												cloneSelectItem.num += 1;
											}
											setSelectItem1(cloneSelectItem);
										}
									}}
								/>
							})}
						</ScrollArea>
					</ItemMaterial>
					<ActionPic onClick={() => {
						setPopupInfo({
							ch: entries,
							selectIdx: actionChIdx,
							type: 'composite',
							setMsg: setMsg,
							setMsgOn: setMsgOn,
						});
						setPopupOn(true);
					}}>
						<MergedPic isAbsolute pic="card" idx={40 + (saveCh?.grade || 0)} />
						{actionChIdx === "" && <NoneChText code="t1" color="red" workBreak="keep-all">{gameData.msg.sentence.noneSelectCh[lang]}</NoneChText>}
						<Img imgurl={imgSet.images.transparent800} />
						<ActionChDisplay type="composite" chList={entries} gameData={gameData} actionChIdx={actionChIdx} imgSet={imgSet}/>
					</ActionPic>
				</UserContainer>
			</Wrap>
			<PopupContainer>
        {popupOn && <Popup type={'selectCh'} dataObj={popupInfo} saveData={saveData} changeSaveData={changeSaveData} showPopup={setPopupOn} msgText={setMsg} showMsg={setMsgOn} />}
      </PopupContainer>
      <MsgContainer>
        {msgOn && <Msg text={msg} showMsg={setMsgOn}></Msg>}
      </MsgContainer>
		</>
  );
}

export default Composite;
