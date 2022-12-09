import React, { useState, useContext, useLayoutEffect, useRef } from 'react';
import { AppContext } from 'App';
import { util } from 'components/Libs';
import styled from 'styled-components';
import GuideQuestion from 'components/GuideQuestion';
import PopupContainer from 'components/PopupContainer';
import Popup from 'components/Popup';
import MsgContainer from 'components/MsgContainer';
import Msg from 'components/Msg';

const makeMark = (markNum, img) => {
  let markTag = '',
    idxCount = 0;
  const mark10 = Math.floor(markNum / 10),
    mark5 = Math.floor((markNum - mark10 * 10) / 5),
    mark1 = markNum % 5;
  for (let i = 0; i < mark10; ++i) {
    markTag += `<span class="big_size" style="right:${idxCount*15}px"><img src="${img}" class="light"/><img src="${img}" class="front"/><img src="${img}" class="shadow"/></span>`;
    idxCount ++;
  }
  for (let i = 0; i < mark5; ++i) {
    markTag += `<span class="middle_size" style="right:${idxCount*15}px"><img src="${img}" class="light"/><img src="${img}" class="front"/><img src="${img}" class="shadow"/></span>`;
    idxCount ++;
  }
  for (let i = 0; i < mark1; ++i) {
    markTag += `<span style="right:${idxCount*15}px"><img src="${img}" class="light"/><img src="${img}" class="front"/><img src="${img}" class="shadow"/></span>`;
    idxCount ++;
  }
  return markTag; 
  //imgSet.animalType[animalIdx]
}
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
const SkillElement = styled.span`
  ${'' /* &.el0{background-image:url(${({ elementIcon }) => elementIcon[0]});background-size:100%;}
  &.el1{background-image:url(${({ elementIcon }) => elementIcon[1]});background-size:100%;}
  &.el2{background-image:url(${({ elementIcon }) => elementIcon[2]});background-size:100%;}
  &.el3{background-image:url(${({ elementIcon }) => elementIcon[3]});background-size:100%;}
  &.el4{background-image:url(${({ elementIcon }) => elementIcon[4]});background-size:100%;}
  &.el5{background-image:url(${({ elementIcon }) => elementIcon[5]});background-size:100%;}
  &.el6{background-image:url(${({ elementIcon }) => elementIcon[6]});background-size:100%;}
  &.el7{background-image:url(${({ elementIcon }) => elementIcon[7]});background-size:100%;}
  &.el8{background-image:url(${({ elementIcon }) => elementIcon[8]});background-size:100%;}
  &.el9{background-image:url(${({ elementIcon }) => elementIcon[9]});background-size:100%;}
  &.el10{background-image:url(${({ elementIcon }) => elementIcon[10]});background-size:100%;}
  &.el11{background-image:url(${({ elementIcon }) => elementIcon[11]});background-size:100%;}
  &.el12{background-image:url(${({ elementIcon }) => elementIcon[12]});background-size:100%;} */}
`;
const CharacterAnimalSkill = ({
  saveData,
  slotIdx,
  changeSaveData,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
	const setting = useContext(AppContext).setting,
    gameSpd = setting.speed,
    lang = setting.lang;
  const saveCh = saveData.ch[slotIdx];
  const [animalPoint, setAnimalPoint] = useState(saveCh.animalBeige);
  const [animalSkill, setAnimalSkill] = useState(saveCh.animalSkill);
  const animalTypeRef = useRef(gameData.ch[saveData.ch[slotIdx].idx].animal_type);
  const itemRef = useRef(saveData.ch[slotIdx].items);
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");
  const [popupOn, setPopupOn] = useState(false);
  const popupType = useRef('');
  const [popupInfo, setPopupInfo] = useState({});

  useLayoutEffect(() => {
    itemRef.current = saveData.ch[slotIdx].items;
    animalTypeRef.current = gameData.ch[saveData.ch[slotIdx].idx].animal_type;
    setAnimalSkill(saveCh.animalSkill);
    setAnimalPoint(saveCh.animalBeige);
    // animalSkill.current = saveCh.animalSkill;
    // setAnimalPoint(getAnimalPoint(itemRef.current, animalTypeRef.current, saveData.ch[slotIdx].mark));
  }, [saveData, slotIdx]);
  
  return (
    <>
      <div className="skillAnimal scroll-y">
        <dl className="info_group">
          <dt>ANIMAL SKILL<span>({gameData.msg.menu.animalSkill[lang]})</span>
            <GuideQuestion size={20} pos={["right","top"]} colorSet={"black"} onclick={() => {
              popupType.current = 'guide';
              setPopupOn(true);
              setPopupInfo({
                data:gameData.guide["characterAnimalSkill"],
              });
            }}/>
          </dt>
          <dd>
            <div flex="true" className="skill_header">
              <div className="skill_reset" onClick={() => {
                let sData = {...saveData};
                sData.ch[slotIdx].animalBeige = util.getAnimalPoint(itemRef.current, animalTypeRef.current, saveData.ch[slotIdx].mark);
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
              <div className="skill_point" dangerouslySetInnerHTML={{__html: makeMark(animalPoint, imgSet.animalType[animalTypeRef.current])}}>
              </div>
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
                              popupType.current = 'skillDescription';
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
          </dd>
        </dl>
      </div>
      <PopupContainer>
        {popupOn && <Popup type={popupType.current} dataObj={popupInfo} showPopup={setPopupOn}/>}
      </PopupContainer>
      <MsgContainer>
        {msgOn && <Msg text={msg} showMsg={setMsgOn}></Msg>}
      </MsgContainer>
    </>
  );
}

export default CharacterAnimalSkill;
