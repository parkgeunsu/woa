import { AppContext } from 'App';
import { Button } from 'components/Button';
import { FlexBox, TitleBox } from 'components/Container';
import { Select, TextField } from 'components/Input';
import { util } from 'components/Libs';
import { ListItem, ListWrap } from 'components/List';
import Msg from 'components/Msg';
import MsgContainer from 'components/MsgContainer';
import CharacterCard from 'pages/CharacterCard';
import { useContext, useEffect, useState } from 'react';
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
const startCardArr = [
  [6],
  [5,3,2],
  [4,4,3,2],
];
const StartGame = ({
  saveData,
  changeSaveData,
  changePage,
  navigate,
  pageData,
  lang,
  setLang,
}) => {
  const imgSet = useContext(AppContext).images,
    color = useContext(AppContext).color,
    gameData = useContext(AppContext).gameData;
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");
  const [selectCard, setSelectCard] = useState([]);
  const [selectGradeArr, setSelectGradeArr] = useState([]); //시작 카드 유형 배열
  const [nameID, setNameID] = useState(saveData.info?.id ? saveData.info.id : ''); //덱 이름
  const [selectList, setSelectList] = useState([]); //시작 카드 유형 글자
  const [countryList, setCountryList] = useState([]); //국가 선택 글자
  const [languageList, setLanguageList] = useState([]); //언어 선택 글자
  const [selectCardTypeIdx, setSelectCardTypeIdx] = useState(pageData.selectType || ''); //시작 카드 유형 index
  const [selectCountryIdx, setSelectCountryIdx] = useState(pageData.country || ''); //시작 국가 선택 index
  const [selectLanguageIdx, setSelectLanguageIdx] = useState(pageData.language || 0); //게임 언어 선택 index
  useEffect(() => {
    setSelectList([
      gameData.msg.sentence['card1'][lang],
      gameData.msg.sentence['card2'][lang],
      gameData.msg.sentence['card3'][lang],
    ]);
    setCountryList(
      Object.entries(gameData.msg.regions).map((data) => {
        return data[1][lang];
      })
    );
    setLanguageList([
      gameData.msg.language['korean'][lang],
      gameData.msg.language['english'][lang],
      gameData.msg.language['japanese'][lang],
    ]);
  }, [lang]);
  useEffect(() => {
    if (Object.keys(pageData).length !== 0) {
      setSelectCard(pageData.card);
      setSelectGradeArr(pageData.chArr);
      setSelectLanguageIdx(pageData.language);
      setSelectCountryIdx(pageData.country);
    }
  }, [pageData]);
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
              <Select selectIdx={selectCardTypeIdx} onClick={(idx) => {
                setSelectCardTypeIdx(idx);
                setSelectGradeArr(startCardArr[idx]);
              }} selectOption={selectList} title={gameData.msg.title['startingCardType'][lang]}></Select>
              <CardBox onClick={() => {
                navigate('recruitment');
                changePage('recruitment', {begin: true, cardArr: selectGradeArr, selectType: selectCardTypeIdx, language: selectLanguageIdx, country: selectCountryIdx});
                const sData = {...saveData}
                sData.ch = [];
                changeSaveData(sData);
              }} justifyContent={'space-between'}>
                {selectCard[0]?.idx ? selectCard.map((cardData, idx) => {
                  const name = gameData.ch[cardData.idx].na1;
                  return (
                    <ChCard key={`chCard${idx}`} direction="column">
                      <CharacterCard size="60" equalSize={false} saveData={saveData} slotIdx={idx}/>
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
            <StyledListItem title={gameData.msg.title['startingArea'][lang]}>
              <Select selectIdx={selectCountryIdx} onClick={(idx) => {
                setSelectCountryIdx(idx);
                const sData = {...saveData};
                sData.info.stay = countryList[idx];
                changeSaveData(sData);
              }} selectOption={countryList} title={gameData.msg.title['selectRegion'][lang]}></Select>
              {/* <TextField transparent={true} placeholder={gameData.msg.sentence['selectCountry'][lang]} text="" /> */}
            </StyledListItem>
            <StyledListItem title={gameData.msg.title['gameLanguage'][lang]}>
              <Select selectIdx={selectLanguageIdx} onClick={(idx) => {
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
              if (!saveData.info.id) {
								setMsgOn(true);
                setMsg(gameData.msg.sentence['enterIDSubmit'][lang]);
                return;
              }
              if (Object.keys(saveData.ch).length === 0) {
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
              navigate('gameMain');
              changePage('gameMain', {aa: 1, bb: 2});
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