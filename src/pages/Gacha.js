import { AppContext } from 'App';
import { Button } from 'components/Button';
import { Prices } from 'components/Components';
import { FlexBox } from 'components/Container';
import { ChPic } from 'components/ImagePic';
import { util } from 'components/Libs';
import Modal from 'components/Modal';
import ModalContainer from 'components/ModalContainer';
import 'css/gacha.css';
import CharacterCard from 'pages/CharacterCard';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Img = styled.img.attrs(
  ({imgurl}) => ({
    src: imgurl 
  })
)``;
const GachaWrap = styled(FlexBox)`
	position: relative;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	overflow: hidden;
`;
const GachaMenu = styled.ul`
	padding: 0 20px;
	flex-grow: 0;
	overflow: hidden;
	height: ${({gachaMode}) => {
		return gachaMode === ('start' || 'card') ? 0 : 'auto';
	}};
	li {
		margin: 0 0 10px 0;
		&:last-of-type{
			margin: 0;
		}
	}
`;
const GachaArea = styled.div`
	position: relative;
	width: 100%;
	height: calc(100% - 50px);
`;
const GachaEffect = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	&:before {
		content: '';
		display: block;
		width: 100%;
		height: 100%;
		opacity: 0;
		transition: opacity linear 1s;
	}
	background: radial-gradient(hsl(9, 100%, 27%) 4%, hsl(9, 100%, 18%) 9%, hsla(9, 100%, 20%, 0) 9%) 0 0, radial-gradient(hsl(9, 100%, 27%) 4%, hsl(9, 100%, 18%) 8%, hsla(9, 100%, 20%, 0) 10%) 50px 50px, radial-gradient(hsla(9, 100%, 30%, 0.8) 20%, hsla(9, 100%, 20%, 0)) 50px 0, radial-gradient(hsla(9, 100%, 30%, 0.8) 20%, hsla(9, 100%, 20%, 0)) 0 50px, radial-gradient(hsla(9, 100%, 20%, 1) 35%, hsla(9, 100%, 20%, 0) 60%) 50px 0, radial-gradient(hsla(9, 100%, 20%, 1) 35%, hsla(9, 100%, 20%, 0) 60%) 100px 50px, radial-gradient(hsla(9, 100%, 15%, 0.7), hsla(9, 100%, 20%, 0)) 0 0, radial-gradient(hsla(9, 100%, 15%, 0.7), hsla(9, 100%, 20%, 0)) 50px 50px, linear-gradient(45deg, hsla(9, 100%, 20%, 0) 49%, hsla(9, 100%, 0%, 1) 50%, hsla(9, 100%, 20%, 0) 70%) 0 0, linear-gradient(-45deg, hsla(9, 100%, 20%, 0) 49%, hsla(9, 100%, 0%, 1) 50%, hsla(9, 100%, 20%, 0) 70%) 0 0;
	background-color: #300;
	background-size: 100px 100px;
	&.grade6:before {
		opacity: 1;
		background: radial-gradient(hsl(30, 100%, 27%) 4%, hsl(30, 100%, 18%) 9%, hsla(30, 100%, 20%, 0) 9%) 0 0, radial-gradient(hsl(30, 100%, 27%) 4%, hsl(30, 100%, 18%) 8%, hsla(30, 100%, 20%, 0) 10%) 50px 50px, radial-gradient(hsla(30, 100%, 30%, 0.8) 20%, hsla(30, 100%, 20%, 0)) 50px 0, radial-gradient(hsla(30, 100%, 30%, 0.8) 20%, hsla(30, 100%, 20%, 0)) 0 50px, radial-gradient(hsla(30, 100%, 20%, 1) 35%, hsla(30, 100%, 20%, 0) 60%) 50px 0, radial-gradient(hsla(30, 100%, 20%, 1) 35%, hsla(30, 100%, 20%, 0) 60%) 100px 50px, radial-gradient(hsla(30, 100%, 15%, 0.7), hsla(30, 100%, 20%, 0)) 0 0, radial-gradient(hsla(30, 100%, 15%, 0.7), hsla(30, 100%, 20%, 0)) 50px 50px, linear-gradient(45deg, hsla(30, 100%, 20%, 0) 49%, hsla(30, 100%, 0%, 1) 50%, hsla(30, 100%, 20%, 0) 70%) 0 0, linear-gradient(-45deg, hsla(30, 100%, 20%, 0) 49%, hsla(30, 100%, 0%, 1) 50%, hsla(30, 100%, 20%, 0) 70%) 0 0;
		background-color: #300;
		background-size: 100px 100px;
	}
	&.grade5:before {
		opacity: 1;
		background: radial-gradient(hsl(279, 100%, 27%) 4%, hsl(279, 100%, 18%) 9%, hsla(279, 100%, 20%, 0) 9%) 0 0, radial-gradient(hsl(279, 100%, 27%) 4%, hsl(279, 100%, 18%) 8%, hsla(279, 100%, 20%, 0) 10%) 50px 50px, radial-gradient(hsla(279, 100%, 30%, 0.8) 20%, hsla(279, 100%, 20%, 0)) 50px 0, radial-gradient(hsla(279, 100%, 30%, 0.8) 20%, hsla(279, 100%, 20%, 0)) 0 50px, radial-gradient(hsla(279, 100%, 20%, 1) 35%, hsla(279, 100%, 20%, 0) 60%) 50px 0, radial-gradient(hsla(279, 100%, 20%, 1) 35%, hsla(279, 100%, 20%, 0) 60%) 100px 50px, radial-gradient(hsla(279, 100%, 15%, 0.7), hsla(279, 100%, 20%, 0)) 0 0, radial-gradient(hsla(279, 100%, 15%, 0.7), hsla(279, 100%, 20%, 0)) 50px 50px, linear-gradient(45deg, hsla(279, 100%, 20%, 0) 49%, hsla(279, 100%, 0%, 1) 50%, hsla(279, 100%, 20%, 0) 70%) 0 0, linear-gradient(-45deg, hsla(279, 100%, 20%, 0) 49%, hsla(279, 100%, 0%, 1) 50%, hsla(279, 100%, 20%, 0) 70%) 0 0;
		background-color: #300;
		background-size: 100px 100px;
	}
	&.grade4:before {
		opacity: 1;
		background: radial-gradient(hsl(57, 100%, 27%) 4%, hsl(57, 100%, 18%) 9%, hsla(57, 100%, 20%, 0) 9%) 0 0, radial-gradient(hsl(57, 100%, 27%) 4%, hsl(57, 100%, 18%) 8%, hsla(57, 100%, 20%, 0) 10%) 50px 50px, radial-gradient(hsla(57, 100%, 30%, 0.8) 20%, hsla(57, 100%, 20%, 0)) 50px 0, radial-gradient(hsla(57, 100%, 30%, 0.8) 20%, hsla(57, 100%, 20%, 0)) 0 50px, radial-gradient(hsla(57, 100%, 20%, 1) 35%, hsla(57, 100%, 20%, 0) 60%) 50px 0, radial-gradient(hsla(57, 100%, 20%, 1) 35%, hsla(57, 100%, 20%, 0) 60%) 100px 50px, radial-gradient(hsla(57, 100%, 15%, 0.7), hsla(57, 100%, 20%, 0)) 0 0, radial-gradient(hsla(57, 100%, 15%, 0.7), hsla(57, 100%, 20%, 0)) 50px 50px, linear-gradient(45deg, hsla(57, 100%, 20%, 0) 49%, hsla(57, 100%, 0%, 1) 50%, hsla(57, 100%, 20%, 0) 70%) 0 0, linear-gradient(-45deg, hsla(57, 100%, 20%, 0) 49%, hsla(57, 100%, 0%, 1) 50%, hsla(57, 100%, 20%, 0) 70%) 0 0;
		background-color: #300;
		background-size: 100px 100px;
	}
	&.grade3:before {
		opacity: 1;
		background: radial-gradient(hsl(206, 100%, 27%) 4%, hsl(206, 100%, 18%) 9%, hsla(206, 100%, 20%, 0) 9%) 0 0, radial-gradient(hsl(206, 100%, 27%) 4%, hsl(206, 100%, 18%) 8%, hsla(206, 100%, 20%, 0) 10%) 50px 50px, radial-gradient(hsla(206, 100%, 30%, 0.8) 20%, hsla(206, 100%, 20%, 0)) 50px 0, radial-gradient(hsla(206, 100%, 30%, 0.8) 20%, hsla(206, 100%, 20%, 0)) 0 50px, radial-gradient(hsla(206, 100%, 20%, 1) 35%, hsla(206, 100%, 20%, 0) 60%) 50px 0, radial-gradient(hsla(206, 100%, 20%, 1) 35%, hsla(206, 100%, 20%, 0) 60%) 100px 50px, radial-gradient(hsla(206, 100%, 15%, 0.7), hsla(206, 100%, 20%, 0)) 0 0, radial-gradient(hsla(206, 100%, 15%, 0.7), hsla(206, 100%, 20%, 0)) 50px 50px, linear-gradient(45deg, hsla(206, 100%, 20%, 0) 49%, hsla(206, 100%, 0%, 1) 50%, hsla(206, 100%, 20%, 0) 70%) 0 0, linear-gradient(-45deg, hsla(206, 100%, 20%, 0) 49%, hsla(206, 100%, 0%, 1) 50%, hsla(206, 100%, 20%, 0) 70%) 0 0;
		background-color: #300;
		background-size: 100px 100px;
	}
