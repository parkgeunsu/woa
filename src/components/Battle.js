import React, { useRef, useState, useContext, useLayoutEffect, useCallback } from 'react';
import { AppContext } from 'App';
import styled from 'styled-components';
import { util } from 'components/Libs';
import 'css/battle.css';
import 'css/battleAnimation.css';
import { matchRoutes } from 'react-router-dom';

const TeamIcon = styled.div`
	background-image:url(${({ iconImg }) => iconImg});background-size:100%;
`;
const BattleHeader = styled.div`
  li.back .ico{background-image:url(${({ iconBack }) => iconBack});}
`;
const BattleWarp = styled.div`
	background:url(${({backImg}) => backImg});background-size:cover;
`;
const BattleArea = styled.div`
	height:${({mode}) => {
		if (mode === "order" || mode === "area") {
			return "calc(100% - 50px)";
		} else {
			return "100%";
		}
	}};
	.units_enemy, .units_ally, .land_ally, .land_enemy{
		height:${({mode}) => {
			if (mode === "action") {
				return "calc(50% - 25px)";
			} else {
				return "50%";
			}
		}};
	}
	&:before{left:${({mode}) => {
		return !mode ? "-50px" : 0;
	}};background:url(${({frameLeft}) => frameLeft}) no-repeat -15px center;}
	&:after{right:${({mode}) => {
		return !mode ? "-50px" : 0;
	}};background:url(${({frameRight}) => frameRight}) no-repeat 13px center;}
`;
const BattleUnit = styled.div`
	.turnLine{
		&:before{background:url(${({frameImg}) => frameImg});background-size:contain;}
		&:after{background:url(${({frameImg}) => frameImg});background-size:contain;}
	}
	& > div {width:${({containerW}) => containerW}px;}
`;
const TimeLineCh = styled.div`
	width:${({size}) => size}px;padding-top:${({size}) => size}px;
	${({team}) => team === 'ally' ? 'margin:15px 0 0 0;' : 'margin:-15px 0 0 0;'}
	&.on{z-index:20;animation:turnEffect ${({ gameSpd }) => 2 / gameSpd}s linear infinite;}
	&.defence0:after{background:url(${({defenceIcon0}) => defenceIcon0}) no-repeat right center;background-size:70%;}
	&.defence1:after{background:url(${({defenceIcon1}) => defenceIcon1}) no-repeat right center;background-size:70%;}
	&.defence2:after{background:url(${({defenceIcon2}) => defenceIcon2}) no-repeat right center;background-size:70%;}
	&.defence3:after{background:url(${({defenceIcon3}) => defenceIcon3}) no-repeat right center;background-size:70%;}
	&.die:after{background:url(${({tombstone}) => tombstone}) no-repeat center center;background-size:70%;}
`;
const BattleCh = styled.div`
	width:${({size}) => size}%;padding-top:${({size}) => size}%;
	left:${({left}) => left}%;
	top:${({top}) => top}%;
	transition:all ${({ gameSpd }) => 1/ gameSpd}s;
	&.relation:after{box-shadow:0 0 15px 5px ${({rtColor}) => rtColor};background:${({rtColor}) => rtColor};animation:rtAnimation ${({ gameSpd }) => 4 / gameSpd}s linear;}
	.ch_box{transition:all ${({ gameSpd }) => 0.3/ gameSpd}s;}
	.ch_box .hpsp{
		span {
			&.hp{
				em{transition:all ${({ gameSpd }) => 0.5/ gameSpd}s;}
			}
			&.sp{
				em{transition:all ${({ gameSpd }) => 0.5/ gameSpd}s;}
			}
		}
	}
	&.defence0:after{
		background:url(${({defenceIcon0}) => defenceIcon0}) no-repeat center center;background-size:60%;
		animation:defence ${({ gameSpd }) => 1/ gameSpd}s;opacity:0;
	}
	&.defence1:after{
		background:url(${({defenceIcon1}) => defenceIcon1}) no-repeat center center;background-size:60%;
		animation:defence ${({ gameSpd }) => 1/ gameSpd}s;opacity:0;
	}
	&.defence2:after{
		background:url(${({defenceIcon2}) => defenceIcon2}) no-repeat center center;background-size:60%;
		animation:defence ${({ gameSpd }) => 1/ gameSpd}s;opacity:0;
	}
	&.avoid0{
		animation:avoid0 ${({ gameSpd }) => 1/ gameSpd}s ease-out;
	}
	&.avoid1{
		animation:avoid1 ${({ gameSpd }) => 1/ gameSpd}s ease-out;
	}
	&.avoid2{
		animation:avoid2 ${({ gameSpd }) => 1/ gameSpd}s ease-out;
	}
	&.avoid3{
		animation:avoid3 ${({ gameSpd }) => 1/ gameSpd}s ease-out;
	}
	${'' /* &.dmg .dmg{
		animation:dmgAnimation ${({gameSpd}) => 0.5 / gameSpd}s steps(1) infinite;
	} */}
	&.dmgCri .dmg{
		animation:dmgCriticalAnimation ${({gameSpd}) => 0.5 / gameSpd}s steps(4) infinite;
	}
	&.die:after{
		background:url(${({tombstone}) => tombstone}) no-repeat center center;background-size:80%;
		animation:tombstone ${({ gameSpd }) => 1/ gameSpd}s;opacity:0;animation-fill-mode:forwards;transform-origin:50% 100%;
	}
`;
const BattleLand = styled.div`
	& > div {width:${({containerW}) => containerW}px;transition:all ${({ gameSpd }) => 1/ gameSpd}s;}
`;
const BattleEffect = styled.div`
	& > div {width:${({containerW}) => containerW}px;transition:all ${({ gameSpd }) => 1/ gameSpd}s;}
`;
const EffLand = styled.div`
	left:${({left}) => left}%;
	top:${({top}) => top}%;
	.dmgNum{
		transition:all ${({gameSpd}) => 1.5 / gameSpd}s ease-in;
	}
`;
const Eff = styled.img`
	height:${({frame}) => {
		return Math.ceil(frame / 5) * 100;
	}}%;
	animation:frame${({frame}) => frame} ${({gameSpd}) => 1 / gameSpd}s steps(1);
	animation-iteration-count: ${({repeat}) => repeat || "infinite"};
`;
const Land = styled.div`
	left:${({left}) => left}%;
	top:${({top}) => top}%;
	background-image:url(${({landImg}) => landImg});
`;
const BattleOrder = styled.div`
	transition:all ${({gameSpd}) => 0.5 / gameSpd}s;opacity:0;
`;
const BattleMenu = styled.div`
	height:${({mode}) => {
		if (mode === "order" || mode === "area") {
			return "50px";
		} else {
			return "0px";
		}
	}};transition:height ${({gameSpd}) => 1 / gameSpd}s;
`;
const CardChRing = styled.span`
	${({lv, ringBack, ringDisplay, ringDisplay1}) => {
		if (lv > 29) {
			return `background-image:url(${ringBack}), url(${ringDisplay}), url(${ringDisplay1});background-position:center 40%,center,center;`
		} else {
			return `background-image:url(${ringBack}), url(${ringDisplay});background-position:center 40%,center;`
		}
	}}
	background-size:100%;
`;
const CardRingStyle = styled.span`
	span{
		animation:ring_ro linear ${({gameSpd}) => 15 / gameSpd}s infinite;
		background-image:url(
			${({ringDisplay, lv}) => {
				if (lv > 49) {
					return ringDisplay
				} else {
					return '';
				}
			}}
		);
		background-size:100%;
	}
`;
const CardCh = styled.span`
	background-image:${({chDisplay}) => {
		return `url(${chDisplay})`;
	}};background-position:center -70%;
	background-size:75%;
`;
const RelationArea = styled.div`
	&:after{transition:all ${({gameSpd}) => 0.5 / gameSpd}s ${({gameSpd}) => 0.5 / gameSpd}s ease-in-out;}
	&.on:after{height:${({rtHeight}) => rtHeight}px;box-shadow:0 0 20px 10px rgba(0,0,0,.7);}
	.relationTitle span:first-of-type{transition:opacity ${({gameSpd}) => 0.5 / gameSpd}s 0s;text-shadow:0 0 10px #ff0,0 0 10px #ff0;}
	.relationTitle span:nth-of-type(2){transition:opacity ${({gameSpd}) => 0.5 / gameSpd}s .2s;text-shadow:0 0 10px #fb0,0 0 10px #fb0;}
	.relationTitle span:nth-of-type(3){transition:opacity ${({gameSpd}) => 0.5 / gameSpd}s .4s;text-shadow:0 0 10px #f60,0 0 10px #f60;}
	.relationTitle span:last-of-type{transition:opacity ${({gameSpd}) => 0.5 / gameSpd}s .6s;text-shadow:0 0 10px #f00,0 0 10px #f00;}
`;
const RelationName = styled.div`
	position:relative;margin:5px 0;padding:0 0 0 13px;color:#fff;z-index:1;filter:blur(5px);transition:all ${({gameSpd}) => 0.5 / gameSpd}s ${({idx}) => 0.5 + idx * 0.3}s;
	&:after{content:'';position:absolute;left:0;top:50%;transform:translate(0, -50%);width:5px;height:5px;background:${({color}) => color};box-shadow:0 0 8px 5px ${({color}) => color};}
`;
const BgEffect = styled.div`
	div{transition:all ${({gameSpd}) => 2 / gameSpd}s;}
	.cloud1{top:0;animation:cloudAnimation ${({gameSpd}) => 210 / gameSpd}s linear infinite;background-image:url(${({img1}) => img1});background-size:100%;}
	.cloud2{top:30%;animation:cloudAnimationReverse ${({gameSpd}) => 130 / gameSpd}s linear infinite;background-image:url(${({img2}) => img2});background-size:100%;opacity:1;}
`;

