import { AppContext } from 'App';
import { FlexBox } from 'components/Container';
import { RadioBox } from 'components/Input';
import { util } from 'components/Libs';
import { ListItem, ListWrap } from 'components/List';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;
const langToIndex = (lang) => {
  if (typeof lang === 'number') {
    switch(lang) {
      case 0:
        return 'ko';
      case 1:
        return 'en';
      case 2:
        return 'jp';
      default:
        break;
    }
  } else {
    switch(lang) {
      case 'ko':
        return 0;
      case 'en':
        return 1;
      case 'jp':
        return 2;
      default:
        break;
    }
  }
}
const Setup = ({
  lang,
  setLang,
  speed,
  setSpeed,
  bgm,
  setBgm,
  efm,
  setEfm,
  res,
  setRes,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
  const [langageValue, setLanguageValue] = useState(langToIndex(lang));
  const [soundValue, setSoundValue] = useState(bgm ? 0 : 1);
  const [effectValue, setEffectValue] = useState(efm ? 0 : 1);
  const [resolutionValue, setResolutionValue] = useState(res);
  const [speedValue, setSpeedValue] = useState(speed);
  const [selectOnOff, setSelectOnOff] = useState([]); //onoff형태 글자
  const [selectQuality, setSelectQuality] = useState([]); //해상도형태 글자
  const [selectLanguage, setSelectLanguage] = useState([]); //언어형태 글자
  const [selectSpeed, setSelectSpeed] = useState([]); //속도형태 글자
  useEffect(() => {
    setSelectOnOff([
      gameData.msg.setup['off'][lang],
      gameData.msg.setup['on'][lang],
    ]);
    setSelectQuality([
      gameData.msg.setup['high'][lang],
      gameData.msg.setup['medium'][lang],
      gameData.msg.setup['low'][lang],
    ]);
    setSelectLanguage([
      gameData.msg.language['korean'][lang],
      gameData.msg.language['english'][lang],
      gameData.msg.language['japanese'][lang],
    ]);
    setSelectSpeed([
      gameData.msg.setup['speed1'][lang],
      gameData.msg.setup['speed2'][lang],
      gameData.msg.setup['speed3'][lang],
    ]);
  }, [lang]);
  const changeLanguage = (v) => {
    setLang(langToIndex(v));
    setLanguageValue(v);
    util.saveData('language', langToIndex(v));
  }
  const changeSound = (v) => {
    setSoundValue(v);
    setBgm(v);
    util.saveData('bgm', v);
  }
  const changeEffect = (v) => {
    setEffectValue(v);
    setEfm(v);
    util.saveData('efm', v);
  }
  const changeResolution = (v) => {
    setResolutionValue(v);
    setRes(v);
    util.saveData('resolution', v);
  }
  const changeSpeed = (v) => {
    setSpeedValue(v);
    setSpeed(v);
    util.saveData('speed', v);
  }
  return (
    <Wrap>
      <FlexBox>
        <ListWrap>
          <ListItem title={gameData.msg.setup['language'][lang]}>
            {selectLanguage.map((text, idx) => {
              return <RadioBox key={idx} change={changeLanguage} idx={idx} selected={langageValue === idx} groupId="setupLanguage">{text}</RadioBox>
            })}
          </ListItem>
          <ListItem title={gameData.msg.setup['bgm'][lang]}>
            {selectOnOff.map((text, idx) => {
              return <RadioBox key={idx} change={changeSound} idx={idx} selected={soundValue === idx} groupId="setupSound">{text}</RadioBox>
            })}
          </ListItem>
          <ListItem title={gameData.msg.setup['efm'][lang]}>
            {selectOnOff.map((text, idx) => {
              return <RadioBox key={idx} change={changeEffect} idx={idx} selected={effectValue === idx} groupId="setupEffect">{text}</RadioBox>
            })}
          </ListItem>
          <ListItem title={gameData.msg.setup['resolution'][lang]}>
            {selectQuality.map((text, idx) => {
              return <RadioBox key={idx} change={changeResolution} idx={idx} selected={resolutionValue === idx} groupId="setupResolution">{text}</RadioBox>
            })}
          </ListItem>
          <ListItem title={gameData.msg.setup['speed'][lang]}>
            {selectSpeed.map((text, idx) => {
              return <RadioBox key={idx} change={changeSpeed} idx={idx} selected={speedValue === idx} groupId="setupSpeed">{text}</RadioBox>
            })}
          </ListItem>
        </ListWrap>
      </FlexBox>
    </Wrap>
  );
}

export default Setup;