import { AppContext } from 'App';
import { util } from 'components/Libs';
import CharacterCard from 'pages/CharacterCard';
import { useContext } from 'react';
// import styled from 'styled-components';

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
  return showMode ? <div className={`lineup_map lineup_pos lineup${selectLineup}`} onClick={() => {
    onClick && onClick();
  }} >
    {useList && useList.map((slotIdx, idx) => {
      if (slotIdx === "") {
        return (
          <span key={idx} className={`mapCh l${idx + 1}`} data-mapnum={idx}>
            <span className="mapEff"></span>
            <span className="mapCh_"></span>
          </span>
        )
      } else {
        return (
          <span key={idx} className={`mapCh has l${idx + 1}`} data-mapnum={idx} >
            <span className="mapEff"></span>
            <span className="mapCh_">
              <CharacterCard usedType="thumb" saveData={saveData} gameData={gameData} slotIdx={slotIdx} />
            </span>
          </span>
        )
      }
    })}
  </div> : <div className={`lineup_map lineup_pos lineup${selectLineup}`}>
    {useList && useList.map((slotIdx, idx) => {
      if (slotIdx === "") {
        return (
          <span ref={(element) => {mapRef[idx] = element}} key={idx} className={`mapCh l${idx + 1} ${selectLineupList === idx ? 'on' : ''}`} data-mapnum={idx} onClick={() => {
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
            <span className="mapEff"></span>
            <span className="mapCh_"></span>
          </span>
        );
      } else {
        //const saveCh = saveData.ch[slotIdx];
        //const chData = gameData.ch[saveCh.idx];
        return (
          <span ref={(element) => {mapRef[idx] = element}} key={idx} className={`mapCh has l${idx + 1} ${selectLineupList === idx ? 'on' : ''}`} data-mapnum={idx} onClick={() => {
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
            <span className="mapEff"></span>
            <span className="mapCh_">
              <CharacterCard usedType="thumb" saveData={saveData} gameData={gameData} slotIdx={slotIdx} />
            </span>
          </span>
        );
      }
    })};
  </div>
};

ChLineup.defaultProps = {
  showMode: false,
}

export default ChLineup;
