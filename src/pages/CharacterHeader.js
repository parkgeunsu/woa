import { AppContext } from 'App';
import { IconPic } from 'components/ImagePic';
import { util } from 'components/Libs';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';

const ChHeader = styled.div`
  border-image:url(${({frameBack}) => frameBack}) 5 round;
`;
const ChMenu = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const StyledIconPic = styled(IconPic)`
  padding-top: 25%;
  width: 25%;
  font-size: 0;
  ${({selected}) => selected ? `
    opacity: 1;
    filter: unset;
  ` : `
    opacity: .3;
    filter: blur(1px);
  `}
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
  lang,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
  const currentTime = useContext(AppContext).currentTime;
  const [size, setSize] = useState(0);
  const saveCh = React.useMemo(() => saveData.ch[slotIdx], [saveData, slotIdx]);
  const saveExp = React.useMemo(() => {
    return {
      current: saveCh.exp,
      max: gameData.exp['grade' + saveCh.grade][saveCh.lv-1]
    }
  }, [gameData, saveCh]);
  const saveHasExp = React.useMemo(() => {
    return {
      current: saveCh.hasExp,
      max: gameData.hasMaxExp[saveCh.grade]
    }
  }, [gameData, saveCh]);
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
              <span className="na">{gameData.msg.info.exp[lang]}</span>
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
              <span className="na">{gameData.msg.info.cumulativeExp[lang]}</span>
              <span className="exp_bar">
                <span className="gradient_dark transition" style={{ width: util.getPercent(saveHasExp.max, saveHasExp.current)+'%'}}></span>
              </span>
            </div>
            <div className="txt">
              <span className="current">{saveHasExp.current}</span><span className="bar">/</span><span className="max">{saveHasExp.max}</span>
            </div>
          </li>
        </ul>
        <ChMenu className="transition">
        {gameData.chMenu.map((data, idx) => {
          return (
            <StyledIconPic selected={idx === chPage} key={`chmenubutton${idx}`} pic="icon100" idx={idx} onClick={() => {
              changeChPage(idx)
            }} />
          )
        })}
        </ChMenu>
      </ChHeader>
    </>
  );
}

export default ChracterHeader;
