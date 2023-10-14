import { AppContext } from 'App';
import { FlexBox } from 'components/Container';
import { IconPic } from 'components/ImagePic';
import InfoGroup from 'components/InfoGroup';
import Popup from 'components/Popup';
import PopupContainer from 'components/PopupContainer';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';

const Wrap = styled(FlexBox)`
`;
const Element = styled.div`
  position: relative;
  width: 100%;
  height: 20px;
  margin: 0 0 5px 0;
  .element_iconMini{background-image:url(${({ icon }) => icon});background-size:100%;}
  &:last-of-type{
    margin-bottom: 0;
  }
`;
const ElementIcon = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  ${({direction}) => direction === 'L' ? `
    left: 0;
  ` : `
    right: 0;
  `}
`;
const ElementBar = styled.div`
  position: absolute;
  width: calc(100% - 80px);
  height: 16px;
  background: #333;
  border-radius: 10px;
  white-space: nowrap;
  overflow: ${({ percent }) => percent > 100 ? 'unset' : 'hidden'};
  ${({direction}) => direction === 'L' ? `
    left:40px;top:12px;
  ` : `
    right:40px;top:12px;
  `}
`;
const ElementCurrentBar = styled.span`
  display: inline-block;
  position: absolute;
  height: 100%;
  border-radius: 10px;
  width: ${({ percent }) => percent > 100 ? 100 : percent}%;
  ${({direction}) => direction === 'L' ? `
    background-image:linear-gradient(90deg,rgba(255,255,255,.5),transparent 3px,transparent calc(100% - 3px), rgba(255,255,255,.5)),linear-gradient(180deg,rgba(255,255,255,.5),rgba(0,0,0,.2) 4px,transparent 7px,transparent 14px, rgba(255,255,255,.5)),linear-gradient(90deg,#7ad8d9,#13003a);
    left:0;text-align:right;
  ` : `
    background-image:linear-gradient(90deg,rgba(255,255,255,.5),transparent 3px,transparent calc(100% - 3px), rgba(255,255,255,.5)),linear-gradient(180deg,rgba(255,255,255,.5),rgba(0,0,0,.2) 4px,transparent 7px,transparent 14px, rgba(255,255,255,.5)),linear-gradient(90deg,#13003a,#7ad8d9);
    right:0;text-align:left;
  `}
`;
// .ch_info .element .info_group dd .el:nth-of-type(2n + 1) .element_currentBar{}
// .ch_info .element .info_group dd .el:nth-of-type(2n) .element_currentBar{}

const ElementIconMini = styled.span`
  position: absolute;
  margin: 0;
  width: 16px;
  height: 16px;
  ${({direction}) => direction === 'L' ? `
    right: 0;
  ` : `
    left: 0;
  `}
`;
const ElementNum = styled.span`
  position: absolute;
  width: 20px;
  line-height: 16px;
  text-align: center;
  ${({direction}) => direction === 'L' ? `
    right: -20px;
  ` : `
    left: -20px;
  `}
`;
// .ch_info .element .st{display:flex;margin:0 0 10px 0;}
// .ch_info .element .name{width:35px;}

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
  lang,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
  const [popupOn, setPopupOn] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [popupInfo, setPopupInfo] = useState({});
  const slotCh = React.useMemo(() => saveData.ch[slotIdx], [slotIdx, saveData]);
  // const chIdx = saveCh.idx;
  // util.saveLvState(0);
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
      <Wrap className="element">
        <InfoGroup title={gameData.msg.menu.element[lang]} guideClick={() => {
          setPopupType('guide');
          setPopupOn(true);
          setPopupInfo({
            data:gameData.guide["characterElement"],
          });
        }}>
          {gameData.element.map((data, idx) => {
            const num = slotCh['el' + idx] + slotCh['iSt' + (15 + idx)];
            const elementPercent = num * .5,
              direction = idx%2 === 0 ? 'L' : 'R';
            return (
              <Element className={`el el${idx}`} key={`chst${idx}`}>
                <ElementIcon direction={direction}>
                  <IconPic type="element" pic="icon100" idx={idx + 1} />
                </ElementIcon>
                <ElementBar percent={elementPercent} direction={direction}>
                  <ElementCurrentBar className={`element_currentBar transition`} percent={elementPercent} direction={direction}>
                    <ElementIconMini className="element_iconMini" direction={direction}/>
                    <ElementNum className="element_num" direction={direction}>{num}</ElementNum>
                  </ElementCurrentBar>
                </ElementBar>
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
        </InfoGroup>
        {/* <InfoGroup className="info_group ch_group">
          <dt>{}
            <GuideQuestion size={20} pos={["right","top"]} colorSet={"black"} onclick={() => {
              
            }} />
          </dt>
          <dd className="scroll-y" flex-h="true">
            
          </dd>
        </InfoGroup> */}
      </Wrap>
      <PopupContainer>
        {popupOn && <Popup type={popupType} dataObj={popupInfo} showPopup={setPopupOn} lang={lang} />}
      </PopupContainer>
    </>
  );
}

export default CharacterElement;
