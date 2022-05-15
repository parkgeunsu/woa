import React, { useState, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { useGesture, useDrag } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';

import CharacterState from 'components/CharacterState';
import CharacterSkill from 'components/CharacterSkill';
import CharacterRelation from 'components/CharacterRelation';
import CharacterItems from 'components/CharacterItems';
import CharacterApplyState from 'components/CharacterApplyState';
import CharacterItemEnhance from 'components/CharacterItemEnhance';
import CharacterChEnhance from 'components/CharacterChEnhance';
import CharacterList from 'components/CharacterList';
import CharacterHeader from 'components/CharacterHeader';
import CharacterCard from 'components/CharacterCard';

import { util, fn } from 'components/Libs';

import imgRing from 'images/ring/ring_.png';
import imgBack from 'images/back/back0.jpg';
import imgCardBack from 'images/card/card_back.png';
import frameChBack from 'images/frame/frame_chback.png';
import iconState0 from 'images/ico/st0.png';
import iconState1 from 'images/ico/st1.png';
import iconState2 from 'images/ico/st2.png';
import iconState3 from 'images/ico/st3.png';
import iconState4 from 'images/ico/st4.png';
import iconState5 from 'images/ico/st5.png';
import iconState6 from 'images/ico/st6.png';
import stateBack from 'images/pattern/white_brick_wall_@2X_.png';

const Img = styled.img.attrs(
  ({imgurl}) => ({
    src: imgurl 
  })
)``;
const ChWrap = styled.div`
  position:absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;
  padding: 44px 0 0 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  background:url(${({backImg}) => backImg});
  background-size:cover;
  touch-action:none;
  &.page0{
    .ch_card{
      left:50%;top:50%;transform:translate(-50%,-50%) scale(1);
      &.rotate .ch_detail{z-index:1;transform:rotateY(360deg);}
      &.rotate .ch_back{z-index:2;transform:rotateY(180deg);}
    }
    .ch_menu{opacity:0;}
    .ch_detail{z-index:1;transform:rotateY(0deg);}
    .ch_back{z-index:2;transform:rotateY(-180deg);}
    .ch_info{top:100%;}
    .ch_header{right:-100%;}
  }
  &.page1{
    .ch_info .state{display:flex;} 
  }
  &.page2{
    .ch_info .skill{display:block;}
  }
  &.page3{
    .ch_info .relation{display:block;} 
  }
  &.page4{
    .ch_info .items{display:block;}
  }
  &.page5{
    .ch_info .apply_state{display:block;}
  }
  &.page6{
    .ch_info{top:100%;}
    .item_enhance{top:42%;}
  }
  &.page7{
    .ch_info{top:100%;}
    .ch_info .ch_enhance{top:42%;}
  }
  .st0 .ico{background:url(${({stateIcon}) => stateIcon[0]}) no-repeat center center;background-size:100%;}
  .st1 .ico{background:url(${({stateIcon}) => stateIcon[1]}) no-repeat center center;background-size:100%;}
  .st2 .ico{background:url(${({stateIcon}) => stateIcon[2]}) no-repeat center center;background-size:100%;}
  .st3 .ico{background:url(${({stateIcon}) => stateIcon[3]}) no-repeat center center;background-size:100%;}
  .st4 .ico{background:url(${({stateIcon}) => stateIcon[4]}) no-repeat center center;background-size:100%;}
  .st5 .ico{background:url(${({stateIcon}) => stateIcon[5]}) no-repeat center center;background-size:100%;}
  .st6 .ico{background:url(${({stateIcon}) => stateIcon[6]}) no-repeat center center;background-size:100%;}

  .rt{position:relative;margin:0 0 5px;padding:5px 10px;font-size:12px;border:3px double rgba(255,255,255,.5);border-radius:5px;}

  .sk{position:relative;margin:0 0 5px;font-size:12px;border:3px double rgba(255,255,255,.5);border-radius:5px;}
  .sk_info{padding:5px 10px;}
  .sk .sk_element{width:25px;height:25px;background-position:center center;background-repeat:no-repeat;font-size:0;}
  .sk .sk_element[el0]{background-image:url();background-size:100%;}
  .sk .sk_element[el1]{background-image:url(../images/ico/el1.png);background-size:100%;}
  .sk .sk_element[el2]{background-image:url(../images/ico/el2.png);background-size:100%;}
  .sk .sk_element[el3]{background-image:url(../images/ico/el3.png);background-size:100%;}
  .sk .sk_element[el4]{background-image:url(../images/ico/el4.png);background-size:100%;}
  .sk .sk_element[el5]{background-image:url(../images/ico/el5.png);background-size:100%;}
  .sk .sk_element[el6]{background-image:url(../images/ico/el6.png);background-size:100%;}
  .sk .sk_element[el7]{background-image:url(../images/ico/el7.png);background-size:100%;}
  .sk .sk_element[el8]{background-image:url(../images/ico/el8.png);background-size:100%;}
  .sk .sk_element[el9]{background-image:url(../images/ico/el9.png);background-size:100%;}
  .sk .sk_element[el10]{background-image:url(../images/ico/el10.png);background-size:100%;}
  .sk .sk_element[el11]{background-image:url(../images/ico/el11.png);background-size:100%;}
  .sk .sk_element[el12]{background-image:url(../images/ico/el12.png);background-size:100%;}
  .sk .name{margin:auto 5px;width:80px;text-align:center;font-size:12px;color:#fff;font-weight:600;}
  .sk .txt{margin:auto 0;flex:1;font-size:11px;}
  .sk[cate1]:after{content:'';position:absolute;left:0;top:0;border-left:10px solid var(--color-blue);border-top:10px solid var(--color-blue);border-right:10px solid transparent;border-bottom:10px solid transparent;}/*passive*/
  .sk[cate3]:after{content:'';position:absolute;left:0;top:0;border-left:10px solid var(--color-red);border-top:10px solid var(--color-red);border-right:10px solid transparent;border-bottom:10px solid transparent;}/*active*/
  .sk[cate4]:after{content:'';position:absolute;left:0;top:0;border-left:10px solid var(--color-point6);border-top:10px solid var(--color-point6);border-right:10px solid transparent;border-bottom:10px solid transparent;}/*active, passive*/
  .sk[cate5]:after{content:'';position:absolute;left:0;top:0;border-left:10px solid var(--color-point1);border-top:10px solid var(--color-point1);border-right:10px solid transparent;border-bottom:10px solid transparent;}/*buff*/
  .sk[cate6]:after{content:'';position:absolute;left:0;top:0;border-left:10px solid var(--color-green);border-top:10px solid var(--color-green);border-right:10px solid transparent;border-bottom:10px solid transparent;}/*passive, buff*/
  .sk[cate8]:after{content:'';position:absolute;left:0;top:0;border-left:10px solid var(--color-point2);border-top:10px solid var(--color-point2);border-right:10px solid transparent;border-bottom:10px solid transparent;}/*active, buff*/
  .sk[cate9]:after{content:'';position:absolute;left:0;top:0;border-left:10px solid var(--color-w);border-top:10px solid var(--color-w);border-right:10px solid transparent;border-bottom:10px solid transparent;}/*active, passive, buff*/
  .sk .lv_exp{align-items:flex-end;}
  .sk .lv{width:50px;text-align:center;}
  .sk .exp{position:relative;margin:auto 5px;width:100%;height:12px;background:#fff;border-radius:10px;overflow:hidden;}
  .sk .exp span{display:block;position:absolute;left:0;bottom:0;top:0;background-color:var(--color-blue);border-radius:0 10px 10px 0;}

  .e_items .item{position:absolute;width:calc(15% - 5px);padding-top:calc(15% - 5px);border:1px solid #fff;}
  .e_items .item:first-of-type{left:6%;top:5px;}
  .e_items .item:nth-of-type(2){left:6%;top:calc(25% + 2px);}
  .e_items .item:nth-of-type(3){left:6%;bottom:calc(25% + 2px);}
  .e_items .item:nth-of-type(4){left:6%;bottom:5px;}
  .e_items .item:nth-of-type(5){right:6%;top:5px;}
  .e_items .item:nth-of-type(6){right:6%;top:calc(25% + 2px);}
  .e_items .item:nth-of-type(7){right:6%;bottom:calc(25% + 2px);}
  .e_items .item:last-of-type{right:6%;bottom:5px;}
  .e_items .item0{border:none;}/*빈칸*/
  .item.item1{background:var(--color-red);}
  .item.item2{background:var(--color-green);}
  .item.item3{background:var(--color-blue);}
  .item.item4{background:var(--color-lightblue);}
  .item.item5{background:var(--color-yellow);}
  .item.item10{background:var(--color-grey);}
  .item.item11{background:var(--color-point1);}
  .item.item12{background:var(--color-b);}
  .item.item13{background:var(--color-point5);}
  .item.item14{background:var(--color-point5);}
  .item .txt{position:absolute;left:2px;right:2px;bottom:2px;font-size:11px;text-align:center;z-index:1;}
  .item .pic{position:absolute;left:0;right:0;bottom:0;top:0;width:100%;}
  .item .lv{position:absolute;left:2px;top:2px;right:2px;bottom:2px;z-index:2;text-align:left;}
  .item .hole{position:absolute;left:2px;right:2px;bottom:2px;z-index:3;}
  .item .hole .hole_slot{margin:auto 1px;width:calc(25% - 2px);}
  .item .hole .hole_slot:after{display:block;content:'';width:90%;height:0;padding-top:90%;border-radius:30px;border:1px solid #000;}

  .stone_w:after{background:radial-gradient(farthest-side at 35% 35%, #fff, #000);}
  .stone_k:after{background:radial-gradient(farthest-side at 35% 35%, #777, #000);}
  .stone_r:after{background:radial-gradient(farthest-side at 35% 35%, #f38, #000);}
  .stone_b:after{background:radial-gradient(farthest-side at 35% 35%, #37f, #000);}
  .stone_y:after{background:radial-gradient(farthest-side at 35% 35%, #f83, #000);}
  .stone_g:after{background:radial-gradient(farthest-side at 35% 35%, #3f7, #000);}
  .stone_empty:after{background:#000;}

  .h_items li{position:relative;margin:0 4.5px 4.5px 0;width:calc(12.5% - 4px);padding-top:calc(12.5% - 4px);box-sizing:border-box;border:1px solid #fff;background-position:center center;background-repeat:no-repeat;}
  .h_items li:nth-of-type(8n){margin:0 0 4.5px 0;}
`;
// const AnimatedCard = styled(animated.div)`
//   touch-action:none;
//   transform-origin:0 0;
//   position:absolute;
//   left:7.5%;
//   padding-top:120%;
//   width:85%;
// `;
const ChCard = styled.div`
  position:absolute;
  left:28%;
  top:25%;
  transform:translate(-50%,-50%) scale(.5);
  width:85%;
  font-size:0;
  z-index:1;
  & > img {
    width:100%;
  }
  &.rotate .ch_detail{
    transform:rotateY(360deg);
  }
  &.rotate .ch_back{
    transform:rotateY(180deg);
  }
`;

const ChBack = styled.div`
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  backface-visibility:hidden;
  z-index:1;
  background:url(${({cardBack}) => cardBack}) no-repeat center center;
  background-size:100%;
  box-shadow:0 0 1px #ff0,0 0 2px #fff,0 0 10px #000;
  border-radius:20px;
  overflow:hidden;
  transform:translate(-50%,-50%) rotateY(-180deg);
`;

const ChInfo = styled.div`
  position:absolute;left:0;right:0;top:42%;bottom:0;padding:10px 20px;background:rgba(0,0,0,.8);box-sizing:border-box;border:5px solid transparent;border-image:url(${({frameBack}) => frameBack}) 5 round;z-index:3;
  & > div{
    height:100%;
  }
  &{
    span{display:block;margin:auto 0;color:#fff;}
    .name{margin:auto 0;text-align:left;font-size:13px;color:#999;}
  }
`;

const Character = () => {
  const saveData = util.loadData("savedata");
  const chLength = saveData.ch.length;
  console.log(chLength);
  const [slotIdx, setSlotIdx] = useState(1);
  const [chPage, setChPage] = useState(0);
  const chRef = useRef(null);
  const iconState = [iconState0, iconState1, iconState2, iconState3, iconState4, iconState5, iconState6]
  
  // useLayoutEffect(() => {
  // }, [chRef])
  const [{x, y}, api] = useSpring(() => {
    return (
      {
        x: 0,
        y: 0
      }
    )
  });
  // const dragBind = useDrag(({ active, down, movement: [mx, my], direction: [xDir, yDir], cancel}) => {
  //   if (!active && yDir < 0 && Math.abs(my) > swipeDistance) { // 위로
  //     console.log("a");
  //     setChPage((prevPage) => {
  //       return prevPage < 6 ? ++prevPage : 0;
  //     });
  //     return;
  //   } else if (!active && yDir > 0 && Math.abs(my) > swipeDistance){ //아래로
  //     console.log("b");
  //     setChPage(0);
  //     return;
  //   };
  //   if (chPage === 0){
  //     if (!active && xDir > 0 && Math.abs(mx) > swipeDistance) {
  //       console.log("c");
  //       setSlotIdx((prevSlot) => {
  //         chRef.current.classList.contains('rotate') ? chRef.current.classList.remove('rotate') : chRef.current.classList.add('rotate');
  //         return prevSlot < 0 ? 0 : --prevSlot;
  //       });
  //       return;
  //     } else if(!active && xDir < 0 && Math.abs(mx) > swipeDistance){
  //       console.log("d");
  //       setSlotIdx((prevSlot) => {
  //         chRef.current.classList.contains('rotate') ? chRef.current.classList.remove('rotate') : chRef.current.classList.add('rotate');
  //         return ++prevSlot;
  //       });
  //       return;
  //     }
  //     api.start(
  //       () => {
  //         return (
  //           { 
  //             x: down ? mx: 0, 
  //             // y: down ? my: 0, 
  //             immediate: down
  //           }
  //         )
  //       }
  //     )
  //   }
  // },
  // { 
  //   //  axis: 'lock',
  //    bounds: { left: -50, right: 50 },
  //    delay: 1000,
  //    from: () => [x.get(), 0],
  // });
  const gestureDistance = 30;
  const gestureBind = useGesture({
    onDrag: ({ active, movement: [mx, my], direction: [xDir, yDir], cancel}) => {
      if (Math.abs(mx) <= gestureDistance){
        if (!active && yDir < 0 && Math.abs(my) > gestureDistance) { // 위로
          setChPage((prevPage) => {
            return prevPage < 6 ? ++prevPage : 0;
          });
        } else if (!active && yDir > 0 && Math.abs(my) > gestureDistance){ //아래로
          setChPage(0);
        };
      }
      if(Math.abs(my) <= gestureDistance){
        if (!active && xDir > 0 && Math.abs(mx) > gestureDistance) { //오른쪽
          setSlotIdx((prevSlot) => {
            chRef.current.classList.contains('rotate') ? chRef.current.classList.remove('rotate') : chRef.current.classList.add('rotate');
            prevSlot++;
            return prevSlot > chLength - 1 ? 0 : prevSlot;
          });
        } else if(!active && xDir < 0 && Math.abs(mx) > gestureDistance){ //왼쪽
          setSlotIdx((prevSlot) => {
            chRef.current.classList.contains('rotate') ? chRef.current.classList.remove('rotate') : chRef.current.classList.add('rotate');
            prevSlot--;
            return prevSlot < 0 ? chLength - 1 : prevSlot;
          });
        }
      }
    },
  });
  return (
    <>
      <ChWrap {...gestureBind()} style={{x, y}} backImg={imgBack} stateIcon={iconState} className={`ch_wrap page${chPage}`}>
      {/* page0(카드디자인),page1(능력치),page2(스킬),page3(인연),page4(장비),page5(적용치) */}
        <ChCard ref={chRef} className="ch_card transition">
          <Img imgurl={imgRing} />
          <CharacterCard slotIdx={slotIdx} />
          <ChBack cardBack={imgCardBack} className="ch_back transition" />
        </ChCard>
        <CharacterList />
        <CharacterHeader />
				<ChInfo stateBack={stateBack} frameBack={frameChBack} className="ch_info transition">
					<CharacterState slotIdx={slotIdx} />
					<CharacterSkill slotIdx={slotIdx} />
					<CharacterRelation slotIdx={slotIdx} />
					<CharacterItems slotIdx={slotIdx} />
					<CharacterApplyState slotIdx={slotIdx} />
				</ChInfo>
				<CharacterItemEnhance />
				<CharacterChEnhance />
			</ChWrap>
    </>
  );
}

export default Character;
