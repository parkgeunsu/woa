import { Text } from 'components/Atom';
import { Button } from 'components/Button';
import { FlexBox, TitleBox } from 'components/Container';
import { IconPic } from 'components/ImagePic';
import { Select, TextField } from 'components/Input';
import { util } from 'components/Libs';
import { ListItem, ListWrap } from 'components/List';
import Msg from 'components/Msg';
import MsgContainer from 'components/MsgContainer';
import { AppContext } from 'contexts/app-context';
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
  font-size: ${({theme}) => theme.font.t1};
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
  const classification = React.useMemo(() => {
    return context.classification;
  }, [context]);
  const paramData = React.useMemo(() => {
    return util.loadData('historyParam');
  }, []);
  const [selectCard, setSelectCard] = useState(paramData?.start?.card);
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");
  const [selectGradeArr, setSelectGradeArr] = useState([]); //시작 카드 유형 배열
  const [nameID, setNameID] = useState(saveData.info?.id ? saveData.info.id : ''); //덱 이름
  const [selectList, setSelectList] = useState([]); //시작 카드 유형 글자
  const [countryList, setCountryList] = useState([]); //국가 선택 글자
  const [languageList, setLanguageList] = useState([]); //언어 선택 글자
  const [selectCardTypeIdx, setSelectCardTypeIdx] = useState(paramData?.start?.selectType ?? ''); //시작 카드 유형 index
  const [hasMoney, setHasMoney] = useState(typeof selectCardTypeIdx === 'number' ? String(gameData.startCardArr[selectCardTypeIdx].gold).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0); //소지금
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
      `${gameData.msg.sentence?.['card0']?.[lang] || "Starting Card 0"} (${gameData.ch?.[gameData.startCardArr?.[0]?.fix?.[0]]?.na1?.[lang] || "Unknown"})`,
      gameData.msg.sentence?.['card1']?.[lang] || "Starting Card 1",
      gameData.msg.sentence?.['card2']?.[lang] || "Starting Card 2",
      gameData.msg.sentence?.['card3']?.[lang] || "Starting Card 3",
    ]);
    setCountryList(
      (gameData.country?.regions || []).map((data) => {
        return data.name?.[lang] || "Unknown Region";
      })
    );
    setLanguageList([
      gameData.msg.language?.['korean']?.[lang] || "Korean",
      gameData.msg.language?.['english']?.[lang] || "English",
      gameData.msg.language?.['japanese']?.[lang] || "Japanese",
    ]);
  }, [gameData, lang]);
  return (
    <>
      <Wrap direction="column" justifyContent="flex-start">
        <TitleBox>{nameID ? `${nameID}${gameData.msg.grammar?.['conjunction']?.[lang] || ""}` : ''} {gameData.msg.title?.['cardDeck']?.[lang] || "Card Deck"}</TitleBox>
        <Scroll direction="column" backImg={imgSet.back?.scroll}>
          <ListWrap style={{width: '80%'}} transparentBack={true}>
            <StyledListItem title={gameData.msg.title?.['name']?.[lang] || "Name"}>
              <TextField transparent={true} placeholder={gameData.msg.sentence?.['enterID']?.[lang] || "Enter ID"} onChange={(value) => {
                setNameID(value);
              }} text={nameID} />
              <Button onClick={() => {
								setMsgOn(true);
                setMsg(gameData.msg.sentence?.[`sumitId${Math.floor(Math.random()*3)}`]?.[lang] || "ID confirmed.");
                const newSaveData = JSON.parse(JSON.stringify(saveData || {}));
                if (newSaveData.info) newSaveData.info.id = nameID;
                changeSaveData(newSaveData);
              }} width={60} size="small">{gameData.msg.button?.['confirm']?.[lang] || "Confirm"}</Button>
            </StyledListItem>
            <StyledListItem title={gameData.msg.title?.['startingCard']?.[lang] || "Starting Card"}>
              <Select selectIdx={selectCardTypeIdx} setSelectIdx={setSelectCardTypeIdx} onClick={(idx) => {
                setSelectCardTypeIdx(idx);
                const gold = gameData.startCardArr?.[idx]?.gold || 0;
                setHasMoney(String(gold).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
                setSelectGradeArr(gameData.startCardArr?.[idx] || []);
                const hParam = util.loadData('historyParam') || {};
                if (hParam.start) {
                  const { card, ...restStart } = hParam.start;
                  hParam.start = restStart;
                }
                util.saveData('historyParam', hParam);
                setSelectCard('');
              }} selectOption={selectList} title={gameData.msg.title?.['startingCardType']?.[lang] || "Card Type"}></Select>
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
                const newSaveData = { ...saveData, ch: [] };
                changeSaveData(newSaveData);
              }} justifyContent={(selectGradeArr?.fix?.length || 0) + (selectGradeArr?.arr?.length || 0) === 1 ? 'center' : 'space-between'} >
              {(selectGradeArr?.fix?.length || 0) > 0 && selectGradeArr.fix.map((fixData, fixIdx) => {
                const cardData = gameData.ch?.[fixData];
                const name = cardData?.na1[lang] || "Unknown";
                return (
                  <ChCard  key={`fixCard${fixIdx}`} direction="column">
                    <CharacterCard usedType="small" size="60" equalSize={true} saveData={saveData} saveCharacter={cardData} slotIdx={fixIdx}/>
                    <ChName>{name}</ChName>
                  </ChCard>
                )
              })}
              {selectCard && selectCard[0]?.idx ? selectCard.map((cardData, idx) => {
                const name = gameData.ch?.[cardData.idx]?.na1[lang] || "Unknown";
                return (
                  <ChCard key={`chCard${idx}`} direction="column">
                    <CharacterCard usedType="small" size="60" equalSize={true} saveData={saveData} saveCharacter={cardData} slotIdx={idx}/>
                    <ChName>{name}</ChName>
                  </ChCard>
                )
              }) : 
                selectGradeArr?.arr?.map((cardData, idx) => {
                  return (
                    <ChCard key={`chCard${idx}`} direction="column">
                      <CharacterCard grade={cardData} size="60" equalSize={true} />
                    </ChCard>
                )
              })}
              </CardBox>
            </StyledListItem>
            <StyledListItem title={gameData.msg.title?.['money']?.[lang] || "Money"}>
              <IconBox>
                <IconPic className="ico" type="commonBtn" pic="icon100" idx={3} /> 
              </IconBox>
              <StyledText code="t3" color="point5">{hasMoney}</StyledText>
            </StyledListItem>
            <StyledListItem title={gameData.msg.title?.['startingArea']?.[lang] || "Starting Area"}>
              <Select selectIdx={selectCountryIdx} setSelectIdx={setSelectCountryIdx} onClick={(idx) => {
                setSelectCountryIdx(idx);
                const regionId = gameData.country?.regions?.[idx]?.id || "";
                const newSaveData = JSON.parse(JSON.stringify(saveData || {}));
                if (newSaveData.info) newSaveData.info.stay = regionId;
                changeSaveData(newSaveData);
              }} selectOption={countryList} title={gameData.msg.title?.['selectRegion']?.[lang] || "Select Region"}></Select>
            </StyledListItem>
            <StyledListItem title={gameData.msg.title?.['gameLanguage']?.[lang] || "Language"}>
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
              }} selectOption={languageList} title={gameData.msg.title?.['selectLanguage']?.[lang] || "Select Language"}></Select>
            </StyledListItem>
          </ListWrap>
          <ConFirmArea>
            <Button size="large" width={100} onClick={() => {
              localStorage.removeItem('historyParam');//게임기록 삭제
              //시나리오 개방
              const updatedSaveData = JSON.parse(JSON.stringify(saveData || {}));

              if (selectGradeArr?.fix?.length > 0) {
                const cardList = util.makeCard({
                  heroArr: classification,
                  gachaNum: 1,
                  gachaType: "fix",
                  heroIdxArr: selectGradeArr.fix,
                  gameData: gameData,
                  saveData: saveData,
                  isStart: true,
                });
                updatedSaveData.ch = [...(cardList.chDataArr || []), ...updatedSaveData.ch];
              }
              const sData = util.updateScenarioHeroNum({
                gameData: gameData,
                saveData: updatedSaveData,
              });

              if (sData.info) {
                sData.info.money = Number(util.removeComma(hasMoney) || 0);
                sData.info.morality = gameData.startMorality || 0;
              }
              changeSaveData(sData);

              //필드 유효성 검사
              if (!saveData.info?.id) {
								setMsgOn(true);
                setMsg(gameData.msg.sentence?.['enterIDSubmit']?.[lang] || "Enter name first.");
                return;
              }
              if (Object.keys(saveData.ch || {}).length === 0) {
								setMsgOn(true);
                setMsg(gameData.msg.sentence?.['selectCards']?.[lang] || "Select starting cards.");
                return;
              }
              if (!saveData.info?.stay) {
								setMsgOn(true);
                setMsg(gameData.msg.sentence?.['selectCountry']?.[lang] || "Select starting area.");
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
