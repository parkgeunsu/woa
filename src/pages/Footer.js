import { AppContext } from 'App';
import { Button } from 'components/Button';
import { FlexBox } from 'components/Container';
import { useContext, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  opacity: ${({gameMode}) => gameMode !== '' ? 0 : 1};
  transition: all 0.5s;
  pointer-events: ${({gameMode}) => gameMode !== '' ? 'none' : 'unset'};
`;

const Footer = ({
  navigate,
  saveData,
  changePage,
  page,
  gameMode,
  setGameMode,
  lang,
}) => {
  const gameData = useContext(AppContext).gameData;
  const imgSet = useContext(AppContext).images;
  useEffect(() => {

  }, []);
  return (
    <>
      <Wrapper gameMode={gameMode} className="footer">
        <FlexBox>
          <Button onClick={() => {
            setGameMode('roulette');
          }}>{gameData.msg.button['exploreRegions'][lang]}</Button>
          <Button>{gameData.msg.button['scenarios'][lang]}</Button>
          <Button>{gameData.msg.button['moveRegion'][lang]}</Button>
        </FlexBox>
      </Wrapper>
    </>
  );
}

export default Footer;
