import React, { useState, useContext } from 'react';
import { AppContext } from 'App';
import styled from 'styled-components';
import { util } from 'components/Libs';

import ModalContainer from 'components/ModalContainer';
import Modal from 'components/Modal';

import imgBack from 'images/back/back5.jpg';
import iconDiamod from 'images/ico/ico_dia.png';
import iconGold from 'images/ico/ico_gold.png';

const GachaWrap = styled.div`
	display:flex;position:absolute;left:0;right:0;top:0;bottom:0;background:url(${({backImg}) => backImg});background-size:cover;
	flex-direction:column;padding:44px 0 0 0;width:100%;height:100%;box-sizing:border-box;overflow:hidden;
`;
const GachaMenu = styled.ul`
	padding:0 20px;flex-grow:0;overflow:hidden;
	height: ${({gachaMode}) => {
		return gachaMode === 'start' || 'card' ? 0 : '';
	}};
	li {margin:0 0 10px 0;}
	li:last-of-type{margin:0;}
`;
const GachaMenuButton = styled.button`
	display:block;padding:10px 0;width:100%;background:rgba(255,255,255,.5);color:#000;border-radius:20px;text-align:center;
	.price{margin:0 0 0 10px;padding:0 0 0 20px;}
	.menu{padding:0 20px;}
`;
const GachaIcon = styled.span`
	background:url(${({icoType}) => icoType}) no-repeat left center;background-size:20px;
`;

const GachaArea = styled.div`
	flex-grow:1;perspective:300px;perspective-origin:50% 100%;transform-style:flat;
`;
const GachaInfo = styled.div`
	display:none;
	position:absolute;left:0;right:0;top:0;bottom:0;z-index:3;
	&.on{diaplay:block;}
	&:after{content:'';position:absolute;left:0;right:0;top:0;bottom:0;background:rgba(0,0,0,.7);}
`;

const Gacha = ({
	saveData,
	changeSaveData,
}) => {
  const gameData = useContext(AppContext).gameData;
	const [gachaMode, setGachaMode] = useState('init');
	const changeGachaMode = (mode) => {
		setGachaMode(mode);
	}
  const [modalOn, setModalOn] = useState(false);
	const [modalInfo, setModalInfo] = useState({});
  const [modalType, setModalType] = useState();
	const gachaList = [
		{na: 'Premium 10', type: 'p10', num: 10, price: 1400},
		{na: 'Premium 1', type: 'p1', num: 1, price: 150},
		{na: 'Normal 10', type: 'n10', num: 10, price: 20000},
		{na: 'Normal 1', type: 'n1', num: 1, price: 2000},
	];
	const handleModal = (modalType, gachaIdx) => {
    if( modalType ){
			const price = gachaList[gachaIdx].price;
			if (gachaIdx < 2){ // 다이아 뽑기
				if (saveData.info.diamond >= price) { //돈이 충분할 경우
					setModalInfo({
						type: 'confirm',
						msg: `발바닥 ${price}을 사용하시겠습니까?`,
						bt: [{txt:'사용',action:'gacha_diamond'},{txt:'취소',fn:'popClose'}],
					});
				} else { //돈이 모자를 경우
					setModalInfo({
						type: 'confirm',
						msg: `발바닥이 충분하지 않습니다.`,
					});
				}
			} else { // 골드 뽑기
				if (saveData.info.money >= price) { //돈이 충분할 경우
					setModalInfo({
						type: 'confirm',
						msg: `골드 ${price}을 사용하시겠습니까?`,
						bt: [{txt:'사용',action:'gacha_gold'},{txt:'취소',fn:'popClose'}],
					});
				} else { //돈이 모자를 경우
					setModalInfo({
						type: 'confirm',
						msg: `발바닥이 충분하지 않습니다.`,
					});
				}
			}
			//,gachaData:{type:type,num:num,price:price}},'confirm');
    	//,gachaData:{type:type,num:num,price:price}},'confirm');
      setModalType(modalType);
    }
    setModalOn(!modalOn);
  }
  return (
		<>
			<GachaWrap className="gacha_wrap" backImg={imgBack} >
				<GachaMenu gachaMode={gachaMode} className="gacha_menu transition">
					{gachaList && gachaList.map((data, idx) => {
						return (
							<li key={idx} onClick={() => {handleModal('confirm', idx);}}>
								<GachaMenuButton>{`${data.na} Gacha`}
									<GachaIcon className={`price ${data.type.indexOf('p') < 0 ? 'gold' : 'dia'}`} icoType={data.type.indexOf('p') < 0 ? iconGold : iconDiamod}>{data.price}</GachaIcon>
								</GachaMenuButton>
							</li>
						);
					})}
				</GachaMenu>
				<GachaArea className="gacha_area">
					<div className="cards"></div>
					<div className="bg"></div>
					<div className="effect"></div>
					<div className="touch"></div>
				</GachaArea>
				<GachaInfo className={`gacha_info ${gachaMode === 'card' ? 'on' : ''}`}>
					<div className="ch_card">
						{/* <img src="./images/ring/ring_.png"/> */}
						<ul className="ch_detail"></ul>
					</div>
					<div className="ch_graph">
						<canvas></canvas>
					</div>
					<div className="ch_state scroll-y"></div>
				</GachaInfo>
			</GachaWrap>
			<ModalContainer>
				{modalOn && <Modal fn={changeGachaMode} type={modalType} dataObj={modalInfo} saveData={saveData} changeSaveData={changeSaveData} onClose={() => {handleModal()}} gameData={gameData}/>}
			</ModalContainer>
		</>
  );
}

export default Gacha;
