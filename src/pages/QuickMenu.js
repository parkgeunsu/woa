import { AppContext } from 'App';
import { IconButton } from 'components/Button';
import { util } from 'components/Libs';
import { useContext, useState } from 'react';
import styled from 'styled-components';

const QuickMenuBox = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: start;
  position: absolute;
  top: 0;
  z-index: 100;
  ${({showMenu, gameMode, type}) => {
    if (type === 'move') {
      return `
        left: ${showMenu ? 0 : -50}px;
      `;
    } else {
      return `
        left: ${gameMode !== '' ? -90 : showMenu ? 0 : -50}px;
        opacity: ${gameMode !== '' ? 0.5 : 1};
        pointer-events: ${gameMode !== '' ? 'none' : 'unset'};
      `;
    }
  }}
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

const QuickMenu = ({
  type,
  changePage,
  gameMode,
  navigate,
  lang,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
  const [showMenu, setShowMenu] = useState(false);
  return <QuickMenuBox showMenu={showMenu} type={type} gameMode={gameMode} className="transition">
    <QuickMenuTitle onClick={() => {
      setShowMenu(prev => !prev);
    }}>{gameData.msg.button['menu'][lang]}</QuickMenuTitle>
    <QuickMenuBody>
      <li><IconButton size={50} icon={imgSet.icon.iconCard} onClick={() => {
        util.saveHistory(() => {
          navigate('cardsList');
          changePage('cardsList');
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
}

export default QuickMenu;