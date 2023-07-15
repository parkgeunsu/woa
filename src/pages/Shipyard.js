import { AppContext } from 'App';
import { util } from 'components/Libs';
import PopupContainer from 'components/PopupContainer';
import Popup from 'components/Popup';
import MsgContainer from 'components/MsgContainer';
import Msg from 'components/Msg';
import React, { useContext, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import 'css/ship.css';
import iconCardName from 'images/card/card_name.png';
import { ActionChDisplay } from 'components/Components';

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
	display:flex;
	flex-direction:column;
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
const ShipOption = styled.div``;
const SailColor = styled.div`
	background:${({color}) => color} !important;
`;
const ShipContract = styled.div`
	.ship_scroll{background-image:url(${({scroll}) => scroll});background-size:100% 100%;background-repeat:no-repeat;background-position:50% 50%;}
	button{width:70px;height:70px;background:url(${({stamp}) => stamp}) no-repeat 50% 50%;background-size:100% 100%;}
`;
const WoodDeco = styled.div`
	width:${({shipNum}) => shipNum * 50}%;
	&:before, &:after, .bar1, .bar2{background:url(${({brick}) => brick});}
`;
const ShipName = styled.div`
	background:url(${({iconCardName}) => iconCardName}) no-repeat center center;
	background-size:100% 100%;
`;
const shipList = [
	{na:'produce',icon:"iconAccessory"},
	{na:'remodeling',icon:"iconUpgrade"},
	{na:'possessed',icon:"iconEtc"},
];
const colorPicker = (can, colorImg, setCtx) => {
	const ctx = can.getContext('2d');
	setCtx(ctx);
	const img = new Image();
	img.src = colorImg;
	img.onload = () => {
		ctx.drawImage(img, 0, 0, 200, 129);
	}
}
const valuePrice = (data, shipItem, setSelectShip, shipInfo, setShipInfo) => {
	let cloneShipInfo = {name:shipInfo.name,price:shipInfo.price,durability:0,loadage:0,knot:0,space:0};
	const stateFn = (data, state, first) => {
		if (first) {
			data.durability = state[0];
			data.loadage = state[1];
			data.knot = state[2];
			data.space = state[3];
			data.cannon = [state[4],state[5],state[6]];
		} else {
			data.durability = (state[0].indexOf('%') >= 0 ? Math.round(Number(data.durability) * (parseInt(state[0]) / 100)) : Math.round(Number(data.durability) + Number(state[0])));
			data.loadage = (state[1].indexOf('%') >= 0 ? Math.round(Number(data.loadage) * (parseInt(state[1]) / 100)) : Math.round(Number(data.loadage) + Number(state[1]))); 
			data.knot = (state[2].indexOf('%') >= 0 ? Math.round(Number(data.knot) * (parseInt(state[2]) / 100)) : Math.round(Number(data.knot) + Number(state[2])));
			data.space = (state[3].indexOf('%') >= 0 ? Math.round(Number(data.space) * (parseInt(state[3]) / 100)) : Math.round(Number(data.space) + Number(state[3])));
			data.cannon[0] = (state[4].indexOf('%') >= 0 ? Math.round(Number(data.cannon[0]) * (parseInt(state[4]) / 100)) : Math.round(Number(data.cannon[0]) + Number(state[4])));
			data.cannon[1] = (state[4].indexOf('%') >= 0 ? Math.round(Number(data.cannon[1]) * (parseInt(state[4]) / 100)) : Math.round(Number(data.cannon[1]) + Number(state[4])));
			data.cannon[2] = (state[4].indexOf('%') >= 0 ? Math.round(Number(data.cannon[2]) * (parseInt(state[4]) / 100)) : Math.round(Number(data.cannon[2]) + Number(state[4])));
		}
	}
	//{name:'',price:0,durability:0,loadage:0,knot:0,space:0,cannon1,cannon2,cannon3}
	const ship = shipItem.ship[0][data.shipIdx];
	let price = ship.price;
	stateFn(cloneShipInfo, [ship.durability,ship.loadage,ship.knot,ship.space,shipItem.cannon[data.cannon0]?.eff.power || '',shipItem.cannon[data.cannon1]?.eff.power || '',shipItem.cannon[data.cannon2]?.eff.power || ''], true);
	for (const key in data) {
		if (typeof data[key] === 'number') {
			switch(key) {
				case 'shipIdx':
				case 'sail0Color':
				case 'sail1Color':
				case 'sail2Color':
					break;
				case 'figure':
					price += shipItem.figurehead[data[key]].price;
					stateFn(cloneShipInfo, shipItem.figurehead[data[key]].factor, false);
					break;
				case 'wood':
					price = Math.round(price * (parseInt(shipItem.wood[data[key]].price) / 100));
					stateFn(cloneShipInfo, shipItem.wood[data[key]].factor, false);
					break;
				case 'sail0':
				case 'sail1':
				case 'sail2':
					price += shipItem.sail[data[key]].price;
					stateFn(cloneShipInfo, shipItem.sail[data[key]].factor, false);
					break;
				case 'cannon0':
				case 'cannon1':
				case 'cannon2':
					price += shipItem.cannon[data[key]].price;
					break;
				default:
					price += shipItem[key][data[key]].price;
					stateFn(cloneShipInfo, shipItem[key][data[key]].factor, false);
					break;
			}
		}
	}
	cloneShipInfo.price = price;
	setShipInfo(cloneShipInfo);
	setSelectShip(data);
}
const cateList = [
	{na:'etc',imgName:'itemEtc',classNa:'blueprint'},
	{na:'wood',imgName:'wood',classNa:'wood'},
	{na:'figurehead',imgName:'figure',classNa:'figure'},
	{na:'anchor',imgName:'anchor',classNa:'anchor'},
	{na:'sail',imgName:'sail',classNa:'sail0'},
	{na:'sail',imgName:'sail',classNa:'sail1'},
	{na:'sail',imgName:'sail',classNa:'sail2'},
	{na:'cannon',imgName:'cannon',classNa:'cannon0'},
	{na:'cannon',imgName:'cannon',classNa:'cannon1'},
	{na:'cannon',imgName:'cannon',classNa:'cannon2'},
];
const shipSize = (shipIdx) => {
	if (shipIdx < 3) { //소형
		return 0;
	} else if (shipIdx < 8) { //중형
		return 1;
	} else { //대형
		return 2;
	}
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
	const gameItem = gameData.items,
		shipItem = gameData.ships;
  const [popupInfo, setPopupInfo] = useState({});
  const [popupOn, setPopupOn] = useState(false);
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");
	const [selectTab, setSelectTab] = useState(0);
	const [selectCate, setSelectCate] = useState('');
	const [showPicker, setShowPicker] = useState(false);
	const [ctx, setCtx] = useState();
	const canvasRef = useRef(null);
	const canColorRef = useRef(null);
	const colorChip = useRef(null);
	const [item, setItem] = useState([[],[],[],[]]);
	const [shipInfo, setShipInfo] = useState({name:'',price:0,durability:0,loadage:0,knot:0,space:0});
	const [shipInfoOn, setShipInfoOn] = useState(false);
	const [selectShip, setSelectShip] = useState({shipIdx:'',wood:'',figure:'',anchor:'',sail0:'',sail1:'',sail2:'',sail0Color:'#fff',sail1Color:'#fff',sail2Color:'#fff',cannon0:'',cannon1:'',cannon2:''});
	const [hasItem, setHasItem] = useState([]);//보유한 재료 선택
	const [selectItem1, setSelectItem1] = useState({save:[],game:[],select:[],selectCate:[],userHave:[]});//배 재료 선택
	const [selectItem2, setSelectItem2] = useState({save:{},game:{},select:'',selectCate:'',userHave:''});//재료 설명 선택
	const possessedShip = useRef([]);//보유한 배 갯수 데이터
	const [actionCh, setActionCh] = useState({});//행동할 캐릭터 데이터
	const actionRef = useRef();//행동할 캐릭터 선택자
	useEffect(() => {
			colorPicker(canvasRef.current, imgSet.etc.color, setCtx);
	}, []);
	useEffect(() => {
		if (Object.keys(saveData).length !== 0) {
			possessedShip.current = new Array(saveData.ship.length - 1).fill('');
			const cityData = saveData.city[cityIdx];
			const items = [
				[...cityData.shipyard.blueprint],
				['',...cityData.shipyard.wood],
				['',...cityData.shipyard.figure],
				['',...cityData.shipyard.anchor],
				['',...cityData.shipyard.sail],
				['',...cityData.shipyard.sail],
				['',...cityData.shipyard.sail],
				['',...cityData.shipyard.cannon],
				['',...cityData.shipyard.cannon],
				['',...cityData.shipyard.cannon],
			];
			setItem(items);
			setActionCh(saveData.actionCh.shipyard);
			setPopupInfo({
				ch:saveData.ch,
				actionCh:saveData.actionCh.shipyard.idx,
				type:'shipyard'
			});
			let itemL = [[],[],[],[],[],[],[],[],[],[]];
			for (let key in saveData.items) {
				for (const [idx, data] of saveData.items[key].entries()) {
					if (key === 'etc' && data.idx >= 27 && data.idx <= 38) {
						itemL[0].push(data.idx);
					}
				}
			}
			setHasItem(itemL);
		}
	}, [saveData]);
	useEffect(() => {
	}, [cityIdx])
  return (
		<>
			<ShipWrap className="wrap" backImg={imgSet.back[2]} >
				<div className="tab_menu shipyard transition">
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
				<div className={`ship_area`}>
					<div className={`ship_top ${shipList[selectTab].na}`}>
						{shipList[selectTab].na === 'produce' && (
							<>
								<div className="ship_value">{`₩${util.comma(shipInfo.price)}`}</div>
								<div className={`ship_display size${shipSize(selectShip.shipIdx)} ship${selectShip.shipIdx}`} onClick={() => {
									setShipInfoOn(true);
								}}>
									{selectShip.shipIdx !== '' && (
										<>
											<div className="ship_moveX">
												<div className="ship_moveY">
													<svg className="ship_body" xmlns="http://www.w3.org/2000/svg" width="320px" height="600px" viewBox="0 0 320 600" dangerouslySetInnerHTML={{__html: util.setShipColor(gameData.shipSvg[selectShip.shipIdx], imgSet.wood[selectShip.wood] || imgSet.transparent, gameData.ships.woodColor[gameData.ships.wood[selectShip.wood]?.woodColor ?? 4], Math.random().toString(36).substring(2, 11), [gameData.sailSvg[`${selectShip.shipIdx}_${selectShip.sail0}_1`], gameData.sailSvg[`${selectShip.shipIdx}_${selectShip.sail1}_2`], gameData.sailSvg[`${selectShip.shipIdx}_${selectShip.sail2}_3`]], [selectShip.sail0Color, selectShip.sail1Color, selectShip.sail2Color], [gameData.cannonSvg[`${selectShip.shipIdx}_${selectShip.cannon0}_1`], gameData.cannonSvg[`${selectShip.shipIdx}_${selectShip.cannon1}_2`], gameData.cannonSvg[`${selectShip.shipIdx}_${selectShip.cannon2}_3`]])}}></svg>
													{selectShip.figure !== '' && <svg className="ship_face" style={{filter:`drop-shadow(0 0 7px ${gameData.ships.figureColor[gameData.ships.figurehead[selectShip.figure].color][2]})`}} xmlns="http://www.w3.org/2000/svg" width="200px" height="200px" viewBox="0 0 200 200" dangerouslySetInnerHTML={{__html: util.setFigureColor(gameData.figureSvg[gameData.ships.figurehead[selectShip.figure].display], gameData.ships.figureColor, gameData.ships.figurehead[selectShip.figure].color)}}></svg>}
												</div>
											</div>
											{selectShip.anchor !== '' && <div className="display_anchor on">
												<ItemPic className="pic" itemPic={imgSet.anchor[selectShip.anchor]} />
											</div>}
										</>
									)}
								</div>
								<div className="ship_option_container">
									{cateList.map((data, idx) => {
										if (typeof selectItem1.selectCate[idx] === 'number') {
											const items = selectItem1.selectCate[idx] === 0 ? gameItem[cateList[idx].na][selectItem1.save[idx]] : shipItem[cateList[idx].na][selectItem1.save[idx]];
											const grade = items.grade || 1;
											return (
													<ShipOption className={`ship_option ship_${data.classNa} ${gameData.itemGrade.txt_e[grade].toLowerCase()} ${selectCate === idx ? 'on' : ''}`} key={`shipList${idx}`} onClick={() => {
														setSelectCate(idx);
														setSelectItem2({save:selectItem1.save[idx],game:selectItem1.game[idx],select:selectItem1.select[idx],selectCate:selectCate[idx],userHave:selectItem1.userHave[idx]});
													}}>
														<div className="ship_option_box">
															{idx === 2 ? (
																<ItemPic className="pic" style={{transform:'scale(1.5)'}}>
																	<svg className="ship_face" xmlns="http://www.w3.org/2000/svg" width="200px" height="200px" viewBox="0 0 200 200" dangerouslySetInnerHTML={{__html: util.setFigureColor(gameData.figureSvg[items.display], gameData.ships.figureColor, gameData.ships.figurehead[items.idx].color)}}></svg>
																</ItemPic>
															) : (
																<ItemPic className="pic" itemPic={imgSet[cateList[selectItem1.selectCate[idx]].imgName][items.display]}>
																	{items.displayText && <span className="display_text">{items.displayText}</span>}
																</ItemPic>
															)}
														</div>
														{(idx === 4 || idx === 5 || idx === 6) && (
															<SailColor className="sail_color" color={selectShip[`${cateList[idx].classNa}Color`]} onClick={() => {
																setShowPicker(true);
																colorChip.current = idx;
															}}/>
														)}
													</ShipOption>
											)
										} else {
											return (
												<ShipOption className={`ship_option none ship_${data.classNa} ${selectCate === idx ? 'on' : ''}`} key={`shipList${idx}`} onClick={() => {
													if (selectShip.shipIdx === '' && idx > 0) {
														setMsgOn(true);
														setMsg(gameData.msg.sentence.selectBlueprint[lang]);
													} else {
														setSelectCate(idx);
														setSelectItem2({save:{},game:{},select:'',selectCate:'',userHave:''});
													}
												}}>
													<div className="ship_option_box">
														{idx !== 0 && <ItemPic className="pic" itemPic={imgSet[cateList[idx].imgName][0]} />
														}
													</div>
												</ShipOption>
											)
										}
									})}
								</div>
								<div className="wave">
									<div className="wave0"></div>
									<div className="wave1"></div>
									<div className="wave2"></div>
									<div className="wave3"></div>
									<div className="wave4"></div>
									<div className="wave5"></div>
									<div className="wave6"></div>
									<div className="wave7"></div>
									<div className="wave8"></div>
								</div>
							</>
						)}
						{shipList[selectTab].na === 'remodeling' && (
							<>
								
								<div className="wave">
									<div className="wave0"></div>
									<div className="wave1"></div>
									<div className="wave2"></div>
									<div className="wave3"></div>
									<div className="wave4"></div>
									<div className="wave5"></div>
									<div className="wave6"></div>
									<div className="wave7"></div>
									<div className="wave8"></div>
								</div>
							</>
						)}
						{shipList[selectTab].na === 'possessed' && (
							<>
								<div className="ship_possessed">
									<WoodDeco className="wood_deco" shipNum={saveData.ship.length} brick={imgSet.etc.stateBack}>
										<div className="bar1"></div>
										{possessedShip.current.map((data, idx) => {
											const shipX = 100 / saveData.ship.length,
												shipLeft = shipX * idx + shipX;
											return (
												<div className="bar2" style={{left:`${shipLeft}%`}} key={`possessedShip${idx}`}></div>
											)}
										)}
									</WoodDeco>
									{saveData.ship.length > 0 && saveData.ship.map((shipD, shipIdx) => {
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
											<div className={`ship_display size${shipSize(shipD.shipIdx)} ship${shipD.shipIdx}`} key={`shipIdx${shipIdx}`} onClick={() => {
												
											}}>
												<ShipName className="ship_name" iconCardName={iconCardName}>{shipD.resource.name}</ShipName>
												<div className="ship_moveX">
													<div className="ship_moveY">
														<svg className="ship_body" xmlns="http://www.w3.org/2000/svg" width="320px" height="600px" viewBox="0 0 320 600" dangerouslySetInnerHTML={{__html: util.setShipColor(gameData.shipSvg[shipD.shipIdx], imgSet.wood[shipD.wood] || imgSet.transparent, gameData.ships.woodColor[gameData.ships.wood[shipD.wood]?.woodColor ?? 4], Math.random().toString(36).substring(2, 11), [gameData.sailSvg[shipSail[0]], gameData.sailSvg[shipSail[1]], gameData.sailSvg[shipSail[2]]], [shipSailColor[0], shipSailColor[1], shipSailColor[2]], [gameData.cannonSvg[shipCannon[0]], gameData.cannonSvg[shipCannon[1]], gameData.cannonSvg[shipCannon[2]]])}}></svg>
														{shipD.figure !== '' && <svg className="ship_face" style={{filter:`drop-shadow(0 0 7px ${gameData.ships.figureColor[gameData.ships.figurehead[shipD.figure].color][2]})`}} xmlns="http://www.w3.org/2000/svg" width="200px" height="200px" viewBox="0 0 200 200" dangerouslySetInnerHTML={{__html: util.setFigureColor(gameData.figureSvg[gameData.ships.figurehead[shipD.figure].display], gameData.ships.figureColor, gameData.ships.figurehead[shipD.figure].color)}}></svg>}
													</div>
												</div>
												{shipD.anchor !== '' && <div className="display_anchor on">
													<ItemPic className="pic" itemPic={imgSet.anchor[shipD.anchor]} />
												</div>}
											</div>
										)
									}
									)}
								</div>
								<div className="wave">
									<div className="wave0"></div>
									<div className="wave1"></div>
									<div className="wave2"></div>
									<div className="wave3"></div>
									<div className="wave4"></div>
									<div className="wave5"></div>
									<div className="wave6"></div>
									<div className="wave7"></div>
									<div className="wave8"></div>
								</div>
							</>
						)}
					</div>
					<div className="ship_bottom">
						<div className="action_select">
							{Object.keys(actionCh).length !== 0 && (<div ref={actionRef} className={`ch_select_area ${actionCh.idx ? 'g' + saveData.ch[actionCh.idx].grade : ''}`} onClick={() => {
									setPopupOn(true);
								}}>
									<ActionChDisplay type="shipyard" saveData={saveData} gameData={gameData} actionCh={actionCh} imgSet={imgSet}/>
								</div>
							)}
						</div>
						<div className={`item_select scroll-y item_select1 num2`}>
							{typeof selectCate === 'number' && item[selectCate].map((data, idx) => {
								if (data === '') {
									return (
										<div className={`item_layout ${selectItem1.userHave[selectCate] === false && selectItem1.selectCate[selectCate] === selectCate && selectItem1.select[selectCate] === idx ? 'select1' : ''}`} key={`cateItem_${idx}`} onClick={() => {
											setSelectItem2({
												save:{},
												game:{},
												select:'',
												selectCate:'',
												userHave:'',
											});
											let cloneItem = {...selectItem1};
											cloneItem.save[selectCate] = {};
											cloneItem.game[selectCate] = {};
											cloneItem.select[selectCate] = '';
											cloneItem.selectCate[selectCate] = '';
											cloneItem.userHave[selectCate] = '';
											setSelectItem1(cloneItem);

											let cloneShip = {...selectShip}
											if (selectCate !== 0) {
												cloneShip[cateList[selectCate].classNa] = '';
											}
											valuePrice(cloneShip, shipItem, setSelectShip, shipInfo, setShipInfo);
										}}>
										</div>
									)
								} else {
									const items = selectCate === 0 ? gameItem[cateList[selectCate].na][data] : shipItem[cateList[selectCate].na][data];
									const grade = items.grade || 1;
									return (
										<div className={`item_layout ${gameData.itemGrade.txt_e[grade].toLowerCase()} ${selectItem1.userHave[selectCate] === false && selectItem1.selectCate[selectCate] === selectCate && selectItem1.select[selectCate] === idx ? 'select1' : ''}`} key={`cateItem_${idx}`} onClick={() => {
											const itemSelect = item[selectCate][idx];
											let cloneShip = {};
											setSelectItem2({
												save:itemSelect,
												game:items,
												select:idx,
												selectCate:selectCate,
												userHave:false,
											});
											if (selectCate === 0) { //배 사이즈
												let cloneItem = {save:[],game:[],select:[],selectCate:[],userHave:[]};
												cloneItem.save[0] = itemSelect;
												cloneItem.game[0] = items;
												cloneItem.select[0] = idx;
												cloneItem.selectCate[0] = 0;
												cloneItem.userHave[0] = false;
												setSelectItem1(cloneItem);
												cloneShip = {shipIdx:'',wood:'',figure:'',anchor:'',sail0:'',sail1:'',sail2:'',sail0Color:'#fff',sail1Color:'#fff',sail2Color:'#fff',cannon0:'',cannon1:'',cannon2:''};
												cloneShip.shipIdx = itemSelect - 27;
											} else {
												let cloneItem = {...selectItem1};
												cloneItem.save[selectCate] = itemSelect;
												cloneItem.game[selectCate] = items;
												cloneItem.select[selectCate] = idx;
												cloneItem.selectCate[selectCate] = selectCate;
												cloneItem.userHave[selectCate] = false;
												setSelectItem1(cloneItem);

												cloneShip = {...selectShip};
												cloneShip[cateList[selectCate].classNa] = itemSelect;
											}
											valuePrice(cloneShip, shipItem, setSelectShip, shipInfo, setShipInfo);
										}}>
										{selectCate === 2 ? (
											<ItemPic className="pic" style={{transform:'scale(1.5)'}}>
												<svg className="ship_face" xmlns="http://www.w3.org/2000/svg" width="200px" height="200px" viewBox="0 0 200 200" dangerouslySetInnerHTML={{__html: util.setFigureColor(gameData.figureSvg[items.display], gameData.ships.figureColor, gameData.ships.figurehead[items.idx].color)}}></svg>
											</ItemPic>
										) : (
											<ItemPic className="pic" itemPic={imgSet[cateList[selectCate].imgName][items.display]}>
												{items.displayText && <span className="display_text">{items.displayText}</span>}
											</ItemPic>
										)}
										</div>
									)}
								}
							)}
							{typeof selectCate === 'number' && hasItem[selectCate].map((data, idx) => {
								if (data === '') {
									return (
										<div className={`item_layout ${selectItem1.userHave[selectCate] === false && selectItem1.selectCate[selectCate] === selectCate && selectItem1.select[selectCate] === idx ? 'select1' : ''}`} key={`cateItem_${idx}`} onClick={() => {
											setSelectItem2({
												save:{},
												game:{},
												select:'',
												selectCate:'',
												userHave:'',
											});
											let cloneItem = {...selectItem1};
											cloneItem.save[selectCate] = {};
											cloneItem.game[selectCate] = {};
											cloneItem.select[selectCate] = '';
											cloneItem.selectCate[selectCate] = '';
											cloneItem.userHave[selectCate] = '';
											setSelectItem1(cloneItem);

											let cloneShip = {...selectShip}
											if (selectCate !== 0) {
												cloneShip[cateList[selectCate].classNa] = '';
											}
											valuePrice(cloneShip, shipItem, setSelectShip, shipInfo, setShipInfo);
										}}>
										</div>
									)
								} else {
									const items = selectCate === 0 ? gameItem[cateList[selectCate].na][data] : shipItem[cateList[selectCate].na][data];
									const grade = items.grade || 1;
									return (
										<div className={`item_layout ${gameData.itemGrade.txt_e[grade].toLowerCase()} ${selectItem1.userHave[selectCate] === true && selectItem1.selectCate[selectCate] === selectCate && selectItem1.select[selectCate] === idx ? 'select1' : ''}`} key={`cateItem_${idx}`} onClick={() => {
											const itemSelect = hasItem[selectCate][idx];
											let cloneShip = {};
											setSelectItem2({
												save:itemSelect,
												game:items,
												select:idx,
												selectCate:selectCate,
												userHave:true,
											});
											if (selectCate === 0) { //배 사이즈
												let cloneItem = {save:[],game:[],select:[],selectCate:[],userHave:[]};
												cloneItem.save[0] = itemSelect;
												cloneItem.game[0] = items;
												cloneItem.select[0] = idx;
												cloneItem.selectCate[0] = 0;
												cloneItem.userHave[0] = true;
												setSelectItem1(cloneItem);
												cloneShip = {shipIdx:'',wood:'',figure:'',anchor:'',sail0:'',sail1:'',sail2:'',sail0Color:'#fff',sail1Color:'#fff',sail2Color:'#fff',cannon0:'',cannon1:'',cannon2:''};
												cloneShip.shipIdx = itemSelect - 27;
											} else {
												let cloneItem = {...selectItem1};
												cloneItem.save[selectCate] = itemSelect;
												cloneItem.game[selectCate] = items;
												cloneItem.select[selectCate] = idx;
												cloneItem.selectCate[selectCate] = selectCate;
												cloneItem.userHave[selectCate] = true;
												setSelectItem1(cloneItem);
												cloneShip = {...selectShip};
												cloneShip[cateList[selectCate].classNa] = itemSelect;
											}
											valuePrice(cloneShip, shipItem, setSelectShip, shipInfo, setShipInfo);
										}}>
											<ItemPic className="pic" itemPic={imgSet[cateList[selectCate].imgName][items.display]}>
												{items.displayText && <span className="display_text">{items.displayText}</span>}
											</ItemPic>
										</div>
									)}
								}
							)}
						</div>
						{typeof selectItem2.save === 'number' ? (
							<ItemContainer className={`item_select item_select2 items`} color={gameData.itemGrade.color[selectItem2.save.grade]}>
								<li className="item_header" flex-center="true"><span className="item_name" dangerouslySetInnerHTML={{__html: `${selectItem2.game.na[lang]}`}}></span></li>
								<li className="item_fix" flex="true">
									<div className={`item ${gameData.itemGrade.txt_e[selectItem2.save.grade || selectItem2.game.grade || 1].toLowerCase()}`}>
										{selectCate === 2 ? (
											<ItemPic className="pic" style={{transform:'scale(1.5)'}}>
												<svg className="ship_face" xmlns="http://www.w3.org/2000/svg" width="200px" height="200px" viewBox="0 0 200 200" dangerouslySetInnerHTML={{__html: util.setFigureColor(gameData.figureSvg[selectItem2.game.display], gameData.ships.figureColor, gameData.ships.figurehead[selectItem2.game.idx].color)}}></svg>
											</ItemPic>
										) : (
											<ItemPic className="pic" itemPic={imgSet[cateList[selectCate].imgName][selectItem2.game.display]} />
										)}
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
							</ItemContainer>
						) : (
							<ItemContainer className={`item_select item_select2 items`}></ItemContainer>
						)}
					</div>
				</div>
				{<div className={`color_picker ${showPicker ? 'on': ''}`}>
					<canvas ref={canvasRef} width="200" height="129" onTouchEnd={(e) => {
						const pos = [e.changedTouches[0].pageX - (canvasRef.current.offsetLeft - 100), e.changedTouches[0].pageY - (canvasRef.current.offsetTop - 64.5)];
						const color = `rgba(${ctx.getImageData(pos[0],pos[1],1,1).data[0]},${ctx.getImageData(pos[0],pos[1],1,1).data[1]},${ctx.getImageData(pos[0],pos[1],1,1).data[2]},1)`;
						canColorRef.current.style.background = color;
						setShowPicker(false);
						let cloneSelectShip = {...selectShip}
						cloneSelectShip[`${cateList[colorChip.current].classNa}Color`] = color;
						setSelectShip(cloneSelectShip);
					}} onTouchMove={(e) => {
						const pos = [e.changedTouches[0].pageX - (canvasRef.current.offsetLeft - 100), e.changedTouches[0].pageY - (canvasRef.current.offsetTop - 64.5)];
						canColorRef.current.style.background = `rgba(${ctx.getImageData(pos[0],pos[1],1,1).data[0]},${ctx.getImageData(pos[0],pos[1],1,1).data[1]},${ctx.getImageData(pos[0],pos[1],1,1).data[2]},1)`;
					}}></canvas>
					<div className="shadow" onClick={() => {
						setShowPicker(false);
					}}></div>
					<div ref={canColorRef} className="select_color"></div>
				</div>}
				{shipInfoOn && <div className="ship_info" onClick={() => {
						setShipInfoOn(false);
					}}>
					<ShipContract className="ship_data" scroll={imgSet.back[6]} stamp={imgSet.back[7]}>
						<div className="ship_scroll">
							<ul>
								<li className="ship_buildName"><input type="text" value={shipInfo.name} maxLength="13" onClick={(e) => {
									e.stopPropagation();
								}} onChange={(e) => {
									let cloneShipInfo = {...shipInfo};
									cloneShipInfo.name = e.target.value;
									setShipInfo(cloneShipInfo);
								}}/></li>
								<li>{`${gameData.msg.ship.durability[lang]}: ${shipInfo.durability}`}</li>
								<li>{`${gameData.msg.ship.loadage[lang]}: ${shipInfo.loadage} kg`}</li>
								<li>{`${gameData.msg.ship.knot[lang]}: ${shipInfo.knot} knot`}</li>
								<li>{`${gameData.msg.ship.space[lang]}: ${shipInfo.space}`}</li>
								{selectShip.cannon0 !== '' && <li>{`${gameData.msg.ship.cannon[lang]}1: ${shipInfo.cannon[0]}`}</li>}
								{selectShip.cannon1 !== '' && <li>{`${gameData.msg.ship.cannon[lang]}2: ${shipInfo.cannon[1]}`}</li>}
								{selectShip.cannon2 !== '' && <li>{`${gameData.msg.ship.cannon[lang]}3: ${shipInfo.cannon[2]}`}</li>}
								<li className="ship_buildCh">{`${gameData.msg.info.shipBuilder[lang]}: ${actionCh.idx !== '' ? gameData.ch[saveData.ch[actionCh.idx].idx].na1 : gameData.msg.info.undefined[lang]}`}</li>
								<li className="ship_buildPrice">{`₩ ${util.comma(shipInfo.price)}`}</li>
							</ul>
							<button text="true" className="button_sign" onClick={(e) => {
								e.stopPropagation();
								if (selectShip.wood === '') {
									setShipInfoOn(false);
									setMsgOn(true);
									setMsg(gameData.msg.sentence.selectWood[lang]);
									return;
								} else if (selectShip.sail0 === '' && selectShip.sail1 === '' && selectShip.sail2 === '') {
									setShipInfoOn(false);
									setMsgOn(true);
									setMsg(gameData.msg.sentence.selectSail[lang]);
									return;
								} else if (selectShip.anchor === ''){
									setShipInfoOn(false);
									setMsgOn(true);
									setMsg(gameData.msg.sentence.selectAnchor[lang]);
									return;
								} else if (shipInfo.name === ''){
									setMsgOn(true);
									setMsg(gameData.msg.sentence.selectShipName[lang]);
									document.querySelector('.ship_buildName input').focus();
									return;
								}
								if (actionCh.idx === '') {
									setMsgOn(true);
									setMsg(gameData.msg.sentenceFn.selectSkillCh(lang,gameData.skill[202].na));
									return;
								}
								if (saveData.info.money < shipInfo.price) {
									setMsgOn(true);
									setMsg(gameData.msg.sentence.lackMoney[lang]);
									return;
								} else  {
									let sData = {...saveData};
									sData.info.money -= shipInfo.price;
									let shipSail = [],
										shipCannon = [];
									for (let i = 0; i < 3; i++){
										if (selectShip['sail' + i] !== '') {
											shipSail[i] = {type:selectShip['sail' + i],color:selectShip['sail' + i + 'Color']};
										}
										if (selectShip['cannon' + i] !== '') {
											shipCannon[i] = selectShip['cannon' + i];
										}
									}
									sData.ship.push({
										stay:saveData.info.stay,
										shipIdx:selectShip.shipIdx,
										wood:selectShip.wood,
										figure:selectShip.figure,
										anchor:selectShip.anchor,
										sail:shipSail,
										cannon:shipCannon,
										resource:{
											name:shipInfo.name,
											price:shipInfo.price,
											durability:shipInfo.durability,
											loadage:shipInfo.loadage,
											knot:shipInfo.knot,
											space:new Array(shipInfo.space).fill(0),
											cannon:shipInfo.cannon,
										},
										loadedItem:[],
									});
									changeSaveData(sData);
									//초기화
									setSelectCate('');
									setSelectTab(2);
									setShipInfoOn(false);
									setSelectShip({shipIdx:'',wood:'',figure:'',anchor:'',sail0:'',sail1:'',sail2:'',sail0Color:'#fff',sail1Color:'#fff',sail2Color:'#fff',cannon0:'',cannon1:'',cannon2:''});
									setShipInfo({name:'',price:0,durability:0,loadage:0,knot:0,space:0});
									setSelectItem1({save:[],game:[],select:[],selectCate:[],userHave:[]});
									setSelectItem2({save:{},game:{},select:'',selectCate:'',userHave:''});
								}
							}}>{gameData.msg.ship.sign[lang]}</button>
						</div>
					</ShipContract>
				</div>}
			</ShipWrap>
			<PopupContainer>
        {popupOn && <Popup type={'selectCh'} dataObj={popupInfo} saveData={saveData} changeSaveData={changeSaveData} showPopup={setPopupOn} msgText={setMsg} showMsg={setMsgOn}/>}
      </PopupContainer>
      <MsgContainer>
        {msgOn && <Msg text={msg} showMsg={setMsgOn}></Msg>}
      </MsgContainer>
		</>
  );
}

export default Shipyard;
