import { Text } from 'components/Atom';
import { IconPic } from 'components/ImagePic';
import { util } from 'components/Libs';
import Msg from 'components/Msg';
import MsgContainer from 'components/MsgContainer';
import { AppContext } from 'contexts/app-context';
import ChLineup from 'pages/ChLineup';
import CharacterCard from 'pages/CharacterCard';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const ArrowIcon = styled(IconPic)`
	margin: 0 5px 0 0;
	width: 20px;
	height: 20px;
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
`;
const LineupSave = styled.div`
	display: flex;
	height: 5%;
	overflow: hidden;
	padding: 0 20px;
	justify-content: center;
`;
const LineupSaveUl = styled.ul`
	display: flex;
	width: 100%;
	height: 100%;
	justify-content: space-between;
	align-items: center;
`;
const LineupSaveLi = styled.li`
	position: relative;
	padding-top: 10%;
	width: 10%;
	height: 0;
	box-sizing: border-box;
	border-radius: 50%;
	${({selected}) => selected ? "" : `box-shadow: 0 0 0 3px var(--color-darkgrey) inset;`}
`;
const SaveIcon = styled(IconPic)`
	position: absolute;
	left: 0;
	top: 0;
`;
const LineupSaveLiText = styled(Text)`
	display: flex;
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: center;
`;
const LineupMiddle = styled.div`
	display: flex;
	margin: 10px 0;
	height: 60%;
	overflow: hidden;
	padding: 0 20px;
	justify-content: center;
`;
const LineupList = styled.div`
	display: flex;
	flex-direction: column;
	width: 20%;
`;
const LineupLeader = styled.div`
	position: relative;
	margin: 0 auto 10px;
	padding-top: 90%;
	width: 90%;
	border: 2px solid #fff;
	border-radius: 10px;
	background: #000;
`;
const LineupCateArea = styled.div`
	flex: unset !important;
	overflow: hidden;
	ul {
		width: 100%;
	}
`;
const LineupCate = styled.li`
	position: relative;
	margin: 0 0 10px 0;
	padding-top: 80%;
	min-width: 80%;
	box-sizing: border-box;
	border-radius: 15px;
	border: 2px solid #fff;
	&:last-of-type {
		margin:0;
	}
	${({selected}) => selected ? `
		background: #f00;
	` : `
		background: #000;
	`};
`;
const LineupCateText = styled(Text)`
	display: flex;
	position: absolute;
	top:0;
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: center;
`;
const LineupArea = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	margin: 0 0 0 10px;
	width: 80%;
	overflow: hidden;
	flex-grow: 1;
`;
const LineupInfo = styled.div`
	display: flex;
	padding: 5px 10px;
	justify-content: space-between;
`;
const LineupTitle = styled(Text)`
	text-shadow: 0 0 5px #000;
	div {
		display: inline-block;
	}
`;
const LineupCost = styled(Text)`
	text-shadow: 0 0 5px #000;
	&.error {
		color: #f00;
	}
`;
const LineupChInfo = styled.div`
	display: ${({infoShow}) => infoShow ? "unset" : "none"};
	position: absolute;
	left: 0;
	right: 0;
	top: 10%;
	bottom: 10%;
	padding: 10px;
	background: ${({theme}) => theme.color.shadow};
	box-sizing: border-box;
	flex-grow: 1;
  border: 10px solid;
  border-image: url(${({frameImg}) =>  frameImg}) 30 /
  10px round;
	z-index: 10;
`;
const LineupChUl = styled.ul`
	display: flex;
	flex-flow: wrap;
`;
const LineupChLi = styled.li`
	display: flex;
	align-items: center;
	position: relative;
	margin: 0 0 2px 0;
	width: 100%;
	color: #fff;
	box-sizing: border-box;
`;
const LineupChNa = styled(Text)`
	margin: 0 10px 0 0;
`;
const LineupChTxt = styled(Text)`
	margin: 0 5px 0 0;
`;
const LineupChAddTxt = styled(Text)`
	display: flex;
	position: relative;
	margin: 0 5px 0 12px;
	${({arrow}) => {
		switch(arrow) {
			case "up":
				return `
					color: var(--color-point4);
					text-shadow: 1px 1px 0 var(--color-w);
				`;
			case "down":
				return `
					color: var(--color-point2);
					text-shadow: 1px 1px 0 var(--color-w);
				`;
			default:
				return `
					font-size: 0;
				`;
		}
	}}
