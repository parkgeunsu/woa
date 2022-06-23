import React, { useState, useContext } from 'react';
import { AppContext } from 'App';
import styled from 'styled-components';
import { util } from 'components/Libs';

import frameChBack from 'images/frame/frame_chback.png';
import imgMenu0 from 'images/ico/ch_menu0.png';
import imgMenu1 from 'images/ico/ch_menu1.png';
import imgMenu2 from 'images/ico/ch_menu2.png';
import imgMenu3 from 'images/ico/ch_menu3.png';
import imgMenu4 from 'images/ico/ch_menu4.png';

const ChHeader = styled.div`
  display:flex;position:absolute;right:5%;bottom:59%;padding:5;width:40%;flex-direction:column;background:rgba(0,0,0,.6);box-sizing:border-box;border:5px solid transparent;border-image:url(${({frameBack}) => frameBack}) 5 round;
  & {
    ul{margin:5px 0;}
    li{position:relative;margin:0 5px 5px 5px;width:calc(100% - 10px);}
    li .na{margin:auto 0;line-height:1;font-size:11px;color:#fff;flex-grow:0;}
    .txt{margin:2px 5px 0 0;text-align:right;font-size:0;}
    .txt span{line-height:1;font-size:11px;font-weight:600;color:#fff;}
    .exp_bar{position:relative;margin:auto 0 auto 5px;height:8px;background:#fff;border-radius:10px;flex-grow:1;overflow:hidden;}
    .exp_bar span{display:block;position:absolute;left:0;bottom:0;top:0;background-color:var(--color-red);border-radius:0 10px 10px 0;}
    .stateType_actionPoint{justify-content:space-between;}
    .bar{margin:0 3px;vertical-align:middle;}
  }
`;
const ChMenu = styled.div`/* 인물카드 */
  display:flex;
  flex-wrap:wrap;
`;
const ChMenuButton = styled.button`
  width:25%;
  padding-top:25%;
  background:url(${({backImg}) => backImg}) no-repeat center center;
  background-size:100%;
  font-size:0;
  opacity:.4;
  &.on{outline:1px solid #fff;background-color:rgba(255,255,255,.5);opacity:1;}
`;
// this.el.ac_max.innerHTML = saveData.ch[slotIdx].st7;

const ChracterHeader = ({
  saveData,
  slotIdx,
  chPage,
  changeChPage,
}) => {
  const gameData = useContext(AppContext).gameData;
  const saveExp = {
    current: saveData.ch[slotIdx].exp,
    max: gameData.exp['grade'+saveData.ch[slotIdx].grade][saveData.ch[slotIdx].lv-1]
  }
  const saveHasExp = {
    current: saveData.ch[slotIdx].hasExp,
    max: gameData.hasMaxExp[saveData.ch[slotIdx].grade]
  }
  const chMenu = [
    {backImg: imgMenu0, title: "카드기본"},
    {backImg: imgMenu1, title: "속성치"},
    {backImg: imgMenu1, title: "능력치"},
    {backImg: imgMenu2, title: "스킬"},
    {backImg: imgMenu3, title: "인연"},
    {backImg: imgMenu3, title: "장비"},
    {backImg: imgMenu4, title: "적용치"},
  ];
  return (
    <>
      <ChHeader frameBack={frameChBack} className="ch_header transition">
        <ul>
          <li className="stateType_actionPoint" flex="true">
            <span className="state_type">{gameData.stateType[saveData.ch[slotIdx].stateType].na}</span>
            <span className="action_point">
              <span className="current">{saveData.ch[slotIdx].actionPoint}</span><span className="bar">/</span><span className="max">{saveData.ch[slotIdx].rSt6}</span>
            </span>
          </li>
          <li className="exp" flex-h="true">
            <div className="gauge" flex-center="true">
              <span className="na">경험치</span>
              <span className="exp_bar">
                <span className="gradient_dark transition" style={{ width: util.getPercent(saveExp.max, saveExp.current)+'%'}}></span>
              </span>
            </div>
            <div className="txt">
              <span className="current">{saveExp.current}</span><span className="bar">/</span><span className="max">{saveExp.max}</span>
            </div>
          </li>
          <li className="has_exp" flex-h="true">
            <div className="gauge" flex-center="true">
              <span className="na">누적경험치</span>
              <span className="exp_bar">
                <span className="gradient_dark transition" style={{ width: util.getPercent(saveHasExp.max, saveHasExp.current)+'%'}}></span>
              </span>
            </div>
            <div className="txt">
              <span className="current">{saveHasExp.current}</span><span className="bar">/</span><span className="max">{saveHasExp.max}</span>
            </div>
          </li>
        </ul>
        <ChMenu className="ch_menu transition">
        {chMenu && chMenu.map((data, idx) => {
          return (
            <ChMenuButton className={idx === chPage ? "on" : ""} key={`chmenubutton${idx}`} onClick={() => {changeChPage(idx)}} backImg={data.backImg} title={data.title}>{idx}</ChMenuButton>
          )
        })}
        </ChMenu>
      </ChHeader>
    </>
  );
}

export default ChracterHeader;
