import { Text } from 'components/Atom';
import { FlexBox } from 'components/Container';
import { IconPic, SkillMark } from 'components/ImagePic';
import InfoGroup from 'components/InfoGroup';
import { util } from 'components/Libs';
import Msg from 'components/Msg';
import MsgContainer from 'components/MsgContainer';
import Popup from 'components/Popup';
import PopupContainer from 'components/PopupContainer';
import { AppContext } from 'contexts/app-context';
import useLongPress from 'hooks/useLongPress';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';

const Wrap = styled(FlexBox)`
  position: absolute;
  top: 0;
  padding: 25px 20px 20px;
  box-sizing: border-box;
`;
const SkillHeader = styled(FlexBox)`
  margin: 0 auto 25px;
  width: calc(100% - 10px);
  height: auto;
  align-items: center;
`;
const SkillArea = styled.div`
  margin: 0 auto;
  width: 90%;
  height: 100%;
`;
const SkillHorizontal = styled(FlexBox)`
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: ${({groupIdx}) => groupIdx === 0 ? "50px" : "26%"};
  & > div {
    position: relative;
    height: 60px;
    width: 100%;
  }
`;
const RequiredLine = styled.div`
  position: absolute;
  left: calc(50% - 2px);
  bottom: 100%;
  width: 4px;
  height: 62%;
  ${({active}) => active ? 
    `
      background: var(--color-w);
      box-shadow: -3px 0 0 0 var(--color-red), 3px 0 0 0 var(--color-red);
    ` : 
    `
      background: var(--color-darkgrey);
      box-shadow: 0 0 7px 2px var(--color-b);
    `
  };
`;
const SkillList = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  box-sizing: border-box;
  border-radius: 30px;
  left: ${({pos}) => {
    switch(pos) {
      case 0:
        return 0;
      case 1:
        return `calc(33.3% - 20px)`;
      case 2:
        return `calc(66.6% - 40px)`;
      case 3:
        return `calc(100% - 60px)`;
      default:
        break;
    }
  }};
`;
const SkillLv = styled(Text)`
  position: absolute;
  left: -10px;
  top: -10px;
  width: 20px;
  height: 20px;
  border-radius: 50% 50% 0 50%;
  ${({theme}) => `
    border: 2px solid ${theme.color.sub};
    background-color: ${theme.color.main};
    box-shadow: 0 0 5px ${theme.color.sub};
  `};
  line-height: 20px;
  z-index: 5;
`;
const SkillButton = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  ${({used}) => used ? `` : `filter: grayscale(100%) brightness(0.3);`};
  z-index: 2;
  .limitLv {
    position: absolute;
    top: -15px;
    right: 0;
    width: 100%;
    text-align: right;
  }
`;
const StyledIconPic = styled(IconPic)`
  position: absolute;
  left: 15%;
  top: 15%;
  width: 70%;
  height: 70%;
  z-index: 1;
`;
const SkillPoint = styled(FlexBox)`
  position: relative;
  height: 50px;
  flex: 1;
`;
const BadgesTxt = styled(Text)`
`;
const SkillLine = styled(FlexBox)`
  height: auto;
  position: relative;
  height: 30px;
  span {
    position: relative;
    width: 25%;
    height: 100%;
  }
  span:after {
    content: '';
    position: absolute;
    width: 3px;
    height: 100%;
    left: 50%;
    top: 0;
    transform: translate(-50%, 0);
    background: #ddd;
    opacity: 0;
  }
  span.line:after{opacity:.3;}
  span.line.used:after{opacity:1;}
  span:first-of-type:after{
    left: 25px;
  }
  span:nth-of-type(2):after{
    left: calc(50% - 2px);
  }
  span:nth-of-type(3):after{
    left: calc(50% + 3px);
  }
  span:nth-of-type(4):after{
    left: auto;
    right: 22px;
  }
`;

const LongPress = ({
  clickHandler,
  longPressHandler,
}) => {
  return useLongPress(clickHandler, longPressHandler);
}

