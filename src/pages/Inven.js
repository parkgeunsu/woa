import { ItemPic, MarkPic } from 'components/ImagePic';
import ItemGradeColor from 'components/ItemGradeColor';
import { util } from 'components/Libs';
import TabMenu from 'components/TabMenu';
import { AppContext } from 'contexts/app-context';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const InvenWrap = styled.div`
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
  const context = useContext(AppContext);
  const lang = React.useMemo(() => {
    return context.setting.lang;
  }, [context]);
  const gameData = React.useMemo(() => {
    return context.gameData;
  }, [context]);
	const gameItem = React.useMemo(() => {
		return gameData.items;
  }, [gameData]);

  const [popupOn, setPopupOn] = useState(false);
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");
	const [selectTab, setSelectTab] = useState(0);
	const [item, setItem] = useState({...saveData.items});
	const [selectArea, setSelectArea] = useState('area1');
	const [selectItem1, setSelectItem1] = useState({save:{},game:{},buttonType:[],selectTab:'',select:''});
	const [selectItem2, setSelectItem2] = useState({save:{},game:{},buttonType:[],selectTab:'',select:''});

	useEffect(() => {
		setItem({...saveData.items});
	}, [saveData]);

	const renderItemDetail = (selectItem, setSelectItem, areaName) => {
		if (Object.keys(selectItem.save).length === 0) {
			return (
				<ItemContainer className={`item_select ${areaName === 'area1' ? 'item_select1' : 'item_select2'} items ${selectArea === areaName ? "on" : ""}`} onClick={() => {
					setSelectArea(areaName);
				}}></ItemContainer>
			);
		}

		return (
			<ItemContainer className={`item_select ${areaName === 'area1' ? 'item_select1' : 'item_select2'} items ${selectArea === areaName ? "on" : ""}`} itemSelect={areaName === 'area1' ? 'select1' : 'select2'} color={gameData.itemGrade.color?.[selectItem.save?.grade] || "#fff"} onClick={() => {
				setSelectArea(areaName);
			}}>
				{selectItem.selectTab === 'equip' && (
					<>
						<li className="item_header" flex-center="true"><span className="item_name" dangerouslySetInnerHTML={{__html: `${selectItem.save.colorantSet ? util.getColorant(selectItem.save.colorantSet, gameData).na[lang] : ''} ${selectItem.save.modifier[lang]} ${selectItem.game.na[lang]}`}}></span></li>
						<li className="item_fix" flex="true">
							<ItemGradeColor part={selectItem.game.part} grade={gameData.itemGrade.txt_e[selectItem.save.grade].toLowerCase()} sealed={selectItem.save.sealed} size="50">
								<ItemPic type="equip" className={`item favorite${selectItem.save.favorite}`} onClick={(e) => {
									e.stopPropagation();
									const newFavorite = (selectItem.save.favorite || 0) + 1 > 5 ? 1 : (selectItem.save.favorite || 0) + 1;
									
									setSelectItem(prev => ({
										...prev,
										save: { ...prev.save, favorite: newFavorite }
									}));

									const newSData = JSON.parse(JSON.stringify(saveData));
									if (newSData.items?.equip?.[selectItem.select]) {
										newSData.items.equip[selectItem.select].favorite = newFavorite;
										changeSaveData(newSData);
									}
								}}>
									<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[selectItem.game.display], selectItem.save.color, selectItem.save.svgColor || selectItem.save.id)}}></svg>
								</ItemPic>
							</ItemGradeColor>
							<div flex-h="true" style={{flex: 1,}}>
								<ItemName className="item_cont" color={gameData.itemGrade.color?.[selectItem.save?.grade]}>
									<div className="item_top">
										<span className="item_grade">{lang === 'ko' ? gameData.itemGrade.txt_k?.[selectItem.save?.grade] : gameData.itemGrade.txt_e?.[selectItem.save?.grade]}</span> <span className="item_type">{gameData.itemType?.[selectItem.game?.part]?.[lang]}</span>
									</div>
									<div className="item_description" dangerouslySetInnerHTML={{__html: `"${selectItem.game?.txt?.[lang] || ""}"`}}></div>
									<div className="item_kg">{selectItem.game?.kg}kg</div>
								</ItemName>
							</div>
						</li>
						<div className="scroll-y">
							<li className="item_list item_typeSlot">
								<div className="item_type">
									<MarkPic length={selectItem.save.markNum} pic="icon100" idx={selectItem.save.mark} />
								</div>
								<div className="item_slot">
									{selectItem.save.hole.map((holeData, idx) => {
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
								{util.getTotalEff(selectItem.save, gameData).map((eff, idx) => {
									return (
										<div key={idx} className="item_effs"><span className="cate">{util.getEffectType(eff.type, lang)}</span>{eff.base > 0 && <span className="base">{eff.base}</span>}{eff.add > 0 && <span className="add">{eff.add}</span>}{eff.hole > 0 && <span className="hole">{eff.hole}</span>}<span className="total">{selectItem.save.sealed ? eff.base : eff.base + eff.add + eff.hole}</span></div>
									)
								})}
							</li>
							<div style={{width:"100%"}} className="scroll-y">
								{selectItem.save.baseEff.length > 0 && (
									<li className="item_list item_eff">
										<div className="item_title">{gameData.msg.itemInfo.basicEffect[lang]}</div>
										{selectItem.save.baseEff.map((data, idx) => {
											const grade = selectItem.save.grade > 3 ? 3 : selectItem.save.grade - 1;
											return (
												<div key={idx} className="item_effs">{`${util.getEffectType(data.type, lang)} ${selectItem.save.sealed ? data.num : data.num[grade]}`}</div>
											) 
										})}
									</li>
								)}
								{selectItem.save.addEff.length > 0 && (
									<li className="item_list item_eff">
										<div className="item_title">{gameData.msg.itemInfo.addEffect[lang]}</div>
										{selectItem.save.addEff.map((data, idx) => {
											return (
												<div key={idx} className="item_effs add">{`${util.getEffectType(data.type, lang)} ${data.num[0]}`}</div>
											) 
										})}
									</li>
								)}
								{selectItem.game.set !== 0 && (<li className="item_list item_set">
									<div className="item_setNa">{gameData.items.set_type[selectItem.game.set].na}</div>
								</li>
								)}
							</div>
						</div>
					</>
				)}
				{(selectItem.selectTab === 'hole' || (selectItem.selectTab !== 'equip' && selectItem.selectTab !== 'hole')) && (
					<>
						<li className="item_header" flex-center="true"><span className="item_name" dangerouslySetInnerHTML={{__html: `${selectItem.game.na[lang]}`}}></span></li>
						<li className="item_fix" flex="true">
							<div className={`item ${gameData.itemGrade.txt_e[selectItem.save.grade || selectItem.game.grade].toLowerCase()}`}>
								<ItemPic className="pic" pic="itemEtc" type={selectItem.selectTab} idx={selectItem.game.display}>
									{selectItem.game.displayText && <span className="display_text">{selectItem.game.displayText}</span>}
								</ItemPic>
							</div>
							<div flex-h="true" style={{flex: 1,}}>
								<ItemName className="item_cont" color={gameData.itemGrade.color[selectItem.save.grade]}>
									<div className="item_top">
										<span className="item_grade">{lang === 'ko' ? gameData.itemGrade.txt_k[selectItem.save.grade] : gameData.itemGrade.txt_e[selectItem.save.grade]}</span>
									</div>
									<div className="item_description" dangerouslySetInnerHTML={{__html: `"${selectItem.game.txt[lang]}"`}}></div>
									<div className="item_kg">{selectItem.game.kg}kg</div>
								</ItemName>
							</div>
						</li>
						<div className="scroll-y">
							{selectItem.selectTab === 'hole' && selectItem.game.idx < 100 && (
								<li className="item_list item_eff">
									<div className="item_title">{gameData.msg.itemInfo.itemEffect[lang]}</div>
									{util.getTotalEff(selectItem.save, gameData).map((eff, idx) => {
										return (
											<div key={idx} className="item_effs"><span className="cate">{util.getEffectType(eff.type, lang)}</span>{eff.base > 0 && <span className="base">{eff.base}</span>}{eff.add > 0 && <span className="add">{eff.add}</span>}{eff.hole > 0 && <span className="hole">{eff.hole}</span>}<span className="total">{selectItem.save.sealed ? eff.base : eff.base + eff.add + eff.hole}</span></div>
										)
									})}
								</li>
							)}
							{selectItem.selectTab !== 'hole' && (
								<li className="item_list item_eff">
									<div className="item_title">{selectItem.game.txt[lang]}</div>
								</li>
							)}
						</div>
					</>
				)}
				<li className="item_footer" flex-v="true">
					<div className="item_price">
						<span>{gameData.msg.itemInfo.sellPrice[lang]}</span>
						<em>{`₩${util.comma(selectItem.selectTab === 'equip' ? selectItem.game.price * (selectItem.game.grade || selectItem.save.grade) : selectItem.game.price)}`}</em>
					</div>
					<div flex-end="true">
					{selectItem.buttonType && selectItem.buttonType.map((buttonData, idx) => {
						const buttonLabels = { sell: gameData.msg.button.sell[lang], socket: gameData.msg.button.socket[lang], evaluate: gameData.msg.button.emotions[lang], use: gameData.msg.button.use[lang] };
						const onButtonClick = (e) => {
							if (buttonData === 'sell') {
								navigate(selectItem.selectTab === 'equip' && selectItem.game.part !== 4 && selectItem.game.part !== 5 ? '../shop' : '../tool');
							} else if (buttonData === 'evaluate' || buttonData === 'use') {
								util.buttonEvent({
									event: e, type: buttonData === 'evaluate' ? 'itemEvaluate' : 'itemUse',
									data: { slotIdx: 0, gameItem: selectItem.game, itemSaveSlot: selectItem.select, saveItemData: selectItem.save, type: buttonData === 'evaluate' ? 'hequip' : selectItem.selectTab },
									saveData, changeSaveData, gameData, msgText: setMsg, showMsg: setMsgOn, showPopup: setPopupOn, lang,
								});
								if (buttonData === 'evaluate') {
									setSelectItem(prev => ({ ...prev, save: { ...saveData.items.equip[prev.select] } }));
								} else {
									setSelectItem({ save: {}, game: {}, buttonType: [], selectTab: '', select: '' });
								}
							}
						};
						return (
							<div key={`button${idx}`} className="item_button" flex="true">
								<button text="true" className="button_small" onClick={onButtonClick} data-buttontype={`item${buttonData.charAt(0).toUpperCase() + buttonData.slice(1)}`}>{buttonLabels[buttonData]}</button>
							</div>
						);
					})}
					</div>
				</li>
			</ItemContainer>
		);
	};

  return (
		<>
			<InvenWrap>
				<InvenTop>
					<InvenTopLeft>
						<TabMenu direction="vertical" list={invenList} selectTab={selectTab} setSelectTab={setSelectTab} className="transition" />
					</InvenTopLeft>
					<InvenScrollContent className="num4 scroll-y">
						{item[invenList[selectTab].na] && item[invenList[selectTab].na].map((data, idx) => {
							const cate = invenList[selectTab].na;
							const isSelected1 = selectItem1.selectTab === cate && selectItem1.select === idx;
							const isSelected2 = selectItem2.selectTab === cate && selectItem2.select === idx;
							
							let items;
							if (cate === 'equip') {
								const itemsGrade = data.grade < 5 ? 0 : data.grade - 5;
								items = data.part === 3 ? gameItem.equip[data.part][data.weaponType][itemsGrade][data.idx] : gameItem.equip[data.part][0][itemsGrade][data.idx];
							} else {
								items = gameItem[cate][data.idx];
							}

							const onSelect = () => {
								let button = ['sell'];
								if (cate === 'equip' && data.sealed) button.push('evaluate');
								if (cate === 'etc' && items.invenUse) button.push('use');

								if (selectArea === 'area2') {
									if (isSelected1) setSelectItem1({save:{}, game:{}, buttonType:[], selectTab:'', select:''});
									setSelectItem2({ save:data, game:items, select:idx, selectTab:cate, buttonType:button });
								} else {
									if (isSelected2) setSelectItem2({save:{}, game:{}, buttonType:[], selectTab:'', select:''});
									setSelectItem1({ save:data, game:items, select:idx, selectTab:cate, buttonType:button });
								}
							};

							const grade = data.grade || items.grade;

							return (
								<div className={`item_layout ${gameData.itemGrade.txt_e[grade].toLowerCase()} ${isSelected1 ? 'select1' : ''} ${isSelected2 ? 'select2' : ''} ${cate === 'equip' ? `favorite${data.favorite}` : ''}`} key={`items-${cate}-${idx}`} onClick={onSelect}>
									{cate === 'equip' ? (
										<>
											<span className={`pic ${data.sealed ? "sealed" : ""}`}>
												<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[items.display], data.color, data.svgColor || data.id)}}></svg>
											</span>
											<span className="hole" flex-center="true">
												{data.hole.map((holeData, holeidx) => {
													const holePic = holeData !== 0 ? gameItem.hole[holeData.idx].display : 0;
													return (
														<span className={`hole_slot hole${holeidx} ${holePic !== 0 ? 'fixed': ''}`} key={`hole${holeidx}`}>
															{holeData !== 0 && <ItemPic className="pic" pic="itemEtc" type="hole" idx={holePic} />}
														</span>
													);
												})}
											</span>
										</>
									) : (
										<ItemPic className="pic" pic="itemEtc" type={cate} idx={items.display}>
											{items.displayText && <span className="display_text">{items.displayText}</span>}
										</ItemPic>
									)}
								</div>
							);
						})}
					</InvenScrollContent>
				</InvenTop>
				<InvenBottom>
					{renderItemDetail(selectItem1, setSelectItem1, 'area1')}
					{renderItemDetail(selectItem2, setSelectItem2, 'area2')}
				</InvenBottom>
			</InvenWrap>
		</>
  );
}

export default Inven;
