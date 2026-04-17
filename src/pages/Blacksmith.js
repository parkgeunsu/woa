import { Text } from 'components/Atom';
import { ActionChDisplay } from 'components/Components';
import { FlexBox } from 'components/Container';
import { IconPic, ItemPic, MergedPic } from 'components/ImagePic';
import ItemLayout from 'components/ItemLayout';
import { util } from 'components/Libs';
import Modal from 'components/Modal';
import ModalContainer from 'components/ModalContainer';
import Msg from 'components/Msg';
import MsgContainer from 'components/MsgContainer';
import Npc from 'components/Npc';
import Popup from 'components/Popup';
import PopupContainer from 'components/PopupContainer';
import { AppContext } from 'contexts/app-context';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
/* .itemEn_colorArea .colorant:before{
content:'';position:absolute;left:0;top:0;width:100%;height:100%;border-radius:15px;background:linear-gradient(135deg, rgba(255,255,255,0) 10%,rgba(255,255,255,.5) 20%,rgba(255,255,255,0) 30%);z-index:1;
}
.itemEn_colorArea .colorant.on:before{transform:scale(1.5);opacity:1;} */
const Wrap = styled(FlexBox)`
	position: absolute;
  inset: 0;
	padding: 0 0 20px 0;
	box-sizing: border-box;
	overflow: hidden;
`;
const WorkArea = styled(FlexBox)`
	position: relative;
	margin: 10px auto 0;
  flex: 1;
	width: 90%;
  box-sizing: border-box;
  background: rgba(0,0,0,.7);
  border: 5px solid transparent;
  border-image: url(${({frameBack}) => frameBack}) 5 round;
`;
const GreetingText = styled(Text)`
	padding: 10%;
`;
const WorkHeader = styled(FlexBox)`
	height: auto;
`;
const SocketContent = styled(FlexBox)`
	position: relative;
	flex: 1;
	width: 100%;
	height: 100%;
	overflow: hidden;
	border-radius: 0 0 20px 20px;
	background: rgba(0,0,0,.8);
	${({animate}) => animate && `
		pointer-events: none;
		.upgrade_material {
			animation: item_upgrade 2.5s cubic-bezier(0.05, 0.46, 0.94, 0.06);
			animation-fill-mode: forwards;
			transform-origin: 50% 50%;
		}
		.button_group {
			opacity:0;
		}
	`}
`;
const UpgradeContent = styled(FlexBox)`
	position: relative;
	flex: 1;
	width: 100%;
	height: 100%;
	overflow: hidden;
	border-radius: 0 0 20px 20px;
	background: rgba(0,0,0,.8);
	${({animate}) => animate && `
		pointer-events: none;
		.upgrade_material {
			animation: item_upgrade 2.5s cubic-bezier(0.05, 0.46, 0.94, 0.06);
			animation-fill-mode: forwards;
			transform-origin: 50% 50%;
		}
		.button_group {
			opacity:0;
		}
	`}
`;
const UserContainer = styled(FlexBox)`
	position: relative;
	padding: 10px 20px 0 20px;
	height: calc(25% - 10px);
	width: calc(100% - 40px);
`;
const ItemGroup = styled(FlexBox)`
	position: relative;
	flex: 1;
	margin: 0 10px 0 0;
	height: 100%;
	box-sizing: border-box;
	background: rgba(0,0,0,.8);
	${({animate}) => animate && `
		pointer-events: none;
	`}
`;
const ItemBox = styled(FlexBox)`
	flex-wrap: wrap;
	margin: 0 0 0 5px;
	width: 50%;
	background: rgba(0,0,0,.7);
	box-sizing: border-box;
	overflow-y: auto;
	padding: 3px;
	border: 1px solid ${({theme}) => theme.color.grey1};
	&:first-of-type {
		margin: 0;
	}
`;
const ColorArea = styled.div`
	&:after{
		content: '';
		position: absolute;
		inset: 0;
		background: transparent;
		filter: blur(4px);
		border-radius: 50%;
		pointer-events: none;
	}
	&.hole1:after{
		background: radial-gradient(ellipse at 50% 50%, ${({mainColor}) => mainColor ? mainColor[0] : 'transparent'},transparent 40%),
		radial-gradient(ellipse at 50% 0%, ${({color}) => color[0] ? color[0].color : 'transparent'},transparent 100%);
	}
	&.hole2:after{
		background: radial-gradient(ellipse at 50% 50%, ${({mainColor}) => mainColor ? mainColor[0] : 'transparent'},transparent 40%),
		radial-gradient(ellipse at 50% 10%, ${({color}) => color[0] ? color[0].color : 'transparent'},transparent 90%),
		radial-gradient(ellipse at 50% 90%, ${({color}) => color[1] ? color[1].color : 'transparent'},transparent 90%);
	}
	&.hole3:after{
		background: radial-gradient(ellipse at 50% 50%, ${({mainColor}) => mainColor ? mainColor[0] : 'transparent'},transparent 40%),
		radial-gradient(ellipse at 50% 10%, ${({color}) => color[0] ? color[0].color : 'transparent'},transparent 80%),
		radial-gradient(ellipse at 80% 90%, ${({color}) => color[1] ? color[1].color : 'transparent'},transparent 80%),
		radial-gradient(ellipse at 20% 90%, ${({color}) => color[2] ? color[2].color : 'transparent'},transparent 80%);
	}
	&.hole4:after{
		background: radial-gradient(ellipse at 50% 50%, ${({mainColor}) => mainColor ? mainColor[0] : 'transparent'},transparent 40%),
		radial-gradient(ellipse at 15% 15%, ${({color}) => color[0] ? color[0].color : 'transparent'},transparent 70%),
		radial-gradient(ellipse at 85% 15%, ${({color}) => color[1] ? color[1].color : 'transparent'},transparent 70%),
		radial-gradient(ellipse at 85% 85%, ${({color}) => color[2] ? color[2].color : 'transparent'},transparent 70%),
		radial-gradient(ellipse at 15% 85%, ${({color}) => color[3] ? color[3].color : 'transparent'},transparent 70%);
	}
	&.hole5:after{
		background: radial-gradient(ellipse at 50% 50%, ${({mainColor}) => mainColor ? mainColor[0] : 'transparent'},transparent 40%),
		radial-gradient(ellipse at 50% 10%, ${({color}) => color[0] ? color[0].color : 'transparent'},transparent 60%),
		radial-gradient(ellipse at 85% 35%, ${({color}) => color[1] ? color[1].color : 'transparent'},transparent 60%),
		radial-gradient(ellipse at 70% 100%, ${({color}) => color[2] ? color[2].color : 'transparent'},transparent 60%),
		radial-gradient(ellipse at 30% 100%, ${({color}) => color[3] ? color[3].color : 'transparent'},transparent 60%),
		radial-gradient(ellipse at 15% 35%, ${({color}) => color[4] ? color[4].color : 'transparent'},transparent 60%);
	}
`;
const ColorantItem = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;
	aspect-ratio: 1 / 1;
	height: 50%;
	z-index: 2;
	transform: translate(-50%, -50%);
