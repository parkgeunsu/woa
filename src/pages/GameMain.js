import { AppContext } from 'App';
import { IconButton } from 'components/Button';
import { util } from 'components/Libs';
import CharacterCard from 'pages/CharacterCard';
import Roulette from 'pages/Roulette';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

const QuickMenuBox = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: start;
  position: absolute;
  left: ${({showMenu}) => showMenu ? 0 : -50}px;
  top: 0;
  z-index: 100;
  & > * {
    ${({showMenu}) => {
      return showMenu ? `box-shadow: 3px 3px 5px #000` : '';
    }};
  }
`;
const QuickMenuTitle = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  padding: 20px 0 20px 7px;
  width: 40px;
  box-sizing: border-box;
  writing-mode: vertical-lr;
  text-orientation: upright;
  background: ${({theme}) => theme.color.menu};
  font-size: ${({theme}) => theme.font.t4};
  border-radius: 0 20px 20px 0;
  transition: all .3s;
`;
const QuickMenuBody = styled.ul`
  padding: 10px 0;
  width: 50px;
  background: ${({theme}) => theme.color.menu};
  border-radius: 0 0 20px 0;
  transition: all .3s;
`;
const CardGroup = styled.div`
  width: 100%;
  height: 100%;
  perspective: 650px;
  perspective-origin: 50% 20%;
  transform-style: preserve-3d;
  backface-visibility: hidden;
`;

const Cards = styled.div`
  position: absolute;
  left: 50%;
  top: ${({idx}) => {
    return `${80 - idx * 1.5}%`; //10%
  }};
  transform-origin: 50% 50%;
  transform: translate(-50%, -50%) rotateX(70deg) rotateY(0deg) rotateZ(0deg);
  box-shadow: ${({shadow}) => `0 0 20px ${shadow}`};
`;
const CardBack = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background:url(${({cardBack}) => cardBack}) no-repeat center center;
  background-size:100%;
`;
const GameMain = ({
  changePage,
  saveData,
  changeSaveData,
  navigate,
  cityIdx,
  pageData,
  gameMode,
  lang,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
  const [showMenu, setShowMenu] = useState(false);
  const [cardDeck, setCardDeck] = useState([]);
  useEffect(() => {
    setCardDeck(saveData.ch);
  }, [saveData]);
  return (
    <>
      <QuickMenuBox showMenu={showMenu} className="transition">
        <QuickMenuTitle onClick={() => {
          setShowMenu(prev => !prev);
        }}>{gameData.msg.button['menu'][lang]}</QuickMenuTitle>
        <QuickMenuBody>
          <li><IconButton size={50} icon={imgSet.icon.iconCard} onClick={() => {
            util.saveHistory(() => {
              navigate('cards');
              changePage('cards');
            });//히스토리 저장
            // const sData = {...saveData};
            //   const aa = sData.ch.concat(sData.ch);
            //   const bb = aa.concat(aa);
            //   const cc = bb.concat(bb);
            //   const dd = cc.concat(cc);
            //   sData.ch = dd;
            //   changeSaveData(sData);
          }}>{gameData.msg.button['cards'][lang]}</IconButton></li>
          <li><IconButton size={50} icon={imgSet.icon.iconInven} onClick={() => {
            util.saveHistory(() => {
              navigate('inven');
              changePage('inven');
            });//히스토리 저장
          }}>{gameData.msg.button['inven'][lang]}</IconButton></li>
          <li><IconButton size={50} icon={imgSet.icon.iconCardPlacement} onClick={() => {
            util.saveHistory(() => {
              navigate('cardPlacement');
              changePage('cardPlacement');
            });//히스토리 저장
          }}>{gameData.msg.button['cardPlacement'][lang]}</IconButton></li>
          <li><IconButton size={50} icon={imgSet.icon.iconEnhancingCards} onClick={() => {
            util.saveHistory(() => {
              navigate('enhancingCards');
              changePage('enhancingCards');
            });//히스토리 저장
          }}>{gameData.msg.button['enhancingCards'][lang]}</IconButton></li>
          <li><IconButton size={50} icon={imgSet.icon.iconEnhancingStickers} onClick={() => {
            util.saveHistory(() => {
              navigate('enhancingStickers');
              changePage('enhancingStickers');
            });//히스토리 저장
          }}>{gameData.msg.button['enhancingStickers'][lang]}</IconButton></li>
          <li><IconButton size={50} icon={imgSet.icon.iconComposite} onClick={() => {
            util.saveHistory(() => {
              navigate('composite');
              changePage('composite');
            });//히스토리 저장
          }}>{gameData.msg.button['composite'][lang]}</IconButton></li>
          <li><IconButton size={50} icon={imgSet.icon.iconChat} onClick={() => {
          }}>{gameData.msg.button['chat'][lang]}</IconButton></li>
          <li><IconButton size={50} icon={imgSet.icon.iconSetup} onClick={() => {
            util.saveHistory(() => {
              navigate('setup');
              changePage('setup');
            });//히스토리 저장
          }}>{gameData.msg.button['setup'][lang]}</IconButton></li>
        </QuickMenuBody>
      </QuickMenuBox>
      <Roulette gameMode={gameMode} navigate={navigate} lang={lang} />
      <CardGroup>
        {cardDeck?.map((cardData, idx) => {
          const shadowColor = gameData.chGradeColor[cardData.grade];
          return (
            <Cards shadow={shadowColor} idx={idx} key={`card${idx}`} onTouchStart={(e) => {

            }} onTouchMove={(e) => {

            }} onTouchEnd={() => {

            }}>
              <CharacterCard size="90" equalSize={false} saveData={saveData} slotIdx={idx}/>
              <CardBack cardBack={imgSet.etc.imgCardBack} />
            </Cards>
          );
        })}
      </CardGroup>
    </>
  );
};

export default GameMain;
