import { AppContext } from 'App';
import { FlexBox } from 'components/Container';
import InfoGroup from 'components/InfoGroup';
import { util } from 'components/Libs';
import Popup from 'components/Popup';
import PopupContainer from 'components/PopupContainer';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';

const Wrap = styled(FlexBox)`
  .total_bar{position:relative;margin:0 5px;height:24px;flex:1;border-radius:6px;border:3px double #913300;background-color:transparent;overflow:hidden;}
  .frame_bar{position:absolute;left:0;height:100%;background-color:#333;border-radius:4px;}
  .bar{position:relative;height:100%;border-radius:4px;}
  .ico{position:absolute;right:2px;top:1px;width:22px;height:22px;}
  .back_bar{position:absolute;right:0;height:100%;border-radius:4px;}
  .txt_total{margin:auto 0;width:30px;text-align:center;font-size:1rem;font-weight:600;}
`;
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
}) => {
  const context = useContext(AppContext);
  const lang = React.useMemo(() => {
    return context.setting.lang;
  }, [context]);
  const imgSet = React.useMemo(() => {
    return context.images;
  }, [context]);
  const gameData = React.useMemo(() => {
    return context.gameData;
  }, [context]);
  const saveCh = React.useMemo(() => saveData.ch[slotIdx], [saveData, slotIdx]);
  const [popupOn, setPopupOn] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [popupInfo, setPopupInfo] = useState({});
  const stateArr = React.useMemo(() => gameData.stateName, [gameData]);
  // const chIdx = saveCh.idx;
  // util.saveLvState(0);
  return (
    <>
      <Wrap className="state">
        <InfoGroup title={gameData.msg.menu.state[lang]} guideClick={() => {
          setPopupType('guide');
          setPopupOn(true);
          setPopupInfo({
            data:gameData.guide["characterState"],
          });
        }}>
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
        </InfoGroup>
      </Wrap>
      <PopupContainer>
        {popupOn && <Popup type={popupType} dataObj={popupInfo} showPopup={setPopupOn} />}
      </PopupContainer>
    </>
  );
}

export default CharacterState;
