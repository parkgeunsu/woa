import { Text } from 'components/Atom';
import { Button } from 'components/Button';
import { ActionChDisplay } from 'components/Components';
import { FlexBox } from 'components/Container';
import { ItemPic, MarkPic } from 'components/ImagePic';
import ItemLayout from 'components/ItemLayout';
import { util } from 'components/Libs';
import Msg from 'components/Msg';
import MsgContainer from 'components/MsgContainer';
import Popup from 'components/Popup';
import PopupContainer from 'components/PopupContainer';
import TabMenu from 'components/TabMenu';
import Tooltip from 'components/Tooltip';
import TooltipContainer from 'components/TooltipContainer';
import { AppContext } from 'contexts/app-context';
import 'css/shop.css';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ShopWrap = styled.div`
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
const ShopTop = styled.div`
	position: relative;
	padding: 0 20px;
	width: 100%;
	box-sizing: border-box;
`;
const ShopScrollContent = styled.div`
	position: relative;
	padding: 0 20px;
	flex-wrap: wrap;
	width: 100%;
	height: calc(100% - 90px);
	border-radius: 0 10px 10px 10px;
	box-sizing: border-box;
`;
const ShopPopup = styled.div`
	position: absolute;
	left: 20px;
	right: 20px;
	height: calc(100% - 50px);
	z-index: 3;
`;
const ActionCh = styled.div`
	position: absolute;
  bottom: 0;
	right: 0;
  width: 100px;
  padding-top: 148px;
  border: 5px double #00a90c;
  box-sizing: border-box;
  white-space: nowrap;
  background: rgb(0, 0, 0, 0.5);
  border-radius: 15px;
  z-index: 3;
	&.g1 {
		box-shadow: 0 0 10px #fff, 0 0 20px #fff;
	}
	&.g2 {
		box-shadow: 0 0 10px #00a90c, 0 0 20px #00a90c;
	}
	&.g3 {
		box-shadow: 0 0 10px #0090ff, 0 0 20px #0090ff;
	}
	&.g4 {
		box-shadow: 0 0 10px #a800ff, 0 0 20px #a800ff;
	}
	&.g5 {
		box-shadow: 0 0 10px #ffcc15, 0 0 20px #ffcc15;
	}
	&.g6 {
		box-shadow: 0 0 10px #ff2a00, 0 0 20px #ff2a00;
	}
	&.g7 {
		box-shadow: 0 0 10px #ff8000, 0 0 20px #ff8000;
	}
	.action_ch {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		border-radius: 10px;
		overflow: hidden;
		span {
			display: block;
		}
		&.g1 {
			background-color: #fff;
			&.on {
				box-shadow: 0 0 10px #fff, 0 0 6px #fff, 0 0 3px #fff;
			}
		}
		&.g2 {
			background-color: #00a90c;
			&.on {
				box-shadow: 0 0 10px #00a90c, 0 0 6px #00a90c, 0 0 3px #00a90c;
			}
		}
		&.g3 {
			background-color: #0090ff;
			&.on {
				box-shadow: 0 0 10px #0090ff, 0 0 6px #0090ff, 0 0 3px #0090ff;
			}
		}
		&.g4 {
			background-color: #a800ff;
			&.on {
				box-shadow: 0 0 10px #a800ff, 0 0 6px #a800ff, 0 0 3px #a800ff;
			}
		}
		&.g5 {
			background-color: #ffcc15;
			&.on {
				box-shadow: 0 0 10px #ffcc15, 0 0 6px #ffcc15, 0 0 3px #ffcc15;
			}
		}
		&.g6 {
			background-color: #ff2a00;
			&.on {
				box-shadow: 0 0 10px #ff2a00, 0 0 6px #ff2a00, 0 0 3px #ff2a00;
			}
		}
		&.g7 {
			background-color: #ff8000;
			&.on {
				box-shadow: 0 0 10px #ff8000, 0 0 6px #ff8000, 0 0 3px #ff8000;
			}
		}
		&.on {
			transform: scale(1.2) translate(0, 6%);
			z-index: 1;
		}
		/* &.none:before{display:block;position:absolute;left:50%;top:50%;content:'';width:5px;height:50%;background:#ff2a00;transform:translate(-50%,-50%) rotate(-30deg);}
		&.none:after{display:block;position:absolute;left:50%;top:50%;content:'';width:5px;height:50%;background:#ff2a00;transform:translate(-50%,-50%) rotate(30deg);} */
	}
