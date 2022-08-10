import React, { useState, useContext, useLayoutEffect, useRef } from 'react';
import { AppContext } from 'App';
import { util } from 'components/Libs';
import styled from 'styled-components';
import PopupContainer from 'components/PopupContainer';
import Popup from 'components/Popup';
const setPos = (pos) => {
  return `
    ${pos[0]}:10px;
    ${pos[1]}:10px;
  `
}
const QuestionButton = styled.div`
  position:absolute;
  ${({pos}) => setPos(pos)};
  background:url(${({backImg}) => backImg}) no-repeat center center;
  background-size:100%;
  width:${({size}) => size}px;
  height:${({size}) => size}px;
  border-radius:${({size}) => size / 2}px;
  box-shadow:0 0 7px ${({shadowColor}) => shadowColor};
`;
const GuideQuestion = ({
  size,
  pos,
  onclick,
  colorSet,
}) => {
  const imgSet = useContext(AppContext).images;
  const backImg = colorSet === 'black' ? imgSet.etc.questionBlack : imgSet.etc.questionWhite;
  const shadowColor = colorSet === 'black' ? '#fff' : '#000';
  return (
    <QuestionButton size={size} pos={pos} shadowColor={shadowColor} backImg={backImg} onClick={onclick}></QuestionButton>
  );
}

export default GuideQuestion;
