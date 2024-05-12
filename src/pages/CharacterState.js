import { AppContext } from 'App';
import { Text } from 'components/Atom';
import { Button } from 'components/Button';
import { FlexBox } from 'components/Container';
import { IconPic } from 'components/ImagePic';
import InfoGroup from 'components/InfoGroup';
import { util } from 'components/Libs';
import Popup from 'components/Popup';
import PopupContainer from 'components/PopupContainer';
import React, { useCallback, useContext, useState } from 'react';
import styled from 'styled-components';

const Wrap = styled(FlexBox)`
  position: absolute;
  top: 0;
  padding: 25px 20px 20px;
  box-sizing: border-box;
`;
const ChInfo = styled.ul`
  margin: 0 0 10px 0;
  width: 100%;
  li {
    position: relative;
    width: 100%;
  }
`;
const ActionPoint = styled(FlexBox)`
  flex: 1;
  & > span {
    font-size: ${({theme}) => theme.font.t2};
  }
`;
const ChInfoBar = styled.span`
  margin: 0 3px;
`;
const StyledText = styled(Text)`
  margin: 2px 5px 0 0;
  text-align: right;
  & > span {
    font-size: inherit;
  }
`;
const TotalBar = styled.div`
  position:relative;
  margin: 3px 0 0 0;
  width: 100%;
  height: 14px;
  border-radius: 20px;
  border: 1px solid ${({theme}) => theme.color.grey1};
  box-sizing: border-box;
  background-color: #333;
  overflow: hidden;
`;
const Bar = styled.span`
  position: absolute;
  height: 100%;
  border-radius: 20px;
  width: ${({chSt, maxSt}) => {
    return (chSt / maxSt) * 100;
  }}%;
  vertical-align: middle;
  transition: width linear 0.5s;
`;
const StateContainer = styled(FlexBox)`
  width: 40%;
`;
const StateGroup = styled(FlexBox)`
  position: relative;
  margin: 0 0 2px 0;
  padding: 3px;
  background: ${({theme}) => `linear-gradient(${theme.color.land5}, ${theme.color.land5} 15%, ${theme.color.land4} 50%, ${theme.color.land3} 50%, ${theme.color.land3} 85%, ${theme.color.land5})`
  };
  border-radius: 20px;
  box-sizing: border-box;
  &:last-of-type {
    margin: 0;
  }
  height: auto;
`;
const StateInner = styled(FlexBox)`
  padding: 1px 5px 1px 10px;
  width: auto;
  background: ${({theme}) => theme.color.grey3};
  border-radius: 15px;
  box-sizing: border-box;
  box-shadow: inset 0 0 10px ${({theme}) => theme.color.sub};
`;
const StateGrade = styled(FlexBox)`
  position: absolute;
  right: 5px;
  top: 2px;
  height: 20px;
  width: auto;
`;
const StateText = styled(Text)`
  line-height: 1 !important;
  letter-spacing: 2px;
`;
const TextTotal = styled(Text)`
  margin: 0 0 0 5px;
  width: 30px;
  line-height: 1 !important;
`;
const BodyKg = styled(FlexBox)`
  position: relative;
  margin: 5px 0 0 0;
  height: 40px;
  .overlayBox {
    position: absolute;
    left: 0;
    top: 0;
    width: 40px;
    height: ${({animalKg}) => 40 - 40 * animalKg}px;
    filter: invert(70%);
    overflow: hidden;
  }
`;
const BodyKgText = styled(Text)`
  margin: 0 0 0 5px;
`;
const AnimalItemPic = styled(IconPic)`
  position: relative;
  width: 40px;
  height: 40px;
`;
const ElementContainer = styled(FlexBox)`
  margin: 0 0 0 10px;
  width: calc(60% - 10px);
  `;
