import { Text } from 'components/Atom';
import { FlexBox } from 'components/Container';
import GuideQuestion from 'components/GuideQuestion';
import { IconPic } from 'components/ImagePic';
import ItemLayout from 'components/ItemLayout';
import { util } from 'components/Libs';
import Msg from 'components/Msg';
import MsgContainer from 'components/MsgContainer';
import Popup from 'components/Popup';
import PopupContainer from 'components/PopupContainer';
import Tooltip from 'components/Tooltip';
import TooltipContainer from 'components/TooltipContainer';
import { AppContext } from 'contexts/app-context';
import CharacterCard from 'pages/CharacterCard';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrap = styled(FlexBox)`
  position: absolute;
  left: 0;
  width: 100%;
  height: calc(100% - 40px);
  transition: opacity 1s;
  z-index: 10;
  background: linear-gradient(transparent 0%, rgba(0,0,0,.8) 10%, rgba(0,0,0,.8) 90%, transparent 100%);
`;
const ScrollWrap = styled.div`
  margin: 20% 0 10%;
  padding: 0 20px;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
`;
const CountryContainer = styled.div`
  margin:0 0 10px 0;
`;
const CountryScenario = styled.div`
  margin: 0 0 10px 0;
`;
const CountryPeriod = styled.div`
  padding: 7px 20px;
  min-height: 35px;
  box-sizing:border-box;
  line-height: 1.2;
  font-size: ${({theme}) => theme.font.t3};
  color: ${({theme}) => theme.color.unique};
  background: url(${({btnBack}) => btnBack}) no-repeat center center;
  background-size: 100% 100%;
`;

const ScenarioContainer = styled.div`
  margin: 10px 0 10px 20px;
`;
const ScenarioNameBox = styled(FlexBox)`
`;
const DropDownArrow = styled.div`
  margin: 0 0 0 10px;
  width: 25px;
  height: 25px;
  background: url(${({btnBack}) => btnBack}) no-repeat center ${({isOpen}) => isOpen ? 'bottom' : 'top'};
  background-size: cover;
`;
const ScenarioCards = styled(FlexBox)`
  margin: 0 0 0 20px;
  width: auto;
`;
const CardContainer = styled.div`
  position: relative;
  margin: 0 10px 0 0;
  width: 30px;
  height: 30px;
  span{
    display: inline-block;
    position: absolute;
  }
`;
const ScenarioName = styled.div`
  display: inline-block;
  position: relative;
  padding: 6px 20px;
  min-height: 35px;
  max-width: 40%;
  box-sizing:border-box;
  line-height: 1.2;
  font-size: ${({theme}) => theme.font.t4};
  color: ${({theme}) => theme.color.yellow};
  text-shadow: 2px 2px 1px #000;
  background: url(${({btnBack}) => btnBack}) no-repeat center center;
  background-size: 100% 100%;
`;
const ScenarioStage = styled.div`
  margin: 10px 0 0 0;
  padding: 0 0 0 10px;
`;
const StageName = styled(FlexBox)`
  position: relative;
  padding: 5px 10px 5px 20px;
  text-shadow: 2px 2px 1px #000;
  background: url(${({btnBack}) => btnBack}) no-repeat left center;
  background-size: 100% 100%;
  box-sizing: border-box;
  ${({currentStage}) => !currentStage && "filter: grayscale(100%);"}
`;
const StageNewIcon = styled.div`
  position: absolute;
  left: -10px;
  top: -10px;
  width: 30px;
  height: 30px;
`;
const StageTitle = styled(FlexBox)`
  min-height: 20px;
  line-height: 1.2;
  font-size: ${({theme}) => theme.font.t2};
  color: ${({theme}) => theme.color.point1};
`;
const StageDifficult = styled(FlexBox)`
  width: auto;
`;
const DifficultContainer = styled.div`
  position: relative;
  margin:0 5px 0 0;
  width: 20px;
  height: 20px;
`;
const IconSmile = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  ${({selected}) => {
    if (selected) {
      return `box-shadow:0 0 10px #fff;`
    } else {
      return `filter: grayscale(100%);`
    }
  }}
  background-size: 100%;
