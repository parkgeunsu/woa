import React, { useState } from 'react';
import styled from 'styled-components';
import { util } from 'components/Libs';
import { chImg, chStyleImg, ringImg, sringImg, ssringImg } from 'components/ImgSet';
import iconCardName from 'images/card/card_name.png';
import imgRingBack from 'images/ring/back.png';
import imgCardFrame from 'images/card/card_frame.png';
import imgCardLv from 'images/card/card_lv.png';
import iconStar1 from 'images/star/star1.png';
import iconStar2 from 'images/star/star2.png';
import iconStar3 from 'images/star/star3.png';
import iconStar4 from 'images/star/star4.png';
import iconStar5 from 'images/star/star5.png';
import iconStar6 from 'images/star/star6.png';
import iconStar7 from 'images/star/star7.png';

const Img = styled.img.attrs(
  ({imgurl}) => ({
    src: imgurl 
  })
)``;
const ChCard = styled.ul`
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  backface-visibility:hidden;
  z-index:2;
  box-shadow:0 0 1px #ff0,0 0 2px #fff,0 0 10px #000;box-shadow:0 0 1px #ff0,0 0 2px #fff,0 0 10px #000;
  border-radius:20px;
  overflow:hidden;
  transform:rotateY(0deg);
  & > li{
    position:absolute;
    color:#fff;
  }
  &.page {
    position:relative;width:100%;height:85%;padding:0 3% 3% 3%;
  }
`;

// .ch_wrap .page0 .ring{background-position:center center;background-size:320px;}
// .ch_wrap .page0 .name_lv{bottom:40px;left:50%;transform:translate(-50%,0) scale(1);}
// .ch_wrap .page0 .star{left:auto;bottom:110px;transform:scale(1);text-align:center;}

const ListNameLv = styled.li`
  left:50%;bottom:7%;width:85%;transform:translate(-50%,0) scale(1);text-shadow:0 0 1px #fff;text-align:center;z-index:3;font-size:0;
  &:after{content:'';display:block;position:absolute;left:3%;top:-17%;padding-top:30%;width:30%;background:url(${({cardLv}) => cardLv});background-repeat:no-repeat;background-position:center center;background-size:contain;}
  & {
    img{width:100%;}
    .name_{position:absolute;display:inline-block;left:33%;top:17%;width:67%;line-height:1;font-size:14px;text-align:left;z-index:1;box-sizing:border-box;}
    .name{position:absolute;display:inline-block;right:2%;bottom:17%;width:67%;line-height:1;font-size:20px;z-index:1;box-sizing:border-box;letter-spacing:-2px;white-space:nowrap;overflow:hidden;}
    .lv{position:absolute;display:inline-block;left:3%;top:15%;width:30%;line-height:1;font-size:25px;text-align:center;z-index:1;}
  }
`;
const ListCh = styled.li`
  top:0;
  width:100%;
  height:100%;
  background-repeat:no-repeat;
  background-size:85%;
  background-image:url(${({chDisplay}) => chDisplay});
  background-position:center center;
  z-index:4;
  pointer-events:none;
`;

