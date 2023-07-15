import { AppContext } from 'App';
import { FlexBox } from 'components/Container';
import { RadioBox } from 'components/Input';
import { ListItem, ListWrap } from 'components/List';
import { useContext, useState } from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;
const data = {
  sound: ['on', 'off'],
  effect: ['on', 'off'],
  resolution: ['상', '중', '하'],
};
const Setting = () => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
	const setting = useContext(AppContext).setting,
    lang = setting.lang;
  const [soundValue, setSoundValue] = useState(0);
  const [effectValue, setEffectValue] = useState(0);
  const [resolutionValue, setResolutionValue] = useState(0);
  const changeSound = (v) => {
    setSoundValue(v);
  }
  const changeEffect = (v) => {
    setEffectValue(v);
  }
  const changeResolution = (v) => {
    setResolutionValue(v);
  }
  return (
    <Wrap>
      <FlexBox>
        <ListWrap>
          <ListItem title="배경음">
            {data.sound.map((text, idx) => {
              return <RadioBox key={idx} change={changeSound} idx={idx} selected={soundValue === idx} groupId="settingSound">{text}</RadioBox>
            })}
          </ListItem>
          <ListItem title="효과음">
            {data.effect.map((text, idx) => {
              return <RadioBox key={idx} change={changeEffect} idx={idx} selected={effectValue === idx} groupId="settingEffect">{text}</RadioBox>
            })}
          </ListItem>
          <ListItem title="해상도">
            {data.resolution.map((text, idx) => {
              return <RadioBox key={idx} change={changeResolution} idx={idx} selected={resolutionValue === idx} groupId="settingResolution">{text}</RadioBox>
            })}
          </ListItem>
        </ListWrap>
      </FlexBox>
    </Wrap>
  );
}

export default Setting;
