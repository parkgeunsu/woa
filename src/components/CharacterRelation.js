import React, { useLayoutEffect, useState, useContext } from 'react';
import { AppContext } from 'App';
import styled from 'styled-components';
import { util } from 'components/Libs';

import imgRingBack from 'images/ring/back.png';
const Relation = styled.div`
  display:none;
  & {
    .relationMember{margin:10px 0 0 0;justify-content:center;}
    .name{width:80px;line-height:1.3;font-size:12px;color:#fff !important;font-weight:600;color:#fff;word-break:keep-all !important;text-align:center !important;}
    .txt{margin:auto 0;padding:0 10px;flex:1;line-height:1.3;font-size:12px;word-break:keep-all;}
  }
`;
const MemberCh = styled.div`
	position:relative;margin:0 10px 0 0;width:30px;padding-top:30px;box-sizing:border-box;z-index:1;filter:grayscale(100%) brightness(.4);
  &.on{filter:grayscale(0);box-shadow:0 0 10px #fff;border-radius:20px;}
  &:last-of-type{margin:0;}
`;
const CardChRing = styled.span`
	position:absolute;width:100%;height:100%;transform-origin:50% 50%;box-sizing:border-box;background-repeat:no-repeat;backface-visibility:hidden;background-color:transparent;
	border-radius:30%;overflow:hidden;
	${({lv, ringBack, ringDisplay, ringDisplay1}) => {
		if (lv > 29) {
			return `background-image:url(${ringBack}), url(${ringDisplay}), url(${ringDisplay1});background-position:center 40%,center,center;`
		} else {
			return `background-image:url(${ringBack}), url(${ringDisplay});background-position:center 40%,center;`
		}
	}}
	background-size:100%;
`;
const CardCh = styled.span`
	position:absolute;top:-27%;left:-15%;width:130%;height:130%;transform-origin:50% 50%;box-sizing:border-box;background-repeat:no-repeat;backface-visibility:hidden;background-color:transparent;
	background-image:${({chDisplay, styleDisplay}) => {
		return `url(${styleDisplay}), url(${chDisplay})`;
	}};background-position:center 5%, center -70%;
	background-size:90%, 75%;
`;

const CharacterRelation = ({
  saveData,
  slotIdx,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;

  const chRelation = gameData.ch[saveData.ch[slotIdx].idx].relation;
  
//})}
// { gameRelation && gameRelation.map((rtData, idx) => {
//   let hasRelation = false;
//   rtData.member.filter((data, idx_) => {
//     if (data === chIdx) {
//       hasRelation = true;
//       return;
//     }
//   });
  return (
    <>
      <Relation className="relation">
        <dl className="info_group rt_group">
          <dt>RELATION<span>(인연)</span></dt>
          <dd className="scroll-y">
            { chRelation && chRelation.map((rtData, idx) => {
              const relationData = gameData.relation[rtData];
              return (
                <div key={idx} className="rt" flex-h="true">
                  <div className="relationInfo" flex="true">
                    <span className="name">{relationData.na}</span>
                    <span className="txt" dangerouslySetInnerHTML={{__html: relationData.txt}} />
                  </div>
                  <div className="relationMember" flex="true">
                    {relationData.member && relationData.member.map((data, idx_) => {
                      const chData = gameData.ch[data];
                      let hasRelation = false;
                      saveData.ch.filter((saveCh) => {
                        if (saveCh.idx === data) {
                          hasRelation = true;
                          return;
                        }
                      });
                      return (
                        chData && 
                        <MemberCh key={idx_} className={`battle_ch ${hasRelation ? 'on' : ''}`}>
                          <CardChRing style={{top:0,borderRadius:'50%',}} className="ring_back" ringBack={imgRingBack} ringDisplay={imgSet.ringImg[chData.element]} ringDisplay1={imgSet.sringImg[chData.element]} />
                          <CardCh className="ch_style" chDisplay={imgSet.chImg[`ch${chData.display}`]} styleDisplay={imgSet.chStyleImg[`ch_style${chData.style}`]}/>
                        </MemberCh>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </dd>
        </dl>
      </Relation>
    </>
  );
}

export default CharacterRelation;
