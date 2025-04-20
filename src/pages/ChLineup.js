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
  &:nth-of-type(1) {left: 0%;top: 0%;}
  &:nth-of-type(2) {left:20%;top:0%;}
  &:nth-of-type(3) {left:40%;top:0%;}
  &:nth-of-type(4) {left:60%;top:0%;}
  &:nth-of-type(5) {left:80%;top:0%;}
  &:nth-of-type(6) {left:0%;top:20%;}
  &:nth-of-type(7) {left:20%;top:20%;}
  &:nth-of-type(8) {left:40%;top:20%;}
  &:nth-of-type(9) {left:60%;top:20%;}
  &:nth-of-type(10) {left:80%;top:20%;}
  &:nth-of-type(11) {left:0%;top:40%;}
  &:nth-of-type(12) {left:20%;top:40%;}
  &:nth-of-type(13) {left:40%;top:40%;}
  &:nth-of-type(14) {left:60%;top:40%;}
  &:nth-of-type(15) {left:80%;top:40%;}
  &:nth-of-type(16) {left:0%;top:60%;}
  &:nth-of-type(17) {left:20%;top:60%;}
  &:nth-of-type(18) {left:40%;top:60%;}
  &:nth-of-type(19) {left:60%;top:60%;}
  &:nth-of-type(20) {left:80%;top:60%;}
  &:nth-of-type(21) {left:0%;top:80%;}
  &:nth-of-type(22) {left:20%;top:80%;}
  &:nth-of-type(23) {left:40%;top:80%;}
  &:nth-of-type(24) {left:60%;top:80%;}
  &:nth-of-type(25) {left:80%;top:80%;}
  div {
    position: absolute;
    font-size: 0.625rem;
  }
  &.has {
    border: none;
  }
`;
const MapEff = styled.div`
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 3;
`;
const MapCh = styled.div`
  left: 10%;
  top: 10%;
  width: 80%;
  height: 80%;
  box-sizing: border-box;
  border-radius: 30%;
  overflow: hidden;
  z-index: 2;
  li{
    position: absolute;
    color: #fff;
  }
  ${({selected, noneCh}) => (selected && noneCh) ? `
    border: 1px solid #fff;
    border-radius: 10%;
  ` : ''}
