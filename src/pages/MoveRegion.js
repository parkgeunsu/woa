import { AppContext } from "App";
import { Text } from "components/Atom";
import { IconButton } from "components/Button";
import { FlexBox } from "components/Container";
import { IconPic } from 'components/ImagePic';
import { Select } from "components/Input";
import { util } from "components/Libs";
import CharacterCard from "pages/CharacterCard";
import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Wrap = styled(FlexBox)`
  position: absolute;
  left: 0;
  ${({ gameMode }) => {
    return gameMode
      ? `
      opacity: 1;
      pointer-events: unset;
    `
      : `
      opacity: 0;
      pointer-events: none;
    `;
  }};
  width: 100%;
  height: calc(100% - 40px);
  transition: opacity 1s;
  z-index: 10;
  background: linear-gradient(
    transparent 0%,
    rgba(0, 0, 0, 0.8) 20%,
    rgba(0, 0, 0, 0.8) 80%,
    transparent 100%
  );
`;
const MapArea = styled(FlexBox)`
  width: 90%;
  flex: 0;
  border: 10px solid transparent;
  border-image: url(${({ frame }) => frame}) 10 round;
  background-color: ${({ theme }) => theme.color.land5};
`;
const MapTouch = styled.div`
  position: relative;
  width: 100%;
  overflow: auto;
  transition: all 0.5s linear;
`;
//1500 x 900
const WorldMap = styled.div`
  position: relative;
  width: ${({scale}) => scale * 100}%;
  height: 0;
  padding-top: ${({scale}) => (scale * 100) * (305 / 565)}%;
  background: url(${({ back }) => back}) no-repeat center center;
  background-size: 100% 100%;
  background-color: ${({theme}) => theme.color.water};
  svg {
    position: absolute;
    left: 0;
    top: 0;
    path {
      transition: transform .5s linear;
      z-index: 1;
      &.selected {
        stroke: #673d00;
        fill: #673d00;
        z-index: 2;
      }
    }
  }
`;
const CompassPic = styled(IconPic)`
  position: absolute;
  left: 5px;
  bottom: 5px;
  width: 70px;
  height: 70px;
  z-index: 1;
`;
const MapPiece = styled.div`
  opacity: ${({ select }) => (select ? 1 : 0.2)};
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: ${() => window.screen.width * 0.6}px;
  transition: opacity 0.5s;
  background: url(${({ back }) => back}) no-repeat center center;
  background-size: 100% 100%;
  pointer-events: none;
`;
const MapAnchor = styled.div`
  position: absolute;
  ${({ pos, select }) => `
    left: ${select ? pos[1][0] : pos[0][0]}px;
    top: ${select ? pos[1][1] : pos[0][1]}px;
  `}
  transform-origin: center center;
  width: 30px;
  height: 30px;
  background: url(${({ flag }) => flag}) no-repeat center center;
  background-size: 100%;
  transition: all 0.5s ease-in-out;
  ${({ select, theme }) =>
    select
      ? `
    transform: scale(1);
    box-shadow: 0 0 10px 5px ${theme.color.red};
    z-index: 2;
    opacity: 1;
  `
      : `
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
  ${({ direction }) =>
    direction === "left"
      ? `
    margin: 0 15px 0 0;
    transform: rotate(90deg);
  `
      : `
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
  border: 1px solid ${({ theme }) => theme.color.main};
  background: ${({ theme }) => theme.color.shadow};
  box-sizing: border-box;
  &:nth-of-type(5n + 5) {
    margin: 0 0 5px 0;
  }
  span {
    display: inline-block;
    position: absolute;
  }
`;
const MoveRegion = ({
  gameMode,
  saveData,
  stay,
  selectMoveRegion,
  setSelectMoveRegion,
}) => {
  console.log(stay)
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
  const stayIdx = useRef(util.getCountryToIdx(stay));
  const currentCountryIdx = useRef(0);
  const [countryList, setCountryList] = useState([]); //국가 선택 글자
  const [mapScale, setMapScale] = useState(1);
  const [entry, setEntry] = useState(["", 0, "", "", "", "", "", "", "", ""]);
  useEffect(() => {
    setCountryList(
      gameData.country?.regions.map((data) => {
        return data.name[lang];
      })
    );
  }, []);
  useEffect(() => {
    if (gameMode === "moveRegion") {
    }
  }, [gameMode]);
  return (
    <Wrap gameMode={gameMode === "moveRegion"} direction="column">
      <MapArea frame={imgSet.etc.frameChBack}>
        <MapTouch ref={(node) => {
          if (node !== null) {
            const nodeH = node.getBoundingClientRect().width;
            node.style.height = `${nodeH * (305 / 565)}px`;
            if (selectMoveRegion !== '') {
              const selectCountry = gameData.country?.regions[selectMoveRegion];
              node.scrollTop = selectCountry.pos[1];
              node.scrollLeft = selectCountry.pos[0];
            }
          }
        }}>
          <WorldMap back={imgSet.map.worldMap} scale={mapScale}>
            <CompassPic type="item" pic="icon200" idx="0" />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 565 305">
              {gameData.country?.regions.map((countryData, countryIdx) => {
                return (
                  <path className={selectMoveRegion === countryIdx ? 'selected' : ''} key={`mapPiece${countryIdx}`} id={countryData.id} strokeWidth="0.3" stroke="#ef9d00" fill={'#9b6600'} d={countryData.svg} onClick={(e) => {
                    setMapScale(5);
                    setSelectMoveRegion(countryIdx);
                  }}/>
                );
              })}
              {/* <MapPiece select={selectMoveRegion === countryIdx} back={imgSet.map[`map${countryIdx}`]} />
              <MapAnchor className="countryFlag" select={selectMoveRegion === countryIdx} pos={gameData.country[countryIdx].flagPos} flag={imgSet.map[`flag${countryIdx}`]} back={imgSet.map.mapAnchor} onClick={(e) => {
                currentCountryIdx.current = countryIdx;
                if (countryIdx !== selectMoveRegion) {
                  setSelectMoveRegion(countryIdx);
                } else {
                  setSelectMoveRegion('');
                }
              }}/> */}
              <path
                fill={gameData.country?.world.fill}
                id="etc"
                d={gameData.country?.world.svg}
                onClick={() => {
                  setMapScale(1);
                  setSelectMoveRegion('');
                }}
              />
            </svg>
          </WorldMap>
        </MapTouch>
      </MapArea>
      <ButtonArea>
        <ButtonArrow
          direction="left"
          size={30}
          icon={imgSet.button.btnArrow}
          onClick={() => {
            setMapScale(3);
            setSelectMoveRegion((prev) => {
              const num = prev === "" ? currentCountryIdx.current : --prev;
              currentCountryIdx.current--;
              return num < 0 ? gameData.country.regions.length - 1 : num;
            });
          }}
        />
        <StyledSelect
          selectIdx={selectMoveRegion}
          setSelectIdx={setSelectMoveRegion}
          onClick={(idx) => {
            setSelectMoveRegion(idx);
            // const sData = {...saveData};
          }}
          selectOption={countryList}
          title={gameData.msg.title["selectRegion"][lang]}
        ></StyledSelect>
        <ButtonArrow
          direction="right"
          size={30}
          icon={imgSet.button.btnArrow}
          onClick={() => {
            setMapScale(3);
            setSelectMoveRegion((prev) => {
              const num = prev === "" ? currentCountryIdx.current : ++prev;
              currentCountryIdx.current++;
              return num > gameData.country.regions.length - 1 ? 0 : num;
            });
          }}
        />
      </ButtonArea>
      <RegionInfo direction="column">
        {selectMoveRegion !== "" && selectMoveRegion !== stayIdx.current && (
          <Text code="t3" color="main">
            거리{" "}
            {`util.getDistanceToEvent(gameData.country.regions[stayIdx.current].distancePosition,
              gameData.country[selectMoveRegion]?.distancePosition
            ) + gameData.countryEventsNum)`}
          </Text>
        )}
        <EntryCardsWrap>
          {entry.map((eCard, cardIdx) => {
            if (eCard !== "") {
              return (
                <EntryCards
                  key={`entry${cardIdx}`}
                  onClick={() => {
                    console.log(cardIdx);
                  }}
                >
                  <CharacterCard
                    usedType="thumb"
                    saveData={saveData}
                    gameData={gameData}
                    slotIdx={0}
                  />
                </EntryCards>
              );
            } else {
              return (
                <EntryCards
                  key={`entry${cardIdx}`}
                  onClick={() => {
                    console.log(cardIdx);
                  }}
                />
              );
            }
          })}
        </EntryCardsWrap>
      </RegionInfo>
    </Wrap>
  );
};

export default MoveRegion;
