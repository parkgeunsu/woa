import { AppContext } from 'App';
import { util } from 'components/Libs';
import Modal from 'components/Modal';
import ModalContainer from 'components/ModalContainer';
import React, { useContext, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import 'css/shop.css';

const Img = styled.img.attrs(
  ({imgurl}) => ({
    src: imgurl 
  })
)``;
const ShopWrap = styled.div`
	background:url(${({backImg}) => backImg});background-size:cover;
`;
const MenuButton = styled.button``;
const ShopIcon = styled.span`
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
const shopList = [
	{na:{ko:"모자", en:"Helm"},icon:"iconHelm"},
	{na:{ko:"갑옷", en:"Armor"},icon:"iconArmor"},
	{na:{ko:"무기", en:"Weapon"},icon:"iconWeapon"},
	{na:{ko:"팔기", en:"Sell"},icon:"iconBag"},
];
const makeMark = (markNum, img) => {
  let markTag = '';
  for (let i = 0; i < markNum; ++i) {
    markTag += `<span><img src="${img}" class="light"/><img src="${img}" class="front"/><img src="${img}" class="shadow"/></span>`
  }
  return markTag;
}
const getTotalEff = (saveItems, grade, gameData) => {
	let totalEff = [];
  saveItems.baseEff.forEach((data, idx) => {
		if (totalEff[data.type] === undefined) {
			totalEff[data.type] = {type: data.type, base: 0, add:0, hole:0};
		}
		totalEff[data.type].base += parseInt(data.num[grade - 1]);
	});
	saveItems.addEff.forEach((data, idx) => {
		if (totalEff[data.type] === undefined) {
			totalEff[data.type] = {type: data.type, base: 0, add:0, hole:0};
		}
		totalEff[data.type].add += parseInt(data.num[0]);
	});
	saveItems.hole.forEach((data, idx) => {
		if (data) {
			const holeItem = gameData.items.hole[data.idx].eff;
			holeItem.forEach((holeData, idx) => {
				if (totalEff[holeData.type] === undefined) {
					totalEff[holeData.type] = {type: holeData.type, base: 0, add:0, hole:0};
				}
				totalEff[holeData.type].hole += parseInt(holeData.num);
			});
		}
	});
	return totalEff;
}
const Shop = ({
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
	const [item, setItem] = useState([]);
	const itemRef = useRef();
	const [selectArea, setSelectArea] = useState('area1');
	const [selectItem1, setSelectItem1] = useState({save:{},game:{},select:'',selectTab:'',buttonType:[]});
	const [selectItem2, setSelectItem2] = useState({save:{},game:{},select:'',selectTab:'',buttonType:[]});
	useEffect(() => {
		let items = [[],[],[],[]];
		for (let i = 0; i < 20; i ++) {
			for (let j = 1; j < 4; j ++) {
					items[j - 1][i] = {...util.getItem(saveData, gameData, changeSaveData, {
					type:'equip',
					items:j,//장비만 해당
					//아이템종류, 세부종류(검,단검), 매직등급
					lv:Math.round(Math.random()*100),
					sealed:false,
					}, false, lang),
					select1:'',
					select2:'',
				};
			}
		}
		items[3] = [...saveData.items.equip];
		itemRef.current = items;
	}, []);
	useEffect(() => {
		let copyItem = [...itemRef.current];
		copyItem[3] = [...saveData.items.equip];
		itemRef.current  = copyItem;
		setItem(itemRef.current);
	}, [saveData]);
  return (
		<>
			<ShopWrap className="shop_wrap" backImg={imgSet.back[2]} >
				<div className="shop_menu transition">
					{shopList && shopList.map((data, idx) => {
						return (
							<li key={idx} className={idx === selectTab ? "on" : ""} onClick={() => {
								setSelectTab(idx);
							}}>
								<MenuButton className="shop_menu_button">
									<span className="name">{`${lang === "ko" ? data.na.ko : data.na.en}`}</span>
									<ShopIcon className="icon" icoType={imgSet.icon[data.icon]} />
								</MenuButton>
							</li>
						);
					})}
				</div>
				<div className="shop_area">
					<div className="shop_top scroll-y">
						{item[selectTab] && item[selectTab].map((data, idx) => {
							const itemsGrade = data.grade < 5 ? 0 : data.grade - 5;
							const items = data.part === 3 ? gameItem.equip[data.part][data.weaponType][itemsGrade][data.idx] : gameItem.equip[data.part][0][itemsGrade][data.idx];
							const itemsHole = data.hole;
							return (
								<div className={`item_layout ${gameData.itemGrade.txt_e[data.grade].toLowerCase()} ${selectItem1.selectTab === selectTab && selectItem1.select === idx ? 'select1' : ''} ${selectItem2.selectTab === selectTab && selectItem2.select === idx ? 'select2' : ''}`} key={`items${idx}`} onClick={() => {
									const itemSelect = {...item[selectTab][idx]};
									const itemsGrade = itemSelect.grade < 5 ? 0 : itemSelect.grade - 5;
	 								const items = itemSelect.part === 3 ? gameItem.equip[itemSelect.part][itemSelect.weaponType][itemsGrade][itemSelect.idx] : gameItem.equip[itemSelect.part][0][itemsGrade][itemSelect.idx];
									if (selectArea === 'area2') {
										let button = [];
										if (selectTab < 3) {
											button.push('buy');
										} else {
											button.push('sell');
										}
										if (selectItem1.select !== '' && selectItem1.selectTab === selectTab && selectItem1.select === idx) {
											setSelectItem1({save:{},game:{},select:'',selectTab:'',buttonType:[]});
										}
										setSelectItem2({
											save:itemSelect,
											game:items,
											select:idx,
											selectTab:selectTab,
											buttonType:button,
										});
									} else {
										let button = [];
										if (selectTab < 3) {
											button.push('buy');
										} else {
											button.push('sell');
										}
										if (selectItem2.select !== '' && selectItem2.selectTab === selectTab && selectItem2.select === idx) {
											setSelectItem2({save:{},game:{},select:'',selectTab:'',buttonType:[]});
										}
										setSelectItem1({
											save:itemSelect,
											game:items,
											select:idx,
											selectTab:selectTab,
											buttonType:button,
										});
									}
								}}>
									<span className={`pic ${data.sealed ? "sealed" : ""}`}>
										<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[items.display], data.color, data.id)}}>
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
						})}
					</div>
					<div className="shop_bottom">
						{Object.keys(selectItem1.save).length !== 0 ? (
							<ItemContainer className={`item_select item_select1 items ${selectArea === "area1" ? "on" : ""}`} color={gameData.itemGrade.color[selectItem1.save.grade]} onClick={() => {
								setSelectArea('area1');
							}}>
								<li className="item_header" flex-center="true"><span className="item_name" dangerouslySetInnerHTML={{__html: `${selectItem1.save.modifier[lang]} ${selectItem1.game.na[lang]}`}}></span></li>
								<li className="item_fix" flex="true">
									<ItemPic2 className={`item item${selectItem1.game.part} ${gameData.itemGrade.txt_e[selectItem1.save.grade].toLowerCase()} ${selectItem1.save.sealed ? "sealed" : ""}`}>
										<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[selectItem1.game.display], selectItem1.save.color, selectItem1.save.id)}}></svg>
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
										<div className="item_title">{lang === 'ko' ? '아이템 효과' : 'Item effect'}</div>
										{getTotalEff(selectItem1.save, selectItem1.game.grade, gameData).map((eff, idx) => {
											return (
												<div key={idx} className="item_effs"><span className="cate">{util.getEffectType(eff.type, lang)}</span>{eff.base > 0 && <span className="base">{eff.base}</span>}{eff.add > 0 && <span className="add">{eff.add}</span>}{eff.hole > 0 && <span className="hole">{eff.hole}</span>}<span className="total">{eff.base + eff.add + eff.hole}</span></div>
											)
										})}
									</li>
									<div style={{width:"100%"}} className="scroll-y">
										{selectItem1.save.baseEff.length > 0 && (
											<li className="item_list item_eff">
												<div className="item_title">{lang === 'ko' ? '기본 효과' : 'Base effect'}</div>
												{selectItem1.save.baseEff.map((data, idx) => {
													const grade = selectItem1.save.grade > 3 ? 3 : selectItem1.save.grade - 1;
													return (
														<div key={idx} className="item_effs">{`${util.getEffectType(data.type, lang)} ${data.num[grade]}`}</div>
													) 
												})}
											</li>
										)}
										{selectItem1.save.addEff.length > 0 && (
											<li className="item_list item_eff">
												<div className="item_title">{lang === 'ko' ? '추가 효과' : 'Additional effect'}</div>
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
														<div className="item_price"><span>{lang === 'ko' ? '구입가:' : 'Buying Price'}</span><em>{`₩${(selectItem1.game.price < 1000 ? 1000 : selectItem1.game.price) * 2 * selectItem1.save.grade}`}</em></div>
														<div className="item_button" flex="true">
															<button text="true" className="button_small" onClick={(e) => {
																let item_ = [...item];
																item_[selectItem1.selectTab].splice(selectItem1.select, 1);
																setItem(item_);
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
															}} data-buttontype="itemBuy">{lang === 'ko' ? '구입' : 'Buy'}</button>
														</div>
													</div>
												)
											case 'sell':
												return (
													<div key={`button${idx}`}>
														<div className="item_price"><span>{lang === 'ko' ? '판매가:' : 'Selling Price'}</span><em>{`₩${selectItem1.game.price * (selectItem1.game.grade || selectItem1.save.grade)}`}</em></div>
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
															}} data-buttontype="itemSell">{lang === 'ko' ? '판매' : 'Sell'}</button>
														</div>
													</div>
												)
											default:
												break;
										}
									})}
								</li>
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
								<li className="item_header" flex-center="true"><span className="item_name" dangerouslySetInnerHTML={{__html: `${selectItem2.save.modifier[lang]} ${selectItem2.game.na[lang]}`}}></span></li>
								<li className="item_fix" flex="true">
									<ItemPic2 className={`item item${selectItem2.game.part} ${gameData.itemGrade.txt_e[selectItem2.save.grade].toLowerCase()} ${selectItem2.save.sealed ? "sealed" : ""}`}>
										<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[selectItem2.game.display], selectItem2.save.color, selectItem2.save.id)}}></svg>
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
										<div className="item_title">{lang === 'ko' ? '아이템 효과' : 'Item effect'}</div>
										{getTotalEff(selectItem2.save, selectItem2.game.grade, gameData).map((eff, idx) => {
											return (
												<div key={idx} className="item_effs"><span className="cate">{util.getEffectType(eff.type, lang)}</span>{eff.base > 0 && <span className="base">{eff.base}</span>}{eff.add > 0 && <span className="add">{eff.add}</span>}{eff.hole > 0 && <span className="hole">{eff.hole}</span>}<span className="total">{eff.base + eff.add + eff.hole}</span></div>
											)
										})}
									</li>
									<div style={{width:"100%"}} className="scroll-y">
										{selectItem2.save.baseEff.length > 0 && (
											<li className="item_list item_eff">
												<div className="item_title">{lang === 'ko' ? '기본 효과' : 'Base effect'}</div>
												{selectItem2.save.baseEff.map((data, idx) => {
													const grade = selectItem2.save.grade > 3 ? 3 : selectItem2.save.grade - 1;
													return (
														<div key={idx} className="item_effs">{`${util.getEffectType(data.type, lang)} ${data.num[grade]}`}</div>
													) 
												})}
											</li>
										)}
										{selectItem2.save.addEff.length > 0 && (
											<li className="item_list item_eff">
												<div className="item_title">{lang === 'ko' ? '추가 효과' : 'Additional effect'}</div>
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
														<div className="item_price"><span>{lang === 'ko' ? '구입가:' : 'Buying Price'}</span><em>{`₩${(selectItem2.game.price < 1000 ? 1000 : selectItem2.game.price) * 2 * selectItem2.save.grade}`}</em></div>
														<div className="item_button" flex="true">
															<button text="true" className="button_small" onClick={(e) => {
																let item_ = [...item];
																item_[selectItem2.selectTab].splice(selectItem2.select, 1);
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
															}} data-buttontype="itemRelease">{lang === 'ko' ? '구입' : 'Buy'}</button>
														</div>
													</div>
												);
											case 'sell':
												return (
													<div key={`button${idx}`}>
														<div className="item_price"><span>{lang === 'ko' ? '판매가:' : 'Selling Price'}</span><em>{`₩${selectItem2.game.price * (selectItem2.game.grade || selectItem2.save.grade)}`}</em></div>
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
															}} data-buttontype="itemSell">{lang === 'ko' ? '판매' : 'Sell'}</button>
														</div>
													</div>
												);
											default:
												break;
										}
									})}
								</li>
							</ItemContainer>
						) : (
							<ItemContainer className={`item_select item_select2 items ${selectArea === "area2" ? "on" : ""}`} onClick={() => {
								setSelectArea('area2');
							}}></ItemContainer>
						)}
					</div>
				</div>
			</ShopWrap>
			{/* <ModalContainer>
				{modalOn && <Modal fn={} type={modalType} dataObj={modalInfo} saveData={saveData} changeSaveData={changeSaveData} onClose={() => {handleModal()}} gameData={gameData}/>}
			</ModalContainer> */}
		</>
  );
}

export default Shop;
