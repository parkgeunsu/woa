import { AppContext } from 'App';
import ChListCard from 'components/ChListCard';
import { util } from 'components/Libs';
import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';

const ChListUl = styled.ul`
  width: ${({chSize, chLength}) => Math.ceil(chSize) * chLength}px !important;
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
const ChracterPaging = ({
  chLength,
  saveData,
  slotIdx,
  changeChSlot,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
  const cardWidth = React.useMemo(() => window.innerWidth * 0.1, []);

  //const timerRef = useRef(null); //시간계산
  //const [currentTime, setCurrentTime] = useState(1);
  // useEffect(() => {
  //   Math.floor(currentTime / 50)
  //   timerRef.current = setTimeout(() => {
  //     timer(currentTime, setCurrentTime, saveData, changeSaveData);
  //   }, 1000);
  // }, [currentTime]);
  const scrollMove = useCallback((node) => {
    if (node !== null) {
      const listHalfSize = node.getBoundingClientRect().width * .5;
      const cardHalfNum = Math.floor(listHalfSize / cardWidth);
      node.scrollTo(cardWidth * (slotIdx - cardHalfNum), 0);
    }
  }, [slotIdx, cardWidth]);

  return (
    <div ref={scrollMove} className={`ch_list scroll-x paging`}>
      <ChListUl chSize={cardWidth} chLength={chLength}>
        {saveData.ch && saveData.ch.map((data, idx) => {
          const saveCh = saveData.ch[idx];
          const chData = gameData.ch[saveCh.idx];
          return (
            <li className={`g${saveCh.grade} ${slotIdx === idx ? 'on' : ''}`} key={idx} onClick={() => {
              util.saveData('historyParam', {
                ...util.loadData('historyParam'),
                cards: {
                  selectIdx: idx,
                }
              });
              changeChSlot(idx);
            }}>
              <ChListCard type="paging" saveCh={saveCh} chData={chData} />
            </li>
          )
        })}
      </ChListUl>
    </div>
  );
}

export default ChracterPaging;
