import { AppContext } from 'App';
import { FlexBox } from 'components/Container';
// import { util } from 'components/Libs';
import { util } from 'components/Libs';
import { useContext, useEffect, useRef, useState } from 'react';
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
  font-size: ${({theme}) => theme.font.t4};
  color: ${({theme}) => theme.color.legend};
  text-align: left;
  &:before{
    content:'';
    position: absolute;
    left: 0;
    width: 5px;
    height: 5px;
    background: ${({theme}) => theme.color.legend};
  }
`;
const CountryScenario = styled.div`
  margin: 0 0 10px 0;
`;
const CountryPeriod = styled.div`
  padding: 0 20px;
  height: 35px;
  line-height: 35px;
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
const ScenarioName = styled.div`
  display: inline-block;
  padding: 0 20px;
  height: 35px;
  line-height: 35px;
  font-size: ${({theme}) => theme.font.t4};
  color: ${({theme}) => theme.color.yellow};
  text-shadow: 2px 2px 1px #000;
  background: url(${({btnBack}) => btnBack}) no-repeat center center;
  background-size: 100% 100%;
`;
const ScenarioStage = styled.div`
  margin: 5px 0 0 0;
  padding: 0 0 0 10px
`;
const StageName = styled.div`
  padding: 0 0 0 20px;
  height: 30px;
  line-height: 30px;
  font-size: ${({theme}) => theme.font.t2};
  color: ${({theme}) => theme.color.point1};
  text-shadow: 2px 2px 1px #000;
  background: url(${({btnBack}) => btnBack}) no-repeat left center;
  background-size: 100% 100%;
`;
const StageDetail = styled.div`
  padding: 0 10px;
  height: ${({isShow}) => isShow ? 'auto' : 0};
  overflow: hidden;
`;
const StageInfo = styled(FlexBox)`
  padding: 10px;
  border: 3px double ${({theme}) => theme.color.stageBar};
  border-top: none;
  background: ${({theme}) => theme.color.stageBack};
  box-sizing: border-box;
  color: ${({theme}) => theme.color.sub};
`;
const ScenarioList = ({
  imgSet,
  countryScenario,
  lang,
}) => {
  const [isOpen, setOpen] = useState(false);
  const [showStageIdx, setShowStageIdx] = useState('');
  return <ScenarioContainer>
    <ScenarioNameBox justifyContent="flex-start">
      <ScenarioName btnBack={imgSet.button.btnM}>{countryScenario.name[lang]}</ScenarioName>
      <DropDownArrow btnBack={imgSet.button.btnArrow}  isOpen={isOpen} onClick={() => {
        setOpen(prev => !prev);
        setShowStageIdx('');
      }}/>
    </ScenarioNameBox>
    {isOpen && countryScenario.stage.map((stageData, stageIdx) => {
      return <ScenarioStage key={`stageData${stageIdx}`}>
        <StageName key={`stageData${stageIdx}`} btnBack={imgSet.button.btnLL} onClick={() => {
          setShowStageIdx(stageIdx);
        }}>
          {stageData.title[lang]}
        </StageName>
        <StageDetail isShow={showStageIdx === stageIdx}>
          <StageInfo justifyContent="flex-start">
            난이도 쉬움, 보통, 힘듬, 매우힘듬 클리어 현황,new아이콘<br/>
            맵종류, 등장동물 lv, 
          </StageInfo>
        </StageDetail>
      </ScenarioStage>
    })}
  </ScenarioContainer>
}
const Scenario = ({
  gameMode,
  saveData,
  navigate,
  changePage,
  lang,
  btnSize,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
  const [ScenarioData, setScenarioData] = useState([]);
  const stayRef = useRef(util.loadData('saveData').info.stay);
  useEffect(() => {
    stayRef.current = util.loadData('saveData').info.stay;
    if (gameMode === 'scenario') {
      setScenarioData(gameData.scenario[stayRef.current]);
    }
  }, [gameMode]);
  return (
    <Wrap scenario={gameMode === 'scenario'} btnSize={btnSize} direction="column">
      <ScrollWrap className="scroll-y">
        {/* const scenarioPossible = saveData.scenario[stayRef.current];
        const scenarioLength = Object.keys(scenarioPossible).length !== 0;
        console.log(Object.keys(scenarioPossible).length)
        return (scenarioLength &&  */}
        <CountryContainer>
          <CountryName>
            {gameData.msg.regions[stayRef.current][lang]}
          </CountryName>
          {ScenarioData.map((countryData, countryIdx) => {
            return <CountryScenario key={`countryData${countryIdx}`}>
              {countryData.scenarioList?.length > 0 && 
                <CountryPeriod btnBack={imgSet.button.btnLD}>{gameData.msg.regions[countryData.name][lang]}</CountryPeriod>}
                {countryData.scenarioList?.map((countryScenario, countryScenarioIdx) => {
                  const stageDifficult = saveData.scenario[stayRef.current][countryIdx].scenarioList[countryScenarioIdx]?.open;
                  return (stageDifficult > 0 && <ScenarioList key={`scenarios${countryScenarioIdx}`} countryScenario={countryScenario} imgSet={imgSet} lang={lang} />)
                })}
            </CountryScenario>
          })}
        </CountryContainer>
      </ScrollWrap>
    </Wrap>
  )
}

export default Scenario;