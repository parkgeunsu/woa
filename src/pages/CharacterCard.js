import { AppContext } from 'App';
import { Text } from 'components/Atom';
import { ChPic, IconPic } from 'components/ImagePic';
import React, { useContext } from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  position: relative;
  width: ${({size}) => size}px;
  height: ${({sizeH}) => sizeH}px;
`;
const Img = styled.img.attrs(
  ({imgurl}) => ({
    src: imgurl 
  })
)`
  width: 100%;
`;
const ChCard = styled.div`
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  pointer-events:none;
  ${({size}) => {
    if (size) {
      return `
        backface-visibility:hidden;
        border: 1px solid #000;
        border-radius: ${size / 10}px;
      `
    } else {
      return `
        box-shadow:0 0 1px #ff0,0 0 2px #fff,0 0 10px #000;
      `
    }
  }}
  overflow:hidden;
  &.page {
    position:relative;width:100%;height:85%;padding:0 3% 3% 3%;
  }
`;

const ListNameLv = styled.div`
  position: absolute;
  text-align:center;
  ${({isThumb, backColor, cardLv}) => {
    return isThumb ?
      `
        left: calc(50% - 7px);
        bottom: 5%;
        width: 14px;
        height: 14px;
        z-index: 6;
        font-size: 0.625rem;
        line-height: 1;
        font-weight: 600;
        border-radius: 50%;
        background-color: ${backColor};
      `
        : 
      `
        left: 7.5%;
        bottom: 7%;
        width: 85%;
        text-shadow: 0 0 1px #fff;
        z-index: 3;
        font-size: 0;
        &:after {
          content: '';
          display: block;
          position: absolute;
          left: 3%;
          top: -17%;
          padding-top: 30%;
          width: 30%;
          background: url(${cardLv});
          background-repeat: no-repeat;
          background-position: center center;
          background-size: contain;
        }
        & {
          img{
            width: 100%;
          }
        }
      `
  }};
`;
const Name = styled(Text)`
  position:absolute;
  display:inline-block;
  right:2%;
  bottom:17%;
  width:67%;
  line-height:1;
  z-index:1;
  box-sizing:border-box;
  letter-spacing:-2px;
  white-space:nowrap;
  overflow:hidden;
`;
const SubName = styled(Text)`
  position:absolute;
  display:inline-block;
  left:33%;
  top:17%;
  width:67%;
  line-height:1;
  text-align:left;
  z-index:1;
  box-sizing:border-box;
`;
const Lv = styled(Text)`
  position: absolute;
  display: inline-block;
  left: 3%;
  top: 15%;
  width: 30%;
  line-height: 1;
  text-align: center;
  z-index: 1;
`;
const ListCh = styled(ChPic)`
  position: absolute;
  ${({usedType}) => usedType === 'battle' ? `
    left: -10%;
    top: -15%;
    width: 120%;
    height: 120%;
  ` : `
    top: 0;
  `}
  z-index: 4;
`;
const ListChRing = styled(ChPic)`
  position: absolute;
  ${({usedType}) => usedType === 'battle' ? `
    left: -7.5%;
    top: 21%;
    width: 115%;
    height: 115%;
  ` : `
    top: 0;
  `}
  z-index: 3;
`;
const ListJobAction = styled.div`
  position: absolute;
  top: 5%;
  left: 5%;
  width: 15%;
  & > span {
    display: block;
  }
  pointer-events: none;
`;
const ListJobActionListType = styled.div`
  position: absolute;
  left: 3px;
  top: 3px;
  width: 20%;
  font-size: 0;
  z-index: 5;
`;
const ListChJob = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  z-index: 5;
`;
const ListChJobListType = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  padding-top: 100%;
  z-index: 5;
`;
const ListChActionType = styled.div`
  ${({isThumb}) => {
    return isThumb ?
      `
        position: absolute;
        top: 4px;
        left: 4px;
        width: 20%;
        padding-top: 20%;
      ` : 
      `
        position: relative;
        width: 100%;
        padding-top: 100%;
      `
  }}
  z-index:5;
