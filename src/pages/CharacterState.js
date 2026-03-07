import { Text } from 'components/Atom';
import { Button } from 'components/Button';
import { FlexBox } from 'components/Container';
import { IconPic } from 'components/ImagePic';
import InfoGroup from 'components/InfoGroup';
import { util } from 'components/Libs';
import Msg from 'components/Msg';
import MsgContainer from 'components/MsgContainer';
import Popup from 'components/Popup';
import PopupContainer from 'components/PopupContainer';
import { AppContext } from 'contexts/app-context';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';

const Wrap = styled(FlexBox)`
  position: absolute;
  top: 0;
  padding: 25px 20px;
  box-sizing: border-box;
`;
const StateArea = styled.div`
  margin: auto;
  width: 90%;
`;
const ChInfoContainer = styled(FlexBox)`
  margin: 0 0 10px 0;
  height: calc(20% - 10px);
`;
const ChInfoLi = styled(FlexBox)`
  width: 100%;
`;
const ChInfoBar = styled.span`
  margin: 0 3px;
`;
const ActionBox = styled(FlexBox)`
  width: 100%;
`;
const BodyKg = styled(FlexBox)`
  position: relative;
  width: 100%;
`;
const SizeTxt = styled(Text)`
  position: absolute;
  top: -70%;
  right: 0;
`;
const KgPic = styled(IconPic)`
  position: relative;
  width: 30px;
  height: 30px;
`;
const KgText = styled(Text)`
  margin: 0 0 0 5px;
`;
const LvButton = styled(Button)`
  margin: 0 10px 0 0;
  padding: 0 5px;
`;
const LvIcon = styled(IconPic)`
  width: 40px;
  height: 40px;
`;
const StyledText = styled(Text)`
  margin: 0 5px 0 0;
  text-align: right;
  & > span {
    font-size: inherit;
  }
`;
const StateContainer = styled(FlexBox)`
  padding: 5px;
  margin: 0 0 10px 0;
  height: auto;
  border-radius: 10px;
  border: 2px solid var(--color-b);
  background: rgba(255,255,255,.3);
  box-sizing: border-box;
  flex-wrap: wrap;
`;
const StateGroup = styled(FlexBox)`
  position: relative;
  width: 50%;
  box-sizing: border-box;
  height: auto;
`;
const StateIcon = styled(IconPic)`
  width: 30px;
  height: 30px;
`;
const StateInner = styled(FlexBox)`
  padding: 1px 5px 1px 10px;
  width: auto;
  border-radius: 15px;
  box-sizing: border-box;
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
const ElementContainer = styled(FlexBox)`
  flex-wrap: wrap;
  padding: 5px;
  height: auto;
  border-radius: 10px;
  border: 2px solid var(--color-b);
  background: rgba(255,255,255,.3);
  box-sizing: border-box;
`;
const Element = styled(FlexBox)`
  position: relative;
  padding: 3px 5px;
  width: calc(33.3% - 10px);
  height: auto;
