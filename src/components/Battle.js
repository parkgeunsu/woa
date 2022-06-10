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
	.turnLine{height:50px;}
	& > div {position:relative;margin:0 auto;width:${({containerW}) => containerW}px;height:50%;box-sizing:border-box;transition:all 1s;}
	& > div .effect0:before{content:'';position:absolute;left:10%;right:10%;top:10%;bottom:10%;background-color:var(--color-b);box-shadow:0 0 10px 10px var(--color-b);z-index:10;opacity:.7;}
	& > div .effect1:before{content:'';position:absolute;left:10%;right:10%;top:10%;bottom:10%;background-color:var(--color-purple);box-shadow:0 0 10px 10px var(--color-purple);z-index:10;opacity:.7;}
	& > div .effect2:before{content:'';position:absolute;left:10%;right:10%;top:10%;bottom:10%;background-color:var(--color-yellow);box-shadow:0 0 10px 10px var(--color-yellow);z-index:10;opacity:.7;}
	& > div .effect3:before{content:'';position:absolute;left:10%;right:10%;top:10%;bottom:10%;background-color:var(--color-blue);box-shadow:0 0 10px 10px var(--color-blue);z-index:10;opacity:.7;}
	& > div .effect4:before{content:'';position:absolute;left:10%;right:10%;top:10%;bottom:10%;background-color:var(--color-red);box-shadow:0 0 10px 10px var(--color-red);z-index:10;opacity:.7;}
	& > div .effect5:before{content:'';position:absolute;left:10%;right:10%;top:10%;bottom:10%;background-color:var(--color-lightblue);box-shadow:0 0 10px 10px var(--color-lightblue);z-index:10;opacity:.7;}
	& > div .effect6:before{content:'';position:absolute;left:10%;right:10%;top:10%;bottom:10%;background-color:var(--color-green);box-shadow:0 0 10px 10px var(--color-green);z-index:10;opacity:.7;}
`;
const BattleCh = styled.div`
	position:absolute;width:${({size}) => size}%;padding-top:${({size}) => size}%;box-sizing:border-box;perspective:100px;transform-style:flat;
	left:${({left}) => left}%;
	top:${({top}) => top}%;
	z-index:1;
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
	.turnLine{height:50px;}
	.land{position:absolute;width:20%;padding-top:20%;box-sizing:border-box;border-radius:5px;}
	.land.l0{background:rgba(255,255,255,.5);}
	.land.l1{background:rgba(0,0,255,.5);}
	.land.l2{background:rgba(0,190,0,.5);}
	.land.l3{background:rgba(255,0,0,.5);}
