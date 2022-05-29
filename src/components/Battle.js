import React, { useContext } from 'react';
import { AppContext } from 'App';
import styled from 'styled-components';
import { util } from 'components/Libs';

import imgBack from 'images/back/back1.jpg';

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
	.units_ally{position:relative;margin:0 auto;}
	.units_enemy{position:relative;margin:0 auto;}
	.ch_box{position:absolute;left:0;top:0;width:100%;height:100%;transition:all .3s;}
	.units_ally .battle_ch:nth-of-type(5n-4) .ch_box{transform:scale(.7) rotateX(-45deg);}
	.units_ally .battle_ch:nth-of-type(5n-3) .ch_box{transform:scale(.7) rotateX(-45deg);}
	.units_ally .battle_ch:nth-of-type(5n-2) .ch_box{transform:scale(.7) rotateX(-45deg);}
	.units_ally .battle_ch:nth-of-type(5n-1) .ch_box{transform:scale(.7) rotateX(-45deg);}
	.units_ally .battle_ch:nth-of-type(5n) .ch_box{transform:scale(.7) rotateX(-45deg);}
	.units_enemy .battle_ch:nth-of-type(5n-4) .ch_box{transform:scale(.7) rotateX(-45deg);}
	.units_enemy .battle_ch:nth-of-type(5n-3) .ch_box{transform:scale(.7) rotateX(-45deg);}
	.units_enemy .battle_ch:nth-of-type(5n-2) .ch_box{transform:scale(.7) rotateX(-45deg);}
	.units_enemy .battle_ch:nth-of-type(5n-1) .ch_box{transform:scale(.7) rotateX(-45deg);}
	.units_enemy .battle_ch:nth-of-type(5n) .ch_box{transform:scale(.7) rotateX(-45deg);}
