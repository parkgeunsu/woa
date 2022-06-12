import React, { useRef, useState, useContext, useLayoutEffect, useCallback } from 'react';
import { AppContext } from 'App';
import styled from 'styled-components';
import { util } from 'components/Libs';

import imgBack from 'images/back/back1.jpg';
import imgRingBack from 'images/ring/back.png';

const Img = styled.img.attrs(
  ({imgurl}) => ({
    src: imgurl 
  })
)``;
const BattleWarp = styled.div`
	display:flex;position:absolute;left:0;right:0;top:0;bottom:0;background:url(${({backImg}) => backImg});background-size:cover;flex-direction:column;padding:44px 0 0 0;width:100%;height:100%;box-sizing:border-box;overflow:hidden;
`;
const BattleArea = styled.div`
	position:relative;height:calc(100% - 50px);background:#000;
	&.actionMode{height:100%;}
	/*perspective:1000px;perspective-origin:50% 50%;*/
`;
const BattleUnit = styled.div`
	display:flex;flex-direction:column;position:absolute;left:0;right:0;top:0;bottom:0;z-index:1;
	.turnLine{
		position:relative;height:0;overflow:hidden;
		&.on{height:50px;overflow:unset;}
	}
	& > div {position:relative;margin:0 auto;width:${({containerW}) => containerW}px;height:50%;box-sizing:border-box;transition:all 1s;}
	& > div .effect0:before{content:'';position:absolute;left:10%;right:10%;top:10%;bottom:10%;background-color:var(--color-b);box-shadow:0 0 10px 10px var(--color-b);z-index:10;opacity:.7;}
	& > div .effect1:before{content:'';position:absolute;left:10%;right:10%;top:10%;bottom:10%;background-color:var(--color-purple);box-shadow:0 0 10px 10px var(--color-purple);z-index:10;opacity:.7;}
	& > div .effect2:before{content:'';position:absolute;left:10%;right:10%;top:10%;bottom:10%;background-color:var(--color-yellow);box-shadow:0 0 10px 10px var(--color-yellow);z-index:10;opacity:.7;}
	& > div .effect3:before{content:'';position:absolute;left:10%;right:10%;top:10%;bottom:10%;background-color:var(--color-blue);box-shadow:0 0 10px 10px var(--color-blue);z-index:10;opacity:.7;}
	& > div .effect4:before{content:'';position:absolute;left:10%;right:10%;top:10%;bottom:10%;background-color:var(--color-red);box-shadow:0 0 10px 10px var(--color-red);z-index:10;opacity:.7;}
	& > div .effect5:before{content:'';position:absolute;left:10%;right:10%;top:10%;bottom:10%;background-color:var(--color-lightblue);box-shadow:0 0 10px 10px var(--color-lightblue);z-index:10;opacity:.7;}
	& > div .effect6:before{content:'';position:absolute;left:10%;right:10%;top:10%;bottom:10%;background-color:var(--color-green);box-shadow:0 0 10px 10px var(--color-green);z-index:10;opacity:.7;}
`;
const TimeLineCh = styled.div`
	position:absolute;left:${({left}) => left}%;width:${({size}) => size}px;padding-top:${({size}) => size}px;box-sizing:border-box;z-index:1;
	${({team}) => team === 'ally' ? 'bottom:5%;' : 'top:5%;'}
	&.on{z-index:20;animation:turnEffect 2s linear infinite;}
	&.none span{filter:grayscale(100%);}
	&.none:after{content:'';position:absolute;right:0;bottom:0;width:50%;height:50%;}
	&.none1:after{content:'방';background:#000;}
	&.none2:after{content:'철';background:#fff;}
	&.none3:after{content:'대';background:#f00;}
	@keyframes turnEffect{
		0%{transform:scale(1);}
		50%{transform:scale(1.5);}
		100%{transform:scale(1);}
	}
`;
const BattleCh = styled.div`
	position:absolute;width:${({size}) => size}%;padding-top:${({size}) => size}%;box-sizing:border-box;perspective:100px;transform-style:flat;
	left:${({left}) => left}%;
	top:${({top}) => top}%;
	transition:all 1s;
	z-index:1;
	&.action{left:50%;top:50%;transform:translate(-50%,-50%) scale(2);z-index:30;}
	.ch_box{position:absolute;left:5%;top:5%;width:90%;height:90%;transition:all .3s;transform-origin:50% 100%;transform-style:preserve-3d;}
	.ch_box .hpsp{position:absolute;height:12%;width:100%;top:-17%;}
	.ch_box .hpsp{
		display:flex;flex-direction:column;justify-content:space-between;
		span {
			display:flex;height:45%;background-color:#fff;border-radius:10px;overflow:hidden;box-shadow:inset 0 0 2px #000;
			em{display:inline-block;border-radius:10px;}
			&.hp{
				em{height:100%;width:100%;background-color:var(--color-red);}
			}
			&.sp{
				em{height:100%;width:100%;background-color:var(--color-blue);}
			}
		}
	}
	&.on{z-index:2;}
	&.on .ch_box{transform:scale(1.5) rotateX(-50deg);}
	&.on .ring_back{box-shadow:0 0 30px #fff,0 0 10px #ff0,0 0 5px #f40;}

	/*image-rendering:pixelated;*/
	@keyframes ring_ro{
		0%{transform:rotateZ(0deg);}
		100%{transform:rotateZ(360deg);}
	}
	.style_box{position:absolute;width:100%;height:100%;}
	.style_box>span{position:absolute;width:100%;height:100%;transform-origin:50% 50%;box-sizing:border-box;}

	.style_box>span:first-of-type{background-color:#f00;}
	.style_box>span:nth-of-type(2){background-color:#0f0;}
	.style_box>span:nth-of-type(3){background-color:#ddd;}
	.style_box>span:nth-of-type(4){background-color:#ff0;}
	.style_box>span:nth-of-type(5){background-color:#0ff;}
	.style_box>span:nth-of-type(6){background-color:#f0f;}
`;
const BattleLand = styled.div`
	display:flex;flex-direction:column;position:absolute;left:0;right:0;bottom:0;top:0;
	& > div {position:relative;margin:0 auto;width:${({containerW}) => containerW}px;height:50%;box-sizing:border-box;transition:all 1s;}
	.land_ally{position:relative;margin:0 auto;}
	.land_enemy{position:relative;margin:0 auto;}
	.turnLine{
		position:relative;height:0;
		&.on{height:50px;}
	}
	.land{position:absolute;width:20%;padding-top:20%;box-sizing:border-box;border-radius:5px;}
	.land.l0{background:rgba(255,255,255,.5);}
	.land.l1{background:rgba(0,0,255,.5);}
	.land.l2{background:rgba(0,190,0,.5);}
	.land.l3{background:rgba(255,0,0,.5);}
`;
const BattleOrder = styled.div`
	position:absolute;left:0;right:0;transform:translate(0,-50%);z-index:50;transition:all 1s;opacity:0;pointer-events:none;
	&.ally{bottom:35%;}
	&.enemy{top:35%;}
	&.on{opacity:1;}
	.battle_msg{margin:0 auto;padding:10px;width:50%;height:100%;border-radius:10px;background:#333;box-sizing:border-box;text-align:center;line-height:1.2;font-size:15px;font-weight:600;color:#fff;}
	&.ally:after{content:'';position:absolute;
		bottom:-10px;
    border-top:10px solid #333;
    border-left:10px solid transparent;
    border-right:10px solid transparent;
    border-bottom:0 solid transparent;
  }
	&.enemy:after{content:'';position:absolute;
		top:-10px;
    border-bottom:10px solid #333;
    border-left:10px solid transparent;
    border-right:10px solid transparent;
    border-top:0 solid transparent;
  }
	&.left:after{left:30%;}
	&.right:after{right:30%;}
`;
const BattleMenu = styled.div`
	display:flex;position:relative;height:50px;background:var(--color-b);
	.chInfo{display:flex;flex-basis:60px;align-items:center;justify-content:center;}
	.chInfo span{display:inline-block;}
	.chInfo .sp{font-size:20px;}
	.chInfo .spR{margin:0 0 0 5px;}
	.chInfo .spR:before{content:'('}
	.chInfo .spR:after{content:')'}
	ul{display:flex;flex:1;height:100%;align-items:center;justify-content:flex-start;}
	ul li{height:100%;}
	ul li button{display:flex;margin:5px;height:40px;border-radius:10px;background:#fff;box-sizing:border-box;align-items:center;}
	ul li button span{flex:1;white-space:nowrap;}
	.skSp{font-size:15px;}
	.skName{font-size:13px;white-space:nowrap;}
`;
const CardChRing = styled.span`
	position:absolute;width:100%;height:100%;transform-origin:50% 50%;box-sizing:border-box;background-repeat:no-repeat;backface-visibility:hidden;background-color:transparent;
	border-radius:30%;overflow:hidden;
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
	position:absolute;width:100%;height:100%;transform-origin:50% 50%;box-sizing:border-box;background-repeat:no-repeat;backface-visibility:hidden;background-color:transparent;
	background-position:center 100%,center center;background-size:100%;transform:translateZ(4px);
	span{
		position:absolute;left:-25%;width:150%;padding-top:150%;top:-30%;height:100%;transform-origin:50% 50%;box-sizing:border-box;background-repeat:no-repeat;background-position:center center;background-size:100%;border:none;animation:ring_ro linear 15s infinite;pointer-events:none;
		background-image:url(
			${({ringDisplay, lv}) => {
				if (lv > 49) {
					return ringDisplay
				} else {
					return '';
				}
			}}
		);
	}
`;
const CardCh = styled.span`
	position:absolute;top:-27%;left:-15%;width:130%;height:130%;transform-origin:50% 50%;box-sizing:border-box;background-repeat:no-repeat;backface-visibility:hidden;background-color:transparent;
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
	enemy.forEach((data, idx) => {
		const enemyAi = ai[idx];
		const skillList = activeSkillSorting(data.sk);
		const activeChance = [0.75, 0.8, 0.85, 0.9, 0.9]; //active스킬 확률
		const normalAttackChance = [0.3, 0.2, 0.15, 0.15, 0.1]; //일반공격 확률
		const weakAttackChance = [0, 0.2, 0.4, 0.6, 0.8]; //약한적 공격 확률
		const attackTarget = allyPos[Math.floor(Math.random() * allyPos.length)];
		const ranCount = Math.random();
		if (ranCount > activeChance[enemyAi]) { //buff
			enemySkill.push({
				team: 'enemy',
				idx: idx,
				skIdx: Math.random() > normalAttackChance[enemyAi] ? skillList.buff[Math.floor(Math.random() * skillList.buff.length)]?.idx || 0 : 0,
				target: Math.random() <= weakAttackChance[enemyAi] ? allyPos[hpArray[0].idx] : attackTarget,
			});
		} else { //active
			enemySkill.push({
				team: 'enemy',
				idx: idx,
				skIdx: Math.random() > normalAttackChance[enemyAi] ? skillList.active[Math.floor(Math.random() * skillList.active.length)]?.idx || 0 : 0,
				target: Math.random() <= weakAttackChance[enemyAi] ? allyPos[hpArray[0].idx] : attackTarget,
			});
		}
	});
	return enemySkill;
}
const activeSk = (skIdx) => {
	switch(skIdx) {
		case 11: //방어
			return 'none none1';
			break;
		case 12: //철벽방어
			return 'none none2';
			break;
		case 99: //대기
			return 'none none3';
			break;
		default:
			return '';
			break;
	}
}

const actionAnimation = (setTurnIdx, setSkillMsg, turnIdx) => {
	setTimeout(() => {
		setTimeout(() => {
			setSkillMsg(true);
			setTimeout(() => {
				setSkillMsg(false);
				setTimeout(() => {
					const turnIdx_ = turnIdx + 1;
					setTurnIdx(turnIdx_);
					actionAnimation(setTurnIdx, setSkillMsg, turnIdx_);
				}, 500);
			}, 500);
		}, 500);
	}, 2000);
}
const Battle = ({
	saveData,
  changeSaveData,
	scenario,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
	const scenarioDetail = scenario || gameData.scenario.korea.threeAfter[0].stage[0].entry;
	const allyDeck = saveData.lineup.save_slot[saveData.lineup.select].entry;
	const enemyDeck = scenarioDetail;
	const containerRef = useRef(null);
	const [containerW, setContainerW] = useState();
	const mapSize = 20;

	const [orderIdx, setOrderIdx] = useState(0);
	const [allyOrders, setAllyOrders] = useState([]);
	const [enemyAi, setEnemyAi] = useState([]);
	const [enemyOrders, setEnemyOrders] = useState([]);
	const [mode, setMode] = useState('order');
	const [effectArea, setEffectArea] = useState([]); //스킬 영역
	const [currentSkill, setCurrentSkill] = useState(); //현재 선택된 스킬
	const [mapPos, setMapPos] = useState([]); //아군 위치값
	const [battleAlly, setBattleAlly] = useState(); //아군 능력치
	const	[battleEnemy, setBattleEnemy] = useState(); //적군 능력치
	const [timeLine, setTimeLine] = useState(); //공격 순번배열
	const [timeLineIdx, setTimeLineIdx] = useState(0); //공격 순번라인 처리
	const [turnIdx, setTurnIdx] = useState(); //공격캐릭터 활성화 순번
	const [skillMsg, setSkillMsg] = useState(false); //메시지창 on/off
	useLayoutEffect(() => {
		let ally = [];
		let pos = [];
		allyDeck.filter((data, idx) => {
			if (typeof data === 'number') {
				const saveCh = saveData.ch[data];
				pos.push(idx);
				const hp = saveCh.bSt0 + saveCh.iSt0,
					rsp = saveCh.bSt2 + saveCh.iSt2,
					atk = saveCh.bSt3 + saveCh.iSt3,
					def = saveCh.bSt4 + saveCh.iSt4,
					mak = saveCh.bSt5 + saveCh.iSt5,
					mdf = saveCh.bSt6 + saveCh.iSt6,
					rcv = saveCh.bSt7 + saveCh.iSt7,
					spd = saveCh.bSt8 + saveCh.iSt8;
				ally.push({
					...saveCh,
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
				})
			}
		});
		setBattleAlly(ally);
		setMapPos(pos);
		let enemy = [];
		enemyDeck.filter((data, idx) => {
			if (typeof data.idx === 'number') {
				const gameCh = gameData.ch[data.idx];
				const enemyData = util.getEnemyState(data, gameData);
				const enemySkill = util.getEnemySkill(data, gameData);
				const hp = enemyData.bSt0 + enemyData.iSt0,
					rsp = enemyData.bSt2 + enemyData.iSt2,
					atk = enemyData.bSt3 + enemyData.iSt3,
					def = enemyData.bSt4 + enemyData.iSt4,
					mak = enemyData.bSt5 + enemyData.iSt5,
					mdf = enemyData.bSt6 + enemyData.iSt6,
					rcv = enemyData.bSt7 + enemyData.iSt7,
					spd = enemyData.bSt8 + enemyData.iSt8;
				enemy.push({
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
				})
			}
		});
		setBattleEnemy(enemy);
	}, []);
	
	const areaSelect = (e, pos) => {
		if (mode === 'area') {
			const areaArr = util.getEffectArea(currentSkill.ta, pos);
			setEffectArea(areaArr);
			if (e.target.classList.contains('effect')) {
				if (orderIdx < battleAlly.length - 1) {
					setOrderIdx((prev) => ++prev);
				} else {
					setMode('action');
				}
				setAllyOrders([
					...allyOrders,
					{
						team: 'ally',
						idx: orderIdx,
						skIdx: currentSkill.idx,
						enemyTarget: true,
						target: pos,
					},
				]);
				setEffectArea([]);
				if (orderIdx < battleAlly.length - 1) {
					setMode('order');
				} else {
					setMode('action');
					setOrderIdx('');
				}
			}
		}
	};
	const battleCommand = (skill) => {
		if (mode === 'order') {
			if (skill === 'cancel') { //취소 실행
				if (orderIdx > 0) {
					setOrderIdx((prev) => --prev);
					let order = [...allyOrders];
					order.pop();
					setAllyOrders(order);
				}
			} else if (skill === 'wait'){ //대기 실행 sp 증가
				if (orderIdx < battleAlly.length - 1) {
					setOrderIdx((prev) => ++prev);
				} else {
					setMode('action');
					setOrderIdx('');
				}
				setAllyOrders([
					...allyOrders,
					{
						team: 'ally',
						idx: orderIdx,
						skIdx: 99,
					},
				]);
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
						if (orderIdx < battleAlly.length - 1) {
							setOrderIdx((prev) => ++prev);
						} else {
							setMode('action');
						}
						setAllyOrders([
							...allyOrders,
							{
								team: 'ally',
								idx: orderIdx,
								skIdx: sk.idx,
								enemyTarget: false,
								target: mapPos[orderIdx],
							},
						]);
						break;
					case 5: //buff
						break;
					case 6: //debuff
						break;
					default:
						break;
				}
				setCurrentSkill(sk);
			}
		}
	};
	useLayoutEffect(() => {
		if (battleEnemy) {
			let ai = [];
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
			battleEnemy.forEach((data, idx) => {
				ai.push(makeAi());
			})
			setEnemyAi(ai);
		}
	}, [battleEnemy]);
	useLayoutEffect(() => {
		if (mode === 'action') {
			const enemyOrder = enemyPattern(enemyAi, battleAlly, mapPos, battleEnemy, gameData);
			// setEnemyOrders(enemyOrder);
			// console.log(enemyOrder, allyOrders);
			let allyEnemy = [];
			battleAlly.forEach((data, idx) => {
				allyEnemy.push({
					idx: idx,
					team: 'ally',
					spd: data.spd,
				});
			});
			battleEnemy.forEach((data, idx) => {
				allyEnemy.push({
					idx: idx,
					team: 'enemy',
					spd: data.spd,
				});
			});
			allyEnemy.sort((a, b) => {
				return b.spd - a.spd;
			});
			let timeLineEntry = [];
			allyEnemy.forEach((data, idx) => {
				if (data.team === 'ally'){
					timeLineEntry.push(allyOrders[data.idx]);
				} else {
					timeLineEntry.push(enemyOrder[data.idx]);
				}
			});
			setTimeLine(timeLineEntry);
			setTurnIdx(0);
			actionAnimation(setTurnIdx, setSkillMsg, 0);
			console.log("시뮬레이션 실행", timeLineEntry);
		}
	}, [mode]);
	useLayoutEffect(() => {
		setContainerW(containerRef.current.getBoundingClientRect().height * 0.5);
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
      <BattleWarp className="battle_wrap" backImg={imgBack}>
				<BattleArea ref={containerRef} className={`battle_area ${mode === "action"? "actionMode" : ""}`}>
					<BattleUnit containerW={containerW} className="battle_units">
						<div className="units_enemy">
							{battleEnemy && enemyDeck.map((enemyData, idx)=> {
								const left = idx % 5 * mapSize,
									top = Math.floor(idx / 5) * mapSize,
									area = chkString(effectArea, idx);
								const element_type = currentSkill ? currentSkill.element_type : '';
								if (enemyData.idx) {
									const chData = gameData.ch[enemyData.idx];
									const enemyCh = battleEnemy[enemyData.pos];
									const battleIdx = enemyDeck[idx].pos;
									const hasHp = (enemyCh.hp / enemyCh.hp_) * 100;
									const elementCh = area ? "effect" + element_type : "";
									const actionCh = typeof turnIdx === 'number' && timeLine && timeLine[battleIdx].team === 'enemy' && turnIdx === timeLine[battleIdx].idx ? 'action' : '';
									return (
										<BattleCh key={idx} className={`battle_ch effect ${elementCh} ${actionCh}`} data-ch={chData.display} data-idx={idx} left={left} top={top} size={mapSize} onClick={(e) => {
											areaSelect(e, idx);
										}}>
											<div className="ch_box">
												<CardChRing className="ring_back" ringBack={imgRingBack} ringDisplay={imgSet.ringImg[chData.element]} ringDisplay1={imgSet.sringImg[chData.element]} lv={enemyData.lv} />
												<CardCh className="ch_style" chDisplay={imgSet.chImg[`ch${chData.display}`]} styleDisplay={imgSet.chStyleImg[`ch_style${chData.style}`]}/>
												<CardRingStyle className="ring_style" ringDisplay={imgSet.ssringImg[chData.element]} lv={enemyData.lv}>
													<span className="ch_ring transition" />
												</CardRingStyle>
												<div className="hpsp">
													<span className="hp"><em className="gradient_light" style={{width: hasHp + '%'}}></em></span>
												</div>
											</div>
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
							{timeLine && timeLine.map((data, idx) => {
								const chData = data.team === 'ally' ? gameData.ch[battleAlly[data.idx].idx] : gameData.ch[battleEnemy[data.idx].idx];
								const left = 100 / timeLine.length * idx;
								const activeSkill = activeSk(data.skIdx);// active스킬 판단 99대기,11방어,12철벽방어
								// data.team 아군적군
								// data.skIdx 스킬번호
								// target 범위
								return (
									<TimeLineCh key={idx} className={`battle_ch ${timeLineIdx === idx ? 'on' : ''} ${activeSkill}`} team={data.team} size={30} left={left}>
										<CardChRing style={{top:0,borderRadius:'50%',}} className="ring_back" ringBack={imgRingBack} ringDisplay={imgSet.ringImg[chData.element]} ringDisplay1={imgSet.sringImg[chData.element]} />
										<CardCh className="ch_style" chDisplay={imgSet.chImg[`ch${chData.display}`]} styleDisplay={imgSet.chStyleImg[`ch_style${chData.style}`]}/>
									</TimeLineCh>
								)
							})}
						</div>
						<div className="units_ally">
							{battleAlly && allyDeck.map((allyData, idx)=> {
								const left = (24 - idx) % 5 * mapSize,
									top = Math.floor((24 - idx) / 5) * mapSize;
								if (typeof allyData === "number") {
									const battleIdx = saveData.ch[allyData].idx;
									const saveCh = battleAlly[battleIdx];
									const chData = gameData.ch[saveCh.idx];
									const hasHp = (saveCh.hp / saveCh.hp_) * 100,
										hasSp = (saveCh.sp / saveCh.sp_) * 100;
										const posCh = mapPos[orderIdx] === idx ? 'on' : '';
										const actionCh = typeof turnIdx === 'number' && timeLine && timeLine[battleIdx].team === 'ally' && turnIdx === timeLine[battleIdx].idx ? 'action' : '';
									return (
										<BattleCh key={idx} className={`battle_ch ${posCh} ${actionCh}`} data-ch={chData.display} data-idx={idx} left={left} top={top} size={mapSize}>
											<div className="ch_box">
												<CardChRing className="ring_back" ringBack={imgRingBack} ringDisplay={imgSet.ringImg[chData.element]} ringDisplay1={imgSet.sringImg[chData.element]} lv={saveCh.lv} />
												<CardCh className="ch_style" chDisplay={imgSet.chImg[`ch${chData.display}`]} styleDisplay={imgSet.chStyleImg[`ch_style${chData.style}`]}/>
												<CardRingStyle className="ring_style" ringDisplay={imgSet.ssringImg[chData.element]} lv={saveCh.lv}>
													<span className="ch_ring transition" />
												</CardRingStyle>
												<div className="hpsp">
													<span className="hp"><em className="gradient_light" style={{width: hasHp + '%'}}></em></span>
													<span className="sp"><em className="gradient_light" style={{width: hasSp + '%'}}></em></span>
												</div>
											</div>
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
					<BattleLand containerW={containerW} className="battle_land">
						<div className="land_ally">
						{map.map((data, idx) => {
							const left = idx % 5 * mapSize,
								top = Math.floor(idx / 5) * mapSize;
							const landStyle = Math.floor(Math.random()*4);
							return (
								<div key={idx} className={`land l${landStyle}`} style={{left: left+'%', top: top+'%'}}></div>
							);
						})}
						</div>
						<div className={`turnLine ${mode === 'action' ? 'on' : ''}`}></div>
						<div className="land_enemy">
						{map.map((data, idx) => {
							const left = idx % 5 * mapSize,
								top = Math.floor(idx / 5) * mapSize;
							const landStyle = Math.floor(Math.random()*4);
							return (
								<div key={idx} className={`land l${landStyle}`} style={{left: left+'%', top: top+'%'}}></div>
							);
						})}
						</div>
					</BattleLand>
					<BattleOrder className={`battle_order ${skillMsg ? 'on' : ''} ${typeof turnIdx === 'number' && timeLine[turnIdx].team === 'ally' ? 'ally' : 'enemy'} ${typeof turnIdx === 'number' && gameData.ch[timeLine[turnIdx].idx].face_d === 1 ? 'left' : 'right'}`}>
						<div className="battle_msg">{typeof turnIdx === 'number' && gameData.skill[timeLine[turnIdx].skIdx].na}</div>
					</BattleOrder>
				</BattleArea>
				{mode !== 'action' && battleAlly ? 
					<>
						<BattleMenu className="battle_menu">
							<div className="chInfo">
								<span className="sp">{battleAlly[orderIdx].sp}</span>
								<span className="spR">{battleAlly[orderIdx].bSt2}</span>
							</div>
							<ul className="scroll-x">
								{battleAlly[orderIdx].sk && battleAlly[orderIdx].sk.map((data, idx) => {
									const sk = gameData.skill;
									if (sk[data.idx].cate[0] !== 1) {
										return (
											<li key={idx}><button onClick={() => {
												battleCommand(sk[data.idx]);
											}}><span className="skSp">{sk[data.idx].sp}</span><span className="skName">{sk[data.idx].na}</span></button></li>
										);
									}
								})}
								<li><button onClick={() => {
									battleCommand('wait');
								}}><span>대기</span></button></li>
								<li><button onClick={() => {
									battleCommand('cancel');
								}}><span>취소</span></button></li>
							</ul>
					</BattleMenu>
				</> : ""
			}
			</BattleWarp>
    </>
  );
}

export default Battle;
