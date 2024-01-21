import { AppContext } from 'App';
import { util } from 'components/Libs';
import CharacterCard from 'pages/CharacterCard';
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
  const context = useContext(AppContext);
  // const lang = React.useMemo(() => {
  //   return context.setting.lang;
  // }, [context]);
  // const imgSet = React.useMemo(() => {
  //   return context.images;
  // }, [context]);
  const gameData = React.useMemo(() => {
    return context.gameData;
  }, [context]);
  const sData = React.useMemo(() => {
    return Object.keys(saveData).length === 0 ? util.loadData('saveData') : saveData;
  }, [saveData]);
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
          return (
            <li className={`g${data.grade} ${slotIdx === idx ? 'on' : ''}`} key={idx} onClick={() => {
              util.saveData('historyParam', {
                ...util.loadData('historyParam'),
                cards: {
                  selectIdx: idx,
                }
              });
              changeChSlot(idx);
            }}>
              <CharacterCard usedType="paging" saveData={sData} saveCharacter={data} />
            </li>
          )
        })}
      </ChListUl>
    </div>
  );
}

export default ChracterPaging;
