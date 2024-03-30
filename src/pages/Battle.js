import { AppContext } from 'App';
import { IconPic } from 'components/ImagePic';
import { util } from 'components/Libs';
import Msg from 'components/Msg';
import MsgContainer from 'components/MsgContainer';
import 'css/battle.css';
import 'css/battleAnimation.css';
import CharacterCard from 'pages/CharacterCard';
import React, { useCallback, useContext, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const TeamIcon = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;
	width: 25px;
	height: 25px;
	transform: translate(-50%, -50%);
	transition: all 0.5s;
`;
const BattleHeader = styled.div`
	display: flex;
	height: 50px;
	width: 100%;
	.scenario_title {
		margin: 0 0 5px 0;
		font-size: 0.875rem;
		font-weight: 600;
		color: #000;
	}
	.team_summary {
		position: relative;
		width: 100%;
		height: 100%;
		border-radius: 10px;
	}
	.team_summary .ally_team,
	.team_summary .enemy_team {
		position: absolute;
		width: 50%;
		height: 100%;
		transition: all 0.5s;
	}
	.ally_team {
		left: 0;
		background-color: var(--color-blue);
		border-radius: 10px 0 0 10px;
	}
	.enemy_team {
		right: 0;
		background-color: var(--color-red);
		border-radius: 0 10px 10px 0;
	}
	.ally_power {
		position: absolute;
		left: 0;
		top: -17px;
		font-size: 0.875rem;
		font-weight: 600;
		color: #000;
	}
	.enemy_power {
		position: absolute;
		right: 0;
		top: -17px;
		font-size: 0.875rem;
		font-weight: 600;
		color: #000;
	}
`;
const BackButton = styled.div`
	position: relative;
	height: 100%;
	padding: 0 10px;
	.ico{
		display: inline-block;
		width: 40px;
		height: 40px;
	}
`;
const BattleTitle = styled.div`
	padding: 10px 10px;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	justify-content: space-around;
`;
const BattleWarp = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	overflow: hidden;
	height: calc(100% - 50px);
	background: url(${({backImg}) => backImg});
	background-size: cover;
`;
const BattleArea = styled.div`
	height: calc(100% - 50px);
	.units_enemy, .units_ally, .land_ally, .land_enemy{
		height: 50%;
	}
	&:before{left:${({mode}) => {
		return !mode ? "-50px" : 0;
	}};background:url(${({frameLeft}) => frameLeft}) no-repeat -15px center;}
	&:after{right:${({mode}) => {
		return !mode ? "-50px" : 0;
	}};background:url(${({frameRight}) => frameRight}) no-repeat 13px center;}
`;
const BattleUnit = styled.div`
`;
const BattleLand = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	transition: all ${({ gameSpd }) => 1.125 / gameSpd}s;
	.land_ally {
		position: relative;
		margin: 0 auto;
	}
	.land_enemy {
		position: relative;
		margin: 0 auto;
	}
	& > div {
		position: relative;
		margin: 0 auto;
		box-sizing: border-box;
	}
	&.ready .land {
		outline-width: 2px;
	}
	&.critical {
		animation: landCritical 0.2s ease-in-out;
	}
`;
const BattleEffect = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 3;
  pointer-events: none;
  overflow: hidden;
	transition: all ${({ gameSpd }) => 1.125 / gameSpd}s;
	.land_ally {
		position: relative;
		margin: 0 auto;
		&.allEff .effect_land {
			display: none;
			&:nth-of-type(13) {
				display: block;
				transform: scale(5);
				z-index: 1;
			}
		}
	}
	.land_enemy {
		position: relative;
		margin: 0 auto;
		&.allEff .effect_land {
			display: none;
			&:nth-of-type(13) {
				display: block;
				transform: scale(5);
				z-index: 1;
			}
		}
	}
	& > div {
		position: relative;
		margin: 0 auto;
		box-sizing: border-box;
	}
	&.ready .land {
		outline-width: 2px;
	}
`;
const TimeLineCh = styled.div`
	position: relative;
	${({state}) => {
		switch(state) {
			case 'none':
				return `
					& > span {
						filter: grayscale(100%);
					}
					&:after {
						content: "";
						position: absolute;
						right: 0;
						bottom: 0;
						width: 100%;
						height: 100%;
						z-index: 1;
					}
				`;
			case 'wait':
				return `
					&:after {
						background-size:70%;
					}
				`;
			default:
				break;
		}
	}}
	padding-top: ${({size}) => size}px;
	width: ${({size}) => size}px;
	height: 0;
	border-radius: 50%;
	overflow: hidden;
	${({team}) => team === 'ally' ? 'margin:15px 0 0 0;' : 'margin:-15px 0 0 0;'}
	&.on{z-index:20;animation:turnEffect ${({ gameSpd }) => 1.5 / gameSpd}s linear infinite;}
	&.defence0:after{background:url(${({defenceIcon0}) => defenceIcon0}) no-repeat right center;background-size:70%;}
	&.defence1:after{background:url(${({defenceIcon1}) => defenceIcon1}) no-repeat right center;background-size:70%;}
	&.defence2:after{background:url(${({defenceIcon2}) => defenceIcon2}) no-repeat right center;background-size:70%;}
	&.defence3:after{background:url(${({defenceIcon3}) => defenceIcon3}) no-repeat right center;background-size:70%;}
	&.die:after{background:url(${({tombstone}) => tombstone}) no-repeat center center;background-size:70%;}
`;
const BattleCh = styled.div`
	position: absolute;
	box-sizing: border-box;
	perspective: 100px;
	transform-style: flat;
	z-index: 1;
	width: ${({size}) => size}%;
	padding-top: ${({size}) => size}%;
	left: ${({left}) => left}%;
	top: ${({top}) => top}%;
	transition:all ${({ gameSpd }) => 0.75 / gameSpd}s;
	&.relation:after{box-shadow:0 0 15px 5px ${({rtColor}) => rtColor};background:${({rtColor}) => rtColor};animation:rtAnimation ${({ gameSpd }) => 3 / gameSpd}s linear;}
	.ch_box{transition:all ${({ gameSpd }) => 0.225/ gameSpd}s;}
	.ch_box .hpsp{
		span {
			&.hp{
				em{transition:all ${({ gameSpd }) => 0.375/ gameSpd}s;}
			}
			&.sp{
				em{transition:all ${({ gameSpd }) => 0.375/ gameSpd}s;}
			}
		}
	}
	&.action {
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%) scale(2);
		z-index: 30;
	}
	&.defence0:after{
		background:url(${({defenceIcon0}) => defenceIcon0}) no-repeat center center;background-size:60%;
		animation:defence ${({ gameSpd }) => 0.75 / gameSpd}s;opacity:0;
	}
	&.defence1:after{
		background:url(${({defenceIcon1}) => defenceIcon1}) no-repeat center center;background-size:60%;
		animation:defence ${({ gameSpd }) => 0.75 / gameSpd}s;opacity:0;
	}
	&.defence2:after{
		background:url(${({defenceIcon2}) => defenceIcon2}) no-repeat center center;background-size:60%;
		animation:defence ${({ gameSpd }) => 0.75 / gameSpd}s;opacity:0;
	}
	&.avoid0{
		animation:avoid0 ${({ gameSpd }) => 0.75 / gameSpd}s ease-out;
	}
	&.avoid1{
		animation:avoid1 ${({ gameSpd }) => 0.75 / gameSpd}s ease-out;
	}
	&.avoid2{
		animation:avoid2 ${({ gameSpd }) => 0.75 / gameSpd}s ease-out;
	}
	&.avoid3{
		animation:avoid3 ${({ gameSpd }) => 0.75 / gameSpd}s ease-out;
	}
	${'' /* &.dmg .dmg{
		animation:dmgAnimation ${({gameSpd}) => 0.375 / gameSpd}s steps(1) infinite;
	} */}
	&.dmgCri .dmg{
		animation:dmgCriticalAnimation ${({gameSpd}) => 0.375 / gameSpd}s steps(4) infinite;
	}
	&.die:after{
		background:url(${({tombstone}) => tombstone}) no-repeat center center;background-size:80%;
		animation:tombstone ${({ gameSpd }) => 1.125 / gameSpd}s;opacity:0;animation-fill-mode:forwards;transform-origin:50% 100%;
	}
`;
const Buff = styled.div`
	.buff_effect{
		height:${({frame}) => {
			return Math.ceil(frame / 5) * 100;
		}}%;
		background:url(${({effImg}) => effImg}) no-repeat center center;background-size:100%;z-index:1;
		animation:frame${({frame}) => frame} ${({gameSpd}) => 1.125 / gameSpd}s steps(1);
		animation-iteration-count: infinite;
	}
`;
const Passive = styled.div`
	left:${({idx}) => idx % 2 === 0 ? -30 : -40}%;
	top:${({idx}) => idx*20 - 25}%;background:url(${({effImg}) => effImg}) no-repeat center center;background-size:100%;
`;
const EffLand = styled.div.attrs(
	props => ({
		style: {
			left: `${props.left}%`,
			top:`${props.top}%`,
			filter:`${props.filter}`,
			transform:`rotate(${props.rotate}deg) scale(${props.size})`,
		},
	})
)`
	.dmgNum{
		transition:all ${({gameSpd}) => 1.125 / gameSpd}s ease-in;
	}
`;
const Eff = styled.img`
	height:${({frame}) => {
		return Math.ceil(frame / 5) * 100;
	}}%;
	animation:${({frame, gameSpd}) => `frame${frame} ${(frame / 10) * 1.125 / gameSpd}s steps(1)`};
	animation-iteration-count: ${({repeat}) => repeat || "infinite"};
`;
const Land = styled.div`
	position:absolute;
	width: 20%;
	padding-top: 20%;
	box-sizing: border-box;
	border-radius: 0;
	background-size: 100%;
	outline: 0px solid #fff;
	transition: outline 1s;
	left:${({left}) => left}%;
	top:${({top}) => top}%;
	& > .back {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: #000;
		opacity: .1;
		z-index: 1;
	}
`;
const BattleMsg = styled.div`
	transition:all ${({gameSpd}) => 0.375 / gameSpd}s;opacity:0;
`;
const WeatherIcon = styled.div`
	position:absolute;left:${({idx}) => 50 * idx}px;background-image:url(${({src}) => src});background-size:80%;background-position:center center;background-repeat:no-repeat;width:46px;height:46px;
`;
const WeatherWind = styled.div`
	.weather_arrow{background-image:url(${({src}) => src});background-size:100%;background-repeat:no-repeat;background-position:center center;transform:rotate(${({weatherInfo}) => weatherInfo.wind}deg);
	}
`;
const BattleOrder = styled.div`
	position: relative;
	height: 50px;
	background-color: var(--color-b);
`;
const BattleMenu = styled.div`
	display: flex;
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: var(--color-b);
	overflow: hidden;
	z-index: 50;
	transition: opacity ${({gameSpd}) => 0.75 / gameSpd}s;
	.chInfo{display:flex;flex-basis:60px;align-items:center;justify-content:center;}
	.chInfo span{display:inline-block;}
	.chInfo .sp{font-size:1.25rem;}
	.chInfo .spR{margin:0 0 0 5px;}
	.chInfo .spR:before{content:'('}
	.chInfo .spR:after{content:')'}
	.fix_button{height:100%;}
	.fix_button button{display:flex;margin:5px;height:40px;border-radius:10px;background: #fff;box-sizing:border-box;align-items:center;}
	ul{display:flex;flex:1;height:100%;align-items:center;justify-content:flex-start;}
	ul li{height:100%;}
	ul li button{display:flex;margin:5px;height:40px;border-radius:10px;background:#fff;box-sizing:border-box;align-items:center;}
	ul li button span{flex:1;white-space:nowrap;}
	.skSp{font-size:0.938rem;}
	.skName{font-size:0.813rem;white-space:nowrap;}
	${({mode}) => (mode === "order" || mode === "area") ? `
		pointer-events: unset;
		opacity: 1;
	` : `
		pointer-events: none;
		opacity: 0;
	`};
`;
const BattleTurn = styled.div`
	display: flex;
	position: absolute;
	width: 100%;
	height: 100%;
  flex-direction: row;
	background: #3e2c00;
	align-items: center;
	justify-content: center;
	${({mode}) => mode === "action" ? `
		pointer-events: unset;
		opacity: 1;
		overflow: unset;
	` : `
		pointer-events: none;
		opacity: 0;
		overflow: hidden;
	`
	};
	&:before{
		content: '';
		position: absolute;
		width: 100%;
		height: 10px;
		left: 0;
		top: -4px;
		background: url(${({frameImg}) => frameImg});background-size:contain;
	}
	&:after{
		content: '';
		position: absolute;
		width: 100%;
		height: 10px;
		left: 0;
		bottom: -4px;
		background: url(${({frameImg}) => frameImg});background-size:contain;
	}
`;
const RelationArea = styled.div`
	&:after{transition:all ${({gameSpd}) => 0.375 / gameSpd}s ${({gameSpd}) => 0.5 / gameSpd}s ease-in-out;}
	&.on:after{height:${({rtHeight}) => rtHeight}px;box-shadow:0 0 20px 10px rgba(0,0,0,.7);}
	.relationTitle span:first-of-type{transition:opacity ${({gameSpd}) => 0.375 / gameSpd}s 0s;text-shadow:0 0 10px #ff0,0 0 10px #ff0;}
	.relationTitle span:nth-of-type(2){transition:opacity ${({gameSpd}) => 0.375 / gameSpd}s .2s;text-shadow:0 0 10px #fb0,0 0 10px #fb0;}
	.relationTitle span:nth-of-type(3){transition:opacity ${({gameSpd}) => 0.375 / gameSpd}s .4s;text-shadow:0 0 10px #f60,0 0 10px #f60;}
	.relationTitle span:last-of-type{transition:opacity ${({gameSpd}) => 0.375 / gameSpd}s .6s;text-shadow:0 0 10px #f00,0 0 10px #f00;}
`;
const RelationName = styled.div`
	position:relative;margin:5px 0;padding:0 0 0 13px;color:#fff;z-index:1;filter:blur(5px);transition:all ${({gameSpd}) => 0.375 / gameSpd}s ${({idx}) => 0.5 + idx * 0.3}s;
	&:after{content:'';position:absolute;left:0;top:50%;transform:translate(0, -50%);width:5px;height:5px;background:${({color}) => color};box-shadow:0 0 8px 5px ${({color}) => color};}
`;
const BgEffect = styled.div`
	.cloud{transition:all ${({gameSpd}) => 1.5 / gameSpd}s;}
	.cloud1{top:0;animation:cloudAnimation ${({gameSpd}) => 157 / gameSpd}s linear infinite;background-image:url(${({img1}) => img1});background-size:100%;}
	.cloud2{top:30%;animation:cloudAnimationReverse ${({gameSpd}) => 97 / gameSpd}s linear infinite;background-image:url(${({img2}) => img2});background-size:100%;opacity:1;}
`;
const BgLight = styled.div`
	&:after{
		content:'';position:absolute;left:0;top:0;height:100%;width:100%;
		background:${({type, day}) => {
			if (type === 'w0' && day) {
				return `conic-gradient(at 5% -10%, rgba(255,255,255,0.4) 25%, 25%,
			rgba(255,255,255,0.6) 26%, rgba(255,255,255,0) 27%,
			rgba(255,255,255,0) 29%, rgba(255,255,255,0.5) 30.5%, rgba(255,255,255,0) 32%,
			rgba(255,255,255,0) 37.3%, rgba(255,255,255,0.6) 37.5%, rgba(255,255,255,0) 37.8%,
			rgba(255,255,255,0) 39%, rgba(255,255,255,0.5) 39.5%, rgba(255,255,255,0) 40%,
			rgba(255,255,255,0) 44%, rgba(255,255,255,0.6) 45.5%, rgba(255,255,255,0) 47%,
			rgba(255,255,255,0) 50%);`;
			} else if ((type === 'w3' && day) || (type === 'w4' && day)) {
				return `conic-gradient(at 5% -10%, rgba(0,0,0,.5) 25%, rgba(0,0,0,0.2) 37.5%,rgba(0,0,0,0.5) 50%);`;
			}
			if (!day) {
				return `conic-gradient(at 5% -10%, rgba(0,0,0,.9) 25%, rgba(0,0,0,0.3) 37.5%,rgba(0,0,0,0.9) 50%);`;
			}
		}
	}}
	&:before{
		content:'';position:absolute;left:0;top:0;padding-top:100%;width:100%;background:${({type, day}) => {
			if (type === 'w0' && day) {
				return `radial-gradient(at 10% 0%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 50%),
				radial-gradient(at 10% 0%, rgba(255,220,255,0) 10%, rgba(255,255,255,0.6) 12.5%, rgba(255,255,255,0) 25%),
				radial-gradient(at 10% 0%, rgba(255,220,0,0) 18%, rgba(255,245,0,0.6) 20%, rgba(255,220,0,0) 34%),
				radial-gradient(at 10% 0%, rgba(255,255,255,0) 35%, rgba(255,255,255,0.4) 38%, rgba(255,255,255,0) 60%)`;
			}
		}};
	}
`;
const BattleEnd = styled.div`
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 10;
	background-color: rgba(0,0,0,.85);
	justify-content: center;
	.end_ch{position:relative;margin:0 10px 0 0;width:15%;padding-top:15%;}
	.battle_title{margin:0 0 30px 0;font-size:1.25rem;}
	.battle_result_ch{padding:0 20px;width:100%;box-sizing:border-box;}
	.battle_end_ch{margin:0 0 20px 0;width:100%;align-items:center;}
	.battle_end_ch:nth-of-type{margin:0;}
	.battle_end_contribution{}
	.battle_end_hpexp{position:relative;width:100%;}
	.battle_end_hp{margin:0 10px 0 0;}
	.battle_end_hpexp > div{display:flex;align-items:center;}
	.battle_end_hpexp .num{display:inline-block;margin:0 0 0 10px;font-size:1rem;font-weight:600;}
	.battle_end_grade{position:absolute;width:16px;height:16px;opacity:0;font-size:0.875rem;font-weight:600;color:var(--color-red);animation:grade_animation 1s ease-in forwards;z-index:5;}
	.battle_end_grade:after{content:"";position:absolute;left:-4px;top:0;width:16px;height:16px;border-radius:20px;border:2px solid var(--color-red);box-sizing:border-box;}
	.battle_end_expBar{position:relative;margin:5px 0 0 0;min-width:200px;width:60%;height:14px;}
	.battle_end_expBar .bar{position:relative;width:100%;height:100%;border-radius:10px;background:#fff;overflow:hidden;}
	.battle_end_expBar .bar em{position:absolute;left:0;top:0;bottom:0;background-color:var(--color-red);}
	.battle_end_expBar .txt{position:absolute;left:0;right:0;top:1px;color:#000;text-align:center;}
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
				return skData;
			}
		});
		enemySkill.push({
			team: 'enemy',
			idx: idx,
			skIdx: skIdx,
			skLv: currentSk[0].lv,
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
const actionAnimation = (setTurnIdx, setSkillMsg, skillEffect, turnIdx, timeLine, resetOrder, setAllyEffect, setEnemyEffect, gameData, battleAlly, battleEnemy, gameSpd, bgm, setAllyAction, setEnemyAction, setLandCriticalEffect, allyPos, enemyPos, modeRef, setMode, setWeather, allyEnemyPassive, allyPassive, enemyPassive, setAllyEnemyPassive, allyEnemyBuff, allyBuff, enemyBuff, setAllyEnemyBuff, atkOption) => {
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
	if (turnIdx <= timeLine.length - 1) {
		let counterAtk = false; //카운터 어택인지
		const skillIdx = timeLine[turnIdx].order.skIdx;
		const skill = gameData.skill[skillIdx];
		let skillCate = skill.cate[0];
		let atkC = [0, false], //공격 횟수
			atkS = atkOption?.atkStay || 0; //한캐릭이 공격한 횟수 체크
		let buffDebuff = []; //버프 임시저장 변수
		if (timeLine[turnIdx].order.team === 'ally') {//캐릭 상태이상으로 스킵 체크
			const allyState = battleAlly[timeLine[turnIdx].order.idx].state;
			if (allyState.indexOf('die') >= 0 || allyState.indexOf('petrification') >= 0 || allyState.indexOf('confusion') >= 0 || allyState.indexOf('stun') >= 0) {//죽은 상태, 석화, 혼란, 기절
				skillCate = 1;
			} else if (allyState.indexOf('bleeding') >= 0) {//출혈
			} else if (allyState.indexOf('transform') >= 0) {//변이
			}
		} else {
			const enemyState = battleEnemy[timeLine[turnIdx].order.idx].state;
			if (enemyState.indexOf('die') >= 0 || enemyState.indexOf('petrification') >= 0 || enemyState.indexOf('confusion') >= 0 || enemyState.indexOf('stun') >= 0) {//죽은 상태, 석화, 혼란, 기절
				skillCate = 1;
			} else if (enemyState.indexOf('bleeding') >= 0) {//출혈
			} else if (enemyState.indexOf('transform') >= 0) {//변이
			}
		}
		if (skillCate === 1 || skillCate === 4){ //대기, 방어, 철벽방어
			setTurnIdx(turnIdx + 1);
			actionAnimation({
        setTurnIdx: setTurnIdx,
        setSkillMsg: setSkillMsg,
				skillEffect: skillEffect,
        turnIdx: turnIdx + 1,
        timeLine: timeLine,
        resetOrder: resetOrder,
        setAllyEffect: setAllyEffect,
        setEnemyEffect: setEnemyEffect,
        gameData: gameData,
        battleAlly: battleAlly,
        battleEnemy: battleEnemy,
        gameSpd: gameSpd,
        bgm: bgm,
        setAllyAction: setAllyAction,
        setEnemyAction: setEnemyAction,
        setLandCriticalEffect: setLandCriticalEffect,
        allyPos: allyPos,
        enemyPos: enemyPos,
        modeRef: modeRef,
        setMode: setMode,
        setWeather: setWeather,
        allyEnemyPassive: allyEnemyPassive,
        allyPassive: allyPassive,
        enemyPassive: enemyPassive,
        setAllyEnemyPassive: setAllyEnemyPassive,
        allyEnemyBuff: allyEnemyBuff,
        allyBuff: allyBuff,
        enemyBuff: enemyBuff,
        setAllyEnemyBuff: setAllyEnemyBuff,
        atkOption: {
          atkCount: atkC,
          atkStay: atkS,
        }
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
				} else if (skillCate === 10) {//날씨 변경
					if (Math.random() < skill.buff[0].num[timeLine[turnIdx].order.skLv - 1].split('%')[0] / 100) {
						setTimeout(() => {
							setWeather((prev) => {
								return {
									...prev,
									type:'w' + String(skill.buff[0].type).split('.')[0],
									day: String(skill.buff[0].type).split('.')[1],
									delay:1,
								}
							});
						}, 500);
					} else {
						console.log('fail');
					}
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
				} else if (skillCate === 10) {//날씨 변경
					if (Math.random() < skill.buff[0].num[timeLine[turnIdx].order.skLv - 1].split('%')[0] / 100) {
						setTimeout(() => {
							setWeather((prev) => {
								return {
									...prev,
									type:'w' + String(skill.buff[0].type).split('.')[0],
									day: String(skill.buff[0].type).split('.')[1],
									delay:1,
								}
							});
						}, 500);
					} else {
						console.log('fail');
					}
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
				elementDefencePercent = 0;
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
									const counterChance = Math.random() < .1; //반격 확률
									if (counterChance && atkS === 0 && timeLine[turnIdx].order.skIdx !== 17 && timeLine[turnIdx].order.targetIdx.length === 1) {//반격 확률 계산, 연속공격중 마지막일때만, 반격이 아닐경우, 광역기가 아닐경우
										timeLine.splice(turnIdx + 1, 0, {
											order:{
												team: timeLine[turnIdx].order.team === 'ally' ? 'enemy' : 'ally',
												idx: timeLine[turnIdx].order.targetIdx[0],
												skIdx: 17,
												skLv: 1,
												enemyTarget: true,
												target: timeLine[turnIdx].order.team === 'ally' ? allyPos[timeLine[turnIdx].order.idx].pos : enemyPos[timeLine[turnIdx].order.idx],
												targetIdx: [timeLine[turnIdx].order.idx],
												sp: 0,
											},
											state:defencer[0].ch.state,
										});
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

						//쪼기(0),할퀴기(1),물기(2),치기(3),누르기(4),던지기(5),빛(6),어둠(7),물(8),불(9),바람(10),땅(11)
						elementDefencePercent = skType > 0 ? (defEnemy[`el${skType - 1}`] + defEnemy[`iSt${skType + 15}`]) / 100 : 1; //속성치에 따른 방어적용치
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
							if (chkIdx === 2) { //방어
								sk = defEnemy.hasSkill.filter((skData) => {
									if (skData.idx === 2) {
										return skData;
									};
								});
							} else if (chkIdx === 13) { //철벽방어
								sk = defEnemy.hasSkill.filter((skData) => {
									if (skData.idx === 13) {
										return skData;
									};
								});	
							} else if (chkIdx === 14) { //마법방어
								sk = defEnemy.hasSkill.filter((skData) => {
									if (skData.idx === 14) {
										return skData;
									};
								});	
							} else if (chkIdx === 15) { //나무뒤에 숨기
								sk = defEnemy.hasSkill.filter((skData) => {
									if (skData.idx === 15) {
										return skData;
									};
								});	
							}
						});
						if (Object.keys(sk).length !== 0) {
							gameData.skill[sk[0].idx].eff.forEach((skData) => {
								const stateName = util.getStateName(skData.type);
								const skill = sk[0].lv > 5 ? 5 : sk[0].lv;
								defNum[stateName] = util.getPercentNumber(skData.num[skill - 1], defEnemy[stateName]);
							})
						} else {
							defNum = defEnemy;
						}
						let attackerSkill = [];
						if (timeLine[turnIdx].order.skIdx === 17) {
							attackerSkill = [{
								idx: 17,
								lv: 1,
							}];
						} else {
							attackerSkill = attacker.hasSkill.filter((skData) => {
								return skData.idx === timeLine[turnIdx].order.skIdx;
							});
						}
						gameData.skill[attackerSkill[0].idx].eff.forEach((skData) => {
							const stateName = util.getStateName(skData.type);
							const skill = attackerSkill[0].lv > 5 ? 5 : attackerSkill[0].lv;
							atkNum[stateName] = util.getPercentNumber(skData.num[skill - 1], attacker[stateName]);
						});
						// dmg_ = (criticalAtk ? atkNum[attackType] * elementDmg * 2 : atkNum[attackType] * elementDmg) - (defNum[defenceType] || defEnemy[defenceType]);
						const defCount = (defNum[defenceType] || defEnemy[defenceType]) * elementDefencePercent;
						dmg_ = atkNum[attackType] - (criticalAtk ? defCount * .33 : defCount);//크리티컬이면 방어 1/3로 줄임
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
							// if (targets.length === 25){
							// 	targets.forEach((data, idx) => {
							// 		let chk = false;
							// 		targetIdx.forEach((taIdx) => {
							// 			if (taIdx === data) {
							// 				chk = true;
							// 				return;
							// 			}
							// 		});
							// 		if (chk) { //스킬 맞는 위치와 범위값중 일치하는지 확인
							// 			targetArr[idx] = {
							// 				posIdx:data,
							// 				animation:0,
							// 				dmg:Math.floor(dmg[targetCount]),
							// 			};
							// 			targetCount ++;
							// 		} else {
							// 			targetArr[idx] = {
							// 				posIdx:data,
							// 				animation:0,
							// 			};
							// 		}
							// 	});
							// 	targetArr[12].posIdx = 12;
							// 	targetArr[12].animation = gameData.skill[skillIdx].effAnimation;
							// } else {
								targets.forEach((data, idx) => {
									let chk = false;
									targetIdx.forEach((taIdx) => {
										if (taIdx === data) {
											chk = true;
										}
									});
									const effSize = (timeLine[turnIdx].order.skLv - 1) * 0.5 + gameData.skill[skillIdx].effSize,
										effRotate = gameData.skill[skillIdx].effRotate,
										effFilter = gameData.skill[skillIdx].effFilter;
									if (chk) { //스킬 맞는 위치와 범위값중 일치하는지 확인
										targetArr[idx] = {
											posIdx:data,
											animation:gameData.skill[skillIdx].effAnimation,
											dmg:Math.floor(dmg[targetCount]),
											size:effSize,
											rotate:effRotate,
											filter:effFilter,
										};
										targetCount ++;
									} else {
										targetArr[idx] = {
											posIdx:data,
											animation:gameData.skill[skillIdx].effAnimation,
											size:effSize,
											rotate:effRotate,
											filter:effFilter,
										};
									}
								});
							// }
							if (timeLine[turnIdx].order.team === 'ally') { //적군 영역 effect효과
								if (skillCate === 5) {//버프
									setAllyEffect([
										...targetArr,
									]);
								} else {
									setEnemyEffect([
										...targetArr,
									]);
									defencer.forEach((defData, idx) => {
										battleEnemy[defData.idx].hp -= dmg[idx];
										if (typeof dmg[idx] === 'number') {
											if (buffDebuff[defData.idx] === undefined){
												buffDebuff[defData.idx] = [];
											}
											battleEnemy[defData.idx].buffDebuff = [...buffDebuff[defData.idx]];
											passiveBuff(gameData, battleAlly, battleEnemy, allyEnemyPassive, allyPassive, enemyPassive, setAllyEnemyPassive, allyEnemyBuff, allyBuff, enemyBuff, setAllyEnemyBuff, allyPos, enemyPos, false);
										}
										if (battleEnemy[defData.idx].hp < 0) {//다이
											enemyAction[defData.idx] = 'die';
											battleEnemy[defData.idx].hp = 0;
											battleEnemy[defData.idx].state = 'die';
											// console.log('die', defData.idx, battleEnemy[defData.idx].state);
										}
									});
									setTimeout(() => {
										endGameCheck();
									}, 2000);
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
											passiveBuff(gameData, battleAlly, battleEnemy, allyEnemyPassive, allyPassive, enemyPassive, setAllyEnemyPassive, allyEnemyBuff, allyBuff, enemyBuff, setAllyEnemyBuff, allyPos, enemyPos, false);
										}
										if (battleAlly[defData.idx].hp < 0) {//다이
											allyAction[defData.idx] = 'die';
											battleAlly[defData.idx].hp = 0;
											battleAlly[defData.idx].state = 'die';
											// console.log('die', defData.idx, battleAlly[defData.idx].state);
										}
									});
									setTimeout(() => {
										endGameCheck();
									}, 2000);
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
								actionAnimation({
                  setTurnIdx: setTurnIdx,
                  setSkillMsg: setSkillMsg, 
									skillEffect: skillEffect,
                  turnIdx: turnIdx_,
                  timeLine: timeLine,
                  resetOrder: resetOrder,
                  setAllyEffect: setAllyEffect,
                  setEnemyEffect: setEnemyEffect,
                  gameData: gameData,
                  battleAlly: battleAlly,
                  battleEnemy: battleEnemy,
                  gameSpd: gameSpd,
                  bgm: bgm,
                  setAllyAction: setAllyAction,
                  setEnemyAction: setEnemyAction,
                  setLandCriticalEffect: setLandCriticalEffect,
                  allyPos: allyPos,
                  enemyPos: enemyPos,
                  modeRef: modeRef,
                  setMode: setMode,
                  setWeather: setWeather,
                  allyEnemyPassive: allyEnemyPassive,
                  allyPassive: allyPassive,
                  enemyPassive: enemyPassive,
                  setAllyEnemyPassive: setAllyEnemyPassive,
                  allyEnemyBuff: allyEnemyBuff,
                  allyBuff: allyBuff,
                  enemyBuff: enemyBuff,
                  setAllyEnemyBuff: setAllyEnemyBuff,
                  atkOption: {
                    atkCount: atkC,
                    atkStay: atkS,
                  }
                });
							}, ((skillEffect[targetArr[0].animation].frame / 10) * 1125 * (skill.effAnimationRepeat || 1)) / gameSpd);//공격 이펙트 효과시간
						}, 150 / gameSpd);
					}, 600 / gameSpd);//메시지창 사라짐
				}, 150 / gameSpd);//메시지 오픈
			}, 600 / gameSpd);
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
const relationCheck = (sData, gameData, team, teamChk) => {
	const relation = gameData.relation;
	let rtMemberArr = [];
	team.forEach((chData) => {
		const team_ = teamChk === 'ally' ? sData.ch[chData].idx : chData.idx;
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
					const ii = teamChk === 'ally' ? sData.ch[teamIdx].idx : teamIdx.idx;
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
const getWeather = (weather) => {
	return weather.type.split('w')[1]*2 + (weather.day ? 0 : 1);
}
const changeWeather = (weather) => {
	let type = weather.type.split('w')[1]*1,
		type_ = type,
		wind = weather.wind,
		delay = weather.delay;
	const typePercent = Math.random(),
		windPercent = Math.random();
	if (typePercent < .1) {
		type = 4;
	} else if (typePercent < .3) {
		type = type - 1 < 0 ? 0 : type - 1;
	} else if (typePercent < .5) {
		type = type + 1 > 4 ? 4 : type + 1;
	}
	if (windPercent < .1) {
		wind = wind - 20 < 0 ? 0 : wind - 20;
	} else if (windPercent < .2) {
		wind = wind + 20 < 360 ? 360 : wind + 20;
	} else if (windPercent < .4) {
		wind = wind - 10 < 0 ? 0 : wind - 10;
	} else if (windPercent < .6) {
		wind = wind + 10 < 360 ? 360 : wind + 10;
	}
	if (delay <= 0) {
		return {
			type:'w' + type,
			wind:wind,
			day:weather.day === 0 ? 1 : 0,
			delay:delay,
		}
	} else {
		return {
			type:'w' + type_,
			wind:wind,
			day:weather.day,
			delay:delay - 1,
		}
	}
}

const passiveBuff = (gameData, battleAlly, battleEnemy, allyEnemyPassive, allyPassive, enemyPassive, setAllyEnemyPassive, allyEnemyBuff, allyBuff, enemyBuff, setAllyEnemyBuff, allyPos, enemyPos, buffTurn) => {
	allyPassive = [];
	enemyPassive = [];
	let battleAllyCopy = battleAlly;
	//아군 패시브 체크
	let passiveAllySkill = [];
	battleAllyCopy.forEach((ally) => {
		ally.nowhp = ally.hp;
	});
	battleAllyCopy.forEach((ally, allyIdx) => {
		if (ally.state === 'die') {
			ally.sk.forEach((allySkill) => {//죽은 캐릭 스킬
				const gameDataSkill = gameData.skill[allySkill.idx];
				const state = util.getStateName(gameDataSkill.eff[0].type);
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
			const state = util.getStateName(passiveType);
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
						//test
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
	allyBuff = allyEnemyBuff[0] || [];
	let allyDmgArr = [],//데미지 애니메이션
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
				state = util.getStateName(buff.type);
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
				case 'stun':
					state = '';
					ccSingle = 'stun';
					cc += ' stun';
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
					const buffCount = buffTurn ? --buff.count : buff.count;
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
					if (buffTurn) {
						if (num.indexOf('%') > 0) {
							const percent = parseInt(num) / 100;
							ally[state] = percent < 0 ? ally[state] - ally[state] * Math.abs(percent) : ally[state] + ally[state] * percent;
							ally[state] = ally[state] < 0 ? 0 : ally[state];
						} else {
							ally[state] = ally[state] + Number(num)  < 0 ? 0 : ally[state] + Number(num);
						}
					}
					//데미지 애니메이션
					if (allyDmgArr[ccSingle] === undefined) {
						allyDmgArr[ccSingle] = [];
					}
					allyDmgArr[ccSingle].push({
						posIdx:allyPos[chIdx],
						animation:buff.animation,
						dmg:Number(buff.num),
					});
					if (state === 'hp') {
						ally['buff' + state] = ally[state];
					}
					const buffCount = buffTurn ? --buff.count : buff.count;
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
	battleAlly = battleAllyCopy;

	let battleEnemyCopy = [...battleEnemy];
	//적군 패시브 체크
	let passiveEnemySkill = [];
	battleEnemyCopy.forEach((enemy) => {
		enemy.nowhp = enemy.hp;
	});
	battleEnemyCopy.forEach((enemy, enemyIdx) => {
		if (enemy.state === 'die') {
			enemy.sk.forEach((enemySkill) => {//죽은 캐릭 스킬
				const gameDataSkill = gameData.skill[enemySkill.idx];
				const state = util.getStateName(gameDataSkill.eff[0].type);
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
			const state = util.getStateName(passiveType);
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
	enemyBuff = allyEnemyBuff[1] || [];
	let enemyDmgArr = [];//데미지 애니메이션
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
				state = util.getStateName(buff.type);
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
				case 'stun':
					state = '';
					ccSingle = 'stun';
					cc += ' stun';
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
					const buffCount = buffTurn ? --buff.count : buff.count;
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
					if (buffTurn) {
						if (num.indexOf('%') > 0) {
							const percent = parseInt(num) / 100;
							enemy[state] = percent < 0 ? enemy[state] - enemy[state] * Math.abs(percent) : enemy[state] + enemy[state] * percent;
							enemy[state] = enemy[state] < 0 ? 0 : enemy[state];
						} else {
							enemy[state] = enemy[state] + Number(num)  < 0 ? 0 : enemy[state] + Number(num);
						}
					}
					//데미지 애니메이션
					if (enemyDmgArr[ccSingle] === undefined) {
						enemyDmgArr[ccSingle] = [];
					}
					enemyDmgArr[ccSingle].push({
						posIdx:enemyPos[chIdx],
						animation:buff.animation,
						dmg:Number(buff.num),
					});
					if (state === 'hp') {
						enemy['buff' + state] = enemy[state];
					}
					const buffCount = buffTurn ? --buff.count : buff.count;
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
	battleEnemy = battleEnemyCopy;
	setAllyEnemyPassive([allyPassive, enemyPassive]);//패시브효과 전달
	setAllyEnemyBuff([allyBuff, enemyBuff]);//버프효과 전달
	return {
		allyDmgArr: allyDmgArr,
		enemyDmgArr: enemyDmgArr,
		timeDelay:timeDelay,
	}
}
const Battle = ({
	saveData,
  changeSaveData,
}) => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const lang = React.useMemo(() => {
    return context.setting.lang;
  }, [context]);
  const speed = React.useMemo(() => {
    return context.setting.speed;
  }, [context]);
  const bgm = React.useMemo(() => {
    return context.setting.bgm;
  }, [context]);
  const imgSet = React.useMemo(() => {
    return context.images;
  }, [context]);
  const gameData = React.useMemo(() => {
    return context.gameData;
  }, [context]);
	const sData = React.useMemo(() => saveData && Object.keys(saveData).length !== 0 ? saveData : util.loadData('saveData'), [saveData]);
  const paramData = React.useMemo(() => {
    return util.loadData('historyParam');
  }, []);
	const isScenario = React.useMemo(() => typeof paramData.scenario.stageIdx === 'number', [paramData]);
	const scenarioDetail = React.useMemo(() => {
		return isScenario ? gameData.scenario[paramData.scenario.stay][paramData.scenario.dynastyIdx].scenarioList[paramData.scenario.dynastyScenarioIdx].stage[paramData.scenario.stageIdx] : {
			title: gameData.msg.button['startExploring'][lang],
			lineup: 0,
			map: Array.from({length:50}, () => {
				const num = Math.round(Math.random() * 11),
					landType = Math.floor(num / 3),
					land = num % 3;
				return (5 * landType) + land;
			}),
			entry:[
				{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
				{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
				{idx:'', lv:1, },{idx:'', lv:1, },{pos:0,idx:27, lv:1, grade:4, items: [
					{idx:0, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
					{idx:1, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
					{idx:2, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
					{idx:4, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['12']}],addEff:[]},
					{},
					{},
					{},
					{},
				]},{idx:'', lv:1, },{idx:'', lv:1, },
				{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
				{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
			],
		};
	}, [gameData, isScenario, paramData, lang]);
	const viewScenario = React.useMemo(() => {
		return isScenario ? sData.scenario[paramData.scenario.stay][paramData.scenario.dynastyIdx].scenarioList[paramData.scenario.dynastyScenarioIdx].stage[paramData.scenario.stageIdx].first : false;
	}, [sData, isScenario, paramData]);
	const mapLand = React.useMemo(() => scenarioDetail.map, [scenarioDetail]);
	const allyDeck = useRef(sData.lineup.save_slot[sData.lineup.select].entry);//캐릭터 저장된 카드index
	const enemyDeck = React.useMemo(() => scenarioDetail.entry, [scenarioDetail]);
	const [containerW, setContainerW] = useState();
	const containerWH = useRef([0,0]);
	const mapSize = React.useMemo(() => 20, []);
	const [weather, setWeather] = useState({
		type:'w0',//w0:맑음, w1:흐림, w2:비, w3:천둥, w4:눈
		day:true,//낮 밤
		wind:0,//바람
		delay:0//턴 유지
	});//날씨
	const battleUnitRef = useRef();//유닛 공간
	const battleLandRef = useRef();//지형 공간
	const battleEffectRef = useRef();//이펙트 공간
	const bgCanvasRef = useRef();//날씨 캔버스
	const allyOrders = useRef([]);//아군 행동저장배열
	const enemyOrders = useRef([]);//적군 행동저장배열
	const timeLine = useRef([]);//공격 순번배열
	const enemyAi = useRef([]);//적군 지능저장배열
	const currentSkill = useRef();//현재 선택된 스킬
	const currentAllyIdx = useRef(0); //아군 순번 증가 index
	const currentEnemyIdx = useRef(0); //적군 순번 증가 index
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
	const scenarioRepeat = useRef(true);//시나리오 처음 입장인지 확인(대화집 pass 여부)
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
	// const allyEnemyPassiveRef = useRef([[],[]]);//아군,적군 패시브
	// const allyEnemyBuffRef = useRef([[],[]]);//아군,적군 버프
	const [allyEnemyPassive, setAllyEnemyPassive] = useState([[],[]]);
	const allyBuff = useRef([]);//아군 버프
	const enemyBuff = useRef([]);//적군 버프
	const [allyEnemyBuff, setAllyEnemyBuff] = useState([[],[]]);

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
		allyDeck.current.filter((data, idx) => {
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
		const allyRelation = relationCheck(sData, gameData, ally, 'ally');
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
		const enemyRelation = relationCheck(sData, gameData, enemy_, 'enemy');
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
		if (viewScenario) {//시나리오 시청
			scenarioRepeat.current = false;
			conversationData.current = gameData.scenario[paramData.scenario.stay][paramData.scenario.dynastyIdx].scenarioList[paramData.scenario.dynastyScenarioIdx].stage[paramData.scenario.stageIdx].conversation;
			conversationList.current.push(conversationData.current[0]);
			setMode('scenario');
			conversationCount.current = 0;
			conversationTimeout.current = setInterval(conversationInterval, 50);
		} else {//시나리오 패스
			setTimeout(() => {
				setMode('relation');
			}, 75 / speed);
		}
		ally.forEach((data, idx) => {//능력치 셋팅
			const saveCh = sData.ch[data];
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
		if (weather.delay <= 0) {
			setWeather({
				...weather,
				type:'w' + Math.floor(Math.random() * 5),
				wind:Math.floor(Math.random() * 36) * 10,
				day:true,
			});
		} else {
			setWeather({
				...weather,
				delay:weather.delay - 1,
			})
		}
		return () => {//언마운트 리셋
			clearInterval(conversationTimeout.current);
			if (isScenario) {
				let saveD = {...sData};
				saveD.scenario[paramData.scenario.stay][paramData.scenario.dynastyIdx].scenarioList[paramData.scenario.dynastyScenarioIdx].stage[paramData.scenario.stageIdx].first = scenarioRepeat.current;
				changeSaveData(saveD);
			}
		}
	}, []);
	useLayoutEffect(() => {
		if (weather.type === 'w2' || weather.type === 'w3') {
			const can = bgCanvasRef.current;
			can.setAttribute('width', containerWH.current[1]);
			can.setAttribute('height', containerWH.current[1]);
			can.style.left = (containerWH.current[0] - containerWH.current[1]) / 2 + 'px';
			can.style.transform = `rotate(${180 + weather.wind}deg)`; 
			const ctx = can.getContext('2d');
			const drops = [];
			class Drop {
        constructor(index, x, y, speed, length) {
          this.index = index;
          this.x = x;
          this.y = y;
          this.speed = speed;
          this.length = length;
          this.draw();
        }
        draw() {
          ctx.beginPath();
          ctx.strokeStyle = '#dfdfdf';
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.x, this.y + this.length);
          ctx.stroke();
          ctx.closePath();
        }
      }
			const render = () => {
				ctx.clearRect(0, 0, can.width, can.height);
				drops.forEach((drop) => {
          drop.y += drop.speed;
          if (drop.y > can.height) {
            drop.y = Math.random() * -30;
            drop.x = Math.random() * can.width;
            drop.speed = Math.random() * 3 + 1;
            drop.length = Math.random() * 7 + 2;
          }
          drop.draw();
        });
        requestAnimationFrame(render); //반복
			}
			let tempX, tempY, tempSpeed, tempLength;
			for (let i = 0; i < 250; i++) {
        tempY = Math.random() * -150;
        tempX = Math.random() * can.width;
        tempSpeed = Math.random() * 3 + 1;
        tempLength = Math.random() * 7 + 2;

        drops.push(new Drop(i, tempX, tempY, tempSpeed, tempLength));
      }
      render();
		} else if (weather.type === 'w4') {
			const can = bgCanvasRef.current;
			can.setAttribute('width', containerWH.current[1]);
			can.setAttribute('height', containerWH.current[1]);
			can.style.left = (containerWH.current[0] - containerWH.current[1]) / 2 + 'px';
			can.style.transform = `rotate(${180 + weather.wind}deg)`; 
			const ctx = can.getContext('2d');
			const drops = [];
			class Drop {
        constructor(index, x, y, speed, size, opacity) {
          this.index = index;
          this.x = x;
          this.y = y;
          this.speed = speed;
          this.size = size;
					this.opacity = opacity;
          this.draw();
        }
        draw() {
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
          ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
          ctx.fill();
          ctx.closePath();
        }
      }
			const render = () => {
				ctx.clearRect(0, 0, can.width, can.height);
				drops.forEach((drop) => {
          drop.y += drop.speed;
          if (drop.y > can.height) {
            drop.y = Math.random() * -30;
            drop.x = Math.random() * can.width;
            drop.speed = Math.random() * 1.5 + 0.2;
            drop.size = Math.random() * 4 + 1;
						drop.opacity = Math.random()* 0.7 + 0.3;
          }
          drop.draw();
        });
        requestAnimationFrame(render); //반복
			}
			let tempX, tempY, tempSpeed, tempSize, tempOpacity;
			for (let i = 0; i < 250; i++) {
        tempY = Math.random() * -150;
        tempX = Math.random() * can.width;
        tempSpeed = Math.random() * 1.5 + 0.2;
        tempSize = Math.random() * 4 + 1;
				tempOpacity = Math.random()* 0.7 + 0.3;

        drops.push(new Drop(i, tempX, tempY, tempSpeed, tempSize, tempOpacity));
      }
      render();
		}
	}, [weather]);
	const resetOrder = (mode) => {
		setOrderIdx(0);
		setTurnIdx('');
		allyOrders.current = [];
		timeLine.current = [];
		modeRef.current = mode;
		setMode(mode);
	};
	const areaAllySelect = (e, pos) => {
		if (currentSkill.current?.sk?.cate[0] !== 5) {
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
		if (currentSkill.current?.sk?.cate[0] === 5) {
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
					setMsg(gameData.msg.sentence.lackSkillPoint[lang]);
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
					case 10: //날씨 변경
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
							targetIdx: util.getEffectArea(20, 13),
							target: allyPos.current[orderIdx].pos,
							sp: -skill.sp,
						});
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
		if (state && (state.indexOf('petrification') >= 0 || state.indexOf('confusion') >= 0 || state.indexOf('stun') >= 0)) { //상태 이상일 경우 다음 캐릭으로 이동
			setOrderIdx((prev) => ++prev);
		}
	}, [orderIdx]);
	useLayoutEffect(() => {
	}, [allyEnemyPassive, allyEnemyBuff]);
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
						}, 1500 / speed);
					}, 975 / speed);
				}, (1500 + allyRelationArr.current.length * 225) / speed);
			} else {
				setMode('passive');
				setTimeout(() => {
					allyRelationArr.current = '';
					relationCh.current = {};
				}, 1500 / speed);
			}
		} else if (mode === 'passive') {
			setTimeout(() => {
				setAllyEnemyPassive([allyPassive.current, enemyPassive.current]);//패시브효과 전달
				setMode('wait');
				setTimeout(() => {
					setMode('order');
					setOrderIdx(0);
				}, 750 + allyPassive.current.length * 375 / speed);
			}, 1500 / speed);
		} else if (mode === 'action') {
			setWeather(changeWeather(weather));//날씨 변경
			const turnPass = true;
			const pB = passiveBuff(gameData, battleAlly.current, battleEnemy.current, allyEnemyPassive, allyPassive.current, enemyPassive.current, setAllyEnemyPassive, allyEnemyBuff, allyBuff.current, enemyBuff.current, setAllyEnemyBuff, allyPos.current, enemyPos.current, turnPass);

			//행동 포인트 수정
			battleAlly.current.map((data, idx) => {
				data.sp += allyOrders.current[idx].sp || 0;
				if (data.sp > data.sp_) {
					data.sp = data.sp_;
				}
			});
			if (pB.enemyDmgArr['bleeding'] || pB.allyDmgArr['bleeding']) {
				pB.timeDelay += 750 / speed;
				if (pB.allyDmgArr['bleeding']) {
					setAllyEffect(pB.allyDmgArr['bleeding']);
				}
				if (pB.enemyDmgArr['bleeding']) {
					setEnemyEffect(pB.enemyDmgArr['bleeding']);
				}
				if (pB.enemyDmgArr['addicted'] || pB.allyDmgArr['addicted']) {
					pB.timeDelay += 750 / speed;
					setTimeout(() => {
						if (pB.allyDmgArr['addicted']) {
							setAllyEffect(pB.allyDmgArr['addicted']);
						}
						if (pB.enemyDmgArr['addicted']) {
							setEnemyEffect(pB.enemyDmgArr['addicted']);
						}
					}, 750 / speed);
				}
			} else if (pB.enemyDmgArr['addicted'] || pB.allyDmgArr['addicted']) {
				pB.timeDelay += 750 / speed;
				if (pB.allyDmgArr['addicted']) {
					setAllyEffect(pB.allyDmgArr['addicted']);
				}
				if (pB.enemyDmgArr['addicted']) {
					setEnemyEffect(pB.enemyDmgArr['addicted']);
				}
			}
			setTimeout(() => {
				setAllyEffect([]);
				setEnemyEffect([]);
				timeLineSet();//타임라인 구성
				setTurnIdx(0);
				actionAnimation({
          setTurnIdx: setTurnIdx,
          setSkillMsg: setSkillMsg,
					skillEffect: imgSet.effect,
          turnIdx: 0,
          timeLine: timeLine.current,
          resetOrder: resetOrder,
          setAllyEffect: setAllyEffect,
          setEnemyEffect: setEnemyEffect,
          gameData: gameData,
          battleAlly: battleAlly.current,
          battleEnemy: battleEnemy.current,
          gameSpd: speed,
          bgm: bgm,
          setAllyAction: setAllyAction,
          setEnemyAction: setEnemyAction,
          setLandCriticalEffect: setLandCriticalEffect,
          allyPos: allyPos.current,
          enemyPos: enemyPos.current,
          modeRef: modeRef.current,
          setMode: setMode,
          setWeather: setWeather,
          allyEnemyPassive: allyEnemyPassive,
          allyPassive: allyPassive.current,
          enemyPassive: enemyPassive.current,
          setAllyEnemyPassive: setAllyEnemyPassive,
          allyEnemyBuff: allyEnemyBuff,
          allyBuff: allyBuff.current,
          enemyBuff: enemyBuff.current,
          setAllyEnemyBuff: setAllyEnemyBuff,
          atkOption: {},
        });
			}, pB.timeDelay);
		} else if (mode === 'battleWin') {
			console.log('pgs', '격!퇴!성!공!');
			if (!isScenario) { //탐색 모드시 룰렛 데이터 제거
				util.saveData('historyParam', {
					...util.loadData('historyParam'),
					roulette: {base: {},add: {}, lv: {}, map: {}},
				});
			}
			let saveD = {...sData};
			if (isScenario) {
				saveD.scenario[paramData.scenario.stay][paramData.scenario.dynastyIdx].scenarioList[paramData.scenario.dynastyScenarioIdx].stage[paramData.scenario.stageIdx].first = scenarioRepeat.current;
			}
			setWeather({
				type:'',
				day:true,
				wind:0,
				delay:0,
			});
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
					if (!isScenario) { //탐색 모드시 룰렛 데이터 제거
						util.saveData('historyParam', {
							...util.loadData('historyParam'),
							roulette: {base: {},add: {}, lv: {}, map: {}},
						});
					}
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
	const map = Array.from({length: 25}, (undefined, i) => {
		return {idx: i}
	});
  return (
    <>
			<BattleHeader className="header battle_header">
				<BackButton className="back">
					<IconPic className="ico" type="commonBtn" pic="icon100" idx={0} onClick={() => {
						util.saveData('historyParam', {
							...util.loadData('historyParam'),
							roulette: {base: {},add: {}, lv: {}, map: {}},
						});
						util.historyBack(navigate);
					}}></IconPic>
				</BackButton>
				<BattleTitle flex-h-center="true">
					<div className="scenario_title">{isScenario ? scenarioDetail.title[lang] : scenarioDetail.title}</div>
					<div className="team_summary">
						<div style={{width: teamPower.current.allyPercent+"%"}} className="ally_team gradient_dark"></div>
						<div style={{width: teamPower.current.enemyPercent+"%"}} className="enemy_team gradient_dark"></div>
						<TeamIcon style={{left: teamPower.current.allyPercent+"%"}} className="team_bullet">
							<IconPic type="element" pic="icon100" idx={13} />
						</TeamIcon>
						<div className="ally_power">{teamPower.current.allyHp}</div>
						<div className="enemy_power">{teamPower.current.enemyHp}</div>
					</div>
				</BattleTitle>
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
						const chData = gameData.ch[data.idx || 0];
						return idx <= conversationStepRef.current && (
						<div key={idx} className={`scenario_box ${data.pos} ${data.team}`} flex-center="true">
								<div className="scenario_ch">
									{/* <CardChRing>
                    <ChPic isThumb={true} type="cardBack" pic="card" idx={0} />
									</CardChRing>
									<CardCh isThumb={true} pic="ch" idx={chData?.display} /> */}
									<CharacterCard usedType="conversation" saveData={saveData} gameData={gameData} saveCharacter={data} gameSpd={speed} />
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
				<BattleEnd className="battle_end" onClick={() => {
					util.historyBack(navigate);
				}} flex-h-center="true">
					<div className="battle_title">격!퇴!성!공!</div>
					<div className="battle_result_ch" flex-h-center="true">
						{battleAlly.current && battleAlly.current.map((allyData, idx) => {
							const battleGrade = getExp(allyData, battleEnemy.current);
							resultExp.current[idx] = battleGrade.exp;
							resultBeige.current[idx] = battleGrade.grade;
							const exp = [allyData.hasExp , gameData.hasMaxExp[allyData.grade]];
							return (
								<div className="battle_end_ch" key={idx} flex-center="true">
									<div className="end_ch">
										<CharacterCard usedType="battle" saveData={saveData} gameData={gameData} saveCharacter={allyData} gameSpd={speed} />
									</div>
									<div className="battle_end_contribution" flex-h-center="true">
										<div className="battle_end_hpexp" flex-center="true">
												<div className="battle_end_hp"><span>기여도:</span><span className="num">{Math.round(allyData.totalDmg) || 0}</span></div>
												<div className="battle_end_exp"><span>경험치:</span><span className="num">{Math.round(battleGrade.exp)}</span></div>
												<div className="battle_end_grade">{battleGrade.grade}</div>
										</div>
										<div className="battle_end_expBar">
											<div className="bar"><em className="gradient_dark transition" style={{
												width: exp[0] === 0 ? 0 : (exp[0] / exp[1]).toFixed(1),
											}}></em></div>
											<div className="txt">{Math.round(exp[0])} / {exp[1]}</div>
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
				</BattleEnd>
			)}
			{mode === "battleLose" && (
				<div className="battle_end" onClick={() => {
					util.historyBack(navigate);
				}} flex-h-center="true">
					<div className="battle_title">격퇴실패</div>
				</div>
			)}
      <BattleWarp className={`battle_wrap ${mode}`} backImg={imgSet.back[1]}>
				<BgEffect className={`bgEffect ${mode === "action" ? "action" : ""}`} img1={imgSet.bgEffect[0]} img2={imgSet.bgEffect[1]} gameSpd={speed}>
					{weather.type === "w0" && (
						<>
							<BgLight className="bg_light" type={weather.type} day={weather.day}>
								{weather.day && (
									<div>
										<span className="circle"></span>
										<span className="circle"></span>
										<span className="circle"></span>
										<span className="circle"></span>
										<span className="circle"></span>
									</div>
								)}
							</BgLight>
						</>
					)}
					{weather.type === "w1" && (
						<>
							<BgLight className="bg_light" type={weather.type} day={weather.day}/>
							<div className="cloud cloud1" style={{filter:`brightness(${weather.day ? 1 : 0.3})`}}></div>
							<div className="cloud cloud2" style={{filter:`brightness(${weather.day ? 1 : 0.3})`}}></div>
						</>
					)}
					{weather.type === "w2" && (
						<>
							<BgLight className="bg_light" type={weather.type} day={weather.day}/>
							<canvas className="bg_rain" ref={bgCanvasRef}></canvas>
						</>
					)}
					{weather.type === "w3" && (
						<>
							<BgLight className="bg_light lightning" type={weather.type} day={weather.day}/>
							<canvas className="bg_rain" ref={bgCanvasRef}></canvas>
						</>
					)}
					{weather.type === "w4" && (
						<>
							<BgLight className="bg_light" type={weather.type} day={weather.day}/>
							<canvas className="bg_snow" ref={bgCanvasRef}></canvas>
						</>
					)}
				</BgEffect>
				{allyRelationArr.current && (
					<RelationArea className={`relation_area ${mode === "relation" ? "on" : ""}`} rtHeight={relationHeight.current} gameSpd={speed}>
						<div className="relationTitle"><span>인!</span><span>연!</span><span>발!</span><span>동!</span></div>
						{allyRelationArr.current.map((rtData, idx) => {
							const rtName = gameData.relation[rtData.idx].na[lang];
							return (
								<RelationName key={idx} className="relationName" idx={idx} color={rtData.color} gameSpd={speed}>{rtName}</RelationName>
							)
						})}
					</RelationArea>
				)}
				<BattleArea ref={(node) => {
					if (node !== null) {
						const area = node.getBoundingClientRect(),
							areaH = area.height * 0.5;
						if (battleUnitRef?.current) {
							battleUnitRef.current.children[0].style.width = areaH + 'px';
							battleUnitRef.current.children[1].style.width = areaH + 'px';
						}
						if (battleLandRef?.current) {
							battleLandRef.current.children[0].style.width = areaH + 'px';
							battleLandRef.current.children[1].style.width = areaH + 'px';
						}
						if (battleEffectRef?.current) {
							battleEffectRef.current.children[0].style.width = areaH + 'px';
							battleEffectRef.current.children[1].style.width = areaH + 'px';
						}
						containerWH.current = [area.width, area.height];
					}
				}} className={`battle_area ${mode === "action" ? "action" : ""}`} mode={mode} frameLeft={imgSet.etc.frameLeft} frameRight={imgSet.etc.frameRight}>
					<BattleEffect ref={battleEffectRef} className="battle_effect">
						<div className={`land_enemy ${enemyEffect.length === 25 ? "allEff" : ""}`}>
						{map.map((data, idx) => {
							const left = idx % 5 * mapSize,
								top = Math.floor(idx / 5) * mapSize;
							let effectChk = false,
								effAnimation = '',
								effNum = '',
								effSize = '',
								effRotate = '',
								effFilter = '';
							enemyEffect.forEach((effData) => {
								if (effData.posIdx === idx) {
									effectChk = true;
									effAnimation = effData.animation;
									effNum = effData.dmg;
									effSize = effData.size;
									effRotate = effData.rotate;
									effFilter = effData.filter;
								}
							});
							const effChk = effNum && effNum !== 0;
							return (
								<EffLand key={idx} className={`effect_land ${effChk ? 'dmg' : ''}`} size={effSize} rotate={effRotate} filter={effFilter} left={left} top={top} gameSpd={speed}>
									{effectChk && (
										<>
											<Eff className="effect_eff" src={imgSet.effect[effAnimation].img} frame={imgSet.effect[effAnimation].frame} repeat={gameData.skill[effAnimation].effAnimationRepeat} gameSpd={speed}/>
										</>
									)}
									<span className="dmgNum">{effChk ? effNum : ''}</span>
								</EffLand>
							);
						})}
						</div>
						<div className={`land_ally ${allyEffect.length === 25 ? "allEff" : ""}`}>
						{map.map((data, idx) => {
							const left = idx % 5 * mapSize,
								top = Math.floor(idx / 5) * mapSize;
							let effectChk = false,
								effAnimation = '',
								effNum = '',
								effSize = '',
								effRotate = '',
								effFilter = '';
							allyEffect.forEach((effData) => {
								if (effData.posIdx === idx) {
									effectChk = true;
									effAnimation = effData.animation;
									effNum = effData.dmg;
									effSize = effData.size;
									effRotate = effData.rotate;
									effFilter = effData.filter;
								}
							});
							const effChk = effNum && effNum !== 0;
							return (
								<EffLand className={`effect_land ${effChk ? 'dmg' : ''}`} size={effSize} rotate={effRotate} filter={effFilter} key={idx} left={left} top={top} gameSpd={speed}>
									{effectChk && (
										<>
											<Eff className="effect_eff" src={imgSet.effect[effAnimation].img} frame={imgSet.effect[effAnimation].frame} repeat={gameData.skill[effAnimation].effAnimationRepeat} gameSpd={speed}/>
										</>
									)}
									<span className="dmgNum">{effChk ? effNum : ''}</span>
								</EffLand>
							)
						})}
						</div>
					</BattleEffect>
					<BattleUnit ref={battleUnitRef} className="battle_units">
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
									const state = enemyCh?.state || "";
									const actionPos = enemyAction[currentEnemyIdx.current] || "";
									const passive = allyEnemyPassive[1][currentEnemyIdx.current];
									const buffEff = allyEnemyBuff[1][currentEnemyIdx.current];
									currentEnemyIdx.current ++;
									return (
										<BattleCh key={idx} className={`battle_ch ${area ? "effect effect" + element_type : ""} ${actionCh} ${rtCh} ${actionPos} ${state}`} data-ch={chData?.display} data-idx={idx} left={left} top={top} size={mapSize} onClick={(e) => {
											areaEnemySelect(e, idx);
										}} gameSpd={speed} defenceIcon0={imgSet.actionIcon[0]} defenceIcon1={imgSet.actionIcon[1]} defenceIcon2={imgSet.actionIcon[2]} tombstone={imgSet.actionIcon[3]}>
											{buffEff && buffEff.map((buffData, idx) => {
												return (
													<Buff key={idx} className="ch_buff" gameSpd={speed} effImg={imgSet.effect[buffData]} frame={gameData.effect[buffData].frame} buffEff={buffData} >
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
												<CharacterCard usedType="battle" saveData={saveData} gameData={gameData} saveCharacter={enemyData} gameSpd={speed} />
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
						<div className="units_ally">
							{battleAlly.current && allyDeck.current.map((allyData, idx)=> {
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
									const state = saveCh?.state || "";
									const actionPos = allyAction[currentAllyIdx.current] || "";
									const passive = allyEnemyPassive[0][currentAllyIdx.current];
									const buffEff = allyEnemyBuff[0][currentAllyIdx.current];
									currentAllyIdx.current ++;
									return (
										<BattleCh key={idx} className={`battle_ch ${posCh} ${area ? "effect effect" + element_type : ""} ${actionCh} ${rtCh} ${actionPos} ${state}`} data-ch={chData?.display} data-idx={idx} left={left} top={top} size={mapSize} rtColor={rtColor} onClick={(e) => {
											areaAllySelect(e, idx);
										}}  gameSpd={speed} defenceIcon0={imgSet.actionIcon[0]} defenceIcon1={imgSet.actionIcon[1]} defenceIcon2={imgSet.actionIcon[2]} tombstone={imgSet.actionIcon[3]}>
											{buffEff && buffEff.map((buffData, idx) => {
												return (
													<Buff key={idx} className="ch_buff" gameSpd={speed} effImg={imgSet.effect[buffData].img} frame={gameData.effect[buffData].frame} buffEff={buffData}>
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
              					<CharacterCard usedType="battle" saveData={saveData} gameData={gameData} saveCharacter={saveCh} gameSpd={speed} />
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
					<BattleLand ref={battleLandRef} className={`battle_land ${mode === "relation" ? "" : "ready"} ${landCriticalEffect ? "critical" : ""}`} gameSpd={speed}>
						<div className="land_enemy">
						{map.map((data, idx) => {
							const left = idx % 5 * mapSize,
								top = Math.floor(idx / 5) * mapSize;
							return (
								<Land key={idx} left={left} top={top}>
									<IconPic type="land" isAbsolute={true} isThumb={true} pic="icon150" idx={mapLand[idx]} />
									<span className="back"></span>
								</Land>
							);
						})}
						</div>
						<div className="land_ally">
						{map.map((data, idx) => {
							const left = idx % 5 * mapSize,
								top = Math.floor(idx / 5) * mapSize;
							return (
								<Land key={idx} left={left} top={top}>
									<IconPic type="land" isAbsolute={true} isThumb={true} pic="icon150" idx={mapLand[idx + 25]}/>
									<span className="back"></span>
								</Land>
							);
						})}
						</div>
					</BattleLand>
					<BattleMsg className={`battle_order ${skillMsg ? 'on' : ''} ${typeof turnIdx === 'number' && timeLine.current[turnIdx]?.order.team === 'ally' ? 'ally' : 'enemy'} ${typeof turnIdx === 'number' && gameData.ch[timeLine.current[turnIdx]?.order.idx]?.face_d}`} gameSpd={speed}>
						<div className="battle_msg">
							{typeof turnIdx === 'number' && gameData.skill[timeLine.current[turnIdx]?.order.skIdx]?.na[lang]}
						</div>
					</BattleMsg>
					<div className="battle_weather" src={[imgSet.weather]} >
						<div className={`weather_icon weather_type ${weather.day ? "day" : "night"}`}>
							<div className="weather_typeIcon" style={{left:`${getWeather(weather) * -50}px`}}>
								{imgSet.weather.map((data, idx) => {
									return <WeatherIcon src={data} idx={idx} key={idx}></WeatherIcon>;
								})}
							</div>
						</div>
						<WeatherWind className="weather_icon weather_wind" src={imgSet.etc.wind} weatherInfo={weather}>
							<div className="weather_arrow"></div>
						</WeatherWind>
					</div>
				</BattleArea>
				<BattleOrder>
					{battleAlly.current && <BattleMenu className="battle_menu" mode={mode} gameSpd={speed}>
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
										const characterActionType = battleAlly.current[orderIdx].newActionType;//동물 actionType과 skill element간 속성싱크가 1차이가 남
										const skillType = sk[data.idx].element_type;
										let actionType = true;
										if (skillType > 0 && skillType < 7) {
											characterActionType.forEach((data) => {
												actionType = (data + 1) === skillType;
												if (actionType) {
													return;
												}
											});
											//스킬 공격타입과 캐릭공격타입이 같은지 확인
										}
										if (sk[data.idx].cate[0] !== 2 && actionType) {
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
					</BattleMenu>}
					<BattleTurn mode={mode} frameImg={imgSet.etc.frameRope}>
						{timeLine.current && timeLine.current.map((data, idx) => {
							const chData = data.order.team === 'ally' ? battleAlly.current[data.order.idx] : battleEnemy.current[data.order.idx];
							const activeSkill = activeSk(data);// die 및 active스킬 판단 0대기,2방어,13철벽방어
							return (
								<TimeLineCh key={idx} className={turnIdx === idx ? 'on' : ''} state={activeSkill} team={data.order.team} size={30} defenceIcon0={imgSet.actionIcon[0]} defenceIcon1={imgSet.actionIcon[1]} defenceIcon2={imgSet.actionIcon[2]} tombstone={imgSet.actionIcon[3]} gameSpd={speed}>
									<CharacterCard usedType="timeline" saveData={saveData} gameData={gameData} saveCharacter={chData} gameSpd={speed} />
								</TimeLineCh>
							)
						})}
					</BattleTurn>
				</BattleOrder>
			</BattleWarp>
      <MsgContainer>
        {msgOn && <Msg text={msg} showMsg={setMsgOn}></Msg>}
      </MsgContainer>
    </>
  );
}

export default Battle;
