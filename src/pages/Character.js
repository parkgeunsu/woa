import { AppContext } from 'App';
import 'css/character.css';
import { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { util } from 'components/Libs';
import CharacterAnimalSkill from 'pages/CharacterAnimalSkill';
import CharacterApplyState from 'pages/CharacterApplyState';
import CharacterCard from 'pages/CharacterCard';
import CharacterChEnhance from 'pages/CharacterChEnhance';
import CharacterElement from 'pages/CharacterElement';
import CharacterHeader from 'pages/CharacterHeader';
import CharacterItemEnhance from 'pages/CharacterItemEnhance';
import CharacterItems from 'pages/CharacterItems';
import CharacterList from 'pages/CharacterList';
import CharacterRelation from 'pages/CharacterRelation';
import CharacterSkill from 'pages/CharacterSkill';
import CharacterState from 'pages/CharacterState';

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
  navigate,
  saveData,
  changeSaveData,
  currentTime,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
	const setting = useContext(AppContext).setting,
    lang = setting.lang;
  const [slotIdx, setSlotIdx] = useState(0);
  const [chPage, setChPage] = useState(0);
  // const chShow = useRef(false);
  const [chShow, setChShow] = useState(false);
  const chRef = useRef(null);
  const chLengthRef = useRef();
  const iconState = [imgSet.iconState[0], imgSet.iconState[1], imgSet.iconState[2], imgSet.iconState[3], imgSet.iconState[4], imgSet.iconState[5], imgSet.iconState[6]];
  useEffect(() => {
    if (Object.keys(saveData).length !== 0) {
      chLengthRef.current = saveData.ch.length;
    }
  }, [saveData]);
  const cardShow = () => {
    setChShow(true);
  }
  const changeChPage = (idx) => {
    setChPage(idx);
  }
  const changeChSlot = (idx) => {
    setSlotIdx(idx);
  }
  const touchPosition = useState(null);
  const hasScrollElement = useRef(null);
  const handleTouchStart = (e) => {
    hasScrollElement.current = e.target.closest(".scroll-y");
    const touchDown = [e.touches[0].clientX, e.touches[0].clientY];
    touchPosition.current = touchDown;
  }
  const handleTouchMove = (e) => {
    const touchDown = touchPosition.current;
    const currentTouch = [e.touches[0].clientX, e.touches[0].clientY];
    if (!touchDown || !currentTouch) {
      return;
    }
    const diffX = touchDown[0] - currentTouch[0],
      diffY = touchDown[1] - currentTouch[1];
    if (chShow) {
      if (hasScrollElement.current === null) {
        if (Math.abs(diffX) > Math.abs(diffY)){
          if (diffX > 5) { //오른쪽
            setSlotIdx((prevSlot) => {
              chRef.current.classList.contains('rotate') ? chRef.current.classList.remove('rotate') : chRef.current.classList.add('rotate');
              prevSlot--;
              return prevSlot < 0 ? chLengthRef.current - 1 : prevSlot;
            });
          }
          if (diffX < -5) { //왼쪽
            setSlotIdx((prevSlot) => {
              chRef.current.classList.contains('rotate') ? chRef.current.classList.remove('rotate') : chRef.current.classList.add('rotate');
              prevSlot++;
              return prevSlot > chLengthRef.current - 1 ? 0 : prevSlot;
            });
          }
        } else {
          if (diffY > 5) { //위로
            setChPage((prevPage) => {
              return prevPage < 6 ? ++prevPage : 0;
            });
          }
          if (diffY < -5) { //아래로
            setChPage(0);
          }
        }
      } else {
        if (Math.abs(diffX) > Math.abs(diffY)){
          if (diffX > 5) { //오른쪽
            setSlotIdx((prevSlot) => {
              chRef.current.classList.contains('rotate') ? chRef.current.classList.remove('rotate') : chRef.current.classList.add('rotate');
              prevSlot--;
              return prevSlot < 0 ? chLengthRef.current - 1 : prevSlot;
            });
          }
          if (diffX < -5) { //왼쪽
            setSlotIdx((prevSlot) => {
              chRef.current.classList.contains('rotate') ? chRef.current.classList.remove('rotate') : chRef.current.classList.add('rotate');
              prevSlot++;
              return prevSlot > chLengthRef.current - 1 ? 0 : prevSlot;
            });
          }
        }
      }
    }
    touchPosition.current = null;
    hasScrollElement.current = null;
  }
  return (
    <ChWrap className={`ch_wrap page${chPage}`}  backImg={imgSet.back[0]} stateIcon={iconState} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
      <div style={{position:"absolute",right:"10px",top:"50px",zIndex:100}}>
        <button onClick={() => {
          const option = {
            type:'equip',
            items:Math.ceil(Math.random()*3),//장비만 해당
            //아이템종류, 세부종류(검,단검), 매직등급
            lv:Math.round(Math.random()*100),
            sealed:true,
          }
          util.getItem(saveData, gameData, changeSaveData, option, true, lang);
        }}>아이템 추가</button><br/>
        <button onClick={() => {
          const option = {
            type:'equip',
            items:Math.ceil(Math.random()*2),//장비만 해당
            lv:Math.round(Math.random()*100),
            sealed:true,
          }
          util.getItem(saveData, gameData, changeSaveData, option, true, lang);
        }}>동물스킬 리셋</button>
        {currentTime}
      </div>
      {!chShow && (
        <div className="card_grid">
          <CharacterList saveData={saveData} changeChSlot={changeChSlot} slotIdx={slotIdx} cardShow={cardShow} type="list"/>
        </div>
      )}
      {chShow && (
        <>
          <div ref={chRef} className="ch_card transition">
            <Img imgurl={imgSet.etc.imgRing} />
            <CharacterCard saveData={saveData} slotIdx={slotIdx} />
            <ChBack cardBack={imgSet.etc.imgCardBack} className="ch_back transition" />
          </div>
          <CharacterList saveData={saveData} changeChSlot={changeChSlot} slotIdx={slotIdx} type="paging"/>
          <CharacterHeader saveData={saveData} chPage={chPage} changeChPage={changeChPage} slotIdx={slotIdx} changeSaveData={changeSaveData} currentTime={currentTime} />
          <ChInfo frameBack={imgSet.etc.frameChBack} className="ch_info transition">
            <CharacterState saveData={saveData} slotIdx={slotIdx} />
            <CharacterElement saveData={saveData} slotIdx={slotIdx} />
            <CharacterAnimalSkill saveData={saveData} slotIdx={slotIdx} changeSaveData={changeSaveData} />
            <CharacterSkill saveData={saveData} slotIdx={slotIdx} />
            <CharacterRelation saveData={saveData} slotIdx={slotIdx} />
            <CharacterItems navigate={navigate} saveData={saveData} slotIdx={slotIdx} changeSaveData={changeSaveData} />
            <CharacterApplyState saveData={saveData} slotIdx={slotIdx}/>
          </ChInfo>
          <CharacterItemEnhance saveData={saveData} slotIdx={slotIdx} />
          <CharacterChEnhance saveData={saveData} slotIdx={slotIdx} />
        </>
      )}
    </ChWrap>
  );
}

export default Character;