`;
const LineupChList = styled.div`
	height: 40%;
	overflow: hidden;
	padding: 0 20px;
	justify-content: center;
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
	margin: 0 3px 3px 0;
	width: calc(20% - 2.4px);
	padding-top: calc(20% - 2.4px);
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
	${({used}) => used ? `
		filter: grayscale(1) brightness(0.3);
	` : ""}
`;
const checkUseList = (useList, chIdx) => {
	return useList.filter((dataIdx, idx) => {
		return dataIdx === chIdx
	}).length > 0;
}

const CardPlacement = ({
  saveData,
  changeSaveData,
}) => {
  const context = useContext(AppContext);
	util.saveData('historyParam', {
		...util.loadData('historyParam'),
		type: useLocation()?.state?.type,
	});
	const scenarioState = util.loadData('historyParam').scenario;
  const lang = React.useMemo(() => {
    return context.setting.lang;
  }, [context]);
  const imgSet = React.useMemo(() => {
    return context.images;
  }, [context]);
  const gameData = React.useMemo(() => {
    return context.gameData;
  }, [context]);
	const sData = React.useMemo(() => {
		return Object.keys(saveData).length !== 0 ? saveData : util.loadData('saveData');
	}, [saveData]);
	const [msgOn, setMsgOn] = useState(false);
	const [msg, setMsg] = useState("");
	const isMoveEvent = React.useMemo(() => {
		return util.loadData("historyParam")?.moveEvent && Object.keys(util.loadData("historyParam").moveEvent).length > 0;
	}, []);
	const [infoShow, setInfoShow] = useState(false);
	const chData = React.useMemo(() => {
		const ch = isMoveEvent ? util.loadData("historyParam").moveEvent.ch : sData.ch;
		if (isMoveEvent) {
			const moveChIdxs = new Set(ch.map(c => Number(c.idx)));
			return {
				moveCh: ch.map((c) => ({
					...sData.ch[c.idx],
					partyIdx: Number(c.idx),
				})),
				moveNotCh: sData.ch.map((c, idx) => ({ ...c, partyIdx: idx }))
					.filter((_, idx) => !moveChIdxs.has(idx))
			};
		}
		return {
			moveCh: [],
			moveNotCh: ch.map((c, idx) => ({
				...c,
				partyIdx: idx,
			})),
		};
	}, [sData.ch, isMoveEvent]);
	const lineupData = React.useMemo(() => {
		return isMoveEvent ? sData?.eventLineup : 
			scenarioState?.type === "scenario" ? sData?.ch[scenarioState?.slotIdx].scenario[scenarioState?.chScenarioIdx]?.stage[scenarioState?.stageIdx].lineup : sData?.lineup;
	}, [sData, isMoveEvent]);
	const [selectSave, setSelectSave] = useState(lineupData.select); // 선택된 진형슬롯
	const lineupEff = React.useMemo(() => {
		return (scenarioState?.type === "scenario" ? lineupData.slot.eff : lineupData.save_slot[selectSave]?.eff) || [];
	}, [sData, isMoveEvent, lineupData, scenarioState]);
	const lineupNo = React.useMemo(() => {
		return scenarioState?.type === "scenario" ? lineupData.slot.no : lineupData.save_slot[selectSave].no;
	}, [lineupData, selectSave, scenarioState]);
	const [leaderIdx, setLeaderIdx] = useState(() => {
		return scenarioState?.type === "scenario" ? lineupData.slot.leader || 0 : lineupData.save_slot[selectSave].leader;
	});
	const makeLeaderformationArr = (lIdx) => {
		if (lIdx === "" || lIdx === undefined) {
			return [0];
		}
		let formationSkill = [];
		sData.ch[lIdx].hasSkill.forEach((skill) => {
			if (skill.idx > 100 && skill.idx < 110) {
				formationSkill.push(Number(skill.idx) - 100);
			};
		});
		formationSkill.sort();
		return formationSkill ?  [0, ...formationSkill] : [0];
	};
	const [leaderformationArr, setLeaderformationArr] = useState(makeLeaderformationArr(leaderIdx));
	
	const [selectLineup, setSelectLineup] = useState(lineupNo); // 저장된 슬롯에 선택된 진형
	const [formationLeaderIdx, setFormationLeaderIdx] = useState(gameData.lineup[selectLineup].entry[0][0]);

	const [useList, setUseList] = useState(() => {
		const selectEntry = scenarioState?.type === "scenario" ? lineupData.slot.entry : JSON.parse(JSON.stringify(lineupData.save_slot[selectSave].entry || []));
		if (formationLeaderIdx !== undefined && selectEntry[formationLeaderIdx] !== undefined) {
			selectEntry[formationLeaderIdx] = leaderIdx;
		}
		return selectEntry;
	}); // 라인업 맵 캐릭
	const peopleLength = React.useMemo(() => {
		return useList.filter((people) => people !== "").length;
	}, [useList]);
	const limitLeadership = React.useMemo(() => {
		let leadership = 0;
		useList.forEach((people) => {
			if (people !== "") {
				leadership += gameData.ch[sData.ch[people].idx].cost;
			}
		});
		return leadership;
	}, [gameData, sData, useList]);
	const leadership = React.useMemo(() => leaderIdx !== "" ? gameData.ch[sData.ch[leaderIdx].idx].st0 : 0, [gameData, sData, leaderIdx]);
	const [selectFormationPosition, setSelectFormationPosition] = useState(leaderIdx !== "" ? formationLeaderIdx : 0); //선택된 라인업 리스트 순번

	const lineupInfo = ["HP","SP","RSP","ATK","DEF","MAK","MDF","RCV","SPD","LUK"];
	const lineupSlot = [1,2,3,4,5,6,7,8];
	const clickSelectSlot = (idx) => {//세이브 슬롯 선택
		setSelectSave(idx);
		const selectLineup = scenarioState?.type === "scenario" ? lineupData.slot.no : lineupData.save_slot[idx].no;
		setSelectLineup(selectLineup);
		const lineupSlotData = scenarioState?.type === "scenario" ? lineupData.slot : lineupData.save_slot[idx];
		let updatedEntry = JSON.parse(JSON.stringify(lineupSlotData.entry || []));

		if (isMoveEvent) {
			const moveNotChIdxs = new Set(chData.moveNotCh.map(c => c.partyIdx));
			const removeIdx = updatedEntry.findIndex((entry) => entry !== "" && moveNotChIdxs.has(entry));
			if (removeIdx >= 0) {
				updatedEntry[removeIdx] = "";
			}
		}
		const newSaveData = util.setLineupSt({
			saveSlot: idx,
			lineupType: lineupSlotData.no,
			useList: updatedEntry,
			leaderIdx: leaderIdx,
			isMoveEvent: isMoveEvent,
			scenarioState: scenarioState,
			selectSave: selectSave,
			lineupIdx: selectLineup,
			cloneUseList: updatedEntry,
		}, gameData, Object.keys(saveData).length !== 0 ? saveData : util.loadData('saveData'));
		setUseList(updatedEntry);
		changeSaveData(newSaveData);
	}

	useEffect(() => {
		clickSelectSlot(selectSave);
		return () => {
			util.saveData('historyParam', {});
		}
	}, []);
  return (
    <>
      <Wrap className="lineup_wrap">
				<LineupSave>
					<LineupSaveUl>
						{lineupSlot && lineupSlot.map((txt, idx) => {
							return (
								<LineupSaveLi key={`save_${idx}`} selected={idx === selectSave} onClick={() => {
									clickSelectSlot(idx);}
								}>
									{idx === selectSave ? <SaveIcon type="commonBtn" pic="icon100" idx="26" /> : <LineupSaveLiText code="t4" weight="600" color="main">{txt}</LineupSaveLiText>}
								</LineupSaveLi>
							);
						})}
					</LineupSaveUl>
				</LineupSave>
				<LineupMiddle className="lineup_middle">
					<LineupList>
						<LineupLeader onClick={() => {
							setSelectFormationPosition(formationLeaderIdx);
							if (useList[formationLeaderIdx] !== "") {
								setMsgOn(true);
								setMsg(gameData.msg.sentenceFn.selectedLeader(lang, gameData.ch[sData.ch[useList[formationLeaderIdx]].idx].na1[lang]));
							} else {
								setMsgOn(true);
								setMsg(gameData.msg.sentence.selectLeader[lang]);
							}
						}}>
							{leaderIdx !== "" && <CharacterCard usedType="thumb" saveData={sData} gameData={gameData} slotIdx={leaderIdx} />}
						</LineupLeader>
						<LineupCateArea className="scroll-y">
							<ul>
								{leaderformationArr.map((lineupIdx, idx) => {
									const selectedIdx = leaderformationArr.findIndex((_idx) => _idx === selectLineup);
									return <LineupCate selected={idx === selectedIdx}  onClick={() => {
										let cloneUseList = [...useList].map((useCh) => useCh === leaderIdx ? "" : useCh);
										const formationIdx = gameData.lineup[lineupIdx].entry[0][0];
										cloneUseList[formationIdx] = leaderIdx;

										setUseList(cloneUseList);
										setSelectLineup(lineupIdx);
										setFormationLeaderIdx(formationIdx);
										setSelectFormationPosition(formationIdx);

										// const currentSaveData = isMoveEvent ? 
										// 	{ ...saveData, 
										// 		eventLineup: { ...saveData.eventLineup, save_slot: saveData.eventLineup.save_slot.map((slot, sIdx) => sIdx === selectSave ? { ...slot, no: lineupIdx, entry: [...cloneUseList] } : slot) } 
										// 	} :
										// 	{ ...saveData,
										// 		...(scenarioState?.type === "scenario" ? {
										// 			ch: saveData.ch.map((ch, chIdx) =>                           // ① saveData.ch 가 배열이 아니면 TypeError
										// 			chIdx === scenarioState?.slotIdx
										// 				? { 
										// 						...ch,
										// 						scenario: ch.scenario.map((scenario, scenarioIdx) =>   // ② ch.scenario 가 배열이 아니면 TypeError
										// 							scenarioIdx === scenarioState?.chScenarioIdx
										// 								? { 
										// 										...scenario,
										// 										stage: scenario.stage.map((stage, stageIdx) => // ③ scenario.stage 가 배열이 아니면 TypeError
										// 											stageIdx === scenarioState?.stageIdx
										// 												? { 
										// 														...stage,
										// 														lineup: {
										// 															...stage.lineup,                     // ④ stage.lineup 이 객체가 아니면 TypeError
										// 															save_slot: stage.lineup.save_slot.map((slot, sIdx) => // ⑤ save_slot 이 배열이 아니면 TypeError
										// 																sIdx === selectSave
										// 																	? { 
										// 																			...slot,
										// 																			no: lineupIdx,
										// 																			entry: [...cloneUseList],     // ⑥ saveUseList 가 iterable 이 아니면 TypeError
										// 																		}
										// 																	: slot
										// 															)
										// 														}
										// 													}
										// 												: stage
										// 										)
										// 									}
										// 								: scenario
										// 						)
										// 					}
										// 				: ch
										// 			)
										// 		} : {
										// 			lineup: { ...saveData.lineup, save_slot: saveData.lineup.save_slot.map((slot, sIdx) => sIdx === selectSave ? { ...slot, no: lineupIdx, entry: [...cloneUseList] } : slot) } 
										// 		})
										// 	};
										const finalSaveData = util.setLineupSt({
											saveData: saveData,
											saveSlot: selectSave, 
											lineupType: lineupIdx,
											useList: cloneUseList,
											leaderIdx: leaderIdx,
											isMoveEvent: isMoveEvent,
											scenarioState: scenarioState,
											selectSave: selectSave,
											lineupIdx: lineupIdx,
											cloneUseList: cloneUseList,
										}, gameData, saveData);
										changeSaveData(finalSaveData);
									}} key={`lineupCate_${idx}`}>
										<LineupCateText color="main" code="t2">{gameData.msg.lineup[`lineup${lineupIdx}`][lang]}</LineupCateText>
									</LineupCate>
								})}
							</ul>
						</LineupCateArea>
					</LineupList>
					<LineupArea className="lineup_area">
						<LineupInfo>
							<LineupTitle code="t4" color="main" weight="600">{gameData.msg.lineup[`lineup${selectLineup}`][lang]} <Text  code="t1" color={peopleLength >= gameData.lineup[selectLineup].limitPeople ? "grey" : "red"}>({gameData.msg.sentenceFn.limitPeople(lang, peopleLength >= gameData.lineup[selectLineup].limitPeople, gameData.lineup[selectLineup].limitPeople)})</Text></LineupTitle>
							<LineupCost code="t4" color="main">
								{`${limitLeadership} / ${leadership}`}
							</LineupCost>
						</LineupInfo>
						<ChLineup saveData={sData} changeSaveData={changeSaveData} selectSave={selectSave} selectLineup={selectLineup} useList={useList} setUseList={setUseList} selectFormationPosition={selectFormationPosition} setSelectFormationPosition={setSelectFormationPosition} leaderIdx={leaderIdx} setLeaderIdx={setLeaderIdx} isMoveEvent={isMoveEvent} setInfoShow={setInfoShow} scenarioState={scenarioState}/>
						<LineupChInfo infoShow={infoShow} className="lineup_chInfo scroll-y" frameImg={imgSet.images.frame0} onClick={() => {
							setInfoShow(prev => !prev);
						}}>
							<LineupChUl>
								{lineupInfo && sData.ch?.[useList[selectFormationPosition]] && lineupEff[selectFormationPosition] && lineupInfo.map((stateName, idx) => {
									const saveCh = sData.ch[useList[selectFormationPosition]];
									const effData = lineupEff[selectFormationPosition][idx] || [0, 0];
									const arrow = effData[0] > 0 ? 'up' : (effData[0] < 0 ? 'down' : 'none');
									return (
										<LineupChLi key={`li_${idx}`}>
											<LineupChNa code="t2" color="grey">{stateName}</LineupChNa>
											<LineupChTxt code="t3" color="main" weight="600">{(saveCh[`bSt${idx}`] || 0) + (saveCh[`iSt${idx}`] || 0) + Math.round(effData[1] || 0)}</LineupChTxt>
											<LineupChAddTxt code="t3" arrow={arrow} color="main" weight="600">
												{arrow === "down" ? <ArrowIcon type="commonBtn" pic="icon100" idx="7" /> : arrow === "up" ? <ArrowIcon type="commonBtn" pic="icon100" idx="8" /> : ""}
												{`${effData[0]}% (${Math.round(effData[1] || 0)})`}
											</LineupChAddTxt>
										</LineupChLi>
									);
								})}
							</LineupChUl>
						</LineupChInfo>
					</LineupArea>
				</LineupMiddle>
				<LineupChList className="scroll-y">
				{!isMoveEvent ? 
					<ChUl>
						{chData.moveNotCh.map((data, idx) => {
							const used = checkUseList(useList, data.partyIdx);
							return (
								<ChLi used={used} key={idx} onClick={() => {
									if ((formationLeaderIdx !== selectFormationPosition && leadership < limitLeadership + gameData.ch[data.idx].cost) || (formationLeaderIdx === selectFormationPosition && gameData.ch[data.idx].st0 < limitLeadership)) {
										setMsgOn(true);
										setMsg(gameData.msg.sentence.lackLeadership[lang]);
										return;
									}
									let cloneUseList = [...useList];
									let leader = leaderIdx;
									let newSelectLineup = selectLineup;

									if (!used) {//선택되지 않은
										if (formationLeaderIdx === selectFormationPosition) {
											cloneUseList = cloneUseList.map((useCh) => useCh === leaderIdx ? "" : useCh);
											const lFormationArr = makeLeaderformationArr(data.partyIdx);
											const newFormationIdx = gameData.lineup[lFormationArr[0]].entry[0][0];
											
											cloneUseList[newFormationIdx] = data.partyIdx;
											leader = data.partyIdx;
											newSelectLineup = 0;
											
											setLeaderformationArr(lFormationArr);
											setFormationLeaderIdx(newFormationIdx);
											setSelectFormationPosition(newFormationIdx);
											setSelectLineup(newSelectLineup);
											setLeaderIdx(leader);
										} else {
											leader = leaderIdx;
											cloneUseList[selectFormationPosition] = data.partyIdx;
										}
									} else {//선택된
										if (cloneUseList[formationLeaderIdx] === data.partyIdx) {
											cloneUseList[formationLeaderIdx] = "";
											if (formationLeaderIdx === selectFormationPosition) {
												leader = "";
												newSelectLineup = 0;
												setSelectLineup(0);
											}
											setLeaderIdx(leader);
											setLeaderformationArr(makeLeaderformationArr(leader));
										} else {
											if (cloneUseList[selectFormationPosition] === data.partyIdx) {
												cloneUseList[selectFormationPosition] = "";
											} else {
												if (formationLeaderIdx === selectFormationPosition) {
													leader = data.partyIdx;
													const lFormationArr = makeLeaderformationArr(data.partyIdx);
													const newFormationIdx = gameData.lineup[lFormationArr[0]].entry[0][0];
													setLeaderIdx(leader);
													setLeaderformationArr(lFormationArr);
													setFormationLeaderIdx(newFormationIdx);
												}
												cloneUseList = cloneUseList.map((useCh) => useCh === data.partyIdx ? "" : useCh);
												cloneUseList[selectFormationPosition] = data.partyIdx;
											}
										}
									}

									// const currentSaveData = JSON.parse(JSON.stringify(saveData));
									// if (currentSaveData.lineup) {
									// 	currentSaveData.lineup.save_slot[selectSave] = {
									// 		...currentSaveData.lineup.save_slot[selectSave],
									// 		leader: leader,
									// 		entry: [...cloneUseList],
									// 		no: newSelectLineup
									// 	};
									// }
									const finalSaveData = util.setLineupSt({
										saveSlot: selectSave, 
										lineupType: newSelectLineup,
										useList: cloneUseList,
										leaderIdx: leader,
										isMoveEvent: isMoveEvent,
										scenarioState: scenarioState,
										selectSave: selectSave,
										lineupIdx: newSelectLineup,
										cloneUseList: cloneUseList,
									}, gameData, saveData);

									setUseList(cloneUseList);
									changeSaveData(finalSaveData);
								}}>
									<CharacterCard usedType="thumb" saveData={sData} gameData={gameData} showCost={true} slotIdx={data.partyIdx} />
								</ChLi>
							);
						})}
					</ChUl> : <>
						<ChGroup color="main" code="t3" borderColor="sub" align="left">{gameData.msg.title.travelCard[lang]}</ChGroup>
						<ChUl>
							{chData.moveCh.map((data, idx) => {
								const used = checkUseList(useList, data.partyIdx);
								return (
									<ChLi used={used} key={idx} onClick={() => {
										if (leadership < limitLeadership + gameData.ch[data.idx].cost && formationLeaderIdx !== selectFormationPosition) {
											setMsgOn(true);
											setMsg(gameData.msg.sentence.lackLeadership[lang]);
											return;
										}
										let cloneUseList = [...useList];
										let leader = leaderIdx;
										let newSelectLineup = selectLineup;

										if (!used) {
											cloneUseList[selectFormationPosition] = data.partyIdx;
											if (formationLeaderIdx === selectFormationPosition) {
												cloneUseList = cloneUseList.map((useCh) => useCh === leaderIdx ? "" : useCh);
												const lFormationArr = makeLeaderformationArr(data.partyIdx);
												const newFormationIdx = gameData.lineup[lFormationArr[0]].entry[0][0];
												
												cloneUseList[newFormationIdx] = data.partyIdx;
												leader = data.partyIdx;
												newSelectLineup = 0;

												setLeaderformationArr(lFormationArr);
												setFormationLeaderIdx(newFormationIdx);
												setSelectFormationPosition(newFormationIdx);
												setSelectLineup(newSelectLineup);
												setLeaderIdx(leader);
											}
										} else {
											if (cloneUseList[formationLeaderIdx] === data.partyIdx) {
												cloneUseList[formationLeaderIdx] = "";
												if (formationLeaderIdx === selectFormationPosition) {
													leader = "";
													newSelectLineup = 0;
													setSelectLineup(0);
													setLeaderIdx("");
												}
											} else {
												cloneUseList = cloneUseList.map((useCh) => useCh === data.partyIdx ? "" : useCh);
												cloneUseList[formationLeaderIdx] = data.partyIdx;
											}
										}
										const finalSaveData = util.setLineupSt({
											saveSlot: selectSave, 
											lineupType: newSelectLineup,
											useList: cloneUseList,
											leaderIdx: leader,
											isMoveEvent: isMoveEvent,
											scenarioState: scenarioState,
											selectSave: selectSave,
											lineupIdx: newSelectLineup,
											cloneUseList: cloneUseList,
										}, gameData, saveData);

										setUseList(cloneUseList);
										changeSaveData(finalSaveData);
									}}>
										<CharacterCard usedType="thumb" saveData={sData} gameData={gameData} showCost={true} slotIdx={data.partyIdx} />
									</ChLi>
								);
							})}
						</ChUl>
						<ChGroup color="main" code="t3" borderColor="sub" align="left">{gameData.msg.title.nonTravelCard[lang]}</ChGroup>
						<ChUl>
							{chData.moveNotCh.map((data, idx) => {
								const used = checkUseList(useList, data.partyIdx);
								return (
									<ChLi used={used} onClick={() => {
										setMsgOn(true);
                  	setMsg(gameData.msg.sentence.onlyTravelHero[lang]);
									}} key={idx} data-idx={idx}>
										<CharacterCard usedType="thumb" saveData={sData} gameData={gameData} showCost={true} slotIdx={data.partyIdx} />
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
