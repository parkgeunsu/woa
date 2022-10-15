import { AppContext } from 'App';
import { util } from 'components/Libs';
import Modal from 'components/Modal';
import ModalContainer from 'components/ModalContainer';
import React, { useCallback, useContext, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import 'css/itemEnhancement.css';

const Img = styled.img.attrs(
  ({imgurl}) => ({
    src: imgurl 
  })
)``;
const GachaWrap = styled.div`
	background:url(${({backImg}) => backImg});background-size:cover;
`;
const GachaMenu = styled.ul`
	height: ${({gachaMode}) => {
		return gachaMode === ('start' || 'card') ? 0 : 'auto';
	}};
`;
const GachaMenuButton = styled.button``;
const GachaIcon = styled.span`
	background:url(${({ icoType }) => icoType}) no-repeat left center;background-size:20px;
`;
const GachaCard = styled.div`
	left: ${({posX}) => posX}%;
	top: ${({posY}) => posY}%;
	padding-top: ${30*1.481}%;
	transform: translate(-50%,-50%) rotateX(45deg) rotateZ(${({rotate}) => rotate}deg);
`;
const CardLvName = styled.li`
	&:after{background-image:url(${({cardLv}) => cardLv});background-size:contain;}
`;
const CardDisplay = styled.li`
	background-image:url(${({chDisplay}) => chDisplay});
	background-size:100%;
`;
const CardElement = styled.li`
	background-image:url(${({ringDisplay}) => ringDisplay});
	background-size:100%;
`;
const CardStar = styled.li`
	height:${({type}) => {
		return (
			type === 'open' ? 'height:25px' : 'height:12px'
		);
	}};
	span{
		${({type}) => {
			return (
				type === 'open' ? 'width:25px;height:25px' : 'width:12px;height:12px'
			);
		}}
	}
	span:first-of-type{background:url(${({starIcon}) => starIcon[0]}) no-repeat center center;background-size:100%}
	span:nth-of-type(2){background:url(${({starIcon}) => starIcon[1]}) no-repeat center center;background-size:100%;}
	span:nth-of-type(3){background:url(${({starIcon}) => starIcon[2]}) no-repeat center center;background-size:100%;}
	span:nth-of-type(4){background:url(${({starIcon}) => starIcon[3]}) no-repeat center center;background-size:100%;}
	span:nth-of-type(5){background:url(${({starIcon}) => starIcon[4]}) no-repeat center center;background-size:100%;}
	span:nth-of-type(6){background:url(${({starIcon}) => starIcon[5]}) no-repeat center center;background-size:100%;}
	span:nth-of-type(7){background:url(${({starIcon}) => starIcon[6]}) no-repeat center center;background-size:100%;}
`;
const CardRing = styled.li`
	background-image:url(${({ringBack}) => ringBack});
	background-size:85%;
`;
const CardFrame = styled.li`
	background:url(${({cardFrame}) => cardFrame});
	background-size:100% 100%;
`;
const GachaFront = styled.div`
	box-shadow:${({gameData, idx}) => {
		const grade = gameData.ch[idx].grade;
		const gradeColor = gameData.chGradeColor[grade*1];
		if (grade === 1) {
			return;
		} else if (grade === 2) {
			return `0 0 5px ${gradeColor},0 0 2px ${gradeColor}`;
		} else if (grade === 3) {
			return `0 0 10px ${gradeColor},0 0 3px ${gradeColor},0 0 1px ${gradeColor}`;
		} else if (grade === 4) {
			return `0 0 15px ${gradeColor},0 0 4px ${gradeColor},0 0 1px ${gradeColor}`;
		} else if (grade === 5) {
			return `0 0 20px ${gradeColor},0 0 5px ${gradeColor},0 0 2px ${gradeColor}`;
		} else if (grade === 6) {
			return `0 0 40px ${gradeColor},0 0 10px ${gradeColor},0 0 3px ${gradeColor}, 0 0 50px #fff`;
		} else if (grade === 7) {
			return `0 0 40px ${gradeColor},0 0 10px ${gradeColor},0 0 3px ${gradeColor}, 0 0 50px #fff`;
		}
	}};
`;
const GachaBack = styled.div`
	background:url(${({cardBack}) => cardBack}) no-repeat center center;background-size:100%;
`;
const GachaInfo = styled.div`
	.ch_state{border-image:url(${({ borderImg }) => borderImg}) 5 round;}
`;

const ItemEnhancement = ({
	saveData,
	changeSaveData,
}) => {
  const imgSet = useContext(AppContext).images;
	const iconStar = [imgSet.iconStar[0], imgSet.iconStar[1], imgSet.iconStar[2], imgSet.iconStar[3], imgSet.iconStar[4], imgSet.iconStar[5], imgSet.iconStar[6]]
  const gameData = useContext(AppContext).gameData;
  const [modalOn, setModalOn] = useState(false);
	const [modalInfo, setModalInfo] = useState({});
  const [modalType, setModalType] = useState();
	const [gachaCard, setGachaCard] = useState([]);
	const handleModal = (modalType, gachaIdx) => {

  return (
		<>
			<GachaWrap className="gacha_wrap" backImg={imgSet.back[3]} >
				<GachaMenu className="gacha_menu transition">
				</GachaMenu>
				<div className="gacha_area">
					<div className="gacha_cards">
						{gachaCard && gachaCard.map((data, idx) => {
							const chData = gameData.ch[data.idx];
							const star = data.grade;
							return (
								<GachaCard onClick={() => {
									
								}} key={`gachaCard${idx}`} posX={data.posX} posY={data.posY} rotate={data.rotate} className="gacha_card ready" data-grade={chData.grade}>
									<GachaFront className="gacha_front" idx={data.idx} gameData={gameData}>
										<ul>
											<CardLvName className="gacha_name_lv" cardLv={imgSet.etc.imgCardLv}>
												<Img className="img" imgurl={imgSet.etc.iconCardName} />
								 				<span className="lv">1</span><span className="name">{chData.na1}</span>
								 			</CardLvName>
											<CardDisplay className="gacha_ch" chDisplay={imgSet.chImg[`ch${chData.display}`]} />
								 			<CardRing className="gacha_ring" ringBack={imgSet.etc.imgRingBack}></CardRing>
								 			<CardElement className="gacha_element" ringDisplay={imgSet.ringImg[chData.element]} />
								 			<CardStar className="gacha_star" starIcon={iconStar}>
											</CardStar>
								 			<CardFrame className="gacha_frame" cardFrame={imgSet.etc.imgCardFrame} />
										</ul>
									</GachaFront>
									<GachaBack className="gacha_back" cardBack={imgSet.etc.imgCardBack}/>
								</GachaCard>
							);
						})}
					</div>
				</div>
			</GachaWrap>
			{/* <ModalContainer>
				{modalOn && <Modal fn={changeGachaMode} type={modalType} dataObj={modalInfo} saveData={saveData} changeSaveData={changeSaveData} onClose={() => {handleModal()}} gameData={gameData}/>}
			</ModalContainer> */}
		</>
  );
}
}

export default ItemEnhancement;
