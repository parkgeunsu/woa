import { AppContext } from 'App';
import { IconPic } from 'components/ImagePic';
import { util } from 'components/Libs';
import CharacterCard from 'pages/CharacterCard';
import { useContext } from 'react';
import styled from 'styled-components';

const LineupArea = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  font-size: 0;
`;
const LineupPic = styled(IconPic)`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
`;
const LineupMap = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2;
`;
const Map = styled.div`
  position: absolute;
  width: 20%;
  height: 20%;
  font-size: 0;
  box-sizing: border-box;
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
  &.on {
    border: none;
  }
`;
const MapEff = styled.div`
  z-index: 2;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;
const MapCh = styled.div`
  left: 10%;
  top: 10%;
  width: 80%;
  height: 80%;
  box-sizing: border-box;
  border-radius: 30%;
  overflow: hidden;
  li{
    position: absolute;
    color: #fff;
  }
  ${({select, noneCh}) => select ? `
    animation: ${noneCh ? 'lineup_mapCh_noCh' : 'lineup_mapCh'} .7s alternate infinite;
    z-index: 1;
  ` : ''}
`;
const clickListupMap = ({
  saveData,
  changeSaveData,
  selectSave,
  selectLineup,
  gameData,
  setSelectLineupList,
  mapRef,
  useList,
  setUseList,
  idx
}) => {//맵 캐릭터 클릭
  //console.log('mapidx', idx);
  setSelectLineupList(idx);
  let saveUseList = useList;
  if (mapRef[idx].classList.contains('on')) {
    saveUseList[idx] = '';
  }
  setUseList(saveUseList);
  util.setLineupSt({
    saveSlot: selectSave, 
    lineupType: selectLineup,
    useList: useList,
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
  mapRef,
  selectLineupList,
  setSelectLineupList,
  onClick,
}) => {
  // const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
  return (
    <LineupArea>
      <LineupPic pic="img600" idx={selectLineup} />
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
          if (slotIdx === "") {
            return (
              <Map ref={(element) => {mapRef[idx] = element}} className={selectLineupList === idx ? 'on' : ''} key={idx} data-mapnum={idx} onClick={() => {
                clickListupMap({
                  saveData: saveData, 
                  changeSaveData: changeSaveData,
                  selectSave: selectSave,
                  selectLineup: selectLineup,
                  gameData: gameData, 
                  setSelectLineupList: setSelectLineupList, 
                  mapRef: mapRef, 
                  useList: useList, 
                  setUseList: setUseList,
                  idx:idx
                });
              }}>
                <MapEff />
                <MapCh noneCh={true} select={selectLineupList === idx} />
              </Map>
            );
          } else {
            //const saveCh = saveData.ch[slotIdx];
            //const chData = gameData.ch[saveCh.idx];
            return (
              <Map ref={(element) => {mapRef[idx] = element}} className={selectLineupList === idx ? 'on' : ''} key={idx} data-mapnum={idx} onClick={() => {
                clickListupMap({
                  saveData: saveData, 
                  changeSaveData: changeSaveData,
                  selectSave: selectSave,
                  selectLineup: selectLineup,
                  gameData: gameData, 
                  setSelectLineupList: setSelectLineupList, 
                  mapRef: mapRef, 
                  useList: useList, 
                  setUseList: setUseList,
                  idx:idx
                });
              }}>
                <MapEff />
                <MapCh select={selectLineupList === idx}>
                  <CharacterCard usedType="thumb" saveData={saveData} gameData={gameData} slotIdx={slotIdx} />
                </MapCh>
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
