import { AppContext } from 'App';
import { FlexBox } from 'components/Container';
import { ChPic } from 'components/ImagePic';
import InfoGroup from 'components/InfoGroup';
import Popup from 'components/Popup';
import PopupContainer from 'components/PopupContainer';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';

const Wrap = styled(FlexBox)`
  .relationMember{margin:10px 0 0 0;justify-content:center;}
  .name{width:80px;line-height:1.3;font-size:0.75rem;color:#fff !important;font-weight:600;color:#fff;word-break:keep-all !important;text-align:center !important;}
  .txt{margin:auto 0;padding:0 10px;flex:1;line-height:1.3;font-size:0.75rem;word-break:keep-all;}
  .rt{position:relative;margin:0 0 5px;padding:5px 10px;font-size:0.75rem;border:3px double rgba(255,255,255,.5);border-radius:5px;background:rgba(0,0,0,.5);overflow:hidden;}
  .relation_ch{position:relative;width:30px;padding-top:30px;box-sizing:border-box;z-index:1;filter:grayscale(100%) brightness(.4);}
  .relation_ch.on{filter:grayscale(0);box-shadow:0 0 10px #fff;border-radius:20px;}
  .relation_ch:last-of-type{margin:0;}
  .rtAll{position:absolute;left:-17px;bottom:-10px;width:60px;height:60px;color: #f00;border:4px solid #f00;border-radius:50px;text-align:center;line-height:52px;font-size:1.375rem;font-weight: 600;overflow:hidden;box-sizing:border-box;transform:rotate(-35deg);}
`;
const CardChRing = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
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
  position:absolute;
	left: -15%;
	top: -15%;
	width: 130%;
	height: 130%;
`;

const CharacterRelation = ({
  saveData,
  slotIdx,
  lang,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
  const saveCh = React.useMemo(() => saveData.ch[slotIdx], [saveData, slotIdx]);
  const chData = React.useMemo(() => gameData.ch[saveCh.idx], [gameData, saveCh]);
  const [popupOn, setPopupOn] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [popupInfo, setPopupInfo] = useState({});
  const chRelation = React.useMemo(() => chData.relation, [chData]);
  const relationAll = React.useMemo(() => {
    return chRelation.map((rtIdx, idx) => {
      return Array.from({length: gameData.relation[rtIdx].member.length}, () => false);
    });
  }, [chRelation, gameData]);
  
  return (
    <>
      <Wrap className="relation">
        <InfoGroup title={gameData.msg.menu.relation[lang]} guideClick={() => {
          setPopupType('guide');
          setPopupOn(true);
          setPopupInfo({
            data:gameData.guide["characterRelation"],
            lang:lang,
          });
        }}>
          {chRelation && chRelation.map((rtData, idx) => {
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
                            <CardChRing ringDisplay={imgSet.ringImg[chData.element]} ringDisplay1={imgSet.sringImg[chData.element]}>
                              <ChPic isThumb={true} type="cardBack" pic="card" idx={0} />
                            </CardChRing>
                            <CardCh>
                              <ChPic isThumb={true} pic="ch" idx={chData.display} />
                            </CardCh>
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
        </InfoGroup>
      </Wrap>
      <PopupContainer>
        {popupOn && <Popup type={popupType} dataObj={popupInfo} showPopup={setPopupOn} imgSet={imgSet} lang={lang} />}
      </PopupContainer>
    </>
  );
}

export default CharacterRelation;
