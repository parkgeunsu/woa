import { AppContext } from 'App';
import { Prices } from 'components/Components';
import { FlexBox } from 'components/Container';
import ModalContainer from 'components/ModalContainer';
import React, { useContext } from 'react';
import styled from 'styled-components';

const ModalWrap = styled.div`
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 20;
	&:after {
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.7);
	}
`;
const ModalCont = styled(FlexBox)`
  position: absolute;
  left: 20px;
  right: 20px;
  top: 0;
  bottom: 0;
  z-index: 2;
	.modal_box {
		display: flex;
		margin: auto auto;
		flex-direction: column;
		align-items: center;
	}
	p {
		margin: 0 0 10px 0;
		text-align: center;
		font-size: 0.875rem;
		line-height: 1.5;
	}
	p em {
		font-style: normal;
		font-weight: 600;
		font-size: 1rem;
		color: #ff2a00;
	}
	p .des {
		color: #999;
		font-size: 0.75rem;
	}
	.price_group {
		display: flex;
		margin: 0 0 10px 0;
		padding: 5px;
	}
`;
const ModalClose = styled.div`
	position: absolute;
	right: 5px;
	top: 10px;
	z-index: 1;
	span {
		display: block;
		position: absolute;
		right: 10px;
		top: 20px;
		width: 30px;
		height: 5px;
		background: #fff;
		box-shadow: 0 0 10px #fff;
		&:first-of-type {
			transform-origin: 50% 50%;
			transform: rotate(135deg);
		}
		&:last-of-type {
			transform-origin: 50% 50%;
			transform: rotate(45deg);
		}
	}
`;
const buttonEvent = (dataInfo, btInfo, submitFn, saveData, gameData, changeSaveData, lang) => {
	switch(btInfo.action) {
		case 'gacha':
			submitFn('start', dataInfo, saveData, gameData, changeSaveData, lang);
			break;
		case 'popClose':
			break;
		case 'itemEn':
			submitFn(dataInfo, saveData, gameData, changeSaveData, lang);
			break;
		default:
			break;
	}
}
const typeAsContent = (type, dataObj, submitFn, saveData, gameData, changeSaveData, lang) => {
	if (type === 'confirm') {
		return (
			<div className="bt_box" flex="true">
				{dataObj?.bt && dataObj.bt.map((btData, idx) => {
					return <button className="button_small" key={idx} onClick={() => {
							buttonEvent(dataObj.info, dataObj.bt[idx], submitFn, saveData, gameData, changeSaveData, lang);
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
							buttonEvent(dataObj.info, dataObj.bt[idx], submitFn);
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
	submitFn,
}) => {
  const context = useContext(AppContext);
  const lang = React.useMemo(() => {
    return context.setting.lang;
  }, [context]);
	return (
		<ModalContainer>
			<ModalWrap className="transition">
				<ModalCont direction="column" onClick={() => {onClose()}}>
					<div className="modal_box">
						<p dangerouslySetInnerHTML={{__html: dataObj.msg}}></p>
						{payment && (
							<>
								<div className="price_group">
									<Prices payment={gameData.prices.enhancingStickers[payment]} imgSet={imgSet} saveData={saveData} gameData={gameData}/>
								</div>
							</>
						)}
						{typeAsContent(type, dataObj, submitFn, saveData, gameData, changeSaveData, lang)}
					</div>
				</ModalCont>
				<ModalClose>
					<span></span><span></span>
				</ModalClose>
			</ModalWrap>
		</ModalContainer>
	)
}

export default Modal;
