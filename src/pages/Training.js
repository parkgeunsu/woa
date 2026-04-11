import { Text } from 'components/Atom';
import { ActionChDisplay } from 'components/Components';
import { FlexBox } from 'components/Container';
import { IconPic, MergedPic, SkillMark } from 'components/ImagePic';
import { util } from 'components/Libs';
import Msg from 'components/Msg';
import MsgContainer from 'components/MsgContainer';
import Npc from 'components/Npc';
import Popup from 'components/Popup';
import PopupContainer from 'components/PopupContainer';
import { AppContext } from 'contexts/app-context';
import CharacterCard from 'pages/CharacterCard';
import ChList from 'pages/ChList';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrap = styled(FlexBox)`
	position: absolute;
  inset: 0;
	padding: 0 0 20px 0;
	box-sizing: border-box;
	overflow: hidden;
`;
const WorkArea = styled(FlexBox)`
	position: relative;
	margin: 10px auto 0;
  flex: 1;
	width: 90%;
  box-sizing: border-box;
  background: rgba(0,0,0,.7);
  border: 5px solid transparent;
  border-image: url(${({frameBack}) => frameBack}) 5 round;
`;
const GreetingText = styled(Text)`
	padding: 10%;
`;
const WorkHeader = styled(FlexBox)`
	height: auto;
`;
const ActionBox = styled(FlexBox)`
  width: auto;
	height: auto;
	padding: 5px 10px;
	background: ${({theme}) => theme.color.main};
`;
const LvName = styled(FlexBox)`
	margin: 0 0 0 15px;
	flex: 1;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
  .lvupText {
    text-shadow:
      0 0 0 rgba(255, 230, 120, 0),
      0 0 0 rgba(255, 210, 0, 0);
    will-change: transform, opacity, text-shadow, filter;
  }
  &.animate .lvupText {
    animation: lvup-bounce 800ms cubic-bezier(.21,1.02,.35,1), 
              lvup-trail 800ms ease-out;
  }
`;
const LvUpContent = styled(FlexBox)`
	flex: 1;
	width: 100%;
	height: 100%;
	overflow: hidden;
`;
const GradeUpContent = styled(FlexBox)`
	flex: 1;
	width: 100%;
	height: 100%;
	overflow: hidden;
`;
const SkillUpContent = styled(FlexBox)`
	flex: 1;
	width: 100%;
	height: 100%;
	overflow: hidden;
`;
const TextBar = styled(Text)`
  margin: 0 3px;
`;
const StateContainer = styled(FlexBox)`
  padding: 5px 10px;
  height: auto;
  box-sizing: border-box;
  flex-wrap: wrap;
`;
const StateGroup = styled(FlexBox)`
	position: relative;
	width: 100%;
	box-sizing: border-box;
	height: auto;
`;
const StateIcon = styled(IconPic)`
	width: 25px;
	height: 25px;
`;
const StateInner = styled(FlexBox)`
	padding: 1px 5px 1px 10px;
	flex: 1;
	width: auto;
	border-radius: 15px;
	box-sizing: border-box;
`;
const StateText = styled(Text)`
	line-height: 1 !important;
`;
const TextTotal = styled(Text)`
	line-height: 1 !important;
	white-space: nowrap;
`;
const GradeUpCh = styled.div`
	position: relative;
	width: 40%;
	padding-top: 40%;
	box-sizing: border-box;
  border-radius: 10px;
	overflow: hidden;
`;
const ChUl = styled.ul``;
const ChLi = styled.li`
  display: inline-block;
  position: relative;
	margin: 0 5px 5px 0;
  width: calc(20% - 4px);
  padding-top: calc(20% - 4px);
  border-radius: 10px;
  overflow: hidden;
	&:nth-of-type(5n) {
		margin: 0 0 5px 0;
	}
`;
const SkillArea = styled(FlexBox)`
	position: relative;
	width: 80%;
	height: calc(100% - 10px);
`;
const BadgesTxt = styled(Text)`
`;
const SkillPoint = styled(FlexBox)`
  position: relative;
  height: 50%;
`;
const SkillHorizontal = styled(FlexBox)`
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 25%;
	& > .skill_group {
		position: relative;
		width: 100%;
		height: 90%;
	}
`;
const SkillList = styled.div`
  position: absolute;
  height: 100%;
	aspect-ratio: 1 / 1;
  box-sizing: border-box;
  border-radius: 30px;
  left: ${({pos}) => {
    switch(pos) {
      case 0:
        return 0;
      case 1:
        return `calc((100% - 200px) * 1/3 + 50px * 1)`;
      case 2:
        return `calc((100% - 200px) * 2/3 + 50px * 2)`;
      case 3:
        return `calc((100% - 200px) * 3/3 + 50px * 3)`;
      default:
        break;
    }
  }};
`;
const RequiredLine = styled.div`
  position: absolute;
  left: calc(50% - 2px);
  bottom: 100%;
  width: 4px;
  height: 62%;
	outline: 1px solid #999;
  ${({active}) => active ? 
    `
      background: var(--color-w);
      box-shadow: -3px 0 0 0 var(--color-red), 3px 0 0 0 var(--color-red);
    ` : 
    `
      background: var(--color-darkgrey);
      box-shadow: 0 0 7px 2px var(--color-b);
    `
  };
`;
const SkillButton = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  ${({used}) => used ? `` : `filter: grayscale(100%)`};
  z-index: 2;
  .limitLv {
    position: absolute;
    top: -15px;
    right: 0;
    width: 100%;
    text-align: right;
  }