`;
const MapPoint = styled.div`
  pointer-events: none;
  z-index: 1;
  ${({type, selected, noneCh}) => {
    if (noneCh) {
      switch(type) {
        case 1:
          return `
            left: 45%;
            top: 45%;
            width: 10%;
            height: 10%;
            border-radius: 50%;
            background: #00a90c;
            box-shadow: 0 0 2px #00a90c, 0 0 5px #00a90c, 0 0 10px #00a90c; 
          `;
        case 2:
          return `
            left: 42.5%;
            top: 42.5%;
            width: 15%;
            height: 15%;
            border-radius: 50%;
            background: #0090ff;
            box-shadow: 0 0 2px #0090ff, 0 0 5px #0090ff, 0 0 10px #0090ff; 
          `;
        case 3:
          return `
            left: 40%;
            top: 40%;
            width: 20%;
            height: 20%;
            border-radius: 50%;
            background: #ffcc15;
            box-shadow: 0 0 2px #ffcc15, 0 0 5px #ffcc15, 0 0 10px #ffcc15; 
          `;
        case 4:
          return `
            left: 35%;
            top: 35%;
            width: 30%;
            height: 30%;
            border-radius: 50%;
            background: #ff2a00;
            box-shadow: 0 0 2px #ff2a00, 0 0 5px #ff2a00, 0 0 10px #ff2a00; 
          `;
        default:
          return '';
      }
    } else {
      if (selected) {
        switch(type) {
          case 1:
            return `
              left: 10%;
              top: 10%;
              width: 80%;
              height: 80%;
              background: #00a90c;
              box-shadow: 0 0 2px #00a90c, 0 0 5px #00a90c, 0 0 10px #00a90c;
              z-index: 3;
              opacity: 0.7;
            `;
          case 2:
            return `
              left: 10%;
              top: 10%;
              width: 80%;
              height: 80%;
              background: #0090ff;
              box-shadow: 0 0 2px #0090ff, 0 0 5px #0090ff, 0 0 10px #0090ff;
              z-index: 3;
              opacity: 0.7;
            `;
          case 3:
            return `
              left: 10%;
              top: 10%;
              width: 80%;
              height: 80%;
              background: #ffcc15;
              box-shadow: 0 0 2px #ffcc15, 0 0 5px #ffcc15, 0 0 10px #ffcc15;
              z-index: 3;
              opacity: 0.7;
            `;
          case 4:
            return `
              left: 10%;
              top: 10%;
              width: 80%;
              height: 80%;
              background: #ff2a00;
              box-shadow: 0 0 2px #ff2a00, 0 0 5px #ff2a00, 0 0 10px #ff2a00;
              z-index: 3;
              opacity: 0.7;
            `;
          default:
            return `
              left: 10%;
              top: 10%;
              width: 80%;
              height: 80%;
              background: #fff;
              box-shadow: 0 0 2px #fff, 0 0 5px #fff, 0 0 10px #fff;
              z-index: 3;
              opacity: 0.5;`;
        }
      } else {
        switch(type) {
          case 1:
            return `
              left: 10%;
              top: 10%;
              width: 80%;
              height: 80%;
              background: #00a90c;
              box-shadow: 0 0 2px #00a90c, 0 0 5px #00a90c, 0 0 10px #00a90c; 
            `;
          case 2:
            return `
              left: 10%;
              top: 10%;
              width: 80%;
              height: 80%;
              background: #0090ff;
              box-shadow: 0 0 2px #0090ff, 0 0 5px #0090ff, 0 0 10px #0090ff; 
            `;
          case 3:
            return `
              left: 10%;
              top: 10%;
              width: 80%;
              height: 80%;
              background: #ffcc15;
              box-shadow: 0 0 2px #ffcc15, 0 0 5px #ffcc15, 0 0 10px #ffcc15; 
            `;
          case 4:
            return `
              left: 10%;
              top: 10%;
              width: 80%;
              height: 80%;
              background: #ff2a00;
              box-shadow: 0 0 2px #ff2a00, 0 0 5px #ff2a00, 0 0 10px #ff2a00; 
            `;
          default:
            return '';
        }
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
  idx
}) => {//맵 캐릭터 클릭
  setSelectFormationPosition(idx);
  const saveUseList = [...useList];
  let leader = leaderIdx;
  if (selectFormationPosition === idx) {
    saveUseList[idx] = '';
    if (gameData.lineup[selectLineup].entry[0][0] === idx) {
      leader = "";
      setLeaderIdx("");
      const cloneSData = {...saveData};
      cloneSData.lineup.save_slot[selectSave].leader = "";
      cloneSData.lineup.save_slot[selectSave].no = 0;
      changeSaveData(cloneSData);
    }
  }
  setUseList(saveUseList);
  util.setLineupSt({
    saveSlot: selectSave, 
    lineupType: selectLineup,
    useList: useList,
    leaderIdx: leader,
    isMoveEvent: isMoveEvent,
  }, gameData, saveData, changeSaveData);
}

const ChLineup = ({
  showMode,
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
          if (slotIdx === "") {
            return (
              <Map key={idx} data-mapnum={idx}>
                <MapEff />
                <MapCh />
              </Map>
            )
          } else {
            return (
              <Map key={idx} className={`has`} data-mapnum={idx} >
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
          if (slotIdx === "") {
            return (
              <Map selected={selected} key={idx} data-mapnum={idx} onClick={() => {
                clickListupMap({
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
                  idx:idx
                });
              }}>
                <MapEff />
                <MapCh noneCh={true} selected={selected} />
                <MapPoint type={lineupMap[idx]} noneCh={true} selected={selected} />
              </Map>
            );
          } else {
            //const saveCh = saveData.ch[slotIdx];
            //const chData = gameData.ch[saveCh.idx];
            return (
              <Map type={lineupMap[idx]} selected={selected} key={idx} data-mapnum={idx} onClick={() => {
                clickListupMap({
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
                  idx:idx
                });
              }}>
                <MapEff />
                <MapCh selected={selected}>
                  <CharacterCard usedType="thumb" saveData={saveData} gameData={gameData} slotIdx={slotIdx} />
                </MapCh>
                <MapPoint type={lineupMap[idx]} selected={selected} />
              </Map>
            );
          }
        })}
      </LineupMap>}
  </LineupArea>)
};

ChLineup.defaultProps = {
  showMode: false,
}

export default ChLineup;
