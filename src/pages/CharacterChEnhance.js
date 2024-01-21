// import { AppContext } from 'App';
// import React, { useContext } from 'react';
import frameChBack from 'images/frame/frame_chback.png';
import styled from 'styled-components';

const ChEnhance = styled.div`
  display:block;
  position:absolute;
  left:0;
  right:0;
  top:100%;
  bottom:0;
  padding:10px 20px;
  background:rgba(0,0,0,.8);
  box-sizing:border-box;
  border:5px solid transparent;
  border-image:url(${({frameBack}) => frameBack}) 5 round;
  z-index:3;
  dd{
    position:relative;
    padding:5px;
  }
`;

const CharacterItemEnhance = ({

}) => {
  // const context = useContext(AppContext);
  // const lang = React.useMemo(() => {
  //   return context.setting.lang;
  // }, [context]);
  // const imgSet = React.useMemo(() => {
  //   return context.images;
  // }, [context]);
  // const gameData = React.useMemo(() => {
  //   return context.gameData;
  // }, [context]);
  return (
    <>
      <ChEnhance frameBack={frameChBack} className="ch_enhance">
        <dl className="info_group it_group">
          <dt>HERO<span>(캐릭터 강화)</span></dt>
          <dd></dd>
        </dl>
      </ChEnhance>
    </>
  );
}

export default CharacterItemEnhance;
