import { AppContext } from 'App';
import { FlexBox } from 'components/Container';
import InfoGroup from 'components/InfoGroup';
import Popup from 'components/Popup';
import PopupContainer from 'components/PopupContainer';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';

const Wrap = styled(FlexBox)`
  .sk{position:relative;margin:0 10px 5px;padding:0 0 5px 0;font-size:0.75rem;border:3px double rgba(255,255,255,.5);border-radius:5px;opacity:.3;}
  .sk.possible{border-color:#37f;opacity:1;}
  .sk.cate1:after{content:'';position:absolute;left:0;top:0;border-left:10px solid var(--color-blue);border-top:10px solid var(--color-blue);border-right:10px solid transparent;border-bottom:10px solid transparent;}
  .sk.cate2:after{content:'';position:absolute;left:0;top:0;border-left:10px solid var(--color-lightblue);border-top:10px solid var(--color-lightblue);border-right:10px solid transparent;border-bottom:10px solid transparent;}/*passive*/
  .sk.cate3:after{content:'';position:absolute;left:0;top:0;border-left:10px solid var(--color-red);border-top:10px solid var(--color-red);border-right:10px solid transparent;border-bottom:10px solid transparent;}/*active*/
  .sk.cate4:after{content:'';position:absolute;left:0;top:0;border-left:10px solid var(--color-point6);border-top:10px solid va\r(--color-point6);border-right:10px solid transparent;border-bottom:10px solid transparent;}/*defence*/
  .sk.cate5:after{content:'';position:absolute;left:0;top:0;border-left:10px solid var(--color-yellow);border-top:10px solid var(--color-yellow);border-right:10px solid transparent;border-bottom:10px solid transparent;}/*buff*/
  .sk.cate6:after{content:'';position:absolute;left:0;top:0;border-left:10px solid var(--color-purple);border-top:10px solid var(--color-purple);border-right:10px solid transparent;border-bottom:10px solid transparent;}/*debuff*/
  .sk .name{display:flex;justify-content:center;align-items:center;margin:2px 5px 5px;width:100%;text-align:center;font-size:0.75rem;color:#fff;font-weight:600;font-size:0.938rem;}
  .sk .action-type{margin:0 0 0 3px;width:20px;height:20px;}
  .sk .txt{flex:1;min-height:30px;line-height:1.2;font-size:0.75rem;}
  .sk .lv_exp{align-items:flex-end;}
  .sk .lv{margin:0 10px 0 0;}
  .sk .exp{position:relative;margin:auto 5px;width:100%;height:12px;background:#fff;border-radius:10px;overflow:hidden;}
  .sk .exp span{display:block;position:absolute;left:0;bottom:0;top:0;background-color:var(--color-blue);border-radius:0 10px 10px 0;}
  .sk_info{display:flex;padding:5px 10px 0;}
  .sk_icon{position:relative;width:40px;height:40px;background-position:center center;background-repeat:no-repeat;font-size:0;border-radius:40px;box-shadow:3px 3px 5px #000;}
  .sk_icon:before{content:"";display:block;position:absolute;top:8%;left:8%;width:90%;height:90%;background-repeat:no-repeat;filter:brightness(0);}
  .sk_icon:after{content:"";display:block;position:absolute;top:5%;left:5%;width:90%;height:90%;background-repeat:no-repeat;}
  .sk_icon2{position:relative;width:40px;height:40px;background-position:center center;background-repeat:no-repeat;font-size:0;border-radius:40px;box-shadow:3px 3px 5px #000;}
  .sk_icon2:before{content:"";display:block;position:absolute;top:23%;left:23%;width:60%;height:60%;background-repeat:no-repeat;background-position:center center;filter:brightness(0);}
  .sk_icon2:after{content:"";display:block;position:absolute;top:20%;left:20%;width:60%;height:60%;background-repeat:no-repeat;background-position:center center;}
  .sk_icon3{position:relative;width:40px;height:40px;background-position:center center;background-repeat:no-repeat;font-size:0;border-radius:40px;box-shadow:3px 3px 5px #000;}
  .sk_icon3:before{content:"";display:block;position:absolute;top:13%;left:13%;width:80%;height:80%;background-repeat:no-repeat;background-position:center center;filter:brightness(0);}
  .sk_icon3:after{content:"";display:block;position:absolute;top:10%;left:10%;width:80%;height:80%;background-repeat:no-repeat;background-position:center center;}
  .sk[cate1]:after{content:'';position:absolute;left:0;top:0;border-left:10px solid var(--color-blue);border-top:10px solid var(--color-blue);border-right:10px solid transparent;border-bottom:10px solid transparent;}/*passive*/
  .sk[cate3]:after{content:'';position:absolute;left:0;top:0;border-left:10px solid var(--color-red);border-top:10px solid var(--color-red);border-right:10px solid transparent;border-bottom:10px solid transparent;}/*active*/
  .sk[cate4]:after{content:'';position:absolute;left:0;top:0;border-left:10px solid var(--color-point6);border-top:10px solid var(--color-point6);border-right:10px solid transparent;border-bottom:10px solid transparent;}/*active, passive*/
  .sk[cate5]:after{content:'';position:absolute;left:0;top:0;border-left:10px solid var(--color-point1);border-top:10px solid var(--color-point1);border-right:10px solid transparent;border-bottom:10px solid transparent;}/*buff*/
  .sk[cate6]:after{content:'';position:absolute;left:0;top:0;border-left:10px solid var(--color-green);border-top:10px solid var(--color-green);border-right:10px solid transparent;border-bottom:10px solid transparent;}/*passive, buff*/
  .sk[cate8]:after{content:'';position:absolute;left:0;top:0;border-left:10px solid var(--color-point2);border-top:10px solid var(--color-point2);border-right:10px solid transparent;border-bottom:10px solid transparent;}/*active, buff*/
  .sk[cate9]:after{content:'';position:absolute;left:0;top:0;border-left:10px solid var(--color-w);border-top:10px solid var(--color-w);border-right:10px solid transparent;border-bottom:10px solid transparent;}/*active, passive, buff*/
`;
const SkillIcon = styled.span`
  background:url(${({ frameImg }) => frameImg});background-size:100%;
  &:before{background:url(${({skillIcon}) => skillIcon});background-size:500% auto;background-position:${({skillScene, skillFrame}) => {
    return `${skillScene%5 * 25}% ${Math.floor(skillScene/5) * 100/(Math.floor((skillFrame - 1) / 5))}%`
  }}};
  &:after{background:url(${({skillIcon}) => skillIcon});background-size:500% auto;background-position:${({skillScene, skillFrame}) => {
    return `${skillScene%5 * 25}% ${Math.floor(skillScene/5) * 100/(Math.floor((skillFrame - 1) / 5))}%`
  }}};
`;
const SkillIcon2 = styled.span`
  background:url(${({ frameImg }) => frameImg});background-size:100%;
  &:before{background:url(${({skillIcon}) => skillIcon});background-size:contain;};
  &:after{background:url(${({skillIcon}) => skillIcon});background-size:contain;};
`;
const SkillIcon3 = styled.span`
  background:url(${({ frameImg }) => frameImg});background-size:100%;
  &:before{background:url(${({skillIcon}) => skillIcon});background-size:contain;};
  &:after{background:url(${({skillIcon}) => skillIcon});background-size:contain;};
`;
const ActionType = styled.span`
  background:url(${({actionType}) => actionType}) no-repeat center center;background-size:100%;
`;
const CharacterSkill = ({
  saveData,
  slotIdx,
  lang,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
  const saveCh = React.useMemo(() => saveData.ch[slotIdx], [saveData, slotIdx]);
  const [popupOn, setPopupOn] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [popupInfo, setPopupInfo] = useState({});
  const saveSkill = React.useMemo(() => saveCh.hasSkill, [saveCh]);
  // const animalSkill = saveData.ch[slotIdx].animalSkill;
  // const elementIcon = [imgSet.element[0],imgSet.element[1],imgSet.element[2],imgSet.element[3],imgSet.element[4],imgSet.element[5],imgSet.element[6],imgSet.element[7],imgSet.element[8],imgSet.element[9],imgSet.element[10],imgSet.element[11],imgSet.element[12]];
  return (
    <>
      <Wrap className="skill scroll-y">
        <InfoGroup title={gameData.msg.menu.skill[lang]} guideClick={() => {
          setPopupType('guide');
          setPopupOn(true);
          setPopupInfo({
            data:gameData.guide["characterSkill"],
          });
        }}>
          {saveSkill && saveSkill.map((skData, idx) => {
            const skData_ = gameData.skill[skData.idx];
            const cate = skData_.cate[0];
            const replaceArr = skData_.txt[lang].match(/[$][(]\d[)]*/g) || [];
            const replaceArr_ = skData_.txt[lang].match(/[$][<]\d[>]*/g) || [];
            const skillType = skData_.element_type;
            let replaceText = skData_.txt[lang];
            replaceArr.forEach((data, idx) => {
              replaceText = replaceText.replace(data, skData_.eff[idx].num[skData.lv - 1]);
            });
            replaceArr_.forEach((data, idx) => {
              replaceText = replaceText.replace(data, skData_.buff[idx].num[skData.lv - 1]);
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
              <div key={idx} className={`sk cate${cate} ${actionPossibleSkill ? "possible" : ""}`} flex-h="true">
                <div className="sk_info" flex="true">
                  {(cate === 2 || cate === 11) && ( //passive
                    <SkillIcon3 className="sk_icon3" skillIcon={imgSet.passive[skData_.effAnimation]} frameImg={imgSet.etc.skillFrame}/>
                  )}
                  {cate === 4 && ( //defence
                    <SkillIcon2 className="sk_icon2" skillIcon={imgSet.actionIcon[skData_.effAnimation]} frameImg={imgSet.etc.skillFrame}/>
                  )}
                  {cate !== 2 && cate !== 4 && cate !== 11 && (
                    <SkillIcon className="sk_icon" skillIcon={imgSet.eff[skData_.effAnimation]} skillScene={gameData.effect[skData_.effAnimation].imgScene} skillFrame={gameData.effect[skData_.effAnimation].frame} frameImg={imgSet.etc.skillFrame}/>
                  )}
                  <div style={{padding:"0 0 5px 10px",width:"100%", flex:1}} flex-h-center="true">
                    <div className="name">
                      <span className="lv">LV.{skData.lv}</span>{skData_.na[lang]}
                      {skData_.element_type !== 0 && <ActionType className="action-type" actionType={imgSet.element[skData_.element_type]} />}
                    </div>
                    <div className="txt" dangerouslySetInnerHTML={{__html: replaceText}} />
                  </div>
                </div>
                {typeof skData.exp === "number" && (
                  <div flex="true" className="lv_exp">
                    <span className="exp">
                      <span className="gradient_dark" skdata={skData} style={{width:`${skData.exp || 0}%`}}></span>
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </InfoGroup>
      </Wrap>
      <PopupContainer>
        {popupOn && <Popup type={popupType} dataObj={popupInfo} showPopup={setPopupOn} lang={lang} />}
      </PopupContainer>
    </>
  );
}

export default CharacterSkill;
