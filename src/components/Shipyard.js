import { AppContext } from 'App';
import { util } from 'components/Libs';
import Modal from 'components/Modal';
import ModalContainer from 'components/ModalContainer';
import React, { useContext, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import 'css/ship.css';

const Img = styled.img.attrs(
  ({imgurl}) => ({
    src: imgurl 
  })
)``;
const ShipWrap = styled.div`
	background:url(${({backImg}) => backImg});background-size:cover;
`;
const MenuButton = styled.button``;
const ShipIcon = styled.span`
	background:url(${({ icoType }) => icoType}) no-repeat left center;background-size:100%;
`;
const ItemContainer = styled.ul`
  border:5px solid transparent;
  border-image:url(${({frameBack}) => frameBack}) 5 round;
	&.on{
		outline:5px solid #000;
	}
  .item_header{border:5px solid transparent;
  border-image:url(${({frameBack}) => frameBack}) 5 round;
  }
  .item_name{color:${({ color }) => color};text-shadow:-1px -1px 1px rgba(255,255,255,.5), 1px 1px 1px #000;}
`;
const ItemPic2 = styled.div`
  &:after{background-image:url(${({itemPic}) => itemPic});background-size:100%;background-repeat:no-repeat;}
`;
const ItemPic = styled.div`
  display:inline-block;width:100%;height:100%;background-image:url(${({itemPic}) => itemPic});background-size:100%;background-repeat:no-repeat;
`;
const ItemName = styled.div`
  .item_grade{color:${({ color }) => color};}
`;
const ShipOption = styled.div`
	width:50px;height:50px;border:2px solid #f00;
`;
const shipList = [
	{na:'produce',icon:"iconAccessory"},
	{na:'used',icon:"iconUpgrade"},
	{na:'possessed',icon:"iconEtc"},
];
const makeMark = (markNum, img) => {
  let markTag = '';
  for (let i = 0; i < markNum; ++i) {
    markTag += `<span><img src="${img}" class="light"/><img src="${img}" class="front"/><img src="${img}" class="shadow"/></span>`
  }
  return markTag;
}
const Shipyard = ({
	cityIdx,
	saveData,
	changeSaveData,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
	const setting = useContext(AppContext).setting,
		gameSpd = setting.speed,
		lang = setting.lang;
	const gameItem = gameData.items;
  const [modalOn, setModalOn] = useState(false);
	const [modalInfo, setModalInfo] = useState({});
  const [modalType, setModalType] = useState();
  const [popupOn, setPopupOn] = useState(false);
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");
	const [selectTab, setSelectTab] = useState(0);
	const [item, setItem] = useState([[],[],[],[]]);
	const [selectArea, setSelectArea] = useState('area1');
	const [selectShip, setSelectShip] = useState({shipIdx:9,wood:1});
	const [selectItem1, setSelectItem1] = useState({save:{},game:{},select:'',selectTab:'',buttonType:[]});
	const [selectItem2, setSelectItem2] = useState({save:{},game:{},select:'',selectTab:'',buttonType:[]});
	useEffect(() => {
	}, []);
	useEffect(() => {
		if (Object.keys(saveData).length !== 0) {
			const cityData = saveData.city[cityIdx];
			const items = [
				[...cityData.shipyard.ship],
				[...cityData.shipyard.wood],
				[...cityData.shipyard.sail],
				[...cityData.shipyard.figure],
				[[...saveData.items.equip],[...saveData.items.upgrade],[...saveData.items.etc]],
			];
			setItem(items);
		}
	}, [saveData]);
	useEffect(() => {
	}, [cityIdx])
  return (
		<>
			<ShipWrap className="wrap" backImg={imgSet.back[2]} >
				<div className="tab_menu transition">
					{shipList && shipList.map((data, idx) => {
						return (
							<li key={idx} className={idx === selectTab ? "on" : ""} onClick={() => {
								setSelectTab(idx);
							}}>
								<MenuButton className="tab_menu_button">
									<span className="name">{gameData.msg.menu[data.na][lang]}</span>
									<ShipIcon className="icon" icoType={imgSet.icon[data.icon]} />
								</MenuButton>
							</li>
						);
					})}
				</div>
				<div className="ship_area">
					<div className="ship_top">
						{shipList[selectTab].na === 'produce' && (
							<>
								<div className="ship_display select_size">
									<svg xmlns="http://www.w3.org/2000/svg" width="320px" height="600px" viewBox="0 0 320 600" dangerouslySetInnerHTML={{__html: util.setShipColor(gameData.shipSvg[selectShip.shipIdx], imgSet.wood[selectShip.wood], gameData.ships.woodColor[gameData.ships.wood[selectShip.wood].woodColor], Math.random().toString(36).substring(2, 11), [gameData.sailSvg[`${selectShip.shipIdx}_5_1`], gameData.sailSvg[`${selectShip.shipIdx}_5_2`], gameData.sailSvg[`${selectShip.shipIdx}_5_3`]], '#fff')}}></svg>
								</div>
								<div className="ship_option_container" flex-h-center="true">
									<ShipOption className="ship_option ship_size"></ShipOption>
									<ShipOption className="ship_option ship_sail"></ShipOption>
									<ShipOption className="ship_option ship_wood"></ShipOption>
									<ShipOption className="ship_option ship_figure"></ShipOption>
									<ShipOption className="ship_option ship_canon"></ShipOption>
									<ShipOption className="ship_option ship_anchor"></ShipOption>
								</div>
							</>
						)}
						{item[selectTab].map((data, idx) => {
							const cate = shipList[selectTab].na;
							if (cate === 'accessory') {
								const itemsGrade = data.grade < 5 ? 0 : data.grade - 5;
								const items = gameItem.equip[data.part][0][itemsGrade][data.idx];
								const itemsHole = data.hole;
								return (
									<div className={`item_layout ${gameData.itemGrade.txt_e[data.grade].toLowerCase()} ${selectItem1.selectTab === shipList[selectTab].na && selectItem1.select === idx ? 'select1' : ''} ${selectItem2.selectTab === shipList[selectTab].na && selectItem2.select === idx ? 'select2' : ''} favorite${data.favorite}`} key={`items${idx}`} onClick={() => {
										const itemSelect = {...item[selectTab][idx]};
										const itemsGrade = itemSelect.grade < 5 ? 0 : itemSelect.grade - 5;
										const items = gameItem.equip[itemSelect.part][0][itemsGrade][itemSelect.idx];
										if (selectArea === 'area2') {
											if (selectItem1.save && (Object.entries(data).toString() === Object.entries(selectItem1.save).toString())) {
												setSelectItem1({save:[],game:[],buttonType:[],selectTab:'',select:''});
											}
											let button = ['buy'];
											if (selectItem1.select !== '' && selectItem1.selectTab === selectTab && selectItem1.select === idx) {
												setSelectItem1({save:{},game:{},select:'',selectTab:'',buttonType:[]});
											}
											setSelectItem2({
												save:itemSelect,
												game:items,
												select:idx,
												selectTab:'accessory',
												buttonType:button,
											});
										} else {
											if (selectItem2.save && (Object.entries(data).toString() === Object.entries(selectItem2.save).toString())) {
												setSelectItem2({save:[],game:[],buttonType:[],selectTab:'',select:''});
											}
											let button = ['buy'];
											if (selectItem2.select !== '' && selectItem2.selectTab === selectTab && selectItem2.select === idx) {
												setSelectItem2({save:{},game:{},select:'',selectTab:'',buttonType:[]});
											}
											setSelectItem1({
												save:itemSelect,
												game:items,
												select:idx,
												selectTab:'accessory',
												buttonType:button,
											});
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
														<ItemPic className="pic" itemPic={imgSet.itemHole[holePic]} />
													</span>
												);
											})}
										</span>
									</div>
								)
							} else if (cate === 'upgrade' || cate === 'etc') {
								const items = gameItem[shipList[selectTab].na][data.idx];
								const grade = data.grade || items.grade;
								return (
									<div className={`item_layout ${gameData.itemGrade.txt_e[grade].toLowerCase()} ${selectItem1.selectTab === shipList[selectTab].na && selectItem1.select === idx ? 'select1' : ''} ${selectItem2.selectTab === shipList[selectTab].na && selectItem2.select === idx ? 'select2' : ''}`} key={`items${idx}`} onClick={() => {
										if (selectArea === 'area2') {
											if (selectItem1.save && (Object.entries(data).toString() === Object.entries(selectItem1.save).toString())) {
												setSelectItem1({save:[],game:[],buttonType:[],selectTab:'',select:''});
											}
											let button = ['buy'];
											if (selectItem1.select !== '' && selectItem1.selectTab === shipList[selectTab].na && selectItem1.select === idx) {
												setSelectItem1({save:{},game:{},select:'',selectTab:'',buttonType:[]});
											}
											setSelectItem2({
												save:data,
												game:items,
												select:idx,
												selectTab:cate,
												buttonType:button,
											});
										} else {
											if (selectItem2.save && (Object.entries(data).toString() === Object.entries(selectItem2.save).toString())) {
												setSelectItem2({save:[],game:[],buttonType:[],selectTab:'',select:''});
											}
											let button = ['buy'];
											if (selectItem2.select !== '' && selectItem2.selectTab === shipList[selectTab].na && selectItem2.select === idx) {
												setSelectItem2({save:{},game:{},select:'',selectTab:'',buttonType:[]});
											}
											setSelectItem1({
												save:data,
												game:items,
												select:idx,
												selectTab:cate,
												buttonType:button,
											});
										}
									}}>
										<ItemPic className="pic" itemPic={imgSet[`item${shipList[selectTab].na.replace(/^[a-z]/, char => char.toUpperCase())}`][items.display]} >
										{cate === 'etc' ? items.displayText && <span className="display_text">{items.displayText}</span> : ''}
										</ItemPic>
									</div>
								)
							} else if (cate === 'inven') {
								return data.map((invenData, invenIdx) => {
									if (idx === 0) {
										if (invenData.part === 4 || invenData.part === 5) {
											const itemsGrade = invenData.grade < 5 ? 0 : invenData.grade - 5;
											const items = gameItem.equip[invenData.part][0][itemsGrade][invenData.idx];
											const itemsHole = invenData.hole;
											const selectTab1 = selectItem1.selectTab.indexOf('inven') >= 0 ? 'accessory inven' : shipList[selectTab].na,
												selectTab2 = selectItem2.selectTab.indexOf('inven') >= 0 ? 'accessory inven' : shipList[selectTab].na;
											return (
												<div className={`item_layout ${gameData.itemGrade.txt_e[invenData.grade].toLowerCase()} ${selectItem1.selectTab === selectTab1 && selectItem1.select === invenIdx ? 'select1' : ''} ${selectItem2.selectTab === selectTab2 && selectItem2.select === invenIdx ? 'select2' : ''} favorite${invenData.favorite}`} key={`items${idx}`} onClick={() => {
													const itemSelect = {...item[selectTab][idx][invenIdx]};
													const itemsGrade = itemSelect.grade < 5 ? 0 : itemSelect.grade - 5;
													const items = gameItem.equip[itemSelect.part][0][itemsGrade][itemSelect.idx];
													if (selectArea === 'area2') {
														if (selectItem1.save && (Object.entries(invenData).toString() === Object.entries(selectItem1.save).toString())) {
															setSelectItem1({save:[],game:[],buttonType:[],selectTab:'',select:''});
														}
														let button = ['sell'];
														if (selectItem1.select !== '' && selectItem1.selectTab === selectTab && selectItem1.select === idx) {
															setSelectItem1({save:{},game:{},select:'',selectTab:'',buttonType:[]});
														}
														setSelectItem2({
															save:itemSelect,
															game:items,
															select:invenIdx,
															selectTab:'accessory inven',
															buttonType:button,
														});
													} else {
														if (selectItem2.save && (Object.entries(invenData).toString() === Object.entries(selectItem2.save).toString())) {
															setSelectItem2({save:[],game:[],buttonType:[],selectTab:'',select:''});
														}
														let button = ['sell'];
														if (selectItem2.select !== '' && selectItem2.selectTab === selectTab && selectItem2.select === idx) {
															setSelectItem2({save:{},game:{},select:'',selectTab:'',buttonType:[]});
														}
														setSelectItem1({
															save:itemSelect,
															game:items,
															select:invenIdx,
															selectTab:'accessory inven',
															buttonType:button,
														});
													}
												}}>
													<span className={`pic ${invenData.sealed ? "sealed" : ""}`}>
														<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[items.display], invenData.color, invenData.svgColor || invenData.id)}}>
														</svg>
													</span>
													<span className="hole" flex-center="true">
														{itemsHole.map((holeData, holeidx) => {
															const holePic = holeData !== 0 ? gameItem.hole[holeData.idx].display : 0;
															return (
																<span className={`hole_slot hole${holeidx} ${holePic !== 0 ? 'fixed': ''}`} key={`hole${holeidx}`}>
																	<ItemPic className="pic" itemPic={imgSet.itemHole[holePic]} />
																</span>
															);
														})}
													</span>
												</div>
											)
										}
									} else {
										const cate_ = idx === 1 ? 'upgrade' : 'etc';
										const items = gameItem[cate_][invenData.idx];
										const grade = invenData.grade || items.grade;
										const selectTab1 = selectItem1.selectTab.indexOf('inven') >= 0 ? `${cate_} inven` : shipList[selectTab].na,
												selectTab2 = selectItem2.selectTab.indexOf('inven') >= 0 ? `${cate_} inven` : shipList[selectTab].na;
										return (
											<div className={`item_layout ${gameData.itemGrade.txt_e[grade].toLowerCase()} ${selectItem1.selectTab === selectTab1 && selectItem1.select === invenIdx ? 'select1' : ''} ${selectItem2.selectTab === selectTab2 && selectItem2.select === invenIdx ? 'select2' : ''}`} key={`items_inven${invenIdx}`} onClick={() => {
												if (selectArea === 'area2') {
													if (selectItem1.save && (Object.entries(invenData).toString() === Object.entries(selectItem1.save).toString())) {
														setSelectItem1({save:[],game:[],buttonType:[],selectTab:'',select:''});
													}
													let button = ['sell'];
													if (selectItem1.select !== '' && selectItem1.selectTab === shipList[selectTab].na && selectItem1.select === idx) {
														setSelectItem1({save:{},game:{},select:'',selectTab:'',buttonType:[]});
													}
													setSelectItem2({
														save:invenData,
														game:items,
														select:invenIdx,
														selectTab:`${cate_} inven`,
														buttonType:button,
													});
												} else {
													if (selectItem2.save && (Object.entries(invenData).toString() === Object.entries(selectItem2.save).toString())) {
														setSelectItem2({save:[],game:[],buttonType:[],selectTab:'',select:''});
													}
													let button = ['sell'];
													if (selectItem2.select !== '' && selectItem2.selectTab === shipList[selectTab].na && selectItem2.select === idx) {
														setSelectItem2({save:{},game:{},select:'',selectTab:'',buttonType:[]});
													}
													setSelectItem1({
														save:invenData,
														game:items,
														select:invenIdx,
														selectTab:`${cate_} inven`,
														buttonType:button,
													});
												}
											}}>
												<ItemPic className="pic" itemPic={imgSet[`item${cate_.replace(/^[a-z]/, char => char.toUpperCase())}`][items.display]}>
												{cate_ === 'etc' ? items.displayText && <span className="display_text">{items.displayText}</span> : ''}
												</ItemPic>
											</div>
										)
									}
								});
							}
						})}
					</div>
					<div className="ship_bottom">
						{Object.keys(selectItem1.save).length !== 0 ? (
							<ItemContainer className={`item_select item_select1 items ${selectArea === "area1" ? "on" : ""}`} color={gameData.itemGrade.color[selectItem1.save.grade]} onClick={() => {
								setSelectArea('area1');
							}}>
								{selectItem1.selectTab.indexOf('accessory') >= 0 && (
									<>
										<li className="item_header" flex-center="true"><span className="item_name" dangerouslySetInnerHTML={{__html: `${selectItem1.save.colorantSet ? util.getColorant(selectItem1.save.colorantSet, gameData).na[lang] : ''} ${selectItem1.save.modifier[lang]} ${selectItem1.game.na[lang]}`}}></span></li>
										<li className="item_fix" flex="true">
											<ItemPic2 className={`item item${selectItem1.game.part} ${gameData.itemGrade.txt_e[selectItem1.save.grade].toLowerCase()} ${selectItem1.save.sealed ? "sealed" : ""} favorite${selectItem1.save.favorite}`}>
												<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[selectItem1.game.display], selectItem1.save.color, selectItem1.save.svgColor || selectItem1.save.id)}}></svg>
											</ItemPic2>
											<div flex-h="true" style={{flex: 1,}}>
												<ItemName className="item_cont" color={gameData.itemGrade.color[selectItem1.save.grade]}>
													<div className="item_top">
														<span className="item_grade">{lang === 'ko' ? gameData.itemGrade.txt_k[selectItem1.save.grade] : gameData.itemGrade.txt_e[selectItem1.save.grade]}</span> <span className="item_type">{gameData.itemType[selectItem1.game.part][lang]}</span>
													</div>
													<div className="item_description" dangerouslySetInnerHTML={{__html: `"${selectItem1.game.txt[lang]}"`}}></div>
													<div className="item_kg">{selectItem1.game.kg}kg</div>
												</ItemName>
											</div>
										</li>
										<div className="scroll-y">
											<li className="item_list item_typeSlot">
												<div className="item_type" dangerouslySetInnerHTML={{__html: makeMark(selectItem1.save.markNum, imgSet.animalType[selectItem1.save.mark])}}>
												</div>
												<div className="item_slot">
													{selectItem1.save.hole.map((holeData, idx) => {
														const holePic = holeData !== 0 ? gameItem.hole[holeData.idx].display : 0;
														return (
															<div key={`hole${idx}`} className={`item_holes ${holePic !== 0 ? 'fixed': ''}`}><span className="item_holeback"><Img imgurl={imgSet.itemHole[holePic]} /></span></div>
														)
													})}
												</div>
											</li>
											<li className="item_list item_eff">
												<div className="item_title">{gameData.msg.itemInfo.itemEffect[lang]}</div>
												{util.getTotalEff(selectItem1.save, gameData).map((eff, idx) => {
													return (
														<div key={idx} className="item_effs"><span className="cate">{util.getEffectType(eff.type, lang)}</span>{eff.base > 0 && <span className="base">{eff.base}</span>}{eff.add > 0 && <span className="add">{eff.add}</span>}{eff.hole > 0 && <span className="hole">{eff.hole}</span>}<span className="total">{selectItem1.save.sealed ? eff.base : eff.base + eff.add + eff.hole}</span></div>
													)
												})}
											</li>
											<div style={{width:"100%"}} className="scroll-y">
												{selectItem1.save.baseEff.length > 0 && (
													<li className="item_list item_eff">
														<div className="item_title">{gameData.msg.itemInfo.basicEffect[lang]}</div>
														{selectItem1.save.baseEff.map((data, idx) => {
															const grade = selectItem1.save.grade > 3 ? 3 : selectItem1.save.grade - 1;
															return (
																<div key={idx} className="item_effs">{`${util.getEffectType(data.type, lang)} ${selectItem1.save.sealed ? data.num : data.num[grade]}`}</div>
															) 
														})}
													</li>
												)}
												{selectItem1.save.addEff.length > 0 && (
													<li className="item_list item_eff">
														<div className="item_title">{gameData.msg.itemInfo.addEffect[lang]}</div>
														{selectItem1.save.addEff.map((data, idx) => {
															const grade = selectItem1.save.grade > 3 ? 3 : selectItem1.save.grade - 1;
															return (
																<div key={idx} className="item_effs add">{`${util.getEffectType(data.type, lang)} ${data.num[0]}`}</div>
															) 
														})}
													</li>
												)}
												{selectItem1.game.set !== 0 && (<li className="item_list item_set">
													<div className="item_setNa">{gameData.items.set_type[selectItem1.game.set].na}</div>
												</li>
												)}
											</div>
										</div>
										<li className="item_footer" flex-v="true">
											{selectItem1.buttonType.map((button, idx) => {
												switch(button) {
													case 'buy':
														return (
															<div key={`button${idx}`}>
																<div className="item_price"><span>{gameData.msg.itemInfo.buyPrice[lang]}</span><em>{`₩${(selectItem1.game.price < 1000 ? 1000 : selectItem1.game.price) * 2 * selectItem1.save.grade}`}</em></div>
																<div className="item_button" flex="true">
																	<button text="true" className="button_small" onClick={(e) => {
																		let saveD = {...saveData};
																		saveD.city[cityIdx].toolShop.accessory.splice(selectItem1.select, 1);
																		util.buttonEvent({
																			event: e,
																			type: 'itemBuy',
																			data: {
																				slotIdx: 0,
																				gameItem: selectItem1.game,
																				saveItemData: selectItem1.save,
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
																		setSelectItem1({save:{},game:{},select:'',selectTab:'',buttonType:[]});
																	}} data-buttontype="itemBuy">{gameData.msg.button.buy[lang]}</button>
																</div>
															</div>
														)
													case 'sell':
														return (
															<div key={`button${idx}`}>
																<div className="item_price"><span>{gameData.msg.itemInfo.sellPrice[lang]}</span><em>{`₩${selectItem1.game.price * (selectItem1.game.grade || selectItem1.save.grade)}`}</em></div>
																<div className="item_button" flex="true">
																	<button text="true" className="button_small" onClick={(e) => {
																		util.buttonEvent({
																			event: e,
																			type: 'itemSell',
																			data: {
																				slotIdx: 0,
																				gameItem: selectItem1.game,
																				itemSaveSlot:selectItem1.select,
																				type: 'equip',
																			},
																			saveData: saveData,
																			changeSaveData: changeSaveData,
																			gameData: gameData,
																			msgText: setMsg,
																			showMsg: setMsgOn,
																			showPopup: setPopupOn,
																			lang: lang,
																		});
																		setSelectItem1({save:{},game:{},select:'',selectTab:'',buttonType:[]});
																	}} data-buttontype="itemSell">{gameData.msg.button.sell[lang]}</button>
																</div>
															</div>
														)
													default:
														break;
												}
											})}
										</li>
									</>
								)}
								{(selectItem1.selectTab.indexOf('upgrade') >= 0 || selectItem1.selectTab.indexOf('etc') >= 0) && (
									<>
										<li className="item_header" flex-center="true"><span className="item_name" dangerouslySetInnerHTML={{__html: `${selectItem1.game.na[lang]}`}}></span></li>
										<li className="item_fix" flex="true">
											<div className={`item ${gameData.itemGrade.txt_e[selectItem1.save.grade || selectItem1.game.grade].toLowerCase()}`}>
												<ItemPic className="pic" itemPic={imgSet[`item${selectItem1.selectTab.split(' inven')[0].replace(/^[a-z]/, char => char.toUpperCase())}`][selectItem1.game.display]} />
											</div>
											<div flex-h="true" style={{flex: 1,}}>
												<ItemName className="item_cont" color={gameData.itemGrade.color[selectItem1.save.grade]}>
													<div className="item_top">
														<span className="item_grade">{lang === 'ko' ? gameData.itemGrade.txt_k[selectItem1.save.grade] : gameData.itemGrade.txt_e[selectItem1.save.grade]}</span>
													</div>
													<div className="item_description" dangerouslySetInnerHTML={{__html: `"${selectItem1.game.txt[lang]}"`}}></div>
													<div className="item_kg">{selectItem1.game.kg}kg</div>
												</ItemName>
											</div>
										</li>
										<div className="scroll-y">
											<li className="item_list item_eff">
												<div className="item_title">
													{selectItem1.game.txt[lang]}
												</div>
											</li>
										</div>
										<li className="item_footer" flex-v="true">
											{selectItem1.buttonType.map((button, idx) => {
												switch(button) {
													case 'buy':
														return (
															<div key={`button${idx}`}>
																<div className="item_price"><span>{gameData.msg.itemInfo.buyPrice[lang]}</span><em>{`₩${(selectItem1.game.price < 1000 ? 1000 : selectItem1.game.price) * 2}`}</em></div>
																<div className="item_button" flex="true">
																	<button text="true" className="button_small" onClick={(e) => {
																		util.buttonEvent({
																			event: e,
																			type: 'itemBuy',
																			data: {
																				slotIdx: 0,
																				gameItem: selectItem1.game,
																				saveItemData: selectItem1.save,
																				type: 'equip',
																			},
																			saveData: saveData,
																			changeSaveData: changeSaveData,
																			gameData: gameData,
																			msgText: setMsg,
																			showMsg: setMsgOn,
																			showPopup: setPopupOn,
																			lang: lang,
																		});
																		setSelectItem1({save:{},game:{},select:'',selectTab:'',buttonType:[]});
																	}} data-buttontype="itemBuy">{gameData.msg.button.buy[lang]}</button>
																</div>
															</div>
														)
													case 'sell':
														return (
															<div key={`button${idx}`}>
																<div className="item_price"><span>{gameData.msg.itemInfo.sellPrice[lang]}</span><em>{`₩${selectItem1.game.price * (selectItem1.game.grade || selectItem1.save.grade)}`}</em></div>
																<div className="item_button" flex="true">
																	<button text="true" className="button_small" onClick={(e) => {
																		util.buttonEvent({
																			event: e,
																			type: 'itemSell',
																			data: {
																				slotIdx: 0,
																				gameItem: selectItem1.game,
																				itemSaveSlot:selectItem1.select,
																				type: 'equip',
																			},
																			saveData: saveData,
																			changeSaveData: changeSaveData,
																			gameData: gameData,
																			msgText: setMsg,
																			showMsg: setMsgOn,
																			showPopup: setPopupOn,
																			lang: lang,
																		});
																		setSelectItem1({save:{},game:{},select:'',selectTab:'',buttonType:[]});
																	}} data-buttontype="itemSell">{gameData.msg.button.sell[lang]}</button>
																</div>
															</div>
														)
													default:
														break;
												}
											})}
										</li>
									</>
								)}
							</ItemContainer>
						) : (
							<ItemContainer className={`item_select item_select1 items ${selectArea === "area1" ? "on" : ""}`} onClick={() => {
								setSelectArea('area1');
							}}></ItemContainer>
						)}
						{Object.keys(selectItem2.save).length !== 0 ? (
							<ItemContainer className={`item_select item_select2 items ${selectArea === "area2" ? "on" : ""}`} color={gameData.itemGrade.color[selectItem2.save.grade]} onClick={() => {
								setSelectArea('area2');
							}}>
								{selectItem2.selectTab.indexOf('accessory') >= 0 && (
									<>
										<li className="item_header" flex-center="true"><span className="item_name" dangerouslySetInnerHTML={{__html: `${selectItem2.save.modifier[lang]} ${selectItem2.game.na[lang]}`}}></span></li>
										<li className="item_fix" flex="true">
											<ItemPic2 className={`item item${selectItem2.game.part} ${gameData.itemGrade.txt_e[selectItem2.save.grade].toLowerCase()} ${selectItem2.save.sealed ? "sealed" : ""} favorite${selectItem2.save.favorite}`}>
												<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[selectItem2.game.display], selectItem2.save.color, selectItem2.save.svgColor ||selectItem2.save.id)}}></svg>
											</ItemPic2>
											<div flex-h="true" style={{flex: 1,}}>
												<ItemName className="item_cont" color={gameData.itemGrade.color[selectItem2.save.grade]}>
													<div className="item_top">
														<span className="item_grade">{lang === 'ko' ? gameData.itemGrade.txt_k[selectItem2.save.grade] : gameData.itemGrade.txt_e[selectItem2.save.grade]}</span> <span className="item_type">{gameData.itemType[selectItem2.game.part][lang]}</span>
													</div>
													<div className="item_description" dangerouslySetInnerHTML={{__html: `"${selectItem2.game.txt[lang]}"`}}></div>
													<div className="item_kg">{selectItem2.game.kg}kg</div>
												</ItemName>
											</div>
										</li>
										<div className="scroll-y">
											<li className="item_list item_typeSlot">
												<div className="item_type" dangerouslySetInnerHTML={{__html: makeMark(selectItem2.save.markNum, imgSet.animalType[selectItem2.save.mark])}}>
												</div>
												<div className="item_slot">
													{selectItem2.save.hole.map((holeData, idx) => {
														const holePic = holeData !== 0 ? gameItem.hole[holeData.idx].display : 0;
														return (
															<div key={`hole${idx}`} className={`item_holes ${holePic !== 0 ? 'fixed': ''}`}><span className="item_holeback"><Img imgurl={imgSet.itemHole[holePic]} /></span></div>
														)
													})}
												</div>
											</li>
											<li className="item_list item_eff">
												<div className="item_title">{gameData.msg.itemInfo.itemEffect[lang]}</div>
												{util.getTotalEff(selectItem2.save, gameData).map((eff, idx) => {
													return (
														<div key={idx} className="item_effs"><span className="cate">{util.getEffectType(eff.type, lang)}</span>{eff.base > 0 && <span className="base">{eff.base}</span>}{eff.add > 0 && <span className="add">{eff.add}</span>}{eff.hole > 0 && <span className="hole">{eff.hole}</span>}<span className="total">{selectItem2.save.sealed ? eff.base : eff.base + eff.add + eff.hole}</span></div>
													)
												})}
											</li>
											<div style={{width:"100%"}} className="scroll-y">
												{selectItem2.save.baseEff.length > 0 && (
													<li className="item_list item_eff">
														<div className="item_title">{gameData.msg.itemInfo.basicEffect[lang]}</div>
														{selectItem2.save.baseEff.map((data, idx) => {
															const grade = selectItem2.save.grade > 3 ? 3 : selectItem2.save.grade - 1;
															return (
																<div key={idx} className="item_effs">{`${util.getEffectType(data.type, lang)} ${selectItem2.save.sealed ? data.num : data.num[grade]}`}</div>
															) 
														})}
													</li>
												)}
												{selectItem2.save.addEff.length > 0 && (
													<li className="item_list item_eff">
														<div className="item_title">{gameData.msg.itemInfo.addEffect[lang]}</div>
														{selectItem2.save.addEff.map((data, idx) => {
															const grade = selectItem2.save.grade > 3 ? 3 : selectItem2.save.grade - 1;
															return (
																<div key={idx} className="item_effs add">{`${util.getEffectType(data.type, lang)} ${data.num[0]}`}</div>
															) 
														})}
													</li>
												)}
												{selectItem2.game.set !== 0 && (<li className="item_list item_set">
													<div className="item_setNa">{gameData.items.set_type[selectItem2.game.set].na}</div>
												</li>
												)}
											</div>
										</div>
										<li className="item_footer" flex-v="true">
											{selectItem2.buttonType.map((button, idx) => {
												switch(button) {
													case 'buy':
														return (
															<div key={`button${idx}`}>
																<div className="item_price"><span>{gameData.msg.itemInfo.buyPrice[lang]}</span><em>{`₩${(selectItem2.game.price < 1000 ? 1000 : selectItem2.game.price) * 2 * selectItem2.save.grade}`}</em></div>
																<div className="item_button" flex="true">
																	<button text="true" className="button_small" onClick={(e) => {
																		let item_ = [...item];
																		item_[0].splice(selectItem2.select, 1);
																		setItem(item_);
																		util.buttonEvent({
																			event: e,
																			type: 'itemBuy',
																			data: {
																				slotIdx: 0,
																				gameItem: selectItem2.game,
																				saveItemData: selectItem2.save,
																				type: 'equip',
																			},
																			saveData: saveData,
																			changeSaveData: changeSaveData,
																			gameData: gameData,
																			msgText: setMsg,
																			showMsg: setMsgOn,
																			showPopup: setPopupOn,
																			lang: lang,
																		});
																		setSelectItem2({save:{},game:{},select:'',selectTab:'',buttonType:[]});
																	}} data-buttontype="itemRelease">{gameData.msg.button.buy[lang]}</button>
																</div>
															</div>
														);
													case 'sell':
														return (
															<div key={`button${idx}`}>
																<div className="item_price"><span>{gameData.msg.itemInfo.sellPrice[lang]}</span><em>{`₩${selectItem2.game.price * (selectItem2.game.grade || selectItem2.save.grade)}`}</em></div>
																<div className="item_button" flex="true">
																	<button text="true" className="button_small" onClick={(e) => {
																		util.buttonEvent({
																			event: e,
																			type: 'itemSell',
																			data: {
																				slotIdx: 0,
																				gameItem: selectItem2.game,
																				itemSaveSlot:selectItem2.select,
																				type: 'equip',
																			},
																			saveData: saveData,
																			changeSaveData: changeSaveData,
																			gameData: gameData,
																			msgText: setMsg,
																			showMsg: setMsgOn,
																			showPopup: setPopupOn,
																			lang: lang,
																		});
																		setSelectItem2({save:{},game:{},select:'',selectTab:'',buttonType:[]});
																	}} data-buttontype="itemSell">{gameData.msg.button.sell[lang]}</button>
																</div>
															</div>
														);
													default:
														break;
												}
											})}
										</li>
									</>
								)}
								{(selectItem2.selectTab.indexOf('upgrade') >= 0 || selectItem2.selectTab.indexOf('etc') >= 0) && (
									<>
										<li className="item_header" flex-center="true"><span className="item_name" dangerouslySetInnerHTML={{__html: `${selectItem2.game.na[lang]}`}}></span></li>
										<li className="item_fix" flex="true">
											<div className={`item ${gameData.itemGrade.txt_e[selectItem2.save.grade || selectItem2.game.grade].toLowerCase()}`}>
												<ItemPic className="pic" itemPic={imgSet[`item${selectItem2.selectTab.split(' inven')[0].replace(/^[a-z]/, char => char.toUpperCase())}`][selectItem2.game.display]} />
											</div>
											<div flex-h="true" style={{flex: 1,}}>
												<ItemName className="item_cont" color={gameData.itemGrade.color[selectItem2.save.grade]}>
													<div className="item_top">
														<span className="item_grade">{lang === 'ko' ? gameData.itemGrade.txt_k[selectItem2.save.grade] : gameData.itemGrade.txt_e[selectItem2.save.grade]}</span>
													</div>
													<div className="item_description" dangerouslySetInnerHTML={{__html: `"${selectItem2.game.txt[lang]}"`}}></div>
													<div className="item_kg">{selectItem2.game.kg}kg</div>
												</ItemName>
											</div>
										</li>
										<div className="scroll-y">
											<li className="item_list item_eff">
												<div className="item_title">
													{selectItem2.game.txt[lang]}
												</div>
											</li>
										</div>
										<li className="item_footer" flex-v="true">
											{selectItem2.buttonType.map((button, idx) => {
												switch(button) {
													case 'buy':
														return (
															<div key={`button${idx}`}>
																<div className="item_price"><span>{gameData.msg.itemInfo.buyPrice[lang]}</span><em>{`₩${(selectItem2.game.price < 1000 ? 1000 : selectItem2.game.price) * 2}`}</em></div>
																<div className="item_button" flex="true">
																	<button text="true" className="button_small" onClick={(e) => {
																		util.buttonEvent({
																			event: e,
																			type: 'itemBuy',
																			data: {
																				slotIdx: 0,
																				gameItem: selectItem2.game,
																				saveItemData: selectItem2.save,
																				type: 'equip',
																			},
																			saveData: saveData,
																			changeSaveData: changeSaveData,
																			gameData: gameData,
																			msgText: setMsg,
																			showMsg: setMsgOn,
																			showPopup: setPopupOn,
																			lang: lang,
																		});
																		setSelectItem2({save:{},game:{},select:'',selectTab:'',buttonType:[]});
																	}} data-buttontype="itemRelease">{gameData.msg.button.buy[lang]}</button>
																</div>
															</div>
														);
													case 'sell':
														return (
															<div key={`button${idx}`}>
																<div className="item_price"><span>{gameData.msg.itemInfo.sellPrice[lang]}</span><em>{`₩${selectItem2.game.price * (selectItem2.game.grade || selectItem2.save.grade)}`}</em></div>
																<div className="item_button" flex="true">
																	<button text="true" className="button_small" onClick={(e) => {
																		util.buttonEvent({
																			event: e,
																			type: 'itemSell',
																			data: {
																				slotIdx: 0,
																				gameItem: selectItem2.game,
																				itemSaveSlot:selectItem2.select,
																				type: 'equip',
																			},
																			saveData: saveData,
																			changeSaveData: changeSaveData,
																			gameData: gameData,
																			msgText: setMsg,
																			showMsg: setMsgOn,
																			showPopup: setPopupOn,
																			lang: lang,
																		});
																		setSelectItem2({save:{},game:{},select:'',selectTab:'',buttonType:[]});
																	}} data-buttontype="itemSell">{gameData.msg.button.sell[lang]}</button>
																</div>
															</div>
														);
													default:
														break;
												}
											})}
										</li>
									</>
								)}
							</ItemContainer>
						) : (
							<ItemContainer className={`item_select item_select2 items ${selectArea === "area2" ? "on" : ""}`} onClick={() => {
								setSelectArea('area2');
							}}></ItemContainer>
						)}
					</div>
				</div>
			</ShipWrap>
			{/* <ModalContainer>
				{modalOn && <Modal fn={} type={modalType} dataObj={modalInfo} saveData={saveData} changeSaveData={changeSaveData} lang={lang} onClose={() => {handleModal()}} gameData={gameData}/>}
			</ModalContainer> */}
		</>
  );
}

export default Shipyard;
