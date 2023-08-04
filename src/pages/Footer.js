import { AppContext } from 'App';
import { Button } from 'components/Button';
import { FlexBox } from 'components/Container';
import { useContext, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
`;

const Footer = ({
  navigate,
  saveData,
  changePage,
  page,
  setGameMode,
  lang,
}) => {
  const gameData = useContext(AppContext).gameData;
  const imgSet = useContext(AppContext).images;
  useEffect(() => {

  }, []);
  return (
    <>
      <Wrapper className="footer">
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
