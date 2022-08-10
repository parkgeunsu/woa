import React, { useContext, useLayoutEffect, useState, useRef } from 'react';
import { AppContext } from 'App';
import { util } from 'components/Libs';
import styled from 'styled-components';
import GuideQuestion from 'components/GuideQuestion';
import PopupContainer from 'components/PopupContainer';
import Popup from 'components/Popup';

const Element = styled.div`
  .element_icon{background-image:url(${({ icon }) => icon});background-size:100%;}
  .element_currentBar{width:${({ percent }) => percent}%;}
  .element_iconMini{background-image:url(${({ icon }) => icon});background-size:100%;}
`;
const stateColor = () => {
  // const color = util.getPercentColor(maxSt ,rSt);
  // return (
  //   `color:${color} !important;
  //   text-shadow: 0 0 ${color}px #fff;`
  // );
}
const CharacterElement = ({
  saveData,
  slotIdx,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
	const setting = useContext(AppContext).setting,
    lang = setting.lang;
  const [popupOn, setPopupOn] = useState(false);
  const popupType = useRef('');
  const [popupInfo, setPopupInfo] = useState({});
  const [slotCh, setSlotCh] = useState(saveData.ch[slotIdx]);
  const elArr = [];
  const elRadial = Math.PI*2 / gameData.element.length;
  gameData.element.forEach((elName, idx) => {
    elArr[idx] = {
      na: elName,
      x: Math.cos(elRadial * idx),
      y: Math.sin(elRadial * idx),
    };
  })
  // const chIdx = saveCh.idx;
  // util.saveLvState(0);
  useLayoutEffect(() => {
    setSlotCh(saveData.ch[slotIdx]);
  }, [slotIdx, saveData]);
  // const state_per = [125,200,200,100,200,100,100],
  //   st_t = ['통솔','체력','무력','민첩','지력','정치','매력','운'],
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
      <div className="element">
        <dl className="info_group ch_group">
          <dt>ELEMENT<span>(속성)</span>
            <GuideQuestion size={20} pos={["right","top"]} colorSet={"black"} onclick={() => {
              popupType.current = 'guide';
              setPopupOn(true);
              setPopupInfo({
                data:gameData.guide["characterElement"],
                lang:lang,
              });
            }} />
          </dt>
          <dd className="scroll-y" flex-h="true">
            {elArr && elArr.map((data, idx) => {
              const num = slotCh['el' + idx];
              const elementPercent = num * .5;
              return (
                <Element key={`chst${idx}`} percent={elementPercent} icon={imgSet.element[idx + 1]} className={`el el${idx}`}>
                  <div className="element_icon"></div>
                  <div className="element_bar"><span className={`element_currentBar transition gradient_dark_element${idx%2 === 0 ? "" : "R"}`}><span className="element_iconMini"></span><span className="element_num">{num}</span></span></div>
                </Element>
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
      </div>
      <PopupContainer>
        {popupOn && <Popup type={popupType.current} dataObj={popupInfo} showPopup={setPopupOn} imgSet={imgSet}/>}
      </PopupContainer>
    </>
  );
}

export default CharacterElement;
