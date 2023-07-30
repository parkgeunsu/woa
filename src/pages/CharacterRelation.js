import { AppContext } from 'App';
import GuideQuestion from 'components/GuideQuestion';
import Popup from 'components/Popup';
import PopupContainer from 'components/PopupContainer';
import { useContext, useRef, useState } from 'react';
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
	background-image:${({chDisplay}) => {
		return `url(${chDisplay})`;
	}};background-position:center -70%;
	background-size:75%;
`;

const CharacterRelation = ({
  saveData,
  slotIdx,
  lang,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
  const [popupOn, setPopupOn] = useState(false);
  const popupType = useRef('');
  const [popupInfo, setPopupInfo] = useState({});
  const chRelation = gameData.ch[saveData.ch[slotIdx].idx].relation;
  let relationAll = [];
  chRelation.forEach((rtIdx, idx) => {
    relationAll[idx] = Array.from({length: gameData.relation[rtIdx].member.length}, () => false);
  });
  return (
    <>
      <div className="relation">
        <dl className="info_group rt_group">
          <dt>RELATION<span>({gameData.msg.menu.relation[lang]})</span><GuideQuestion size={20} pos={["right","top"]} colorSet={"black"} onclick={() => {
              popupType.current = 'guide';
              setPopupOn(true);
              setPopupInfo({
                data:gameData.guide["characterRelation"],
                lang:lang,
              });
            }} />
          </dt>
          <dd className="scroll-y">
            { chRelation && chRelation.map((rtData, idx) => {
              const relationData = gameData.relation[rtData];
              return (
                <div key={idx} className="rt" flex-h="true">
                  <div className="relationInfo" flex="true">
                    <span className="name">{relationData.na[lang]}</span>
                    <span className="txt" dangerouslySetInnerHTML={{__html: relationData.txt[lang]}} />
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
                              <CardCh className="ch_style" chDisplay={imgSet.chImg[`ch${chData.display}`]} />
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
      <PopupContainer>
        {popupOn && <Popup type={popupType.current} dataObj={popupInfo} showPopup={setPopupOn} imgSet={imgSet} lang={lang} />}
      </PopupContainer>
    </>
  );
}

export default CharacterRelation;
