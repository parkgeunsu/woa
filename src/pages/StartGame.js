import { AppContext } from 'App';
import { Text } from 'components/Atom';
import { Button } from 'components/Button';
import { FlexBox, TitleBox } from 'components/Container';
import { IconPic } from 'components/ImagePic';
import { Select, TextField } from 'components/Input';
import { util } from 'components/Libs';
import { ListItem, ListWrap } from 'components/List';
import Msg from 'components/Msg';
import MsgContainer from 'components/MsgContainer';
import CharacterCard from 'pages/CharacterCard';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrap = styled(FlexBox)`
`;
const Scroll = styled(FlexBox)`
  margin: 15px 0 0 0;
  width: 90%;
  height: 80%;
  background: url(${({backImg}) => backImg});
  background-size: 100% 100%;
  box-sizing: border-box;
`;
const StyledListItem = styled(ListItem)`
  margin: 0 0 20px 0;
`;
const IconBox = styled.div`
  display: inline-block;
  width: 30px;
  height: 30px;
  vertical-align: middle;
`;
const StyledText = styled(Text)`
  display: inline-block;
  margin: 0 0 0 10px;
`;
const CardBox = styled(FlexBox)`
  margin: 15px 0 0 0;
  align-items: start;
`;
const ChCard = styled(FlexBox)`
  flex: 1;
`;
const ChName = styled.div`
  margin: 10px 0 0 0;
  font-size: ${({theme}) => theme.font.t2};
  color: ${({theme}) => theme.color.sub};
  word-break: keep-all;
  text-align: center;
`;
const ConFirmArea = styled.div`
  margin: 30px 100px 0 0;
  width: 100%;
  text-align: right;
`;
const StartGame = ({
  saveData,
  changeSaveData,
  setLang,
}) => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const lang = React.useMemo(() => {
    return context.setting.lang;
  }, [context]);
  const imgSet = React.useMemo(() => {
    return context.images;
  }, [context]);
  const gameData = React.useMemo(() => {
    return context.gameData;
  }, [context]);
  const paramData = React.useMemo(() => {
    return util.loadData('historyParam');
  }, []);
  const [selectCard, setSelectCard] = useState(!util.loadData('continueGame') ? paramData?.start?.card : []);
  console.log(selectCard);
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");
  const [selectGradeArr, setSelectGradeArr] = useState([]); //시작 카드 유형 배열
  const [nameID, setNameID] = useState(saveData.info?.id ? saveData.info.id : ''); //덱 이름
  const [selectList, setSelectList] = useState([]); //시작 카드 유형 글자
  const [countryList, setCountryList] = useState([]); //국가 선택 글자
  const [languageList, setLanguageList] = useState([]); //언어 선택 글자
  const [selectCardTypeIdx, setSelectCardTypeIdx] = useState(paramData?.start?.selectType || ''); //시작 카드 유형 index
  const [hasMoney, setHasMoney] = useState(typeof selectCardTypeIdx === 'number' ? String(gameData.startGold[selectCardTypeIdx]).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0); //소지금
  const [selectCountryIdx, setSelectCountryIdx] = useState(paramData?.start?.country || ''); //시작 국가 선택 index
  const [selectLanguageIdx, setSelectLanguageIdx] = useState(paramData?.recruitment?.language || 0); //게임 언어 선택 index
  useEffect(() => {
    if (paramData?.start && Object.keys(paramData.start).length !== 0) {
      setSelectGradeArr(paramData.start.chArr);
      setSelectLanguageIdx(paramData.start.language);
      setSelectCountryIdx(paramData.start.country);
    }
  }, [paramData]);
  useEffect(() => {
    setSelectList([
      gameData.msg.sentence['card1'][lang],
      gameData.msg.sentence['card2'][lang],
      gameData.msg.sentence['card3'][lang],
    ]);
    setCountryList(
      gameData.country.map((data) => {
        return gameData.msg.regions[data.name][lang];
      })
    );
    setLanguageList([
      gameData.msg.language['korean'][lang],
      gameData.msg.language['english'][lang],
      gameData.msg.language['japanese'][lang],
    ]);
  }, [gameData, lang]);
  return (
    <>
      <Wrap direction="column">
        <TitleBox>{nameID ? `${nameID}${gameData.msg.grammar['conjunction'][lang]}` : ''} {gameData.msg.title['cardDeck'][lang]}</TitleBox>
        <Scroll direction="column" backImg={imgSet.back[6]}>
          <ListWrap style={{width: '80%'}} transparentBack={true}>
            <StyledListItem title={gameData.msg.title['name'][lang]}>
              <TextField transparent={true} placeholder={gameData.msg.sentence['enterID'][lang]} onChange={(value) => {
                setNameID(value);
              }} text={nameID} />
              <Button onClick={() => {
								setMsgOn(true);
                setMsg(gameData.msg.sentence[`sumitId${Math.floor(Math.random()*3)}`][lang]);
                const sData = {...saveData};
                sData.info.id = nameID;
                changeSaveData(sData);
              }} width={60} size="small">{gameData.msg.button['confirm'][lang]}</Button>
            </StyledListItem>
            <StyledListItem title={gameData.msg.title['startingCard'][lang]}>
              <Select selectIdx={selectCardTypeIdx} setSelectIdx={setSelectCardTypeIdx} onClick={(idx) => {
                setSelectCardTypeIdx(idx);
                setHasMoney(String(gameData.startGold[idx]).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
                setSelectGradeArr(gameData.startCardArr[idx]);
                const hParam = {...util.loadData('historyParam')};
                delete hParam?.start?.card;
                util.saveData('historyParam', hParam);
                setSelectCard('');
              }} selectOption={selectList} title={gameData.msg.title['startingCardType'][lang]}></Select>
              <CardBox onClick={() => {
                util.saveData('historyParam', {
                  ...util.loadData('historyParam'),
                  recruitment: {
                    begin: true,
                    cardArr: selectGradeArr,
                    selectType: selectCardTypeIdx,
                    language: selectLanguageIdx,
                    country: selectCountryIdx,
                  }
                });
                navigate('../recruitment');
                // changePage('recruitment', {begin: true, cardArr: selectGradeArr, selectType: selectCardTypeIdx, language: selectLanguageIdx, country: selectCountryIdx});
                const sData = {...saveData}
                sData.ch = [];
                changeSaveData(sData);
              }} justifyContent={selectGradeArr.length === 1 ? 'center' : 'space-between'} >
                {selectCard && selectCard[0].idx ? selectCard.map((cardData, idx) => {
                  const name = gameData.ch[cardData.idx].na1;
                  return (
                    <ChCard key={`chCard${idx}`} direction="column">
                      <CharacterCard size="60" equalSize={false} saveData={saveData} saveCharacter={cardData} slotIdx={idx}/>
                      <ChName>{name}</ChName>
                    </ChCard>
                  )
                }) : selectGradeArr.map((cardData, idx) => {
                  return (
                    <CharacterCard key={`chCard${idx}`} size="60" equalSize={false} />
                  )
                })}
              </CardBox>
            </StyledListItem>
            <StyledListItem title={gameData.msg.title['money'][lang]}>
              <IconBox>
                <IconPic className="ico" type="commonBtn" pic="icon100" idx={3} /> 
              </IconBox>
              <StyledText code="t3" color="point5">{hasMoney}</StyledText>
            </StyledListItem>
            <StyledListItem title={gameData.msg.title['startingArea'][lang]}>
              <Select selectIdx={selectCountryIdx} setSelectIdx={setSelectCountryIdx} onClick={(idx) => {
                setSelectCountryIdx(idx);
                const sData = {...saveData};
                sData.info.stay = gameData.country[idx].name;
                changeSaveData(sData);
              }} selectOption={countryList} title={gameData.msg.title['selectRegion'][lang]}></Select>
              {/* <TextField transparent={true} placeholder={gameData.msg.sentence['selectCountry'][lang]} text="" /> */}
            </StyledListItem>
            <StyledListItem title={gameData.msg.title['gameLanguage'][lang]}>
              <Select selectIdx={selectLanguageIdx} setSelectIdx={setSelectLanguageIdx} onClick={(idx) => {
                setSelectLanguageIdx(idx);
                const countryCode = (() => {
                  switch(idx) {
                    case 0:
                      return 'ko';
                    case 1:
                      return 'en';
                    case 2:
                      return 'jp';
                    default:
                      return '';
                  }
                })();
                setLang(countryCode);
                util.saveData('language', countryCode);
                // const sData = {...saveData};
                // sData.info.stay = countryList[idx];
                // changeSaveData(sData);
              }} selectOption={languageList} title={gameData.msg.title['selectLanguage'][lang]}></Select>
            </StyledListItem>
          </ListWrap>
          <ConFirmArea>
            <Button size="large" width={100} onClick={() => {
              localStorage.removeItem('historyParam');//게임기록 삭제
              //시나리오 개방
              const sData = {...saveData};
              sData.ch.forEach((chData) => {
                const chPeriod = gameData.ch[chData.idx].period,
                  chScenario = gameData.ch[chData.idx].scenario
                if (chScenario !== '') { //인물 전기가 있다면
                  const chCountry = util.getIdxToCountry(gameData.ch[chData.idx].country);
                  sData.scenario[chCountry][chPeriod].scenarioList[chScenario].open += 1;
                }
              });
              sData.info.money = hasMoney;
              changeSaveData(sData);

              //필드 유효성 검사
              if (!saveData.info.id) {
								setMsgOn(true);
                setMsg(gameData.msg.sentence['enterIDSubmit'][lang]);
                return;
              }
              if (Object.keys(saveData.ch).length === 0) {
                console.log(selectCard)
								setMsgOn(true);
                setMsg(gameData.msg.sentence['selectCards'][lang]);
                return;
              }
              if (!saveData.info.stay) {
								setMsgOn(true);
                setMsg(gameData.msg.sentence['selectCountry'][lang]);
                return;
              }
              util.saveData('continueGame', true);
              navigate('../gameMain');
              // changePage('gameMain', {aa: 1, bb: 2});
            }}>{gameData.msg.button['finalize'][lang]}</Button>
          </ConFirmArea>
        </Scroll>
      </Wrap>
      <MsgContainer>
        {msgOn && <Msg text={msg} showMsg={setMsgOn}></Msg>}
      </MsgContainer>
    </>
  );
}

export default StartGame;
