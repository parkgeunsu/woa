import { AppContext } from 'App';
import { IconPic } from 'components/ImagePic';
import { util } from 'components/Libs';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  background: ${({theme}) => theme.color.menu};
  border-radius: 0 0 20px 0;
  transition: all .3s;
  li {
    width: 50px;
    height: 50px;
  }
`;

const QuickMenu = ({
  type,
  gameMode,
}) => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const lang = React.useMemo(() => {
    return context.setting.lang;
  }, [context]);
  // const imgSet = React.useMemo(() => {
  //   return context.images;
  // }, [context]);
  const gameData = React.useMemo(() => {
    return context.gameData;
  }, [context]);
  const [showMenu, setShowMenu] = useState(false);
  return <QuickMenuBox showMenu={showMenu} type={type} gameMode={gameMode} className="transition">
    <QuickMenuTitle onClick={() => {
      setShowMenu(prev => !prev);
    }}>{gameData.msg.button['menu'][lang]}</QuickMenuTitle>
    <QuickMenuBody>
      <li><IconPic type="quickMenu" pic="icon100" idx={0} onClick={() => {
        util.saveHistory(() => {
          navigate('../cardsList');
        });//히스토리 저장
        // const sData = {...saveData};
        //   const aa = sData.ch.concat(sData.ch);
        //   const bb = aa.concat(aa);
        //   const cc = bb.concat(bb);
        //   const dd = cc.concat(cc);
        //   sData.ch = dd;
        //   changeSaveData(sData);
      }}>{gameData.msg.button['cards'][lang]}</IconPic></li>
      <li><IconPic type="quickMenu" pic="icon100" idx={1} onClick={() => {
        util.saveHistory(() => {
          navigate('../inven');
          console.log('aaa');
        });//히스토리 저장
      }}>{gameData.msg.button['inven'][lang]}</IconPic></li>
      <li><IconPic type="quickMenu" pic="icon100" idx={2} onClick={() => {
        util.saveHistory(() => {
          navigate('../cardPlacement');
        });//히스토리 저장
      }}>{gameData.msg.button['cardPlacement'][lang]}</IconPic></li>
      <li><IconPic type="quickMenu" pic="icon100" idx={3} onClick={() => {
        util.saveHistory(() => {
          navigate('../enhancingCards');
        });//히스토리 저장
      }}>{gameData.msg.button['enhancingCards'][lang]}</IconPic></li>
      <li><IconPic type="quickMenu" pic="icon100" idx={4} onClick={() => {
        util.saveHistory(() => {
          navigate('../enhancingStickers');
        });//히스토리 저장
      }}>{gameData.msg.button['enhancingStickers'][lang]}</IconPic></li>
      <li><IconPic type="quickMenu" pic="icon100" idx={5} onClick={() => {
        util.saveHistory(() => {
          navigate('../composite');
        });//히스토리 저장
      }}>{gameData.msg.button['composite'][lang]}</IconPic></li>
      <li><IconPic type="quickMenu" pic="icon100" idx={6} onClick={() => {
      }}>{gameData.msg.button['chat'][lang]}</IconPic></li>
      <li><IconPic type="quickMenu" pic="icon100" idx={7} onClick={() => {
        util.saveHistory(() => {
          navigate('../setup');
        });//히스토리 저장
      }}>{gameData.msg.button['setup'][lang]}</IconPic></li>
    </QuickMenuBody>
  </QuickMenuBox>
}

export default QuickMenu;