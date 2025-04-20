import { AppContext } from 'App';
import { Text } from 'components/Atom';
import { FlexBox } from 'components/Container';
import { IconPic, SkillMark } from 'components/ImagePic';
import InfoGroup from 'components/InfoGroup';
import { util } from 'components/Libs';
import Msg from 'components/Msg';
import MsgContainer from 'components/MsgContainer';
import Popup from 'components/Popup';
import PopupContainer from 'components/PopupContainer';
import useLongPress from 'hooks/useLongPress';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';

const Wrap = styled(FlexBox)`
  position: absolute;
  top: 0;
  padding: 25px 20px 20px;
  box-sizing: border-box;
`;
const SkillHorizontal = styled.div`
  position: relative;
  margin: 0 auto;
  width: 90%;
  & > div {
    position:relative;height:50px;
  }
`;
const SkillHeader = styled(FlexBox)`
  margin: 0 auto 25px;
  width: calc(100% - 10px);
  height: auto;
  align-items: center;
`;
const SkillList = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  border-radius: 30px;
  left: ${({pos}) => {
    switch(pos) {
      case 0:
        return 0;
      case 1:
        return `calc(33.3% - 16.5px)`;
      case 2:
        return `calc(66.6% - 33px)`;
      case 3:
        return `calc(100% - 50px)`;
      default:
        break;
    }
  }};
`;
const SkillLv = styled(Text)`
  position: absolute;
  left: 0;
  top: 0;
  width: 30%;
  height: 30%;
  border-radius: 50% 50% 0 50%;
  ${({theme}) => `
    border: 2px solid ${theme.color.sub};
    background-color: ${theme.color.main};
    box-shadow: 0 0 5px ${theme.color.sub};
  `};
  line-height: 1.2;
  z-index: 5;
