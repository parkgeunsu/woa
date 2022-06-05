import React, { useRef, useState, useContext, useLayoutEffect } from 'react';
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
	position:relative;height:90%;background:#000;
	/*perspective:1000px;perspective-origin:50% 50%;*/
`;
const BattleUnit = styled.div`
	display:flex;flex-direction:column;position:absolute;left:0;right:0;top:0;bottom:0;z-index:1;
	& > div {position:relative;margin:0 auto;width:${({containerW}) => containerW}px;height:50%;box-sizing:border-box;}
`;
const BattleCh = styled.div`
	position:absolute;width:${({size}) => size}%;padding-top:${({size}) => size}%;box-sizing:border-box;perspective:100px;transform-style:flat;
	left:${({left}) => left}%;
	top:${({top}) => top}%;
	z-index:1;
	.ch_box{position:absolute;left:5%;top:5%;width:90%;height:90%;transition:all .3s;transform-origin:50% 100%;transform-style:preserve-3d;}
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
	& > div {position:relative;margin:0 auto;width:${({containerW}) => containerW}px;height:50%;box-sizing:border-box;}
	.land_ally{position:relative;margin:0 auto;}
	.land_enemy{position:relative;margin:0 auto;}
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
	position:relative;height:10%;background:#000;
	ul{display:flex;height:100%;}
	ul li{flex:1;height:100%;}
	ul li button{width:100%;height:100%;border-radius:10px;background:#fff;box-sizing:border-box;text-align:center;}
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
		position:absolute;left:-25%;width:150%;padding-top:150%;top:-30%;height:100%;transform-origin:50% 50%;box-sizing:border-box;background-repeat:no-repeat;background-position:center center;background-size:100%;border:none;animation:ring_ro linear 15s infinite;
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
				<BattleArea ref={containerRef} className="battle_area">
					<BattleUnit containerW={containerW} className="battle_units">
						<div className="units_ally">
							{allyDeck && allyDeck.map((allyData, idx)=> {
								const left = idx % 5 * mapSize,
									top = Math.floor(idx / 5) * mapSize;
								if (typeof allyData === "number") {
									const saveCh = saveData.ch[allyData];
									const chData = gameData.ch[saveCh.idx];
									return (
										<BattleCh key={idx} className="battle_ch" data-ch={chData.display} data-idx={idx} left={left} top={top} size={mapSize}>
											<div className="ch_box">
												<CardChRing className="ring_back" ringBack={imgRingBack} ringDisplay={imgSet.ringImg[chData.element]} ringDisplay1={imgSet.sringImg[chData.element]} lv={saveCh.lv} />
												<CardCh className="ch_style" chDisplay={imgSet.chImg[`ch${chData.display}`]} styleDisplay={imgSet.chStyleImg[`ch_style${chData.style}`]}/>
												<CardRingStyle className="ring_style" ringDisplay={imgSet.ssringImg[chData.element]} lv={saveCh.lv}>
													<span className="ch_ring transition" />
												</CardRingStyle>
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
						<div className="units_enemy">
							{enemyDeck && enemyDeck.map((enemyData, idx)=> {
								const left = idx % 5 * mapSize,
									top = Math.floor(idx / 5) * mapSize;
								if (enemyData.idx) {
									const chData = gameData.ch[enemyData.idx];
									return (
										<BattleCh key={idx} className="battle_ch" data-ch={chData.display} data-idx={idx} left={left} top={top} size={mapSize}>
											<div className="ch_box">
												<CardChRing className="ring_back" ringBack={imgRingBack} ringDisplay={imgSet.ringImg[chData.element]} ringDisplay1={imgSet.sringImg[chData.element]} lv={enemyData.lv} />
												<CardCh className="ch_style" chDisplay={imgSet.chImg[`ch${chData.display}`]} styleDisplay={imgSet.chStyleImg[`ch_style${chData.style}`]}/>
												<CardRingStyle className="ring_style" ringDisplay={imgSet.ssringImg[chData.element]} lv={enemyData.lv}>
													<span className="ch_ring transition" />
												</CardRingStyle>
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
				<BattleMenu className="battle_menu">
					<ul>
						<li><button>Attack</button></li>
						<li><button>Skill</button></li>
						<li><button>defense</button></li>
					</ul>
				</BattleMenu>
			</BattleWarp>
    </>
  );
}

export default Battle;
