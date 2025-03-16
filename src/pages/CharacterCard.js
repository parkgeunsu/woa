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
  overflow:hidden;
  ${({size}) => {
    if (size) {
      return `
        backface-visibility:hidden;
        border: 1px solid #000;
        border-radius:10%;
      `
    } else {
      return `
        box-shadow:0 0 1px #ff0,0 0 2px #fff,0 0 10px #000;
      `
    }
  }}
  &.page {
    position:relative;
    width:100%;
    height:85%;
    padding:0 3% 3% 3%;
  }
`;

const ListNameLv = styled.div`
  position: absolute;
  text-align:center;
  ${({elementType}) => {
    switch(elementType) {
      case 2:
        return `
          color: #666;
          text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #fff, 0 0 30px; #fff;
        `;
      default:
        return `
          color: #fff;
          text-shadow: 0 0 5px #000, 0 0 10px #000, 0 0 20px #000, 0 0 30px; #000;
        `;
    }
  }}
  ${({isThumb, backColor}) => {
    return isThumb ?
      `
        left: calc(50% - 7px);
        bottom: 5%;
        width: 20px;
        height: 20px;
        z-index: 6;
        font-size: 1rem;
        line-height: 20px;
        font-weight: 600;
        border-radius: 50%;
        background-color: ${backColor};
      `
        : 
      `
        left: 0%;
        bottom: 0%;
        width: 100%;
        height: 23%;
        z-index: 6;
        font-size: 0;
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
  bottom:25%;
  width:67%;
  line-height:1;
  z-index:1;
  box-sizing:border-box;
  letter-spacing: -2px;
  white-space:nowrap;
  color: inherit;
`;
const SubName = styled(Text)`
  position:absolute;
  display:inline-block;
  left: 36%;
  top: 39%;
  width: 60%;
  line-height:1;
  text-align:left;
  z-index:1;
  box-sizing:border-box;
  color: inherit;
`;
const Lv = styled(Text)`
  position: absolute;
  display: inline-block;
  left: 7%;
  top: 39%;
  width: 25%;
  line-height: 1;
  text-align: center;
  z-index: 1;
  color: inherit;
`;
const ListCh = styled(ChPic)`
  position: absolute;
  border-radius: ${({isRound}) => isRound ? isRound : 0}%;
  ${({usedType}) => usedType === 'battle' ? `
    left: 5%;
    top: 5%;
    width: 90%;
    height: 90%;
  ` : `
    top: 0;
  `}
  z-index: 4;
`;
const ListJobAction = styled.div`
  position: absolute;
  top: 4%;
  left: 4%;
  width: 15%;
  pointer-events: none;
  z-index: 6;
  & > span {
    display: block;
  }
`;
const ListJobActionListType = styled.div`
  position: absolute;
  left: 5px;
  top: 5px;
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
const ListChElement = styled(ChPic)`
  position: absolute;
  top: 0;
  z-index: 5;
`;
const ListChElement1 = styled(ChPic)`
  position: absolute;
  top: ${({isThumb}) => isThumb ? 0 : 13}%;
  height: 0 !important;
  padding-top: 100%;
  z-index: 2;
  transform: scale(1.35);
  animation: rotate_ring linear ${({gameSpd}) => 22.5 / gameSpd}s infinite;
  ${'' /* background-position:${({isThumb}) => isThumb ? 'center 35%' : 'center center'}; */}
`;
const ListElementSmall = styled(ChPic)`
  ${({usedType}) => usedType === 'battle' ? `
    left: 5%;
    top: 5%;
    width: 90%;
    height: 90%;
  ` : `
    top: 0;
  `}
  position: absolute;
  z-index: 5;
  border-radius: 10%;
`;
const ListChFrame = styled(ChPic)`
  position: absolute;
  top: 0;
  z-index: 4;
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
  right: 3%;
  ${({usedType}) => {
    switch(usedType) {
      case 'gameMain':
        return `bottom: 5%`;
      case 'gacha':
        return `bottom: 8%`;
      default:
        return `top: 3%`;
    }
  }};
  width: 100%;
  z-index: 5;
  text-align: right;
`;
const Star = styled(IconPic)`
  margin-left: -2%;
  padding-top: 10% !important;
  width: 10% !important;
  height: 0 !important;
`;
const GradeUp = styled(IconPic)`
  margin-left: -2%;
  padding-top: 15% !important;
  width: 15% !important;
  height: 0 !important;
  vertical-align: top;
`;
const ChracterCard = ({
  size,
  equalSize,
  isShowCard,
  saveData,
  slotIdx,
  saveCharacter,
  usedType,
  noInfo,
  gameSpd,
  grade,
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
  if (!saveData) { // 새로운 게임 startGame
    return (
      <CardContainer size={size} sizeH={sizeH}>
        <ChCard size={size} className="ch_detail">
          <ListChFrame type="cardBack" pic="card_s" idx={grade} />
        </ChCard>
      </CardContainer>
    )
  } else {
    if (usedType === 'battle') { //battle 말판
      return (
        <>
          <ListCh className="card_ch" usedType={usedType} isRound={10} pic="ch_s" idx={chData?.display} />
          <ListElementSmall usedType={usedType} type="elementBack" pic="card_s" idx={chData?.element[0] - 6 + (saveCh?.lv > 29 ? 20 : 0)} />
          {saveCh?.lv > 49 && <ListChElement1 className="card_ring" style={{
            left: '-10%',
            width: '120%',
            height: '120%',
          }} isThumb={true} wNum={5} hNum={5} pic="cardRing_s" idx={chData?.element[0] - 6} gameSpd={gameSpd} />}
        </>
      )
    }
    if (usedType === 'conversation') { //battle 시나리오
      return (
        <>
          <ListCh isRound={10} pic="ch_s" idx={chData?.display} />
        </>
      )
    }
    if (usedType === 'timeline') { //battle 타임라인
      return (
        <>
          <ListCh isRound={10} pic="ch_s" idx={chData?.display} />
        </>
      )
    }
    if (usedType === 'list') { //list 사용
      return (
        <>
          <ListCh isRound={10} pic="ch_s" idx={chData.display} />
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
          <ListElementSmall type="elementBack" pic="card_s" idx={chData?.element[0] - 6 + (saveCh?.lv > 29 ? 20 : 0)} />
          <ListActionPoint>{`${saveCh.actionPoint} / ${saveCh.actionMax}`}</ListActionPoint>
        </>
      )
    }
    if (usedType === 'paging') { //paging 사용
      return (
        <>
          <ListCh pic="ch_s" idx={chData.display} />
        </>
      )
    }
    if (usedType === 'thumb') { //thumb 사용
      return (
        <>
          {noInfo ? (
            <>
              <ListCh isRound={10} pic="ch_s" idx={chData?.display} />
              <ListElementSmall type="elementBack" pic="card_s" idx={chData?.element[0] - 6 + (saveCh?.lv > 29 ? 20 : 0)} />
            </>
          ) : (
            <>
              <ListNameLv isThumb={true} backColor={gameData.chGradeColor[saveCh?.grade]}>{saveCh?.lv}</ListNameLv>
              <ListCh isRound={10} pic="ch_s" idx={chData?.display} />
              <ListElementSmall type="elementBack" pic="card_s" idx={chData?.element[0] - 6 + (saveCh?.lv > 29 ? 20 : 0)} />
              {saveCh?.lv > 49 && <ListChElement1 isThumb={true} wNum={5} hNum={5} pic="cardRing_s" idx={chData?.element[0] - 6} gameSpd={gameSpd} />}
              {saveCh?.newActionType.map((data, idx) => {
                return (
                  <ListChActionType className="list_action_type" isThumb={true} key={'action'+idx}>
                    <IconPic type="element" isAbsolute={true} isThumb={true} pic="icon100" idx={data + 1} />
                  </ListChActionType>
                )
              })}
            </>
          )}
        </>
      )
    }
    if (usedType === 'gacha') { //gacha 사용
      const starArr = Array.from({length: saveCh?.gradeMax}, () => ''); 
      return (
        <ChCard size={size} className="ch_detail">
          <ListCh isRound={10} pic="ch_s" idx={chData?.display} />
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
          <ListElementSmall type="elementBack" pic="card_s" idx={chData?.element[0] - 6 +(saveCh?.lv > 29 ? 20 : 0)} />
          {saveCh?.lv > 49 && <ListChElement1 wNum={5} hNum={5} pic="cardRing_s" idx={chData?.element[0] - 6} gameSpd={gameSpd} />}
          <ListChStar usedType="gacha">
            {starArr.map((star, idx) => {
              return <Star idx={saveCh?.grade >= idx + 1 ? idx + 1 : 0} type={saveCh?.gradeUp ? `star${saveCh?.gradeUp}` : 'star'} pic="icon100" key={`start${idx}`} />;
            })}
          </ListChStar>
        </ChCard>
      )
    }
    if (usedType === 'small') { //small 사용
      const starArr = Array.from({length: saveCh?.gradeMax}, () => '');
      return (
        <CardContainer size={size} sizeH={sizeH}>
          <ChCard size={size} className="ch_detail">
            <ListCh isRound={10} pic="ch_s" idx={chData?.display} />
            <ListJobAction style={{
              left: '3px',
              top: '3px',
              width: '20%',
              fontSize: 0,
            }}>
              <ListChJob className="job">
                <IconPic type="job" isAbsolute={true} pic="icon100" idx={saveCh?.job} />
              </ListChJob>
              {saveCh && saveCh?.newActionType?.map((data, idx) => {
                return (
                  <ListChActionType key={'action'+idx} className="action_type">
                    <IconPic type="element" pic="icon100" idx={data + 1} />
                  </ListChActionType>
                )
              })}
            </ListJobAction>
            <ListElementSmall type="elementBack" pic="card_s" idx={chData?.element[0] - 6 + (saveCh?.lv > 29 ? 20 : 0)} />
            {saveCh?.lv > 49 && <ListChElement1 wNum={5} hNum={5} pic="cardRing_s" idx={chData?.element[0] - 6} gameSpd={gameSpd} />}
            <ListChStar usedType="gacha">
              {starArr.map((star, idx) => {
                return <Star idx={saveCh?.grade >= idx + 1 ? idx + 1 : 0} type={saveCh?.gradeUp ? `star${saveCh?.gradeUp}` : 'star'} pic="icon100" key={`start${idx}`} />;
              })}
            </ListChStar>
          </ChCard>
        </CardContainer>
      )
    }
    if (slotIdx !== '') {
      const starArr = Array.from({length: saveCh?.gradeMax}, () => '');
      return (
        size ? (
          <CardContainer size={size} sizeH={sizeH}>
            <ChCard size={size} className="ch_detail">
              <ListCh isRound={10} pic="ch_s" idx={chData?.display} />
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
              <ListElementSmall type="elementBack" pic="card_s" idx={chData?.element[0] - 6 + (saveCh?.lv > 29 ? 20 : 0)} />
              {saveCh?.lv > 49 && <ListChElement1 wNum={5} hNum={5} pic="cardRing_s" idx={chData?.element[0] - 6} gameSpd={gameSpd} />}
              <ListChStar>
                {starArr.map((star, idx) => {
                  return <Star idx={saveCh?.grade >= idx + 1 ? idx + 1 : 0} type={saveCh?.gradeUp ? `star${saveCh?.gradeUp}` : 'star'} pic="icon100" key={`start${idx}`} />;
                })}
                {saveCh?.gradeUp && saveCh?.gradeUp > 0 && <GradeUp idx={gameData.ch[saveCh?.idx].animal_type} type={`animalCoin${saveCh?.gradeUp}`} pic="icon200" />}
              </ListChStar>
            </ChCard>
          </CardContainer>
        ) : (
          <ChCard size={size} className="ch_detail" {...rest}>
            {!isShowCard && <ListNameLv elementType={chData?.element[0] - 6} className="name_lv">
              <Lv code="t8" color="main">{saveCh?.lv}</Lv>
              <SubName code="t2" color="main">{chData?.na3}</SubName>
              <Name code="t5" color="main">{`${chData?.na1} ${chData?.na2}`}</Name>
            </ListNameLv>}
            <ListCh isRound={0} pic="ch" idx={chData?.display} />
            {!isShowCard && <ListJobAction>
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
            </ListJobAction>}
            <ListChElement type="elementBack" pic="card" idx={chData?.element[0] - 6 + (saveCh?.lv > 29 ? 20 : 0)} />
            {saveCh?.lv > 49 && <ListChElement1 wNum={5} hNum={5} pic="cardRing" idx={chData?.element[0] - 6} gameSpd={gameSpd} />}
            {!isShowCard && <ListChStar>
              {starArr.map((star, idx) => {
                return <Star idx={saveCh?.grade >= idx + 1 ? idx + 1 : 0} type={saveCh?.gradeUp ? `star${saveCh?.gradeUp}` : 'star'} pic="icon100" key={`start${idx}`} />;
              })}
              {saveCh?.gradeUp && saveCh?.gradeUp > 0 && <GradeUp idx={gameData.ch[saveCh?.idx].animal_type} type={`animalCoin${saveCh?.gradeUp}`} pic="icon200" />}
            </ListChStar>}
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
