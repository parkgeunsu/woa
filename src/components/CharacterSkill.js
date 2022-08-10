import React, { useState, useContext, useRef } from 'react';
import { AppContext } from 'App';
import styled from 'styled-components';
import GuideQuestion from 'components/GuideQuestion';
import PopupContainer from 'components/PopupContainer';
import Popup from 'components/Popup';

const SkillElement = styled.span`
  background:url(${({ frameImg }) => frameImg}), radial-gradient(closest-side at 40% 40%, #ddd, #333);background-size:100%;
  ${'' /* &.el1{background-image:url(${({ elementIcon }) => elementIcon[1]});background-size:100%;}
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
  &:before{background:url(${({skillIcon}) => skillIcon});background-size:500% auto;background-position:${({skillScene, skillFrame}) => {
    return `${skillScene%5 * 25}% ${Math.floor(skillScene/5) * 100/(Math.floor((skillFrame - 1) / 5))}%`
  }}};
  &:after{background:url(${({skillIcon}) => skillIcon});background-size:500% auto;background-position:${({skillScene, skillFrame}) => {
    return `${skillScene%5 * 25}% ${Math.floor(skillScene/5) * 100/(Math.floor((skillFrame - 1) / 5))}%`
  }}};
`;

const CharacterSkill = ({
  saveData,
  slotIdx,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
	const setting = useContext(AppContext).setting,
    lang = setting.lang;
  const [popupOn, setPopupOn] = useState(false);
  const popupType = useRef('');
  const [popupInfo, setPopupInfo] = useState({});
  const saveSkill = saveData.ch[slotIdx].sk;
  const animalSkill = saveData.ch[slotIdx].animalSkill;
  const elementIcon = [imgSet.element[0],imgSet.element[1],imgSet.element[2],imgSet.element[3],imgSet.element[4],imgSet.element[5],imgSet.element[6],imgSet.element[7],imgSet.element[8],imgSet.element[9],imgSet.element[10],imgSet.element[11],imgSet.element[12]];
  return (
    <>
      <div className="skill scroll-y">
        <dl className="info_group">
          <dt>SKILL<span>(스킬)</span>
            <GuideQuestion size={20} pos={["right","top"]} colorSet={"black"} onclick={() => {
              popupType.current = 'guide';
              setPopupOn(true);
              setPopupInfo({
                data:gameData.guide["characterSkill"],
                lang:lang,
              });
            }} />
          </dt>
          <dd className="scroll-y" >
            { saveSkill && saveSkill.map((skData, idx) => {
              const skData_ = gameData.skill[skData.idx];
              const cate = skData_.cate[0];
              const replaceArr = skData_.txt.match(/[$][(]\d[)]*/g);
              let replaceText = skData_.txt;
              replaceArr.forEach((data, idx) => {
                replaceText = replaceText.replace(data, skData_.eff[idx].num[skData.lv - 1]);
              });
              return (
                <div key={idx} className={`sk cate${cate}`} flex-h="true">
                  <div className="sk_info" flex="true">
                    <SkillElement className={`sk_element el${skData_.element_type}`} skillIcon={imgSet.eff[skData_.effAnimation]} skillScene={gameData.effect[skData_.effAnimation].imgScene} skillFrame={gameData.effect[skData_.effAnimation].frame} frameImg={imgSet.etc.skillFrame}/>
                    <div style={{padding:"0 0 5px 10px",width:"100%", flex:1}} flex-h-center="true">
                      <div className="name">
                        <span className="lv">LV.{skData.lv}</span>{skData_.na}
                      </div>
                      <div className="txt" dangerouslySetInnerHTML={{__html: replaceText}} />
                    </div>
                  </div>
                  <div flex="true" className="lv_exp">
                    <span className="exp">
                      <span className="gradient_dark" skdata={skData} style={{width:`${skData.exp || 0}%`}}></span>
                    </span>
                  </div>
                </div>
              )
            })}
            {animalSkill && animalSkill.map((skCol, idx) => {
              return skCol.map((skData, idx) => {
                if (Object.keys(skData).length > 0 && skData.lv > 0) {
                  const skData_ = gameData.animalSkill[skData.idx];
                  const cate = skData_.cate[0];
                  const replaceArr = skData_.txt.match(/[$][(]\d[)]*/g);
                  let replaceText = skData_.txt;
                  replaceArr.forEach((data, idx) => {
                    replaceText = replaceText.replace(data, skData_.eff[idx].num[skData.lv - 1]);
                  });
                  return (
                    <div key={idx} className={`sk cate${cate}`} flex-h="true">
                      <div className="sk_info" flex="true">
                        <SkillElement className={`sk_element el${skData_.element_type}`} skillIcon={imgSet.eff[skData_.effAnimation]} skillScene={gameData.effect[skData_.effAnimation].imgScene} skillFrame={gameData.effect[skData_.effAnimation].frame} frameImg={imgSet.etc.skillFrame}/>
                        <div style={{padding:"0 0 5px 10px",width:"100%", flex:1}} flex-h-center="true">
                          <div className="name">
                            <span className="lv">LV.{skData.lv}</span>{skData_.na}
                          </div>
                          <div className="txt" dangerouslySetInnerHTML={{__html: replaceText}} />
                        </div>
                      </div>
                    </div>
                  );
                }
              });
            })}
          </dd>
        </dl>
      </div>
      <PopupContainer>
        {popupOn && <Popup type={popupType.current} dataObj={popupInfo} showPopup={setPopupOn} imgSet={imgSet}/>}
      </PopupContainer>
    </>
  );
}

export default CharacterSkill;
