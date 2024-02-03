import { AppContext } from 'App';
import { Text } from 'components/Atom';
import { FlexBox } from 'components/Container';
import { IconPic } from 'components/ImagePic';
import InfoGroup from 'components/InfoGroup';
import Popup from 'components/Popup';
import PopupContainer from 'components/PopupContainer';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';

const Wrap = styled(FlexBox)`
  position: absolute;
  top: 0;
  padding: 25px 20px 20px;
  box-sizing: border-box;
`;
const Element = styled.div`
  position: relative;
  margin: 0 0 5px 0;
  width: 100%;
  height: 40px;
  &:last-of-type{
    margin-bottom: 0;
  }
`;
const ElementIcon = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  ${({direction, actionPossibleElement, theme}) => direction === 'L' ? `
    left: 0;
    ${actionPossibleElement ? `box-shadow: 6px 0 0 0 ${theme.color.red};` : ''}
  ` : `
    right: 0;
    ${actionPossibleElement ? `box-shadow: -6px 0 0 0 ${theme.color.red};` : ''}
  `}
`;
const ElementBar = styled.div`
  position: absolute;
  top: 6px;
  width: calc(100% - 80px);
  height: 24px;
  border: ${({actionPossibleElement}) => actionPossibleElement ? `3px double var(--color-red);` : `3px double var(--color-w);`}
  background: #333;
  border-radius: 20px;
  white-space: nowrap;
  overflow: ${({ percent }) => percent > 100 ? 'unset' : 'hidden'};
  ${({direction}) => direction === 'L' ? `
    left: 45px;
  ` : `
    right: 45px;
  `}
`;
const ElementCurrentBar = styled.span`
  display: inline-block;
  position: absolute;
  height: 100%;
  border-radius: 20px;
  width: ${({ percent }) => percent > 100 ? 100 : percent}%;
  transition: width linear 0.5s;
  ${({direction}) => direction === 'L' ? `
    background-image:linear-gradient(90deg,rgba(255,255,255,.5),transparent 3px,transparent calc(100% - 3px), rgba(255,255,255,.5)),linear-gradient(180deg,rgba(255,255,255,.5),rgba(0,0,0,.2) 4px,transparent 7px,transparent 14px, rgba(255,255,255,.5)),linear-gradient(90deg,#7ad8d9,#13003a);
    left:0;text-align:right;
  ` : `
    background-image:linear-gradient(90deg,rgba(255,255,255,.5),transparent 3px,transparent calc(100% - 3px), rgba(255,255,255,.5)),linear-gradient(180deg,rgba(255,255,255,.5),rgba(0,0,0,.2) 4px,transparent 7px,transparent 14px, rgba(255,255,255,.5)),linear-gradient(90deg,#13003a,#7ad8d9);
    right:0;text-align:left;
  `}
`;

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
const ElementNum = styled(Text)`
  position: absolute;
  width: 20px;
  line-height: 24px;
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
}) => {
  const context = useContext(AppContext);
  const lang = React.useMemo(() => {
    return context.setting.lang;
  }, [context]);
  // const imgSet = React.useMemo(() => {
  //   return context.images;
  // }, [context]);
  const gameData = React.useMemo(() => {
    return context.gameData;
  }, [context]);
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
            let actionPossibleElement = 'possible';
            saveData.ch[slotIdx].newActionType.forEach((type) => {
              actionPossibleElement = type === idx;
              if (actionPossibleElement) {
                return;
              }
            });
            return (
              <Element className={`el el${idx}`} key={`chst${idx}`}>
                <ElementIcon actionPossibleElement={actionPossibleElement} direction={direction}>
                  <IconPic type="element" pic="icon100" idx={idx + 1} />
                </ElementIcon>
                <ElementBar actionPossibleElement={actionPossibleElement} percent={elementPercent} direction={direction}>
                  <ElementCurrentBar percent={elementPercent} direction={direction}>
                    <ElementIconMini direction={direction}/>
                    <ElementNum code="t2" color="main" direction={direction}>{num}</ElementNum>
                  </ElementCurrentBar>
                </ElementBar>
              </Element>
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

export default CharacterElement;
