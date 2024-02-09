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

const StickerShop = ({
	shopType,
	cityIdx,
	saveData,
	changeSaveData,
}) => {
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
  const gameItem = React.useMemo(() => {
    return gameData.items;
  }, [gameData]);
  const sData = React.useMemo(() => Object.keys(saveData).length === 0 ? util.loadData('saveData') : saveData, [saveData]);
  const [popupOn, setPopupOn] = useState(false);
  const [popupInfo, setPopupInfo] = useState({});
  const [popupType, setPopupType] = useState('');
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");
	const [selectTab, setSelectTab] = useState(0);
	const item = React.useMemo(() => {
		switch (shopType) {
			case 'shop':
				const cityData = sData.city[cityIdx];
				return [
					[...cityData.stickerShop.helm],
					[...cityData.stickerShop.armor],
					[...cityData.stickerShop.weapon],
					[...sData.items.equip],
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
					{na:'helm',isEquip:true,bottomType:'equip',icon:10},
					{na:'armor',isEquip:true,bottomType:'equip',icon:11},
					{na:'weapon',isEquip:true,bottomType:'equip',icon:12},
					{na:'inven',isEquip:true,bottomType:'equip',icon:13},
				];
			case 'inven':
				return [
					{na:'equip',isEquip:true,bottomType:'equip',icon:11},
					{na:'hole',isEquip:false,bottomType:'hole',icon:14},
					{na:'upgrade',isEquip:false,bottomType:'etc',icon:15},
					{na:'material',isEquip:false,bottomType:'etc',icon:16},
					{na:'etc',isEquip:false,bottomType:'etc',icon:17},
				];
			default:
				break;
		}
	}, [shopType]);
	const [selectArea, setSelectArea] = useState('area1');
	const [selectItem1, setSelectItem1] = useState({save:{},game:{},select:'',selectTab:'',
	bottomType:'',buttonType:[]});
	const [selectItem2, setSelectItem2] = useState({save:{},game:{},select:'',selectTab:'',
	bottomType:'',buttonType:[]});
	const actionCh = React.useMemo(() => sData.actionCh.stickerShop, [sData]);//행동할 캐릭터 데이터
	const actionRef = useRef();//행동할 캐릭터 선택자
	useEffect(() => {
		if (Object.keys(sData).length !== 0) {
			setPopupInfo({
				ch:sData.ch,
				actionCh:sData.actionCh.stickerShop.idx,
				type:'stickerShop'
			});
		}
	}, [sData]);
  const handlePopup = useCallback((saveObj) => {
		const {saveItemData, itemType, itemIdx} = saveObj;
		setPopupType(itemType);
    const gameItemData = saveItemData.part === 3 ? gameItem['equip'][saveItemData.part][saveItemData.weaponType][saveItemData.quality][itemIdx] : gameItem['equip'][saveItemData.part][0][saveItemData.quality][itemIdx];
		setPopupInfo({
			// slotIdx: slotIdx,
			gameItem: gameItemData,
			itemSaveSlot: saveItemData.idx,
			saveItemData: saveItemData,
			type: itemType,
		});
    setPopupOn(prev => !prev);
  }, [gameItem]);
  return (
		<>
			<ShopWrap className="wrap">
				<ShopTop>
					<ShopTopLeft>
						<TabMenu direction="vertical" list={typeList} selectTab={selectTab} setSelectTab={setSelectTab} className="transition" />
						{Object.keys(actionCh).length !== 0 && (<div ref={actionRef} className={`ch_select_area ${actionCh.idx ? 'g' + sData.ch[actionCh.idx].grade : ''}`} onClick={() => {
								setPopupType('selectCh');
								setPopupOn(true);
							}}>
								<ActionChDisplay type="stickerShop" saveData={sData} gameData={gameData} actionCh={actionCh} imgSet={imgSet}/>
							</div>
						)}
					</ShopTopLeft>
					<ShopScrollContent className="num4 scroll-y">
						{item.map((scrollData, scrollIdx) => {
							return <ShopItem selected={selectTab === scrollIdx} key={`scrollContent${scrollIdx}`}>
								{scrollData.map((data, idx) => {
									const isEquip = typeList[scrollIdx].isEquip;
									if (isEquip) {
										const itemsGrade = data.grade < 5 ? 0 : data.grade - 5;
										const items = data.part === 3 ? gameItem.equip[data.part][data.weaponType][itemsGrade][data.idx] : gameItem.equip[data.part][0][itemsGrade][data.idx];
										const itemsHole = data.hole;
										return items && (
											<div className={`item_layout ${gameData.itemGrade.txt_e[data.grade].toLowerCase()} ${selectItem1.selectTab === selectTab && selectItem1.select === idx ? 'select1' : ''} ${selectItem2.selectTab === selectTab && selectItem2.select === idx ? 'select2' : ''} favorite${data.favorite}`} key={`items${idx}`} onClick={() => {
												const itemSelect = {...item[selectTab][idx]};
												const itemsGrade = itemSelect.grade < 5 ? 0 : itemSelect.grade - 5;
												itemSelect.quality = itemsGrade;
												const items = itemSelect.part === 3 ? gameItem.equip[itemSelect.part][itemSelect.weaponType][itemsGrade][itemSelect.idx] : gameItem.equip[itemSelect.part][0][itemsGrade][itemSelect.idx];
												if (shopType === 'shop') {
													if (selectArea === 'area2') {
														let button = [];
														if (selectTab < 3) {
															button.push('buy');
														} else {
															button.push('sell');
															if (itemSelect.sealed) {
																button.push('evaluate');
															}
														}
														if (selectItem1.select !== '' && selectItem1.selectTab === selectTab && selectItem1.select === idx) {
															setSelectItem1({save:{},game:{},select:'',selectTab:'',bottomType:'',buttonType:[]});
														}
														setSelectItem2({
															save:itemSelect,
															game:items,
															select:idx,
															selectTab:selectTab,
															bottomType:typeList[scrollIdx].bottomType,
															buttonType:button,
														});
													} else {
														let button = [];
														if (selectTab < 3) {
															button.push('buy');
														} else {
															button.push('sell');
															if (itemSelect.sealed) {
																button.push('evaluate');
															}
														}
														if (selectItem2.select !== '' && selectItem2.selectTab === selectTab && selectItem2.select === idx) {
															setSelectItem2({save:{},game:{},select:'',selectTab:'',bottomType:'',buttonType:[]});
														}
														setSelectItem1({
															save:itemSelect,
															game:items,
															select:idx,
															selectTab:selectTab,
															bottomType:typeList[scrollIdx].bottomType,
															buttonType:button,
														});
													}
												} else if (shopType === 'inven') {
													if (selectArea === 'area2') {
														let button = ['sell'];
														if (itemSelect.sealed) {
															button.push('evaluate');
														}
														if (selectItem1.select !== '' && selectItem1.selectTab === typeList[selectTab].na && selectItem1.select === idx) {
															setSelectItem1({save:{},game:{},select:'',selectTab:'',buttonType:[]});
														}
														setSelectItem2({
															save:itemSelect,
															game:items,
															select:idx,
															selectTab:selectTab,
															bottomType:typeList[scrollIdx].bottomType,
															buttonType:button,
														});
													} else {
														let button = ['sell'];
														if (itemSelect.sealed) {
															button.push('evaluate');
														}
														if (selectItem2.select !== '' && selectItem2.selectTab === typeList[selectTab].na && selectItem2.select === idx) {
															setSelectItem2({save:{},game:{},select:'',selectTab:'',buttonType:[]});
														}
														setSelectItem1({
															save:itemSelect,
															game:items,
															select:idx,
															selectTab:selectTab,
															bottomType:typeList[scrollIdx].bottomType,
															buttonType:button,
														});
													}
												}
											}}>
												<span className={`pic ${data.sealed ? "sealed" : ""}`}>
													<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[items.display], data.color, data.svgColor || data.id)}}>
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
										const items = gameItem[typeList[scrollIdx].na][data.idx];
										const grade = data.grade || items.grade;
										return (
											<div className={`item_layout ${gameData.itemGrade.txt_e[grade].toLowerCase()} ${selectItem1.selectTab === typeList[scrollIdx].na && selectItem1.select === idx ? 'select1' : ''} ${selectItem2.selectTab === typeList[scrollIdx].na && selectItem2.select === idx ? 'select2' : ''}`} key={`items${idx}`} onClick={() => {
												if (selectArea === 'area2') {
													if (selectItem1.save && (Object.entries(data).toString() === Object.entries(selectItem1.save).toString())) {
														setSelectItem1({save:[],game:[],buttonType:[],selectTab:'',bottomType:'',select:''});
													}
													let button = ['sell'];
													if (selectItem1.select !== '' && selectItem1.selectTab === typeList[scrollIdx].na && selectItem1.select === idx) {
														setSelectItem1({save:{},game:{},select:'',selectTab:'',bottomType:'',buttonType:[]});
													}
													setSelectItem2({
														save:data,
														game:items,
														select:idx,
														selectTab:typeList[scrollIdx].na,
														bottomType:typeList[scrollIdx].bottomType,
														buttonType:button,
													});
												} else {
													if (selectItem2.save && (Object.entries(data).toString() === Object.entries(selectItem2.save).toString())) {
														setSelectItem2({save:[],game:[],buttonType:[],selectTab:'',bottomType:'',select:''});
													}
													let button = ['sell'];
													if (selectItem2.select !== '' && selectItem2.selectTab === typeList[scrollIdx].na && selectItem2.select === idx) {
														setSelectItem2({save:{},game:{},select:'',selectTab:'',bottomType:'',buttonType:[]});
													}
													setSelectItem1({
														save:data,
														game:items,
														select:idx,
														selectTab:typeList[scrollIdx].na,
														bottomType:typeList[scrollIdx].bottomType,
														buttonType:button,
													});
												}
											}}>
												<ItemPic className="pic" pic="itemEtc" type={typeList[scrollIdx].na} idx={items.display} />
											</div>
										)
									}
								})}
							</ShopItem>
						})}
					</ShopScrollContent>
				</ShopTop>
				<ShopBottom>
					{Object.keys(selectItem1.save).length !== 0 ? (
						<ItemContainer className={`item_select item_select1 items ${selectArea === "area1" ? "on" : ""}`} itemSelect="select1" onClick={() => {
							setSelectArea('area1');
						}}>
							{selectItem1.bottomType === 'equip' && (
								<>
									<ItemHeader frameBack={imgSet.etc.frameChBack} color={gameData.itemGrade.color[selectItem1.save.grade]} flex-center="true">
										<span className="item_name" dangerouslySetInnerHTML={{__html: `${selectItem1.save.colorantSet ? util.getColorant(selectItem1.save.colorantSet, gameData).na[lang] : ''} ${selectItem1.save.modifier[lang]} ${selectItem1.game.na[lang]}`}}></span>
									</ItemHeader>
									<ItemFix itemSelect="select1">
										<ItemGradeColor part={selectItem1.game.part} grade={gameData.itemGrade.txt_e[selectItem1.save.grade].toLowerCase()} sealed={selectItem1.save.sealed} size="50" onClick={() => {
											if (shopType === 'shop') {
												handlePopup({
													saveItemData: selectItem1.save,
													itemType: (selectTab < 3 ? 'equip' : 'hequip'),
													itemIdx: selectItem1.idx,
												});
											} else {
												handlePopup({
													saveItemData: selectItem1.save,
													itemType: 'hequip',
													itemIdx: selectItem1.idx,
												});
											}
										}}>
											<ItemPic type="equip" className={`item favorite${selectItem1.save.favorite}`}>
												<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[selectItem1.game.display], selectItem1.save.color, selectItem1.save.svgColor || selectItem1.save.id)}}></svg>
											</ItemPic>
										</ItemGradeColor>
										<div flex-h="true" style={{flex: 1,}}>
											<ItemCont color={gameData.itemGrade.color[selectItem1.save.grade]}>
												<div className="item_top">
													<span className="item_grade">{lang === 'ko' ? gameData.itemGrade.txt_k[selectItem1.save.grade] : gameData.itemGrade.txt_e[selectItem1.save.grade]}</span> <span className="item_type">{gameData.itemType[selectItem1.game.part][lang]}</span>
												</div>
												<div className="item_description" dangerouslySetInnerHTML={{__html: `"${selectItem1.game.txt[lang]}"`}}></div>
												<div className="item_kg">{selectItem1.game.kg}kg</div>
											</ItemCont>
										</div>
									</ItemFix>
									<div className="scroll-y">
										{(selectItem1.save.markNum > 0 || selectItem1.save.hole.length > 0) && <ItemList type="typeSlot" className="item_list">
											<div className="item_type">
												<MarkPic length={selectItem1.save.markNum} pic="animalType" idx={selectItem1.save.mark} />
											</div>
											<div className="item_slot">
												{selectItem1.save.hole.map((holeData, idx) => {
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
											{util.getTotalEff(selectItem1.save, gameData).map((eff, idx) => {
												return (
													<div key={idx} className="item_effs"><span className="cate">{util.getEffectType(eff.type, lang)}</span>{eff.base > 0 && <span className="base">{eff.base}</span>}{eff.add > 0 && <span className="add">{eff.add}</span>}{eff.hole > 0 && <span className="hole">{eff.hole}</span>}<span className="total">{selectItem1.save.sealed ? eff.base : eff.base + eff.add + eff.hole}</span></div>
												)
											})}
										</ItemList>
										<div style={{width:"100%"}} className="scroll-y">
											{selectItem1.save.baseEff.length > 0 && (
												<ItemList className="item_list">
													<div className="item_title">{gameData.msg.itemInfo.basicEffect[lang]}</div>
													{selectItem1.save.baseEff.map((data, idx) => {
														const grade = selectItem1.save.grade > 3 ? 3 : selectItem1.save.grade - 1;
														return (
															<div key={idx} className="item_effs">{`${util.getEffectType(data.type, lang)} ${selectItem1.save.sealed ? data.num : data.num[grade]}`}</div>
														) 
													})}
												</ItemList>
											)}
											{selectItem1.save.addEff.length > 0 && (
												<ItemList className="item_list">
													<div className="item_title">{gameData.msg.itemInfo.addEffect[lang]}</div>
													{selectItem1.save.addEff.map((data, idx) => {
														const grade = selectItem1.save.grade > 3 ? 3 : selectItem1.save.grade - 1;
														return (
															<div key={idx} className="item_effs add">{`${util.getEffectType(data.type, lang)} ${data.num[0]}`}</div>
														) 
													})}
												</ItemList>
											)}
											{selectItem1.game.set !== 0 && (<ItemList type="set" className="item_list">
												<div className="item_setNa">{gameData.items.set_type[selectItem1.game.set].na}</div>
											</ItemList>
											)}
										</div>
									</div>
								</>
							)}
							{selectItem1.bottomType === 'hole' && (
								<>
									<ItemHeader frameBack={imgSet.etc.frameChBack} color={gameData.itemGrade.color[selectItem1.save.grade]} flex-center="true">
										<span className="item_name" dangerouslySetInnerHTML={{__html: `${selectItem1.game.na[lang]}`}}></span>
									</ItemHeader>
									<ItemFix itemSelect="select1">
										<ItemGradeColor grade={gameData.itemGrade.txt_e[selectItem1.save.grade || selectItem1.game.grade].toLowerCase()} size="50" onClick={() => {
											handlePopup({
												saveItemData: selectItem1.save,
												itemType: 'hole',
												itemIdx: selectItem1.idx,
											});
										}}>
											<ItemPic pic="itemEtc" type={selectItem1.bottomType} idx={selectItem1.game.display} />
										</ItemGradeColor>
										<div flex-h="true" style={{flex: 1,}}>
											<ItemCont color={gameData.itemGrade.color[selectItem1.save.grade]}>
												<div className="item_top">
													<span className="item_grade">{lang === 'ko' ? gameData.itemGrade.txt_k[selectItem1.save.grade] : gameData.itemGrade.txt_e[selectItem1.save.grade]}</span>
												</div>
												<div className="item_description" dangerouslySetInnerHTML={{__html: `"${selectItem1.game.txt[lang]}"`}}></div>
												<div className="item_kg">{selectItem1.game.kg}kg</div>
											</ItemCont>
										</div>
									</ItemFix>
									{selectItem1.game.idx < 100 && (
										<div className="scroll-y">
											<ItemList className="item_list">
												<div className="item_title">{gameData.msg.itemInfo.itemEffect[lang]}</div>
												{util.getTotalEff(selectItem1.save, gameData).map((eff, idx) => {
													return (
														<div key={idx} className="item_effs"><span className="cate">{util.getEffectType(eff.type, lang)}</span>{eff.base > 0 && <span className="base">{eff.base}</span>}{eff.add > 0 && <span className="add">{eff.add}</span>}{eff.hole > 0 && <span className="hole">{eff.hole}</span>}<span className="total">{selectItem1.save.sealed ? eff.base : eff.base + eff.add + eff.hole}</span></div>
													)
												})}
											</ItemList>
										</div>
									)}
								</>
							)}
							{selectItem1.bottomType === 'etc' && (
								<>
									<ItemHeader frameBack={imgSet.etc.frameChBack} color={gameData.itemGrade.color[selectItem1.save.grade]} flex-center="true">
										<span className="item_name" dangerouslySetInnerHTML={{__html: `${selectItem1.game.na[lang]}`}}></span>
									</ItemHeader>
									<ItemFix itemSelect="select1">
										<ItemGradeColor grade={gameData.itemGrade.txt_e[selectItem1.save.grade || selectItem1.game.grade].toLowerCase()} size="50" onClick={() => {
											handlePopup({
												saveItemData: selectItem1.save,
												itemType: typeList[selectTab].na,
												itemIdx: selectItem1.idx,
											});
										}}>
											<ItemPic pic="itemEtc" type={typeList[selectTab].na} idx={selectItem1.game.display} />
										</ItemGradeColor>
										<div flex-h="true" style={{flex: 1,}}>
											<ItemCont color={gameData.itemGrade.color[selectItem1.save.grade]}>
												<div className="item_top">
													<span className="item_grade">{lang === 'ko' ? gameData.itemGrade.txt_k[selectItem1.save.grade] : gameData.itemGrade.txt_e[selectItem1.save.grade]}</span>
												</div>
												<div className="item_description" dangerouslySetInnerHTML={{__html: `"${selectItem1.game.txt[lang]}"`}}></div>
												<div className="item_kg">{selectItem1.game.kg}kg</div>
											</ItemCont>
										</div>
									</ItemFix>
									<div className="scroll-y">
										<li className="item_list item_eff">
											<div className="item_title">
												{selectItem1.game.txt[lang]}
											</div>
										</li>
									</div>
								</>
							)}
							<ItemFooter itemSelect="select1">
								{selectItem1.buttonType[0] === 'buy' ? (
									<div className="item_price"><span>{gameData.msg.itemInfo.buyPrice[lang]}</span><em>{`₩${util.comma((selectItem1.game.price < 1000 ? 1000 : selectItem1.game.price) * 2 * selectItem1.save.grade)}`}</em></div>
								) : (
									<div className="item_price"><span>{gameData.msg.itemInfo.sellPrice[lang]}</span><em>{`₩${util.comma(selectItem1.game.price * (selectItem1.game.grade || selectItem1.save.grade))}`}</em></div>
								)}
								<div className="item_button" flex="true">
								{selectItem1.buttonType.map((button, idx) => {
									switch(button) {
										case 'buy':
											return (
												<button key={`button${idx}`} text="true" className="button_small" onClick={(e) => {
													if (actionCh.idx === '') {
														setMsgOn(true);
														setMsg(gameData.msg.sentenceFn.selectSkillCh(lang,gameData.skill[201].na));
														return;
													}
													let saveD = {...sData};
													if (saveD.ch[actionCh.idx].actionPoint >= gameData.actionPoint.itemBuy) {//행동력 지불
														saveD.ch[actionCh.idx].actionPoint -= gameData.actionPoint.itemBuy;
														saveD.city[cityIdx].stickerShop[typeList[selectItem1.selectTab].na].splice(selectItem1.select, 1);
														util.buttonEvent({
															event: e,
															type: 'itemBuy',
															data: {
																slotIdx: 0,
																gameItem: selectItem1.game,
																saveItemData: selectItem1.save,
																type: shopType === 'shop' ? 'equip' : typeList[selectTab].na,
															},
															saveData: saveD,
															changeSaveData: changeSaveData,
															gameData: gameData,
															msgText: setMsg,
															showMsg: setMsgOn,
															showPopup: setPopupOn,
															lang: lang,
														});
														setSelectItem1({save:{},game:{},select:'',selectTab:'',bottomType:'',buttonType:[]});
													} else {
														setMsgOn(true);
														setMsg(gameData.msg.sentenceFn.lackActionPoint(lang, gameData.ch[saveD.ch[actionCh.idx].idx].na1));
													}
												}} data-buttontype="itemBuy">{gameData.msg.button.buy[lang]}</button>
											)
										case 'sell':
											return (
												<button key={`button${idx}`} text="true" className="button_small" onClick={(e) => {
													// if (actionCh.idx === '') {
													// 	setMsgOn(true);
													// 	setMsg(gameData.msg.sentenceFn.selectSkillCh(lang,gameData.skill[201].na));
													// 	return;
													// }
													let saveD = {...sData};
													// if (saveD.ch[actionCh.idx].actionPoint >= gameData.actionPoint.itemSell) {//행동력 지불
													// 	saveD.ch[actionCh.idx].actionPoint -= gameData.actionPoint.itemSell;
														util.buttonEvent({
															event: e,
															type: 'itemSell',
															data: {
																slotIdx: 0,
																gameItem: selectItem1.game,
																itemSaveSlot:selectItem1.select,
																type: shopType === 'shop' ? 'equip' : typeList[selectTab].na,
															},
															saveData: saveD,
															changeSaveData: changeSaveData,
															gameData: gameData,
															msgText: setMsg,
															showMsg: setMsgOn,
															showPopup: setPopupOn,
															lang: lang,
														});
														setSelectItem1({save:{},game:{},select:'',selectTab:'',bottomType:'',buttonType:[]});
													// } else {
													// 	setMsgOn(true);
													// 	setMsg(gameData.msg.sentenceFn.lackActionPoint(lang, gameData.ch[saveD.ch[actionCh.idx].idx].na1));
													// }
												}} data-buttontype="itemSell">{gameData.msg.button.sell[lang]}</button>
											)
										case "evaluate":
											return (
												<button key={`button${idx}`} text="true" className="button_small" onClick={(e) => {
													util.buttonEvent({
														event: e,
														type: 'itemEvaluate',
														data: {
															slotIdx:0,
															gameItem:selectItem1.game,
															itemSaveSlot:selectItem1.select,
															saveItemData:saveData.items.equip[selectItem1.select],
															type:'hequip',
														},
														saveData: saveData,
														changeSaveData: changeSaveData,
														gameData: gameData,
														msgText: setMsg,
														showMsg: setMsgOn,
														showPopup: setPopupOn,
														lang: lang,
													});
													setSelectItem1({save:{},game:{},select:'',selectTab:'',bottomType:'',buttonType:[]})
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
															gameItem: selectItem1.game,
															itemSaveSlot:selectItem1.select,
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
													setSelectItem1({save:{},game:{},select:'',selectTab:'',bottomType:'',buttonType:[]});
												}} data-buttontype="itemUse">{gameData.msg.button.use[lang]}</button>
											)
										default:
											break;
									}
								})}
								</div>
							</ItemFooter>
						</ItemContainer>
					) : (
						<ItemContainer className={`item_select item_select1 items ${selectArea === "area1" ? "on" : ""}`} itemSelect="select1" onClick={() => {
							setSelectArea('area1');
						}}></ItemContainer>
					)}
					{Object.keys(selectItem2.save).length !== 0 ? (
						<ItemContainer className={`item_select item_select2 items ${selectArea === "area2" ? "on" : ""}`} itemSelect="select2" onClick={() => {
							setSelectArea('area2');
						}}>
							{selectItem2.bottomType === 'equip' && (
								<>
									<ItemHeader frameBack={imgSet.etc.frameChBack} color={gameData.itemGrade.color[selectItem2.save.grade]} flex-center="true">
										<span className="item_name" dangerouslySetInnerHTML={{__html: `${selectItem2.save.modifier[lang]} ${selectItem2.game.na[lang]}`}}></span>
									</ItemHeader>
									<ItemFix itemSelect="select2">
										<ItemGradeColor part={selectItem2.game.part} grade={gameData.itemGrade.txt_e[selectItem2.save.grade].toLowerCase()} sealed={selectItem2.save.sealed} size="50" onClick={() => {
											if (shopType === 'shop') {
												handlePopup({
													saveItemData: selectItem2.save,
													itemType: (selectTab < 3 ? 'equip' : 'hequip'),
													itemIdx: selectItem2.idx,
												});
											} else {
												handlePopup({
													saveItemData: selectItem2.save,
													itemType: 'hequip',
													itemIdx: selectItem2.idx,
												});
											}
										}}>
											<ItemPic type="equip" className={`item favorite${selectItem2.save.favorite}`}>
												<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[selectItem2.game.display], selectItem2.save.color, selectItem2.save.svgColor ||selectItem2.save.id)}}></svg>
											</ItemPic>
										</ItemGradeColor>
										<div flex-h="true" style={{flex: 1,}}>
											<ItemCont color={gameData.itemGrade.color[selectItem2.save.grade]}>
												<div className="item_top">
													<span className="item_grade">{lang === 'ko' ? gameData.itemGrade.txt_k[selectItem2.save.grade] : gameData.itemGrade.txt_e[selectItem2.save.grade]}</span> <span className="item_type">{gameData.itemType[selectItem2.game.part][lang]}</span>
												</div>
												<div className="item_description" dangerouslySetInnerHTML={{__html: `"${selectItem2.game.txt[lang]}"`}}></div>
												<div className="item_kg">{selectItem2.game.kg}kg</div>
											</ItemCont>
										</div>
									</ItemFix>
									<div className="scroll-y">
										{(selectItem2.save.markNum > 0 || selectItem2.save.hole.length > 0) && <ItemList type="typeSlot" className="item_list">
											<div className="item_type">
												<MarkPic length={selectItem2.save.markNum} pic="animalType" idx={selectItem2.save.mark} />
											</div>
											<div className="item_slot">
												{selectItem2.save.hole.map((holeData, idx) => {
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
											{util.getTotalEff(selectItem2.save, gameData).map((eff, idx) => {
												return (
													<div key={idx} className="item_effs"><span className="cate">{util.getEffectType(eff.type, lang)}</span>{eff.base > 0 && <span className="base">{eff.base}</span>}{eff.add > 0 && <span className="add">{eff.add}</span>}{eff.hole > 0 && <span className="hole">{eff.hole}</span>}<span className="total">{selectItem2.save.sealed ? eff.base : eff.base + eff.add + eff.hole}</span></div>
												)
											})}
										</ItemList>
										<div style={{width:"100%"}} className="scroll-y">
											{selectItem2.save.baseEff.length > 0 && (
												<ItemList className="item_list">
													<div className="item_title">{gameData.msg.itemInfo.basicEffect[lang]}</div>
													{selectItem2.save.baseEff.map((data, idx) => {
														const grade = selectItem2.save.grade > 3 ? 3 : selectItem2.save.grade - 1;
														return (
															<div key={idx} className="item_effs">{`${util.getEffectType(data.type, lang)} ${selectItem2.save.sealed ? data.num : data.num[grade]}`}</div>
														) 
													})}
												</ItemList>
											)}
											{selectItem2.save.addEff.length > 0 && (
												<ItemList className="item_list">
													<div className="item_title">{gameData.msg.itemInfo.addEffect[lang]}</div>
													{selectItem2.save.addEff.map((data, idx) => {
														const grade = selectItem2.save.grade > 3 ? 3 : selectItem2.save.grade - 1;
														return (
															<div key={idx} className="item_effs add">{`${util.getEffectType(data.type, lang)} ${data.num[0]}`}</div>
														) 
													})}
												</ItemList>
											)}
											{selectItem2.game.set !== 0 && (<ItemList type="set" className="item_list">
												<div className="item_setNa">{gameData.items.set_type[selectItem2.game.set].na}</div>
											</ItemList>
											)}
										</div>
									</div>
								</>
							)}
							{selectItem2.bottomType === 'hole' && (
								<>
									<ItemHeader frameBack={imgSet.etc.frameChBack} color={gameData.itemGrade.color[selectItem2.save.grade]} flex-center="true">
										<span className="item_name" dangerouslySetInnerHTML={{__html: `${selectItem2.game.na[lang]}`}}></span>
									</ItemHeader>
									<ItemFix itemSelect="select1">
										<ItemGradeColor grade={gameData.itemGrade.txt_e[selectItem2.save.grade || selectItem2.game.grade].toLowerCase()} size="50" onClick={() => {
											handlePopup({
												saveItemData: selectItem2.save,
												itemType: 'hole',
												itemIdx: selectItem2.idx,
											});
										}}>
											<ItemPic pic="itemEtc" type={selectItem2.bottomType} idx={selectItem2.game.display} />
										</ItemGradeColor>
										<div flex-h="true" style={{flex: 1,}}>
											<ItemCont color={gameData.itemGrade.color[selectItem2.save.grade]}>
												<div className="item_top">
													<span className="item_grade">{lang === 'ko' ? gameData.itemGrade.txt_k[selectItem2.save.grade] : gameData.itemGrade.txt_e[selectItem2.save.grade]}</span>
												</div>
												<div className="item_description" dangerouslySetInnerHTML={{__html: `"${selectItem2.game.txt[lang]}"`}}></div>
												<div className="item_kg">{selectItem2.game.kg}kg</div>
											</ItemCont>
										</div>
									</ItemFix>
									{selectItem2.game.idx < 100 && (
										<div className="scroll-y">
											<ItemList className="item_list">
												<div className="item_title">{gameData.msg.itemInfo.itemEffect[lang]}</div>
												{util.getTotalEff(selectItem2.save, gameData).map((eff, idx) => {
													return (
														<div key={idx} className="item_effs"><span className="cate">{util.getEffectType(eff.type, lang)}</span>{eff.base > 0 && <span className="base">{eff.base}</span>}{eff.add > 0 && <span className="add">{eff.add}</span>}{eff.hole > 0 && <span className="hole">{eff.hole}</span>}<span className="total">{selectItem2.save.sealed ? eff.base : eff.base + eff.add + eff.hole}</span></div>
													)
												})}
											</ItemList>
										</div>
									)}
								</>
							)}
							{selectItem2.bottomType === 'etc' && (
								<>
									<ItemHeader frameBack={imgSet.etc.frameChBack} color={gameData.itemGrade.color[selectItem2.save.grade]} flex-center="true">
										<span className="item_name" dangerouslySetInnerHTML={{__html: `${selectItem2.game.na[lang]}`}}></span>
									</ItemHeader>
									<ItemFix itemSelect="select1">
										<ItemGradeColor grade={gameData.itemGrade.txt_e[selectItem2.save.grade || selectItem2.game.grade].toLowerCase()} size="50" onClick={() => {
											handlePopup({
												saveItemData: selectItem2.save,
												itemType: typeList[selectTab].na,
												itemIdx: selectItem2.idx,
											});
										}}>
											<ItemPic pic="itemEtc" type={typeList[selectTab].na} idx={selectItem2.game.display} />
										</ItemGradeColor>
										<div flex-h="true" style={{flex: 1,}}>
											<ItemCont color={gameData.itemGrade.color[selectItem2.save.grade]}>
												<div className="item_top">
													<span className="item_grade">{lang === 'ko' ? gameData.itemGrade.txt_k[selectItem2.save.grade] : gameData.itemGrade.txt_e[selectItem2.save.grade]}</span>
												</div>
												<div className="item_description" dangerouslySetInnerHTML={{__html: `"${selectItem2.game.txt[lang]}"`}}></div>
												<div className="item_kg">{selectItem2.game.kg}kg</div>
											</ItemCont>
										</div>
									</ItemFix>
									<div className="scroll-y">
										<li className="item_list item_eff">
											<div className="item_title">
												{selectItem2.game.txt[lang]}
											</div>
										</li>
									</div>
								</>
							)}
							<ItemFooter itemSelect="select2">
								{selectItem2.buttonType[0] === 'buy' ? (
									<div className="item_price"><span>{gameData.msg.itemInfo.buyPrice[lang]}</span><em>{`₩${util.comma((selectItem2.game.price < 1000 ? 1000 : selectItem2.game.price) * 2 * selectItem2.save.grade)}`}</em></div>
								) : (
									<div className="item_price"><span>{gameData.msg.itemInfo.sellPrice[lang]}</span><em>{`₩${util.comma(selectItem2.game.price * (selectItem2.game.grade || selectItem2.save.grade))}`}</em></div>
								)}
								<div className="item_button" flex="true">
									{selectItem2.buttonType.map((button, idx) => {
										switch(button) {
											case 'buy':
												return (
													<button key={`button${idx}`} text="true" className="button_small" onClick={(e) => {
														let saveD = {...sData};
														if (saveD.ch[actionCh.idx].actionPoint >= gameData.actionPoint.itemBuy) {//행동력 지불
															saveD.ch[actionCh.idx].actionPoint -= gameData.actionPoint.itemBuy;
															saveD.city[cityIdx].stickerShop[typeList[selectItem2.selectTab].na].splice(selectItem1.select, 1);
															util.buttonEvent({
																event: e,
																type: 'itemBuy',
																data: {
																	slotIdx: 0,
																	gameItem: selectItem2.game,
																	saveItemData: selectItem2.save,
																	type: shopType === 'shop' ? 'equip' : typeList[selectTab].na,
																},
																saveData: saveD,
																changeSaveData: changeSaveData,
																gameData: gameData,
																msgText: setMsg,
																showMsg: setMsgOn,
																showPopup: setPopupOn,
																lang: lang,
															});
															setSelectItem2({save:{},game:{},select:'',selectTab:'',bottomType:'',buttonType:[]});
														} else {
															setMsgOn(true);
															setMsg(gameData.msg.sentenceFn.lackActionPoint(lang, gameData.ch[saveD.ch[actionCh.idx].idx].na1));
														}
													}} data-buttontype="itemRelease">{gameData.msg.button.buy[lang]}</button>
												);
											case 'sell':
												return (
													<button key={`button${idx}`} text="true" className="button_small" onClick={(e) => {
														let saveD = {...sData};
														// if (saveD.ch[actionCh.idx].actionPoint >= gameData.actionPoint.itemSell) {//행동력 지불
														// 	saveD.ch[actionCh.idx].actionPoint -= gameData.actionPoint.itemSell;
															util.buttonEvent({
																event: e,
																type: 'itemSell',
																data: {
																	slotIdx: 0,
																	gameItem: selectItem2.game,
																	itemSaveSlot:selectItem2.select,
																	type: shopType === 'shop' ? 'equip' : typeList[selectTab].na,
																},
																saveData: saveD,
																changeSaveData: changeSaveData,
																gameData: gameData,
																msgText: setMsg,
																showMsg: setMsgOn,
																showPopup: setPopupOn,
																lang: lang,
															});
															setSelectItem2({save:{},game:{},select:'',selectTab:'',bottomType:'',buttonType:[]});
														// } else {
														// 	setMsgOn(true);
														// 	setMsg(gameData.msg.sentenceFn.lackActionPoint(lang, gameData.ch[saveD.ch[actionCh.idx].idx].na1));
														// }
													}} data-buttontype="itemSell">{gameData.msg.button.sell[lang]}</button>
												);
											case "evaluate":
												return (
													<button key={`button${idx}`} text="true" className="button_small" onClick={(e) => {
														util.buttonEvent({
															event: e,
															type: 'itemEvaluate',
															data: {
																slotIdx:0,
																gameItem:selectItem2.game,
																itemSaveSlot:selectItem2.select,
																saveItemData:saveData.items.equip[selectItem2.select],
																type:'hequip',
															},
															saveData: saveData,
															changeSaveData: changeSaveData,
															gameData: gameData,
															msgText: setMsg,
															showMsg: setMsgOn,
															showPopup: setPopupOn,
															lang: lang,
														});
														setSelectItem2({save:{},game:{},select:'',selectTab:'',bottomType:'',buttonType:[]});
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
																gameItem: selectItem2.game,
																itemSaveSlot:selectItem2.select,
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
														setSelectItem2({save:{},game:{},select:'',selectTab:'',bottomType:'',buttonType:[]});
													}} data-buttontype="itemUse">{gameData.msg.button.use[lang]}</button>
												)
											default:
												break;
										}
									})}
								</div>
							</ItemFooter>
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

export default StickerShop;
