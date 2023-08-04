import { AppContext } from 'App';
import { Button } from 'components/Button';
import { FlexBox } from 'components/Container';
import { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Wrap = styled(FlexBox)`
  position: absolute;
  left: 0;
  top: ${({roulette}) => roulette ? '0%' : '-100%'};
  width: 100%;
  height: 100%;
  transition: top 1s;
  z-index: 10;
`;
const SpinContainer = styled(FlexBox)`
  width: 80%;
  z-index: 1;
`;
const SpinArea = styled.div`
  position: relative;
  margin: 0 5px;
  padding-top: calc(30% - 20px);
  width: 30%;
  border: 10px solid transparent;
  background: #000;
  border-image: url(${({frameMain}) => frameMain}) 20 stretch;
  border-radius: 10px;
  box-sizing: border-box;
  overflow: hidden;
`;
const SpinGroup = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  transition: top 1s ease-in-out;
  ${({stopPos, size, state}) => {
    if(typeof stopPos === 'number') {
      return `top: ${stopPos * -100}%`;
    } else {
      return `
        top: 0;
        ${state ? `animation: upDown${size} 0.${size}s infinite linear;` : ''};
      `;
    }}
  };
  @keyframes upDown2{
    0% {
      top: 0;
    }
    100% {
      top: -200%;
    }
  }
  @keyframes upDown3{
    0% {
      top: 0;
    }
    100% {
      top: -300%;
    }
  }
  @keyframes upDown4{
    0% {
      top: 0;
    }
    100% {
      top: -400%;
    }
  }
`;
const SpinCards = styled.div`
  position: absolute;
  left: 0;
  top: ${({idx}) => 100 * idx}%;
  width: 100%;
  height: 100%;
  background: url(${({url}) => url}) no-repeat center center;
  background-size: 100%;
`;
const ResultContainer = styled.div`
  
`;
const Roulette = ({
  navigate,
  saveData,
  changePage,
  gameMode,
  lang,
}) => {
  const imgSet = useContext(AppContext).images;
  const [rouletteState, setRouletteState] = useState([]);
  const [selectRoulettePos, setSelectRoulettePos] = useState([]);
  const [isRouletteSpin, setRouletteSpin] = useState(false);
  const sec = useRef(0);
  const interval = useRef(0);
  const rouletteIdx = useRef(0);
  const [rouletteArr, setRouletteArr] = useState([
    {cards:[
      {url: imgSet.icon.iconRoulette0, color: '#0f0'},
      {url: imgSet.icon.iconRoulette1, color: '#0ff'},
    ]},
    {cards:[
      {url: imgSet.icon.iconRoulette2, color: '#f00'},
      {url: imgSet.icon.iconRoulette3, color: '#00f'},
      {url: imgSet.icon.iconRoulette4, color: '#00f'},
      {url: imgSet.icon.iconRoulette5, color: '#f00'},
    ]},
    {cards:[
      {url: imgSet.icon.iconRoulette6, color: '#0f0'},
      {url: imgSet.icon.iconRoulette7, color: '#0f0'},
      {url: imgSet.icon.iconRoulette8, color: '#0f0'},
    ]},
  ]);
  useEffect(() => {
    if (gameMode === 'roulette') {
      setRouletteState(Array.from({length:rouletteArr.length}, () => false));
      setSelectRoulettePos(Array.from({length:rouletteArr.length}, () => ''));
    }
  }, [gameMode]);
  return (
    <Wrap roulette={gameMode === 'roulette'} direction="column">
      <SpinContainer>
        {rouletteArr.map((data, idx) => {
          return (
            <SpinArea key={`data${idx}`} frameMain={imgSet.etc.frameMain}>
              <SpinGroup state={rouletteState[idx]} stopPos={selectRoulettePos[idx]} size={data.cards.length} direction="column">
                {data.cards.map((cardsData, cardsIdx) => <SpinCards idx={cardsIdx} key={`cardsIdx${cardsIdx}`} url={cardsData.url} />)}
                <SpinCards idx={data.cards.length} url={data.cards[0].url} />
              </SpinGroup>
            </SpinArea>
          )
        })}
      </SpinContainer>
      <ResultContainer>
        <Button onClick={() => {
          if (!isRouletteSpin) {
            interval.current = setInterval(() => {
              sec.current += 0.1;
            }, 10);
            const cloneState = [...rouletteState];
            cloneState[rouletteIdx.current] = true;
            setRouletteState(cloneState);
            setRouletteSpin(true);
          } else {
            clearInterval(interval.current);
            interval.current = null;
            setRouletteSpin(false);
            const clonePos = [...selectRoulettePos];
            clonePos[rouletteIdx.current] = Math.round(sec.current) % rouletteArr[rouletteIdx.current].cards.length;
            setSelectRoulettePos(clonePos);
            console.log(clonePos);
            if (rouletteIdx.current >= rouletteArr[rouletteIdx.current].cards.length) {
              rouletteIdx.current = 0;
            } else {
              rouletteIdx.current ++;
            }
            sec.current = 0;
          }
        }}>클릭</Button>
      </ResultContainer>
    </Wrap>
  );
}

export default Roulette;
