import { AppContext } from 'App';
import { Text } from 'components/Atom';
import { FlexBox } from 'components/Container';
import InfoGroup from 'components/InfoGroup';
import { util } from 'components/Libs';
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
const ChInfo = styled.ul`
  margin: 0 0 10px 0;
  li {
    position: relative;
    margin: 0 0 5px 0;
    width: calc(100% - 10px);
  }
`;
const ActionPoint = styled(FlexBox)`
  flex: 1;
  & > span {
    font-weight: 600;
    font-size: ${({theme}) => theme.font.t3};
  }
`;
const StyledText = styled(Text)`
  margin: 2px 5px 0 0;
  text-align: right;
  & > span {
    font-size: inherit;
  }
`;
const StateBar = styled(FlexBox)`
  margin: 0 0 5px 0;
  &:last-of-type {
    margin: 0;
  }
  height: auto;
`;
const TotalBar = styled.span`
  position:relative;
  margin: 0 5px;
  flex: 1;
  height: 24px;
  border-radius: 20px;
  border: 3px double var(--color-w);
  background-color: #333;
  overflow: hidden;
`;
const Bar = styled.span`
  display: inline-block;
  position: relative;
  height: 100%;
  border-radius: 20px;
  width: ${({chSt, maxSt}) => {
    return (chSt / maxSt) * 100;
  }}%;
  vertical-align: middle;
  transition: width linear 0.5s;
`;
const TextTotal = styled(Text)`
  margin: auto 0;
  width: 30px;
  text-align: center;
  color: ${({maxSt, chSt}) => {
    return util.getPercentColor(maxSt ,chSt);
  }} !important;
  text-shadow: 0 0 ${({maxSt, chSt}) => (chSt / maxSt) * 10}px #fff;
`;

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
          <ChInfo>
            <li>
              <FlexBox>
                <Text code="t3" color="main" weight="600">{gameData.msg.state.sp[lang]}</Text>
                <ActionPoint justifyContent="flex-end">
                  <span className="current">{saveData.ch[slotIdx].actionPoint}</span><span className="bar">/</span><span className="max">50</span>
                </ActionPoint>
              </FlexBox>
            </li>
            <li>
              <FlexBox>
                <Text code="t3" color="main" weight="600">{gameData.msg.info.exp[lang]}</Text>
                <TotalBar style={{marginRight: 0}} className="gradient_light">
                  <Bar className="gradient_dark transition" style={{ width: util.getPercent(saveExp.max, saveExp.current)+'%'}}></Bar>
                </TotalBar>
              </FlexBox>
              <StyledText code="t3" color="main" weight="600">
                <span className="current">{saveExp.current}</span> <span className="bar">/</span> <span className="max">{saveExp.max}</span>
              </StyledText>
            </li>
            <li>
              <FlexBox>
                <Text code="t3" color="main" weight="600">{gameData.msg.info.cumulativeExp[lang]}</Text>
                <TotalBar style={{marginRight: 0}} className="gradient_light">
                  <Bar className="gradient_dark transition" style={{ width: util.getPercent(saveHasExp.max, saveHasExp.current)+'%'}}></Bar>
                </TotalBar>
              </FlexBox>
              <StyledText code="t3" color="main" weight="600">
                <span className="current">{saveHasExp.current}</span> <span className="bar">/</span> <span className="max">{saveHasExp.max}</span>
              </StyledText>
            </li>
          </ChInfo>
          {stateArr && stateArr.map((data, idx) => {
            return (
              <StateBar key={`chst${idx}`}>
                <>
                  <Text code="t3" color="main" weight="600">{gameData.msg.state[data][lang]}</Text>
                  <TotalBar className="gradient_light">
                    <Bar idx={idx} chSt={saveCh['st'+idx]} maxSt={gameData.stateMax[idx]} className="gradient_dark_y" />
                  </TotalBar>
                  <TextTotal code="t3" weight="600" chSt={saveCh['st'+idx]} maxSt={gameData.stateMax[idx]} className="txt_total">
                    {saveCh['st'+idx]}
                  </TextTotal>
                </>
              </StateBar>
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
