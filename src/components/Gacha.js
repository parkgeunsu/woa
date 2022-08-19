import { AppContext } from 'App';
import { util } from 'components/Libs';
import Modal from 'components/Modal';
import ModalContainer from 'components/ModalContainer';
import React, { useCallback, useContext, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import 'css/gacha.css';

const Img = styled.img.attrs(
  ({imgurl}) => ({
    src: imgurl 
  })
)``;
const GachaWrap = styled.div`
	background:url(${({backImg}) => backImg});background-size:cover;
`;
const GachaMenu = styled.ul`
	height: ${({gachaMode}) => {
		return gachaMode === ('start' || 'card') ? 0 : 'auto';
	}};
`;
const GachaMenuButton = styled.button``;
const GachaIcon = styled.span`
	background:url(${({ icoType }) => icoType}) no-repeat left center;background-size:20px;
`;
const GachaCard = styled.div`
	left: ${({posX}) => posX}%;
	top: ${({posY}) => posY}%;
	padding-top: ${30*1.481}%;
	transform: translate(-50%,-50%) rotateX(45deg) rotateZ(${({rotate}) => rotate}deg);
`;
const CardLvName = styled.li`
	&:after{background-image:url(${({cardLv}) => cardLv});background-size:contain;}
`;
const CardDisplay = styled.li`
	background-image:url(${({chDisplay}) => chDisplay});
	background-size:100%;
`;
const CardElement = styled.li`
	background-image:url(${({ringDisplay}) => ringDisplay});
	background-size:100%;
`;
const CardStar = styled.li`
	height:${({type}) => {
		return (
			type === 'open' ? 'height:25px' : 'height:12px'
		);
	}};
	span{
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
	background-image:url(${({ringBack}) => ringBack});
	background-size:85%;
`;
const CardFrame = styled.li`
	background:url(${({cardFrame}) => cardFrame});
	background-size:100% 100%;
`;
const GachaFront = styled.div`
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
	background:url(${({cardBack}) => cardBack}) no-repeat center center;background-size:100%;
`;
const GachaInfo = styled.div`
	.ch_state{border-image:url(${({ borderImg }) => borderImg}) 5 round;}
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
				stateLuk: Math.round(Math.random() * 200),
				element: gameData.ch[newIdx].element,
				exp: 0,
				hasExp: 0,
				battleBeige:[0,0,0,0],
				animalBeige:0,//총 보유 동물뱃지
				grade: cardG,
				mark: Math.round(Math.random()*2),//동물뱃지 추가보유여부(상점에서 exp로 구입가능)
				idx: newIdx,
				items: [{}, {}, {}, {}, {}, {}, {}, {}],
				lv: 1,
				sk: [{idx: 1, lv: 1, exp: 0,},{idx: 2, lv: 1, exp: 0,},],
				hasSkill: [{idx: 1, lv: 1, exp: 0,},{idx: 2, lv: 1, exp: 0,},],
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
	const setting = useContext(AppContext).setting,
    lang = setting.lang;
	const iconStar = [imgSet.iconStar[0], imgSet.iconStar[1], imgSet.iconStar[2], imgSet.iconStar[3], imgSet.iconStar[4], imgSet.iconStar[5], imgSet.iconStar[6]]
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
			<GachaWrap className="gacha_wrap" backImg={imgSet.back[3]} >
				<GachaMenu gachaMode={gachaMode} className="gacha_menu transition">
					{gachaList && gachaList.map((data, idx) => {
						return (
							<li key={idx} onClick={() => {handleModal('confirm', idx);}}>
								<GachaMenuButton className="gacha_menu_button">{`${data.na} Gacha`}
									<GachaIcon className={`price ${data.type.indexOf('p') < 0 ? 'gold' : 'dia'}`} icoType={data.type.indexOf('p') < 0 ? imgSet.icon.iconGold : imgSet.icon.iconDia}>{data.price}</GachaIcon>
								</GachaMenuButton>
							</li>
						);
					})}
				</GachaMenu>
				<div className="gacha_area">
					<div ref={cardGroupRef} className="gacha_cards">
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
								}} ref={(element) => {cardRef.current[idx] = element}} key={`gachaCard${idx}`} posX={data.posX} posY={data.posY} rotate={data.rotate} className="gacha_card ready" data-grade={chData.grade}>
									<GachaFront className="gacha_front" idx={data.idx} gameData={gameData}>
										<ul>
											<CardLvName className="gacha_name_lv" cardLv={imgSet.etc.imgCardLv}>
												<Img className="img" imgurl={imgSet.etc.iconCardName} />
								 				<span className="lv">1</span><span className="name">{chData.na1}</span>
								 			</CardLvName>
											<CardDisplay className="gacha_ch" chDisplay={imgSet.chImg[`ch${chData.display}`]} />
								 			<CardRing className="gacha_ring" ringBack={imgSet.etc.imgRingBack}></CardRing>
								 			<CardElement className="gacha_element" ringDisplay={imgSet.ringImg[chData.element]} />
								 			<CardStar className="gacha_star" starIcon={iconStar}>
											 	{star && makeStar(star)}
											</CardStar>
								 			<CardFrame className="gacha_frame" cardFrame={imgSet.etc.imgCardFrame} />
										</ul>
									</GachaFront>
									<GachaBack className="gacha_back" cardBack={imgSet.etc.imgCardBack}/>
								</GachaCard>
							);
						})}
					</div>
					<div className={`gacha_bg ${gachaMode === "start" ? "start" : ""}`}></div>
					<div ref={effectRef} className="gacha_effect"></div>
					<div className="gacha_event_area" ref={eventRef} onClick={() => {
						openCard(cardRef.current, openCardIdx.current);
						openCardIdx.current ++;
						if (!cardRef.current[openCardIdx.current]) {
							eventRef.current.classList.remove('on');
							// awb.main.el.root.classList.remove('noback');
							cardGroupRef.current.classList.add('cardMode');
						}
					}}></div>
				</div>
				<GachaInfo ref={infoRef} onClick={() => {
					infoRef.current.classList.remove('on');
				}} className="gacha_info" borderImg={imgSet.etc.frameChBack}>
					<div className="gacha_ch_card">
						<Img imgurl={imgSet.etc.imgRing} />
						<ul className="ch_detail">
							<CardLvName className="gacha_name_lv" cardLv={imgSet.etc.imgCardLv}>
								<Img className="img" imgurl={imgSet.etc.iconCardName} />
								<span className="lv">1</span><span className="name_">{gameData.ch[infoIdx].na}</span><span className="name">{gameData.ch[infoIdx].na1}</span>
							</CardLvName>
							<CardDisplay className="gacha_ch" chDisplay={imgSet.chImg[`ch${gameData.ch[infoIdx].display}`]} />
							<CardRing className="gacha_ring" ringBack={imgSet.etc.imgRingBack}></CardRing>
							<CardElement className="gacha_element" ringDisplay={imgSet.ringImg[gameData.ch[infoIdx].element]} />
							<CardStar type={'open'} className="gacha_star" starIcon={iconStar}>
								{cardStar && makeStar(cardStar)}
							</CardStar>
							<CardFrame className="gacha_frame" cardFrame={imgSet.etc.imgCardFrame} />
						</ul>
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
				{modalOn && <Modal fn={changeGachaMode} type={modalType} dataObj={modalInfo} saveData={saveData} changeSaveData={changeSaveData} onClose={() => {handleModal()}} gameData={gameData}/>}
			</ModalContainer>
		</>
  );
}

export default Gacha;