`;
const ItemContainer = styled.ul`
	display: flex;
	border: 5px solid transparent;
	flex-direction: column;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.7);
  border-image: url(${({frameBack}) => frameBack}) 5 round;
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
const  SelectItemGroup = styled.div`
	position: absolute;
	left: 20px;
	right: 20px;
	bottom: 15px;
	ul {
		display: flex;
	}
`;
const  SelectItemList = styled.li`
	position: relative;
	margin: 0 10px 0 0;
	width: 30px;
	height: 30px;
	border-radius: 50%;
	box-sizing: border-box;
	${({select, color}) => {
		return select ? `
			outline: 3px solid ${color};
		` : `
			background: ${color};
		`;
	}}
	${({sealed}) => {
      if (sealed) {
        return `
          filter:brightness(0.3) drop-shadow(0px 0px 1px #fff)};
          &:before {
            content: '?';
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            z-index: 1;
            font-size: 1.25rem;
          }
        `
      }
    }
  };
`;
const ShopItem = styled.div`
	position: absolute;
	left: 20px;
	right: 20px;
	top: 0;
	bottom: 0;
	${({selected}) => selected ? `
		pointer-events: unset;
		opacity: 1;
	` : `
		pointer-events: none;
		opacity: 0;
	`};
`;
const StyledButton = styled(Button)`
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.75), rgba(255,255,255,0.5));
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.5), 0 0 1px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0,0,0,1);
  border-radius: 20px;
  color:rgba(255,255,255,0.9);
  line-height:1;
`;
const buttonType = (button, itemData) => {
	if (itemData.sealed) {
		button.unshift('evaluate');
	} else {
		if (itemData.slot) {
			button.unshift('socket');
		}
		button.unshift('equip', 'enhance');
	}
	return button;
}
const holeEffectText = (gameData, holeData, lang) => {
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
    effText += `${util.getEffectType(idx, lang)}: ${data}<br/>`;
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
	actionCh,
	saveData,
	changeSaveData,
	cityIdx,
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
}) => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
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
	const timeoutRef = useRef(null); //timeout
  const handlePopup = useCallback((saveObj) => {
		const {saveItemData, itemType, itemIdx} = saveObj;
		setPopupType(itemType);
    const gameItemData = () => {
			if (saveItemData.part === undefined) {
				return gameItem[itemType][itemIdx];
			} else {
				return saveItemData.part === 3 ? gameItem['equip'][saveItemData.part][saveItemData.weaponType][saveItemData.quality][itemIdx] : gameItem['equip'][saveItemData.part][0][saveItemData.quality][itemIdx];
			}
		}
		setPopupInfo({
			// slotIdx: slotIdx,
			gameItem: gameItemData,
			itemSaveSlot: saveItemData.idx,
			saveItemData: saveItemData,
			type: itemType,
		});
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
						pic: "equip",
						idx: selectedItem.gameItem?.display,
						mergeColor: selectedItem.saveItemData.color,
					}}
					size={80}
					grade={selectedItem.saveItemData?.grade}
					favorite={selectedItem.saveItemData?.favorite}
					sealed={selectedItem.saveItemData?.sealed}
					onClick={() => {
						if (shopType === 'shop') {
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
										setTooltipPos(e.target.getBoundingClientRect());
                    const itemName = gameData.items.hole[holeData.idx].na[lang];
                    setTooltip(holeEffectText(gameData, holeData, lang));
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
									<ItemEffText type="skill" code="t1" weight="600" color="#00a90c">{util.getEffectType(eff.type, lang)}</ItemEffText>
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
									<ItemEffText code="t1" weight="600" color="#00a90c">{util.getEffectType(eff.type, lang)}</ItemEffText>
									<ItemEffText code="t2" align="right" color="#2f73ff">{eff.base || "-"}</ItemEffText>
									<ItemEffText code="t2" align="right" color="#ffac2f">{eff.add || "-"}</ItemEffText>
									<ItemEffText code="t2" align="right" color="#e14040">{eff.hole || "-"}</ItemEffText>
									<ItemEffText code="t2" align="right" color="main">{selectedItem.saveItemData.sealed ? eff.base : eff.base + eff.add + eff.hole}</ItemEffText>
								</ItemEffs>
							)
						}
					})}
				</ItemList>
				<div style={{width:"100%"}} className="scroll-y">
					{selectedItem.saveItemData.baseEff.length > 0 && (
						<ItemList type="eff">
							<ItemTitle align="left" code="t1" color="grey">{gameData.msg.itemInfo.basicEffect[lang]}</ItemTitle>
							{selectedItem.saveItemData.baseEff.map((data, idx) => {
								const grade = selectedItem.saveItemData.grade > 3 ? 3 : selectedItem.saveItemData.grade - 1;
								return (
									<ItemEffs alignItems="center" justifyContent="space-between" key={idx}>
										<ItemEffText code="t1" weight="600" color="#2f73ff">
											{util.getEffectType(data.type, lang)}
										</ItemEffText>
										<ItemEffText code="t2" align="right"  color="#2f73ff">{`${selectedItem.saveItemData.sealed ? data.num : data.num[grade]}`}</ItemEffText>
									</ItemEffs>
								) 
							})}
						</ItemList>
					)}
					{selectedItem.saveItemData.addEff.length > 0 && (
						<ItemList type="eff">
							<ItemTitle align="left" code="t1" color="grey">{gameData.msg.itemInfo.addEffect[lang]}</ItemTitle>
							{selectedItem.saveItemData.addEff.map((eff, idx) => {
								const grade = selectedItem.saveItemData.grade > 3 ? 3 : selectedItem.saveItemData.grade - 1;
								if (eff.type === 100) {
									return (
										<ItemEffs alignItems="center" justifyContent="space-between" color="#ffac2f" key={idx}>
											<ItemEffText code="t1" weight="600" color="#ffac2f">
												{util.getEffectType(eff.type, lang)}
											</ItemEffText>
											<ItemEffText code="t2" align="right"  color="#ffac2f">
												{`${gameData.skill[eff.skIdx].na[lang]} LV.${eff.skLv}`}
											</ItemEffText>
										</ItemEffs>
									)
								} else {
									return (
										<ItemEffs alignItems="center" justifyContent="space-between" color="#ffac2f" key={idx}>
											<ItemEffText code="t1" weight="600" color="#ffac2f">
												{util.getEffectType(eff.type, lang)}
											</ItemEffText>
											<ItemEffText code="t2" align="right"  color="#ffac2f">
												{eff.num[0]}
											</ItemEffText>
										</ItemEffs>
									)
								}
							})}
						</ItemList>
					)}
					{selectedItem.saveItemData.hole.length > 0 && (
						<ItemList type="eff">
							<ItemTitle align="left" code="t1" color="grey">{gameData.msg.itemInfo.socketEffect[lang]}</ItemTitle>
							{totalEff.map((data, idx) => {
								if (data.hole > 0) {
									return (
										<ItemEffs alignItems="center" justifyContent="space-between" key={idx}>
											<ItemEffText code="t1" weight="600" color="#e14040">
												{util.getEffectType(data.type, lang)}
											</ItemEffText>
											<ItemEffText code="t2" align="right"  color="#e14040" key={`skIndex${idx}`}>{`${data.hole}`}</ItemEffText>
										</ItemEffs>
									)
								}
							})}
						</ItemList>
					)}
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
						pic: "itemEtc",
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
						pic: "itemEtc",
						idx: selectedItem.gameItem.display
					}}
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
					<ItemEffText code="t2" color="#c80">{gameData.msg.itemInfo.buyPrice[lang]}</ItemEffText>
					<ItemEffText code="t2"  color="main">
						{selectedItem.gameItem?.part <= 3 ?
							`₩${util.comma((selectedItem.gameItem.price < 1000 ? 
								1000 : 
								selectedItem.gameItem.price) * 2 * (selectedItem.saveItemData.grade))}` : 
							`₩${util.comma(selectedItem.gameItem.price * (selectedItem.saveItemData.grade || selectedItem.gameItem.grade))}`
						}
					</ItemEffText>
				</> : <>
					<ItemEffText code="t2" color="#c80">{gameData.msg.itemInfo.sellPrice[lang]}</ItemEffText>
					<ItemEffText code="t2" margin={10} color="main">{`₩${util.comma(selectedItem.gameItem?.price * (selectedItem.gameItem?.grade || selectedItem.saveItemData?.grade))}`}</ItemEffText>
				</>
				}
			</ItemPrice> 
			<ItemButton justifyContent="flex-end">
			{selectedItem.buttonType.map((button, idx) => {
				switch(button) {
					case 'buy':
						return (
							<StyledButton key={`button${idx}`} type="icon" icon={{type:'commonBtn', pic:'icon100', idx:24}} onClick={(e) => {
								if (shopType === 'shop') {
									if (selectedItem.gameItem?.part <= 3) { //무기이면
										// if (actionCh.idx === '') {
										// 	setMsgOn(true);
										// 	setMsg(gameData.msg.sentenceFn.selectSkillCh(lang,gameData.skill[201].na));
										// 	return;
										// }
										let saveD = JSON.parse(JSON.stringify(saveData));
										// if (saveD.ch[actionCh.idx].actionPoint >= gameData.actionPoint.itemBuy) {//행동력 지불
										// 	saveD.ch[actionCh.idx].actionPoint -= gameData.actionPoint.itemBuy;
										//	saveD.city[cityIdx].shop[typeList[selectedItem.selectTab].na].splice(selectedItem.itemSaveSlot, 1);
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
										// } else {
										// 	setMsgOn(true);
										// 	setMsg(gameData.msg.sentenceFn.lackActionPoint(lang, gameData.ch[saveD.ch[actionCh.idx].idx].na1[lang]));
										// }
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
										setMsg(gameData.msg.sentence.goShop[lang]);
										timeoutRef.current = setTimeout(() => {
											util.saveHistory({
												location: 'shop',
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
										//	saveD.city[cityIdx].shop[typeList[selectedItem.selectTab].na].splice(selectedItem.itemSaveSlot, 1);
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
								if (shopType === 'shop') {
									if (typeof selectedItem.gameItem?.part === 'number') { //장비면
										if (selectedItem.gameItem?.part <= 3) { //투구,갑옷,무기이면
											// if (actionCh.idx === '') {
											// 	setMsgOn(true);
											// 	setMsg(gameData.msg.sentenceFn.selectSkillCh(lang,gameData.skill[201].na));
											// 	return;
											// }
											let saveD = JSON.parse(JSON.stringify(saveData));
											// if (saveD.ch[actionCh.idx].actionPoint >= gameData.actionPoint.itemSell) {//행동력 지불
											// saveD.ch[actionCh.idx].actionPoint -= gameData.actionPoint.itemSell;
											util.buttonEvent({
												event: e,
												type: 'itemSell',
												data: {
													slotIdx: 0,
													selectItem: selectItem,
													setSelectItem: setSelectItem,
													gameItem: selectedItem.gameItem,
													itemSaveSlot: selectedItem.itemSaveSlot,
													type: 'equip',
												},
												saveData: saveD,
												changeSaveData: changeSaveData,
												gameData: gameData,
												msgText: setMsg,
												showMsg: setMsgOn,
												showPopup: setPopupOn,
												lang: lang,
											}, () => {
												if (saveData.items.equip[selectedItem.itemSaveSlot]) { //다음 아이템이 있으면
													const itemData = saveData.items.equip[selectedItem.itemSaveSlot],
														itemsGrade = itemData.grade < 5 ? 0 : itemData.grade - 5,
														nextItem = itemData.part === 3 ? gameItem.equip[itemData.part][itemData.weaponType][itemsGrade][itemData.idx] : gameItem.equip[itemData.part][0][itemsGrade][itemData.idx];
													util.saveHistory({
														location: 'shop',
														navigate: navigate,
														callback: () => {},
														state: {
															dataObj: {
																saveItemData: saveData.items.equip[selectedItem.itemSaveSlot],
																gameItem: nextItem,
																itemSaveSlot: selectedItem.itemSaveSlot,
																selectTab: selectTab,
																type: 'equip',
																selectSlot: selectSlot,
															}
														},
														isNavigate: true,
													});
												} else {
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
												}
											});
											// } else {
											// 	setMsgOn(true);
											// 	setMsg(gameData.msg.sentenceFn.lackActionPoint(lang, gameData.ch[saveD.ch[actionCh.idx].idx].na1[lang]));
											// }
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
											setMsg(gameData.msg.sentence.goShop[lang]);
											timeoutRef.current = setTimeout(() => {
												util.saveHistory({
													location: 'shop',
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
											setMsg(gameData.msg.sentence.goShop[lang]);
											timeoutRef.current = setTimeout(() => {
												util.saveHistory({
													location: 'shop',
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
										location: 'enhancingStickers',
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
										location: 'enhancingStickers',
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
													type: shopType === 'shop' ? 'equip' : typeList[selectTab].itemCate,
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
										type: shopType === "shop" ? "equip" : typeList[selectTab].itemCate,
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

const selectTabFn = (state, shopType, typeList) => {
	if (!state || Object.keys(state).length <= 0) {
		return 0;
	}
	if (typeof state.dataObj?.selectTab === 'number') {
		return state.dataObj.selectTab;
	}
	let _selectTab = 0;
	switch (shopType) {
		case 'shop':
		case 'tool':
			_selectTab = 3;
			for (const [idx, data] of typeList.entries()) {
				if (data.na === state.dataObj.type) { 
					_selectTab = idx;
					break;
				}
			}
			return _selectTab;
		case 'inven':
			for (const [idx, data] of typeList.entries()) {
				if (data.na === state.dataObj.type) { 
					_selectTab = idx;
					break;
				}
			}
			return _selectTab;
		default:
			break;
	}
}
const selectItemFn = (sData, state, shopType, selectSlot) => {
	if (state && Object.keys(state).length > 0) {
		if (state.dataObj.selectSlot === selectSlot) {
			const saveItems = sData.items[state.dataObj.type][state.dataObj.itemSaveSlot].sealed ? state.dataObj.saveItemData : sData.items[state.dataObj.type][state.dataObj.itemSaveSlot];
			const button = buttonType(['sell'], saveItems);
			switch (shopType) {
				case 'shop':
					return {
						saveItemData: saveItems,
						gameItem: state.dataObj.gameItem,
						itemSaveSlot: state.dataObj.itemSaveSlot,
						selectTab: state.dataObj.selectTab,
						itemCate: state.dataObj.type,
						buttonType: button,
					};
				case 'inven':
					return {
						saveItemData: saveItems,
						gameItem: state.dataObj.gameItem,
						itemSaveSlot: state.dataObj.itemSaveSlot,
						selectTab: state.dataObj.selectTab,
						itemCate: state.dataObj.type,
						buttonType: button,
					};
				case 'tool':
					return {
						saveItemData: saveItems,
						gameItem: state.dataObj.gameItem,
						itemSaveSlot: state.dataObj.itemSaveSlot,
						selectTab: state.dataObj.selectTab,
						itemCate: state.dataObj.type,
						buttonType: button,
					};
				default:
					return {
						saveItemData:{},
						gameItem:{},
						itemSaveSlot:'',
						selectTab:'',
						itemCate:'',
						buttonType:[]
					};
			}
		} else {
			return {
				saveItemData:{},
				gameItem:{},
				itemSaveSlot:'',
				selectTab:'',
				itemCate:'',
				buttonType:[]
			}
		}
	} else {
		return {
			saveItemData:{},
			gameItem:{},
			itemSaveSlot:'',
			selectTab:'',
			itemCate:'',
			buttonType:[]
		}
	}
}
const SHOP_HORIZONTAL_NUM = 5; //가로 갯수
const ShopList = ({
	gameData,
	shopType,
	typeList,
	invenNa,
	list,
	scrollIdx,
	invenIdx,
	selectTab,
	selectItem,
	selectItemNum,
	setSelectItem,
	setItemPopup,
}) => {
	const gameItem = gameData.items;
	const selectColor = (idx) => {
		let colorNum = '';
		selectItem.forEach((selectedItem, selectedIdx) => {
			if (typeof invenIdx === 'number' ? 
				selectedItem?.itemCate === invenNa[invenIdx] && selectedItem?.selectTab === selectTab && selectedItem?.itemSaveSlot === idx : 
				selectedItem?.selectTab === selectTab && selectedItem?.itemSaveSlot === idx) {
				colorNum = selectedIdx;
			}
		});
		return colorNum;
	}
	return <>
		{list.map((itemData, idx) => {
			const selectColor_ = selectColor(idx);
			if (typeof itemData.part === 'number') { // 장비인지
				const itemsGrade = itemData.grade < 5 ? 0 : itemData.grade - 5;
				const items = itemData.part === 3 ? gameItem.equip[itemData.part][itemData.weaponType][itemsGrade][itemData.idx] : gameItem.equip[itemData.part][0][itemsGrade][itemData.idx];
				return items && <ItemLayout 
					gameItem={gameItem}
					icon={{
						type: "equip",
						pic: "equip",
						idx: items.display,
						mergeColor: itemData.color,
					}}
					num={SHOP_HORIZONTAL_NUM}
					key={`items${idx}`}
					grade={itemData.grade}
					itemsHole={itemData.hole}
					sealed={itemData.sealed}
					favorite={itemData.favorite}
					selectColor={selectColor_}
					onClick={() => {
						setItemPopup(true);
						itemData.quality = itemsGrade;
						let button = [];
						if (shopType === 'shop') {
							if (selectTab < 3) {
								button.push('buy');
							} else {
								button.push('sell');
								button = buttonType(button, itemData);
							}
						} else if (shopType === 'tool') {
							if (selectTab < 3) {
								button.push('buy');
							} else {
								button.push('sell');
								button = buttonType(button, itemData);
							}
						} else if (shopType === 'inven') {
							button.push('sell');
							button = buttonType(button, itemData);
						}
						if (selectItem[selectItemNum].itemSaveSlot !== '' && selectItem[selectItemNum].selectTab === selectTab && selectItem[selectItemNum].itemSaveSlot === idx) {
							setSelectItem({saveItemData:{},gameItem:{},itemSaveSlot:'',selectTab:'',itemCate:'',buttonType:[]});
						}
						const cloneSelectItem = [...selectItem];
						cloneSelectItem[selectItemNum] = {
							saveItemData: itemData,
							gameItem: items,
							itemSaveSlot: idx,
							selectTab: selectTab,
							itemCate: typeList[scrollIdx].itemCate,
							buttonType: button,
						}
						setSelectItem(cloneSelectItem);
					}}/>
			} else {
				const itemTypeNa = typeof invenIdx === 'number' ? invenNa[invenIdx] : typeList[scrollIdx].na;
				const items = gameItem[itemTypeNa][itemData.idx];
				const grade = itemData.grade || items?.grade || 0;
				return items && <ItemLayout 
					gameItem={gameItem}
					icon={{
						type: itemTypeNa,
						pic: "itemEtc",
						idx: items.display
					}}
					num={SHOP_HORIZONTAL_NUM}
					key={`items${idx}`}
					grade={grade}
					selectColor={selectColor_}
					onClick={() => {
						setItemPopup(true);
						let button = [];
						if (shopType === 'shop') {
							if (selectTab < 3) {
								button.push('buy');
							} else {
								button.push('sell');
								button = buttonType(button, itemData);
							}
						} else if (shopType === 'tool') {
							if (selectTab < 3) {
								button.push('buy');
							} else {
								button.push('sell');
								button = buttonType(button, itemData);
							}
						} else if (shopType === 'inven') {
							button.push('sell');
							button = buttonType(button, itemData);
						}
						if (selectItem[selectItemNum].itemSaveSlot !== '' && (itemData.id ? itemData.id === selectItem[selectItemNum]?.saveItemData?.id : (itemData.idx === selectItem[selectItemNum]?.saveItemData?.idx))) {
							setSelectItem({saveItemData:[],gameItem:[],itemSaveSlot:'',buttonType:[],selectTab:'',itemCate:''});
						}
						const cloneSelectItem = [...selectItem];
						cloneSelectItem[selectItemNum] = {
							saveItemData: itemData,
							gameItem: items,
							itemSaveSlot: idx,
							selectTab: selectTab,
							itemCate: itemTypeNa,
							buttonType: button,
						}
						setSelectItem(cloneSelectItem);
					}} />
			}
		})}
	</>
}

const InvenShop = ({
	shopType,
	cityIdx,
	saveData,
	changeSaveData,
}) => {
  const context = useContext(AppContext);
	const {state} = useLocation();
  const lang = React.useMemo(() => {
    return context.setting.lang;
  }, [context]);
  const imgSet = React.useMemo(() => {
    return context.images;
  }, [context]);
  const gameData = React.useMemo(() => {
    return context.gameData;
  }, [context]);
  const sData = React.useMemo(() => Object.keys(saveData).length === 0 ? util.loadData('saveData') : saveData, [saveData]);
  const [popupOn, setPopupOn] = useState(false);
  const [popupInfo, setPopupInfo] = useState({});
  const [popupType, setPopupType] = useState('');
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");
	const [tooltipOn, setTooltipOn] = useState(false);
	const [tooltip, setTooltip] = useState('');
	const [tooltipPos, setTooltipPos] = useState([0,0]);
	const [itemPopup, setItemPopup] = useState(false);
	const shopItem = React.useMemo(() => {
		const cityData = sData.city[cityIdx];
		switch (shopType) {
			case 'shop':
				return [
					[...cityData.shop.helm],
					[...cityData.shop.armor],
					[...cityData.shop.weapon],
					[[...sData.items.equip],[...sData.items.hole],[...sData.items.upgrade],[...sData.items.material],[...sData.items.etc]],
				];
			case 'tool':
				return [
					[...cityData.tool.accessory],
					[...cityData.tool.upgrade],
					[...cityData.tool.etc],
					[[...sData.items.equip],[...sData.items.hole],[...sData.items.upgrade],[...sData.items.material],[...sData.items.etc]],
				];
			case 'inven':
				return [
					[...sData.items.equip],
					[...sData.items.hole],
					[...sData.items.upgrade],
					[...sData.items.material],
					[...sData.items.etc],
				];
			default: 
				break;
		}
	}, [cityIdx, sData, shopType]);
	const typeList = React.useMemo(() => {
		switch (shopType) {
			case 'shop':
				return [
					{na:'helm',itemCate:'equip',icon:10},
					{na:'armor',itemCate:'equip',icon:11},
					{na:'weapon',itemCate:'equip',icon:12},
					{na:'inven',itemCate:'equip',icon:13},
				];
			case 'tool':
				return [
					{na:'accessory',itemCate:'equip',icon:18},
					{na:'upgrade',itemCate:'upgrade',icon:15},
					{na:'etc',itemCate:'etc',icon:17},
					{na:'inven',itemCate:'equip',icon:13},
				];
			case 'inven':
				return [
					{na:'equip',itemCate:'equip',icon:11},
					{na:'hole',itemCate:'hole',icon:14},
					{na:'upgrade',itemCate:'upgrade',icon:15},
					{na:'material',itemCate:'material',icon:16},
					{na:'etc',itemCate:'etc',icon:17},
				];
			default:
				break;
		}
	}, [shopType]);
	const invenNa = useRef(['equip', 'hole', 'upgrade', 'material', 'etc']);
	const selectItemArr = ['#fff','#ffac2f','#e14040','#a800ff','#0090ff','#00a90c'];
	const [selectItemNum, setSelectItemNum] = useState(0);
	const [selectTab, setSelectTab] = useState(selectTabFn(state, shopType, typeList));
	const [selectItem, setSelectItem] = useState(() => {
		return selectItemArr.map(() => {
			return selectItemFn(sData, state, shopType, selectItemNum);
		});
	});
	useEffect(() => {
		setSelectTab(selectTabFn(state, shopType, typeList));
	}, [sData, state, shopType, typeList]);
	useEffect(() => {
		// setSelectItem(() => {
		// 	return selectItemArr.map(() => {
		// 		return selectItemFn(sData, state, shopType, selectItemNum);
		// 	});
		// });
	}, [sData, state, shopType, typeList, selectItemArr, selectItemNum]);
	const actionCh = React.useMemo(() => sData.actionCh.shop, [sData]);//행동할 캐릭터 데이터
	const actionRef = useRef();//행동할 캐릭터 선택자
	useEffect(() => {
		if (Object.keys(sData).length !== 0 && shopType !== 'inven') {
			setPopupInfo({
				ch: sData.ch,
				actionCh: sData.actionCh[shopType].idx,
				type: shopType
			});
		}
	}, [sData, shopType]);

  return (
		<>
			<ShopWrap>
				<ShopTop>
					<TabMenu list={typeList} selectTab={selectTab} setSelectTab={setSelectTab} className="transition" />
				</ShopTop>
				{Object.keys(actionCh).length !== 0 && shopType !== 'inven' && (<ActionCh ref={actionRef} className={`ch_select_area ${actionCh.idx !== "" ? 'g' + (sData.ch?.[actionCh.idx]?.grade || 1) : ''}`} onClick={() => {
						setPopupType('selectCh');
						setPopupOn(true);
					}}>
						<ActionChDisplay type="shop" saveData={sData} gameData={gameData} actionCh={actionCh} imgSet={imgSet}/>
					</ActionCh>
				)}
				<ShopScrollContent className="num6">
					{shopItem.map((scrollData, scrollIdx) => {
						return <ShopItem className="scroll-y" selected={selectTab === scrollIdx} key={`scrollContent${scrollIdx}`}>
							{typeList[scrollIdx].na === 'inven' ? 
								scrollData.map((invenData, invenIdx) => {
									return (
										<div key={`inven${invenIdx}`}>
											<Text code="t3" color="main">{gameData.msg.menu[invenNa.current[invenIdx]][lang]}</Text>
											<ShopList 
												gameData={gameData} 
												shopType={shopType} 
												typeList={typeList} 
												invenNa={invenNa.current} 
												list={invenData} 
												scrollIdx={scrollIdx} 
												invenIdx={invenIdx} 
												selectTab={selectTab} 
												selectItem={selectItem} 
												selectItemNum={selectItemNum} 
												setSelectItem={setSelectItem}
												setItemPopup={setItemPopup} />
										</div>
									)
								})
							: 
								<ShopList 
									gameData={gameData} 
									shopType={shopType} 
									typeList={typeList} 
									list={scrollData} 
									scrollIdx={scrollIdx} 
									selectTab={selectTab} 
									selectItem={selectItem} 
									selectItemNum={selectItemNum} 
									setSelectItem={setSelectItem}
									setItemPopup={setItemPopup} />
							}
						</ShopItem>
					})}
				</ShopScrollContent>
				{itemPopup && selectItem[selectItemNum]?.saveItemData && Object.keys(selectItem[selectItemNum]?.saveItemData).length !== 0 && <ShopPopup onClick={() => {
					setItemPopup(false);
				}}>
					<ItemContainer frameBack={imgSet.etc.frameChBack} itemSelect="select">
						<ShopFooter 
							selectItem={selectItem}
							selectItemArr={selectItemArr}
							selectItemNum={selectItemNum}
							setSelectItem={setSelectItem} 
							selectSlot={1} 
							shopType={shopType} 
							actionCh={actionCh} 
							saveData={sData} 
							changeSaveData={changeSaveData} 
							cityIdx={cityIdx} 
							typeList={typeList} 
							selectTab={selectTab} 
							setPopupType={setPopupType} 
							setPopupInfo={setPopupInfo} 
							setPopupOn={setPopupOn} 
							setMsgOn={setMsgOn} 
							setMsg={setMsg}
							setTooltip={setTooltip}
							setTooltipPos={setTooltipPos}
							setTooltipOn={setTooltipOn}
							setItemPopup={setItemPopup} />
					</ItemContainer>
				</ShopPopup>}
				<SelectItemGroup>
					<ul>
						{selectItemArr.map((itemColor, idx) => {
							return <SelectItemList sealed={selectItem[idx].saveItemData.sealed} select={selectItemNum === idx} color={itemColor} key={`itemColor_${idx}`} onClick={() => {
								if (selectItemNum === idx) {
									if (itemPopup === false) {
										const cloneSelectItem = [...selectItem];
										cloneSelectItem[idx] = {saveItemData:{},gameItem:{},itemSaveSlot:'',selectTab:'',itemCate:'',buttonType:[]}
										setSelectItem(cloneSelectItem);
									} else {
										setItemPopup(false);
									}
								} else {
									setItemPopup(true);
									setSelectItemNum(idx);
								}
							}}>
								{selectItem[idx].itemSaveSlot !== "" && (selectItem[idx].itemCate === "equip" ? 
									<ItemPic isAbsolute type="equip" pic="equip" idx={selectItem[idx].gameItem.display} />
									
								: <ItemPic className="pic" pic="itemEtc" type={selectItem[idx].itemCate} idx={selectItem[idx].gameItem.display} />)}
							</SelectItemList>
						})}
					</ul>
				</SelectItemGroup>
			</ShopWrap>
			<PopupContainer>
        {popupOn && <Popup type={popupType} dataObj={popupInfo} saveData={sData} changeSaveData={changeSaveData} showPopup={setPopupOn} msgText={setMsg} showMsg={setMsgOn} />}
      </PopupContainer>
      <MsgContainer>
        {msgOn && <Msg text={msg} showMsg={setMsgOn}></Msg>}
      </MsgContainer>
			<TooltipContainer>
				{tooltipOn && <Tooltip isDark={true} pos={tooltipPos} text={tooltip} showTooltip={setTooltipOn} />}
			</TooltipContainer>
		</>
  );
}

export default InvenShop;