`;
const GachaOrder = styled(FlexBox)`
	position: relative;
	height: 50px;
	width: 100%;
	background-color: var(--color-b);
`;
const StyledButton = styled(Button)`
  background: url(${({btnImg}) => btnImg}) no-repeat center center !important;
  background-size: 100% 100% !important;
`;
const GachaMenuButton = styled.button`
	display: block;
	padding: 10px 0;
	width: 100%;
	background: rgba(255,255,255,.5);
	color: #000;
	border-radius: 20px;
	text-align: center;
	.menu {
		padding: 0 20px;
	}
`;
const GachaCard = styled.div`
	position: absolute;
	transform-origin: 50% 50%;
	padding-top: ${30*1.481}%;
	width: 30%;
	transition: opacity linear 0.3s;
	opacity: 0;
	z-index: 1;
	&.on {
		opacity: 1;
	}
	&.open {
		.gacha_front{
			opacity: 1;
		}
		.gacha_back{
			opacity: 0;
		}
	}
	&.special {
		.gacha_front{
			opacity: 1;
		}
		.gacha_back{
			opacity: 0;
		}
		&:before {
			content:'';
			position:absolute;
			left:50%;
			top:50%;
			padding-top:500%;
			width:500%;
			transform:translate(-50%,-50%) scale(0);
			background-image:radial-gradient(rgba(255,100,0,.7) 0%,rgba(255,210,0,.8) 40%,transparent 80%);
			background-size:100%;
			animation:sp_eff1 3s;
			transform-origin:center;
			z-index:10;
		}
		&:after {
			content:'';
			position:absolute;
			left:50%;
			top:50%;
			padding-top:500%;
			width:500%;
			transform:translate(-50%,-50%) scale(0);
			background-image:radial-gradient(rgba(255,255,255,1) 0%, rgba(200,25,0,.4) 50%,transparent 80%);
			background-size:100%;
			animation:sp_eff2 3s;
			transform-origin:center;
			z-index:10;
		}
	}
