import { ItemPic, MarkPic } from 'components/ImagePic';
import ItemLayout from 'components/ItemLayout';
import { util } from 'components/Libs';
import { AppContext } from 'contexts/app-context';
import 'css/shop.css';
import React, { useCallback, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';

const ShopPopup = styled.div`
	position: absolute;
	left: 20px;
	right: 20px;
	height: calc(100% - 50px);
	z-index: 3;
`;
const ItemContainer = styled.ul`
	display: flex;
	border: 5px solid transparent;
	flex-direction: column;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.9);
  border-image: url(${({frameBack}) => frameBack}) 5 round;
	box-sizing: border-box;
	& > div {
		width: 100%;
		box-sizing: border-box;
	}
	&.on {
		outline: 5px solid #000;
	}
	.item {
		position: relative;
		width: 80px;
		height: 80px;
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
const ItemFix = styled.li`
	display: flex;
	position: relative;
	padding: 5px;
	border-bottom: ${({color}) => color};
`;
const ItemList = styled.li`
	display: flex;
  margin: ${({margin}) => margin !== undefined ? `${margin}px` : '5px 0 0 0'};
	padding: 10px;
  width: 100%;
  box-sizing: border-box;
	${({type, frameBack}) => {
		switch(type) {
      case 'header':
        return `
          padding: 5px 10px;
          text-align: center;
          background: rgba(0,0,0,.7);
          background-image: radial-gradient(at 50%, #930 0%, #691500 40%, #000 80%);
          border-bottom: 5px solid transparent;
          border-image: url(${frameBack}) 5 round;
          justify-content: center;
        `;
      case 'footer':
        return `
          justify-content: space-between;
          align-items: center;
          background: rgba(0,0,0,.7);
          border-top: 5px solid transparent;
          border-image: url(${frameBack}) 5 round;
          button {
            margin: 0;
          }
        `;
      case 'animalCoin_slot':
        return `
          margin: 0 0 5px 0;
          padding: 0 10px;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        `;
      case 'eff':
        return `
          flex-direction: column;
        `;
			case 'set': 
				return `
					margin: 0 0 10px 0;
					padding: 0 10px;
				`;
			default: 
				break;
			}
	}}
	.item_setNa{margin:0 0 10px 0;color:#0f0;font-size:0.875rem;}
`;
const ItemName = styled(Text)`
  color: ${({ grade }) => grade};
  text-shadow: -1px -1px 1px rgba(255,255,255,.5), 1px 1px 1px #000;
  line-height:1.2;
`;
const ItemEffs = styled(FlexBox)`
  margin: 0 0 5px 15px;
  width: auto;
  ${({color}) => color ? `color: ${color}` : ''}
`;
const ItemEffText = styled(Text)`
	${({type}) => type === "skill" ? `
    &:first-of-type {
      flex: 1;
      text-align: left;
    }
    &:nth-of-type(2) {
      flex: 2;
      text-align: right;
    }
    &:nth-of-type(3) {
      flex: 2;
      text-align: right;
    }
    &:last-of-type {
      flex: 2;
      text-align: right;
    }
  ` : `
		&:first-of-type {
			flex: 2;
			text-align: left;
		}
		&:nth-of-type(2) {
			flex: 1;
			text-align: center;
		}
		&:nth-of-type(3) {
			flex: 1;
			text-align: center;
		}
		&:nth-of-type(4) {
			flex: 1;
			text-align: center;
		}
		&:last-of-type {
			flex: 2;
			text-align: right;
		}
	`}
  margin: ${({margin}) => margin ? `0 ${margin}px 0 0` : 0};
  line-height: 1;
`;
const ItemPrice = styled(FlexBox)``;
const ItemButton = styled(FlexBox)``;
const ItemCoin = styled(FlexBox)``;
const ItemSlot = styled(FlexBox)``;
const ItemHoleBack = styled(FlexBox)`
  display: inline-block;
  border-radius: 20px;
  width: 40px;
  height: 40px;
  text-align: center;
  background-image: ${({fixed}) => fixed ? `
    radial-gradient(at 50%, #000 30%, rgba(255, 172, 47, 0.7) 100%);
  ` : `
    radial-gradient(at 50%, #000 30%, #888 100%)
  `}
`;
const ItemInfo = styled(FlexBox)`
  margin: 0 0 0 10px;
	width: calc(100% - 10px);
`;
const ItemTop = styled(FlexBox)`
	height: auto;
`;
const ItemGrade = styled(Text)`
  color: ${({ color }) => color};
`;
const ItemType = styled(Text)``;
const ItemDescription = styled(Text)`
  color: ${({ color }) => color};
  line-height: 1.2;
  text-align: left;
`;
// text-overflow: ellipsis;
// word-wrap: break-word;
// display: -webkit-box;
// -webkit-line-clamp: 2;
// -webkit-box-orient: vertical;
// overflow: hidden;
const ItemKg = styled(Text)`
  width: 100%;
  color: ${({ color }) => color};
`;
const ItemTitle = styled(Text)`
  margin: 0 0 5px 0;
  line-height: 1;
`;
const ItemFooter = styled.li`
	padding: 5px;
	botder-top: ${({color}) => color};
	.item_price {
		margin: 0 0 5px 0;
	}
	.item_price span {
		display:inline-block;
		margin:0 5px 0 0;
		font-size:0.875rem;
		color:#c80;
	}
	.item_price em {
		font-size: 0.875rem;
		color: #fff;
		vertical-align: middle;
	}
`;

const StyledButton = styled(Button)`
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.75), rgba(255,255,255,0.5));
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.5), 0 0 1px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0,0,0,1);
  border-radius: 20px;
  color:rgba(255,255,255,0.9);
  line-height:1;
