import React, { useState, useContext } from 'react';
import { AppContext } from 'App';
import styled from 'styled-components';

const SkillElement = styled.span`
  &.el0{background-image:url(${({ elementIcon }) => elementIcon[0]});background-size:100%;}
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
  &.el12{background-image:url(${({ elementIcon }) => elementIcon[12]});background-size:100%;}
`;

const CharacterAnimalSkill = ({
  saveData,
  slotIdx,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
  const saveSkill = saveData.ch[slotIdx].sk;
  const elementIcon = [imgSet.element[0],imgSet.element[1],imgSet.element[2],imgSet.element[3],imgSet.element[4],imgSet.element[5],imgSet.element[6],imgSet.element[7],imgSet.element[8],imgSet.element[9],imgSet.element[10],imgSet.element[11],imgSet.element[12]];
  return (
    <>
      <div className="skillAnimal">
        <dl className="info_group">
          <dt>ANIMAL SKILL<span>(동물 스킬)</span></dt>
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
                <div key={idx} className={`sk cate${cate}`} flex-h="true">
                  <div className="sk_info" flex="true">
                    <SkillElement className={`sk_element el${skData_.element_type}`} elementIcon={elementIcon}/>
                    <div style={{padding:"0 0 5px 10px",width:"100%"}} flex-h-center="true">
                      <div className="name">{skData_.na}</div>
                      <div className="txt" dangerouslySetInnerHTML={{__html: replaceText}} />
                    </div>
                  </div>
                  <div flex="true" className="lv_exp">
                    <span className="lv">LV.{skData.lv}</span>
                    <span className="exp">
                      <span className="gradient_dark" skdata={skData} style={{width:`${skData.exp || 0}%`}}></span>
                    </span>
                  </div>
                </div>
              )
            })}
          </dd>
        </dl>
      </div>
    </>
  );
}

export default CharacterAnimalSkill;
