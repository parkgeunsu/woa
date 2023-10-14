import { AppContext } from 'App';
import { Text } from 'components/Atom';
import { FlexBox } from 'components/Container';
import GuideQuestion from 'components/GuideQuestion';
import { IconPic, ItemPic } from 'components/ImagePic';
import { util } from 'components/Libs';
import Popup from 'components/Popup';
import PopupContainer from 'components/PopupContainer';
import Tooltip from 'components/Tooltip';
import TooltipContainer from 'components/TooltipContainer';
import CharacterCard from 'pages/CharacterCard';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Wrap = styled(FlexBox)`
  position: absolute;
  left: 0;
  top: ${({scenario}) => scenario ? '0%' : '-100%'};
  width: 100%;
  height: ${({btnSize}) => `calc(100% - ${btnSize}px)`};
  transition: top 1s;
  z-index: 10;
  background: linear-gradient(transparent 0%, rgba(0,0,0,.8) 10%, rgba(0,0,0,.8) 90%, transparent 100%);
`;
const ScrollWrap = styled.div`
  margin: 20% 0;
  padding: 0 20px;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
`;
const CountryContainer = styled.div`
  margin:0 0 10px 0;
`;
const CountryName = styled.div`
  position: relative;
  margin: 0 0 5px 0;
  padding: 0 0 0 10px;
  font-size: ${({theme}) => theme.font.t6};
  color: ${({theme}) => theme.color.red};
  text-align: left;
  font-weight: 700;
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
  padding: 0 0 0 10px
`;
const StageName = styled(FlexBox)`
  position: relative;
  padding: 5px 10px 5px 20px;
  text-shadow: 2px 2px 1px #000;
  background: url(${({btnBack}) => btnBack}) no-repeat left center;
  background-size: 100% 100%;
  box-sizing: border-box;
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
const IconDash = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 150%;
  height: 3px;
  background: #f00;
  transform: translate(-50%, -50%) rotate(45deg);
  z-index: 2;
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
  clearIcon,
  onClick,
}) => {
  const imgSet = useContext(AppContext).images;
  return <DifficultContainer onClick={(e) => {
    e.stopPropagation();
    onClick && onClick();
  }}>
    <IconSmile selected={selected}>
      <IconPic type="scenario" pic="icon100" idx={iconIdx} />
    </IconSmile> 
    {clear && <IconClear icon={clearIcon}>
      <IconPic type="scenario" pic="icon100" idx={4} />
    </IconClear>}
    {!possibleStageNum && <IconDash />}
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
  flex-basis: 102px;
  font-size: 0;
  border: 1px solid #fff;
  box-sizing: border-box;
`;
const MapPieces = styled.div`
  display: inline-block;
  position: relative;
  width: 20px;
  height: 20px;
  background: ${({theme, mapColor}) => theme.color[`land${mapColor}`]};
  ${({enemy, idx}) => {
    return enemy && enemy.idx !== '' && idx < 25 ? `
      &:before{
        content:'';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 10px;
        height: 10px;
        background: #000;
        box-shadow: 0 0 5px #000, 0 0 10px #fff;
        border-radius: 3px;
        transform: translate(-50%, -50%);
      }
    ` : '';
  }}
  ${({ally, idx}) => {
    return typeof ally === 'number' && ally !== '' && idx >= 25 ? `
      &:before{
        content:'';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 10px;
        height: 10px;
        background: #fff;
        box-shadow: 0 0 5px #fff, 0 0 10px #000;
        border-radius: 3px;
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
  line-height: 1.5;
  border-radius: 5px;
  font-size: ${({theme}) =>  theme.font.t2};
  background: ${({theme}) => theme.color.shadowL};
`;
const difficultCurrent = (gameData, openCount) => {
  if (openCount <= gameData.possibleStageNum[0]) {
    return 0;
  } else if (openCount <= gameData.possibleStageNum[1]) {
    return 1;
  } else if (openCount <= gameData.possibleStageNum[2]) {
    return 2;
  } else {
    return 3;
  }
}
const ScenarioList = ({
  gameData,
  imgSet,
  changePage,
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
  lang,
}) => {
  const saveStage = React.useMemo(() => {
    return saveData.scenario[stay][dynastyIdx].scenarioList[dynastyScenarioIdx];
  }, [saveData, stay, dynastyIdx, dynastyScenarioIdx]);
  useEffect(() => {
    saveStage.stage.forEach((stageData) => {
      if (stageData.first) { //최초 접근인지 체크
        setNewGroup(true);
        return;
      }
    });
  }, [saveStage.stage]);
  const [isOpen, setOpen] = useState(Object.keys(selectScenario).length !== 0 ? true : false);
  const [showStageIdx, setShowStageIdx] = useState(Object.keys(selectScenario).length !== 0 ? selectScenario.stageIdx : '');
  const [newGroup, setNewGroup] = useState(false);
  const [selectDifficult, setSelectDifficult] = useState(difficultCurrent(gameData, saveStage.open));
  const stageIdxRef = useRef(0);
  const difficultRef = useRef(saveStage.open);
  const difficultClick = useCallback((possible, stageIdx, idx) => {
    if (!possible) {
      return;
    }
    const sData = {...saveData}
    sData.scenario[stay][dynastyIdx].scenarioList[dynastyScenarioIdx].stage[stageIdx].select = idx;
    changeSaveData(sData);
    setSelectScenario({
      dynastyIdx: dynastyIdx,
      dynastyScenarioIdx: dynastyScenarioIdx,
      stageIdx: stageIdxRef.current,
      stageDifficult: idx,
    });
    setSelectDifficult(idx);
  }, [saveData, stay, dynastyIdx, dynastyScenarioIdx, stageIdxRef]);
  return <ScenarioContainer>
    <ScenarioNameBox justifyContent="flex-start" onClick={() => {
        setOpen(prev => !prev);
        setShowStageIdx('');
      }}>
      <ScenarioName btnBack={imgSet.button.btnM}>
        <StageNewIcon>
          <IconPic type="scenario" pic="icon100" idx={6} />
        </StageNewIcon>
        {dynastyScenario.name[lang]}
      </ScenarioName>
      <DropDownArrow btnBack={imgSet.button.btnArrowL}  isOpen={isOpen} />
      <ScenarioCards code="t5">
        <CardContainer>
          <CharacterCard usedType="thumb" noInfo={true} saveData={saveData} gameData={gameData} slotIdx={0} />
        </CardContainer>
        <Text code="t5" color="main">{`x ${difficultRef.current}`}</Text>
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
      return <ScenarioStage key={`stageData${stageIdx}`}>
        <StageName key={`stageData${stageIdx}`} btnBack={imgSet.button.btnLL} justifyContent={'space-between'} onClick={() => {
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
            });
          }
          setShowStageIdx(prev => prev === stageIdx ? '' : stageIdx);
        }}>
          <StageNewIcon>
            <IconPic type="scenario" pic="icon100" idx={6} />
          </StageNewIcon>
          <StageTitle alignItems={'center'} justifyContent={'flex-start'}>{stageData.title[lang]}</StageTitle>
          {stageIdx === showStageIdx && <StageDifficult>
            {gameData.possibleStageNum.map((possibleStage, possibleIdx) => {
              return (
                <DifficultIcon key={`possibleStage${possibleIdx}`} 
                  selected={saveStage.stage[stageIdx].select === possibleIdx}
                  clear={saveStage.stage[stageIdx].clear[possibleIdx]}
                  possibleStageNum={difficultRef.current >= possibleStage}
                  iconIdx={possibleIdx}
                  clearIcon={imgSet.icon.iconCrown}
                  onClick={(e) => {
                    difficultClick(difficultRef.current >= possibleStage, stageIdx, possibleIdx);
                  }}
                />
              )
            })}
          </StageDifficult>}
        </StageName>
        <StageDetail isShow={showStageIdx === stageIdx}>
          <StageInfoWrap direction="column">
            <StageInfo justifyContent="flex-start" alignItems="flex-start">
              <StageMap onClick={() => {
                util.saveHistory(() => {
                  util.saveData('historyParam', {
                    ...util.loadData('historyParam'),
                    scenario: selectScenario
                  });
                  changePage('cardPlacement');
                  navigate('cardPlacement');
                });//히스토리 저장
              }}>
              {stageData.map.map((mapData, mapIdx) => {
                return <MapPieces key={`map${mapIdx}`} idx={mapIdx} enemy={stageData.entry[mapIdx]} ally={mapIdx >= 25 && saveData.lineup.save_slot[saveData.lineup.select].entry[mapIdx - 25]} mapColor={mapData} />
              })}
              </StageMap>
              <StageLvHistory direction="column">
                <StageLv direction="column" alignItems="flex-start">
                  <Text color="main" code="t3">{gameData.msg.title['wildlife'][lang]}: {stageInfo.nums}</Text>
                  <Text color="main" code="t3">{gameData.msg.title['animals'][lang]} Lv: {stageInfo.minLv === stageInfo.maxLv ? `${stageInfo.minLv}` : `${stageInfo.minLv} - ${stageInfo.maxLv}`}</Text>
                </StageLv>
                <StageHistory className="scroll-y">
                  {stageData.history[lang]}
                </StageHistory>
              </StageLvHistory>
            </StageInfo>
            <DropItemsInfo direction="column" alignItems="flex-start">
              <Text color="main" code="t2">{gameData.msg.title['dropItem'][lang]}:</Text>
              <Text color="main" code="t1">({gameData.msg.title['dropFirst'][lang]})</Text>
              <DropItems justifyContent="flex-start">
                {stageData.drop?.first[selectDifficult]?.map((dropFirst, dropFirstIdx) => {
                  if (dropFirst.type === 'Gold') {
                    return <span className="item_layout normal" key={`dropFirst${dropFirstIdx}`} onClick={(e) => {
                      setTooltipPos(e.target.getBoundingClientRect());
                      setTooltip([gameData.msg.title['gold'][lang], util.comma(dropFirst.num), gameData.msg.title['firstGet'][lang]]);
                      setTooltipOn(true);
                    }}>
                      <ItemPic className="pic" pic="itemEtc" type="etc" idx={0}>
                        {<span className="display_text">{dropFirst.num}</span>}
                      </ItemPic>
                    </span>
                  } else if (dropFirst.type === 'Equip'){
                    const itemSeparate = dropFirst.idx.split('-');
                    const items = gameData.items[dropFirst.type.toLowerCase()][itemSeparate[0]][itemSeparate[1]][itemSeparate[2]][itemSeparate[3]];
                    return <span className={`item_layout ${gameData.itemGrade.txt_e[dropFirst.grade].toLowerCase()}`} key={`dropFirst${dropFirstIdx}`} onClick={(e) => {
                      setTooltipPos(e.target.getBoundingClientRect());
                      setTooltip([items.na[lang], '', gameData.msg.title['firstGet'][lang]]);
                      setTooltipOn(true);
                    }}>
                      <span className="pic">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[items.display], items.color, items.svgColor || items.id)}}>
                        </svg>
                      </span>
                      <ItemPic className="pic" pic="itemEtc" type={dropFirst.type} idx={items.display} />
                    </span>
                  } else if (dropFirst.type === 'Etc') {
                    const items = gameData.items[dropFirst.type.toLowerCase()][dropFirst.idx];
                    return <span className={`item_layout ${gameData.itemGrade.txt_e[items.grade].toLowerCase()}`} key={`dropFirst${dropFirstIdx}`} onClick={(e) => {
                      setTooltipPos(e.target.getBoundingClientRect());
                      setTooltip([items.na[lang], '', gameData.msg.title['firstGet'][lang]]);
                      setTooltipOn(true);
                    }}>
                      <ItemPic className="pic" pic="itemEtc" type={dropFirst.type} idx={items.display}>
                        {items.displayText && <span className="display_text">{items.displayText}</span>}
                      </ItemPic>
                    </span>
                  } else if (dropFirst.type === 'Material'){
                    const items = gameData.items[dropFirst.type.toLowerCase()][dropFirst.idx];
                    return <span className={`item_layout ${gameData.itemGrade.txt_e[items.grade].toLowerCase()}`} key={`dropFirst${dropFirstIdx}`} onClick={(e) => {
                      setTooltipPos(e.target.getBoundingClientRect());
                      setTooltip([items.na[lang], dropFirst.num, gameData.msg.title['firstGet'][lang]]);
                      setTooltipOn(true);
                    }}>
                      <ItemPic className="pic" pic="itemEtc" type={dropFirst.type} idx={items.display}>
                        {<span className="display_text">{dropFirst.num}</span>}
                      </ItemPic>
                    </span>
                  } else if (dropFirst.type === 'Upgrade'){
                    const items = gameData.items[dropFirst.type.toLowerCase()][dropFirst.idx];
                    return <span className={`item_layout ${gameData.itemGrade.txt_e[items.grade].toLowerCase()}`} key={`dropFirst${dropFirstIdx}`} onClick={(e) => {
                      setTooltipPos(e.target.getBoundingClientRect());
                      setTooltip([items.na[lang], '', gameData.msg.title['firstGet'][lang]]);
                      setTooltipOn(true);
                    }}>
                      <ItemPic className="pic" pic="itemEtc" type={dropFirst.type} idx={items.display} />
                    </span>
                  } else if (dropFirst.type === 'Hole'){
                    const items = gameData.items[dropFirst.type.toLowerCase()][dropFirst.idx];
                    return <span className={`item_layout ${gameData.itemGrade.txt_e[items.grade].toLowerCase()}`} key={`dropFirst${dropFirstIdx}`} onClick={(e) => {
                      setTooltipPos(e.target.getBoundingClientRect());
                      setTooltip([items.na[lang], '', gameData.msg.title['firstGet'][lang]]);
                      setTooltipOn(true);
                    }}>
                      <ItemPic className="pic" pic="itemEtc" type={dropFirst.type} idx={items.display} />
                    </span>
                  } else {
                    return '';
                  }
                })}
              </DropItems>
              <Hr />
              <DropItems justifyContent="flex-start">
                {stageData.drop?.always[selectDifficult]?.map((dropAlways, dropAlwaysIdx) => {
                  if (dropAlways.type === 'Gold') {
                    return <span className="item_layout normal" key={`dropAlways${dropAlwaysIdx}`} onClick={(e) => {
                      setTooltipPos(e.target.getBoundingClientRect());
                      setTooltip([gameData.msg.title['gold'][lang], util.comma(dropAlways.num), '100%']);
                      setTooltipOn(true);
                    }}>
                      <ItemPic className="pic" pic="itemEtc" type="etc"
                       idx={0}>
                        {<span className="display_text">{dropAlways.num}</span>}
                      </ItemPic>
                    </span>
                  } else if (dropAlways.type === 'Equip'){
                    const itemSeparate = dropAlways.idx.split('-');
                    const items = gameData.items[dropAlways.type.toLowerCase()][itemSeparate[0]][itemSeparate[1]][itemSeparate[2]][itemSeparate[3]];
                    return <span className={`item_layout ${gameData.itemGrade.txt_e[dropAlways.grade].toLowerCase()}`} key={`dropAlways${dropAlwaysIdx}`} onClick={(e) => {
                      setTooltipPos(e.target.getBoundingClientRect());
                      setTooltip([items.na[lang], '', dropAlways.percent ? `${dropAlways.percent * 100}%` : '100%']);
                      setTooltipOn(true);
                    }}>
                      <span className="pic">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[items.display], items.color, items.svgColor || items.id)}}>
                        </svg>
                      </span>
                    </span>
                  } else if (dropAlways.type === 'Etc') {
                    const items = gameData.items[dropAlways.type.toLowerCase()][dropAlways.idx];
                    return <span className={`item_layout ${gameData.itemGrade.txt_e[items.grade].toLowerCase()}`} key={`dropAlways${dropAlwaysIdx}`} onClick={(e) => {
                      setTooltipPos(e.target.getBoundingClientRect());
                      setTooltip([items.na[lang], '', dropAlways.percent ? `${dropAlways.percent * 100}%` : '100%']);
                      setTooltipOn(true);
                    }}>
                      <ItemPic className="pic" pic="itemEtc" type={dropAlways.type} idx={items.display}>
                        {items.displayText && <span className="display_text">{items.displayText}</span>}
                      </ItemPic>
                    </span>
                  } else if (dropAlways.type === 'Material'){
                    const items = gameData.items[dropAlways.type.toLowerCase()][dropAlways.idx];
                    return <span className={`item_layout ${gameData.itemGrade.txt_e[items.grade].toLowerCase()}`} key={`dropAlways${dropAlwaysIdx}`} onClick={(e) => {
                      setTooltipPos(e.target.getBoundingClientRect());
                      setTooltip([items.na[lang], dropAlways.num, dropAlways.percent ? `${dropAlways.percent * 100}%` : '100%']);
                      setTooltipOn(true);
                    }}>
                      <ItemPic className="pic" pic="itemEtc" type={dropAlways.type} idx={items.display}>
                        {<span className="display_text">{dropAlways.num}</span>}
                      </ItemPic>
                    </span>
                  } else if (dropAlways.type === 'Upgrade'){
                    const items = gameData.items[dropAlways.type.toLowerCase()][dropAlways.idx];
                    return <span className={`item_layout ${gameData.itemGrade.txt_e[items.grade].toLowerCase()}`} key={`dropAlways${dropAlwaysIdx}`} onClick={(e) => {
                      setTooltipPos(e.target.getBoundingClientRect());
                      setTooltip([items.na[lang], '', dropAlways.percent ? `${dropAlways.percent * 100}%` : '100%']);
                      setTooltipOn(true);
                    }}>
                      <ItemPic className="pic" pic="itemEtc" type={dropAlways.type} idx={items.display} />
                    </span>
                  } else if (dropAlways.type === 'Hole'){
                    const items = gameData.items[dropAlways.type.toLowerCase()][dropAlways.idx];
                    return <span className={`item_layout ${gameData.itemGrade.txt_e[items.grade].toLowerCase()}`} key={`dropAlways${dropAlwaysIdx}`} onClick={(e) => {
                      setTooltipPos(e.target.getBoundingClientRect());
                      setTooltip([items.na[lang], '', dropAlways.percent ? `${dropAlways.percent * 100}%` : '100%']);
                      setTooltipOn(true);
                    }}>
                      <ItemPic className="pic" pic="itemEtc" type={dropAlways.type} idx={items.display} />
                    </span>
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
  gameMode,
  saveData,
  changeSaveData,
  navigate,
  changePage,
  lang,
  stay,
  selectScenario,
  setSelectScenario,
  btnSize,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
  const [tooltipOn, setTooltipOn] = useState(false);
  const [tooltip, setTooltip] = useState('');
  const [tooltipPos, setTooltipPos] = useState([0,0]);
  const [popupOn, setPopupOn] = useState(false);
  const [popupInfo, setPopupInfo] = useState({});
  const [scenarioData, setScenarioData] = useState([]);
  useEffect(() => {
    if (gameMode === 'scenario') {
      setScenarioData(gameData.scenario[stay]);
    }
  }, [gameMode]);
  return (
    <>
      <Wrap scenario={gameMode === 'scenario'} btnSize={btnSize} direction="column">
        <GuideQuestion size={20} pos={["right","top"]} colorSet={"black"} onclick={() => {
          setPopupOn(true);
          setPopupInfo({
            data:gameData.guide['scenarioHero'],
          });
        }} />
        <ScrollWrap className="scroll-y">
          <CountryContainer>
            <CountryName>
              {gameData.msg.regions[stay][lang]}
            </CountryName>
            {scenarioData.map((dynastyData, dynastyIdx) => {
              return <CountryScenario key={`countryData${dynastyIdx}`}>
                {dynastyData.scenarioList?.length > 0 && 
                  <CountryPeriod btnBack={imgSet.button.btnLD}>{gameData.msg.regions[dynastyData.name][lang]}</CountryPeriod>}
                  {dynastyData.scenarioList?.map((dynastyScenario, dynastyScenarioIdx) => {
                    const saveStage = saveData.scenario[stay][dynastyIdx].scenarioList[dynastyScenarioIdx],
                      stageDifficult = saveStage?.open;
                    return (stageDifficult > 0 && <ScenarioList key={`scenarios${dynastyScenarioIdx}`} changePage={changePage} navigate={navigate} gameData={gameData} saveData={saveData} changeSaveData={changeSaveData} stay={stay} dynastyIdx={dynastyIdx} dynastyScenarioIdx={dynastyScenarioIdx} dynastyScenario={dynastyScenario} imgSet={imgSet} selectScenario={selectScenario} setSelectScenario={setSelectScenario} setTooltip={setTooltip} setTooltipOn={setTooltipOn} setTooltipPos={setTooltipPos} lang={lang} />)
                  })}
              </CountryScenario>
            })}
          </CountryContainer>
        </ScrollWrap>
      </Wrap>
			<TooltipContainer>
				{tooltipOn && <Tooltip pos={tooltipPos} text={tooltip} showTooltip={setTooltipOn} />}
			</TooltipContainer>
      <PopupContainer>
        {popupOn && <Popup type={'guide'} dataObj={popupInfo} showPopup={setPopupOn} lang={lang} />}
      </PopupContainer>
    </>
  )
}

export default Scenario;