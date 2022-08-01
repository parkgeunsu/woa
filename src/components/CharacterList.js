import React, { useLayoutEffect, useRef, useContext } from 'react';
import { AppContext } from 'App';
import styled from 'styled-components';

const ChList = styled.div`
  ul li{background: url(${({ cardFrame }) => cardFrame});background-size:100% 100%;}
  ul li .list_ring{background-image:url(${({ ringBack }) => ringBack});}
`;
const ChListUl = styled.ul`
  width: ${({chSize, chLength}) => Math.ceil(chSize) * chLength}px !important;
`;
const ListCh = styled.span`
  background-image:url(${({chDisplay}) => chDisplay});background-size:100%;
`;
const ListRing = styled.span`
  background-size:100%;
  background-image:url(${({ringBack}) => ringBack});
`;
const ChracterHeader = ({
  saveData,
  slotIdx,
  changeChSlot,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
  const chLength = saveData.ch.length;
  const scrolluseRef = useRef(null);
  const cardWidth = window.innerHeight * 0.05;

  useLayoutEffect(() => {
    if (scrolluseRef.current) { //카드리스트 스크롤 잡기
      const listHalfSize = scrolluseRef.current.getBoundingClientRect().width * .5;
      const cardHalfNum = Math.floor(listHalfSize / cardWidth);
      scrolluseRef.current.scrollTo(cardWidth * (slotIdx - cardHalfNum), 0);
    }
  }, [slotIdx, cardWidth]);
  return (
    <>
      <ChList ref={scrolluseRef} ringBack={imgSet.etc.imgRingBack} cardFrame={imgSet.etc.imgCardFrame} className="ch_list scroll-x">
        <ChListUl chSize={cardWidth} chLength={chLength}>
          { saveData.ch && saveData.ch.map((data, idx) => {
            const saveCh = saveData.ch[idx];
            const chData = gameData.ch[saveCh.idx];
            return (
              <li className={`g${saveCh.grade} ${slotIdx === idx ? 'on' : ''}`} key={idx} onClick={() => {changeChSlot(idx)}}>
                <ListRing className="list_ring" ringBack={imgSet.etc.imgRingBack} />
                <ListCh className="list_ch" chDisplay={imgSet.chImg[`ch${chData.display}`]} />
              </li>
            )
          })}
        </ChListUl>
      </ChList>
    </>
  );
}

export default ChracterHeader;