const chkString = (arr, index) => {
	let chk = false;
	arr.forEach((data, idx) => {
		if (data === index) {
			chk = true;
			return;
		}
	});
	return chk;
}
const enemyPattern = (ai, battleAlly, allyPos, enemy, gameData) => {
	let enemySkill = [];
	const activeSkillSorting = (skill) => {
		let active = [],
			buff = [],
			debuff = [];
		skill.forEach((data, idx) => {
			if (gameData.skill[data.idx].cate[0] === 3) {
				active.push(data);
			} else if (gameData.skill[data.idx].cate[0] === 5) {
				buff.push(data);
			} else if (gameData.skill[data.idx].cate[0] === 6) {
				debuff.push(data);
			};
		});
		buff.push(2);
		return {
			active: active,
			buff: buff,
			debuff: debuff,
		}
	}
	let hpArray = [];
	allyPos.forEach((data, idx) => {
		hpArray.push({
			idx: idx,
			hp: battleAlly[idx].hp_ / battleAlly[idx].hp,
		});
	});
	hpArray.sort((a, b) => {
		return a.hp - b.hp;
	}); //allyPos[hpArray[0].idx] ????????????
	let aliveAlly = [];
	battleAlly.forEach((allyData, idx) => {
		if (allyData.state === "alive") {
			aliveAlly.push(idx);
		}
	});
	enemy.forEach((data, idx) => {
		const enemyAi = ai[idx];
		const skillList = activeSkillSorting(data.sk);
		const activeChance = [0.75, 0.8, 0.85, 0.9, 0.9]; //active?????? ??????
		const normalAttackChance = [0.3, 0.2, 0.15, 0.15, 0.1]; //???????????? ??????
		const weakAttackChance = [0, 0.2, 0.4, 0.6, 0.8]; //????????? ?????? ??????
		const attackTarget = aliveAlly[Math.floor(Math.random() * aliveAlly.length)];
		// const attackTarget = Math.floor(Math.random() * allyPos.length);
		const ranCount = Math.random();
		const target = Math.random() <= weakAttackChance[enemyAi] ? hpArray[0].idx : attackTarget;
		const skillType = ranCount > activeChance[enemyAi] ? skillList.buff : skillList.active;
		const skIdx = Math.random() > normalAttackChance[enemyAi] ? skillType[Math.floor(Math.random() * skillType.length)]?.idx || 1 : 1;
		const targetArea = util.getEffectArea(gameData.skill[skIdx].ta, allyPos[target].pos);
		let targetIdx = [];
		allyPos.forEach((posIdx, idx) => {
			targetArea.forEach((actionIdx) => {
				if (posIdx.pos === actionIdx) {
					targetIdx.push(idx);
				}
			})
		});
		enemySkill.push({
			team: 'enemy',
			idx: idx,
			skIdx: skIdx,
			targetIdx: targetIdx,
			target: allyPos[target].pos,
		});
	});
	return enemySkill;
}
const activeSk = (timeLineData) => {
	const skIdx = timeLineData.order.skIdx,
		die = timeLineData.state === "die"
	if (!die) {
		switch(skIdx) {
			case 0: //??????
				return "none wait";
				break;
			case 2: //??????
				return "none defence0";
				break;
			case 13: //????????????
				return "none defence1";
				break;
			case 14: //????????????
				return "none defence2";
				break;
			case 15: //???????????? ??????
				return "none defence3";
				break;
			default:
				return "";
				break;
		}
	} else {
		return "none die";
	}
}

