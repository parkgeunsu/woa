import { AppContext } from 'App';
import { ActionChDisplay } from 'components/Components';
import { ItemPic, MarkPic } from 'components/ImagePic';
import ItemGradeColor from 'components/ItemGradeColor';
import { util } from 'components/Libs';
import Msg from 'components/Msg';
import MsgContainer from 'components/MsgContainer';
import Popup from 'components/Popup';
import PopupContainer from 'components/PopupContainer';
import TabMenu from 'components/TabMenu';
import 'css/shop.css';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ShopWrap = styled.div`
`;
const ShopTop = styled.div`
	display: flex;
	margin: 0 0 10px 0;
	height: calc(50% - 10px);
	padding: 0 20px;
	flex-grow: 1;
`;
const ShopTopLeft = styled.div`
	position: relative;
	width: 30%;
`;
const ShopScrollContent = styled.div`
	position: relative;
	padding: 5px;
	flex-wrap: wrap;
	width: 70%;
	height: 100%;
	border-radius: 0 10px 10px 10px;
	background: rgba(0,0,0,.5);
	box-sizing: border-box;
`;
const ShopBottom = styled.div`
	display: flex;
	padding: 0 20px;
	height: 50%;
`;
const ItemContainer = styled.ul`
	display: flex;
	${({itemSelect}) => itemSelect === 'select1' ? `
		border: 3px double #ffac2f;
	` : `
		margin: 0 0 0 5px;
		border: 3px double #e14040;
	`}
	flex-direction: column;
	width: 50%;
	background: rgba(0,0,0,.7);
  border-image: url(${({frameBack}) => frameBack}) 5 round;
	& > div {
		padding: 5px;
		width: 100%;
		box-sizing: border-box;
	}
	&.on {
		outline: 5px solid #000;
	}
	.item {
		position: relative;
		width: 50px;
		height: 50px;
	}
	.item:after {
		content: '';
		position: absolute;
		left: 50%;
		top: 2px;
		transform: translate(-50%,0);
		color: #fff;
		text-shadow: -1px -1px 0 #fff, 1px 1px 0 #000;
	}
	.item.favorite1:after {
		content: '■';
		color: #ffff00;
	}
	.item.favorite2:after {
		content: '♥';
		color: #ff0000;
	}
	.item.favorite3:after {
		content: '●';
		color: #ff00ff;
	}
	.item.favorite4:after {
		content: '♠';
		color: #00ffff;
	}
	.item.favorite5:after {
		content: '♣';
		color: #00ff00;
	}
`;
const ItemHeader = styled.li`
	padding: 5px;
	text-align: center;
	border: 5px solid transparent;
	border-image: url(${({frameBack}) => frameBack}) 5 round;
	.item_name {
		color: ${({ color }) => color};
		text-shadow: -1px -1px 1px rgba(255,255,255,.5), 1px 1px 1px #000;
	}
`;
const ItemFix = styled.li`
	display: flex;
	position: relative;
	padding: 5px;
	${({itemSelect}) => itemSelect === 'select1' ? `
		border-bottom: 1px solid #ffac2f;
	` : `
		border-bottom: 1px solid #e14040;
	`}
`;
const ItemCont = styled.div`
	display: flex;
	flex-direction: column;
  margin: 0 0 0 10px;
	flex: 1;
  .item_grade{
		color: ${({ color }) => color};
	}
	span{
		display: inline-block;
		vertical-align: middle;
		}
	.item_top{
		display: flex;
		justify-content: space-between;
		color: #bbb;
		font-size: 0.75rem;
	}
	.item_bottom{
		margin: 0 0 10px 0;
	}
	.item_description{
		flex: 1;
		font-family: serif;
		line-height: 1.3;
		font-size: 0.625rem;
		color: #d3a859;
		font-weight: 600;
		text-overflow: ellipsis;
		word-wrap: break-word;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.item_kg{
		text-align:right;
		font-weight:600;
		color:#bbb;
	}
`;
const ItemList = styled.li`
	display: flex;
	${({type}) => {
		switch(type) {
			case 'typeSlot':
				return `
					margin: 0 0 5px 0;
					justify-content: space-between;
				`;
			case 'set': 
				return `
					margin: 0 0 10px 0;
					padding: 0 10px;
				`;
			default: 
				return `
					margin: 10px 0 0 0;
				`;
			}
	}}
	flex-direction: column;
	.item_title{margin:0 0 5px 0;font-size:0.75rem;color:#ddd;}
	.item_effs{display:flex;align-items:center;margin:0 0 5px 5px;color:#2f73ff;font-weight:600;}
	.item_effs.add{color:#ffac2f;}
	.item_effs.hole{color:#e14040;}
	.item_effs span{display:block;font-weight:600;}
	.item_effs .cate{margin:0 10px 0 0;color:#00a90c;}
	.item_effs .base{margin:0 5px 0 0;color:#2f73ff;}
	.item_effs .add{margin:0 5px 0 0;color:#ffac2f;}
	.item_effs .hole{color:#e14040;}
	.item_effs .total{flex:1;text-align:right;font-size:0.938rem;color:#fff;}
	.item_slot{display:flex;margin:5px 0 0 0;align-items:center;}
	.item_slot .item_holes{margin:0 0 5px 0;}
	.item_slot .item_holes .item_holeback{display:inline-block;background-image:radial-gradient(at 50%, #000 30%, #888 100%);border-radius:30px;width:24px;height:24px;text-align:center;}
	.item_slot .item_holes.fixed .item_holeback{background:rgba(255,172,47,.7);}
	.item_slot .item_holes img{margin:2px 0 0 0;width:20px;height:20px;vertical-align:middle;}
	.item_setNa{margin:0 0 10px 0;color:#0f0;font-size:0.875rem;}
`;
const ItemFooter = styled.li`
	padding: 5px;
	${({itemSelect}) => itemSelect === 'select1' ? `
		border-top: 1px solid #ffac2f;
	` : `
		border-top: 1px solid #e14040;
	`}
	.item_price {
		margin: 0 0 5px 0;
	}
	.item_price span {
		display:inline-block;
		margin:0 5px 0 0;
		font-size:0.875rem;
		color:#c80;
	}
	.item_price em {
		font-size: 0.875rem;
		color: #fff;
		vertical-align: middle;
	}
`;
const ShopItem = styled.div`
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	${({selected}) => selected ? `
		pointer-events: unset;
		opacity: 1;
	` : `
		pointer-events: none;
		opacity: 0;
	`};
`;
const ShopFooter = ({
	selectItem,
	setSelectItem,
	selectSlot,
	shopType,
	actionCh,
	saveData,
	changeSaveData,
	cityIdx,
	typeList,
	selectTab,
	setPopupType,
	setPopupInfo,
	setPopupOn,
	setMsgOn,
	setMsg,
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
	const selectedItem = React.useMemo(() => selectItem, [selectItem]);
	const timeoutRef = useRef(null); //timeout
  const handlePopup = useCallback((saveObj) => {
		const {saveItemData, itemType, itemIdx} = saveObj;
		setPopupType(itemType);
    const gameItemData = () => {
			if (saveItemData.part === undefined) {
				return gameItem[itemType][itemIdx];
			} else {
				return saveItemData.part === 3 ? gameItem['equip'][saveItemData.part][saveItemData.weaponType][saveItemData.quality][itemIdx] : gameItem['equip'][saveItemData.part][0][saveItemData.quality][itemIdx];
			}
		}
		setPopupInfo({
			// slotIdx: slotIdx,
			gameItem: gameItemData,
			itemSaveSlot: saveItemData.idx,
			saveItemData: saveItemData,
			type: itemType,
		});
    setPopupOn(prev => !prev);
  }, [gameItem]);
	return <>
		{typeof selectedItem.gameItem?.part === 'number' && (
			<>
				<ItemHeader frameBack={imgSet.etc.frameChBack} color={gameData.itemGrade.color[selectedItem.saveItemData.grade]} flex-center="true">
					<span className="item_name" dangerouslySetInnerHTML={{__html: `${selectedItem.saveItemData.colorantSet ? util.getColorant(selectedItem.saveItemData.colorantSet, gameData).na[lang] : ''} ${selectedItem.saveItemData.modifier[lang]} ${selectedItem.gameItem.na[lang]}`}}></span>
				</ItemHeader>
				<ItemFix itemSelect="select2">
					<ItemGradeColor part={selectedItem.gameItem.part} grade={gameData.itemGrade.txt_e[selectedItem.saveItemData.grade].toLowerCase()} sealed={selectedItem.saveItemData.sealed} size="50" onClick={() => {
						if (shopType === 'shop') {
							handlePopup({
								saveItemData: selectedItem.saveItemData,
								itemType: (selectedItem.selectTab < 3 ? 'equip' : 'hequip'),
								itemIdx: selectedItem.idx,
							});
						} else {
							handlePopup({
								saveItemData: selectedItem.saveItemData,
								itemType: 'hequip',
								itemIdx: selectedItem.idx,
							});
						}
					}}>
						<ItemPic type="equip" className={`item favorite${selectedItem.saveItemData.favorite}`}>
							<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[selectedItem.gameItem.display], selectedItem.saveItemData.color, selectedItem.saveItemData.svgColor ||selectedItem.saveItemData.id)}}></svg>
						</ItemPic>
					</ItemGradeColor>
					<div flex-h="true" style={{flex: 1,}}>
						<ItemCont color={gameData.itemGrade.color[selectedItem.saveItemData.grade]}>
							<div className="item_top">
								<span className="item_grade">{lang === 'ko' ? gameData.itemGrade.txt_k[selectedItem.saveItemData.grade] : gameData.itemGrade.txt_e[selectedItem.saveItemData.grade]}</span> <span className="item_type">{gameData.itemType[selectedItem.gameItem.part][lang]}</span>
							</div>
							<div className="item_description" dangerouslySetInnerHTML={{__html: `"${selectedItem.gameItem.txt[lang]}"`}}></div>
							<div className="item_kg">{selectedItem.gameItem.kg}kg</div>
						</ItemCont>
					</div>
				</ItemFix>
				<div className="scroll-y">
					{(selectedItem.saveItemData.markNum > 0 || selectedItem.saveItemData.hole.length > 0) && <ItemList type="typeSlot" className="item_list">
						<div className="item_type">
							<MarkPic length={selectedItem.saveItemData.markNum} pic="animalType" idx={selectedItem.saveItemData.mark} />
						</div>
						<div className="item_slot">
							{selectedItem.saveItemData.hole.map((holeData, idx) => {
								const holePic = holeData !== 0 ? gameItem.hole[holeData.idx].display : 0;
								return (
									<div key={`hole${idx}`} className={`item_holes ${holePic !== 0 ? 'fixed': ''}`}>
										<span className="item_holeback">
											<ItemPic className="pic" pic="itemEtc" type="hole" idx={holePic} />
										</span>
									</div>
								)
							})}
						</div>
					</ItemList>}
					<ItemList className="item_list">
						<div className="item_title">{gameData.msg.itemInfo.itemEffect[lang]}</div>
						{util.getTotalEff(selectedItem.saveItemData, gameData).map((eff, idx) => {
							return (
								<div key={idx} className="item_effs"><span className="cate">{util.getEffectType(eff.type, lang)}</span>{eff.base > 0 && <span className="base">{eff.base}</span>}{eff.add > 0 && <span className="add">{eff.add}</span>}{eff.hole > 0 && <span className="hole">{eff.hole}</span>}<span className="total">{selectedItem.saveItemData.sealed ? eff.base : eff.base + eff.add + eff.hole}</span></div>
							)
						})}
					</ItemList>
					<div style={{width:"100%"}} className="scroll-y">
						{selectedItem.saveItemData.baseEff.length > 0 && (
							<ItemList className="item_list">
								<div className="item_title">{gameData.msg.itemInfo.basicEffect[lang]}</div>
								{selectedItem.saveItemData.baseEff.map((data, idx) => {
									const grade = selectedItem.saveItemData.grade > 3 ? 3 : selectedItem.saveItemData.grade - 1;
									return (
										<div key={idx} className="item_effs">{`${util.getEffectType(data.type, lang)} ${selectedItem.saveItemData.sealed ? data.num : data.num[grade]}`}</div>
									) 
								})}
							</ItemList>
						)}
						{selectedItem.saveItemData.addEff.length > 0 && (
							<ItemList className="item_list">
								<div className="item_title">{gameData.msg.itemInfo.addEffect[lang]}</div>
								{selectedItem.saveItemData.addEff.map((data, idx) => {
									const grade = selectedItem.saveItemData.grade > 3 ? 3 : selectedItem.saveItemData.grade - 1;
									return (
										<div key={idx} className="item_effs add">{`${util.getEffectType(data.type, lang)} ${data.num[0]}`}</div>
									) 
								})}
							</ItemList>
						)}
						{selectedItem.gameItem.set !== 0 && (<ItemList type="set" className="item_list">
							<div className="item_setNa">{gameData.items.set_type[selectedItem.gameItem.set].na}</div>
						</ItemList>
						)}
					</div>
				</div>
			</>
		)}
		{selectedItem.gameItem?.imgCate === 'itemHole' && (
			<>
				<ItemHeader frameBack={imgSet.etc.frameChBack} color={gameData.itemGrade.color[selectedItem.saveItemData.grade]} flex-center="true">
					<span className="item_name" dangerouslySetInnerHTML={{__html: `${selectedItem.gameItem.na[lang]}`}}></span>
				</ItemHeader>
				<ItemFix itemSelect="select1">
					<ItemGradeColor grade={gameData.itemGrade.txt_e[selectedItem.saveItemData.grade || selectedItem.gameItem.grade].toLowerCase()} size="50" onClick={() => {
						handlePopup({
							saveItemData: selectedItem.saveItemData,
							itemType: 'hole',
							itemIdx: selectedItem.idx,
						});
					}}>
						<ItemPic pic="itemEtc" type={selectedItem.itemCate} idx={selectedItem.gameItem.display} />
					</ItemGradeColor>
					<div flex-h="true" style={{flex: 1,}}>
						<ItemCont color={gameData.itemGrade.color[selectedItem.saveItemData.grade]}>
							<div className="item_top">
								<span className="item_grade">{lang === 'ko' ? gameData.itemGrade.txt_k[selectedItem.saveItemData.grade] : gameData.itemGrade.txt_e[selectedItem.saveItemData.grade]}</span>
							</div>
							<div className="item_description" dangerouslySetInnerHTML={{__html: `"${selectedItem.gameItem.txt[lang]}"`}}></div>
							<div className="item_kg">{selectedItem.gameItem.kg}kg</div>
						</ItemCont>
					</div>
				</ItemFix>
				{selectedItem.gameItem.idx < 100 && (
					<div className="scroll-y">
						<ItemList className="item_list">
							<div className="item_title">{gameData.msg.itemInfo.itemEffect[lang]}</div>
							{util.getTotalEff(selectedItem.saveItemData, gameData).map((eff, idx) => {
								return (
									<div key={idx} className="item_effs"><span className="cate">{util.getEffectType(eff.type, lang)}</span>{eff.base > 0 && <span className="base">{eff.base}</span>}{eff.add > 0 && <span className="add">{eff.add}</span>}{eff.hole > 0 && <span className="hole">{eff.hole}</span>}<span className="total">{selectedItem.saveItemData.sealed ? eff.base : eff.base + eff.add + eff.hole}</span></div>
								)
							})}
						</ItemList>
					</div>
				)}
			</>
		)}
		{(selectedItem.gameItem?.imgCate === 'itemUpgrade' || selectedItem.gameItem?.imgCate === 'itemMaterial' || selectedItem.gameItem?.imgCate === 'itemEtc') && (
			<>
				<ItemHeader frameBack={imgSet.etc.frameChBack} color={gameData.itemGrade.color[selectedItem.saveItemData.grade]} flex-center="true">
					<span className="item_name" dangerouslySetInnerHTML={{__html: `${selectedItem.gameItem.na[lang]}`}}></span>
				</ItemHeader>
				<ItemFix itemSelect="select1">
					<ItemGradeColor grade={gameData.itemGrade.txt_e[selectedItem.saveItemData.grade || selectedItem.gameItem.grade].toLowerCase()} size="50" onClick={() => {
						handlePopup({
							saveItemData: selectedItem.saveItemData,
							itemType: selectedItem.itemCate,
							itemIdx: selectedItem.idx,
						});
					}}>
						<ItemPic pic="itemEtc" type={selectedItem.itemCate} idx={selectedItem.gameItem.display} />
					</ItemGradeColor>
					<div flex-h="true" style={{flex: 1,}}>
						<ItemCont color={gameData.itemGrade.color[selectedItem.saveItemData.grade]}>
							<div className="item_top">
								<span className="item_grade">{lang === 'ko' ? gameData.itemGrade.txt_k[selectedItem.saveItemData.grade] : gameData.itemGrade.txt_e[selectedItem.saveItemData.grade]}</span>
							</div>
							<div className="item_description" dangerouslySetInnerHTML={{__html: `"${selectedItem.gameItem.txt[lang]}"`}}></div>
							<div className="item_kg">{selectedItem.gameItem.kg}kg</div>
						</ItemCont>
					</div>
				</ItemFix>
				<div className="scroll-y">
					<li className="item_list item_eff">
						<div className="item_title">
							{selectedItem.gameItem.txt[lang]}
						</div>
					</li>
				</div>
			</>
		)}
		<ItemFooter itemSelect="select1">
			<div className="item_price">
				{selectedItem.buttonType[0] === 'buy' ? <>
					<span>{gameData.msg.itemInfo.buyPrice[lang]}</span>
					<em>
						{selectedItem.gameItem?.part <= 3 ?
							`₩${util.comma((selectedItem.gameItem.price < 1000 ? 
								1000 : 
								selectedItem.gameItem.price) * 2 * (selectedItem.saveItemData.grade))}` : 
							`₩${util.comma(selectedItem.gameItem.price * (selectedItem.saveItemData.grade || selectedItem.gameItem.grade))}`
						}
					</em>
				</> : <>
					<span>{gameData.msg.itemInfo.sellPrice[lang]}</span>
					<em>{`₩${util.comma(selectedItem.gameItem.price * (selectedItem.gameItem.grade || selectedItem.saveItemData.grade))}`}</em>
				</>
				}
			</div> 
			<div className="item_button" flex="true">
			{selectedItem.buttonType.map((button, idx) => {
				switch(button) {
					case 'buy':
						return (
							<button key={`button${idx}`} text="true" className="button_small" onClick={(e) => {
								if (shopType === 'shop') {
									if (selectedItem.gameItem?.part <= 3) { //무기이면
										// if (actionCh.idx === '') {
										// 	setMsgOn(true);
										// 	setMsg(gameData.msg.sentenceFn.selectSkillCh(lang,gameData.skill[201].na));
										// 	return;
										// }
										let saveD = {...saveData};
										// if (saveD.ch[actionCh.idx].actionPoint >= gameData.actionPoint.itemBuy) {//행동력 지불
										// 	saveD.ch[actionCh.idx].actionPoint -= gameData.actionPoint.itemBuy;
										//	saveD.city[cityIdx].shop[typeList[selectedItem.selectTab].na].splice(selectedItem.itemSaveSlot, 1);
										util.buttonEvent({
											event: e,
											type: 'itemBuy',
											data: {
												slotIdx: 0,
												gameItem: selectedItem.gameItem,
												saveItemData: selectedItem.saveItemData,
												type: 'equip',
											},
											saveData: saveD,
											changeSaveData: changeSaveData,
											gameData: gameData,
											msgText: setMsg,
											showMsg: setMsgOn,
											showPopup: setPopupOn,
											lang: lang,
										});
										setSelectItem({saveItemData:{},gameItem:{},itemSaveSlot:'',selectTab:'',itemCate:'',buttonType:[]});
										// } else {
										// 	setMsgOn(true);
										// 	setMsg(gameData.msg.sentenceFn.lackActionPoint(lang, gameData.ch[saveD.ch[actionCh.idx].idx].na1));
										// }
									} else {
										setMsgOn(true);
										setMsg(gameData.msg.sentence.goTool[lang]);
										timeoutRef.current = setTimeout(() => {
											navigate('../tool', {state: {dataObj: {
												saveItemData: selectedItem.saveItemData,
												gameItem: selectedItem.gameItem,
												itemSaveSlot: selectedItem.itemSaveSlot,
												selectTab: 0,
												type: selectedItem.itemCate,
												selectSlot: selectSlot,
											}}});
										}, 1800);
									}
								} else if (shopType === 'tool') {
									if (selectedItem.gameItem?.part <= 3) { //무기이면
										setMsgOn(true);
										setMsg(gameData.msg.sentence.goShop[lang]);
										timeoutRef.current = setTimeout(() => {
											navigate('../shop', {state: {dataObj: {
												saveItemData: selectedItem.saveItemData,
												gameItem: selectedItem.gameItem,
												itemSaveSlot: selectedItem.itemSaveSlot,
												selectTab: 0,
												type: 'equip',
												selectSlot: selectSlot,
											}}});
										}, 1800);
									} else {
										// if (actionCh.idx === '') {
										// 	setMsgOn(true);
										// 	setMsg(gameData.msg.sentenceFn.selectSkillCh(lang,gameData.skill[201].na));
										// 	return;
										// }
										let saveD = {...saveData};
										// if (saveD.ch[actionCh.idx].actionPoint >= gameData.actionPoint.itemBuy) {//행동력 지불
										// 	saveD.ch[actionCh.idx].actionPoint -= gameData.actionPoint.itemBuy;
										//	saveD.city[cityIdx].shop[typeList[selectedItem.selectTab].na].splice(selectedItem.itemSaveSlot, 1);
											util.buttonEvent({
												event: e,
												type: 'itemBuy',
												data: {
													slotIdx: 0,
													gameItem: selectedItem.gameItem,
													saveItemData: selectedItem.saveItemData,
													type: typeList[selectTab].itemCate,
												},
												saveData: saveD,
												changeSaveData: changeSaveData,
												gameData: gameData,
												msgText: setMsg,
												showMsg: setMsgOn,
												showPopup: setPopupOn,
												lang: lang,
											});
											setSelectItem({saveItemData:{},gameItem:{},itemSaveSlot:'',selectTab:'',itemCate:'',buttonType:[]});
										// } else {
										// 	setMsgOn(true);
										// 	setMsg(gameData.msg.sentenceFn.lackActionPoint(lang, gameData.ch[saveD.ch[actionCh.idx].idx].na1));
										// }
									}
								}	else if (shopType === 'inven') {
									console.log('a');
								}
							}} data-buttontype="itemBuy">{gameData.msg.button.buy[lang]}</button>
						)
					case 'sell':
						return (
							<button key={`button${idx}`} text="true" className="button_small" onClick={(e) => {
								if (shopType === 'shop') {
									if (selectedItem.gameItem?.part <= 3) { //무기이면
										// if (actionCh.idx === '') {
										// 	setMsgOn(true);
										// 	setMsg(gameData.msg.sentenceFn.selectSkillCh(lang,gameData.skill[201].na));
										// 	return;
										// }
										let saveD = {...saveData};
										// if (saveD.ch[actionCh.idx].actionPoint >= gameData.actionPoint.itemSell) {//행동력 지불
										// saveD.ch[actionCh.idx].actionPoint -= gameData.actionPoint.itemSell;
										util.buttonEvent({
											event: e,
											type: 'itemSell',
											data: {
												slotIdx: 0,
												gameItem: selectedItem.gameItem,
												itemSaveSlot: selectedItem.itemSaveSlot,
												type: 'equip',
											},
											saveData: saveD,
											changeSaveData: changeSaveData,
											gameData: gameData,
											msgText: setMsg,
											showMsg: setMsgOn,
											showPopup: setPopupOn,
											lang: lang,
										});
										setSelectItem({saveItemData:{},gameItem:{},itemSaveSlot:'',selectTab:'',itemCate:'',buttonType:[]});
										// } else {
										// 	setMsgOn(true);
										// 	setMsg(gameData.msg.sentenceFn.lackActionPoint(lang, gameData.ch[saveD.ch[actionCh.idx].idx].na1));
										// }
									} else {
										setMsgOn(true);
										setMsg(gameData.msg.sentence.goTool[lang]);
										timeoutRef.current = setTimeout(() => {
											navigate('../tool', {state: {dataObj: {
												saveItemData: selectedItem.saveItemData,
												gameItem: selectedItem.gameItem,
												itemSaveSlot: selectedItem.itemSaveSlot,
												selectTab: typeof selectedItem.gameItem.part === 'number' ? 3 : 0,
												type: selectedItem.itemCate,//'equip',//shopType === 'shop' ? 'equip' : typeList[selectTab].na,
												selectSlot: selectSlot,
											}}});
										}, 1800);
									}
								} else if (shopType === 'tool') {
									if (selectedItem.gameItem?.part <= 3) { //무기이면
										setMsgOn(true);
										setMsg(gameData.msg.sentence.goShop[lang]);
										timeoutRef.current = setTimeout(() => {
											navigate('../shop', {state: {dataObj: {
												saveItemData: selectedItem.saveItemData,
												gameItem: selectedItem.gameItem,
												itemSaveSlot: selectedItem.itemSaveSlot,
												selectTab: typeof selectedItem.gameItem.part === 'number' ? 3 : 0,
												type: typeList[selectTab].na,
												selectSlot: selectSlot,
											}}});
										}, 1800);
									} else {
										// if (actionCh.idx === '') {
										// 	setMsgOn(true);
										// 	setMsg(gameData.msg.sentenceFn.selectSkillCh(lang,gameData.skill[201].na));
										// 	return;
										// }
										let saveD = {...saveData};
										// if (saveD.ch[actionCh.idx].actionPoint >= gameData.actionPoint.itemSell) {//행동력 지불
										//saveD.ch[actionCh.idx].actionPoint -= gameData.actionPoint.itemSell;
										console.log(selectedItem);
										util.buttonEvent({
											event: e,
											type: 'itemSell',
											data: {
												slotIdx: 0,
												gameItem: selectedItem.gameItem,
												itemSaveSlot: selectedItem.itemSaveSlot,
												type: selectedItem.itemCate,
											},
											saveData: saveD,
											changeSaveData: changeSaveData,
											gameData: gameData,
											msgText: setMsg,
											showMsg: setMsgOn,
											showPopup: setPopupOn,
											lang: lang,
										});
										setSelectItem({saveItemData:{},gameItem:{},itemSaveSlot:'',selectTab:'',itemCate:'',buttonType:[]});
										// } else {
										// 	setMsgOn(true);
										// 	setMsg(gameData.msg.sentenceFn.lackActionPoint(lang, gameData.ch[saveD.ch[actionCh.idx].idx].na1));
									}
								} else if (shopType === 'inven') {
									if (selectedItem.gameItem?.part <= 3) { //무기이면
										setMsgOn(true);
										setMsg(gameData.msg.sentence.goShop[lang]);
										timeoutRef.current = setTimeout(() => {
											navigate('../shop', {state: {dataObj: {
												saveItemData: selectedItem.saveItemData,
												gameItem: selectedItem.gameItem,
												itemSaveSlot: selectedItem.itemSaveSlot,
												selectTab: typeof selectedItem.gameItem.part === 'number' ? 3 : 0,
												type: selectedItem.itemCate,
												selectSlot: selectSlot,
											}}});
										}, 1800);
									} else {
										setMsgOn(true);
										setMsg(gameData.msg.sentence.goTool[lang]);
										timeoutRef.current = setTimeout(() => {
											navigate('../tool', {state: {dataObj: {
												saveItemData: selectedItem.saveItemData,
												gameItem: selectedItem.gameItem,
												itemSaveSlot: selectedItem.itemSaveSlot,
												selectTab: typeof selectedItem.gameItem.part === 'number' ? 3 : 0,
												type: selectedItem.itemCate,
												selectSlot: selectSlot,
											}}});
										}, 1800);
									}
								}
							}} data-buttontype="itemSell">{gameData.msg.button.sell[lang]}</button>
						)
					case 'enhance':
						return (
							<div key={`button${idx}`} className="item_button" flex="true">
								<button text="true" className="button_small" onClick={(e) => {
									setMsgOn(true);
									setMsg(gameData.msg.sentence.goForge[lang]);
									timeoutRef.current = setTimeout(() => {
										navigate('../enhancingStickers', {state: {dataObj: {
											tabIdx: 1,
											gameItem: selectedItem.gameItem,
											saveItemData: selectedItem.saveItemData,
											itemSaveSlot: selectedItem.itemSaveSlot,
										}}});
									}, 1800);
								}} data-buttontype="itemSocket">{gameData.msg.button.enhance[lang]}</button>
							</div>
						)
					case 'socket':
						return (
							<div key={`button${idx}`} className="item_button" flex="true">
								<button text="true" className="button_small" onClick={(e) => {
									setMsgOn(true);
                	setMsg(gameData.msg.sentence.goForge[lang]);
									timeoutRef.current = setTimeout(() => {
										navigate('../enhancingStickers', {state: {dataObj: {
											tabIdx: 1,
											gameItem: selectedItem.gameItem,
											saveItemData: selectedItem.saveItemData,
											itemSaveSlot: selectedItem.itemSaveSlot,
										}}});
									}, 1800);
								}} data-buttontype="itemSocket">{gameData.msg.button.socket[lang]}</button>
							</div>
						)
					case "evaluate":
						return (
							<button key={`button${idx}`} text="true" className="button_small" onClick={(e) => {
								if (shopType === 'inven') {
									util.buttonEvent({
										event: e,
										type: 'itemEvaluate',
										data: {
											slotIdx: 0,
											gameItem: selectedItem.gameItem,
											itemSaveSlot: selectedItem.itemSaveSlot,
											saveItemData: saveData.items.equip[selectedItem.itemSaveSlot],
											type: 'hequip',
										},
										saveData: saveData,
										changeSaveData: changeSaveData,
										gameData: gameData,
										msgText: setMsg,
										showMsg: setMsgOn,
										showPopup: setPopupOn,
										lang: lang,
									}, () => {
										setSelectItem({
											saveItemData: saveData.items.equip[selectedItem.itemSaveSlot],
											gameItem: selectedItem.gameItem,
											itemSaveSlot: selectedItem.itemSaveSlot,
											selectTab: selectTab,
											itemCate: typeList[selectTab].itemCate,
											buttonType: ['sell'],
										});
									});
								} else {
									setMsgOn(true);
									setMsg(gameData.msg.sentence.goInven[lang]);
									timeoutRef.current = setTimeout(() => {
										navigate('../inven', {state: {dataObj: {
											saveItemData: selectedItem.saveItemData,
											gameItem: selectedItem.gameItem,
											itemSaveSlot: selectedItem.itemSaveSlot,
											selectTab: typeof selectedItem.gameItem.part === 'number' ? 0 : 1,
											type: shopType === 'shop' ? 'equip' : typeList[selectTab].na,
											selectSlot: selectSlot,
										}}});
									}, 1800);
								}
							}} data-buttontype="itemSell">{gameData.msg.button.emotions[lang]}</button>
						);
					case 'use':
						return (
							<button key={`button${idx}`} text="true" className="button_small" onClick={(e) => {
								util.buttonEvent({
									event: e,
									type: 'itemUse',
									data: {
										slotIdx: 0,
										gameItem: selectedItem.gameItem,
										itemSaveSlot:selectedItem.itemSaveSlot,
										type: shopType === 'shop' ? 'equip' : typeList[selectTab].na,
									},
									saveData: saveData,
									changeSaveData: changeSaveData,
									gameData: gameData,
									msgText: setMsg,
									showMsg: setMsgOn,
									showPopup: setPopupOn,
									lang: lang,
								});
								setSelectItem({saveItemData:{},gameItem:{},itemSaveSlot:'',selectTab:'',itemCate:'',buttonType:[]});
							}} data-buttontype="itemUse">{gameData.msg.button.use[lang]}</button>
						)
					default:
						break;
				}
			})}
			</div>
		</ItemFooter>
	</>
}

