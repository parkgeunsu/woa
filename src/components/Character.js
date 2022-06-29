import React, { useState, useRef, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from 'App';
import { useGesture, useDrag } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';
import 'css/character.css';

import CharacterState from 'components/CharacterState';
import CharacterElement from 'components/CharacterElement';
import CharacterSkill from 'components/CharacterSkill';
import CharacterRelation from 'components/CharacterRelation';
import CharacterItems from 'components/CharacterItems';
import CharacterApplyState from 'components/CharacterApplyState';
import CharacterItemEnhance from 'components/CharacterItemEnhance';
import CharacterChEnhance from 'components/CharacterChEnhance';
import CharacterList from 'components/CharacterList';
import CharacterHeader from 'components/CharacterHeader';
import CharacterCard from 'components/CharacterCard';

const Img = styled.img.attrs(
  ({imgurl}) => ({
    src: imgurl 
  })
)``;
const ChWrap = styled.div`
  background:url(${({backImg}) => backImg});background-size:cover;
  .st0 .ico{background:url(${({stateIcon}) => stateIcon[0]}) no-repeat center center;background-size:100%;}
  .st1 .ico{background:url(${({stateIcon}) => stateIcon[1]}) no-repeat center center;background-size:100%;}
  .st2 .ico{background:url(${({stateIcon}) => stateIcon[2]}) no-repeat center center;background-size:100%;}
  .st3 .ico{background:url(${({stateIcon}) => stateIcon[3]}) no-repeat center center;background-size:100%;}
  .st4 .ico{background:url(${({stateIcon}) => stateIcon[4]}) no-repeat center center;background-size:100%;}
  .st5 .ico{background:url(${({stateIcon}) => stateIcon[5]}) no-repeat center center;background-size:100%;}
  .st6 .ico{background:url(${({stateIcon}) => stateIcon[6]}) no-repeat center center;background-size:100%;}
`;
// const AnimatedCard = styled(animated.div)`
//   touch-action:none;
//   transform-origin:0 0;
//   position:absolute;
//   left:7.5%;
//   padding-top:120%;
//   width:85%;
// `;

const ChBack = styled.div`
  background:url(${({cardBack}) => cardBack}) no-repeat center center;
  background-size:100%;
`;
const ChInfo = styled.div`
  border-image:url(${({frameBack}) => frameBack}) 5 round;z-index:3;
`;
const Character = ({
  saveData,
  changeSaveData,
}) => {
  const imgSet = useContext(AppContext).images;
  const chLength = saveData.ch.length;
  const [slotIdx, setSlotIdx] = useState(0);
  const [chPage, setChPage] = useState(0);
  const chRef = useRef(null);
  const iconState = [imgSet.iconState[0], imgSet.iconState[1], imgSet.iconState[2], imgSet.iconState[3], imgSet.iconState[4], imgSet.iconState[5], imgSet.iconState[6]];
  const changeChPage = (idx) => {
    setChPage(idx);
  }
  const changeChSlot = (idx) => {
    setSlotIdx(idx);
  }

  const [{x, y}, api] = useSpring(() => {
    return (
      {
        x: 0,
        y: 0
      }
    )
  });
  const test = {
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
  }
  const gestureDistance = 20;
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
            prevSlot--;
            return prevSlot < 0 ? chLength - 1 : prevSlot;
          });
        } else if(!active && xDir < 0 && Math.abs(mx) > gestureDistance){ //왼쪽
          setSlotIdx((prevSlot) => {
            chRef.current.classList.contains('rotate') ? chRef.current.classList.remove('rotate') : chRef.current.classList.add('rotate');
            prevSlot++;
            return prevSlot > chLength - 1 ? 0 : prevSlot;
          });
        }
      }
    },
  });
  return (
    <ChWrap className={`ch_wrap page${chPage}`} {...gestureBind()} style={{x, y}} backImg={imgSet.back[0]} stateIcon={iconState}>
      <div ref={chRef} className="ch_card transition">
        <Img imgurl={imgSet.etc.imgRing} />
        <CharacterCard saveData={saveData} slotIdx={slotIdx} />
        <ChBack cardBack={imgSet.etc.imgCardBack} className="ch_back transition" />
      </div>
      <CharacterList saveData={saveData} changeChSlot={changeChSlot} slotIdx={slotIdx} />
      <CharacterHeader saveData={saveData} chPage={chPage} changeChPage={changeChPage} slotIdx={slotIdx} changeSaveData={changeSaveData} />
      <ChInfo stateBack={imgSet.etc.stateBack} frameBack={imgSet.etc.frameChBack} className="ch_info transition">
        <CharacterState saveData={saveData} slotIdx={slotIdx} />
        <CharacterElement saveData={saveData} slotIdx={slotIdx} />
        <CharacterSkill saveData={saveData} slotIdx={slotIdx} />
        <CharacterRelation saveData={saveData} slotIdx={slotIdx} />
        <CharacterItems saveData={saveData} slotIdx={slotIdx} changeSaveData={changeSaveData} />
        <CharacterApplyState saveData={saveData} slotIdx={slotIdx} />
      </ChInfo>
      <CharacterItemEnhance saveData={saveData} slotIdx={slotIdx} />
      <CharacterChEnhance saveData={saveData} slotIdx={slotIdx} />
    </ChWrap>
  );
}

export default Character;
