import React, { useLayoutEffect, useRef, useContext } from 'react';
import { AppContext } from 'App';
import styled from 'styled-components';
import imgRingBack from 'images/ring/back.png';

const ChList = styled.div`
  position:absolute;bottom:4%;left:20px;right:20px;height:10.2vh;
  &{
    ul{padding:5px;width:100%;height:100%;}
    ul li{display:inline-block;position:relative;width:5vh;height:calc(5vh * 1.3);transform-origin:center bottom;background: url(../images/card/card_frame.png);background-size:100% 100%;font-size:0;transform:translate(0,50%);transition:all .3s;}
    ul li span{}
    ul li .list_ring{background-image:url(../images/ring/back.png);}
    ul li.g1{background-color:#fff;}
    ul li.g2{background-color:#00a90c;}
    ul li.g3{background-color:#0090ff;}
    ul li.g4{background-color:#f4ea19;}
    ul li.g5{background-color:#a800ff;}
    ul li.g6{background-color:#ff8000;}
    ul li.g7{background-color:#ff2a00;}
    ul li.on{transform:translate(0,10%);z-index:1;}
    ul li.g1.on{box-shadow:0 0 8px #fff,0 0 3px #fff;}
    ul li.g2.on{box-shadow:0 0 8px #00a90c,0 0 3px #00a90c;}
    ul li.g3.on{box-shadow:0 0 8px #0090ff,0 0 3px #0090ff;}
    ul li.g4.on{box-shadow:0 0 8px #f4ea19,0 0 3px #f4ea19;}
    ul li.g5.on{box-shadow:0 0 8px #a800ff,0 0 3px #a800ff;}
    ul li.g6.on{box-shadow:0 0 8px #ff8000,0 0 3px #ff8000;}
    ul li.g7.on{box-shadow:0 0 8px #ff2a00,0 0 3px #ff2a00;}
  } 
`;
const ChListUl = styled.ul`
  width: ${({chSize, chLength}) => Math.ceil(chSize) * chLength}px !important;
`;
const ListCh = styled.span`
  position:absolute;left:0;right:0;top:0;bottom:0;background-size:100%;background-repeat:no-repeat;background-position:center 0;
  background-image:url(${({chDisplay}) => chDisplay});
  z-index:1;
`;
const ListChStyle = styled.span`
  position:absolute;left:0;right:0;top:0;bottom:0;background-size:100%;background-repeat:no-repeat;background-position:center 0;
  background-image:url(${({styleDisplay}) => styleDisplay});
  z-index:2;
`;
const ListRing = styled.span`
  position:absolute;left:0;right:0;top:0;bottom:0;background-size:100%;background-repeat:no-repeat;background-position:center 0;
  background-image:url(${({imgRingBack}) => imgRingBack});
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
      <ChList ref={scrolluseRef} className="ch_list scroll-x">
        <ChListUl chSize={cardWidth} chLength={chLength}>
          { saveData.ch && saveData.ch.map((data, idx) => {
            const saveCh = saveData.ch[idx];
            const chData = gameData.ch[saveCh.idx];
            console.log(chData);
            return (
              <li className={`g${chData.grade} ${slotIdx === idx ? 'on' : ''}`} key={idx} onClick={() => {changeChSlot(idx)}}>
                <ListRing className="list_ring" imgRingBack={imgRingBack} />
                <ListCh className="list_ch" chDisplay={imgSet.chImg[chData.display]} />
                <ListChStyle className="list_chstyle" styleDisplay={imgSet.chStyleImg[chData.style]} />
              </li>
            )
          })}e
        </ChListUl>
      </ChList>
    </>
  );
}

export default ChracterHeader;
