import { AppContext } from 'App';
import { IconPic } from 'components/ImagePic';
import { util } from 'components/Libs';
import CharacterCard from 'pages/CharacterCard';
import React, { useContext } from 'react';
import styled from 'styled-components';

const LineupArea = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  font-size: 0;
`;
const LineupBack = styled(IconPic)`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
`;
const LineupMap = styled.div`
  position: absolute;
  left: 5px;
  right: 5px;
  top: 5px;
  bottom: 5px;
  z-index: 2;
`;
const Map = styled.div`
  position: absolute;
  width: 20%;
  height: 20%;
  font-size: 0;
  box-sizing: border-box;
  left: ${({idx}) => (idx % 5) * 20}%;
  top: ${({idx}) => Math.floor(idx / 5) * 20}%;

  &:before {
    position: absolute;
    content: '';
    left: 0;
    top: 50%;
    width: 100%;
    height: 2px;
    background: #000;
  }
  &:after {
    position: absolute;
    content: '';
    left: 50%;
    top: 0;
    width: 2px;
    height: 100%;
    background: #000;
  }
  
  div {
    position: absolute;
    font-size: 0.625rem;
  }
  &.has {
    border: none;
  }
`;
const MapEff = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;
const MapCh = styled.div`
  position: absolute;
  left: 10%;
  top: 10%;
  width: 80%;
  height: 80%;
  z-index: 2;
  ${({noneCh, selected}) => noneCh && selected ? `
    outline: 2px solid #fff;
    border-radius: 50%;
    box-shadow: 0 0 10px #fff;
  ` : ''}
`;
const ChBoxWrap = styled.div`
  position: absolute;
  left: 10%;
  top: 10%;
  width: 80%;
  height: 80%;
  z-index: 2;
  ${({selected}) => selected ? `
    outline: 2px solid #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px #fff;
  ` : ''}
`;

const mapPointStyles = {
  1: { size: '10%', color: '#00a90c', shadow: '#00a90c' },
  2: { size: '15%', color: '#0090ff', shadow: '#0090ff' },
  3: { size: '20%', color: '#ffcc15', shadow: '#ffcc15' },
  4: { size: '30%', color: '#ff2a00', shadow: '#ff2a00' },
};

const MapPoint = styled.div`
  pointer-events: none;
  z-index: 1;
  ${({type, selected, noneCh}) => {
    const style = mapPointStyles[type];
    
    if (noneCh) {
      if (!style) return '';
      const offset = (100 - parseInt(style.size)) / 2;
      return `
        left: ${offset}%;
        top: ${offset}%;
        width: ${style.size};
        height: ${style.size};
        border-radius: 50%;
        background: ${style.color};
        box-shadow: 0 0 2px ${style.shadow}, 0 0 5px ${style.shadow}, 0 0 10px ${style.shadow}; 
      `;
    } else {
      if (selected) {
        const color = style?.color || '#fff';
        const shadow = style?.shadow || '#fff';
        const opacity = style ? 0.7 : 0.5;
        return `
          left: 10%;
          top: 10%;
          width: 80%;
          height: 80%;
          background: ${color};
          box-shadow: 0 0 2px ${shadow}, 0 0 5px ${shadow}, 0 0 10px ${shadow};
          z-index: 3;
          opacity: ${opacity};
        `;
      } else {
        if (!style) return '';
        return `
          left: 10%;
          top: 10%;
          width: 80%;
          height: 80%;
          background: ${style.color};
          box-shadow: 0 0 2px ${style.shadow}, 0 0 5px ${style.shadow}, 0 0 10px ${style.shadow}; 
        `;
      }
    }
  }}
