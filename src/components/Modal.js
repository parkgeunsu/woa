import React from 'react';
import ModalContainer from 'components/ModalContainer';
import styled from 'styled-components';

const buttonEvent = (dataInfo, btInfo, fn, saveData, gameData, changeSaveData) => {
	switch(btInfo.action) {
		case 'gacha':
			fn('start', dataInfo, saveData, gameData, changeSaveData);
			break;
		case 'popClose':
			break;
		case 'itemEn':
			fn(dataInfo, saveData, gameData, changeSaveData);
			break;
		default:
			break;
	}
}
const typeAsContent = (type, dataObj, fn, saveData, gameData, changeSaveData) => {
	if (type === 'confirm') {
		return (
			<div className="modal_box">
				<p dangerouslySetInnerHTML={{__html: dataObj.msg}}></p>
				<div className="bt_box" flex="true">
					{dataObj?.bt && dataObj.bt.map((btData, idx) => {
						return <button className="button_small" key={idx} onClick={() => {buttonEvent(dataObj.info, dataObj.bt[idx], fn, saveData, gameData, changeSaveData);}} msg="true">{btData.txt}</button>
					})}
				</div>
			</div>
		);
	} else if (type === 'prompt') {
		return (
			<div className="modal_box">
				<p dangerouslySetInnerHTML={{__html: dataObj.msg}}></p>
				<input type="text" placeholder={dataObj.hint} />
				<div className="bt_box" flex="true">
					{dataObj?.bt && dataObj.bt.map((btData, idx) => {
						return <button className="button_small" key={idx} onClick={() => {buttonEvent(dataObj.info, dataObj.bt[idx], fn);}} msg="true">{btData.txt}</button>
					})}
				</div>
			</div>
		);
	} else if (type === 'alert') {
		return (
			<div className="modal_box">
				<p dangerouslySetInnerHTML={{__html: dataObj.msg}}></p>
				<div className="bt_box" flex="true">
					{dataObj?.bt && dataObj.bt.map((btData, idx) => {
						return <button className="button_small" key={idx} msg="true">{btData.txt}</button>
					})}
				</div>
			</div>
		);
	} 
}
const Modal = ({ 
	onClose,
	type,
	dataObj,
	saveData,
	gameData,
	changeSaveData,
	fn
}) => {
	return (
		<ModalContainer>
			<div className="modal transition">
				<div className="modal_cont" onClick={() => {onClose()}}>
					{typeAsContent(type, dataObj, fn, saveData, gameData, changeSaveData)}
				</div>
				<div className="modal_close">
					<span></span><span></span>
				</div>
			</div>
		</ModalContainer>
	)
}

export default Modal;
