import React from 'react';
import ModalContainer from 'components/ModalContainer';
import styled from 'styled-components';
import { Prices } from 'components/Components';

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
			<div className="bt_box" flex="true">
				{dataObj?.bt && dataObj.bt.map((btData, idx) => {
					return <button className="button_small" key={idx} onClick={() => {
							buttonEvent(dataObj.info, dataObj.bt[idx], fn, saveData, gameData, changeSaveData);
						}} msg="true">{btData.txt}</button>
				})}
			</div>
		);
	} else if (type === 'prompt') {
		return (
			<>
				<input type="text" placeholder={dataObj.hint} />
				<div className="bt_box" flex="true">
					{dataObj?.bt && dataObj.bt.map((btData, idx) => {
						return <button className="button_small" key={idx} onClick={() => {
							buttonEvent(dataObj.info, dataObj.bt[idx], fn);
						}} msg="true">{btData.txt}</button>
					})}
				</div>
			</>
		);
	} else if (type === 'alert') {
		return (
			<div className="bt_box" flex="true">
				{dataObj?.bt && dataObj.bt.map((btData, idx) => {
					return <button className="button_small" key={idx} msg="true">{btData.txt}</button>
				})}
			</div>
		);
	} 
}
const Modal = ({ 
	onClose,
	type,
	payment,//비용 지불창인지 판단
	imgSet,
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
					<div className="modal_box">
						<p dangerouslySetInnerHTML={{__html: dataObj.msg}}></p>
						{payment && (
							<>
								<div className="price_group">
									<Prices payment={gameData.prices.itemEnhancement[payment]} imgSet={imgSet} saveData={saveData} gameData={gameData}/>
								</div>
							</>
						)}
						{typeAsContent(type, dataObj, fn, saveData, gameData, changeSaveData)}
					</div>
				</div>
				<div className="modal_close">
					<span></span><span></span>
				</div>
			</div>
		</ModalContainer>
	)
}

export default Modal;