const selectTabFn = (state, shopType, typeList) => {
	if (!state) {
		return 0;
	}
	switch (shopType) {
		case 'shop':
			return 3;
		case 'tool':
		case 'inven':
			let _selectTab = 0;
			for (const [idx, data] of typeList.entries()) {
				if (data.na === state.dataObj.type) {
					_selectTab = idx;
					break;
				}
			}
			return _selectTab;
		default:
			break;
	}
}
const selectItemFn = (state, shopType, selectSlot) => {
	if (state) {
		if (state.dataObj.selectSlot === selectSlot) {
			let button = ['sell'];
			if (state.dataObj.saveItemData.sealed) {
				button.push('evaluate');
			} else {
				if (state.dataObj.saveItemData.slot) {
					button.push('socked');
				}
			}
			switch (shopType) {
				case 'shop':
					return {
						saveItemData: state.dataObj.saveItemData,
						gameItem: state.dataObj.gameItem,
						itemSaveSlot: state.dataObj.itemSaveSlot,
						selectTab: state.dataObj.selectTab,
						itemCate: state.dataObj.type,
						buttonType: button,
					};
				case 'inven':
					return {
						saveItemData: state.dataObj.saveItemData,
						gameItem: state.dataObj.gameItem,
						itemSaveSlot: state.dataObj.itemSaveSlot,
						selectTab: state.dataObj.selectTab,
						itemCate: state.dataObj.type,
						buttonType: button,
					};
				default:
					return {
						saveItemData:{},
						gameItem:{},
						itemSaveSlot:'',
						selectTab:'',
						itemCate:'',
						buttonType:[]
					};
			}
		} else {
			return {
				saveItemData:{},
				gameItem:{},
				itemSaveSlot:'',
				selectTab:'',
				itemCate:'',
				buttonType:[]
			}
		}
	} else {
		return {
			saveItemData:{},
			gameItem:{},
			itemSaveSlot:'',
			selectTab:'',
			itemCate:'',
			buttonType:[]
		}
	}
}
const ShopList = ({
	gameData,
	shopType,
	typeList,
	list,
	scrollIdx,
	invenIdx,
	selectTab,
	gameItem,
	selectItem1,
	setSelectItem1,
	selectItem2,
	setSelectItem2,
	selectArea,
}) => {
	const invenNa = useRef(['equip', 'hole', 'upgrade', 'material', 'etc']);
	return <>
		{list.map((itemData, idx) => {
		if (typeof itemData.part === 'number') { // 장비인지
			const itemsGrade = itemData.grade < 5 ? 0 : itemData.grade - 5;
			const items = itemData.part === 3 ? gameItem.equip[itemData.part][itemData.weaponType][itemsGrade][itemData.idx] : gameItem.equip[itemData.part][0][itemsGrade][itemData.idx];
			const itemsHole = itemData.hole;
			return items && (
				<div className={`item_layout ${gameData.itemGrade.txt_e[itemData.grade].toLowerCase()} ${selectItem1?.selectTab === selectTab && selectItem1?.itemSaveSlot === idx ? 'select1' : ''} ${selectItem2?.selectTab === selectTab && selectItem2?.itemSaveSlot === idx ? 'select2' : ''} favorite${itemData.favorite}`} key={`items${idx}`} onClick={() => {
					itemData.quality = itemsGrade;
					const items = itemData.part === 3 ? gameItem.equip[itemData.part][itemData.weaponType][itemsGrade][itemData.idx] : gameItem.equip[itemData.part][0][itemsGrade][itemData.idx];
					let button = [];
					if (shopType === 'shop') {
						if (selectTab < 3) {
							button.push('buy');
						} else {
							button.push('sell');
							if (itemData.sealed) {
								button.push('evaluate');
							} else {
								button.push('enhance');
								if (itemData.slot) {
									button.push('socket');
								}
							}
						}
					} else if (shopType === 'tool') {
						if (selectTab < 3) {
							button.push('buy');
						} else {
							button.push('sell');
							if (itemData.sealed) {
								button.push('evaluate');
							} else {
								button.push('enhance');
								if (itemData.slot) {
									button.push('socket');
								}
							}
						}
					} else if (shopType === 'inven') {
						button.push('sell');
						if (itemData.sealed) {
							button.push('evaluate');
						} else {
							button.push('enhance');
							if (itemData.slot) {
								button.push('socket');
							}
						}
					}
					if (selectArea === 'area2') {
						if (selectItem1.itemSaveSlot !== '' && selectItem1.selectTab === selectTab && selectItem1.itemSaveSlot === idx) {
							setSelectItem1({saveItemData:{},gameItem:{},itemSaveSlot:'',selectTab:'',itemCate:'',buttonType:[]});
						}
						setSelectItem2({
							saveItemData:itemData,
							gameItem:items,
							itemSaveSlot:idx,
							selectTab:selectTab,
							itemCate:typeList[scrollIdx].itemCate,
							buttonType:button,
						});
					} else {
						if (selectItem2.itemSaveSlot !== '' && selectItem2.selectTab === selectTab && selectItem2.itemSaveSlot === idx) {
							setSelectItem2({saveItemData:{},gameItem:{},itemSaveSlot:'',selectTab:'',itemCate:'',buttonType:[]});
						}
						setSelectItem1({
							saveItemData:itemData,
							gameItem:items,
							itemSaveSlot:idx,
							selectTab:selectTab,
							itemCate:typeList[scrollIdx].itemCate,
							buttonType:button,
						});
					}
				}}>
					<span className={`pic ${itemData.sealed ? "sealed" : ""}`}>
						<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[items.display], itemData.color, itemData.svgColor || itemData.id)}}>
						</svg>
					</span>
					<span className="hole" flex-center="true">
						{itemsHole.map((holeData, holeidx) => {
							const holePic = holeData !== 0 ? gameItem.hole[holeData.idx].display : 0;
							return (
								<span className={`hole_slot hole${holeidx} ${holePic !== 0 ? 'fixed': ''}`} key={`hole${holeidx}`}>
									<ItemPic className="pic" pic="itemEtc" type="hole" idx={holePic} />
								</span>
							);
						})}
					</span>
				</div>
			)
		} else {
			const itemTypeNa = typeof invenIdx === 'number' ? invenNa.current[invenIdx] : typeList[scrollIdx].na;
			const items = gameItem[itemTypeNa][itemData.idx];
			const grade = itemData.grade || items?.grade || 0;
			return items && (
				<div className={`item_layout ${gameData.itemGrade.txt_e[grade].toLowerCase()} ${selectItem1?.selectTab === typeList[scrollIdx].na && selectItem1?.itemSaveSlot === idx ? 'select1' : ''} ${selectItem2?.selectTab === typeList[scrollIdx].na && selectItem2?.itemSaveSlot === idx ? 'select2' : ''}`} key={`items${idx}`} onClick={() => {
					let button = [];
					if (shopType === 'shop') {
						if (selectTab < 3) {
							button.push('buy');
						} else {
							button.push('sell');
							if (itemData.sealed) {
								button.push('evaluate');
							}
						}
					} else if (shopType === 'tool') {
						if (selectTab < 3) {
							button.push('buy');
						} else {
							button.push('sell');
							if (itemData.sealed) {
								button.push('evaluate');
							}
						}
					} else if (shopType === 'inven') {
						button.push('sell');
						if (itemData.sealed) {
							button.push('evaluate');
						} else {
							if (itemData.slot) {
								button.push('socket');
							}
						}
					}
					if (selectArea === 'area2') {
						if (selectItem1.itemSaveSlot && (Object.entries(itemData).toString() === Object.entries(selectItem1.saveItemData).toString())) {
							setSelectItem1({saveItemData:[],gameItem:[],itemSaveSlot:'',buttonType:[],selectTab:'',itemCate:''});
						}
						console.log(itemData, items,itemTypeNa,typeList[scrollIdx].na)
						setSelectItem2({
							saveItemData:itemData,
							gameItem:items,
							itemSaveSlot:idx,
							selectTab:typeList[scrollIdx].na,
							itemCate:itemTypeNa,
							buttonType:button,
						});
					} else {
						if (selectItem2.itemSaveSlot && (Object.entries(itemData).toString() === Object.entries(selectItem2?.saveItemData).toString())) {
							setSelectItem2({saveItemData:[],gameItem:[],itemSaveSlot:'',buttonType:[],selectTab:'',itemCate:''});
						}
						setSelectItem1({
							saveItemData:itemData,
							gameItem:items,
							itemSaveSlot:idx,
							selectTab:typeList[scrollIdx].na,
							itemCate:itemTypeNa,
							buttonType:button,
						});
					}
				}}>
					<ItemPic className="pic" pic="itemEtc" type={itemTypeNa} idx={items.display} />
				</div>
			)
		}
		})}
	</>
}
const InvenShop = ({
	shopType,
	cityIdx,
	saveData,
	changeSaveData,
}) => {
  const context = useContext(AppContext);
	const {state} = useLocation();
  // const lang = React.useMemo(() => {
  //   return context.setting.lang;
  // }, [context]);
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
  const [popupInfo, setPopupInfo] = useState({});
  const [popupType, setPopupType] = useState('');
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");
	const item = React.useMemo(() => {
		const cityData = sData.city[cityIdx];
		switch (shopType) {
			case 'shop':
				return [
					[...cityData.shop.helm],
					[...cityData.shop.armor],
					[...cityData.shop.weapon],
					[[...sData.items.equip],[...sData.items.hole],[...sData.items.upgrade],[...sData.items.material],[...sData.items.etc]],
				];
			case 'tool':
				return [
					[...cityData.tool.accessory],
					[...cityData.tool.upgrade],
					[...cityData.tool.etc],
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
	}, [cityIdx, sData, shopType]);
	const typeList = React.useMemo(() => {
		switch (shopType) {
			case 'shop':
				return [
					{na:'helm',itemCate:'equip',icon:10},
					{na:'armor',itemCate:'equip',icon:11},
					{na:'weapon',itemCate:'equip',icon:12},
					{na:'inven',itemCate:'',icon:13},
				];
			case 'tool':
				return [
					{na:'accessory',itemCate:'equip',icon:18},
					{na:'upgrade',itemCate:'upgrade',icon:15},
					{na:'etc',itemCate:'etc',icon:17},
					{na:'inven',itemCate:'',icon:13},
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
	const [selectTab, setSelectTab] = useState(selectTabFn(state, shopType, typeList));
	const [selectArea, setSelectArea] = useState('area1');
	const [selectItem1, setSelectItem1] = useState(selectItemFn(state, shopType, 1));
	const [selectItem2, setSelectItem2] = useState(selectItemFn(state, shopType, 2));
	useEffect(() => {
		setSelectTab(selectTabFn(state, shopType, typeList));
		setSelectItem1(selectItemFn(state, shopType, 1));
		setSelectItem2(selectItemFn(state, shopType, 2));
	}, [state, shopType, typeList]);
	const actionCh = React.useMemo(() => sData.actionCh.shop, [sData]);//행동할 캐릭터 데이터
	const actionRef = useRef();//행동할 캐릭터 선택자
	useEffect(() => {
		if (Object.keys(sData).length !== 0 && shopType !== 'inven') {
			setPopupInfo({
				ch:sData.ch,
				actionCh:sData.actionCh[shopType].idx,
				type: shopType
			});
		}
	}, [sData, shopType]);
  return (
		<>
			<ShopWrap className="wrap">
				<ShopTop>
					<ShopTopLeft>
						<TabMenu direction="vertical" list={typeList} selectTab={selectTab} setSelectTab={setSelectTab} className="transition" />
						{Object.keys(actionCh).length !== 0 && shopType !== 'inven' && (<div ref={actionRef} className={`ch_select_area ${actionCh.idx ? 'g' + sData.ch[actionCh.idx].grade : ''}`} onClick={() => {
								setPopupType('selectCh');
								setPopupOn(true);
							}}>
								<ActionChDisplay type="shop" saveData={sData} gameData={gameData} actionCh={actionCh} imgSet={imgSet}/>
							</div>
						)}
					</ShopTopLeft>
					<ShopScrollContent className="num4">
						{item.map((scrollData, scrollIdx) => {
							return <ShopItem className="scroll-y" selected={selectTab === scrollIdx} key={`scrollContent${scrollIdx}`}>
								{typeList[scrollIdx].na === 'inven' ? 
									scrollData.map((invenData, invenIdx) => {
										return <ShopList gameData={gameData} shopType={shopType} typeList={typeList} list={invenData} scrollIdx={scrollIdx} invenIdx={invenIdx} selectTab={selectTab} gameItem={gameItem} selectItem1={selectItem1} setSelectItem1={setSelectItem1} selectItem2={selectItem2} setSelectItem2={setSelectItem2} selectArea={selectArea} key={`inven${invenIdx}`}/>
									})
								: 
									<ShopList gameData={gameData} shopType={shopType} typeList={typeList} list={scrollData} scrollIdx={scrollIdx} selectTab={selectTab} gameItem={gameItem} selectItem1={selectItem1} setSelectItem1={setSelectItem1} selectItem2={selectItem2} setSelectItem2={setSelectItem2} selectArea={selectArea} />
								}
								</ShopItem>
						})}
					</ShopScrollContent>
				</ShopTop>
				<ShopBottom>
					{selectItem1?.saveItemData && Object.keys(selectItem1?.saveItemData).length !== 0 ? (
						<ItemContainer className={`item_select item_select1 items ${selectArea === "area1" ? "on" : ""}`} itemSelect="select1" onClick={() => {
							setSelectArea('area1');
						}}>
							<ShopFooter selectItem={selectItem1} setSelectItem={setSelectItem1} selectSlot={1} shopType={shopType} actionCh={actionCh} saveData={sData} changeSaveData={changeSaveData} cityIdx={cityIdx} typeList={typeList} selectTab={selectTab} setPopupType={setPopupType} setPopupInfo={setPopupInfo} setPopupOn={setPopupOn} setMsgOn={setMsgOn} setMsg={setMsg}/>
						</ItemContainer>
					) : (
						<ItemContainer className={`item_select item_select1 items ${selectArea === "area1" ? "on" : ""}`} itemSelect="select1" onClick={() => {
							setSelectArea('area1');
						}}></ItemContainer>
					)}
					{selectItem2?.saveItemData && Object.keys(selectItem2?.saveItemData).length !== 0 ? (
						<ItemContainer className={`item_select item_select2 items ${selectArea === "area2" ? "on" : ""}`} itemSelect="select2" onClick={() => {
							setSelectArea('area2');
						}}>
							<ShopFooter selectItem={selectItem2} setSelectItem={setSelectItem2} selectSlot={2} shopType={shopType} actionCh={actionCh} saveData={sData} changeSaveData={changeSaveData} cityIdx={cityIdx} typeList={typeList} selectTab={selectTab} setPopupType={setPopupType} setPopupInfo={setPopupInfo} setPopupOn={setPopupOn} setMsgOn={setMsgOn} setMsg={setMsg}/>
						</ItemContainer>
					) : (
						<ItemContainer className={`item_select item_select2 items ${selectArea === "area2" ? "on" : ""}`} itemSelect="select2" onClick={() => {
							setSelectArea('area2');
						}}></ItemContainer>
					)}
				</ShopBottom>
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