`;
const clickListupMap = ({
  saveData,
  changeSaveData,
  selectSave,
  selectLineup,
  gameData,
  setSelectFormationPosition,
  selectFormationPosition,
  useList,
  setUseList,
  leaderIdx,
  setLeaderIdx,
  isMoveEvent,
  setInfoShow,
  scenarioState,
  emptySlot,
  idx
}) => {//맵 캐릭터 클릭
  setSelectFormationPosition(idx);
  const saveUseList = [...useList];
  let leader = leaderIdx;
  let newSelectLineup = selectLineup;
  if (selectFormationPosition === idx) {//같은 위치 클릭 시
    saveUseList[idx] = '';
    if (gameData.lineup[selectLineup].entry[0][0] === idx) {//리더 클릭 시
      leader = "";
      newSelectLineup = 0;
      setLeaderIdx("");
    }
  } else {
    setInfoShow && setInfoShow(true);
  }
  if (emptySlot) return;//슬롯이 비었을때는 리턴
  const finalSaveData = util.setLineupSt({
    saveSlot: selectSave, 
    lineupType: newSelectLineup,
    useList: saveUseList,
    leaderIdx: leader,
    isMoveEvent: isMoveEvent,
    scenarioState: scenarioState,
    selectSave: selectSave,
    lineupIdx: newSelectLineup,
    cloneUseList: saveUseList,
  }, gameData, saveData);
  setUseList(saveUseList);
  changeSaveData(finalSaveData);
}

const ChLineup = ({
  showMode=false,
  saveData,
  changeSaveData,
  selectSave,
  selectLineup,
  useList,
  setUseList,
  selectFormationPosition,
  setSelectFormationPosition,
  leaderIdx,
  setLeaderIdx,
  isMoveEvent,
  setInfoShow,
  scenarioState,
  onClick,
}) => {
  // const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
  const lineupMap = React.useMemo(() => {
    return gameData.lineup[selectLineup].map;
  }, [gameData, selectLineup])
  return (
    <LineupArea>
			<LineupBack type="pattern" pic="img800" idx={0} />
      {showMode ? 
      <LineupMap onClick={() => {
        onClick && onClick();
      }} >
        {useList && useList.map((slotIdx, idx) => {
          const itemKey = slotIdx !== "" ? `slot-${slotIdx}-${idx}` : `empty-${idx}`;
          if (slotIdx === "") {
            return (
              <Map key={itemKey} idx={idx} data-mapnum={idx}>
                <MapEff />
                <MapCh />
              </Map>
            )
          } else {
            return (
              <Map key={itemKey} idx={idx} className={`has`} data-mapnum={idx} >
                <MapEff />
                <MapCh>
                  <CharacterCard usedType="thumb" saveData={saveData} gameData={gameData} slotIdx={slotIdx} />
                </MapCh>
              </Map>
            )
          }
        })}
      </LineupMap> : 
      <LineupMap>
        {useList && useList.map((slotIdx, idx) => {
          const selected = selectFormationPosition === idx;
          const itemKey = slotIdx !== "" ? `slot-${slotIdx}-${idx}` : `empty-edit-${idx}`;
            return (
              <Map key={itemKey} idx={idx} selected={selected} data-mapnum={idx} {...(slotIdx !== "" && {type:lineupMap[idx]})} onClick={() => {
                clickListupMap({
                  emptySlot: slotIdx === "",
                  saveData: saveData, 
                  changeSaveData: changeSaveData,
                  selectSave: selectSave,
                  selectLineup: selectLineup,
                  gameData: gameData, 
                  setSelectFormationPosition: setSelectFormationPosition,
                  selectFormationPosition: selectFormationPosition,
                  useList: useList, 
                  setUseList: setUseList,
                  leaderIdx: leaderIdx,
                  setLeaderIdx: setLeaderIdx,
                  isMoveEvent: isMoveEvent,
                  scenarioState: scenarioState,
                  idx:idx,
                  ...(slotIdx !== "" && {setInfoShow: setInfoShow})
                });
              }}>
                <MapEff />
                {slotIdx === "" ? <>
                  <MapCh noneCh={true} selected={selected} />
                  <MapPoint type={lineupMap[idx]} noneCh={true} selected={selected} />
                </> : <>
                  <ChBoxWrap selected={selected}>
                   <CharacterCard usedType="thumb" saveData={saveData} gameData={gameData} slotIdx={slotIdx} />
                  </ChBoxWrap>
                  <MapPoint type={lineupMap[idx]} selected={selected} />
                </>}
              </Map>
            );
        })}
      </LineupMap>}
  </LineupArea>)
};

export default ChLineup;
