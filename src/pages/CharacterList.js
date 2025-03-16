import { AppContext } from 'App';
import { util } from 'components/Libs';
import CharacterCard from 'pages/CharacterCard';
import ChList from 'pages/ChList';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ChWrap = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  touch-action: none;
`;
const CardGrid = styled.div`
  padding: 0 20px;
  height: 100%;
`;
const ChUl = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const ChLi = styled.li`
  display: inline-block;
  position: relative;
  margin: 0 4px 4px 0;
  width: calc(25% - 3px);
  padding-top: calc(25% - 3px);
  border-radius: 10px;
  overflow: hidden;
  &:nth-of-type(4n) {
    margin: 0 0 4px 0;
  }
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
}) => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  // const lang = React.useMemo(() => {
  //   return context.setting.lang;
  // }, [context]);
  const imgSet = React.useMemo(() => {
    return context.images;
  }, [context]);
  // const gameData = React.useMemo(() => {
  //   return context.gameData;
  // }, [context]);
  const sData = React.useMemo(() => {
    return Object.keys(saveData).length === 0 ? util.loadData('saveData') : saveData;
  }, [saveData]);
  useEffect(() => {
    if (sData.ch.length === 0) {
      navigate('../');
    }
  }, [saveData]);
  //const timerRef = useRef(null); //시간계산
  //const [currentTime, setCurrentTime] = useState(1);
  // useEffect(() => {
  //   Math.floor(currentTime / 50)
  //   timerRef.current = setTimeout(() => {
  //     timer(currentTime, setCurrentTime, saveData, changeSaveData);
  //   }, 1000);
  // }, [currentTime]);
  return (
    <ChWrap className="ch_wrap">
      <CardGrid>
        <ChList type="list">
          <ChUl>
            {saveData.ch && saveData.ch.map((data, idx) => {
              return (
                <ChLi className={`g${data.grade}`} key={idx} onClick={() => {
                  util.saveHistory({
                    location: 'cards',
                    navigate: navigate,
                    callback: () => {
                      util.saveData('historyParam', {
                        ...util.loadData('historyParam'),
                        cards: {
                          chSlotIdx: idx,
                          chTabIdx: 0,
                        }
                      });
                    },
                    state: {
                      dataObj: {
                        chSlotIdx: idx,
                        chTabIdx: 0,
                      }
                    },
                    isNavigate: true,
                  });//히스토리 저장
                }}>
                  <CharacterCard usedType="list" saveData={sData} saveCharacter={data} />
                </ChLi>
              )
            })}
          </ChUl>
        </ChList>
      </CardGrid>
    </ChWrap>
  );
}

export default ChracterList;