const ListChStyle = styled.li`
  top:0;width:100%;height:100%;background-repeat:no-repeat;background-size:100%;background-position:center center;z-index:5;pointer-events:none;
  background-image:url(${({styleDisplay}) => styleDisplay});
`;
const ListChRing = styled.li`
  top:0;width:100%;height:100%;background:url(${({ringBack}) => ringBack});background-repeat:no-repeat;background-position:center center;background-size:85%;pointer-events:none;z-index:3;
`;
const ListChElement = styled.li`
  top:0;width:100%;height:100%;background-repeat:no-repeat;background-position:center center;background-size:100%;z-index:1;pointer-events:none;
  background-image:url(${({ringDisplay}) => ringDisplay});
`;
const ListChElement1 = styled.li`
  top:0;width:100%;height:100%;background-repeat:no-repeat;background-position:center center;background-size:cover;z-index:2;pointer-events:none;
  background-image:url(${({chLv, ringDisplay}) => {
    if ( chLv > 29) {
      return ringDisplay;
    }
  }});
`;
const ListChElement2 = styled.li`
  top:13%;width:100%;padding-top:100%;background-repeat:no-repeat;background-position:center center;background-size:100%;z-index:2;pointer-events:none;transform:scale(1.35,1.35);animation:rotate_ring 50s linear infinite;
  background-image:url(${({chLv, ringDisplay}) => {
    if ( chLv > 49) {
      return ringDisplay;
    }
  }});
  @keyframes rotate_ring{
    0%{transform:scale(1.35,1.35) rotate(0deg);}
    100%{transform:scale(1.35,1.35) rotate(360deg);}
  }
`;
const ListChStar = styled.li`
  left:0;bottom:22%;width:100%;height:25px;z-index:5;text-align:center;
  & {
    span {
      display:inline-block;width:25px;height:25px;
      &:first-of-type{background:url(${({starIcon}) => starIcon[0]}) no-repeat center center;background-size:100%}
      &:nth-of-type(2){background:url(${({starIcon}) => starIcon[1]}) no-repeat center center;background-size:100%;}
      &:nth-of-type(3){background:url(${({starIcon}) => starIcon[2]}) no-repeat center center;background-size:100%;}
      &:nth-of-type(4){background:url(${({starIcon}) => starIcon[3]}) no-repeat center center;background-size:100%;}
      &:nth-of-type(5){background:url(${({starIcon}) => starIcon[4]}) no-repeat center center;background-size:100%;}
      &:nth-of-type(6){background:url(${({starIcon}) => starIcon[5]}) no-repeat center center;background-size:100%;}
      &:nth-of-type(7){background:url(${({starIcon}) => starIcon[6]}) no-repeat center center;background-size:100%;}
    }
  }
`;
const makeStar = (n) => {//별 처리
  let tag = [];
  for(var i =0; i< n; ++i){
    tag.push(<span key={i}></span>);
  }
  return tag
}
const ListChFrame = styled.li`
  top:0;width:100%;height:100%;background:url(${({cardFrame}) => cardFrame});background-repeat:no-repeat;background-position:center center;background-size:100% 100%;z-index:5;pointer-events:none;
`;

const ChracterDetail = ({
  slotIdx,
}) => {
  const gameData = util.loadData("gamedata");
  const saveData = util.loadData("savedata");
  const iconStar = [iconStar1, iconStar2, iconStar3, iconStar4, iconStar5, iconStar6, iconStar7]
  const saveCh = saveData.ch[slotIdx];
  const chData = gameData.ch[saveCh.idx];
  return (
    <>
      <ChCard className="ch_detail transition">
        <ListNameLv cardLv={imgCardLv} className="name_lv">
          <Img className="img" imgurl={iconCardName} />
          <span className="lv">{saveCh.lv}</span>
          <span className="name_">{chData.na3}</span>
          <span className="name">{`${chData.na1} ${chData.na2}`}</span>
        </ListNameLv>
        <ListCh chDisplay={chImg[chData.display]} className="ch transition" />
        <ListChStyle styleDisplay={chStyleImg[chData.style]} className="ch_style transition" />
        <ListChRing ringBack={imgRingBack} className="ring" />
        <ListChElement ringDisplay={ringImg[chData.element]} className="element" />
        <ListChElement1 chLv={saveCh.lv} ringDisplay={sringImg[chData.element]} className="element_1" />
        <ListChElement2 chLv={saveCh.lv} ringDisplay={ssringImg[chData.element]} className="element_2" />
        <ListChStar starIcon={iconStar} className="star">
          {chData.grade && makeStar(chData.grade)}
        </ListChStar>
        <ListChFrame cardFrame={imgCardFrame} className="frame" />
      </ChCard>
    </>
  );
}

export default ChracterDetail;
