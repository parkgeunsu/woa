import { Text } from 'components/Atom';
import { FlexBox } from 'components/Container';
import { ChPic } from 'components/ImagePic';
import InfoGroup from 'components/InfoGroup';
import { util } from 'components/Libs';
import Popup from 'components/Popup';
import PopupContainer from 'components/PopupContainer';
import { AppContext } from 'contexts/app-context';
import React, { useCallback, useContext, useState } from 'react';
import styled from 'styled-components';

const Wrap = styled(FlexBox)`
  position: absolute;
  top: 0;
  padding: 25px 20px 20px;
  box-sizing: border-box;
`;
const RelationWrap = styled.div``;
const RelationName = styled(Text)`
  width: 100%;
  text-align: left;
`;
const RelationTxt = styled(Text)`
  padding: 0 10px;
  width: 100%;
  &.hide {
    display: none;
  }
`;
const RelationMember = styled(FlexBox)`
  margin: 10px 0 0 0;
  height: auto;
`;
const ChBox = styled.div`
  position: relative;
  width: 40px;
  padding-top: 40px;
  border-radius: 10%;
  overflow: hidden;
  box-sizing: border-box;
  z-index: 1;
  filter: grayscale(100%) brightness(.4);
  &:last-of-type{
    margin:0;
  }
  ${({active}) => active ? `
    filter: grayscale(0);
    box-shadow: 0 0 10px #fff;
  ` : ""}
`;
const RtComplete = styled(Text)`
  position: absolute;
  left: -17px;
  bottom: -10px;
  width: 60px;
  height: 60px;
  border: 4px solid #f00;
  text-align: center;
  line-height: 52px;
  overflow: hidden;
  box-sizing: border-box;
  transform: rotate(-35deg);
`;
const CardCh = styled.span`
  position:absolute;
	left: -15%;
	top: -15%;
	width: 130%;
	height: 130%;
`;
const ChRelation = styled.div`
  position: relative;
`;
const ChDescription = styled(Text)`
  padding: 10px;
  text-align: left;
`;
const Relations = styled(FlexBox)`
  position: relative;
  margin: 0 auto;
  padding: 10px;
  width: calc(100% - 20px);
  border: 3px double rgba(255,255,255,.5);
  border-radius: 5px;
  background: rgba(0,0,0,.5);
  overflow: hidden;
  box-sizing: border-box;
`;
const Relation = styled(FlexBox)`
  position: relative;
  margin: 0 0 15px 0;
  &:last-of-type {
    margin: 0;
  }
`;
const CharacterRelation = ({
  saveData,
  slotIdx,
}) => {
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
  const saveCh = React.useMemo(() => saveData.ch?.[slotIdx] || {}, [saveData, slotIdx]);
  const chData = React.useMemo(() => gameData.ch?.[saveCh.idx], [gameData, saveCh]);
  const [popupOn, setPopupOn] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [popupInfo, setPopupInfo] = useState({});
  const chRelation = React.useMemo(() => chData.relation, [chData]);
  
  const relationStatus = React.useMemo(() => {
    if (!chRelation || !gameData.relation) return [];
    
    return chRelation.map((rtIdx) => {
      const relationData = gameData.relation[rtIdx];
      if (!relationData || !relationData.member) return { members: [], isAllComplete: false };
      
      const memberStatus = relationData.member.map((memberIdx) => {
        const hasMember = saveData.ch?.some(saveCh => saveCh.idx === memberIdx);
        return {
          idx: memberIdx,
          chData: gameData.ch?.[memberIdx],
          hasMember
        };
      });
      
      const isAllComplete = memberStatus.every(m => m.hasMember);
      
      return {
        id: rtIdx,
        data: relationData,
        memberStatus,
        isAllComplete
      };
    });
  }, [chRelation, gameData, saveData.ch]);

  const chScenario = React.useMemo(() => chData.scenarioRegion, [chData]);
  const [openStages, setOpenStages] = useState({});

  const toggleStage = useCallback((scIdx, sIdx) => {
    setOpenStages((prev) => ({
      ...prev,
      [`${scIdx}_${sIdx}`]: !prev[`${scIdx}_${sIdx}`]
    }));
  }, []);

  return (
    <>
      <Wrap className="relation">
        <InfoGroup pointTitle={chData?.na1[lang]} title={`${gameData?.msg?.grammar?.conjunction[lang]} ${gameData?.msg?.menu?.relation[lang]}`} guideClick={() => {
          setPopupType('guide');
          setPopupOn(true);
          setPopupInfo({
            data: gameData?.guide?.["characterRelation"],
            lang: lang,
          });
        }}>
          <RelationWrap className="scroll-y">
            <ChRelation direction="column" justifyContent="flex-start">
              <Relations direction="column">
                {relationStatus.length > 0 ? relationStatus.map((rtStatus) => {
                  const { skillText } = util.getSkillText({
                    skill: rtStatus.data,
                    lv: 0,
                    lang: lang,
                  });
                  return (
                    <Relation direction="column" key={`chRelation_${rtStatus.id}`}>
                      <RelationName code="t2" color="main" weight="600">{rtStatus.data?.na?.[lang]}</RelationName>
                      <RelationTxt code="t1" color="main" align="left" dangerouslySetInnerHTML={{ __html: skillText }}>
                      </RelationTxt>
                      <RelationMember>
                        {rtStatus.memberStatus.map((mStatus, idx_) => (
                          mStatus.chData && (
                            <div key={`relationMember_${mStatus.idx}`} style={{ margin: "0 10px 0 0" }}>
                              <ChBox active={mStatus.hasMember}>
                                <CardCh>
                                  <ChPic isThumb={true} pic={`chs${mStatus.chData.display}`} />
                                </CardCh>
                              </ChBox>
                              {rtStatus.isAllComplete && <RtComplete color="red" code="t4" weight="600">ALL</RtComplete>}
                            </div>
                          )
                        ))}
                      </RelationMember>
                    </Relation>
                  );
                }) : (
                  <Text code="t1" color="main" weight="600">{gameData?.msg?.sentence?.nodata_relation?.[lang]}</Text>
                )}
              </Relations>
              <Relations style={{ margin: "10px auto 0"}} direction="column">
                {chScenario ? chScenario.map((scPath, scIdx) => {
                  const scenarioData = scPath.split("-");
                  const scenarioInfo = gameData?.scenario?.[scenarioData[0]]?.[scenarioData[1]]?.scenarioList?.[scenarioData[2]];
                  
                  if (!scenarioInfo) return null;

                  return (
                    <Relation direction="column" key={`relations_${scPath}`}>
                      <RelationName code="t2" color="main" weight="600">{scenarioInfo.name?.[lang]}</RelationName>
                      {scenarioInfo.stage?.map((stageData, sIdx) => {
                        const isOpen = !!openStages[`${scIdx}_${sIdx}`];
                        return (
                          <FlexBox direction="column" key={`scenarioInfo_${sIdx}`}>
                            <RelationTxt 
                              code="t2" 
                              color="main" 
                              align="left" 
                              onClick={() => toggleStage(scIdx, sIdx)}
                            >
                              {sIdx + 1}. {stageData.title?.[lang]}
                            </RelationTxt>
                            {isOpen && (
                              <RelationTxt 
                                style={{margin: "0 0 10px 0"}} 
                                code="t1" 
                                color="grey" 
                                align="left" 
                                onClick={() => toggleStage(scIdx, sIdx)}
                              >
                                {stageData.history?.[lang]}
                              </RelationTxt>
                            )}
                          </FlexBox>
                        )
                      })}
                    </Relation>
                  )
                }) :
                <Text code="t1" color="main" weight="600">{gameData?.msg?.sentence?.nodata_scenario?.[lang]}</Text>}
              </Relations>
              <ChDescription code="t1" color="main" isDynamic={true}>
                {chData?.txt[lang]}
              </ChDescription>
            </ChRelation>
          </RelationWrap>
        </InfoGroup>
      </Wrap>
      <PopupContainer>
        {popupOn && <Popup type={popupType} dataObj={popupInfo} showPopup={setPopupOn} />}
      </PopupContainer>
    </>
  );
}

export default CharacterRelation;
