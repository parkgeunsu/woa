import { AppContext } from 'App';
import { IconPic } from 'components/ImagePic';
import { Select } from 'components/Input';
import { util } from 'components/Libs';
import Msg from 'components/Msg';
import MsgContainer from 'components/MsgContainer';
import CharacterCard from 'pages/CharacterCard';
import React, { useCallback, useContext, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const BattleHeader = styled.div`
	display: flex;
	height: 50px;
	width: 100%;
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
  color: #000;
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
	position: relative;
	background: #3e2c00;
	transition: height 1s;
  height: calc(100% - 50px);
  .units_enemy, .units_ally, .land_ally, .land_enemy{
    height: 50%;
  }
  &:before {
		content: "";
		position: absolute;
		top: 0;
		bottom: 0;
		width: 50px;
		z-index: 1;
		pointer-events: none;
		transition: left 1s;
		left: ${({mode}) => {
			return !mode ? "-50px" : 0;
		}};
		background: url(${({frameLeft}) => frameLeft}) no-repeat -15px center;
	}
  &:after {
		content: "";
		position: absolute;
		top: 0;
		bottom: 0;
		width: 50px;
		z-index: 1;
		pointer-events: none;
		transition: right 1s;
		right: ${({mode}) => {
			return !mode ? "-50px" : 0;
		}};
		background: url(${({frameRight}) => frameRight}) no-repeat 13px center;
	}
`;
const BattleUnit = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 2;
	& > div {
		position: relative;
		margin: 0 auto;
		box-sizing: border-box;
		transition: all 1s;
		.effect:before {
			content: "";
			position: absolute;
			left: 10%;
			right: 10%;
			top: 10%;
			bottom: 10%;
			background-color: transparent;
			z-index: 10;
			opacity: 1;
		}
		.effect0:before {
  		box-shadow: 0 0 5px 5px var(--color-w), inset 0 0 5px 5px var(--color-w);
		}
		.effect1:before {
  		box-shadow: 0 0 5px 5px var(--color-w), inset 0 0 5px 5px var(--color-w);
		}
		.effect2:before {
  		box-shadow: 0 0 5px 5px var(--color-w), inset 0 0 5px 5px var(--color-w);
		}
		.effect3:before {
  		box-shadow: 0 0 5px 5px var(--color-w), inset 0 0 5px 5px var(--color-w);
		}
		.effect4:before {
  		box-shadow: 0 0 5px 5px var(--color-w), inset 0 0 5px 5px var(--color-w);
		}
		.effect5:before {
  		box-shadow: 0 0 5px 5px var(--color-w), inset 0 0 5px 5px var(--color-w);
		}
		.effect6:before {
  		box-shadow: 0 0 5px 5px var(--color-w), inset 0 0 5px 5px var(--color-w);
		}
		.effect7:before {
  		box-shadow: 0 0 5px 5px var(--color-yellow), inset 0 0 5px 5px var(--color-yellow);
		}
		.effect8:before {
  		box-shadow: 0 0 5px 5px var(--color-b), inset 0 0 5px 5px var(--color-b);
		}
		.effect9:before {
  		box-shadow: 0 0 5px 5px var(--color-blue), inset 0 0 5px 5px var(--color-blue);
		}
		.effect10:before {
  		box-shadow: 0 0 5px 5px var(--color-red), inset 0 0 5px 5px var(--color-red);
		}
		.effect11:before {
  		box-shadow: 0 0 5px 5px var(--color-lightblue), inset 0 0 5px 5px var(--color-lightblue);
		}
		.effect12:before {
  		box-shadow: 0 0 5px 5px var(--color-green), inset 0 0 5px 5px var(--color-green);
		}
	}
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
	${'' /* &.ready .land {
		outline-width: 2px;
	} */}
	&.critical {
		animation: landCritical 0.2s ease-in-out;
	}
	&:after {
		content:'';
		position: absolute;
		width: 100%;
		height: 100%;
		pointer-events: none;
		background: rgba(0,0,0,.5);
		opacity: 0;
	}
	&.action:after {
		opacity: 1;
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
	& > div {
		position: relative;
		margin: 0 auto;
		box-sizing: border-box;
	}
	${'' /* &.ready .land {
		outline-width: 2px;
	} */}
`;
const BattleEffectLand = styled.div`
	position: relative;
	margin: 0 auto;
	${({allEff, rotate, size, filter}) => allEff ? `
		.effect_land .eff_area {
			display: none;
		}
		.effect_land:nth-of-type(13) .eff_area {
			display: block;
			transform: rotate(${rotate}deg) scale(${size}) !important;
			filter: ${filter};
			z-index: 1;
		}
	` : ''}
`;
const EffLand = styled.div`
	position: absolute;
	${({left, top}) => `
		left: ${left}%;
		top: ${top}%;
	`}
	width: 20%;
	padding-top: 20%;
	box-sizing: border-box;
	border-radius: 0;
	&.dmg .dmgNum {
		opacity: 0;
		transform: translate(-50%, -20%) scale(2.5);
	}
	.dmgNum {
		position: absolute;
		left: 50%;
		top: 50%;
		color: var(--color-red);
		font-size: 0.938rem;
		font-weight: 600;
		opacity: 1;
		transform: translate(-50%, -50%) scale(1);
		text-shadow: 0 0 1px #fff, 0 0 1px #fff, 0 0 2px #fff, 0 0 2px #fff,
			0 0 3px #fff;
		z-index: 12;
		transition:all ${({gameSpd}) => 1.125 / gameSpd}s ease-in;
	}
`;
const EffArea = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	z-index: 11;
	overflow: hidden;
	transition: unset;
	${({filter, rotate, size}) => `
		filter: ${filter};
		transform: rotate(${rotate}deg) scale(${size});
	`}
`;
const Eff = styled.img`
	display: block;
	position: absolute;
	left: 0;
	top: 0;
	width: 500%;
	height:${({frame}) => {
		return Math.ceil(frame / 5) * 100;
	}}%;
	animation:${({frame, repeat, gameSpd}) => `frame${frame} ${(frame / 10) * 1.125 / repeat / gameSpd}s steps(1)`};
	animation-iteration-count: ${({repeat}) => repeat || "infinite"};
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
	transition: all ${({ gameSpd }) => 0.75 / gameSpd}s;
	.ch_box {
		position: absolute;
		left: 5%;
		top: 5%;
		width: 90%;
		height: 90%;
		transform-origin: 50% 100%;
		transform-style: preserve-3d;
		pointer-events: none;
		transition:all ${({ gameSpd }) => 0.225/ gameSpd}s;
		.hpsp {
			display: flex;
			position: absolute;
			height: 25%;
			width: 100%;
			top: -30%;
			flex-direction: column;
			justify-content: space-between;
			span {
				display: flex;
				height: 45%;
				background-color: #fff;
				border-radius: 10px;
				overflow: hidden;
				box-shadow: inset 0 0 2px #000;
				&.hp {
					em {
						display: inline-block;
						height: 100%;
						width: 100%;
						background-color: var(--color-red);
						border-radius: 10px;
						transition: all ${({ gameSpd }) => 0.375/ gameSpd}s;
					}
				}
				&.sp {
					em {
						display: inline-block;
						height: 100%;
						width: 100%;
						background-color: var(--color-blue);
						border-radius: 10px;
						transition: all ${({ gameSpd }) => 0.375/ gameSpd}s;
					}
				}
			}
		}
	}
	.dmg {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		filter: blur(7px);
		transform: scale(1.3);
		pointer-events: none;
		z-index: 3;
	}
	.ch_buff {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		pointer-events: none;
		width: 100%;
		height: 100%;
		overflow: hidden;
		z-index: 1;
		.buff_effect {
			position: absolute;
			width: 500%;
		}
	}
	&:after {
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		pointer-events: none;
	}
	&.on {
  	z-index: 2;
		.ch_box {
			transform: scale(1.5) translate(0, 20%);
			.hpsp {
				top: -40%;
			}
		}
		.ring_back {
			box-shadow: 0 0 30px #fff, 0 0 10px #ff0, 0 0 5px #f40;
		}
	}
	&.relation:after {
		content: "";
		position: absolute;
		left: 50%;
		top: 50%;
		width: 100%;
		height: 100%;
		transform: translate(-50%, -50%);
		z-index: 1;
		filter: blur(5px);
		opacity: 0;
		pointer-events: none;
		box-shadow: 0 0 15px 5px ${({rtColor}) => rtColor};
		background: ${({rtColor}) => rtColor};
		animation: rtAnimation ${({ gameSpd }) => 3 / gameSpd}s linear;
	}
	&.action {
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%) scale(2);
		z-index: 30;
		.ch_box .ring_back {
			box-shadow: 0 0 30px 10px #000;
		}
	}
	&.defence0:after {
		background: url(${({defenceIcon0}) => defenceIcon0}) no-repeat center center;background-size: 60%;
		animation: defence ${({ gameSpd }) => 0.75 / gameSpd}s;opacity:0;
	}
	&.defence1:after {
		background: url(${({defenceIcon1}) => defenceIcon1}) no-repeat center center;background-size: 60%;
		animation: defence ${({ gameSpd }) => 0.75 / gameSpd}s;opacity:0;
	}
	&.defence2:after {
		background: url(${({defenceIcon2}) => defenceIcon2}) no-repeat center center;background-size: 60%;
		animation: defence ${({ gameSpd }) => 0.75 / gameSpd}s;opacity:0;
	}
	&.avoid0{
		animation: avoid0 ${({ gameSpd }) => 0.75 / gameSpd}s ease-out;
	}
	&.avoid1{
		animation: avoid1 ${({ gameSpd }) => 0.75 / gameSpd}s ease-out;
	}
	&.avoid2{
		animation: avoid2 ${({ gameSpd }) => 0.75 / gameSpd}s ease-out;
	}
	&.avoid3{
		animation: avoid3 ${({ gameSpd }) => 0.75 / gameSpd}s ease-out;
	}
	${'' /* &.dmg .dmg{
		animation:dmgAnimation ${({gameSpd}) => 0.375 / gameSpd}s steps(1) infinite;
	} */}
	&.dmgCri .dmg {
		animation: dmgCriticalAnimation ${({gameSpd}) => 0.375 / gameSpd}s steps(4) infinite;
	}
	&.die {
		.ch_box {
			opacity: 0;
			transform: scale(0.1);
		}
		&:after {
			background: url(${({tombstone}) => tombstone}) no-repeat center center;background-size: 80%;
			animation: tombstone ${({ gameSpd }) => 1.125 / gameSpd}s;opacity:0;animation-fill-mode: forwards;transform-origin:50% 100%;
		}
	}
	/*상태이상*/
	&.bleeding .ch_box .ch_style {
		filter: grayscale(1) brightness(0.5);
	}
	&.addicted .ch_box .ch_style {
		filter: blur(1px);
	}
	&.bleeding.addicted .ch_box .ch_style {
		filter: grayscale(1) brightness(0.5) blur(1px);
	}
	&.petrification .ch_box {
		filter: grayscale(1) brightness(2);
	}
	&.petrification .ch_ring {
		animation-play-state: paused;
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
	position: absolute;
	pointer-events: none;
	width: 30%;
	padding-top: 30%;
	z-index: 1;
	opacity: 0;
	left: ${({idx}) => idx % 2 === 0 ? -30 : -40}%;
	top: ${({idx}) => idx*20 - 25}%;
	background: url(${({effImg}) => effImg}) no-repeat center center;
	background-size: 100%;
	&.passive0 {
		animation: fadeIn 0.5s linear;
  	animation-fill-mode: forwards;
	}
	&.passive1 {
		animation: fadeIn 0.5s 0.3s linear;
		animation-fill-mode: forwards;
	}
	&.passive2 {
		animation: fadeIn 0.5s 0.6s linear;
		animation-fill-mode: forwards;
	}
	&.passive3 {
		animation: fadeIn 0.5s 0.9s linear;
		animation-fill-mode: forwards;
	}
	&.passive4 {
		animation: fadeIn 0.5s 1.2s linear;
		animation-fill-mode: forwards;
	}
	&.passive5 {
		animation: fadeIn 0.5s 1.5s linear;
		animation-fill-mode: forwards;
	}
	&.remove {
  	animation: fadeOut 0.5s linear;
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

const Land = styled.div`
	position:absolute;
	width: 20%;
	padding-top: 20%;
	box-sizing: border-box;
	border-radius: 0;
	background-size: 100%;
	outline: 3px solid rgba(255,255,255,0.5);
	left:${({left}) => left}%;
	top:${({top}) => top}%;
	&:before {
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: #000;
		opacity: 0.1;
	}
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
	position: absolute;
	left: 0;
	right: 0;
	transform: translate(0, -50%);
	z-index: 30;
	pointer-events: none;
	transition: all ${({gameSpd}) => 0.375 / gameSpd}s;
	opacity: 0;
	&.ally {
		bottom: 35%;
		&:after {
			content: "";
			position: absolute;
			bottom: -10px;
			border-top: 10px solid #333;
			border-left: 10px solid transparent;
			border-right: 10px solid transparent;
			border-bottom: 0 solid transparent;
		}
	}
	&.enemy {
		top: 35%;
		&:after {
			content: "";
			position: absolute;
			top: -10px;
			border-bottom: 10px solid #333;
			border-left: 10px solid transparent;
			border-right: 10px solid transparent;
			border-top: 0 solid transparent;
		}
	}
	&.on {
		opacity: 1;
	}
	&.left:after {
		left: 30%;
	}
	&.center:after {
		left: 50%;
	}
	&.right:after {
		right: 30%;
	}
	.battle_msg {
		margin: 0 auto;
		padding: 10px;
		width: 50%;
		height: 100%;
		border-radius: 10px;
		background: #333;
		box-sizing: border-box;
		text-align: center;
		line-height: 1.2;
		font-size: 0.938rem;
		font-weight: 600;
		color: #fff;
	}
`;
const actionAnimation = ({setTurnIdx, setShowSkillMsg, skillEffect, turnIdx, timeLine, resetOrder, setAllyEffect, setEnemyEffect, gameData, battleAlly, battleEnemy, gameSpd, bgm, setAllyAction, setEnemyAction, setLandCriticalEffect, allyPos, enemyPos, modeRef, setMode, setWeather, allyEnemyPassive, allyPassive, enemyPassive, setAllyEnemyPassive, allyEnemyBuff, allyBuff, enemyBuff, setAllyEnemyBuff, atkOption, customSkill}) => {
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
	}
	if (turnIdx <= timeLine.length - 1) {
		const skillIdx = customSkill ? 0 : timeLine[turnIdx].order.skIdx;
		const skill = customSkill ? customSkill : gameData.skill[skillIdx];
		let isCounterAtk = false; //카운터 어택인지
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
        setShowSkillMsg: setShowSkillMsg,
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
        },
				customSkill: customSkill,
      });
		} else { //액티브 스킬
			let attacker = {},
				defencer = [],
				defendSkillEnemy = []; //방어종류 시전 캐릭
			let allyAction = [],
				enemyAction = [];
			//공격 횟수 지정
			atkC = (atkOption?.atkCount && atkOption?.atkCount[0]) ? atkOption?.atkCount : customSkill ? customSkill.atkCount : [...gameData.skill[skillIdx].atkCount];
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
				const teamAction = timeLine[turnIdx].order.team === 'ally' ? enemyAction : allyAction;
				let criticalAtk = false;
				let avoid = false;
				defencer.forEach((defData, dIdx) => {
					const defEnemy = defData.ch;
					if (defEnemy.state !== 'die') { //적이 살았을 경우
						//마법 방어와 방어 분기 처리
						if (skType < 7) {//물리공격인지
							const hitChance =  Math.min((80 + 30 * (attacker.spd - defEnemy.spd) / 100 + 20 * (attacker.luk - defEnemy.luk) / 100) / 100, 0.95); //물리 적중 확률
							if (teamAction[defData.idx] === undefined || teamAction[defData.idx].indexOf('defence0') < 0) { //방어를 안했으면
								// console.log("pgs", chance, hitChance);
								if (defEnemy.state.indexOf('petrification') >= 0) { //석화 상태면
									const criticalChance = Math.random();
									const critical = Math.max(15 * (attacker.spd - defEnemy.spd) / 100 + 20 * (attacker.luk - defEnemy.luk) / 100, 0.1);//치명타 확률 계산
									if (criticalChance < critical) {
										criticalAtk = true;
										landCritical = true;
										teamAction[defData.idx] = teamAction[defData.idx] + ' dmgCri'
									} else {
										teamAction[defData.idx] = teamAction[defData.idx] + ' dmg'
									}
								} else {
									if (chance < hitChance) {
										const criticalChance = Math.random();
										const critical = Math.max(15 * (attacker.spd - defEnemy.spd) / 100 + 20 * (attacker.luk - defEnemy.luk) / 100, 0.1);//치명타 확률 계산
										if (criticalChance < critical) {
											criticalAtk = true;
											landCritical = true;
											teamAction[defData.idx] = teamAction[defData.idx] + ' dmgCri'
										} else {
											teamAction[defData.idx] = teamAction[defData.idx] + ' dmg'
										}
									} else {
										const avoidNum = Math.floor(Math.random()*4);//회피 종류
										avoid = true;
										teamAction[defData.idx] = 'avoid' + avoidNum;
									}
									console.log(skill.counterAttack);
									const counterChance = Math.random() < .1 + skill.counterAttack; //반격 확률
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
									teamAction[defData.idx] = teamAction[defData.idx] + ' dmgCri'
								} else {
									teamAction[defData.idx] = teamAction[defData.idx] + ' dmg'
								}
							}
						} else {
							const magicChance = Math.min((60 + 20 * (attacker.spd - defEnemy.spd) / 100) /100, 0.9); //마법 적중 확률
							if (teamAction[defData.idx] === undefined || teamAction[defData.idx].indexOf('defence2') < 0) { //마법방어를 안했으면
								if (defEnemy.state.indexOf('petrification') >= 0) { //석화 상태면
									const criticalChance = Math.random();
									const critical = Math.max(15 * (attacker.spd - defEnemy.spd) / 100 + 20 * (attacker.luk - defEnemy.luk) / 100, 0.1);//치명타 확률 계산
									if (criticalChance < critical) {
										criticalAtk = true;
										landCritical = true;
										teamAction[defData.idx] = teamAction[defData.idx] + ' dmgCri'
									} else {
										teamAction[defData.idx] = teamAction[defData.idx] + ' dmg';
									}
								} else {
									if (chance < magicChance) {
										const criticalChance = Math.random();
										const critical = Math.max(15 * (attacker.spd - defEnemy.spd) / 100 + 20 * (attacker.luk - defEnemy.luk) / 100, 0.1);//치명타 확률 계산
										if (criticalChance < critical) {
											criticalAtk = true;
											landCritical = true;
											teamAction[defData.idx] = teamAction[defData.idx] + ' dmgCri'
										} else {
											teamAction[defData.idx] = teamAction[defData.idx] + ' dmg';
										}
									} else {
										const avoidNum = Math.floor(Math.random()*4);//회피 종류
										avoid = true;
										teamAction[defData.idx] = 'avoid' + avoidNum;
									}
								}
							} else { //마법방어를 했으면
								const criticalChance = Math.random();
								const critical = Math.max(15 * (attacker.spd - defEnemy.spd) / 100 + 20 * (attacker.luk - defEnemy.luk) / 100, 0.1);//치명타 확률 계산
								if (criticalChance < critical) {
									criticalAtk = true;
									landCritical = true;
									teamAction[defData.idx] = teamAction[defData.idx] + ' dmgCri'
								} else {
									teamAction[defData.idx] = teamAction[defData.idx] + ' dmg';
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
					setShowSkillMsg(true);
					setTimeout(() => {
						setShowSkillMsg(false);
						setTimeout(() => {
							//console.log(gameData.ch[attacker.idx].animal_type, battleEnemy, timeLine[turnIdx]);
							const targets = timeLine[turnIdx].order.effectArea;
							let targetIdx = [],
								targetArr = {skillIdx:0,allEff:0,effSize:1,effAnimation:'',effRotate:'',effFilter:'',targets:[]},
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
							// 	targetArr[12].animation = customSkill ? customSkill.effAnimation : gameData.skill[skillIdx].effAnimation;
							// } else {
								targetArr.allEff = customSkill ? 
									customSkill.effSize[timeLine[turnIdx].order.skLv - 1] >= 5 ? 
										customSkill.effSize[timeLine[turnIdx].order.skLv - 1] : 
											0 : 
									skill[skillIdx].effSize[timeLine[turnIdx].order.skLv - 1] >= 5 ? 
										skill[skillIdx].effSize[timeLine[turnIdx].order.skLv - 1] : 
											0;
								targetArr.effSize = customSkill ? customSkill.effSize[timeLine[turnIdx].order.skLv - 1] : gameData.skill[skillIdx].effSize[timeLine[turnIdx].order.skLv - 1];
								targetArr.effAnimation = customSkill ? customSkill.effAnimation : gameData.skill[skillIdx].effAnimation;
								targetArr.effRotate = customSkill ? customSkill.effRotate : gameData.skill[skillIdx].effRotate;
								targetArr.effFilter = customSkill ? customSkill.effFilter : gameData.skill[skillIdx].effFilter;
								targetArr.skillIdx = skillIdx;
								targets.forEach((data, idx) => {
									let chk = false;
									targetIdx.forEach((taIdx) => {
										if (taIdx === data) {
											chk = true;
										}
									});
									if (chk) { //스킬 맞는 위치와 범위값중 일치하는지 확인
										targetArr.targets[idx] = {
											posIdx:data,
											dmg:Math.floor(dmg[targetCount]),
										};
										targetCount ++;
									} else {
										targetArr.targets[idx] = {
											posIdx:data,
										};
									}
								});
							// }
							if (timeLine[turnIdx].order.team === 'ally') { //적군 영역 effect효과
								if (skillCate === 5) {//버프
									setAllyEffect({
										...targetArr,
									});
								} else {
									setEnemyEffect({
										...targetArr,
									});
									defencer.forEach((defData, idx) => {
										battleEnemy[defData.idx].hp -= dmg[idx];
										if (typeof dmg[idx] === 'number') {
											if (buffDebuff[defData.idx] === undefined){
												buffDebuff[defData.idx] = [];
											}
											battleEnemy[defData.idx].buffDebuff = [...buffDebuff[defData.idx]];
											// passiveBuff(gameData, battleAlly, battleEnemy, allyEnemyPassive, allyPassive, enemyPassive, setAllyEnemyPassive, allyEnemyBuff, allyBuff, enemyBuff, setAllyEnemyBuff, allyPos, enemyPos, false);
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
									setEnemyEffect({
										...targetArr
									});
								} else{
									setAllyEffect({
										...targetArr
									});
									defencer.forEach((defData, idx) => {
										battleAlly[defData.idx].hp -= dmg[idx];
										if (typeof dmg[idx] === 'number') {
											if (buffDebuff[defData.idx] === undefined){
												buffDebuff[defData.idx] = [];
											}
											battleAlly[defData.idx].buffDebuff = [...buffDebuff[defData.idx]];
											// passiveBuff(gameData, battleAlly, battleEnemy, allyEnemyPassive, allyPassive, enemyPassive, setAllyEnemyPassive, allyEnemyBuff, allyBuff, enemyBuff, setAllyEnemyBuff, allyPos, enemyPos, false);
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
										setAllyEffect({skillIdx:0,allEff:0,effSize:1,effAnimation:'',effRotate:'',effFilter:'',targets:[]});
										setAllyAction([]);
									} else {
										setEnemyEffect({skillIdx:0,allEff:0,effSize:1,effAnimation:'',effRotate:'',effFilter:'',targets:[]});
										setEnemyAction([]);
									}
								} else {
									if (skillCate === 5) {//버프
										setEnemyEffect({skillIdx:0,allEff:0,effSize:1,effAnimation:'',effRotate:'',effFilter:'',targets:[]});
										setEnemyAction([]);
									} else {
										setAllyEffect({skillIdx:0,allEff:0,effSize:1,effAnimation:'',effRotate:'',effFilter:'',targets:[]});
										setAllyAction([]);
									}
								}
								setTurnIdx(turnIdx_);
								actionAnimation({
                  setTurnIdx: setTurnIdx,
                  setShowSkillMsg: setShowSkillMsg,
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
                  },
									customSkill: customSkill,
                });
							}, ((skillEffect[targetArr.effAnimation.split('(')[0]].frame / 10) * 1125) / gameSpd);//공격 이펙트 효과시간
						}, 150 / gameSpd);
					}, 600 / gameSpd);//메시지창 사라짐
				}, 150 / gameSpd);//메시지 오픈
			}, 600 / gameSpd);
		}
	} else {
		resetOrder('order');
	}
}
const StyleSelect = styled(Select)`
  display: inline-block;
  padding: 5px;
  border: 1px solid #999;
`;
const speedList = [1,1.5,2,3];
// const skillCateList = ['none','passive','active(emeny)','active(self)','buff','debuff','active(debuff)','active(buff)','weather','job'];//1부터
const skillFilterList = ['none','hue(90deg)','hue(180deg)','saturate(3)','invert(100%)'];
const taList = [
  '1 단일','2 가로2','3 가로3','4 세로2','5 세로3','6 가로행','7 세로열','8 십자5','9 십자9','10 대각선',
  '11 반대 대각선','12 고정 세로2열','13 고정 세로3열','14 ⏊4','15 └┐9','16 ┌┘9','17 卍17','18 고정 가로2행','19 고정 가로3행','20 전체',
  '21 사각9','22 사각4','23 자신','24 원','25 랜덤5','26 랜덤10','27 랜덤15','28 작은 마름모','29 큰 마름모','30 큰 링',
  '31 랜덤 세로2열','32 랜덤 세로3열','33 랜덤 가로2행','34 랜덤 가로3행','35 x5','36 x9','37 ㅜ4','38 랜덤20', '39 바깥1줄', '40 바깥2줄', '41 바깥3줄', '42 n포함 랜덤 5', '43 n포함 랜덤 10', '44 n포함 랜덤 15', '45 n포함 랜덤 20', '46 가로4', '47 세로4', '48 가로3x2', '49 세로2x3', '50 가로4x2', '51 세로2x4', '52 가로행2줄 20', '53 세로열2줄 20'
];//1부터
//var a = '';for(var i = 195; i < 221; i++){a += `'thaumaturgy${i}',`}
// const skillRepeatList = [1,2,3,4];
const skillSizeList = [1,1.5,2,2.5,5];
const skillRotateList = [0,90,180,270];
const TestSkill = ({
  saveData,
}) => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const lang = React.useMemo(() => {
    return context.setting.lang;
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
  const [selectSpeed, setSelectSpeed] = useState(2);
	const skillEffectList = React.useMemo(() => {
		let skillList = [];
		for (const value in imgSet.effect) {
			skillList.push(`${value}${imgSet.effect[value]?.used ? '(' + imgSet.effect[value].used + ')' : ''}`);
		}
		return skillList;
	}, [imgSet.effect]);
  // const [selectSkillCate, setSelectSkillCate] = useState(2);
  const [selectSkillFilter, setSelectSkillFilter] = useState(0);
  const [selectSkillTaget, setSelectSkillTaget] = useState(0);
  const [selectEffectAnimation, setSelectEffectAnimation] = useState(0);
  const [selectEffectSize, setSelectEffectSize] = useState(1);
  const [selectEffectRotate, setSelectEffectRotate] = useState(0);
	const sData = React.useMemo(() => saveData && Object.keys(saveData).length !== 0 ? saveData : util.loadData('saveData'), [saveData]);
	const [msgOn, setMsgOn] = useState(false); 
	const [msg, setMsg] = useState("");
	const containerWH = useRef([0,0]);
	const mapSize = React.useMemo(() => 20, []);
	const [weather, setWeather] = useState({
		type:'w0',//w0:맑음, w1:흐림, w2:비, w3:천둥, w4:눈
		day:true,//낮 밤
		wind:0,//바람
		delay:0//턴 유지
	});//날씨
  const [skill, setSkill] = useState({
    idx:233,
		na:{ko:'테스트',en:'test',jp:'test'},
    element_type:0,
    cate:[3],//[selectSkillCate + 1],
    txt:{ko:'<u>날씨</u>, 비오는 날씨로 밤으로 변환',en:'<u>Weather</u>, Convert to rainy weather',jp:'<u>天気</u>, 雨天で夜に変換'},
    ta_:1,
    ta:[selectSkillTaget + 1],
    effAnimation:skillEffectList[selectEffectAnimation],
    effAnimationRepeat:1,
		effSize: [skillSizeList[selectEffectSize]],
		effRotate: skillRotateList[selectEffectRotate],
		effFilter: '',
    buffAnimation:0,
    skillClass:1,
    buff:[{type:2.0,num:['70%','75%','80%','85%','90%']}],
    buffCount:[4,4,4,4,4],
    buffChance:['70%','75%','80%','85%','90%'],
    atkCount:[1],
    sp:0
  });
  const [speed, setSpeed] = useState(speedList[selectSpeed]);
  const paramData = React.useMemo(() => {
    return util.loadData('historyParam');
  }, []);
  const scenarioDetail = React.useMemo(() => {
		return {
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
	}, [gameData, paramData, lang]);
	const mapLand = React.useMemo(() => scenarioDetail.map, [scenarioDetail]);
  const allyDeck = useRef(["","","","","","","","","","","","",0,"","","","","","","","","","","",""]);//캐릭터 저장된 카드index
	const enemyDeck = React.useMemo(() => scenarioDetail.entry, [scenarioDetail]);
	const [orderIdx, setOrderIdx] = useState(); //명령 지시 순서
	const [mode, setMode] = useState();
	const modeRef = useRef('');
	const [turnIdx, setTurnIdx] = useState(); //공격캐릭터 활성화 순번
	const battleUnitRef = useRef();//유닛 공간
	const battleLandRef = useRef();//지형 공간
	const battleEffectRef = useRef();//이펙트 공간
	const allyOrders = useRef([]);//아군 행동저장배열
	const enemyOrders = useRef([]);//적군 행동저장배열
	const enemyAi = useRef([]);//적군 지능저장배열
	const enemyPos = useRef();//적군 위치값
	const allyPos = useRef([]);//아군 위치값
	const battleAlly = useRef([]);//아군 능력치
	const	battleEnemy = useRef([]);//적군 능력치
	const currentSkill = useRef();//현재 선택된 스킬
	const currentAllyIdx = useRef(0); //아군 순번 증가 index
	const currentEnemyIdx = useRef(0); //적군 순번 증가 index
	currentAllyIdx.current = 0;
	currentEnemyIdx.current = 0;
	const timeLine = useRef([]);//공격 순번배열
	const [allyAction, setAllyAction] = useState([]);//아군 움직임(defence, avoid)
	const [enemyAction, setEnemyAction] = useState([]);//적군 움직임(defence, avoid)
	const [landCriticalEffect, setLandCriticalEffect] = useState(false);//크리티컬 공격시 화면 떨림
	const allyPassive = useRef([]);//아군 패시브
	const enemyPassive = useRef([]);//적군 패시브
	const [allyEnemyPassive, setAllyEnemyPassive] = useState([[],[]]);
	const allyBuff = useRef([]);//아군 버프
	const enemyBuff = useRef([]);//적군 버프
	const [allyEnemyBuff, setAllyEnemyBuff] = useState([[],[]]);
	const [effectAllyArea, setEffectAllyArea] = useState([]); //아군스킬 영역
	const [effectEnemyArea, setEffectEnemyArea] = useState([]); //적군스킬 영역
	const [showSkillMsg, setShowSkillMsg] = useState(false); //메시지창 on/off
	const [allyEffect, setAllyEffect] = useState({skillIdx:0,allEff:0,effSize:1,effAnimation:'',effRotate:'',effFilter:'',targets:[]});//아군 데미지효과
	const [enemyEffect, setEnemyEffect] = useState({skillIdx:0,allEff:0,effSize:1,effAnimation:'',effRotate:'',effFilter:'',targets:[]});//적군 데미지효과
	const targetIdx = useRef([]);//타겟 지정 임시저장
	const targetAreaArr = useRef([]);//이펙트 영역 임시저장
  const map = Array.from({length: 25}, (undefined, i) => {
		return {idx: i}
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
		let enemy = [],
			enemy_ = [],
			enemyP = [];
		//-----시나리오 시청 판단
    setTimeout(() => {
      setMode('passive');
    }, 75 / speed);
    battleAlly.current = [];
		ally.forEach((data, idx) => {//능력치 셋팅
			const saveCh = sData.ch[data];
			let effData;
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
		if (currentSkill.current?.sk?.cate[0] !== 5) {
			return;
		}
		if (mode === 'area') {
			if (battleAlly.current[orderIdx].sp < currentSkill.current.sp) {
				setMsgOn(true);
				setMsg(gameData.msg.sentence.lackSkillPoint[lang]);
			} else {
				if (e.target.classList.contains('effect')) {
					if (orderIdx < battleAlly.current.length - 1) {
						setOrderIdx((prev) => ++prev);
						setMode('order');
					} else {
						setOrderIdx('');
						setMode('action');
					}
					targetIdx.current = [];
					allyPos.current.forEach((posIdx, idx) => {
						targetAreaArr.current.forEach((actionIdx) => {
							if (posIdx.pos === actionIdx) {
								targetIdx.current.push(idx);
							}
						});
					});
					allyOrders.current.push({
						team: 'ally',
						idx: orderIdx,
						skIdx: currentSkill.current.sk.idx,
						skLv: currentSkill.current.skLv,
						enemyTarget: true,
						targetIdx: targetIdx.current,
						effectArea: targetAreaArr.current,
						target: pos,
						sp: -gameData.skill[currentSkill.current.sk.idx].sp,
					});
					setEffectEnemyArea([]);
					setEffectAllyArea([]);
				} else {
					if (battleAlly.current[orderIdx].sp < currentSkill.current.sp + 5) {
						setMsgOn(true);
						setMsg(gameData.msg.sentence.lackSkillPoint[lang]);
					} else {
						targetAreaArr.current = util.getEffectArea({
							type: currentSkill.current.sk.ta[currentSkill.current.skLv - 1],
							n: pos
						});
						setEffectAllyArea(targetAreaArr.current);
					}
				}
			}
		}
	}
  const areaEnemySelect = (e, pos) => {
		if (currentSkill.current?.sk?.cate[0] === 5) {
			return;
		}
		if (mode === 'area') {
			if (battleAlly.current[orderIdx].sp < currentSkill.current.sp) {
				setMsgOn(true);
				setMsg(gameData.msg.sentence.lackSkillPoint[lang]);
			} else {
				if (e.target.classList.contains('effect')) {
					if (orderIdx < battleAlly.current.length - 1) {
						setOrderIdx((prev) => ++prev);
						setMode('order');
					} else {
						setOrderIdx('');
						setMode('action');
					}
					targetIdx.current = [];
					enemyPos.current.forEach((posIdx, idx) => {
						targetAreaArr.current.forEach((actionIdx) => {
							if (posIdx === actionIdx) {
								targetIdx.current.push(idx);
							}
						});
					});
					allyOrders.current.push({
						team: 'ally',
						idx: orderIdx,
						skIdx: currentSkill.current.sk.idx,
						skLv: currentSkill.current.skLv,
						enemyTarget: true,
						targetIdx: targetIdx.current,
						effectArea: targetAreaArr.current,
						target: pos,
						sp: -gameData.skill[currentSkill.current.sk.idx].sp,
					});
					setEffectEnemyArea([]);
					setEffectAllyArea([]);
				} else {
					targetAreaArr.current = util.getEffectArea({
						type: currentSkill.current.sk.ta[currentSkill.current.skLv - 1],
						n: pos
					});
					setEffectEnemyArea(targetAreaArr.current);
				}
			}
		}
	};
  const battleCommand = ({skill, skLv}) => {
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
				targetAreaArr.current = util.getEffectArea({
					type: skill.ta[skLv - 1],
					n: 12
				});
				currentSkill.current = {
					sk: skill,
					skLv: skLv,
					sp: skill.sp,
				}
				const skType = skill.cate[0];
				switch (skType){
					case 7:
					case 8:
					case 9:
					case 3: //active
						setEffectEnemyArea(targetAreaArr.current);
						setMode('area');
						break;
					case 10: //날씨 변경
						if (orderIdx < battleAlly.current.length - 1) {
							setOrderIdx((prev) => ++prev);
						} else {
							setMode('action');
							setOrderIdx('');
						}
						console.log(skLv)
						allyOrders.current.push({
							team: 'ally',
							idx: orderIdx,
							skIdx: skill.idx,
							skLv: skLv,
							enemyTarget: false,
							effectArea: targetAreaArr.current,
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
							effectArea: targetAreaArr.current,
							target: allyPos.current[orderIdx].pos,
							sp: -skill.sp,
						});
						break;
					case 5: //buff
						setEffectAllyArea(targetAreaArr.current);
						setMode('area');
						break;
					case 6: //debuff
						setEffectEnemyArea(targetAreaArr.current);
						setMode('area');
						break;
					default:
						break;
				}
			}
		}
	};
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
      const targetArea = util.getEffectArea({
				type: gameData.skill[skIdx].ta[4],
				n: allyPos[target].pos,
			});
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
  useLayoutEffect(() => { //모드가 바꿨을때
		if (mode === 'passive') {
			setTimeout(() => {
				setAllyEnemyPassive([allyPassive.current, enemyPassive.current]);//패시브효과 전달
				setMode('wait');
				setTimeout(() => {
					setMode('order');
					setOrderIdx(0);
				}, 750 + allyPassive.current.length * 375 / speed);
			}, 1500 / speed);
		} else if (mode === 'action') {
			const turnPass = true;
			// const pB = passiveBuff(gameData, battleAlly.current, battleEnemy.current, allyEnemyPassive, allyPassive.current, enemyPassive.current, setAllyEnemyPassive, allyEnemyBuff, allyBuff.current, enemyBuff.current, setAllyEnemyBuff, allyPos.current, enemyPos.current, turnPass);

			//행동 포인트 수정
			battleAlly.current.map((data, idx) => {
				data.sp += allyOrders.current[idx].sp || 0;
				if (data.sp > data.sp_) {
					data.sp = data.sp_;
				}
			});
			// if (pB.enemyDmgArr['bleeding'] || pB.allyDmgArr['bleeding']) {
			// 	pB.timeDelay += 750 / speed;
			// 	if (pB.allyDmgArr['bleeding']) {
			// 		setAllyEffect(pB.allyDmgArr['bleeding']);
			// 	}
			// 	if (pB.enemyDmgArr['bleeding']) {
			// 		setEnemyEffect(pB.enemyDmgArr['bleeding']);
			// 	}
			// 	if (pB.enemyDmgArr['addicted'] || pB.allyDmgArr['addicted']) {
			// 		pB.timeDelay += 750 / speed;
			// 		setTimeout(() => {
			// 			if (pB.allyDmgArr['addicted']) {
			// 				setAllyEffect(pB.allyDmgArr['addicted']);
			// 			}
			// 			if (pB.enemyDmgArr['addicted']) {
			// 				setEnemyEffect(pB.enemyDmgArr['addicted']);
			// 			}
			// 		}, 750 / speed);
			// 	}
			// } else if (pB.enemyDmgArr['addicted'] || pB.allyDmgArr['addicted']) {
			// 	pB.timeDelay += 750 / speed;
			// 	if (pB.allyDmgArr['addicted']) {
			// 		setAllyEffect(pB.allyDmgArr['addicted']);
			// 	}
			// 	if (pB.enemyDmgArr['addicted']) {
			// 		setEnemyEffect(pB.enemyDmgArr['addicted']);
			// 	}
			// }
			setTimeout(() => {
				setAllyEffect({skillIdx:0,allEff:0,effSize:1,effAnimation:'',effRotate:'',effFilter:'',targets:[]});
				setEnemyEffect({skillIdx:0,allEff:0,effSize:1,effAnimation:'',effRotate:'',effFilter:'',targets:[]});
				timeLineSet();//타임라인 구성
				setTurnIdx(0);
				actionAnimation({
          setTurnIdx: setTurnIdx,
          setShowSkillMsg: setShowSkillMsg,
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
          customSkill: skill,
        });
			}, 1000);
		}
	}, [mode]);
  return (
    <>
      <BattleHeader className="header battle_header">
				<BackButton className="back">
					<IconPic className="ico" type="commonBtn" pic="icon100" idx={0} onClick={() => {
            navigate('../gameMain');
					}}></IconPic>
        </BackButton>
        <BattleTitle flex-h-center="true">
          <StyleSelect selectIdx={selectSpeed} setSelectIdx={setSelectSpeed} onClick={(idx) => {
            setSelectSpeed(idx);
            setSpeed(speedList[idx]);
          }} selectOption={speedList} title={'속도'}></StyleSelect>
          <StyleSelect selectIdx={selectSkillFilter} setSelectIdx={setSelectSkillFilter} onClick={(idx) => {
            setSelectSkillFilter(idx);
            setSkill((prev) => {
							const filter = (() => {
								switch(idx) {
									case 0:
										return '';
									case 1:
										return 'hue-rotate(90deg)';
									case 2:
										return 'hue-rotate(180deg)';
									case 3:
										return 'saturate(3)';
									case 4:
										return 'invert(100%)';
									default:
										return '';
								}
							})();
              return {
                ...prev,
                effFilter: filter,
              }
            });
          }} selectOption={skillFilterList} title={'색상'}></StyleSelect>
          <StyleSelect selectIdx={selectSkillTaget} setSelectIdx={setSelectSkillTaget} onClick={(idx) => {
            setSelectSkillTaget(idx);
            setSkill((prev) => {
              return {
                ...prev,
                ta: [idx + 1],
              }
            });
          }} selectOption={taList} title={'대상'}></StyleSelect>
          <StyleSelect selectIdx={selectEffectAnimation} setSelectIdx={setSelectEffectAnimation} onClick={(idx) => {
            setSelectEffectAnimation(idx);
            setSkill((prev) => {
              return {
                ...prev,
                effAnimation: skillEffectList[idx],
              }
            });
          }} selectOption={skillEffectList} title={'이펙트'}></StyleSelect>
          <StyleSelect selectIdx={selectEffectSize} setSelectIdx={setSelectEffectSize} onClick={(idx) => {
            setSelectEffectSize(idx);
            setSkill((prev) => {
              return {
                ...prev,
                effSize: [skillSizeList[idx]],
              }
            });
          }} selectOption={skillSizeList} title={'크기'}></StyleSelect>
          <StyleSelect selectIdx={selectEffectRotate} setSelectIdx={setSelectEffectRotate} onClick={(idx) => {
            setSelectEffectRotate(idx);
            setSkill((prev) => {
              return {
                ...prev,
                effRotate: skillRotateList[idx],
              }
            });
          }} selectOption={skillRotateList} title={'각도'}></StyleSelect>
        </BattleTitle>
      </BattleHeader>
      <BattleWarp className={`battle_wrap ${mode}`} backImg={imgSet.back[1]}>
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
            <BattleEffectLand allEff={enemyEffect.allEff >= 5 ? enemyEffect.allEff : 0} className={`land_enemy`} size={enemyEffect.effSize} rotate={enemyEffect.effRotate} filter={enemyEffect.effFilter}>
            {map.map((data, idx) => {
              const left = idx % 5 * mapSize,
                top = Math.floor(idx / 5) * mapSize;
							const effAnimation = enemyEffect.effAnimation.split('(')[0];
              let effectChk = false,
                effNum = '';
							if (enemyEffect.allEff >= 5) {
								if (idx === 12) {
									effectChk = true;
								}
							}
              enemyEffect.targets.forEach((effData) => {
                if (effData.posIdx === idx) {
                  effectChk = true;
                  effNum = effData.dmg;
                }
              });
              const effChk = effNum && effNum !== 0;
              return (
                <EffLand key={`effect${idx}`} className={`effect_land ${effChk ? 'dmg' : ''}`} left={left} top={top} gameSpd={speed}>
                  {effectChk && (
                    <EffArea className="eff_area" size={enemyEffect.effSize} rotate={enemyEffect.effRotate} filter={enemyEffect.effFilter} >
                      <Eff src={imgSet.effect[effAnimation].img} frame={imgSet.effect[effAnimation].frame} repeat={skill.effAnimationRepeat} gameSpd={speed}/>
                    </EffArea>
                  )}
                  <span className="dmgNum">{effChk ? effNum : ''}</span>
                </EffLand>
              );
            })}
            </BattleEffectLand>
            <BattleEffectLand allEff={allyEffect.allEff >= 5 ? allyEffect.allEff : 0} className={`land_ally`} size={allyEffect.effSize} rotate={allyEffect.effRotate} filter={allyEffect.effFilter}>
            {map.map((data, idx) => {
              const left = idx % 5 * mapSize,
                top = Math.floor(idx / 5) * mapSize;
							const effAnimation = allyEffect.effAnimation.split('(')[0];
              let effectChk = false,
                effNum = '';
							if (allyEffect.allEff >= 5) {
								if (idx === 12) {
									effectChk = true;
								}
							}
              allyEffect.targets.forEach((effData) => {
                if (effData.posIdx === idx) {
                  effectChk = true;
                  effNum = effData.dmg;
                }
              });
              const effChk = effNum && effNum !== 0;
              return (
                <EffLand key={idx} className={`effect_land ${effChk ? 'dmg' : ''} `} left={left} top={top} gameSpd={speed}>
                  {effectChk && (
                    <EffArea className="eff_area" size={allyEffect.effSize} rotate={allyEffect.effRotate} filter={allyEffect.effFilter} >
                      <Eff src={imgSet.effect[effAnimation].img} frame={imgSet.effect[effAnimation].frame} repeat={skill.effAnimationRepeat} gameSpd={speed}/>
                    </EffArea>
                  )}
                  <span className="dmgNum">{effChk ? effNum : ''}</span>
                </EffLand>
              )
            })}
            </BattleEffectLand>
          </BattleEffect>
          <BattleUnit ref={battleUnitRef} className="battle_units">
            <div className="units_enemy">
              {battleEnemy.current && enemyDeck.map((enemyData, idx)=> {
                const left = idx % 5 * mapSize,
                  top = Math.floor(idx / 5) * mapSize,
                  area = chkString(effectEnemyArea, idx);
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
                    <BattleCh key={idx} className={`battle_ch ${area ? "effect effect" + element_type : ""} ${actionCh} ${actionPos} ${state}`} data-ch={chData?.display} data-idx={idx} left={left} top={top} size={mapSize} onClick={(e) => {
                      areaEnemySelect(e, idx);
                    }} gameSpd={speed} defenceIcon0={imgSet.actionIcon[0]} defenceIcon1={imgSet.actionIcon[1]} defenceIcon2={imgSet.actionIcon[2]} tombstone={imgSet.actionIcon[3]}>
                      {buffEff && buffEff.map((buffData, idx) => {
                        return (
                          <Buff key={idx} className="ch_buff" gameSpd={speed} effImg={imgSet.effect[buffData].img} frame={imgSet.effect[buffData].frame} buffEff={buffData} >
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
                        <CharacterCard usedType="battle" saveData={sData} gameData={gameData} saveCharacter={enemyData} gameSpd={speed} />
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
                    <BattleCh key={idx} className={`battle_ch ${posCh} ${area ? "effect effect" + element_type : ""} ${actionCh} ${actionPos} ${state}`} data-ch={chData?.display} data-idx={idx} left={left} top={top} size={mapSize} onClick={(e) => {
                      areaAllySelect(e, idx);
                    }}  gameSpd={speed} defenceIcon0={imgSet.actionIcon[0]} defenceIcon1={imgSet.actionIcon[1]} defenceIcon2={imgSet.actionIcon[2]} tombstone={imgSet.actionIcon[3]}>
                      {buffEff && buffEff.map((buffData, idx) => {
                        return (
                          <Buff key={idx} className="ch_buff" gameSpd={speed} effImg={imgSet.effect[buffData].img} frame={imgSet.effect[buffData].frame} buffEff={buffData}>
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
                        <CharacterCard usedType="battle" saveData={sData} gameData={gameData} saveCharacter={saveCh} gameSpd={speed} />
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
          <BattleLand ref={battleLandRef} className={`battle_land ${mode === "relation" ? "" : "ready"} ${landCriticalEffect ? "critical" : ""} ${mode === "action" ? "action" : ""}`} gameSpd={speed}>
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
        <BattleMsg className={`battle_order ${showSkillMsg ? 'on' : ''} ${typeof turnIdx === 'number' && timeLine.current[turnIdx]?.order.team === 'ally' ? 'ally' : 'enemy'} ${typeof turnIdx === 'number' && gameData.ch[timeLine.current[turnIdx]?.order.idx]?.face_d}`} gameSpd={speed}>
          <div className="battle_msg">
            {typeof turnIdx === 'number' && gameData.skill[timeLine.current[turnIdx]?.order.skIdx]?.na[lang]}
          </div>
        </BattleMsg>
      </BattleArea>
      <BattleOrder>
        {battleAlly.current && <BattleMenu className="battle_menu" mode={mode} gameSpd={speed}>
          {typeof orderIdx === 'number' && (
            <>
              <ul className="scroll-x">
                <li><button onClick={() => {
                  battleCommand({
                    skill: skill,
                    skLv: 1
                  });
                }}><span className="skSp">{skill.sp}</span><span className="skName">{skill.na[lang]}</span></button></li>
                {/* {battleAlly.current[orderIdx]?.hasSkill && battleAlly.current[orderIdx]?.hasSkill.map((data, idx) => {
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
                        battleCommand({
                          skill: sk[data.idx],
                          skLv: data.lv
                        });
                      }}><span className="skSp">{sk[data.idx].sp}</span><span className="skName">{sk[data.idx].na[lang]}</span></button></li>
                    );
                  }
                })} */}
              </ul>
            </>
          )}
        </BattleMenu>}
      </BattleOrder>
    </BattleWarp>
    <MsgContainer>
      {msgOn && <Msg text={msg} showMsg={setMsgOn}></Msg>}
    </MsgContainer>
    </>
  );
}

export default TestSkill;