`;
const SkillLv = styled(Text)`
  position: absolute;
  left: -10px;
  top: 0;
  height: 40%;
	aspect-ratio: 1 / 1;
  border-radius: 50%;
  ${({theme}) => `
    border: 2px solid ${theme.color.sub};
    background-color: ${theme.color.main};
    box-shadow: 0 0 5px ${theme.color.sub};
  `};
  line-height: 1.3;
  z-index: 5;
`;
const GradeUpButton = styled.div`
  position: absolute;
	bottom: 5px;
	right: 5px;
  padding: 0 5px;
	z-index: 10;
`;
const UpButton = styled.div`
  position: absolute;
	bottom: 5px;
	right: 5px;
  padding: 0 5px;
	z-index: 10;
  &:before {
    content: "";
    position: absolute; 
    left: -5%;
    top: -5%;
    margin: auto;
    width: 100%; height: 100%;
    border-radius: 50%;
    border: 3px solid rgba(255, 239, 120, 0.0);
    transform: scale(0.6);
    pointer-events: none;
    filter: blur(0);
  }
  &.animate:before {
    animation: lvup-ring 800ms ease-out forwards;
  }
  &:after {
    content: "";
    position: absolute; inset: 0;
    margin: auto;
    width: 60%; height: 60%;
    border-radius: 50%;
    background: radial-gradient(circle, #fff6b0 0%, #ffd23d 60%, rgba(255,210,61,0) 70%);
    opacity: 0;
    pointer-events: none;
    mask: radial-gradient(circle at center, white 0 40%, transparent 41%);
    box-shadow:
      0 -34px 0 0 #ffd23d,
      29px -17px 0 0 #fff6b0,
      34px  0px 0 0 #ffd23d,
    -29px -17px 0 0 #ffe37a,
      0   34px 0 0 #ffd23d,
    -34px  0px 0 0 #fff29c,
      29px  17px 0 0 #ffd23d,
    -29px  17px 0 0 #ffe37a;
    transform: scale(0.6);
  }
  &.animate:after {
    animation: lvup-sparks 800ms ease-out forwards;
  }
`;
const LvIcon = styled(IconPic)`
  width: 60px;
  height: 60px;
`;
const GetLvReward = styled.div`
	position: fixed;
	inset: 0;
	font-size: 32px;
	pointer-events: none;
	background: rgba(0,0,0,0.7);
	opacity: 0;
	z-index: 100;
	&.animate {
		opacity: 1;
	}
	.rewardText {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		white-space: pre-wrap;
		text-shadow: 0 0 10px #ffd700, 0 0 20px #ffea00;
	}
	&.animate .rewardText{
		animation: skillPop 1.5s ease-out infinite forwards;
	}
`;
const UserContainer = styled(FlexBox)`
	position: relative;
	padding: 10px 20px 0 20px;
	height: calc(25% - 10px);
	width: calc(100% - 40px);
`;
const InfoGroup = styled(FlexBox)`
	position: relative;
	flex: 1;
	margin: 0 10px 0 0;
	padding: 10px 20px;
	height: 100%;
	box-sizing: border-box;
	background: rgba(0,0,0,.8);
`;
const StyledText = styled(Text)`
	width: 100%;
`;
const ActionPic = styled(FlexBox)`
	position: relative;
	width: auto;
	height: 100%;
	border-radius: 5%;
	overflow: hidden;
  box-sizing: border-box;
  background: rgb(0, 0, 0, 0.5);
  z-index: 3;
`;
const NoneChText = styled(Text)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;
const Img = styled.img.attrs(
	({imgurl}) => ({
		src: imgurl 
	})
)`
	height: 100%;
`;
const Training = ({
	saveData,
	changeSaveData,
	setLoading,
}) => {
  const context = useContext(AppContext);
	const navigate = useNavigate();
  const lang = React.useMemo(() => {
    return context.setting.lang;
  }, [context]);
  const imgSet = React.useMemo(() => {
    return context.images;
  }, [context]);
  const gameData = React.useMemo(() => {
    return context.gameData;
  }, [context]);
  const gameItem = React.useMemo(() => {
    return gameData.items;
  }, [gameData]);
	const sData = React.useMemo(() => Object.keys(saveData).length === 0 ? util.loadData('saveData') : saveData, [saveData]);
  const [popupOn, setPopupOn] = useState(false);
	const [popupType, setPopupType] = useState('');
  const [popupInfo, setPopupInfo] = useState({});
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");
	const [selectTab, setSelectTab] = useState("");
	const [rewardText, setRewardText] = useState("");
	const lvUpTimeoutRef = useRef([null, null]);
	const isAnimationRef = useRef(false);
	const entries = React.useMemo(() => {
		return sData.entry.map((entryIdx) => {
			return sData.ch[entryIdx];
		});
	}, [sData]);
	const actionChIdx = React.useMemo(() => {
		return sData.actionCh.training.idx <= entries.length - 1 ? sData.actionCh.training.idx : "";
	}, [entries, sData]);
	const saveCh = React.useMemo(() => entries[actionChIdx] || {}, [entries, actionChIdx]);
	const maxExp = React.useMemo(() => {
		const gradeKey = 'grade' + saveCh.grade;
		const maxExpArr = gameData.exp?.[gradeKey];
		const maxExp = (maxExpArr && typeof saveCh.lv === "number") ? maxExpArr[saveCh.lv] : 0;
		return maxExp;
	}, [gameData.exp, saveCh.grade, saveCh.lv]);
	const saveHasExp = React.useMemo(() => {
		return {
			current: saveCh.hasExp || 0,
			max: gameData.hasMaxExp?.[saveCh.grade] || 0
		};
	}, [gameData.hasMaxExp, saveCh.grade, saveCh.hasExp]);
	const chData = React.useMemo(
		() => gameData.ch?.[saveCh.idx] || {},
		[gameData.ch, saveCh.idx]
	);
	const heroNumArray = React.useMemo(() => {
		return sData.hasHeroNum[saveCh.idx] ? Array.from({length: sData.hasHeroNum[saveCh.idx]}, (_, i) => {
			return gameData.gradeUp[saveCh.grade];
		}) : [];
	}, [sData, saveCh]);
	const [isAnimation, setIsAnimation] = useState(false);
	const [greeting, setGreeting] = useState(gameData.shop.training.greeting[lang]);
	useEffect(() => {
		setLoading(false);
    return () => {
      clearTimeout(lvUpTimeoutRef.current);
      clearTimeout(isAnimationRef.current);
    };
	}, []);
	const totalState = React.useMemo(() => {
		return ["hp", "sp", "rsp"];
	}, [saveCh]);
	return (
		<>
			<Wrap direction="column">
				<Npc imgSet={imgSet} shopType={'training'} gameData={gameData} lang={lang} selectTab={selectTab} setSelectTab={setSelectTab} navigate={navigate} onClick={() => {
          setSelectTab("");
          const randomIdx = Math.floor(Math.random() * gameData.shop.training.randomText.length);
          setGreeting(gameData.shop.training.randomText[randomIdx][lang]);
				}}/>
				<WorkArea frameBack={imgSet.etc.frameChBack}direction="column" alignItems="center" justifyContent="center">
					{selectTab === "" ? <GreetingText code="t4" color="main" wordBreak="keep-all">{greeting}</GreetingText> : 
					actionChIdx !== "" && <WorkHeader direction="row" justifyContent="space-between" alignItems="center">
						<LvName justifyContent="flex-start" className="lvupEffect">
							<Text font="point" lineHeight={1} className="lvupText" code="t5" color="main" weight="600">Lv.{saveCh.lv} {gameData.ch[saveCh.idx].na1[lang]}</Text>
						</LvName>
						<ActionBox justifyContent="space-between">
							<Text code="t2" color="point5">{saveCh.actionPoint || 0}</Text><TextBar code="t2" color="point5">/</TextBar><Text code="t2" color="point5">{saveCh.actionMax || 50}</Text>
						</ActionBox>
					</WorkHeader>}
					{selectTab === 0 && <LvUpContent direction="row" justifyContent="center" alignItems="flex-start" onClick={() => {
					}}>
						<StateContainer direction="column" justifyContent="space-around" alignItems="center">
							{gameData.stateName.map((data, idx) => {
								const { stateColor } = util.getPercentColor(gameData.stateMax[idx], actionChIdx !== "" ? saveCh?.['st' + idx] : 0);
								return (
									<StateGroup key={`chst${idx}`} justifyContent="flex-start">
										<StateIcon type="state" pic="icon100" idx={idx} />
										<StateInner justifyContent="space-between">
											<StateText code="t2" color="main">{gameData.msg.state[data][lang]}</StateText>
											<TextTotal code="t4" weight="600" color={stateColor}>
												{actionChIdx !== "" ? saveCh?.['st' + idx] : 0}
											</TextTotal>
										</StateInner>
									</StateGroup>
								)
							})}
						</StateContainer>
						<StateContainer direction="column" justifyContent="space-around" alignItems="center">
							{totalState.map((data, idx) => {
								return (
									<StateGroup key={`chst${idx}`} justifyContent="flex-start">
										<StateIcon type="state" pic="icon100" idx={idx + 10} />
										<StateInner justifyContent="space-between">
											<StateText code="t2" color="main">{gameData.msg.state[data][lang]}</StateText>
											<TextTotal code="t4" weight="600" color="main">
												{actionChIdx !== "" ? saveCh?.['bSt' + idx] : 0}
											</TextTotal>
										</StateInner>
									</StateGroup>
								)
							})}
							<StateGroup justifyContent="flex-start">
								<StateIcon type="animalType3" pic="icon100" idx={chData.animal_type} />
								<StateInner justifyContent="space-between">
									<StateText code="t2" color="main">{gameData.msg.itemInfo.animalBadge[lang]}</StateText>
									<TextTotal code="t4" weight="600" color="main">
										{saveCh.animalBadge}
									</TextTotal>
								</StateInner>
							</StateGroup>
						</StateContainer>
						<UpButton className="lvupEffect" onClick={() => {//레벨업
							const trainingSkillLv = util.getHasSkillLv({
								saveData: sData,
								skillIdx: 27,//훈련
								slotIdx: actionChIdx,
							});
							const trainingMaxExp = trainingSkillLv === 0 ? maxExp : maxExp - Math.round(maxExp * Number(gameData.skill[27].eff[0].num[trainingSkillLv]) / 100);
							const hasExp = saveHasExp.current;//보유 경험치
							if (trainingMaxExp <= hasExp) {
								saveCh.hasExp = hasExp - trainingMaxExp;
								saveCh.lv = saveCh.lv + 1;
								const luck = saveCh.st7; //행운
								const isGetAnimalCoin = util.getAnimalCoin({
									ch: saveCh,
									luck: luck,
									lv: saveCh.lv,
								});
								const skillIdx = util.getSkill({
									ch: saveCh,
									gameData: gameData,
									luck: luck,
									lv: saveCh.lv,
								});
								let rewardText = "";
								if (skillIdx && isGetAnimalCoin) {
									rewardText = `${gameData.skill[skillIdx].na[lang]} ${gameData.msg.itemInfo.get[lang]} \n${gameData.animalType[chData.animal_type].na[lang]}${gameData.msg.itemInfo.animalBadge[lang]} ${gameData.msg.itemInfo.get[lang]}`;
								} else {
									if (skillIdx) {
										rewardText = `${gameData.skill[skillIdx].na[lang]} ${gameData.msg.itemInfo.get[lang]}`;
									}
									if (isGetAnimalCoin) {
										rewardText = `${gameData.animalType[chData.animal_type].na[lang]}${gameData.msg.itemInfo.animalBadge[lang]} ${gameData.msg.itemInfo.get[lang]}`;
									}
								}
								util.effect.lvUp({
									timeoutRef: lvUpTimeoutRef,
									rewardText: rewardText,
									setRewardText: setRewardText,
									rewardType: skillIdx && isGetAnimalCoin ? "both" : skillIdx ? "skill" : isGetAnimalCoin ? "animalCoin" : "none",
								});
								util.saveCharacter({
									saveData: sData,
									changeSaveData: changeSaveData,
									chSlotIdx: actionChIdx,
									gameData: gameData,
								});
							} else {
								setMsgOn(true);
								setMsg(gameData.msg.sentence.lackExp[lang]);
							}
						}}>
							<LvIcon type="commonIcon" pic="icon200" idx={0} />
						</UpButton>
					</LvUpContent>}
					{selectTab === 1 && <GradeUpContent>
						{actionChIdx !== "" && <CharacterCard usedType="gradeUp" saveData={sData} saveCharacter={saveCh} isAnimation={isAnimation}/>}
						<GradeUpButton onClick={() => {//그레이드 업
							if (heroNumArray.length >= gameData.gradeUp[saveCh.grade] && !isAnimation) {
								setIsAnimation(true);
								clearTimeout(isAnimationRef.current);
								isAnimationRef.current = setTimeout(() => {
									setIsAnimation(false);
									sData.hasHeroNum[saveCh.idx] -= gameData.gradeUp[saveCh.grade];
									saveCh.grade += 1;
									changeSaveData(sData);
								}, 1000);
							} else {
								setMsgOn(true);
								setMsg(gameData.msg.sentence.lackHeroNum[lang]);
							}
						}}>
						<LvIcon type="commonIcon" pic="icon200" idx={2} />
						</GradeUpButton>
					</GradeUpContent>}
					{selectTab === 2 && <SkillUpContent>
						<SkillArea direction="column">
							{saveCh.animalSkill && saveCh.animalSkill.map((skGroup, groupIdx) => {
								return (
									<SkillHorizontal alignItems="flex-end" key={`skillHorizontal_${groupIdx}`}>
										<div className="skill_group" >
											{skGroup.map((skData, skIdx) => {
												if (skData.idx !== ""){
													const requiredLine = groupIdx !== 0 && saveCh.animalSkill[groupIdx - 1][skIdx].idx !== "";
													const sk = gameData.skill[skData.idx],
														requiredSkill = groupIdx !== 0 && gameData.skill[saveCh.animalSkill[groupIdx - 1][skIdx].idx];
													const activeRequired = groupIdx === 0 || (groupIdx !== 0 && saveCh.animalSkill[groupIdx - 1][skIdx].lv > 0);
													//const skillCate = sk.cate;
													return (
														<SkillList key={skIdx} pos={skIdx % 4}>
															{requiredLine && <RequiredLine active={activeRequired}/>}
															<SkillButton used={skData.lv > 0}>
																{/* <div className="limitLv">{`${skData.lv} / ${groupIdx + 1}`}</div> */}
																<SkillLv code="t3" weight="600" color="sub" 
																onClick={() => {
																	if (saveCh.animalBadge <= 0) {
																		setMsgOn(true);
																		setMsg(gameData.msg.sentence.lackBadges[lang]);
																	} else {
																		if (saveCh.animalSkill[groupIdx][skIdx].lv > 4) {//스킬레벨5 최대일때
																			setMsgOn(true);
																			setMsg(gameData.msg.sentence.maxSkillLv[lang]);
																			return;
																		}
																		if (saveCh.animalSkill[groupIdx - 1] && saveCh.animalSkill[groupIdx - 1][skIdx].idx !== "" && saveCh.animalSkill[groupIdx - 1][skIdx].lv === 0) {//선챙 스킬이 없을때
																			setMsgOn(true);
																			const beforeSkill = gameData.skill[saveCh.animalSkill[groupIdx - 1][skIdx].idx].na[lang];
																			setMsg(gameData.msg.sentenceFn.beforeSkill(lang, beforeSkill, groupIdx));
																			return;
																		}
																		if (saveCh.lv < saveCh.animalSkill[groupIdx][skIdx].lvLimit) {//레벨제한보다 적을때
																			setMsgOn(true);
																			setMsg(gameData.msg.sentence.lackLv[lang]);
																			return;
																		}
		
																		const animalIdx = saveCh.animalSkill[groupIdx][skIdx].idx;
																		const newLv = saveCh.animalSkill[groupIdx][skIdx].lv + 1;
																		
																		const updatedAnimalSkill = saveCh.animalSkill.map((group, gIdx) => 
																			gIdx === groupIdx ? group.map((sk, sIdx) => 
																				sIdx === skIdx ? { ...sk, lv: newLv } : sk
																			) : group
																		);
		
																		let updatedHasSkill = [...saveCh.hasSkill];
																		const overlapIdx = updatedHasSkill.findIndex(hSkill => hSkill.idx === animalIdx);
		
																		if (overlapIdx >= 0) {
																			updatedHasSkill[overlapIdx] = { ...updatedHasSkill[overlapIdx], lv: newLv };
																		} else {
																			updatedHasSkill.push({ ...saveCh.animalSkill[groupIdx][skIdx], lv: newLv });
																		}
		
																		const newSaveData = {
																			...sData,
																			ch: sData.ch.map((ch, idx) => 
																				idx === actionChIdx ? {
																					...ch,
																					animalBadge: ch.animalBadge - 1,
																					animalSkill: updatedAnimalSkill,
																					hasSkill: updatedHasSkill
																				} : ch
																			)
																		};
		
																		changeSaveData(newSaveData);
																	}
																}}>{skData.lv}</SkillLv>
																<IconPic pic="skill" idx={skData.idx} 
																onClick={() => {
																	setPopupInfo({
																		sk: sk,
																		skData: skData,
																		chLv: saveCh.lv,
																		activeRequired: activeRequired,
																		requiredSkill: requiredSkill,
																	});
																	setPopupType('skillDescription');
																	setPopupOn(true);
																}}/>
															</SkillButton>
														</SkillList>
													)
												}
											})}
										</div>
									</SkillHorizontal>
								)
							})}
						</SkillArea>
					</SkillUpContent>}
				</WorkArea>
				<UserContainer justifyContent="space-between">
					<InfoGroup justifyContent="space-between" direction="column">
						{selectTab === 0 && <>
							<StyledText code="t2" color="point2" align="left">{gameData.msg.info.needExp[lang]}</StyledText>
							<StyledText code="t3" color="point2" weight="600" align="right">{maxExp}</StyledText>
							<StyledText code="t2" color="main" align="left">{gameData.msg.info.hasExp[lang]}</StyledText>
							<StyledText code="t3" color="main" align="right">
								{`${saveHasExp.current} (${saveHasExp.max})`}
							</StyledText>
						</>}
						{selectTab === 1 && <>
							<FlexBox height="auto" direction="row" justifyContent="space-between">
								<FlexBox style={{flex: 1}} justifyContent="flex-start">
									<StyledText code="t2" color="main" align="left">{gameData.msg.title.gradeUpHeroNum[lang]}</StyledText>
								</FlexBox>
								<FlexBox width="auto" direction="row">
									<StyledText code="t4" color={heroNumArray.length >= gameData.gradeUp[saveCh.grade] ? "point3" : "point2"} weight="600">{gameData.gradeUp[saveCh.grade]}</StyledText><StyledText code="t4" color={"main"} weight="600" style={{margin: "0 4px"}}> / </StyledText><StyledText code="t4" color="main" weight="600">{heroNumArray.length}</StyledText>
								</FlexBox>
							</FlexBox>
							<ChList type="action_list" style={{padding: 0}}>
								<ChUl>
									{heroNumArray.map((data, idx) => {
										return (
											<ChLi key={`chLi_${idx}`} onClick={(e) => {
												e.stopPropagation();
											}}>
												<CharacterCard noInfo usedType="thumb" saveData={true} saveCharacter={saveCh} />
											</ChLi>
										)
									})}
								</ChUl>
							</ChList>
						</>}
						{selectTab === 2 && <>
							<SkillPoint>
								{saveCh.animalBadge <= 0 ? <BadgesTxt code="t3" color="main">{gameData.msg.sentence.noBadges[lang]}</BadgesTxt> : <SkillMark point={saveCh.animalBadge} idx={chData.animal_type}/>}
							</SkillPoint>
							<button text="true" className="button_small" onClick={() => {
								const updatedAnimalSkill = saveCh.animalSkill.map((skGroup) => {
									return skGroup.map((skData) => {
										if (skData.idx === "") {
											return {idx: ""}
										} else {
											return {
												idx: skData.idx,
												lv: 0,
												lvLimit: skData.lvLimit,
											}
										}
									});
								});
	
								const newSaveData = {
									...sData,
									ch: sData.ch.map((ch, idx) => 
										idx === actionChIdx ? {
											...ch,
											animalBadge: util.getAnimalPoint(saveCh.items, chData.animal_type, ch.mark),
											animalSkill: updatedAnimalSkill,
											hasSkill: [...ch.sk]
										} : ch
									)
								};
	
								changeSaveData(newSaveData);
								setMsgOn(true);
								setMsg(gameData.msg.sentence.resetAnimalSkill[lang]);
							}}>{gameData.msg.button.skillReset[lang]}</button>
						</>}
					</InfoGroup>
					<ActionPic onClick={() => {
							setPopupInfo({
								ch: entries,
								actionChIdx: actionChIdx,
								type: 'training',
								setMsg: setMsg,
								setMsgOn: setMsgOn,
							});
							setPopupType('selectCh');
							setPopupOn(true);
						}}>
						<MergedPic isAbsolute pic="card" idx={40 + (saveCh?.grade || 0)} />
						{!actionChIdx && <NoneChText code="t1" color="red">{gameData.msg.sentence.noneSelectCh[lang]}</NoneChText>}
						<Img imgurl={imgSet.images.transparent800} />
						<ActionChDisplay type={'training'} chList={entries} gameData={gameData} actionChIdx={actionChIdx} imgSet={imgSet}/>
					</ActionPic>
				</UserContainer>
				<GetLvReward id="getLvReward">
					<Text code="t6" color="#fff" weight="600" className="rewardText">{rewardText}</Text>
				</GetLvReward>
			</Wrap>
			<PopupContainer>
        {popupOn && <Popup type={popupType} dataObj={popupInfo} saveData={sData} changeSaveData={changeSaveData} showPopup={setPopupOn} msgText={setMsg} showMsg={setMsgOn} />}
      </PopupContainer>
      <MsgContainer>
        {msgOn && <Msg text={msg} showMsg={setMsgOn}></Msg>}
      </MsgContainer>
		</>
  );
}

export default Training;