`;
const BattleOrder = styled.div`
	display:none;position:absolute;left:0;right:0;top:50%;height:10%;transform:translate(0,-50%);z-index:50;
	.battle_msg{margin:0 auto;padding:10px;width:70%;height:100%;border:2px solid #fff;border-radius:30px;background:rgba(255,255,255,.5);box-sizing:border-box;text-align:center;line-height:1.2;font-size:15px;font-weight:600;color:#000;}
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
const enemyPattern = (ai, battleCh, allyPos, enemy, gameData) => {
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
		hpArray.push(battleCh[idx].hp_ / battleCh[idx].hp);
	});
	hpArray.sort(); //allyPos[hpArray[0]] 약한캐릭
	enemy.forEach((data, idx) => {
		const enemyAi = ai[idx];
		const skillList = activeSkillSorting(data.sk);
		console.log(skillList);
		const activeChance = [0.75, 0.8, 0.85, 0.9, 0.9]; //active스킬 확률
		const normalAttackChance = [0.3, 0.2, 0.15, 0.15, 0.1]; //일반공격 확률
		const weakAttackChance = [0, 0.2, 0.4, 0.6, 0.8]; //약한적 공격 확률
		const attackTarget = allyPos[Math.floor(Math.random() * allyPos.length)];
		const ranCount = Math.random();
		if (ranCount > activeChance[enemyAi]) { //buff
			enemySkill.push({
				idx: Math.random() > normalAttackChance[enemyAi] ? skillList.buff[Math.floor(Math.random() * skillList.buff.length)]?.idx || 0 : 0,
				target: Math.random() <= weakAttackChance[enemyAi] ? allyPos[hpArray[0]] : attackTarget,
			});
		} else { //active
			enemySkill.push({
				idx: Math.random() > normalAttackChance[enemyAi] ? skillList.active[Math.floor(Math.random() * skillList.active.length)]?.idx || 0 : 0,
				target: Math.random() <= weakAttackChance[enemyAi] ? allyPos[hpArray[0]] : attackTarget,
			});
		}
	});
	return enemySkill;
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
	const [orders, setOrders] = useState([]);
	const [enemyAi, setEnemyAi] = useState([]);
	const [enemyOrders, setEnemyOrders] = useState([]);
	const [mode, setMode] = useState('order');
	const [effectArea, setEffectArea] = useState([]);
	const [currentSkill, setCurrentSkill] = useState();
	const [mapPos, setMapPos] = useState([]);
	const [battleCh, setBattleCh] = useState();
	const	[battleEnemy, setBattleEnemy] = useState();
	useLayoutEffect(() => {
		let ch = [];
		let pos = [];
		allyDeck.filter((data, idx) => {
			if (typeof data === 'number') {
				const saveCh = saveData.ch[data];
				pos.push(idx);
				const hp = saveCh.bSt0 + saveCh.iSt0,
					rsp = saveCh.bSt2,
					atk = saveCh.bSt3,
					def = saveCh.bSt4,
					mak = saveCh.bSt5,
					mdf = saveCh.bSt6,
					rcv = saveCh.bSt7,
					spd = saveCh.bSt8;
				ch.push({
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
		setBattleCh(ch);
		setMapPos(pos);
		let enemy = [];
		enemyDeck.filter((data, idx) => {
			if (typeof data.idx === 'number') {
				const gameCh = gameData.ch[data.idx];
				const enemyData = util.getEnemyState(data, gameData);
				const enemySkill = util.getEnemySkill(data, gameData);
				const hp = enemyData.bSt0 + enemyData.iSt0,
					rsp = enemyData.bSt2,
					atk = enemyData.bSt3,
					def = enemyData.bSt4,
					mak = enemyData.bSt5,
					mdf = enemyData.bSt6,
					rcv = enemyData.bSt7,
					spd = enemyData.bSt8;
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
				if (orderIdx < battleCh.length - 1) {
					setOrderIdx((prev) => ++prev);
				} else {
					setMode('action');
				}
				setOrders([
					...orders,
					{
						idx: currentSkill.idx,
						enemyTarget: true,
						target: pos,
					},
				]);
				setEffectArea([]);
				if (orderIdx < battleCh.length - 1) {
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
					let order = [...orders];
					order.pop();
					setOrders(order);
				}
			} else if (skill === 'wait'){ //대기 실행 sp 증가
				if (orderIdx < battleCh.length - 1) {
					setOrderIdx((prev) => ++prev);
				} else {
					setMode('action');
					setOrderIdx('');
				}
				setOrders([
					...orders,
					{idx: 99},
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
						if (orderIdx < battleCh.length - 1) {
							setOrderIdx((prev) => ++prev);
						} else {
							setMode('action');
						}
						setOrders([
							...orders,
							{
								idx: sk.idx,
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
			console.log(enemyPattern(enemyAi, battleCh, mapPos, battleEnemy, gameData));
			//setEnemyOrders();
			console.log(orderIdx, orders);
			console.log("시뮬레이션 실행");
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
									const hasHp = (enemyCh.hp / enemyCh.hp_) * 100
									return (
										<BattleCh key={idx} className={`battle_ch effect ${area ? "effect" + element_type : ""}`} data-ch={chData.display} data-idx={idx} left={left} top={top} size={mapSize} onClick={(e) => {
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
						{mode === 'action' ? 
							<div className="turnLine">

							</div> : ''
						}
						<div className="units_ally">
							{battleCh && allyDeck.map((allyData, idx)=> {
								const left = (24 - idx) % 5 * mapSize,
									top = Math.floor((24 - idx) / 5) * mapSize;
								if (typeof allyData === "number") {
									const saveCh = battleCh[saveData.ch[allyData].idx];
									const chData = gameData.ch[saveCh.idx];
									const hasHp = (saveCh.hp / saveCh.hp_) * 100,
										hasSp = (saveCh.sp / saveCh.sp_) * 100;
									return (
										<BattleCh key={idx} className={`battle_ch ${mapPos[orderIdx] === idx ? 'on' : ''}`} data-ch={chData.display} data-idx={idx} left={left} top={top} size={mapSize}>
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
						{mode === 'action' ? <div className="turnLine"></div> : ''}
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
					<BattleOrder className="battle_order">
						<div className="battle_msg">스킬시전!!</div>
					</BattleOrder>
				</BattleArea>
				{mode !== 'action' && battleCh ? 
					<>
						<BattleMenu className="battle_menu">
							<div className="chInfo">
								<span className="sp">{battleCh[orderIdx].sp}</span>
								<span className="spR">{battleCh[orderIdx].bSt2}</span>
							</div>
							<ul className="scroll-x">
								{battleCh[orderIdx].sk && battleCh[orderIdx].sk.map((data, idx) => {
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