`;
const SkillButton = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  opacity: ${({used}) => used ? 1 : 0.4};
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
const SkillPoint = styled.div`
  position: relative;
  height: 50px;
  flex: 1;
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
  saveData,
  slotIdx,
  changeSaveData,
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
  const chName = React.useMemo(() => gameData.ch[saveCh.idx].na1, [saveData, slotIdx]);
  const animalPoint = React.useMemo(() => {
    return saveCh.animalBeige;
  }, [saveData, slotIdx]);
  const animalSkill = React.useMemo(() => {
    return saveCh.animalSkill;
  }, [saveData, slotIdx]);
  const itemPoint = React.useMemo(() => saveCh.items, [saveData, slotIdx]);
  const animalType = React.useMemo(() => gameData.ch[saveCh.idx].animal_type, [gameData, saveCh]);
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");
  const [popupOn, setPopupOn] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [popupInfo, setPopupInfo] = useState({});
  
  return (
    <>
      <Wrap className="skillAnimal scroll-y">
        <InfoGroup pointTitle={chName} title={`${gameData.msg.grammar.conjunction[lang]} ${gameData.msg.menu.animalSkill[lang]}`} guideClick={() => {
          console.log("aa");
          setPopupType('guide');
          setPopupOn(true);
          setPopupInfo({
            data:gameData.guide["characterAnimalSkill"],
          });
        }}>
          <SkillHeader>
            <div onClick={() => {
              const sData = {...saveData};
              sData.ch[slotIdx].animalBeige = util.getAnimalPoint(itemPoint, animalType, saveData.ch[slotIdx].mark);
              sData.ch[slotIdx].animalSkill = saveCh.animalSkill.map((skGroup) => {
                return skGroup.map((skData) => {
                  if (Object.keys(skData).length !== 0) {
                    return {
                      idx:skData.idx,
                      lv:0,
                    }
                  } else {
                    return {}
                  }
                });
              });
              saveCh.hasSkill = [...saveCh.sk];
              changeSaveData(sData);
              setMsgOn(true);
              setMsg(gameData.msg.sentence.resetAnimalSkill[lang]);
            }}>{gameData.msg.button.skillReset[lang]}</div>
            <SkillPoint className="skill_point">
              <SkillMark point={animalPoint} idx={animalType}/>
            </SkillPoint>
          </SkillHeader>
          {animalSkill && animalSkill.map((skGroup, groupIdx) => {
            return (
              <SkillHorizontal key={groupIdx}>
                <div className="skill_group" >
                  {skGroup.map((skData, skIdx) => {
                    if (Object.keys(skData).length !== 0){
                      const sk = gameData.skill[skData.idx];
                      const skillCate = sk.cate;
                      {/* const skillIcon = (() => {
                        if (skillCate === 2 || skillCate === 11) {//passive, job
                          return imgSet.passive[sk.effAnimation];
                        } else if (skillCate === 4) {//defence
                          return imgSet.actionIcon[sk.effAnimation];
                        } else {
                          return imgSet.effect[sk.effAnimation].img;
                      }
                      })(); */}
                      return (
                        <SkillList key={skIdx} pos={skIdx % 4}>
                          <SkillButton used={skData.lv > 0} {...LongPress({
                            clickHandler: () => {
                              let sData = {...saveData};
                              if (sData.ch[slotIdx].animalBeige <= 0) {
                                setMsgOn(true);
                                setMsg(gameData.msg.sentence.lackBadges[lang]);
                              } else {
                                if (skIdx % 4 === 3) {
                                  if (sData.ch[slotIdx].animalBeige > 0) {
                                    if (sData.ch[slotIdx].animalSkill[groupIdx][skIdx].lv > 4) {
                                      setMsgOn(true);
                                        setMsg(gameData.msg.sentence.maxSkillLv[lang]);
                                    } else {
                                      sData.ch[slotIdx].animalBeige -= 1;
                                      sData.ch[slotIdx].animalSkill[groupIdx][skIdx].lv += 1;
                                      const animalIdx = sData.ch[slotIdx].animalSkill[groupIdx][skIdx].idx;
                                      const overlapIdx = sData.ch[slotIdx].hasSkill.findIndex((hSkill, idx) => {
                                        if (hSkill.idx === animalIdx) {
                                          return idx;
                                        }
                                      });
                                      if (overlapIdx >= 0) {
                                        sData.ch[slotIdx].hasSkill[overlapIdx].lv = sData.ch[slotIdx].animalSkill[groupIdx][skIdx].lv;
                                      } else {
                                        sData.ch[slotIdx].hasSkill.push(sData.ch[slotIdx].animalSkill[groupIdx][skIdx]);
                                      }
                                      changeSaveData(sData);
                                    }
                                  } else {
                                    sData.ch[slotIdx].animalBeige = 0;
                                  }
                                } else {
                                  if (!saveCh.animalSkill[groupIdx - 1] || (saveCh.animalSkill[groupIdx - 1][skIdx] && saveCh.animalSkill[groupIdx - 1][skIdx].lv > groupIdx - 1)) {//선행 스킬 체크
                                    if (sData.ch[slotIdx].animalBeige > 0) {
                                      if (sData.ch[slotIdx].animalSkill[groupIdx][skIdx].lv > 4) {
                                        setMsgOn(true);
                                        setMsg(gameData.msg.sentence.maxSkillLv[lang]);
                                      } else {
                                        sData.ch[slotIdx].animalBeige -= 1;
                                        sData.ch[slotIdx].animalSkill[groupIdx][skIdx].lv += 1;
                                        const animalIdx = sData.ch[slotIdx].animalSkill[groupIdx][skIdx].idx;
                                        const overlapIdx = sData.ch[slotIdx].hasSkill.findIndex((hSkill, idx) => {
                                          if (hSkill.idx === animalIdx) {
                                            return idx;
                                          }
                                        });
                                        if (overlapIdx >= 0) {
                                          sData.ch[slotIdx].hasSkill[overlapIdx].lv = sData.ch[slotIdx].animalSkill[groupIdx][skIdx].lv;
                                        } else {
                                          sData.ch[slotIdx].hasSkill.push(sData.ch[slotIdx].animalSkill[groupIdx][skIdx]);
                                        }
                                        changeSaveData(sData);
                                      }
                                    } else {
                                      sData.ch[slotIdx].animalBeige = 0;
                                    }
                                  } else {
                                    setMsgOn(true);
                                    const beforeSkill = gameData.skill[saveCh.animalSkill[groupIdx - 1][skIdx].idx].na[lang];
                                    setMsg(gameData.msg.sentenceFn.beforeSkill(lang, beforeSkill, groupIdx));
                                  }
                                }
                              }
                            }, 
                            longPressHandler: () => {
                              setPopupType('skillDescription');
                              setPopupOn(true);
                              setPopupInfo({
                                sk:sk,
                                skData:skData,
                              });
                            }
                          })}>
                            {/* <div className="limitLv">{`${skData.lv} / ${groupIdx + 1}`}</div> */}
                            {skData.lv > 0 && <SkillLv code="t3" weight="600" color="sub">{skData.lv}</SkillLv>}
                            {(skillCate === 2 || skillCate === 11) ? ( //passive, job
                              <IconPic pic="skill" idx={skData.idx} />
                            ) : (
                              <>
                                <IconPic type="skillBack" pic="icon200" idx={util.idxToSkillBack(skillCate)} />
                                <StyledIconPic pic="skill" idx={skData.idx} />
                              </>
                            )}
                          </SkillButton>
                        </SkillList>
                      )
                    }
                  })}
                </div>
                {groupIdx < animalSkill.length - 1 && (
                  <SkillLine justifyContent="flex-start">
                    {skGroup.map((skData, skIdx) => {
                      if (Object.keys(skData).length !== 0){
                        let used = '';
                        if (saveCh.animalSkill[groupIdx + 1]) {
                          used = animalSkill[groupIdx + 1][skIdx].lv > 0 ? 'used' : '';
                        }
                        if (saveCh.animalSkill[groupIdx + 1] && Object.keys(saveCh.animalSkill[groupIdx + 1][skIdx]).length !== 0) {
                          return <span key={skIdx} className={`line ${used}`}></span>;
                        } else {
                          return <span key={skIdx} ></span>;
                        }
                      }
                    })}
                  </SkillLine>
                )}
              </SkillHorizontal>
            )
          })}
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
