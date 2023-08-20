import { AppContext } from 'App';
import { FlexBox } from 'components/Container';
// import { util } from 'components/Libs';
import { useContext, useEffect } from 'react';
import styled from 'styled-components';

const Wrap = styled(FlexBox)`
  position: absolute;
  left: 0;
  top: ${({moveRegion}) => moveRegion ? '0%' : '-100%'};
  width: 100%;
  height: ${({btnSize}) => `calc(100% - ${btnSize}px)`};
  transition: top 1s;
  z-index: 10;
  background: linear-gradient(transparent 0%, rgba(0,0,0,.8) 20%, rgba(0,0,0,.8) 80%, transparent 100%);
`;
const MoveRegion = ({
  gameMode,
  saveData,
  navigate,
  changePage,
  lang,
  btnSize,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
  useEffect(() => {
    if (gameMode === 'moveRegion') {
    }
  }, [gameMode]);
  return (
    <Wrap moveRegion={gameMode === 'moveRegion'} btnSize={btnSize} direction="column">
    </Wrap>
  )
}

export default MoveRegion;