`;
const ListChActionTypeListType = styled.div`
  display: block;
  position: relative;
  width: 100%;
  padding-top: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  z-index: 5;
`;
const StyledIconPic = styled(IconPic)`
  position: absolute;
  left: 0;
  top: 0;
`;
const ListElement = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 30%;
  overflow: hidden;
`;
const ListChElement = styled(ChPic)`
  position: absolute;
  top: 0;
  z-index:1;
`;
const ListChElement1 = styled(ChPic)`
  position: absolute;
  top: 0;
  z-index: 2;
`;
const ListChElement2 = styled(ChPic)`
  position: absolute;
  top: ${({isThumb}) => isThumb ? 0 : 13}%;
  height: 0 !important;
  padding-top: 100%;
  z-index: 2;
  transform: scale(1.35);
  animation: rotate_ring linear ${({gameSpd}) => 22.5 / gameSpd}s infinite;
  ${'' /* background-position:${({isThumb}) => isThumb ? 'center 35%' : 'center center'}; */}
`;
const ListChFrame = styled(ChPic)`
  position: absolute;
  top: 0;
  z-index: 5;
`;
const ListActionPoint = styled.div`
  position: absolute;
  left: 50%;
  bottom: 5px;
  transform: translate(-50%, 0);
  white-space: nowrap;
  text-shadow: 1px 1px 1px #000;
  font-size: 1rem;
  z-index: 6;
`;
const ListChStar = styled.div`
  position: absolute;
  left: 0;
  bottom: ${({usedType}) => usedType === 'gameMain' ? '15': '22'}%;
  width: 100%;
  height: 10%;
  z-index: 5;
  text-align: center;
`;
const Star = styled(IconPic)`
  width: 13% !important;
  height: 0 !important;
  padding-top: 13% !important;
`;
const ChracterCard = ({
  size,
  equalSize,
  saveData,
  slotIdx,
  saveCharacter,
  usedType,
  noInfo,
  gameSpd,
  ...rest
}) => {
  const context = useContext(AppContext);
  // const lang = React.useMemo(() => {
  //   return context.setting.lang;
  // }, [context]);
  const imgSet = React.useMemo(() => {
    return context.images;
  }, [context]);
  const gameData = React.useMemo(() => {
    return context.gameData;
  }, [context]);
  // const sData = React.useMemo(() => Object.keys(saveData).length === 0 ? util.loadData('saveData') : saveData, [saveData]);
  const saveCh = React.useMemo(() => {
    return saveCharacter
      ? saveCharacter 
      : saveData && Object.keys(saveData).length > 0
        ? saveData.ch[slotIdx]
        : '';
  }, [saveData, slotIdx, saveCharacter]);
  const chData = React.useMemo(() => {
    return saveData ? gameData.ch[saveCh?.idx] : '';
  }, [saveData, gameData, saveCh]);
  const sizeH = React.useMemo(() => equalSize ? size : size * 1.48, [equalSize, size]);
  if (!saveData) { // 새로운 게임
    return (
      <CardContainer size={size} sizeH={sizeH}>
        <ChCard size={size} className="ch_detail">
          <ListChFrame type="cardBack" pic="card" idx={2} />
        </ChCard>
      </CardContainer>
    )
  } else {
    if (usedType === 'battle') { //battle 말판
      return (
        <>
          <ListCh className="card_ch" usedType={usedType} isThumb={true} pic="ch_s" idx={chData?.display} />
          <ListChRing className="card_back" usedType={usedType} type="cardBack" pic="card_s" idx={0} />
          <ListElement className="card_element">
            <ListChElement type="elementBack" isThumb={true} pic="card_s" idx={chData?.element-6} />
            {saveCh?.lv > 29 && <ListChElement1 isThumb={true} type="elementBack2" pic="card_s" idx={chData?.element-6} />}
          </ListElement>
          {saveCh?.lv > 49 && <ListChElement2 className="card_ring" style={{
            left: '-10%',
            width: '120%',
            height: '120%',
          }} isThumb={true} wNum={5} hNum={5} pic="cardRing_s" idx={chData?.element-6} gameSpd={gameSpd} />}
        </>
      )
    }
    if (usedType === 'conversation') { //battle 시나리오
      return (
        <>
          <ListChRing isThumb={true} type="cardBack" pic="card_s" idx={0} />
          <ListCh isThumb={true} pic="ch_s" idx={chData?.display} />
        </>
      )
    }
    if (usedType === 'timeline') { //battle 타임라인
      return (
        <>
          <ListCh isThumb={true} pic="ch_s" idx={chData?.display} />
          <ListChRing style={{
            borderRadius: '50%',
          }} isThumb={true} type="cardBack" pic="card_s" idx={0} />
          <ListChElement type="elementBack" isThumb={true} pic="card_s" idx={chData?.element-6} />
          {saveCh?.lv > 29 && <ListChElement1 isThumb={true} type="elementBack2" pic="card_s" idx={chData?.element-6} />}
        </>
      )
    }
    if (usedType === 'list') { //list 사용
      return (
        <>
          <ListCh pic="ch_s" idx={chData.display} />
          <ListChRing type="cardBack" pic="card_s" idx={0} />
          <ListJobActionListType>
            <ListChJobListType>
              <IconPic type="job" isAbsolute={true} pic="icon100" idx={saveCh.job} />
            </ListChJobListType>
            {saveCh.newActionType.map((data, idx) => {
              return (
                <ListChActionTypeListType key={'action'+idx}>
                  <StyledIconPic type="element" pic="icon100" idx={data + 1} />
                </ListChActionTypeListType>
              )
            })}
          </ListJobActionListType>
          <ListChElement type="elementBack" pic="card_s" idx={chData.element-6} />
          <ListChFrame type="cardBack" pic="card_s" idx={1} />
          <ListActionPoint>{`${saveCh.actionPoint} / ${saveCh.actionMax}`}</ListActionPoint>
        </>
      )
    }
    if (usedType === 'paging') { //paging 사용
      return (
        <>
          <ListCh pic="ch" idx={chData.display} />
          <ListChRing type="cardBack" pic="card" idx={0} />
          <ListJobActionListType>
            <ListChJobListType>
              <IconPic type="job" isAbsolute={true} pic="icon100" idx={saveCh.job} />
            </ListChJobListType>
            {saveCh.newActionType.map((data, idx) => {
              return (
                <ListChActionTypeListType key={'action'+idx}>
                  <StyledIconPic type="element" pic="icon100" idx={data + 1} />
                </ListChActionTypeListType>
              )
            })}
          </ListJobActionListType>
          <ListChFrame type="cardBack" pic="card" idx={1} />
        </>
      )
    }
    if (usedType === 'thumb') { //thumb 사용
      return (
        <>
          {noInfo ? (
            <>
              <ListCh isThumb={true} pic="ch_s" idx={chData?.display} />
              <ListChRing isThumb={true} type="cardBack" pic="card_s" idx={0} />
              <ListChElement type="elementBack" isThumb={true} pic="card_s" idx={chData?.element-6} />
              <ListChFrame type="cardBack" pic="card_s" idx={1} />
            </>
          ) : (
            <>
              <ListNameLv isThumb={true} cardLv={imgSet.etc.imgCardLv} backColor={gameData.chGradeColor[saveCh?.grade]}>{saveCh?.lv}</ListNameLv>
              <ListCh isThumb={true} pic="ch_s" idx={chData?.display} />
              <ListChRing isThumb={true} type="cardBack" pic="card_s" idx={0} />
              <ListChElement type="elementBack" isThumb={true} pic="card_s" idx={chData?.element-6} />
              {saveCh?.lv > 29 && <ListChElement1 isThumb={true} type="elementBack2" pic="card_s" idx={chData?.element-6} />}
              {saveCh?.lv > 49 && <ListChElement2 isThumb={true} wNum={5} hNum={5} pic="cardRing_s" idx={chData?.element-6} gameSpd={gameSpd} />}
              {saveCh?.newActionType.map((data, idx) => {
                return (
                  <ListChActionType className="list_action_type" isThumb={true} key={'action'+idx}>
                    <IconPic type="element" isAbsolute={true} isThumb={true} pic="icon100" idx={data + 1} />
                  </ListChActionType>
                )
              })}
              <ListChFrame absoluteSize={true} type="cardBack" pic="card_s" idx={1} />
            </>
          )}
        </>
      )
    }
    if (usedType === 'gacha') { //gacha 사용
      const starArr = Array.from({length: saveCh?.grade}, () => ''); 
      return (
        <ChCard size={size} className="ch_detail">
          <ListNameLv cardLv={imgSet.etc.imgCardLv} className="name_lv">
            <Img className="img" imgurl={imgSet.etc.iconCardName} />
            <Lv code="t0" color="main">{saveCh?.lv}</Lv>
            {chData?.na3 ? (
              <>
                <SubName code="t0" color="main" style={{
                  top: '10%',
                  letterSpacing: 0,
                }}>{chData?.na3}</SubName>
                <Name code="t0" color="main" style={{
                  bottom: '3%',
                  letterSpacing: 0,
                }}>{`${chData?.na1} ${chData?.na2}`}</Name>
              </>
            ) : (
              <Name code="t0" color="main" style={{
                bottom: '25%',
                letterSpacing: 0,
              }}>{`${chData?.na1} ${chData?.na2}`}</Name>
            )}
          </ListNameLv>
          <ListCh pic="ch_s" idx={chData?.display} />
          <ListChRing type="cardBack" pic="card_s" idx={0} />
          <ListJobAction style={{
            left: '3px',
            top: '3px',
            width: '20%',
            fontSize: 0,
          }}>
            <ListChJob className="job">
              <IconPic type="job" isAbsolute={true} pic="icon100" idx={saveCh?.job} />
            </ListChJob>
            {saveCh && saveCh?.newActionType.map((data, idx) => {
              return (
                <ListChActionType key={'action'+idx} className="action_type">
                  <IconPic type="element" isAbsolute={true} pic="icon100" idx={data + 1} />
                </ListChActionType>
              )
            })}
          </ListJobAction>
          <ListChElement type="elementBack" pic="card_s" idx={chData?.element-6} />
          {saveCh?.lv > 29 && <ListChElement1 type="elementBack2" pic="card_s" idx={chData?.element-6} />}
          {saveCh?.lv > 49 && <ListChElement2 wNum={5} hNum={5} pic="cardRing_s" idx={chData?.element-6} gameSpd={gameSpd} />}
          <ListChStar>
            {starArr.map((star, idx) => {
              return <Star idx={idx} type="star" pic="icon100" key={`start${idx}`} />;
            })}
          </ListChStar>
          <ListChFrame type="cardBack" pic="card_s" idx={1} />
        </ChCard>
      )
    }
    if (usedType === 'gameMain') { //gameMain 카드 묶음
      const starArr = Array.from({length: saveCh?.grade}, () => '');
      return (
        <CardContainer size={size} sizeH={sizeH}>
          <ChCard size={size} className="ch_detail">
            <ListCh pic="ch_s" idx={chData?.display} />
            <ListChRing type="cardBack" pic="card_s" idx={0} />
            <ListJobAction>
              <ListChJob className="job">
                <IconPic type="job" isAbsolute={true} pic="icon100" idx={saveCh?.job} />
              </ListChJob>
              {saveCh?.newActionType?.map((data, idx) => {
                return (
                  <ListChActionType key={'action'+idx} className="action_type">
                    <IconPic type="element" isAbsolute={true} isThumb={true} pic="icon100" idx={data + 1} />
                  </ListChActionType>
                )
              })}
            </ListJobAction>
            <ListChElement type="elementBack" pic="card_s" idx={chData?.element-6} />
            {saveCh?.lv > 29 && <ListChElement1 type="elementBack2" pic="card_s" idx={chData?.element-6} />}
            {saveCh?.lv > 49 && <ListChElement2 wNum={5} hNum={5} pic="cardRing_s" idx={chData?.element-6} gameSpd={gameSpd} />}
            <ListChStar usedType="gameMain">
              {starArr.map((star, idx) => {
                return <Star idx={idx} type="star" pic="icon100" key={`start${idx}`} />;
              })}
            </ListChStar>
            <ListChFrame type="cardBack" pic="card_s" idx={1} />
          </ChCard>
        </CardContainer>
      )
    }
    if (slotIdx !== '') {
      const starArr = Array.from({length: saveCh?.grade}, () => '');
      return (
        size ? (
          <CardContainer size={size} sizeH={sizeH}>
            <ChCard size={size} className="ch_detail">
              <ListCh pic="ch_s" idx={chData?.display} />
              <ListChRing type="cardBack" pic="card_s" idx={0} />
              <ListJobAction>
                <ListChJob className="job">
                  <IconPic type="job" isAbsolute={true} pic="icon100" idx={saveCh?.job} />
                </ListChJob>
                {saveCh?.newActionType?.map((data, idx) => {
                  return (
                    <ListChActionType key={'action'+idx} className="action_type">
                      <IconPic type="element" isAbsolute={true} isThumb={true} pic="icon100" idx={data + 1} />
                    </ListChActionType>
                  )
                })}
              </ListJobAction>
              <ListChElement type="elementBack" pic="card_s" idx={chData?.element-6} />
              {saveCh?.lv > 29 && <ListChElement1 type="elementBack2" pic="card_s" idx={chData?.element-6} />}
              {saveCh?.lv > 49 && <ListChElement2 wNum={5} hNum={5} pic="cardRing_s" idx={chData?.element-6} gameSpd={gameSpd} />}
              <ListChStar>
                {starArr.map((star, idx) => {
                  return <Star idx={idx} type="star" pic="icon100" key={`start${idx}`} />;
                })}
              </ListChStar>
              <ListChFrame type="cardBack" pic="card_s" idx={1} />
            </ChCard>
          </CardContainer>
        ) : (
          <ChCard size={size} className="ch_detail" {...rest}>
            <ListNameLv cardLv={imgSet.etc.imgCardLv} className="name_lv">
              <Img className="img" imgurl={imgSet.etc.iconCardName} />
              <Lv code="t8" color="main">{saveCh?.lv}</Lv>
              <SubName code="t2" color="main">{chData?.na3}</SubName>
              <Name code="t5" color="main">{`${chData?.na1} ${chData?.na2}`}</Name>
            </ListNameLv>
            <ListCh pic="ch" idx={chData?.display} />
            <ListChRing type="cardBack" pic="card" idx={0} />
            <ListJobAction>
              <ListChJob className="job">
                <IconPic type="job" isAbsolute={true} pic="icon100" idx={saveCh?.job} />
              </ListChJob>
              {saveCh?.newActionType.map((data, idx) => {
                return (
                  <ListChActionType key={'action'+idx} className="action_type">
                    <IconPic type="element" isAbsolute={true} isThumb={true} pic="icon100" idx={data + 1} />
                  </ListChActionType>
                )
              })}
            </ListJobAction>
            <ListChElement type="elementBack" pic="card" idx={chData?.element-6} />
            {saveCh?.lv > 29 && <ListChElement1 type="elementBack2" pic="card" idx={chData?.element-6} />}
            {saveCh?.lv > 49 && <ListChElement2 wNum={5} hNum={5} pic="cardRing" idx={chData?.element-6} gameSpd={gameSpd} />}
            <ListChStar>
              {starArr.map((star, idx) => {
                return <Star idx={idx} type="star" pic="icon100" key={`start${idx}`} />;
              })}
            </ListChStar>
            <ListChFrame type="cardBack" pic="card" idx={1} />
          </ChCard>
        )
      );
    } else {
      return (
        <CardContainer size={size} sizeH={sizeH}>
          <ChCard size={size} className="ch_detail">
            <ListChFrame type="cardBack" pic="card" idx={1} />
          </ChCard>
        </CardContainer>
      );
    }
  }
}

ChracterCard.defaultProps = {
  equalSize: false,
  noInfo: false,
  gameSpd: 1,
}
export default ChracterCard;
