import { AppContext } from 'App';
import { Text } from 'components/Atom';
import { IconPic } from 'components/ImagePic';
import { util } from 'components/Libs';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const QuickMenuBox = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: start;
  position: absolute;
  top: 0;
  z-index: 100;
  ${({showDim, gameMode, type}) => {
    if (type === 'move') {
      return `
        left: ${showDim ? 0 : -50}px;
      `;
    } else {
      return gameMode ? `
        left: -120px;
        opacity: 0.5;
        pointer-events: "none";
      ` : `
        left: ${showDim ? 0 : -50}px;
        opacity: 1;
        pointer-events: "unset";
      `;
    }
  }}
`;
const QuickMenuTitle = styled.div`
  position: relative;
  box-sizing: border-box;
  font-size: 0;
`;
const FlagIcon = styled(IconPic)`
  width: 70px;
  height: 70px;
`;
const QuickMenuBody = styled.ul`
  padding: 10px 0;
  transition: all .3s;
  li {
    margin: 0 0 5px 0;
    width: 50px;
    text-align: center;
    font-size: 0;
    .pic {
      width: 40px;
      height: 40px;
      font-size :0;
    }
    .text {
      line-height: 1;
      color: ${({theme}) => theme.color.main};
    }
  }
`;

const QuickMenu = ({
  type,
  gameMode,
  showDim,
  setShowDim,
  stay,
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
  return <QuickMenuBox showDim={showDim} type={type} gameMode={gameMode} className="transition">
    <QuickMenuTitle onClick={() => {
      setShowDim(prev => !prev);
      //{gameData.msg.button['menu'][lang]}
    }}>
      <FlagIcon type="flag" pic="icon200" isAbsolute={true} idx={util.getStringToCountryIdx(stay)}/>
    </QuickMenuTitle>
    <QuickMenuBody>
      <li><IconPic type="quickMenu" pic="icon100" idx={0} onClick={() => {
        util.saveHistory({
          location: 'cardsList',
          navigate: navigate,
          callback: () => {},
          isNavigate: true,
        });//히스토리 저장
        // const sData = {...saveData};
        //   const aa = sData.ch.concat(sData.ch);
        //   const bb = aa.concat(aa);
        //   const cc = bb.concat(bb);
        //   const dd = cc.concat(cc);
        //   sData.ch = dd;
        //   changeSaveData(sData);
      }}/><Text className="text">{gameData.msg.button['cards'][lang]}</Text></li>
      <li><IconPic type="quickMenu" pic="icon100" idx={1} onClick={() => {
        util.saveHistory({
          location: 'inven',
          navigate: navigate,
          callback: () => {},
          isNavigate: true,
        });//히스토리 저장
      }}/><Text className="text">{gameData.msg.button['inven'][lang]}</Text></li>
      <li><IconPic type="quickMenu" pic="icon100" idx={2} onClick={() => {
        util.saveHistory({
          location: 'cardPlacement',
          navigate: navigate,
          callback: () => {},
          isNavigate: true,
        });//히스토리 저장
      }}/><Text className="text">{gameData.msg.button['cardPlacement'][lang]}</Text></li>
      <li><IconPic type="quickMenu" pic="icon100" idx={3} onClick={() => {
        util.saveHistory({
          location: 'enhancingCards',
          navigate: navigate,
          callback: () => {},
          isNavigate: true,
        });//히스토리 저장
      }}/><Text className="text">{gameData.msg.button['enhancingCards'][lang]}</Text></li>
      <li><IconPic type="quickMenu" pic="icon100" idx={4} onClick={() => {
        util.saveHistory({
          location: 'enhancingStickers',
          navigate: navigate,
          callback: () => {},
          isNavigate: true,
        });//히스토리 저장
      }}/><Text className="text">{gameData.msg.button['enhancingStickers'][lang]}</Text></li>
      <li><IconPic type="quickMenu" pic="icon100" idx={5} onClick={() => {
        util.saveHistory({
          location: 'composite',
          navigate: navigate,
          callback: () => {},
          isNavigate: true,
        });//히스토리 저장
      }}/><Text className="text">{gameData.msg.button['composite'][lang]}</Text></li>
      <li><IconPic type="quickMenu" pic="icon100" idx={6} onClick={() => {
      }}/><Text className="text">{gameData.msg.button['chat'][lang]}</Text></li>
      <li><IconPic type="quickMenu" pic="icon100" idx={7} onClick={() => {
        util.saveHistory({
          location: 'setup',
          navigate: navigate,
          callback: () => {},
          isNavigate: true,
        });//히스토리 저장
      }}/><Text className="text">{gameData.msg.button['setup'][lang]}</Text></li>
    </QuickMenuBody>
  </QuickMenuBox>
}

export default QuickMenu;