import { AppContext } from 'App';
import { Text } from 'components/Atom';
import { FlexBox } from 'components/Container';
import { ChPic } from 'components/ImagePic';
import InfoGroup from 'components/InfoGroup';
import { util } from 'components/Libs';
import Popup from 'components/Popup';
import PopupContainer from 'components/PopupContainer';
import React, { useContext, useState } from 'react';
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
  div {
    text-align: left;
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
const ChRelation = styled(FlexBox)`
`;
const ChDescription = styled(Text)`
  padding: 10px;
  text-align: left;
`;
const Relations = styled(FlexBox)`
  position: relative;
  margin: 0 0 5px;
  padding: 5px 10px;
  width: calc(100% - 20px);
  height: auto;
  border: 3px double rgba(255,255,255,.5);
  border-radius: 5px;
  background: rgba(0,0,0,.5);
  overflow: hidden;
  box-sizing: border-box;
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
  const saveCh = React.useMemo(() => saveData.ch[slotIdx], [saveData, slotIdx]);
  const chData = React.useMemo(() => gameData.ch[saveCh.idx], [gameData, saveCh]);
  const [popupOn, setPopupOn] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [popupInfo, setPopupInfo] = useState({});
  const chRelation = React.useMemo(() => chData.relation, [chData]);
  const relationAll = React.useMemo(() => {
    return chRelation.map((rtIdx, idx) => {
      return Array.from({length: gameData.relation[rtIdx].member.length}, () => false);
    });
  }, [chRelation, gameData]);
  
  return (
    <>
      <Wrap className="relation">
        <InfoGroup pointTitle={chData.na1} title={`${gameData.msg.grammar.conjunction[lang]} ${gameData.msg.menu.relation[lang]}`} guideClick={() => {
          setPopupType('guide');
          setPopupOn(true);
          setPopupInfo({
            data:gameData.guide["characterRelation"],
            lang:lang,
          });
        }}>
          <RelationWrap className="scroll-y">
            <ChRelation direction="column" justifyContent="flex-start">
              {chRelation && chRelation.map((rtData, idx) => {
                const relationData = gameData.relation[rtData];
                const {skillText} = util.getSkillText({
                  skill: relationData,
                  lv: 0,
                  lang: lang,
                });
                return (
                  <Relations direction="column" key={idx}>
                    <RelationName code="t3" color="main" weight="600">{relationData.na[lang]}</RelationName>
                    <RelationTxt code="t2" color="main">
                      <div dangerouslySetInnerHTML={{__html: skillText}}></div>
                    </RelationTxt>
                    <RelationMember>
                      {relationData.member && relationData.member.map((data, idx_) => {
                        const chData = gameData.ch[data];
                        let hasRelation = false;
                        saveData.ch.forEach((saveCh) => {
                          if (saveCh.idx === data) {
                            hasRelation = true;
                            relationAll[idx][idx_] = true;
                          }
                        });
                        let rtAll = true;
                        relationAll[idx].forEach((rtData) => {
                          if (rtData === false) {
                            rtAll = false;
                          }
                        });
                        return (
                          chData && (
                            <div key={idx_} style={{
                              margin: "0 10px 0 0",
                            }}>
                              <ChBox active={hasRelation}>
                                <CardCh>
                                  <ChPic isThumb={true} pic="ch" idx={chData.display} />
                                </CardCh>
                              </ChBox>
                              {rtAll && <RtComplete color="red" code="t4" weight="600">ALL</RtComplete>}
                            </div>
                          )
                        )
                      })}
                    </RelationMember>
                  </Relations>
                )
              })}
              <ChDescription code="t3" color="main">
                {chData.txt}
              </ChDescription>
            </ChRelation>
          </RelationWrap>
        </InfoGroup>
      </Wrap>
      <PopupContainer>
        {popupOn && <Popup type={popupType} dataObj={popupInfo} showPopup={setPopupOn} imgSet={imgSet} />}
      </PopupContainer>
    </>
  );
}

export default CharacterRelation;