const actionAnimation = (setTurnIdx, setSkillMsg, turnIdx, timeLine, resetOrder, setAllyEffect, setEnemyEffect, gameData, battleAlly, battleEnemy, setting, setAllyAction, setEnemyAction, allyPos, enemyPos, modeRef, setMode, atkOpion) => {
	if (modeRef.indexOf('battle') >= 0){
		return;
	}
	const endGameCheck = () => {
		const chLength = [battleAlly.length, battleEnemy.length],
			allyEnemyDie = [0,0];
		battleAlly.forEach((ally) => {
			if (ally.state === 'die') {
				allyEnemyDie[0] ++;
			}
		});
		battleEnemy.forEach((enemy) => {
			if (enemy.state === 'die') {
				allyEnemyDie[1] ++;
			}
		})
		if (allyEnemyDie[0] >= chLength[0]) {
			modeRef = 'battleLose';
			resetOrder('battleLose');
		}
		if (allyEnemyDie[1] >= chLength[1]) {
			modeRef = 'battleWin';
			resetOrder('battleWin');
		}
	}
	const gameSpd = setting.speed,
		gameEffSound = setting.effSound;
	if (turnIdx <= timeLine.length - 1) {
		let skillIdx = timeLine[turnIdx].order.skIdx;// {team: 'enemy', idx: 0, skIdx: 0, target: 3}
		//console.log('pgs', timeLine, turnIdx);
		let atkC = [0, false], //?????? ??????
			atkS = 0; //???????????? ????????? ?????? ??????
		if (timeLine[turnIdx].order.team === 'ally') {//?????? ????????????
			if (battleAlly[timeLine[turnIdx].order.idx].state === 'die') {
				skillIdx = 0;
			}
		} else {
			if (battleEnemy[timeLine[turnIdx].order.idx].state === 'die') {
				skillIdx = 0;
			}
		}
		if (skillIdx === 0){ //??????
			setTurnIdx(turnIdx + 1);
			actionAnimation(setTurnIdx, setSkillMsg, turnIdx + 1, timeLine, resetOrder, setAllyEffect, setEnemyEffect, gameData, battleAlly, battleEnemy, setting, setAllyAction, setEnemyAction, allyPos, enemyPos, modeRef, setMode, {
				atkCount:atkC,
				atkStay: atkS,
			});
		} else if (skillIdx === 2 || skillIdx === 13) { //??????, ????????????
			setTurnIdx(turnIdx + 1);
			actionAnimation(setTurnIdx, setSkillMsg, turnIdx + 1, timeLine, resetOrder, setAllyEffect, setEnemyEffect, gameData, battleAlly, battleEnemy, setting, setAllyAction, setEnemyAction, allyPos, enemyPos, modeRef, setMode, {
				atkCount:atkC,
				atkStay: atkS,
			});
		} else {
			let attacker = {},
				defencer = [],
				defendSkillEnemy = []; //???????????? ?????? ??????
			let allyAction = [],
				enemyAction = [];
			//?????? ?????? ??????
			atkC = (atkOpion?.atkCount && atkOpion?.atkCount[0]) ? atkOpion?.atkCount : [...gameData.skill[skillIdx].atkCount];
			atkC[0] -= 1;
			if (timeLine[turnIdx].order.team === 'ally') { //?????? ??????
				attacker = battleAlly[timeLine[turnIdx].order.idx];
				if (atkC[1] === "another") {
					const defencerIdx = [Math.floor(Math.random()* battleEnemy.length)];
					defencer = [{
						ch: battleEnemy[defencerIdx],
						idx: defencerIdx,
					}];
					timeLine[turnIdx].order.targetIdx = [defencerIdx];
					timeLine[turnIdx].order.target = enemyPos[defencerIdx];
				} else {
					if (atkC[1] === "randomCount") {
						atkS ++;
						if (Math.random() < 0.5 - atkS / 10) {
							atkC[0] ++;
						} else {
							atkC[0] --;
						}
					}
					defencer = timeLine[turnIdx].order.targetIdx.map((data) => {
						return {
							ch: battleEnemy[data],
							idx: data,
						}
					});
				}
				timeLine.forEach((data) => {
					if (data.order.team === 'enemy'){
						//console.log(dIdx + '?????? ?????????');
						timeLine[turnIdx].order.targetIdx.forEach((tarIdx) => {
							if (tarIdx === data.order.idx) {
								defendSkillEnemy[data.order.idx] = {
									idx: data.order.idx,
									type: data.order.skIdx,
								}
								if (data.order.skIdx === 2) { //??????
									enemyAction[data.order.idx] = 'defence0';
								} else if (data.order.skIdx === 14) { //????????????
									enemyAction[data.order.idx] = 'defence1'; 
								} else if (data.order.skIdx === 13) { //????????????
									enemyAction[data.order.idx] = 'defence2'; 
								} else if (data.order.skIdx === 15) { //???????????? ??????
									enemyAction[data.order.idx] = 'defenceTree'; 
								}
							}
						});
					}
				});
			} else { //?????? ??????
				attacker = battleEnemy[timeLine[turnIdx].order.idx];
				if (atkC[1] === "another") {
					const defencerIdx = [Math.floor(Math.random()* battleAlly.length)];
					defencer = [{
						ch: battleAlly[defencerIdx],
						idx: defencerIdx,
					}];
					timeLine[turnIdx].order.targetIdx = [defencerIdx];
					timeLine[turnIdx].order.target = allyPos[defencerIdx].pos;
				} else {
					if (atkC[1] === "randomCount") {
						atkS ++;
						if (Math.random() < 0.5 - atkS / 10) {
							atkC[0] ++;
						} else {
							atkC[0] --;
						}
					}
					defencer = timeLine[turnIdx].order.targetIdx.map((data) => {
						return {
							ch: battleAlly[data],
							idx: data,
						}
					});
				}
				timeLine.forEach((data) => {
					if (data.order.team === 'ally'){
						//console.log(dIdx + '?????? ?????????');
						timeLine[turnIdx].order.targetIdx.forEach((tarIdx) => {
							if (tarIdx === data.order.idx) {
								defendSkillEnemy[data.order.idx] = {
									idx: data.order.idx,
									type: data.order.skIdx,
								}
								if (data.order.skIdx === 2) { //??????
									allyAction[data.order.idx] = 'defence0';
								} else if (data.order.skIdx === 14) { //????????????
									allyAction[data.order.idx] = 'defence1'; 
								} else if (data.order.skIdx === 13) { //????????????
									allyAction[data.order.idx] = 'defence2'; 
								} else if (data.order.skIdx === 15) { //???????????? ??????
									allyAction[data.order.idx] = 'defenceTree'; 
								}
							}
						});
					}
				});
			}
			let turnIdx_ = turnIdx;
			if (atkC[0] <= 0) {
				turnIdx_ = turnIdx + 1;
				atkS = 0;
			}
			//console.log('pgs', defencer);
			//????????? ??????
			let dmg = [],
				elementDmg = 0;
			let totalDmg = 0;
			const skType = gameData.skill[timeLine[turnIdx].order.skIdx].element_type;//????????????
			const chance = Math.random();
			const team = timeLine[turnIdx].order.team === 'ally' ? enemyAction : allyAction;
			let criticalAtk = false;
			let avoid = false;
			defencer.forEach((defData, dIdx) => {
				const defEnemy = defData.ch;
				if (defEnemy.state !== 'die') { //?????? ????????? ??????
					//?????? ????????? ?????? ?????? ??????
					if (skType < 7) {//??????????????????
						const hitChance =  Math.min((80 + 30 * (attacker.spd - defEnemy.spd) / 100 + 20 * (attacker.stateLuk - defEnemy.stateLuk) / 100) / 100, 0.95); //?????? ?????? ??????
						if (team[defData.idx] === undefined || team[defData.idx].indexOf('defence0') < 0) { //????????? ????????????
							// console.log("pgs", chance, hitChance);
							if (chance < hitChance) {
								const criticalChance = Math.random();
								const critical = Math.max(15 * (attacker.spd - defEnemy.spd) / 100 + 20 * (attacker.stateLuk - defEnemy.stateLuk) / 100, 0.1);//????????? ?????? ??????
								if (criticalChance < critical) {
									criticalAtk = true;
									team[defData.idx] = team[defData.idx] + ' dmgCri'
								} else {
									team[defData.idx] = team[defData.idx] + ' dmg'
								}
							} else {
								const avoidNum = Math.floor(Math.random()*4);//?????? ??????
								avoid = true;
								team[defData.idx] = 'avoid' + avoidNum;
							}
						} else { //defence??? ?????????
							const criticalChance = Math.random();
							const critical = Math.max(15 * (attacker.spd - defEnemy.spd) / 100 + 20 * (attacker.stateLuk - defEnemy.stateLuk) / 100, 0.1);//????????? ?????? ??????
							if (criticalChance < critical) {
								criticalAtk = true;
								team[defData.idx] = team[defData.idx] + ' dmgCri'
							} else {
								team[defData.idx] = team[defData.idx] + ' dmg'
							}
						}
					} else {
						const magicChance = Math.min((60 + 20 * (attacker.spd - defEnemy.spd) / 100) /100, 0.9); //?????? ?????? ??????
						if (team[defData.idx] === undefined || team[defData.idx].indexOf('defence2') < 0) { //??????????????? ????????????
							if (chance < magicChance) {
								const criticalChance = Math.random();
								const critical = Math.max(15 * (attacker.spd - defEnemy.spd) / 100 + 20 * (attacker.stateLuk - defEnemy.stateLuk) / 100, 0.1);//????????? ?????? ??????
								if (criticalChance < critical) {
									criticalAtk = true;
									team[defData.idx] = team[defData.idx] + ' dmgCri'
								} else {
									team[defData.idx] = team[defData.idx] + ' dmg';
								}
							} else {
								const avoidNum = Math.floor(Math.random()*4);//?????? ??????
								avoid = true;
								team[defData.idx] = 'avoid' + avoidNum;
							}
						} else { //??????????????? ?????????
							const criticalChance = Math.random();
							const critical = Math.max(15 * (attacker.spd - defEnemy.spd) / 100 + 20 * (attacker.stateLuk - defEnemy.stateLuk) / 100, 0.1);//????????? ?????? ??????
							if (criticalChance < critical) {
								criticalAtk = true;
								team[defData.idx] = team[defData.idx] + ' dmgCri'
							} else {
								team[defData.idx] = team[defData.idx] + ' dmg';
							}
						}
					}
					//???????????? ??????
					//?????????(0),?????????(1),??????(2),??????(3),?????????(4),?????????(5),???(6),??????(7),???(8),???(9),??????(10),???(11)
					const elementFilter = (elementArr, idx) => {
						let elementChk = false;
						elementArr.forEach((element) => {
							if (element === idx) {
								elementChk = true;
								return;
							}
						});
						return elementChk;
					}
					switch (skType - 1) {
						case 0:
						case 1:
						case 2:
						case 3:
						case 4:
						case 5:
							elementDmg = (attacker['el'+(skType - 1)] - defEnemy['el'+(skType - 1)]) / 100 + 1;
							break;
						case 6: //???
							if (elementFilter(defEnemy.element, 7)) { //?????? ????????????
								elementDmg = (attacker['el'+(skType - 1)] * 2) / 100 + 1;
							} else {
								elementDmg = attacker['el'+(skType - 1)] / 100 + 1;
							}
							break;
						case 7: //??????
							if (elementFilter(defEnemy.element, 6)) { //??? ????????????
								elementDmg = (attacker['el'+(skType - 1)] * 2) / 100 + 1;
							} else {
								elementDmg = attacker['el'+(skType - 1)] / 100 + 1;
							}
							break;
						case 8: //???
							if (elementFilter(defEnemy.element, 9)) { //??? ????????????
								elementDmg = (attacker['el'+(skType - 1)] * 2) / 100 + 1;
							} else if (elementFilter(defEnemy.element, 11)) {//??? ????????????
								elementDmg = (attacker['el'+(skType - 1)] * 0.5) / 100 + 1;
							} else {
								elementDmg = attacker['el'+(skType - 1)] / 100 + 1;
							}
							break;
						case 9: //???
							if (elementFilter(defEnemy.element, 10)) { //?????? ????????????
								elementDmg = (attacker['el'+(skType - 1)] * 2) / 100 + 1;
							} else if (elementFilter(defEnemy.element, 8)) {//??? ????????????
								elementDmg = (attacker['el'+(skType - 1)] * 0.5) / 100 + 1;
							} else {
								elementDmg = attacker['el'+(skType - 1)] / 100 + 1;
							}
							break; //??????
						case 10:
							if (elementFilter(defEnemy.element, 11)) { //??? ????????????
								elementDmg = (attacker['el'+(skType - 1)] * 2) / 100 + 1;
							} else if (elementFilter(defEnemy.element, 9)) {//??? ????????????
								elementDmg = (attacker['el'+(skType - 1)] * 0.5) / 100 + 1;
							} else {
								elementDmg = attacker['el'+(skType - 1)] / 100 + 1;
							}
							break;
						case 11: //???
							if (elementFilter(defEnemy.element, 8)) { //??? ????????????
								elementDmg = (attacker['el'+(skType - 1)] * 2) / 100 + 1;
							} else if (elementFilter(defEnemy.element, 10)) {//?????? ????????????
								elementDmg = (attacker['el'+(skType - 1)] * 0.5) / 100 + 1;
							} else {
								elementDmg = attacker['el'+(skType - 1)] / 100 + 1;
							}
							break;
						default:
							break;
					}
					elementDmg = elementDmg <= 1 ? 1 : elementDmg;
					//?????? ????????? ??????
					//skill dmg
					let dmg_ = 0,
						atkNum = {},
						defNum = {},
						sk = {},
						attackType = 0,
						defenceType = 0;
					if (skType < 7) {//????????????
						attackType = 'atk';
						defenceType = 'def';
					} else {//????????????
						attackType = 'mak';
						defenceType = 'mdf';
					}
					defendSkillEnemy.forEach((defEnemy_, idx) => {
						const chkIdx = defEnemy_.idx;
						if (chkIdx === 2) {
							sk = defEnemy.sk.filter((skData) => {
								if (skData.idx === 2) {
									return skData;
								};
							});
						} else if (chkIdx === 13) {
							sk = defEnemy.sk.filter((skData) => {
								if (skData.idx === 13) {
									return skData;
								};
							});	
						} else if (chkIdx === 14) {
							sk = defEnemy.sk.filter((skData) => {
								if (skData.idx === 14) {
									return skData;
								};
							});	
						} else if (chkIdx === 15) {
							sk = defEnemy.sk.filter((skData) => {
								if (skData.idx === 15) {
									return skData;
								};
							});	
						}
					});
					if (Object.keys(sk).length !== 0) {
						gameData.skill[sk[0].idx].eff.forEach((skData) => {
							const stateName = util.getStateName(skData.type).toLocaleLowerCase();
							const skill = sk[0].lv > 5 ? 5 : sk[0].lv;
							defNum[stateName] = util.getPercentNumber(skData.num[skill - 1], defEnemy[stateName]);
						})
					} else {
						defNum = defEnemy;
					}
					const attackerSkill = attacker.sk.filter((skData) => {
						return skData.idx === timeLine[turnIdx].order.skIdx;
					});
					gameData.skill[attackerSkill[0].idx].eff.forEach((skData) => {
						const stateName = util.getStateName(skData.type).toLocaleLowerCase();
						const skill = attackerSkill[0].lv > 5 ? 5 : attackerSkill[0].lv;
						atkNum[stateName] = util.getPercentNumber(skData.num[skill - 1], attacker[stateName]);
					});
					dmg_ = (criticalAtk ? atkNum[attackType] * elementDmg * 2 : atkNum[attackType] * elementDmg) - (defNum[defenceType] || defEnemy[defenceType]);
					if (avoid) {
						dmg.push('');
					} else {
						dmg.push(dmg_ < 1 ? 1 : dmg_);
						totalDmg += dmg_ < 1 ? 1 : dmg_
					}
				} else { //?????? ????????? ??????
					dmg.push('');
				}
			});
			if (typeof attacker.totalDmg === "number") {
				attacker.totalDmg += totalDmg;
			} else {
				attacker.totalDmg = totalDmg;
			}
			//atk, def, mak, mdf, spd
			//timeLine[turnIdx] ?????????
			setTimeout(() => {
				setTimeout(() => {
					setSkillMsg(true);
					setTimeout(() => {
						setSkillMsg(false);
						setTimeout(() => {
							const targets = util.getEffectArea(gameData.skill[skillIdx].ta, timeLine[turnIdx].order.target);
							let targetIdx = [],
								targetArr = [],
								targetCount = 0;
							if (timeLine[turnIdx].order.team === 'ally') { 
								defencer.forEach((data) => {
									targetIdx.push(enemyPos[data.idx]);
								});
							} else { 
								defencer.forEach((data) => {
									targetIdx.push(allyPos[data.idx].pos);
								});
							}
							targets.forEach((data, idx) => {
								let chk = false;
								targetIdx.forEach((taIdx) => {
									if (taIdx === data) {
										chk = true;
									}
								});
								if (chk) { //?????? ?????? ????????? ???????????? ??????????????? ??????
									targetArr[idx] = {
										idx:data,
										animation:gameData.skill[skillIdx].effAnimation,
										dmg:Math.floor(dmg[targetCount]),
									};
									targetCount ++;
								} else {
									targetArr[idx] = {
										idx:data,
										animation:gameData.skill[skillIdx].effAnimation,
									};
								}
							});
							if (timeLine[turnIdx].order.team === 'ally') { //?????? ?????? effect??????
								setAllyEffect([
									...targetArr,
								]);
								defencer.forEach((defData, idx) => {
									battleEnemy[defData.idx].hp -= dmg[idx];
									if (battleEnemy[defData.idx].hp < 0) {//??????
										enemyAction[defData.idx] = 'die';
										battleEnemy[defData.idx].hp = 0;
										battleEnemy[defData.idx].state = 'die';
										// console.log('die', defData.idx, battleEnemy[defData.idx].state);
									}
								});
								endGameCheck();
							} else { //?????? ?????? effect??????
								setEnemyEffect([
									...targetArr
								]);
								defencer.forEach((defData, idx) => {
									battleAlly[defData.idx].hp -= dmg[idx];
									if (battleAlly[defData.idx].hp < 0) {//??????
										allyAction[defData.idx] = 'die';
										battleAlly[defData.idx].hp = 0;
										battleAlly[defData.idx].state = 'die';
										// console.log('die', defData.idx, battleAlly[defData.idx].state);
									}
								});
								endGameCheck();
							}
							setAllyAction(allyAction);
							setEnemyAction(enemyAction);
							setTimeout(() => {
								if (timeLine[turnIdx].order.team === 'ally') {
									setAllyEffect([]);
									setEnemyAction([]);
								} else {
									setEnemyEffect([]);
									setAllyAction([]);
								}
								setTurnIdx(turnIdx_);
								actionAnimation(setTurnIdx, setSkillMsg, turnIdx_, timeLine, resetOrder, setAllyEffect, setEnemyEffect, gameData, battleAlly, battleEnemy, setting, setAllyAction, setEnemyAction, allyPos, enemyPos, modeRef, setMode, {
									atkCount: atkC,
									atkStay: atkS,
								});
							}, 1000 / gameSpd);//?????? ????????? ????????????
						}, 200 / gameSpd);
					}, 800 / gameSpd);//???????????? ?????????
				}, 200 / gameSpd);//????????? ??????
			}, 800 / gameSpd);
		}
	} else {
		resetOrder('order');
	}
}
const relationEff = (ch, effObj) => {
	let effData = [];
	effObj.forEach((eff)=>{ //??????
		if(effData[eff.type] === undefined) {
			effData[eff.type] = {percent:0, number:0};
		}
		if(eff.num.indexOf('%') > 0){
			effData[eff.type].percent = effData[eff.type].percent + parseInt(eff.num);
		}else{
			effData[eff.type].number = effData[eff.type].number + parseInt(eff.num);
		}
	});
	let effObj_ = {}
	effData.forEach((eff, idx) => {
		const state = ch['bSt'+idx];
		let effNum;
		if (eff.percent !== 0){
			effNum = Math.round(state * (eff.percent / 100));
		}else{
			effNum = eff.number;
		}
		effObj_['rtSt'+idx] = effNum;
	});
	return effObj_;
}
const relationCheck = (saveData, gameData, team, teamChk) => {
	const relation = gameData.relation;
	let rtMemberArr = [];
	team.forEach((chData) => {
		const team_ = teamChk === 'ally' ? saveData.ch[chData].idx : chData.idx;
		gameData.ch[team_].relation.forEach((rtIdx) => {
			const relationData = relation[rtIdx].member;
			if (rtMemberArr[rtIdx]) {
				return;
			} else {
				rtMemberArr[rtIdx] = {
					idx: rtIdx,
					member: [],
				}
			}
			rtMemberArr[rtIdx].member = Array.from({length: relationData.length}, () => false);
			relationData.forEach((memberIdx, mIdx) => {
				team.forEach((teamIdx, tIdx) => {
					const ii = teamChk === 'ally' ? saveData.ch[teamIdx].idx : teamIdx.idx;
					if (memberIdx === ii) {
						rtMemberArr[rtIdx].member[mIdx] = true;
						return;
					}
				});
			});
		});
	});
	let relationArr = [];
	rtMemberArr.forEach((rtData) => {
		let chkCount = 0;
		rtData.member.forEach((data) => {
			if (data === true) {
				chkCount += 1;
			};
		});
		if (chkCount === rtData.member.length) {
			relationArr.push({
				idx: rtData.idx,
				color: 'rgb(' + Math.round(Math.random()*255) + ',' + Math.round(Math.random()*255) + ',' + Math.round(Math.random()*255) + ')',
			});
		}
	});
	return relationArr;
}
const powerChk = (ally, enemy) => {
	let hp = [0,0];
	ally.forEach((data) => {
		hp[0] += data.hp;
	});
	enemy.forEach((data) => {
		hp[1] += data.hp;
	});
	const allyPercent = Math.floor((hp[0] / (hp[0] + hp[1])) * 1000) / 10;
	return {
		allyPercent: allyPercent,
		enemyPercent: 100 - allyPercent,
		allyHp: Math.floor(hp[0]),
		enemyHp: Math.floor(hp[1]),
	}
}
const getExp = (currentAlly, enemyData) => {
	let exp = 0,
		enemyHp = 0,
		hpGrade = '';
	enemyData.forEach((data) => {
		enemyHp += data.hp_;
		exp += data.grade * 4 * data.lv * 1.5;
	});
	const dmgHp = (currentAlly.totalDmg || 0) / enemyHp;
	if (dmgHp < 0.3) {
		hpGrade = "D";
		exp = exp * .4;
	} else if (dmgHp < 0.5) {
		hpGrade = "C";
		exp = exp * .6;
	} else if (dmgHp < 0.7) {
		hpGrade = "B";
		exp = exp * .8;
	} else if (dmgHp < 0.9) {
		hpGrade = "A";
		exp = exp * 1.2;
	} else {
		hpGrade = "S";
		exp = exp * 1.5;
	}
	return {
		grade: hpGrade,
		exp: exp,
	}
}
const Battle = ({
	navigate,
	saveData,
  changeSaveData,
	changePage,
	scenario,
}) => {

  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
	const setting = useContext(AppContext).setting,
		gameSpd = setting.speed;
	const scenarioDetail = gameData.scenario[scenario.country][scenario.period][scenario.title][scenario.stage] || gameData.scenario.korea.joseon2.LSS.stage[0];
	const viewScenario = saveData.scenario[scenario.country][scenario.period][scenario.title][scenario.stage];
	const [mapLand] = useState(scenarioDetail.map);
	const allyDeck = saveData.lineup.save_slot[saveData.lineup.select].entry;//????????? ????????? ??????index
	const enemyDeck = scenarioDetail.entry;
	const containerRef = useRef(null);
	const [containerW, setContainerW] = useState();
	const mapSize = 20;
	const allyOrders = useRef([]);//?????? ??????????????????
	const enemyOrders = useRef([]);//?????? ??????????????????
	const timeLine = useRef([]);//?????? ????????????
	const enemyAi = useRef([]);//?????? ??????????????????
	const currentSkill = useRef();//?????? ????????? ??????
	const currentAllyIdx = useRef(); //?????? ?????? ?????? index
	const currentEnemyIdx = useRef(); //?????? ?????? ?????? index
	currentAllyIdx.current = 0;
	currentEnemyIdx.current = 0;
	const enemyPos = useRef();//?????? ?????????
	const allyPos = useRef([]);//?????? ?????????
	const battleAlly = useRef([]);//?????? ?????????
	const	battleEnemy = useRef([]);//?????? ?????????
	const allyRelationArr = useRef();//????????????
	const enemyRelationArr = useRef();//????????????
	const relationHeight = useRef(0);//?????? ?????? ??????
	const relationCh = useRef();//?????? ????????????
	const getItem = useRef([]);//?????? ?????????
	const allySlot = useRef([]);//?????? ?????? ????????????
	const resultExp = useRef([]);//?????? ?????? ?????????
	const resultBeige = useRef([]);//?????? ????????????
	const teamPower = useRef({
		allyPercent: 50,
		enemyPercent: 50,
		allyHp: 1000,
		enemyHp: 1000,
	});//??? ??????
	const conversationData = useRef([]);//???????????????
	const conversationList = useRef([]);//?????? ??????
	const conversationCount = useRef(0);//?????? ?????? ?????????
	const conversationScrollContainer = useRef(null);//?????? ????????? ??????
	const conversationStepRef = useRef(1);
	const [allyAction, setAllyAction] = useState([]);//?????? ?????????(defence, avoid)
	const [enemyAction, setEnemyAction] = useState([]);//?????? ?????????(defence, avoid)

	const [effectArea, setEffectArea] = useState([]); //?????? ??????
	const [skillMsg, setSkillMsg] = useState(false); //???????????? on/off
	const [allyEffect, setAllyEffect] = useState([]);//?????? ????????????
	const [enemyEffect, setEnemyEffect] = useState([]);//?????? ????????????

	const [orderIdx, setOrderIdx] = useState(); //?????? ?????? ??????
	const [mode, setMode] = useState();
	const modeRef = useRef('');
	const [turnIdx, setTurnIdx] = useState(); //??????????????? ????????? ??????
	const conversationTimeout = useRef();
	const [conversationMsg, setConversationMsg] = useState();
	const relationMode = useCallback(() => {
		if (allyRelationArr.current.length > 0) { //????????? ?????????
			relationHeight.current = 35 + 20 + (20 * allyRelationArr.current.length); //???????????? + ?????? + ????????????
			setTimeout(() => {
				setMode('relation');
				setTimeout(() => {
					setOrderIdx(0);
					setMode('order');
					setTimeout(() => {
						allyRelationArr.current = '';
					}, 1300 / gameSpd);
				}, (2000 + allyRelationArr.current.length * 300) / gameSpd);
			}, 100 / gameSpd);
		} else { //????????? ?????????
			setOrderIdx(0);
			setMode('order');
		}
		//?????? ???????????? ??????
		let allyRt = [];
		allyRelationArr.current.forEach((data) => {
			gameData.relation[data.idx].member.forEach((dataIdx) => {
				allyRt[dataIdx] = {
					idx: dataIdx,
					color: data.color,
				}
			})
		});
		let enemyRt = [];
		enemyRelationArr.current.forEach((data) => {
			gameData.relation[data.idx].member.forEach((dataIdx) => {
				enemyRt[dataIdx] = {
					idx: dataIdx,
					color: data.color,
				}
			});
		});
		allyRt = allyRt.filter((element) => element != undefined);
		enemyRt = enemyRt.filter((element) => element != undefined);
		relationCh.current = {
			ally:[...allyRt],
			enemy:[...enemyRt],
		};
		setTimeout(() => {
			relationCh.current = {};
		}, 6000 / gameSpd);
	});
	const conversationInterval = useCallback(() => {
		conversationCount.current ++;
		if (conversationList.current[conversationStepRef.current - 1].txt.substr(conversationCount.current,1).indexOf("<") !== -1) {
			conversationCount.current += 5;
		}
		setConversationMsg(conversationList.current[conversationStepRef.current - 1].txt.substr(0,conversationCount.current) + "_");
		if (conversationCount.current >= conversationList.current[conversationStepRef.current - 1].txt.length) {
			clearInterval(conversationTimeout.current);
		}
	});
	useLayoutEffect(() => {
		let ally = [];
		let pos = [];
		let count = 0;
		allyDeck.filter((data, idx) => {
			if (typeof data === 'number') {
				ally.push(data);
				pos.push({
					idx: count,
					cardSlot: data,
					pos: idx
				});
				count ++;
			}
		});
		allySlot.current = [...ally];
		//?????? ??????
		const allyRelation = relationCheck(saveData, gameData, ally, 'ally');
		allyRelationArr.current = allyRelation;
		if (!viewScenario) {
			conversationData.current = gameData.scenario[scenario.country][scenario.period][scenario.title].stage[scenario.stage].conversation;
			conversationList.current.push(conversationData.current[0]);
			setMode("scenario");
			conversationCount.current = 0;
			conversationTimeout.current = setInterval(conversationInterval, 100);
		} else {
			relationMode();
		}
		ally.forEach((data, idx) => {
			const saveCh = saveData.ch[data];
			let effData;
			//?????? ??????
			allyRelation.forEach((rtData) => {
				gameData.relation[rtData.idx].member.forEach((memberIdx) => {
					if (memberIdx === data) {
						effData = relationEff(saveCh, gameData.relation[rtData.idx].eff);
						//console.log("???????????????", effData);
					}
				});
			});
			const hp = saveCh.bSt0 + saveCh.iSt0 + (effData?.rtSt0 || 0),
				rsp = saveCh.bSt2 + saveCh.iSt2 + (effData?.rtSt2 || 0),
				atk = saveCh.bSt3 + saveCh.iSt3 + (effData?.rtSt3 || 0),
				def = saveCh.bSt4 + saveCh.iSt4 + (effData?.rtSt4 || 0),
				mak = saveCh.bSt5 + saveCh.iSt5 + (effData?.rtSt5 || 0),
				mdf = saveCh.bSt6 + saveCh.iSt6 + (effData?.rtSt6 || 0),
				rcv = saveCh.bSt7 + saveCh.iSt7 + (effData?.rtSt7 || 0),
				spd = saveCh.bSt8 + saveCh.iSt8 + (effData?.rtSt8 || 0),
				luk = saveCh.bSt9 + saveCh.iSt9 + (effData?.rtSt9 || 0);
			battleAlly.current.push({
				...saveCh,
				na: gameData.ch[saveCh.idx].na1,
				hasExp:saveCh.hasExp,
				state: 'alive',
				hp: hp,
				hp_: hp,
				sp: Math.floor(saveCh.bSt1/2),
				sp_: saveCh.bSt1,
				rsp: rsp,
				atk: atk,
				def: def,
				mak: mak,
				mdf: mdf,
				rcv: rcv,
				spd: spd,
				luk: luk,
			});
		});
		allyPos.current = pos;
		let enemy = [],
			enemy_ = [],
			enemyP = [];
		enemyDeck.filter((data, idx) => {
			if (typeof data.idx === 'number') {
				enemy_.push(data);
				enemyP.push(idx);
			}
		});
		enemyPos.current = enemyP;
		const enemyRelation = relationCheck(saveData, gameData, enemy_, 'enemy');
		enemyRelationArr.current = enemyRelation;
		enemy_.forEach((data, idx) => {
			const gameCh = gameData.ch[data.idx];
			const enemyData = util.getEnemyState(data, gameData);
			const enemySkill = util.getEnemySkill(data, gameData);
			let effData;
			//?????? ??????
			enemyRelation.forEach((rtData, idx) => {
				gameData.relation[rtData.idx].member.forEach((memberIdx) => {
					if (memberIdx === data.idx) {
						effData = relationEff(enemyData, gameData.relation[rtData.idx].eff);
						//console.log("???????????????", effData);
					}
				});
			});
			const hp = enemyData.bSt0 + enemyData.iSt0 + (effData?.rtSt0 || 0),
				rsp = enemyData.bSt2 + enemyData.iSt2 + (effData?.rtSt2 || 0),
				atk = enemyData.bSt3 + enemyData.iSt3 + (effData?.rtSt3 || 0),
				def = enemyData.bSt4 + enemyData.iSt4 + (effData?.rtSt4 || 0),
				mak = enemyData.bSt5 + enemyData.iSt5 + (effData?.rtSt5 || 0),
				mdf = enemyData.bSt6 + enemyData.iSt6 + (effData?.rtSt6 || 0),
				rcv = enemyData.bSt7 + enemyData.iSt7 + (effData?.rtSt7 || 0),
				spd = enemyData.bSt8 + enemyData.iSt8 + (effData?.rtSt8 || 0);
			enemy.push({
				state: 'alive',
				...gameCh,
				...enemyData,
				lv: data.lv,
				sk: enemySkill,
				hp: hp,
				hp_: hp,
				sp: Math.floor(enemyData.bSt1/2),
				sp_: enemyData.bSt1,
				rsp: rsp,
				atk: atk,
				def: def,
				mak: mak,
				mdf: mdf,
				rcv: rcv,
				spd: spd,
			});
		});
		battleEnemy.current = enemy;
		const makeAi = () => {
			const ai = Math.random();
			if (ai < .1) {
				return 3;
			} else if (ai < .35) {
				return 2;
			} else if (ai < .6) {
				return 1;
			} else {
				return 0;
			}
		};
		enemy.forEach(() => {
			enemyAi.current.push(makeAi());
		});
		return () => {
			clearInterval(conversationTimeout.current);
		}
	}, []);
	const resetOrder = (mode) => {
		setOrderIdx(0);
		setTurnIdx('');
		allyOrders.current = [];
		timeLine.current = [];
		console.log('pgs', mode);
		modeRef.current = mode;
		setMode(mode);
	};
	const areaSelect = (e, pos) => {
		if (mode === 'area') {
			const areaArr = util.getEffectArea(currentSkill.current.ta, pos);
			let targetIdx = [];
			enemyPos.current.forEach((posIdx, idx) => {
				areaArr.forEach((actionIdx) => {
					if (posIdx === actionIdx) {
						targetIdx.push(idx);
					}
				})
			})
			setEffectArea(areaArr);
			if (e.target.classList.contains('effect')) {
				if (orderIdx < battleAlly.current.length - 1) {
					setOrderIdx((prev) => ++prev);
				} else {
					setMode('action');
				}
				allyOrders.current.push({
					team: 'ally',
					idx: orderIdx,
					skIdx: currentSkill.current.idx,
					enemyTarget: true,
					targetIdx: targetIdx,
					target: pos,
				});
				setEffectArea([]);
				if (orderIdx < battleAlly.current.length - 1) {
					setMode('order');
				} else {
					setMode('action');
					setOrderIdx('');
				}
			}
		}
	};
	const battleCommand = (skill) => {
		if (mode === 'end') {//?????? ?????????
			return;
		}
		if (mode !== 'order') {
			if (skill === 'cancel') { //?????? ??????
				setMode('order');
				setEffectArea([]);
			}
		} else {
			if (skill === 'cancel') { //?????? ??????
				if (orderIdx > 0) {
					setOrderIdx((prev) => --prev);
					allyOrders.current.pop();
				}
			} else if (skill === 'wait'){ //?????? ?????? sp ??????
				if (orderIdx < battleAlly.current.length - 1) {
					setOrderIdx((prev) => ++prev);
				} else {
					setMode('action');
					setOrderIdx('');
				}
				allyOrders.current.push({
					team: 'ally',
					idx: orderIdx,
					skIdx: 0,
				});
			} else { //?????? ??????
				const sk = gameData.skill[skill.idx];
				const skType = sk.cate[0];
				switch (skType){
					case 3: //active
						const areaArr = util.getEffectArea(sk.ta, 12);
						setEffectArea(areaArr);
						setMode('area');
						break;
					case 4: //active(??????)
						if (orderIdx < battleAlly.current.length - 1) {
							setOrderIdx((prev) => ++prev);
						} else {
							setMode('action');
							setOrderIdx('');
						}
						allyOrders.current.push({
							team: 'ally',
							idx: orderIdx,
							skIdx: sk.idx,
							enemyTarget: false,
							target: allyPos.current[orderIdx].pos,
						});
						break;
					case 5: //buff
						break;
					case 6: //debuff
						break;
					default:
						break;
				}
				currentSkill.current = sk;
			}
		}
	};
	useLayoutEffect(() => {
		if (mode === 'action') {
			timeLineSet();
			console.log(timeLine.current);
			setTurnIdx(0);
			actionAnimation(setTurnIdx, setSkillMsg, 0, timeLine.current, resetOrder, setAllyEffect, setEnemyEffect, gameData, battleAlly.current, battleEnemy.current, setting, setAllyAction, setEnemyAction, allyPos.current, enemyPos.current, modeRef.current, setMode);
		} else if (mode === 'battleWin') {
			console.log('pgs', '???!???!???!???!');
			let saveD = {...saveData};
			allySlot.current.forEach((slotIdx, idx) => {
				const hasMaxExp = gameData.hasMaxExp[saveD.ch[slotIdx].grade];
				saveD.ch[slotIdx].hasExp += resultExp.current[idx];
				switch (saveD.ch[slotIdx].battleBeige) {
					case "S":
						saveD.ch[slotIdx].battleBeige[0] += 1;
						break;
					case "A":
						saveD.ch[slotIdx].battleBeige[1] += 1;
						break;	
					case "B":
						saveD.ch[slotIdx].battleBeige[2] += 1;
						break;
					case "C":
						saveD.ch[slotIdx].battleBeige[3] += 1;
						break;
					default:
						break;
				}
				if (saveD.ch[slotIdx].hasExp > hasMaxExp) {
					saveD.ch[slotIdx].hasExp = hasMaxExp;
				}
			});
			changeSaveData(saveD);
		} else if (mode === 'battleLose') {
			console.log('pgs', '???!???!???!???!');
		}
	}, [mode]);
	useLayoutEffect(() => {
		teamPower.current = powerChk(battleAlly.current, battleEnemy.current);
	}, [turnIdx]);
	useLayoutEffect(() => {
		if (allyPos.current[orderIdx]) {
			if (battleAlly.current[allyPos.current[orderIdx].idx].state === "die") {
				allyOrders.current.push({
					team: 'ally',
					idx: orderIdx,
					skIdx: 0,
				});
				setOrderIdx((prev) => ++prev);
			}
		}
	}, [orderIdx]);
	const timeLineSet = useCallback(() => {
		enemyOrders.current = enemyPattern(enemyAi.current, battleAlly.current, allyPos.current, battleEnemy.current, gameData);
		let allyEnemy = [];
		battleAlly.current.forEach((data, idx) => {
			allyEnemy.push({
				idx: idx,
				team: 'ally',
				spd: data.spd,
				state: data.state,
			});
		});
		battleEnemy.current.forEach((data, idx) => {
			allyEnemy.push({
				idx: idx,
				team: 'enemy',
				spd: data.spd,
				state: data.state,
			});
		});
		allyEnemy.sort((a, b) => {
			return b.spd - a.spd;
		});
		allyEnemy.forEach((data, idx) => {
			if (data.team === 'ally'){
				timeLine.current.push({
					order: allyOrders.current[data.idx],
					state: data.state,
				});
			} else {
				timeLine.current.push({
					order: enemyOrders.current[data.idx],
					state: data.state,
				});
			}
		});
	}, [battleAlly.current, battleEnemy.current]);
	useLayoutEffect(() => {
		setContainerW(containerRef.current.getBoundingClientRect().height * 0.5 - 25);
	}, [containerRef.current]);
	const map = [
		{idx:0,},
		{idx:1,},
		{idx:2,},
		{idx:3,},
		{idx:4,},
		{idx:5,},
		{idx:6,},
		{idx:7,},
		{idx:8,},
		{idx:9,},
		{idx:10,},
		{idx:11,},
		{idx:12,},
		{idx:13,},
		{idx:14,},
		{idx:15,},
		{idx:16,},
		{idx:17,},
		{idx:18,},
		{idx:19,},
		{idx:20,},
		{idx:21,},
		{idx:22,},
		{idx:23,},
		{idx:24,},
	];
  return (
    <>
			<BattleHeader className="header battle_header" iconBack={imgSet.icon.iconBack}>
				<ul>
          <li className="back"><span className="ico" onClick={() => {
            navigate('/');
            changePage("main");
          }}></span></li>
				</ul>
				<div className="battle_title" flex-h-center="true">
					<div className="scenario_title">{scenarioDetail.title}</div>
					<div className="team_summary">
						<div style={{width: teamPower.current.allyPercent+"%"}}className="ally_team gradient_dark"></div>
						<div style={{width: teamPower.current.enemyPercent+"%"}} className="enemy_team gradient_dark"></div>
						<TeamIcon style={{left: teamPower.current.allyPercent+"%"}} className="team_bullet" iconImg={imgSet.element[13]}></TeamIcon>
						<div className="ally_power">{teamPower.current.allyHp}</div>
						<div className="enemy_power">{teamPower.current.enemyHp}</div>
					</div>
				</div>
			</BattleHeader>
			{mode === "scenario" && (
				<div ref={conversationScrollContainer} className="battle_scenario scroll-y" onClick={() => {
					setTimeout(() => {
						if (conversationScrollContainer.current) {
							conversationScrollContainer.current.scrollTo(0,10000);
						}
					}, 150);
					if (conversationStepRef.current > conversationData.current.length - 1) {
						relationMode();
						return;
					}
					let conversationClone = conversationData.current[conversationStepRef.current];
					if (conversationData.current[conversationStepRef.current].idx === "") {
						conversationClone.idx = battleAlly.current[Math.floor(Math.random() * battleAlly.current.length)].idx;
					}
					conversationStepRef.current ++;
					conversationList.current.push(conversationClone);
					
					clearInterval(conversationTimeout.current);
					conversationCount.current = 0;
					conversationTimeout.current = setInterval(conversationInterval, 100);
				}}>
					{conversationList.current.map((data, idx) => {
						const chData = gameData.ch[data.idx];
						return idx <= conversationStepRef.current && (
						<div key={idx} className={`scenario_box ${data.pos} ${data.team}`} flex-center="true">
								<div className="scenario_ch">
									<CardChRing className="ring_back" ringBack={imgSet.etc.imgRingBack} ringDisplay={imgSet.ringImg[chData?.element]} ringDisplay1={imgSet.sringImg[chData?.element]} />
									<CardCh className="ch_style" chDisplay={imgSet.chImg[`ch${chData?.display}`]} />
									<div className="ch_name">{chData?.na1}</div>
								</div>
								{idx === conversationStepRef.current - 1 && (
									<div className="scenario_talk" dangerouslySetInnerHTML={{__html: conversationMsg}} />
								)}
								{idx < conversationStepRef.current - 1 && (
									<div className="scenario_talk" dangerouslySetInnerHTML={{__html: conversationList.current[idx].txt}} />
								)}
						</div>
						)
					})}
				</div>
			)}
			{mode === "battleWin" && (
				<div className="battle_end" onClick={() => {
					navigate('/');
					changePage("main");
				}} flex-h-center="true">
					<div className="battle_title">???!???!???!???!</div>
					<div className="battle_result_ch" flex-h-center="true">
						{battleAlly.current && battleAlly.current.map((allyData, idx) => {
							const chData = gameData.ch[allyData.idx];
							const battleGrade = getExp(allyData, battleEnemy.current);
							resultExp.current[idx] = battleGrade.exp;
							resultBeige.current[idx] = battleGrade.grade;
							const exp = [allyData.hasExp, gameData.hasMaxExp[allyData.grade]];
							return (
								<div className="battle_end_ch" key={idx} flex-center="true">
									<div className="end_ch">
										<CardChRing className="ring_back" ringBack={imgSet.etc.imgRingBack} ringDisplay={imgSet.ringImg[chData?.element]} ringDisplay1={imgSet.sringImg[chData?.element]} lv={allyData.lv} gameSpd={gameSpd} />
										<CardCh className="ch_style" chDisplay={imgSet.chImg[`ch${chData?.display}`]} />
										<CardRingStyle className="ring_style" ringDisplay={imgSet.ssringImg[chData?.element]} lv={allyData.lv} gameSpd={gameSpd}>
											<span className="ch_ring transition" />
										</CardRingStyle>
									</div>
									<div className="battle_end_contribution" flex-h-center="true">
										<div className="battle_end_hpexp" flex-center="true">
												<div className="battle_end_hp"><span>?????????:</span><span className="num">{Math.round(allyData.totalDmg) || 0}</span></div>
												<div className="battle_end_exp"><span>?????????:</span><span className="num">{battleGrade.exp}</span></div>
												<div className="battle_end_grade">{battleGrade.grade}</div>
										</div>
										<div className="battle_end_expBar">
											<div className="bar"><em className="gradient_dark transition" style={{width:exp[1] / exp[0]}}></em></div>
											<div className="txt">{exp[0]} / {exp[1]}</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
					<div className="battle_result_item" flex-center="true">
						?????? ?????????
						{getItem.current && getItem.current.map((item, idx) => {
							const itData = gameData.item[item.idx];
							return (
								<div key={idx}>?????????</div>
							)
						})}
					</div>
				</div>
			)}
			{mode === "battleLose" && (
				<div className="battle_end" onClick={() => {
					navigate('/');
					changePage("main");
				}} flex-h-center="true">
					<div className="battle_title">????????????</div>
				</div>
			)}
      <BattleWarp className={`battle_wrap ${mode}`} backImg={imgSet.back[1]}>
				<BgEffect className={`bgEffect ${mode === "action" ? "action" : ""}`} img1={imgSet.bgEffect[0]} img2={imgSet.bgEffect[1]} gameSpd={gameSpd}>
					<div className="cloud1"></div>
					<div className="cloud2"></div>
				</BgEffect>
				{allyRelationArr.current && (
					<RelationArea className={`relation_area ${mode === "relation" ? "on" : ""}`} rtHeight={relationHeight.current} gameSpd={gameSpd}>
						<div className="relationTitle"><span>???!</span><span>???!</span><span>???!</span><span>???!</span></div>
						{allyRelationArr.current.map((rtData, idx) => {
							const rtName = gameData.relation[rtData.idx].na;
							return (
								<RelationName key={idx} className="relationName" idx={idx} color={rtData.color} gameSpd={gameSpd}>{rtName}</RelationName>
							)
						})}
					</RelationArea>
				)}
				<BattleArea ref={containerRef} className={`battle_area ${mode === "action" ? "action" : ""}`} mode={mode} frameLeft={imgSet.etc.frameLeft} frameRight={imgSet.etc.frameRight}>
					<BattleEffect containerW={containerW} className="battle_effect">
						<div className="land_enemy">
						{map.map((data, idx) => {
							const left = idx % 5 * mapSize,
								top = Math.floor(idx / 5) * mapSize;
							let effectChk = false,
								effAnimation = '',
								effNum = '';
							allyEffect.forEach((effData) => {
								if (effData.idx === idx) {
									effectChk = true;
									effAnimation = effData.animation;
									effNum = effData.dmg;
								}
							});
							const effChk = effNum && effNum !== 0;
							return (
								<EffLand key={idx} className={`effect_land ${effChk ? 'dmg' : ''}`} left={left} top={top} gameSpd={gameSpd}>
									{effectChk && (
										<>
											<Eff className="effect_eff" src={imgSet.eff[effAnimation]} frame={gameData.effect[effAnimation].frame} repeat={gameData.effect[effAnimation].repeat} gameSpd={gameSpd}/>
										</>
									)}
									<span className="dmgNum">{effChk ? effNum : ''}</span>
								</EffLand>
							);
						})}
						</div>
						<div className={`turnLine ${mode === 'action' ? 'on' : ''}`}></div>
						<div className="land_ally">
						{map.map((data, idx) => {
							const left = idx % 5 * mapSize,
								top = Math.floor(idx / 5) * mapSize;
							let effectChk = false,
								effAnimation = '',
								effNum = '';
							enemyEffect.forEach((effData) => {
								if (effData.idx === idx) {
									effectChk = true;
									effAnimation = effData.animation;
									effNum = effData.dmg;
								}
							});
							const effChk = effNum && effNum !== 0;
							return (
								<EffLand className={`effect_land ${effChk ? 'dmg' : ''}`} key={idx} left={left} top={top} gameSpd={gameSpd}>
									{effectChk && (
										<>
											<Eff className="effect_eff" src={imgSet.eff[effAnimation]} frame={gameData.effect[effAnimation].frame} repeat={gameData.effect[effAnimation].repeat} gameSpd={gameSpd}/>
										</>
									)}
									<span className="dmgNum">{effChk ? effNum : ''}</span>
								</EffLand>
							)
						})}
						</div>
					</BattleEffect>
					<BattleUnit containerW={containerW} className="battle_units" frameImg={imgSet.etc.frameRope}>
						<div className="units_enemy">
							{battleEnemy.current && enemyDeck.map((enemyData, idx)=> {
								const left = idx % 5 * mapSize,
									top = Math.floor(idx / 5) * mapSize,
									area = chkString(effectArea, idx);
								let rtCh = '';
								relationCh.current?.enemy?.forEach((rtch) => {
									if (rtch.idx === enemyData.idx) {
										rtCh = "relation";
									}
								});
								const element_type = currentSkill.current ? currentSkill.current.element_type : "";
								if (enemyData.idx) {
									const chData = gameData.ch[enemyData.idx];
									const enemyCh = battleEnemy.current[currentEnemyIdx.current];
									const hasHp = (enemyCh?.hp / enemyCh?.hp_) * 100;
									const elementCh = area ? "effect" + element_type : "";
									let actionCh = '';
									if (typeof turnIdx === "number" && timeLine.current && timeLine.current[turnIdx]?.order.team === "enemy" && currentEnemyIdx.current === timeLine.current[turnIdx]?.order.idx) {
										actionCh = "action";
									}
									const die = enemyCh?.state || "";
									const actionPos = enemyAction[currentEnemyIdx.current] || "";
									currentEnemyIdx.current ++;
									return (
										<BattleCh key={idx} className={`battle_ch effect ${elementCh} ${actionCh} ${rtCh} ${actionPos} ${die}`} data-ch={chData?.display} data-idx={idx} left={left} top={top} size={mapSize} onClick={(e) => {
											areaSelect(e, idx);
										}} gameSpd={gameSpd} defenceIcon0={imgSet.actionIcon[0]} defenceIcon1={imgSet.actionIcon[1]} defenceIcon2={imgSet.actionIcon[2]} tombstone={imgSet.actionIcon[3]}>
											<div className="ch_box">
												<CardChRing className="ring_back" ringBack={imgSet.etc.imgRingBack} ringDisplay={imgSet.ringImg[chData?.element]} ringDisplay1={imgSet.sringImg[chData?.element]} lv={enemyData.lv} gameSpd={gameSpd} />
												<CardCh className="ch_style" chDisplay={imgSet.chImg[`ch${chData?.display}`]} />
												<CardRingStyle className="ring_style" ringDisplay={imgSet.ssringImg[chData?.element]} lv={enemyData.lv} gameSpd={gameSpd}>
													<span className="ch_ring transition" />
												</CardRingStyle>
												<div className="hpsp">
													<span className="hp"><em className="gradient_light" style={{width: hasHp + '%'}}></em></span>
												</div>
											</div>
											<div className="dmg"></div>
										</BattleCh>
									);
								} else {
									return (
										<BattleCh key={idx} className={`battle_ch effect ${area ? "effect" + element_type : ""}`} data-idx={idx} left={left} top={top} size={mapSize} onClick={(e) => {
											areaSelect(e, idx);
										}}>
											<div className="ch_box"></div>
										</BattleCh>
									);
								}
							})}
						</div>
						<div className={`turnLine ${mode === 'action' ? 'on' : ''}`}>
							{timeLine.current && timeLine.current.map((data, idx) => {
								const chData = data.order.team === 'ally' ? gameData.ch[battleAlly.current[data.order.idx]?.idx] : gameData.ch[battleEnemy.current[data.order.idx]?.idx];
								const activeSkill = activeSk(data);// die ??? active?????? ?????? 0??????,2??????,13????????????
								return (
									<TimeLineCh key={idx} className={`battle_ch timeLine ${turnIdx === idx ? 'on' : ''} ${activeSkill}`} team={data.order.team} size={30} defenceIcon0={imgSet.actionIcon[0]} defenceIcon1={imgSet.actionIcon[1]} defenceIcon2={imgSet.actionIcon[2]} tombstone={imgSet.actionIcon[3]} gameSpd={gameSpd}>
										<CardChRing style={{top:0,borderRadius:'50%',}} className="ring_back" ringBack={imgSet.etc.imgRingBack} ringDisplay={imgSet.ringImg[chData?.element]} ringDisplay1={imgSet.sringImg[chData?.element]} />
										<CardCh className="ch_style" chDisplay={imgSet.chImg[`ch${chData?.display}`]} />
									</TimeLineCh>
								)
							})}
						</div>
						<div className="units_ally">
							{battleAlly.current && allyDeck.map((allyData, idx)=> {
								const left = idx % 5 * mapSize,
									top = Math.floor(idx / 5) * mapSize;
								if (typeof allyData === "number") {
									const saveCh = battleAlly.current[currentAllyIdx.current];
									const chData = gameData.ch[saveCh?.idx];
									let rtCh = '';
									let rtColor;
									relationCh.current?.ally?.forEach((rtch) => {
										if (rtch.idx === saveCh.idx) {
											rtCh = "relation";
											rtColor = rtch.color;
										}
									});
									const hasHp = (saveCh?.hp / saveCh?.hp_) * 100,
										hasSp = (saveCh?.sp / saveCh?.sp_) * 100;
									const posCh = (typeof orderIdx === "number" && allyPos.current[orderIdx]?.idx === currentAllyIdx.current) ? "on" : "";
									let actionCh = "";
									if (typeof turnIdx === "number" && timeLine.current && timeLine.current[turnIdx]?.order.team === "ally" && currentAllyIdx.current === timeLine.current[turnIdx]?.order.idx) {
										actionCh = "action";
									}
									const die = saveCh?.state || "";
									const actionPos = allyAction[currentAllyIdx.current] || "";
									currentAllyIdx.current ++;
									return (
										<BattleCh key={idx} className={`battle_ch ${posCh} ${actionCh} ${rtCh} ${actionPos} ${die}`} data-ch={chData?.display} data-idx={idx} left={left} top={top} size={mapSize} rtColor={rtColor}  gameSpd={gameSpd} defenceIcon0={imgSet.actionIcon[0]} defenceIcon1={imgSet.actionIcon[1]} defenceIcon2={imgSet.actionIcon[2]} tombstone={imgSet.actionIcon[3]}>
											<div className="ch_box">
												<CardChRing className="ring_back" ringBack={imgSet.etc.imgRingBack} ringDisplay={imgSet.ringImg[chData?.element]} ringDisplay1={imgSet.sringImg[chData?.element]} lv={saveCh?.lv} />
												<CardCh className="ch_style" chDisplay={imgSet.chImg[`ch${chData?.display}`]} />
												<CardRingStyle className="ring_style" ringDisplay={imgSet.ssringImg[chData?.element]} lv={saveCh?.lv} gameSpd={gameSpd}>
													<span className="ch_ring transition" />
												</CardRingStyle>
												<div className="hpsp">
													<span className="hp"><em className="gradient_light" style={{width: hasHp + '%'}}></em></span>
													<span className="sp"><em className="gradient_light" style={{width: hasSp + '%'}}></em></span>
												</div>
											</div>
											<div className="dmg"></div>
										</BattleCh>
									);
								} else {
									return (
										<BattleCh key={idx} className="battle_ch" data-idx={idx} left={left} top={top} size={mapSize}>
											<div className="ch_box"></div>
										</BattleCh>
									);
								}
							})}
						</div>
					</BattleUnit>
					<BattleLand containerW={containerW} className={`battle_land ${mode === "relation" ? "" : "ready"}`} gameSpd={gameSpd}>
						<div className="land_enemy">
						{map.map((data, idx) => {
							const left = idx % 5 * mapSize,
								top = Math.floor(idx / 5) * mapSize;
							return (
								<Land key={idx} className="land" landImg={imgSet.land[mapLand[idx]]} left={left} top={top}></Land>
							);
						})}
						</div>
						<div className={`turnLine ${mode === 'action' ? 'on' : ''}`}></div>
						<div className="land_ally">
						{map.map((data, idx) => {
							const left = idx % 5 * mapSize,
								top = Math.floor(idx / 5) * mapSize;
							return (
								<Land key={idx} className="land" landImg={imgSet.land[mapLand[idx + 25]]} left={left} top={top}></Land>
							);
						})}
						</div>
					</BattleLand>
					<BattleOrder className={`battle_order ${skillMsg ? 'on' : ''} ${typeof turnIdx === 'number' && timeLine.current[turnIdx]?.order.team === 'ally' ? 'ally' : 'enemy'} ${typeof turnIdx === 'number' && gameData.ch[timeLine.current[turnIdx]?.order.idx]?.face_d}`} gameSpd={gameSpd}>
						<div className="battle_msg">
							{typeof turnIdx === 'number' && gameData.skill[timeLine.current[turnIdx]?.order.skIdx]?.na}
						</div>
					</BattleOrder>
				</BattleArea>
				{battleAlly.current ?
					<>
						<BattleMenu className="battle_menu" mode={mode} gameSpd={gameSpd}>
							{typeof orderIdx === 'number' && (
								<>
									<div className="chInfo">
										<span className="sp">{battleAlly.current[orderIdx]?.sp}</span>
										<span className="spR">{battleAlly.current[orderIdx]?.bSt2}</span>
									</div>
									<ul className="scroll-x">
										<li><button onClick={() => {
											battleCommand('cancel');
										}}><span>??????</span></button></li>
										<li><button onClick={() => {
											battleCommand('wait');
										}}><span>??????</span></button></li>
										{battleAlly.current[orderIdx]?.sk && battleAlly.current[orderIdx]?.sk.map((data, idx) => {
											const sk = gameData.skill;
											if (sk[data.idx].cate[0] !== 1) {
												return (
													<li key={idx}><button onClick={() => {
														battleCommand(sk[data.idx]);
													}}><span className="skSp">{sk[data.idx].sp}</span><span className="skName">{sk[data.idx].na}</span></button></li>
												);
											}
										})}
									</ul>
								</>
							)}
						</BattleMenu>
					</> : ""
				}
			</BattleWarp>
    </>
  );
}

export default Battle;
