import { AppContext } from 'App';
import { Text } from 'components/Atom';
import { IconPic } from 'components/ImagePic';
import { util } from 'components/Libs';
import Msg from 'components/Msg';
import MsgContainer from 'components/MsgContainer';
import ChLineup from 'pages/ChLineup';
import CharacterCard from 'pages/CharacterCard';
import React, { useContext, useEffect, useState } from 'react';
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
const SubmitBtn = styled.button`
	position: relative;
	margin: 0 0 0 5px;
	padding-top: 45px;
	width: 45px;
	height: 0;
	background: #00f;
	color: #fff;
	font-weight: 600;
	font-size: 0.75rem;
`;
const SubmitBtnText = styled(Text)`
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
	margin: 10px 0 0 0;
	padding: 10px;
	width: 100%;
	background: #000;
	box-sizing: border-box;
	flex-grow: 1;
  border: 15px solid;
  border-image: url(${({frameImg}) =>  frameImg}) 30 /
  15px round;
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
				break;
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
		opacity: .3;
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
	const chData = React.useMemo(() => {
		const ch = isMoveEvent ? util.loadData("historyParam").moveEvent.ch : sData.ch;
		const cloneCh = [...sData.ch];
		return isMoveEvent ? {
			moveCh: ch.map((ch) => {
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
			moveNotCh: ch.map((ch, idx) => {
				return {
					...ch,
					partyIdx: idx,
				}
			}),
			};
	}, [saveData, isMoveEvent]);
	const lineupData = React.useMemo(() => {
		return isMoveEvent ? sData?.eventLineup : sData?.lineup;
	}, [sData, isMoveEvent]);
	const [selectSave, setSelectSave] = useState(lineupData.select); // 선택된 진형슬롯
	const [leaderIdx, setLeaderIdx] = useState(() => {
		return lineupData.save_slot[selectSave].leader;
	});
	const makeLeaderformationArr = (lIdx) => {
		if (lIdx === "") {
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
	
	const [selectLineup, setSelectLineup] = useState(lineupData.save_slot[selectSave].no); // 저장된 슬롯에 선택된 진형
	const [formationLeaderIdx, setFormationLeaderIdx] = useState(gameData.lineup[selectLineup].entry[0][0]);

	const [useList, setUseList] = useState(() => {
		const selectEntry = lineupData.save_slot[selectSave].entry;
		selectEntry[formationLeaderIdx] = leaderIdx;
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
		const sData = Object.keys(saveData).length !== 0 ? saveData : util.loadData('saveData');
		changeSaveData(util.setLineupSt({
			saveSlot: idx,
			lineupType: selectLineup,
			useList: useList,
			leaderIdx: leaderIdx,
			isMoveEvent: isMoveEvent,
		}, gameData, sData));
	}

	useEffect(() => {
		clickSelectSlot(selectSave);
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
								setMsg(gameData.msg.sentenceFn.selectedLeader(lang, gameData.ch[sData.ch[useList[formationLeaderIdx]].idx].na1));
							} else {
								setMsgOn(true);
								setMsg(gameData.msg.sentence.selectLeader[lang]);
							}
						}}>
							{leaderIdx !== "" && <CharacterCard usedType="thumb" saveData={sData} gameData={gameData} slotIdx={leaderIdx} />}
						</LineupLeader>
						<LineupCateArea className="scroll-y">
							<ul>
								{leaderformationArr.map((lineupData, idx) => {
									const selectedIdx = leaderformationArr.findIndex((_idx) => _idx === selectLineup);
									return <LineupCate selected={idx === selectedIdx}  onClick={() => {
										let cloneUseList = [...useList];
										cloneUseList = cloneUseList.map((useCh) => {
											return useCh === leaderIdx ? "" : useCh;
										});
										const formationIdx = gameData.lineup[lineupData].entry[0][0];
										cloneUseList[formationIdx] = leaderIdx;

										setUseList(cloneUseList);
										setSelectLineup(leaderformationArr[idx]);
										changeSaveData(util.setLineupSt({
											saveSlot: selectSave, 
											lineupType: lineupData,
											useList: cloneUseList,
											leaderIdx: leaderIdx,
											isMoveEvent: isMoveEvent,
										}, gameData, sData));
										setFormationLeaderIdx(gameData.lineup[lineupData].entry[0][0]);
										setSelectFormationPosition(formationIdx);
									}} key={`lineupCate_${idx}`}>
										<LineupCateText color="main" code="t2">{gameData.msg.lineup[`lineup${lineupData}`][lang]}</LineupCateText>
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
						<ChLineup saveData={sData} changeSaveData={changeSaveData} selectSave={selectSave} selectLineup={selectLineup} useList={useList} setUseList={setUseList} selectFormationPosition={selectFormationPosition} setSelectFormationPosition={setSelectFormationPosition} leaderIdx={leaderIdx} setLeaderIdx={setLeaderIdx} isMoveEvent={isMoveEvent} />
						<LineupChInfo className="lineup_chInfo scroll-y" frameImg={imgSet.images.frame0}>
							<LineupChUl>
								{lineupInfo && sData.ch[useList[selectFormationPosition]] && lineupData.save_slot[selectSave].eff && lineupInfo.map((stateName, idx) => {
									const saveCh = sData.ch[useList[selectFormationPosition]];
									const lineupEff = lineupData.save_slot[selectSave].eff[selectFormationPosition];
									const arrow = lineupEff[idx][0] > 0 ? 'up' : (lineupEff[idx][0] < 0 ? 'down' : 'none');
									return (
										<LineupChLi key={`li_${idx}`}>
											<LineupChNa code="t3" color="grey">{stateName}</LineupChNa>
											<LineupChTxt code="t5" color="main" weight="600">{saveCh[`bSt${idx}`] + saveCh[`iSt${idx}`] + Math.round(lineupEff[idx][1])}</LineupChTxt>
											<LineupChAddTxt code="t3" arrow={arrow} color="main" weight="600">
												{arrow === "down" ? <ArrowIcon type="commonBtn" pic="icon100" idx="7" /> : arrow === "up" ? <ArrowIcon type="commonBtn" pic="icon100" idx="8" /> : ""}
												{`${lineupEff[idx][0]}% (${Math.round(lineupEff[idx][1])})`}
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
								<ChLi used={used} onClick={() => {
									if ((formationLeaderIdx !== selectFormationPosition && leadership < limitLeadership + gameData.ch[data.idx].cost) || (formationLeaderIdx === selectFormationPosition && gameData.ch[data.idx].st0 < limitLeadership)) {
										setMsgOn(true);
										setMsg(gameData.msg.sentence.lackLeadership[lang]);
										return;
									}
									let cloneSData = {...saveData},
										cloneUseList = [...useList],
										leader = "";
									if (!used) {//선택되지 않은
										if (formationLeaderIdx === selectFormationPosition) {
											cloneSData.lineup.save_slot[selectSave].leader = data.partyIdx;
											cloneSData.lineup.save_slot[selectSave].no = 0;
											
											cloneUseList = cloneUseList.map((useCh) => {
												return useCh === leaderIdx ? "" : useCh;
											});
											const lFormationArr = makeLeaderformationArr(data.partyIdx),
												formationIdx = gameData.lineup[lFormationArr[0]].entry[0][0];
											
											cloneUseList[formationIdx] = data.partyIdx;
											leader = data.partyIdx;
											setLeaderformationArr(lFormationArr);
											setFormationLeaderIdx(formationIdx);
											setSelectFormationPosition(formationIdx);
											
											setSelectLineup(0);
											setLeaderIdx(leader);
										} else {
											if (formationLeaderIdx === selectFormationPosition) {
											} else {
												leader = leaderIdx;
												cloneUseList[selectFormationPosition] = data.partyIdx;
											}
										}
									} else {//선택된
										if (cloneUseList[formationLeaderIdx] === data.partyIdx) {
											cloneUseList[formationLeaderIdx] = "";
											if (formationLeaderIdx === selectFormationPosition) {
												cloneSData.lineup.save_slot[selectSave].leader = "";
												cloneSData.lineup.save_slot[selectSave].no = 0;
												setSelectLineup(0);
											} else {
												cloneUseList[selectFormationPosition] = data.partyIdx;
											}
											setLeaderIdx("");
											setLeaderformationArr(makeLeaderformationArr(""));
										} else {
											if (cloneUseList[selectFormationPosition] === data.partyIdx) {
												cloneUseList[selectFormationPosition] = "";
											} else {
												if (formationLeaderIdx === selectFormationPosition) {
													leader = data.partyIdx;
													const lFormationArr = makeLeaderformationArr(data.partyIdx),
													formationIdx = gameData.lineup[lFormationArr[0]].entry[0][0];
													setLeaderIdx(data.partyIdx);
													setLeaderformationArr(lFormationArr);
													setFormationLeaderIdx(formationIdx);
												}
												cloneUseList = cloneUseList.map((useCh) => {
													return useCh === data.partyIdx ? "" : useCh;
												});
												cloneUseList[selectFormationPosition] = data.partyIdx;
											}
										}
									}
									cloneSData = util.setLineupSt({
										saveSlot: selectSave, 
										lineupType: selectLineup,
										useList: cloneUseList,
										leaderIdx: leader,
										isMoveEvent: isMoveEvent,
									}, gameData, cloneSData);
									setUseList(cloneUseList);
									changeSaveData(cloneSData);
								}} key={idx} data-idx={idx}>
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
									<ChLi used={used} onClick={() => {
										if (leadership < limitLeadership + gameData.ch[data.idx].cost && formationLeaderIdx !== selectFormationPosition) {
											setMsgOn(true);
											setMsg(gameData.msg.sentence.lackLeadership[lang]);
											return;
										}
										let cloneSData = {...saveData},
											cloneUseList = [...useList],
											leader = "";
										if (!used) {
											cloneUseList[selectFormationPosition] = data.partyIdx;
											if (formationLeaderIdx === selectFormationPosition) {
												cloneSData.lineup.save_slot[selectSave].leader = data.partyIdx;
												cloneSData.lineup.save_slot[selectSave].no = 0;
											
												cloneUseList = cloneUseList.map((useCh) => {
													return useCh === leaderIdx ? "" : useCh;
												});
												const lFormationArr = makeLeaderformationArr(data.partyIdx),
													formationIdx = gameData.lineup[lFormationArr[0]].entry[0][0];
												
												cloneUseList[formationIdx] = data.partyIdx;
												leader = data.partyIdx;
												setLeaderformationArr(lFormationArr);
												setFormationLeaderIdx(formationIdx);
												setSelectFormationPosition(formationIdx);

												setSelectLineup(0);
												setLeaderIdx(leader);
											}
										} else {
											if (cloneUseList[formationLeaderIdx] === data.partyIdx) {
												cloneUseList[formationLeaderIdx] = "";
												if (formationLeaderIdx === selectFormationPosition) {
													cloneSData.lineup.save_slot[selectSave].leader = "";
													cloneSData.lineup.save_slot[selectSave].no = 0;
													setSelectLineup(0);
													setLeaderIdx("");
												}
											} else {
												cloneUseList = cloneUseList.map((useCh) => {
													return useCh === data.partyIdx ? "" : useCh;
												});
												cloneUseList[formationLeaderIdx] = data.partyIdx;
											}
										}
										cloneSData = util.setLineupSt({
											saveSlot: selectSave, 
											lineupType: selectLineup,
											useList: cloneUseList,
											leaderIdx: leader,
											isMoveEvent: isMoveEvent,
										}, gameData, cloneSData);
										setUseList(cloneUseList);
										changeSaveData(cloneSData);
									}} key={idx} data-idx={idx}>
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
