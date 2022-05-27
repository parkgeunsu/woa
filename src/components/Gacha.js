import { AppContext } from 'App';
import { util } from 'components/Libs';
import Modal from 'components/Modal';
import ModalContainer from 'components/ModalContainer';
import imgBack from 'images/back/back5.jpg';
import imgCardBack from 'images/card/card_back.png';
import imgCardFrame from 'images/card/card_frame.png';
import imgCardLv from 'images/card/card_lv.png';
import iconCardName from 'images/card/card_name.png';
import iconDiamod from 'images/ico/ico_dia.png';
import iconGold from 'images/ico/ico_gold.png';
import imgRingBack from 'images/ring/back.png';
import imgRing from 'images/ring/ring_.png';
import iconStar1 from 'images/star/star1.png';
import iconStar2 from 'images/star/star2.png';
import iconStar3 from 'images/star/star3.png';
import iconStar4 from 'images/star/star4.png';
import iconStar5 from 'images/star/star5.png';
import iconStar6 from 'images/star/star6.png';
import iconStar7 from 'images/star/star7.png';
import React, { useCallback, useContext, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';



const Img = styled.img.attrs(
  ({imgurl}) => ({
    src: imgurl 
  })
)``;

const GachaWrap = styled.div`
	display:flex;position:absolute;left:0;right:0;top:0;bottom:0;background:url(${({backImg}) => backImg});background-size:cover;
	flex-direction:column;padding:44px 0 0 0;width:100%;height:100%;box-sizing:border-box;overflow:hidden;
`;
const GachaMenu = styled.ul`
	padding:0 20px;flex-grow:0;overflow:hidden;
	height: ${({gachaMode}) => {
		return gachaMode === ('start' || 'card') ? 0 : 'auto';
	}};
	li {margin:0 0 10px 0;}
	li:last-of-type{margin:0;}
`;
const GachaMenuButton = styled.button`
	display:block;padding:10px 0;width:100%;background:rgba(255,255,255,.5);color:#000;border-radius:20px;text-align:center;
	.price{margin:0 0 0 10px;padding:0 0 0 20px;}
	.menu{padding:0 20px;}
`;
const GachaIcon = styled.span`
	background:url(${({icoType}) => icoType}) no-repeat left center;background-size:20px;
`;

const GachaArea = styled.div`
	flex-grow:1;perspective:300px;perspective-origin:50% 100%;transform-style:flat;
`;
const GachaBg = styled.div`
	${({gachaMode}) => {
		if (gachaMode === 'start') {
			return (
				`position:absolute;transform:rotateX(45deg);content:'';left:-50%;top:15%;width:200%;height:100%;background: radial-gradient(hsl(0, 100%, 27%) 4%, hsl(0, 100%, 18%) 9%, hsla(0, 100%, 20%, 0) 9%) 0 0, radial-gradient(hsl(0, 100%, 27%) 4%, hsl(0, 100%, 18%) 8%, hsla(0, 100%, 20%, 0) 10%) 50px 50px, radial-gradient(hsla(0, 100%, 30%, 0.8) 20%, hsla(0, 100%, 20%, 0)) 50px 0, radial-gradient(hsla(0, 100%, 30%, 0.8) 20%, hsla(0, 100%, 20%, 0)) 0 50px, radial-gradient(hsla(0, 100%, 20%, 1) 35%, hsla(0, 100%, 20%, 0) 60%) 50px 0, radial-gradient(hsla(0, 100%, 20%, 1) 35%, hsla(0, 100%, 20%, 0) 60%) 100px 50px, radial-gradient(hsla(0, 100%, 15%, 0.7), hsla(0, 100%, 20%, 0)) 0 0, radial-gradient(hsla(0, 100%, 15%, 0.7), hsla(0, 100%, 20%, 0)) 50px 50px, linear-gradient(45deg, hsla(0, 100%, 20%, 0) 49%, hsla(0, 100%, 0%, 1) 50%, hsla(0, 100%, 20%, 0) 70%) 0 0, linear-gradient(-45deg, hsla(0, 100%, 20%, 0) 49%, hsla(0, 100%, 0%, 1) 50%, hsla(0, 100%, 20%, 0) 70%) 0 0;
				background-color: #300;
				background-size: 100px 100px`
			)
		}
	}}
`;
const GachaCards = styled.div`
	&.pos {
		.card{left:0 !important;top:0 !important;}
		.card:first-of-type{transform:scale(.9) translate(10%,10%) !important;}
		.card:nth-of-type(2){transform:scale(.9) translate(130%,10%) !important;}
		.card:nth-of-type(3){transform:scale(.9) translate(250%,10%) !important;}
		.card:nth-of-type(4){transform:scale(.9) translate(70%,100%) !important;}
		.card:nth-of-type(5){transform:scale(.9) translate(190%,100%) !important;}
		.card:nth-of-type(6){transform:scale(.9) translate(10%,190%) !important;}
		.card:nth-of-type(7){transform:scale(.9) translate(130%,190%) !important;}
		.card:nth-of-type(8){transform:scale(.9) translate(250%,190%) !important;}
		.card:nth-of-type(9){transform:scale(.9) translate(70%,280%) !important;}
		.card:last-of-type{transform:scale(.9) translate(190%,280%) !important;}
	}
	&.posOne .card{left:0 !important;top:0 !important;transform:scale(1.5) translate(80%,80%) !important;}
	&.cardMode {
		.card {
			pointer-events: unset;
		}
	}
`;
const GachaCard = styled.div`
	position:absolute;transition:all linear 2s;opacity:0;z-index:1;
	left: ${({posX}) => posX}%;
	top: ${({posY}) => posY}%;
	width: 30%;
	padding-top: ${30*1.481}%;
	transform: translate(-50%,-50%) rotateX(45deg) rotateZ(${({rotate}) => rotate}deg);
	pointer-events: none;
	&.ready {
		opacity:1;transition:all .5s;
	}
	&.on {
		left:50% !important;top:20% !important;transform:translate(-50%,-50%) rotateX(0deg) rotateZ(0deg) !important;
		.front{box-shadow:none !important;}
	}
	&.open {
		left:50% !important;top:70% !important;transform:scale(1.3) translate(-35%,-50%) rotateX(0deg) rotateZ(0deg) !important;
		.front{z-index:2;transform:rotateY(1440deg);}
		.back{z-index:1;transform:rotateY(1270deg);}
		li{position:absolute;color:#fff;font-size:10px;}
		.name_lv .lv {font-size:10px;}
		.name_lv .name_ {font-size:10px;}
		.name_lv .name {font-size:10px;}
	}
	&.open.special {
		div{transition:all 3s;}
		.front{z-index:2;transform:rotateY(14400deg);}
		.back{z-index:1;transform:rotateY(12700deg);}
		&:before{content:'';position:absolute;left:50%;top:50%;padding-top:500%;width:500%;transform:translate(-50%,-50%) scale(0);background-image:radial-gradient(rgba(255,100,0,.7) 0%,rgba(255,210,0,.8) 40%,transparent 80%);background-size:100%;animation:sp_eff1 3s;transform-origin:center;}
		&:after{content:'';position:absolute;left:50%;top:50%;padding-top:500%;width:500%;transform:translate(-50%,-50%) scale(0);background-image:radial-gradient(rgba(255,255,255,1) 0%, rgba(200,25,0,.4) 50%,transparent 80%);background-size:100%;animation:sp_eff2 3s;transform-origin:center;}
	}
	@keyframes sp_eff1{
		0%{transform:translate(-50%,-50%) scale(0);}
		30%{transform:translate(-50%,-50%) scale(1);}
		50%{transform:translate(-50%,-50%) scale(.3);}
		50%{transform:translate(-50%,-50%) scale(.8);}
		100%{transform:translate(-50%,-50%) scale(0);}
	}
	@keyframes sp_eff2{
		0%{transform:translate(-50%,-50%) scale(0);}
		10%{transform:translate(-50%,-50%) scale(.3);}
		30%{transform:translate(-50%,-50%) scale(.9);}
		70%{transform:translate(-50%,-50%) scale(.2);}
		85%{transform:translate(-50%,-50%) scale(.6);}
		100%{transform:translate(-50%,-50%) scale(0);}
	}
`;
const CardLvName = styled.li`
	left:50%;bottom:7%;width:85%;transform:translate(-50%,0) scale(1);text-shadow:0 0 1px #fff;text-align:center;z-index:3;font-size:0;
	&:after{content:'';display:block;position:absolute;left:3%;top:-17%;padding-top:30%;width:30%;background:url(${({cardLv}) => cardLv});background-repeat:no-repeat;background-position:center center;background-size:contain;}
	.lv{position:absolute;display:inline-block;left:3%;top:15%;width:30%;line-height:1;font-size:25px;text-align:center;z-index:1;}
	img{width:100%;}
	.name_{position:absolute;display:inline-block;left:33%;top:17%;width:67%;line-height:1;font-size:14px;text-align:left;z-index:1;box-sizing:border-box;}
	.name{position:absolute;display:inline-block;right:2%;bottom:26%;width:67%;line-height:1;font-size:20px;z-index:1;box-sizing:border-box;letter-spacing:-2px;white-space:nowrap;overflow:hidden;}
`;
const CardDisplay = styled.li`
	top:0;width:100%;height:100%;
	background-image:url(${({chDisplay}) => chDisplay});
	background-repeat:no-repeat;background-size:85%;background-position:center center;z-index:4;pointer-events:none;
`;
const CardStyle = styled.li`
	top:0;width:100%;height:100%;
	background-image:url(${({styleDisplay}) => styleDisplay});
	background-repeat:no-repeat;background-size:100%;background-position:center center;z-index:5;pointer-events:none;
`;
const CardElement = styled.li`
	top:0;width:100%;height:100%;
	background-image:url(${({ringDisplay}) => ringDisplay});
	background-repeat:no-repeat;background-position:center center;background-size:100%;z-index:1;pointer-events:none;
`;
const CardStar = styled.li`
	left:0;bottom:22%;width:100%;height:${({type}) => {
		return (
			type === 'open' ? 'height:25px' : 'height:12px'
		);
	}};z-index:5;text-align:center;
	span{display:inline-block;
		${({type}) => {
			return (
				type === 'open' ? 'width:25px;height:25px' : 'width:12px;height:12px'
			);
		}}
	}
	span:first-of-type{background:url(${({starIcon}) => starIcon[0]}) no-repeat center center;background-size:100%}
	span:nth-of-type(2){background:url(${({starIcon}) => starIcon[1]}) no-repeat center center;background-size:100%;}
	span:nth-of-type(3){background:url(${({starIcon}) => starIcon[2]}) no-repeat center center;background-size:100%;}
	span:nth-of-type(4){background:url(${({starIcon}) => starIcon[3]}) no-repeat center center;background-size:100%;}
	span:nth-of-type(5){background:url(${({starIcon}) => starIcon[4]}) no-repeat center center;background-size:100%;}
	span:nth-of-type(6){background:url(${({starIcon}) => starIcon[5]}) no-repeat center center;background-size:100%;}
	span:nth-of-type(7){background:url(${({starIcon}) => starIcon[6]}) no-repeat center center;background-size:100%;}
`;
const CardRing = styled.li`
	top:0;width:100%;height:100%;
	background:url(${({ringBack}) => ringBack});
	background-repeat:no-repeat;background-position:center center;background-size:85%;pointer-events:none;z-index:3;
`;
const CardFrame = styled.li`
	top:0;width:100%;height:100%;
	background:url(${({cardFrame}) => cardFrame});
	background-repeat:no-repeat;background-position:center center;background-size:100% 100%;z-index:5;pointer-events:none;
`;
const GachaFront = styled.div`
	position:absolute;left:0;right:0;top:0;bottom:0;border-radius:5%;overflow:hidden;backface-visibility:hidden;transition:all .7s;
	z-index:1;background:#000;transform:rotateY(180deg);
	box-shadow:${({gameData, idx}) => {
		const grade = gameData.ch[idx].grade;
		const gradeColor = gameData.chGradeColor[grade*1];
		if (grade === 1) {
			return;
		} else if (grade === 2) {
			return `0 0 5px ${gradeColor},0 0 2px ${gradeColor}`;
		} else if (grade === 3) {
			return `0 0 10px ${gradeColor},0 0 3px ${gradeColor},0 0 1px ${gradeColor}`;
		} else if (grade === 4) {
			return `0 0 15px ${gradeColor},0 0 4px ${gradeColor},0 0 1px ${gradeColor}`;
		} else if (grade === 5) {
			return `0 0 20px ${gradeColor},0 0 5px ${gradeColor},0 0 2px ${gradeColor}`;
		} else if (grade === 6) {
			return `0 0 40px ${gradeColor},0 0 10px ${gradeColor},0 0 3px ${gradeColor}, 0 0 50px #fff`;
		} else if (grade === 7) {
			return `0 0 40px ${gradeColor},0 0 10px ${gradeColor},0 0 3px ${gradeColor}, 0 0 50px #fff`;
		}
		
	}};
