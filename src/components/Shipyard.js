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
const shipList = [
	{na:'produce',icon:"iconAccessory"},
	{na:'used',icon:"iconUpgrade"},
	{na:'possessed',icon:"iconEtc"},
];
const cateList = [
	{na:'etc',imgName:'itemEtc',classNa:'blueprint'},
	{na:'wood',imgName:'wood',classNa:'wood'},
	{na:'sail',imgName:'sail',classNa:'sail'},
	{na:'sail',imgName:'sail',classNa:'figure'},
	{na:'sail',imgName:'sail',classNa:'anchor'},
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
	const [item, setItem] = useState([[],[],[],[]]);
	const [selectShip, setSelectShip] = useState({shipIdx:9,wood:1});
	const [hasItem, setHasItem] = useState([]);
	const [selectItem1, setSelectItem1] = useState({save:[],game:[],select:[],selectCate:[],userHave:[]});//배 재료 선택
	const [selectItem2, setSelectItem2] = useState({save:{},game:{},select:'',selectCate:'',userHave:''});//재료 설명 선택
	useEffect(() => {
	}, []);
	useEffect(() => {
		if (Object.keys(saveData).length !== 0) {
			const cityData = saveData.city[cityIdx];
			const items = [
				[...cityData.shipyard.blueprint],
				[...cityData.shipyard.wood],
				[...cityData.shipyard.sail],
				[...cityData.shipyard.figure],
				[[...saveData.items.equip],[...saveData.items.upgrade],[...saveData.items.etc]],
			];
			setItem(items);
			let itemL = [[],[],[],[],[],[]];
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
				<div className="ship_area">
					<div className="ship_top">
						{shipList[selectTab].na === 'produce' && (
							<>
								<div className="ship_display select_size">
									<svg xmlns="http://www.w3.org/2000/svg" width="320px" height="600px" viewBox="0 0 320 600" dangerouslySetInnerHTML={{__html: util.setShipColor(gameData.shipSvg[selectShip.shipIdx], imgSet.wood[selectShip.wood], gameData.ships.woodColor[gameData.ships.wood[selectShip.wood].woodColor], Math.random().toString(36).substring(2, 11), [gameData.sailSvg[`${selectShip.shipIdx}_5_1`], gameData.sailSvg[`${selectShip.shipIdx}_5_2`], gameData.sailSvg[`${selectShip.shipIdx}_5_3`]], '#fff')}}></svg>
								</div>
								<div className="ship_option_container" flex-h-center="true">
									{cateList.map((data, idx) => {
										if (typeof selectItem1.selectCate[idx] === 'number') {
											const items = selectItem1.selectCate[idx] === 0 ? gameItem[cateList[selectItem1.selectCate[idx]].na][selectItem1.save[idx]] : shipItem[cateList[selectItem1.selectCate[idx]].na][selectItem1.save[idx]];
											const grade = items.grade || 1;
											return (
												<ShipOption className={`ship_option ship_${data.classNa} ${gameData.itemGrade.txt_e[grade].toLowerCase()}`} key={`shipList${idx}`} onClick={() => {
													setSelectCate(idx);
												}}>
													<ItemPic className="pic" itemPic={imgSet[cateList[selectItem1.selectCate[idx]].imgName][items.display]}>
														{items.displayText && <span className="display_text">{items.displayText}</span>}
													</ItemPic>
												</ShipOption>
											)
										} else {
											return (
												<ShipOption className={`ship_option ship_${data.classNa}`} key={`shipList${idx}`} onClick={() => {
													setSelectCate(idx);
												}}></ShipOption>
											)
										}
									})}
								</div>
							</>
						)}
					</div>
					<div className="ship_bottom">
						<div className="item_select scroll-y item_select1 num4">
							{typeof selectCate === 'number' && item[selectCate].map((data, idx) => {
								const items = selectCate === 0 ? gameItem[cateList[selectCate].na][data] : shipItem[cateList[selectCate].na][data];
								const grade = items.grade || 1;
								return (
									<div className={`item_layout ${gameData.itemGrade.txt_e[grade].toLowerCase()} ${selectItem1.userHave[selectCate] === false && selectItem1.selectCate[selectCate] === selectCate && selectItem1.select[selectCate] === idx ? 'select1' : ''}`} key={`cateItem_${idx}`} onClick={() => {
										const itemSelect = item[selectCate][idx];
										setSelectItem2({
											save:itemSelect,
											game:items,
											select:idx,
											selectCate:selectCate,
											userHave:false,
										});
										let cloneItem = {...selectItem1};
										cloneItem.save[selectCate] = itemSelect;
										cloneItem.game[selectCate] = items;
										cloneItem.select[selectCate] = idx;
										cloneItem.selectCate[selectCate] = selectCate;
										cloneItem.userHave[selectCate] = false;
										setSelectItem1(cloneItem);
									}}>
										<ItemPic className="pic" itemPic={imgSet[cateList[selectCate].imgName][items.display]}>
											{items.displayText && <span className="display_text">{items.displayText}</span>}
										</ItemPic>
									</div>
								)}
							)}
							{typeof selectCate === 'number' && hasItem[selectCate].map((data, idx) => {
								const items = selectCate === 0 ? gameItem[cateList[selectCate].na][data] : shipItem[cateList[selectCate].na][data];
								const grade = items.grade || 1;
								return (
									<div className={`item_layout ${gameData.itemGrade.txt_e[grade].toLowerCase()} ${selectItem1.userHave[selectCate] === true && selectItem1.selectCate[selectCate] === selectCate && selectItem1.select[selectCate] === idx ? 'select1' : ''}`} key={`cateItem_${idx}`} onClick={() => {
										const itemSelect = hasItem[selectCate][idx];
										setSelectItem2({
											save:itemSelect,
											game:items,
											select:idx,
											selectCate:selectCate,
											userHave:true,
										});
										let cloneItem = {...selectItem1};
										cloneItem.save[selectCate] = itemSelect;
										cloneItem.game[selectCate] = items;
										cloneItem.select[selectCate] = idx;
										cloneItem.selectCate[selectCate] = selectCate;
										cloneItem.userHave[selectCate] = true;
										setSelectItem1(cloneItem);
									}}>
										<ItemPic className="pic" itemPic={imgSet[cateList[selectCate].imgName][items.display]}>
											{items.displayText && <span className="display_text">{items.displayText}</span>}
										</ItemPic>
									</div>
								)}
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
			</ShipWrap>
			{/* <ModalContainer>
				{modalOn && <Modal fn={} type={modalType} dataObj={modalInfo} saveData={saveData} changeSaveData={changeSaveData} lang={lang} onClose={() => {handleModal()}} gameData={gameData}/>}
			</ModalContainer> */}
		</>
  );
}

export default Shipyard;
