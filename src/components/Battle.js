import React, { useRef, useState, useContext, useLayoutEffect, useCallback } from 'react';
import { AppContext } from 'App';
import styled from 'styled-components';
import { util } from 'components/Libs';
import MsgContainer from 'components/MsgContainer';
import Msg from 'components/Msg';
import 'css/battle.css';
import 'css/battleAnimation.css';

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
const Buff = styled.div`
	.buff_effect{
		height:${({frame}) => {
			return Math.ceil(frame / 5) * 100;
		}}%;
		background:url(${({effImg}) => effImg}) no-repeat center center;background-size:100%;z-index:1;
		animation:frame${({frame}) => frame} ${({gameSpd}) => 1 / gameSpd}s steps(1);
		animation-iteration-count: infinite;
	}
`;
const Passive = styled.div`
	left:${({idx}) => idx % 2 === 0 ? -30 : -40}%;
	top:${({idx}) => idx*20 - 25}%;background:url(${({effImg}) => effImg}) no-repeat center center;background-size:100%;
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
			debuff = [],
			special = [];
		skill.forEach((data, idx) => {
			if (gameData.skill[data.idx].cate[0] === 3) {
				active.push(data);
			} else if (gameData.skill[data.idx].cate[0] === 7 || gameData.skill[data.idx].cate[0] === 8 || gameData.skill[data.idx].cate[0] === 9) {
				special.push(data);
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
			special: special,
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
		if (allyData.state !== 'die') {
			aliveAlly.push(idx);
		}
	});
	enemy.forEach((data, idx) => {
		const enemyAi = ai[idx];
		const skillList = activeSkillSorting(data.hasSkill);
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
		const currentSk = data.hasSkill.filter((skData) => {
			if (skData.idx === skIdx) {
				return skData.lv;
			}
		});
		enemySkill.push({
			team: 'enemy',
			idx: idx,
			skIdx: skIdx,
			skLv: currentSk.lv,
			targetIdx: targetIdx,
			target: allyPos[target].pos,
		});
	});
	return enemySkill;
}
const activeSk = (timeLineData) => { //타임라인에 처리되는 방어등.. 화면효과
	const skIdx = timeLineData.order.skIdx,
		die = timeLineData.state === 'die'
	if (!die) {
		switch(skIdx) {
			case 0: //대기
				return 'none wait';
				break;
			case 2: //방어
				return 'none defence0';
				break;
			case 13: //철벽방어
				return 'none defence1';
				break;
			case 14: //마법방어
				return 'none defence2';
				break;
			case 15: //나무뒤에 숨기
				return 'none defence3';
				break;
			default:
				return '';
				break;
		}
	} else {
		return 'none die';
	}
}
const actionAnimation = (setTurnIdx, setSkillMsg, turnIdx, timeLine, resetOrder, setAllyEffect, setEnemyEffect, gameData, battleAlly, battleEnemy, setting, setAllyAction, setEnemyAction, setLandCriticalEffect, allyPos, enemyPos, modeRef, setMode, atkOption) => {
	if (modeRef.indexOf('battle') >= 0){ //battleLose, battleWin시 
		return;
	}
	const endGameCheck = () => {//게임 종료 체크
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
		const skillIdx = timeLine[turnIdx].order.skIdx;// {team: 'enemy', idx: 0, skIdx: 0, target: 3}
		const skill = gameData.skill[skillIdx];
		let skillCate = skill.cate[0];
		//console.log('pgs', timeLine, turnIdx);
		let atkC = [0, false], //공격 횟수
			atkS = atkOption?.atkStay || 0; //한캐릭이 공격한 횟수 체크
		let buffDebuff = [], //버프 임시저장 변수
			ccState = '';
		if (timeLine[turnIdx].order.team === 'ally') {//캐릭 상태이상으로 스킵 체크
			const allyState = battleAlly[timeLine[turnIdx].order.idx].state;
			if (allyState.indexOf('die') >= 0) {//죽은 상태
				ccState = 'die';
				skillCate = 1;
			} else if (allyState.indexOf('bleeding') >= 0) {//출혈
				ccState = 'bleeding';
			} else if (allyState.indexOf('petrification') >= 0) {//석화
				ccState = 'petrification';
				skillCate = 1;
			} else if (allyState.indexOf('confusion') >= 0) {//혼란
				ccState = 'confusion';
				skillCate = 1;
			} else if (allyState.indexOf('faint') >= 0) {//기절
				ccState = 'faint';
				skillCate = 1;
			} else if (allyState.indexOf('transform') >= 0) {//변이
				ccState = 'transform';
			}
		} else {
			const enemyState = battleEnemy[timeLine[turnIdx].order.idx].state;
			if (enemyState.indexOf('die') >= 0) {//죽은 상태
				ccState = 'die';
				skillCate = 1;
			} else if (enemyState.indexOf('bleeding') >= 0) {//출혈
				ccState = 'bleeding';
			} else if (enemyState.indexOf('petrification') >= 0) {//석화
				ccState = 'petrification';
				skillCate = 1;
			} else if (enemyState.indexOf('confusion') >= 0) {//혼란
				ccState = 'confusion';
				skillCate = 1;
			} else if (enemyState.indexOf('faint') >= 0) {//기절
				ccState = 'faint';
				skillCate = 1;
			} else if (enemyState.indexOf('transform') >= 0) {//변이
				ccState = 'transform';
			}
		}
		if (skillCate === 1 || skillCate === 4){ //대기, 방어, 철벽방어
			setTurnIdx(turnIdx + 1);
			actionAnimation(setTurnIdx, setSkillMsg, turnIdx + 1, timeLine, resetOrder, setAllyEffect, setEnemyEffect, gameData, battleAlly, battleEnemy, setting, setAllyAction, setEnemyAction, setLandCriticalEffect, allyPos, enemyPos, modeRef, setMode, {
				atkCount: atkC,
				atkStay: atkS,
			});
		} else { //액티브 스킬
			let attacker = {},
				defencer = [],
				defendSkillEnemy = []; //방어종류 시전 캐릭
			let allyAction = [],
				enemyAction = [];
			//공격 횟수 지정
			atkC = (atkOption?.atkCount && atkOption?.atkCount[0]) ? atkOption?.atkCount : [...gameData.skill[skillIdx].atkCount];
			atkC[0] -= 1;
			if (timeLine[turnIdx].order.team === 'ally') { //아군 공격
				attacker = battleAlly[timeLine[turnIdx].order.idx];//공격자 셋팅
				if (skillCate === 5) {//아군 버프 방어자 셋팅
					defencer = timeLine[turnIdx].order.targetIdx.map((data) => {
						return {
							ch: battleAlly[data],
							idx: data,
						}
					});
					defencer.forEach((defData) => {
						if (buffDebuff[defData.idx]) {
							buffDebuff[defData.idx] = [];
						}
						buffDebuff[defData.idx] = [...battleAlly[defData.idx].buffDebuff];
						skill.buff.forEach((data_) => {
							const skLvIdx = timeLine[turnIdx].order.skLv - 1;
							const maxCount = skill.buffCount[skLvIdx];
							if (buffDebuff[defData.idx][data_.type] === undefined) {
								buffDebuff[defData.idx][data_.type] = {count:0,maxCount:0,type:'', num:0,animation:skill.buffAnimation};
							}
							buffDebuff[defData.idx][data_.type].count = maxCount;
							buffDebuff[defData.idx][data_.type].maxCount = maxCount;
							buffDebuff[defData.idx][data_.type].type = data_.type;
							buffDebuff[defData.idx][data_.type].num = data_.num[skLvIdx];
							buffDebuff[defData.idx][data_.type].animation = skill.buffAnimation;
						});
					});
				} else if (skillCate === 6) {//적군 디버프 방어자 셋팅
					defencer = timeLine[turnIdx].order.targetIdx.map((data) => {
						return {
							ch: battleEnemy[data],
							idx: data,
						}
					});
					defencer.forEach((defData) => {
						if (buffDebuff[defData.idx]) {
							buffDebuff[defData.idx] = [];
						}
						buffDebuff[defData.idx] = [...battleEnemy[defData.idx].buffDebuff];
						skill.buff.forEach((data_) => {
							const skLvIdx = timeLine[turnIdx].order.skLv - 1;
							const maxCount = skill.buffCount[skLvIdx];
							if (buffDebuff[defData.idx][data_.type] === undefined) {
								buffDebuff[defData.idx][data_.type] = {count:0,maxCount:0,type:'', num:0,animation:skill.buffAnimation};
							}
							buffDebuff[defData.idx][data_.type].count = maxCount;
							buffDebuff[defData.idx][data_.type].maxCount = maxCount;
							buffDebuff[defData.idx][data_.type].type = data_.type;
							buffDebuff[defData.idx][data_.type].num = data_.num[skLvIdx];
							buffDebuff[defData.idx][data_.type].animation = skill.buffAnimation;
						});
					});
				} else if (skillCate === 7){ //액티브스킬 디버프추가
					defencer = timeLine[turnIdx].order.targetIdx.map((data) => {
						return {
							ch: battleEnemy[data],
							idx: data,
						}
					});
					defencer.forEach((defData) => {
						if (buffDebuff[defData.idx]) {
							buffDebuff[defData.idx] = [];
						}
						buffDebuff[defData.idx] = [...battleEnemy[defData.idx].buffDebuff];
						const skLvIdx = timeLine[turnIdx].order.skLv - 1;
						//상태이상 확률
						const chance = parseInt(skill.buffChance[skLvIdx]) / 100;
						const percent = Math.random();
						if (percent < chance) {
							skill.buff.forEach((data_) => {
								const maxCount = skill.buffCount[skLvIdx];
								if (buffDebuff[defData.idx][data_.type] === undefined) {
									buffDebuff[defData.idx][data_.type] = {count:0,maxCount:0,type:'', num:0,animation:skill.buffAnimation};
								}
								buffDebuff[defData.idx][data_.type].count = maxCount;
								buffDebuff[defData.idx][data_.type].maxCount = maxCount;
								buffDebuff[defData.idx][data_.type].type = data_.type;
								buffDebuff[defData.idx][data_.type].num = data_.num[skLvIdx];
								buffDebuff[defData.idx][data_.type].animation = skill.buffAnimation;
							});
						}
					});
					timeLine.forEach((data) => { //방어중 체크
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
				} else if (skillCate === 8 ){ //액티브스킬 버프추가
					defencer = timeLine[turnIdx].order.targetIdx.map((data) => {
						return {
							ch: battleAlly[data],
							idx: data,
						}
					});
					defencer.forEach((defData) => {
						if (buffDebuff[defData.idx]) {
							buffDebuff[defData.idx] = [];
						}
						buffDebuff[defData.idx] = [...battleEnemy[defData.idx].buffDebuff];
						skill.buff.forEach((data_) => {
							const skLvIdx = timeLine[turnIdx].order.skLv - 1;
							const maxCount = skill.buffCount[skLvIdx];
							if (buffDebuff[defData.idx][data_.type] === undefined) {
								buffDebuff[defData.idx][data_.type] = {count:0,maxCount:0,type:'', num:0,animation:skill.buffAnimation};
							}
							buffDebuff[defData.idx][data_.type].count = maxCount;
							buffDebuff[defData.idx][data_.type].maxCount = maxCount;
							buffDebuff[defData.idx][data_.type].type = data_.type;
							buffDebuff[defData.idx][data_.type].num = data_.num[skLvIdx];
							buffDebuff[defData.idx][data_.type].animation = skill.buffAnimation;
						});
					});
					timeLine.forEach((data) => { //방어중 체크
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
				} else if (skillCate === 9 ){ //액티브스킬 상태이상추가
					defencer = timeLine[turnIdx].order.targetIdx.map((data) => {
						return {
							ch: battleEnemy[data],
							idx: data,
						}
					});
					defencer.forEach((defData) => {
						if (buffDebuff[defData.idx]) {
							buffDebuff[defData.idx] = [];
						}
						buffDebuff[defData.idx] = [...battleEnemy[defData.idx].buffDebuff];
						skill.buff.forEach((data_) => {
							const skLvIdx = timeLine[turnIdx].order.skLv - 1;
							const maxCount = skill.buffCount[skLvIdx];
							if (buffDebuff[defData.idx][data_.type] === undefined) {
								buffDebuff[defData.idx][data_.type] = {count:0,maxCount:0,type:'', num:0,animation:skill.buffAnimation};
							}
							buffDebuff[defData.idx][data_.type].count = maxCount;
							buffDebuff[defData.idx][data_.type].maxCount = maxCount;
							buffDebuff[defData.idx][data_.type].type = data_.type;
							buffDebuff[defData.idx][data_.type].num = data_.num[skLvIdx];
							buffDebuff[defData.idx][data_.type].animation = skill.buffAnimation;
						});
					});
					timeLine.forEach((data) => { //방어중 체크
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
				} else {//액티브스킬 방어자 셋팅
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
							const randomCountPercent = 0.5 - atkS / 10;
							if (Math.random() < randomCountPercent) {
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
					timeLine.forEach((data) => { //방어중 체크
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
				}
			} else { //적군 공격
				attacker = battleEnemy[timeLine[turnIdx].order.idx];//공격자 셋팅
				if (skillCate === 5) {//적군 버프 방어자 셋팅
					defencer = timeLine[turnIdx].order.targetIdx.map((data) => {
						return {
							ch: battleEnemy[data],
							idx: data,
						}
					});
					defencer.forEach((defData, idx) => {
						if (buffDebuff[defData.idx]) {
							buffDebuff[defData.idx] = [];
						}
						buffDebuff[defData.idx] = [...battleEnemy[defData.idx].buffDebuff];
						skill.buff.forEach((data_) => {
							const skLvIdx = timeLine[turnIdx].order.skLv - 1;
							const maxCount = skill.buffCount[skLvIdx];
							if (buffDebuff[defData.idx][data_.type] === undefined) {
								buffDebuff[defData.idx][data_.type] = {count:0,maxCount:0,type:'', num:0,animation:skill.buffAnimation};
							}
							buffDebuff[defData.idx][data_.type].count = maxCount;
							buffDebuff[defData.idx][data_.type].maxCount = maxCount;
							buffDebuff[defData.idx][data_.type].type = data_.type;
							buffDebuff[defData.idx][data_.type].num = data_.num[skLvIdx];
							buffDebuff[defData.idx][data_.type].animation = skill.buffAnimation;
						});
					});
				} else if (skillCate === 6) {//아군 디버프 방어자 셋팅
					defencer = timeLine[turnIdx].order.targetIdx.map((data) => {
						return {
							ch: battleAlly[data],
							idx: data,
						}
					});
					defencer.forEach((defData, idx) => {
						if (buffDebuff[defData.idx]) {
							buffDebuff[defData.idx] = [];
						}
						buffDebuff[defData.idx] = [...battleAlly[defData.idx].buffDebuff];
						skill.buff.forEach((data_) => {
							const skLvIdx = timeLine[turnIdx].order.skLv - 1;
							const maxCount = skill.buffCount[skLvIdx];
							if (buffDebuff[defData.idx][data_.type] === undefined) {
								buffDebuff[defData.idx][data_.type] = {count:0,maxCount:0,type:'', num:0,animation:skill.buffAnimation};
							}
							buffDebuff[defData.idx][data_.type].count = maxCount;
							buffDebuff[defData.idx][data_.type].maxCount = maxCount;
							buffDebuff[defData.idx][data_.type].type = data_.type;
							buffDebuff[defData.idx][data_.type].num = data_.num[skLvIdx];
							buffDebuff[defData.idx][data_.type].animation = skill.buffAnimation;
						});
					});
				} else if (skillCate === 7) { //액티브스킬 디버프추가
					defencer = timeLine[turnIdx].order.targetIdx.map((data) => {
						return {
							ch: battleAlly[data],
							idx: data,
						}
					});
					defencer.forEach((defData) => {
						if (buffDebuff[defData.idx]) {
							buffDebuff[defData.idx] = [];
						}
						buffDebuff[defData.idx] = [...battleAlly[defData.idx].buffDebuff];
						const skLvIdx = timeLine[turnIdx].order.skLv - 1;
						//상태이상 확률
						const chance = parseInt(skill.buffChance[skLvIdx]) / 100;
						if (Math.random() < chance) {
							skill.buff.forEach((data_) => {
								const maxCount = skill.buffCount[skLvIdx];
								if (buffDebuff[defData.idx][data_.type] === undefined) {
									buffDebuff[defData.idx][data_.type] = {count:0,maxCount:0,type:'', num:0,animation:skill.buffAnimation};
								}
								buffDebuff[defData.idx][data_.type].count = maxCount;
								buffDebuff[defData.idx][data_.type].maxCount = maxCount;
								buffDebuff[defData.idx][data_.type].type = data_.type;
								buffDebuff[defData.idx][data_.type].num = data_.num[skLvIdx];
								buffDebuff[defData.idx][data_.type].animation = skill.buffAnimation;
							});
						}
					});
					timeLine.forEach((data) => {//방어중 체크
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
				} else if (skillCate === 8) { //액티브스킬 버프추가
				} else if (skillCate === 9) { //액티브스킬 상태이상추가
					defencer = timeLine[turnIdx].order.targetIdx.map((data) => {
						return {
							ch: battleAlly[data],
							idx: data,
						}
					});
					defencer.forEach((defData, idx) => {
						if (buffDebuff[defData.idx]) {
							buffDebuff[defData.idx] = [];
						}
						buffDebuff[defData.idx] = [...battleAlly[defData.idx].buffDebuff];
						skill.buff.forEach((data_) => {
							const skLvIdx = timeLine[turnIdx].order.skLv - 1;
							const maxCount = skill.buffCount[skLvIdx];
							if (buffDebuff[defData.idx][data_.type] === undefined) {
								buffDebuff[defData.idx][data_.type] = {count:0,maxCount:0,type:'', num:0,animation:skill.buffAnimation};
							}
							buffDebuff[defData.idx][data_.type].count = maxCount;
							buffDebuff[defData.idx][data_.type].maxCount = maxCount;
							buffDebuff[defData.idx][data_.type].type = data_.type;
							buffDebuff[defData.idx][data_.type].num = data_.num[skLvIdx];
							buffDebuff[defData.idx][data_.type].animation = skill.buffAnimation;
						});
					});
					timeLine.forEach((data) => {//방어중 체크
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
				} else {//액티브스킬 방어자 셋팅
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
							const randomCountPercent = 0.5 - atkS / 10;
							if (Math.random() < randomCountPercent) {
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
					timeLine.forEach((data) => {//방어중 체크
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
			}
			let turnIdx_ = turnIdx;
			if (atkC[0] <= 0) {//공격횟수가 0이되면 턴 넘기기
				turnIdx_ = turnIdx + 1;
				atkS = 0;//한 캐릭이 공격한 횟수 초기화
			}

			let dmg = [],
				elementDmg = 0;
			let totalDmg = 0,
				landCritical = false;
			if (skillCate === 5) {//아군 버프 데미지
				defencer.forEach(() => {
					dmg.push('');
				});
				attacker.totalDmg = 0;
			} else if (skillCate === 6) {//적군 디버프 데미지
				defencer.forEach(() => {
					dmg.push('');
				});
				attacker.totalDmg = 0;
			} else {//액티브 스킬 데미지 공식
				const skType = gameData.skill[timeLine[turnIdx].order.skIdx].element_type;//스킬 속성종류
				const chance = Math.random();
				const team = timeLine[turnIdx].order.team === 'ally' ? enemyAction : allyAction;
				let criticalAtk = false;
				let avoid = false;
				defencer.forEach((defData, dIdx) => {
					const defEnemy = defData.ch;
					if (defEnemy.state !== 'die') { //적이 살았을 경우
						//마법 방어와 방어 분기 처리
						if (skType < 7) {//물리공격인지
							const hitChance =  Math.min((80 + 30 * (attacker.spd - defEnemy.spd) / 100 + 20 * (attacker.luk - defEnemy.luk) / 100) / 100, 0.95); //물리 적중 확률
							if (team[defData.idx] === undefined || team[defData.idx].indexOf('defence0') < 0) { //방어를 안했으면
								// console.log("pgs", chance, hitChance);
								if (defEnemy.state.indexOf('petrification') >= 0) { //석화 상태면
									const criticalChance = Math.random();
									const critical = Math.max(15 * (attacker.spd - defEnemy.spd) / 100 + 20 * (attacker.luk - defEnemy.luk) / 100, 0.1);//치명타 확률 계산
									if (criticalChance < critical) {
										criticalAtk = true;
										landCritical = true;
										team[defData.idx] = team[defData.idx] + ' dmgCri'
									} else {
										team[defData.idx] = team[defData.idx] + ' dmg'
									}
								} else {
									if (chance < hitChance) {
										const criticalChance = Math.random();
										const critical = Math.max(15 * (attacker.spd - defEnemy.spd) / 100 + 20 * (attacker.luk - defEnemy.luk) / 100, 0.1);//치명타 확률 계산
										if (criticalChance < critical) {
											criticalAtk = true;
											landCritical = true;
											team[defData.idx] = team[defData.idx] + ' dmgCri'
										} else {
											team[defData.idx] = team[defData.idx] + ' dmg'
										}
									} else {
										const avoidNum = Math.floor(Math.random()*4);//회피 종류
										avoid = true;
										team[defData.idx] = 'avoid' + avoidNum;
									}
								}
							} else { //defence를 했으면
								const criticalChance = Math.random();
								const critical = Math.max(15 * (attacker.spd - defEnemy.spd) / 100 + 20 * (attacker.luk - defEnemy.luk) / 100, 0.1);//치명타 확률 계산
								if (criticalChance < critical) {
									criticalAtk = true;
									landCritical = true;
									team[defData.idx] = team[defData.idx] + ' dmgCri'
								} else {
									team[defData.idx] = team[defData.idx] + ' dmg'
								}
							}
						} else {
							const magicChance = Math.min((60 + 20 * (attacker.spd - defEnemy.spd) / 100) /100, 0.9); //마법 적중 확률
							if (team[defData.idx] === undefined || team[defData.idx].indexOf('defence2') < 0) { //마법방어를 안했으면
								if (defEnemy.state.indexOf('petrification') >= 0) { //석화 상태면
									const criticalChance = Math.random();
									const critical = Math.max(15 * (attacker.spd - defEnemy.spd) / 100 + 20 * (attacker.luk - defEnemy.luk) / 100, 0.1);//치명타 확률 계산
									if (criticalChance < critical) {
										criticalAtk = true;
										landCritical = true;
										team[defData.idx] = team[defData.idx] + ' dmgCri'
									} else {
										team[defData.idx] = team[defData.idx] + ' dmg';
									}
								} else {
									if (chance < magicChance) {
										const criticalChance = Math.random();
										const critical = Math.max(15 * (attacker.spd - defEnemy.spd) / 100 + 20 * (attacker.luk - defEnemy.luk) / 100, 0.1);//치명타 확률 계산
										if (criticalChance < critical) {
											criticalAtk = true;
											landCritical = true;
											team[defData.idx] = team[defData.idx] + ' dmgCri'
										} else {
											team[defData.idx] = team[defData.idx] + ' dmg';
										}
									} else {
										const avoidNum = Math.floor(Math.random()*4);//회피 종류
										avoid = true;
										team[defData.idx] = 'avoid' + avoidNum;
									}
								}
							} else { //마법방어를 했으면
								const criticalChance = Math.random();
								const critical = Math.max(15 * (attacker.spd - defEnemy.spd) / 100 + 20 * (attacker.luk - defEnemy.luk) / 100, 0.1);//치명타 확률 계산
								if (criticalChance < critical) {
									criticalAtk = true;
									landCritical = true;
									team[defData.idx] = team[defData.idx] + ' dmgCri'
								} else {
									team[defData.idx] = team[defData.idx] + ' dmg';
								}
							}
						}
						//속성공격 추뎀
						//찌르기(0),할퀴기(1),물기(2),치기(3),누르기(4),던지기(5),빛(6),어둠(7),물(8),불(9),바람(10),땅(11)
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
							case 6: //빛
								if (elementFilter(defEnemy.element, 7)) { //어둠 속성이면
									elementDmg = (attacker['el'+(skType - 1)] * 2) / 100 + 1;
								} else {
									elementDmg = attacker['el'+(skType - 1)] / 100 + 1;
								}
								break;
							case 7: //어둠
								if (elementFilter(defEnemy.element, 6)) { //빛 속성이면
									elementDmg = (attacker['el'+(skType - 1)] * 2) / 100 + 1;
								} else {
									elementDmg = attacker['el'+(skType - 1)] / 100 + 1;
								}
								break;
							case 8: //물
								if (elementFilter(defEnemy.element, 9)) { //불 속성이면
									elementDmg = (attacker['el'+(skType - 1)] * 2) / 100 + 1;
								} else if (elementFilter(defEnemy.element, 11)) {//땅 속성이면
									elementDmg = (attacker['el'+(skType - 1)] * 0.5) / 100 + 1;
								} else {
									elementDmg = attacker['el'+(skType - 1)] / 100 + 1;
								}
								break;
							case 9: //불
								if (elementFilter(defEnemy.element, 10)) { //바람 속성이면
									elementDmg = (attacker['el'+(skType - 1)] * 2) / 100 + 1;
								} else if (elementFilter(defEnemy.element, 8)) {//물 속성이면
									elementDmg = (attacker['el'+(skType - 1)] * 0.5) / 100 + 1;
								} else {
									elementDmg = attacker['el'+(skType - 1)] / 100 + 1;
								}
								break; //바람
							case 10:
								if (elementFilter(defEnemy.element, 11)) { //땅 속성이면
									elementDmg = (attacker['el'+(skType - 1)] * 2) / 100 + 1;
								} else if (elementFilter(defEnemy.element, 9)) {//불 속성이면
									elementDmg = (attacker['el'+(skType - 1)] * 0.5) / 100 + 1;
								} else {
									elementDmg = attacker['el'+(skType - 1)] / 100 + 1;
								}
								break;
							case 11: //땅
								if (elementFilter(defEnemy.element, 8)) { //물 속성이면
									elementDmg = (attacker['el'+(skType - 1)] * 2) / 100 + 1;
								} else if (elementFilter(defEnemy.element, 10)) {//바람 속성이면
									elementDmg = (attacker['el'+(skType - 1)] * 0.5) / 100 + 1;
								} else {
									elementDmg = attacker['el'+(skType - 1)] / 100 + 1;
								}
								break;
							default:
								break;
						}
						elementDmg = elementDmg <= 1 ? 1 : elementDmg;
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
								sk = defEnemy.hasSkill.filter((skData) => {
									if (skData.idx === 2) {
										return skData;
									};
								});
							} else if (chkIdx === 13) {
								sk = defEnemy.hasSkill.filter((skData) => {
									if (skData.idx === 13) {
										return skData;
									};
								});	
							} else if (chkIdx === 14) {
								sk = defEnemy.hasSkill.filter((skData) => {
									if (skData.idx === 14) {
										return skData;
									};
								});	
							} else if (chkIdx === 15) {
								sk = defEnemy.hasSkill.filter((skData) => {
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
						const attackerSkill = attacker.hasSkill.filter((skData) => {
							return skData.idx === timeLine[turnIdx].order.skIdx;
						});
						gameData.skill[attackerSkill[0].idx].eff.forEach((skData) => {
							const stateName = util.getStateName(skData.type).toLocaleLowerCase();
							const skill = attackerSkill[0].lv > 5 ? 5 : attackerSkill[0].lv;
							atkNum[stateName] = util.getPercentNumber(skData.num[skill - 1], attacker[stateName]);
						});
						// dmg_ = (criticalAtk ? atkNum[attackType] * elementDmg * 2 : atkNum[attackType] * elementDmg) - (defNum[defenceType] || defEnemy[defenceType]);
						const defCount = defNum[defenceType] || defEnemy[defenceType];
						dmg_ = atkNum[attackType] * elementDmg - (criticalAtk ? defCount * .33 : defCount);//크리티컬이면 방어 1/3로 줄임
						//console.log(atkNum[attackType], defCount);
						//console.log(criticalAtk, dmg_);
						if (avoid) {
							dmg.push('');
						} else {
							dmg.push(dmg_ < 1 ? 1 : dmg_);
							totalDmg += dmg_ < 1 ? 1 : dmg_;
						}
					} else { //적이 죽었을 경우
						dmg.push('');
					}
				});
				if (typeof attacker.totalDmg === "number") {
					attacker.totalDmg += totalDmg;
				} else {
					attacker.totalDmg = totalDmg;
				}
			}
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
							if (timeLine[turnIdx].order.team === 'ally') {//아군 공격경우
								if (skillCate === 5) {//버프
									defencer.forEach((data) => {
										targetIdx.push(allyPos[data.idx].pos);
									});
								} else {
									defencer.forEach((data) => {
										targetIdx.push(enemyPos[data.idx]);
									});
								}
							} else {//적군 공격경우
								if (skillCate === 5) {//버프
									defencer.forEach((data) => {
										targetIdx.push(enemyPos[data.idx]);
									});
								} else {
									defencer.forEach((data) => {
										targetIdx.push(allyPos[data.idx].pos);
									});
								}
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
										posIdx:data,
										animation:gameData.skill[skillIdx].effAnimation,
										dmg:Math.floor(dmg[targetCount]),
									};
									targetCount ++;
								} else {
									targetArr[idx] = {
										posIdx:data,
										animation:gameData.skill[skillIdx].effAnimation,
									};
								}
							});
							if (timeLine[turnIdx].order.team === 'ally') { //적군 영역 effect효과
								if (skillCate === 5) {//버프
									setAllyEffect([
										...targetArr,
									]);
								} else {
									setEnemyEffect([
										...targetArr,
									]);
									console.log(buffDebuff);
									defencer.forEach((defData, idx) => {
										battleEnemy[defData.idx].hp -= dmg[idx];
										if (typeof dmg[idx] === 'number') {
											if (buffDebuff[defData.idx] === undefined){
												buffDebuff[defData.idx] = [];
											}
											battleEnemy[defData.idx].buffDebuff = [...buffDebuff[defData.idx]];
										}
										if (battleEnemy[defData.idx].hp < 0) {//다이
											enemyAction[defData.idx] = 'die';
											battleEnemy[defData.idx].hp = 0;
											battleEnemy[defData.idx].state = 'die';
											// console.log('die', defData.idx, battleEnemy[defData.idx].state);
										}
									});
									endGameCheck();
								}
							} else { //아군 영역 effect효과
								if (skillCate === 5) {//버프
									setEnemyEffect([
										...targetArr
									]);
								} else{
									setAllyEffect([
										...targetArr
									]);
									defencer.forEach((defData, idx) => {
										battleAlly[defData.idx].hp -= dmg[idx];
										if (typeof dmg[idx] === 'number') {
											if (buffDebuff[defData.idx] === undefined){
												buffDebuff[defData.idx] = [];
											}
											battleAlly[defData.idx].buffDebuff = [...buffDebuff[defData.idx]];
										}
										if (battleAlly[defData.idx].hp < 0) {//다이
											allyAction[defData.idx] = 'die';
											battleAlly[defData.idx].hp = 0;
											battleAlly[defData.idx].state = 'die';
											// console.log('die', defData.idx, battleAlly[defData.idx].state);
										}
									});
									endGameCheck();
								}
							}
							setAllyAction(allyAction);
							setEnemyAction(enemyAction);
							setLandCriticalEffect(landCritical);
							
							setTimeout(() => {
								setLandCriticalEffect(false);
								if (timeLine[turnIdx].order.team === 'ally') {
									if (skillCate === 5) {//버프
										setAllyEffect([]);
										setAllyAction([]);
									} else {
										setEnemyEffect([]);
										setEnemyAction([]);
									}
								} else {
									if (skillCate === 5) {//버프
										setEnemyEffect([]);
										setEnemyAction([]);
									} else {
										setAllyEffect([]);
										setAllyAction([]);
									}
								}
								setTurnIdx(turnIdx_);
								actionAnimation(setTurnIdx, setSkillMsg, turnIdx_, timeLine, resetOrder, setAllyEffect, setEnemyEffect, gameData, battleAlly, battleEnemy, setting, setAllyAction, setEnemyAction, setLandCriticalEffect, allyPos, enemyPos, modeRef, setMode, {
									atkCount: atkC,
									atkStay: atkS,
								});
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
		gameSpd = setting.speed,
		lang = setting.lang;
	const scenarioDetail = gameData.scenario[scenario.country][scenario.period][scenario.title][scenario.stage] || gameData.scenario.korea.joseon2.LSS.stage[0];
	const viewScenario = saveData.scenario[scenario.country][scenario.period][scenario.title][scenario.stage];
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
	const allyRelationArr = useRef();//아군인연
	const enemyRelationArr = useRef();//적군인연
	const relationHeight = useRef(0);//인연 박스 크기
	const relationCh = useRef();//인연 적용캐릭
	const getItem = useRef([]);//획득 아이템
	const allySlot = useRef([]);//아군 저장 슬롯배열
	const resultExp = useRef([]);//결과 획득 경험치
	const resultBeige = useRef([]);//결과 전투벳지
	const scenarioRepeat = useRef(false);//시나리오 처음 입장인지 확인(대화집 pass 여부)
	const teamPower = useRef({
		allyPercent: 50,
		enemyPercent: 50,
		allyHp: 1000,
		enemyHp: 1000,
	});//팀 전력
	const conversationData = useRef([]);//대화데이터
	const conversationList = useRef([]);//적용 대화
	const conversationCount = useRef(0);//적용 대화 글자수
	const conversationScrollContainer = useRef(null);//대화 스크롤 영역
	const conversationStepRef = useRef(1);
	const [allyAction, setAllyAction] = useState([]);//아군 움직임(defence, avoid)
	const [enemyAction, setEnemyAction] = useState([]);//적군 움직임(defence, avoid)
	const [landCriticalEffect, setLandCriticalEffect] = useState(false);//크리티컬 공격시 화면 떨림
	const allyPassive = useRef([]);//아군 패시브
	const enemyPassive = useRef([]);//적군 패시브
	const allyEnemyPassiveRef = useRef([[],[]]);//아군,적군 패시브
	const allyEnemyBuffRef = useRef([[],[]]);//아군,적군 버프

	const [effectAllyArea, setEffectAllyArea] = useState([]); //아군스킬 영역
	const [effectEnemyArea, setEffectEnemyArea] = useState([]); //적군스킬 영역
	const [skillMsg, setSkillMsg] = useState(false); //메시지창 on/off
	const [allyEffect, setAllyEffect] = useState([]);//아군 데미지효과
	const [enemyEffect, setEnemyEffect] = useState([]);//적군 데미지효과

	const [orderIdx, setOrderIdx] = useState(); //명령 지시 순서
	const [mode, setMode] = useState();
	const modeRef = useRef('');
	const [turnIdx, setTurnIdx] = useState(); //공격캐릭터 활성화 순번
	const conversationTimeout = useRef();
	const [conversationMsg, setConversationMsg] = useState();//대화 내용
  	const [msgOn, setMsgOn] = useState(false);
  	const [msg, setMsg] = useState("");
	const conversationInterval = useCallback(() => {
		conversationCount.current ++;
		if (conversationList.current[conversationStepRef.current - 1].txt[lang].substr(conversationCount.current,1).indexOf("<") !== -1) {
			conversationCount.current += 5;
		}
		setConversationMsg(conversationList.current[conversationStepRef.current - 1].txt[lang].substr(0,conversationCount.current) + "_");
		if (conversationCount.current >= conversationList.current[conversationStepRef.current - 1].txt[lang].length) {
			clearInterval(conversationTimeout.current);
		}
	});
	useLayoutEffect(() => {//최초 실행
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
		//인연 시작
		const allyRelation = relationCheck(saveData, gameData, ally, 'ally');
		allyRelationArr.current = allyRelation;
		let enemy = [],
			enemy_ = [],
			enemyP = [];
		enemyDeck.filter((data, idx) => {
			if (typeof data.idx === 'number') {
				enemy_.push(data);
				enemyP.push(idx);
			}
		});
		const enemyRelation = relationCheck(saveData, gameData, enemy_, 'enemy');
		enemyRelationArr.current = enemyRelation;
		//-----인연 적용캐릭 셋팅
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
		allyRt = allyRt.filter((element) => element !== undefined);
		enemyRt = enemyRt.filter((element) => element !== undefined);
		relationCh.current = {
			ally:[...allyRt],
			enemy:[...enemyRt],
		};
		//-----시나리오 시청 판단
		if (!viewScenario) {//시나리오 시청
			scenarioRepeat.current = true;
			conversationData.current = gameData.scenario[scenario.country][scenario.period][scenario.title].stage[scenario.stage].conversation;
			conversationList.current.push(conversationData.current[0]);
			setMode('scenario');
			conversationCount.current = 0;
			conversationTimeout.current = setInterval(conversationInterval, 50);
		} else {//시나리오 패스
			setTimeout(() => {
				setMode('relation');
			}, 100 / gameSpd);
		}
		ally.forEach((data, idx) => {//능력치 셋팅
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
				hasExp:saveCh.hasExp,
				state: '',
				buffDebuff:[],
				currenthp: hp,
				hp: hp,
				currenthp_: hp,
				hp_: hp,
				currentsp: saveCh.bSt1,
				sp: Math.floor(saveCh.bSt1/2),
				sp_: saveCh.bSt1,
				currentrsp: rsp,
				rsp: rsp,
				currentatk: atk,
				atk: atk,
				currentdef: def,
				def: def,
				currentmak: mak,
				mak: mak,
				currentmdf: mdf,
				mdf: mdf,
				currentrcv: rcv,
				rcv: rcv,
				currentspd: spd,
				spd: spd,
				currentluk: luk,
				luk: luk,
			});
		});
		allyPos.current = pos;
		enemyPos.current = enemyP;
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
				spd = enemyData.bSt8 + enemyData.iSt8 + (effData?.rtSt8 || 0),
				luk = enemyData.bSt9 + enemyData.iSt9 + (effData?.rtSt9 || 0);
			enemy.push({
				state: '',
				buffDebuff:[],
				...gameCh,
				...enemyData,
				lv: data.lv,
				hasSkill: enemySkill,
				currenthp: hp,
				hp: hp,
				currenthp_: hp,
				hp_: hp,
				currentsp: enemyData.bSt1,
				sp: Math.floor(enemyData.bSt1/2),
				sp_: enemyData.bSt1,
				currentrsp: rsp,
				rsp: rsp,
				currentatk: atk,
				atk: atk,
				currentdef: def,
				def: def,
				currentmak: mak,
				mak: mak,
				currentmdf: mdf,
				mdf: mdf,
				currentrcv: rcv,
				rcv: rcv,
				currentspd: spd,
				spd: spd,
				currentluk: luk,
				luk: luk,
			});
		});
		battleEnemy.current = enemy;
		//적군 행동 지능
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
		//-----패시브 시작
		battleAlly.current.forEach((ally, idx) => {
			ally.sk.forEach((allySkill) => {
				if (gameData.skill[allySkill.idx].cate[0] === 2) {
					const eff = gameData.skill[allySkill.idx].effAnimation;
					if (gameData.skill[allySkill.idx].ta === 10) {//전체 캐릭 패시브 적용
						battleAlly.current.forEach((ally_, chIdx) => {
							let effOverlap = false;
							if (allyPassive.current[chIdx] === undefined) {
								allyPassive.current[chIdx] = [];
							}
							allyPassive.current[chIdx].forEach((data) => {
								if (data === eff) {
									effOverlap = true;
									return;
								}
							});
							if (!effOverlap) {
								allyPassive.current[chIdx].push(eff);
							}
						});
					} else {//단일 대상 패시브 적용
						let effOverlap = false;
						if (allyPassive.current[idx] === undefined) {
							allyPassive.current[idx] = [];
						}
						allyPassive.current[idx].forEach((data) => {
							if (data === eff) {
								effOverlap = true;
								return;
							}
						});
						if (!effOverlap) {
							allyPassive.current[idx].push(eff);
						}
					}
				}
			});
		});
		battleEnemy.current.forEach((enemy, idx) => {
			enemy.sk.forEach((enemySkill) => {
				if (gameData.skill[enemySkill.idx].cate[0] === 2) {
					const eff = gameData.skill[enemySkill.idx].effAnimation;
					if (gameData.skill[enemySkill.idx].ta === 10) {//전체 캐릭 패시브 적용
						battleEnemy.current.forEach((enemy_, chIdx) => {
							let effOverlap = false;
							if (enemyPassive.current[chIdx] === undefined){
								enemyPassive.current[chIdx] = [];
							}
							enemyPassive.current[chIdx].forEach((data) => {
								if (data === eff) {
									effOverlap = true;
									return;
								}
							});
							if (!effOverlap) {
								enemyPassive.current[chIdx].push(eff);
							}
						});
					} else {//단일 대상 패시브 적용
						let effOverlap = false;
						if (enemyPassive.current[idx] === undefined){
							enemyPassive.current[idx] = [];
						}
						enemyPassive.current[idx].forEach((data) => {
							if (data === eff) {
								effOverlap = true;
								return;
							}
						});
						if (!effOverlap) {
							enemyPassive.current[idx].push(eff);
						}
					} 
				}
			});
		});
		return () => {//언마운트 리셋
			clearInterval(conversationTimeout.current);
			let saveD = {...saveData};
			saveD.scenario[scenario.country][scenario.period][scenario.title][scenario.stage] = scenarioRepeat;
			changeSaveData(saveD);
		}
	}, []);
	const resetOrder = (mode) => {
		setOrderIdx(0);
		setTurnIdx('');
		allyOrders.current = [];
		timeLine.current = [];
		modeRef.current = mode;
		setMode(mode);
	};
	const areaAllySelect = (e, pos) => {
		if (currentSkill.current.sk.cate[0] !== 5) {
			return;
		}
		if (mode === 'area') {
			const areaArr = util.getEffectArea(currentSkill.current.sk.ta, pos);
			let targetIdx = [];
			allyPos.current.forEach((posIdx, idx) => {
				areaArr.forEach((actionIdx) => {
					if (posIdx.pos === actionIdx) {
						targetIdx.push(idx);
					}
				});
			});
			setEffectAllyArea(areaArr);
			if (e.target.classList.contains('effect')) {
				if (orderIdx < battleAlly.current.length - 1) {
					setOrderIdx((prev) => ++prev);
				} else {
					setMode('action');
				}
				allyOrders.current.push({
					team: 'ally',
					idx: orderIdx,
					skIdx: currentSkill.current.sk.idx,
					skLv: currentSkill.current.skLv,
					enemyTarget: true,
					targetIdx: targetIdx,
					target: pos,
					sp: -gameData.skill[currentSkill.current.sk.idx].sp,
				});
				setEffectEnemyArea([]);
				setEffectAllyArea([]);
				if (orderIdx < battleAlly.current.length - 1) {
					setMode('order');
				} else {
					setMode('action');
					setOrderIdx('');
				}
			}
		}
	}
	const areaEnemySelect = (e, pos) => {
		if (currentSkill.current.sk.cate[0] === 5) {
			return;
		}
		if (mode === 'area') {
			const areaArr = util.getEffectArea(currentSkill.current.sk.ta, pos);
			let targetIdx = [];
			enemyPos.current.forEach((posIdx, idx) => {
				areaArr.forEach((actionIdx) => {
					if (posIdx === actionIdx) {
						targetIdx.push(idx);
					}
				});
			});
			setEffectEnemyArea(areaArr);
			if (e.target.classList.contains('effect')) {
				if (orderIdx < battleAlly.current.length - 1) {
					setOrderIdx((prev) => ++prev);
				} else {
					setMode('action');
				}
				allyOrders.current.push({
					team: 'ally',
					idx: orderIdx,
					skIdx: currentSkill.current.sk.idx,
					skLv: currentSkill.current.skLv,
					enemyTarget: true,
					targetIdx: targetIdx,
					target: pos,
					sp: -gameData.skill[currentSkill.current.sk.idx].sp,
				});
				setEffectEnemyArea([]);
				setEffectAllyArea([]);
				if (orderIdx < battleAlly.current.length - 1) {
					setMode('order');
				} else {
					setMode('action');
					setOrderIdx('');
				}
			}
		}
	};
	const battleCommand = (skill, skLv) => {
		if (mode === 'end') {//전투 종료시
			return;
		}
		if (mode !== 'order') {
			if (skill === 'cancel') { //취소 실행
				setMode('order');
				setEffectAllyArea([]);
				setEffectEnemyArea([]);
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
					sp: battleAlly.current[orderIdx].bSt2,
				});
			} else { //스킬 실행
				if (battleAlly.current[orderIdx].sp - skill.sp < 0) {
					setMsgOn(true);
					setMsg("스킬 포인트가 부족합니다.");
					return;
				}
				const skType = skill.cate[0];
				switch (skType){
					case 7:
					case 8:
					case 9:
					case 3: //active
						setEffectEnemyArea(util.getEffectArea(skill.ta, 12));
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
							skIdx: skill.idx,
							skLv: skLv,
							enemyTarget: false,
							target: allyPos.current[orderIdx].pos,
							sp: -skill.sp,
						});
						break;
					case 5: //buff
						setEffectAllyArea(util.getEffectArea(skill.ta, 12));
						setMode('area');
						break;
					case 6: //debuff
						setEffectEnemyArea(util.getEffectArea(skill.ta, 12));
						setMode('area');
						break;
					default:
						break;
				}
				currentSkill.current = {
					sk: skill,
					skLv: skLv,
				}
			}
		}
	};
	useLayoutEffect(() => {
		const state = battleAlly.current[orderIdx]?.state;
		if (state && (state.indexOf('petrification') >= 0 || state.indexOf('confusion') >= 0 || state.indexOf('faint') >= 0)) { //상태 이상일 경우 다음 캐릭으로 이동
			setOrderIdx((prev) => ++prev);
		}
	}, [orderIdx]);
	useLayoutEffect(() => { //모드가 바꿨을때
		if (mode === 'wait') {
		} else if (mode === 'relation') {
			if (allyRelationArr.current.length > 0) { //인연이 있을때
				relationHeight.current = 35 + 20 + (20 * allyRelationArr.current.length); //인연글씨 + 여백 + 인연갯수
				setTimeout(() => {
					setTimeout(() => {
						setMode('passive');
						setTimeout(() => {
							allyRelationArr.current = '';
							relationCh.current = {};
						}, 2000 / gameSpd);
					}, 1300 / gameSpd);
				}, (2000 + allyRelationArr.current.length * 300) / gameSpd);
			}
		} else if (mode === 'passive') {
			setTimeout(() => {
				allyEnemyPassiveRef.current = [allyPassive.current, enemyPassive.current];//패시브효과 전달
				setMode('wait');
				setTimeout(() => {
					setMode('order');
					setOrderIdx(0);
				}, 1000 + allyPassive.current.length * 500 / gameSpd);
			}, 2000 / gameSpd);
		} else if (mode === 'action') {
			let battleAllyCopy = battleAlly.current;
			//아군 패시브 체크
			let allyPassive = [],
				passiveAllySkill = [];
			battleAllyCopy.forEach((ally) => {
				ally.nowhp = ally.hp;
			});
			battleAllyCopy.forEach((ally, allyIdx) => {
				if (ally.state === 'die') {
					ally.sk.forEach((allySkill) => {//죽은 캐릭 스킬
						const gameDataSkill = gameData.skill[allySkill.idx];
						const state = util.getStateName(gameDataSkill.eff[0].type).toLowerCase();
						battleAllyCopy.forEach((ally_) => {//죽은 캐릭 패시브 제거
							if (state === 'hp' && ally_['passive'+state]) {
								const remainPercent = ally_['current'+state + '_'] / ally_['passive'+state];
								ally_[state] = remainPercent * ally_['now'+state];
								ally_[state + '_'] = ally_['current'+state + '_'];
								delete ally_['passive'+state];
								console.log(ally_[state])
							} else if (state !== 'hp') {
								ally_[state] = ally_['current' + state];
							}
						});
					});
					return;
				}
				ally.sk.forEach((allySkill) => {//살아있는 캐릭 스킬
					const gameDataSkill = gameData.skill[allySkill.idx],
						passiveType = gameDataSkill.eff[0].type,
						passiveNum = gameDataSkill.eff[0].num[allySkill.lv - 1],
						passiveEff = gameDataSkill.effAnimation;
					const state = util.getStateName(passiveType).toLowerCase();
					if (gameDataSkill.ta === 10) {//전체 캐릭 패시브 적용
						battleAllyCopy.forEach((ally_, chIdx) => {
							if (ally_.state === 'die') {
								passiveAllySkill[chIdx] = [];
								return;
							}
							if (state === 'hp') {
								ally_[state] = ally_['now' + state];
							} else {
								ally_[state] = ally_['current' + state];
							}
							if (gameData.skill[allySkill.idx].cate[0] === 2) {//패시브 스킬인지
								let passiveOverlap = false;
								if (passiveAllySkill[chIdx] === undefined) {
									passiveAllySkill[chIdx] = [];
								}
								passiveAllySkill[chIdx].forEach((passiveData, idx) => {
									if (passiveData.type === passiveType) {
										passiveOverlap = true;
										if (parseInt(passiveData.num) < parseInt(passiveNum)) {
												delete passiveAllySkill[chIdx][idx];
											passiveAllySkill[chIdx].push({
												type: passiveType,
												num: passiveNum,
												eff: passiveEff,
											});
										}
									}
								});
								if (!passiveOverlap) {
									passiveAllySkill[chIdx].push({
										type: passiveType,
										num: passiveNum,
										eff: passiveEff,
									});
								}
								if (state !== 'hp' || (state === 'hp' && !ally_['passive' + state])) {
									if (passiveNum.indexOf('%') > 0) {
										const percent = parseInt(passiveNum) / 100;
										ally_[state] = percent < 0 ? ally_[state] - ally_[state] * Math.abs(percent) : ally_[state] + ally_[state] * percent;
										ally_[state] = ally_[state] < 0 ? 0 : ally_[state];
									} else {
										ally_[state] = ally_[state] + Number(passiveNum)  < 0 ? 0 : ally_[state] + Number(passiveNum);
									}
									if (state === 'hp' && !ally_['passive' + state]) {
										ally_['passive' + state] = ally_[state];
									}
								}
							}
							//console.log(state, ally_['passive' + state], ally_[state]);
						});
					} else {//단일 대상 패시브 적용
						if (state === 'hp') {
							ally[state] = ally['now' + state];
						} else {
							ally[state] = ally['current' + state];
						}
						if (gameData.skill[allySkill.idx].cate[0] === 2) {//패시브 스킬인지
							let passiveOverlap = false;
							passiveAllySkill[allyIdx].forEach((passiveData, idx) => {
								if (passiveData.type === passiveType) {
									passiveOverlap = true;
									if (parseInt(passiveData.num) < parseInt(passiveNum)) {
										delete passiveAllySkill[allyIdx][idx];
										passiveAllySkill[allyIdx].push({
											type: passiveType,
											num: passiveNum,
											eff: passiveEff,
										});
									}
								}
							});
							if (!passiveOverlap) {
								passiveAllySkill[allyIdx].push({
									type: passiveType,
									num: passiveNum,
									eff: passiveEff,
								});
							}
							if (state !== 'hp' || (state === 'hp' && !ally['passive' + state])) {
								if (passiveNum.indexOf('%') > 0) {
									const percent = parseInt(passiveNum) / 100;
									ally[state] = percent < 0 ? ally[state] - ally[state] * Math.abs(percent) : ally[state] + ally[state] * percent;
									ally[state] = ally[state] < 0 ? 0 : ally[state];
									console.log(passiveNum);
								} else {
									ally[state] = ally[state] + Number(passiveNum)  < 0 ? 0 : ally[state] + Number(passiveNum);
								}
								if (state === 'hp' && !ally['passive' + state]) {
									ally['passive' + state] = ally[state];
								}
							}
						}
						//console.log(state, ally['passive' + state], ally[state]);
					}
				});
			});
			passiveAllySkill.forEach((data, idx) => {
				data.forEach((data_) => {
					if (allyPassive[idx] === undefined) {
						allyPassive[idx] = [];
					}
					allyPassive[idx].push(data_.eff);
				})
			});

			//아군 버프 체크
			let allyBuff = [...allyEnemyBuffRef.current[0]] || [],
				allyDmgArr = [],//데미지 애니메이션
				timeDelay = 0;//버프 이펙트 효과 딜레이
			battleAllyCopy.forEach((ally, chIdx) => {
				let cc = '',
					ccSingle = '',
					priorityState = 0;//우선순위 능력치 적용
				if (ally.state === 'die') {
					ally.buffDebuff = [];
					return;
				}
				ally.buffDebuff.forEach((buff_) => {
					if (buff_ === undefined) {
						return;
					}
					let buff = {...buff_},
						state = util.getStateName(buff.type).toLowerCase();
					switch(state) {
						case 'bleeding':
							state = 'hp';
							ccSingle = 'bleeding';
							cc += ' bleeding';
							break;
						case 'addicted':
							state = 'hp';
							ccSingle = 'addicted';
							cc += ' addicted';
							break;
						case 'petrification':
							state = 'def';
							priorityState = '2000';
							ccSingle = 'petrification';
							cc += ' petrification';
							break;
						case 'confusion':
							state = '';
							ccSingle = 'confusion';
							cc += ' confusion';
							break;
						case 'faint':
							state = '';
							ccSingle = 'faint';
							cc += ' faint';
							break;
						case 'transform':
							state = '';
							ccSingle = 'transform';
							cc += ' transform';
							//거북이 buffState['def'] = 1000;
							//곰 buffState['atk'] = 1000;
							//독수리 buffState['mak'] = 1000;
							//사슴 buffState['mdf'] = 1000;
							//말 buffState['spd'] = 50;
							//코끼리 buffState['kg'] = 500;
							//너구리 buffState['luk'] = 100;
							break;
						default:
							break;
					}
					const buffIdx = buff.type;
					if (state === '') {//능력치 변화가 없는 경우(x)
						if (buff.count <= 0) {//버프 횟수 종료시
							ally.state = '';
							delete ally.buffDebuff[buffIdx];
							allyBuff[chIdx].forEach((data, idx) => {
								if (data === buff.animation) {
									delete allyBuff[chIdx][idx];
									return;
								}
							});
						} else {//버프 효과 진행시
							const buffCount = --buff.count;
							ally.state = cc;
							ally.buffDebuff[buffIdx] = {
								count: buffCount,
								maxCount: buff.maxCount,
								type: buff.type,
								num: buff.num,
								animation:buff.animation,
							}
							if (allyBuff[chIdx] === undefined) {
								allyBuff[chIdx] = [];
							}
							let animationCheck = false;//애니메이션 중복체크
							allyBuff[chIdx].forEach((data) => {
								if (data === buff.animation) {
									animationCheck = true;
								}
							});
							if (!animationCheck) {
								allyBuff[chIdx].push(buff.animation);
							}
						}
					} else {//능력치 변화가 있는 경우(o)
						if (ally['buff' + state]) {
							ally[state] = ally['buff' + state];
						} else {
							ally['buff' + state] = ally[state];
						}
						if (buff.count <= 0) {//버프 횟수 종료시
							ally.state = '';
							delete ally.buffDebuff[buffIdx];
							ally[state] = ally['buff' + state];
							delete ally['buff' + state];
							allyBuff[chIdx].forEach((data, idx) => {
								if (data === buff.animation) {
									delete allyBuff[chIdx][idx];
									return;
								}
							});
						} else {//버프 효과 진행시
							const num = priorityState > 0 ? priorityState : buff.num;
							if (num.indexOf('%') > 0) {
								const percent = parseInt(num) / 100;
								ally[state] = percent < 0 ? ally[state] - ally[state] * Math.abs(percent) : ally[state] + ally[state] * percent;
								ally[state] = ally[state] < 0 ? 0 : ally[state];
							} else {
								ally[state] = ally[state] + Number(num)  < 0 ? 0 : ally[state] + Number(num);
							}
							//데미지 애니메이션
							if (allyDmgArr[ccSingle] === undefined) {
								allyDmgArr[ccSingle] = [];
							}
							allyDmgArr[ccSingle].push({
								posIdx:allyPos.current[chIdx],
								animation:buff.animation,
								dmg:Number(buff.num),
							});
							if (state === 'hp') {
								ally['buff' + state] = ally[state];
							}
							const buffCount = --buff.count;
							ally.state = cc;
							ally.buffDebuff[buffIdx] = {
								count: buffCount,
								maxCount: buff.maxCount,
								type: buff.type,
								num: buff.num,
								animation:buff.animation,
							}
							if (allyBuff[chIdx] === undefined) {
								allyBuff[chIdx] = [];
							}
							let animationCheck = false;//애니메이션 중복체크
							allyBuff[chIdx].forEach((data) => {
								if (data === buff.animation) {
									animationCheck = true;
								}
							});
							if (!animationCheck) {
								allyBuff[chIdx].push(buff.animation);
							}
						}
					}
				});
			});
			battleAlly.current = battleAllyCopy;

			let battleEnemyCopy = [...battleEnemy.current];
			//적군 패시브 체크
			let enemyPassive = [],
				passiveEnemySkill = [];
			battleEnemyCopy.forEach((enemy) => {
				enemy.nowhp = enemy.hp;
			});
			battleEnemyCopy.forEach((enemy, enemyIdx) => {
				if (enemy.state === 'die') {
					enemy.sk.forEach((enemySkill) => {//죽은 캐릭 스킬
						const gameDataSkill = gameData.skill[enemySkill.idx];
						const state = util.getStateName(gameDataSkill.eff[0].type).toLowerCase();
						battleEnemyCopy.forEach((enemy_) => {//죽은 캐릭 패시브 제거
							if (state === 'hp' && enemy_['passive'+state]) {
								const remainPercent = enemy_['current'+state + '_'] / enemy_['passive'+state];
								enemy_[state] = remainPercent * enemy_['now'+state];
								enemy_[state + '_'] = enemy_['current'+state + '_'];
								delete enemy_['passive'+state]
							} else if (state !== 'hp') {
								enemy_[state] = enemy_['current' + state];
							}
						});
					});
					return;
				}
				enemy.sk.forEach((enemySkill) => {//살아있는 캐릭 스킬
					const gameDataSkill = gameData.skill[enemySkill.idx],
						passiveType = gameDataSkill.eff[0].type,
						passiveNum = gameDataSkill.eff[0].num[enemySkill.lv - 1],
						passiveEff = gameDataSkill.effAnimation;
					const state = util.getStateName(passiveType).toLowerCase();
					if (gameDataSkill.ta === 10) {//전체 캐릭 패시브 적용
						battleEnemyCopy.forEach((enemy_, chIdx) => {
							if (enemy_.state === 'die') {
								passiveEnemySkill[chIdx] = [];
								return;
							}
							if (state === 'hp') {
								enemy_[state] = enemy_['now' + state];
								return;
							} else {
								enemy_[state] = enemy_['current' + state];
							}
							if (gameData.skill[enemySkill.idx].cate[0] === 2) {//패시브 스킬인지
								let passiveOverlap = false;
								if (passiveEnemySkill[chIdx] === undefined) {
									passiveEnemySkill[chIdx] = [];
								}
								passiveEnemySkill[chIdx].forEach((passiveData, idx) => {
									if (passiveData.type === passiveType) {
										passiveOverlap = true;
										if (parseInt(passiveData.num) < parseInt(passiveNum)) {
											delete passiveEnemySkill[chIdx][idx];
											passiveEnemySkill[chIdx].push({
												type: passiveType,
												num: passiveNum,
												eff: passiveEff,
											});
										}
									}
								});
								if (!passiveOverlap) {
									passiveEnemySkill[chIdx].push({
										type: passiveType,
										num: passiveNum,
										eff: passiveEff,
									});
								}
								if (state !== 'hp' || (state === 'hp' && !enemy_['passive' + state])) {
									if (passiveNum.indexOf('%') > 0) {
										const percent = parseInt(passiveNum) / 100;
										enemy_[state] = percent < 0 ? enemy_[state] - enemy_[state] * Math.abs(percent) : enemy_[state] + enemy_[state] * percent;
										enemy_[state] = enemy_[state] < 0 ? 0 : enemy_[state];
									} else {
										enemy_[state] = enemy_[state] + Number(passiveNum)  < 0 ? 0 : enemy_[state] + Number(passiveNum);
									}
									if (state === 'hp' && !enemy_['passive' + state]) {
										enemy_['passive' + state] = enemy_[state];
									}
								}
							}
							//console.log(state, enemy_['passive' + state], enemy_[state]);
						});
					} else {//단일 대상 패시브 적용
						if (state === 'hp') {
							enemy[state] = enemy['now' + state];
						} else {
							enemy[state] = enemy['current' + state];
						}
						if (gameData.skill[enemySkill.idx].cate[0] === 2) {//패시브 스킬인지
							let passiveOverlap = false;
							passiveEnemySkill[enemyIdx].forEach((passiveData, idx) => {
								if (passiveData.type === passiveType) {
									passiveOverlap = true;
									if (parseInt(passiveData.num) < parseInt(passiveNum)) {
										delete passiveEnemySkill[enemyIdx][idx];
										passiveEnemySkill[enemyIdx].push({
											type: passiveType,
											num: passiveNum,
											eff: passiveEff,
										});
									}
								}
							});
							if (!passiveOverlap) {
								passiveEnemySkill[enemyIdx].push({
									type: passiveType,
									num: passiveNum,
									eff: passiveEff,
								});
							}
							if (state !== 'hp' || (state === 'hp' && !enemy['passive' + state])) {
								if (passiveNum.indexOf('%') > 0) {
									const percent = parseInt(passiveNum) / 100;
									enemy[state] = percent < 0 ? enemy[state] - enemy[state] * Math.abs(percent) : enemy[state] + enemy[state] * percent;
									enemy[state] = enemy[state] < 0 ? 0 : enemy[state];
								} else {
									enemy[state] = enemy[state] + Number(passiveNum)  < 0 ? 0 : enemy[state] + Number(passiveNum);
								}
								if (state === 'hp' && !enemy['passive' + state]) {
									enemy['passive' + state] = enemy[state];
								}
							}
						}
						//console.log(state, enemy['passive' + state], enemy[state]);
					}
				});
			});
			passiveEnemySkill.forEach((data, idx) => {
				data.forEach((data_) => {
					if (enemyPassive[idx] === undefined) {
						enemyPassive[idx] = [];
					}
					enemyPassive[idx].push(data_.eff);
				})
			});

			//적군 버프 체크
			let enemyBuff = [...allyEnemyBuffRef.current[1]] || [],
				enemyDmgArr = [];//데미지 애니메이션
			battleEnemyCopy.forEach((enemy, chIdx) => {
				let cc = '',
					ccSingle = '',
					priorityState = 0;//우선순위 능력치 적용
				if (enemy.state === 'die') {
					enemy.buffDebuff = [];
					return;
				}
				enemy.buffDebuff.forEach((buff_) => {
					if (buff_ === undefined) {
						return;
					}
					let buff = {...buff_},
						state = util.getStateName(buff.type).toLowerCase();
					switch(state) {
						case 'bleeding':
							state = 'hp';
							ccSingle = 'bleeding';
							cc += ' bleeding';
							break;
						case 'addicted':
							state = 'hp';
							ccSingle = 'addicted';
							cc += ' addicted';
							break;
						case 'petrification':
							state = 'def';
							priorityState = '2000';
							ccSingle = 'petrification';
							cc += ' petrification';
							break;
						case 'confusion':
							state = '';
							ccSingle = 'confusion';
							cc += ' confusion';
							break;
						case 'faint':
							state = '';
							ccSingle = 'faint';
							cc += ' faint';
							break;
						case 'transform':
							state = '';
							ccSingle = 'transform';
							cc += ' transform';
							//거북이 buffState['def'] = 1000;
							//곰 buffState['atk'] = 1000;
							//독수리 buffState['mak'] = 1000;
							//사슴 buffState['mdf'] = 1000;
							//말 buffState['spd'] = 50;
							//코끼리 buffState['kg'] = 500;
							//너구리 buffState['luk'] = 100;
							break;
						default:
							break;
					}
					const buffIdx = buff.type;
					if (state === '') {//능력치 변화가 없는 경우(x)
						console.log(buff.count,'a');
						if (buff.count <= 0) {//버프 횟수 종료시
							enemy.state = '';
							delete enemy.buffDebuff[buffIdx];
							enemyBuff[chIdx].forEach((data, idx) => {
								if (data === buff.animation) {
									delete enemyBuff[chIdx][idx];
									return;
								}
							});
						} else {//버프 효과 진행시
							const buffCount = --buff.count;
							enemy.state = cc;
							enemy.buffDebuff[buffIdx] = {
								count: buffCount,
								maxCount: buff.maxCount,
								type: buff.type,
								num: buff.num,
								animation: buff.animation,
							}
							if (enemyBuff[chIdx] === undefined) {
								enemyBuff[chIdx] = [];
							}
							let animationCheck = false;//애니메이션 중복체크
							enemyBuff[chIdx].forEach((data) => {
								if (data === buff.animation) {
									animationCheck = true;
								}
							})
							if (!animationCheck) {
								enemyBuff[chIdx].push(buff.animation);
							}
						}
					} else {//능력치 변화가 있는 경우(o)
						if (enemy['buff' + state]) {
							enemy[state] = enemy['buff' + state];
						} else {
							enemy['buff' + state] = enemy[state];
						}
						console.log(buff.count,'b');
						if (buff.count <= 0) {//버프 횟수 종료시
							enemy.state = '';
							delete enemy.buffDebuff[buffIdx];
							enemy[state] = enemy['buff' + state];
							delete enemy['buff' + state];
							enemyBuff[chIdx].forEach((data, idx) => {
								if (data === buff.animation) {
									delete enemyBuff[chIdx][idx];
									return;
								}
							});
						} else {//버프 효과 진행시
							const num = priorityState > 0 ? priorityState : buff.num;
							if (num.indexOf('%') > 0) {
								const percent = parseInt(num) / 100;
								enemy[state] = percent < 0 ? enemy[state] - enemy[state] * Math.abs(percent) : enemy[state] + enemy[state] * percent;
								enemy[state] = enemy[state] < 0 ? 0 : enemy[state];
							} else {
								enemy[state] = enemy[state] + Number(num)  < 0 ? 0 : enemy[state] + Number(num);
							}
							//데미지 애니메이션
							if (enemyDmgArr[ccSingle] === undefined) {
								enemyDmgArr[ccSingle] = [];
							}
							enemyDmgArr[ccSingle].push({
								posIdx:enemyPos.current[chIdx],
								animation:buff.animation,
								dmg:Number(buff.num),
							});
							if (state === 'hp') {
								enemy['buff' + state] = enemy[state];
							}
							const buffCount = --buff.count;
							enemy.state = cc;
							enemy.buffDebuff[buffIdx] = {
								count: buffCount,
								maxCount: buff.maxCount,
								type: buff.type,
								num: buff.num,
								animation: buff.animation,
							}
							if (enemyBuff[chIdx] === undefined) {
								enemyBuff[chIdx] = [];
							}
							let animationCheck = false;//애니메이션 중복체크
							enemyBuff[chIdx].forEach((data) => {
								if (data === buff.animation) {
									animationCheck = true;
								}
							})
							if (!animationCheck) {
								enemyBuff[chIdx].push(buff.animation);
							}
						}
					}
				});
			});
			battleEnemy.current = battleEnemyCopy;

			allyEnemyPassiveRef.current = [allyPassive, enemyPassive];//패시브효과 전달
			allyEnemyBuffRef.current = [allyBuff, enemyBuff];//버프효과 전달
			//행동 포인트 수정
			battleAlly.current.map((data, idx) => {
				data.sp += allyOrders.current[idx].sp || 0;
				if (data.sp > data.sp_) {
					data.sp = data.sp_;
				}
			});
			if (enemyDmgArr['bleeding'] || allyDmgArr['bleeding']) {
				timeDelay += 500 / gameSpd;
				if (allyDmgArr['bleeding']) {
					setAllyEffect(allyDmgArr['bleeding']);
				}
				if (enemyDmgArr['bleeding']) {
					setEnemyEffect(enemyDmgArr['bleeding']);
				}
				if (enemyDmgArr['addicted'] || allyDmgArr['addicted']) {
					timeDelay += 500 / gameSpd;
					setTimeout(() => {
						if (allyDmgArr['addicted']) {
							setAllyEffect(allyDmgArr['addicted']);
						}
						if (enemyDmgArr['addicted']) {
							setEnemyEffect(enemyDmgArr['addicted']);
						}
					}, 1000 / gameSpd);
				}
			} else if (enemyDmgArr['addicted'] || allyDmgArr['addicted']) {
				timeDelay += 500 / gameSpd;
				if (allyDmgArr['addicted']) {
					setAllyEffect(allyDmgArr['addicted']);
				}
				if (enemyDmgArr['addicted']) {
					setEnemyEffect(enemyDmgArr['addicted']);
				}
			}
			setTimeout(() => {
				setAllyEffect([]);
				setEnemyEffect([]);
				timeLineSet();//타임라인 구성
				setTurnIdx(0);
				actionAnimation(setTurnIdx, setSkillMsg, 0, timeLine.current, resetOrder, setAllyEffect, setEnemyEffect, gameData, battleAlly.current, battleEnemy.current, setting, setAllyAction, setEnemyAction, setLandCriticalEffect, allyPos.current, enemyPos.current, modeRef.current, setMode)
			}, timeDelay);
		} else if (mode === 'battleWin') {
			console.log('pgs', '격!퇴!성!공!');
			let saveD = {...saveData};
			saveD.scenario[scenario.country][scenario.period][scenario.title][scenario.stage] = scenarioRepeat;
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
			console.log('pgs', '격!퇴!실!패!');
		}
	}, [mode]);
	useLayoutEffect(() => {
		teamPower.current = powerChk(battleAlly.current, battleEnemy.current);
	}, [turnIdx]);
	useLayoutEffect(() => {
		if (allyPos.current[orderIdx]) {
			if (battleAlly.current[allyPos.current[orderIdx].idx].state === 'die') {
				allyOrders.current.push({
					team: 'ally',
					idx: orderIdx,
					skIdx: 0,
				});
				if (orderIdx < battleAlly.current.length - 1) {
					setOrderIdx((prev) => ++prev);
				} else {
					if (mode !== 'battleLose' && mode !== 'battleWin') {
						setMode('action');
					}
				}
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
	const map = Array.from({length: 25}, (undefined, i) => {
		return {idx: i}
	});
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
					<div className="scenario_title">{scenarioDetail.title[lang]}</div>
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
						setMode('relation');
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
					conversationTimeout.current = setInterval(conversationInterval, 50);
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
									<div className="scenario_talk" dangerouslySetInnerHTML={{__html: conversationList.current[idx].txt[lang]}} />
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
					<div className="battle_title">격!퇴!성!공!</div>
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
												<div className="battle_end_hp"><span>기여도:</span><span className="num">{Math.round(allyData.totalDmg) || 0}</span></div>
												<div className="battle_end_exp"><span>경험치:</span><span className="num">{battleGrade.exp}</span></div>
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
						획득 아이템
						{getItem.current && getItem.current.map((item, idx) => {
							const itData = gameData.item[item.idx];
							return (
								<div key={idx}>아이템</div>
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
					<div className="battle_title">격퇴실패</div>
				</div>
			)}
      <BattleWarp className={`battle_wrap ${mode}`} backImg={imgSet.back[1]}>
				<BgEffect className={`bgEffect ${mode === "action" ? "action" : ""}`} img1={imgSet.bgEffect[0]} img2={imgSet.bgEffect[1]} gameSpd={gameSpd}>
					<div className="cloud1"></div>
					<div className="cloud2"></div>
				</BgEffect>
				{allyRelationArr.current && (
					<RelationArea className={`relation_area ${mode === "relation" ? "on" : ""}`} rtHeight={relationHeight.current} gameSpd={gameSpd}>
						<div className="relationTitle"><span>인!</span><span>연!</span><span>발!</span><span>동!</span></div>
						{allyRelationArr.current.map((rtData, idx) => {
							const rtName = gameData.relation[rtData.idx].na[lang];
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
							enemyEffect.forEach((effData) => {
								if (effData.posIdx === idx) {
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
							allyEffect.forEach((effData) => {
								if (effData.posIdx === idx) {
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
									area = chkString(effectEnemyArea, idx);
								let rtCh = '';
								relationCh.current?.enemy?.forEach((rtch) => {
									if (rtch.idx === enemyData.idx) {
										rtCh = "relation";
									}
								});
								const element_type = currentSkill.current ? currentSkill.current.sk.element_type : "";
								if (enemyData.idx) {
									const chData = gameData.ch[enemyData.idx];
									const enemyCh = battleEnemy.current[currentEnemyIdx.current];
									const hasHp = (enemyCh?.hp / enemyCh?.hp_) * 100;
									let actionCh = '';
									if (typeof turnIdx === "number" && timeLine.current && timeLine.current[turnIdx]?.order.team === "enemy" && currentEnemyIdx.current === timeLine.current[turnIdx]?.order.idx) {
										actionCh = "action";
									}
									const die = enemyCh?.state || "";
									const actionPos = enemyAction[currentEnemyIdx.current] || "";
									const passive = allyEnemyPassiveRef.current[1][currentEnemyIdx.current];
									const buffEff = allyEnemyBuffRef.current[1][currentEnemyIdx.current];
									currentEnemyIdx.current ++;
									return (
										<BattleCh key={idx} className={`battle_ch ${area ? "effect effect" + element_type : ""} ${actionCh} ${rtCh} ${actionPos} ${die}`} data-ch={chData?.display} data-idx={idx} left={left} top={top} size={mapSize} onClick={(e) => {
											areaEnemySelect(e, idx);
										}} gameSpd={gameSpd} defenceIcon0={imgSet.actionIcon[0]} defenceIcon1={imgSet.actionIcon[1]} defenceIcon2={imgSet.actionIcon[2]} tombstone={imgSet.actionIcon[3]}>
											{buffEff && buffEff.map((buffData, idx) => {
												return (
													<Buff key={idx} className="ch_buff" gameSpd={gameSpd} effImg={imgSet.eff[buffData]} frame={gameData.effect[buffData].frame} buffEff={buffData} >
														<div className="buff_effect"></div>
													</Buff>
												);
											})}
											<div className="ch_box">
												{passive && passive.map((passiveData, idx) => {
													return (
														<Passive key={idx} className={`ch_passive passive${idx}`} effImg={imgSet.passive[passiveData]} idx={idx} passive={passiveData}/>
													);
												})}
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
										<BattleCh key={idx} className={`battle_ch ${area ? "effect effect" + element_type : ""}`} data-idx={idx} left={left} top={top} size={mapSize} onClick={(e) => {
											areaEnemySelect(e, idx);
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
										<CardCh className="ch_style" chDisplay={imgSet.chImg[`ch${chData?.display}`]} />
									</TimeLineCh>
								)
							})}
						</div>
						<div className="units_ally">
							{battleAlly.current && allyDeck.map((allyData, idx)=> {
								const left = idx % 5 * mapSize,
									top = Math.floor(idx / 5) * mapSize,
									area = chkString(effectAllyArea, idx);
								const element_type = currentSkill.current ? currentSkill.current.sk.element_type : "";
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
									const passive = allyEnemyPassiveRef.current[0][currentAllyIdx.current];
									const buffEff = allyEnemyBuffRef.current[0][currentAllyIdx.current];
									currentAllyIdx.current ++;
									return (
										<BattleCh key={idx} className={`battle_ch ${posCh} ${area ? "effect effect" + element_type : ""} ${actionCh} ${rtCh} ${actionPos} ${die}`} data-ch={chData?.display} data-idx={idx} left={left} top={top} size={mapSize} rtColor={rtColor} onClick={(e) => {
											areaAllySelect(e, idx);
										}}  gameSpd={gameSpd} defenceIcon0={imgSet.actionIcon[0]} defenceIcon1={imgSet.actionIcon[1]} defenceIcon2={imgSet.actionIcon[2]} tombstone={imgSet.actionIcon[3]}>
											{buffEff && buffEff.map((buffData, idx) => {
												return (
													<Buff key={idx} className="ch_buff" gameSpd={gameSpd} effImg={imgSet.eff[buffData]} frame={gameData.effect[buffData].frame} buffEff={buffData}>
														<div className="buff_effect"></div>
													</Buff>
												);
											})}
											<div className="ch_box">
												{passive && passive.map((passiveData, idx) => {
													return (
														<Passive key={idx} className={`ch_passive passive${idx}`} effImg={imgSet.passive[passiveData]} idx={idx} passive={passiveData}/>
													);
												})}
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
										<BattleCh key={idx} className={`battle_ch ${area ? "effect effect" + element_type : ""}`} data-idx={idx} left={left} top={top} size={mapSize} onClick={(e) => {
											areaAllySelect(e, idx);
										}}>
											<div className="ch_box"></div>
										</BattleCh>
									);
								}
							})}
						</div>
					</BattleUnit>
					<BattleLand containerW={containerW} className={`battle_land ${mode === "relation" ? "" : "ready"} ${landCriticalEffect ? "critical" : ""}`} gameSpd={gameSpd}>
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
							{typeof turnIdx === 'number' && gameData.skill[timeLine.current[turnIdx]?.order.skIdx]?.na[lang]}
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
										{/* <span className="spR">{battleAlly.current[orderIdx]?.bSt2}</span> */}
									</div>
									<div className="fix_button">
										<button onClick={() => {
											battleCommand('cancel');
										}}><span className="skName">{lang === 'ko' ? '취소' : 'Cancel'}</span></button>
									</div>
									<ul className="scroll-x">
										<li><button onClick={() => {
											battleCommand('wait');
										}}><span className="skSp">{battleAlly.current[orderIdx]?.bSt2}</span><span className="skName">{lang === 'ko' ? '대기' : 'Wait'}</span></button></li>
										{battleAlly.current[orderIdx]?.hasSkill && battleAlly.current[orderIdx]?.hasSkill.map((data, idx) => {
											const sk = gameData.skill;
											if (sk[data.idx].cate[0] !== 2) {
												return (
													<li key={idx}><button onClick={() => {
														battleCommand(sk[data.idx], data.lv);
													}}><span className="skSp">{sk[data.idx].sp}</span><span className="skName">{sk[data.idx].na[lang]}</span></button></li>
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
      <MsgContainer>
        {msgOn && <Msg text={msg} showMsg={setMsgOn}></Msg>}
      </MsgContainer>
    </>
  );
}

export default Battle;
