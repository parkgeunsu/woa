
import { Text } from 'components/Atom';
import { FlexBox } from 'components/Container';
import { Select } from 'components/Input';
import { util } from 'components/Libs';
import Msg from "components/Msg";
import MsgContainer from "components/MsgContainer";
import Npc from 'components/Npc';
import { AppContext } from 'contexts/app-context';
import CharacterCard from 'pages/CharacterCard';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrap = styled(FlexBox)`
  position: absolute;
  inset: 0;
  padding: 0 0 20px 0;
  box-sizing: border-box;
  overflow: hidden;
`;
const WorkArea = styled(FlexBox)`
	position: relative;
	margin: 10px auto 0;
  flex: 1;
	width: 90%;
  box-sizing: border-box;
  background: rgba(0,0,0,.7);
  border: 5px solid transparent;
  border-image: url(${({frameBack}) => frameBack}) 5 round;
`;
const GreetingText = styled(Text)`
	padding: 10%;
`;
const StyledSelect = styled(Select)`
  position: relative;
  height: auto;
  width: auto;
  padding: 5px 10px;
  background: ${({theme}) => theme.color.main};
`;
const ChUl = styled.ul`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-y: auto;
`;
const ChLi = styled.li`
	position: relative;
	margin: 0 3px 3px 0;
	width: calc(20% - 2.4px);
	height: 0;
	padding-top: calc(20% - 2.4px);
	overflow: hidden;
	border-radius: 10px;
	font-size: 0;
	&:nth-of-type(4n) {
		margin: 0 0 4px 0;
	}
	& > span {
		position: absolute;
		font-size: 0.625rem;
	}
	${({used}) => used ? "" : `
		filter: grayscale(1) brightness(0.3);
	`}
`;
const Home = ({
	saveData,
	changeSaveData,
  setLoading,
}) => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [selectTab, setSelectTab] = useState("");
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");
  const lang = React.useMemo(() => {
    return context.setting.lang;
  }, [context]);
  const imgSet = React.useMemo(() => {
    return context.images;
  }, [context]);
  const gameData = React.useMemo(() => {
    return context.gameData;
  }, [context]);
  const gameItem = React.useMemo(() => {
    return gameData.items;
  }, [gameData]);
  const selectList = React.useMemo(() => {
    return gameData.stateName.map((data) => {
      return gameData.msg.state[data]?.[lang];
    });
  }, [gameData, lang]);
  const sData = React.useMemo(() => Object.keys(saveData).length === 0 ? util.loadData('saveData') : saveData, [saveData]);
  const [selectSort, setSelectSort] = useState(0);
  const selectSortList = React.useMemo(() => {
    return {...sData,
        ch: sData.ch.map((data, idx) => {
        return {
          ...data,
          slotIdx: idx,
        }
      }).sort((a, b) => {
        return b[`st${selectSort}`] - a[`st${selectSort}`];
      })
    }
  }, [sData, selectSort]);
  const [leaderCard, setLeaderCard] = useState(0);
  const entries = React.useMemo(() => {
    if (sData.entry.find((data) => data === sData.info.leaderIdx) === undefined) {
      return [...sData.entry, sData.info.leaderIdx];
    } else {
      return sData.entry;
    }
  }, [sData.entry, sData.info.leaderIdx]);
  useEffect(() => {
    const newIdx = selectSortList.ch.findIndex((data) => data.slotIdx === sData.info.leaderIdx);
    setLeaderCard(newIdx !== -1 ? newIdx : 0);
  }, [selectSortList, sData.info.leaderIdx]);
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <>
			<Wrap direction="column">
				<Npc imgSet={imgSet} shopType={'home'} gameData={gameData} lang={lang} selectTab={selectTab} setSelectTab={setSelectTab} navigate={navigate} onClick={() => {
				}}/>
        <WorkArea frameBack={imgSet.etc.frameChBack}direction="column" alignItems="flex-end">
          {selectTab === "" ? <GreetingText code="t4" color="main" wordBreak="keep-all">{gameData.shop["home"].greeting[lang]}</GreetingText> : <StyledSelect selectIdx={selectSort} setSelectIdx={setSelectSort} onClick={(idx) => {
            setSelectSort(idx);
          }} selectOption={selectList} title={`${gameData.msg.state.align[lang]}`}></StyledSelect>}
          {selectTab === 0 && <ChUl>
            {selectSortList.ch.map((data, idx) => {
              return (
                <ChLi used={leaderCard === idx} onClick={() => {
                  setLeaderCard(idx);
                  changeSaveData({
                    ...sData,
                    info: {
                      ...sData.info,
                      leaderIdx: data.slotIdx,
                    }
                  });
                }} key={idx} data-idx={idx}>
                  <CharacterCard usedType="thumb" saveData={selectSortList} gameData={gameData} showNum={data[`st${selectSort}`]} slotIdx={idx} />
                </ChLi>
              )
            })}
          </ChUl>}
          {selectTab === 1 && <ChUl>
            {selectSortList.ch.map((data, idx) => {
              const entrySlot = entries.find((e) => e === data.slotIdx);
              const isEntry = entrySlot !== undefined;
              return (
                <ChLi used={isEntry} onClick={() => {
                  let newEntry = [...entries];
                  if (!isEntry) {
                    newEntry.push(data.slotIdx);
                  } else {
                    const findIdx = entries.indexOf(data.slotIdx);
                    newEntry.splice(findIdx, 1);
                    if (leaderCard === idx) {
                      setMsgOn(true);
                      setMsg(gameData.msg.sentence.noRemoveLeader[lang]);
                    }
                  }
                  changeSaveData({
                    ...sData,
                    entry: newEntry,
                  });
                }} key={idx} data-idx={data.slotIdx}>
                  <CharacterCard usedType="thumb" saveData={selectSortList} gameData={gameData} showNum={data[`st${selectSort}`]} slotIdx={idx} />
                </ChLi>
              )
            })}
          </ChUl>}
        </WorkArea>
      </Wrap>
      <MsgContainer>
        {msgOn && <Msg text={msg} showMsg={setMsgOn}></Msg>}
      </MsgContainer>
    </>
  );
};

export default Home;