`;
const holeEffectText = ({
  gameData, holeData, theme, lang
}) => {
  let eff = [],
    effText = `${gameData.items.hole[holeData.idx].na[lang]}<br/>`;
  gameData.items.hole[holeData.idx]?.eff?.forEach((data) => {
    if (eff[data.type]) {
      eff[data.type] += Number(data.num);
    } else {
      eff[data.type] = Number(data.num);
    }
  });
  holeData?.baseEff?.forEach((data) => {
    if (eff[data.type]) {
      eff[data.type] += Number(data.num);
    } else {
      eff[data.type] = Number(data.num);
    }
  });
  holeData?.addEff?.forEach((data) => {
    if (eff[data.type]) {
      eff[data.type] += Number(data.num);
    } else {
      eff[data.type] = Number(data.num);
    }
  });
  eff.forEach((data, idx) => {
    effText += `<span style="color: ${theme.color[`st${idx}`]};">${util.getEffectType(idx, lang)}: ${data}</span><br/>`;
  });
  effText = effText.slice(0, -5);
  return effText;
}

const ShopFooter = ({
	selectItem,
	selectItemArr,
	selectItemNum,
	setSelectItem,
	selectSlot,
	shopType,
	saveData,
	changeSaveData,
	typeList,
	selectTab,
	setPopupType,
	setPopupInfo,
	setPopupOn,
	setMsgOn,
	setMsg,
	setTooltip,
	setTooltipPos,
	setTooltipOn,
	setItemPopup,
	actionChIdx,
	stayIdx,
}) => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
	const theme = useTheme();
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
	const selectedItem = React.useMemo(() => selectItem[selectItemNum], [selectItem, selectItemNum]);
	const totalEff = React.useMemo(() => typeof selectedItem?.gameItem?.part === 'number' ? util.getTotalEff({
		saveItems: selectedItem.saveItemData,
		gameData: gameData,
		cate: selectedItem,
	}) : [], [selectedItem, gameData]);
	const itemPrice = React.useMemo(() => util.itemPrice({
		gameItem: selectedItem.gameItem,
		saveItemData: selectedItem.saveItemData,
		skill: gameData.skill[15],
		isBuy: selectedItem.buttonType[0] === 'buy' ? true : false,
		skLv: shopType === 'inven' ? "" : util.getHasSkillLv({
			saveData: saveData,
			skillIdx: 15,//협상
			slotIdx: actionChIdx,
		})
	}), [selectedItem, gameData, saveData, shopType, actionChIdx]);
	const timeoutRef = useRef(null); //timeout
  const handlePopup = useCallback((saveObj) => {
		const {saveItemData, itemType, itemIdx} = saveObj;
		// setPopupType(itemType);
    // const gameItemData = () => {
		// 	if (saveItemData.part === undefined) {
		// 		return gameItem[itemType][itemIdx];
		// 	} else {
		// 		return saveItemData.part === 3 ? gameItem['equip'][saveItemData.part][saveItemData.weaponType][saveItemData.quality][itemIdx] : gameItem['equip'][saveItemData.part][0][saveItemData.quality][itemIdx];
		// 	}
		// }
		// setPopupInfo({
		// 	// slotIdx: slotIdx,
		// 	gameItem: gameItemData,
		// 	itemSaveSlot: saveItemData.idx,
		// 	saveItemData: saveItemData,
		// 	type: itemType,
		// });
    setPopupOn(prev => !prev);
  }, [gameItem]);
	return <>
		{typeof selectedItem?.gameItem?.part === 'number' && (
			<>
				<ItemList type="header" frameBack={imgSet.etc.frameChBack}>
					<ItemName grade={gameData.itemGrade.color?.[selectedItem.saveItemData?.grade]}  code="t3" color="main" weight={600} dangerouslySetInnerHTML={{__html: `${selectedItem.saveItemData?.colorantSet ? util.getColorant(selectedItem.saveItemData.colorantSet, gameData).na?.[lang] || "" : ''} ${selectedItem.saveItemData?.modifier?.[lang] || ""}<br/>${selectedItem.gameItem?.na?.[lang] || ""}`}}></ItemName>
				</ItemList>
				<ItemList>
					<ItemLayout 
					gameItem={gameItem}
					icon={{
						type: "equip",
						pic: selectedItem.gameItem?.pic,
						idx: selectedItem.gameItem?.display,
						mergeColor: selectedItem.saveItemData.color,
					}}
					size={80}
					grade={selectedItem.saveItemData?.grade}
					favorite={selectedItem.saveItemData?.favorite}
					sealed={selectedItem.saveItemData?.sealed}
					onClick={() => {
						if (shopType === 'equipment') {
							handlePopup({
								saveItemData: selectedItem.saveItemData,
								itemType: (selectedItem.selectTab < 3 ? 'equip' : 'hequip'),
								itemIdx: selectedItem.idx,
							});
						} else {
							handlePopup({
								saveItemData: selectedItem.saveItemData,
								itemType: 'hequip',
								itemIdx: selectedItem.idx,
							});
						}
					}} />
					<div flex-h="true" style={{flex: 1,}}>
						<ItemInfo direction="column" justifyContent="space-between">
							<ItemTop justifyContent="space-between" className="item_top">
								<ItemGrade code="t2" color={gameData.itemGrade.color?.[selectedItem.saveItemData?.grade]}>{lang === 'ko' ? gameData.itemGrade.txt_k?.[selectedItem.saveItemData?.grade] : gameData.itemGrade.txt_e?.[selectedItem.saveItemData?.grade]}</ItemGrade> <ItemType code="t1" color="#bbb">{gameData.itemType?.[selectedItem.gameItem?.part]?.[lang]}</ItemType>
							</ItemTop>
							<ItemDescription code="t1" color="#d3a859" weight="600" dangerouslySetInnerHTML={{__html: `"${selectedItem.gameItem?.txt?.[lang] || ""}"`}}></ItemDescription>
							<ItemKg code="t2"  weight="600" color="#bbb" align="right">{selectedItem.gameItem?.kg || 0}kg</ItemKg>
						</ItemInfo>
					</div>
				</ItemList>
				<ItemList type="animalCoin_slot">
					<ItemCoin justifyContent="flex-start" className="item_type">
						<MarkPic length={selectedItem.saveItemData.markNum} pic="icon100" idx={selectedItem.saveItemData.mark} />
					</ItemCoin>
					<ItemSlot justifyContent="flex-end">
						{selectedItem.saveItemData.hole.map((holeData, idx) => {
							const holePic = holeData !== 0 ? gameItem.hole[holeData.idx].display : 0;
							return (
								<span key={`hole${idx}`}>
									<ItemHoleBack fixed={holePic !== 0} onClick={(e) => {
										e.stopPropagation();
										if (!holeData) {
											return;
										}
										setTooltipPos(e.target.getBoundingClientRect());
                    setTooltip(holeEffectText({
                      gameData: gameData,
                      holeData: holeData,
                      theme: theme,
                      lang: lang
                    }));
                    setTooltipOn(true);
									}}>
										<ItemPic pic="itemEtc" type="hole" idx={holePic} />
									</ItemHoleBack>
								</span>
							)
						})}
					</ItemSlot>
				</ItemList>
				<ItemList type="eff">
					<ItemTitle align="left" code="t1" color="grey">{gameData.msg.itemInfo.itemEffect[lang]}</ItemTitle>
					{totalEff.map((eff, idx) => {
						if (eff.type === 100) {
							return (
								<ItemEffs alignItems="center" justifyContent="space-between" key={idx}>
									<ItemEffText type="skill" code="t1" weight="600" color="#fff">{util.getEffectType(eff.type, lang)}</ItemEffText>
									{eff.skList.map((sk, skIndex) => {
										return (
											<ItemEffText type="skill" code="t2" align="right" color="main" key={`skIndex${skIndex}`}>{`${gameData.skill[sk.idx].na[lang]} LV.${sk.lv}`}</ItemEffText>
										)
									})}
								</ItemEffs>
							)
						} else {
							return (
								<ItemEffs alignItems="center" justifyContent="space-between" key={idx}>
									<ItemEffText code="t2" weight="600" color={`st${eff.type}`}>{util.getEffectType(eff.type, lang)}</ItemEffText>
									<ItemEffText code="t2" align="right" color="main">{eff.base || "-"}</ItemEffText>
									<ItemEffText code="t2" align="right" color="grey1">{eff.add ? `+ ${eff.add}` : "-"}</ItemEffText>
									<ItemEffText code="t2" align="right" color="grey2">{eff.hole ? `+ ${eff.hole}` : "-"}</ItemEffText>
									<ItemEffText code="t3" align="right" color={`st${eff.type}`}>{selectedItem.saveItemData.sealed ? eff.base : eff.base + eff.add + eff.hole}</ItemEffText>
								</ItemEffs>
							)
						}
					})}
				</ItemList>
				<div style={{width:"100%"}} className="scroll-y">
					{selectedItem.gameItem.set !== 0 && (<ItemList type="set">
						<div className="item_setNa">{gameData.items.set_type[selectedItem.gameItem.set].na}</div>
					</ItemList>
					)}
				</div>
			</>
		)}
		{selectedItem.gameItem?.imgCate === 'itemHole' && (
			<>
				<ItemList type="header" frameBack={imgSet.etc.frameChBack}>
					<ItemName grade={gameData.itemGrade.color[selectedItem.saveItemData.grade]} code="t3" color="main" weight={600} dangerouslySetInnerHTML={{__html: `${selectedItem.gameItem.na[lang]}`}}></ItemName>
				</ItemList>
				<ItemList>
					<ItemLayout 
					gameItem={gameItem}
					icon={{
						type: "hole",
						pic: selectedItem.gameItem?.pic,
						idx: selectedItem.gameItem.display,
						mergeColor: selectedItem.saveItemData.color,
					}}
					size={80}
					grade={selectedItem.saveItemData.grade || selectedItem.gameItem.grade}
					sealed={selectedItem.saveItemData?.sealed}
					onClick={() => {
						handlePopup({
							saveItemData: selectedItem.saveItemData,
							itemType: 'hole',
							itemIdx: selectedItem.idx,
						});
					}} />
					<div flex-h="true" style={{flex: 1,}}>
						<ItemInfo direction="column" justifyContent="space-between">
							<ItemTop justifyContent="space-between" className="item_top">
								<ItemGrade code="t2" color={gameData.itemGrade.color[selectedItem.saveItemData.grade]}>{lang === 'ko' ? gameData.itemGrade.txt_k[selectedItem.saveItemData.grade] : gameData.itemGrade.txt_e[selectedItem.saveItemData.grade]}</ItemGrade>
							</ItemTop>
							<ItemDescription code="t1"  color="#d3a859" weight="600" dangerouslySetInnerHTML={{__html: `"${selectedItem.gameItem.txt[lang]}"`}}></ItemDescription>
							<ItemKg code="t2"  weight="600" color="#bbb" align="right">{selectedItem.gameItem.kg}kg</ItemKg>
						</ItemInfo>
					</div>
				</ItemList>
				{selectedItem.gameItem.idx < 100 && (
					<div className="scroll-y">
						<ItemList margin={0} type="eff">
							<ItemTitle align="left" code="t1" color="grey">{gameData.msg.itemInfo.itemEffect[lang]}</ItemTitle>
							{util.getTotalEff({
								saveItems: selectedItem.saveItemData,
								gameData: gameData,
								cate: selectedItem.itemCate,
							}).map((eff, idx) => {
								return (
									<ItemEffs alignItems="center" justifyContent="space-between" key={idx}>
										<ItemEffText code="t1" weight="600" color="#00a90c">{util.getEffectType(eff.type, lang)}</ItemEffText>
										<ItemEffText code="t1" margin={5} weight="600" color="#2f73ff">{eff.base || "-"}</ItemEffText>
										<ItemEffText code="t1" margin={5} weight="600" color="#ffac2f">{eff.add || "-"}</ItemEffText>
										<ItemEffText code="t1" margin={5} weight="600" color="#e14040">{eff.hole || "-"}</ItemEffText>
										<ItemEffText code="t1" margin={5} weight="600" color="main">{selectedItem.saveItemData.sealed ? eff.base : eff.base + eff.add + eff.hole}</ItemEffText>
									</ItemEffs>
								)
							})}
						</ItemList>
					</div>
				)}
			</>
		)}
		{(selectedItem.gameItem?.imgCate === 'itemUpgrade' || selectedItem.gameItem?.imgCate === 'itemMaterial' || selectedItem.gameItem?.imgCate === 'itemEtc') && (
			<>
				<ItemList type="header" frameBack={imgSet.etc.frameChBack}>
					<ItemName grade={gameData.itemGrade.color[selectedItem.saveItemData.grade]} code="t2" color="main" weight={600} dangerouslySetInnerHTML={{__html: `${selectedItem.gameItem.na[lang]}`}}></ItemName>
				</ItemList>
				<ItemList>
					<ItemLayout 
					gameItem={gameItem}
					icon={{
						type: selectedItem.itemCate,
						pic: selectedItem.gameItem?.pic,
						idx: selectedItem.gameItem.display
					}}
					text={selectedItem.saveItemData.num}
					size={80}
					grade={selectedItem.saveItemData.grade || selectedItem.gameItem.grade}
					sealed={selectedItem.saveItemData?.sealed}
					onClick={() => {
						handlePopup({
							saveItemData: selectedItem.saveItemData,
							itemType: selectedItem.itemCate,
							itemIdx: selectedItem.idx,
						});
					}} />
					<div flex-h="true" style={{flex: 1,}}>
						<ItemInfo direction="column" justifyContent="space-between">
							<ItemTop justifyContent="space-between" className="item_top">
								<ItemGrade code="t2" color={gameData.itemGrade.color[selectedItem.saveItemData.grade]}>{lang === 'ko' ? gameData.itemGrade.txt_k[selectedItem.saveItemData.grade] : gameData.itemGrade.txt_e[selectedItem.saveItemData.grade]}</ItemGrade>
							</ItemTop>
							<ItemDescription code="t1"  color="#d3a859" weight="600" dangerouslySetInnerHTML={{__html: `"${selectedItem.gameItem.txt[lang]}"`}}></ItemDescription>
							<ItemKg code="t2"  weight="600" color="#bbb" align="right">{selectedItem.gameItem.kg}kg</ItemKg>
						</ItemInfo>
					</div>
				</ItemList>
				<div className="scroll-y">
					<ItemList margin={0} className="item_list">
						<ItemTitle align="left" code="t1" color="grey">{selectedItem.gameItem.txt[lang]}</ItemTitle>
					</ItemList>
				</div>
			</>
		)}
		<ItemList type="footer" frameBack={imgSet.etc.frameChBack} color={selectItemArr[selectItemNum]}>
			<ItemPrice justifyContent="flex-start">
				{selectedItem.buttonType[0] === 'buy' ? <>
					<ItemEffText code="t3" color="#c80">{gameData.msg.itemInfo.buyPrice[lang]}</ItemEffText>
					<ItemEffText code="t3"  color="main">
						{itemPrice.str}
					</ItemEffText>
				</> : <>
					<ItemEffText code="t3" color="#c80">{gameData.msg.itemInfo.sellPrice[lang]}</ItemEffText>
					<ItemEffText code="t3" margin={10} color="main">
						{itemPrice.str}
					</ItemEffText>
				</>
				}
			</ItemPrice> 
			<ItemButton justifyContent="flex-end">
			{selectedItem.buttonType.map((button, idx) => {
				switch(button) {
					case 'buy':
						return (
							<StyledButton key={`button${idx}`} type="icon" icon={{type:'commonBtn', pic:'icon100', idx:24}} onClick={(e) => {
								if (shopType === 'equipment') {
									if (selectedItem.gameItem?.part <= 3) { //무기이면
										// if (actionCh.idx === '') {
										// 	setMsgOn(true);
										// 	setMsg(gameData.msg.sentenceFn.selectSkillCh(lang,gameData.skill[201].na));
										// 	return;
										// }
										//let saveD = JSON.parse(JSON.stringify(saveData));
										util.buttonEvent({
											event: e,
											type: 'itemBuy',
											data: {
												slotIdx: 0,
												selectItem: selectItem,
												setSelectItem: setSelectItem,
												gameItem: selectedItem.gameItem,
												saveItemData: selectedItem.saveItemData,
												type: "equip",
												itemPrice: itemPrice.num,
												actionChIdx: actionChIdx,
												callback: () => {
													saveData.city[stayIdx][shopType][typeList[selectTab].na].splice(selectedItem.itemSaveSlot, 1);//도시 아이템 삭제
												}
											},
											saveData: saveData,
											changeSaveData: changeSaveData,
											gameData: gameData,
											msgText: setMsg,
											showMsg: setMsgOn,
											showPopup: setPopupOn,
											lang: lang,
										});
										const cloneSelectItem = [...selectItem];
										cloneSelectItem[selectItemNum] = {
											saveItemData: {},
											gameItem: {},
											itemSaveSlot: '',
											selectTab: '',
											itemCate: '',
											buttonType: [],
										}
										setSelectItem(cloneSelectItem);
									} else {
										setMsgOn(true);
										setMsg(gameData.msg.sentence.goTool[lang]);
										timeoutRef.current = setTimeout(() => {
											util.saveHistory({
												location: 'tool',
												navigate: navigate,
												callback: () => {},
												state: {
													dataObj: {
														saveItemData: selectedItem.saveItemData,
														gameItem: selectedItem.gameItem,
														itemSaveSlot: selectedItem.itemSaveSlot,
														selectTab: 0,
														type: selectedItem.itemCate,
														selectSlot: selectSlot,
													}
												},
												isNavigate: true,
											});
										}, 1800);
									}
								} else if (shopType === 'tool') {
									if (selectedItem.gameItem?.part <= 3) { //무기이면
										setMsgOn(true);
										setMsg(gameData.msg.sentence.goToolShop[lang]);
										timeoutRef.current = setTimeout(() => {
											util.save({
												location: 'equipment',
												navigate: navigate,
												callback: () => {},
												state: {
													dataObj: {
														saveItemData: selectedItem.saveItemData,
														gameItem: selectedItem.gameItem,
														itemSaveSlot: selectedItem.itemSaveSlot,
														selectTab: 0,
														type: 'equip',
														selectSlot: selectSlot,
													}
												},
												isNavigate: true,
											});
										}, 1800);
									} else {
										// if (actionCh.idx === '') {
										// 	setMsgOn(true);
										// 	setMsg(gameData.msg.sentenceFn.selectSkillCh(lang,gameData.skill[201].na));
										// 	return;
										// }
										let saveD = JSON.parse(JSON.stringify(saveData));
										// if (saveD.ch[actionCh.idx].actionPoint >= gameData.actionPoint.itemBuy) {//행동력 지불
										// 	saveD.ch[actionCh.idx].actionPoint -= gameData.actionPoint.itemBuy;
										//	saveD.city[stayIdx].shop[typeList[selectedItem.selectTab].na].splice(selectedItem.itemSaveSlot, 1);
											util.buttonEvent({
												event: e,
												type: 'itemBuy',
												data: {
													slotIdx: 0,
													selectItem: selectItem,
													setSelectItem: setSelectItem,
													gameItem: selectedItem.gameItem,
													saveItemData: selectedItem.saveItemData,
													type: typeList[selectTab].itemCate,
												},
												saveData: saveData,
												changeSaveData: changeSaveData,
												gameData: gameData,
												msgText: setMsg,
												showMsg: setMsgOn,
												showPopup: setPopupOn,
												lang: lang,
											});
											const cloneSelectItem = [...selectItem];
											cloneSelectItem[selectItemNum] = {
												saveItemData: {},
												gameItem: {},
												itemSaveSlot: '',
												selectTab: '',
												itemCate: '',
												buttonType: [],
											}
											setSelectItem(cloneSelectItem);
										// } else {
										// 	setMsgOn(true);
										// 	setMsg(gameData.msg.sentenceFn.lackActionPoint(lang, gameData.ch[saveD.ch[actionCh.idx].idx].na1[lang]));
										// }
									}
								}	else if (shopType === 'inven') {
									console.log('a');
								}
							}} data-buttontype="itemBuy" />
						)
					case 'sell':
						return (
							<StyledButton type="icon" icon={{type:'commonBtn', pic:'icon100', idx:23}} key={`button${idx}`} onClick={(e) => {
								if (shopType === 'equipment') {
									if (typeof selectedItem.gameItem?.part === 'number') { //장비면
										if (selectedItem.gameItem?.part <= 3) { //투구,갑옷,무기이면
											
										} else {
											setMsgOn(true);
											setMsg(gameData.msg.sentence.goTool[lang]);
											timeoutRef.current = setTimeout(() => {
												util.saveHistory({
													location: 'tool',
													navigate: navigate,
													callback: () => {},
													state: {
														dataObj: {
															saveItemData: selectedItem.saveItemData,
															gameItem: selectedItem.gameItem,
															itemSaveSlot: selectedItem.itemSaveSlot,
															selectTab: 3,
															type: selectedItem.itemCate,
															selectSlot: selectSlot,
														}
													},
													isNavigate: true,
												});
											}, 1800);
										}
									} else { //기타 도구이면
										setMsgOn(true);
										setMsg(gameData.msg.sentence.goTool[lang]);
										timeoutRef.current = setTimeout(() => {
											util.saveHistory({
												location: 'tool',
												navigate: navigate,
												callback: () => {},
												state: {
													dataObj: {
														saveItemData: selectedItem.saveItemData,
														gameItem: selectedItem.gameItem,
														itemSaveSlot: selectedItem.itemSaveSlot,
														selectTab: 3,
														type: selectedItem.itemCate,
														selectSlot: selectSlot,
													}
												},
												isNavigate: true,
											});
										}, 1800);
									}
								} else if (shopType === 'tool') {
									if (typeof selectedItem.gameItem?.part === 'number') { //장비면
										if (selectedItem.gameItem?.part <= 3) { //투구,갑옷,무기이면
											setMsgOn(true);
											setMsg(gameData.msg.sentence.goTool[lang]);
											timeoutRef.current = setTimeout(() => {
												util.saveHistory({
													location: 'tool',
													navigate: navigate,
													callback: () => {},
													state: {
														dataObj: {
															saveItemData: selectedItem.saveItemData,
															gameItem: selectedItem.gameItem,
															itemSaveSlot: selectedItem.itemSaveSlot,
															selectTab: 3,
															type: typeList[selectTab].itemCate,
															selectSlot: selectSlot,
														}
													},
													isNavigate: true,
												});
											}, 1800);
										} else {
											// if (actionCh.idx === '') {
											// 	setMsgOn(true);
											// 	setMsg(gameData.msg.sentenceFn.selectSkillCh(lang,gameData.skill[201].na));
											// 	return;
											// }
											let saveD = JSON.parse(JSON.stringify(saveData));
											// if (saveD.ch[actionCh.idx].actionPoint >= gameData.actionPoint.itemSell) {//행동력 지불
											//saveD.ch[actionCh.idx].actionPoint -= gameData.actionPoint.itemSell;
											util.buttonEvent({
												event: e,
												type: 'itemSell',
												data: {
													slotIdx: 0,
													selectItem: selectItem,
													setSelectItem: setSelectItem,
													gameItem: selectedItem.gameItem,
													itemSaveSlot: selectedItem.itemSaveSlot,
													type: selectedItem.itemCate,
												},
												saveData: saveD,
												changeSaveData: changeSaveData,
												gameData: gameData,
												msgText: setMsg,
												showMsg: setMsgOn,
												showPopup: setPopupOn,
												lang: lang,
											}, () => {
												console.log(selectedItem);
												// if (saveData.items.equip[selectedItem.itemSaveSlot]) { //다음 아이템이 있으면
												// 	const itemData = saveData.items.equip[selectedItem.itemSaveSlot],
												// 		itemsGrade = itemData.grade < 5 ? 0 : itemData.grade - 5,
												// 		nextItem = itemData.part === 3 ? gameItem.equip[itemData.part][itemData.weaponType][itemsGrade][itemData.idx] : gameItem.equip[itemData.part][0][itemsGrade][itemData.idx];
												// 	navigate('../tool', {state: {dataObj: {
												// 		saveItemData: saveData.items.equip[selectedItem.itemSaveSlot],
												// 		gameItem: nextItem,
												// 		itemSaveSlot: selectedItem.itemSaveSlot,
												// 		selectTab: selectTab,
												// 		type: 'equip',
												// 		selectSlot: selectSlot,

												// 		saveItemData: selectedItem.saveItemData,
												// 		gameItem: selectedItem.gameItem,
												// 		itemSaveSlot: selectedItem.itemSaveSlot,
												// 		selectTab: typeof selectedItem.gameItem.part === 'number' ? 3 : 0,
												// 		type: selectedItem.itemCate,//'equip',//shopType === 'shop' ? 'equip' : typeList[selectTab].na,
												// 		selectSlot: selectSlot,
												// 	}}});
												// } else {
												// 	setSelectItem({saveItemData:{},gameItem:{},itemSaveSlot:'',selectTab:'',itemCate:'',buttonType:[]});
												// }
											});
											// } else {
											// 	setMsgOn(true);
											// 	setMsg(gameData.msg.sentenceFn.lackActionPoint(lang, gameData.ch[saveD.ch[actionCh.idx].idx].na1[lang]));
										}
									} else { //기타 도구이면
										// if (actionCh.idx === '') {
										// 	setMsgOn(true);
										// 	setMsg(gameData.msg.sentenceFn.selectSkillCh(lang,gameData.skill[201].na));
										// 	return;
										// }
										let saveD = JSON.parse(JSON.stringify(saveData));
										// if (saveD.ch[actionCh.idx].actionPoint >= gameData.actionPoint.itemSell) {//행동력 지불
										//saveD.ch[actionCh.idx].actionPoint -= gameData.actionPoint.itemSell;
										util.buttonEvent({
											event: e,
											type: 'itemSell',
											data: {
												slotIdx: 0,
												selectItem: selectItem,
												setSelectItem: setSelectItem,
												gameItem: selectedItem.gameItem,
												itemSaveSlot: selectedItem.itemSaveSlot,
												type: selectedItem.itemCate,
											},
											saveData: saveD,
											changeSaveData: changeSaveData,
											gameData: gameData,
											msgText: setMsg,
											showMsg: setMsgOn,
											showPopup: setPopupOn,
											lang: lang,
										}, () => {
											console.log(selectedItem);
											// if (saveData.items.equip[selectedItem.itemSaveSlot]) { //다음 아이템이 있으면
											// 	const itemData = saveData.items.equip[selectedItem.itemSaveSlot],
											// 		itemsGrade = itemData.grade < 5 ? 0 : itemData.grade - 5,
											// 		nextItem = itemData.part === 3 ? gameItem.equip[itemData.part][itemData.weaponType][itemsGrade][itemData.idx] : gameItem.equip[itemData.part][0][itemsGrade][itemData.idx];
											// 	navigate('../tool', {state: {dataObj: {
											// 		saveItemData: saveData.items.equip[selectedItem.itemSaveSlot],
											// 		gameItem: nextItem,
											// 		itemSaveSlot: selectedItem.itemSaveSlot,
											// 		selectTab: selectTab,
											// 		type: 'equip',
											// 		selectSlot: selectSlot,

											// 		saveItemData: selectedItem.saveItemData,
											// 		gameItem: selectedItem.gameItem,
											// 		itemSaveSlot: selectedItem.itemSaveSlot,
											// 		selectTab: typeof selectedItem.gameItem.part === 'number' ? 3 : 0,
											// 		type: selectedItem.itemCate,//'equip',//shopType === 'shop' ? 'equip' : typeList[selectTab].na,
											// 		selectSlot: selectSlot,
											// 	}}});
											// } else {
											// 	setSelectItem({saveItemData:{},gameItem:{},itemSaveSlot:'',selectTab:'',itemCate:'',buttonType:[]});
											// }
										});
										// } else {
										// 	setMsgOn(true);
										// 	setMsg(gameData.msg.sentenceFn.lackActionPoint(lang, gameData.ch[saveD.ch[actionCh.idx].idx].na1[lang]));
									}
								} else if (shopType === 'inven') {
									if (typeof selectedItem.gameItem?.part === 'number') { //장비면
										if (selectedItem.gameItem?.part <= 3) { //무기이면
											setMsgOn(true);
											setMsg(gameData.msg.sentence.goEquipmentShop[lang]);
											timeoutRef.current = setTimeout(() => {
												util.saveHistory({
													location: 'equipment',
													navigate: navigate,
													callback: () => {},
													state: {
														dataObj: {
															saveItemData: selectedItem.saveItemData,
															gameItem: selectedItem.gameItem,
															itemSaveSlot: selectedItem.itemSaveSlot,
															selectTab: 3,
															type: 'equip',
															selectSlot: selectSlot,
														}
													},
													isNavigate: true,
												});
											}, 1800);
										} else {
											setMsgOn(true);
											setMsg(gameData.msg.sentence.goTool[lang]);
											timeoutRef.current = setTimeout(() => {
												util.saveHistory({
													location: 'tool',
													navigate: navigate,
													callback: () => {},
													state: {
														dataObj: {
															saveItemData: selectedItem.saveItemData,
															gameItem: selectedItem.gameItem,
															itemSaveSlot: selectedItem.itemSaveSlot,
															selectTab: 3,
															type: selectedItem.itemCate,
															selectSlot: selectSlot,
														}
													},
													isNavigate: true,
												});
											}, 1800);
										}
									} else { //기타 도구이면
										setMsgOn(true);
										setMsg(gameData.msg.sentence.goTool[lang]);
										timeoutRef.current = setTimeout(() => {
											util.saveHistory({
												location: 'tool',
												navigate: navigate,
												callback: () => {},
												state: {
													dataObj: {
														saveItemData: selectedItem.saveItemData,
														gameItem: selectedItem.gameItem,
														itemSaveSlot: selectedItem.itemSaveSlot,
														selectTab: 3,
														type: selectedItem.itemCate,
														selectSlot: selectSlot,
													}
												},
												isNavigate: true,
											});
										}, 1800);
									}
								}
							}} data-buttontype="itemSell" />
						)
					case 'equip':
						return (
							<StyledButton type="icon" icon={{type:'commonBtn', pic:'icon100', idx:20}} key={`button${idx}`} onClick={(e) => {
								setMsgOn(true);
								setMsg(gameData.msg.sentence.goItemEquip[lang]);
								timeoutRef.current = setTimeout(() => {
									util.saveHistory({
										location: 'cards',
										navigate: navigate,
										callback: () => {},
										state: {
											dataObj: {
												chSlotIdx: 0,
												chTabIdx: 5,
												invenOpened: true,
											}
										},
										isNavigate: true,
									});
								}, 1800);
							}} data-buttontype="itemEquip" />
						)
					case 'enhance':
						return (
							<StyledButton type="icon" icon={{type:'commonBtn', pic:'icon100', idx:21}} key={`button${idx}`} onClick={(e) => {
								setMsgOn(true);
								setMsg(gameData.msg.sentence.goForge[lang]);
								timeoutRef.current = setTimeout(() => {
									util.saveHistory({
										location: 'training',
										navigate: navigate,
										callback: () => {},
										state: {
											dataObj: {
												gameItem: selectedItem.gameItem,
												saveItemData: selectedItem.saveItemData,
												itemSaveSlot: selectedItem.itemSaveSlot,
											},
											tabIdx: 1
										},
										isNavigate: true,
									});
								}, 1800);
							}} data-buttontype="itemSocket" />
						)
					case 'socket':
						return (
							<StyledButton type="icon" icon={{type:'commonBtn', pic:'icon100', idx:22}} key={`button${idx}`} onClick={(e) => {
								setMsgOn(true);
								setMsg(gameData.msg.sentence.goForge[lang]);
								timeoutRef.current = setTimeout(() => {
									util.saveHistory({
										location: 'training',
										navigate: navigate,
										callback: () => {},
										state: {
											dataObj: {
												gameItem: selectedItem.gameItem,
												saveItemData: selectedItem.saveItemData,
												itemSaveSlot: selectedItem.itemSaveSlot,
											},
											tabIdx: 0
										},
										isNavigate: true,
									});
								}, 1800);
							}} data-buttontype="itemSocket" />
						)
					case "evaluate":
						return (
							<StyledButton type="icon" icon={{type:'commonBtn', pic:'icon100', idx:25}} key={`button${idx}`} onClick={(e) => {
								if (shopType === 'inven') {
									let saveD = JSON.parse(JSON.stringify(saveData));
									util.buttonEvent({
										event: e,
										type: 'itemEvaluate',
										data: {
											slotIdx: 0,
											selectItem: selectItem,
											setSelectItem: setSelectItem,
											gameItem: selectedItem.gameItem,
											itemSaveSlot: selectedItem.itemSaveSlot,
											saveItemData: saveData.items[selectedItem.itemCate][selectedItem.itemSaveSlot],
											type: selectedItem.itemCate,
										},
										saveData: saveD,
										changeSaveData: changeSaveData,
										gameData: gameData,
										msgText: setMsg,
										showMsg: setMsgOn,
										showPopup: setPopupOn,
										setItemPopup: setItemPopup,
										lang: lang,
									}, () => {
										util.saveHistory({
											location: 'inven',
											navigate: navigate,
											callback: () => {},
											state: {
												dataObj: {
													saveItemData: saveData.items.equip[selectedItem.itemSaveSlot],
													gameItem: selectedItem.gameItem,
													itemSaveSlot: selectedItem.itemSaveSlot,
													selectTab: selectTab,
													type: typeList[selectTab].itemCate,
													selectSlot: selectSlot,
												}
											},
											isNavigate: true,
										});
									});
								} else {
									setMsgOn(true);
								setMsg(gameData.msg.sentence.goInven[lang]);
									timeoutRef.current = setTimeout(() => {
										util.saveHistory({
											location: 'inven',
											navigate: navigate,
											callback: () => {},
											state: {
												dataObj: {
													saveItemData: selectedItem.saveItemData,
													gameItem: selectedItem.gameItem,
													itemSaveSlot: selectedItem.itemSaveSlot,
													selectTab: typeof selectedItem.gameItem.part === 'number' ? 0 : 1,
													type: shopType === 'equipment' ? 'equip' : typeList[selectTab].itemCate,
													selectSlot: selectSlot,
												}
											},
											isNavigate: true,
										});
									}, 1800);
								}
							}} data-buttontype="itemEvaluate" />
						);
					case 'use':
						return (
							<StyledButton type="icon" icon={{type:'commonBtn', pic:'icon100', idx:26}} key={`button${idx}`} onClick={(e) => {
								let saveD = JSON.parse(JSON.stringify(saveData));
								util.buttonEvent({
									event: e,
									type: 'itemUse',
									data: {
										slotIdx: 0,
										selectItem: selectItem,
										setSelectItem: setSelectItem,
										gameItem: selectedItem.gameItem,
										itemSaveSlot: selectedItem.itemSaveSlot,
										type: shopType === "equipment" ? "equip" : typeList[selectTab].itemCate,
									},
									saveData: saveD,
									changeSaveData: changeSaveData,
									gameData: gameData,
									msgText: setMsg,
									showMsg: setMsgOn,
									showPopup: setPopupOn,
									lang: lang,
								});
								const cloneSelectItem = [...selectItem];
								cloneSelectItem[selectItemNum] = {
									saveItemData: {},
									gameItem: {},
									itemSaveSlot: '',
									selectTab: '',
									itemCate: '',
									buttonType: [],
								}
								setSelectItem(cloneSelectItem);
							}} data-buttontype="itemUse" />
						)
					default:
						break;
				}
			})}
			</ItemButton>
		</ItemList>
	</>
}

export default ShopFooter;