import { AppContext } from 'App';
import imgCardFrame from 'images/card/card_frame.png';
import imgCardLv from 'images/card/card_lv.png';
import iconCardName from 'images/card/card_name.png';
import imgRingBack from 'images/ring/back.png';
import iconStar1 from 'images/star/star1.png';
import iconStar2 from 'images/star/star2.png';
import iconStar3 from 'images/star/star3.png';
import iconStar4 from 'images/star/star4.png';
import iconStar5 from 'images/star/star5.png';
import iconStar6 from 'images/star/star6.png';
import iconStar7 from 'images/star/star7.png';
import React, { useContext } from 'react';
import styled from 'styled-components';

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
  pointer-events:none;
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
  .job_actiontype{
    position:absolute;top:15px;left:15px;width:15%;
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
  top:0;width:100%;height:100%;background-repeat:no-repeat;background-image:url(${({chDisplay}) => chDisplay});background-size:100%;background-position:center center;z-index:4;
`;

const ListChRing = styled.li`
  top:0;width:100%;height:100%;background-repeat:no-repeat;background:url(${({ringBack}) => ringBack});background-position:center center;background-size:85%;z-index:3;
`;
const ListChJob = styled.li`
  position:relative;width:100%;padding-top:100%;background-repeat:no-repeat;background:url(${({jobIcon}) => jobIcon});background-position:center center;background-size:100%;z-index:5;
`;
const ListChActionType = styled.li`
  position:relative;width:100%;padding-top:100%;background-repeat:no-repeat;background:url(${({actionType}) => actionType});background-position:center center;background-size:100%;z-index:5;
`;
const ListChElement = styled.li`
  top:0;width:100%;height:100%;background-repeat:no-repeat;background-image:url(${({ringDisplay}) => ringDisplay});background-position:center center;background-size:100%;z-index:1;
`;
const ListChElement1 = styled.li`
  top:0;width:100%;height:100%;background-repeat:no-repeat;background-image:url(${({chLv, ringDisplay}) => {
    if ( chLv > 29) {
      return ringDisplay;
    }
  }});background-position:center center;background-size:cover;z-index:2;
`;
const ListChElement2 = styled.li`
  top:13%;width:100%;padding-top:100%;background-repeat:no-repeat;background-image:url(${({chLv, ringDisplay}) => {
    if ( chLv > 49) {
      return ringDisplay;
    }
  }});background-position:center center;background-size:100%;z-index:2;transform:scale(1.35,1.35);animation:rotate_ring 50s linear infinite;
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
  top:0;width:100%;height:100%;background:url(${({cardFrame}) => cardFrame});background-repeat:no-repeat;background-position:center center;background-size:100% 100%;z-index:5;
`;

const ChracterDetail = ({
  saveData,
  slotIdx,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
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
        <ListCh chDisplay={imgSet.chImg[`ch${chData.display}`]} className="ch transition" />
        <ListChRing ringBack={imgRingBack} className="ring" />
        <div className="job_actiontype">
          <ListChJob jobIcon={imgSet.job[saveCh.job]} className="job"/>
          {saveCh.newActionType.map((data, idx) => {
            return (
              <ListChActionType key={'action'+idx} actionType={imgSet.element[data + 1]} className="action_type"/>
            )
          })}
        </div>
        <ListChElement ringDisplay={imgSet.ringImg[chData.element]} className="element" />
        <ListChElement1 chLv={saveCh.lv} ringDisplay={imgSet.sringImg[chData.element]} className="element_1" />
        <ListChElement2 chLv={saveCh.lv} ringDisplay={imgSet.ssringImg[chData.element]} className="element_2" />
        <ListChStar starIcon={iconStar} className="star">
          {saveCh.grade && makeStar(saveCh.grade)}
        </ListChStar>
        <ListChFrame cardFrame={imgCardFrame} className="frame" />
      </ChCard>
    </>
  );
}

export default ChracterDetail;
