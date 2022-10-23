import { AppContext } from 'App';
import { util } from 'components/Libs';
import Modal from 'components/Modal';
import ModalContainer from 'components/ModalContainer';
import React, { useEffect, useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import MsgContainer from 'components/MsgContainer';
import Msg from 'components/Msg';
import 'css/itemEnhancement.css';

const Img = styled.img.attrs(
  ({imgurl}) => ({
    src: imgurl 
  })
)``;
const ItemEnWrap = styled.div`
	background:url(${({backImg}) => backImg});background-size:cover;
`;
const ShopIcon = styled.span`
	background:url(${({ icoType }) => icoType}) no-repeat left center;background-size:100%;
`;
const ItemPic = styled.div`
  display:inline-block;width:100%;height:100%;background-image:url(${({itemPic}) => itemPic});background-size:100%;background-repeat:no-repeat;
`;
const itemEnList = [
	{na:{ko:"소켓합성", en:"Socket"},icon:"iconSocket"},
	{na:{ko:"등급진화", en:"Upgrade"},icon:"iconUpgrade"},
];
const ColorArea = styled.div`
	&:after{
		content:'';position:absolute;left:0;right:0;top:0;bottom:0;background:transparent;filter:blur(4px);border-radius:50%;pointer-events:none;
	}
	&.hole1:after{
		background:
		radial-gradient(ellipse at 50% 50%, ${({mainColor}) => mainColor ? mainColor[0] : 'transparent'},transparent 40%),
		radial-gradient(ellipse at 50% 0%, ${({color}) => color[0] ? color[0].color : 'transparent'},transparent 100%);
	}
	&.hole2:after{
		background:
		radial-gradient(ellipse at 50% 50%, ${({mainColor}) => mainColor ? mainColor[0] : 'transparent'},transparent 40%),
		radial-gradient(ellipse at 50% 10%, ${({color}) => color[0] ? color[0].color : 'transparent'},transparent 90%),
		radial-gradient(ellipse at 50% 90%, ${({color}) => color[1] ? color[1].color : 'transparent'},transparent 90%);
	}
	&.hole3:after{
		background:
		radial-gradient(ellipse at 50% 50%, ${({mainColor}) => mainColor ? mainColor[0] : 'transparent'},transparent 40%),
		radial-gradient(ellipse at 50% 10%, ${({color}) => color[0] ? color[0].color : 'transparent'},transparent 80%),
		radial-gradient(ellipse at 80% 90%, ${({color}) => color[1] ? color[1].color : 'transparent'},transparent 80%),
		radial-gradient(ellipse at 20% 90%, ${({color}) => color[2] ? color[2].color : 'transparent'},transparent 80%);
	}
	&.hole4:after{
		background:
		radial-gradient(ellipse at 50% 50%, ${({mainColor}) => mainColor ? mainColor[0] : 'transparent'},transparent 40%),
		radial-gradient(ellipse at 15% 15%, ${({color}) => color[0] ? color[0].color : 'transparent'},transparent 70%),
		radial-gradient(ellipse at 85% 15%, ${({color}) => color[1] ? color[1].color : 'transparent'},transparent 70%),
		radial-gradient(ellipse at 85% 85%, ${({color}) => color[2] ? color[2].color : 'transparent'},transparent 70%),
		radial-gradient(ellipse at 15% 85%, ${({color}) => color[3] ? color[3].color : 'transparent'},transparent 70%);
	}
	&.hole5:after{
		background:
		radial-gradient(ellipse at 50% 50%, ${({mainColor}) => mainColor ? mainColor[0] : 'transparent'},transparent 40%),
		radial-gradient(ellipse at 50% 10%, ${({color}) => color[0] ? color[0].color : 'transparent'},transparent 60%),
		radial-gradient(ellipse at 85% 35%, ${({color}) => color[1] ? color[1].color : 'transparent'},transparent 60%),
		radial-gradient(ellipse at 70% 100%, ${({color}) => color[2] ? color[2].color : 'transparent'},transparent 60%),
		radial-gradient(ellipse at 30% 100%, ${({color}) => color[3] ? color[3].color : 'transparent'},transparent 60%),
		radial-gradient(ellipse at 15% 35%, ${({color}) => color[4] ? color[4].color : 'transparent'},transparent 60%);
	}
`;
const ItemTotalEff = styled.div`
	border:5px solid transparent;
  border-image:url(${({frameBack}) => frameBack}) 5 round;
`;
const LockIcon = styled.div`
	background-image:url(${({iconLock}) => iconLock});background-size:100%;background-repeat:no-repeat;background-position:center center;
`;
const colorMix = (util, mainColor, color) => {
	let colorNum = [0,0,0];
	const mRgb = mainColor.indexOf('rgb') >= 0 ? mainColor.replace(/\s/g,'').replace(/rgba\(([0-9]{1,3})\,([0-9]{1,3})\,([0-9]{1,3})\,[0-9,\.]{1,5}\)/g,`$1,$2,$3`).split(',') : util.getHslaToRgba(mainColor).replace(/\s/g,'').replace(/rgba\(([0-9]{1,3})\,([0-9]{1,3})\,([0-9]{1,3})\,[0-9,\.]{1,5}\)/g,`$1,$2,$3`).split(',');
	color.forEach((colorData, idx) => {
		const rgb = colorData ? colorData.replace(/\s/g,'').replace(/rgba\(([0-9]{1,3})\,([0-9]{1,3})\,([0-9]{1,3})\,[0-9,\.]{1,5}\)/g,`$1,$2,$3`).split(',') : ['0','0','0'];
		// let sortArr = rgb.sort((a,b) => {
		// 	return b.substr(1,3)*1 - a.substr(1,3)*1;
		// });
		// if (sortArr[0].substr(1,3)*1 - sortArr[1].substr(1,3)*1 > 100) {
		// 	sortArr = sortArr.map((num, idx) => {
		// 		return idx === 0 ? num.substr(0,1) + Math.floor((num.substr(1,3)*1)*0.4) : num.substr(0,1) + Math.floor((num.substr(1,3)*1)*0.2);
		// 	});
		// } else {
		// 	sortArr = sortArr.map((num, idx) => {
		// 		return num.substr(0,1) + Math.floor((num.substr(1,3)*1)*0.2);
		// 	});
		// }
		rgb.forEach((num, idx) => {
			colorNum[idx] += Math.floor((num*1 - mRgb[idx]*1) * 0.1);
		});
	});
	const changeColor = `rgba(${mRgb[0]*1 + colorNum[0]},${mRgb[1]*1 + colorNum[1]},${mRgb[2]*1 + colorNum[2]},1)`;
	
	console.log(colorNum, mRgb,changeColor)
	return changeColor;
}
const getTotalEff = (saveItems, gameData, socketEff) => {
	let totalEff = [];
	const grade = saveItems.grade;
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
	if (socketEff) {
		socketEff.save.forEach((data, idx) => {
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
	}
	return totalEff;
}
const removeSocket = (data, saveData, gameData, changeSaveData) => {
	let sData = {...saveData};
	let removeIdx = sData.items.etc.findIndex((itemEtc) => itemEtc.idx === 22);
	if (removeIdx >= 0) {
		sData.items.etc.splice(removeIdx,1);
		sData.items.equip[data.item.select].hole.splice(data.socketIdx,1,0);
		data.showMsg(true);
    data.msgText('<span remove>-1 보석제거 집게</span>');
		changeSaveData(sData);
	} else {
		data.showMsg(true);
    data.msgText('보석제거 집게가 부족합니다.');
	}
	console.log(data);
}
const ItemEnhancement = ({
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
  const [modalType] = useState('confirm');
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");
	const [selectTab, setSelectTab] = useState(0);
	const [item, setItem] = useState(saveData.items);
	const [selectItem1, setSelectItem1] = useState(saveData.items.equip[0] ? {
		save:saveData.items.equip[0],
		select:0,
		game:gameItem.equip[saveData.items.equip[0].part][saveData.items.equip[0].weaponType][saveData.items.equip[0].grade < 5 ? 0 : saveData.items.equip[0].grade - 5][saveData.items.equip[0].idx],
	} : {
		save:{},
		select:'',
		game:{},
	});//좌측 장비 save, game
	const [possibleHole, setPossibleHole] = useState([]);
	const [selectItem2, setSelectItem2] = useState({save:[],select:[],game:[]});//우측 홀 save, game
	const [colorantIdx, setColorantIdx] = useState(0);
	const [mainColor, setMainColor] = useState(saveData.items.equip[0] ? saveData.items.equip[0].color : '');//합성된 장비 색상
	const [itemEffShow, setItemEffShow] = useState(false);//아이템 효과 보기
	const [mItemEff, setMItemEff] = useState();//아이템 효과 문구
	const handleModal = (socketIdx) => {
		let num = 0;
		const hasSocketRemover = () => {
			item.etc.forEach((itemEtc) => {
				if (itemEtc.idx === 22) {
					num ++;
				};
			});
			return num;
		}
		setModalInfo({
			type: 'confirm',
			msg: `소켓 보석을 제거 하시겠습니까?<br/><em>(${gameData.items.etc[22].na[lang]}: ${hasSocketRemover()}개 보유)</em>`,
			info: {
				item:selectItem1,
				socket:selectItem2,
				socketIdx:socketIdx,
				showMsg:setMsgOn,
				msgText:setMsg,
			},
			bt: [{txt:'사용',action:'itemEn'},{txt:'취소',action:'popClose'}],
		});
    setModalOn(true);
  }
	useEffect(() => {
		//equip, hole, upgrade, merterial, etc
		setItem(saveData.items);
		let baseSelectItem = {save:[],select:[],game:[]},
		possibleColorantIdx = '';
		let pHole = [];
		if (saveData.items.equip[selectItem1.select]) {
			saveData.items.equip[selectItem1.select].hole.forEach((data,idx) => {
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
			});
			setPossibleHole(pHole);
			setSelectItem2(baseSelectItem);
			setColorantIdx(possibleColorantIdx);
			setMItemEff(getTotalEff(selectItem1.save, gameData, baseSelectItem));
		}
	}, [saveData]);
  return (
		<>
			<ItemEnWrap className="itemEnhancement_wrap" backImg={imgSet.back[2]} >
				<div className="inven_menu transition">
					{itemEnList && itemEnList.map((data, idx) => {
						return (
								<li key={`itemEn_${idx}`} className={idx === selectTab ? "on" : ""} onClick={() => {
									setSelectTab(idx);
								}}>
									<button className="itemEn_menu_button">
										<span className="name">{`${lang === "ko" ? data.na.ko : data.na.en}`}</span>
										<ShopIcon className="icon" icoType={imgSet.icon[data.icon]} />
									</button>
								</li>
							);
					})}
				</div>
				<div className="itemEn_area">
					{selectTab === 0 ? (
						<>
							<div className="itemEn_top" onClick={(e) => {
									e.stopPropagation();
									if (itemEffShow) {
										setItemEffShow(false);
									}
								}}>
								<button className="button_small" text="true" onClick={(e) => {
									e.stopPropagation();
									let pHole = [],
										possibleColorantIdx = '';
									let sData = {...saveData};
									console.log("확정");
									let holeArr = [];
									console.log(selectItem2.select);
									for(let i = 0; i < selectItem1.save.hole.length; ++i) {
										if (selectItem2.save[i]) {
											holeArr[i] = selectItem2.save[i];
											pHole[i] = false;
										} else {
											holeArr[i] = 0;
											pHole[i] = true;
											if (typeof possibleColorantIdx !== 'number') {
												possibleColorantIdx = i;
											}
										}
									}
									selectItem2.select.forEach((data) => {
										sData.items.hole.splice(data,1);
									})
									sData.items.equip[selectItem1.select].hole = holeArr;
									changeSaveData(sData);
									setPossibleHole(pHole);
									setColorantIdx(possibleColorantIdx);
                }} data-buttontype="itemUnpack">{lang === 'ko' ? '확정' : 'Confirm'}</button>
								<ColorArea className={`itemEn_colorArea hole${Object.keys(selectItem1.save).length !== 0 ? selectItem1.save?.hole.length : '0'}`} mainColor={mainColor} color={selectItem2.game}>
									<div className="colorant_item" onClick={() => {
										setItemEffShow(true);
									}}>
										{Object.keys(selectItem1.save).length !== 0 && (
											<span className={`pic ${selectItem1.save.sealed ? "sealed" : ""}`}>
												<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[selectItem1.game.display], mainColor || selectItem1.save.color || selectItem1.game.color, Math.random().toString(36).substring(2, 11))}}>
												</svg>
											</span>
										)}
									</div>
									{itemEffShow && <ItemTotalEff frameBack={imgSet.etc.frameChBack} className="colorant_itemEff scroll-y">
										<ul>
											<li className="item_list item_eff">
												<div className="item_title">{lang === 'ko' ? '아이템 효과' : 'Item effect'}</div>
												{mItemEff && mItemEff.map((eff, idx) => {
													return (
														<div key={idx} className="item_effs"><span className="cate">{util.getEffectType(eff.type, lang)}</span>{eff.base > 0 && <span className="base">{eff.base}</span>}{eff.add > 0 && <span className="add">{eff.add}</span>}{eff.hole > 0 && <span className="hole">{eff.hole}</span>}<span className="total">{eff.base + eff.add + eff.hole}</span></div>
													)
												})}
											</li>
											<div style={{width:"100%"}}>
												{selectItem1.save.baseEff.length > 0 && (
													<li className="item_list item_eff">
														<div className="item_title">{lang === 'ko' ? '기본 효과' : 'Base effect'}</div>
														{selectItem1.save.baseEff.map((data, idx) => {
															const grade = selectItem1.save.grade > 3 ? 3 : selectItem1.save.grade - 1;
															return (
																<div key={`base${idx}`} className="item_effs">{`${util.getEffectType(data.type, lang)} ${data.num[grade]}`}</div>
															) 
														})}
													</li>
												)}
												{selectItem1.save.addEff.length > 0 && (
													<li className="item_list item_eff">
														<div className="item_title">{lang === 'ko' ? '추가 효과' : 'Additional effect'}</div>
														{selectItem1.save.addEff.map((data, idx) => {
															return (
																<div key={`add${idx}`} className="item_effs add">{`${util.getEffectType(data.type, lang)} ${data.num[0]}`}</div>
															) 
														})}
													</li>
												)}
												{selectItem1.save.hole.length > 0 && (
													<li className="item_list item_hole">
														<div className="item_title">{lang === 'ko' ? '소켓 효과' : 'Socket effect'}</div>
														{mItemEff && mItemEff.map((data, idx) => {
															if (data.hole > 0) {
																return (
																	<div key={idx} className="item_effs hole">{`${util.getEffectType(data.type, lang)} ${data.hole}`}</div>
																)
															}
														})}
													</li>
												)}
												{selectItem1.game.set !== 0 && (<li className="item_list item_set">
													<div className="item_setNa">{gameData.items.set_type[selectItem1.game.set].na}</div>
												</li>
												)}
											</div>
										</ul>
									</ItemTotalEff>
									}
									{selectItem1.save?.hole && selectItem1.save?.hole.map((data, idx) => {
										return (
											<div className={`colorant colorant${idx} ${colorantIdx === idx ? 'select' : ''} ${possibleHole[idx] ? selectItem2.game[idx] ? 'on' : '' : 'fixed'}`} key={`colorant${idx}`} onClick={() => {//상단 슬롯 클릭
												if (possibleHole[idx]) {
													if (colorantIdx === idx && selectItem2.game[colorantIdx]) {//선택된 슬롯에 홀이 있으면
													//선택된 홀 제거
													let cloneSelectItem2 = {...selectItem2};
													cloneSelectItem2.game[colorantIdx] = ''
													cloneSelectItem2.select[colorantIdx] = '';
													cloneSelectItem2.save[colorantIdx] = '';
													setSelectItem2(cloneSelectItem2);
													let cloneColor = selectItem2.game.map((data) => {
														return data.color
													});
													let saveColor = [...selectItem1.save.color];
													const mColor = colorMix(util,selectItem1.save.color[0], cloneColor);
													saveColor[0] = mColor;
													setMainColor(saveColor);
													setMItemEff(getTotalEff(selectItem1.save, gameData, cloneSelectItem2));
													}
													setColorantIdx(idx);
												}
											}}>
												{selectItem2.save && selectItem2.save[idx] && (
													<>
														<div className={`item_colorant ${gameData.itemGrade.txt_e[selectItem2.save[idx].grade || selectItem2.game[idx].grade].toLowerCase()}`}  key={`hole_${idx}`}>
															<ItemPic className="pic" itemPic={imgSet.itemHole[selectItem2.game[idx].display]} />
														</div>
														<div className={`item_colorantEff`}>
															{selectItem2.game[idx].eff.map((eff,idx) => {
																return <div className="eff" key={`colorant_eff${idx}`}>{util.getEffectType(eff.type, lang)}: <em>{eff.num[0]}</em></div>;
															})}
														</div>
														<LockIcon iconLock={imgSet.icon.iconLock} className="lock" onClick={(e) => {
															e.stopPropagation();
															handleModal(idx);
															console.log("슬롯 해제");
														}}/>
													</>
												)}
											</div>
										)
									})}
								</ColorArea>
							</div>
							<div className="itemEn_bottom scroll-y">
								<div className="item_select item_select1 num4">
									{item.equip && item.equip.map((data, idx) => {
										const itemsGrade = data.grade < 5 ? 0 : data.grade - 5;
										const items = gameItem.equip[data.part][data.weaponType][itemsGrade][data.idx];
										const grade = data.grade || items.grade;
										const itemsHole = data.hole;
										return (
											<div className={`item_layout ${gameData.itemGrade.txt_e[grade].toLowerCase()} ${selectItem1.select === idx ? 'select1' : ''}`} key={`hole_${idx}`} onClick={() => {//하단 좌측 장비 클릭
												setMainColor(data.color);//상단 장비 합성배경 색상
												let baseSelectItem = {save:[],select:[],game:[]};
												let pHole = [],
													possibleColorantIdx = '';
												data.hole.forEach((holeData,idx) => {//박혀 있는 hole셋팅
													if (holeData) {
														baseSelectItem.save[idx] = holeData;
														baseSelectItem.game[idx] = gameItem.hole[holeData.idx];
														pHole[idx] = false;
													} else {
														pHole[idx] = true;
														if (typeof possibleColorantIdx !== 'number') {
															possibleColorantIdx = idx;
														}
													}
												});
												setSelectItem1({
													save:{...data},
													select:idx,
													game:items,
												});
												setPossibleHole(pHole);
												setColorantIdx(possibleColorantIdx);
												setSelectItem2(baseSelectItem);
												setMItemEff(getTotalEff(data, gameData, baseSelectItem));
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
								<div className="item_select item_select2 num4">
									{item.hole && item.hole.map((data, idx) => {
										const items = gameItem.hole[data.idx];
										const grade = data.grade || items.grade;
										const select = selectItem2.select.filter((select) => {
											return select === idx;
										});
										return (
											<div className={`item_layout ${gameData.itemGrade.txt_e[grade].toLowerCase()} ${select.length > 0 ? 'select2' : ''}`} key={`hole_${idx}`} onClick={() => {//하단 우측 홀 클릭
												const overlapIdx = selectItem2.select.findIndex((select) => {
													return select === idx;
												});
												if (possibleHole[colorantIdx] && overlapIdx < 0 && typeof colorantIdx === 'number') {
													//선택된 홀상태 설정
													let cloneSelectItem2 = {...selectItem2};
													cloneSelectItem2.save[colorantIdx] = data;
													//하단 우측 홀 선택상태 설정
													cloneSelectItem2.select[colorantIdx] = idx;
													cloneSelectItem2.game[colorantIdx] = items;
													setSelectItem2(cloneSelectItem2);
													//슬롯 셋팅
													let cloneColor = selectItem2.game.map((data) => {
														return data.color
													});
													const mColor = colorMix(util,selectItem1.save.color[0], cloneColor);
													let saveColor = [...selectItem1.save.color];
													saveColor[0] = mColor;
													setMainColor(saveColor);
													
													setMItemEff(getTotalEff(selectItem1.save, gameData, cloneSelectItem2));
													//메인 아이템 컬러 설정
													let colorArr = [...selectItem1.save.color];
													colorArr[0] = mColor;
												}
											}}>
												<ItemPic className="pic" itemPic={imgSet.itemHole[items.display]} />
											</div>
										)
									})}
								</div>
							</div>
						</>
					) : (
						<>
							<div className="itemEn_top">
							</div>
							<div className="itemEn_bottom scroll-y">
								<div className="item_select item_select1 num4">
									{item.equip && item.equip.map((data, idx) => {
										const itemsGrade = data.grade < 5 ? 0 : data.grade - 5;
										const items = gameItem.equip[data.part][data.weaponType][itemsGrade][data.idx];
										const grade = data.grade || items.grade;
										const itemsHole = data.hole;
										return (
											<div className={`item_layout ${gameData.itemGrade.txt_e[grade].toLowerCase()}`} key={`hole_${idx}`} onClick={() => {

											}}>
												<span className={`pic ${data.sealed ? "sealed" : ""}`}>
													<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[items.display], data.color, data.id)}}>
													</svg>
												</span>
												<span className="hole" flex-center="true">
													{itemsHole.map((holedata, holeidx) => {
														return <span key={`hole${idx}_${holeidx}`} className={`hole_slot hole${holeidx}`}></span>;
													})}
												</span>
											</div>
										)
									})}
								</div>
								<div className="item_select item_select2 num4">
									{item.upgrade && item.upgrade.map((data, idx) => {
										const items = gameItem.upgrade[data.idx];
										const grade = data.grade || items.grade;
										return (
											<div className={`item_layout ${gameData.itemGrade.txt_e[grade].toLowerCase()}`} key={`upgrade_${idx}`} onClick={() => {

											}}>
												<ItemPic className="pic" itemPic={imgSet.itemUpgrade[items.display]} />
											</div>
										)
									})}
								</div>
							</div>
						</>
					)}
				</div>
			</ItemEnWrap>
			<ModalContainer>
				{modalOn && <Modal fn={removeSocket} type={modalType} dataObj={modalInfo} saveData={saveData} changeSaveData={changeSaveData} onClose={() => {
					setModalOn(false);
				}} gameData={gameData}/>}
			</ModalContainer>
      <MsgContainer>
        {msgOn && <Msg text={msg} showMsg={setMsgOn}></Msg>}
      </MsgContainer>
		</>
  );
}

export default ItemEnhancement;
