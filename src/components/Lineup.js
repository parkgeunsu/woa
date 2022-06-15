import { AppContext } from 'App';
import imgBack from 'images/back/back1.jpg';
import iconArrowDown from 'images/ico/arrow_down.png';
import iconArrowUp from 'images/ico/arrow_up.png';
import React, { useContext, useLayoutEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { util } from 'components/Libs';

import imgCardFrame from 'images/card/card_frame.png';
import imgCardLv from 'images/card/card_lv.png';
import imgRingBack from 'images/ring/back.png';

const LineupWrap = styled.div`
	display:flex;flex-direction:column;padding:44px 0 10px 0;width:100%;height:100%;box-sizing:border-box;overflow:hidden;position:absolute;left:0;right:0;top:0;bottom:0;background:url(${({backImg}) => backImg});background-size:cover;
	& > div{
		padding:0 20px;justify-content: center;
	}
	.lineup_pos > span{position:absolute;width:20%;height:20%;font-size:0;background:#eee;box-sizing:border-box;border:1px solid #fff;overflow:hidden;}
	.lineup_pos > span[e1]{background: #f60;border-color:#fff;}
	.lineup_pos > span[e2]{background:#000;border-color:#666;}
	.lineup_pos > span[e3]{background: #666;border-color:#999;}
	.lineup_pos > span[e4]{background: #bbb;border-color:#ddd;}
	.lineup_pos.on > span{background:#000;border-color:#444;}
	.lineup_pos.on > span[e1]{background: #06f;border-color:#000;}
	.lineup_pos.on > span[e2]{background:#fff;border-color:#eee;}
	.lineup_pos.on > span[e3]{background: #999;border-color:#666;}
	.lineup_pos.on > span[e4]{background: #666;border-color:#333;}
	.lineup_pos > span.l1{left:0%;top:0%;}
	.lineup_pos > span.l2{left:20%;top:0%;}
	.lineup_pos > span.l3{left:40%;top:0%;}
	.lineup_pos > span.l4{left:60%;top:0%;}
	.lineup_pos > span.l5{left:80%;top:0%;}
	.lineup_pos > span.l6{left:0%;top:20%;}
	.lineup_pos > span.l7{left:20%;top:20%;}
	.lineup_pos > span.l8{left:40%;top:20%;}
	.lineup_pos > span.l9{left:60%;top:20%;}
	.lineup_pos > span.l10{left:80%;top:20%;}
	.lineup_pos > span.l11{left:0%;top:40%;}
	.lineup_pos > span.l12{left:20%;top:40%;}
	.lineup_pos > span.l13{left:40%;top:40%;}
	.lineup_pos > span.l14{left:60%;top:40%;}
	.lineup_pos > span.l15{left:80%;top:40%;}
	.lineup_pos > span.l16{left:0%;top:60%;}
	.lineup_pos > span.l17{left:20%;top:60%;}
	.lineup_pos > span.l18{left:40%;top:60%;}
	.lineup_pos > span.l19{left:60%;top:60%;}
	.lineup_pos > span.l20{left:80%;top:60%;}
	.lineup_pos > span.l21{left:0%;top:80%;}
	.lineup_pos > span.l22{left:20%;top:80%;}
	.lineup_pos > span.l23{left:40%;top:80%;}
	.lineup_pos > span.l24{left:60%;top:80%;}
	.lineup_pos > span.l25{left:80%;top:80%;}
`;
const LineupCate = styled.li`
	position:relative;width:100%;height:100%;font-size:0;
`;
const LineupSave = styled.div`
	height:5%;overflow:hidden;
	dl{width:100%;height:100%;}
	dt{flex-grow:0;margin:auto 10px auto 0;color:#000;font-weight:600;}
	dd{display:flex;flex-grow:1;margin:auto auto;height:100%;}
	ul{display:flex;width:100%;height:100%;justify-content:space-between;}
	ul li{width:10%;height:100%;text-align:center;}
	.save_slot{padding:0;width:100%;height:100%;background:#000;color:#fff;box-sizing:border-box;}
	ul li.on .save_slot{border:1px solid #f00;background:#fff;color:#f00;}
	ul li.save .save_slot{outline:1px solid #00f;background:#00f;color:#fff;}
	.save_submit{margin:0 0 0 5px;width:45px;background:#00f;color:#fff;font-weight:600;font-size:12px;}
`;
const LineupMiddle = styled.div`
	display:flex;margin:10px 0;height:60%;overflow:hidden;
`;
const LineupList = styled.div`
	width:20%;overflow:hidden;flex-grow:0;flex:unset;
	ul{width:100%;}
	ul li{margin:0 0 5px 0;width:100%;padding-top:100%;background:#000;font-size:0;}
	ul li:last-of-type{margin:0;}
`;
const LineupArea = styled.div`
	display:flex;flex-direction:column;margin:0 0 0 10px;width:80%;overflow:hidden;flex-grow:1;
`;
const LineupMap = styled.div`
	position:relative;width:100%;padding-top:100%;font-size:0;
	/*기본*/
	&.lineup0 > span.l1{background: #bbb;border-color:#ddd;}
	&.lineup0 > span.l2{background: #bbb;border-color:#ddd;}
	&.lineup0 > span.l3{background:#bbb;border-color:#ddd;}
	&.lineup0 > span.l4{background: #bbb;border-color:#ddd;}
	&.lineup0 > span.l5{background: #bbb;border-color:#ddd;}
	&.lineup0 > span.l6{background: #bbb;border-color:#ddd;}
	&.lineup0 > span.l7{background: #bbb;border-color:#ddd;}
	&.lineup0 > span.l8{background:#bbb;border-color:#ddd;}
	&.lineup0 > span.l9{background: #bbb;border-color:#ddd;}
	&.lineup0 > span.l10{background: #bbb;border-color:#ddd;}
	&.lineup0 > span.l11{background: #000;border-color:#666;}
	&.lineup0 > span.l12{background: #000;border-color:#666;}
	&.lineup0 > span.l13{background: #f60;border-color:#fff;}
	&.lineup0 > span.l14{background: #000;border-color:#666;}
	&.lineup0 > span.l15{background: #000;border-color:#666;}
	&.lineup0 > span.l16{background: #bbb;border-color:#ddd;}
	&.lineup0 > span.l17{background: #bbb;border-color:#ddd;}
	&.lineup0 > span.l18{background:#bbb;border-color:#ddd;}
	&.lineup0 > span.l19{background: #bbb;border-color:#ddd;}
	&.lineup0 > span.l20{background: #bbb;border-color:#ddd;}
	&.lineup0 > span.l21{background: #bbb;border-color:#ddd;}
	&.lineup0 > span.l22{background: #bbb;border-color:#ddd;}
	&.lineup0 > span.l23{background:#bbb;border-color:#ddd;}
	&.lineup0 > span.l24{background: #bbb;border-color:#ddd;}
	&.lineup0 > span.l25{background: #bbb;border-color:#ddd;}
	/*학익진*/
	&.lineup1 > span.l3{background: #f60;border-color:#fff;}
	&.lineup1 > span.l7{background: #000;border-color:#666;}
	&.lineup1 > span.l8{background: #bbb;border-color:#ddd;}
	&.lineup1 > span.l9{background: #000;border-color:#666;}
	&.lineup1 > span.l11{background: #666;border-color:#999;}
	&.lineup1 > span.l15{background: #666;border-color:#999;}
	&.lineup1 > span.l16{background: #666;border-color:#999;}
	&.lineup1 > span.l20{background: #666;border-color:#999;}
	&.lineup1 > span.l21{background: #bbb;border-color:#ddd;}
	&.lineup1 > span.l25{background: #bbb;border-color:#ddd;}
	/*어린진*/
	&.lineup2 > span.l1{background: #bbb;border-color:#ddd;}
	&.lineup2 > span.l5{background: #bbb;border-color:#ddd;}
	&.lineup2 > span.l6{background: #666;border-color:#999;}
	&.lineup2 > span.l10{background: #666;border-color:#999;}
	&.lineup2 > span.l12{background: #666;border-color:#999;}
	&.lineup2 > span.l14{background: #666;border-color:#999;}
	&.lineup2 > span.l17{background:#000;border-color:#666;}
	&.lineup2 > span.l18{background:#000;border-color:#666;}
	&.lineup2 > span.l19{background:#000;border-color:#666;}
	&.lineup2 > span.l23{background: #f60;border-color:#fff;}
	/*언월진*/
	&.lineup3 > span.l2{background: #666;border-color:#999;}
	&.lineup3 > span.l3{background:#000;border-color:#666;}
	&.lineup3 > span.l4{background: #bbb;border-color:#ddd;}
	&.lineup3 > span.l6{background: #666;border-color:#999;}
	&.lineup3 > span.l9{background: #f60;border-color:#fff;}
	&.lineup3 > span.l10{background: #bbb;border-color:#ddd;}
	&.lineup3 > span.l14{background:#000;border-color:#666;}
	&.lineup3 > span.l19{background:#000;border-color:#666;}
	&.lineup3 > span.l22{background: #666;border-color:#999;}
	&.lineup3 > span.l23{background:#000;border-color:#666;}
	/*봉시진*/
	&.lineup4 > span.l3{background: #666;border-color:#999;}
	&.lineup4 > span.l6{background: #bbb;border-color:#ddd;}
	&.lineup4 > span.l8{background: #666;border-color:#999;}
	&.lineup4 > span.l10{background: #bbb;border-color:#ddd;}
	&.lineup4 > span.l11{background:#000;border-color:#666;}
	&.lineup4 > span.l13{background: #666;border-color:#999;}
	&.lineup4 > span.l15{background:#000;border-color:#666;}
	&.lineup4 > span.l17{background:#000;border-color:#666;}
	&.lineup4 > span.l19{background:#000;border-color:#666;}
	&.lineup4 > span.l23{background: #f60;border-color:#fff;}
	/*방원진*/
	&.lineup5 > span.l3{background: #bbb;border-color:#ddd;}
	&.lineup5 > span.l7{background: #666;border-color:#999;}
	&.lineup5 > span.l8{background:#000;border-color:#666;}
	&.lineup5 > span.l9{background: #666;border-color:#999;}
	&.lineup5 > span.l11{background: #bbb;border-color:#ddd;}
	&.lineup5 > span.l12{background:#000;border-color:#666;}
	&.lineup5 > span.l13{background: #f60;border-color:#fff;}
	&.lineup5 > span.l14{background:#000;border-color:#666;}
	&.lineup5 > span.l15{background: #bbb;border-color:#ddd;}
	&.lineup5 > span.l17{background: #666;border-color:#999;}
	&.lineup5 > span.l18{background:#000;border-color:#666;}
	&.lineup5 > span.l19{background: #666;border-color:#999;}
	&.lineup5 > span.l23{background: #bbb;border-color:#ddd;}
	/*안행진*/
	&.lineup6 > span.l3{background:#000;border-color:#666;}
	&.lineup6 > span.l8{background: #f60;border-color:#fff;}
	&.lineup6 > span.l12{background:#000;border-color:#666;}
	&.lineup6 > span.l14{background:#000;border-color:#666;}
	&.lineup6 > span.l16{background: #bbb;border-color:#ddd;}
	&.lineup6 > span.l17{background: #666;border-color:#999;}
	&.lineup6 > span.l19{background: #666;border-color:#999;}
	&.lineup6 > span.l20{background: #bbb;border-color:#ddd;}
	&.lineup6 > span.l21{background: #666;border-color:#999;}
	&.lineup6 > span.l25{background: #666;border-color:#999;}
	/*장사진*/
	&.lineup7 > span.l4{background: #666;border-color:#999;}
	&.lineup7 > span.l5{background: #bbb;border-color:#ddd;}
	&.lineup7 > span.l8{background: #bbb;border-color:#ddd;}
	&.lineup7 > span.l9{background:#000;border-color:#666;}
	&.lineup7 > span.l13{background: #f60;border-color:#fff;}
	&.lineup7 > span.l14{background: #bbb;border-color:#ddd;}
	&.lineup7 > span.l17{background:#000;border-color:#666;}
	&.lineup7 > span.l18{background: #bbb;border-color:#ddd;}
	&.lineup7 > span.l21{background: #bbb;border-color:#ddd;}
	&.lineup7 > span.l22{background: #666;border-color:#999;}
	/*형액진*/
	&.lineup8 > span.l3{background: #666;border-color:#999;}
	&.lineup8 > span.l6{background: #bbb;border-color:#ddd;}
	&.lineup8 > span.l7{background: #666;border-color:#999;}
	&.lineup8 > span.l9{background: #666;border-color:#999;}
	&.lineup8 > span.l10{background: #bbb;border-color:#ddd;}
	&.lineup8 > span.l13{background: #f60;border-color:#fff;}
	&.lineup8 > span.l17{background:#000;border-color:#666;}
	&.lineup8 > span.l19{background:#000;border-color:#666;}
	&.lineup8 > span.l22{background:#000;border-color:#666;}
	&.lineup8 > span.l24{background:#000;border-color:#666;}
	/*추행진*/
	&.lineup9 > span.l8{background: #bbb;border-color:#ddd;}
	&.lineup9 > span.l11{background: #666;border-color:#999;}
	&.lineup9 > span.l12{background: #666;border-color:#999;}
	&.lineup9 > span.l13{background: #666;border-color:#999;}
	&.lineup9 > span.l14{background: #666;border-color:#999;}
	&.lineup9 > span.l15{background: #666;border-color:#999;}
	&.lineup9 > span.l17{background:#000;border-color:#666;}
	&.lineup9 > span.l18{background: #f60;border-color:#fff;}
	&.lineup9 > span.l19{background:#000;border-color:#666;}
	&.lineup9 > span.l23{background:#000;border-color:#666;}
	&.lineup_pos > .mapCh .mapCh_{display:block;width:100%;height:100%;background:transparent;box-sizing:border-box;border:1px solid transparent;box-sizing:border-box;overflow:hidden;}
	&.lineup_pos > .mapCh .mapCh_ li{
		position:absolute;
    color:#fff;
	}
	&.lineup_pos > .mapCh.has{border:none;}
	&.lineup_pos > .mapCh.on{border:none;}
	&.lineup_pos > .mapCh.on .mapCh_{animation:lineup_mapCh .7s alternate infinite;z-index:1;}
	@keyframes lineup_mapCh{
		0%{border-width:2px;border-color:#f00;background:#fff;}
		100%{border-width:2px;border-color:#fff;background:#333;border-radius:50%;}
	}
	.mapCh span{position:absolute;font-size:10px;}
	.mapCh .mapEff{z-index:2;left:0;right:0;top:0;bottom:0;}
`;
const LineupChInfo = styled.div`
	padding:10px;width:100%;background:#ddd;box-sizing:border-box;flex-grow:1;
	ul{display:flex;flex-flow:wrap;}
	ul li{position:relative;margin:0 0 2px 0;width:100%;color:#000;box-sizing:border-box;}
	ul li:nth-of-type(2){width:50%;}
	ul li:nth-of-type(3){width:50%;}
	ul li .na{margin:0 5px 0 0;font-size:12px;}
	ul li .txt{font-size:12px;font-weight:600;}
	ul li .add_txt{position:relative;margin:0 0 0 5px;padding:0 0 0 12px;font-size:12px;font-weight:600;}
	ul li.none .add_txt{display:none;}
	ul li.up .add_txt{color:var(--color-point4);}
	ul li.up .add_txt:before{content:'';position:absolute;left:0;top:0;width:12px;height:100%;background:url(${({arrowUpImg}) => arrowUpImg}) no-repeat center center;background-size:10px;}
	ul li.down .add_txt{color:var(--color-point2);}
	ul li.down .add_txt:before{content:'';position:absolute;left:0;top:0;width:12px;height:100%;background:url(${({arrowDownImg}) => arrowDownImg}) no-repeat center center;background-size:10px;}
`;
const LineupCh = styled.div`
	height:40%;overflow:hidden;
	ul{display:flex;flex-flow:wrap;width:100%;}
	ul li{position:relative;margin:0 6.5px 6.5px 0;width:calc(25% - 5px);padding-top:calc(25% - 5px);font-size:0;overflow:hidden;border-radius:10px;}
	ul li:nth-of-type(4n){margin:0 0 6.5px 0;}
	ul li > span{position:absolute;font-size:10px;}
	ul li.selected{opacity:.3;}
`;
const ListNameLv = styled.span`
  left:50%;bottom:5%;width:14px;height:14px;transform:translate(-50%,0) scale(1);text-align:center;z-index:6;font-size:10px;line-height:1;font-weight:600;border-radius:50%;background-color:${({backColor}) => backColor};
`;
const ListCh = styled.span`
  top:0;width:100%;height:100%;background-repeat:no-repeat;background-size:85%;background-image:url(${({chDisplay}) => chDisplay});background-position:center 10%;z-index:4;pointer-events:none;
`;
const ListChStyle = styled.span`
  top:0;width:100%;height:100%;background-repeat:no-repeat;background-size:100%;background-position:center 25%;z-index:5;pointer-events:none;
  background-image:url(${({styleDisplay}) => styleDisplay});
`;
const ListChRing = styled.span`
  top:0;width:100%;height:100%;background:url(${({ringBack}) => ringBack});background-repeat:no-repeat;background-position:center 10%;background-size:85%;pointer-events:none;z-index:3;
`;
const ListChElement = styled.span`
  top:0;width:100%;height:100%;background-repeat:no-repeat;background-position:center 10%;background-size:100%;z-index:1;pointer-events:none;
  background-image:url(${({ringDisplay}) => ringDisplay});
`;
const ListChElement1 = styled.span`
  top:0;width:100%;height:100%;background-repeat:no-repeat;background-position:center 10%;background-size:cover;z-index:2;pointer-events:none;
  background-image:url(${({chLv, ringDisplay}) => {
    if ( chLv > 29) {
      return ringDisplay;
    }
  }});
`;
const ListChElement2 = styled.span`
  top:0;width:100%;padding-top:100%;background-repeat:no-repeat;background-position:center 35%;background-size:100%;z-index:2;pointer-events:none;transform:scale(1.35,1.35);animation:rotate_ring 50s linear infinite;
  background-image:url(${({chLv, ringDisplay}) => {
    if ( chLv > 49) {
      return ringDisplay;
    }
  }});
  @keyframes rotate_ring{
    0%{transform:scale(1.35,1.35) rotate(0deg);}
    100%{transform:scale(1.35,1.35) rotate(360deg);}
  }
`;
const ListChFrame = styled.span`
  top:0;width:100%;height:100%;background:url(${({cardFrame}) => cardFrame});background-repeat:no-repeat;background-position:center center;background-size:100% 100%;z-index:5;pointer-events:none;
`;
const LineupInfo = styled.div`
	display:flex;padding:5px;background:#ddd;justify-content:space-between;
	.lineup_na{color:#000;font-weight:600;}
	.lineup_cost{color:#000;}
	.lineup_cost.error{color:#f00;}
	.lineup_cost span{font-size:12px;font-weight:600;}
	.lineup_cost .bar{color:#000;font-size:12px;}
	.lineup_cost .bar:before{content:' / ';}
`;
const CharacterList = ({
	imgSet,
	gameData,
	saveCh,
	chData,
}) => {
	return (
		<>
			<ListNameLv cardLv={imgCardLv} backColor={gameData.chGradeColor[chData.grade]}>{saveCh.lv}</ListNameLv>
			<ListCh chDisplay={imgSet.chImg[`ch${chData.display}`]} className="ch transition" />
			<ListChStyle styleDisplay={imgSet.chStyleImg[`ch_style${chData.style}`]} className="ch_style transition" />
			<ListChRing ringBack={imgRingBack} className="ring" />
			<ListChElement ringDisplay={imgSet.ringImg[chData.element]} className="element" />
			<ListChElement1 chLv={saveCh.lv} ringDisplay={imgSet.sringImg[chData.element]} className="element_1" />
			<ListChElement2 chLv={saveCh.lv} ringDisplay={imgSet.ssringImg[chData.element]} className="element_2" />
			<ListChFrame cardFrame={imgCardFrame} className="frame" />
		</>
	)
}
const checkUseList = (useList, chIdx) => {
	let used = false;
	useList.forEach((dataIdx, idx) => {
		if (dataIdx === chIdx) {
			used = true;
			return;
		}
	});
	return used;
}

const Lineup = ({
  saveData,
  changeSaveData,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
	const [saveSlot, setSaveSlot] = useState(saveData.lineup.select); // 저장된 슬롯
	const [selectSave, setSelectSave] = useState(saveData.lineup.select); // 선택된 진형슬롯
	const [selectLineup, setSelectLineup] = useState(saveData.lineup.save_slot[selectSave].no); // 저장된 슬롯에 선택된 진형
	const [selectLineupList, setSelectLineupList] = useState(0); //선택된 라인업 리스트 순번
	const [useList, setUseList] = useState(saveData.lineup.save_slot[selectSave].entry); // 라인업 맵 캐릭
	const [noneUseList, setNoneUseList] = useState(saveData.ch);
	
	const mapRef = useRef([]);
	const lineupInfo = ["HP","SP","RSP","ATK","DEF","MAK","MDF","RCV","SPD"];
	const lineupSlot = [1,2,3,4,5,6,7,8];
	const clickSelectSlot = (idx) => {//세이브 슬롯 선택
		//console.log('saveslot' + idx);
		setSelectSave(idx);
		setSelectLineup(saveData.lineup.save_slot[idx].no);
		setUseList(saveData.lineup.save_slot[idx].entry);
		util.setLineupSt({
			saveSlot: selectSave,
			lineupType: selectLineup,
			useList: useList,
		}, gameData, saveData, changeSaveData);
	}
	const clickSaveSlot = () => {
		let save = saveData;
		save.lineup.select = selectSave;
		setSaveSlot(selectSave);
		changeSaveData(save);
	}
	const clickLineupSlot = (idx) => {//진형 타입 선택
		//console.log('lineupslot' + idx);
		setSelectLineup(idx);
		setUseList(saveData.lineup.save_slot[selectSave].entry);
		util.setLineupSt({
			saveSlot: selectSave, 
			lineupType: idx,
			useList: useList,
		}, gameData, saveData, changeSaveData);
	}
	const clickListupMap = (idx) => {//맵 캐릭터 클릭
		//console.log('mapidx', idx);
		setSelectLineupList(idx);
		let saveUseList = useList;
		if (mapRef.current[idx].classList.contains('on')) {
			saveUseList[idx] = '';
		}
		setUseList(saveUseList);
		util.setLineupSt({
			saveSlot: selectSave, 
			lineupType: selectLineup,
			useList: useList,
		}, gameData, saveData, changeSaveData);
	}
	const clickLineupCh = (chIdx, idx) => {//캐릭 리스트 클릭
		console.log('선택된 map순번', selectLineupList);//선택되어 있는 map칸
		let saveUseList = [...useList];
		saveUseList[selectLineupList] = idx;
		setUseList(saveUseList);
		util.setLineupSt({
			saveSlot: selectSave, 
			lineupType: selectLineup,
			useList: saveUseList,
		}, gameData, saveData, changeSaveData);
	}
	useLayoutEffect(() => {
		setUseList(saveData.lineup.save_slot[selectSave].entry);
		util.setLineupSt({
			saveSlot: selectSave, 
			lineupType: selectLineup,
			useList: useList,
		}, gameData, saveData, changeSaveData);
	}, []);
  return (
    <>
      <LineupWrap className="lineup_wrap" backImg={imgBack}>
				<LineupSave className="lineup_save">
					<dl flex-center="true">
						<dt>저장슬롯</dt>
						<dd>
							<ul>
								{lineupSlot && lineupSlot.map((txt, idx) => {
									return (
										<li className={`${idx === selectSave ? 'on' : ''} ${idx === saveSlot ? 'save' : ''}`} key={idx}><button onClick={() => {clickSelectSlot(idx);}} className="save_slot">{txt}</button></li>
									);
								})}
							</ul>
							<button className="save_submit" onClick={() => {
								clickSaveSlot();
							}}>선택</button>
						</dd>
					</dl>
				</LineupSave>
				<LineupMiddle className="lineup_middle">
					<LineupList className="lineup_list scroll-y">
						<ul>
							<LineupCate className={`lineup_cate lineup_pos ${0 === selectLineup ? 'on' : ''}`} onClick={() => {clickLineupSlot(0);}}>
              {/* <!--기본--> */}
								<span e4="true" className="l1"></span><span e4="true" className="l2"></span><span e4="true" className="l3"></span><span e4="true" className="l4"></span><span e4="true" className="l5"></span>
								<span e4="true" className="l6"></span><span e4="true" className="l7"></span><span e4="true" className="l8"></span><span e4="true" className="l9"></span><span e4="true" className="l10"></span>
								<span e2="true" className="l11"></span><span e2="true" className="l12"></span><span e1="true" className="l13"></span><span e2="true" className="l14"></span><span e2="true" className="l15"></span>
								<span e4="true" className="l16"></span><span e4="true" className="l17"></span><span e4="true" className="l18"></span><span e4="true" className="l19"></span><span e4="true" className="l20"></span>
								<span e4="true" className="l21"></span><span e4="true" className="l22"></span><span e4="true" className="l23"></span><span e4="true" className="l24"></span><span e4="true" className="l25"></span>
							</LineupCate>
							<LineupCate className={`lineup_cate lineup_pos ${1 === selectLineup ? 'on' : ''}`} onClick={() => {clickLineupSlot(1);}}>
              {/* <!--학익진--> */}
								<span className="l1"></span><span className="l2"></span><span e1="true" className="l3"></span><span className="l4"></span><span className="l5"></span>
								<span className="l6"></span><span e2="true" className="l7"></span><span e4="true" className="l8"></span><span e2="true" className="l9"></span><span className="l10"></span>
								<span e3="true" className="l11"></span><span className="l12"></span><span className="l13"></span><span className="l14"></span><span e3="true" className="l15"></span>
								<span e3="true" className="l16"></span><span className="l17"></span><span className="l18"></span><span className="l19"></span><span e3="true" className="l20"></span>
								<span e4="true" className="l21"></span><span className="l22"></span><span className="l23"></span><span className="l24"></span><span e4="true" className="l25"></span>
							</LineupCate>
							<LineupCate className={`lineup_cate lineup_pos ${2 === selectLineup ? 'on' : ''}`} onClick={() => {clickLineupSlot(2);}}>
              {/* <!--어린진--> */}
								<span e4="true" className="l1"></span><span className="l2"></span><span className="l3"></span><span className="l4"></span><span e4="true" className="l5"></span>
								<span e3="true" className="l6"></span><span className="l7"></span><span className="l8"></span><span className="l9"></span><span e3="true" className="l10"></span>
								<span className="l11"></span><span e3="true" className="l12"></span><span className="l13"></span><span e3="true" className="l14"></span><span className="l15"></span>
								<span className="l16"></span><span e2="true" className="l17"></span><span e2="true" className="l18"></span><span e2="true" className="l19"></span><span className="l20"></span>
								<span className="l21"></span><span className="l22"></span><span e1="true" className="l23"></span><span className="l24"></span><span className="l25"></span>
							</LineupCate>
							<LineupCate className={`lineup_cate lineup_pos ${3 === selectLineup ? 'on' : ''}`} onClick={() => {clickLineupSlot(3);}}>
              {/* <!--언월진--> */}
								<span className="l1"></span><span e3="true" className="l2"></span><span e2="true" className="l3"></span><span e4="true" className="l4"></span><span className="l5"></span>
								<span e3="true" className="l6"></span><span className="l7"></span><span className="l8"></span><span e1="true" className="l9"></span><span e4="true" className="l10"></span>
								<span className="l11"></span><span className="l12"></span><span className="l13"></span><span e2="true" className="l14"></span><span className="l15"></span>
								<span className="l16"></span><span className="l17"></span><span className="l18"></span><span e2="true" className="l19"></span><span className="l20"></span>
								<span className="l21"></span><span e3="true" className="l22"></span><span e2="true" className="l23"></span><span className="l24"></span><span className="l25"></span>
							</LineupCate>
							<LineupCate className={`lineup_cate lineup_pos ${4 === selectLineup ? 'on' : ''}`} onClick={() => {clickLineupSlot(4);}}>
              {/* <!--봉시진--> */}
								<span className="l1"></span><span className="l2"></span><span e3="true" className="l3"></span><span className="l4"></span><span className="l5"></span>
								<span e4="true" className="l6"></span><span className="l7"></span><span e3="true" className="l8"></span><span className="l9"></span><span e4="true" className="l10"></span>
								<span e2="true" className="l11"></span><span className="l12"></span><span e3="true" className="l13"></span><span className="l14"></span><span e2="true" className="l15"></span>
								<span className="l16"></span><span e2="true" className="l17"></span><span className="l18"></span><span e2="true" className="l19"></span><span className="l20"></span>
								<span className="l21"></span><span className="l22"></span><span e1="true" className="l23"></span><span className="l24"></span><span className="l25"></span>
							</LineupCate>
							<LineupCate className={`lineup_cate lineup_pos ${5 === selectLineup ? 'on' : ''}`} onClick={() => {clickLineupSlot(5);}}>
              {/* <!--방원진--> */}
								<span className="l1"></span><span className="l2"></span><span e4="true" className="l3"></span><span className="l4"></span><span className="l5"></span>
								<span className="l6"></span><span e3="true" className="l7"></span><span e2="true" className="l8"></span><span e3="true" className="l9"></span><span className="l10"></span>
								<span e4="true" className="l11"></span><span e2="true" className="l12"></span><span e1="true" className="l13"></span><span e2="true" className="l14"></span><span e4="true" className="l15"></span>
								<span className="l16"></span><span e3="true" className="l17"></span><span e2="true" className="l18"></span><span e3="true" className="l19"></span><span className="l20"></span>
								<span className="l21"></span><span className="l22"></span><span e4="true" className="l23"></span><span className="l24"></span><span className="l25"></span>
							</LineupCate>
							<LineupCate className={`lineup_cate lineup_pos ${6 === selectLineup ? 'on' : ''}`} onClick={() => {clickLineupSlot(6);}}>
              {/* <!--안행진--> */}
								<span className="l1"></span><span className="l2"></span><span e2="true" className="l3"></span><span className="l4"></span><span className="l5"></span>
								<span className="l6"></span><span className="l7"></span><span e1="true" className="l8"></span><span className="l9"></span><span className="l10"></span>
								<span className="l11"></span><span e2="true" className="l12"></span><span className="l13"></span><span e2="true" className="l14"></span><span className="l15"></span>
								<span e4="true" className="l16"></span><span e3="true" className="l17"></span><span className="l18"></span><span e3="true" className="l19"></span><span e4="true" className="l20"></span>
								<span e3="true" className="l21"></span><span className="l22"></span><span className="l23"></span><span className="l24"></span><span e3="true" className="l25"></span>
							</LineupCate>
							<LineupCate className={`lineup_cate lineup_pos ${7 === selectLineup ? 'on' : ''}`} onClick={() => {clickLineupSlot(7);}}>
              {/* <!--장사진--> */}
								<span className="l1"></span><span className="l2"></span><span className="l3"></span><span e3="true" className="l4"></span><span e4="true" className="l5"></span>
								<span className="l6"></span><span className="l7"></span><span e4="true" className="l8"></span><span e2="true" className="l9"></span><span className="l10"></span>
								<span className="l11"></span><span className="l12"></span><span e1="true" className="l13"></span><span e4="true" className="l14"></span><span className="l15"></span>
								<span className="l16"></span><span e2="true" className="l17"></span><span e4="true" className="l18"></span><span className="l19"></span><span className="l20"></span>
								<span e4="true" className="l21"></span><span e3="true" className="l22"></span><span className="l23"></span><span className="l24"></span><span className="l25"></span>
							</LineupCate>
							<LineupCate className={`lineup_cate lineup_pos ${8 === selectLineup ? 'on' : ''}`} onClick={() => {clickLineupSlot(8);}}>
              {/* <!--형액진--> */}
								<span className="l1"></span><span className="l2"></span><span e3="true" className="l3"></span><span className="l4"></span><span className="l5"></span>
								<span e4="true" className="l6"></span><span e3="true" className="l7"></span><span className="l8"></span><span e3="true" className="l9"></span><span e4="true" className="l10"></span>
								<span className="l11"></span><span className="l12"></span><span e1="true" className="l13"></span><span className="l14"></span><span className="l15"></span>
								<span className="l16"></span><span e2="true" className="l17"></span><span className="l18"></span><span e2="true" className="l19"></span><span className="l20"></span>
								<span className="l21"></span><span e2="true" className="l22"></span><span className="l23"></span><span e2="true" className="l24"></span><span className="l25"></span>
							</LineupCate>
							<LineupCate className={`lineup_cate lineup_pos ${9 === selectLineup ? 'on' : ''}`} onClick={() => {clickLineupSlot(9);}}>
              {/* <!--추행진--> */}
								<span className="l1"></span><span className="l2"></span><span className="l3"></span><span className="l4"></span><span className="l5"></span>
								<span className="l6"></span><span className="l7"></span><span e4="true" className="l8"></span><span className="l9"></span><span className="l10"></span>
								<span e3="true" className="l11"></span><span e3="true" className="l12"></span><span e3="true" className="l13"></span><span e3="true" className="l14"></span><span e3="true" className="l15"></span>
								<span className="l16"></span><span e2="true" className="l17"></span><span e1="true" className="l18"></span><span e2="true" className="l19"></span><span className="l20"></span>
								<span className="l21"></span><span className="l22"></span><span e2="true" className="l23"></span><span className="l24"></span><span className="l25"></span>
							</LineupCate>
						</ul>
					</LineupList>
					<LineupArea className="lineup_area">
						<LineupInfo className="lineup_info">
							<div className="lineup_na">{gameData.lineup[selectLineup].na}</div>
							<div className="lineup_cost">
								<span className="cost_current">0</span>
								<span className="bar"></span>
								<span className="cost_total">0</span>
							</div>
						</LineupInfo>
						<LineupMap className={`lineup_map lineup_pos lineup${selectLineup}`}>
							{useList && useList.map((slotIdx, idx) => {
								if (slotIdx === "") {
									return (
										<span ref={(element) => {mapRef.current[idx] = element}} key={idx} className={`mapCh l${idx + 1} ${selectLineupList === idx ? 'on' : ''}`} data-mapnum={idx} onClick={() => {
											clickListupMap(idx);
										}}>
											<span className="mapEff"></span>
											<span className="mapCh_"></span>
										</span>
									);
								} else {
									const saveCh = saveData.ch[slotIdx];
									const chData = gameData.ch[saveCh.idx];
									return (
										<span ref={(element) => {mapRef.current[idx] = element}} key={idx} className={`mapCh has l${idx + 1} ${selectLineupList === idx ? 'on' : ''}`} data-mapnum={idx} onClick={() => {
											clickListupMap(idx);
										}}>
											<span className="mapEff"></span>
											<span className="mapCh_">
												<CharacterList imgSet={imgSet} gameData={gameData} saveCh={saveCh} chData={chData}/>
											</span>
										</span>
									);
								}
							})}
						</LineupMap>
						<LineupChInfo className="lineup_chInfo scroll-y" arrowUpImg={iconArrowUp} arrowDownImg={iconArrowDown}>
							<ul>
								{lineupInfo && saveData.ch[useList[selectLineupList]] && lineupInfo.map((stateName, idx) => {
									const saveCh = saveData.ch[useList[selectLineupList]];
									const lineupEff = saveData.lineup.save_slot[selectSave].eff[selectLineupList];
									return (
										<li key={idx} className={lineupEff[idx][0] > 0 ? 'up' : ( lineupEff[idx][0] < 0 ?'down' : 'none')}>
											<span className="na">{stateName}</span>
											<span className="txt">{saveCh[`bSt${idx}`] + saveCh[`iSt${idx}`] + Math.round(lineupEff[idx][1])}</span>
											<span className="add_txt">{`${lineupEff[idx][0]}% (${Math.round(lineupEff[idx][1])})`}</span>
										</li>
									);
								})}
							</ul>
						</LineupChInfo>
					</LineupArea>
				</LineupMiddle>
				<LineupCh className="lineup_ch scroll-y">
					<ul>
						{noneUseList && noneUseList.map((saveCh, idx) => {
							const chData = gameData.ch[saveCh.idx];
							const used = checkUseList(useList, idx);
							return (
								<li className={used ? 'selected': ''} onClick={() => {
									if (!used) {
										clickLineupCh(saveCh.idx, idx);
									}
								}} key={idx} data-idx={idx}>
									<CharacterList imgSet={imgSet} gameData={gameData} saveCh={saveCh} chData={chData}/>
								</li>
							);
						})}
					</ul>
				</LineupCh>
			</LineupWrap>
    </>
  );
}

export default Lineup;
