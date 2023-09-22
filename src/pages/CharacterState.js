import { AppContext } from 'App';
import GuideQuestion from 'components/GuideQuestion';
import { util } from 'components/Libs';
import Popup from 'components/Popup';
import PopupContainer from 'components/PopupContainer';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';

const FrameBar = styled.span`
  width: ${({chMaxSt, maxSt}) => {
    return (chMaxSt/maxSt)*100;
  }}%;
`;
const Bar = styled.span`
  width:${({rSt, chMaxSt, idx}) => (rSt/chMaxSt) * 100}%;
  .ico{
    background:url(${({stateType}) => stateType}) no-repeat center center;
  }
`;
const BackBar = styled.span`
  background:url(${({stateBack}) => stateBack}) repeat-x left center;
  width: ${({chMaxSt, maxSt}) => {
    return 100 - (chMaxSt/maxSt)*100;
  }}% !important;
`;
const TextTotal = styled.span`
  color:${({maxSt, rSt}) => {
    return util.getPercentColor(maxSt ,rSt);
  }} !important;
  text-shadow: 0 0 ${({maxSt, rSt}) => (rSt / maxSt) * 10}px #fff;
`;

const CharacterState = ({
  saveData,
  slotIdx,
  lang,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
  const saveCh = React.useMemo(() => saveData.ch[slotIdx], [saveData, slotIdx]);
  const [popupOn, setPopupOn] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [popupInfo, setPopupInfo] = useState({});
  const stateArr = React.useMemo(() => gameData.stateName, [gameData]);
  // const chIdx = saveCh.idx;
  // util.saveLvState(0);
  return (
    <>
      <div className="state">
        <dl className="info_group ch_group">
          <dt>{gameData.msg.menu.state[lang]}
            <GuideQuestion size={20} pos={["right","top"]} colorSet={"black"} onclick={() => {
              setPopupType('guide');
              setPopupOn(true);
              setPopupInfo({
                data:gameData.guide["characterState"],
              });
            }} />
          </dt>
          <dd className="scroll-y">
            {stateArr && stateArr.map((data, idx) => {
              return (
                <div key={`chst${idx}`} className={`st st${idx}`} flex="true">
                  {idx === stateArr.length - 1 ? (
                    <>
                      <span className="name">{data}</span>
                      <span className="total_bar">
                        <FrameBar chMaxSt={100} maxSt={100} className="frame_bar transition gradient_light">
                          <Bar idx={idx} rSt={saveCh.stateLuk} chMaxSt={gameData.stateMax[idx]} stateType={imgSet.iconState[idx]} className="bar transition gradient_dark_y">
                            <span className="ico"></span>
                            {/* <span className="txt_current">0</span> */}
                          </Bar>
                        </FrameBar>
                        <BackBar stateBack={imgSet.etc.stateBack} chMaxSt={saveCh.stateLuk} maxSt={gameData.stateMax[idx]} className="back_bar transition" />
                      </span>
                      <TextTotal rSt={saveCh.stateLuk} maxSt={gameData.stateMax[idx]} className="txt_total" title={data.title}>
                        {saveCh.stateLuk}
                      </TextTotal>
                    </>
                  ) : (
                    <>
                      <span className="name">{data}</span>
                      <span className="total_bar">
                        <FrameBar chMaxSt={saveCh['maxSt'+idx]} maxSt={gameData.stateMax[idx]} className="frame_bar transition gradient_light">
                          <Bar idx={idx} rSt={saveCh['rSt'+idx]} chMaxSt={saveCh['maxSt'+idx]} stateType={imgSet.iconState[idx]} className="bar transition gradient_dark_y">
                            <span className="ico"></span>
                            {/* <span className="txt_current">0</span> */}
                          </Bar>
                        </FrameBar>
                        <BackBar stateBack={imgSet.etc.stateBack} chMaxSt={saveCh['maxSt'+idx]} maxSt={gameData.stateMax[idx]} className="back_bar transition" />
                      </span>
                      <TextTotal rSt={saveCh['maxSt'+idx]} maxSt={gameData.stateMax[idx]} className="txt_total" title={data.title}>
                        {saveCh['rSt'+idx]}
                      </TextTotal>
                    </>
                  )}
                </div>
              )
            })}
          </dd>
        </dl>
      </div>
      <PopupContainer>
        {popupOn && <Popup type={popupType} dataObj={popupInfo} showPopup={setPopupOn} lang={lang} />}
      </PopupContainer>
    </>
  );
}

export default CharacterState;
