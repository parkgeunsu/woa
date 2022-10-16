import { AppContext } from 'App';
import { util } from 'components/Libs';
import Modal from 'components/Modal';
import ModalContainer from 'components/ModalContainer';
import React, { useEffect, useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import 'css/itemEnhancement.css';

const Img = styled.img.attrs(
  ({imgurl}) => ({
    src: imgurl 
  })
)``;
const ItemEnWrap = styled.div`
	background:url(${({backImg}) => backImg});background-size:cover;
`;
const ShopIcon = styled.span`
	background:url(${({ icoType }) => icoType}) no-repeat left center;background-size:100%;
`;
const ItemPic = styled.div`
  display:inline-block;width:100%;height:100%;background-image:url(${({itemPic}) => itemPic});background-size:100%;background-repeat:no-repeat;
`;
const itemEnList = [
	{na:{ko:"소켓합성", en:"Socket"},icon:"iconSocket"},
	{na:{ko:"등급진화", en:"Upgrade"},icon:"iconUpgrade"},
];

const ItemEnhancement = ({
	saveData,
	changeSaveData,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
	const setting = useContext(AppContext).setting,
		gameSpd = setting.speed,
		lang = setting.lang;
	const gameItem = gameData.items;
  const [modalOn, setModalOn] = useState(false);
	const [modalInfo, setModalInfo] = useState({});
  const [modalType, setModalType] = useState();
  const [popupOn, setPopupOn] = useState(false);
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");
	const [selectTab, setSelectTab] = useState(0);
	const [item, setItem] = useState(saveData.items);
	useEffect(() => {
		//equip, hole, upgrade, merterial, etc
		console.log(saveData.items);
		setItem(saveData.items);
	}, [saveData]);
  return (
		<>
			<ItemEnWrap className="itemEnhancement_wrap" backImg={imgSet.back[2]} >
				<div className="inven_menu transition">
					{itemEnList && itemEnList.map((data, idx) => {
						return (
								<li key={`itemEn_${idx}`} className={idx === selectTab ? "on" : ""} onClick={() => {
									setSelectTab(idx);
								}}>
									<button className="itemEn_menu_button">
										<span className="name">{`${lang === "ko" ? data.na.ko : data.na.en}`}</span>
										<ShopIcon className="icon" icoType={imgSet.icon[data.icon]} />
									</button>
								</li>
							);
					})}
				</div>
				<div className="itemEn_area">
					{selectTab === 0 ? (
						<>
							<div className="itemEn_top">
								<div className="itemEn_colorArea">

								</div>
							</div>
							<div className="itemEn_bottom scroll-y">
								<div className="item_select item_select1">

								</div>
								<div className="item_select item_select2 num4">
									{item.hole && item.hole.map((data, idx) => {
										const items = gameItem.hole[data.idx];
										const grade = data.grade || items.grade;
										return (
											<div className={`item_layout ${gameData.itemGrade.txt_e[grade].toLowerCase()}`} key={`hole_${idx}`} onClick={() => {

											}}>
												<ItemPic className="pic" itemPic={imgSet.itemHole[items.display]} />
											</div>
										)
									})}
								</div>
							</div>
						</>
					) : (
						<>
							<div className="itemEn_top">
							</div>
							<div className="itemEn_bottom scroll-y">
								<div className="item_select item_select1">

								</div>
								<div className="item_select item_select2 num4">
									{item.upgrade && item.upgrade.map((data, idx) => {
										const items = gameItem.upgrade[data.idx];
										const grade = data.grade || items.grade;
										return (
											<div className={`item_layout ${gameData.itemGrade.txt_e[grade].toLowerCase()}`} key={`upgrade_${idx}`} onClick={() => {

											}}>
												<ItemPic className="pic" itemPic={imgSet.itemUpgrade[items.display]} />
											</div>
										)
									})}
								</div>
							</div>
						</>
					)}
				</div>
			</ItemEnWrap>
			{/* <ModalContainer>
				{modalOn && <Modal fn={changeGachaMode} type={modalType} dataObj={modalInfo} saveData={saveData} changeSaveData={changeSaveData} onClose={() => {handleModal()}} gameData={gameData}/>}
			</ModalContainer> */}
		</>
  );
}

export default ItemEnhancement;
