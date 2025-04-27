import { AppContext } from 'App';
import { ActionChDisplay } from 'components/Components';
import { ItemPic } from 'components/ImagePic';
import { util } from 'components/Libs';
import Modal from 'components/Modal';
import ModalContainer from 'components/ModalContainer';
import Msg from 'components/Msg';
import MsgContainer from 'components/MsgContainer';
import Popup from 'components/Popup';
import PopupContainer from 'components/PopupContainer';
import TabMenu from 'components/TabMenu';
import 'css/combineItem.css';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
	display: flex;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	flex-direction: column;
	padding: 0 0 20px 0;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	overflow: hidden;
`;

const combineList = [
	{na:'equip',icon:11,keyName:"equip"},
	{na:'hole',icon:14,keyName:"hole"},
	{na:'upgrade',icon:15,keyName:"upgrade"},
	{na:'material',icon:13,keyName:"material"},
	{na:'etc',icon:16,keyName:"etc"},
];

const ShopIcon = styled.span`
	background:url(${({ icoType }) => icoType}) no-repeat left center;background-size:100%;
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
			<Wrap>
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
									setMsg(gameData.msg.sentenceFn.selectSkillCh(lang, gameData.skill[203].na));
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
														util.getItem({
															saveData: sData,
															gameData: gameData,
															changeSaveData: changeSaveData,
															option: option,
															isSave:	true,
															lang: lang
														});
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
														<ItemPic className="pic" pic="itemEtc" type="hole" idx={holePic} />
													</span>
												);
											})}
										</span>
									</>
								)}
								{cate === 'hole' && (
									<ItemPic className="pic" pic="itemEtc" type="hole" idx={items.display} />
								)}
								{cate === 'upgrade' && (
									<ItemPic className="pic" pic="itemEtc" type="upgrade" idx={items.display} />
								)}
								{cate === 'material' && (
									<ItemPic className="pic" pic="itemEtc" type="material" idx={items.display} />
								)}
								{cate === 'etc' && (
									<ItemPic className="pic" pic="itemEtc" type="etc" idx={items.display}>
									{items.displayText && <span className="display_text">{items.displayText}</span>}</ItemPic>
								)}
							</div>
							)
						})}
					</div>
				</div>
				<div className="combineItem_bottom">
					<TabMenu list={combineList} selectTab={selectTab} setSelectTab={setSelectTab} className="transition" />
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
														<ItemPic className="pic" pic="itemEtc" type="hole" idx={holePic} />
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
										<ItemPic className="pic" pic="itemEtc" type={combineList[selectTab].keyName} idx={items.display} />
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
										<ItemPic className="pic" pic="itemEtc" type={combineList[selectTab].keyName} idx={items.display} />
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
										<ItemPic className="pic" pic="itemEtc" type={combineList[selectTab].keyName} idx={items.display} />
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
										<ItemPic className="pic" pic="itemEtc" type={combineList[selectTab].keyName} idx={items.display}>
											{items.displayText && <span className="display_text">{items.displayText}</span>}
										</ItemPic>
									</div>
								)
							}
						})}
					</div>
				</div>
			</Wrap>
			<PopupContainer>
        {popupOn && <Popup type={'selectCh'} dataObj={popupInfo} saveData={saveData} changeSaveData={changeSaveData} showPopup={setPopupOn} msgText={setMsg} showMsg={setMsgOn} />}
      </PopupContainer>
			<ModalContainer>
				{modalOn && <Modal submitFn={() => {}} type={modalType} dataObj={modalInfo} saveData={saveData} changeSaveData={changeSaveData} onClose={() => {
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
