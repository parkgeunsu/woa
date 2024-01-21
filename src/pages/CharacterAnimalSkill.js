import { AppContext } from 'App';
import { FlexBox } from 'components/Container';
import { SkillMark } from 'components/ImagePic';
import InfoGroup from 'components/InfoGroup';
import { util } from 'components/Libs';
import Msg from 'components/Msg';
import MsgContainer from 'components/MsgContainer';
import Popup from 'components/Popup';
import PopupContainer from 'components/PopupContainer';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';

const Wrap = styled(FlexBox)`
  .skill_header{align-items:center;margin:0 0 25px 0;}
  .skill_group{position:relative;height:50px;}
  .skill_list{position:absolute;width:50px;height:50px;box-sizing:border-box;border-radius:30px;}
  .skill_list.pos0{left:0;}
  .skill_list.pos1{left:calc(33.3% - 12.5px);}
  .skill_list.pos2{left:calc(66.6% - 25px)}
  .skill_list.pos3{left:calc(100% - 50px)}
  .skill_button{position:relative;width:100%;height:100%;opacity:.2;}
  .skill_button .limitLv{position:absolute;top:-15px;right:-10px;width:100%;text-align:right;}
  .skill_button .lv{position:absolute;bottom:0;right:-10px;width:100%;text-align:right;}
  .skill_button.used{opacity:1;}
  .skill_button:before{content:"";display:block;position:absolute;top:13%;left:13%;width:80%;height:80%;background-repeat:no-repeat;filter:brightness(0);}
  .skill_button:after{content:"";display:block;position:absolute;top:10%;left:10%;width:80%;height:80%;background-repeat:no-repeat;}
  .skill_button.cate2:before{left:13%;top:13%;padding-top:80%;width:80%;height:0;}
  .skill_button.cate2:after{left:10%;top:10%;padding-top:80%;width:80%;height:0;}
  .skill_button.cate4:before{left:23%;top:23%;width:60%;background-position:center center;}
  .skill_button.cate4:after{left:20%;top:20%;width:60%;background-position:center center;}
  .skill_description{position:absolute;top:-17px;left:-10px;padding:0px 2px;border-radius:5px;color:#000;font-size:0.688rem;background:#aaa;font-weight:600;}
  .skill_description{position:absolute;top:-17px;left:-10px;padding:0px 2px;border-radius:5px;color:#000;font-size:0.688rem;background:#aaa;font-weight:600;}
  .skill_line{display:flex;position:relative;height:20px;}
  .skill_line span{position:relative;width:25%;height:100%;}
  .skill_line span:after{content:'';position:absolute;width:3px;height:100%;left:50%;top:0;transform:translate(-50%, 0);background:#ddd;opacity:0;}
  .skill_line span.line:after{opacity:.3;}
  .skill_line span.line.used:after{opacity:1;}
  .skill_line span:first-of-type:after{left:25px;}
  .skill_line span:nth-of-type(3):after{left:66%;}
  .skill_line span:last-of-type:after{left:auto;right:22px;}
`;
const SkillButton = styled.div`
  background:url(${({ frameImg }) => frameImg});background-size:100%;
  ${({skillCate, skillIcon, skillScene, skillFrame}) => {
    if (skillCate === 2 || skillCate === 11) {
      return `
        &:before{background:url(${skillIcon});background-size:100%;}
        &:after{background:url(${skillIcon});background-size:100%;}
      `;
    } else if (skillCate === 4) {
      return `
        &:before{background:url(${skillIcon});background-size:contain;}
        &:after{background:url(${skillIcon});background-size:contain;}
      `;
    } else {
      return `
        &:before{background:url(${skillIcon});}
        &:after{background:url(${skillIcon});background-size:500% auto;background-position:${skillScene%5 * 25}% ${Math.floor(skillScene/5) * 100/(Math.floor((skillFrame - 1) / 5))}%};
      `;
    }
  }}
`;

const SkillPoint = styled.div`
  position: relative;
  height: 40px;
  flex: 1;
`;
const CharacterAnimalSkill = ({
  saveData,
  slotIdx,
  changeSaveData,
}) => {
  const context = useContext(AppContext);
  const lang = React.useMemo(() => {
    return context.setting.lang;
  }, [context]);
  const imgSet = React.useMemo(() => {
    return context.images;
  }, [context]);
  const gameData = React.useMemo(() => {
    return context.gameData;
  }, [context]);
  const saveCh = React.useMemo(() => saveData.ch[slotIdx], [saveData, slotIdx]);
  const animalPoint = React.useMemo(() => {
    return saveCh.animalBeige;
  }, [saveCh]);
  const animalSkill = React.useMemo(() => saveCh.animalSkill, [saveCh]);
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
        <InfoGroup title={gameData.msg.menu.animalSkill[lang]} guideClick={() => {
          setPopupType('guide');
          setPopupOn(true);
          setPopupInfo({
            data:gameData.guide["characterAnimalSkill"],
          });
        }}>
          <div flex="true" className="skill_header">
            <div className="skill_reset" onClick={() => {
              let sData = {...saveData};
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
            }}>{gameData.msg.button.skillReset[lang]}</div>
            <SkillPoint className="skill_point">
              <SkillMark point={animalPoint} pic="animalType" idx={animalType}/>
            </SkillPoint>
          </div>
          { animalSkill && animalSkill.map((skGroup, groupIdx) => {
            return (
              <div key={groupIdx}>
                <div className="skill_group" >
                  {skGroup.map((skData, skIdx) => {
                    if (Object.keys(skData).length !== 0){
                      const sk = gameData.skill[skData.idx];
                      const skCate = sk.cate[0];
                      const skillIcon = (() => {
                        if (skCate === 2 || skCate === 11) {//passive, job
                          return imgSet.passive[sk.effAnimation];
                        } else if (skCate === 4) {//defence
                          return imgSet.actionIcon[sk.effAnimation];
                        } else {
                          return imgSet.eff[sk.effAnimation];
                        }
                      })();
                      return (
                        <div key={skIdx} className={`skill_list pos${skIdx % 4}`}>
                          <SkillButton skillCate={skCate} skillIcon={skillIcon} skillScene={gameData.effect[sk.effAnimation]?.imgScene} skillFrame={gameData.effect[sk.effAnimation]?.frame} frameImg={imgSet.etc.skillFrame} className={`skill_button cate${skCate} ${skData.lv > 0 ? "used" : ""}`} flex-h-center="true" onClick={() => {
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
                          }}>
                            <div className="limitLv">{`${skData.lv} / ${groupIdx + 1}`}</div>
                            {/* {sk.na[lang]}  */}
                            <div className="lv">{skData.lv > 0 && `Lv.${skData.lv}`}</div>
                          </SkillButton>
                          <button className="skill_description" onClick={(e) => {
                            setPopupType('skillDescription');
                            setPopupOn(true);
                            setPopupInfo({
                              sk:sk,
                              skData:skData,
                              skillCate:skCate,
                              skillIcon:skillIcon,
                              skillScene:gameData.effect[sk.effAnimation]?.imgScene,
                              skillFrame:gameData.effect[sk.effAnimation]?.frame,
                              frameImg:imgSet.etc.skillFrame,
                            });
                          }}>{gameData.msg.button.skill[lang]}</button>
                        </div>
                      )
                    }
                  })}
                </div>
                {groupIdx < animalSkill.length - 1 && (
                  <div className="skill_line">
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
                  </div>
                )}
              </div>
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
