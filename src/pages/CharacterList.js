import { AppContext } from 'App';
import ChListCard from 'components/ChListCard';
import { util } from 'components/Libs';
import React, { useContext } from 'react';
import styled from 'styled-components';

const ChWrap = styled.div`
  position:absolute;left:0;right:0;top:0;bottom:0;width: 100%;height: 100%;box-sizing: border-box;overflow:hidden;touch-action:none;
  .st0 .ico{background:url(${({stateIcon}) => stateIcon[0]}) no-repeat center center;background-size:100%;}
  .st1 .ico{background:url(${({stateIcon}) => stateIcon[1]}) no-repeat center center;background-size:100%;}
  .st2 .ico{background:url(${({stateIcon}) => stateIcon[2]}) no-repeat center center;background-size:100%;}
  .st3 .ico{background:url(${({stateIcon}) => stateIcon[3]}) no-repeat center center;background-size:100%;}
  .st4 .ico{background:url(${({stateIcon}) => stateIcon[4]}) no-repeat center center;background-size:100%;}
  .st5 .ico{background:url(${({stateIcon}) => stateIcon[5]}) no-repeat center center;background-size:100%;}
  .st6 .ico{background:url(${({stateIcon}) => stateIcon[6]}) no-repeat center center;background-size:100%;}
`;

// const timer = (currentTime, setCurrentTime, saveData, changeSaveData) => {
//   if (currentTime > 49) {
//     let sData = {...saveData};
//     sData.ch.forEach((data) => {
//       data.actionPoint += 1;
//       data.pointTime -= 50;
//     })
//     changeSaveData(sData);
//     setCurrentTime(1);
//     localStorage.setItem('closeTime', new Date());
//   } else {
//     setCurrentTime(currentTime + 1);
//   };
// };
const ChracterList = ({
  saveData,
  slotIdx,
  navigate,
  changePage,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
  const iconState = React.useMemo(() => [imgSet.iconState[0], imgSet.iconState[1], imgSet.iconState[2], imgSet.iconState[3], imgSet.iconState[4], imgSet.iconState[5], imgSet.iconState[6]], [imgSet]);
  //const timerRef = useRef(null); //시간계산
  //const [currentTime, setCurrentTime] = useState(1);
  // useEffect(() => {
  //   Math.floor(currentTime / 50)
  //   timerRef.current = setTimeout(() => {
  //     timer(currentTime, setCurrentTime, saveData, changeSaveData);
  //   }, 1000);
  // }, [currentTime]);
  return (
    <ChWrap className={`ch_wrap page0`} stateIcon={iconState}>
      <div className="card_grid">
        <div className={`ch_list scroll-y list`}>
          <ul>
            { saveData.ch && saveData.ch.map((data, idx) => {
              const saveCh = saveData.ch[idx];
              const chData = gameData.ch[saveCh.idx];
              return (
                <li className={`g${saveCh.grade}`} key={idx} onClick={() => {
                  util.saveHistory(() => {
                    util.saveData('historyParam', {
                      ...util.loadData('historyParam'),
                      cards: {
                        selectIdx: idx,
                      }
                    });
                    navigate('cards');
                    changePage('cards');
                  });//히스토리 저장
                }}>
                  <ChListCard type="list" saveCh={saveCh} chData={chData} />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </ChWrap>
  );
}

export default ChracterList;
