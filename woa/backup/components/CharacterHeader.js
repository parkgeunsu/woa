import React, { useState } from 'react';
import styled from 'styled-components';

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
  width:33.3%;
  padding-top:33.3%;
  background:url(${({backImg}) => backImg}) no-repeat center center;
  background-size:100%;
  font-size:0;
  opacity:.4;
  &.on{outline:1px solid #fff;background-color:rgba(255,255,255,.5);opacity:1;}
`;

const ChracterHeader = () => {
  const chMenu = [
    {backImg: imgMenu0, title: "카드기본"},
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
            <span className="state_type"></span>
            <span className="action_point">
              <span className="current"></span><span className="bar">/</span><span className="max"></span>
            </span>
          </li>
          <li className="exp" flex-h="true">
            <div className="gauge" flex-center="true">
              <span className="na">경험치</span>
              <span className="exp_bar">
                <span className="gradient_dark transition"></span>
              </span>
            </div>
            <div className="txt">
              <span className="current"></span><span className="bar">/</span><span className="max"></span>
            </div>
          </li>
          <li className="has_exp" flex-h="true">
            <div className="gauge" flex-center="true">
              <span className="na">누적경험치</span>
              <span className="exp_bar">
                <span className="gradient_dark transition"></span>
              </span>
            </div>
            <div className="txt">
              <span className="current"></span><span className="bar">/</span><span className="max"></span>
            </div>
          </li>
        </ul>
        <ChMenu className="ch_menu transition">
        {chMenu && chMenu.map((data, idx) => {
          return (
            <ChMenuButton key={`chmenubutton${idx}`} backImg={data.backImg} title={data.title}>{idx}</ChMenuButton>
          )
        })}
        </ChMenu>
      </ChHeader>
    </>
  );
}

export default ChracterHeader;
