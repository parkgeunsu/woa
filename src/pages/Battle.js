import { AppContext } from 'App';
import { FlexBox } from 'components/Container';
import { IconPic } from 'components/ImagePic';
import { util } from 'components/Libs';
import Msg from 'components/Msg';
import MsgContainer from 'components/MsgContainer';
import CharacterCard from 'pages/CharacterCard';
import React, { useCallback, useContext, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledIconPic = styled(IconPic)`
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index:10;
	background: #f00;
`;
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
const BattleTitle = styled(FlexBox)`
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
	&.order .bgEffect .bg_light.lightning, &.action .bgEffect .bg_light.lightning {
		transition: unset;
		animation: onoff 8s infinite;
	}
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
		${'' /* .effect21:before {
  		box-shadow: 0 0 5px 5px var(--color-unique), inset 0 0 5px 5px var(--color-unique);
		}
		.effect22:before {
  		box-shadow: 0 0 5px 5px var(--color-unique), inset 0 0 5px 5px var(--color-unique);
		}
		.effect23:before {
  		box-shadow: 0 0 5px 5px var(--color-unique), inset 0 0 5px 5px var(--color-unique);
		}
		.effect24:before {
  		box-shadow: 0 0 5px 5px var(--color-unique), inset 0 0 5px 5px var(--color-unique);
		}
		.effect25:before {
  		box-shadow: 0 0 5px 5px var(--color-unique), inset 0 0 5px 5px var(--color-unique);
		} */}
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
	transition: all ${({ gameSpd }) => gameSpd}s;
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
	transition: all ${({ gameSpd }) => gameSpd}s;
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
const TimeLineCh = styled.div`
	position: relative;
	padding-top: ${({size}) => size}px;
	width: ${({size}) => size}px;
	height: 0;
	border-radius: 50%;
	overflow: hidden;
	${({team}) => team === 'ally' ? 'margin:15px 0 0 0;' : 'margin:-15px 0 0 0;'}
	z-index: 1;
	outline: 1px solid #fff;
	.state {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 5;
	}
	&.wait {
		.state {
			background-size:70%;
		}
	}
	&.off {
		filter: grayscale(1);
	}
	&.on {
		animation: turnEffect ${({ gameSpd }) => 1.5 / gameSpd}s linear infinite;
		z-index: 20;
	}
	&.die {
		filter: brightness(0.3);
	}
`;
const CardMutate = styled(IconPic)`
	display: none;
  border-radius: 30%;
  overflow: hidden;
  z-index: 4;
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
		transition: all ${({ gameSpd }) => 0.225/ gameSpd}s;
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
	.state, .stateDie {
		pointer-events: none;
		opacity: 0;
		z-index: 2;
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
		}
		.ch_top {
			transform: scale(1.5) translate(0, -60%);
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
	&.state2 .state {
		animation: defence ${({ gameSpd }) => 0.75 / gameSpd}s;
		opacity: 1;
	}
	&.state3 .state {
		animation: defence ${({ gameSpd }) => 0.75 / gameSpd}s;
		opacity: 1;
	}
	&.state4 .state {
		animation: defence ${({ gameSpd }) => 0.75 / gameSpd}s;
		opacity: 1;
	}
	&.avoid0 {
		animation: avoid0 ${({ gameSpd }) => 0.75 / gameSpd}s ease-out;
	}
	&.avoid1 {
		animation: avoid1 ${({ gameSpd }) => 0.75 / gameSpd}s ease-out;
	}
	&.avoid2 {
		animation: avoid2 ${({ gameSpd }) => 0.75 / gameSpd}s ease-out;
	}
	&.avoid3 {
		animation: avoid3 ${({ gameSpd }) => 0.75 / gameSpd}s ease-out;
	}
	&.dmg .dmg{
		animation: dmgAnimation ${({gameSpd}) => 0.375 / gameSpd}s steps(3) 2;
	}
	&.dmgCri .dmg {
		animation: dmgCriticalAnimation ${({gameSpd}) => 0.375 / gameSpd}s steps(3) 3;
	}
	&.heal .dmg{
		animation: healAnimation ${({gameSpd}) => 0.375 / gameSpd}s steps(3) 2;
	}
	&.healCri .dmg {
		animation: healCriticalAnimation ${({gameSpd}) => 0.375 / gameSpd}s steps(3) 3;
	}
	&.die {
		.ch_box {
			opacity: 0;
			transform: scale(0.1);
		}
		.stateDie {
			animation: tombstone ${({ gameSpd }) => 1.125 / gameSpd}s;
			opacity: 1;
			animation-fill-mode: forwards;
			transform-origin: 50% 100%;
		}
	}
	/*상태이상*/
	&.invincible .ch_box {
		filter: opacity(0.7) drop-shadow(0px 0px 5px #fff) drop-shadow(0px 0px 3px #09f) drop-shadow(0px 0px 1px #00f);
	}
	&.immunity .ch_box {
		filter: opacity(0.7) drop-shadow(0px 0px 5px #fff) drop-shadow(0px 0px 3px #f90) drop-shadow(0px 0px 1px #f00);
	}
	&.bleeding .ch_box {
		filter: opacity(0.7) drop-shadow(0px 0px 5px #f00) drop-shadow(0px 0px 3px #f00) drop-shadow(0px 0px 1px #f00);
	}
	&.addicted .ch_box {
		filter: contrast(5) sepia(1) opacity(0.5) drop-shadow(0px 0px 5px #f0f) drop-shadow(0px 0px 3px #f0f) drop-shadow(0px 0px 1px #f0f);
	}
	${'' /* &.bleeding.addicted .ch_box {
		filter: saturate(1.5) sepia(0.7) contrast(5) opacity(0.8) drop-shadow(0px 0px 5px #F00);
	} */}
	&.petrification .ch_box {
		filter: contrast(0.5) grayscale(1) brightness(2) drop-shadow(0px 0px 3px #fff) drop-shadow(0px 0px 1px #fff);
	}
	&.freezing .ch_box {
		filter: brightness(3) opacity(0.7) drop-shadow(0 0 5px #0ff) drop-shadow(0 0 3px #0ff) drop-shadow(0 0 1px #0ff);
	}
	&.petrification .card_ring {
		animation-play-state: paused;
	}
	&.confusion .ch_box {
		animation:confusion ${({ gameSpd }) => 2.25 / gameSpd}s infinite;
		filter: saturate(7);
	}
	&.stun .ch_box {
		transform-origin: 50% 50%;
		animation:stun ${({ gameSpd }) => 18 / gameSpd}s linear infinite;
	}
	&.mutate {
		.ch_box {
			.card_ch {
				display: none;
			}
			.card_mutate {
				display: block;
			}
		}
	}
	&.elevation1 {
		&:before{
			content: '';
			position: absolute;
			left: 15%;
			top: 15%;
			width: 70%;
			padding-top: 70%;
			background: #fff;
			filter: blur(10px);
			z-index: 1;
		}
		.ch_box {
			transform-origin: 50% 50%;
			animation:elevationFly ${({ gameSpd }) => 15 / gameSpd}s linear infinite;
		}
	}
	&.elevation2 .ch_box {
		filter: opacity(0.6) blur(1px);
	}
	&.elevation3 .ch_box {
		filter: opacity(0.8) brightness(0.4);
		&:before {
			content: '';
			position: absolute;
			left: 10%;
			top: 30%;
			width: 25%;
			padding-top: 5%;
			background: #f00;
			transform: rotate(20deg);
			z-index: 10;
		}
		&:after {
			content: '';
			position: absolute;
			right: 10%;
			top: 30%;
			width: 25%;
			padding-top: 5%;
			background: #f00;
			transform: rotate(-20deg);
			z-index: 10;
		}
	}
	&.mutate0 .card_mutate {
		background-position-x: 0% !important;
	}
	&.mutate1 .card_mutate {
		background-position-x: 11.11% !important;
	}
	&.mutate2 .card_mutate {
		background-position-x: 22.22% !important;
	}
	&.mutate3 .card_mutate {
		background-position-x: 33.33% !important;
	}
	&.mutate4 .card_mutate {
		background-position-x: 44.44% !important;
	}
	&.mutate5 .card_mutate {
		background-position-x: 55.55% !important;
	}
	&.mutate6 .card_mutate {
		background-position-x: 66.66% !important;
	}
	&.mutate7 .card_mutate {
		background-position-x: 77.77% !important;
	}
	&.mutate8 .card_mutate {
		background-position-x: 88.88% !important;
	}
	&.mutate9 .card_mutate {
		background-position-x: 99.99% !important;
	}
	&.elevation1 .elevationIcon {
		background-position-x: 11.1% !important;
	}
	&.elevation2 .elevationIcon {
		background-position-x: 22.2% !important;
	}
	&.elevation3 .elevationIcon {
		background-position-x: 33.3% !important;
	}
`;
const BattleChTop = styled(FlexBox)`
	position: absolute;
	height: 25%;
	width: 100%;
	top: -30%;
	z-index: 10;
	.elevation {
		position: relative;
		padding-top: 25%;
		width: 25%;
		height: 0;
	}
	.hpsp {
		width: 75%;
		span {
			display: flex;
			width: 100%;
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
					font-size: 0.4375rem;
					text-indent: 2px;
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
					font-size: 0.4375rem;
					text-indent: 2px;
				}
			}
		}
	}
`;
const Buff = styled.div`
	.buff_effect{
		height:${({frame}) => {
			return Math.ceil(frame / 5) * 100;
		}}%;
		background:url(${({effImg}) => effImg}) no-repeat center center;background-size:100%;z-index:1;
		animation:frame${({frame}) => frame} ${({gameSpd}) => gameSpd}s steps(1);
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
	animation:${({frame, repeat, gameSpd}) => `frame${frame} ${(frame / 10) * gameSpd / repeat}s steps(1)`};
	animation-iteration-count: ${({repeat}) => repeat || "infinite"};
`;
const EffNum = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;
	color: ${({effType}) => effType === 'dmg' ? 'var(--color-red)' : 'var(--color-blue)'};
	font-size: 0.938rem;
	font-weight: 600;
	opacity: 1;
	transform: translate(-50%, -50%) scale(1);
	text-shadow: 0 0 1px #fff, 0 0 1px #fff, 0 0 2px #fff, 0 0 2px #fff,
		0 0 3px #fff;
	z-index: 12;
	animation: dmg_num ${({gameSpd}) => gameSpd}s ease-in;
	animation-iteration-count: 1;
	animation-fill-mode: forwards;
`;
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
const BattleScenario = styled.div`
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	padding: 20px;
	box-sizing: border-box;
	z-index: 10;
	background-color: rgba(0, 0, 0, 0.85);
`;
const ScenarioBox = styled.div`
	margin: 15px 0;
	align-items: center;
	.scenario_ch {
		position: relative;
		width: 100px;
		height: 100px;
		.ch_name {
			position: absolute;
			bottom: 0;
			width: 100%;
			text-align: center;
			word-break: keep-all;
			line-height: 1.3;
			font-weight: 600;
			font-size: 0.875rem;
		}
		.ring_back {
			display: block;
			position: absolute;
			left: 10%;
			top: 10%;
			width: 80%;
			height: 80%;
			border-radius: 40px;
			overflow: hidden;
			box-shadow: 0 0 10px #fff;
		}
		.ch_style {
			display: block;
			position: absolute;
			left: -10%;
			top: -20%;
			width: 120%;
			height: 120%;
			background-repeat: no-repeat;
		}
	}
	.scenario_talk {
		position: relative;
		padding: 10px;
		border: 4px solid #fff;
		background: rgba(255, 255, 255, 0.7);
		box-sizing: border-box;
		border-radius: 10px;
		color: #000;
		flex: 1;
		line-height: 1.5;
		font-size: 0.875rem;
	}
	&.left {
		.scenario_ch {
			margin: 0 10px 0 0;
			order: 1;
		}
		.scenario_talk {
			order: 2;
			&:after {
				content: "";
				position: absolute;
				top: 50%;
				left: -14px;
				transform: translate(0, -50%);
				border-right: 10px solid #fff;
				border-top: 10px solid transparent;
				border-bottom: 10px solid transparent;
			}
		}
	}
	&.right {
		.scenario_ch {
			margin: 0 0 0 10px;
			order: 2;
		}
		.scenario_talk {
			order: 1;
			&:after {
				content: "";
				position: absolute;
				top: 50%;
				right: -14px;
				transform: translate(0, -50%);
				border-left: 10px solid #fff;
				border-top: 10px solid transparent;
				border-bottom: 10px solid transparent;
			}
		}
	}
	&.ally .scenario_ch .ch_name {
		text-shadow: 0 0 3px #00f, 0 0 3px #00f, 0 0 3px #00f;
	}
	&.enemy .scenario_ch .ch_name {
		text-shadow: 0 0 3px #f00, 0 0 3px #f00, 0 0 3px #f00;
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
const BattleWeater = styled.div`
	position: absolute;
  right: 5px;
  bottom: 0;
  width: 50px;
  height: 115px;
  transition: all 0.5s;
  border-radius: 10px 0 0 0;
  z-index: 51;
`;
const WeatherIconBox = styled.div`
  position: relative;
  margin: 0 0 5px 0;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  box-shadow: 0 0 10px #000;
  border: 2px solid #ddd;
  box-sizing: border-box;
  background: radial-gradient(at 30% 30%, rgba(200, 200, 200, 1) 0%, rgba(0, 0, 0, 1) 60%);
  overflow: hidden;
	&.day {
  	background: radial-gradient(at 30% 30%, rgba(200, 200, 200, 1) 0%,rgba(50, 50, 0, 1) 60%);
	}
	&.night {
		background: radial-gradient(at 30% 30%, rgba(100, 100, 100, 1) 0%, rgba(0, 0, 0, 1) 60%);
	}
	.weather_typeIcon {
		position: absolute;
		left: 0;
		top: 0;
		transition: all 0.5s;
	}
`;
const WeatherIcon = styled.div`
	position: absolute;
	left: ${({idx}) => 50 * idx}px;
	width: 46px;
	height: 46px;
	background-image: url(${({src}) => src});
	background-size: 80%;
	background-position: center center;
	background-repeat: no-repeat;
`;
const WeatherArrow = styled.div`
	position: absolute;
  width: 46px;
  height: 46px;
  transition: all 0.5s;
	background-image: url(${({src}) => src});
	background-size: 100%;
	background-repeat: no-repeat;
	background-position: center center;
	transform: rotate(${({weatherInfo}) => weatherInfo.wind}deg);
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
	display: flex;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	flex-direction: column;
	z-index: 50;
	align-items: center;
	justify-content: center;
	pointer-events: none;
	&:after {
		content: "";
		position: absolute;
		width: 100%;
		height: 0;
		box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0);
		background: rgba(0, 0, 0, 0.7);
		transition: all ${({gameSpd}) => 0.375 / gameSpd}s ${({gameSpd}) => 0.5 / gameSpd}s ease-in-out;
	}
	&.on{
		.relationTitle span {
			opacity: 1;
		}
		.relationName {
			filter: blur(0);
		}
		&:after {
			height: ${({rtHeight}) => rtHeight}px;
			box-shadow: 0 0 20px 10px rgba(0,0,0,.7);
		}
	}
	.relationTitle {
		margin: 0 0 10px 0;
		z-index: 1;
		span {
			display: inline-block;
			margin: 0 2px;
			font-size: 2.1rem;
			font-weight: 600;
			opacity: 0;
			color: #fff;
		}
		span:first-of-type{
			transition: opacity ${({gameSpd}) => 0.375 / gameSpd}s 0s;text-shadow:0 0 10px #ff0,0 0 10px #ff0;
		}
		span:nth-of-type(2){
			transition: opacity ${({gameSpd}) => 0.375 / gameSpd}s .2s;text-shadow:0 0 10px #fb0,0 0 10px #fb0;
		}
		span:nth-of-type(3){
			transition: opacity ${({gameSpd}) => 0.375 / gameSpd}s .4s;text-shadow:0 0 10px #f60,0 0 10px #f60;
		}
		span:last-of-type{
			transition: opacity ${({gameSpd}) => 0.375 / gameSpd}s .6s;text-shadow:0 0 10px #f00,0 0 10px #f00;
		}
	}
`;
const RelationName = styled.div`
	position:relative;margin:5px 0;padding:0 0 0 13px;color:#fff;z-index:1;filter:blur(5px);transition:all ${({gameSpd}) => 0.375 / gameSpd}s ${({idx}) => 0.5 + idx * 0.3}s;
	&:after{content:'';position:absolute;left:0;top:50%;transform:translate(0, -50%);width:5px;height:5px;background:${({color}) => color};box-shadow:0 0 8px 5px ${({color}) => color};}
`;
const BgEffect = styled.div`
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	pointer-events: none;
	.cloud{
		position: absolute;
		width: 1000px;
		height: 400px;
		z-index: 40;
		animation-play-state: running;
		transition: all ${({gameSpd}) => 1.5 / gameSpd}s;
	}
	.cloud1{
		top: 0;
		animation: cloudAnimation ${({gameSpd}) => 157 / gameSpd}s linear infinite;background-image: url(${({img1}) => img1});
		background-size: 100%;
	}
	.cloud2{
		top: 30%;
		animation: cloudAnimationReverse ${({gameSpd}) => 97 / gameSpd}s linear infinite;background-image: url(${({img2}) => img2});
		background-size: 100%;
		opacity: 1;
	}
	.bg_light {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 39;
		transition: all 0.5s;
		overflow: hidden;
		.circle {
			position: absolute;
			border-radius: 50%;
			&:first-of-type {
				left: 65%;
				top: 3%;
				width: 10px;
				height: 10px;
				background: #fff;
				opacity: 0.5;
				filter: blur(2px);
			}
			&:nth-of-type(2) {
				left: 37%;
				top: 6%;
				width: 60px;
				height: 60px;
				background: #fff;
				opacity: 0.5;
				filter: blur(3px);
			}
			&:nth-of-type(3) {
				left: 47%;
				top: 28%;
				width: 20px;
				height: 20px;
				background: #fff;
				opacity: 0.5;
				filter: blur(2px);
			}
			&:nth-of-type(4) {
				left: 23%;
				top: 18%;
				width: 30px;
				height: 30px;
				background: #fff;
				opacity: 0.5;
				filter: blur(3px);
			}
			&:nth-of-type(5) {
				left: 8%;
				top: 3%;
				width: 20px;
				height: 20px;
				background: #fff;
			}
		}
	}
	canvas {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		z-index: 40;
	}
	&.action {
		.cloud {
			animation-play-state: paused;
			opacity: 0;
		}
		.cloud2 {
			left: -1000px;
			animation-play-state: paused;
		}
	}
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
const enemyPattern = ({mode, ai, battleAlly, allyPos, battleEnemy, enemyPos, gameData}) => {
	if (mode === 'end') {
		console.log('전투 종료')
		return;
	}
	let enemySkill = [];
	const activeSkillSorting = (skill) => {
		let active = [],
			buff = [],
			debuff = [],
			special = [];
		skill.forEach((data, idx) => {
			if (gameData.skill[data.idx].cate === 3 || gameData.skill[data.idx].cate === 13) {
				active.push(data);
			} else if (gameData.skill[data.idx].cate === 7 || gameData.skill[data.idx].cate === 8 || gameData.skill[data.idx].cate === 9) {
				special.push(data);
			} else if (gameData.skill[data.idx].cate === 5) {
				buff.push(data);
			} else if (gameData.skill[data.idx].cate === 6) {
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
	battleEnemy.forEach((data, idx) => {
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
		const areaArr = util.getEffectArea({
			isEnemy: gameData.skill[skIdx].ta_,
			type: gameData.skill[skIdx].ta[4],
			n: allyPos[target].pos,
			allyPos: allyPos,
			battleAlly: battleAlly.current,
			enemyPos: enemyPos.current,
			battleEnemy: battleEnemy.current,
		});
		let targetIdx = [];
		allyPos.forEach((posIdx, idx) => {
			areaArr.forEach((actionIdx) => {
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
			effectArea: areaArr,
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
				return 'wait';
			case 2: //방어
				return 'state2';
			case 13: //철벽방어
				return 'state3';
			case 14: //마법방어
				return 'state4';
			case 15: //나무뒤에 숨기
				return 'state5';
			default:
				return '';
		}
	} else {
		return 'die';
	}
}
const actionAnimation = ({setTurnIdx, setSkillMsg, skillEffect, turnIdx, timeLine, resetOrder, setAllyEffect, setEnemyEffect, gameData, battleAlly, battleEnemy, gameSpd, bgm, setAllyAction, setEnemyAction, setLandCriticalEffect, allyPos, enemyPos, modeRef, setMode, setWeather, allyEnemyPassive, allyPassive, enemyPassive, setAllyEnemyPassive, allyEnemyBuff, allyBuff, enemyBuff, setAllyEnemyBuff, atkOption}) => {
	if (modeRef.indexOf('battle') >= 0){ //battleLose, battleWin시 
		return;
	}
	const timeDelay = gameData.timeDelay.battle;
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
		let isCounterAtk = false; //카운터 어택인지
		let skillCate = 0;
		let atkC = [0, false], //공격 횟수
			atkS = atkOption?.atkStay || 0; //한캐릭이 공격한 횟수 체크
		let buffDebuff = []; //버프 임시저장 변수
		if (timeLine[turnIdx].order.team === 'ally') {//캐릭 상태이상으로 스킵 체크
			const allyState = battleAlly[timeLine[turnIdx].order.idx].state;
			if (allyState.indexOf('die') >= 0 || allyState.indexOf('petrification') >= 0 || allyState.indexOf('stun') >= 0 || allyState.indexOf('freezing') >= 0 || allyState.indexOf('immunity') >= 0) {//죽은 상태, 석화, 기절, 빙결, 이뮨
				skillCate = 1;
			} else if (allyState.indexOf('confusion') >= 0) {//혼란
				if (!timeLine[turnIdx].order.counterAttack) {//카운터가 아닐경우
					if (Math.random() < 0.5) {
						console.log('혼란1', 1)
						skillCate = 3;
						const attackIdx = Math.floor(Math.random() * enemyPos.length);
						timeLine[turnIdx].order = {
							...timeLine[turnIdx].order,
							skIdx:1,
							skLv:1,
							sp:[0,0,0,0,0],
							effectArea:[enemyPos[attackIdx]],
							target:enemyPos[attackIdx],
							targetIdx:[attackIdx]
						}
					} else {
						skillCate = 15;
						const attackIdx = Math.floor(Math.random() * allyPos.length);
						timeLine[turnIdx].order = {
							...timeLine[turnIdx].order,
							skIdx:1,
							skLv:1,
							sp:[0,0,0,0,0],
							effectArea:[allyPos[attackIdx].pos],
							target:allyPos[attackIdx].pos,
							targetIdx:[allyPos[attackIdx].idx]
						}
						console.log('혼란2', timeLine[turnIdx].order)
					}
				}
			} else if (allyState.indexOf('mutate') >= 0) {//변이
				if (!timeLine[turnIdx].order.counterAttack) {//카운터가 아닐경우
				}
			}
		} else {
			const enemyState = battleEnemy[timeLine[turnIdx].order.idx].state;
			if (enemyState.indexOf('die') >= 0 || enemyState.indexOf('petrification') >= 0 || enemyState.indexOf('stun') >= 0 || enemyState.indexOf('freezing') >= 0 || enemyState.indexOf('immunity') >= 0) {//죽은 상태, 석화, 기절, 빙결, 이뮨
				skillCate = 1;
			} else if (enemyState.indexOf('confusion') >= 0) {//혼란
				if (!timeLine[turnIdx].order.counterAttack) {//카운터가 아닐경우
					if (Math.random() < 0.5) {
						skillCate = 3;
						const attackIdx = Math.floor(Math.random() * allyPos.length);
						timeLine[turnIdx].order = {
							...timeLine[turnIdx].order,
							skIdx:1,
							skLv:1,
							sp:[0,0,0,0,0],
							effectArea:[allyPos[attackIdx].pos],
							target:allyPos[attackIdx].pos,
							targetIdx:[allyPos[attackIdx].idx]
						}
					} else {
						skillCate = 15;
						const attackIdx = Math.floor(Math.random() * enemyPos.length);
						timeLine[turnIdx].order = {
							...timeLine[turnIdx].order,
							skIdx:1,
							skLv:1,
							sp:[0,0,0,0,0],
							effectArea:[enemyPos[attackIdx]],
							target:enemyPos[attackIdx],
							targetIdx:[attackIdx]
						}
					}
				}
			} else if (enemyState.indexOf('mutate') >= 0) {//변이
				if (!timeLine[turnIdx].order.counterAttack) {//카운터가 아닐경우
				}
			}
		}
		const skillIdx = timeLine[turnIdx].order.skIdx,
			skillLv = timeLine[turnIdx].order.skLv - 1;
		const skill = gameData.skill[skillIdx];
		skillCate = skillCate === 0 ? skill.cate : skillCate;
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
			console.log(timeLine[turnIdx]);
			if (timeLine[turnIdx].order.team === 'ally') { //아군 공격
				attacker = battleAlly[timeLine[turnIdx].order.idx];//공격자 셋팅
				if (skillCate === 5) { //아군 버프 방어자 셋팅
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
							console.log('stun', data_.type, buffDebuff[defData.idx]);
							const maxCount = skill.buffCount[skillLv];
							if (buffDebuff[defData.idx][data_.type] === undefined) {
								buffDebuff[defData.idx][data_.type] = {count:0,maxCount:0,type:'', num:0,animation:skill.buffAnimation};
							}
							buffDebuff[defData.idx][data_.type].count = maxCount;
							buffDebuff[defData.idx][data_.type].maxCount = maxCount;
							buffDebuff[defData.idx][data_.type].type = data_.type;
							buffDebuff[defData.idx][data_.type].num = data_.num[skillLv];
							buffDebuff[defData.idx][data_.type].animation = skill.effAnimation;
						});
					});
				} else if (skillCate === 6) { //적군 디버프 방어자 셋팅
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
							const maxCount = skill.buffCount[skillLv];
							if (buffDebuff[defData.idx][data_.type] === undefined) {
								buffDebuff[defData.idx][data_.type] = {count:0,maxCount:0,type:'', num:0,animation:skill.buffAnimation};
							}
							buffDebuff[defData.idx][data_.type].count = maxCount;
							buffDebuff[defData.idx][data_.type].maxCount = maxCount;
							buffDebuff[defData.idx][data_.type].type = data_.type;
							buffDebuff[defData.idx][data_.type].num = data_.num[skillLv];
							buffDebuff[defData.idx][data_.type].animation = skill.effAnimation;
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
						//상태이상 확률
						const chance = parseInt(skill.buffChance[skillLv]) / 100;
						const percent = Math.random();
						if (percent < chance) {
							skill.buff.forEach((data_) => {
								const maxCount = skill.buffCount[skillLv];
								if (buffDebuff[defData.idx][data_.type] === undefined) {
									buffDebuff[defData.idx][data_.type] = {count:0,maxCount:0,type:'', num:0,animation:skill.buffAnimation};
								}
								buffDebuff[defData.idx][data_.type].count = maxCount;
								buffDebuff[defData.idx][data_.type].maxCount = maxCount;
								buffDebuff[defData.idx][data_.type].type = data_.type;
								buffDebuff[defData.idx][data_.type].num = data_.num[skillLv];
								buffDebuff[defData.idx][data_.type].animation = skill.effAnimation;
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
										enemyAction[data.order.idx] = 'state2';
									} else if (data.order.skIdx === 14) { //마법방어
										enemyAction[data.order.idx] = 'state3'; 
									} else if (data.order.skIdx === 13) { //철벽방어
										enemyAction[data.order.idx] = 'state4'; 
									} else if (data.order.skIdx === 15) { //나무뒤에 숨기
										enemyAction[data.order.idx] = 'state5'; 
									}
								}
							});
						}
					});
				} else if (skillCate === 8){ //액티브스킬 버프추가
					defencer = timeLine[turnIdx].order.targetIdx.map((data) => {
						return {
							ch: battleEnemy[data],
							idx: data,
						}
					});
					const attackerIdx = timeLine[turnIdx].order.idx;
					if (buffDebuff[attackerIdx]) {
						buffDebuff[attackerIdx] = [];
					}
					buffDebuff[attackerIdx] = [...battleAlly[attackerIdx].buffDebuff];
					skill.buff.forEach((data_) => {
						const maxCount = skill.buffCount[skillLv];
						if (buffDebuff[attackerIdx][data_.type] === undefined) {
							buffDebuff[attackerIdx][data_.type] = {count:0,maxCount:0,type:'', num:0,animation:skill.buffAnimation};
						}
						buffDebuff[attackerIdx][data_.type].count = maxCount;
						buffDebuff[attackerIdx][data_.type].maxCount = maxCount;
						buffDebuff[attackerIdx][data_.type].type = data_.type;
						buffDebuff[attackerIdx][data_.type].num = data_.num[skillLv];
						buffDebuff[attackerIdx][data_.type].animation = skill.effAnimation;
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
										enemyAction[data.order.idx] = 'state2';
									} else if (data.order.skIdx === 14) { //마법방어
										enemyAction[data.order.idx] = 'state3'; 
									} else if (data.order.skIdx === 13) { //철벽방어
										enemyAction[data.order.idx] = 'state4'; 
									} else if (data.order.skIdx === 15) { //나무뒤에 숨기
										enemyAction[data.order.idx] = 'state5'; 
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
							const maxCount = skill.buffCount[skillLv];
							if (buffDebuff[defData.idx][data_.type] === undefined) {
								buffDebuff[defData.idx][data_.type] = {count:0,maxCount:0,type:'', num:0,animation:skill.buffAnimation};
							}
							buffDebuff[defData.idx][data_.type].count = maxCount;
							buffDebuff[defData.idx][data_.type].maxCount = maxCount;
							buffDebuff[defData.idx][data_.type].type = data_.type;
							buffDebuff[defData.idx][data_.type].num = data_.num[skillLv];
							buffDebuff[defData.idx][data_.type].animation = skill.effAnimation;
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
										enemyAction[data.order.idx] = 'state2';
									} else if (data.order.skIdx === 14) { //마법방어
										enemyAction[data.order.idx] = 'state3'; 
									} else if (data.order.skIdx === 13) { //철벽방어
										enemyAction[data.order.idx] = 'state4'; 
									} else if (data.order.skIdx === 15) { //나무뒤에 숨기
										enemyAction[data.order.idx] = 'state5'; 
									}
								}
							});
						}
					});
				} else if (skillCate === 10) { //날씨 변경
					if (Math.random() < skill.buff[0].num[skillLv].split('%')[0] / 100) {
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
				} else if (skillCate === 13) { //액티브스킬 힐,부활 셋팅
					defencer = timeLine[turnIdx].order.targetIdx.map((data) => {
						return {
							ch: battleAlly[data],
							idx: data,
						}
					});
				} else if (skillCate === 15) { //팀킬
					defencer = timeLine[turnIdx].order.targetIdx.map((data) => {
						return {
							ch: battleAlly[data],
							idx: data,
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
										allyAction[data.order.idx] = 'state2';
									} else if (data.order.skIdx === 14) { //마법방어
										allyAction[data.order.idx] = 'state3'; 
									} else if (data.order.skIdx === 13) { //철벽방어
										allyAction[data.order.idx] = 'state4'; 
									} else if (data.order.skIdx === 15) { //나무뒤에 숨기
										allyAction[data.order.idx] = 'state5'; 
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
										enemyAction[data.order.idx] = 'state2';
									} else if (data.order.skIdx === 14) { //마법방어
										enemyAction[data.order.idx] = 'state3'; 
									} else if (data.order.skIdx === 13) { //철벽방어
										enemyAction[data.order.idx] = 'state4'; 
									} else if (data.order.skIdx === 15) { //나무뒤에 숨기
										enemyAction[data.order.idx] = 'state5'; 
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
							const maxCount = skill.buffCount[skillLv];
							if (buffDebuff[defData.idx][data_.type] === undefined) {
								buffDebuff[defData.idx][data_.type] = {count:0,maxCount:0,type:'', num:0,animation:skill.buffAnimation};
							}
							buffDebuff[defData.idx][data_.type].count = maxCount;
							buffDebuff[defData.idx][data_.type].maxCount = maxCount;
							buffDebuff[defData.idx][data_.type].type = data_.type;
							buffDebuff[defData.idx][data_.type].num = data_.num[skillLv];
							buffDebuff[defData.idx][data_.type].animation = skill.effAnimation;
						});
					});
				} else if (skillCate === 6) { //아군 디버프 방어자 셋팅
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
							const maxCount = skill.buffCount[skillLv];
							if (buffDebuff[defData.idx][data_.type] === undefined) {
								buffDebuff[defData.idx][data_.type] = {count:0,maxCount:0,type:'', num:0,animation:skill.buffAnimation};
							}
							buffDebuff[defData.idx][data_.type].count = maxCount;
							buffDebuff[defData.idx][data_.type].maxCount = maxCount;
							buffDebuff[defData.idx][data_.type].type = data_.type;
							buffDebuff[defData.idx][data_.type].num = data_.num[skillLv];
							buffDebuff[defData.idx][data_.type].animation = skill.effAnimation;
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
						//상태이상 확률
						const chance = parseInt(skill.buffChance[skillLv]) / 100;
						if (Math.random() < chance) {
							skill.buff.forEach((data_) => {
								const maxCount = skill.buffCount[skillLv];
								if (buffDebuff[defData.idx][data_.type] === undefined) {
									buffDebuff[defData.idx][data_.type] = {count:0,maxCount:0,type:'', num:0,animation:skill.buffAnimation};
								}
								buffDebuff[defData.idx][data_.type].count = maxCount;
								buffDebuff[defData.idx][data_.type].maxCount = maxCount;
								buffDebuff[defData.idx][data_.type].type = data_.type;
								buffDebuff[defData.idx][data_.type].num = data_.num[skillLv];
								buffDebuff[defData.idx][data_.type].animation = skill.effAnimation;
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
										allyAction[data.order.idx] = 'state2';
									} else if (data.order.skIdx === 14) { //마법방어
										allyAction[data.order.idx] = 'state3'; 
									} else if (data.order.skIdx === 13) { //철벽방어
										allyAction[data.order.idx] = 'state4'; 
									} else if (data.order.skIdx === 15) { //나무뒤에 숨기
										allyAction[data.order.idx] = 'state5'; 
									}
								}
							});
						}
					});
				} else if (skillCate === 8) { //액티브스킬 버프추가
					defencer = timeLine[turnIdx].order.targetIdx.map((data) => {
						return {
							ch: battleAlly[data],
							idx: data,
						}
					});
					const attackerIdx = timeLine[turnIdx].order.idx;
					if (buffDebuff[attackerIdx]) {
						buffDebuff[attackerIdx] = [];
					}
					buffDebuff[attackerIdx] = [...battleAlly[attackerIdx].buffDebuff];
					skill.buff.forEach((data_) => {
						const maxCount = skill.buffCount[skillLv];
						if (buffDebuff[attackerIdx][data_.type] === undefined) {
							buffDebuff[attackerIdx][data_.type] = {count:0,maxCount:0,type:'', num:0,animation:skill.buffAnimation};
						}
						buffDebuff[attackerIdx][data_.type].count = maxCount;
						buffDebuff[attackerIdx][data_.type].maxCount = maxCount;
						buffDebuff[attackerIdx][data_.type].type = data_.type;
						buffDebuff[attackerIdx][data_.type].num = data_.num[skillLv];
						buffDebuff[attackerIdx][data_.type].animation = skill.effAnimation;
					});
					timeLine.forEach((data) => { //방어중 체크
						if (data.order.team === 'ally'){
							//console.log(dIdx + '적군 방어중');
							timeLine[turnIdx].order.targetIdx.forEach((tarIdx) => {
								if (tarIdx === data.order.idx) {
									defendSkillEnemy[data.order.idx] = {
										idx: data.order.idx,
										type: data.order.skIdx,
									}
									if (data.order.skIdx === 2) { //방어
										allyAction[data.order.idx] = 'state2';
									} else if (data.order.skIdx === 14) { //마법방어
										allyAction[data.order.idx] = 'state3'; 
									} else if (data.order.skIdx === 13) { //철벽방어
										allyAction[data.order.idx] = 'state4'; 
									} else if (data.order.skIdx === 15) { //나무뒤에 숨기
										allyAction[data.order.idx] = 'state5'; 
									}
								}
							});
						}
					});
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
							const maxCount = skill.buffCount[skillLv];
							if (buffDebuff[defData.idx][data_.type] === undefined) {
								buffDebuff[defData.idx][data_.type] = {count:0,maxCount:0,type:'', num:0,animation:skill.buffAnimation};
							}
							buffDebuff[defData.idx][data_.type].count = maxCount;
							buffDebuff[defData.idx][data_.type].maxCount = maxCount;
							buffDebuff[defData.idx][data_.type].type = data_.type;
							buffDebuff[defData.idx][data_.type].num = data_.num[skillLv];
							buffDebuff[defData.idx][data_.type].animation = skill.effAnimation;
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
										allyAction[data.order.idx] = 'state2';
									} else if (data.order.skIdx === 14) { //마법방어
										allyAction[data.order.idx] = 'state3'; 
									} else if (data.order.skIdx === 13) { //철벽방어
										allyAction[data.order.idx] = 'state4'; 
									} else if (data.order.skIdx === 15) { //나무뒤에 숨기
										allyAction[data.order.idx] = 'state5'; 
									}
								}
							});
						}
					});
				} else if (skillCate === 10) { //날씨 변경
					if (Math.random() < skill.buff[0].num[skillLv].split('%')[0] / 100) {
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
				} else if (skillCate === 13) { //액티브스킬 힐,부활 셋팅
					defencer = timeLine[turnIdx].order.targetIdx.map((data) => {
						return {
							ch: battleEnemy[data],
							idx: data,
						}
					});
				} else if (skillCate === 15) { //팀킬
					defencer = timeLine[turnIdx].order.targetIdx.map((data) => {
						return {
							ch: battleEnemy[data],
							idx: data,
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
										enemyAction[data.order.idx] = 'state2';
									} else if (data.order.skIdx === 14) { //마법방어
										enemyAction[data.order.idx] = 'state3'; 
									} else if (data.order.skIdx === 13) { //철벽방어
										enemyAction[data.order.idx] = 'state4'; 
									} else if (data.order.skIdx === 15) { //나무뒤에 숨기
										enemyAction[data.order.idx] = 'state5'; 
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
										allyAction[data.order.idx] = 'state2';
									} else if (data.order.skIdx === 14) { //마법방어
										allyAction[data.order.idx] = 'state3'; 
									} else if (data.order.skIdx === 13) { //철벽방어
										allyAction[data.order.idx] = 'state4'; 
									} else if (data.order.skIdx === 15) { //나무뒤에 숨기
										allyAction[data.order.idx] = 'state5'; 
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
				dmgCancel = false,
				heal = [],
				sp = [],
				stateImpactDef = 1,//기절, 빙결, 석화 방어력 영향계수
				elevationNum = {dmg:1,cri:1,hit:1},//위치 영향계수
				elementDefencePercent = 0;
			let totalBattleGrade = 0,
				landCritical = false;
			if (skillCate === 5) {//아군 버프 데미지
				defencer.forEach(() => {
					dmg.push('');
				});
				attacker.totalBattleGrade = 0;
			} else if (skillCate === 6) {//적군 디버프 데미지
				defencer.forEach(() => {
					dmg.push('');
				});
				attacker.totalBattleGrade = 0;
			} else if (skillCate === 13) {//액티브 아군(부활, 치료)
				const skType = gameData.skill[timeLine[turnIdx].order.skIdx].element_type;//스킬 속성종류
				const teamAction = timeLine[turnIdx].order.team === 'ally' ? allyAction : enemyAction;
				defencer.forEach((defData, dIdx) => {
					const defEnemy = defData.ch;
					let criticalAtk = false;
					const	attackerSkill = attacker.hasSkill.filter((skData) => {
						return skData.idx === timeLine[turnIdx].order.skIdx;
					});
					const attackerSkillType = gameData.skill[attackerSkill[0].idx].eff[0].type;
					const criticalChance = Math.max((attacker.luk - 100) / 100, 0.1);//치명타 확률 계산
					if (attackerSkillType === 45) { //부활 hp회복
						if (Math.random() < criticalChance) {
							criticalAtk = true;
							landCritical = true;
							teamAction[defData.idx] = teamAction[defData.idx] ? `${teamAction[defData.idx]} healCri` : 'healCri';
						} else {
							teamAction[defData.idx] = teamAction[defData.idx] ? `${teamAction[defData.idx]} heal` : 'heal';
						}
						let heal_ = 0,
							healNum = {};
						gameData.skill[attackerSkill[0].idx].eff.forEach((skData) => {
							const stateName = util.getStateName(skType + 10);
							const skill = attackerSkill[0].lv > 5 ? 5 : attackerSkill[0].lv;
							healNum = util.getPercentNumber(skData.num[skill - 1], attacker[stateName]);
						});
						heal_ = Math.floor((1 + (criticalAtk ? healNum * 1.33 : healNum) / 100) * attacker.mak);
						heal.push(heal_);
						totalBattleGrade += heal_;
						console.log(`${attacker.na1} -> ${defEnemy.na1},`, `힐: ${Math.floor(heal_)}`);
					} else if (attackerSkillType === 41 || attackerSkillType === 43) { //hp회복
						if (defEnemy.state !== 'die') { //적이 살았을 경우
							if (Math.random() < criticalChance) {
								criticalAtk = true;
								landCritical = true;
								teamAction[defData.idx] = teamAction[defData.idx] ? `${teamAction[defData.idx]} healCri` : 'healCri';
							} else {
								teamAction[defData.idx] = teamAction[defData.idx] ? `${teamAction[defData.idx]} heal` : 'heal';
							}
							let heal_ = 0,
								healNum = {};
							gameData.skill[attackerSkill[0].idx].eff.forEach((skData) => {
								const stateName = util.getStateName(skType + 10);
								const skill = attackerSkill[0].lv > 5 ? 5 : attackerSkill[0].lv;
								healNum = util.getPercentNumber(skData.num[skill - 1], attacker[stateName]);
							});
							heal_ = Math.floor((1 + (criticalAtk ? healNum * 1.33 : healNum) / 100) * attacker.mak);
							heal.push(heal_);
							totalBattleGrade += heal_;
							console.log(`${attacker.na1} -> ${defEnemy.na1},`, `힐: ${Math.floor(heal_)}`);
						}
					}
					if (attackerSkillType === 42 || attackerSkillType === 43) { //sp회복
						if (defEnemy.state !== 'die') { //적이 살았을 경우
							if (Math.random() < criticalChance) {
								criticalAtk = true;
								landCritical = true;
								teamAction[defData.idx] = teamAction[defData.idx] ? `${teamAction[defData.idx]} healCri` : 'healCri';
							} else {
								teamAction[defData.idx] = teamAction[defData.idx] ? `${teamAction[defData.idx]} heal` : 'heal';
							}
							let sp_ = 0,
								spNum = {};
							gameData.skill[attackerSkill[0].idx].eff.forEach((skData) => {
								const stateName = util.getStateName(skType + 10);
								const skill = attackerSkill[0].lv > 5 ? 5 : attackerSkill[0].lv;
								spNum = util.getPercentNumber(skData.num[skill - 1], attacker[stateName]);
							});
							sp_ = Math.floor((1 + (criticalAtk ? spNum * 1.33 : spNum) / 100) * attacker.mak * 0.03);
							sp.push(sp_);
						}
					}
				});
			} else {//액티브 스킬 데미지 공식
				const skType = gameData.skill[timeLine[turnIdx].order.skIdx].element_type;//스킬 속성종류
				const teamAction = timeLine[turnIdx].order.team === 'ally' 
					? skillCate === 15 ? allyAction : enemyAction 
					: skillCate === 15 ? enemyAction : allyAction;
				defencer.forEach((defData, dIdx) => {
					const defEnemy = defData.ch,
						attackerElevation = /elevation(\d+)/g.exec(attacker.state),
						defEnemyElevation = /elevation(\d+)/g.exec(defEnemy.state);
					//위치에 따른 공격 영향
					if (!attackerElevation) {//지상
						if (defEnemyElevation) {
							if (defEnemyElevation[1] === '1') {//하늘
								if (skType < 6) {
									dmgCancel = true;
								}
							} else if (defEnemyElevation[1] === '2') {//물
								if (skType === 7) {
									elevationNum.dmg = 1.5;
								} else if (skType > 7) {
									dmgCancel = true;
								} else {
									elevationNum.dmg = 0.7;
									elevationNum.hit = 0.9;
								}
							} else if (defEnemyElevation[1] === '3') {//숲
								if (skType === 10) {
									elevationNum.dmg = 1.5;
								} else {
									elevationNum.hit = 0.7;
								}
							}
						}
					} else {
						if (attackerElevation[1] === '1') {//하늘
							if (!defEnemyElevation) {//지상
								elevationNum.dmg = 1.2;
								elevationNum.cri = 1.2;
							} else {
								if (defEnemyElevation[1] === '2') {//물
									if (skType === 7) {
										elevationNum.dmg = 1.5;
									} else if (skType > 7) {
										dmgCancel = true;
									} else {
										elevationNum.dmg = 0.7;
										elevationNum.hit = 0.8;
									}
								} else if (defEnemyElevation[1] === '3') {//숲
									if (skType === 10) {
										elevationNum.dmg = 1.5;
									} else {
										elevationNum.hit = 0.6;
									}
								}
							}
						} else if (attackerElevation[1] === '2') {//물
							if (defEnemyElevation) {
								if (defEnemyElevation[1] === '1') {//하늘
									if (skType < 6) {
										dmgCancel = true;
									} else {
										elevationNum.dmg = 0.9;
										elevationNum.hit = 0.8;
										elevationNum.cri = 0.8;
									}
								} else if (defEnemyElevation[1] === '2') {//물
									if (skType === 7) {
										elevationNum.dmg = 1.3;
									} else if (skType > 7) {
										dmgCancel = true;
									} else {
										elevationNum.dmg = 0.9;
										elevationNum.cri = 0.8;
									}
								} else if (defEnemyElevation[1] === '3') {//숲
									if (skType === 10) {
										elevationNum.dmg = 1.5;
									} else {
										elevationNum.dmg = 0.9;
										elevationNum.cri = 0.8;
									}
								}
							}
						} else if (attackerElevation[1] === '3'){//숲
							if (!defEnemyElevation) {//지상
								elevationNum.hit = 1.2;
								elevationNum.cri = 1.5;
							} else {
								if (defEnemyElevation[1] === '1') {//하늘
									if (skType < 6) {
										dmgCancel = true;
									} else {
										elevationNum.hit = 0.8;
										elevationNum.cri = 1.2;
									}
								} else if (defEnemyElevation[1] === '2') {//물
									if (skType === 7) {
										elevationNum.dmg = 1.5;
									} else if (skType > 7) {
										dmgCancel = true;
									} else {
										elevationNum.dmg = 0.8;
										elevationNum.cri = 0.9;
									}
								} else if (defEnemyElevation[1] === '3') {//숲	
									if (skType === 10) {
										elevationNum.dmg = 1.3;
										elevationNum.cri = 1.2;
									} else {
										elevationNum.cri = 1.2;
									}
								}
							}
						}
					}
					let criticalAtk = false,
						avoid = false;
					if (defEnemy.state !== 'die') { //적이 살았을 경우
						const addHitEff = (gameData.skill[skillIdx].attackEff.length > 0 && gameData.skill[skillIdx].attackEff[0]?.type === 0 
							? parseInt(gameData.skill[skillIdx].attackEff[0].num[skillLv]) * 0.01 
							: 0) + attacker.iSt40,//atkEff 적중률 효과 적용
							addCriticalEff = (gameData.skill[skillIdx].attackEff.length > 0 && gameData.skill[skillIdx].attackEff[0]?.type === 1 ? parseInt(gameData.skill[skillIdx].attackEff[0].num[skillLv]) * 0.01 : 0) + attacker.iSt38,//atkEff 치명타 효과 적용
							addKgEff = 0.15 - 1/(gameData.animal_size.kg[defEnemy.animal_type][1] - gameData.animal_size.kg[defEnemy.animal_type][0]) * (defEnemy.kg - gameData.animal_size.kg[defEnemy.animal_type][0]) * 0.15;//무게 효과 적용
						//마법 방어와 방어 분기 처리
						if (skType < 7) {//물리공격인지
							const criticalChance = Math.min(
								(Math.min(0.0015 * (attacker.atk - defEnemy.atk), 0.45) + 
								Math.min(0.003 * (attacker.luk - defEnemy.luk), 0.45) + 
								addCriticalEff + addKgEff) * elevationNum.cri, 0.9);//치명타 확률 계산
							if (teamAction[defData.idx] === undefined || teamAction[defData.idx].indexOf('state2') < 0) { //방어를 안했으면
								if (defEnemy.state.indexOf('immunity') >= 0 || defEnemy.state.indexOf('invincible') >= 0) {
									dmgCancel = true;
								} else if (defEnemy.state.indexOf('petrification') >= 0) { //석화 상태면
									if (Math.random() < criticalChance) {//치명타 계산
										criticalAtk = true;
										landCritical = true;
										teamAction[defData.idx] = teamAction[defData.idx] ? `${teamAction[defData.idx]} dmgCri` : 'dmgCri';
									} else {
										teamAction[defData.idx] = teamAction[defData.idx] ? `${teamAction[defData.idx]} dmg` : 'dmg';
									}
								} else if (defEnemy.state.indexOf('freezing') >= 0) { //빙결 상태면
								} else if (defEnemy.state.indexOf('stun') >= 0) { //기절 상태면
								} else {
									const chance = Math.random();
									const hitChance =  Math.min(
										((0.15 * (attacker.spd - defEnemy.spd) + 0.1 * (attacker.luk - defEnemy.luk)) / 100 + 0.7 + addKgEff + addHitEff) * elevationNum.hit,
										0.95
									); //물리 적중 확률, 기본0.7 어드벤티지
									if (chance < hitChance) {// 공격 적중
										if (Math.random() < criticalChance) {
											criticalAtk = true;
											landCritical = true;
											teamAction[defData.idx] = teamAction[defData.idx] ? `${teamAction[defData.idx]} dmgCri` : 'dmgCri';
										} else {
											teamAction[defData.idx] = teamAction[defData.idx] ? `${teamAction[defData.idx]} dmg` : 'dmg';
										}
									} else {//공격 회피
										const avoidNum = Math.floor(Math.random()*4);//회피 종류
										avoid = true;
										teamAction[defData.idx] = teamAction[defData.idx] ? `${teamAction[defData.idx]} avoid${avoidNum}` : `avoid${avoidNum}`;
									}
									const counterChance = Math.random() < (defData.ch.counterAttack ? parseInt(defData.ch.counterAttack.num) * 0.01 : 0); //반격 확률
									//console.log(defData.ch.na1, .1 + (defData.ch.counterAttack ? parseInt(defData.ch.counterAttack.num) * 0.01 : 0)+'확률 반격');
									if (counterChance && atkS === 0 && timeLine[turnIdx].order.skIdx !== 17 && timeLine[turnIdx].order.targetIdx.length === 1) {//반격 확률 계산, 연속공격중 마지막일때만, 반격이 아닐경우, 광역기가 아닐경우
										const effectTarget = timeLine[turnIdx].order.team === 'ally' ? allyPos[timeLine[turnIdx].order.idx].pos : enemyPos[timeLine[turnIdx].order.idx];
										timeLine.splice(turnIdx + 1, 0, {
											order:{
												team: timeLine[turnIdx].order.team === 'ally' ? 'enemy' : 'ally',
												idx: timeLine[turnIdx].order.targetIdx[0],
												skIdx: 1,
												skLv: 1,
												sp: [0,0,0,0,0],
												target: effectTarget,
												effectArea: [effectTarget],
												targetIdx: [timeLine[turnIdx].order.idx],
												counterAttack: true,
											},
											state:defencer[0].ch.state,
										});
									}
								}
							} else { //방어를 했으면
								if (Math.random() < criticalChance) {//치명타 계산
									criticalAtk = true;
									landCritical = true;
									teamAction[defData.idx] = teamAction[defData.idx] ? `${teamAction[defData.idx]} dmgCri` : 'dmgCri';
								} else {
									teamAction[defData.idx] = teamAction[defData.idx] ? `${teamAction[defData.idx]} dmg` : 'dmg';
								}
							}
						} else {//마법공격인지
							const criticalChance = Math.min(
								(Math.min(0.0015 * (attacker.mak - defEnemy.mak), 0.45) + 
								Math.min(0.003 * (attacker.luk - defEnemy.luk), 0.45) + 
								addCriticalEff + addKgEff) * elevationNum.cri, 0.9);//치명타 확률 계산
							if (teamAction[defData.idx] === undefined || teamAction[defData.idx].indexOf('defence2') < 0) { //마법방어를 안했으면
								if (defEnemy.state.indexOf('immunity') >= 0 || defEnemy.state.indexOf('invincible') >= 0) {
									dmgCancel = true;
								} else if (defEnemy.state.indexOf('petrification') >= 0) { //석화 상태면
									if (Math.random() < criticalChance) {
										criticalAtk = true;
										landCritical = true;
										teamAction[defData.idx] = teamAction[defData.idx] ? `${teamAction[defData.idx]} dmgCri` : 'dmgCri';
									} else {
										teamAction[defData.idx] = teamAction[defData.idx] ? `${teamAction[defData.idx]} dmg` : 'dmg';
									}
								} else if (defEnemy.state.indexOf('freezing') >= 0) { //빙결 상태면
								} else if (defEnemy.state.indexOf('stun') >= 0) { //기절 상태면
								} else {
									const chance = Math.random();
									const magicChance = Math.min(
										((0.1 * (attacker.spd - defEnemy.spd) + 0.15 * (attacker.luk - defEnemy.luk)) / 100 + 0.7 + addKgEff + addHitEff) * elevationNum.hit, 
										0.9
									); //마법 적중 확률, 기본0.7 어드벤티지
									if (chance < magicChance) {//술법 공격 적중
										if (Math.random() < criticalChance) {
											criticalAtk = true;
											landCritical = true;
											teamAction[defData.idx] = teamAction[defData.idx] ? `${teamAction[defData.idx]} dmgCri` : 'dmgCri';
										} else {
											teamAction[defData.idx] = teamAction[defData.idx] ? `${teamAction[defData.idx]} dmg` : 'dmg';
										}
									} else {
										const avoidNum = Math.floor(Math.random()*4);//회피 종류
										avoid = true;
										teamAction[defData.idx] = teamAction[defData.idx] ? `${teamAction[defData.idx]} avoid${avoidNum}` : `avoid${avoidNum}`;
									}
								}
							} else { //마법방어를 했으면
								if (Math.random() < criticalChance) {
									criticalAtk = true;
									landCritical = true;
									teamAction[defData.idx] = teamAction[defData.idx] ? `${teamAction[defData.idx]} dmgCri` : 'dmgCri';
								} else {
									teamAction[defData.idx] = teamAction[defData.idx] ? `${teamAction[defData.idx]} dmg` : 'dmg';
								}
							}
						}
						//데미지 계산
						//스킬 공격치 적용
						elementDefencePercent =  skType > 0 ? (defEnemy[util.getStateName(skType + 22)] || 0) / 100 + 1 : 1; //속성치에 따른 방어적용치
						if (defEnemy.state.indexOf('freezing') >= 0) {//빙결일때 수속공 1.5배, 화속공 0.5배
							if (skType >= 1 && skType <= 6) {
								elementDefencePercent = elementDefencePercent * 1.5;
							} else if (skType === 9) {
								elementDefencePercent = elementDefencePercent * 0.5;
							} else if (skType === 10) {
								elementDefencePercent = elementDefencePercent * 1.5;
							} else {
								elementDefencePercent = elementDefencePercent * 1.2;
							}
						}
						if (defEnemy.state.indexOf('stun') >= 0) {//기절일때 암속,빛속 0.5배
							if (skType >= 1 && skType <= 6) {
								elementDefencePercent = elementDefencePercent * 0.5;
							} else if (skType === 7 || skType === 8) {
								elementDefencePercent = elementDefencePercent * 1.5;
							}
						}
						if (defEnemy.state.indexOf('petrification') >= 0) {//석화일때 마법 0.7배
							if (skType >= 1 && skType <= 6) {
								elementDefencePercent = elementDefencePercent * 1.5;
							} else if (skType >= 7 && skType <= 12) {
								elementDefencePercent = elementDefencePercent * 0.7;
							}
						}
						//skill dmg
						let dmg_ = 0,
							atkNum = {},
							defNum = {},
							defActionSkill = {},
							attackType = 0,
							defenceType = 0,
							multiplesAttackNum = 0;
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
								defActionSkill = defEnemy.hasSkill.filter((skData) => {
									if (skData.idx === 2) {
										return skData;
									};
								});
							} 
							// else if (chkIdx === 13) { //철벽방어
							// 	defActionSkill = defEnemy.hasSkill.filter((skData) => {
							// 		if (skData.idx === 13) {
							// 			return skData;
							// 		};
							// 	});	
							// } else if (chkIdx === 14) { //마법방어
							// 	defActionSkill = defEnemy.hasSkill.filter((skData) => {
							// 		if (skData.idx === 14) {
							// 			return skData;
							// 		};
							// 	});	
							// } else if (chkIdx === 15) { //나무뒤에 숨기
							// 	defActionSkill = defEnemy.hasSkill.filter((skData) => {
							// 		if (skData.idx === 15) {
							// 			return skData;
							// 		};
							// 	});	
							// }
						});
						console.log('방어동작 스킬', defActionSkill);
						if (Object.keys(defActionSkill).length !== 0) {
							gameData.skill[defActionSkill[0].idx].buff.forEach((skData) => {
								const stateName = util.getStateName(skData.type);
								const skillLv = defActionSkill[0].lv > 5 ? 5 : defActionSkill[0].lv;
								defNum[stateName] = util.getPercentNumber(skData.num[skillLv - 1], defEnemy[stateName]);
							})
						} else {
							defNum = defEnemy;
						}
						const	attackerSkill = battleAlly[timeLine[turnIdx].order.idx]?.mutate ? gameData.mutateSkill[battleAlly[timeLine[turnIdx].order.idx]?.mutate].filter((skData) => {
							return skData.idx === timeLine[turnIdx].order.skIdx;
						}) : attacker.hasSkill.filter((skData) => {
							return skData.idx === timeLine[turnIdx].order.skIdx;
						});
						gameData.skill[attackerSkill[0].idx].eff.forEach((skData) => {
							const stateName = util.getStateName(skData.type);
							const skillLv = attackerSkill[0].lv > 5 ? 5 : attackerSkill[0].lv;
							atkNum[stateName] = util.getPercentNumber(skData.num[skillLv - 1], attacker[stateName]);
						});
						// dmg_ = (criticalAtk ? atkNum[attackType] * elementDmg * 2 : atkNum[attackType] * elementDmg) - (defNum[defenceType] || defEnemy[defenceType]);
						const defCount = (defNum[defenceType] || defEnemy[defenceType]) * elementDefencePercent;
						const kgAtk = skType === 5 ? attacker.kg * 0.01 : 0;//누르기 무게 공격 추가
						const elementAttackPercent = skType > 0 ? (attacker[util.getStateName(skType + 10)] || 0) / 100 : 0;
						//배수 공격 연산 multiplesAttack
						const multiplesAttack = gameData.skill[attackerSkill[0].idx].multiplesAttack;
						if (multiplesAttack[0]?.type > 40 && multiplesAttack[0]?.type < 50) {
							if (multiplesAttack[0]?.type === 44 && defEnemy.kg <= gameData.animal_size.size[0]) {//소형동물이면
								multiplesAttackNum = parseInt(gameData.skill[attackerSkill[0].idx].multiplesAttack[0].num[attackerSkill[0].lv - 1]) / 100;
							} else if (multiplesAttack[0]?.type === 45 && (defEnemy.kg > gameData.animal_size.size[0] && defEnemy.kg <= gameData.animal_size.size[1])) {//중형동물이면
								multiplesAttackNum = parseInt(gameData.skill[attackerSkill[0].idx].multiplesAttack[0].num[attackerSkill[0].lv - 1]) / 100;
							} else if (multiplesAttack[0]?.type === 46 && defEnemy.kg > gameData.animal_size.size[1]) {//대형동물이면
								multiplesAttackNum = parseInt(gameData.skill[attackerSkill[0].idx].multiplesAttack[0].num[attackerSkill[0].lv - 1]) / 100;
							} else if (multiplesAttack[0]?.type === 47 && defEnemy.kg <= gameData.animal_size.size[1]) {//소,중형동물이면
								multiplesAttackNum = parseInt(gameData.skill[attackerSkill[0].idx].multiplesAttack[0].num[attackerSkill[0].lv - 1]) / 100;
							} else if (multiplesAttack[0]?.type === 48 && (defEnemy.kg <= gameData.animal_size.size[0] && defEnemy.kg > gameData.animal_size.size[1])) {//소,대형동물이면
								multiplesAttackNum = parseInt(gameData.skill[attackerSkill[0].idx].multiplesAttack[0].num[attackerSkill[0].lv - 1]) / 100;
							} else if (multiplesAttack[0]?.type === 49 && defEnemy.kg > gameData.animal_size.size[0]) {//중,대형동물이면
								multiplesAttackNum = parseInt(gameData.skill[attackerSkill[0].idx].multiplesAttack[0].num[attackerSkill[0].lv - 1]) / 100;
							}
						} else {
							if (defEnemy.animal_type === multiplesAttack[0]?.type || multiplesAttack[0]?.type === 50) {//동물타입이 만족하면, 모든동물이면
								multiplesAttackNum = parseInt(gameData.skill[attackerSkill[0].idx].multiplesAttack[0].num[attackerSkill[0].lv - 1]) / 100;
							}
						}
						//크리티컬 공격이면 방어 1/2로 줄임
						dmg_ = dmgCancel ? '' : Math.max(1, ((atkNum[attackType] * (kgAtk + multiplesAttackNum + elementAttackPercent + 1)) - (criticalAtk ? defCount * stateImpactDef * .5 : defCount * stateImpactDef)) * elevationNum.dmg);
						if (avoid) {
							dmg.push('');
						} else {
							dmg.push(dmg_);
							totalBattleGrade += dmg_;
						}
						console.log(`${attacker.na1} -> ${defEnemy.na1},`, `데미지: ${Math.floor(dmg_)},`, `공격: ${Math.floor(atkNum[attackType] * (kgAtk + multiplesAttackNum + elementAttackPercent + 1))},`, `방어: ${Math.floor(criticalAtk ? defCount * stateImpactDef * .5 : defCount * stateImpactDef)}`);
						console.log(attacker, defencer);
					} else { //적이 죽었을 경우
						dmg.push('');
					}
				});
			}
			if (typeof attacker.totalBattleGrade === "number") {// 전투 랭크 기여도에 사용
				attacker.totalBattleGrade += totalBattleGrade;
			} else {
				attacker.totalBattleGrade = totalBattleGrade;
			}
			//timeLine[turnIdx] 공격자
			setTimeout(() => {
				setSkillMsg(true);
				setTimeout(() => {
					setSkillMsg(false);
					setTimeout(() => {
						let targetIdx = [],
							targetArr = {skillIdx:0,effSize:1,effAnimation:'',effRotate:'',effFilter:'',targets:[],effTargets:[]},
							targetCount = 0;
						if (timeLine[turnIdx].order.counterAttack) { //카운터 어택이면
							targetIdx = [timeLine[turnIdx].order.target];
							targetArr.effTargets[timeLine[turnIdx].order.target] = true;
						} else {
							if (timeLine[turnIdx].order.team === 'ally') {//아군 공격경우
								if (skillCate === 5 || skillCate === 13) {//버프
									defencer.forEach((data) => {
										targetIdx.push(allyPos[data.idx].pos);
									});
								} else {
									defencer.forEach((data) => {
										targetIdx.push(enemyPos[data.idx]);
									});
								}
							} else {//적군 공격경우
								if (skillCate === 5 || skillCate === 13) {//버프
									defencer.forEach((data) => {
										targetIdx.push(enemyPos[data.idx]);
									});
								} else {
									defencer.forEach((data) => {
										targetIdx.push(allyPos[data.idx].pos);
									});
								}
							}
							if (skill.effSize[skillLv] >= 5 || skill.ta[skillLv] === 23) {
								targetArr.effTargets[12] = true; //allEff일경우 12로 맞춤
							} else {
								timeLine[turnIdx].order.effectArea.forEach((eTarget) => {
									console.log('버프', eTarget)
									targetArr.effTargets[eTarget] = true;
								});
							}
						}
						targetIdx.forEach((eTarget) => {
							if (!targetArr.targets[eTarget]) {
								targetArr.targets[eTarget] = {}
							}
							if (dmg[targetCount]) {
								targetArr.targets[eTarget].dmg = Math.floor(dmg[targetCount]);
							} else {
								targetArr.targets[eTarget].heal = Math.floor(heal[targetCount]);
							}
							targetCount ++;
						});
						//effTargets 이펙트 적용위치
						//targetIdx 데미지 적중 대상
						//timeLine[turnIdx].order.effectArea 스킬 적용 범위
						// console.log('targetIdx', targetIdx, timeLine[turnIdx].order.effectArea, targetArr.effTargets, targetArr.targets)
						targetArr.effSize = skill.effSize[skillLv];
						targetArr.effAnimation = skill.effAnimation;
						targetArr.effRotate = skill.effRotate;
						targetArr.effFilter = skill.effFilter;
						targetArr.skillIdx = skillIdx;
						console.log('버프', targetArr)
						if (timeLine[turnIdx].order.team === 'ally') { //아군 영역 effect효과
							if (skillCate === 3 || skillCate === 6 || skillCate === 7) {//적군액티브, 디버프, 적군액티브 디버프
								setEnemyEffect({
									...targetArr,
								});
							} else if (skillCate === 5 || skillCate === 15) {//버프
								setAllyEffect({
									...targetArr,
								});
							} else if (skillCate === 8) {//적군액티브 버프
								setAllyEffect({
									...targetArr,
								});
								setEnemyEffect({
									...targetArr,
									effAnimation: 'slash0',
									skillIdx: 1,
								});
								//카운터 어텍
								if (buffDebuff[timeLine[turnIdx].order.idx][10]) {
									battleAlly[timeLine[turnIdx].order.idx].counterAttack = {...buffDebuff[timeLine[turnIdx].order.idx][10]};
								}
							} else if (skillCate === 13) {//아군액티브
								setAllyEffect({
									...targetArr,
								});
								defencer.forEach((defData, idx) => {
									if (skill.eff[0].type === 44 || skill.eff[0].type === 45) {//부활
										battleAlly[defData.idx].state = '';
									}
									if (skill.eff[0].type === 41 || skill.eff[0].type === 43 || skill.eff[0].type === 45) { //hp회복
										battleAlly[defData.idx].hp += heal[idx];
										if (battleAlly[defData.idx].hp > battleAlly[defData.idx].hp_) {
											battleAlly[defData.idx].hp = battleAlly[defData.idx].hp_;
										}
									}
									if (skill.eff[0].type === 42 || skill.eff[0].type === 43) {//sp회복
										battleAlly[defData.idx].sp += sp[idx];
										if (battleAlly[defData.idx].sp > battleAlly[defData.idx].sp_) {
											battleAlly[defData.idx].sp = battleAlly[defData.idx].sp_;
										}
									}
								});
							} else if (skillCate === 14) {
								console.log(timeLine[turnIdx].order);//확인필요
								setAllyEffect({
									...targetArr,
									effAnimation: 'slash2',
									skillIdx: 1,
									targets:[timeLine[turnIdx].order.target],
									effTargets:[],
								});
								setEnemyEffect({
									...targetArr,
								});
							} else if (skillCate === 10) {
								setAllyEffect({
									...targetArr,
								});
							}
							defencer.forEach((defData, idx) => {
								if (typeof dmg[idx] === 'number') {
									battleEnemy[defData.idx].hp -= dmg[idx];
								}
								if (skillCate > 4 && skillCate < 9) {
									if (buffDebuff[defData.idx] === undefined){
										buffDebuff[defData.idx] = [];
									}
									if (skillCate === 5 || skillCate === 8) {
										battleAlly[defData.idx].buffDebuff = [...buffDebuff[defData.idx]];
										console.log('버프', battleAlly[defData.idx].buffDebuff);
									} else {
										battleEnemy[defData.idx].buffDebuff = [...buffDebuff[defData.idx]];
									}
									passiveBuff({
										gameData:gameData,
										battleAlly:battleAlly,
										battleEnemy:battleEnemy,
										allyEnemyPassive:allyEnemyPassive,
										allyPassive:allyPassive,
										enemyPassive:enemyPassive,
										setAllyEnemyPassive:setAllyEnemyPassive,
										allyEnemyBuff:allyEnemyBuff,
										allyBuff:allyBuff,
										enemyBuff:enemyBuff,
										setAllyEnemyBuff:setAllyEnemyBuff,
										allyPos:allyPos,
										enemyPos:enemyPos,
										buffTurn:false,
									});
								}
								if (battleEnemy[defData.idx].hp < 0) {//다이
									console.log('die')
									enemyAction[defData.idx] = 'die';
									battleEnemy[defData.idx].hp = 0;
									battleEnemy[defData.idx].state = 'die';
									// console.log('die', defData.idx, battleEnemy[defData.idx].state);
								}
							});
							// setTimeout(() => {
							// 	endGameCheck();
							// }, 2000);
						} else { //적군 영역 effect효과
							if (skillCate === 3 || skillCate === 6 || skillCate === 7) {//적군액티브, 디버프, 적군액티브 디버프
								setAllyEffect({
									...targetArr
								});
							} else if (skillCate === 5 || skillCate === 15) {//버프
								setEnemyEffect({
									...targetArr
								});
							} else if (skillCate === 8) {//적군액티브 버프
								setEnemyEffect({
									...targetArr,
								});
								setAllyEffect({
									...targetArr,
									effAnimation: 'slash0',
									skillIdx: 1,
								});
								//카운터 어텍
								if (buffDebuff[timeLine[turnIdx].order.idx][10]) {
									battleEnemy[timeLine[turnIdx].order.idx].counterAttack = {...buffDebuff[timeLine[turnIdx].order.idx][10]};
								}
							} else if (skillCate === 13) {
								setEnemyEffect({
									...targetArr
								});
								defencer.forEach((defData, idx) => {
									if (skill.eff[0].type === 44 || skill.eff[0].type === 45) {//부활
										battleEnemy[defData.idx].state = '';
									}
									if (skill.eff[0].type === 41 || skill.eff[0].type === 43 || skill.eff[0].type === 45) { //hp회복
										battleEnemy[defData.idx].hp += heal[idx];
										if (battleEnemy[defData.idx].hp > battleEnemy[defData.idx].hp_) {
											battleEnemy[defData.idx].hp = battleEnemy[defData.idx].hp_;
										}
									}
									if (skill.eff[0].type === 42 || skill.eff[0].type === 43) {//sp회복
										battleEnemy[defData.idx].sp += sp[idx];
										if (battleEnemy[defData.idx].sp > battleEnemy[defData.idx].sp_) {
											battleEnemy[defData.idx].sp = battleEnemy[defData.idx].sp_;
										}
									}
								});
							} else if (skillCate === 14) {
								console.log(timeLine[turnIdx].order);//확인필요
								setEnemyEffect({
									...targetArr,
									effAnimation: 'slash2',
									skillIdx: 1,
									targets:[timeLine[turnIdx].order.target],
									effTargets:[],
								});
								setAllyEffect({
									...targetArr,
								});
							} else if (skillCate === 10) {
								setEnemyEffect({
									...targetArr,
								});
							}
							defencer.forEach((defData, idx) => {
								if (typeof dmg[idx] === 'number') {
									battleAlly[defData.idx].hp -= dmg[idx];
								}
								if (skillCate > 4 && skillCate < 9) {
									if (buffDebuff[defData.idx] === undefined){
										buffDebuff[defData.idx] = [];
									}
									if (skillCate === 5 || skillCate === 8) {
										battleEnemy[defData.idx].buffDebuff = [...buffDebuff[defData.idx]];
									} else {
										battleAlly[defData.idx].buffDebuff = [...buffDebuff[defData.idx]];
									}
									passiveBuff({
										gameData:gameData,
										battleAlly:battleAlly,
										battleEnemy:battleEnemy,
										allyEnemyPassive:allyEnemyPassive,
										allyPassive:allyPassive,
										enemyPassive:enemyPassive,
										setAllyEnemyPassive:setAllyEnemyPassive,
										allyEnemyBuff:allyEnemyBuff,
										allyBuff:allyBuff,
										enemyBuff:enemyBuff,
										setAllyEnemyBuff:setAllyEnemyBuff,
										allyPos:allyPos,
										enemyPos:enemyPos,
										buffTurn:false,
									});
								}
								if (battleAlly[defData.idx].hp < 0) {//다이
									console.log('die')
									allyAction[defData.idx] = 'die';
									battleAlly[defData.idx].hp = 0;
									battleAlly[defData.idx].state = 'die';
									// console.log('die', defData.idx, battleAlly[defData.idx].state);
								}
							});
							// setTimeout(() => {
							// 	endGameCheck();
							// }, 2000);
						}
						setAllyAction(allyAction);
						setEnemyAction(enemyAction);
						setLandCriticalEffect(landCritical);
						console.log('------------------------------');
						
						setTimeout(() => {
							setLandCriticalEffect(false);
							if (timeLine[turnIdx].order.team === 'ally') {
								if (skillCate === 5 || skillCate === 13) {//버프
									setAllyEffect({skillIdx:0,effSize:1,effAnimation:'',effRotate:'',effFilter:'',targets:[],effTargets:[]});
									setAllyAction([]);
								} else {
									setEnemyEffect({skillIdx:0,effSize:1,effAnimation:'',effRotate:'',effFilter:'',targets:[],effTargets:[]});
									setEnemyAction([]);
								}
							} else {
								if (skillCate === 5 || skillCate === 13) {//버프
									setEnemyEffect({skillIdx:0,effSize:1,effAnimation:'',effRotate:'',effFilter:'',targets:[],effTargets:[]});
									setEnemyAction([]);
								} else {
									setAllyEffect({skillIdx:0,effSize:1,effAnimation:'',effRotate:'',effFilter:'',targets:[],effTargets:[]});
									setAllyAction([]);
								}
							}
							setTimeout(() => {
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
							}, timeDelay.nextAction / gameSpd);//캐릭간 턴 딜레이
						}, ((skillEffect[targetArr.effAnimation].frame / 10) * timeDelay.skill) / gameSpd);//공격 이펙트 효과시간 * (gameData.skill[targetArr.skillIdx].effAnimationRepeat || 1)
					}, timeDelay.skillBefore / gameSpd);
				}, timeDelay.msgClose / gameSpd);//메시지창 사라짐
			}, timeDelay.msgOpen / gameSpd);//메시지 오픈
		}
	} else {//턴 종료시
		//카운터 어텍 제거
		battleAlly.forEach((ally) => {
			ally.mutate = null;
			const mutate = /mutate[\d]+/g.exec(ally.state);
			if (mutate) {
				ally.mutate = mutate[0];
			}
			if (ally.counterAttack) {
				delete ally.counterAttack;
			}
		});
		battleEnemy.forEach((enemy) => {
			enemy.mutate = null;
			const mutate = /mutate[\d]+/g.exec(enemy.state);
			if (mutate) {
				enemy.mutate = mutate[0];
			}
			if (enemy.counterAttack) {
				delete enemy.counterAttack;
			}
		});
		const pB = passiveBuff({
			gameData:gameData,
			battleAlly:battleAlly,
			battleEnemy:battleEnemy,
			allyEnemyPassive:allyEnemyPassive,
			allyPassive:allyPassive,
			enemyPassive:enemyPassive,
			setAllyEnemyPassive:setAllyEnemyPassive,
			allyEnemyBuff:allyEnemyBuff,
			allyBuff:allyBuff,
			enemyBuff:enemyBuff,
			setAllyEnemyBuff:setAllyEnemyBuff,
			allyPos:allyPos,
			enemyPos:enemyPos,
			buffTurn:true,
		});
		// 디버프 데미지 실행
		if (pB.enemyDmgArr['bleeding'] || pB.allyDmgArr['bleeding']) {
			//pB.timeDelay += 750 / gameSpd;
			if (pB.allyDmgArr['bleeding']) {
				let taObj = {
					effTargets:[],
					targets:[],
				};
				pB.allyDmgArr['bleeding'].forEach((effTa) => {
					taObj.effTargets[effTa.posIdx.pos] = true;
					taObj.targets[effTa.posIdx.pos] = {
						dmg:Math.round(effTa.dmg),
					}
				});
				setAllyEffect(prev => {
					return {
						...prev,
						...taObj,
						effAnimation: 'blood6',
						effSize:1.5,
						effRotate:'',
						effFilter:'hue-rotate(260deg) contrast(2) saturate(6)',
						skillIdx:0,
					}
				});
			}//posion: blood6
			if (pB.enemyDmgArr['bleeding']) {
				let taObj = {
					effTargets:[],
					targets:[],
				};
				pB.enemyDmgArr['bleeding'].forEach((effTa) => {
					taObj.effTargets[effTa.posIdx.pos] = true;
					taObj.targets[effTa.posIdx.pos] = {
						dmg:Math.round(effTa.dmg),
					}
				});
				setEnemyEffect(prev => {
					return {
						...prev,
						...taObj,
						effAnimation: 'blood6',
						effSize:1.5,
						effRotate:'',
						effFilter:'hue-rotate(260deg) contrast(2) saturate(6)',
						skillIdx:0,
					}
				});
			}
			if (pB.enemyDmgArr['addicted'] || pB.allyDmgArr['addicted']) {
				//pB.timeDelay += 750 / gameSpd;
				setTimeout(() => {
					if (pB.allyDmgArr['addicted']) {
						let taObj = {
							effTargets:[],
							targets:[],
						};
						pB.allyDmgArr['addicted'].forEach((effTa) => {
							taObj.effTargets[effTa.posIdx.pos] = true;
							taObj.targets[effTa.posIdx.pos] = {
								dmg:Math.round(effTa.dmg),
							}
						});
						setAllyEffect(prev => {
							return {
								...prev,
								...taObj,
								effAnimation: 'blood6',
								effSize:1.5,
								effRotate:'',
								effFilter:'saturate(3)',
								skillIdx:0,
							}
						});
					}
					if (pB.enemyDmgArr['addicted']) {
						let taObj = {
							effTargets:[],
							targets:[],
						};
						pB.enemyDmgArr['addicted'].forEach((effTa) => {
							taObj.effTargets[effTa.posIdx.pos] = true;
							taObj.targets[effTa.posIdx.pos] = {
								dmg:Math.round(effTa.dmg),
							}
						})
						setEnemyEffect(prev => {
							return {
								...prev,
								...taObj,
								effAnimation: 'blood6',
								effSize:1.5,
								effRotate:'',
								effFilter:'saturate(3)',
								skillIdx:0,
							}
						});
					}
				}, 750 / gameSpd);
			}
		} else if (pB.enemyDmgArr['addicted'] || pB.allyDmgArr['addicted']) {
			//pB.timeDelay += 750 / gameSpd;
			if (pB.allyDmgArr['addicted']) {
				let taObj = {
					effTargets:[],
					targets:[],
				};
				pB.allyDmgArr['addicted'].forEach((effTa) => {
					taObj.effTargets[effTa.posIdx.pos] = true;
					taObj.targets[effTa.posIdx.pos] = {
						dmg:Math.round(effTa.dmg),
					}
				})
				setAllyEffect(prev => {
					return {
						...prev,
						...taObj,
						effAnimation: 'blood6',
						effSize:1.5,
						effRotate:'',
						effFilter:'saturate(3)',
						skillIdx:0,
					}
				});
			}
			if (pB.enemyDmgArr['addicted']) {
				let taObj = {
					effTargets:[],
					targets:[],
				};
				pB.enemyDmgArr['addicted'].forEach((effTa) => {
					taObj.effTargets[effTa.posIdx.pos] = true;
					taObj.targets[effTa.posIdx.pos] = {
						dmg:Math.round(effTa.dmg),
					}
				})
				setEnemyEffect(prev => {
					return {
						...prev,
						...taObj,
						effAnimation: 'blood6',
						effSize:1.5,
						effRotate:'',
						effFilter:'saturate(3)',
						skillIdx:0,
					}
				});
			}
		}
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
	const dmgHp = (currentAlly.totalBattleGrade || 0) / enemyHp;
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

const passiveBuff = ({gameData, battleAlly, battleEnemy, allyEnemyPassive, allyPassive, enemyPassive, setAllyEnemyPassive, allyEnemyBuff, allyBuff, enemyBuff, setAllyEnemyBuff, allyPos, enemyPos, buffTurn}) => {
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
				const state = util.getStateName(gameDataSkill.eff ? gameDataSkill.eff[0].type : gameDataSkill.buff[0].type);
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
				passiveType = gameDataSkill.eff ? gameDataSkill.eff[0].type : gameDataSkill.buff[0].type,
				passiveNum = gameDataSkill.eff ? gameDataSkill.eff[0].num[allySkill.lv - 1] : gameDataSkill.buff[0].num[allySkill.lv - 1],
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
					if (gameData.skill[allySkill.idx].cate === 2) {//패시브 스킬인지
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
				if (gameData.skill[allySkill.idx].cate === 2) {//패시브 스킬인지
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
				case 'elevation'://높이상태
					state = '';
					ccSingle = 'elevation';
					cc += ` elevation${buff.num}`;
					break;
				case 'invincible'://무적
					state = '';
					ccSingle = 'invincible';
					cc += ' invincible';
					break;
				case 'immunity'://이뮨
					state = '';
					ccSingle = 'immunity';
					cc += ' immunity';
					break;
				case 'bleeding'://출혈
					state = 'hp';
					ccSingle = 'bleeding';
					cc += ' bleeding';
					break;
				case 'addicted'://중독
					state = 'hp';
					ccSingle = 'addicted';
					cc += ' addicted';
					break;
				case 'petrification'://석화
					state = '';
					ccSingle = 'petrification';
					cc += ' petrification';
					break;
				case 'confusion'://혼란
					state = '';
					ccSingle = 'confusion';
					cc += ' confusion';
					break;
				case 'freezing'://빙결
					state = '';
					ccSingle = 'freezing';
					cc += ' freezing';
					break;
				case 'stun'://기절
					state = '';
					ccSingle = 'stun';
					cc += ' stun';
					break;
				case 'mutate'://변이
					state = '';
					ccSingle = 'mutate';
					cc += ` mutate mutate${buff.num}`;
					//거북이 buffState['def'] = 1000;
					//곰 buffState['atk'] = 1000;
					//독수리 buffState['mak'] = 1000;
					//사슴 buffState['mdf'] = 1000;
					//말 buffState['spd'] = 50;
					//코끼리 buffState['kg'] = 500;
					//너구리 buffState['luk'] = 100;
					break;
				case 'bleedingR'://출혈해제
					state = '';
					ccSingle = '';
					cc = cc.replace('bleeding', '');
					break;
				case 'addictedR'://중독해제
					state = '';
					ccSingle = '';
					cc = cc.replace('addicted', '');
					break;
				case 'petrificationR'://석화해제
					state = '';
					ccSingle = '';
					cc = cc.replace('petrification', '');
					break;
				case 'confusionR'://혼란해제
					state = '';
					ccSingle = '';
					cc = cc.replace('confusion', '');
					break;
				case 'stunR'://기절해제
					state = '';
					ccSingle = '';
					cc = cc.replace('stun', '');
					break;
				case 'mutateR'://변이해제
					state = '';
					ccSingle = '';
					cc = cc.replace(/(mutate|mutate[\d]+)\b/g, '');
					break;
				case 'freezingR'://빙결해제
					state = '';
					ccSingle = '';
					cc = cc.replace('freezing', '');
					break;
				case 'anomaliesR'://상태이상해제
					state = '';
					ccSingle = '';
					cc = '';
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
						dmg:buff.num.indexOf('%') >= 0 ? parseInt(buff.num) * 0.01 * ally.hp_ : Number(buff.num),
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
					if (gameData.skill[enemySkill.idx].cate === 2) {//패시브 스킬인지
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
				if (gameData.skill[enemySkill.idx].cate === 2) {//패시브 스킬인지
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
				case 'elevation'://높이상태
					state = '';
					ccSingle = 'elevation';
					cc += ` elevation${buff.num}`;
					break;
				case 'invincible'://무적
					state = '';
					ccSingle = 'invincible';
					cc += ' invincible';
					break;
				case 'immunity'://이뮨
					state = '';
					ccSingle = 'immunity';
					cc += ' immunity';
					break;
				case 'bleeding'://출혈
					state = 'hp';
					ccSingle = 'bleeding';
					cc += ' bleeding';
					break;
				case 'addicted'://중독
					state = 'hp';
					ccSingle = 'addicted';
					cc += ' addicted';
					break;
				case 'petrification'://석화
					state = 'def';
					ccSingle = 'petrification';
					cc += ' petrification';
					break;
				case 'confusion'://혼란
					state = '';
					ccSingle = 'confusion';
					cc += ' confusion';
					break;
				case 'stun'://기절
					state = '';
					ccSingle = 'stun';
					cc += ' stun';
					break;
				case 'freezing'://빙결
					state = '';
					ccSingle = 'freezing';
					cc += ' freezing';
					break;
				case 'mutate'://변이
					state = '';
					ccSingle = 'mutate';
					cc += ` mutate mutate${buff.num}`;
					//거북이 buffState['def'] = 1000;
					//곰 buffState['atk'] = 1000;
					//독수리 buffState['mak'] = 1000;
					//사슴 buffState['mdf'] = 1000;
					//말 buffState['spd'] = 50;
					//코끼리 buffState['kg'] = 500;
					//너구리 buffState['luk'] = 100;
					break;
			case 'bleedingR'://출혈해제
				state = '';
				ccSingle = '';
				cc = cc.replace('bleeding', '');
				break;
			case 'addictedR'://중독해제
				state = '';
				ccSingle = '';
				cc = cc.replace('addicted', '');
				break;
			case 'petrificationR'://석화해제
				state = '';
				ccSingle = '';
				cc = cc.replace('petrification', '');
				break;
			case 'confusionR'://혼란해제
				state = '';
				ccSingle = '';
				cc = cc.replace('confusion', '');
				break;
			case 'stunR'://기절해제
				state = '';
				ccSingle = '';
				cc = cc.replace('stun', '');
				break;
			case 'mutateR'://변이해제
				state = '';
				ccSingle = '';
				cc = cc.replace(/(mutate|mutate[\d]+)\b/g, '');
				break;
			case 'freezingR'://빙결해제
				state = '';
				ccSingle = '';
				cc = cc.replace('freezing', '');
				break;
			case 'anomaliesR'://상태이상해제
				state = '';
				ccSingle = '';
				cc = '';
				break;
				default:
					break;
			}
			const buffIdx = buff.type;
			if (state === '') {//능력치 변화가 없는 경우(x)
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
						dmg:buff.num.indexOf('%') >= 0 ? parseInt(buff.num) * 0.01 * enemy.hp_ : Number(buff.num),
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
  const bge = React.useMemo(() => {
    return context.setting.bge;
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
	const isScenario = React.useMemo(() => typeof paramData?.scenario?.stageIdx === 'number', [paramData]);
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
			entry:[// 적군 생성
				{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
				{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },{idx:'', lv:1, },
				{pos:2,idx:2, lv:1, grade:4, items: [
					{idx:0, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['112']}],addEff:[]},
					{idx:1, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['112']}],addEff:[]},
					{idx:2, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['112']}],addEff:[]},
					{idx:4, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['112']}],addEff:[]},
					{},
					{},
					{},
					{},
				]},{idx:'', lv:1, },{pos:0,idx:27, lv:1, grade:4, items: [
					{idx:0, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['112']}],addEff:[]},
					{idx:1, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['112']}],addEff:[]},
					{idx:2, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['112']}],addEff:[]},
					{idx:4, slot:0, hole:[],grade:1,color:["#fff","#0f0"],baseEff:[{type:4,num:['112']}],addEff:[]},
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
	const [allyEffect, setAllyEffect] = useState({skillIdx:0,effSize:1,effAnimation:'',effRotate:'',effFilter:'',targets:[],effTargets:[]});//아군 데미지효과
	const [enemyEffect, setEnemyEffect] = useState({skillIdx:0,effSize:1,effAnimation:'',effRotate:'',effFilter:'',targets:[],effTargets:[]});//적군 데미지효과
	const targetIdx = useRef([]);//타겟 지정 임시저장
	const targetAreaArr = useRef([]);//이펙트 영역 임시저장

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
		battleAlly.current = [];
		if (ally.length <= 0) {//캐릭이 없으면 이전 전화면으로
			util.historyBack(navigate);
		}
		ally.forEach((data, idx) => {//능력치 셋팅
			const saveCh = {...sData.ch[data]};
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
				luk = saveCh.bSt9 + saveCh.iSt9 + (effData?.rtSt9 || 0),
				peck = saveCh.el0 + saveCh.iSt11 + (effData?.rtSt11 || 0),
				claw = saveCh.el1 + saveCh.iSt12 + (effData?.rtSt12 || 0),
				bite = saveCh.el2 + saveCh.iSt13 + (effData?.rtSt13 || 0),
				hit = saveCh.el3 + saveCh.iSt14 + (effData?.rtSt14 || 0),
				press = saveCh.el4 + saveCh.iSt15 + (effData?.rtSt15 || 0),
				toss = saveCh.el5 + saveCh.iSt16 + (effData?.rtSt16 || 0),
				light = saveCh.el6 + saveCh.iSt17 + (effData?.rtSt17 || 0),
				dark = saveCh.el7 + saveCh.iSt18 + (effData?.rtSt18 || 0),
				water = saveCh.el8 + saveCh.iSt19 + (effData?.rtSt19 || 0),
				fire = saveCh.el9 + saveCh.iSt20 + (effData?.rtSt20 || 0),
				wind = saveCh.el10 + saveCh.iSt21 + (effData?.rtSt21 || 0),
				earth = saveCh.el11 + saveCh.iSt22 + (effData?.rtSt22 || 0),
				peckR = saveCh.el0 + saveCh.iSt23 + (effData?.rtSt23 || 0),
				clawR = saveCh.el1 + saveCh.iSt24 + (effData?.rtSt24 || 0),
				biteR = saveCh.el2 + saveCh.iSt25 + (effData?.rtSt25 || 0),
				hitR = saveCh.el3 + saveCh.iSt26 + (effData?.rtSt26 || 0),
				pressR = saveCh.el4 + saveCh.iSt27 + (effData?.rtSt27 || 0),
				tossR = saveCh.el5 + saveCh.iSt28 + (effData?.rtSt28 || 0),
				lightR = saveCh.el6 + saveCh.iSt29 + (effData?.rtSt29 || 0),
				darkR = saveCh.el7 + saveCh.iSt30 + (effData?.rtSt30 || 0),
				waterR = saveCh.el8 + saveCh.iSt31 + (effData?.rtSt31 || 0),
				fireR = saveCh.el9 + saveCh.iSt32 + (effData?.rtSt32 || 0),
				windR = saveCh.el10 + saveCh.iSt33 + (effData?.rtSt33 || 0),
				earthR = saveCh.el11 + saveCh.iSt34 + (effData?.rtSt34 || 0);
			saveCh.hasSkill[2] = {idx:338,lv:1,exp:1};//삭제 해야됨
			saveCh.hasSkill[3] = {idx:339,lv:1,exp:1};//삭제 해야됨
			battleAlly.current.push({
				...saveCh,
				na1: gameData.ch[saveCh.idx].na1,
				animal_type: gameData.ch[saveCh.idx].animal_type,
				hasExp:saveCh.hasExp,
				state: idx !== 0 ? 'die' : '',//죽음
				elevation: 0,
				buffDebuff:[],
				currenthp: hp,
				hp: idx !== 0 ? 0 : hp, //죽음
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
				peck:peck,
				claw:claw,
				bite:bite,
				hit:hit,
				press:press,
				toss:toss,
				peckR:peckR,
				clawR:clawR,
				biteR:biteR,
				hitR:hitR,
				pressR:pressR,
				tossR:tossR,
				light:light,
				dark:dark,
				water:water,
				fire:fire,
				wind:wind,
				earth:earth,
				lightR:lightR,
				darkR:darkR,
				waterR:waterR,
				fireR:fireR,
				windR:windR,
				earthR:earthR,
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
			const kgData = gameData.animal_size.kg[gameData.ch[data.idx].animal_type],
				kg = Math.round((Math.random() < 0.1 ? Math.random()*(kgData[2] - kgData[0]) + kgData[0] : Math.random()*(kgData[1] - kgData[0]) + kgData[0]) * 10) / 10;
			const hp = enemyData.bSt0 + enemyData.iSt0 + (effData?.rtSt0 || 0),
				rsp = enemyData.bSt2 + enemyData.iSt2 + (effData?.rtSt2 || 0),
				atk = enemyData.bSt3 + enemyData.iSt3 + (effData?.rtSt3 || 0),
				def = enemyData.bSt4 + enemyData.iSt4 + (effData?.rtSt4 || 0),
				mak = enemyData.bSt5 + enemyData.iSt5 + (effData?.rtSt5 || 0),
				mdf = enemyData.bSt6 + enemyData.iSt6 + (effData?.rtSt6 || 0),
				rcv = enemyData.bSt7 + enemyData.iSt7 + (effData?.rtSt7 || 0),
				spd = enemyData.bSt8 + enemyData.iSt8 + (effData?.rtSt8 || 0),
				luk = enemyData.bSt9 + enemyData.iSt9 + (effData?.rtSt9 || 0),
				peck = enemyData.el0 + enemyData.iSt11 + (effData?.rtSt11 || 0),
				claw = enemyData.el1 + enemyData.iSt12 + (effData?.rtSt12 || 0),
				bite = enemyData.el2 + enemyData.iSt13 + (effData?.rtSt13 || 0),
				hit = enemyData.el3 + enemyData.iSt14 + (effData?.rtSt14 || 0),
				press = enemyData.el4 + enemyData.iSt15 + (effData?.rtSt15 || 0),
				toss = enemyData.el5 + enemyData.iSt16 + (effData?.rtSt16 || 0),
				light = enemyData.el6 + enemyData.iSt17 + (effData?.rtSt17 || 0),
				dark = enemyData.el7 + enemyData.iSt18 + (effData?.rtSt18 || 0),
				water = enemyData.el8 + enemyData.iSt19 + (effData?.rtSt19 || 0),
				fire = enemyData.el9 + enemyData.iSt20 + (effData?.rtSt20 || 0),
				wind = enemyData.el10 + enemyData.iSt21 + (effData?.rtSt21 || 0),
				earth = enemyData.el11 + enemyData.iSt22 + (effData?.rtSt22 || 0),
				peckR = enemyData.el0 + enemyData.iSt23 + (effData?.rtSt23 || 0),
				clawR = enemyData.el1 + enemyData.iSt24 + (effData?.rtSt24 || 0),
				biteR = enemyData.el2 + enemyData.iSt25 + (effData?.rtSt25 || 0),
				hitR = enemyData.el3 + enemyData.iSt26 + (effData?.rtSt26 || 0),
				pressR = enemyData.el4 + enemyData.iSt27 + (effData?.rtSt27 || 0),
				tossR = enemyData.el5 + enemyData.iSt28 + (effData?.rtSt28 || 0),
				lightR = enemyData.el6 + enemyData.iSt29 + (effData?.rtSt29 || 0),
				darkR = enemyData.el7 + enemyData.iSt30 + (effData?.rtSt30 || 0),
				waterR = enemyData.el8 + enemyData.iSt31 + (effData?.rtSt31 || 0),
				fireR = enemyData.el9 + enemyData.iSt32 + (effData?.rtSt32 || 0),
				windR = enemyData.el10 + enemyData.iSt33 + (effData?.rtSt33 || 0),
				earthR = enemyData.el11 + enemyData.iSt34 + (effData?.rtSt34 || 0);
			enemy.push({
				state: '',
				elevation: 0,
				buffDebuff:[],
				...gameCh,
				...enemyData,
				lv: data.lv,
				hasSkill: enemySkill,
				kg: kg,
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
				peck:peck,
				claw:claw,
				bite:bite,
				hit:hit,
				press:press,
				toss:toss,
				peckR:peckR,
				clawR:clawR,
				biteR:biteR,
				hitR:hitR,
				pressR:pressR,
				tossR:tossR,
				light:light,
				dark:dark,
				water:water,
				fire:fire,
				wind:wind,
				earth:earth,
				lightR:lightR,
				darkR:darkR,
				waterR:waterR,
				fireR:fireR,
				windR:windR,
				earthR:earthR,
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
				if (gameData.skill[allySkill.idx].cate === 2) {
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
				if (gameData.skill[enemySkill.idx].cate === 2) {
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
		if (!bge) {
			return;
		}
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
	}, [weather, bge]);
	const resetOrder = (mode) => {
		setOrderIdx(0);
		setTurnIdx('');
		allyOrders.current = [];
		timeLine.current = [];
		modeRef.current = mode;
		setMode(mode);
	};
	const areaAllySelect = (e, pos) => {
		if (currentSkill.current?.sk?.cate !== 5 && currentSkill.current?.sk?.cate !== 13) {
			return;
		}
		if (mode === 'area') {
			if (battleAlly.current[orderIdx].sp < currentSkill.current.sp[currentSkill.current.skLv - 1]) {
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
						targetIdx: targetIdx.current,
						effectArea: targetAreaArr.current,
						target: pos,
						sp: -gameData.skill[currentSkill.current.sk.idx].sp[currentSkill.current.skLv - 1],
					});
					setEffectEnemyArea([]);
					setEffectAllyArea([]);
				} else {
					const skillAreaNum = currentSkill.current.sk.ta[currentSkill.current.skLv - 1];
					if (skillAreaNum === 23) {
						targetAreaArr.current = util.getEffectArea({
							isEnemy: currentSkill.current.sk.ta_,
							type: skillAreaNum,
							n: allyPos.current[orderIdx].pos,
							allyPos: allyPos.current,
							battleAlly: battleAlly.current,
							enemyPos: enemyPos.current,
							battleEnemy: battleEnemy.current,
						});
						setEffectAllyArea(targetAreaArr.current);
					} else if (skillAreaNum === 25 || 
						skillAreaNum === 26 || 
						skillAreaNum === 27 ||
						skillAreaNum === 31 ||
						skillAreaNum === 32 ||
						skillAreaNum === 33 ||
						skillAreaNum === 34 ||
						skillAreaNum === 38 ||
						skillAreaNum === 43 ||
						skillAreaNum === 44 ||
						skillAreaNum === 45) { //랜덤 범위시에 위치 재배치시 sp5 소모
						if (battleAlly.current[orderIdx].sp < currentSkill.current.sp[currentSkill.current.skLv - 1] + 5) {
							setMsgOn(true);
							setMsg(gameData.msg.sentence.lackSkillPoint[lang]);
						} else {
							targetAreaArr.current = util.getEffectArea({
								isEnemy: currentSkill.current.sk.ta_,
								type: skillAreaNum,
								n: pos,
								allyPos: allyPos.current,
								battleAlly: battleAlly.current,
								enemyPos: enemyPos.current,
								battleEnemy: battleEnemy.current,
							});
							setEffectAllyArea(targetAreaArr.current);
						}
					} else {
						targetAreaArr.current = util.getEffectArea({
							isEnemy: currentSkill.current.sk.ta_,
							type: skillAreaNum,
							n: pos,
							allyPos: allyPos.current,
							battleAlly: battleAlly.current,
							enemyPos: enemyPos.current,
							battleEnemy: battleEnemy.current,
						});
						setEffectAllyArea(targetAreaArr.current);
					}
				}
			}
		}
	}
	const areaEnemySelect = (e, pos) => {
		if (currentSkill.current?.sk?.cate === 5) {
			return;
		}
		if (mode === 'area') {
			if (battleAlly.current[orderIdx].sp < currentSkill.current.sp[currentSkill.current.skLv - 1]) {
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
						targetIdx: targetIdx.current,
						effectArea: targetAreaArr.current,
						target: pos,
						sp: -gameData.skill[currentSkill.current.sk.idx].sp[currentSkill.current.skLv - 1],
					});
					setEffectEnemyArea([]);
					setEffectAllyArea([]);
				} else {
					const skillAreaNum = currentSkill.current.sk.ta[currentSkill.current.skLv - 1];
					if (skillAreaNum === 25 || 
						skillAreaNum === 26 || 
						skillAreaNum === 27 ||
						skillAreaNum === 31 ||
						skillAreaNum === 32 ||
						skillAreaNum === 33 ||
						skillAreaNum === 34 ||
						skillAreaNum === 38 ||
						skillAreaNum === 43 ||
						skillAreaNum === 44 ||
						skillAreaNum === 45) { //랜덤 범위시에 위치 재배치시 sp5 소모
						if (battleAlly.current[orderIdx].sp < currentSkill.current.sp[currentSkill.current.skLv - 1] + 5) {
							setMsgOn(true);
							setMsg(gameData.msg.sentence.lackSkillPoint[lang]);
						} else {
							battleAlly.current[orderIdx].sp -= 5;
							targetAreaArr.current = util.getEffectArea({
								isEnemy: currentSkill.current.sk.ta_,
								type: skillAreaNum,
								n: pos,
								allyPos: allyPos.current,
								battleAlly: battleAlly.current,
								enemyPos: enemyPos.current,
								battleEnemy: battleEnemy.current,
							});
							setEffectEnemyArea(targetAreaArr.current);
						}
					} else {
						targetAreaArr.current = util.getEffectArea({
							isEnemy: currentSkill.current.sk.ta_,
							type: skillAreaNum,
							n: pos,
							allyPos: allyPos.current,
							battleAlly: battleAlly.current,
							enemyPos: enemyPos.current,
							battleEnemy: battleEnemy.current,
						});
						setEffectEnemyArea(targetAreaArr.current);
					}
				}
			}
		}
	};
	const battleCommand = (skill, skLv) => {
		if (mode === 'end') {//전투 종료시
			return;
		}
		setEffectAllyArea([]);
		setEffectEnemyArea([]);
		if (skill === 'cancel') { //취소 실행
			if (orderIdx > 0) {
				setMode('order');
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
				isEnemy: skill.ta_,
				type: skill.ta[skLv - 1],
				n: skill.ta[skLv - 1] === 23 ? allyPos.current[orderIdx].pos : 12,
				allyPos: allyPos.current,
				battleAlly: battleAlly.current,
				enemyPos: enemyPos.current,
				battleEnemy: battleEnemy.current,
			});
			currentSkill.current = {
				sk: skill,
				skLv: skLv,
				sp: skill.sp,
			}
			const skType = skill.cate;
			switch (skType){
				case 3: //active
				case 6: //debuff
				case 7: //active debuff
				case 8: //active buff
				case 9: //active(적군)
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
					allyOrders.current.push({
						team: 'ally',
						idx: orderIdx,
						skIdx: skill.idx,
						skLv: skLv,
						effectArea: targetAreaArr.current,
						target: allyPos.current[orderIdx].pos,
						sp: -skill.sp[skLv - 1],
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
						effectArea: targetAreaArr.current,
						target: allyPos.current[orderIdx].pos,
						sp: -skill.sp[skLv - 1],
					});
					break;
				case 5: //buff
				case 13: //active(아군)
					setEffectAllyArea(targetAreaArr.current);
					setMode('area');
					break;
				default:
					break;
			}
		}
	};
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
			//행동 포인트 수정
			battleAlly.current.map((data, idx) => {
				data.sp += allyOrders.current[idx].sp || 0;
				if (data.sp > data.sp_) {
					data.sp = data.sp_;
				}
			});
			
			setTimeout(() => {
				setAllyEffect({skillIdx:0,effSize:1,effAnimation:'',effRotate:'',effFilter:'',targets:[],effTargets:[]});
				setEnemyEffect({skillIdx:0,effSize:1,effAnimation:'',effRotate:'',effFilter:'',targets:[],effTargets:[]});
				timeLineSet();//타임라인 구성
				setTimeout(() => {
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
				}, gameData.timeDelay.battle.startTurn / speed);
			}, 500);//pB.timeDelay
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
			const allyState = battleAlly.current[allyPos.current[orderIdx].idx].state;
			if (allyState.indexOf('die') >= 0 || allyState.indexOf('petrification') >= 0 || allyState.indexOf('freezing') >= 0 || allyState.indexOf('immunity') >= 0 || allyState.indexOf('stun') >= 0 || allyState.indexOf('confusion') >= 0) {//상태 이상일 경우 다음 캐릭으로 이동
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
						setOrderIdx('');
					}
				}
			} else if (allyState.indexOf('mutate') >= 0) {
				console.log('변이 동작');
			}
		}
	}, [orderIdx]);
	const timeLineSet = useCallback(() => {
		enemyOrders.current = enemyPattern({
			mode: mode,
			ai: enemyAi.current,
			battleAlly: battleAlly.current,
			allyPos: allyPos.current,
			enemyPos: enemyPos.current,
			battleEnemy: battleEnemy.current,
			gameData: gameData,
		});
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
				<BattleTitle direction="column">
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
				<BattleScenario ref={conversationScrollContainer} className="scroll-y" onClick={() => {
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
						<ScenarioBox key={idx} className={`${data.pos} ${data.team}`} flex-center="true">
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
						</ScenarioBox>
						)
					})}
				</BattleScenario>
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
												<div className="battle_end_hp"><span>기여도:</span><span className="num">{Math.round(allyData.totalBattleGrade) || 0}</span></div>
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
				{bge && <BgEffect className={`bgEffect ${mode === "action" ? "action" : ""}`} img1={imgSet.bgEffect[0]} img2={imgSet.bgEffect[1]} gameSpd={speed}>
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
				</BgEffect>}
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
					<BattleEffect ref={battleEffectRef} gameSpd={gameData.timeDelay.battle.skill * 0.001 / speed} className="battle_effect">
						<BattleEffectLand allEff={enemyEffect.effSize >= 5 ? enemyEffect.effSize : 0} className={`land_enemy`} size={enemyEffect.effSize} rotate={enemyEffect.effRotate} filter={enemyEffect.effFilter}>
						{map.map((data, idx) => {
							let effectType = '',
								effNum = '',
								showEff = false;
							if (enemyEffect.targets[idx]) {
								effectType = enemyEffect.targets[idx].dmg ? 'dmg' : 'heal';
								effNum = enemyEffect.targets[idx].dmg || enemyEffect.targets[idx].heal || '';
							}
							if (enemyEffect.effTargets[idx]) {
								showEff = true;
							}
							return (
								<EffLand key={idx} className="effect_land" left={idx % 5 * mapSize} top={Math.floor(idx / 5) * mapSize} gameSpd={speed}>
									{showEff && (
										<EffArea className="eff_area" size={enemyEffect.effSize} rotate={enemyEffect.effRotate} filter={enemyEffect.effFilter}>
											<Eff src={imgSet.effect[enemyEffect.effAnimation].img} frame={imgSet.effect[enemyEffect.effAnimation].frame} repeat={gameData.skill[enemyEffect.skillIdx].effAnimationRepeat} gameSpd={gameData.timeDelay.battle.skill * 0.001 / speed}/>
										</EffArea>
									)}
									{effNum && <EffNum effType={effectType} gameSpd={gameData.timeDelay.battle.skill * 0.001 / speed}>{effNum}</EffNum>}
								</EffLand>
							);
						})}
						</BattleEffectLand>
						<BattleEffectLand allEff={allyEffect.effSize >= 5 ? allyEffect.effSize : 0} className={`land_ally`} size={allyEffect.effSize} rotate={allyEffect.effRotate} filter={allyEffect.effFilter}>
						{map.map((data, idx) => {
							let effectType = '',
								effNum = '',
								showEff = false;
							if (allyEffect.targets[idx]) {
								effectType = allyEffect.targets[idx].dmg ? 'dmg' : 'heal';
								effNum = allyEffect.targets[idx].dmg || allyEffect.targets[idx].heal || '';
							}
							if (allyEffect.effTargets[idx]) {
								showEff = true;
							}
							return (
								<EffLand key={idx} className={`effect_land`} left={idx % 5 * mapSize} top={Math.floor(idx / 5) * mapSize} gameSpd={speed}>
									{showEff && (
										<EffArea className="eff_area" size={allyEffect.effSize} rotate={allyEffect.effRotate} filter={allyEffect.effFilter}>
											<Eff src={imgSet.effect[allyEffect.effAnimation].img} frame={imgSet.effect[allyEffect.effAnimation].frame} repeat={gameData.skill[allyEffect.skillIdx].effAnimationRepeat} gameSpd={gameData.timeDelay.battle.skill * 0.001 / speed}/>
										</EffArea>
									)}
									{effNum && <EffNum effType={effectType} gameSpd={gameData.timeDelay.battle.skill * 0.001 / speed}>{effNum}</EffNum>}
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
									const isDie = enemyCh?.state || '';
									const actionState = enemyAction[currentEnemyIdx.current] || "";
									const iconIdx = /[0-9]+/g.exec(actionState);
									const passive = allyEnemyPassive[1][currentEnemyIdx.current];
									{/* const buffEff = allyEnemyBuff[1][currentEnemyIdx.current]; */}
									currentEnemyIdx.current ++;
									return (
										<BattleCh key={idx} className={`battle_ch ${area ? "effect effect" + element_type : ""} ${actionCh} ${rtCh} ${actionState} ${isDie}`} data-ch={chData?.display} data-idx={idx} left={left} top={top} size={mapSize} onClick={(e) => {
											areaEnemySelect(e, idx);
										}} gameSpd={speed}>
											{/* {buffEff && buffEff.map((buffData, idx) => {
												return (
													<Buff key={idx} className="ch_buff" gameSpd={gameData.timeDelay.battle.buffSkill * 0.001 / speed} effImg={imgSet.effect[buffData]} frame={imgSet.effect[buffData].frame} buffEff={buffData} >
														<div className="buff_effect"></div>
													</Buff>
												);
											})} */}
											<div className="ch_box">
												{passive && passive.map((passiveData, idx) => {
													return (
														<Passive key={idx} className={`ch_passive passive${idx}`} effImg={imgSet.passive[passiveData]} idx={idx} passive={passiveData}/>
													);
												})}
												<CardMutate className="card_mutate" type="mutate" isAbsolute={true} isThumb={true} pic="icon150" idx={0} />
												<CharacterCard usedType="battle" saveData={saveData} gameData={gameData} saveCharacter={enemyData} gameSpd={speed} />
											</div>
											<BattleChTop className="ch_top" alignItems="center" gameSpd={speed}>
												<div className="elevation">
													<IconPic className="elevationIcon" type="elevation" isAbsolute={true} isThumb={true} pic="icon100" idx={0} />
												</div>
												<FlexBox className="hpsp" direction="column" justifyContent="space-between">
													<span className="hp"><em className="gradient_light" style={{width: hasHp + '%'}}>{enemyCh?.hp ? enemyCh?.hp : ''}</em></span>
												</FlexBox>
											</BattleChTop>
											<div className="dmg"></div>
											<IconPic className="state" type="battleState" isAbsolute={true} isThumb={true} pic="icon150" idx={iconIdx ? iconIdx[0] : 0} />
											<IconPic className="stateDie" type="battleState" isAbsolute={true} isThumb={true} pic="icon150" idx={1} />
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
									const allyCh = battleAlly.current[currentAllyIdx.current];
									const chData = gameData.ch[allyCh?.idx];
									let rtCh = '';
									let rtColor;
									relationCh.current?.ally?.forEach((rtch) => {
										if (rtch.idx === allyCh.idx) {
											rtCh = "relation";
											rtColor = rtch.color;
										}
									});
									const hasHp = (allyCh?.hp / allyCh?.hp_) * 100,
										hasSp = (allyCh?.sp / allyCh?.sp_) * 100;
									const posCh = (typeof orderIdx === "number" && allyPos.current[orderIdx]?.idx === currentAllyIdx.current) ? "on" : "";
									let actionCh = "";
									if (typeof turnIdx === "number" && timeLine.current && timeLine.current[turnIdx]?.order.team === "ally" && currentAllyIdx.current === timeLine.current[turnIdx]?.order.idx) {
										actionCh = "action";
									}
									const isDie = allyCh?.state || '';
									const actionState = allyAction[currentAllyIdx.current] || "";
									const iconIdx = /[0-9]+/g.exec(actionState);
									const passive = allyEnemyPassive[0][currentAllyIdx.current];
									{/* const buffEff = allyEnemyBuff[0][currentAllyIdx.current]; */}
									currentAllyIdx.current ++;
									return (
										<BattleCh key={idx} className={`battle_ch ${posCh} ${area ? "effect effect" + element_type : ""} ${actionCh} ${rtCh} ${actionState} ${isDie}`} data-ch={chData?.display} data-idx={idx} left={left} top={top} size={mapSize} rtColor={rtColor} onClick={(e) => {
											areaAllySelect(e, idx);
										}}  gameSpd={speed}>
											{/* {buffEff && buffEff.map((buffData, idx) => {
												return (
													<Buff key={idx} className="ch_buff" gameSpd={gameData.timeDelay.battle.buffSkill * 0.001 / speed} effImg={imgSet.effect[buffData].img} frame={imgSet.effect[buffData].frame} buffEff={buffData}>
														<div className="buff_effect"></div>
													</Buff>
												);
											})} */}
											<div className="ch_box">
												{passive && passive.map((passiveData, idx) => {
													return (
														<Passive key={idx} className={`ch_passive passive${idx}`} effImg={imgSet.passive[passiveData]} idx={idx} passive={passiveData}/>
													);
												})}
												<CardMutate className="card_mutate" type="mutate" isAbsolute={true} isThumb={true} pic="icon150" idx={0} />
              					<CharacterCard usedType="battle" saveData={saveData} gameData={gameData} saveCharacter={allyCh} gameSpd={speed} />
											</div>
											<BattleChTop className="ch_top" alignItems="center" gameSpd={speed}>
												<div className="elevation">
													<IconPic className="elevationIcon" type="elevation" isAbsolute={true} isThumb={true} pic="icon100" idx={0} />
												</div>
												<FlexBox className="hpsp" direction="column"  justifyContent="space-between">
													<span className="hp"><em className="gradient_light" style={{width: hasHp + '%'}}>{allyCh?.hp ? allyCh?.hp : ''}</em></span>
													<span className="sp"><em className="gradient_light" style={{width: hasSp + '%'}}>{allyCh?.sp ? allyCh?.sp : ''}</em></span>
												</FlexBox>
											</BattleChTop>
											<div className="dmg"></div>
											<IconPic className="state" type="battleState" isAbsolute={true} isThumb={true} pic="icon150" idx={iconIdx ? iconIdx[0] : 0} />
											<IconPic className="stateDie" type="battleState" isAbsolute={true} isThumb={true} pic="icon150" idx={1} />
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
					<BattleLand ref={battleLandRef} className={`battle_land ${mode === "relation" ? "" : "ready"} ${landCriticalEffect ? "critical" : ""} ${mode === "action" ? "action" : ""}`} gameSpd={gameData.timeDelay.battle.skill * 0.001 / speed}>
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
					<BattleWeater className="battle_weather" src={[imgSet.weather]} >
						<WeatherIconBox className={`weather_type ${weather.day ? "day" : "night"}`}>
							<div className="weather_typeIcon" style={{left:`${getWeather(weather) * -50}px`}}>
								{imgSet.weather.map((data, idx) => {
									return <WeatherIcon src={data} idx={idx} key={idx}></WeatherIcon>;
								})}
							</div>
						</WeatherIconBox>
						<WeatherIconBox className="weather_wind">
							<WeatherArrow className="weather_arrow" src={imgSet.etc.wind} weatherInfo={weather} />
						</WeatherIconBox>
					</BattleWeater>
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
									{battleAlly.current[orderIdx]?.mutate ? 
										gameData.mutateSkill[battleAlly.current[orderIdx]?.mutate].map((data, idx) => {
											const sk = gameData.skill;
											return (
												<li key={idx}><button onClick={() => {
													battleCommand(sk[data.idx], data.lv);
												}}><span className="skSp">{sk[data.idx].sp[data.lv - 1]}</span><span className="skName">{sk[data.idx].na[lang]}</span></button></li>
											);
										})
									:
										battleAlly.current[orderIdx]?.hasSkill && battleAlly.current[orderIdx]?.hasSkill.map((data, idx) => {
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
											if (sk[data.idx].cate !== 2 && actionType) {
												return (
													<li key={idx}><button onClick={() => {
														battleCommand(sk[data.idx], data.lv);
													}}><span className="skSp">{sk[data.idx].sp[data.lv - 1]}</span><span className="skName">{sk[data.idx].na[lang]}</span></button></li>
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
							const iconIdx = (() => {
								if (!activeSkill) {
									return 0;
								}
								if (activeSkill.indexOf('die') >= 0) {
									return 1;
								}
								if (activeSkill.indexOf('state2') >=0) {
									return 2;
								}
							})();
							const currentIdx = (() => {
								if (turnIdx === idx) {
									return 'on';
								} else if (turnIdx > idx) {
									return 'off';
								} else {
									return '';
								}
							})();
							return (
								<TimeLineCh key={idx} className={`${currentIdx} ${activeSkill}`} team={data.order.team} size={30} gameSpd={speed}>
									<CharacterCard className="ch" usedType="timeline" saveData={saveData} gameData={gameData} saveCharacter={chData} gameSpd={speed} />
									<IconPic className="state" type="battleState" isAbsolute={true} isThumb={true} pic="icon150" idx={iconIdx} />
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
