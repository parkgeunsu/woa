import React, { useLayoutEffect, useRef, useContext } from 'react';
import { AppContext } from 'App';
import styled from 'styled-components';

const ChListUl = styled.ul`
  width: ${({chSize, chLength}) => Math.ceil(chSize) * chLength}px !important;
`;
const ListCh = styled.span`
  background-image:url(${({chDisplay}) => chDisplay});background-size:100%;
`;
const ListJob = styled.span`
  background-image:url(${({jobIcon}) => jobIcon});background-size:100%;
`;
const ListActionType = styled.span`
  background-image:url(${({actionType}) => actionType});background-size:100%;
`;
const ListRing = styled.span`
  background-image:url(${({ringBack}) => ringBack});
  background-size:85%;
`;
const ListElement = styled.span`
  background-image:url(${({ringDisplay}) => ringDisplay});
  background-size:100%;
`;
const ListFrame = styled.span`
  background: url(${({ cardFrame }) => cardFrame});background-size:100% 100%;
`;
const ChracterHeader = ({
  saveData,
  slotIdx,
  changeChSlot,
  cardShow,
  type,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
  const chLength = saveData.ch.length;
  const scrolluseRef = useRef(null);
  const cardWidth = window.innerWidth * 0.1;

  useLayoutEffect(() => {
    if (scrolluseRef.current) { //카드리스트 스크롤 잡기
      const listHalfSize = scrolluseRef.current.getBoundingClientRect().width * .5;
      const cardHalfNum = Math.floor(listHalfSize / cardWidth);
      scrolluseRef.current.scrollTo(cardWidth * (slotIdx - cardHalfNum), 0);
    }
  }, [slotIdx, cardWidth]);
  return (
    <>
      {type === 'paging' && (
        <div ref={scrolluseRef} className={`ch_list scroll-x ${type}`}>
          <ChListUl chSize={cardWidth} chLength={chLength} type={type}>
            { saveData.ch && saveData.ch.map((data, idx) => {
              const saveCh = saveData.ch[idx];
              const chData = gameData.ch[saveCh.idx];
              return (
                <li className={`g${saveCh.grade} ${slotIdx === idx ? 'on' : ''}`} key={idx} onClick={() => {
                  changeChSlot(idx);
                }}>
                  <ListRing className="list_ring" ringBack={imgSet.etc.imgRingBack} />
                  <ListCh className="list_ch" chDisplay={imgSet.chImg[`ch${chData.display}`]} />
                  <div className="list_job_actiontype">
                    <ListJob jobIcon={imgSet.job[saveCh.job]} className="list_job"/>
                    {saveCh.newActionType.map((data, idx) => {
                      return (
                        <ListActionType key={'action'+idx} actionType={imgSet.element[data + 1]} className="list_action_type"/>
                      )
                    })}
                  </div>
                  <ListFrame className="list_frame" cardFrame={imgSet.etc.imgCardFrame} />
                </li>
              )
            })}
          </ChListUl>
        </div>
      )}
      {type === 'list' && (
        <div ref={scrolluseRef} className={`ch_list scroll-y ${type}`}>
          <ul>
            { saveData.ch && saveData.ch.map((data, idx) => {
              const saveCh = saveData.ch[idx];
              const chData = gameData.ch[saveCh.idx];
              return (
                <li className={`g${saveCh.grade}`} key={idx} onClick={() => {
                  changeChSlot(idx);
                  cardShow();
                }}>
                  <ListRing className="list_ring" ringBack={imgSet.etc.imgRingBack} />
                  <ListElement className="list_element" ringDisplay={imgSet.ringImg[chData.element]} />
                  <ListCh className="list_ch" chDisplay={imgSet.chImg[`ch${chData.display}`]} />
                  <div className="list_job_actiontype">
                    <ListJob jobIcon={imgSet.job[saveCh.job]} className="list_job"/>
                    {saveCh.newActionType.map((data, idx) => {
                      return (
                        <ListActionType key={'action'+idx} actionType={imgSet.element[data + 1]} className="list_action_type"/>
                      )
                    })}
                  </div>
                  <ListFrame className="list_frame" cardFrame={imgSet.etc.imgCardFrame} />
                  <div className="list_actionPoint">{`${saveCh.actionPoint} / ${saveCh.actionMax}`}</div>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </>
  );
}

export default ChracterHeader;
