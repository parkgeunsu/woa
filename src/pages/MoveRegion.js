import { AppContext } from 'App';
import { Text } from 'components/Atom';
import { IconButton } from 'components/Button';
import { FlexBox } from 'components/Container';
import { Select } from 'components/Input';
import { util } from 'components/Libs';
import ZoomPinch from 'components/ZoomPinch';
import CharacterCard from 'pages/CharacterCard';
import { useContext, useEffect, useRef, useState } from 'react';
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
const MarpArea = styled(FlexBox)`
  width: 90%;
  flex: 0;
  border: 10px solid transparent;
  border-image: url(${({frame}) => frame}) 10 round;
  background: ${({theme}) => theme.color.sub}
`;
//1500 x 900
const WorldMap = styled.div`
  position: relative;
  width: 100%;
  height: ${() => window.screen.width * 0.6}px;
  background: url(${({back}) => back}) no-repeat center center;
  background-size: 100% 100%; 
`;
const MapPiece = styled.div`
  opacity: ${({select}) => select ? 1 : .2};
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: ${() => window.screen.width * 0.6}px;
  transition: opacity .5s;
  background: url(${({back}) => back}) no-repeat center center;
  background-size: 100% 100%;
  pointer-events: none;
`;
const MapAnchor = styled.div`
  position: absolute;
  ${({pos, select}) => `
    left: ${select ? pos[1][0] : pos[0][0]}px;
    top: ${select ? pos[1][1] : pos[0][1]}px;
  `}
  transform-origin: center center;
  width: 30px;
  height: 30px;
  background: url(${({flag}) => flag}) no-repeat center center;
  background-size: 100%;
  transition: all .5s ease-in-out;
  ${({select, theme}) => select ? `
    transform: scale(1);
    box-shadow: 0 0 10px 5px ${theme.color.red};
    z-index: 2;
    opacity: 1;
  ` : `
    transform: scale(0.2);
    border: 5px solid ${theme.color.sub}
    z-index: 1;
    filter: grayscale(1);
    opacity: .5;
  `}
  border-radius: 50%;
`;
const StyledSelect = styled(Select)`
  min-width: 50%;
  text-align: center;
`;
const ButtonArea = styled(FlexBox)`
  margin: 20px 0 0 0;
  flex: 0;
`;
const ButtonArrow = styled(IconButton)`
  background-position: center 0;
  ${({direction}) => direction === 'left' ? `
    margin: 0 15px 0 0;
    transform: rotate(90deg);
  ` : `
    margin: 0 0 0 15px;
    transform: rotate(-90deg);
  `}
`;
const RegionInfo = styled(FlexBox)`
  flex: 0;
`;
const EntryCardsWrap = styled(FlexBox)`
  margin: 15px 0 0 0;
  width: 270px;
  flex-wrap: wrap;
`;
const EntryCards = styled.div`
  position: relative;
  margin: 0 5px 5px 0;
  width: 50px;
  height: 50px;
  border: 1px solid ${({theme}) => theme.color.main};
  background: ${({theme}) => theme.color.shadow};
  box-sizing: border-box;
  &:nth-of-type(5n + 5){
    margin: 0 0 5px 0;
  }
  span{
    display: inline-block;
    position: absolute;
  }
`;
const MoveRegion = ({
  gameMode,
  saveData,
  navigate,
  changePage,
  lang,
  btnSize,
  stay,
  selectMoveRegion,
  setSelectMoveRegion,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
  const stayIdx = useRef(util.getCountryToIdx(stay));
  const currentCountryIdx = useRef(0);
  const [countryList, setCountryList] = useState([]); //국가 선택 글자
  const [entry, setEntry] = useState(['',0,'','','','','','','','']);
  useEffect(() => {
    setCountryList(
      gameData.country.map((data) => {
        return gameData.msg.regions[data.name][lang];
      })
    );
  }, []);
  useEffect(() => {
    if (gameMode === 'moveRegion') {
    }
  }, [gameMode]);
  return (
    <Wrap moveRegion={gameMode === 'moveRegion'} btnSize={btnSize} direction="column">
      <MarpArea frame={imgSet.etc.frameChBack}>
        <ZoomPinch maxScale={4} mapPos={gameData.country[selectMoveRegion]?.mapPos} onEnd={() => {
          setSelectMoveRegion('');
        }}>
          <WorldMap back={imgSet.map.worldMap}>
            {gameData.country.map((countryData, countryIdx) => {
              return (
                <div key={`mapPiece${countryIdx}`}>
                  <MapPiece select={selectMoveRegion === countryIdx} back={imgSet.map[`map${countryIdx}`]} />
                  <MapAnchor className="countryFlag" select={selectMoveRegion === countryIdx} pos={gameData.country[countryIdx].flagPos} flag={imgSet.map[`flag${countryIdx}`]} back={imgSet.map.mapAnchor} onClick={(e) => {
                    currentCountryIdx.current = countryIdx;
                    if (countryIdx !== selectMoveRegion) {
                      setSelectMoveRegion(countryIdx);
                    } else {
                      setSelectMoveRegion('');
                    }
                  }}/>
                </div>
              )
            })}
          </WorldMap>
        </ZoomPinch>
      </MarpArea>
      <ButtonArea>
        <ButtonArrow direction='left' size={30} icon={imgSet.button.btnArrow} onClick={() => {
          setSelectMoveRegion(prev => {
            const num = prev === '' ? currentCountryIdx.current : --prev;
            currentCountryIdx.current--;
            return num < 0 ? gameData.country.length - 1 : num;
          });
        }}/>
        <StyledSelect selectIdx={selectMoveRegion} setSelectIdx={setSelectMoveRegion} onClick={(idx) => {
          setSelectMoveRegion(idx);
          // const sData = {...saveData};
        }} selectOption={countryList} title={gameData.msg.title['selectRegion'][lang]}></StyledSelect>
        <ButtonArrow direction='right' size={30} icon={imgSet.button.btnArrow} onClick={() => {
          setSelectMoveRegion(prev => {
            const num = prev === '' ? currentCountryIdx.current : ++prev;
            currentCountryIdx.current++;
            return num > gameData.country.length - 1 ? 0 : num;
          });
        }}/>
      </ButtonArea>
      <RegionInfo direction="column">
        {selectMoveRegion !== '' && selectMoveRegion !== stayIdx.current && <Text code="t3" color="main">
          거리 {util.getDistanceToEvent(gameData.country[stayIdx.current].distancePosition, gameData.country[selectMoveRegion]?.distancePosition) + gameData.countryEventsNum}
        </Text>}
        <EntryCardsWrap>
          {entry.map((eCard, cardIdx) => {
            if (eCard !== '') {
              return <EntryCards key={`entry${cardIdx}`} onClick={() => {
                  console.log(cardIdx);
                }}>
                <CharacterCard isThumb={true} saveData={saveData} gameData={gameData} slotIdx={0} />
              </EntryCards>
            } else {
              return <EntryCards key={`entry${cardIdx}`} onClick={() => {
                  console.log(cardIdx);
                }} />
            }
          })}
        </EntryCardsWrap>
      </RegionInfo>
    </Wrap>
  )
}

export default MoveRegion;