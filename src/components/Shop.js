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
const ItemPic = styled.div`
  &:after{background-image:url(${({itemPic}) => itemPic});background-size:100%;background-repeat:no-repeat;}
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
		const holeItem = gameData.items.hole[data].eff;
		holeItem.forEach((holeData, idx) => {
			if (totalEff[holeData.type] === undefined) {
				totalEff[holeData.type] = {type: holeData.type, base: 0, add:0, hole:0};
			}
			totalEff[holeData.type].hole += parseInt(holeData.num);
		});
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
	const [selectItem1, setSelectItem1] = useState();
	const [selectItem2, setSelectItem2] = useState();
	const selectItem1Display = useRef();
	const selectItem2Display = useRef();
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
								<div className={`buy_item ${gameData.itemGrade.txt_e[data.grade].toLowerCase()} ${data.select1} ${data.select2}`} key={`items${idx}`} onClick={() => {
									let itemSelect = {...item[selectTab][idx]};
									const itemsGrade = itemSelect.grade < 5 ? 0 : itemSelect.grade - 5;
	 								const items = itemSelect.part === 3 ? gameItem.equip[itemSelect.part][itemSelect.weaponType][itemsGrade][itemSelect.idx] : gameItem.equip[itemSelect.part][0][itemsGrade][itemSelect.idx];
									let cloneItem = [...item];
									if (selectArea === 'area2') {
										setSelectItem2(itemSelect);
										selectItem2Display.current = items;
										cloneItem.forEach((itemData) => {
											itemData.forEach((itemData_) => {
												itemData_.select2 = '';
											});
										});
										cloneItem[selectTab][idx].select2 = 'select2';
										if (selectTab < 3) {
											selectItem2Display.current.buttonType = 'buy';
										} else {
											selectItem2Display.current.buttonType = 'sell';
										}
										selectItem2Display.current.selectTab = selectTab;
										selectItem2Display.current.selectIdx = idx;
									} else {
										setSelectItem1(itemSelect);
										selectItem1Display.current = items;
										cloneItem.forEach((itemData) => {
											itemData.forEach((itemData_) => {
												itemData_.select1 = '';
											});
										});
										cloneItem[selectTab][idx].select1 = 'select1';
										if (selectTab < 3) {
											selectItem1Display.current.buttonType = 'buy';
										} else {
											selectItem1Display.current.buttonType = 'sell';
										}
										selectItem1Display.current.selectTab = selectTab;
										selectItem1Display.current.selectIdx = idx;
									}
								}}>
									<span className="pic">
										<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[items.display], data.color, data.id)}}>
										</svg>
									</span>
									<span className="hole" flex-center="true">
										{itemsHole.map((holedata, holeidx) => {
											const stoneColor = gameItem.hole[data.hole[holeidx]].stone;
											return <span key={`${idx}_${holeidx}`} className={`hole_slot hole${holeidx} stone_${stoneColor}`}></span>;
										})}
									</span>
								</div>
							)
						})}
					</div>
					<div className="shop_bottom">
						{selectItem1 ? (
							<ItemContainer className={`item_select item_select1 items ${selectArea === "area1" ? "on" : ""}`} color={gameData.itemGrade.color[selectItem1.grade]} onClick={() => {
								setSelectArea('area1');
							}}>
								<li className="item_header" flex-center="true"><span className="item_name" dangerouslySetInnerHTML={{__html: `${selectItem1.modifier[lang]} ${selectItem1Display.current.na[lang]}`}}></span></li>
								<li className="item_fix" flex="true">
									<ItemPic className={`item item${selectItem1Display.current.part} ${gameData.itemGrade.txt_e[selectItem1.grade].toLowerCase()} ${selectItem1.sealed ? "sealed" : ""}`}>
										<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[selectItem1Display.current.display], selectItem1.color, selectItem1.id)}}></svg>
									</ItemPic>
									<div flex-h="true" style={{flex: 1,}}>
										<ItemName className="item_cont" color={gameData.itemGrade.color[selectItem1.grade]}>
											<div className="item_top">
												<span className="item_grade">{lang === 'ko' ? gameData.itemGrade.txt_k[selectItem1.grade] : gameData.itemGrade.txt_e[selectItem1.grade]}</span> <span className="item_type">{gameData.itemType[selectItem1Display.current.part][lang]}</span>
											</div>
											<div className="item_description" dangerouslySetInnerHTML={{__html: `"${selectItem1Display.current.txt[lang]}"`}}></div>
											<div className="item_kg">{selectItem1Display.current.kg}kg</div>
										</ItemName>
									</div>
								</li>
								<div className="scroll-y">
									<li className="item_list item_typeSlot">
										<div className="item_type" dangerouslySetInnerHTML={{__html: makeMark(selectItem1.markNum, imgSet.animalType[selectItem1.mark])}}>
										</div>
										<div className="item_slot">
											{selectItem1.hole.map((data, idx) => {
												return (
													<div key={idx} className="item_holes"><span className="item_holeback"><Img imgurl={imgSet.itemHole[data]} /></span></div>
												)
											})}
										</div>
									</li>
									<li className="item_list item_eff">
										<div className="item_title">{lang === 'ko' ? '아이템 효과' : 'Item effect'}</div>
										{getTotalEff(selectItem1, selectItem1Display.current.grade, gameData).map((eff, idx) => {
											return (
												<div key={idx} className="item_effs"><span className="cate">{util.getEffectType(eff.type, lang)}</span>{eff.base > 0 && <span className="base">{eff.base}</span>}{eff.add > 0 && <span className="add">{eff.add}</span>}{eff.hole > 0 && <span className="hole">{eff.hole}</span>}<span className="total">{eff.base + eff.add + eff.hole}</span></div>
											)
										})}
									</li>
									<div style={{width:"100%"}} className="scroll-y">
										{selectItem1.baseEff.length > 0 && (
											<li className="item_list item_eff">
												<div className="item_title">{lang === 'ko' ? '기본 효과' : 'Base effect'}</div>
												{selectItem1.baseEff.map((data, idx) => {
													const grade = selectItem1.grade > 3 ? 3 : selectItem1.grade - 1;
													return (
														<div key={idx} className="item_effs">{`${util.getEffectType(data.type, lang)} ${data.num[grade]}`}</div>
													) 
												})}
											</li>
										)}
										{selectItem1.addEff.length > 0 && (
											<li className="item_list item_eff">
												<div className="item_title">{lang === 'ko' ? '추가 효과' : 'Additional effect'}</div>
												{selectItem1.addEff.map((data, idx) => {
													const grade = selectItem1.grade > 3 ? 3 : selectItem1.grade - 1;
													return (
														<div key={idx} className="item_effs add">{`${util.getEffectType(data.type, lang)} ${data.num[0]}`}</div>
													) 
												})}
											</li>
										)}
										{selectItem1Display.current.set !== 0 && (<li className="item_list item_set">
											<div className="item_setNa">{gameData.items.set_type[selectItem1Display.current.set].na}</div>
										</li>
										)}
									</div>
								</div>
								<li className="item_footer" flex-v="true">
									{selectItem1Display.current.buttonType === "buy" ? (
										<>
											<div className="item_price"><span>{lang === 'ko' ? '구입가:' : 'Buying Price'}</span><em>{`₩${(selectItem1Display.current.price < 1000 ? 1000 : selectItem1Display.current.price) * 2 * selectItem1.grade}`}</em></div>
											<div className="item_button" flex="true">
												<button text="true" onClick={(e) => {
													let item_ = [...item];
													item_[selectItem1Display.current.selectTab].splice(selectItem1Display.current.selectIdx, 1);
													setItem(item_);
													util.buttonEvent({
														event: e,
														type: 'itemBuy',
														data: {
															slotIdx: 0,
															gameItem: selectItem1Display.current,
															saveItemData: selectItem1,
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
													setSelectItem1(null);
												}} data-buttontype="itemBuy">{lang === 'ko' ? '구입' : 'Buy'}</button>
											</div>
										</>
									) : (
										<>
											<div className="item_price"><span>{lang === 'ko' ? '판매가:' : 'Selling Price'}</span><em>{`₩${selectItem1Display.current.price * selectItem1.grade}`}</em></div>
											<div className="item_button" flex="true">
												<button text="true" onClick={(e) => {
													util.buttonEvent({
														event: e,
														type: 'itemSell',
														data: {
															slotIdx: 0,
															gameItem: selectItem1Display.current,
															itemSaveSlot:selectItem1Display.current.selectIdx,
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
													setSelectItem1(null);
												}} data-buttontype="itemSell">{lang === 'ko' ? '판매' : 'Sell'}</button>
											</div>
										</>
									)}
								</li>
							</ItemContainer>
						) : (
							<ItemContainer className={`item_select item_select1 items ${selectArea === "area1" ? "on" : ""}`} onClick={() => {
								setSelectArea('area1');
							}}></ItemContainer>
						)}
						{selectItem2 ? (
							<ItemContainer className={`item_select item_select2 items ${selectArea === "area2" ? "on" : ""}`} color={gameData.itemGrade.color[selectItem2.grade]} onClick={() => {
								setSelectArea('area2');
							}}>
								<li className="item_header" flex-center="true"><span className="item_name" dangerouslySetInnerHTML={{__html: `${selectItem2.modifier[lang]} ${selectItem2Display.current.na[lang]}`}}></span></li>
								<li className="item_fix" flex="true">
									<ItemPic className={`item item${selectItem2Display.current.part} ${gameData.itemGrade.txt_e[selectItem2.grade].toLowerCase()} ${selectItem2.sealed ? "sealed" : ""}`}>
										<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[selectItem2Display.current.display], selectItem2.color, selectItem2.id)}}></svg>
									</ItemPic>
									<div flex-h="true" style={{flex: 1,}}>
										<ItemName className="item_cont" color={gameData.itemGrade.color[selectItem2.grade]}>
											<div className="item_top">
												<span className="item_grade">{lang === 'ko' ? gameData.itemGrade.txt_k[selectItem2.grade] : gameData.itemGrade.txt_e[selectItem2.grade]}</span> <span className="item_type">{gameData.itemType[selectItem2Display.current.part][lang]}</span>
											</div>
											<div className="item_description" dangerouslySetInnerHTML={{__html: `"${selectItem2Display.current.txt[lang]}"`}}></div>
											<div className="item_kg">{selectItem2Display.current.kg}kg</div>
										</ItemName>
									</div>
								</li>
								<div className="scroll-y">
									<li className="item_list item_typeSlot">
										<div className="item_type" dangerouslySetInnerHTML={{__html: makeMark(selectItem2.markNum, imgSet.animalType[selectItem2.mark])}}>
										</div>
										<div className="item_slot">
											{selectItem2.hole.map((data, idx) => {
												return (
													<div key={idx} className="item_holes"><span className="item_holeback"><Img imgurl={imgSet.itemHole[data]} /></span></div>
												)
											})}
										</div>
									</li>
									<li className="item_list item_eff">
										<div className="item_title">{lang === 'ko' ? '아이템 효과' : 'Item effect'}</div>
										{getTotalEff(selectItem2, selectItem2Display.current.grade, gameData).map((eff, idx) => {
											return (
												<div key={idx} className="item_effs"><span className="cate">{util.getEffectType(eff.type, lang)}</span>{eff.base > 0 && <span className="base">{eff.base}</span>}{eff.add > 0 && <span className="add">{eff.add}</span>}{eff.hole > 0 && <span className="hole">{eff.hole}</span>}<span className="total">{eff.base + eff.add + eff.hole}</span></div>
											)
										})}
									</li>
									<div style={{width:"100%"}} className="scroll-y">
										{selectItem2.baseEff.length > 0 && (
											<li className="item_list item_eff">
												<div className="item_title">{lang === 'ko' ? '기본 효과' : 'Base effect'}</div>
												{selectItem2.baseEff.map((data, idx) => {
													const grade = selectItem2.grade > 3 ? 3 : selectItem2.grade - 1;
													return (
														<div key={idx} className="item_effs">{`${util.getEffectType(data.type, lang)} ${data.num[grade]}`}</div>
													) 
												})}
											</li>
										)}
										{selectItem2.addEff.length > 0 && (
											<li className="item_list item_eff">
												<div className="item_title">{lang === 'ko' ? '추가 효과' : 'Additional effect'}</div>
												{selectItem2.addEff.map((data, idx) => {
													const grade = selectItem2.grade > 3 ? 3 : selectItem2.grade - 1;
													return (
														<div key={idx} className="item_effs add">{`${util.getEffectType(data.type, lang)} ${data.num[0]}`}</div>
													) 
												})}
											</li>
										)}
										{selectItem2Display.current.set !== 0 && (<li className="item_list item_set">
											<div className="item_setNa">{gameData.items.set_type[selectItem2Display.current.set].na}</div>
										</li>
										)}
									</div>
								</div>
								<li className="item_footer" flex-v="true">
									{selectItem2Display.current.buttonType === "buy" ? (
										<>
											<div className="item_price"><span>{lang === 'ko' ? '구입가:' : 'Buying Price'}</span><em>{`₩${(selectItem2Display.current.price < 1000 ? 1000 : selectItem2Display.current.price) * 2 * selectItem2.grade}`}</em></div>
											<div className="item_button" flex="true">
												<button text="true" onClick={(e) => {
													let item_ = [...item];
													item_[selectItem2Display.current.selectTab].splice(selectItem2Display.current.selectIdx, 1);
													setItem(item_);
													util.buttonEvent({
														event: e,
														type: 'itemBuy',
														data: {
															slotIdx: 0,
															gameItem: selectItem2Display.current,
															saveItemData: selectItem2,
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
													setSelectItem2(null);
												}} data-buttontype="itemRelease">{lang === 'ko' ? '구입' : 'Buy'}</button>
											</div>
										</>
									) : (
										<>
											<div className="item_price"><span>{lang === 'ko' ? '판매가:' : 'Selling Price'}</span><em>{`₩${selectItem2Display.current.price * selectItem2.grade}`}</em></div>
											<div className="item_button" flex="true">
												<button text="true" onClick={(e) => {
													util.buttonEvent({
														event: e,
														type: 'itemSell',
														data: {
															slotIdx: 0,
															gameItem: selectItem2Display.current,
															itemSaveSlot:selectItem2Display.current.selectIdx,
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
													setSelectItem2(null);
												}} data-buttontype="itemSell">{lang === 'ko' ? '판매' : 'Sell'}</button>
											</div>
										</>
									)}
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
				{modalOn && <Modal fn={changeGachaMode} type={modalType} dataObj={modalInfo} saveData={saveData} changeSaveData={changeSaveData} onClose={() => {handleModal()}} gameData={gameData}/>}
			</ModalContainer> */}
		</>
  );
}

export default Shop;
