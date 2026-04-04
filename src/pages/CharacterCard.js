import { Text } from 'components/Atom';
import { FlexBox } from 'components/Container';
import { ChPic, IconPic, MergedPic } from 'components/ImagePic';
import { AppContext } from 'contexts/app-context';
import React, { useContext } from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  position: relative;
  width: ${({size}) => size}px;
  height: ${({sizeH}) => sizeH}px;
`;
const ChCard = styled.div`
  position:absolute;
  pointer-events:none;
  overflow:hidden;
  ${({usedType}) => {
    switch(usedType) {
      case 'actionCh':
        return `
          inset: 5%;
          width: 90%;
          height: 90%;
        `;
      default:
        return `
          inset: 0;
          width:100%;
          height:100%;
        `;
    }
  }}
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

const ListNameLv = styled(Text)`
  position: absolute;
  text-align:center;
  ${({elementType}) => {
    switch(elementType) {
      case 2:
        return `
          color: #000;
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
        right: 5%;
        bottom: 5%;
        padding: 2px;
        z-index: 6;
        line-height: 1;
        border-radius: 5%;
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
  top: 52%;
  width:67%;
  line-height:1;
  z-index:1;
  box-sizing:border-box;
  letter-spacing: -2px;
  word-break: keep-all;
  color: inherit;
  strong {
    margin: 0 5px 0 0;
    letter-spacing: 0px;
  }
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
  ${({profile, element}) => {
     if (!profile) {
      switch(element) {
        case 1:
          return 'border: 2px solid #fff';
        case 2:
          return 'border: 2px solid #000';
        case 3:
          return 'border: 2px solid #0040ff';
        case 4:
          return 'border: 2px solid #ff2a00';
        case 5:
          return 'border: 2px solid #ffcc15';
        case 6:
          return 'border: 2px solid #00a90c';
        case 7:
          return 'border: 2px solid #a800ff';
        case 8:
          return 'border: 2px solid #66beff';
        case 9:
          return 'border: 2px solid #f0d';
        default:
          return '';
      }
    }
  }};
  box-sizing: border-box;
  z-index: 4;
`;
const ListJobAction = styled.div`
  position: absolute;
  top: 3%;
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
  left: 2px;
  top: 2px;
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
        padding-top: 20%;
        width: 20%;
      ` : 
      `
        position: relative;
        margin-top: -1.5%;
        padding-top: 100%;
        width: 100%;
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
const ListChElement = styled(MergedPic)`
  position: absolute;
  top: 0;
  z-index: 5;
`;
const ListChElement1 = styled(MergedPic)`
  position: absolute;
  left: -10%;
  top: -10%;
  padding-top: 120%;
  width: 120% !important;
  height: 0 !important;
  z-index: 5;
  animation: rotate_ring linear ${({gameSpd}) => 22.5 / gameSpd}s infinite;
`;
const ListElementSmall = styled(MergedPic)`
  ${({usedType}) => usedType === 'battle' ? `
    left: 5%;
    top: 5%;
    width: 90%;
    height: 90%;
  ` : `
    top: 0;
  `}
  position: absolute;
  z-index: 4;
  border-radius: 10%;
`;
const ListChFrame = styled(MergedPic)`
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
  ${({usedType}) => usedType === 'gradeUp' ? `
    position: relative;
    top: 0;
    width: 90%;
    text-align: center;
  ` : `
    position: absolute;
    left: 3%;
    right: 3%;
    text-align: right;
  `};
  ${({usedType}) => {
    switch(usedType) {
      case 'gameMain':
        return `
          bottom: 5%;
        `;
      case 'gacha':
        return `
          bottom: 8%;
        `;
      default:
        return `
          top: 3%;
        `;
    }
  }};
  z-index: 5;
`;
const SratContainer = styled.div`
  display: inline-block;
  position:relative;
  margin-left: -1.5%;
  padding-top: 10% !important;
  width: 10% !important;
  height: 0 !important;
`;
const StarUp = styled(IconPic)`
  position: absolute;
  left: -1.5%;
  top:0;
  padding-top: 100% !important;
  height: 0 !important;
  opacity: ${({isUp}) => !isUp ? 1 : 0};
  ${({isUp, isAnimation}) => isUp && isAnimation && `
    animation: star_up ease-in-out 1s infinite;
    transform: scale(4);
    z-index: 1;
  `}
`;
const Star = styled(IconPic)`
  margin-left: -1.5%;
  padding-top: 10% !important;
  width: 10% !important;
  height: 0 !important;
`;
const GradeUpCh = styled.div`
  position: relative;
  width: 40%;
  padding-top: 40%;
  box-sizing: border-box;
  border-radius: 10px;
  overflow: hidden;
`;
const GradeUp = styled(IconPic)`
  padding-top: 100%;
  width: 100%;
  height: 0;
`;
const ListChNum = styled(Text)`
  position: absolute;
  left: 5px;
  top: 5px;
  padding: 0 5px;
  height: 1.25rem;
  border-radius: 50%;
  background: var(--color-darkgrey);
  line-height: 1.25rem;
  z-index:7;
`;
const ListChCost = styled(Text)`
  position: absolute;
  left: 5px;
  top: 5px;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background: var(--color-darkgrey);
  line-height: 1.25rem;
  z-index:7;
`;