const Element = styled.div`
  position: relative;
  margin: 0 0 4px 0;
  width: 100%;
  height: ${({actionPossibleElement}) => actionPossibleElement ? '32px' : '24px'};
  &:last-of-type{
    margin-bottom: 0;
  }
`;
const ElementIcon = styled.div`
  position: absolute;
  border-radius: 50%;
  right: 0;
  z-index: 1;
  ${({actionPossibleElement}) => actionPossibleElement ? `
    width: 32px;
    height: 32px;
    animation: horizontalMove infinite alternate 1s ease-in-out;
  ` : `
    width: 24px;
    height: 24px;
  `}
`;
const ElementBar = styled.div`
  position: absolute;
  top: 1px;
  width: calc(100% - 40px);
  ${({actionPossibleElement, theme}) => actionPossibleElement ? `
    height: 28px;
    border: 2px solid ${theme.color.red};
  ` : `
    height: 20px;
    border: 1px solid ${theme.color.grey1};
  `}
  background: ${({theme}) => theme.color.grey3};
  white-space: nowrap;
  right: 26px;
`;
const ElementCurrentBar = styled.div`
  display: inline-block;
  position: absolute;
  top: ${({isResist}) => isResist ? `50%` : `0%`};
  right: 0;
  height: 50%;
  width: ${({ percent }) => percent > 100 ? 100 : percent}%;
  transition: width linear 0.5s;
  line-height: 1;
  text-align: left;
`;

