import { AppContext } from 'App';
import { ItemPic, MarkPic } from 'components/ImagePic';
import ItemGradeColor from 'components/ItemGradeColor';
import { util } from 'components/Libs';
import TabMenu from 'components/TabMenu';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const InvenWrap = styled.div`
`;
const InvenTop = styled.div`
	display: flex;
	margin: 0 0 10px 0;
	height: calc(50% - 10px);
	padding: 0 20px;
	flex-grow: 1;
`;
const InvenTopLeft = styled.div`
	position: relative;
	width: 30%;
`;
const InvenScrollContent = styled.div`
	position: relative;
	padding: 5px;
	flex-wrap: wrap;
	width: 70%;
	height: 100%;
	border-radius: 0 10px 10px 10px;
	background: rgba(0,0,0,.5);
	box-sizing: border-box;
`;
const InvenBottom = styled.div`
	display: flex;
	padding: 0 20px;
	height: 50%;
`;
const ItemContainer = styled.ul`
  display: flex;
	${({itemSelect}) => itemSelect === 'select1' ? `
		border: 3px double #ffac2f;
	` : `
		margin: 0 0 0 5px;
		border: 3px double #e14040;
	`}
	flex-direction: column;
	width: 50%;
	background: rgba(0,0,0,.7);
  border-image: url(${({frameBack}) => frameBack}) 5 round;
	& > div {
		padding: 5px;
		width: 100%;
		box-sizing: border-box;
	}
	&.on {
		outline: 5px solid #000;
	}
	.item {
		position: relative;
		width: 50px;
		height: 50px;
	}
	.item:after {
		content: '';
		position: absolute;
		left: 50%;
		top: 2px;
		transform: translate(-50%,0);
		color: #fff;
		text-shadow: -1px -1px 0 #fff, 1px 1px 0 #000;
	}
	.item.favorite1:after {
		content: '■';
		color: #ffff00;
	}
	.item.favorite2:after {
		content: '♥';
		color: #ff0000;
	}
	.item.favorite3:after {
		content: '●';
		color: #ff00ff;
	}
	.item.favorite4:after {
		content: '♠';
		color: #00ffff;
	}
	.item.favorite5:after {
		content: '♣';
		color: #00ff00;
	}
`;
const ItemName = styled.div`
  .item_grade{color:${({ color }) => color};}
`;
//equip, hole, upgrade, merterial, etc
const invenList = [
	{na:'equip',icon:11},
	{na:'hole',icon:14},
	{na:'upgrade',icon:15},
	{na:'material',icon:16},
	{na:'etc',icon:17},
];
const Inven = ({
	saveData,
	changeSaveData,
}) => {
  const navigate = useNavigate();
	const {state} = useLocation();
	console.log(state);
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
  // const [modalOn, setModalOn] = useState(false);
	// const [modalInfo, setModalInfo] = useState({});
  // const [modalType, setModalType] = useState();
  const [popupOn, setPopupOn] = useState(false);
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");
	const [selectTab, setSelectTab] = useState(0);
	const [item, setItem] = useState({...saveData.items});
	const [selectArea, setSelectArea] = useState('area1');
	const [selectItem1, setSelectItem1] = useState({save:[],game:[],buttonType:[],selectTab:'',select:''});
	const [selectItem2, setSelectItem2] = useState({save:[],game:[],buttonType:[],selectTab:'',select:''});
	// const [actionCh, setActionCh] = useState({});//행동할 캐릭터 데이터
	// const actionRef = useRef();//행동할 캐릭터 선택자
	useEffect(() => {
		//equip, hole, upgrade, merterial, etc
		//console.log(saveData.items);
		setItem({...saveData.items});
	}, [saveData]);
  return (
		<>
			<InvenWrap className="wrap">
				<InvenTop>
					<InvenTopLeft>
						<TabMenu direction="vertical" list={invenList} selectTab={selectTab} setSelectTab={setSelectTab} className="transition" />
					</InvenTopLeft>
					<InvenScrollContent className="num4 scroll-y">
						{item[invenList[selectTab].na] && item[invenList[selectTab].na].map((data, idx) => {
							const cate = invenList[selectTab].na;
							if (cate === 'equip') {
								const itemsGrade = data.grade < 5 ? 0 : data.grade - 5;
								const items = data.part === 3 ? gameItem.equip[data.part][data.weaponType][itemsGrade][data.idx] : gameItem.equip[data.part][0][itemsGrade][data.idx];
								const itemsHole = data.hole;
								return (
									<div className={`item_layout ${gameData.itemGrade.txt_e[data.grade].toLowerCase()} ${selectItem1.selectTab === invenList[selectTab].na && selectItem1.select === idx ? 'select1' : ''} ${selectItem2.selectTab === invenList[selectTab].na && selectItem2.select === idx ? 'select2' : ''} favorite${data.favorite}`} key={`items${idx}`} onClick={() => {
										if (selectArea === 'area2') {
											let button = ['sell'];
											if (data.sealed) {
												button.push('evaluate');
											}
											if (selectItem1.select !== '' && selectItem1.selectTab === invenList[selectTab].na && selectItem1.select === idx) {
												setSelectItem1({save:{},game:{},select:'',selectTab:'',buttonType:[]});
											}
											setSelectItem2({
												save:data,
												game:items,
												select:idx,
												selectTab:invenList[selectTab].na,
												buttonType:button,
											});
										} else {
											let button = ['sell'];
											if (data.sealed) {
												button.push('evaluate');
											}
											if (selectItem2.select !== '' && selectItem2.selectTab === invenList[selectTab].na && selectItem2.select === idx) {
												setSelectItem2({save:{},game:{},select:'',selectTab:'',buttonType:[]});
											}
											setSelectItem1({
												save:data,
												game:items,
												select:idx,
												selectTab:invenList[selectTab].na,
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
														{holeData !== 0 && 
															<ItemPic className="pic" pic="itemEtc" type="hole" idx={holePic} />}
													</span>
												);
											})}
										</span>
									</div>
								)
							} else if (cate === 'hole') {
								const items = gameItem.hole[data.idx];
								const grade = data.grade || items.grade;
								return (
									<div className={`item_layout ${gameData.itemGrade.txt_e[grade].toLowerCase()} ${selectItem1.selectTab === invenList[selectTab].na && selectItem1.select === idx ? 'select1' : ''} ${selectItem2.selectTab === invenList[selectTab].na && selectItem2.select === idx ? 'select2' : ''}`} key={`items${idx}`} onClick={() => {
										if (selectArea === 'area2') {
											if (selectItem1.save && (Object.entries(data).toString() === Object.entries(selectItem1.save).toString())) {
												setSelectItem1({save:[],game:[],buttonType:[],selectTab:'',select:''});
											}
											let button = ['sell'];
											if (selectItem1.select !== '' && selectItem1.selectTab === invenList[selectTab].na && selectItem1.select === idx) {
												setSelectItem1({save:{},game:{},select:'',selectTab:'',buttonType:[]});
											}
											setSelectItem2({
												save:data,
												game:items,
												select:idx,
												selectTab:invenList[selectTab].na,
												buttonType:button,
											});
										} else {
											if (selectItem2.save && (Object.entries(data).toString() === Object.entries(selectItem2.save).toString())) {
												setSelectItem2({save:[],game:[],buttonType:[],selectTab:'',select:''});
											}
											let button = ['sell'];
											if (selectItem2.select !== '' && selectItem2.selectTab === invenList[selectTab].na && selectItem2.select === idx) {
												setSelectItem2({save:{},game:{},select:'',selectTab:'',buttonType:[]});
											}
											setSelectItem1({
												save:data,
												game:items,
												select:idx,
												selectTab:invenList[selectTab].na,
												buttonType:button,
											});
										}
									}}>
										<ItemPic className="pic" pic="itemEtc" type={invenList[selectTab].na} idx={items.display} />
									</div>
								)
							} else if (cate === 'upgrade') {
								const items = gameItem.upgrade[data.idx];
								const grade = data.grade || items.grade;
								return (
									<div className={`item_layout ${gameData.itemGrade.txt_e[grade].toLowerCase()} ${selectItem1.selectTab === invenList[selectTab].na && selectItem1.select === idx ? 'select1' : ''} ${selectItem2.selectTab === invenList[selectTab].na && selectItem2.select === idx ? 'select2' : ''}`} key={`items${idx}`} onClick={() => {
										if (selectArea === 'area2') {
											if (selectItem1.save && (Object.entries(data).toString() === Object.entries(selectItem1.save).toString())) {
												setSelectItem1({save:[],game:[],buttonType:[],selectTab:'',select:''});
											}
											let button = ['sell'];
											if (selectItem1.select !== '' && selectItem1.selectTab === invenList[selectTab].na && selectItem1.select === idx) {
												setSelectItem1({save:{},game:{},select:'',selectTab:'',buttonType:[]});
											}
											setSelectItem2({
												save:data,
												game:items,
												select:idx,
												selectTab:invenList[selectTab].na,
												buttonType:button,
											});
										} else {
											if (selectItem2.save && (Object.entries(data).toString() === Object.entries(selectItem2.save).toString())) {
												setSelectItem2({save:[],game:[],buttonType:[],selectTab:'',select:''});
											}
											let button = ['sell'];
											if (selectItem2.select !== '' && selectItem2.selectTab === invenList[selectTab].na && selectItem2.select === idx) {
												setSelectItem2({save:{},game:{},select:'',selectTab:'',buttonType:[]});
											}
											setSelectItem1({
												save:data,
												game:items,
												select:idx,
												selectTab:invenList[selectTab].na,
												buttonType:button,
											});
										}
									}}>
										<ItemPic className="pic" pic="itemEtc" type={invenList[selectTab].na} idx={items.display} />
									</div>
								)
							} else if (cate === 'material') {
								const items = gameItem.material[data.idx];
								const grade = data.grade || items.grade;
								return (
									<div className={`item_layout ${gameData.itemGrade.txt_e[grade].toLowerCase()} ${selectItem1.selectTab === invenList[selectTab].na && selectItem1.select === idx ? 'select1' : ''} ${selectItem2.selectTab === invenList[selectTab].na && selectItem2.select === idx ? 'select2' : ''}`} key={`items${idx}`} onClick={() => {
										if (selectArea === 'area2') {
											if (selectItem1.save && (Object.entries(data).toString() === Object.entries(selectItem1.save).toString())) {
												setSelectItem1({save:[],game:[],buttonType:[],selectTab:'',select:''});
											}
											let button = ['sell'];
											if (selectItem1.select !== '' && selectItem1.selectTab === invenList[selectTab].na && selectItem1.select === idx) {
												setSelectItem1({save:{},game:{},select:'',selectTab:'',buttonType:[]});
											}
											setSelectItem2({
												save:data,
												game:items,
												select:idx,
												selectTab:invenList[selectTab].na,
												buttonType:button,
											});
										} else {
											if (selectItem2.save && (Object.entries(data).toString() === Object.entries(selectItem2.save).toString())) {
												setSelectItem2({save:[],game:[],buttonType:[],selectTab:'',select:''});
											}
											let button = ['sell'];
											if (selectItem2.select !== '' && selectItem2.selectTab === invenList[selectTab].na && selectItem2.select === idx) {
												setSelectItem2({save:{},game:{},select:'',selectTab:'',buttonType:[]});
											}
											setSelectItem1({
												save:data,
												game:items,
												select:idx,
												selectTab:invenList[selectTab].na,
												buttonType:button,
											});
										}
									}}>
										<ItemPic className="pic" pic="itemEtc" type={invenList[selectTab].na} idx={items.display} />
									</div>
								)
							} else if (cate === 'etc') {
								const items = gameItem.etc[data.idx];
								const grade = data.grade || items.grade;
								return (
									<div className={`item_layout ${gameData.itemGrade.txt_e[grade].toLowerCase()} ${selectItem1.selectTab === invenList[selectTab].na && selectItem1.select === idx ? 'select1' : ''} ${selectItem2.selectTab === invenList[selectTab].na && selectItem2.select === idx ? 'select2' : ''}`} key={`items${idx}`} onClick={() => {
										if (selectArea === 'area2') {
											if (selectItem1.save && (Object.entries(data).toString() === Object.entries(selectItem1.save).toString())) {
												setSelectItem1({save:[],game:[],buttonType:[],selectTab:'',select:''});
											}
											let button = ['sell'];
											if (items.invenUse) {
												button.push('use');
											}
											if (selectItem1.select !== '' && selectItem1.selectTab === invenList[selectTab].na && selectItem1.select === idx) {
												setSelectItem1({save:{},game:{},select:'',selectTab:'',buttonType:[]});
											}
											setSelectItem2({
												save:data,
												game:items,
												select:idx,
												selectTab:invenList[selectTab].na,
												buttonType:button,
											});
										} else {
											if (selectItem2.save && (Object.entries(data).toString() === Object.entries(selectItem2.save).toString())) {
												setSelectItem2({save:[],game:[],buttonType:[],selectTab:'',select:''});
											}
											let button = ['sell'];
											if (items.invenUse) {
												button.push('use');
											}
											if (selectItem2.select !== '' && selectItem2.selectTab === invenList[selectTab].na && selectItem2.select === idx) {
												setSelectItem2({save:{},game:{},select:'',selectTab:'',buttonType:[]});
											}
											setSelectItem1({
												save:data,
												game:items,
												select:idx,
												selectTab:invenList[selectTab].na,
												buttonType:button,
											});
										}
									}}>
										<ItemPic className="pic" pic="itemEtc" type={invenList[selectTab].na} idx={items.display}>
											{items.displayText && <span className="display_text">{items.displayText}</span>}
										</ItemPic>
									</div>
								)
							}
						})}
					</InvenScrollContent>
				</InvenTop>
				<InvenBottom>
					{Object.keys(selectItem1.save).length !== 0 ? (
						<ItemContainer className={`item_select item_select1 items ${selectArea === "area1" ? "on" : ""}`} itemSelect="select1" color={gameData.itemGrade.color[selectItem1.save.grade]} onClick={() => {
							setSelectArea('area1');
						}}>
							{selectItem1.selectTab === 'equip' && (
								<>
									<li className="item_header" flex-center="true"><span className="item_name" dangerouslySetInnerHTML={{__html: `${selectItem1.save.colorantSet ? util.getColorant(selectItem1.save.colorantSet, gameData).na[lang] : ''} ${selectItem1.save.modifier[lang]} ${selectItem1.game.na[lang]}`}}></span></li>
									<li className="item_fix" flex="true">
										<ItemGradeColor part={selectItem1.game.part} grade={gameData.itemGrade.txt_e[selectItem1.save.grade].toLowerCase()} sealed={selectItem1.save.sealed} size="50">
											<ItemPic type="equip" className={`item favorite${selectItem1.save.favorite}`} onClick={(e) => {
												e.stopPropagation();
												let sData = {...saveData},
													cloneSelectItem = {...selectItem1};
												cloneSelectItem.save.favorite = ++cloneSelectItem.save.favorite > 5 ? 1 : cloneSelectItem.save.favorite;
												setSelectItem1(cloneSelectItem);
												sData.items.equip[cloneSelectItem.select].favorite = cloneSelectItem.save.favorite;
												changeSaveData(sData);
												console.log('즐겨찾기');
											}}>
												<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[selectItem1.game.display], selectItem1.save.color, selectItem1.save.svgColor || selectItem1.save.id)}}></svg>
											</ItemPic>
										</ItemGradeColor>
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
											<div className="item_type">
												<MarkPic length={selectItem1.save.markNum} pic="icon100" idx={selectItem1.save.mark} />
											</div>
											<div className="item_slot">
												{selectItem1.save.hole.map((holeData, idx) => {
													const holePic = holeData !== 0 ? gameItem.hole[holeData.idx].display : 0;
													return (
														<div key={`hole${idx}`} className={`item_holes ${holePic !== 0 ? 'fixed': ''}`}>
															<span className="item_holeback">
                    						<ItemPic pic="itemEtc" type="hole" idx={holePic} />
															</span>
														</div>
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
								</>
							)}
							{selectItem1.selectTab === 'hole' && (
								<>
									<li className="item_header" flex-center="true"><span className="item_name" dangerouslySetInnerHTML={{__html: `${selectItem1.game.na[lang]}`}}></span></li>
									<li className="item_fix" flex="true">
										<div className={`item ${gameData.itemGrade.txt_e[selectItem1.save.grade || selectItem1.game.grade].toLowerCase()}`}>
											<ItemPic className="pic" pic="itemEtc" type={selectItem1.selectTab} idx={selectItem1.game.display} />
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
									{selectItem1.game.idx < 100 && (
										<div className="scroll-y">
											<li className="item_list item_eff">
												<div className="item_title">{gameData.msg.itemInfo.itemEffect[lang]}</div>
												{util.getTotalEff(selectItem1.save, gameData).map((eff, idx) => {
													return (
														<div key={idx} className="item_effs"><span className="cate">{util.getEffectType(eff.type, lang)}</span>{eff.base > 0 && <span className="base">{eff.base}</span>}{eff.add > 0 && <span className="add">{eff.add}</span>}{eff.hole > 0 && <span className="hole">{eff.hole}</span>}<span className="total">{selectItem1.save.sealed ? eff.base : eff.base + eff.add + eff.hole}</span></div>
													)
												})}
											</li>
										</div>
									)}
								</>
							)}
							{selectItem1.selectTab !== 'equip' && selectItem1.selectTab !== 'hole' && (
								<>
									<li className="item_header" flex-center="true"><span className="item_name" dangerouslySetInnerHTML={{__html: `${selectItem1.game.na[lang]}`}}></span></li>
									<li className="item_fix" flex="true">
										<div className={`item ${gameData.itemGrade.txt_e[selectItem1.save.grade || selectItem1.game.grade].toLowerCase()}`}>
											<ItemPic className="pic" pic="itemEtc" type={selectItem1.selectTab} idx={selectItem1.game.display} />
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
								</>
							)}
							<li className="item_footer" flex-v="true">
								{(selectItem1.selectTab === 'equip' || selectItem1.selectTab === 'hole') ? (
									<div className="item_price"><span>{gameData.msg.itemInfo.sellPrice[lang]}</span><em>{`₩${util.comma(selectItem1.game.price * (selectItem1.game.grade || selectItem1.save.grade))}`}</em></div>
								) : (
									<div className="item_price"><span>{gameData.msg.itemInfo.sellPrice[lang]}</span><em>{`₩${util.comma(selectItem1.game.price)}`}</em></div>
								)}
								<div flex-end="true">
								{selectItem1.buttonType && selectItem1.buttonType.map((buttonData, idx) => {
									switch(buttonData) {
										case "sell":
											return (
												<div key={`button${idx}`} className="item_button" flex="true">
													<button text="true" className="button_small" onClick={(e) => {
														if (selectItem1.selectTab === 'equip' && selectItem1.game.part !== 4 && selectItem1.game.part !== 5) {
															navigate('../shop');
														} else {
															navigate('../tool');
														}
														// util.buttonEvent({
														// 	event: e,
														// 	type: 'itemSell',
														// 	data: {
														// 		slotIdx: 0,
														// 		gameItem: selectItem1.game,
														// 		itemSaveSlot:selectItem1.select,
														// 		type: selectItem1.selectTab,
														// 	},
														// 	saveData: saveData,
														// 	changeSaveData: changeSaveData,
														// 	gameData: gameData,
														// 	msgText: setMsg,
														// 	showMsg: setMsgOn,
														// 	showPopup: setPopupOn,
														// 	lang: lang,
														// });
														//setSelectItem1({save:[],game:[],buttonType:[],selectTab:'',select:''});
													}} data-buttontype="itemSell">{gameData.msg.button.sell[lang]}</button>
												</div>
											);
										case "socket":
											return (
												<div key={`button${idx}`} className="item_button" flex="true">
													<button text="true" className="button_small" onClick={(e) => {
													}} data-buttontype="itemSocket">{gameData.msg.button.socket[lang]}</button>
												</div>
											)
										case "evaluate":
											return (
												<div key={`button${idx}`} className="item_button" flex="true">
													<button text="true" className="button_small" onClick={(e) => {
														util.buttonEvent({
															event: e,
															type: 'itemEvaluate',
															data: {
																slotIdx:0,
																gameItem:selectItem1.game,
																itemSaveSlot:selectItem1.select,
																saveItemData:saveData.items.equip[selectItem1.select],
																type:'hequip',
															},
															saveData: saveData,
															changeSaveData: changeSaveData,
															gameData: gameData,
															msgText: setMsg,
															showMsg: setMsgOn,
															showPopup: setPopupOn,
															lang: lang,
														});
														setSelectItem1({
															...selectItem1,
															save:{...item[invenList[selectTab].na][selectItem1.select]},
														});
													}} data-buttontype="itemSell">{gameData.msg.button.emotions[lang]}</button>
												</div>
											);
										case 'use':
											return (
												<div key={`button${idx}`} className="item_button" flex="true">
													<button text="true" className="button_small" onClick={(e) => {
														util.buttonEvent({
															event: e,
															type: 'itemUse',
															data: {
																slotIdx: 0,
																gameItem: selectItem1.game,
																itemSaveSlot:selectItem1.select,
																type: selectItem1.selectTab,
															},
															saveData: saveData,
															changeSaveData: changeSaveData,
															gameData: gameData,
															msgText: setMsg,
															showMsg: setMsgOn,
															showPopup: setPopupOn,
															lang: lang,
														});
														setSelectItem1({save:[],game:[],buttonType:[],selectTab:'',select:''});
													}} data-buttontype="itemUse">{gameData.msg.button.use[lang]}</button>
												</div>
											)
										default:
											break;
									}
								})}
								</div>
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
							{selectItem2.selectTab === 'equip' && (
								<>
									<li className="item_header" flex-center="true"><span className="item_name" dangerouslySetInnerHTML={{__html: `${selectItem2.save.colorantSet ? util.getColorant(selectItem2.save.colorantSet, gameData).na[lang] : ''} ${selectItem2.save.modifier[lang]} ${selectItem2.game.na[lang]}`}}></span></li>
									<li className="item_fix" flex="true">
										<ItemGradeColor part={selectItem2.game.part} grade={gameData.itemGrade.txt_e[selectItem2.save.grade].toLowerCase()} sealed={selectItem2.save.sealed} size="50">
											<ItemPic type="equip" className={`item favorite${selectItem2.save.favorite}`} onClick={(e) => {
												e.stopPropagation();
												let sData = {...saveData},
													cloneSelectItem = {...selectItem2};
												cloneSelectItem.save.favorite = ++cloneSelectItem.save.favorite > 5 ? 1 : cloneSelectItem.save.favorite;
												setSelectItem2(cloneSelectItem);
												sData.items.equip[cloneSelectItem.select].favorite = cloneSelectItem.save.favorite;
												changeSaveData(sData);
												console.log('즐겨찾기');
											}}>
												<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[selectItem2.game.display], selectItem2.save.color, selectItem2.save.svgColor || selectItem2.save.id)}}></svg>
											</ItemPic>
										</ItemGradeColor>
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
											<div className="item_type">
												<MarkPic length={selectItem2.save.markNum} pic="icon100" idx={selectItem2.save.mark} />
											</div>
											<div className="item_slot">
												{selectItem2.save.hole.map((holeData, idx) => {
													const holePic = holeData !== 0 ? gameItem.hole[holeData.idx].display : 0;
													return (
														<div key={`hole${idx}`} className={`item_holes ${holePic !== 0 ? 'fixed': ''}`}>
															<span className="item_holeback">
                    						<ItemPic pic="itemEtc" type="hole" idx={holePic} />
															</span>
														</div>
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
								</>
							)}
							{selectItem2.selectTab === 'hole' && (
								<>
									<li className="item_header" flex-center="true"><span className="item_name" dangerouslySetInnerHTML={{__html: `${selectItem2.game.na[lang]}`}}></span></li>
									<li className="item_fix" flex="true">
										<div className={`item ${gameData.itemGrade.txt_e[selectItem2.save.grade || selectItem2.game.grade].toLowerCase()}`}>
											<ItemPic className="pic" pic="itemEtc" type={selectItem2.selectTab} idx={selectItem2.game.display} />
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
									{selectItem2.game.idx < 100 && (
										<div className="scroll-y">
											<li className="item_list item_eff">
												<div className="item_title">{gameData.msg.itemInfo.itemEffect[lang]}</div>
												{util.getTotalEff(selectItem2.save, gameData).map((eff, idx) => {
													return (
														<div key={idx} className="item_effs"><span className="cate">{util.getEffectType(eff.type, lang)}</span>{eff.base > 0 && <span className="base">{eff.base}</span>}{eff.add > 0 && <span className="add">{eff.add}</span>}{eff.hole > 0 && <span className="hole">{eff.hole}</span>}<span className="total">{eff.base + eff.add + eff.hole}</span></div>
													)
												})}
											</li>
										</div>
									)}
								</>
							)}
							{selectItem2.selectTab !== 'equip' && selectItem2.selectTab !== 'hole' && (
								<>
									<li className="item_header" flex-center="true"><span className="item_name" dangerouslySetInnerHTML={{__html: `${selectItem2.game.na[lang]}`}}></span></li>
									<li className="item_fix" flex="true">
										<div className={`item ${gameData.itemGrade.txt_e[selectItem2.save.grade || selectItem2.game.grade].toLowerCase()}`}>
											<ItemPic className="pic" pic="itemEtc" type={selectItem2.selectTab} idx={selectItem2.game.display} />
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
								</>
							)}
							<li className="item_footer" flex-v="true">
								{selectItem2.selectTab === 'equip' ? (
									<div className="item_price"><span>{gameData.msg.itemInfo.sellPrice[lang]}</span><em>{`₩${util.comma((selectItem2.game.price < 1000 ? 1000 : selectItem2.game.price) * 2 * selectItem2.save.grade)}`}</em></div>
								) : (
									<div className="item_price"><span>{gameData.msg.itemInfo.sellPrice[lang]}</span><em>{`₩${util.comma(selectItem2.game.price)}`}</em></div>
								)}
								<div flex-end="true">
								{selectItem2.buttonType && selectItem2.buttonType.map((buttonData, idx) => {
									switch(buttonData) {
										case "sell":
											return (
												<div key={`button${idx}`} className="item_button" flex="true">
													<button text="true" className="button_small" onClick={(e) => {
														if (selectItem2.selectTab === 'equip' && selectItem2.game.part !== 4 && selectItem2.game.part !== 5) {
															navigate('../shop');
														} else {
															navigate('../tool');
														}
														// util.buttonEvent({
														// 	event: e,
														// 	type: 'itemSell',
														// 	data: {
														// 		slotIdx: 0,
														// 		gameItem: selectItem2.game,
														// 		itemSaveSlot:selectItem2.select,
														// 		type: selectItem2.selectTab,
														// 	},
														// 	saveData: saveData,
														// 	changeSaveData: changeSaveData,
														// 	gameData: gameData,
														// 	msgText: setMsg,
														// 	showMsg: setMsgOn,
														// 	showPopup: setPopupOn,
														// 	lang: lang,
														// });
														// setSelectItem2({save:[],game:[],buttonType:[],selectTab:'',select:''});
													}} data-buttontype="itemSell">{gameData.msg.button.sell[lang]}</button>
												</div>
											);
										case "socket":
											return (
												<div key={`button${idx}`} className="item_button" flex="true">
													<button text="true" className="button_small" onClick={(e) => {
													}} data-buttontype="itemSocket">{gameData.msg.button.socket[lang]}</button>
												</div>
											)
										case "evaluate":
											return (
												<div key={`button${idx}`} className="item_button" flex="true">
													<button text="true" className="button_small" onClick={(e) => {
														util.buttonEvent({
															event: e,
															type: 'itemEvaluate',
															data: {
																slotIdx:0,
																gameItem:selectItem2.game,
																itemSaveSlot:selectItem2.select,
																saveItemData:saveData.items.equip[selectItem2.select],
																type:'hequip',
															},
															saveData: saveData,
															changeSaveData: changeSaveData,
															gameData: gameData,
															msgText: setMsg,
															showMsg: setMsgOn,
															showPopup: setPopupOn,
															lang: lang,
														});
														setSelectItem2({
															...selectItem2,
															save:{...item[invenList[selectTab].na][selectItem2.select]},
														});
													}} data-buttontype="itemSell">{gameData.msg.button.emotions[lang]}</button>
												</div>
											);
										case 'use':
											return (
												<div key={`button${idx}`} className="item_button" flex="true">
													<button text="true" className="button_small" onClick={(e) => {
														util.buttonEvent({
															event: e,
															type: 'itemUse',
															data: {
																slotIdx: 0,
																gameItem: selectItem2.game,
																itemSaveSlot:selectItem2.select,
																type: selectItem2.selectTab,
															},
															saveData: saveData,
															changeSaveData: changeSaveData,
															gameData: gameData,
															msgText: setMsg,
															showMsg: setMsgOn,
															showPopup: setPopupOn,
															lang: lang,
														});
														setSelectItem2({save:[],game:[],buttonType:[],selectTab:'',select:''});
													}} data-buttontype="itemUse">{gameData.msg.button.use[lang]}</button>
												</div>
											)
										default:
											break;
									}
								})}
								</div>
							</li>
						</ItemContainer>
					) : (
						<ItemContainer className={`item_select item_select2 items ${selectArea === "area2" ? "on" : ""}`} onClick={() => {
							setSelectArea('area2');
						}}></ItemContainer>
					)}
				</InvenBottom>
			</InvenWrap>
			{/* <ModalContainer>
				{modalOn && <Modal submitFn={changeGachaMode} type={modalType} dataObj={modalInfo} saveData={saveData} changeSaveData={changeSaveData} onClose={() => {handleModal()}} gameData={gameData}/>}
			</ModalContainer> */}
		</>
  );
}

export default Inven;
