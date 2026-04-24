import { Text } from 'components/Atom';
import { ActionChDisplay } from 'components/Components';
import { FlexBox } from 'components/Container';
import { MergedPic } from 'components/ImagePic';
import { util } from 'components/Libs';
import Msg from 'components/Msg';
import MsgContainer from 'components/MsgContainer';
import Npc from 'components/Npc';
import Popup from 'components/Popup';
import PopupContainer from 'components/PopupContainer';
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
  height: calc(45% - 10px);
  box-sizing: border-box;
  background: rgba(0,0,0,.7);
  border: 5px solid transparent;
  border-image: url(${({frameBack}) => frameBack}) 5 round;
`;
const GreetingText = styled(Text)`
	padding: 10%;
`;
const WorkHeader = styled(FlexBox)`
	height: auto;
`;
const Morality = styled(FlexBox)`
  margin: 10px 15px 0 15px;
	flex: 1;
`;
const PrisonContent = styled(FlexBox)`
	flex: 1;
	width: 100%;
	height: 100%;
	overflow: hidden;
`;
const VisitContainer = styled.div`
	position: relative;
	flex: 1;
	padding: 10px;
  width: 100%;
	height: 100%;
	box-sizing: border-box;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
`;
const CriminalContainer = styled(FlexBox)`
  display: inline-flex;
  position: relative;
  margin: 0 10px 0 0;
  width: 100%;
  height: 100%;
  &:last-of-type {
    margin: 0;
  }
`;
const CriminalText = styled(FlexBox)`
  flex: 1;
  padding: 5px;
  box-sizing: border-box;
`
const Criminal = styled(FlexBox)`
  position: relative;
  padding-top: 100%;
  width: 100%;
  height: 0;
`;
const CriminalInfo = styled(FlexBox)`
  flex: 1;
  padding: 20px 10px 5px 40px;
  width: 100%;
  border-radius: 10px;
  background: url(${({back}) => back}) no-repeat center center;
  background-size: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;