`;
const BattleCh = styled.div`
	position:absolute;width:20%;padding-top:28.2%;box-sizing:border-box;perspective:100px;transform-style:flat;
	left:${({left, left_}) => left + left_}%;
	top:${({top, allyTop}) => top + allyTop}%;
	z-index:1;
	&.on:nth-of-type(5n-4) .ch_box{transform:scale(2) rotateX(0deg);}
	&.on:nth-of-type(5n-3) .ch_box{transform:scale(2) rotateX(0deg);}
	&.on:nth-of-type(5n-2) .ch_box{transform:scale(2) rotateX(0deg);}
	&.on:nth-of-type(5n-1) .ch_box{transform:scale(2) rotateX(0deg);}
	&.on:nth-of-type(5n) .ch_box{transform:scale(2) rotateX(0deg);}
	&.on{z-index:26 !important;}
	&.on .ch_box{box-shadow:0 0 30px #fff,0 0 10px #ff0,0 0 5px #f40;}
	.ch_box span{position:absolute;width:100%;height:100%;transform-origin:50% 50%;box-sizing:border-box;background-repeat:no-repeat;background-position:center center;background-size:100%;backface-visibility:hidden;background-color:transparent;}
	.ch_box > .ring_back{background-position:center center;}
	.ch_box > .ch_style{background-position:center 100%,center center;}
	.ch_box > .ring_style{width:150%;padding-top:150%;top:-5%;left:-25%;}
	.ch_box > .ring_style span{position:absolute;left:0;top:0;width:100%;height:100%;transform-origin:50% 50%;box-sizing:border-box;background-repeat:no-repeat;background-position:center center;background-size:100%;border:none;animation:ring_ro linear 15s infinite;}/*image-rendering:pixelated;*/
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
	.land_ally{position:relative;margin:0 auto;}
	.land_enemy{position:relative;margin:0 auto;}
	.land{position:absolute;width:20%;padding-top:12%;box-sizing:border-box;border:1px solid #fff;border-radius:10px;}
	.land.l0{background:rgba(255,255,255,.5);}
	.land.l1{background:rgba(0,0,255,.5);}
	.land.l2{background:rgba(0,190,0,.5);}
	.land.l3{background:rgba(255,0,0,.5);}
`;
const BattleOrder = styled.div`
	position:absolute;left:0;right:0;top:50%;height:10%;transform:translate(0,-50%);z-index:50;
	.battle_msg{margin:0 auto;padding:10px;width:70%;height:100%;border:2px solid #fff;border-radius:30px;background:rgba(255,255,255,.5);box-sizing:border-box;text-align:center;line-height:1.2;font-size:15px;font-weight:600;color:#000;}
`;
const BattleMenu = styled.div`
	position:relative;height:10%;background:#000;
	ul{display:flex;height:100%;}
	ul li{flex:1;height:100%;}
	ul li button{width:100%;height:100%;border-radius:10px;background:#fff;box-sizing:border-box;text-align:center;}
`;
/* .battle_ch{position:absolute;width:20%;height:20%;border:1px solid #fff;box-sizing:border-box;}
.battle_ch .ch_box{position:absolute;left:10%;top:10%;width:80%;height:80%;}
.battle_ch .ch_box span{position:absolute;width:100%;height:100%;transform-origin:50% 50%;box-sizing:border-box;}
.battle_ch .ch_box span:first-of-type{border:1px solid #f00;transform:translate3d(0px,0px,20px) rotateY(0deg);}
.battle_ch .ch_box span:nth-of-type(2){border:1px solid #0f0;transform:translate3d(0px,0px,-20px) rotateY(0deg);}
.battle_ch .ch_box span:nth-of-type(3){border:1px solid #00f;transform:rotateY(0deg);}
.battle_ch .ch_box span:nth-of-type(4){border:1px solid #ff0;transform:rotateY(0deg);}
.battle_ch .ch_box span:nth-of-type(5){border:1px solid #0ff;transform:rotateY(0deg);}
.battle_ch .ch_box span:last-of-type{border:1px solid #f0f;transform:rotateY(0deg);} */
const Battle = ({
	saveData,
  changeSaveData,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
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
		{idx:25,},
		{idx:26,},
		{idx:27,},
		{idx:28,},
		{idx:29,},
		{idx:30,},
		{idx:31,},
		{idx:32,},
		{idx:33,},
		{idx:34,},
		{idx:35,},
		{idx:36,},
		{idx:37,},
		{idx:38,},
		{idx:39,},
		{idx:40,},
		{idx:41,},
		{idx:42,},
		{idx:43,},
		{idx:44,},
		{idx:45,},
		{idx:46,},
		{idx:47,},
		{idx:48,},
	];
  return (
    <>
      <BattleWarp className="battle_wrap" backImg={imgBack}>
				<BattleArea className="battle_area">
					<BattleUnit className="battle_units">
						<div className="units_ally">
							{map && map.map((data, idx)=> {
								const left = idx % 7 * 20,
									top = Math.floor(idx / 7) * 15,
									left_ = idx % 7 - 2,
									battle_top = Math.abs(left_) * 3,
									ally_top = (2 - Math.abs(left_)) * 3;
								return (
									<BattleCh key={idx} className="battle_ch" data-ch="'+ch.display+'" data-idx={idx} left={left} top={top} allyTop={ally_top}>
										<div className="ch_box">
											<span className="ring_back" style="background-image:url(./images/ring/back.png),url(./images/ring/ring'+ch.element+'.png);"></span>
											<span className="ring_style"><span style="background-image:url(./images/ssring/ssring'+ch.element+'.png);"></span></span>
											<span className="ch_style" style="background-image:url(./images/ch_style/ch_style'+ch.style+'.png),url(./images/ch/ch'+ch.display+'.png);"></span>
										</div>
									</BattleCh>
								);
							})}
							{/* <div className="battle_ch" data-idx="'+i+'"style="left:'+(left+left_)+'%;top:'+(top+ally_top)+'%;">
								<div className="ch_box"></div>
							</div> */}
						</div>
						<div className="units_enemy">
							{map && map.map((data, idx)=> {
								return (
									<BattleCh key={idx} className="battle_ch" data-idx="'+i+'" style="left:'+(80-left-left_)+'%;top:'+(60-top+battle_top+8)+'%;z-index:'+(25-i)+';">
										<div className="ch_box">
											<span className="ring_back" style="background-image:url(./images/ring/back.png),url(./images/ring/ring3.png);"></span>
											<span className="ring_style"><span style="background-image:url(./images/ssring/ssring3.png);"></span></span>
											<span className="ch_style" style="background-image:url(./images/ch_style/ch_style1.png),url(./images/ch/ch0.png);"></span>
										</div>
									</BattleCh>
								);
							})}
						</div>
					</BattleUnit>
					<BattleLand className="battle_land">
						<div className="land_ally">
							<div className="land l'+ll+'" style="left:'+(left+left_)+'%;top:'+(top+ally_top+12)+'%;"></div>
						</div>
						<div className="land_enemy">
							<div className="land" style="left:'+(80-left-left_)+'%;top:'+(60-top+battle_top+20)+'%;"></div>
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
