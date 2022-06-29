import React, { useContext } from 'react';
import { AppContext } from 'App';
import styled from 'styled-components';

const CardChRing = styled.span`
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
  let relationAll = [];
  chRelation.forEach((rtIdx, idx) => {
    relationAll[idx] = Array.from({length: gameData.relation[rtIdx].member.length}, () => false);
  });
  return (
    <>
      <div className="relation">
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
                  <div className={`relationMember`} flex="true">
                    {relationData.member && relationData.member.map((data, idx_) => {
                      const chData = gameData.ch[data];
                      let hasRelation = false;
                      saveData.ch.filter((saveCh) => {
                        if (saveCh.idx === data) {
                          hasRelation = true;
                          relationAll[idx][idx_] = true;
                          return;
                        }
                      });
                      let rtAll = true;
                      relationAll[idx].forEach((rtData) => {
                        if (rtData === false) {
                          rtAll = false;
                        }
                      });
                      return (
                        chData && (
                          <div key={idx_} style={{
                            margin: "0 10px 0 0",
                          }}>
                            <div className={`relation_ch ${hasRelation ? 'on' : ''} ${rtAll}`}>
                              <CardChRing style={{top:0,borderRadius:'50%',}} className="ring_back" ringBack={imgSet.etc.imgRingBack} ringDisplay={imgSet.ringImg[chData.element]} ringDisplay1={imgSet.sringImg[chData.element]} />
                              <CardCh className="ch_style" chDisplay={imgSet.chImg[`ch${chData.display}`]} styleDisplay={imgSet.chStyleImg[`ch_style${chData.style}`]}/>
                            </div>
                            {rtAll && <div className="rtAll">ALL</div>}
                          </div>
                        )
                      )
                    })}
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

export default CharacterRelation;
