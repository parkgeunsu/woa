import { AppContext } from 'App';
import { IconPic } from 'components/ImagePic';
import { util } from 'components/Libs';
import iconArrowDown from 'images/ico/arrow_down.png';
import iconArrowUp from 'images/ico/arrow_up.png';
import ChLineup from 'pages/ChLineup';
import CharacterCard from 'pages/CharacterCard';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const StyledIconPic = styled(IconPic)`
  position: absolute;
  left: 0;
  top: 0;
`;

const Wrap = styled.div`
	display: flex;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	flex-direction: column;
	padding: 0 0 10px 0;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	overflow: hidden;
	& > div {
		padding: 0 20px;
		justify-content: center;
	}
`;
const LineupSave = styled.div`
	height: 5%;
	overflow: hidden;
	dl {
		width: 100%;
		height: 100%;
	}
	dt {
		flex-grow: 0;
		margin: auto 10px auto 0;
		color: #000;
		font-weight: 600;
	}
	dd {
		display: flex;
		flex-grow: 1;
		margin: auto auto;
		height: 100%;
	}
	ul {
		display: flex;
		width: 100%;
		height: 100%;
		justify-content: space-between;
		li {
			width: 10%;
			height: 100%;
			text-align: center;
			&.on .save_slot {
				border: 1px solid #f00;
				background: #fff;
				color: #f00;
			}
			&.save .save_slot {
				outline: 1px solid #00f;
				background: #00f;
				color: #fff;
			}
		}
	}
	.save_slot {
		padding: 0;
		width: 100%;
		height: 100%;
		background: #000;
		color: #fff;
		box-sizing: border-box;
	}
	.save_submit{
		margin: 0 0 0 5px;
		width: 45px;
		background: #00f;
		color: #fff;
		font-weight: 600;
		font-size: 0.75rem;
	}
`;
const LineupMiddle = styled.div`
	display: flex;
	margin: 10px 0;
	height: 60%;
	overflow: hidden;
`;
const LineupList = styled.div`
	width: 20%;
	overflow: hidden;
	flex: unset !important;
	ul {
		width: 100%;
	}
`;
const LineupCate = styled.li`
	position: relative;
	margin: 0 0 10px 0;
	padding-top: 100%;
	width: 100%;
	height: 100%;
	font-size: 0;
	&:last-of-type {
		margin:0;
	}
`;
const LineupArea = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 0 0 10px;
	width: 80%;
	overflow: hidden;
	flex-grow: 1;
`;
const LineupInfo = styled.div`
	display: flex;
	padding: 5px;
	background: #ddd;
	justify-content: space-between;
	.lineup_na {
		color: #000;
		font-weight: 600;
	}
	.lineup_cost {
		color: #000;
		&.error {
			color: #f00;
		}
		span {
			font-size: 0.75rem;
			font-weight: 600;
		}
		.bar {
			color: #000;
			font-size: 0.75rem;
			&:before {
				content: ' / ';
			}
		}
	}
`;
const LineupChInfo = styled.div`
	padding: 10px;
	width: 100%;
	background: #ddd;
	box-sizing: border-box;
	flex-grow: 1;
	ul {
		display: flex;
		flex-flow: wrap;
		li {
			position: relative;
			margin: 0 0 2px 0;
			width: 100%;
			color: #000;
			box-sizing: border-box;
			.na {
				margin: 0 5px 0 0;
				font-size: 0.75rem;
			}
			.txt {
				font-size: 0.75rem;
				font-weight: 600;
			}
			.add_txt{
				position: relative;
				margin: 0 0 0 5px;
				padding: 0 0 0 12px;
				font-size: 0.75rem;
				font-weight: 600;
			}
			&:nth-of-type(2) {
				width: 50%;
			}
			&:nth-of-type(3) {
				width: 50%;
			}
			&.none .add_txt{
				display: none;
			}
			&.up .add_txt{
				color: var(--color-point4);
				&:before {
					content: '';
					position: absolute;
					left: 0;
					top: 0;
					width: 12px;
					height: 100%;
					background: url(${({arrowUpImg}) => arrowUpImg}) no-repeat center center;
					background-size: 10px;
				}
			}
			&.down .add_txt{
				color: var(--color-point2);
				&:before {
					content: '';
					position: absolute;
					left: 0;
					top: 0;
					width: 12px;
					height: 100%;
					background: url(${({arrowDownImg}) => arrowDownImg}) no-repeat center center;
					background-size: 10px;
				}
			}
		}
	}