const ElementNum = styled(Text)`
  position: absolute;
  width: 20px;
  text-align: center;
  left: -20px;
  top: ${({actionPossibleElement, theme}) => actionPossibleElement ? '3px' : '1px'};
  line-height: 1;
`;
const ApplyStateBtn = styled(Button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  box-shadow: 0 0 10px ${({theme}) => theme.color.point1};
`;
const ElementList = ({
  actionPossibleElement,
  elementPercent,
  idx,
  num,
  ...rest
}) => {
  return (
    <Element actionPossibleElement={actionPossibleElement} {...rest}>
      <ElementIcon actionPossibleElement={actionPossibleElement}>
        <IconPic type="element" pic="icon100" idx={idx + 1} />
      </ElementIcon>
      <ElementBar actionPossibleElement={actionPossibleElement}>
        <ElementCurrentBar className="gradient_dark_r" percent={elementPercent[0]}>
          <ElementNum code="tSmall" color="main" actionPossibleElement={actionPossibleElement}>{num[0]}</ElementNum>
        </ElementCurrentBar>
        <ElementCurrentBar className="gradient_dark_b" percent={elementPercent[1]} isResist={true}>
          <ElementNum code="tSmall" color="main" actionPossibleElement={actionPossibleElement}>{num[1]}</ElementNum>
        </ElementCurrentBar>
      </ElementBar>
    </Element>
  )
}
const CharacterState = ({
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
  const saveCh = React.useMemo(() => saveData.ch[slotIdx], [saveData, slotIdx]);
  const chData = React.useMemo(
    () => gameData.ch[saveCh.idx],
    [gameData, saveCh]
  );
  const chName = React.useMemo(() => gameData.ch[saveCh.idx].na1, [saveData, slotIdx]);
  const saveExp = React.useMemo(() => {
    return Object.keys(saveCh).length > 0 ? {
      current: saveCh.exp,
      max: gameData.exp['grade' + saveCh.grade][saveCh.lv-1]
    } : {
      current : 0,
      max: 0,
    }
  }, [gameData, saveCh]);
  const saveHasExp = React.useMemo(() => {
    return {
      current: saveCh.hasExp,
      max: gameData.hasMaxExp[saveCh.grade]
    }
  }, [gameData, saveCh]);
  const [popupOn, setPopupOn] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [popupInfo, setPopupInfo] = useState({});
  const animalIdx = React.useMemo(() => chData.animal_type, [chData]);
  const animalPic = useCallback((node) => {
    if (node !== null) {
      node.setAttribute("size", node.getBoundingClientRect().width);
    }
  }, []);
  const animalKg = React.useMemo(() => Math.min(1, saveCh.kg / gameData.animal_size.kg[chData.animal_type][1]), [gameData, saveCh, chData]);
  // const chIdx = saveCh.idx;
  // util.saveLvState(0);
  return (
    <>
      <Wrap className="state">
        <InfoGroup pointTitle={chName} title={`${gameData.msg.grammar.conjunction[lang]} ${gameData.msg.menu.state[lang]}`} guideClick={() => {
          setPopupType('guide');
          setPopupOn(true);
          setPopupInfo({
            data:gameData.guide["characterState"],
          });
        }}>
          <FlexBox direction="row">
            <StateContainer direction="column" justifyContent="flex-start">
              <ChInfo>
                <li>
                  <FlexBox>
                    <Text code="t1" color="main">{gameData.msg.state.sp[lang]}</Text>
                    <ActionPoint justifyContent="flex-end">
                      <span className="current">{saveData.ch[slotIdx].actionPoint}</span><ChInfoBar>/</ChInfoBar><span className="max">50</span>
                    </ActionPoint>
                  </FlexBox>
                </li>
                <li>
                  <FlexBox direction="column" alignItems="flex-start">
                    <Text code="t1" color="main">{gameData.msg.info.exp[lang]}</Text>
                    <TotalBar className="gradient_light">
                      <Bar className="gradient_dark_g transition" style={{ width: util.getPercent(saveExp.max, saveExp.current)+'%'}}></Bar>
                    </TotalBar>
                  </FlexBox>
                  <StyledText code="t1" color="main">
                    <span className="current">{saveExp.current}</span> <ChInfoBar>/</ChInfoBar> <span className="max">{saveExp.max}</span>
                  </StyledText>
                </li>
                <li>
                  <FlexBox direction="column" alignItems="flex-start">
                    <Text code="t1" color="main">{gameData.msg.info.cumulativeExp[lang]}</Text>
                    <TotalBar className="gradient_light">
                      <Bar className="gradient_dark transition" style={{ width: util.getPercent(saveHasExp.max, saveHasExp.current)+'%'}}></Bar>
                    </TotalBar>
                  </FlexBox>
                  <StyledText code="t1" color="main">
                    <span className="current">{saveHasExp.current}</span> <ChInfoBar>/</ChInfoBar> <span className="max">{saveHasExp.max}</span>
                  </StyledText>
                </li>
              </ChInfo>
              {gameData.stateName.map((data, idx) => {
                const {stateColor, gradeText} = util.getPercentColor(gameData.stateMax[idx] ,saveCh['st' + idx]);
                return (
                  <StateGroup key={`chst${idx}`} stateColor={stateColor} justifyContent="flex-start">
                    <StateInner>
                      <StateText code="t2" color={stateColor}>{gameData.msg.state[data][lang]}</StateText>
                      {/* <TotalBar className="gradient_light">
                        <Bar idx={idx} chSt={saveCh['st'+idx]} maxSt={gameData.stateMax[idx]} className="gradient_dark_y" />
                      </TotalBar> */}
                      <TextTotal code="t3" weight="600" color="main" className="txt_total">
                        {saveCh['st'+idx]}
                      </TextTotal>
                    </StateInner>
                    <StateGrade><Text weight="bold" color="sub">{gradeText[lang]}</Text></StateGrade>
                  </StateGroup>
                )
              })}
              <BodyKg justifyContent="flex-start" alignItems="flex-end" animalKg={animalKg}>
                <AnimalItemPic
                  ref={animalPic}
                  pic="animalType"
                  idx={animalIdx}
                />
                <div className="overlayBox">
                  <AnimalItemPic
                    ref={animalPic}
                    pic="animalType"
                    idx={animalIdx}
                  />
                </div>
                <BodyKgText code="t3" color={saveCh.kg <= gameData.animal_size.size[0] ? saveCh.kg > gameData.animal_size.size[1] ? "red" : "main": "yellow"}>{`${saveCh.kg} kg`}</BodyKgText>
              </BodyKg>
            </StateContainer>
            <ElementContainer direction="column" justifyContent="flex-start">
              {gameData.element.map((data, idx) => {
                const num = [saveCh['el' + idx] + saveCh['iSt' + (11 + idx)], saveCh['el' + idx] + saveCh['iSt' + (23 + idx)]];
                const elementPercent = [num[0] * .5, num[1] * 0.5];//최대 200
                let actionPossibleElement = false;
                saveData.ch[slotIdx].newActionType.forEach((type) => {
                  actionPossibleElement = type === idx;
                  if (actionPossibleElement) {
                    return;
                  }
                });
                return (
                  <ElementList className={`el el${idx}`} key={`chst${idx}`} actionPossibleElement={actionPossibleElement} elementPercent={elementPercent} idx={idx} num={num} />
                )
              })}
            </ElementContainer>
          </FlexBox>
        </InfoGroup>
        <ApplyStateBtn size="30" type="icon" icon={{
          pic: "icon100",
          type: 'menu',
          idx: 6,
        }} onClick={() => {
          setPopupType('applyState');
          setPopupOn(true);
          setPopupInfo({
            chSlotIdx: slotIdx,
          });
        }}/>
      </Wrap>
      <PopupContainer>
        {popupOn && <Popup type={popupType} saveData={saveData} dataObj={popupInfo} showPopup={setPopupOn} />}
      </PopupContainer>
    </>
  );
}

export default CharacterState;