const InfoText = styled(Text)`
  margin: 5px 0 0 0;
  width: 100%
  &:last-of-type {
    margin: 5px 0 10px 0;
  }
  &:first-of-type {
    margin: 10px 0 0 0;
  }
  strong {
    color: ${({theme}) => theme.color.point2};
  }
  em {
    color: ${({theme}) => theme.color.point3};
  }
`;
const CriminalPic = styled.div`
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 50%;
`;
const CriminalName = styled(Text)`
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 6;
`;
const BackPic = styled(MergedPic)`
	position: absolute;
	inset: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
`;
const UserContainer = styled(FlexBox)`
	position: relative;
	padding: 10px 20px 0 20px;
	height: calc(25% - 10px);
	width: calc(100% - 40px);
`;
const InfoGroup = styled(FlexBox)`
	position: relative;
	flex: 1;
	margin: 0 10px 0 0;
	padding: 10px 20px;
	height: 100%;
	box-sizing: border-box;
	background: rgba(0,0,0,.8);
`;
const ItemButton = styled(FlexBox)`
	margin: 5px 0 0 0;
`;
const ActionPic = styled(FlexBox)`
	position: relative;
	width: auto;
	height: 100%;
	border-radius: 5%;
	overflow: hidden;
  box-sizing: border-box;
  background: rgb(0, 0, 0, 0.5);
  z-index: 3;
`;
const NoneChText = styled(Text)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;
const Img = styled.img.attrs(
	({imgurl}) => ({
		src: imgurl 
	})
)`
	height: 100%;
`;
const infoMake = ({
  gameData,
  ch,
  info,
  lang,
}) => {
  const infoData = info.split("_");
  switch (infoData[0]) {
    case "hasState":
      const stateIdx = infoData[1].replace(/\D/g, "");
      return gameData.msg.sentenceFn[infoData[0]](lang, gameData.msg.state[gameData.stateName[stateIdx]][lang], ch[`st${stateIdx}`]);
    case "hasJob":
      return gameData.msg.sentenceFn[infoData[0]](lang, gameData.job[infoData[1]].na[lang]);
    case "hasSkill":
      return gameData.msg.sentenceFn[infoData[0]](lang, gameData.skill[infoData[1]].na[lang]);
    default:
      return gameData.msg.sentenceFn[infoData[0]](lang, infoData[1]);
  }
}
const Prison = ({
	saveData,
	changeSaveData,
  setLoading,
}) => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [selectTab, setSelectTab] = useState("");
  const lang = React.useMemo(() => {
    return context.setting.lang;
  }, [context]);
  const imgSet = React.useMemo(() => {
    return context.images;
  }, [context]);
  const gameData = React.useMemo(() => {
    return context.gameData;
  }, [context]);
  const sData = React.useMemo(() => Object.keys(saveData).length === 0 ? util.loadData('saveData') : saveData, [saveData]);
  const [popupOn, setPopupOn] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [popupInfo, setPopupInfo] = useState({});
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");
  const entries = React.useMemo(() => {
    return sData.entry.map((entryIdx) => {
      return {
        ...sData.ch[entryIdx],
        slotIdx: entryIdx,
      };
    });
  }, [saveData]);
  const actionChIdx = React.useMemo(() => {
    if (!sData.actionCh["prison"]) return "";
    return sData.actionCh["prison"].idx <= entries.length - 1 ? sData.actionCh["prison"].idx : "";
  }, [entries, sData]);
  const saveCh = React.useMemo(() => entries[actionChIdx] || {}, [entries, actionChIdx]);
  const [greeting, setGreeting] = useState(gameData.shop.prison.greeting[lang]);
  useEffect(() => {
    setLoading(false);
  }, []);
  const stay = React.useMemo(() => sData?.info?.stay, [sData]);
  const [prisonerIdx, setPrisonerIdx] = useState(0);
  const cityNum = React.useMemo(() => util.getRegionToIdx(stay), [stay]);
  const Prisoner = React.useMemo(() => sData.city[cityNum].prison.criminal[prisonerIdx], [sData, cityNum, prisonerIdx]);
  const PrisonerData = React.useMemo(() => gameData.ch[Prisoner.ch.idx], [Prisoner, gameData]);
  useEffect(() => {
    //구속 타임 확인후 석방
    const criminal = sData.city[cityNum].prison.criminal.filter((criminal) => {
      return !util.isDelayPassed(criminal.arrestDate, criminal.sentence);
    })
    changeSaveData({
      ...sData,
      city: {
        ...sData.city,
        [cityNum]: {
          ...sData.city[cityNum],
          prison: {
            ...sData.city[cityNum].prison,
            criminal: criminal,
          }
        }
      }
    });
  }, []);
  return (
    <>
			<Wrap direction="column">
				<Npc imgSet={imgSet} shopType={'prison'} gameData={gameData} lang={lang} selectTab={selectTab} setSelectTab={setSelectTab} navigate={navigate} onClick={() => {
          setSelectTab("");
          const randomIdx = Math.floor(Math.random() * gameData.shop.prison.randomText.length);
          setGreeting(gameData.shop.prison.randomText[randomIdx][lang]);
				}} onMenuClick={(idx) => {
          changeSaveData(prev => {
            return {
              ...prev,
              actionCh: {
                ...prev.actionCh,
                prison: {
                  idx: "",
                }
              }
            }
          });
        }}/>
        <WorkArea frameBack={imgSet.etc.frameChBack}direction="column" alignItems="center" justifyContent="center">
					{selectTab === "" ? <GreetingText code="t4" color="main" wordBreak="keep-all">{greeting}</GreetingText> : <WorkHeader direction="row" justifyContent="space-between" alignItems="center">
            {selectTab === 0 && <>
              <Morality direction="row" justifyContent="space-between" alignItems="center">
                <Text font="point" lineHeight={1} className="lvupText" code="t5" color="main" weight="600">{gameData.msg.info.moral[lang]} {sData.info.morality}</Text>
              </Morality>
            </>}
          </WorkHeader>}
          {selectTab !== "" && <PrisonContent direction="row" justifyContent="center" alignItems="flex-start" onClick={() => {
          }}>
            {selectTab === 0 && <VisitContainer>
              <CriminalContainer direction="row">
                <FlexBox style={{width: "50%"}} direction="column">
                  <Criminal>
                    <CriminalPic>
                      <CharacterCard usedType="thumb" noInfo saveData={sData} gameData={gameData} saveCharacter={PrisonerData} />
                    </CriminalPic>
                    <CriminalName code="t3" color="main">{PrisonerData.na1[lang]}</CriminalName>
                    <BackPic pic="img800" idx={72} />
                  </Criminal>
                  <CriminalText direction="column" justifyContent="flex-start" alignItems="flex-start">
                    <Text code="t2" color="main">
                      {`${gameData.msg.info.bail[lang]}`}
                    </Text>
                    <Text code="t2" color="main">
                      {`${util.comma((Prisoner.crime + 1) * 10)} / ${util.comma((Prisoner.crime + 1) * PrisonerData.grade * 10000)}`}
                    </Text>
                  </CriminalText>
                </FlexBox>
                <CriminalInfo direction="column" justifyContent="flex-start" alignItems="flex-start" back={imgSet.back.talkbox}>
                  <InfoText code="t1" color="sub" font="point" lineHeight={1.1} isDynamic align="left" dangerouslySetInnerHTML={{__html: gameData.msg.sentenceFn.myCrime(lang, gameData.crime[Prisoner.crime].name[lang], util.msToDayHourMin(Prisoner.arrestDate, Prisoner.sentence, lang))}} />
                  {Prisoner.openInfo.map((infoData, infoIdx) => {
                    const info = infoMake({
                      gameData: gameData,
                      ch: Prisoner.ch,
                      info: infoData,
                      lang: lang,
                    });
                    return <InfoText code="t1" color="sub" font="point" lineHeight={1} isDynamic align="left" key={'criminalInfo' + infoIdx} dangerouslySetInnerHTML={{__html: info}} />
                  })}
                </CriminalInfo>
              </CriminalContainer>
            </VisitContainer>}
          </PrisonContent>}
        </WorkArea>
        <UserContainer justifyContent="space-between">
          <InfoGroup>
            {selectTab === 0 && <ItemButton direction="column" justifyContent="flex-end" alignItems="stretch">
              <FlexBox direction="row" justifyContent="space-between" alignItems="center">
                <button text="true" className="button_small" onClick={(e) => {
                  setPrisonerIdx(prev => {
                    if (prev - 1 < 0) {
                      return sData.city[cityNum].prison.criminal.length - 1;
                    }
                    return prev - 1;
                  });
                }}>{gameData.msg.info.previousCriminal[lang]}</button>
                {prisonerIdx + 1} / {sData.city[cityNum].prison.criminal.length}
                <button text="true" className="button_small" onClick={(e) => {
                  setPrisonerIdx(prev => {
                    if (prev + 1 > sData.city[cityNum].prison.criminal.length - 1) {
                      return 0
                    }
                    return prev + 1;
                  })
                }}>{gameData.msg.info.nextCriminal[lang]}</button>
              </FlexBox>
              <button text="true" className="button_small" onClick={(e) => {
                if(actionChIdx === "") {
                  setMsg(gameData.msg.sentence.noneSelectCh[lang]);
                  setMsgOn(true);
                  return;
                }
                if (sData.ch[actionChIdx].actionPoint >= gameData.actionPoint.usePoint.prisonInfo) {
                  sData.ch[actionChIdx].actionPoint -= gameData.actionPoint.usePoint.prisonInfo;
                } else {
                  setMsg(`<span caution>${gameData.msg.sentenceFn.lackActionPoint(lang, gameData.ch[sData.ch[actionChIdx].idx].na1[lang])}</span>`);
                  setMsgOn(true);
                  return;
                }
                const skillIdx = util.getActionTypeSkill('prison0');
                const skillLv = saveCh?.sk.find((skill) => skill.idx === skillIdx)?.lv || 0;
                const adjustedSkillLv = Math.random() < skillLv * 0.1 ? skillLv + 2 : skillLv;
                const prisonerInfo = Prisoner.info
                  .slice(5 - Math.min(adjustedSkillLv, 5))
                  .flat();
                if (prisonerInfo.length === 0) {
                  setMsg(gameData.msg.sentence.noMoreInfo[lang]);
                  setMsgOn(true);
                  changeSaveData(sData);
                  return;
                }
                const randomInfoIdx = Math.floor(Math.random() * prisonerInfo.length);
                const selectInfo = prisonerInfo[randomInfoIdx];
                changeSaveData({
                  ...sData,
                  city: {
                    ...sData.city,
                    [cityNum]: {
                      ...sData.city[cityNum],
                      prison: {
                        ...sData.city[cityNum].prison,
                        criminal: sData.city[cityNum].prison.criminal.map((criminal, idx) => {
                          if (idx === prisonerIdx) {
                            return {
                              ...criminal,
                              info: criminal.info
                                .map(arr => arr.filter(v => v !== selectInfo))
                                .filter(arr => arr.length > 0),
                              openInfo: [
                                ...criminal.openInfo,
                                selectInfo,
                              ]
                            }
                          }
                          return criminal;
                        })
                      }
                    }
                  }
                });
              }}>{gameData.msg.button.askInfo[lang]} ({gameData.actionPoint.usePoint.prisonInfo})</button>
              <button text="true" className="button_small" onClick={(e) => {
                if(actionChIdx === "") {
                  setMsg(gameData.msg.sentence.noneSelectCh[lang]);
                  setMsgOn(true);
                  return;
                }
                if (sData.ch[actionChIdx].actionPoint < gameData.actionPoint.usePoint.prisonRelease) {
                  setMsg(`<span caution>${gameData.msg.sentenceFn.lackActionPoint(lang, gameData.ch[sData.ch[actionChIdx].idx].na1[lang])}</span>`);
                  setMsgOn(true);
                  return;
                }
                const bailMorality = (Prisoner.crime + 1) * 10,
                  bailMoney = (Prisoner.crime + 1) * PrisonerData.grade * 10000;
                if (sData.info.morality < bailMorality) {
                  setMsg(gameData.msg.sentence.lackMorality[lang]);
                  setMsgOn(true);
                  return;
                }
                if (sData.info.money < bailMoney) {
                  setMsg(gameData.msg.sentence.lackMoney[lang]);
                  setMsgOn(true);
                  return;
                }
                changeSaveData({
                  ...sData,
                  info: {
                    ...sData.info,
                    money: sData.info.money - bailMoney,
                    morality: sData.info.morality - bailMorality,
                  },
                  city: {
                    ...sData.city,
                    [cityNum]: {
                      ...sData.city[cityNum],
                      prison: {
                        ...sData.city[cityNum].prison,
                        criminal: sData.city[cityNum].prison.criminal.filter((_, idx) => {
                          return idx !== prisonerIdx;
                        })
                      }
                    }
                  }
                });
              }}>{gameData.msg.button.payBail[lang]} ({gameData.actionPoint.usePoint.prisonRelease})</button>
            </ItemButton>}
					</InfoGroup>
					<ActionPic onClick={() => {
            if (selectTab === "") {
              setMsg(gameData.msg.sentence.noneSelectAction[lang]);
              setMsgOn(true);
              return;
            };
            setPopupType('selectCh');
            setPopupInfo(prev => ({
              ...prev,
              selectCh: {
                ch: entries,
                actionChIdx: actionChIdx,
                type: "prison",
                setMsg: setMsg,
                setMsgOn: setMsgOn,
              }
            }));
            setPopupOn(true);
					}}>
						<MergedPic isAbsolute pic="card" idx={40 + (saveCh?.grade || 0)} />
						{!actionChIdx && <NoneChText code="t1" color="red">{gameData.msg.sentence.noneSelectCh[lang]}</NoneChText>}
						<Img imgurl={imgSet.images.transparent800} />
						<ActionChDisplay type={"prison"} chList={entries} gameData={gameData} actionChIdx={actionChIdx} imgSet={imgSet}/>
					</ActionPic>
        </UserContainer>
      </Wrap>
			<PopupContainer>
        {popupOn && <Popup type={popupType} dataObj={popupInfo} saveData={saveData} changeSaveData={changeSaveData} showPopup={setPopupOn} msgText={setMsg} showMsg={setMsgOn} />}
      </PopupContainer>
      <MsgContainer>
        {msgOn && <Msg text={msg} showMsg={setMsgOn}></Msg>}
      </MsgContainer>
    </>
  );
};

export default Prison;