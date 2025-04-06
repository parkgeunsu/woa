import { AppContext } from 'App';
import { Text } from 'components/Atom';
import { IconPic } from 'components/ImagePic';
import { util } from 'components/Libs';
import Msg from 'components/Msg';
import MsgContainer from 'components/MsgContainer';
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
	&.on {
		background: #f00;
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
`;
const ChGroup = styled(Text)`
  margin: 10px 0 5px 0;
`;
const ChUl = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const ChLi = styled.li`
	position: relative;
	margin: 0 4px 4px 0;
	width: calc(25% - 3px);
	padding-top: calc(25% - 3px);
	overflow: hidden;
	border-radius: 10px;
	font-size: 0;
	&:nth-of-type(4n) {
		margin: 0 0 4px 0;
	}
	& > span {
		position: absolute;
		font-size: 0.625rem;
	}
	&.selected {
		opacity: .3;
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
  const lang = React.useMemo(() => {
    return context.setting.lang;
  }, [context]);
  // const imgSet = React.useMemo(() => {
  //   return context.images;
  // }, [context]);
  const gameData = React.useMemo(() => {
    return context.gameData;
  }, [context]);
	const sData = React.useMemo(() => {
		return Object.keys(saveData).length !== 0 ? saveData : util.loadData('saveData');
	}, [saveData]);
	const [msgOn, setMsgOn] = useState(false);
	const [msg, setMsg] = useState("");
	const isMoveEvent = React.useMemo(() => {
		return Object.keys(util.loadData("historyParam").moveEvent).length > 0;
	}, []);
	const chData = React.useMemo(() => {
		const moveCh = util.loadData("historyParam").moveEvent.ch;
		const cloneCh = [...sData.ch];
		return isMoveEvent ? {
			moveCh: moveCh.map((ch) => {
				delete cloneCh[ch.idx];
				return {
					...sData.ch[ch.idx],
					partyIdx: ch.idx,
				};
			}),
			moveNotCh: cloneCh.map((ch, idx) => {
				return {
					...ch,
					partyIdx: idx,
				}
			})
		} : {
			moveCh: [],
			moveNotCh: cloneCh.map((ch, idx) => {
				return {
					...ch,
					partyIdx: idx,
				}
			}),
			};
	}, [sData, isMoveEvent]);
	const lineupData = React.useMemo(() => {
		return isMoveEvent ? sData?.eventLineup : sData?.lineup;
	}, [sData, isMoveEvent]);
	const [saveSlot, setSaveSlot] = useState(lineupData.select); // 저장된 슬롯
	const [selectSave, setSelectSave] = useState(lineupData.select); // 선택된 진형슬롯
	const [selectLineup, setSelectLineup] = useState(lineupData.save_slot[selectSave].no); // 저장된 슬롯에 선택된 진형
	const [selectLineupList, setSelectLineupList] = useState(0); //선택된 라인업 리스트 순번
	const [useList, setUseList] = useState(lineupData.save_slot[selectSave].entry); // 라인업 맵 캐릭

	const mapRef = useRef([]);
	const lineupInfo = ["HP","SP","RSP","ATK","DEF","MAK","MDF","RCV","SPD","LUK"];
	const lineupSlot = [1,2,3,4,5,6,7,8];
	const clickSelectSlot = (idx) => {//세이브 슬롯 선택
		//console.log('saveslot' + idx);
		setSelectSave(idx);
		setSelectLineup(lineupData.save_slot[idx].no);
		if (isMoveEvent) {
			const cloneMoveNotCh = chData.moveNotCh.filter((notCh) => {
				return notCh.partyIdx >= 0;
			});
			const removeIdx = lineupData.save_slot[idx].entry.findIndex((entry, entryIdx) => {
				return cloneMoveNotCh.findIndex((chIdx) => {
					if(chIdx.partyIdx === entry) {
						return entryIdx;
					}
				}) >= 0;
			})
			lineupData.save_slot[idx].entry[removeIdx] = "";
		}
		setUseList(lineupData.save_slot[idx].entry);
		util.setLineupSt({
			saveSlot: idx,
			lineupType: selectLineup,
			useList: useList,
			isMoveEvent: isMoveEvent,
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
		setUseList(lineupData.save_slot[selectSave].entry);
		util.setLineupSt({
			saveSlot: selectSave, 
			lineupType: idx,
			useList: useList,
			isMoveEvent: isMoveEvent,
		}, gameData, sData, changeSaveData);
	}
	const clickLineupCh = (slotIdx) => {//캐릭 리스트 클릭
		console.log('선택된 map순번', selectLineupList, slotIdx);//선택되어 있는 map칸
		let saveUseList = [...useList];
		saveUseList[selectLineupList] = slotIdx;
		setUseList(saveUseList);
		util.setLineupSt({
			saveSlot: selectSave, 
			lineupType: selectLineup,
			useList: saveUseList,
			isMoveEvent: isMoveEvent,
		}, gameData, sData, changeSaveData);
	}
	useEffect(() => {
		clickSelectSlot(selectSave);
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
									const lineupEff = lineupData.save_slot[selectSave].eff[selectLineupList];
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
				{!isMoveEvent ? 
					<ChUl>
						{chData.moveNotCh.map((data, idx) => {
							const used = checkUseList(useList, data.partyIdx);
							return (
								<ChLi className={used ? 'selected': ''} onClick={() => {
									if (!used) {
										clickLineupCh(data.partyIdx);
									}
								}} key={idx} data-idx={idx}>
									<CharacterCard usedType="thumb" saveData={sData} gameData={gameData} slotIdx={data.partyIdx} />
								</ChLi>
							);
						})}
					</ChUl> : <>
						<ChGroup color="main" code="t3" borderColor="sub" align="left">{gameData.msg.title.travelCard[lang]}</ChGroup>
						<ChUl>
							{chData.moveCh.map((data, idx) => {
								const used = checkUseList(useList, data.partyIdx);
								return (
									<ChLi className={used ? 'selected': ''} onClick={() => {
										if (!used) {
											clickLineupCh(data.partyIdx);
										}
									}} key={idx} data-idx={idx}>
										<CharacterCard usedType="thumb" saveData={sData} gameData={gameData} slotIdx={data.partyIdx} />
									</ChLi>
								);
							})}
						</ChUl>
						<ChGroup color="main" code="t3" borderColor="sub" align="left">{gameData.msg.title.nonTravelCard[lang]}</ChGroup>
						<ChUl>
							{chData.moveNotCh.map((data, idx) => {
								const used = checkUseList(useList, data.partyIdx);
								return (
									<ChLi className={used ? 'selected': ''} onClick={() => {
										setMsgOn(true);
                  	setMsg(gameData.msg.sentence.onlyTravelHero[lang]);
									}} key={idx} data-idx={idx}>
										<CharacterCard usedType="thumb" saveData={sData} gameData={gameData} slotIdx={data.partyIdx} />
									</ChLi>
								);
							})}
						</ChUl>
					</>}
				</LineupChList>
			</Wrap>
      <MsgContainer>
        {msgOn && <Msg text={msg} showMsg={setMsgOn}></Msg>}
      </MsgContainer>
    </>
  );
}

export default CardPlacement;
