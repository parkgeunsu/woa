import { AppContext } from 'App';
import { util } from 'components/Libs';
import 'css/lineup.css';
import iconArrowDown from 'images/ico/arrow_down.png';
import iconArrowUp from 'images/ico/arrow_up.png';
import ChLineup from 'pages/ChLineup';
import CharacterCard from 'pages/CharacterCard';
import { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
`;
const LineupChInfo = styled.div`
	ul li.up .add_txt:before{background:url(${({arrowUpImg}) => arrowUpImg}) no-repeat center center;background-size:10px;}
	ul li.down .add_txt:before{background:url(${({arrowDownImg}) => arrowDownImg}) no-repeat center center;background-size:10px;}
`;

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

const CardPlacement = ({
  saveData,
  changeSaveData,
	lang,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
	const [saveSlot, setSaveSlot] = useState(saveData?.lineup?.select); // 저장된 슬롯
	const [selectSave, setSelectSave] = useState(saveData?.lineup?.select); // 선택된 진형슬롯
	const [selectLineup, setSelectLineup] = useState(saveData?.lineup?.save_slot[selectSave].no); // 저장된 슬롯에 선택된 진형
	const [selectLineupList, setSelectLineupList] = useState(0); //선택된 라인업 리스트 순번
	const [useList, setUseList] = useState(saveData?.lineup?.save_slot[selectSave].entry); // 라인업 맵 캐릭
	const [noneUseList, setNoneUseList] = useState(saveData?.ch);
	
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
	useEffect(() => {
		if (Object.keys(saveData).length !== 0) {
			const listUsed = saveData.lineup.save_slot[selectSave].entry;
			setUseList(listUsed);
			util.setLineupSt({
				saveSlot: selectSave, 
				lineupType: selectLineup,
				useList: listUsed,
			}, gameData, saveData, changeSaveData);
		}
	}, []);
  return (
    <>
      <Wrap className="lineup_wrap">
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
					{Object.keys(saveData).length !== 0 && <div className="lineup_area">
						<div className="lineup_info">
							<div className="lineup_na">{gameData.lineup[selectLineup].na}</div>
							<div className="lineup_cost">
								<span className="cost_current">0</span>
								<span className="bar"></span>
								<span className="cost_total">0</span>
							</div>
						</div>
						<ChLineup saveData={saveData} changeSaveData={changeSaveData} selectSave={selectSave} selectLineup={selectLineup} useList={useList} setUseList={setUseList} mapRef={mapRef.current} selectLineupList={selectLineupList} setSelectLineupList={setSelectLineupList} />
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
					</div>}
				</div>
				<div className="lineup_ch scroll-y">
					<ul>
						{noneUseList && noneUseList.map((saveCh, idx) => {
							const used = checkUseList(useList, idx);
							return (
								<li className={used ? 'selected': ''} onClick={() => {
									if (!used) {
										clickLineupCh(saveCh.idx, idx);
									}
								}} key={idx} data-idx={idx}>
									<CharacterCard isThumb={true} saveData={saveData} gameData={gameData} slotIdx={idx} />
								</li>
							);
						})}
					</ul>
				</div>
			</Wrap>
    </>
  );
}

export default CardPlacement;