`;
const ElementIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  right: 0;
  ${({actionPossibleElement}) => actionPossibleElement ? `
    box-shadow: 0 0 10px var(--color-red), 0 0 5px var(--color-red);
  `: ""};
`;
const ElementText = styled(FlexBox)`
  width: auto;
  height: auto;
  transition: transform;
  ${({actionPossibleElement}) => actionPossibleElement ? `
    transform: scale(1.3);
    & > div:last-of-type {
      margin: -2px 0 0 0;
    }
  ` : ""};
`;
const ElementSIcon = styled(IconPic)`
  width: 15px;
  height: 15px;
`;
const ElementNum = styled(Text)`
  text-align: center;
  line-height: 1;
`;
const ElementList = ({
  actionPossibleElement,
  elementPercent,
  idx,
  num,
  ...rest
}) => {
  return (
    <Element justifyContent="space-between" {...rest}>
      <ElementIcon actionPossibleElement={actionPossibleElement}>
        <IconPic type="element" pic="icon100" idx={idx + 1} />
      </ElementIcon>
      <ElementText direction="column" actionPossibleElement={actionPossibleElement}>
        <FlexBox justifyContent="flex-end" ><ElementSIcon type="commonBtn" pic="icon100" idx={12} /><ElementNum code="t2" {...actionPossibleElement ? {
          color: "red",
          weight: "600",
        } : {
          color: "unique"
        }}>{num[0]}</ElementNum></FlexBox>
        <FlexBox justifyContent="flex-end" ><ElementSIcon type="commonBtn" pic="icon100" idx={11} /><ElementNum code="t2" {...actionPossibleElement ? {
          color: "magic",
          weight: "600",
        } : {
          color: "lightblue"
        }}>{num[1]}</ElementNum></FlexBox>
      </ElementText>
    </Element>
  )
}
const CharacterState = ({
  saveData,
  slotIdx,
  changeSaveData,
}) => {
  const context = useContext(AppContext);
  const lang = React.useMemo(() => {
    return context.setting.lang;
  }, [context]);

  const gameData = React.useMemo(() => {
    return context.gameData;
  }, [context]);

  const saveCh = React.useMemo(() => saveData.ch?.[slotIdx] || {}, [saveData.ch, slotIdx]);
  const chData = React.useMemo(
    () => gameData.ch?.[saveCh.idx] || {},
    [gameData.ch, saveCh.idx]
  );
  const chName = React.useMemo(() => chData.na1[lang] || "", [chData.na1, lang]);

  const saveExp = React.useMemo(() => {
    const gradeKey = 'grade' + saveCh.grade;
    const maxExpArr = gameData.exp?.[gradeKey];
    const maxExp = (maxExpArr && typeof saveCh.lv === "number") ? maxExpArr[saveCh.lv] : 0;
    
    return {
      current: saveCh.exp || 0,
      max: maxExp
    };
  }, [gameData.exp, saveCh.grade, saveCh.lv, saveCh.exp]);

  const saveHasExp = React.useMemo(() => {
    return {
      current: saveCh.hasExp || 0,
      max: gameData.hasMaxExp?.[saveCh.grade] || 0
    };
  }, [gameData.hasMaxExp, saveCh.grade, saveCh.hasExp]);

  const [popupOn, setPopupOn] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [popupInfo, setPopupInfo] = useState({});
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");

  const animalKg = React.useMemo(() => {
    const animalType = chData.animal_type;
    const kgLimit = gameData.animal_size?.kg?.[animalType]?.[2];
    if (typeof kgLimit !== "number") return "";

    const percentKg = Math.min(1, (saveCh.kg || 0) / kgLimit);
    if (percentKg < 0.2) {
      return gameData.msg.state.kg0[lang];
    } else if (percentKg < 0.4) {
      return gameData.msg.state.kg1[lang];
    } else if (percentKg < 0.6) {
      return gameData.msg.state.kg2[lang];
    } else if (percentKg < 0.8) {
      return gameData.msg.state.kg3[lang];
    } else {
      return gameData.msg.state.kg4[lang];
    }
  }, [gameData, saveCh.kg, chData.animal_type, lang]);

  return (
    <>
      <Wrap className="state">
        <InfoGroup pointTitle={`Lv.${saveCh.lv} ${chName}`} title={`${gameData.msg.grammar.conjunction[lang]} ${gameData.msg.menu.state[lang]}`} guideClick={() => {
          setPopupType('guide');
          setPopupOn(true);
          setPopupInfo({
            data: gameData.guide["characterState"],
          });
        }}>
          <StateArea>
            <ChInfoContainer direction="row">
              <LvButton onClick={() => {//레벨업
                const maxExp = saveExp.max;//레벨당 필요한 경험치
                const currentExp = saveExp.current;//현재 경험치
                const hasExp = saveHasExp.current;//보유 경험치
                const needExp = maxExp - currentExp;//레벨업에 필요한 경험치
                if (needExp <= hasExp) {
                  const sData = {...saveData};
                  const isLvUp = currentExp + needExp >= maxExp;
                  sData.ch[slotIdx].exp = currentExp + needExp;
                  sData.ch[slotIdx].hasExp = hasExp - needExp;
                  if (isLvUp) {
                    sData.ch[slotIdx].lv = saveCh.lv + 1;
                    sData.ch[slotIdx].exp = currentExp + needExp - maxExp;
                  }
                  changeSaveData(sData);
                } else {
                  setMsgOn(true);
                  setMsg(gameData.msg.sentence.lackExp[lang]);
                }
              }}><LvIcon type="commonIcon" pic="icon200" idx={0} /></LvButton>
              <FlexBox direction="column">
                <ChInfoLi>
                  <ActionBox justifyContent="space-between">
                    <Text code="t2" color="grey">{gameData.msg.state.sp[lang]}</Text>
                    <StyledText code="t2" color="main">
                      <span className="current">{saveCh.actionPoint || 0}</span><ChInfoBar>/</ChInfoBar><span className="max">50</span>
                    </StyledText>
                  </ActionBox>
                  <BodyKg justifyContent="flex-end">
                    <SizeTxt code="t3" color="main">({animalKg})</SizeTxt>
                    <KgPic type="state" pic="icon100" idx={8} />
                    <KgText code="t2" color={util.getPercentColor(gameData.animal_size.kg[chData.animal_type]?.[2] || 1, saveCh.kg || 0).stateColor}>{`${saveCh.kg || 0} kg`}</KgText>
                  </BodyKg>
                </ChInfoLi>
                <ChInfoLi>
                  <FlexBox justifyContent="space-between">
                    <Text code="t2" color="grey">{gameData.msg.info.exp[lang]}</Text>
                    <StyledText code="t2" color="main">
                      <span className="current">{saveExp.current}</span> <ChInfoBar>/</ChInfoBar> <span className="max">{saveExp.max}</span>
                    </StyledText>
                  </FlexBox>
                </ChInfoLi>
                <ChInfoLi>
                  <FlexBox justifyContent="space-between">
                    <Text code="t2" color="grey">{gameData.msg.info.cumulativeExp[lang]}</Text>
                    <StyledText code="t2" color="main">
                      <span className="current">{saveHasExp.current}</span> <ChInfoBar>/</ChInfoBar> <span className="max">{saveHasExp.max}</span>
                    </StyledText>
                  </FlexBox>
                </ChInfoLi>
              </FlexBox>
            </ChInfoContainer>
            <StateContainer direction="row" justifyContent="flex-start">
              {gameData.stateName.map((data, idx) => {
                const { stateColor } = util.getPercentColor(gameData.stateMax[idx], saveCh['st' + idx] || 0);
                return (
                  <StateGroup key={`chst${idx}`} justifyContent="flex-start">
                    <StateIcon type="state" pic="icon100" idx={idx} />
                    <StateInner>
                      <StateText code="t2" color="main">{gameData.msg.state[data][lang]}</StateText>
                      <TextTotal code="t4" weight="600" color={stateColor}>
                        {saveCh['st' + idx] || 0}
                      </TextTotal>
                    </StateInner>
                  </StateGroup>
                )
              })}
            </StateContainer>
            <ElementContainer direction="row" justifyContent="flex-start">
              {gameData.element.map((data, idx) => {
                const num = [(saveCh['el' + idx] || 0) + (saveCh['iSt' + (11 + idx)] || 0), (saveCh['el' + idx] || 0) + (saveCh['iSt' + (23 + idx)] || 0)];
                const elementPercent = [num[0] * .5, num[1] * 0.5];
                const actionPossibleElement = saveCh.newActionType?.some((type) => type === idx);
                
                return (
                  <ElementList 
                    className={`el el${idx}`} 
                    key={`el${idx}`} 
                    actionPossibleElement={actionPossibleElement} 
                    elementPercent={elementPercent} 
                    idx={idx} 
                    num={num} 
                  />
                )
              })}
            </ElementContainer>
          </StateArea>
        </InfoGroup>
      </Wrap>
      <PopupContainer>
        {popupOn && <Popup type={popupType} saveData={saveData} dataObj={popupInfo} showPopup={setPopupOn} />}
      </PopupContainer>
      <MsgContainer>
        {msgOn && <Msg text={msg} showMsg={setMsgOn}></Msg>}
      </MsgContainer>
    </>
  );
}

export default CharacterState;
