import React, { useRef, useState, useContext, useLayoutEffect, useCallback } from 'react';
import { AppContext } from 'App';
import styled from 'styled-components';
import { util } from 'components/Libs';
import 'css/battle.css';
import 'css/battleAnimation.css';

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
	background-image:${({chDisplay, styleDisplay}) => {
		return `url(${styleDisplay}), url(${chDisplay})`;
	}};background-position:center 5%, center -70%;
	background-size:90%, 75%;
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
	}); //allyPos[hpArray[0].idx] 약한캐릭
	let aliveAlly = [];
	battleAlly.forEach((allyData, idx) => {
		if (allyData.state === "alive") {
			aliveAlly.push(idx);
		}
	});
	enemy.forEach((data, idx) => {
		const enemyAi = ai[idx];
		const skillList = activeSkillSorting(data.sk);
		const activeChance = [0.75, 0.8, 0.85, 0.9, 0.9]; //active스킬 확률
		const normalAttackChance = [0.3, 0.2, 0.15, 0.15, 0.1]; //일반공격 확률
		const weakAttackChance = [0, 0.2, 0.4, 0.6, 0.8]; //약한적 공격 확률
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
			case 0: //대기
				return "none wait";
				break;
			case 2: //방어
				return "none defence0";
				break;
			case 13: //철벽방어
				return "none defence1";
				break;
			case 14: //마법방어
				return "none defence2";
				break;
			case 15: //나무뒤에 숨기
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

const actionAnimation = (setTurnIdx, setSkillMsg, turnIdx, timeLine, resetOrder, setAllyEffect, setEnemyEffect, gameData, battleAlly, battleEnemy, setting, setAllyAction, setEnemyAction, allyPos, enemyPos, modeRef, setMode) => {
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
		const turnIdx_ = turnIdx + 1;
		let skillIdx = timeLine[turnIdx].order.skIdx;// {team: 'enemy', idx: 0, skIdx: 0, target: 3}
		//console.log('pgs', timeLine, turnIdx);
		if (timeLine[turnIdx].order.team === 'ally') {//죽은 상태인지
			if (battleAlly[timeLine[turnIdx].order.idx].state === 'die') {
				skillIdx = 0;
			}
		} else {
			if (battleEnemy[timeLine[turnIdx].order.idx].state === 'die') {
				skillIdx = 0;
			}
		}
		if (skillIdx === 0){ //대기
			setTurnIdx(turnIdx_);
			actionAnimation(setTurnIdx, setSkillMsg, turnIdx_, timeLine, resetOrder, setAllyEffect, setEnemyEffect, gameData, battleAlly, battleEnemy, setting, setAllyAction, setEnemyAction, allyPos, enemyPos, modeRef, setMode);
		} else if (skillIdx === 2 || skillIdx === 13) { //방어, 철벽방어
			setTurnIdx(turnIdx_);
			actionAnimation(setTurnIdx, setSkillMsg, turnIdx_, timeLine, resetOrder, setAllyEffect, setEnemyEffect, gameData, battleAlly, battleEnemy, setting, setAllyAction, setEnemyAction, allyPos, enemyPos, modeRef, setMode);
		} else {
			let attacker = {},
				defencer = [],
				defendSkillEnemy = []; //방어종류 시전 캐릭
			let allyAction = [],
				enemyAction = [];
			if (timeLine[turnIdx].order.team === 'ally') { //아군 공격
				attacker = battleAlly[timeLine[turnIdx].order.idx];
				// defencer = battleEnemy[timeLine[turnIdx].targetIdx];
				defencer = timeLine[turnIdx].order.targetIdx.map((data) => {
					return {
						ch: battleEnemy[data],
						idx: data,
					}
				});
				timeLine.forEach((data) => {
					if (data.order.team === 'enemy'){
						//console.log(dIdx + '적군 방어중');
						timeLine[turnIdx].order.targetIdx.forEach((tarIdx) => {
							if (tarIdx === data.order.idx) {
								defendSkillEnemy[data.order.idx] = {
									idx: data.order.idx,
									type: data.order.skIdx,
								}
								if (data.order.skIdx === 2) { //방어
									enemyAction[data.order.idx] = 'defence0';
								} else if (data.order.skIdx === 14) { //마법방어
									enemyAction[data.order.idx] = 'defence1'; 
								} else if (data.order.skIdx === 13) { //철벽방어
									enemyAction[data.order.idx] = 'defence2'; 
								} else if (data.order.skIdx === 15) { //나무뒤에 숨기
									enemyAction[data.order.idx] = 'defenceTree'; 
								}
							}
						});
					}
				});
			} else { //적군 공격
				attacker = battleEnemy[timeLine[turnIdx].order.idx];
				// defencer = battleAlly[timeLine[turnIdx].targetIdx];
				defencer = timeLine[turnIdx].order.targetIdx.map((data) => {
					return {
						ch: battleAlly[data],
						idx: data,
					}
				});
				timeLine.forEach((data) => {
					if (data.order.team === 'ally'){
						//console.log(dIdx + '적군 방어중');
						timeLine[turnIdx].order.targetIdx.forEach((tarIdx) => {
							if (tarIdx === data.order.idx) {
								defendSkillEnemy[data.order.idx] = {
									idx: data.order.idx,
									type: data.order.skIdx,
								}
								if (data.order.skIdx === 2) { //방어
									allyAction[data.order.idx] = 'defence0';
								} else if (data.order.skIdx === 14) { //마법방어
									allyAction[data.order.idx] = 'defence1'; 
								} else if (data.order.skIdx === 13) { //철벽방어
									allyAction[data.order.idx] = 'defence2'; 
								} else if (data.order.skIdx === 15) { //나무뒤에 숨기
									allyAction[data.order.idx] = 'defenceTree'; 
								}
							}
						});
					}
				});
			}
			//console.log('pgs', defencer);
			//데미지 공식
			let dmg = [];
			const skType = gameData.skill[timeLine[turnIdx].order.skIdx].element_type;//스킬종류
			const chance = Math.random();
			const team = timeLine[turnIdx].order.team === 'ally' ? enemyAction : allyAction;
			let criticalAtk = false;
			let avoid = false;
			defencer.forEach((defData, dIdx) => {
				const defEnemy = defData.ch;
				if (defEnemy.state !== 'die') { //적이 살았을 경우
					if (skType < 7) {//물리공격인지
						const hitChance =  Math.min((80 + 30 * (attacker.spd - defEnemy.spd) / 100 + 20 * (attacker.stateLuk - defEnemy.stateLuk) / 100) / 100, 0.95); //물리 적중 확률
						if (team[defData.idx] === undefined || team[defData.idx].indexOf('defence0') < 0) { //방어를 안했으면
							// console.log("pgs", chance, hitChance);
							if (chance < hitChance) {
								const criticalChance = Math.random();
								const critical = Math.max(15 * (attacker.spd - defEnemy.spd) / 100 + 20 * (attacker.stateLuk - defEnemy.stateLuk) / 100, 0.1);//치명타 확률 계산
								if (criticalChance < critical) {
									criticalAtk = true;
									team[defData.idx] = team[defData.idx] + ' dmgCri'
								} else {
									team[defData.idx] = team[defData.idx] + ' dmg'
								}
							} else {
								const avoidNum = Math.floor(Math.random()*4);//회피 종류
								avoid = true;
								team[defData.idx] = 'avoid' + avoidNum;
							}
						} else { //defence를 했으면
							const criticalChance = Math.random();
							const critical = Math.max(15 * (attacker.spd - defEnemy.spd) / 100 + 20 * (attacker.stateLuk - defEnemy.stateLuk) / 100, 0.1);//치명타 확률 계산
							if (criticalChance < critical) {
								criticalAtk = true;
								team[defData.idx] = team[defData.idx] + ' dmgCri'
							} else {
								team[defData.idx] = team[defData.idx] + ' dmg'
							}
						}
					} else {
						const magicChance = Math.min((60 + 20 * (attacker.spd - defEnemy.spd) / 100) /100, 0.9); //마법 적중 확률
						if (team[defData.idx] === undefined || team[defData.idx].indexOf('defence2') < 0) { //마법방어를 안했으면
							if (chance < magicChance) {
								const criticalChance = Math.random();
								const critical = Math.max(15 * (attacker.spd - defEnemy.spd) / 100 + 20 * (attacker.stateLuk - defEnemy.stateLuk) / 100, 0.1);//치명타 확률 계산
								if (criticalChance < critical) {
									criticalAtk = true;
									team[defData.idx] = team[defData.idx] + ' dmgCri'
								} else {
									team[defData.idx] = team[defData.idx] + ' dmg';
								}
							} else {
								const avoidNum = Math.floor(Math.random()*4);//회피 종류
								avoid = true;
								team[defData.idx] = 'avoid' + avoidNum;
							}
						} else { //마법방어를 했으면
							const criticalChance = Math.random();
							const critical = Math.max(15 * (attacker.spd - defEnemy.spd) / 100 + 20 * (attacker.stateLuk - defEnemy.stateLuk) / 100, 0.1);//치명타 확률 계산
							if (criticalChance < critical) {
								criticalAtk = true;
								team[defData.idx] = team[defData.idx] + ' dmgCri'
							} else {
								team[defData.idx] = team[defData.idx] + ' dmg';
							}
						}
					}
					//마법 방어와 방어 분기 처리
					//스킬 공격치 적용
					//skill dmg
					let dmg_ = 0,
						atkNum = {},
						defNum = {},
						sk = {},
						attackType = 0,
						defenceType = 0;
					if (skType < 7) {//물리공격
						attackType = 'atk';
						defenceType = 'def';
					} else {//마법공격
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
					dmg_ = (criticalAtk ? atkNum[attackType] * 2 : atkNum[attackType]) - (defNum[defenceType] || defEnemy[defenceType]);
					if (avoid) {
						dmg.push('');
					} else {
						dmg.push(dmg_ < 1 ? 1 : dmg_);
					}
				} else { //적이 죽었을 경우
					dmg.push('');
				}
			});
			console.log("dmg", dmg, attacker);
			//atk, def, mak, mdf, spd
			//timeLine[turnIdx] 공격자
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
								if (chk) { //스킬 맞는 위치와 범위값중 일치하는지 확인
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
							if (timeLine[turnIdx].order.team === 'ally') { //적군 영역 effect효과
								setAllyEffect([
									...targetArr,
								]);
								defencer.forEach((defData, idx) => {
									battleEnemy[defData.idx].hp -= dmg[idx];
									if (battleEnemy[defData.idx].hp < 0) {//다이
										enemyAction[defData.idx] = 'die';
										battleEnemy[defData.idx].hp = 0;
										battleEnemy[defData.idx].state = 'die';
										// console.log('die', defData.idx, battleEnemy[defData.idx].state);
									}
								});
								endGameCheck();
							} else { //아군 영역 effect효과
								setEnemyEffect([
									...targetArr
								]);
								defencer.forEach((defData, idx) => {
									battleAlly[defData.idx].hp -= dmg[idx];
									if (battleAlly[defData.idx].hp < 0) {//다이
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
								actionAnimation(setTurnIdx, setSkillMsg, turnIdx_, timeLine, resetOrder, setAllyEffect, setEnemyEffect, gameData, battleAlly, battleEnemy, setting, setAllyAction, setEnemyAction, allyPos, enemyPos, modeRef, setMode);
							}, 1000 / gameSpd);//공격 이펙트 효과시간
						}, 200 / gameSpd);
					}, 800 / gameSpd);//메시지창 사라짐
				}, 200 / gameSpd);//메시지 오픈
			}, 800 / gameSpd);
		}
	} else {
		resetOrder('order');
	}
}
const relationEff = (ch, effObj) => {
	let effData = [];
	effObj.forEach((eff)=>{ //인연
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
const RelationArea = styled.div`
	display:flex;position:absolute;left:0;right:0;top:0;bottom:0;flex-direction:column;z-index:10;align-items:center;justify-content:center;pointer-events:none;
	&:after{content:'';position:absolute;width:100%;height:0;box-shadow:0 0 20px 10px rgba(0,0,0,0);background:rgba(0,0,0,.7);transition:all ${({gameSpd}) => 0.5 / gameSpd}s ${({gameSpd}) => 0.5 / gameSpd}s ease-in-out;}
	&.on:after{height:${({rtHeight}) => rtHeight}px;box-shadow:0 0 20px 10px rgba(0,0,0,.7);}
	.relationTitle{margin:0 0 10px 0;z-index:1;}
	.relationTitle span{display:inline-block;margin:0 2px;font-size:25px;font-weight:600;opacity:0;color:#fff;}
	.relationTitle span:first-of-type{transition:opacity ${({gameSpd}) => 0.5 / gameSpd}s 0s;text-shadow:0 0 10px #ff0,0 0 10px #ff0;}
	.relationTitle span:nth-of-type(2){transition:opacity ${({gameSpd}) => 0.5 / gameSpd}s .2s;text-shadow:0 0 10px #fb0,0 0 10px #fb0;}
	.relationTitle span:nth-of-type(3){transition:opacity ${({gameSpd}) => 0.5 / gameSpd}s .4s;text-shadow:0 0 10px #f60,0 0 10px #f60;}
	.relationTitle span:last-of-type{transition:opacity ${({gameSpd}) => 0.5 / gameSpd}s .6s;text-shadow:0 0 10px #f00,0 0 10px #f00;}
	&.on .relationTitle span{opacity:1;}
	&.on .relationName{filter:blur(0);}
`;
const RelationName = styled.div`
	position:relative;margin:5px 0;padding:0 0 0 13px;color:#fff;z-index:1;filter:blur(5px);transition:all ${({gameSpd}) => 0.5 / gameSpd}s ${({idx}) => 0.5 + idx * 0.3}s;
	&:after{content:'';position:absolute;left:0;top:50%;transform:translate(0, -50%);width:5px;height:5px;background:${({color}) => color};box-shadow:0 0 8px 5px ${({color}) => color};}
`;
const BgEffect = styled.div`
	position:absolute;left:0;right:0;top:0;bottom:0;pointer-events:none;
	div{position:absolute;width:1000px;height:400px;z-index:40;animation-play-state:running;transition:all ${({gameSpd}) => 2 / gameSpd}s;}
	.cloud1{top:0;animation:cloudAnimation ${({gameSpd}) => 210 / gameSpd}s linear infinite;background-image:url(${({img1}) => img1});background-size:100%;}
	.cloud2{top:30%;animation:cloudAnimationReverse ${({gameSpd}) => 130 / gameSpd}s linear infinite;background-image:url(${({img2}) => img2});background-size:100%;opacity:1;}
	&.action div{animation-play-state:paused;opacity:0;}
	&.action .cloud2{left:-1000px;animation-play-state:paused;}
`;

const Battle = ({
	saveData,
  changeSaveData,
	scenario,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
	const setting = useContext(AppContext).setting,
		gameSpd = setting.speed;
	const scenarioDetail = scenario || gameData.scenario.korea.threeAfter[0].stage[2];
	const [mapLand] = useState(scenarioDetail.map);
	const allyDeck = saveData.lineup.save_slot[saveData.lineup.select].entry;//캐릭터 저장된 카드index
	const enemyDeck = scenarioDetail.entry;
	const containerRef = useRef(null);
	const [containerW, setContainerW] = useState();
	const mapSize = 20;

	const allyOrders = useRef([]);//아군 행동저장배열
	const enemyOrders = useRef([]);//적군 행동저장배열
	const timeLine = useRef([]);//공격 순번배열
	const enemyAi = useRef([]);//적군 지능저장배열
	const currentSkill = useRef();//현재 선택된 스킬
	const currentAllyIdx = useRef(); //아군 순번 증가 index
	const currentEnemyIdx = useRef(); //적군 순번 증가 index
	currentAllyIdx.current = 0;
	currentEnemyIdx.current = 0;
	const enemyPos = useRef();//적군 위치값
	const allyPos = useRef([]);//아군 위치값
	const battleAlly = useRef([]);//아군 능력치
	const	battleEnemy = useRef([]);//적군 능력치
	const relationArr = useRef();//인연
	const relationHeight = useRef(0);//인연 박스 크기
	const relationCh = useRef();//인연 적용캐릭
	const [allyAction, setAllyAction] = useState([]);//아군 움직임(defence, avoid)
	const [enemyAction, setEnemyAction] = useState([]);//적군 움직임(defence, avoid)

	const [effectArea, setEffectArea] = useState([]); //스킬 영역
	const [skillMsg, setSkillMsg] = useState(false); //메시지창 on/off
	const [allyEffect, setAllyEffect] = useState([]);//아군 공격효과
	const [enemyEffect, setEnemyEffect] = useState([]);//적군 공격효과

	const [orderIdx, setOrderIdx] = useState(); //명령 지시 순서
	const [mode, setMode] = useState();
	const modeRef = useRef('');
	const [turnIdx, setTurnIdx] = useState(); //공격캐릭터 활성화 순번

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
		const allyRelation = relationCheck(saveData, gameData, ally, 'ally');
		//최초 실행
		if (allyRelation.length > 0) { //인연이 있을때
			relationArr.current = allyRelation;
			relationHeight.current = 35 + 20 + (20 * allyRelation.length); //인연글씨 + 여백 + 인연갯수
			setTimeout(() => {
				setMode('relation');
				setTimeout(() => {
					setOrderIdx(0);
					setMode('order');
					setTimeout(() => {
						relationArr.current = '';
					}, 1300 / gameSpd);
				}, (2000 + allyRelation.length * 300) / gameSpd);
			}, 100 / gameSpd);
		} else { //인연이 없을때
			setOrderIdx(0);
			setMode('order');
		}
		ally.forEach((data, idx) => {
			const saveCh = saveData.ch[data];
			let effData;
			//인연 체크
			allyRelation.forEach((rtData) => {
				gameData.relation[rtData.idx].member.forEach((memberIdx) => {
					if (memberIdx === data) {
						effData = relationEff(saveCh, gameData.relation[rtData.idx].eff);
						//console.log("아군증가량", effData);
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
		enemy_.forEach((data, idx) => {
			const gameCh = gameData.ch[data.idx];
			const enemyData = util.getEnemyState(data, gameData);
			const enemySkill = util.getEnemySkill(data, gameData);
			let effData;
			//인연 체크
			enemyRelation.forEach((rtData, idx) => {
				gameData.relation[rtData.idx].member.forEach((memberIdx) => {
					if (memberIdx === data.idx) {
						effData = relationEff(enemyData, gameData.relation[rtData.idx].eff);
						//console.log("적군증가량", effData);
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
		})
		//인연 적용캐릭 셋팅
		let allyRt = [];
		allyRelation.forEach((data) => {
			gameData.relation[data.idx].member.forEach((dataIdx) => {
				allyRt[dataIdx] = {
					idx: dataIdx,
					color: data.color,
				}
			})
		});
		let enemyRt = [];
		enemyRelation.forEach((data) => {
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
		if (mode === 'end') {//전투 종료시
			return;
		}
		if (mode !== 'order') {
			if (skill === 'cancel') { //취소 실행
				setMode('order');
				setEffectArea([]);
			}
		} else {
			if (skill === 'cancel') { //취소 실행
				if (orderIdx > 0) {
					setOrderIdx((prev) => --prev);
					allyOrders.current.pop();
				}
			} else if (skill === 'wait'){ //대기 실행 sp 증가
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
			} else { //스킬 실행
				const sk = gameData.skill[skill.idx];
				const skType = sk.cate[0];
				switch (skType){
					case 3: //active
						const areaArr = util.getEffectArea(sk.ta, 12);
						setEffectArea(areaArr);
						setMode('area');
						break;
					case 4: //active(방어)
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
			console.log('pgs', '격!퇴!성!공!');
		} else if (mode === 'battleLose') {
			console.log('pgs', '격!퇴!실!패!');
		}
	}, [mode]);
	
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
      <BattleWarp className={`battle_wrap ${mode}`} backImg={imgSet.back[1]}>
				<BgEffect className={`bgEffect ${mode === "action" ? "action" : ""}`} img1={imgSet.bgEffect[0]} img2={imgSet.bgEffect[1]} gameSpd={gameSpd}>
					<div className="cloud1"></div>
					<div className="cloud2"></div>
				</BgEffect>
				{relationArr.current && (
					<RelationArea className={`relation_area ${mode === "relation" ? "on" : ""}`} rtHeight={relationHeight.current} gameSpd={gameSpd}>
						<div className="relationTitle"><span>인!</span><span>연!</span><span>발!</span><span>동!</span></div>
						{relationArr.current.map((rtData, idx) => {
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
												<CardCh className="ch_style" chDisplay={imgSet.chImg[`ch${chData?.display}`]} styleDisplay={imgSet.chStyleImg[`ch_style${chData?.style}`]}/>
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
								const activeSkill = activeSk(data);// die 및 active스킬 판단 0대기,2방어,13철벽방어
								return (
									<TimeLineCh key={idx} className={`battle_ch timeLine ${turnIdx === idx ? 'on' : ''} ${activeSkill}`} team={data.order.team} size={30} defenceIcon0={imgSet.actionIcon[0]} defenceIcon1={imgSet.actionIcon[1]} defenceIcon2={imgSet.actionIcon[2]} tombstone={imgSet.actionIcon[3]} gameSpd={gameSpd}>
										<CardChRing style={{top:0,borderRadius:'50%',}} className="ring_back" ringBack={imgSet.etc.imgRingBack} ringDisplay={imgSet.ringImg[chData?.element]} ringDisplay1={imgSet.sringImg[chData?.element]} />
										<CardCh className="ch_style" chDisplay={imgSet.chImg[`ch${chData?.display}`]} styleDisplay={imgSet.chStyleImg[`ch_style${chData?.style}`]}/>
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
												<CardCh className="ch_style" chDisplay={imgSet.chImg[`ch${chData?.display}`]} styleDisplay={imgSet.chStyleImg[`ch_style${chData?.style}`]}/>
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
										}}><span>취소</span></button></li>
										<li><button onClick={() => {
											battleCommand('wait');
										}}><span>대기</span></button></li>
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
