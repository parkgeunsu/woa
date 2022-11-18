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
const ShipOption = styled.div``;
const SailColor = styled.div`
	background:${({color}) => color} !important;
`;
const shipList = [
	{na:'produce',icon:"iconAccessory"},
	{na:'used',icon:"iconUpgrade"},
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
const setColor = () => {

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
	} else if (shipIdx < 9) { //중형
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
  const [modalOn, setModalOn] = useState(false);
	const [modalInfo, setModalInfo] = useState({});
  const [modalType, setModalType] = useState();
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
	const [selectShip, setSelectShip] = useState({shipIdx:'',wood:'',figure:'',anchor:'',sail0:'',sail1:'',sail2:'',sail0Color:'#fff',sail1Color:'#fff',sail2Color:'#fff',cannon0:'',cannon1:'',cannon2:''});
	const [hasItem, setHasItem] = useState([]);//보유한 재료 선택
	const [selectItem1, setSelectItem1] = useState({save:[],game:[],select:[],selectCate:[],userHave:[]});//배 재료 선택
	const [selectItem2, setSelectItem2] = useState({save:{},game:{},select:'',selectCate:'',userHave:''});//재료 설명 선택
	useEffect(() => {
			colorPicker(canvasRef.current, imgSet.etc.color, setCtx);
	}, []);
	useEffect(() => {
		if (Object.keys(saveData).length !== 0) {
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
			let itemL = [[],[],[],[],[],[],[],[],[],[]];
			for (let key in saveData.items) {
				for (const [idx, data] of saveData.items[key].entries()) {
					if (key === 'etc') {
						switch (data.idx) {
							case 30:
							case 31:
							case 32:
								itemL[0].push(data.idx);
								break;
							default:
								break;
						}
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
				<div className={`ship_area ${selectCate ? cateList[selectCate].classNa : ''} size${shipSize(selectShip.shipIdx)} ship${selectShip.shipIdx}`}>
					<div className="ship_top">
						{shipList[selectTab].na === 'produce' && (
							<>
								<div className={`ship_display`}>
									{selectShip.shipIdx !== '' && (
										<>
											<svg className="ship_body" xmlns="http://www.w3.org/2000/svg" width="320px" height="600px" viewBox="0 0 320 600" dangerouslySetInnerHTML={{__html: util.setShipColor(gameData.shipSvg[selectShip.shipIdx], imgSet.wood[selectShip.wood] || imgSet.transparent, gameData.ships.woodColor[gameData.ships.wood[selectShip.wood]?.woodColor ?? 4], Math.random().toString(36).substring(2, 11), [gameData.sailSvg[`${selectShip.shipIdx}_${selectShip.sail0}_1`], gameData.sailSvg[`${selectShip.shipIdx}_${selectShip.sail1}_2`], gameData.sailSvg[`${selectShip.shipIdx}_${selectShip.sail2}_3`]], [selectShip.sail0Color, selectShip.sail1Color, selectShip.sail2Color], [gameData.cannonSvg[`${selectShip.shipIdx}_${selectShip.cannon0}_1`], gameData.cannonSvg[`${selectShip.shipIdx}_${selectShip.cannon1}_2`], gameData.cannonSvg[`${selectShip.shipIdx}_${selectShip.cannon2}_3`]])}}></svg>
											{selectShip.figure !== '' && <svg className="ship_face" xmlns="http://www.w3.org/2000/svg" width="200px" height="200px" viewBox="0 0 200 200" dangerouslySetInnerHTML={{__html: util.setFigureColor(gameData.figureSvg[gameData.ships.figurehead[selectShip.figure].display], gameData.ships.figureColor, gameData.ships.figurehead[selectShip.figure].color)}}></svg>}
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
													}}>
														<div className="ship_option_box">
															<ItemPic className="pic" itemPic={imgSet[cateList[selectItem1.selectCate[idx]].imgName][items.display]}>
																{items.displayText && <span className="display_text">{items.displayText}</span>}
															</ItemPic>
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
													setSelectCate(idx);
													setSelectItem2({save:{},game:{},select:'',selectCate:'',userHave:''});
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
							</>
						)}
					</div>
					<div className="ship_bottom">
						<div className={`item_select scroll-y item_select1 num4`}>
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
											setSelectShip(cloneShip);
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
												switch(itemSelect) {
													case 30://소형배
														cloneShip.shipIdx = Math.floor(Math.random()*3);
														break;
													case 31://중형배
														cloneShip.shipIdx = Math.floor(Math.random()*5) + 3;
														break;
													case 32://대형배
														cloneShip.shipIdx = Math.floor(Math.random()*4) + 9;
														break;
													default:
														break;
												}
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
											setSelectShip(cloneShip);
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
											setSelectShip(cloneShip);
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
												switch(itemSelect) {
													case 30://소형배
														cloneShip.shipIdx = Math.floor(Math.random()*3);
														break;
													case 31://중형배
														cloneShip.shipIdx = Math.floor(Math.random()*5) + 3;
														break;
													case 32://대형배
														cloneShip.shipIdx = Math.floor(Math.random()*4) + 9;
														break;
													default:
														break;
												}
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
											setSelectShip(cloneShip);
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
										<ItemPic className="pic" itemPic={imgSet[cateList[selectCate].imgName][selectItem2.game.display]} />
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
			</ShipWrap>
			{/* <ModalContainer>
				{modalOn && <Modal fn={} type={modalType} dataObj={modalInfo} saveData={saveData} changeSaveData={changeSaveData} lang={lang} onClose={() => {handleModal()}} gameData={gameData}/>}
			</ModalContainer> */}
		</>
  );
}

export default Shipyard;