`;
const GachaBack = styled.div`
	position:absolute;left:0;right:0;top:0;bottom:0;border-radius:5%;overflow:hidden;backface-visibility:hidden;transition:all .7s;
	transform:rotateY(0deg);background:url(${({cardBack}) => cardBack}) no-repeat center center;background-size:100%;z-index:2;
`;
const GachaEffect = styled.div`
	position:absolute;left:0;top:-10%;width:100%;padding-top:100%;background-image:radial-gradient(rgba(255,255,255,1) 0%,rgba(255,255,255,0) 70%);background-size:cover;transform:scale(0);z-index:11;
	&.grade6{animation:grade6 linear 3s;}
	&.grade5{animation:grade5 linear 2.5s;}
	&.grade4{animation:grade4 linear 2s;}
	&.grade3{animation:grade3 linear 1.5s;}
	@keyframes grade3{
		0%{transform:scale(0,0);background-image:radial-gradient(#fff 0%,rgba(255,255,255,0) 70%);}
		12.5%{transform:scale(6,6);}
		25%{transform:scale(0,0);background-image:radial-gradient(#00a90c 0%,rgba(255,255,255,0) 70%);}
		37.5%{transform:scale(6,6);}
		50%{transform:scale(0,0);background-image:radial-gradient(#0090ff 0%,rgba(255,255,255,0) 70%);}
		62.5%{transform:scale(6,6);}
		75%{transform:scale(0,0);background-image:radial-gradient(#f4ea19 0%,rgba(255,255,255,0) 70%);}
		87.5%{transform:scale(6,6);}
		100%{transform:scale(0,0);background-image:radial-gradient(#f4ea19 0%,rgba(255,255,255,0) 70%);}
	}
	@keyframes grade4{
		0%{transform:scale(0,0);background-image:radial-gradient(#fff 0%,rgba(255,255,255,0) 70%);}
		10%{transform:scale(6,6);}
		20%{transform:scale(0,0);background-image:radial-gradient(#00a90c 0%,rgba(255,255,255,0) 70%);}
		30%{transform:scale(6,6);}
		40%{transform:scale(0,0);background-image:radial-gradient(#0090ff 0%,rgba(255,255,255,0) 70%);}
		50%{transform:scale(6,6);}
		60%{transform:scale(0,0);background-image:radial-gradient(#f4ea19 0%,rgba(255,255,255,0) 70%);}
		70%{transform:scale(6,6);}
		80%{transform:scale(0,0);background-image:radial-gradient(#a800ff 0%,rgba(255,255,255,0) 70%);}
		90%{transform:scale(6,6);}
		100%{transform:scale(0,0);background-image:radial-gradient(#a800ff 0%,rgba(255,255,255,0) 70%);}
	}
	@keyframes grade5{
		0%{transform:scale(0,0);background-image:radial-gradient(#fff 0%,rgba(255,255,255,0) 70%);}
		8.3%{transform:scale(6,6);}
		16.6%{transform:scale(0,0);background-image:radial-gradient(#00a90c 0%,rgba(255,255,255,0) 70%);}
		25%{transform:scale(6,6);}
		33.3%{transform:scale(0,0);background-image:radial-gradient(#0090ff 0%,rgba(255,255,255,0) 70%);}
		41.6%{transform:scale(6,6);}
		50%{transform:scale(0,0);background-image:radial-gradient(#f4ea19 0%,rgba(255,255,255,0) 70%);}
		58.3%{transform:scale(6,6);}
		66.6%{transform:scale(0,0);background-image:radial-gradient(#a800ff 0%,rgba(255,255,255,0) 70%);}
		75%{transform:scale(6,6);}
		83.3%{transform:scale(0,0);background-image:radial-gradient(#ff8000 0%,rgba(255,255,255,0) 70%);}
		91.6%{transform:scale(6,6);}
		100%{transform:scale(0,0);background-image:radial-gradient(#ff8000 0%,rgba(255,255,255,0) 70%);}
	}
	@keyframes grade6{
		0%{transform:scale(0,0);background-image:radial-gradient(#fff 0%,rgba(255,255,255,0) 70%);}
		7.2%{transform:scale(6,6);}
		14.5%{transform:scale(0,0);background-image:radial-gradient(#00a90c 0%,rgba(255,255,255,0) 70%);}
		21.7%{transform:scale(6,6);}
		29%{transform:scale(0,0);background-image:radial-gradient(#0090ff 0%,rgba(255,255,255,0) 70%);}
		36.2%{transform:scale(6,6);}
		43.5%{transform:scale(0,0);background-image:radial-gradient(#f4ea19 0%,rgba(255,255,255,0) 70%);}
		50.2%{transform:scale(6,6);}
		57.5%{transform:scale(0,0);background-image:radial-gradient(#a800ff 0%,rgba(255,255,255,0) 70%);}
		64.7%{transform:scale(6,6);}
		72%{transform:scale(0,0);background-image:radial-gradient(#ff8000 0%,rgba(255,255,255,0) 70%);}
		79.2%{transform:scale(6,6);}
		86%{transform:scale(0,0);background-image:radial-gradient(#ff2a00 0%,rgba(255,255,255,0) 70%);}
		93%{transform:scale(6,6);}
		100%{transform:scale(0,0);background-image:radial-gradient(#ff2a00 0%,rgba(255,255,255,0) 70%);}
	}
`;
const GachaEventArea = styled.div`
	position: absolute;left: 0;right: 0;top: 0;bottom: 0;z-index: 20;pointer-events:none;
	&.on {
		pointer-events: unset;
	}
`;
const GachaInfo = styled.div`
	display:none;position:absolute;left:0;right:0;top:0;bottom:0;z-index:3;
	&.on {display:block;}
	&:after{content:'';position:absolute;left:0;right:0;top:0;bottom:0;background:rgba(0,0,0,.7);}
	.ch_state{position:absolute;left:5%;top:45%;right:5%;bottom:3%;padding:10px 20px;background:rgba(0,0,0,.8);box-sizing:border-box;border:5px solid transparent;border-image:url(../images/frame/frame_chback.png) 5 round;z-index:1;}
	.ch_state ul{}
	.ch_state ul li{display:flex;margin:0 0 10px 0;padding:0 0 10px 0;justify-content:space-between;border-bottom:1px solid #fff;}
	.ch_state ul li:last-of-type{border-bottom:0;}
	.ch_state ul li dl{}
	.ch_state ul li dt{margin:0 0 5px 0;padding:3px 5px;border-radius:5px;background:rgba(255,255,255,.3);font-size:12px;font-weight:600;color:#fff;}
	.ch_state ul li dd{font-size:14px;}
	.ch_state ul li dd .st{display:inline-block;padding:4px;font-weight:600;font-size:14px;}
	.ch_state ul li dd .st0{color:#037ace;}
	.ch_state ul li dd .st1{color:#f3004e;}
	.ch_state ul li dd .st2{color:#ff5326;}
	.ch_state ul li dd .st3{color:#77b516;}
	.ch_state ul li dd .st4{color:#f9c215;}
	.ch_state ul li dd .st5{color:#5f3dc4;}
	.ch_state ul li dd .st6{color:#ce20c2;}
`;
const GachaInfoCard = styled.div`
	position:absolute;left:7.5%;top:2.5%;transform:scale(.3);transform-origin:0 0;width:85%;font-size:0;z-index:1;
	img {width:100%;}
	.ch_detail {position:absolute;top:0;left:0;width:100%;height:100%;backface-visibility:hidden;z-index:2;box-shadow:0 0 1px #ff0, 0 0 2px #fff, 0 0 10px #000;border-radius:20px;overflow:hidden;
	}
	.ch_detail li {position:absolute;color:#fff;}
`;
const GachaInGraph = styled.div`
	position:absolute;left:35%;top:2.5%;width:60%;padding-top:60%;font-size:0;z-index:1;
	canvas{position:absolute;left:0;top:0;width:100%;}
`;
const makeCard = (num, gachaType, gameData, saveData, changeSaveData) => { //가챠횟수
  const separationGrade = () => { // 캐릭 등급분리
		let gradeChArr = [[],[],[],[],[],[],[]];
    for(const v of gameData.ch){
      gradeChArr[v.grade-1].push(v);
    }
		return gradeChArr;
  }
  const getCardIdx = (gradeNum) => {
		const chOfGrade = separationGrade();
    const length = chOfGrade[gradeNum].length,
          ran = Math.floor(Math.random()*length);
    return chOfGrade[gradeNum][ran].idx;
  }
	const getGrade = (n, type) => {
    const arr = type === 'p' ? [3,10,21,38] : [2,6,15,30,50,75]; // 다이아 & 골드 등급 나올확률값
    //1, 3, 10, 15
    //0.1, 0.3, 1, 5, 20, 25
    let ch_arr = [];
    for(let i = 0 ; i < n ; ++i){
      const ranCount = Math.random()*100;
      let resultGrade = 0;
			if (gachaType === 'p') {
				if (ranCount < arr[0]){//7등급
					resultGrade = 6;
				}else if(ranCount < arr[1]){//6등급
					resultGrade = 5;
				}else if(ranCount < arr[2]){//5등급
					resultGrade = 4;
				}else if(ranCount < arr[3]){//4등급
					resultGrade = 3;
				}else{//3등급
					resultGrade = 2;
				}
			} else {
				if (ranCount < arr[0]){//7등급
					resultGrade = 6;
				}else if(ranCount < arr[1]){//6등급
					resultGrade = 5;
				}else if(ranCount < arr[2]){//5등급
					resultGrade = 4;
				}else if(ranCount < arr[3]){//4등급
					resultGrade = 3;
				}else if(ranCount < arr[4]){//3등급
					resultGrade = 2;
				}else if(ranCount < arr[5]){//2등급
					resultGrade = 1;
				}else{//1등급
					resultGrade = 0;
				}
			}
      ch_arr.push(resultGrade);
    }
    const cloneArr = ch_arr.slice();
    const maxGrade = ch_arr.sort((a,b)=>b-a)[0];
    return {
			arr: cloneArr,
			maxGrade: maxGrade < 3 ? 3 : maxGrade //최고 높은 등급 확인
		};
  }
	let chArr = [];
	let chDataArr = [];
	const cardGrade = getGrade(num, gachaType);
	for (let i = 0; i < num; ++i) {
		const newIdx = getCardIdx(cardGrade.arr[i]);		
		const addGrade = Math.random();
		let luckyGradePoint = 0;
		if (cardGrade.arr[i] === 1) {
			if (addGrade < .005) {
				luckyGradePoint = 5;
			} else if (addGrade < .01) {
				luckyGradePoint = 4;
			} else if (addGrade < .05) {
				luckyGradePoint = 3;
			} else if (addGrade < .1) {
				luckyGradePoint = 2;
			} else if (addGrade < .3) {
				luckyGradePoint = 1;
			}
		} else if (cardGrade.arr[i] === 2) {
			if (addGrade < .005) {
				luckyGradePoint = 4;
			} else if (addGrade < .01) {
				luckyGradePoint = 3;
			} else if (addGrade < .05) {
				luckyGradePoint = 2;
			} else if (addGrade < .1) {
				luckyGradePoint = 1;
			}
		} else if (cardGrade.arr[i] === 3) {
			if (addGrade < .005) {
				luckyGradePoint = 3;
			} else if (addGrade < .01) {
				luckyGradePoint = 2;
			} else if (addGrade < .05) {
				luckyGradePoint = 1;
			}
		} else if (cardGrade.arr[i] === 4) {
			if (addGrade < .005) {
				luckyGradePoint = 2;
			} else if (addGrade < .01) {
				luckyGradePoint = 1;
			}
		}
		const cardG = cardGrade.arr[i] + luckyGradePoint;
		chArr.push({
			idx: newIdx,
			grade: cardG,
			slotIdx: saveData.ch.length + i,
			posX: Math.random() * 100,
			posY: Math.random() * 40 + 60,
			rotate: Math.random() * 360,
		});
		chDataArr.push(util.saveLvState('', {
			itemEff: util.getItemEff(),
			grade: cardG,
			newState: {
				actionPoint: 20,
				exp: 0,
				hasExp: 0,
				grade: cardG,
				idx: newIdx,
				items: [{}, {}, {}, {}, {}, {}, {}, {}],
				lv: 1,
				sk: [{idx: 0, lv: 1}],
				stateType: Math.floor(Math.random()*4),
			},
		}, saveData, gameData));
	};
	return {
		chArr: chArr,
		chDataArr: chDataArr,
		maxCard: cardGrade.maxGrade,
	};
}
const makeStar = (n) => {//별 처리
  let tag = [];
  for(var i =0; i< n; ++i){
    tag.push(<span key={i}></span>);
  }
  return tag
}
const openCard = (cardList, cardIdx) => {
	const card = cardList[cardIdx];
	const cardGrade = card.dataset['grade'];
	if (cardGrade > 5) {//고급 등급 효과 추가
		card.classList.add('special');
	}
	card.classList.add('open');
}

const Gacha = ({
	saveData,
	changeSaveData,
}) => {
  const imgSet = useContext(AppContext).images;
	const iconStar = [iconStar1, iconStar2, iconStar3, iconStar4, iconStar5, iconStar6, iconStar7]
  const gameData = useContext(AppContext).gameData;
	const [gachaMode, setGachaMode] = useState('init');
	const [cardStateType, setCardStateType] = useState(''); //카드 성장타입
	const [cardStar, setCardStar] = useState(0); //카드 성장타입
	const setTime = useRef(null); //타임아웃 ref
	const maxCardGrade = useRef(null); //뽑은 카드 최대등급
	const effectRef = useRef(null); // 이펙트 효과
	const cardGroupRef = useRef(null); //카드 그룹
	const eventRef = useRef(null); //터치 이벤트 영역
	const infoRef = useRef(null); //카드 정보창
	const graphRef = useRef(null); //카드정보 그래프
	const cardRef = useRef([]); //단일 카드
	const openCardIdx = useRef(0); //카드 뒤짚기 순번
	const [infoIdx, setInfoIdx] = useState(0); //카드정보 카드번호
	const changeGachaMode = (mode, data) => {
		if (mode === 'start') { // 뽑기모드
			let sData = {...saveData};
			if (data.type === 'p') {
				sData.info.diamond -= data.price; //다이아 계산
			} else {
				sData.info.money -= data.price; //돈 계산
			}
			const cardList = makeCard(data.num, data.type, gameData, sData, changeSaveData);

			cardList.chDataArr.forEach((data, idx) => {

				sData.ch.push(data);
			});
			changeSaveData(sData); //세이브

			maxCardGrade.current = cardList.maxCard;
			setGachaCard(cardList.chArr);
		}
		setGachaMode(mode);
	}
	useLayoutEffect(() => {
		if (gachaMode === 'start') { // 뽑기모드
			const gachaLength = cardRef.current.length;
			const gachaIntervalTime = gachaLength *200;
			cardRef.current.forEach((el, idx) => {
				setTime.current = setTimeout(()=>{
					el.classList.add('on');
				}, 200 * idx+1000);
			});
			setTime.current = setTimeout(()=>{
				effectRef.current.classList.add('grade' + maxCardGrade.current);
			}, gachaIntervalTime + 1500);
			setTime.current = setTimeout(() => {
				cardGroupRef.current.classList.add(gachaLength > 1 ? 'pos' : 'posOne');
				eventRef.current.classList.add('on'); //터치 활성화
				cardRef.current.forEach((el, idx) => {
					el.classList.remove('on');
				});
			}, gachaIntervalTime + 2500);
		}
		return () => {
			setTime.current = null;
		}
	}, [gachaMode])
  const [modalOn, setModalOn] = useState(false);
	const [modalInfo, setModalInfo] = useState({});
  const [modalType, setModalType] = useState();
	const gachaList = [
		{na: 'Premium 10', type: 'p10', num: 10, price: 1400},
		{na: 'Premium 1', type: 'p1', num: 1, price: 150},
		{na: 'Normal 10', type: 'n10', num: 10, price: 20000},
		{na: 'Normal 1', type: 'n1', num: 1, price: 2000},
	];
	const [gachaCard, setGachaCard] = useState([]);
	const handleModal = (modalType, gachaIdx) => {
    if( modalType ){
			const price = gachaList[gachaIdx].price;
			const num = gachaList[gachaIdx].num;
			const gachaType = gachaList[gachaIdx].type.substr(0,1);
			if (gachaIdx < 2){ // 다이아 뽑기
				if (saveData.info.diamond >= price) { //돈이 충분할 경우
					setModalInfo({
						type: 'confirm',
						msg: `발바닥 ${price}을 사용하시겠습니까?`,
						info: {
							type: gachaType,
							price: price,
							num: num,
						},
						bt: [{txt:'사용',action:'gacha'},{txt:'취소',action:'popClose'}],
					});
				} else { //돈이 모자를 경우
					setModalInfo({
						type: 'confirm',
						msg: `발바닥이 충분하지 않습니다.`,
					});
				}
			} else { // 골드 뽑기
				if (saveData.info.money >= price) { //돈이 충분할 경우
					setModalInfo({
						type: 'confirm',
						msg: `골드 ${price}을 사용하시겠습니까?`,
						info: {
							type: gachaType,
							price: price,
							num: num,
						},
						bt: [{txt:'사용',action:'gacha'},{txt:'취소',action:'popClose'}],
					});
				} else { //돈이 모자를 경우
					setModalInfo({
						type: 'confirm',
						msg: `발바닥이 충분하지 않습니다.`,
					});
				}
			}
      setModalType(modalType);
    }
    setModalOn(!modalOn);
  }
	const popCard = useCallback((chData) => {
		const can = graphRef.current;
		const roundedRectangle = (container, x, y, width, height, rounded) => {
			// const radiansInCircle = 2 * Math.PI
			const halfRadians = (2 * Math.PI)/2;
			const quarterRadians = (2 * Math.PI)/4;
			container.arc(rounded + x, rounded + y, rounded, -quarterRadians, halfRadians, true); // top left arc
			container.lineTo(x, y + height - rounded); // line from top left to bottom left
			container.arc(rounded + x, height - rounded + y, rounded, halfRadians, quarterRadians, true); // bottom left arc  
			container.lineTo(x + width - rounded, y + height); // line from bottom left to bottom right
			container.arc(x + width - rounded, y + height - rounded, rounded, quarterRadians, 0, true); // bottom right arc
			container.lineTo(x + width, y + rounded); // line from bottom right to top right
			container.arc(x + width - rounded, y + rounded, rounded, 0, -quarterRadians, true); // top right arc
			container.lineTo(x + rounded, y); // line from top right to top left
		}
		const stData = [
			{title: '통솔', color: '#037ace', percent: 125,},
			{title: '체력', color: '#f3004e', percent: 200,},
			{title: '무력', color: '#ff5326', percent: 200,},
			{title: '민첩', color: '#77b516', percent: 100,},
			{title: '지력', color: '#f9c215', percent: 200,},
			{title: '정치', color: '#5f3dc4', percent: 100,},
			{title: '매력', color: '#ce20c2', percent: 100,},
		];
		const ctxWidth = can.getBoundingClientRect().width,
			ctxCenter = ctxWidth*.5,
			barMaxSize = ctxWidth*.75,
			ctx = can.getContext('2d');
		let arc_c = 0,
			arr = [{},{},{},{},{},{},{}],
			st = [];
		can.setAttribute('width', ctxWidth+'px');
		can.setAttribute('height', ctxWidth+'px');
		for(let i = 0; i < 7; ++i){
			// arc_c = st[i]/statePercent[i]*circle_r;
			// arr[i].x = Math.cos(arc_r*i)*arc_c+ctx_c;
			// arr[i].y = Math.sin(arc_r*i)*arc_c+ctx_c;
			// arr[i].x_ = Math.cos(arc_r*i)*ctx_c;
			// arr[i].y_ = Math.sin(arc_r*i)*ctx_c;
		}
		

		//능력치 면
		stData.forEach((data, idx) => {
			const state = chData['st'+idx];
			const canX = 25*idx;
			ctx.beginPath();
			ctx.fillStyle = data.color;
			roundedRectangle(ctx, canX + 25, 0, 20, state + 20, 10); //container, x, y, width, height, rounded
			//text
			ctx.fill();
			ctx.beginPath();
			ctx.fillStyle = '#fff';
			ctx.font = 'normal bold 16px Arial';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'top';
			ctx.fillText(data.title.substr(0, 1), canX + 35, 5, 20);
			ctx.fill();
		});
		// for(let i = 0; i < 7; ++i){
		// 	ctx.lineTo(arr[i].x,arr[i].y);
		// }
		// ctx.lineTo(arr[0].x,arr[0].y);
		// ctx.fill();
	
		//색상 라인
		// ctx.lineWidth = 1;
		// for(let i = 0; i < 7; ++i){
		//   ctx.beginPath();
		//   ctx.strokeStyle = st_c[i];
		//   ctx.moveTo(ctx_c,ctx_c);
		//   ctx.lineTo(arr[i].x,arr[i].y);
		//   ctx.stroke();
		// }
	
		//글씨 배경
		// ctx.shadowColor = '#000';
		// ctx.shadowOffsetX = 2;
		// ctx.shadowOffsetY = 2;
		// ctx.shadowBlur = 4;
		// for(let i = 0; i < 7; ++i){
		// 	ctx.beginPath();
		// 	ctx.fillStyle = st_c[i];
		// 	const tx = arr[i].x_*.85+ctx_c,
		// 				ty = arr[i].y_*.85+ctx_c;
		// 	roundedRectangle(ctx, tx-13,ty-9,26,16,8);
		// 	ctx.fill();
		// }
	
		//원형
		// ctx.fillStyle = '#fff';
		// for(let i = 0; i < 7; ++i){
		// 	ctx.beginPath();
		// 	ctx.fillStyle = st_c[i];
		// 	ctx.arc(arr[i].x,arr[i].y,2.5,0,Math.PI*2);
		// 	ctx.fill();
		// }
		// ctx.restore();
	
		//글씨
		// ctx.beginPath();
		// ctx.font = '11px Arial';
		// ctx.textAlign = 'center';
		// ctx.textBaseline = 'middle';
		// ctx.fillStyle = '#fff';
		// for(let i = 0; i < 7; ++i){
		// 	const tx = arr[i].x_*.85+ctx_c,
		// 				ty = arr[i].y_*.85+ctx_c;
		// 	ctx.fillText(st_t[i],tx,ty);
		// }
	
		// ctx.beginPath();
		// ctx.font = '13px Arial';
		// ctx.fillStyle = '#f60';
		// ctx.textAlign = 'center';
		// for(let i = 0; i < 7; ++i){
		//   ctx.fillText(st[i],arr[i].x,arr[i].y);//능력치 글씨
		// }
	}, [graphRef]);
  return (
		<>
			<GachaWrap className="gacha_wrap" backImg={imgBack} >
				<GachaMenu gachaMode={gachaMode} className="gacha_menu transition">
					{gachaList && gachaList.map((data, idx) => {
						return (
							<li key={idx} onClick={() => {handleModal('confirm', idx);}}>
								<GachaMenuButton>{`${data.na} Gacha`}
									<GachaIcon className={`price ${data.type.indexOf('p') < 0 ? 'gold' : 'dia'}`} icoType={data.type.indexOf('p') < 0 ? iconGold : iconDiamod}>{data.price}</GachaIcon>
								</GachaMenuButton>
							</li>
						);
					})}
				</GachaMenu>
				<GachaArea className="gacha_area">
					<GachaCards ref={cardGroupRef} className="cards">
						{gachaMode === 'start' && gachaCard && gachaCard.map((data, idx) => {
							const chData = gameData.ch[data.idx];
							const star = data.grade;
							return (
								<GachaCard onClick={() => {
									setInfoIdx(data.idx);
									infoRef.current.classList.add('on');
									popCard(gameData.ch[infoIdx]);
									setCardStateType(gameData.stateType[saveData.ch[data.slotIdx].stateType].na);
									setCardStar(data.grade);
								}} ref={(element) => {cardRef.current[idx] = element}} key={`gachaCard${idx}`} posX={data.posX} posY={data.posY} rotate={data.rotate} className="card ready" data-grade={chData.grade}>
									<GachaFront className="front" idx={data.idx} gameData={gameData}>
										<ul>
											<CardLvName className="name_lv" cardLv={imgCardLv}>
												<Img className="img" imgurl={iconCardName} />
								 				<span className="lv">1</span><span className="name">{chData.na1}</span>
								 			</CardLvName>
											<CardDisplay className="ch" chDisplay={imgSet.chImg[`ch${chData.display}`]} />
								 			<CardStyle className="ch_style" styleDisplay={imgSet.chStyleImg[`ch_style${chData.style}`]} />
								 			<CardRing className="ring" ringBack={imgRingBack}></CardRing>
								 			<CardElement className="element" ringDisplay={imgSet.ringImg[chData.element]} />
								 			<CardStar className="star" starIcon={iconStar}>
											 	{star && makeStar(star)}
											</CardStar>
								 			<CardFrame className="frame" cardFrame={imgCardFrame} />
										</ul>
									</GachaFront>
									<GachaBack cardBack={imgCardBack} className="back" />
								</GachaCard>
							);
						})}
					</GachaCards>
					<GachaBg gachaMode={gachaMode} className="bg" />
					<GachaEffect ref={effectRef} className="effect"/>
					<GachaEventArea ref={eventRef} onClick={() => {
						openCard(cardRef.current, openCardIdx.current);
						openCardIdx.current ++;
						if (!cardRef.current[openCardIdx.current]) {
							eventRef.current.classList.remove('on');
							// awb.main.el.root.classList.remove('noback');
							cardGroupRef.current.classList.add('cardMode');
						}
					}}/>
				</GachaArea>
				<GachaInfo ref={infoRef} onClick={() => {
					infoRef.current.classList.remove('on');
				}} className="gacha_info">
					<GachaInfoCard className="ch_card">
						<Img imgurl={imgRing} />
						<ul className="ch_detail">
							<CardLvName className="name_lv" cardLv={imgCardLv}>
								<Img className="img" imgurl={iconCardName} />
								<span className="lv">1</span><span className="name_">{gameData.ch[infoIdx].na}</span><span className="name">{gameData.ch[infoIdx].na1}</span>
							</CardLvName>
							<CardDisplay className="ch" chDisplay={imgSet.chImg[`ch${gameData.ch[infoIdx].display}`]} />
							<CardStyle className="ch_style" styleDisplay={imgSet.chStyleImg[`ch_style${gameData.ch[infoIdx].style}`]} />
							<CardRing className="ring" ringBack={imgRingBack}></CardRing>
							<CardElement className="element" ringDisplay={imgSet.ringImg[gameData.ch[infoIdx].element]} />
							<CardStar  type={'open'} className="star" starIcon={iconStar}>
								{cardStar && makeStar(cardStar)}
							</CardStar>
							<CardFrame className="frame" cardFrame={imgCardFrame} />
						</ul>
					</GachaInfoCard>
					<GachaInGraph className="ch_graph">
						<canvas ref={graphRef}></canvas>
					</GachaInGraph>
					<div className="ch_state scroll-y">
						<ul>
							<li>
								<dl>
									<dt>State (능력치)</dt>
									<dd>
											<span className="st st0">{`${gameData.ch[infoIdx].st0} (${gameData.stateName[0]})`} </span>
											<span className="st st1">{`${gameData.ch[infoIdx].st1} (${gameData.stateName[1]})`} </span>
											<span className="st st2">{`${gameData.ch[infoIdx].st2} (${gameData.stateName[2]})`} </span>
											<span className="st st3">{`${gameData.ch[infoIdx].st3} (${gameData.stateName[3]})`} </span>
											<span className="st st4">{`${gameData.ch[infoIdx].st4} (${gameData.stateName[4]})`} </span>
											<span className="st st5">{`${gameData.ch[infoIdx].st5} (${gameData.stateName[5]})`} </span>
											<span className="st st6">{`${gameData.ch[infoIdx].st6} (${gameData.stateName[6]})`} </span>
									</dd>
								</dl>
							</li>
							<li>
								<dl>
									<dt>Growth (성장)</dt>
									<dd><span>{cardStateType}</span></dd>
								</dl>
							</li>
							<li>
								<dl>
									<dt>Relation (인연)</dt>
									<dd>
										{gameData.ch[infoIdx].relation && gameData.ch[infoIdx].relation.map((data, idx) => {
											return (
												<span key={idx}>{gameData.relation[data.idx].na}</span>
											);
										})}
									</dd>
								</dl>
							</li>
							<li>
								<dl>
									<dt>Skill (스킬)</dt>
									<dd><span>스킬1</span></dd>
								</dl>
							</li>
						</ul>
					</div>
				</GachaInfo>
			</GachaWrap>
			<ModalContainer>
				{modalOn && <Modal fn={changeGachaMode} type={modalType} dataObj={modalInfo} saveData={saveData} changeSaveData={changeSaveData} onClose={() => {handleModal()}} gameData={gameData}/>}
			</ModalContainer>
		</>
  );
}

export default Gacha;
