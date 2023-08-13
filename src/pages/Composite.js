import { AppContext } from 'App';
import { ActionChDisplay } from 'components/Components';
import { util } from 'components/Libs';
import Modal from 'components/Modal';
import ModalContainer from 'components/ModalContainer';
import Msg from 'components/Msg';
import MsgContainer from 'components/MsgContainer';
import Popup from 'components/Popup';
import PopupContainer from 'components/PopupContainer';
import 'css/combineItem.css';
import { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Img = styled.img.attrs(
  ({imgurl}) => ({
    src: imgurl 
  })
)``;
const CombineWrap = styled.div`
	background:url(${({backImg}) => backImg});background-size:cover;
`;

const combineList = [
	{na:{ko:"장비", en:"Equip"},icon:"iconArmor",keyName:"equip"},
	{na:{ko:"소켓", en:"Hole"},icon:"iconSocket",keyName:"hole"},
	{na:{ko:"강화", en:"Upgrade"},icon:"iconUpgrade",keyName:"upgrade"},
	{na:{ko:"재료", en:"Material"},icon:"iconMaterial",keyName:"material"},
	{na:{ko:"기타", en:"Etc"},icon:"iconEtc",keyName:"etc"},
];

const ShopIcon = styled.span`
	background:url(${({ icoType }) => icoType}) no-repeat left center;background-size:100%;
`;
const ItemPic = styled.div`
  display:inline-block;width:100%;height:100%;background-image:url(${({itemPic}) => itemPic});background-size:100%;background-repeat:no-repeat;
`;
const ItemTotalEff = styled.div`
	border:5px solid transparent;
  border-image:url(${({frameBack}) => frameBack}) 5 round;
`;
const LockIcon = styled.div`
	background-image:url(${({iconLock}) => iconLock});background-size:100%;background-repeat:no-repeat;background-position:center center;
`;

const getTotalEff = (saveItems, gameData, socketEff) => {
	let totalEff = [];
	const grade = saveItems.grade;
  for (const [idx, data] of saveItems.baseEff.entries()) {
		if (totalEff[data.type] === undefined) {
			totalEff[data.type] = {type: data.type, base: 0, add:0, hole:0};
		}
		totalEff[data.type].base += parseInt(data.num[grade - 1]);
	};
	for (const [idx, data] of saveItems.addEff.entries()) {
		if (totalEff[data.type] === undefined) {
			totalEff[data.type] = {type: data.type, base: 0, add:0, hole:0};
		}
		totalEff[data.type].add += parseInt(data.num[0]);
	};
	if (socketEff) {
		for (const data of socketEff.save) {
			if (data) {
				const holeItem = gameData.items.hole[data.idx].eff;
				for (const holeData of holeItem) {
					if (totalEff[holeData.type] === undefined) {
						totalEff[holeData.type] = {type: holeData.type, base: 0, add:0, hole:0};
					}
					totalEff[holeData.type].hole += parseInt(holeData.num);
				};
			}
		};
	}
	return totalEff;
}
const Composite = ({
	saveData,
	changeSaveData,
	gameSpd,
	lang,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
	const gameItem = gameData.items;
  const [modalOn, setModalOn] = useState(false);
	const [modalInfo, setModalInfo] = useState({});
  const [modalType] = useState('confirm');
  const [popupOn, setPopupOn] = useState(false);
  const [popupInfo, setPopupInfo] = useState({});
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");
	const [selectTab, setSelectTab] = useState(0);
	const [item, setItem] = useState([]);
	const [selectIdx, setSelectIdx] = useState(0);
	const [selectItem, setSelectItem] = useState({save:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],game:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],select:['','','','','','','','','','','','','','','',''],selectTab:['','','','','','','','','','','','','','','','']});//합성 선택 아이템 save, game
	const [actionCh, setActionCh] = useState({});//행동할 캐릭터 데이터
	const actionRef = useRef();//행동할 캐릭터 선택자
	useEffect(() => {
		//equip, hole, upgrade, merterial, etc
		if (Object.keys(saveData).length !== 0) {
			setItem(saveData.items);
			let baseSelectItem = {save:[],select:[],game:[]},
			possibleColorantIdx = '';
			let pHole = [];
			if (saveData.items.equip[selectItem.select]) {
				for (const [idx, data] of saveData.items.equip[selectItem.select].hole.entreis()) {
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
				setSelectItem(baseSelectItem);
				//setMItemEff(getTotalEff(selectItem.save, gameData, baseSelectItem));
			}
			setActionCh(saveData.actionCh.composite);
			setPopupInfo({
				ch:saveData.ch,
				actionCh:saveData.actionCh.composite.idx,
				type:'composite'
			})
		}
	}, [saveData]);
  return (
		<>
			<CombineWrap className="wrap" backImg={imgSet.back[2]} >
				<div className="combineItem_top">
					<div className="action_select has_button">
						{Object.keys(actionCh).length !== 0 && (<div ref={actionRef} className={`ch_select_area ${actionCh.idx ? 'g' + saveData.ch[actionCh.idx].grade : ''}`} onClick={() => {
								setPopupOn(true);
							}}>
								<ActionChDisplay type="composite" saveData={saveData} gameData={gameData} actionCh={actionCh} imgSet={imgSet}/>
							</div>
						)}
						<div className="button_group">
							<button className="button_big" text="true" onClick={(e) => {
								e.stopPropagation();
								if (actionCh.idx === '') {
									setMsgOn(true);
									setMsg(gameData.msg.sentenceFn.selectSkillCh(lang,gameData.skill[203].na));
									return;
								}
								console.log('합성');
								let recipeNum = 0;
								for (const data of selectItem.select) {
									if (data !== '') {
										recipeNum ++;
									}
								}
								if (!recipeNum) {
									setMsgOn(true);
									setMsg(gameData.msg.sentence.selectItem[lang]);
								} else {
									for (const recipeData of gameData.recipe[recipeNum]) {
										if (Object.keys(recipeData).length !== 0) {
											let cloneRecipe = [...recipeData.entry],
												itemArr = {get:[],remove:[]};
											for (const [idx, data] of selectItem.selectTab.entries()) {
												if (data) {
													itemArr.get = [...recipeData.get];
													for (const [cIdx, cData] of cloneRecipe.entries()) {
														if (typeof cData.idx === 'number') {//idx 반환형태
															if (data === cData.cate && selectItem.game[idx].idx === cData.idx) {
																cloneRecipe.splice(cIdx,1);
																itemArr.remove.push({cate:cData.cate, idx:selectItem.select[idx]});
																break;
															}
														} else if (cData.idx.indexOf('g') >= 0) {//등급 반환형태
															if (data === cData.cate && selectItem.save[idx].grade*1 === cData.idx.substr(1)*1) {
																cloneRecipe.splice(cIdx,1);
																itemArr.remove.push({cate:cData.cate, idx:selectItem.select[idx]});
																break;
															}
														} 
													}
												}
											}
											itemArr.remove = itemArr.remove.sort((a,b) => {
												return b.idx - a.idx;
											});
											if (cloneRecipe.length === 0) { //합성에 성공하면
												setSelectItem({save:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],game:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],select:['','','','','','','','','','','','','','','',''],selectTab:['','','','','','','','','','','','','','','','']});
												let sData = {...saveData};
												for (const [removeIdx, removeItem] of itemArr.remove.entries()) {
													sData.items[removeItem.cate].splice(removeItem.idx,1);
													if (removeIdx === itemArr.remove.length - 1) {
														
													}
												};
												for (const getItem of itemArr.get) {
													if (typeof getItem.idx === 'number') {
														sData.items[getItem.cate].unshift(gameData.items[getItem.cate][getItem.idx]);
													} else if (typeof getItem.idx === 'object') {
															const ranCount = Math.floor(Math.random() * getItem.idx.length);
															sData.items[getItem.cate].unshift(gameData.items[getItem.cate][getItem.idx[ranCount]]);
													} else if (getItem.idx.indexOf('g') >= 0) {
														const option = {
															type:'equip',
															items:Math.ceil(Math.random()*3),//장비만 해당
															//아이템종류, 세부종류(검,단검), 매직등급
															grade:getItem.idx.substr(1),
															lv:Math.round(Math.random()*100),
															sealed:true,
														}
														util.getItem(saveData, gameData, changeSaveData, option, true, lang);
													}
												};
												changeSaveData(sData);
											}
										} else {
											setMsgOn(true);
											setMsg(gameData.msg.sentence.none[lang]);
										}
									}
								}
							}}>{gameData.msg.button.composite[lang]}</button>
							<button className="button_big" text="true" onClick={(e) => {
								e.stopPropagation();
								setSelectItem({save:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],game:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],select:['','','','','','','','','','','','','','','',''],selectTab:['','','','','','','','','','','','','','','','']});
								console.log('슬롯 비우기');
							}}>{gameData.msg.button.reset[lang]}</button>
						</div>
					</div>
					<div className="combineItem_box num4">
						{selectItem.save && selectItem.save.map((data, idx) => {
							const cate = selectItem.selectTab[idx];
							let items, itemsHole;
							if (cate) {
								if (cate === 'equip') {
									const itemsGrade = data.grade < 5 ? 0 : data.grade - 5;
									items = data.part === 3 ? gameItem.equip[data.part][data.weaponType][itemsGrade][data.idx] : gameItem.equip[data.part][0][itemsGrade][data.idx];
								} else {
									items = gameItem[cate][data.idx];
								}
								itemsHole = data.hole;
							}
							return (
								<div className={`item_layout ${cate ? gameData.itemGrade.txt_e[data.grade || items.grade].toLowerCase() : ''} ${selectIdx === idx ? 'select2' : ''}`} key={`items${idx}`} onClick={() => {
									setSelectIdx(idx);
									if (selectIdx === idx && Object.keys(selectItem.save[idx]).length !== 0) {
										let cloneSelectItem = {...selectItem};
										cloneSelectItem.save[idx] = {};
										cloneSelectItem.game[idx] = {};
										cloneSelectItem.select[idx] = '';
										cloneSelectItem.selectTab[idx] = '';
										setSelectItem(cloneSelectItem);
									}
								}}>
								{cate === 'equip' && (
									<>
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
									</>
								)}
								{cate === 'hole' && (
									<ItemPic className="pic" itemPic={imgSet.itemHole[items.display]} />
								)}
								{cate === 'upgrade' && (
									<ItemPic className="pic" itemPic={imgSet.itemUpgrade[items.display]} />
								)}
								{cate === 'material' && (
									<ItemPic className="pic" itemPic={imgSet.itemMaterial[items.display]} />
								)}
								{cate === 'etc' && (
									<ItemPic className="pic" itemPic={imgSet.itemEtc[items.display]}>
									{items.displayText && <span className="display_text">{items.displayText}</span>}</ItemPic>
								)}
							</div>
							)
						})}
					</div>
				</div>
				<div className="combineItem_bottom">
					<div className="tab_menu transition">
						{combineList && combineList.map((data, idx) => {
							return (
									<li key={`itemEn_${idx}`} className={idx === selectTab ? "on" : ""} onClick={() => {
										setSelectTab(idx);
									}}>
										<button className="tab_menu_button">
											<span className="name">{`${lang === "ko" ? data.na.ko : data.na.en}`}</span>
											<ShopIcon className="icon" icoType={imgSet.icon[data.icon]} />
										</button>
									</li>
								);
						})}
					</div>
						<div className="combineItem_area num6 scroll-y">
							{item[combineList[selectTab].keyName] && item[combineList[selectTab].keyName].map((data, idx) => {
								const cate = combineList[selectTab].keyName;
								let select = false;
								for (const [selectIndex, selectData] of selectItem.selectTab.entries()) {
									if (selectData === cate && selectItem.select[selectIndex] === idx) {
										select = true;
										return;//return 시 선택된 아이템이 인벤창에서 사라짐
									}
								};
								if (cate === 'equip') {
									const itemsGrade = data.grade < 5 ? 0 : data.grade - 5;
									const items = data.part === 3 ? gameItem.equip[data.part][data.weaponType][itemsGrade][data.idx] : gameItem.equip[data.part][0][itemsGrade][data.idx];
									const itemsHole = data.hole;
									return (
										<div className={`item_layout ${gameData.itemGrade.txt_e[data.grade].toLowerCase()} ${select ? 'select' : ''}`} key={`items${idx}`} onClick={() => {
											let cloneSelectItem = {...selectItem};
											for (const [selectIndex, selectData] of cloneSelectItem.selectTab.entries()) {
												if (selectData === cate && selectItem.select[selectIndex] === idx) {
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
											cloneSelectItem.selectTab[selectIdx] = combineList[selectTab].keyName;
											setSelectItem(cloneSelectItem);
											console.log(cloneSelectItem);
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
									);
								} else if (cate === 'hole') {
									const items = gameItem.hole[data.idx];
									const grade = data.grade || items.grade;
									return (
										<div className={`item_layout ${gameData.itemGrade.txt_e[grade].toLowerCase()} ${select ? 'select' : ''}`} key={`items${idx}`} onClick={() => {
											let cloneSelectItem = {...selectItem};
											for (const [selectIndex, selectData] of cloneSelectItem.selectTab.entries()) {
												if (selectData === cate && selectItem.select[selectIndex] === idx) {
													cloneSelectItem.save[selectIndex] = {};
													cloneSelectItem.game[selectIndex] = {};
													cloneSelectItem.select[selectIndex] = '';
													cloneSelectItem.selectTab[selectIndex] = '';
													break;
												}
											};
											cloneSelectItem.save[selectIdx] = data;
											cloneSelectItem.game[selectIdx] = items;
											cloneSelectItem.select[selectIdx] = idx;
											cloneSelectItem.selectTab[selectIdx] = combineList[selectTab].keyName;
											setSelectItem(cloneSelectItem);
										}}>
											<ItemPic className="pic" itemPic={imgSet[`item${combineList[selectTab].keyName.replace(/^[a-z]/, char => char.toUpperCase())}`][items.display]} />
										</div>
									);
								} else if (cate === 'upgrade') {
									const items = gameItem.upgrade[data.idx];
									const grade = data.grade || items.grade;
									return (
										<div className={`item_layout ${gameData.itemGrade.txt_e[grade].toLowerCase()} ${select ? 'select' : ''}`} key={`items${idx}`} onClick={() => {
											let cloneSelectItem = {...selectItem};
											for (const [selectIndex, selectData] of cloneSelectItem.selectTab.entries()) {
												if (selectData === cate && selectItem.select[selectIndex] === idx) {
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
											cloneSelectItem.selectTab[selectIdx] = combineList[selectTab].keyName;
											cloneSelectItem.num += 1;
											setSelectItem(cloneSelectItem);
										}}>
											<ItemPic className="pic" itemPic={imgSet[`item${combineList[selectTab].keyName.replace(/^[a-z]/, char => char.toUpperCase())}`][items.display]} />
										</div>
									)
								} else if (cate === 'material') {
									const items = gameItem.material[data.idx];
									const grade = data.grade || items.grade;
									return (
										<div className={`item_layout ${gameData.itemGrade.txt_e[grade].toLowerCase()} ${select ? 'select' : ''}`} key={`items${idx}`} onClick={() => {
											let cloneSelectItem = {...selectItem};
											for (const [selectIndex, selectData] of cloneSelectItem.selectTab.entries()) {
												if (selectData === cate && selectItem.select[selectIndex] === idx) {
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
											cloneSelectItem.selectTab[selectIdx] = combineList[selectTab].keyName;
											setSelectItem(cloneSelectItem);
										}}>
											<ItemPic className="pic" itemPic={imgSet[`item${combineList[selectTab].keyName.replace(/^[a-z]/, char => char.toUpperCase())}`][items.display]} />
										</div>
									)
								} else if (cate === 'etc') {
									const items = gameItem.etc[data.idx];
									const grade = data.grade || items.grade;
									return (
										<div className={`item_layout ${gameData.itemGrade.txt_e[grade].toLowerCase()} ${select ? 'select' : ''}`} key={`items${idx}`} onClick={() => {
											let cloneSelectItem = {...selectItem};
											for (const [selectIndex, selectData] of cloneSelectItem.selectTab.entries()) {
												if (selectData === cate && selectItem.select[selectIndex] === idx) {
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
											cloneSelectItem.selectTab[selectIdx] = combineList[selectTab].keyName;
											cloneSelectItem.num += 1;
											setSelectItem(cloneSelectItem);
										}}>
											<ItemPic className="pic" itemPic={imgSet[`item${combineList[selectTab].keyName.replace(/^[a-z]/, char => char.toUpperCase())}`][items.display]}>
											{items.displayText && <span className="display_text">{items.displayText}</span>}</ItemPic>
										</div>
									)
								}
							})}
						</div>
				</div>
			</CombineWrap>
			<PopupContainer>
        {popupOn && <Popup type={'selectCh'} dataObj={popupInfo} saveData={saveData} changeSaveData={changeSaveData} showPopup={setPopupOn} msgText={setMsg} showMsg={setMsgOn} lang={lang} />}
      </PopupContainer>
			<ModalContainer>
				{modalOn && <Modal fn={() => {}} type={modalType} dataObj={modalInfo} saveData={saveData} changeSaveData={changeSaveData} lang={lang} onClose={() => {
					setModalOn(false);
				}} gameData={gameData}/>}
			</ModalContainer>
      <MsgContainer>
        {msgOn && <Msg text={msg} showMsg={setMsgOn}></Msg>}
      </MsgContainer>
		</>
  );
}

export default Composite;
