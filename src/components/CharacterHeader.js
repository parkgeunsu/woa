import React, { useContext, useLayoutEffect } from 'react';
import { AppContext } from 'App';
import styled from 'styled-components';
import { util } from 'components/Libs';

const ChHeader = styled.div`
  border-image:url(${({frameBack}) => frameBack}) 5 round;
`;
const ChMenuButton = styled.button`
  background:url(${({backImg}) => backImg}) no-repeat center center;
  background-size:100%;
`;
const StateType = styled.div`
  height:20px;
  &:before{content:'';
  display:inline-block;margin:0 5px 0 0;width:20px;height:20px;
  background:#fff url(${({img}) => img}) no-repeat center center;
  background-size:100%;
  border-radius:6px;vertical-align:middle;}
  span{vertical-align:middle;}
`;
const ChracterHeader = ({
  saveData,
  slotIdx,
  chPage,
  changeChPage,
  changeSaveData,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
  const currentTime = useContext(AppContext).currentTime;
  const saveExp = {
    current: saveData.ch[slotIdx].exp,
    max: gameData.exp['grade'+saveData.ch[slotIdx].grade][saveData.ch[slotIdx].lv-1]
  }
  const saveHasExp = {
    current: saveData.ch[slotIdx].hasExp,
    max: gameData.hasMaxExp[saveData.ch[slotIdx].grade]
  }
  const chMenu = [
    {backImg: imgSet.menu[0], title: "카드기본"},
    {backImg: imgSet.menu[1], title: "속성치"},
    {backImg: imgSet.menu[2], title: "능력치"},
    {backImg: imgSet.menu[3], title: "동물스킬"},
    {backImg: imgSet.menu[4], title: "스킬"},
    {backImg: imgSet.menu[5], title: "인연"},
    {backImg: imgSet.menu[6], title: "장비"},
    {backImg: imgSet.menu[7], title: "적용치"},
  ];
  return (
    <>
      <ChHeader frameBack={imgSet.etc.frameChBack} className="ch_header transition">
        {currentTime}
        <ul>
          <li className="stateType_actionPoint" flex="true">
            <StateType className="state_type" img={imgSet.icon[`iconStateType${saveData.ch[slotIdx].stateType}`]}><span>{gameData.stateType[saveData.ch[slotIdx].stateType].na}</span></StateType>
            <span className="action_point">
              <span className="current">{saveData.ch[slotIdx].actionPoint}</span><span className="bar">/</span><span className="max">50</span>
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
        <div className="ch_menu transition">
        {chMenu && chMenu.map((data, idx) => {
          return (
            <ChMenuButton className={`ch_menu_bt ${idx === chPage ? "on" : ""}`} key={`chmenubutton${idx}`} onClick={() => {changeChPage(idx)}} backImg={data.backImg} title={data.title}>{idx}</ChMenuButton>
          )
        })}
        </div>
      </ChHeader>
    </>
  );
}

export default ChracterHeader;