`;
const LineupChList = styled.div`
	height: 40%;
	overflow: hidden;
	ul {
		display: flex;
		flex-flow: wrap;
		width: 100%;
		li {
			position: relative;
			margin: 0 6.5px 6.5px 0;
			width: calc(25% - 5px);
			padding-top: calc(25% - 5px);
			font-size: 0;
			overflow: hidden;
			border-radius: 10px;
			&:nth-of-type(4n) {
				margin: 0 0 6.5px 0;
			}
			& > span {
				position: absolute;
				font-size: 0.625rem;
			}
			&.selected {
				opacity: .3;
			}
		}
	}
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
}) => {
  const context = useContext(AppContext);
  // const lang = React.useMemo(() => {
  //   return context.setting.lang;
  // }, [context]);
  // const imgSet = React.useMemo(() => {
  //   return context.images;
  // }, [context]);
  const gameData = React.useMemo(() => {
    return context.gameData;
  }, [context]);
	const sData = React.useMemo(() => {
		return Object.keys(saveData).length !== 0 ? saveData : util.loadData('saveData');
	}, [saveData]);
	const [saveSlot, setSaveSlot] = useState(sData?.lineup?.select); // 저장된 슬롯
	const [selectSave, setSelectSave] = useState(sData?.lineup?.select); // 선택된 진형슬롯
	const [selectLineup, setSelectLineup] = useState(sData?.lineup?.save_slot[selectSave].no); // 저장된 슬롯에 선택된 진형
	const [selectLineupList, setSelectLineupList] = useState(0); //선택된 라인업 리스트 순번
	const [useList, setUseList] = useState(sData?.lineup?.save_slot[selectSave].entry); // 라인업 맵 캐릭
	const [noneUseList, setNoneUseList] = useState(sData?.ch);
	
	const mapRef = useRef([]);
	const lineupInfo = ["HP","SP","RSP","ATK","DEF","MAK","MDF","RCV","SPD","LUK"];
	const lineupSlot = [1,2,3,4,5,6,7,8];
	const clickSelectSlot = (idx) => {//세이브 슬롯 선택
		//console.log('saveslot' + idx);
		setSelectSave(idx);
		setSelectLineup(sData.lineup.save_slot[idx].no);
		setUseList(sData.lineup.save_slot[idx].entry);
		util.setLineupSt({
			saveSlot: selectSave,
			lineupType: selectLineup,
			useList: useList,
		}, gameData, saveData, changeSaveData);
	}
	const clickSaveSlot = () => {
		let save = sData;
		save.lineup.select = selectSave;
		setSaveSlot(selectSave);
		changeSaveData(save);
	}
	const clickLineupSlot = (idx) => {//진형 타입 선택
		//console.log('lineupslot' + idx);
		setSelectLineup(idx);
		setUseList(sData.lineup.save_slot[selectSave].entry);
		util.setLineupSt({
			saveSlot: selectSave, 
			lineupType: idx,
			useList: useList,
		}, gameData, sData, changeSaveData);
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
		}, gameData, sData, changeSaveData);
	}
	useEffect(() => {
		const listUsed = sData.lineup.save_slot[selectSave].entry;
		setUseList(listUsed);
		util.setLineupSt({
			saveSlot: selectSave, 
			lineupType: selectLineup,
			useList: listUsed,
		}, gameData, sData, changeSaveData);
	}, []);
  return (
    <>
      <Wrap className="lineup_wrap">
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
							{gameData.lineup.map((lineData, idx) => {
								return <LineupCate className={`${idx === selectLineup ? "on" : ""}`} selectLineup={selectLineup} onClick={() => {
									clickLineupSlot(idx);
								}} key={`lineupCate_${idx}`}>
									<StyledIconPic pic="img600" idx={idx} />
								</LineupCate>
							})}
						</ul>
					</LineupList>
					<LineupArea className="lineup_area">
						<LineupInfo>
							<div className="lineup_na">{gameData.lineup[selectLineup].na}</div>
							<div className="lineup_cost">
								<span className="cost_current">0</span>
								<span className="bar"></span>
								<span className="cost_total">0</span>
							</div>
						</LineupInfo>
						<ChLineup saveData={sData} changeSaveData={changeSaveData} selectSave={selectSave} selectLineup={selectLineup} useList={useList} setUseList={setUseList} mapRef={mapRef.current} selectLineupList={selectLineupList} setSelectLineupList={setSelectLineupList} />
						<LineupChInfo className="lineup_chInfo scroll-y" arrowUpImg={iconArrowUp} arrowDownImg={iconArrowDown}>
							<ul>
								{lineupInfo && sData.ch[useList[selectLineupList]] && lineupInfo.map((stateName, idx) => {
									const saveCh = sData.ch[useList[selectLineupList]];
									const lineupEff = sData.lineup.save_slot[selectSave].eff[selectLineupList];
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
				<LineupChList className="scroll-y">
					<ul>
						{noneUseList && noneUseList.map((saveCh, idx) => {
							const used = checkUseList(useList, idx);
							return (
								<li className={used ? 'selected': ''} onClick={() => {
									if (!used) {
										clickLineupCh(saveCh.idx, idx);
									}
								}} key={idx} data-idx={idx}>
									<CharacterCard usedType="thumb" saveData={sData} gameData={gameData} slotIdx={idx} />
								</li>
							);
						})}
					</ul>
				</LineupChList>
			</Wrap>
    </>
  );
}

export default CardPlacement;
