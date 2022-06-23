import { AppContext } from 'App';
import { util } from 'components/Libs';
import stateBack from 'images/pattern/white_brick_wall_@2X_.png';
import React, { useContext, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';


const Element = styled.div`
  display:none;position:relative;width:100%;
  &{
    .st{display:flex;margin:0 0 10px 0;}
    .name{width:35px;}
    .info_group{display:flex;flex-direction:column;width:100%;height:100%;box-sizing:border-box;}
    .info_group dt{padding:0 0 10px;font-size:16px;color:#fff;text-align:center;}
    .info_group dt span{display:inline-block;margin:0 0 0 5px;color:#999;}
    .info_group dd{display:flex;flex-direction:column;overflow:hidden;}
    .total_bar{position:relative;margin:0 5px;height:24px;flex:1;border-radius:6px;border:3px double #913300;background-color:transparent;overflow:hidden;}
  }
`;
const FrameBar = styled.span`
  position:absolute;left:0;height:100%;background-color:#333;border-radius:4px;
  width: ${({chMaxSt, maxSt}) => {
    return (chMaxSt/maxSt)*100;
  }}%;
`;
const Bar = styled.span`
  position:relative;height:100%;border-radius:4px;
  width:${({rSt, chMaxSt, idx}) => {
    if (idx === 6) {
      return 100;
    } else {
      return (rSt/chMaxSt)*100;
    }
  }}%;
  .ico{
    position:absolute;right:2px;top:1px;;width:22px;height:22px;
    background:url(${({stateType}) => stateType}) no-repeat center center;
  }
`;
const BackBar = styled.span`
  position:absolute;right:0;height:100%;background:url(${({stateBack}) => stateBack}) repeat-x left center;border-radius:4px;
  width: ${({chMaxSt, maxSt}) => {
    return 100 - (chMaxSt/maxSt)*100;
  }}% !important;
`;
const stateColor = () => {
  // const color = util.getPercentColor(maxSt ,rSt);
  // return (
  //   `color:${color} !important;
  //   text-shadow: 0 0 ${color}px #fff;`
  // );
}
const TextTotal = styled.span`
  margin:auto 0;width:30px;text-align:center;font-size:16px;font-weight:600;
  color:${({maxSt, rSt}) => {
    return util.getPercentColor(maxSt ,rSt);
  }} !important;
  text-shadow: 0 0 ${({maxSt, rSt}) => (rSt / maxSt) * 10}px #fff;
`;

const CharacterElement = ({
  saveData,
  slotIdx,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
  const elArr = gameData.element;
  const [slotCh, setSlotCh] = useState(saveData.ch[slotIdx]);
  // const chIdx = saveCh.idx;
  // util.saveLvState(0);
  useLayoutEffect(() => {
    setSlotCh(saveData.ch[slotIdx]);
  }, [slotIdx, saveData]);

  // const state_per = [125,200,200,100,200,100,100],
  //   st_t = ['통솔','체력','무력','민첩','지력','정치','매력'],
  //   st_c = ['#037ace','#f3004e','#ff5326','#77b516','#f9c215','#5f3dc4','#ce20c2'],
  //   ctx_w = this.el.gacha_infoGraph.getBoundingClientRect().width,
  //   arc_r = Math.PI*2/7,
  //   ctx_c = ctx_w*.5,
  //   circle_r = ctx_c*.75,
  //   ctx = this.el.gacha_can.getContext('2d');
  // let arc_c = 0,
  //   arr = [{},{},{},{},{},{},{}],
  //   st = [];
  return (
    <>
      <Element className="element">
        <dl className="info_group ch_group">
          <dt>ELEMENT<span>(속성)</span></dt>
          <dd className="scroll-y">
            {elArr && elArr.map((data, idx) => {
              const num = slotCh['el' + idx];
              return (
                <div key={`chst${idx}`} className={`st st${idx}`} flex="true">
                  {`${data}: ${num}`}
                </div>
              )
              // return (
              //   <div key={`chst${idx}`} className={`st st${idx}`} flex="true">
              //     <span className="name">{data}</span>
              //     <span className="total_bar">
              //       <FrameBar chMaxSt={slotCh['maxSt'+idx]} maxSt={gameData.stateMax[idx]} className="frame_bar transition gradient_light">
              //         <Bar idx={idx} rSt={slotCh['rSt'+idx]} chMaxSt={slotCh['maxSt'+idx]} stateType={imgSet.iconState[idx]} className="bar transition gradient_dark_y">
              //           <span className="ico"></span>
              //           {/* <span className="txt_current">0</span> */}
              //         </Bar>
              //       </FrameBar>
              //       <BackBar stateBack={stateBack} chMaxSt={slotCh['maxSt'+idx]} maxSt={gameData.stateMax[idx]} className="back_bar transition" />
              //     </span>
              //     <TextTotal rSt={slotCh['maxSt'+idx]} maxSt={gameData.stateMax[idx]} className="txt_total" title={data.title}>
              //       {idx === 6 ? slotCh['maxSt'+idx] : slotCh['rSt'+idx]}
              //     </TextTotal>
              //   </div>
              // )
            })}
          </dd>
        </dl>
      </Element>
    </>
  );
}

export default CharacterElement;