`;
const IconLock = styled(IconPic)`
  position: absolute;
`;
const StageIconLock = styled(IconPic)`
  background-color: ${({theme}) => theme.color.main};
  border-radius: 50%;
`;
const IconClear = styled.div`
  position: absolute;
  left: 25%;
  top: -48%;
  width: 100%;
  height: 100%;
  z-index: 1;
`;
const DifficultIcon = ({
  selected,
  clear,
  possibleStageNum,
  iconIdx,
  onClick,
}) => {
  return <DifficultContainer onClick={(e) => {
    e.stopPropagation();
    onClick && onClick();
  }}>
    <IconSmile selected={selected}>
      <IconPic type="scenario" pic="icon100" idx={iconIdx} />
    </IconSmile> 
    {clear && <IconClear>
      <IconPic type="scenario" pic="icon100" idx={4} />
    </IconClear>}
    {!possibleStageNum && <IconLock type="commonBtn" pic="icon100" idx={4} />
    }
  </DifficultContainer>
}

const StageDetail = styled.div`
  padding: 0 10px;
  height: ${({isShow}) => isShow ? 'auto' : 0};
  overflow: hidden;
`;
const StageInfoWrap = styled(FlexBox)`
  padding: 10px;
  border: 3px double ${({theme}) => theme.color.stageBar};
  border-top: none;
  background: ${({theme}) => theme.color.stageBack};
  box-sizing: border-box;
  color: ${({theme}) => theme.color.sub};
`;
const StageInfo = styled(FlexBox)`
`;
const StageMap = styled.div`
  position: relative;
  flex-basis: 102px;
  font-size: 0;
  border: 1px solid #fff;
  box-sizing: border-box;
`;
const EntriesEmpty = styled(Text)`
  position: absolute;
  left: 0%;
  top: 50%;
  width: 100%;
  height: 50%;
  span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    word-break: keep-all;
    color: ${({theme}) => theme.color.point2};
    z-index: 1;
  }
  &:after {
    content:'';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: ${({theme}) => theme.color.sub};
    opacity: 0.8;
  }
`
const MapPieces = styled.div`
  display: inline-block;
  position: relative;
  width: 20px;
  height: 20px;
  background: ${({theme, mapColor}) => theme.color[`land${mapColor}`]};
  ${({theme, enemy, idx}) => {
    return enemy && enemy.idx !== '' && idx < 25 ? `
      &:before{
        content:'';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 10px;
        height: 10px;
        background: ${theme.color.red};
        border: 2px solid ${theme.color.main};
        border-radius: 50%;
        transform: translate(-50%, -50%);
      }
    ` : '';
  }}
  ${({theme, ally, idx}) => {
    return typeof ally === 'number' && ally !== '' && idx >= 25 ? `
      &:before{
        content:'';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 10px;
        height: 10px;
        background: ${theme.color.blue};
        border: 2px solid ${theme.color.main};
        border-radius: 50%;
        transform: translate(-50%, -50%);
      }
    ` : '';
  }}
  &:nth-of-type(21), &:nth-of-type(22), &:nth-of-type(23), &:nth-of-type(24), &:nth-of-type(25){
    border-bottom: 10px solid #fff;
  }
`;
const StageLvHistory = styled(FlexBox)`
  padding: 0 0 0 10px;
  height: 210px;
  flex: 1;
`;
const StageLv = styled(FlexBox)`
  position: sticky;
  top: 0;
  margin: 0 0 5px 0;
  height: auto;
`;
const DropItemsInfo = styled(FlexBox)`
  margin: 10px 0 0 0;
`;
const Hr = styled.hr`
  margin: 10px 0;
  width: 100%;
  appearance: none;
  border-color: #fff;
`;
const DropItems = styled(FlexBox)`
  flex-wrap: wrap;
  & > span {
    width: 35px;
    padding-top: 35px;
    border-radius: 5px;
  }
