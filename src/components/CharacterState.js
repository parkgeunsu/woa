import { AppContext } from 'App';
import { util } from 'components/Libs';
import React, { useContext, useLayoutEffect, useState } from 'react';
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
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
  const stateArr = gameData.stateName;
  const [slotCh, setSlotCh] = useState(saveData.ch[slotIdx]);
  // const chIdx = saveCh.idx;
  // util.saveLvState(0);
  useLayoutEffect(() => {
    setSlotCh(saveData.ch[slotIdx]);
  }, [slotIdx, saveData]);
  return (
    <>
      <div className="state">
        <dl className="info_group ch_group">
          <dt>STATE<span>(스탯)</span></dt>
          <dd className="scroll-y">
            {stateArr && stateArr.map((data, idx) => {
              return (
                <div key={`chst${idx}`} className={`st st${idx}`} flex="true">
                  {idx === stateArr.length - 1 ? (
                    <>
                      <span className="name">{data}</span>
                      <span className="total_bar">
                        <FrameBar chMaxSt={100} maxSt={100} className="frame_bar transition gradient_light">
                          <Bar idx={idx} rSt={slotCh.stateLuk} chMaxSt={gameData.stateMax[idx]} stateType={imgSet.iconState[idx]} className="bar transition gradient_dark_y">
                            <span className="ico"></span>
                            {/* <span className="txt_current">0</span> */}
                          </Bar>
                        </FrameBar>
                        <BackBar stateBack={imgSet.etc.stateBack} chMaxSt={slotCh.stateLuk} maxSt={gameData.stateMax[idx]} className="back_bar transition" />
                      </span>
                      <TextTotal rSt={slotCh.stateLuk} maxSt={gameData.stateMax[idx]} className="txt_total" title={data.title}>
                        {slotCh.stateLuk}
                      </TextTotal>
                    </>
                  ) : (
                    <>
                      <span className="name">{data}</span>
                      <span className="total_bar">
                        <FrameBar chMaxSt={slotCh['maxSt'+idx]} maxSt={gameData.stateMax[idx]} className="frame_bar transition gradient_light">
                          <Bar idx={idx} rSt={slotCh['rSt'+idx]} chMaxSt={slotCh['maxSt'+idx]} stateType={imgSet.iconState[idx]} className="bar transition gradient_dark_y">
                            <span className="ico"></span>
                            {/* <span className="txt_current">0</span> */}
                          </Bar>
                        </FrameBar>
                        <BackBar stateBack={imgSet.etc.stateBack} chMaxSt={slotCh['maxSt'+idx]} maxSt={gameData.stateMax[idx]} className="back_bar transition" />
                      </span>
                      <TextTotal rSt={slotCh['maxSt'+idx]} maxSt={gameData.stateMax[idx]} className="txt_total" title={data.title}>
                        {slotCh['rSt'+idx]}
                      </TextTotal>
                    </>
                  )}
                </div>
              )
            })}
          </dd>
        </dl>
      </div>
    </>
  );
}

export default CharacterState;
