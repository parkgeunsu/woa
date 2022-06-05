import React, { useState, useContext } from 'react';
import { AppContext } from 'App';
import styled from 'styled-components';
import { util } from 'components/Libs';

const Skill = styled.div`
  display:none;
`;

const SkillDetail = styled.div`
  position:relative;margin:0 10px 5px;font-size:12px;border:3px double rgba(255,255,255,.5);border-radius:5px;
  &.cate1:after{content:'';position:absolute;left:0;top:0;border-left:10px solid var(--color-blue);border-top:10px solid var(--color-blue);border-right:10px solid transparent;border-bottom:10px solid transparent;}/*passive*/
  &.cate3:after{content:'';position:absolute;left:0;top:0;border-left:10px solid var(--color-red);border-top:10px solid var(--color-red);border-right:10px solid transparent;border-bottom:10px solid transparent;}/*active*/
  &.cate4:after{content:'';position:absolute;left:0;top:0;border-left:10px solid var(--color-point6);border-top:10px solid var(--color-point6);border-right:10px solid transparent;border-bottom:10px solid transparent;}/*active, passive*/
  &.cate5:after{content:'';position:absolute;left:0;top:0;border-left:10px solid var(--color-point1);border-top:10px solid var(--color-point1);border-right:10px solid transparent;border-bottom:10px solid transparent;}/*buff*/
  &.cate6:after{content:'';position:absolute;left:0;top:0;border-left:10px solid var(--color-green);border-top:10px solid var(--color-green);border-right:10px solid transparent;border-bottom:10px solid transparent;}/*passive, buff*/
  &.cate8:after{content:'';position:absolute;left:0;top:0;border-left:10px solid var(--color-point2);border-top:10px solid var(--color-point2);border-right:10px solid transparent;border-bottom:10px solid transparent;}/*active, buff*/
  &.cate9:after{content:'';position:absolute;left:0;top:0;border-left:10px solid var(--color-w);border-top:10px solid var(--color-w);border-right:10px solid transparent;border-bottom:10px solid transparent;}/*active, passive, buff*/
  &{
    .name{margin:auto 5px;width:80px;text-align:center;font-size:12px;color:#fff;font-weight:600;}
    .txt{margin:auto 0;flex:1;font-size:12px;}
    .lv_exp{align-items:flex-end;}
    .lv{width:50px;text-align:center;}
    .exp{position:relative;margin:auto 5px;width:100%;height:12px;background:#fff;border-radius:10px;overflow:hidden;}
    .exp span{display:block;position:absolute;left:0;bottom:0;top:0;background-color:var(--color-blue);border-radius:0 10px 10px 0;}
  }
`;
const SkillInfo = styled.div`
  display:flex;
  padding:5px 10px;
`;
const SkillElement = styled.span`
  width:25px;height:25px;background-position:center center;background-repeat:no-repeat;font-size:0;
  &.el0{background-image:url();background-size:100%;}
  &.el1{background-image:url(../images/ico/el1.png);background-size:100%;}
  &.el2{background-image:url(../images/ico/el2.png);background-size:100%;}
  &.el3{background-image:url(../images/ico/el3.png);background-size:100%;}
  &.el4{background-image:url(../images/ico/el4.png);background-size:100%;}
  &.el5{background-image:url(../images/ico/el5.png);background-size:100%;}
  &.el6{background-image:url(../images/ico/el6.png);background-size:100%;}
  &.el7{background-image:url(../images/ico/el7.png);background-size:100%;}
  &.el8{background-image:url(../images/ico/el8.png);background-size:100%;}
  &.el9{background-image:url(../images/ico/el9.png);background-size:100%;}
  &.el10{background-image:url(../images/ico/el10.png);background-size:100%;}
  &.el11{background-image:url(../images/ico/el11.png);background-size:100%;}
  &.el12{background-image:url(../images/ico/el12.png);background-size:100%;}
`;

const CharacterSkill = ({
  saveData,
  slotIdx,
}) => {
  const gameData = useContext(AppContext).gameData;
  const saveSkill = saveData.ch[slotIdx].sk;
  return (
    <>
      <Skill className="skill scroll-y">
        <dl className="info_group sk_group">
          <dt>SKILL<span>(스킬)</span></dt>
          <dd className="scroll-y" >
            { saveSkill && saveSkill.map((skData, idx) => {
              const skData_ = gameData.skill[skData.idx];
              const cate = skData_.cate.reduce((v1,v2)=>v1+v2);
              const replaceArr = skData_.txt.match(/[$][(]\d[)]*/g);
              let replaceText = skData_.txt;
              replaceArr.forEach((data, idx) => {
                replaceText = replaceText.replace(data, skData_.eff[idx].num[skData.lv - 1]);
              });
              return (
                <SkillDetail key={idx} className={`sk cate${cate}`} flex-h="true">
                  <SkillInfo className="sk_info" flex="true">
                    <SkillElement className={`sk_element el${skData_.dmg_type}`} />
                    <span className="name">{skData_.na}</span>
                    <span className="txt" dangerouslySetInnerHTML={{__html: replaceText}} />
                  </SkillInfo>
                  <div flex="true" className="lv_exp">
                    <span className="lv">LV.{skData.lv}</span>
                    <span className="exp">
                      <span className="gradient_dark" skdata={skData} style={{width:`${skData.exp || 0}%`}}></span>
                    </span>
                  </div>
                </SkillDetail>
              )
            })}
          </dd>
        </dl>
      </Skill>
    </>
  );
}

export default CharacterSkill;