`;
const StageHistory = styled.div`
  padding: 5px;
  height: 100%;
  line-height: 1.2;
  border-radius: 5px;
  font-size: ${({theme}) =>  theme.font.t1};
  background: ${({theme}) => theme.color.shadowL};
`;
const difficultCurrent = (gameData, heroNum) => {
  if (heroNum <= gameData.possibleStageNum[0]) {
    return 0;
  } else if (heroNum <= gameData.possibleStageNum[1]) {
    return 1;
  } else if (heroNum <= gameData.possibleStageNum[2]) {
    return 2;
  } else {
    return 3;
  }
}
const ScenarioList = ({
  gameData,
  slotIdx,
  chScenarioIdx,
  imgSet,
  navigate,
  saveData,
  changeSaveData,
  stay,
  dynastyIdx,
  dynastyScenario,
  dynastyScenarioIdx,
  selectScenario,
  setSelectScenario,
  setTooltip,
  setTooltipOn,
  setTooltipPos,
  setMsgOn,
  setMsg,
  lang,
}) => {
  const saveStage = React.useMemo(() => {
    if (typeof stay !== 'string') return { heroNum: 0, progressedStage: 0 };
    const stayKey = stay.replace(/[0-9]/g, "");
    return saveData.scenario?.[stayKey]?.[dynastyIdx]?.scenarioList?.[dynastyScenarioIdx];
  }, [saveData]);
  const saveChStage = React.useMemo(() => {
    return saveData.ch[slotIdx].scenario[chScenarioIdx] || { currentStage: 0,stage: [] };
  }, [saveData, stay, dynastyIdx, dynastyScenarioIdx]);
  const [newGroup, setNewGroup] = useState(false);
  useEffect(() => {
    saveChStage.stage?.forEach((stageData) => {
      if (stageData.first) { //최초 접근인지 체크
        setNewGroup(true);
        return;
      }
    });
  }, [saveChStage.stage]);
  const [isOpen, setOpen] = useState(Object.keys(selectScenario).length !== 0 ? true : false);
  const [showStageIdx, setShowStageIdx] = useState(Object.keys(selectScenario).length !== 0 ? selectScenario.stageIdx : '');
  const [selectDifficult, setSelectDifficult] = useState(difficultCurrent(gameData, saveStage.heroNum));
  const stageIdxRef = useRef(0);
  console.log(saveStage, saveChStage);
  const difficultClick = useCallback(({
    possible, stageIdx, idx
  }) => {
    if (!possible || typeof stay !== 'string') {
      return;
    }
    const cloneSaveData = JSON.parse(JSON.stringify(saveData));

    if (saveChStage?.stage?.[stageIdx]) {
      saveChStage.stage[stageIdx].select = idx;
      changeSaveData(cloneSaveData);
    }

    setSelectScenario({
      dynastyIdx: dynastyIdx,
      dynastyScenarioIdx: dynastyScenarioIdx,
      stageIdx: stageIdxRef.current,
      slotIdx: slotIdx,
      stageDifficult: idx,
      chScenarioIdx: chScenarioIdx,
      type: 'scenario',
    });
    setSelectDifficult(idx);
  }, [saveData, stay, dynastyIdx, dynastyScenarioIdx, stageIdxRef, changeSaveData]);
  return <ScenarioContainer>
    <ScenarioNameBox justifyContent="flex-start" onClick={() => {
        setOpen(prev => !prev);
        setShowStageIdx('');
      }}>
      <ScenarioName btnBack={imgSet.button.btnM}>
        <StageNewIcon>
          <IconPic type="scenario" pic="icon100" idx={6} />
        </StageNewIcon>
        {dynastyScenario?.name?.[lang] || ""}
      </ScenarioName>
      <DropDownArrow btnBack={imgSet.button.btnArrowL}  isOpen={isOpen} />
      <ScenarioCards code="t5">
        <CardContainer>
          <CharacterCard usedType="thumb" noInfo={true} saveData={saveData} gameData={gameData} slotIdx={0} />
        </CardContainer>
        <Text code="t5" color="main">{`x ${saveStage.heroNum}`}</Text>
      </ScenarioCards>
    </ScenarioNameBox>
    {isOpen && dynastyScenario.stage.map((stageData, stageIdx) => {
      const stageInfo = {
        minLv:100,
        maxLv:0,
        nums:0,
      };
      stageData.entry?.forEach((data) => {
        if (data.idx !== '') {
          stageInfo.minLv = Math.min(stageInfo.minLv, data.lv);
          stageInfo.maxLv = Math.max(stageInfo.maxLv, data.lv);
          stageInfo.nums ++;
        }
      });
      let currentEntries = [];
      let isPreparedEntries = false;
      if (showStageIdx === stageIdx) {
        currentEntries = saveChStage.stage[stageIdx]?.lineup?.slot.entry;
        isPreparedEntries = currentEntries?.length > 0 &&  currentEntries?.filter((entry) => entry !== '').length > 0;
      }
      const currentStage = saveChStage.currentStage >= stageIdx;
      return <ScenarioStage key={`stageGroup${stageIdx}`}>
        <StageName key={`stageName${stageIdx}`} currentStage={currentStage} btnBack={imgSet.button.btnLL} justifyContent={'space-between'} onClick={() => {
          if (!currentStage) {
            setMsgOn(true);
            setMsg(gameData.msg.sentence.prevStageClear[lang]);
            return;
          }
          if (showStageIdx === stageIdx) {
            stageIdxRef.current = '';
            setSelectScenario({});
          } else {
            stageIdxRef.current = stageIdx;
            setSelectScenario({
              dynastyIdx: dynastyIdx,
              dynastyScenarioIdx: dynastyScenarioIdx,
              stageIdx: stageIdx,
              stageDifficult: 0,
              slotIdx: slotIdx,
              chScenarioIdx: chScenarioIdx,
              type: 'scenario',
            });
          }
          setShowStageIdx(prev => prev === stageIdx ? '' : stageIdx);
          ;
        }}>
          {saveChStage.stage[stageIdx].first && <StageNewIcon>
            {currentStage ? <IconPic type="scenario" pic="icon100" idx={6} /> : <StageIconLock type="commonBtn" pic="icon100" idx={4} />}
          </StageNewIcon>}
          <StageTitle alignItems={'center'} justifyContent={'flex-start'}>{stageData?.title?.[lang] || ""}</StageTitle>
          {stageIdx === showStageIdx && <StageDifficult>
            {gameData.possibleStageNum.map((possibleStage, possibleIdx) => {
              return (
                <DifficultIcon key={`possibleStage${possibleIdx}`} 
                  selected={saveChStage.stage?.[stageIdx]?.select === possibleIdx}
                  clear={saveChStage.stage?.[stageIdx]?.clear?.[possibleIdx]}
                  possibleStageNum={saveStage.heroNum >= possibleStage}
                  iconIdx={possibleIdx}
                  onClick={(e) => {
                    if (saveStage.heroNum < possibleStage) {
                      setMsgOn(true);
                      setMsg(gameData.msg.sentence.needMoreHero[lang]);
                      return;
                    }
                    difficultClick({
                      possible: saveStage.heroNum >= possibleStage,
                      stageIdx: stageIdx,
                      idx: possibleIdx,
                    });
                  }}
                />
              )
            })}
          </StageDifficult>}
        </StageName>
        <StageDetail currentStage={currentStage} isShow={showStageIdx === stageIdx}>
          <StageInfoWrap direction="column">
            <StageInfo justifyContent="flex-start" alignItems="flex-start">
              <StageMap onClick={() => {
                util.saveHistory({
                  location: 'cardPlacement',
                  navigate: navigate,
                  callback: () => {
                    const historyP = JSON.parse(JSON.stringify(util.loadData('historyParam') || {}));
                    util.saveData('historyParam', {
                      ...historyP,
                      scenario: selectScenario
                    });
                  },
                  state: {
                    scenario: selectScenario,
                  },
                  isNavigate: true,
                });//히스토리 저장
              }}>
                  {stageData.map.map((mapData, mapIdx) => {
                    return <MapPieces key={`map${mapIdx}`} idx={mapIdx} enemy={stageData.entry[mapIdx]} ally={mapIdx >= 25 && currentEntries?.[mapIdx - 25]} mapColor={mapData} />
                  })}
                  {!isPreparedEntries && <EntriesEmpty code="t2" color="main"><span>{gameData.msg.title?.['noEntry']?.[lang] || "No Entry"}</span></EntriesEmpty>}
              </StageMap>
              <StageLvHistory direction="column">
                <StageLv direction="column" alignItems="flex-start">
                  <Text color="main" code="t2">{gameData.msg.title?.['wildlife']?.[lang] || "Wildlife"}: {stageInfo.nums}</Text>
                  <Text color="main" code="t2">{gameData.msg.title?.['animals']?.[lang] || "Animals"} Lv: {stageInfo.minLv === stageInfo.maxLv ? `${stageInfo.minLv}` : `${stageInfo.minLv} - ${stageInfo.maxLv}`}</Text>
                </StageLv>
                <StageHistory className="scroll-y">
                  {stageData?.history?.[lang] || ""}
                </StageHistory>
              </StageLvHistory>
            </StageInfo>
            <DropItemsInfo direction="column" alignItems="flex-start">
              <Text color="main" code="t2">{gameData.msg.title?.['dropItem']?.[lang] || "Drop Item"}:</Text>
              <Text color="main" code="t1">({gameData.msg.title?.['dropFirst']?.[lang] || "First Time Only"})</Text>
              <DropItems justifyContent="flex-start">
                {stageData.drop?.first[selectDifficult]?.map((dropFirst, dropFirstIdx) => {
                  if (dropFirst.type === 'Gold') {
                    return <ItemLayout 
                      gameItem={gameData.items}
                      icon={{
                        type: "etc",
                        pic: "itemEtc",
                        idx: 0,
                      }}
                      size="15%"
                      key={`dropFirst${dropFirstIdx}`} 
                      text={dropFirst.num}
                      grade={0}
                      onClick={(e) => {
                        setTooltipPos(e.target.getBoundingClientRect());
                        setTooltip([gameData.msg.title?.['gold']?.[lang] || "Gold", util.comma(dropFirst.num), gameData.msg.title?.['firstGet']?.[lang] || "First time obtain"]);
                        setTooltipOn(true);
                      }}/>
                  } else if (dropFirst.type === 'Equip' && typeof dropFirst.idx === 'string'){
                    const itemSeparate = dropFirst.idx.split('-');
                    const dropType = dropFirst.type.toLowerCase(),
                      items = gameData.items?.[dropType]?.[itemSeparate[0]]?.[itemSeparate[1]]?.[itemSeparate[2]]?.[itemSeparate[3]];
                    if (!items) return null;
                    return <ItemLayout 
                      gameItem={gameData.items}
                      icon={{
                        type: {dropType},
                        pic: "itemEtc",
                        idx: items.display,
                      }}
                      size="15%"
                      key={`dropFirst${dropFirstIdx}`}
                      grade={dropFirst.grade}
                      onClick={(e) => {
                        setTooltipPos(e.target.getBoundingClientRect());
                        setTooltip([items.na?.[lang] || "", '', gameData.msg.title?.['firstGet']?.[lang] || "First time obtain"]);
                        setTooltipOn(true);
                    }}/>
                  } else if (dropFirst.type === 'Etc') {
                    const dropType = dropFirst.type.toLowerCase(),
                      items = gameData.items?.[dropType]?.[dropFirst.idx];
                    if (!items) return null;
                    return <ItemLayout 
                      gameItem={gameData.items}
                      icon={{
                        type: dropType,
                        pic: "itemEtc",
                        idx: items.display,
                      }}
                      size="15%"
                      key={`dropFirst${dropFirstIdx}`} 
                      text={items.displayText}
                      grade={items.grade}
                      onClick={(e) => {
                        setTooltipPos(e.target.getBoundingClientRect());
                        setTooltip([items.na?.[lang] || "", '', gameData.msg.title?.['firstGet']?.[lang] || "First time obtain"]);
                        setTooltipOn(true);
                    }}/>
                  } else if (dropFirst.type === 'Material'){
                    const dropType = dropFirst.type.toLowerCase(),
                      items = gameData.items?.[dropType]?.[dropFirst.idx];
                    if (!items) return null;
                    return <ItemLayout 
                      gameItem={gameData.items}
                      icon={{
                        type: {dropType},
                        pic: "itemEtc",
                        idx: items.display,
                      }}
                      size="15%"
                      key={`dropFirst${dropFirstIdx}`} 
                      text={dropFirst.num}
                      grade={items.grade}
                      onClick={(e) => {
                        setTooltipPos(e.target.getBoundingClientRect());
                        setTooltip([items.na?.[lang] || "", dropFirst.num, gameData.msg.title?.['firstGet']?.[lang] || "First time obtain"]);
                        setTooltipOn(true);
                    }}/>
                  } else if (dropFirst.type === 'Upgrade'){
                    const dropType = dropFirst.type.toLowerCase(),
                      items = gameData.items?.[dropType]?.[dropFirst.idx];
                    if (!items) return null;
                    return <ItemLayout 
                      gameItem={gameData.items}
                      icon={{
                        type: {dropType},
                        pic: "itemEtc",
                        idx: items.display,
                      }}
                      size="15%"
                      key={`dropFirst${dropFirstIdx}`} 
                      text={dropFirst.num}
                      grade={items.grade}
                      onClick={(e) => {
                        setTooltipPos(e.target.getBoundingClientRect());
                        setTooltip([items.na?.[lang] || "", '', gameData.msg.title?.['firstGet']?.[lang] || "First time obtain"]);
                        setTooltipOn(true);
                    }}/>
                  } else if (dropFirst.type === 'Hole'){
                    const dropType = dropFirst.type.toLowerCase(),
                      items = gameData.items?.[dropType]?.[dropFirst.idx];
                    if (!items) return null;
                    return <ItemLayout 
                      gameItem={gameData.items}
                      icon={{
                        type: {dropType},
                        pic: "itemEtc",
                        idx: items.display,
                      }}
                      size="15%"
                      key={`dropFirst${dropFirstIdx}`}
                      grade={items.grade}
                      onClick={(e) => {
                        setTooltipPos(e.target.getBoundingClientRect());
                        setTooltip([items.na?.[lang] || "", '', gameData.msg.title?.['firstGet']?.[lang] || "First time obtain"]);
                        setTooltipOn(true);
                    }}/>
                  } else {
                    return '';
                  }
                })}
              </DropItems>
              <Hr />
              <DropItems justifyContent="flex-start">
                {stageData.drop?.always[selectDifficult]?.map((dropAlways, dropAlwaysIdx) => {
                  if (dropAlways.type === 'Gold') {
                    return <ItemLayout 
                      gameItem={gameData.items}
                      icon={{
                        type: "etc",
                        pic: "itemEtc",
                        idx: 0,
                      }}
                      size="15%"
                      key={`dropAlways${dropAlwaysIdx}`}
                      text={dropAlways.num}
                      grade={0}
                      onClick={(e) => {
                        setTooltipPos(e.target.getBoundingClientRect());
                        setTooltip([gameData.msg.title?.['gold']?.[lang] || "Gold", util.comma(dropAlways.num), '100%']);
                        setTooltipOn(true);
                    }}/>
                  } else if (dropAlways.type === 'Equip' && typeof dropAlways.idx === 'string'){
                    const itemSeparate = dropAlways.idx.split('-');
                    const items = gameData.items?.[dropAlways.type.toLowerCase()]?.[itemSeparate[0]]?.[itemSeparate[1]]?.[itemSeparate[2]]?.[itemSeparate[3]];
                    if (!items) return null;
                    return <ItemLayout 
                      gameItem={gameData.items}
                      icon={{
                        type: "equip",
                        pic: "equip",
                        idx: items.display,
                      }}
                      size="15%"
                      key={`dropAlways${dropAlwaysIdx}`}
                      grade={dropAlways.grade}
                      onClick={(e) => {
                        setTooltipPos(e.target.getBoundingClientRect());
                        setTooltip([items.na?.[lang] || "", '', dropAlways.percent ? `${dropAlways.percent * 100}%` : '100%']);
                        setTooltipOn(true);
                    }}/>
                  } else if (dropAlways.type === 'Etc') {
                    const dropType = dropAlways.type.toLowerCase(),
                      items = gameData.items?.[dropType]?.[dropAlways.idx];
                    if (!items) return null;
                    return <ItemLayout 
                      gameItem={gameData.items}
                      icon={{
                        type: dropType,
                        pic: "itemEtc",
                        idx: items.display,
                      }}
                      size="15%"
                      key={`dropAlways${dropAlwaysIdx}`}
                      text={items.displayText}
                      grade={items.grade}
                      onClick={(e) => {
                        setTooltipPos(e.target.getBoundingClientRect());
                        setTooltip([items.na?.[lang] || "", '', dropAlways.percent ? `${dropAlways.percent * 100}%` : '100%']);
                        setTooltipOn(true);
                    }}/>
                  } else if (dropAlways.type === 'Material'){
                    const dropType = dropAlways.type.toLowerCase(),
                      items = gameData.items?.[dropType]?.[dropAlways.idx];
                    if (!items) return null;
                    return <ItemLayout 
                      gameItem={gameData.items}
                      icon={{
                        type: dropType,
                        pic: "itemEtc",
                        idx: items.display,
                      }}
                      size="15%"
                      key={`dropAlways${dropAlwaysIdx}`}
                      text={dropAlways.num}
                      grade={items.grade}
                      onClick={(e) => {
                        setTooltipPos(e.target.getBoundingClientRect());
                        setTooltip([items.na?.[lang] || "", dropAlways.num, dropAlways.percent ? `${dropAlways.percent * 100}%` : '100%']);
                        setTooltipOn(true);
                    }}/>
                  } else if (dropAlways.type === 'Upgrade'){
                    const dropType = dropAlways.type.toLowerCase(),
                      items = gameData.items?.[dropType]?.[dropAlways.idx];
                    if (!items) return null;
                    return <ItemLayout 
                      gameItem={gameData.items}
                      icon={{
                        type: dropType,
                        pic: "itemEtc",
                        idx: items.display,
                      }}
                      size="15%"
                      key={`dropAlways${dropAlwaysIdx}`}
                      grade={items.grade}
                      onClick={(e) => {
                        setTooltipPos(e.target.getBoundingClientRect());
                        setTooltip([items.na?.[lang] || "", '', dropAlways.percent ? `${dropAlways.percent * 100}%` : '100%']);
                        setTooltipOn(true);
                    }}/>
                  } else if (dropAlways.type === 'Hole'){
                    const dropType = dropAlways.type.toLowerCase(),
                      items = gameData.items?.[dropType]?.[dropAlways.idx];
                    if (!items) return null;
                    return <ItemLayout 
                      gameItem={gameData.items}
                      icon={{
                        type: dropType,
                        pic: "itemEtc",
                        idx: items.display,
                      }}
                      size="15%"
                      key={`dropAlways${dropAlwaysIdx}`}
                      grade={items.grade}
                      onClick={(e) => {
                        setTooltipPos(e.target.getBoundingClientRect());
                        setTooltip([items.na?.[lang] || "", '', dropAlways.percent ? `${dropAlways.percent * 100}%` : '100%']);
                        setTooltipOn(true);
                    }}/>
                  } else {
                    return '';
                  }
                })}
              </DropItems>
            </DropItemsInfo>
          </StageInfoWrap>
        </StageDetail>
      </ScenarioStage>
    })}
  </ScenarioContainer>
}
const Scenario = ({
  saveData,
  changeSaveData,
  stay,
  selectScenario,
  setSelectScenario,
}) => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const lang = React.useMemo(() => {
    return context.setting.lang;
  }, [context]);
  const imgSet = React.useMemo(() => {
    return context.images;
  }, [context]);
  const gameData = React.useMemo(() => {
    return context.gameData;
  }, [context]);
  const [tooltipOn, setTooltipOn] = useState(false);
  const [tooltip, setTooltip] = useState('');
  const [tooltipPos, setTooltipPos] = useState([0,0]);
  const [popupOn, setPopupOn] = useState(false);
  const [popupInfo, setPopupInfo] = useState({});
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");
  const [scenarioData, setScenarioData] = useState([]);
  const hasPeriodScenario = React.useMemo(() => {
    let slotIdx = 0;
    return saveData.ch.reduce((acc, sData) => {
      const regionList = gameData.ch[sData.idx].scenarioRegion;
      if (regionList && regionList.length > 0) {
        regionList.forEach((sData_, idx) => {
          if (sData_.indexOf(stay) >= 0) {
            acc.push({
              slotIdx: slotIdx,
              scenarioIdx: idx,
              data: sData_,
            });
          }
        })
      }
      slotIdx ++;
      return acc;
    }, []);
  }, [saveData]);
  console.log(hasPeriodScenario);
  useEffect(() => {
    setScenarioData(gameData.scenario[stay]);
  }, [gameData]);
  return (
    <>
      <Wrap direction="column">
        <GuideQuestion size={20} pos={["right","top"]} colorSet={"black"} onclick={() => {
          setPopupOn(true);
          setPopupInfo({
            data: gameData.guide?.['scenarioHero'],
          });
        }} />
        <ScrollWrap className="scroll-y">
          {hasPeriodScenario.length === 0 ? <FlexBox justifyContent={"center"} alignItems={"center"}>
            <Text code="t2" color="main" weight="600">{gameData?.msg?.sentence?.nodata_scenario?.[lang]}</Text>
          </FlexBox> : 
          <CountryContainer>
            {hasPeriodScenario.map((scenarioData, scenarioIdx) => {
              const scenarioInfo = scenarioData.data.split("-");
              const stayKey = typeof stay === 'string' ? stay.replace(/[0-9]/g, "") : "";
              const dynastyScenario = gameData.scenario?.[scenarioInfo[0]]?.[scenarioInfo[1]],
                scenarioList = dynastyScenario?.scenarioList?.[scenarioInfo[2]],
                saveStage = saveData.scenario?.[stayKey]?.[scenarioInfo[1]]?.scenarioList?.[scenarioInfo[2]],
                stageDifficult = saveStage?.heroNum;
              return <CountryScenario key={`countryData${scenarioIdx}`}>
                <CountryPeriod btnBack={imgSet.button?.btnLD}>{gameData.msg.regions?.[dynastyScenario?.name]?.[lang] || ""}</CountryPeriod>
                {stageDifficult >= 0 && <ScenarioList navigate={navigate} gameData={gameData} saveData={saveData} slotIdx={scenarioData.slotIdx} chScenarioIdx={scenarioData.scenarioIdx} changeSaveData={changeSaveData} stay={stay} dynastyIdx={scenarioInfo[1]} dynastyScenarioIdx={scenarioInfo[2]} dynastyScenario={scenarioList} imgSet={imgSet} selectScenario={selectScenario} setSelectScenario={setSelectScenario} setTooltip={setTooltip} setTooltipOn={setTooltipOn} setTooltipPos={setTooltipPos} setMsg={setMsg} setMsgOn={setMsgOn} lang={lang} />
                }
              </CountryScenario>
            })}
          </CountryContainer>}
        </ScrollWrap>
      </Wrap>
			<TooltipContainer>
				{tooltipOn && <Tooltip pos={tooltipPos} text={tooltip} showTooltip={setTooltipOn} />}
			</TooltipContainer>
      <PopupContainer>
        {popupOn && <Popup type={'guide'} dataObj={popupInfo} showPopup={setPopupOn} />}
      </PopupContainer>
      <MsgContainer>
        {msgOn && <Msg text={msg} showMsg={setMsgOn}></Msg>}
      </MsgContainer>
    </>
  )
}

export default Scenario;