const CharacterAnimalSkill = ({
  chList,
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
  const saveCh = React.useMemo(() => chList ? chList[slotIdx] : saveData.ch[slotIdx] || {}, [chList, saveData, slotIdx]);
  const chName = React.useMemo(() => gameData.ch[saveCh.idx].na1[lang], [gameData, saveCh]);
  const animalPoint = React.useMemo(() => {
    return saveCh.animalBadge;
  }, [saveCh]);
  const animalSkill = React.useMemo(() => {
    return saveCh.animalSkill;
  }, [saveCh]);
  const itemPoint = React.useMemo(() => saveCh.items, [saveCh]);
  const animalType = React.useMemo(() => gameData.ch[saveCh.idx].animal_type, [gameData, saveCh]);
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");
  const [popupOn, setPopupOn] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [popupInfo, setPopupInfo] = useState({});
  
  return (
    <>
      <Wrap className="skillAnimal scroll-y">
        <InfoGroup pointTitle={`Lv.${saveCh.lv} ${chName}`} title={`${gameData.msg.grammar.conjunction[lang]} ${gameData.msg.menu.animalSkill[lang]}`} guideClick={() => {
          setPopupType('guide');
          setPopupOn(true);
          setPopupInfo({
            data:gameData.guide["characterAnimalSkill"],
          });
        }}>
          <SkillHeader>
            <div onClick={() => {
              const updatedAnimalSkill = saveCh.animalSkill.map((skGroup) => {
                return skGroup.map((skData) => {
                  if (skData.idx === "") {
                    return {idx: ""}
                  } else {
                    return {
                      idx: skData.idx,
                      lv: 0,
                      lvLimit: skData.lvLimit,
                    }
                  }
                });
              });

              const newSaveData = {
                ...saveData,
                ch: saveData.ch.map((ch, idx) => 
                  idx === slotIdx ? {
                    ...ch,
                    animalBadge: util.getAnimalPoint(itemPoint, animalType, ch.mark),
                    animalSkill: updatedAnimalSkill,
                    hasSkill: [...ch.sk]
                  } : ch
                )
              };

              changeSaveData(newSaveData);
              setMsgOn(true);
              setMsg(gameData.msg.sentence.resetAnimalSkill[lang]);
            }}>{gameData.msg.button.skillReset[lang]}</div>
            <SkillPoint>
              {animalPoint <= 0 ? <BadgesTxt code="t3" color="main">{gameData.msg.sentence.noBadges[lang]}</BadgesTxt> : <SkillMark point={animalPoint} idx={animalType}/>}
            </SkillPoint>
          </SkillHeader>
          <SkillArea>
          {animalSkill && animalSkill.map((skGroup, groupIdx) => {
            return (
              <SkillHorizontal groupIdx={groupIdx} alignItems="flex-end" key={groupIdx}>
                <div className="skill_group" >
                  {skGroup.map((skData, skIdx) => {
                    if (skData.idx !== ""){
                      const requiredLine = groupIdx !== 0 && animalSkill[groupIdx - 1][skIdx].idx !== "";
                      const sk = gameData.skill[skData.idx],
                        requiredSkill = groupIdx !== 0 && gameData.skill[animalSkill[groupIdx - 1][skIdx].idx];
                      const activeRequired = groupIdx === 0 || (groupIdx !== 0 && animalSkill[groupIdx - 1][skIdx].lv > 0);
                      console.log(sk);
                      //const skillCate = sk.cate;
                      return (
                        <SkillList key={skIdx} pos={skIdx % 4}>
                          {requiredLine && <RequiredLine active={activeRequired}/>}
                          <SkillButton used={skData.lv > 0}>
                            {/* <div className="limitLv">{`${skData.lv} / ${groupIdx + 1}`}</div> */}
                            <SkillLv code="t3" weight="600" color="sub" 
                            onClick={() => {
                              if (saveCh.animalBadge <= 0) {
                                setMsgOn(true);
                                setMsg(gameData.msg.sentence.lackBadges[lang]);
                              } else {
                                if (saveCh.animalSkill[groupIdx][skIdx].lv > 4) {//스킬레벨5 최대일때
                                  setMsgOn(true);
                                  setMsg(gameData.msg.sentence.maxSkillLv[lang]);
                                  return;
                                }
                                if (saveCh.animalSkill[groupIdx - 1] && saveCh.animalSkill[groupIdx - 1][skIdx].idx !== "" && saveCh.animalSkill[groupIdx - 1][skIdx].lv === 0) {//선챙 스킬이 없을때
                                  setMsgOn(true);
                                  const beforeSkill = gameData.skill[saveCh.animalSkill[groupIdx - 1][skIdx].idx].na[lang];
                                  setMsg(gameData.msg.sentenceFn.beforeSkill(lang, beforeSkill, groupIdx));
                                  return;
                                }
                                if (saveCh.lv < animalSkill[groupIdx][skIdx].lvLimit) {//레벨제한보다 적을때
                                  setMsgOn(true);
                                  setMsg(gameData.msg.sentence.lackLv[lang]);
                                  return;
                                }

                                const animalIdx = saveCh.animalSkill[groupIdx][skIdx].idx;
                                const newLv = saveCh.animalSkill[groupIdx][skIdx].lv + 1;
                                
                                const updatedAnimalSkill = saveCh.animalSkill.map((group, gIdx) => 
                                  gIdx === groupIdx ? group.map((sk, sIdx) => 
                                    sIdx === skIdx ? { ...sk, lv: newLv } : sk
                                  ) : group
                                );

                                let updatedHasSkill = [...saveCh.hasSkill];
                                const overlapIdx = updatedHasSkill.findIndex(hSkill => hSkill.idx === animalIdx);

                                if (overlapIdx >= 0) {
                                  updatedHasSkill[overlapIdx] = { ...updatedHasSkill[overlapIdx], lv: newLv };
                                } else {
                                  updatedHasSkill.push({ ...saveCh.animalSkill[groupIdx][skIdx], lv: newLv });
                                }

                                const newSaveData = {
                                  ...saveData,
                                  ch: saveData.ch.map((ch, idx) => 
                                    idx === slotIdx ? {
                                      ...ch,
                                      animalBadge: ch.animalBadge - 1,
                                      animalSkill: updatedAnimalSkill,
                                      hasSkill: updatedHasSkill
                                    } : ch
                                  )
                                };

                                changeSaveData(newSaveData);
                              }
                            }}>{skData.lv}</SkillLv>
                            <IconPic pic="skill" idx={skData.idx} 
                            onClick={() => {
                              setPopupInfo({
                                sk: sk,
                                skData: skData,
                                chLv: saveCh.lv,
                                activeRequired: activeRequired,
                                requiredSkill: requiredSkill,
                              });
                              setPopupType('skillDescription');
                              setPopupOn(true);
                            }}/>
                          </SkillButton>
                        </SkillList>
                      )
                    }
                  })}
                </div>
                
              </SkillHorizontal>
            )
          })}
          </SkillArea>
        </InfoGroup>
      </Wrap>
      <PopupContainer>
        {popupOn && <Popup type={popupType} dataObj={popupInfo} showPopup={setPopupOn} />}
      </PopupContainer>
      <MsgContainer>
        {msgOn && <Msg text={msg} showMsg={setMsgOn}></Msg>}
      </MsgContainer>
    </>
  );
}



export default CharacterAnimalSkill;