`;
const Colorant = styled.div`
	position: absolute;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	z-index: 2;
	${({holeNum, idx}) => {
		switch(holeNum) {
			case 1:
				return `
					left: calc(50% - 25px);
					top: 4%;
				`;
			case 2:
				if (idx === 0) {
					return `
						left: calc(50% - 25px);
						top: 4%;
					`;
				} else {
					return `
						left: calc(50% - 25px);
						bottom: 4%;
					`;
				}
			case 3:
				if (idx === 0) {
					return `
						left: calc(50% - 25px);
						top: 4%;
					`;
				} else if (idx === 1) {
					return `
						right: 10%;
						bottom: 20%;
					`
				} else {
					return `
						left: 10%;
						bottom: 20%;
					`;
				}
			case 4:
				if (idx === 0) {
					return `
						left: 15%;
						top: 15%;
					`;
				} else if (idx === 1) {
					return `
						right: 15%;
						top: 15%;
					`
				} else if (idx === 2) {
					return `
						right: 15%;
						bottom: 15%;
					`
				} else {
					return `
						left: 15%;
						bottom: 15%;
					`;
				}
			case 5:
				if (idx === 0) {
					return `
						left: calc(50% - 25px);
						top: 4%;
					`;
				} else if (idx === 1) {
					return `
						right: 7%;
						top: 30%;
					`
				} else if (idx === 2) {
					return `
						right: 19%;
						bottom: 12%;
					`
				} else if (idx === 3) {
					return `
						left: 19%;
						bottom: 12%;
					`
				} else {
					return `
						left: 7%;
						top: 30%;
					`;
				}
		}
	}}
	${({select, colorSet}) => select ? `
		box-shadow: 0 0 5px #e14040,0 0 10px #e14040, 0 0 20px #ffac2f,0 0 15px #ffac2f;
	` : colorSet ? `
		box-shadow: none !important;
	`: `
		box-shadow: 0 0 10px #fff;
	`}
	&:before {
		${({idx}) => `
			content: "${idx}";
		`}
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		font-size: 1.5rem;
	}
	&:after {
		content: "";
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		transition: all .5s ease-out;
		transform-origin: center center;
		${({clogged}) => clogged ? `
			transform: scale(1.5);
			opacity: 1;
		` : `
			transform: scale(4);
			opacity: 0;
		`}
		border-radius: 15px;
		background: radial-gradient(hsl(0, 100%, 27%) 4%, hsl(0, 100%, 18%) 9%, hsla(0, 100%, 20%, 0) 9%) 0 0, radial-gradient(hsl(0, 100%, 27%) 4%, hsl(0, 100%, 18%) 8%, hsla(0, 100%, 20%, 0) 10%) 50px 50px, radial-gradient(hsla(0, 100%, 30%, 0.8) 20%, hsla(0, 100%, 20%, 0)) 50px 0, radial-gradient(hsla(0, 100%, 30%, 0.8) 20%, hsla(0, 100%, 20%, 0)) 0 50px, radial-gradient(hsla(0, 100%, 20%, 1) 35%, hsla(0, 100%, 20%, 0) 60%) 50px 0, radial-gradient(hsla(0, 100%, 20%, 1) 35%, hsla(0, 100%, 20%, 0) 60%) 100px 50px, radial-gradient(hsla(0, 100%, 15%, 0.7), hsla(0, 100%, 20%, 0)) 0 0, radial-gradient(hsla(0, 100%, 15%, 0.7), hsla(0, 100%, 20%, 0)) 50px 50px, linear-gradient(45deg, hsla(0, 100%, 20%, 0) 49%, hsla(0, 100%, 0%, 1) 50%, hsla(0, 100%, 20%, 0) 70%) 0 0, linear-gradient(-45deg, hsla(0, 100%, 20%, 0) 49%, hsla(0, 100%, 0%, 1) 50%, hsla(0, 100%, 20%, 0) 70%) 0 0;
  	background-color: #300;
  	background-size: 20px 20px;
		box-shadow: 0 0 10px #000;
		pointer-events: none;
	}
`;
const ItemColorant = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	border-radius: 50%;
	overflow: hidden;
	z-index: 1;
	${({closed}) => closed && `
		box-shadow: 0 0 5px #fff,0 0 10px #fff, 0 0 20px #fff,0 0 15px #fff;
	`}
	${({grade}) => {
		switch(grade) {
			case 1:
				return `
					background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-normal) 100%);
				`;
			case 2:
				return `
					background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-magic) 100%);
				`;
			case 3:
				return `
					background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-rare) 100%);
				`;
			case 4:
				return `
					background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-epic) 100%);
				`;
			case 5:
				return `
					background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-set) 100%);
				`;
			case 6:
				return `
					background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-unique) 100%);
				`;
			case 7:
				return `
					background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-legend) 100%);
				`;
		}
	}}
`;
const ItemColorantEff = styled.div`
	position: absolute;
	${({idx}) => {
		switch (idx) {
			case 0:
				return `
					left: -100%;
					top: 0%;
				`;
			case 1:
				return `
					left: -80%;
					top: 0%;
				`;
			case 2:
				return `
					left: -50%;
					top: -60%;
				`;
			case 3:
				return `
					left: -50%;
					top: -60%;
				`;
			case 4:
				return `
					left: 80%;
					top: 0%;
				`;
			default:
				break;
		}
	}}
	padding: 5px;
	white-space: nowrap;
	z-index: 2;
	border-radius: 10px;
	background: rgba(0,0,0,.5);
`;
const ColorantEff = styled.div`
	margin: 0 0 5px 0;
	color: ${({idx}) => {
		switch(idx) {
			case 0:
				return `#ffcc15`;
			case 1:
				return `#a800ff`;
			case 2:
				return `#ff2a00`;
			case 3:
				return `#00a90c`;
			case 4:
				return `#0090ff`;
			default:
				break;
		}
	}};
	font-size: 0.813rem;
	font-weight: 600;
	text-shadow: 0 0 5px #000,0 0 20px #fff;
	&:last-of-type {
		margin: 0;
	}
	em {
		font-size: 0.938rem;
	}