const CharacterCard = ({
  size,
  equalSize=false,
  chList,
  isZoomCard,
  isShowCard,
  saveData,
  slotIdx,
  saveCharacter,
  usedType,
  noInfo=false,
  gameSpd=1,
  grade, 
  showCost,
  showNum,
  isAnimation=false,
  ...rest
}) => {
  const context = useContext(AppContext);
  const lang = React.useMemo(() => {
    return context.setting.lang;
  }, [context]);
  const gameData = React.useMemo(() => {
    return context.gameData;
  }, [context]);
  const saveCh = React.useMemo(() => {
    return saveCharacter
      ? saveCharacter 
      : slotIdx !== "" && slotIdx !== undefined ? chList ? chList[slotIdx] : saveData.ch[slotIdx] : "";
  }, [chList, slotIdx, saveCharacter]);
  const chData = React.useMemo(() => {
    return saveCh?.idx !== undefined ? gameData.ch[saveCh.idx] : '';
  }, [gameData, saveCh]);
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
          <ListCh className="card_ch" usedType={usedType} isRound={10} pic={`chs${chData?.display}`} element={(chData?.element?.[0] || 6) - 6}/>
          <ListElementSmall usedType={usedType} />
          {saveCh?.lv > 49 && <ListChElement1 pic="icon200" type="cardRing" idx={(chData?.element?.[0] || 7) - 7} gameSpd={gameSpd} />}
        </>
      )
    }
    if (usedType === 'conversation') { //battle 시나리오
      return (
        <>
          <ListCh isRound={10} pic={`chs${chData?.display}`} />
        </>
      )
    }
    if (usedType === 'timeline') { //battle 타임라인
      return (
        <>
          <ListCh isRound={10} pic={`chs${chData?.display}`} />
        </>
      )
    }
    if (usedType === 'list') { //list 사용
      return (
        <>
          <ListCh isRound={10} pic={`chs${chData?.display}`} element={chData?.element?.[0] - 6} />
          <ListJobActionListType>
            <ListChJobListType>
              <IconPic type="job" isAbsolute={true} pic="icon100" idx={saveCh?.job} />
            </ListChJobListType>
            {saveCh?.newActionType?.map((data, idx) => {
              return (
                <ListChActionTypeListType key={'action'+idx}>
                  <StyledIconPic type="element" pic="icon100" idx={data + 1} />
                </ListChActionTypeListType>
              )
            })}
          </ListJobActionListType>
          {saveCh?.lv > 49 && <ListElementSmall type="elementBack" pic="card_s" idx={chData?.element?.[0] - 6} />}
          <ListActionPoint>{`${saveCh?.actionPoint} / ${saveCh?.actionMax}`}</ListActionPoint>
        </>
      )
    }
    if (usedType === 'paging') { //paging 사용
      return (
        <>
          <ListCh pic={`chs${chData?.display}`} />
        </>
      )
    }
    if (usedType === 'gradeUp') { //gradeUp 메인 사용
      const starArr = Array.from({length: saveCh?.gradeMax}, () => '');
      const starLvUpGrade = saveCh.grade + 1;
      return (
        <FlexBox direction="column">
          <GradeUpCh>
            <ListCh isRound={10} pic={`chs${chData?.display}`} />
            <ListElementSmall type="elementBack" pic="card_s" idx={chData?.element[0] - 6 + (saveCh?.lv > 29 ? 20 : 0)} />
          </GradeUpCh>
          <ListChStar usedType="gradeUp">
            {starArr.map((star, idx) => {
              return <SratContainer>
                <StarUp idx={saveCh?.grade >= idx + 1 ? idx + 1 : 0} type={saveCh?.gradeUp ? `star${saveCh?.gradeUp}` : 'star'} pic="icon100" key={`start${idx}`} />
                <StarUp isUp={true} isAnimation={isAnimation && idx === starLvUpGrade - 1} idx={starLvUpGrade} pic="icon100" type={saveCh?.gradeUp ? `star${saveCh?.gradeUp}` : 'star'} />
              </SratContainer> 
            })}
          </ListChStar>
        </FlexBox>
      )
    }
    if (usedType === 'thumb') { //thumb 사용
      return (
        <>
          {noInfo ? (
            <>
              <ListCh isRound={10} pic={`chs${chData?.display}`} />
              <ListElementSmall type="elementBack" pic="card_s" idx={chData?.element[0] - 6 + (saveCh?.lv > 29 ? 20 : 0)} />
            </>
          ) : (
            <>
              <ListNameLv code="t1" color="main" weight="600" isThumb={true} backColor={gameData.chGradeColor[saveCh?.grade]}>Lv.{saveCh?.lv}</ListNameLv>
              <ListCh isRound={10} pic={`chs${chData?.display}`} />
              <ListElementSmall type="elementBack" pic="card_s" idx={chData?.element[0] - 6} />
              {saveCh?.lv > 49 && <ListChElement1 pic="icon200" type="cardRing" idx={chData?.element[0] - 7} gameSpd={gameSpd} />}
              {saveCh?.newActionType.map((data, idx) => {
                return (
                  <ListChActionType className="list_action_type" isThumb={true} key={'action'+idx}>
                    <IconPic type="element" isAbsolute={true} isThumb={true} pic="icon100" idx={data + 1} />
                  </ListChActionType>
                )
              })}
              {showNum && <ListChNum code="t2" color="main" weight="600">{showNum}</ListChNum>}
              {!showNum &&showCost && <ListChCost code="t2" color="main" weight="600">{chData?.cost}</ListChCost>}
            </>
          )}
        </>
      )
    }
    if (usedType === 'gacha') { //gacha 사용
      const starArr = Array.from({length: saveCh?.gradeMax}, () => ''); 
      return (
        <ChCard size={size} className="ch_detail">
          <ListCh isRound={10} pic={`chs${chData?.display}`} />
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
          <ListElementSmall type="elementBack" pic="card_s" idx={(chData?.element?.[0] || 6) - 6} />
          {saveCh?.lv > 49 && <ListChElement1 pic="icon200" type="cardRing" idx={(chData?.element?.[0] || 7) - 7} gameSpd={gameSpd} />}
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
            <ListCh isRound={10} pic={`chs${chData?.display}`} />
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
            <ListElementSmall type="elementBack" pic="card_s" idx={(chData?.element?.[0] || 6) - 6} />
            {saveCh?.lv > 49 && <ListChElement1 pic="icon200" type="cardRing" idx={(chData?.element?.[0] || 7) - 7} gameSpd={gameSpd} />}
            <ListChStar usedType="gacha">
              {starArr.map((star, idx) => {
                return <Star idx={saveCh?.grade >= idx + 1 ? idx + 1 : 0} type={saveCh?.gradeUp ? `star${saveCh?.gradeUp}` : 'star'} pic="icon100" key={`start${idx}`} />;
              })}
            </ListChStar>
          </ChCard>
        </CardContainer>
      )
    }
    if (usedType === 'actionCh') {
      const starArr = Array.from({length: saveCh?.gradeMax}, () => '');
      return (chData && 
        <ChCard size={size} usedType={usedType} className="ch_detail" {...rest}>
          {!isZoomCard && <ListNameLv elementType={chData?.element[0] - 6} className="name_lv">
            <Lv code="t3" color="main">{saveCh?.lv}</Lv>
            <SubName style={{top: "20%"}} font="point" code="t1" color="main">{chData?.na3[lang]}</SubName>
            <Name font="point" code="t2" color="main"><strong>{chData?.na1[lang]}</strong>{chData?.na2?.[lang] ? `(${chData?.na2[lang]})` : ''}</Name>
          </ListNameLv>}
          <ListCh type="profile" isRound={0} pic={`ch${chData?.display}`} />
          {!isZoomCard && <ListJobAction>
            <ListChJob>
              <IconPic type={saveCh?.gradeUp ? `job${saveCh?.gradeUp}` : 'job'} isAbsolute={true} pic="icon100" idx={saveCh?.job} />
            </ListChJob>
            {saveCh?.newActionType.map((data, idx) => {
              return (
                <ListChActionType key={'action'+idx} className="action_type">
                  <IconPic type={saveCh?.gradeUp ? `element${saveCh?.gradeUp}`: 'element'} isAbsolute={true} isThumb={true} pic="icon100" idx={data + 1} />
                </ListChActionType>
              )
            })}
            {saveCh?.gradeUp > 0 && <GradeUp idx={gameData.ch[saveCh?.idx].animal_type} type={`animalType${saveCh?.gradeUp}`} pic="icon100" />}
          </ListJobAction>}
          {!isZoomCard && 
          <>
            <ListChElement type="elementBack" pic="card" idx={chData?.element[0] - 6 + (saveCh?.lv > 49 ? 20 : 0)} />
            <ListChStar>
              {starArr.map((star, idx) => {
                return <Star idx={saveCh?.grade >= idx + 1 ? idx + 1 : 0} type={saveCh?.gradeUp ? `star${saveCh?.gradeUp}` : 'star'} pic="icon100" key={`start${idx}`} />;
              })}
            </ListChStar>
          </>}
        </ChCard>
      )
    }
    if (slotIdx !== '') {
      const starArr = Array.from({length: saveCh?.gradeMax}, () => '');
      return (
        size ? (
          <CardContainer size={size} sizeH={sizeH}>
            <ChCard size={size} className="ch_detail">
              <ListCh type="profile" isRound={10} pic={`chs${chData?.display}`} />
              {!isZoomCard && 
                <>
                <ListJobAction>
                  <ListChJob className="job">
                    <IconPic type={saveCh?.gradeUp ? `job${saveCh?.gradeUp}` : 'job'} isAbsolute={true} pic="icon100" idx={saveCh?.job} />
                  </ListChJob>
                  {saveCh?.newActionType?.map((data, idx) => {
                    return (
                      <ListChActionType key={'action'+idx} className="action_type">
                        <IconPic type={saveCh?.gradeUp ? `element${saveCh?.gradeUp}`: 'element'} isAbsolute={true} isThumb={true} pic="icon100" idx={data + 1} />
                      </ListChActionType>
                    )
                  })}
                  {saveCh?.gradeUp && saveCh?.gradeUp > 0 && <GradeUp idx={gameData.ch[saveCh?.idx].animal_type} type={`animalType${saveCh?.gradeUp}`} pic="icon100" />}
                </ListJobAction>
                <ListElementSmall type="elementBack" pic="card_s" idx={chData?.element[0] - 6} />
                <ListChStar>
                  {starArr.map((star, idx) => {
                    return <Star idx={saveCh?.grade >= idx + 1 ? idx + 1 : 0} type={saveCh?.gradeUp ? `star${saveCh?.gradeUp}` : 'star'} pic="icon100" key={`start${idx}`} />;
                  })}
                </ListChStar>
                </>
              }
            </ChCard>
          </CardContainer>
        ) : (
          <ChCard size={size} className="ch_detail" {...rest}>
            {!isZoomCard && <ListNameLv elementType={chData?.element[0] - 6} className="name_lv">
              <Lv code="t8" color="main">{saveCh?.lv}</Lv>
              <SubName font="point" code="t2" color="main">{chData?.na3[lang]}</SubName>
              <Name font="point" code="t5" color="main"><strong>{chData?.na1[lang]}</strong>{chData?.na2?.[lang] ? `(${chData?.na2[lang]})` : ''}</Name>
            </ListNameLv>}
            <ListCh type="profile" isRound={0} pic={`ch${chData?.display}`} />
            {!isZoomCard && <ListJobAction>
              <ListChJob className="job">
                <IconPic type={saveCh?.gradeUp ? `job${saveCh?.gradeUp}` : 'job'} isAbsolute={true} pic="icon100" idx={saveCh?.job} />
              </ListChJob>
              {saveCh?.newActionType.map((data, idx) => {
                return (
                  <ListChActionType key={'action'+idx} className="action_type">
                    <IconPic type={saveCh?.gradeUp ? `element${saveCh?.gradeUp}`: 'element'} isAbsolute={true} isThumb={true} pic="icon100" idx={data + 1} />
                  </ListChActionType>
                )
              })}
              {saveCh?.gradeUp > 0 && <GradeUp idx={gameData.ch[saveCh?.idx].animal_type} type={`animalType${saveCh?.gradeUp}`} pic="icon100" />}
            </ListJobAction>}
            {!isZoomCard && 
            <>
              <ListChElement type="elementBack" pic="card" idx={chData?.element[0] - 6 + (saveCh?.lv > 49 ? 20 : 0)} />
              <ListChStar>
                {starArr.map((star, idx) => {
                  return <Star idx={saveCh?.grade >= idx + 1 ? idx + 1 : 0} type={saveCh?.gradeUp ? `star${saveCh?.gradeUp}` : 'star'} pic="icon100" key={`start${idx}`} />;
                })}
              </ListChStar>
            </>}
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

export default CharacterCard;
