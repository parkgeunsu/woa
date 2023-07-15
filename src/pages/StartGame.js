import { AppContext } from 'App';
import { FlexBox, TitleBox } from 'components/Container';
import { TextField } from 'components/Input';
import { ListItem, ListWrap } from 'components/List';
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
`;
const StartGame = ({
  saveData,
  changeSaveData,
  changePage,
  navigate,
  pageData,
}) => {
  const imgSet = useContext(AppContext).images,
    color = useContext(AppContext).color,
    gameData = useContext(AppContext).gameData,
    setting = useContext(AppContext).setting,
    lang = setting.lang;
  const [selectHero, setSelectHero] = useState([]);
  useEffect(() => {
    setSelectHero(pageData);
  }, [pageData]);
  // const randomHero5 = Math.floor(Math.random() * gameData.hero5.length),
  //   randomHero3 = Math.floor(Math.random() * gameData.hero3.length),
  //   randomHero2_1 = Math.floor(Math.random() * gameData.hero2.length),
  //   randomHero2_2 = Math.floor(Math.random() * gameData.hero2.length);
  return (
    <Wrap direction="column">
      <TitleBox>{gameData.msg.title['createLegion'][lang]}</TitleBox>
      <Scroll backImg={imgSet.back[6]}>
        <ListWrap style={{width: '80%'}} transparentBack={true}>
          <StyledListItem title={gameData.msg.title['corpsName'][lang]}>
            <TextField transparent={true} placeholder={gameData.msg.sentence['enterID'][lang]} text="" />
          </StyledListItem>
          <StyledListItem title={gameData.msg.title['selectedHero'][lang]}>
            <CardBox onClick={() => {
              navigate('recruitment');
              changePage('recruitment', {begin: true});
              const sData = {...saveData}
              sData.ch = [];
              changeSaveData(sData);
            }} justifyContent={'space-between'}>
              <CharacterCard size="60" equalSize={false} slotIdx={selectHero[0]?.idx}/>
              <CharacterCard size="60" equalSize={false} slotIdx={selectHero[1]?.idx}/>
              <CharacterCard size="60" equalSize={false} slotIdx={selectHero[2]?.idx}/>
              <CharacterCard size="60" equalSize={false} slotIdx={selectHero[3]?.idx}/>
            </CardBox>
          </StyledListItem>
          <StyledListItem title={gameData.msg.title['selectRegion'][lang]}>
            <TextField transparent={true} placeholder={gameData.msg.sentence['areaRaise'][lang]} text="" />
          </StyledListItem>
        </ListWrap>
      </Scroll>
    </Wrap>
  );
}

export default StartGame;
