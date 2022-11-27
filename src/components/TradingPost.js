import { AppContext } from 'App';
import { util } from 'components/Libs';
import Modal from 'components/Modal';
import ModalContainer from 'components/ModalContainer';
import React, { useContext, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { RangeSlider, Calculator } from 'components/Components';
import 'css/trading.css';
import MsgContainer from 'components/MsgContainer';
import Msg from 'components/Msg';

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
  .item_name{color:${({ color }) => color};text-shadow:-1px -1px 1px rgba(255,255,255,.5), 1px 1px 1px #000;font-size:14px;font-weight:600;}
`;
const ItemPic = styled.div`
  display:inline-block;width:100%;height:100%;background-image:url(${({itemPic}) => itemPic});background-size:100%;background-repeat:no-repeat;
`;
const ItemName = styled.div`
  .item_grade{color:${({ color }) => color};}
`;
const ShipContainer = styled.div``;
const tradingList = [
	{na:'buy',icon:"iconHelm"},
	{na:'sell',icon:"iconArmor"},
];
const storageCheck = (items) => {
	let total = 0;
	for (const item of items) {
		total += item.num;
	}
	return total;
}
const shipSize = (shipIdx) => {
	if (shipIdx < 3) { //소형
		return 0;
	} else if (shipIdx < 8) { //중형
		return 1;
	} else { //대형
		return 2;
	}
}
const TradingPost = ({
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
	const [selectShip, setSelectShip] = useState(0);
	const [rangeValue, setRangeValue] = useState(0);
	const [showCal, setShowCal] = useState(false);
	const [item, setItem] = useState([]);
	const [selectItem, setSelectItem] = useState({save:{},game:{},select:'',selectTab:'',selectShip:'',buttonType:[]});
	useEffect(() => {
		let items = [[],[]];
		if (Object.keys(saveData).length !== 0) {
			const cityData = saveData.city[cityIdx];
			for (const [idx, item] of cityData.tradingPost.entries()) {
				items[0][idx] = item;
			}
			for (const [idx, item] of saveData.ship.entries()) {
				items[1][idx] = item;
			}
			setItem(items);
		}
	}, [saveData]);
  return (
		<>
			<ShopWrap className="wrap" backImg={imgSet.back[2]} >
				<div className="tab_menu transition">
					{tradingList && tradingList.map((data, idx) => {
						return (
							<li key={idx} className={idx === selectTab ? "on" : ""} onClick={() => {
								setSelectTab(idx);
								setSelectItem({save:{},game:{},select:'',buttonType:[]});
							}}>
								<MenuButton className="tab_menu_button">
									<span className="name">{gameData.msg.menu[data.na][lang]}</span>
									<ShopIcon className="icon" icoType={imgSet.icon[data.icon]} />
								</MenuButton>
							</li>
						);
					})}
				</div>
				<div className="trading_area">
					<div className="trading_top scroll-y">
						{item[selectTab] && item[selectTab].map((data, idx) => {
							if (selectTab === 0) {
								const items = gameItem.material[data.idx];
								const grade = data.grade || items.grade;
								return (
									<div className={`item_layout ${gameData.itemGrade.txt_e[grade].toLowerCase()} ${selectItem.selectTab === selectTab && selectItem.select === idx ? 'select1' : ''}`} key={`items${idx}`} onClick={() => {
										let button = ['buy','bargaining'];
										setSelectItem({
											save:data,
											game:items,
											select:idx,
											selectTab:selectTab,
											selectShip:selectShip,
											buttonType:button,
										});
										setRangeValue(0);
									}}>
										<ItemPic className="pic" itemPic={imgSet.itemMaterial[items.display]}>
											{typeof data.num === 'number' ? (
												<span className="has_num">{util.comma(data.num)}</span>
											) : (
												<span className="has_num infinite">∞</span>
											)}
										</ItemPic>
									</div>
								)
							} else {
								if (data.stay === saveData.info.stay && idx === selectShip) {
									return data.loadedItem.map((itemData, itemIdx) => {
										const items = gameItem.material[itemData.idx];
										const grade = items.grade;
										console.log(selectItem);
										return (
											<div className={`item_layout ${gameData.itemGrade.txt_e[grade].toLowerCase()} ${selectItem.selectTab === selectTab && selectItem.selectShip === selectShip && selectItem.select === itemIdx ? 'select2' : ''}`} key={`shipitems${itemIdx}`} onClick={() => {
												let button = ['sell','bargaining'];
												setSelectItem({
													save:itemData,
													game:items,
													select:itemIdx,
													selectTab:selectTab,
													selectShip:selectShip,
													buttonType:button,
												});
												setRangeValue(0);
											}}>
												<ItemPic className="pic" itemPic={imgSet.itemMaterial[items.display]}>
													{typeof itemData.num === 'number' ? (
														<span className="has_num">{itemData.num}</span>
													) : (
														<span className="has_num infinite">∞</span>
													)}
												</ItemPic>
											</div>
										)
									});
								}
							}
						})}
					</div>
					<div className="trading_middle scroll-x">
						{item[1] && item[1].map((shipD, shipIdx) => {
							if (shipD.stay === saveData.info.stay) {
								let shipSail = [],
									shipSailColor = [],
									shipCannon = [];
								shipD.sail.forEach((data, idx) => {
									if (data) {
										shipSail[idx] = `${shipD.shipIdx}_${data.type}_${idx + 1}`;
										shipSailColor[idx] = data.color;
									} else {
										shipSail[idx] = '';
										shipSailColor[idx] = '';
									}
								});
								shipD.cannon.forEach((data, idx) => {
									if (data) {
										shipCannon[idx] = `${shipD.shipIdx}_${data}_${idx + 1}`
									} else {
										shipCannon[idx] = '';
									}
								})
								return (
									<ShipContainer className={`ship ${selectShip === shipIdx ? 'select' : ''}`} key={`ship${shipIdx}`} onClick={() => {
										setSelectShip(shipIdx);
										setSelectItem({save:{},game:{},select:'',selectTab:'',selectShip:'',buttonType:[]});
									}}>
										<div className={`ship_display size${shipSize(shipD.shipIdx)} ship${shipD.shipIdx}`}>
											<svg className="ship_body" xmlns="http://www.w3.org/2000/svg" width="320px" height="600px" viewBox="0 0 320 600" dangerouslySetInnerHTML={{__html: util.setShipColor(gameData.shipSvg[shipD.shipIdx], imgSet.wood[shipD.wood] || imgSet.transparent, gameData.ships.woodColor[gameData.ships.wood[shipD.wood]?.woodColor ?? 4], Math.random().toString(36).substring(2, 11), [gameData.sailSvg[shipSail[0]], gameData.sailSvg[shipSail[1]], gameData.sailSvg[shipSail[2]]], [shipSailColor[0], shipSailColor[1], shipSailColor[2]], [gameData.cannonSvg[shipCannon[0]], gameData.cannonSvg[shipCannon[1]], gameData.cannonSvg[shipCannon[2]]])}}></svg>
											{shipD.figure !== '' && <svg className="ship_face" style={{filter:`drop-shadow(0 0 7px ${gameData.ships.figureColor[gameData.ships.figurehead[shipD.figure].color][2]})`}} xmlns="http://www.w3.org/2000/svg" width="200px" height="200px" viewBox="0 0 200 200" dangerouslySetInnerHTML={{__html: util.setFigureColor(gameData.figureSvg[gameData.ships.figurehead[shipD.figure].display], gameData.ships.figureColor, gameData.ships.figurehead[shipD.figure].color)}}></svg>}
										</div>
										<div className="ship_storage">{storageCheck(shipD.loadedItem)} / <br/>{shipD.resource.loadage}</div>
									</ShipContainer>
								)
							}
						})}
					</div>
					<div className="trading_bottom">
						{Object.keys(selectItem.save).length !== 0 ? (
							<ItemContainer className={`item_select items ${selectTab === 0 ? 'tab1' : 'tab2'}`} color={gameData.itemGrade.color[selectItem.save.grade]}>
								<li className="item_header" flex-center="true"><span className="item_name" dangerouslySetInnerHTML={{__html: `${selectItem.game.na[lang]}`}}></span></li>
								<li className="item_fix" flex="true">
									<div className={`item ${gameData.itemGrade.txt_e[selectItem.save.grade || selectItem.game.grade].toLowerCase()}`}>
										<ItemPic className="pic" itemPic={imgSet.itemMaterial[selectItem.game.display]} />
									</div>
									<div flex-h="true" style={{flex: 1}}>
										<ItemName className="item_cont" color={gameData.itemGrade.color[selectItem.save.grade]}>
											<div className="item_top">
												<span className="item_grade">{lang === 'ko' ? gameData.itemGrade.txt_k[selectItem.save.grade] : gameData.itemGrade.txt_e[selectItem.save.grade]}</span>
											</div>
											<div className="item_description" dangerouslySetInnerHTML={{__html: `"${selectItem.game.txt[lang]}"`}}></div>
											<div flex="true" style={{justifyContent:'space-between'}}>
												<div className="item_price"><span>{gameData.msg.itemInfo.buyPrice[lang]}</span><em>{`₩${util.comma(selectItem.game.price < 1000 ? 1000 : selectItem.game.price)}`}</em></div>
												<div className="item_kg">{selectItem.game.kg}kg</div>
											</div>
										</ItemName>
									</div>
								</li>
								<li className="item_footer" flex-v="true">
									<RangeSlider min={0} max={selectItem.selectTab === 0 ? item[selectItem.selectTab][selectItem.select].num : item[selectItem.selectTab][selectShip].loadedItem[selectItem.select].num} step={1} value={[rangeValue]} pirce={gameItem.material[selectTab === 0 ? item[selectTab][selectItem.select].idx : item[selectTab][selectShip].loadedItem[selectItem.select].idx].price} setValue={setRangeValue} showCal={setShowCal}/>
									{selectItem.buttonType.map((button, idx) => {
										switch(button) {
											case 'buy':
												return (
													<div key={`button${idx}`}>
														<div className="item_button" flex="true">
															<button text="true" className="button_small" onClick={(e) => {
																let saveD = {...saveData};
																// if (rangeValue[0] < cityD[selectItem.select].num) {

																// } else {
																if (saveD.info.money >= rangeValue[0] * selectItem.game.price) {//소유금이 더 많을경우
																	if (typeof saveD.city[cityIdx].tradingPost[selectItem.select].num === 'number') { //수량이 정해져 있을경우
																		saveD.city[cityIdx].tradingPost[selectItem.select].num -= rangeValue[0];
																		changeSaveData(saveD);
																	}
																	util.buttonEvent({
																		event: e,
																		type: 'itemBuy',
																		data: {
																			slotIdx: 0,
																			gameItem: selectItem.game,
																			saveItemData: selectItem.save,
																			type:'ship'+selectShip,
																			num:rangeValue[0],
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
																	setMsg(gameData.msg.sentence.lackMoney[lang]);
																}
															}} data-buttontype="itemBuy">{gameData.msg.button.buy[lang]}</button>
														</div>
													</div>
												)
											case 'sell':
												return (
													<div key={`button${idx}`}>
														<div className="item_button" flex="true">
															<button text="true" className="button_small" onClick={(e) => {
																if (rangeValue) {
																	util.buttonEvent({
																		event: e,
																		type: 'itemSell',
																		data: {
																			slotIdx: 0,
																			gameItem: selectItem.game,
																			itemSaveSlot:selectItem.select,
																			type:'ship'+selectShip,
																			num:rangeValue[0],
																		},
																		saveData: saveData,
																		changeSaveData: changeSaveData,
																		gameData: gameData,
																		msgText: setMsg,
																		showMsg: setMsgOn,
																		showPopup: setPopupOn,
																		lang: lang,
																	});
																	setSelectItem({save:{},game:{},select:'',selectTab:'',selectShip:'',buttonType:[]});
																} else {
																	setMsgOn(true);
																	setMsg(gameData.msg.sentence.selectQuantity[lang]);
																}
															}} data-buttontype="itemSell">{gameData.msg.button.sell[lang]}</button>
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
							<ItemContainer className={`item_select item_select1 items ${selectTab === 0 ? 'tab1' : 'tab2'}`}></ItemContainer>
						)}
					</div>
				</div>
				{showCal && <Calculator value={rangeValue} max={item[0][selectItem.select].num} setValue={setRangeValue} showCal={setShowCal}/>}
			</ShopWrap>
			{/* <ModalContainer>
				{modalOn && <Modal fn={} type={modalType} dataObj={modalInfo} saveData={saveData} changeSaveData={changeSaveData} lang={lang} onClose={() => {handleModal()}} gameData={gameData}/>}
			</ModalContainer> */}
      <MsgContainer>
        {msgOn && <Msg text={msg} showMsg={setMsgOn}></Msg>}
      </MsgContainer>
		</>
  );
}

export default TradingPost;