`;
const GachaShadow = styled.div`
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	border-radius: 5%;
	overflow: hidden;
	pointer-events: none;
	box-shadow:${({gameData, cardIdx}) => {
		const grade = gameData.ch[cardIdx].grade;
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
const GachaFront = styled.div`
	position:absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	transition: opacity linear .5s;
	opacity: 0;
	background: #000;
	pointer-events: none;
`;
const GachaBack = styled(ChPic)`
	position:absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	overflow:hidden;
	transition: opacity linear .5s;
	opacity: 1;
	pointer-events: none;
`;
const GachaInfo = styled.div`
	.ch_state{border-image:url(${({ borderImg }) => borderImg}) 5 round;}
`;

const makeCard = (num, gachaType, gameData, saveData, changeSaveData) => { //가챠횟수
	const beginType = typeof num !== 'number'; //최초 시작상태 체크
  const getCardIdx = (gradeNum) => {
		const chOfGrade = gameData.chArr.grade;//등급별
    const length = chOfGrade[gradeNum].length,
          ran = Math.floor(Math.random() * length);
    return chOfGrade[gradeNum][ran];
  }
	const getGrade = (n, type) => {
    let ch_arr = [];
		if (beginType) {
			ch_arr = num;
		} else {
			const arr = type === 'p' ? [3,10,21,38] : [2,6,15,30,50,75]; // 다이아 & 골드 등급 나올확률값
			//1, 3, 10, 15
			//0.1, 0.3, 1, 5, 20, 25
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
	const recruitmentNum = beginType ? num.length : num;// 뽑는 횟수
	const cardGrade = getGrade(recruitmentNum, gachaType);
	for (let i = 0; i < recruitmentNum; ++i) {
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
		const animalAction = gameData.animal_type[gameData.ch[newIdx].animal_type].actionType,
			actionType = animalAction[Math.floor(Math.random() * animalAction.length)];
		const jobs = gameData.ch[newIdx].job,
			job = jobs[Math.floor(Math.random() * jobs.length)];
		chArr.push({
			idx: newIdx,
			grade: cardG,
			slotIdx: saveData.ch.length + i,
		});
		chDataArr.push(util.saveLvState('', {
			itemEff: util.getItemEff(),
			grade: cardG,
			newState: {
				actionPoint: 25,
				actionMax: Math.floor(gameData.ch[newIdx].st1 / 3 + gameData.ch[newIdx].st6 / 3),
				pointTime: 25*5*60,//5분, 초단위로 변환
				stateLuk: Math.round(Math.random() * 200),
				element: gameData.ch[newIdx].element,
				actionType: actionType,
				newActionType : [actionType],
				job: job,
				exp: 0,
				hasExp: 0,
				battleBeige:[0,0,0,0],
				animalBeige:0,//총 보유 동물뱃지
				grade: cardG,
				mark: Math.round(Math.random()*2),//동물뱃지 추가보유여부(상점에서 exp로 구입가능)
				idx: newIdx,
				items: [{}, {}, {}, {}, {}, {}, {}, {}],
				lv: 50,
				sk: [{idx: 1, lv: 1, exp: 0,},{idx: 2, lv: 1, exp: 0,},],
				animalSkill:[],
				hasSkill: [{idx: 1, lv: 1, exp: 0,},{idx: 2, lv: 1, exp: 0,},],
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

const Gacha = ({
	saveData,
	changeSaveData,
}) => {
  const navigate = useNavigate();
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
  const paramData = React.useMemo(() => {
    return util.loadData('historyParam');
  }, []);
	const [gachaMode, setGachaMode] = useState('');
	// const [cardStar, setCardStar] = useState(0); //카드 성장타입
	const setTimeCard = useRef({}); //타임아웃 ref
	const setTimeEffect = useRef(null); //타임아웃 ref
	const maxCardGrade = useRef(null); //뽑은 카드 최대등급
	const effectRef = useRef(null); // 이펙트 효과
	const cardGroupRef = useRef(null); //카드 그룹
	const infoRef = useRef(null); //카드 정보창
	const graphRef = useRef(null); //카드정보 그래프
	const cardRef = useRef([]); //단일 카드
	const [infoIdx, setInfoIdx] = useState(0); //카드정보 카드번호
	const [slotIdx, setSlotIdx] = useState(0); //카드 슬롯번호
	const [step, setStep] = useState(0); //진행단계
	const changeGachaMode = (mode, data, saveData, gameData, changeSaveData) => {
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
	useEffect(() => {
		if (Object.keys(saveData).length !== 0 && gachaMode === '') {
			setGachaMode('init');
		}
	}, [saveData, gachaMode]);
	useEffect(() => {
		return () => { 
			clearTimeout(setTimeCard.current);
			setTimeCard.current = null;
			clearTimeout(setTimeEffect.current);
			setTimeEffect.current = null;
		}
	}, []);
	const animate = (el, idx) => {
		if (idx === el.length) {
			setTimeEffect.current  = setTimeout(() => {
				setStep(1);
				effectRef.current.classList.add('grade' + maxCardGrade.current);
			}, 300);
		} else {
			setTimeCard.current = setTimeout(() => {
				el[idx].classList.add('on');
				animate(el, idx + 1);
			}, 300); 
		}
	}
	useEffect(() => {
		if (Object.keys(saveData).length > 0) {
			if (paramData.recruitment.begin) {
				const sData = {...saveData};
				const startingGrade = paramData.recruitment.cardArr; //최초 시작 영웅들 등급
				const cardList = makeCard(startingGrade, 'p', gameData, saveData, changeSaveData);
				cardList.chDataArr.forEach((data, idx) => {
					sData.ch.push(data);
				});
				changeSaveData(sData); //세이브
				maxCardGrade.current = cardList.maxCard;
				setGachaCard(cardList.chArr);
				//setGachaMode('start');

				const gachaLength = paramData.recruitment.cardArr.length;
				const beginCheck = paramData.recruitment.begin ? `begin${gachaLength}` : 'pos';
				cardGroupRef.current.classList.add(beginCheck);
				setTimeCard.current = setTimeout(() => {
					animate(cardRef.current, 0);
				}, 300);
			}
		} else {
			setTimeout(() => {
				navigate('../');
			});
		}
	}, [gameData, paramData]);
  const [modalOn, setModalOn] = useState(false);
	const [modalInfo, setModalInfo] = useState({});
  const [modalType, setModalType] = useState();
	const gachaList = [
		{na:{ko:'프리미엄 뽑기 10',en:'Premium 10'}, num:10},
		{na:{ko:'프리미엄 뽑기',en:'Premium 1'}, num:1},
		{na:{ko:'골드 뽑기 10',en:'Normal 10'}, num:10},
		{na:{ko:'골드 뽑기',en:'Normal 1'}, num: 1},
	];
	const [gachaCard, setGachaCard] = useState([]);
	const handleModal = (modalType, gachaIdx) => {
		setModalOn(true);
    if( modalType ){
			const price = gameData.prices.gacha.draw[gachaIdx][0].price;
			const num = gachaList[gachaIdx].num;
			const gachaType = gameData.prices.gacha.draw[gachaIdx][0].type;
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
			<GachaWrap direction="column" className="gacha_wrap">
				{!paramData.recruitment.begin && <GachaMenu gachaMode={gachaMode} className="transition">
					{gachaList.map((data, idx) => {
						return (
							<li key={idx} onClick={() => {handleModal('confirm', idx);}}>
								<GachaMenuButton className="gacha_menu_button">{`${data.na[lang]}`}
									{gachaMode === 'init' && <Prices style={{marginLeft:'10px'}} payment={gameData.prices.gacha.draw[idx]} imgSet={imgSet} saveData={saveData} gameData={gameData}/>}
								</GachaMenuButton>
							</li>
						);
					})}
				</GachaMenu>}
				<GachaArea>
					<div ref={cardGroupRef} className="gacha_cards">
						{gachaCard.map((data, idx) => {
							return (
								<GachaCard onClick={(e) => {
									if (step === 2) {
										setInfoIdx(data.idx);
										setSlotIdx(data.slotIdx);
										infoRef.current.classList.add('on');
										popCard(gameData.ch[infoIdx]);
									} else {//카드 열기
										const cardGrade = gameData.ch[data.idx].grade;
										if (cardGrade > 5) {
											e.target.classList.add('special');
										} else {
											e.target.classList.add('open');
										}
										let openCardNum = 0;
										cardRef.current.forEach((el) => {
											if (el.classList.contains('open') || el.classList.contains('special')) {
												openCardNum ++;
											}
										});
										if (openCardNum === cardRef.current.length) {
											setStep(2);
										}
										// setCardStar(data.grade);
									}
								}} ref={(element) => {cardRef.current[idx] = element}} key={`gachaCard${idx}`} className="gacha_card">
									<GachaFront className="gacha_front">
          					<CharacterCard usedType="gacha" saveData={saveData} slotIdx={idx} />
									</GachaFront>
									<GachaBack className="gacha_back" type="cardBack" pic="card" idx={2} />
									<GachaShadow cardIdx={data.idx} gameData={gameData} />
								</GachaCard>
							);
						})}
					</div>
					<GachaEffect ref={effectRef}/>
				</GachaArea>
				<GachaOrder>
					{step === 1 && <StyledButton btnImg={imgSet.button.btnMD} onClick={() => {
						cardRef.current.forEach((el, idx) => {
							const data = gachaCard[idx];
							const cardGrade = gameData.ch[data.idx].grade;
							if (cardGrade > 5) {
								el.classList.add('special');
							} else {
								el.classList.add('open');
							}
							setStep(2);
						})
          }}>{gameData.msg.button['flipAllCards'][lang]}</StyledButton>}
					{step === 2 && (
						<>
							<StyledButton btnImg={imgSet.button.btnMD} onClick={() => {
								cardRef.current.forEach((el) => {
									el.classList.remove('special');
									el.classList.remove('open');
								});
								const sData = {...saveData}
								sData.ch = [];
								const startingGrade = paramData.recruitment.cardArr; //최초 시작 영웅들 등급
								const cardList = makeCard(startingGrade, 'p', gameData, saveData, changeSaveData);
								setTimeout(() => {
									cardList.chDataArr.forEach((data, idx) => {
										sData.ch.push(data);
									});
									changeSaveData(sData); //세이브
									maxCardGrade.current = cardList.maxCard;
									setGachaCard(cardList.chArr);
									setGachaMode('start');

									setStep(1);
								}, 500);
							}}>{gameData.msg.button['redraw'][lang]}</StyledButton>
							<StyledButton btnImg={imgSet.button.btnMD} onClick={() => {
								const startingGrade = paramData.recruitment.cardArr; //최초 시작 영웅들 등급
								util.saveData('historyParam', {
									...util.loadData('historyParam'),
									start: {
										card: gachaCard,
										chArr: startingGrade,
										selectType: paramData.recruitment.selectType,
										language: paramData.recruitment.language,
										country: paramData.recruitment.country
									}
								});
								navigate('../start');
							}}>{gameData.msg.button['finalize'][lang]}</StyledButton>
						</>
					)}
				</GachaOrder>
				<GachaInfo ref={infoRef} onClick={() => {
					infoRef.current.classList.remove('on');
				}} className="gacha_info" borderImg={imgSet.etc.frameChBack}>
					<div className="gacha_ch_card">
						<Img imgurl={imgSet.images.transparent800} />
						<CharacterCard usedType="gacha" saveData={saveData} slotIdx={infoIdx} />
						{/* <ul className="ch_detail">
							<CardLvName className="gacha_name_lv" cardLv={imgSet.etc.imgCardLv}>
								<Img className="img" imgurl={imgSet.etc.iconCardName} />
								<span className="lv">1</span><span className="name_">{gameData.ch[infoIdx].na}</span><span className="name">{gameData.ch[infoIdx].na1}</span>
							</CardLvName>
							<CardDisplay>
								<ChPic pic="ch" idx={gameData.ch[infoIdx].display} />
							</CardDisplay>
							<CardRing className="gacha_ring">
								<ChPic type="cardBack" pic="card" idx={0} />
							</CardRing>
							<CardElement className="gacha_element" ringDisplay={imgSet.ringImg[gameData.ch[infoIdx].element]} />
							<CardStar type={'open'} className="gacha_star" starIcon={iconStar}>
								{cardStar && makeStar(cardStar)}
							</CardStar>
							<div className="gacha_job_actiontype">
								<CardJob className="gacha_job">
									<IconPic type="job" isAbsolute={true} pic="icon100" idx={saveData.ch[slotIdx]?.job} />
								</CardJob>
								{saveData.ch[slotIdx]?.newActionType.map((data, idx) => {
									return (
										<CardActionType key={'action'+idx} className="gacha_action_type">
											<IconPic type="element" isAbsolute={true} pic="icon100" idx={idx + 1} />
										</CardActionType>
									)
								})}
							</div>
							<CardFrame className="gacha_frame" cardFrame={imgSet.etc.imgCardFrame} />
						</ul> */}
					</div>
					<div className="gacha_ch_graph">
						<canvas ref={graphRef}></canvas>
					</div>
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
									<dt>Relation (인연)</dt>
									<dd>
										{gameData.ch[infoIdx].relation && gameData.ch[infoIdx].relation.map((data, idx) => {
											return (
												<span key={idx}>{gameData.relation[data].na[lang]}</span>
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
				{modalOn && <Modal fn={changeGachaMode} type={modalType} dataObj={modalInfo} saveData={saveData} changeSaveData={changeSaveData} onClose={() => {
					setModalOn(false);
				}} gameData={gameData}/>}
			</ModalContainer>
		</>
  );
}

export default Gacha;
