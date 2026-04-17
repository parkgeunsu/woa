import { Text } from 'components/Atom';
import { util } from 'components/Libs';
import { AppContext } from 'contexts/app-context';
import CharacterCard from 'pages/CharacterCard';
import ChList from 'pages/ChList';
import React, { useContext, useLayoutEffect } from 'react';
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
const ChGroup = styled(Text)`
  margin: 10px 0 5px 0;
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
  box-shadow: 0 5px 0 ${({grade}) => {
    switch(grade) {
      case 1:
        return `#fff`;
      case 2:
        return `#00a90c`;
      case 3:
        return `#0090ff`;
      case 4:
        return `#a800ff`;
      case 5:
        return `#ffcc15`;
      case 6:
        return `#ff2a00`;
      case 7:
        return `#ff8000`;
      default:
        return '';
    }
  }}
`;
const ChracterList = ({
  saveData,
  slotIdx,
}) => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const lang = React.useMemo(() => {
    return context.setting.lang;
  }, [context]);
  const gameData = React.useMemo(() => {
    return context.gameData;
  }, [context]);
  const sData = React.useMemo(() => Object.keys(saveData).length === 0 ? util.loadData('saveData') ?? {} : {...saveData}, [saveData]);
  const isMoveEvent = React.useMemo(() => {//지역 이동인지
    return util.loadData("historyParam")?.moveEvent && Object.keys(util.loadData("historyParam").moveEvent).length > 0;
  }, []);
  const entries = React.useMemo(() => {
    return sData.entry.map((entryIdx) => {
      return {
        ...sData.ch[entryIdx],
        slotIdx: entryIdx,
      };
    });
  }, [sData]);
  const chData = React.useMemo(() => {
    const ch = isMoveEvent ? util.loadData("historyParam").moveEvent.ch : entries;
    if (isMoveEvent) {
			return {
				moveCh: ch.map((c) => ({
					...sData.ch[c],
					slotIdx: c,
				})),
				moveNotCh: sData.ch.map((c, idx) => ({
					...c,
					slotIdx: idx
				})).filter((_, idx) => !ch.includes(idx))
			};
		}
    return {
      moveCh: [],
      moveNotCh: ch,
    };
  }, [sData, entries, isMoveEvent]);
  useLayoutEffect(() => {
    if (sData.ch.length === 0) {
      navigate('../');
    }
  }, [saveData, sData, navigate]);
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
          {!isMoveEvent ? 
            <ChUl>
              {chData.moveNotCh.map((data, idx) => {
                return (
                  <ChLi grade={data.grade} key={idx} onClick={() => {
                    util.saveHistory({
                      prevLocation: 'cardsList',
                      location: 'cards',
                      navigate: navigate,
                      callback: () => {
                        util.saveData('historyParam', {
                          ...util.loadData('historyParam'),
                          cards: {
                            chSlotIdx: data.slotIdx,
                            chTabIdx: 0,
                          }
                        });
                      },
                      state: {
                        dataObj: {
                          chSlotIdx: data.slotIdx,
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
            </ChUl> : <>
              <ChGroup color="main" code="t3" borderColor="sub" align="left">{gameData.msg.title.travelCard[lang]}</ChGroup>
              <ChUl>
                {chData.moveCh.map((data, idx) => {
                  return (
                    <ChLi grade={data.grade} key={idx} onClick={() => {
                      util.saveHistory({
                        prevLocation: 'cardsList',
                        location: 'cards',
                        navigate: navigate,
                        callback: () => {
                          util.saveData('historyParam', {
                            ...util.loadData('historyParam'),
                            cards: {
                              chSlotIdx: data.slotIdx,
                              chTabIdx: 0,
                            }
                          });
                        },
                        state: {
                          dataObj: {
                            chSlotIdx: data.slotIdx,
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
              <ChGroup color="main" code="t3" borderColor="sub" align="left">{gameData.msg.title.nonTravelCard[lang]}</ChGroup>
              <ChUl>
                {chData.moveNotCh.map((data, idx) => {
                  return (
                    <ChLi grade={data.grade} key={idx} onClick={() => {
                      util.saveHistory({
                        prevLocation: 'cardsList',
                        location: 'cards',
                        navigate: navigate,
                        callback: () => {
                          util.saveData('historyParam', {
                            ...util.loadData('historyParam'),
                            cards: {
                              isMoveNotCh: true,
                              chSlotIdx: data.slotIdx,
                              chTabIdx: 0,
                            }
                          });
                        },
                        state: {
                          dataObj: {
                            isMoveNotCh: true,
                            chSlotIdx: data.slotIdx,
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
            </>}
        </ChList>
      </CardGrid>
    </ChWrap>
  );
}

export default ChracterList;