`;
const UpgradeArea = styled.div``;
const UpgradeItem = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
	aspect-ratio: 1 / 1;
	height: 50%;
	z-index: 2;
`;
const UpgradeMaterial = styled.div`
	position: absolute;
	left: 30%;
	top: 25%;
	transform: translate(-50%,-50%);
	aspect-ratio: 1 / 1;
	height: 40%;
	z-index: 2;
`;
const UpgradeShadow = styled.div`
	position: absolute;
	inset: 0;
	background: radial-gradient(ellipse at 50% 50%,${({gradeColor}) => gradeColor},transparent 40%);
	filter: blur(4px);
	border-radius: 50%;
	pointer-events: none;
	animation: item_shadow 2s linear infinite alternate;
`;
const UpgradePercent = styled(Text)`
	position: absolute;
	left: 50%;
	bottom: 15%;
	transform: translate(-50%, 0);
	text-shadow: ${({theme}) => `0 0 20px ${theme.color.main}, 0 0 10px ${theme.color.main}, 0 0 5px ${theme.color.main}`};
	z-index: 2;
	&:after {
		content: '%';
	}
`;
const ItemTotalEff = styled.div`
	position: absolute;
	inset: 20px;
	padding: 20px;
	background: rgba(0,0,0,.7);
	z-index: 10;
	border:5px solid transparent;
  border-image: url(${({frameBack}) => frameBack}) 5 round;
	.item_header {
		text-align: center;
	}
	.item_name {
		line-height: 1.2;
		color: ${({color}) => color};
		font-size: 0.875rem;
		font-weight: 600;
	}
	.item_list {
		display: flex;
		margin: 10px 0 0 0;
		flex-direction: column;
	}
	.item_list .item_title {
		margin: 0 0 5px 0;
		font-size: 0.75rem;
		color: #ddd;
	}
	.item_effs{
		display: flex;
		align-items: center;
		margin: 0 0 5px 5px;
		color: #2f73ff;
		font-weight: 600;
	}
	.item_effs.add {
		color: #ffac2f;
	}
	.item_effs.hole {
		color #e14040;
	}
	.item_effs span {
		display: block;
		font-weight: 600;
	}
	.item_effs .cate {
		margin: 0 10px 0 0;
		color: #00a90c;
	}
	.item_effs .base {
		margin: 0 5px 0 0;
		color: #2f73ff;
	}
	.item_effs .add {
		margin: 0 5px 0 0;
		color: #ffac2f;
	}
	.item_effs .hole {
		color: #e14040;
	}
	.item_effs .total {
		flex: 1;
		text-align: right;
		font-size: 0.938rem;
		color: #fff;
	}
`;
const LockIcon = styled(IconPic)`
	position: absolute;
	left: 50%;
	top: 70%;
	width: 60%;
	height: 60%;
	transform: translate(-50%, 0);
	z-index: 1;
	background-color: #ffac2f;
	border-radius: 20px;
	border: 2px solid #000;
	box-sizing: border-box;
`;
const ButtonGroup = styled.div`
	position: absolute;
	right: 5%;
	bottom: 10px;
	z-index: 1;
	transition: all .5s;
	${({isShow}) => isShow ? `
		display: block;
	` : `
		display: none;
	`}
`;
const ActionPic = styled(FlexBox)`
	position: relative;
	width: auto;
	height: 100%;
	border-radius: 5%;
	overflow: hidden;
  box-sizing: border-box;
  background: rgb(0, 0, 0, 0.5);
  z-index: 3;
`;
const NoneChText = styled(Text)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;
const Img = styled.img.attrs(
	({imgurl}) => ({
		src: imgurl 
	})
)`
	height: 100%;
`;
const colorMix = (util, mainColor, color) => {
	let colorNum = [0,0,0];
	const rgbaColor = mainColor.indexOf('rgba') === -1 && mainColor.indexOf('Hsl') === -1 ? mainColor.replace(/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/gi,'rgba($1, $2, $3, 1)') : mainColor;
	const mRgb = rgbaColor.indexOf('hsl') >= 0 ? util.getHslaToRgba(rgbaColor).replace(/\s/g,'').replace(/rgba\(([0-9]{1,3})\,([0-9]{1,3})\,([0-9]{1,3})\,[0-9,\.]{1,5}\)/g,`$1,$2,$3`).split(',') : rgbaColor.replace(/\s/g,'').replace(/rgba\(([0-9]{1,3})\,([0-9]{1,3})\,([0-9]{1,3})\,[0-9,\.]{1,5}\)/g,`$1,$2,$3`).split(',');
	color.forEach((colorData, idx) => {
		const rgb = colorData ? colorData.replace(/\s/g,'').replace(/rgba\(([0-9]{1,3})\,([0-9]{1,3})\,([0-9]{1,3})\,[0-9,\.]{1,5}\)/g,`$1,$2,$3`).split(',') : ['0','0','0'];
		rgb.forEach((num, idx) => {
			colorNum[idx] += Math.floor((num*1 - mRgb[idx]*1) * 0.1);
		});
	});
	const changeColor = `rgba(${mRgb[0]*1 + colorNum[0]},${mRgb[1]*1 + colorNum[1]},${mRgb[2]*1 + colorNum[2]},1)`;
	
	//console.log(colorNum, mRgb,changeColor)
	return changeColor;
}
const removeSocket = (data, saveData, gameData, changeSaveData, lang) => {
	const removeIdx = saveData.items.etc.findIndex((item) => item.idx === 22);
	if (removeIdx >= 0) {//보석제거 집게(22) 있을 경우
		const updatedEtc = saveData.items.etc.filter((_, i) => i !== removeIdx);
		const updatedEquipHole = [...saveData.items.equip[data.item.select].hole];
		updatedEquipHole[data.socketIdx] = 0;

		const targetEquip = { ...saveData.items.equip[data.item.select], hole: updatedEquipHole };
		delete targetEquip.colorantSet;
		delete targetEquip.colorantColor;
		delete targetEquip.colorEff;
		delete targetEquip.svgColor;

		const updatedEquip = saveData.items.equip.map((eq, i) => i === data.item.select ? targetEquip : eq);

		let cloneColor = data.socket.game.map((data) => {
			return data.color
		});
		const mColor = colorMix(util,data.item.save.color, cloneColor);
		// let saveColor = [...data.item.save.color];
		// saveColor[0] = mColor;
		data.setMainColor(mColor);
		
		data.showMsg(true);
		data.msgText(`<span remove>-500</span><br/><span remove>-1 ${gameData.items.etc[22].na[lang]}</span>`);

		const finalSaveData = {
			...saveData,
			info: { ...saveData.info, money: saveData.info.money - gameData.prices.blacksmith.socketRemove[0].price },
			items: { ...saveData.items, etc: updatedEtc, equip: updatedEquip }
		};
		changeSaveData(finalSaveData);
	} else {
		data.showMsg(true);
		data.msgText(gameData.msg.sentenceFn.lackItem(lang, gameData.items.etc[22].na));
	}
}
const upgrade = (data, saveData, gameData, changeSaveData, lang) => {
	const removeIdx = saveData.items.upgrade.findIndex((item) => item.idx === data.upgradeItem.game.idx);
	if (removeIdx >= 0) {//아이템 강화책(8-10) 있을 경우
		const updatedEtc = saveData.items.etc.filter((_, i) => i !== removeIdx);
		const price = gameData.prices.blacksmith[`upgrade${data.item.save.grade - 1}`][0].price;
		
		const removeIdx2 = saveData.items.upgrade.findIndex((itemUpgrade) => itemUpgrade.idx === data.upgradeItem.save.idx);
		const updatedUpgrade = saveData.items.upgrade.filter((_, i) => i !== removeIdx2);

		if (typeof data.upgradeItem.select === 'number') {
			data.setUpgradeOn('upgradeAnimation');
			data.timeoutRef.current = setTimeout(() => {
				data.setUpgradeOn('');
				data.setUpgradeItem({save:{},select:'',game:{}});
				if (Math.random() < data.upgradePercent / 100) {
					console.log(data.upgradePercent / 100);
					const updatedEquipGrade = saveData.items.equip.map((eq, i) => i === data.item.select ? { ...eq, grade: eq.grade + 1 } : eq);
					const finalSaveData = {
						...saveData,
						info: { ...saveData.info, money: saveData.info.money - price },
						items: { ...saveData.items, etc: updatedEtc, upgrade: updatedUpgrade, equip: updatedEquipGrade }
					};
					changeSaveData(finalSaveData);
				} else {
					// Even if upgrade fails, materials and money are consumed
					const finalSaveDataFail = {
						...saveData,
						info: { ...saveData.info, money: saveData.info.money - price },
						items: { ...saveData.items, etc: updatedEtc, upgrade: updatedUpgrade }
					};
					changeSaveData(finalSaveDataFail);
				}
			}, 3000);
		}
	} else {
		data.showMsg(true);
		data.msgText(gameData.msg.sentenceFn.lackItem(lang, gameData.items.etc[7 + data.upgradeItem.game.grade].na));
	}
	console.log(data, data.upgradeItem.save.grade)
}
const setPercent = (item, tool) => {
	if (Object.keys(item).length !== 0 && Object.keys(tool).length !== 0) {
		const gradeGap = item.grade - tool.grade;
		switch(gradeGap) {
			case -1:
				return 80;
			case 0:
				return 50;
			case 1:
				return 30;
			case 2:
				return 10;
			default:
				return 100;
		}
	} else {
		return 0;
	}
}
const Blacksmith = ({
	saveData,
	changeSaveData,
	setLoading,
}) => {
	const navigate = useNavigate();
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
	const sData = React.useMemo(() => Object.keys(saveData).length === 0 ? util.loadData('saveData') : saveData, [saveData]);
  const [modalOn, setModalOn] = useState(false);
	const [modalInfo, setModalInfo] = useState({});
  const [modalType] = useState('confirm');
	const [popupOn, setPopupOn] = useState(false);
	const [popupType, setPopupType] = useState('');
	const [popupInfo, setPopupInfo] = useState({});
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");
	const [selectTab, setSelectTab] = useState("");
	const entries = React.useMemo(() => {
		return sData.entry.map((entryIdx) => {
			return {
				...sData.ch[entryIdx],
				slotIdx: entryIdx,
			};
		});
	}, [sData]);
	const actionChIdx = React.useMemo(() => {
		return sData.actionCh.blacksmith.idx <= entries.length - 1 ? sData.actionCh.blacksmith.idx : "";
	}, [entries, sData]);
	const saveCh = React.useMemo(() => entries[actionChIdx] || {}, [entries, actionChIdx]);
	const [item, setItem] = useState(Object.keys(saveData).length > 0 ? saveData?.items : []);

	const [selectItem1, setSelectItem1] = useState(() => {
		return item.length > 0 ? {
		save:item.equip[0],
		game:gameItem.equip[item.equip[0].part][item.equip[0].weaponType][item.equip[0].grade < 5 ? 0 : item.equip[0].grade - 5][item.equip[0].idx],
		select:0,
	} : {
		save:{},
		game:{},
		select:'',
	}});//좌측 장비 save, game
	const [possibleHole, setPossibleHole] = useState([]);
	const [selectItem2, setSelectItem2] = useState({
		save: Array.from({ length: 16 }, () => ({})),
		select: Array.from({ length: 16 }, () => ('')),
		game: Array.from({ length: 16 }, () => ({})),
	});//탭1 우측 홀 save, game
	const [selectItem3, setSelectItem3] = useState({
		save:{},
		select:'',
		game:{}
	});//탭2 우측 홀 save, game
	const [colorantIdx, setColorantIdx] = useState(0);
	const [mainColor, setMainColor] = useState(saveData?.items?.equip[0] ? saveData.items.equip[0].color : '');//합성된 장비 색상
	const [itemEffShow, setItemEffShow] = useState(false);//아이템 효과 보기
	const [mItemEff, setMItemEff] = useState();//아이템 효과 문구
	const [upgradeOn, setUpgradeOn] = useState('');//업그레이드 애니메이션 동작
	const [upgradePercent, setUpgradePercent] = useState(setPercent(selectItem1?.save, selectItem3?.game));
	const timeoutRef = useRef(null);
	const [modalData, setModalData] = useState({
		submitFn:() => {},
		payment:'',
	});

	const handleModal = (type, socketIdx) => {
		if (type === 'socket') {
			setModalInfo({
				type: 'confirm',
				msg: `${gameData.msg.sentence.removeSocket[lang]}<br/><span class="des">${gameData.msg.sentence.notReclaimed[lang]}</span>`,
				info: {
					item:selectItem1,
					socket:selectItem2,
					socketIdx:socketIdx,
					showMsg:setMsgOn,
					msgText:setMsg,
					setMainColor:setMainColor,
				},
				bt: [{txt:gameData.msg.button.use[lang],action:'itemEn'},{txt:gameData.msg.button.cancel[lang],action:'popClose'}],
			});
		} else {
			setModalInfo({
				type: 'confirm',
				msg: gameData.msg.sentence.upgradeQuestion[lang],
				info: {
					item:selectItem1,
					showMsg:setMsgOn,
					msgText:setMsg,
					upgradeItem:selectItem3,
					setUpgradeItem:setSelectItem3,
					setUpgradeOn:setUpgradeOn,
					timeoutRef:timeoutRef,
					upgradePercent:upgradePercent,
				},
				bt: [{txt:gameData.msg.button.use[lang],action:'itemEn'},{txt:gameData.msg.button.cancel[lang],action:'popClose'}],
			});
		}
    setModalOn(true);
  }
	useEffect(() => {
		setLoading(false);
		return () => {
			clearTimeout(timeoutRef.current);
		}
	}, []);
	useEffect(() => {
		//equip, hole, upgrade, merterial, etc
		setItem(saveData.items);
		let baseSelectItem = {save:[],select:[],game:[]},
		possibleColorantIdx = '';
		let pHole = [];
		if (saveData?.items?.equip[selectItem1.select]) {
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
			setMItemEff(util.getTotalEff({
				saveItems: selectItem1.save,
				gameData: gameData,
				cate: baseSelectItem
			}));
		}
	}, [saveData]);
	//selectItem1.save.colorantSet 셋트 아이템 idx 저장
	//mainColor 합성된 장비 색상
	//selectItem1.save.color save아이템 색상
	//selectItem1.game.color 장비 색상
	
	const [greeting, setGreeting] = useState(gameData.shop.blacksmith.greeting[lang]);
  return (
		<>
			<Wrap direction="column">
				<Npc imgSet={imgSet} shopType={'blacksmith'} gameData={gameData} lang={lang} selectTab={selectTab} setSelectTab={setSelectTab} navigate={navigate} onMenuClick={(idx) => {
					if (idx === 1) {
						setUpgradeOn(false);
						setSelectItem3({save:{},select:'',game:{}});
						clearTimeout(timeoutRef.current);
					}
				}} onClick={() => {
          setSelectTab("");
          const randomIdx = Math.floor(Math.random() * gameData.shop.blacksmith.randomText.length);
          setGreeting(gameData.shop.blacksmith.randomText[randomIdx][lang]);
				}}/>
				<WorkArea frameBack={imgSet.etc.frameChBack}direction="column" alignItems="center" justifyContent="center">
					{selectTab === "" && <GreetingText code="t4" color="main" wordBreak="keep-all">{greeting}</GreetingText>}
					{selectTab === 0 && <SocketContent direction="row" justifyContent="center" alignItems="flex-start" onClick={(e) => {
						e.stopPropagation();
						if (itemEffShow) {
							setItemEffShow(false);
						}
					}}>
						<ButtonGroup isShow={Object.keys(selectItem1.save).length > 0} className="button_group">
							<button className="button_big" text="true" onClick={(e) => {
								e.stopPropagation();
								let pHole = [],
									possibleColorantIdx = '';
								console.log('확정');
								let holeArr = [];
								let colorantData = {
									colorantSet: selectItem1.save.colorantSet,
									colorEff: selectItem1.save.colorEff,
									colorantColor: selectItem1.save.colorantColor
								};

								if (gameData.items.colorant[selectItem1.save.slot]) {
									gameData.items.colorant[selectItem1.save.slot].forEach((colorant, setIdx) => {
										let allMatched = colorant.socket.every((color, idx) => {
											if (selectItem2.save[idx] && Object.keys(selectItem2.save[idx]).length > 0) {
												return color === gameData.items.hole[selectItem2.save[idx].idx].colorSet;
											}
											return false;
										});

										if (allMatched) {
											colorantData.colorantSet = `${selectItem1.save.slot}_${setIdx}`;
											colorantData.colorEff = gameData.items.colorant[selectItem1.save.slot][setIdx].eff;
											colorantData.svgColor = gameData.items.colorant[selectItem1.save.slot][setIdx].svgColor;
											
											let cColor = [...selectItem1.save.color];
											cColor[0] = gameData.items.colorant[selectItem1.save.slot][setIdx].color[0];
											colorantData.colorantColor = cColor;
										}
									});
								}

								for(let i = 0; i < selectItem1.save.hole.length; ++i) {
									if (selectItem2.save[i] && Object.keys(selectItem2.save[i]).length > 0) {
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
								const selectSort = [...selectItem2.select].filter(s => s !== '').sort((a,b) => b - a);
								const updatedHole = saveData.items.hole.filter((_, i) => !selectSort.includes(i));
								
								const finalSaveData = {
									...saveData,
									items: {
										...saveData.items,
										equip: saveData.items.equip.map((eq, i) => i === selectItem1.select ? {
											...eq,
											hole: holeArr,
											...colorantData
										} : eq),
										hole: updatedHole
									}
								};
								changeSaveData(finalSaveData);
								setPossibleHole(pHole);
								setColorantIdx(possibleColorantIdx);
							}}>{gameData.msg.button.confirm[lang]}</button>
						</ButtonGroup>
						{itemEffShow && <ItemTotalEff frameBack={imgSet.etc.frameChBack} className="main_itemEff scroll-y" color={gameData.itemGrade.color[selectItem1.save.grade]}>
							<ul>
								<li className="item_header" flex-center="true"><span className="item_name" dangerouslySetInnerHTML={{__html: `${selectItem1.save.colorantSet ? util.getColorant(selectItem1.save.colorantSet, gameData).na[lang] : ''} ${selectItem1.save.modifier[lang]} ${selectItem1.game.na[lang]}`}}></span></li>
								<li className="item_list item_eff">
									<div className="item_title">{gameData.msg.itemInfo.itemEffect[lang]}</div>
									{mItemEff && mItemEff.map((eff, idx) => {
										return (
											<div key={idx} className="item_effs"><span className="cate">{util.getEffectType(eff.type, lang)}</span>{eff.base > 0 && <span className="base">{eff.base}</span>}{eff.add > 0 && <span className="add">{eff.add}</span>}{eff.hole > 0 && <span className="hole">{eff.hole}</span>}<span className="total">{eff.base + eff.add + eff.hole}</span></div>
										)
									})}
								</li>
								<div style={{width:"100%"}}>
									{selectItem1.save.baseEff.length > 0 && (
										<li className="item_list item_eff">
											<div className="item_title">{gameData.msg.itemInfo.basicEffect[lang]}</div>
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
											<div className="item_title">{gameData.msg.itemInfo.addEffect[lang]}</div>
											{selectItem1.save.addEff.map((data, idx) => {
												return (
													<div key={`add${idx}`} className="item_effs add">{`${util.getEffectType(data.type, lang)} ${data.num[0]}`}</div>
												) 
											})}
										</li>
									)}
									{selectItem1.save.hole.length > 0 && (
										<li className="item_list item_hole">
											<div className="item_title">{gameData.msg.itemInfo.socketEffect[lang]}</div>
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
						</ItemTotalEff>}
						<ColorArea mainColor={mainColor} color={selectItem2.game}>
							<ColorantItem onClick={() => {
								setItemEffShow(true);
							}}>
								{Object.keys(selectItem1.save).length !== 0 && <ItemLayout
									gameItem={gameData.items}
									icon={{
										type: "equip",
										pic: "equip",
										idx: selectItem1.game.display,
										mergeColor: mainColor || selectItem1.save.color,
									}}
									num={1}
									sealed={selectItem1.save.sealed}
								/>}
							</ColorantItem>
							{selectItem1.save?.hole && selectItem1.save?.hole.map((data, idx) => {
								let cColor = '';
								if (selectItem1.save.colorantSet) {
									const colorantColor = selectItem1.save.colorantSet.split('_');
									cColor = gameData.items.colorant[colorantColor[0]][colorantColor[1]].color;
								}
								const closed = selectItem2.game[idx] && !possibleHole[idx];
								return (
									<Colorant holeNum={Object.keys(selectItem1.save).length !== 0 ? selectItem1.save?.hole.length : '0'} select={colorantIdx === idx} clogged={possibleHole[idx] && selectItem2.game[idx]} colorSet={selectItem1.save.colorantSet} idx={idx} key={`colorant${idx}`} onClick={() => {//상단 슬롯 클릭
										if (possibleHole[idx]) {
											let cloneSelectItem2 = {...selectItem2};
											if (colorantIdx === idx && selectItem2.game[colorantIdx]) {//선택된 슬롯에 홀이 있으면
											//선택된 홀 제거
												cloneSelectItem2.game[colorantIdx] = ''
												cloneSelectItem2.select[colorantIdx] = '';
												cloneSelectItem2.save[colorantIdx] = '';
												setSelectItem2(cloneSelectItem2);
												let cloneColor = selectItem2.game.map((data) => {
													return data.color
												});
												// let saveColor = [...selectItem1.save.color];
												const mColor = colorMix(util,selectItem1.save.color, cloneColor);
												// saveColor[0] = mColor;
												setMainColor(mColor);
												setMItemEff(util.getTotalEff({
													saveItems: selectItem1.save,
													gameData: gameData,
													cate: cloneSelectItem2
												}));
											}
											setColorantIdx(idx);
										}
									}}>
										{selectItem2.save && selectItem2.save[idx] && (selectItem2.save[idx].grade || selectItem2.game[idx]?.grade) && (
											<>
												<ItemColorant closed={closed} grade={selectItem2.save[idx].grade || selectItem2.game[idx]?.grade} key={`hole_${idx}`}>
													<ItemPic className="pic" pic="itemEtc" type="hole" idx={selectItem2.game[idx].display} />
												</ItemColorant>
												<ItemColorantEff idx={idx}>
													{selectItem2.game[idx].eff.map((eff, effIdx) => {
														return <ColorantEff idx={idx} key={`colorant_eff${effIdx}`}>{util.getEffectType(eff.type, lang)}: <em>{eff.num[0]}</em></ColorantEff>;
													})}
												</ItemColorantEff>
												{closed && <LockIcon type="commonBtn" pic="icon100" idx="4" onClick={(e) => {
													e.stopPropagation();
													setModalData({
														submitFn: removeSocket,
														payment:'socketRemove'
													});
													// setModalFn(removeSocket);
													// setPayment('socketRemove');
													handleModal('socket',idx);
													console.log("슬롯 해제");
												}}/>}
												{cColor && <div style={{background: cColor, position: 'absolute', left: 0, top: 0, width: '100px', height: '100px'}}>
												</div>}
											</>
										)}
									</Colorant>
								)
							})}
						</ColorArea>
					</SocketContent>}
					{selectTab === 1 && <UpgradeContent direction="row" justifyContent="center" alignItems="flex-start" onClick={(e) => {
						e.stopPropagation();
						if (itemEffShow) {
							setItemEffShow(false);
						}
					}}>
						<ButtonGroup isShow={Object.keys(selectItem1.save).length > 0} className="button_group">
							<button className="button_big" text="true" onClick={(e) => {
								e.stopPropagation();
								console.log('업그레이드');
								if (typeof selectItem3.select === 'number') {
									if (selectItem1.save.grade > 3) {
										setMsgOn(true);
										setMsg(gameData.msg.sentence.maxGrade[lang]);
									} else {
										console.log(selectItem1.save, selectItem3.save)
										if (selectItem1.save.part === 3) { //무기면
											if (selectItem3.save.idx > 5) { //숫돌이면
												setModalData({
													submitFn: upgrade,
													payment:`upgrade${selectItem3.save.idx}`
												});
												handleModal('upgrade');
											} else {
												setMsgOn(true);
												setMsg(gameData.msg.sentence.selectWhetstone[lang]);
											}
										} else { //방어구면
											if (selectItem3.save.idx <= 5) { //대장장이망치면
												setModalData({
													submitFn: upgrade,
													payment:`upgrade${selectItem3.save.idx}`
												});
												handleModal('upgrade');
											} else {
												setMsgOn(true);
												setMsg(gameData.msg.sentence.selectHammer[lang]);
											}
										}
									}
								} else {
									setMsgOn(true);
									setMsg(gameData.msg.sentence.selectUpgradeTools[lang]);
								}
							}}>{gameData.msg.button.upgrade[lang]}</button>
						</ButtonGroup>
						<UpgradeArea>
							<UpgradeItem onClick={() => {
								setItemEffShow(true);
							}}>
								{Object.keys(selectItem1.save).length !== 0 && 
								<ItemLayout
									gameItem={gameData.items}
									icon={{
										type: "equip",
										pic: "equip",
										idx: selectItem1.game.display,
										mergeColor: selectItem1.save.color,
									}}
									num={1}
									color={selectItem1.save.colorantSet ? selectItem1.save.colorantColor : mainColor || selectItem1.save.color}
									sealed={selectItem1.save.sealed}
								/>}
							</UpgradeItem>
							{selectItem3 && (
								<UpgradeMaterial className={`upgrade_material`}>
									<ItemLayout
									gameItem={gameData.items}
									icon={{
										type: "upgrade",
										pic: "itemEtc",
										idx: selectItem3.game.display
									}}
									num={1}
									onClick={() => {
										setSelectItem3({save:{},select:'',game:{}});
									}}/>
								</UpgradeMaterial>
							)}
							{itemEffShow && <ItemTotalEff frameBack={imgSet.etc.frameChBack} className="main_itemEff scroll-y" color={gameData.itemGrade.color[selectItem1.save.grade]}>
								<ul>
									<li className="item_header" flex-center="true"><span className="item_name" dangerouslySetInnerHTML={{__html: `${selectItem1.save.colorantSet ? util.getColorant(selectItem1.save.colorantSet, gameData).na[lang] : ''} ${selectItem1.save.modifier[lang]} ${selectItem1.game.na[lang]}`}}></span></li>
									<li className="item_list item_eff">
										<div className="item_title">{gameData.msg.itemInfo.itemEffect[lang]}</div>
										{mItemEff && mItemEff.map((eff, idx) => {
											return (
												<div key={idx} className="item_effs"><span className="cate">{util.getEffectType(eff.type, lang)}</span>{eff.base > 0 && <span className="base">{eff.base}</span>}{eff.add > 0 && <span className="add">{eff.add}</span>}{eff.hole > 0 && <span className="hole">{eff.hole}</span>}<span className="total">{eff.base + eff.add + eff.hole}</span></div>
											)
										})}
									</li>
									<div style={{width:"100%"}}>
										{selectItem1.save.baseEff.length > 0 && (
											<li className="item_list item_eff">
												<div className="item_title">{gameData.msg.itemInfo.basicEffect[lang]}</div>
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
												<div className="item_title">{gameData.msg.itemInfo.addEffect[lang]}</div>
												{selectItem1.save.addEff.map((data, idx) => {
													return (
														<div key={`add${idx}`} className="item_effs add">{`${util.getEffectType(data.type, lang)} ${data.num[0]}`}</div>
													) 
												})}
											</li>
										)}
										{selectItem1.save.hole.length > 0 && (
											<li className="item_list item_hole">
												<div className="item_title">{gameData.msg.itemInfo.socketEffect[lang]}</div>
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
							</ItemTotalEff>}
							<UpgradeShadow className={`itemEn_shadowArea`} gradeColor={gameData.itemGrade.color[selectItem1.save.grade]} />
							<UpgradePercent code="t8" weight="600" color="main">{upgradePercent}</UpgradePercent>
						</UpgradeArea>
					</UpgradeContent>}
				</WorkArea>
				<UserContainer justifyContent="space-between">
					<ItemGroup justifyContent="space-between" direction="row" animate={upgradeOn}>
						{selectTab === 0 && <>
							<ItemBox justifyContent="flex-start" alignContent="flex-start" alignItems="flex-start" type="select1">
								{item?.equip && item?.equip.map((data, idx) => {
									const itemsGrade = data.grade < 5 ? 0 : data.grade - 5;
									const items = gameItem.equip[data.part][data.weaponType][itemsGrade][data.idx];
									const grade = data.grade || items.grade;
									const itemsHole = data.hole;
									return items && <ItemLayout 
										gameItem={gameData.items}
										icon={{
											type: "equip",
											pic: "equip",
											idx: items.display,
											mergeColor: data.color,
										}}
										num={3}
										sealed={data.sealed}
										key={`hole_${idx}`}
										itemsHole={itemsHole}
										grade={grade}
										selectColor={selectItem1.select === idx ? 1 : ""}
										onClick={() => {//하단 좌측 장비 클릭
											//setMainColor(data.color);//상단 장비 합성배경 색상
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
											let cloneColor = baseSelectItem.game.map((data) => {
												return data.color
											});
											const mColor = colorMix(util,data.color, cloneColor);
											// let saveColor = [...data.color];
											// saveColor[0] = mColor;
											setMainColor(mColor);
											setSelectItem1({
												save:{...data},
												select:idx,
												game:items,
											});
											setPossibleHole(pHole);
											setColorantIdx(possibleColorantIdx);
											setSelectItem2(baseSelectItem);
											setMItemEff(util.getTotalEff({
												saveItems: data,
												gameData: gameData,
												cate: baseSelectItem
											}));
									}}/>
								})}
							</ItemBox>
							<ItemBox justifyContent="flex-start" alignContent="flex-start" alignItems="flex-start" type="select2">
								{item?.hole && item?.hole.map((data, idx) => {
									const items = gameItem.hole[data.idx];
									const grade = data.grade || items.grade;
									const select = selectItem2.select.filter((select) => {
										return select === idx;
									});
									return <ItemLayout 
										gameItem={gameData.items}
										icon={{
											type: "hole",
											pic: "itemEtc",
											idx: items.display,
										}}
										num={4}
										key={`hole_${idx}`}
										grade={grade}
										selectColor={select.length > 0 ? 2 : ""}
										onClick={() => {//하단 우측 홀 클릭
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
												const mColor = colorMix(util,selectItem1.save.color, cloneColor);
												// let saveColor = [...selectItem1.save.color];
												// saveColor[0] = mColor;
												setMainColor(mColor);
												
												setMItemEff(util.getTotalEff({
													saveItems: selectItem1.save,
													gameData: gameData,
													cate: cloneSelectItem2
												}));
												//메인 아이템 컬러 설정
												let colorArr = [...selectItem1.save.color];
												colorArr[0] = mColor;
											}
										}}
									/>
								})}
							</ItemBox>
						</>}
						{selectTab === 1 && <>
							<ItemBox justifyContent="flex-start" alignContent="flex-start" alignItems="flex-start" type="select1">
								{item.equip && item.equip.map((data, idx) => {
									const itemsGrade = data.grade < 5 ? 0 : data.grade - 5;
									const items = gameItem.equip[data.part][data.weaponType][itemsGrade][data.idx];
									const grade = data.grade || items.grade;
									const itemsHole = data.hole;
									return <ItemLayout 
										gameItem={gameData.items}
										icon={{
											type: "equip",
											pic: "equip",
											idx: items.display,
											mergeColor: data.color,
										}}
										num={3}
										sealed={data.sealed}
										itemsHole={itemsHole}
										key={`upgrade_${idx}`}
										grade={grade}
										selectColor={selectItem1.select === idx ? 1 : ""}
										onClick={() => {//하단 좌측 장비 클릭
											let baseSelectItem = {save:[],select:[],game:[]};data.hole.forEach((holeData,idx) => {//박혀 있는 hole셋팅
												if (holeData) {
													baseSelectItem.save[idx] = holeData;
													baseSelectItem.game[idx] = gameItem.hole[holeData.idx];
												}
											});
											setUpgradePercent(setPercent(data, selectItem3.game));
											setSelectItem1({
												save:{...data},
												select:idx,
												game:items,
											});
											setMItemEff(util.getTotalEff({
												saveItems: data,
												gameData: gameData,
												cate: baseSelectItem
											}));
										}}
									/>
								})}
							</ItemBox>
							<ItemBox justifyContent="flex-start" alignContent="flex-start" alignItems="flex-start" type="select2">
								{item.upgrade && item.upgrade.map((data, idx) => {
									const items = gameItem.upgrade[data.idx];
									const grade = data.grade || items.grade;
									return <ItemLayout 
										gameItem={gameData.items}
										icon={{
											type: "upgrade",
											pic: "itemEtc",
											idx: items.display,
											mergeColor: data.color,
										}}
										num={4}
										key={`hole_${idx}`}
										grade={grade}
										selectColor={selectItem3.select === idx ? 2 : ""}
										onClick={() => {//하단 우측 홀 클릭
											setUpgradePercent(setPercent(selectItem1.save, items));
											setSelectItem3({
												save:{...data},
												select:idx,
												game:items,
											});
										}}
									/>
								})}
							</ItemBox>
						</>}
					</ItemGroup>
					<ActionPic onClick={() => {
						setPopupInfo({
							ch: entries,
							actionChIdx: actionChIdx,
							type: 'blacksmith',
							setMsg: setMsg,
							setMsgOn: setMsgOn,
						});
						setPopupType('selectCh');
						setPopupOn(true);
					}}>
					<MergedPic isAbsolute pic="card" idx={40 + (saveCh?.grade || 0)} />
					{!actionChIdx && <NoneChText code="t1" color="red">{gameData.msg.sentence.noneSelectCh[lang]}</NoneChText>}
					<Img imgurl={imgSet.images.transparent800} />
					<ActionChDisplay type={'blacksmith'} chList={entries} gameData={gameData} actionChIdx={actionChIdx} imgSet={imgSet}/>
				</ActionPic>
				</UserContainer>
			</Wrap>
			<ModalContainer>
				{modalOn && <Modal submitFn={modalData.submitFn} payment={modalData.payment} imgSet={imgSet} type={modalType} dataObj={modalInfo} saveData={saveData} changeSaveData={changeSaveData} onClose={() => {
					setModalOn(false);
				}} gameData={gameData}/>}
			</ModalContainer>
			<PopupContainer>
        {popupOn && <Popup type={popupType} dataObj={popupInfo} saveData={saveData} changeSaveData={changeSaveData} showPopup={setPopupOn} msgText={setMsg} showMsg={setMsgOn} />}
      </PopupContainer>
      <MsgContainer>
        {msgOn && <Msg text={msg} showMsg={setMsgOn}></Msg>}
      </MsgContainer>
		</>
  );
}

export default Blacksmith;
