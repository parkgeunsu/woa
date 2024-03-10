import { AppContext } from 'App';
import { FlexBox } from 'components/Container';
import { IconPic } from 'components/ImagePic';
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
  .sk[cate1]:after{
    content:'';position:absolute;left:0;top:0;border-left:10px solid var(--color-blue);border-top:10px solid var(--color-blue);border-right:10px solid transparent;border-bottom:10px solid transparent;
  }/*passive*/
  .sk[cate3]:after{content:'';position:absolute;left:0;top:0;border-left:10px solid var(--color-red);border-top:10px solid var(--color-red);border-right:10px solid transparent;border-bottom:10px solid transparent;}/*active*/
  .sk[cate4]:after{content:'';position:absolute;left:0;top:0;border-left:10px solid var(--color-point6);border-top:10px solid var(--color-point6);border-right:10px solid transparent;border-bottom:10px solid transparent;}/*active, passive*/
  .sk[cate5]:after{content:'';position:absolute;left:0;top:0;border-left:10px solid var(--color-point1);border-top:10px solid var(--color-point1);border-right:10px solid transparent;border-bottom:10px solid transparent;}/*buff*/
  .sk[cate6]:after{content:'';position:absolute;left:0;top:0;border-left:10px solid var(--color-green);border-top:10px solid var(--color-green);border-right:10px solid transparent;border-bottom:10px solid transparent;}/*passive, buff*/
  .sk[cate8]:after{content:'';position:absolute;left:0;top:0;border-left:10px solid var(--color-point2);border-top:10px solid var(--color-point2);border-right:10px solid transparent;border-bottom:10px solid transparent;}/*active, buff*/
  .sk[cate9]:after{content:'';position:absolute;left:0;top:0;border-left:10px solid var(--color-w);border-top:10px solid var(--color-w);border-right:10px solid transparent;border-bottom:10px solid transparent;}/*active, passive, buff*/
`;
const Skill = styled.div`
  position: relative;
  margin: 0 10px 5px;
  padding: 0 0 5px 0;
  font-size: 0.75rem;
  border: 3px double rgba(255,255,255,.5);
  border-radius: 5px;
  opacity: .3;
  ${({possible}) => possible ? `
    border-color: var(--color-magic);
    opacity: 1;
  ` : ''}
  .txt{flex:1;min-height:30px;line-height:1.2;font-size:0.75rem;}
  .lv{margin:0 10px 0 0;}
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    border: 10px solid transparent;
  }
  ${({skillCate}) => {
    switch(skillCate) {
      case 1:
        return `
          &:after {
            border-left-color: var(--color-blue);
            border-top-color: var(--color-blue);
          }
        `;
      case 2: //passive
        return `
          &:after {
            border-left-color: var(--color-lightblue);
            border-top-color: var(--color-lightblue);
          }
        `;
      case 3: //active
        return `
          &:after {
            border-left-color: var(--color-red);
            border-top-color: var(--color-red);
          }
        `;
      case 4: //defence
        return `
          &:after {
            border-left-color: var(--color-point6);
            border-top-color: var(--color-point6);
          }
        `;
      case 5: //buff
        return `
          &:after {
            border-left-color: var(--color-yellow);
            border-top-color: var(--color-yellow);
          }
        `;
      case 6: //debuff
        return `
          &:after {
            border-left-color: var(--color-purple);
            border-top-color: var(--color-purple);
          }
        `;
      default:
        break;
    }
  }}
`;
const SkillInfo = styled.div`
  display: flex;
  padding: 5px 10px 0;
`;
const SkillName = styled.div`
  display:flex;justify-content:center;align-items:center;margin:2px 5px 5px;width:100%;text-align:center;font-size:0.75rem;color:#fff;font-weight:600;font-size:0.938rem;
`;
const SkillIcon = styled.span`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
const StyledIconPic = styled(IconPic)`
  position: absolute;
  left: 15%;
  top: 15%;
  width: 70%;
  height: 70%;
  z-index: 1;
`;
const ActionType = styled.span`
  position: relative;
  margin: 0 0 0 3px;
  width: 20px;
  height: 20px;
`;
const LvBar = styled(FlexBox)`
  height: auto;
  .exp{
    position: relative;
    margin: auto 5px;
    width: 100%;
    height: 20px;
    border-radius: 20px;
    background: var(--color-grey);
    overflow: hidden;
  }
  .exp span{
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    background-color: var(--color-blue);
    border-radius: 0 20px 20px 0;}
`;
const CharacterSkill = ({
  saveData,
  slotIdx,
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
  const chName = React.useMemo(() => gameData.ch[saveCh.idx].na1, [saveData, slotIdx]);
  const [popupOn, setPopupOn] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [popupInfo, setPopupInfo] = useState({});
  const saveSkill = React.useMemo(() => saveCh.hasSkill, [saveCh]);
  return (
    <>
      <Wrap className="skill scroll-y">
        <InfoGroup pointTitle={chName} title={`${gameData.msg.grammar.conjunction[lang]} ${gameData.msg.menu.skill[lang]}`} guideClick={() => {
          setPopupType('guide');
          setPopupOn(true);
          setPopupInfo({
            data:gameData.guide["characterSkill"],
          });
        }}>
          {saveSkill && saveSkill.map((skillData, idx) => {
            const skData = gameData.skill[skillData.idx];
            const {skillText, skillType, skillCate} = util.getSkillText({
              skill: skData,
              lv: skillData.lv - 1,
              lang: lang,
            });
            let actionPossibleSkill = 'possible';
            if (skillType > 0 && skillType < 7) {
              saveData.ch[slotIdx].newActionType.forEach((data) => {
                actionPossibleSkill = (data + 1) === skillType;
                if (actionPossibleSkill) {
                  return;
                }
              });
            }
            return (
              <Skill key={idx} possible={actionPossibleSkill} skillCate={skillCate}>
                <SkillInfo>
                  <SkillIcon>
                    {(skillCate === 2 || skillCate === 11) ? ( //passive, job
                      <IconPic pic="skill" idx={skData.idx} />
                    ) : (
                      <>
                        <IconPic type="skillBack" pic="icon200" idx="0" />
                        <StyledIconPic pic="skill" idx={skData.idx} />
                      </>
                    )}
                  </SkillIcon>
                  {/* 
                  {cate !== 2 && cate !== 4 && cate !== 11 && (
                    <SkillIcon skillIcon={imgSet.eff[skData.effAnimation]} skillScene={gameData.effect[skData.effAnimation].imgScene} skillFrame={gameData.effect[skData.effAnimation].frame} />
                  )} */}
                  <div style={{padding:"0 0 5px 10px",width:"100%", flex:1}} flex-h-center="true">
                    <SkillName>
                      <span className="lv">LV.{skillData.lv}</span>{skData.na[lang]}
                      {skData.element_type !== 0 && <ActionType>
                        <IconPic type="element" isAbsolute={true} isThumb={true} pic="icon100" idx={skData.element_type} />
                      </ActionType>}
                    </SkillName>
                    <div className="txt" dangerouslySetInnerHTML={{__html: skillText}} />
                  </div>
                </SkillInfo>
                {typeof skData.exp === "number" && (
                  <LvBar>
                    <span className="exp">
                      <span className="gradient_dark" skdata={skData} style={{width:`${skData.exp || 0}%`}}></span>
                    </span>
                  </LvBar>
                )}
              </Skill>
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

export default CharacterSkill;
