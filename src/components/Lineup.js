import { AppContext } from 'App';
import iconArrowDown from 'images/ico/arrow_down.png';
import iconArrowUp from 'images/ico/arrow_up.png';
import React, { useContext, useLayoutEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { util } from 'components/Libs';
import 'css/lineup.css';

const LineupWrap = styled.div`
	background:url(${({backImg}) => backImg});background-size:cover;
`;
const LineupChInfo = styled.div`
	ul li.up .add_txt:before{background:url(${({arrowUpImg}) => arrowUpImg}) no-repeat center center;background-size:10px;}
	ul li.down .add_txt:before{background:url(${({arrowDownImg}) => arrowDownImg}) no-repeat center center;background-size:10px;}
`;
const ListNameLv = styled.span`
  left:50%;bottom:5%;width:14px;height:14px;transform:translate(-50%,0) scale(1);text-align:center;z-index:6;font-size:10px;line-height:1;font-weight:600;border-radius:50%;background-color:${({backColor}) => backColor};
`;
const ListCh = styled.span`
  top:0;width:100%;height:100%;background-repeat:no-repeat;background-size:100%;background-image:url(${({chDisplay}) => chDisplay});background-position:center 10%;z-index:4;pointer-events:none;
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
`;
const ListChFrame = styled.span`
  top:0;width:100%;height:100%;background:url(${({cardFrame}) => cardFrame});background-repeat:no-repeat;background-position:center center;background-size:100% 100%;z-index:5;pointer-events:none;
`;
const CharacterList = ({
	imgSet,
	gameData,
	saveCh,
	chData,
}) => {
	return (
		<>
			<ListNameLv cardLv={imgSet.etc.imgCardLv} backColor={gameData.chGradeColor[saveCh.grade]}>{saveCh.lv}</ListNameLv>
			<ListCh chDisplay={imgSet.chImg[`ch${chData.display}`]} className="ch transition" />
			<ListChRing ringBack={imgSet.etc.imgRingBack} className="ring" />
			<ListChElement ringDisplay={imgSet.ringImg[chData.element]} className="element" />
			<ListChElement1 chLv={saveCh.lv} ringDisplay={imgSet.sringImg[chData.element]} className="element_1" />
			<ListChElement2 chLv={saveCh.lv} ringDisplay={imgSet.ssringImg[chData.element]} className="element_2" />
			<ListChFrame cardFrame={imgSet.etc.imgCardFrame} className="frame" />
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
	const lineupInfo = ["HP","SP","RSP","ATK","DEF","MAK","MDF","RCV","SPD","LUK"];
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
      <LineupWrap className="lineup_wrap" backImg={imgSet.back[1]}>
				<div className="lineup_save">
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
				</div>
				<div className="lineup_middle">
					<div className="lineup_list scroll-y">
						<ul>
							<li className={`lineup_cate lineup_pos ${0 === selectLineup ? 'on' : ''}`} onClick={() => {clickLineupSlot(0);}}>
              {/* <!--기본--> */}
								<span e4="true" className="l1"></span><span e4="true" className="l2"></span><span e4="true" className="l3"></span><span e4="true" className="l4"></span><span e4="true" className="l5"></span>
								<span e4="true" className="l6"></span><span e4="true" className="l7"></span><span e4="true" className="l8"></span><span e4="true" className="l9"></span><span e4="true" className="l10"></span>
								<span e2="true" className="l11"></span><span e2="true" className="l12"></span><span e1="true" className="l13"></span><span e2="true" className="l14"></span><span e2="true" className="l15"></span>
								<span e4="true" className="l16"></span><span e4="true" className="l17"></span><span e4="true" className="l18"></span><span e4="true" className="l19"></span><span e4="true" className="l20"></span>
								<span e4="true" className="l21"></span><span e4="true" className="l22"></span><span e4="true" className="l23"></span><span e4="true" className="l24"></span><span e4="true" className="l25"></span>
							</li>
							<li className={`lineup_cate lineup_pos ${1 === selectLineup ? 'on' : ''}`} onClick={() => {clickLineupSlot(1);}}>
              {/* <!--학익진--> */}
								<span className="l1" e4="true"></span><span className="l2"></span><span className="l3"></span><span className="l4"></span><span className="l5" e4="true"></span>
								<span className="l6" e3="true"></span><span className="l7"></span><span className="l8"></span><span className="l9"></span><span className="l10" e3="true"></span>
								<span className="l11" e3="true"></span><span className="l12"></span><span className="l13"></span><span className="l14"></span><span e3="true" className="l15"></span>
								<span className="l16"></span><span className="l17" e2="true"></span><span className="l18" e4="true"></span><span className="l19" e2="true"></span><span className="l20"></span>
								<span className="l21"></span><span className="l22"></span><span className="l23" e1="true"></span><span className="l24"></span><span className="l25"></span>
							</li>
							<li className={`lineup_cate lineup_pos ${2 === selectLineup ? 'on' : ''}`} onClick={() => {clickLineupSlot(2);}}>
              {/* <!--어린진--> */}
								<span className="l1"></span><span className="l2"></span><span className="l3" e1="true"></span><span className="l4"></span><span className="l5"></span>
								<span className="l6"></span><span className="l7" e2="true"></span><span className="l8" e2="true"></span><span className="l9" e2="true"></span><span className="l10"></span>
								<span className="l11"></span><span e3="true" className="l12"></span><span className="l13"></span><span e3="true" className="l14"></span><span className="l15"></span>
								<span className="l16" e3="true"></span><span className="l17"></span><span className="l18"></span><span className="l19"></span><span className="l20" e3="true"></span>
								<span className="l21" e4="true"></span><span className="l22"></span><span className="l23"></span><span className="l24"></span><span className="l25" e4="true"></span>
							</li>
							<li className={`lineup_cate lineup_pos ${3 === selectLineup ? 'on' : ''}`} onClick={() => {clickLineupSlot(3);}}>
              {/* <!--언월진--> */}
								<span className="l1"></span><span className="l2" e3="true"></span><span className="l3" e2="true"></span><span className="l4"></span><span className="l5"></span>
								<span className="l6"></span><span className="l7"></span><span className="l8"></span><span className="l9" e2="true"></span><span className="l10"></span>
								<span className="l11"></span><span className="l12"></span><span className="l13"></span><span className="l14" e2="true"></span><span className="l15"></span>
								<span className="l16" e3="true"></span><span className="l17"></span><span className="l18"></span><span className="l19" e1="true"></span><span className="l20" e4="true"></span>
								<span className="l21"></span><span className="l22" e3="true"></span><span className="l23" e2="true"></span><span className="l24" e4="true"></span><span className="l25"></span>
							</li>
							<li className={`lineup_cate lineup_pos ${4 === selectLineup ? 'on' : ''}`} onClick={() => {clickLineupSlot(4);}}>
              {/* <!--봉시진--> */}
								<span className="l1"></span><span className="l2"></span><span className="l3" e1="true"></span><span className="l4"></span><span className="l5"></span>
								<span className="l6"></span><span className="l7" e2="true"></span><span className="l8"></span><span className="l9" e2="true"></span><span className="l10"></span>
								<span className="l11" e2="true"></span><span className="l12"></span><span className="l13" e3="true"></span><span className="l14"></span><span className="l15" e2="true"></span>
								<span className="l16" e4="true"></span><span className="l17"></span><span className="l18" e3="true"></span><span className="l19"></span><span className="l20" e4="true"></span>
								<span className="l21"></span><span className="l22"></span><span className="l23" e3="true"></span><span className="l24"></span><span className="l25"></span>
							</li>
							<li className={`lineup_cate lineup_pos ${5 === selectLineup ? 'on' : ''}`} onClick={() => {clickLineupSlot(5);}}>
              {/* <!--방원진--> */}
								<span className="l1"></span><span className="l2"></span><span e4="true" className="l3"></span><span className="l4"></span><span className="l5"></span>
								<span className="l6"></span><span e3="true" className="l7"></span><span e2="true" className="l8"></span><span e3="true" className="l9"></span><span className="l10"></span>
								<span e4="true" className="l11"></span><span e2="true" className="l12"></span><span e1="true" className="l13"></span><span e2="true" className="l14"></span><span e4="true" className="l15"></span>
								<span className="l16"></span><span e3="true" className="l17"></span><span e2="true" className="l18"></span><span e3="true" className="l19"></span><span className="l20"></span>
								<span className="l21"></span><span className="l22"></span><span e4="true" className="l23"></span><span className="l24"></span><span className="l25"></span>
							</li>
							<li className={`lineup_cate lineup_pos ${6 === selectLineup ? 'on' : ''}`} onClick={() => {clickLineupSlot(6);}}>
              {/* <!--안행진--> */}
								<span className="l1" e3="true"></span><span className="l2"></span><span className="l3"></span><span className="l4"></span><span className="l5" e3="true"></span>
								<span className="l6" e4="true"></span><span className="l7" e3="true"></span><span className="l8"></span><span className="l9" e3="true"></span><span className="l10" e4="true"></span>
								<span className="l11"></span><span className="l12" e2="true"></span><span className="l13"></span><span className="l14" e2="true"></span><span className="l15"></span>
								<span className="l16"></span><span className="l17"></span><span className="l18" e1="true"></span><span className="l19"></span><span className="l20"></span>
								<span className="l21"></span><span className="l22"></span><span className="l23" e2="true"></span><span className="l24"></span><span className="l25"></span>
							</li>
							<li className={`lineup_cate lineup_pos ${7 === selectLineup ? 'on' : ''}`} onClick={() => {clickLineupSlot(7);}}>
              {/* <!--장사진--> */}
								<span className="l1" e4="true"></span><span className="l2" e3="true"></span><span className="l3"></span><span className="l4"></span><span className="l5"></span>
								<span className="l6"></span><span className="l7" e2="true"></span><span className="l8" e4="true"></span><span className="l9"></span><span className="l10"></span>
								<span className="l11"></span><span className="l12"></span><span e1="true" className="l13"></span><span className="l14" e4="true"></span><span className="l15"></span>
								<span className="l16"></span><span className="l17"></span><span className="l18" e4="true"></span><span className="l19" e2="true"></span><span className="l20"></span>
								<span className="l21"></span><span className="l22"></span><span className="l23"></span><span className="l24" e3="true"></span><span className="l25" e4="true"></span>
							</li>
							<li className={`lineup_cate lineup_pos ${8 === selectLineup ? 'on' : ''}`} onClick={() => {clickLineupSlot(8);}}>
              {/* <!--형액진--> */}
								<span className="l1"></span><span className="l2" e2="true"></span><span className="l3"></span><span className="l4" e2="true"></span><span className="l5"></span>
								<span className="l6"></span><span className="l7" e2="true"></span><span className="l8"></span><span className="l9" e2="true"></span><span className="l10"></span>
								<span className="l11"></span><span className="l12"></span><span className="l13" e1="true"></span><span className="l14"></span><span className="l15"></span>
								<span className="l16" e4="true"></span><span className="l17" e3="true"></span><span className="l18"></span><span className="l19" e3="true"></span><span className="l20" e4="true"></span>
								<span className="l21"></span><span className="l22"></span><span className="l23" e3="true"></span><span className="l24"></span><span className="l25"></span>
							</li>
							<li className={`lineup_cate lineup_pos ${9 === selectLineup ? 'on' : ''}`} onClick={() => {clickLineupSlot(9);}}>
              {/* <!--추행진--> */}
								<span className="l1"></span><span className="l2"></span><span className="l3" e2="true"></span><span className="l4"></span><span className="l5"></span>
								<span className="l6"></span><span className="l7" e2="true"></span><span className="l8" e1="true"></span><span className="l9" e2="true"></span><span className="l10"></span>
								<span className="l11" e3="true"></span><span className="l12" e3="true"></span><span className="l13" e3="true"></span><span className="l14" e3="true"></span><span className="l15" e3="true"></span>
								<span className="l16"></span><span className="l17"></span><span className="l18" e4="true"></span><span className="l19"></span><span className="l20"></span>
								<span className="l21"></span><span className="l22"></span><span className="l23"></span><span className="l24"></span><span className="l25"></span>
							</li>
						</ul>
					</div>
					<div className="lineup_area">
						<div className="lineup_info">
							<div className="lineup_na">{gameData.lineup[selectLineup].na}</div>
							<div className="lineup_cost">
								<span className="cost_current">0</span>
								<span className="bar"></span>
								<span className="cost_total">0</span>
							</div>
						</div>
						<div className={`lineup_map lineup_pos lineup${selectLineup}`}>
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
						</div>
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
					</div>
				</div>
				<div className="lineup_ch scroll-y">
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
				</div>
			</LineupWrap>
    </>
  );
}

export default Lineup;
