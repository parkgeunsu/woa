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
  width: 100%;
  height: 100%;
`;
const MapPic = styled(IconPic)`
  position: absolute;
  left: 0;
  top: 0;
`;
const FlagIcon = styled(IconPic)`
  margin: 0 10px 0 0;
  width: 50px;
  height: 50px;
`;
const ButtonArea = styled(FlexBox)`
  margin: 20px 0 0 0;
  width: calc(100% - 40px);
  flex: 0;
`;
const ButtonArrow = styled(IconButton)`
  background-position: center 0;
  ${({ direction }) =>
    direction === "left"
      ? `
    transform: rotate(90deg);
  `
      : `
    transform: rotate(-90deg);
  `}
`;
const RegionInfo = styled(FlexBox)`
  height: auto;
  flex: 0 !important;
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
const SelectEntryCard = styled.div`
  position: absolute;
  left: 7.5%;
  top: 5%;
  width: 85%;
  height: 50%;
  background: #000;
  border: 15px solid;
  border-image: url(${({frameImg}) =>  frameImg}) 30 /
  15px round;
  box-sizing: border-box;
  z-index: 91;
  ul {
		display: flex;
		flex-flow: wrap;
		width: 100%;
  }
`;
const EntryList = styled.li`
	position: relative;
  margin: 0 6px 6px 0;
  width: calc(20% - 5px);
  padding-top: calc(20% - 6px);
  font-size: 0;
  border-radius: 10px;
  &:nth-of-type(5n) {
    margin: 0 0 5px 0;
  }
  &.selected {
    filter: grayscale(1);
  }
`;
const MoveRegion = ({
  saveData,
  stay,
  selectMoveRegion,
  setSelectMoveRegion,
  moveRegionEntry,
  setMoveRegionEntry,
}) => {
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
  const stayIdx = React.useMemo(() => util.getCountryToIdx(stay), [stay]);
  const flagIconIdx = React.useMemo(() => {
    return util.getStringToCountryIdx(selectMoveRegion);
  }, [selectMoveRegion]);
  const ticketIdx = React.useMemo(() => (flagIconIdx + 31) * 1, [flagIconIdx]);
  const [showEntryList, setShowEntryList] = useState(false);
  const currentCountryIdx = useRef(0);
  const [countryList, setCountryList] = useState([]); //국가 선택 글자
  const ticketNum = React.useMemo(() => {
    const idx = saveData.items.etc.findIndex((etcItem) => {
      return etcItem.idx === ticketIdx;
    })
    if (idx >= 0) {
      return saveData.items.etc[idx]?.num ?? 1;
    } else {
      return 0;
    }
  }, [saveData, ticketIdx]);
  const emptyList = React.useMemo(() => {
    return moveRegionEntry.length < 10 ? Array.from({length: 10 - moveRegionEntry.length}, () => "") : [];
  }, [moveRegionEntry]);
  const sortEntry = (idx) => {
    return moveRegionEntry.findIndex((entry) => {
      return entry === idx;
    });
  }
  useEffect(() => {
    setCountryList(
      gameData.country?.regions.map((data) => {
        return data.name[lang];
      })
    );
  }, []);
  return (
    <Wrap direction="column">
      <MapArea frame={imgSet.etc.frameChBack}>
        <MapTouch ref={(node) => {
          if (node !== null) {
            const nodeH = node.getBoundingClientRect().width;
            node.style.height = `${nodeH * (500 / 800)}px`;
            if (selectMoveRegion !== '') {
              const selectCountry = gameData.country?.regions[selectMoveRegion];
              node.scrollTop = selectCountry.pos[1];
              node.scrollLeft = selectCountry.pos[0];
            }
          }
        }}>
          <WorldMap className="worldMap">
            <MapPic pic="img800" idx={selectMoveRegion !== "" ? selectMoveRegion + 1 : stayIdx + 1} />
          </WorldMap>
        </MapTouch>
      </MapArea>
      <ButtonArea>
        <ButtonArrow
          direction="left"
          size={30}
          icon={imgSet.button.btnArrow}
          onClick={() => {
            setSelectMoveRegion((prev) => {
              const num = prev === "" ? currentCountryIdx.current : ++prev;
              currentCountryIdx.current++;
              return num > gameData.country.regions.length - 1 ? 0 : num;
            });
          }}
        />
        <Select
          selectIdx={selectMoveRegion}
          setSelectIdx={setSelectMoveRegion}
          onClick={(idx) => {
            setSelectMoveRegion(idx);
          }}
          selectOption={countryList}
          title={gameData.msg.title["selectRegion"][lang]}
        >
          <FlagIcon type="flag" pic="icon200" idx={flagIconIdx === "" ? 21 : flagIconIdx}/>
        </Select>
        <ButtonArrow
          direction="right"
          size={30}
          icon={imgSet.button.btnArrow}
          onClick={() => {
            setSelectMoveRegion((prev) => {
              const num = prev === "" ? currentCountryIdx.current : --prev;
              currentCountryIdx.current--;
              return num < 0 ? gameData.country.regions.length - 1 : num;
            });
          }}
        />
      </ButtonArea>
      <RegionInfo direction="column">
        {selectMoveRegion !== "" && selectMoveRegion !== stayIdx && (
          <>
            <Text code="t2" color="main">
              {`${gameData.items.etc[ticketIdx].na[lang]}: ${ticketNum}`} 
            </Text>
            <Text code="t2" color="main">
              {`${gameData.msg.moveEvent.eventNum[lang]}: ${util.getDistanceToEvent(
                gameData.country.regions[stayIdx].distancePosition,
                gameData.country.regions[selectMoveRegion]?.distancePosition,
                gameData.countryEventsNum
              )}`}
            </Text>
          </>
        )}
        <EntryCardsWrap className="scroll-y" onClick={() => {
          setShowEntryList(true);
        }}>
          {moveRegionEntry.map((eCard, cardIdx) => {
            return (
              <EntryCards
                key={`entry${cardIdx}`}
              >
                <CharacterCard
                  usedType="thumb"
                  saveData={saveData}
                  gameData={gameData}
                  slotIdx={eCard}
                />
              </EntryCards>
            );
          })}
          {emptyList.map((eCard, cardIdx) => {
            return (
                <EntryCards
                  key={`entry${cardIdx}`}
                />
              );
          })}
        </EntryCardsWrap>
      </RegionInfo>
      {showEntryList && <SelectEntryCard className="scroll-y" frameImg={imgSet.images.frame0} onClick={() => {
        setShowEntryList(false);
      }}>
          <ul>
            {saveData.ch.map((chData, chIdx) => {
              return (
                <EntryList className={sortEntry(chIdx) >= 0 ? "selected" : ""} onClick={(e) => {
                  e.stopPropagation();
                  const entryClone = [...moveRegionEntry];
                  const selectedIdx = sortEntry(chIdx);
                  if (selectedIdx >= 0) {
                    entryClone.splice(selectedIdx, 1);
                  } else {
                    entryClone.push(chIdx);
                  }
                  entryClone.sort();
                  setMoveRegionEntry(entryClone);
                }} key={`chData_${chIdx}`}>
                  <CharacterCard usedType="thumb" saveData={saveData} gameData={gameData} slotIdx={chIdx} />
                </EntryList>
              );
            })}
          </ul>
      </SelectEntryCard>}
    </Wrap>
  );
};

export default MoveRegion;
