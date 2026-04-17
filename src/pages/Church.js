import { Text } from 'components/Atom';
import { ActionChDisplay, Calculator, RangeSlider } from 'components/Components';
import { FlexBox } from 'components/Container';
import { MergedPic } from 'components/ImagePic';
import { util } from 'components/Libs';
import Msg from 'components/Msg';
import MsgContainer from 'components/MsgContainer';
import Npc from 'components/Npc';
import Popup from 'components/Popup';
import PopupContainer from 'components/PopupContainer';
import { AppContext } from 'contexts/app-context';
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
const WorkHeader = styled(FlexBox)`
	height: auto;
`;
const Morality = styled(FlexBox)`
  margin: 0 0 0 15px;
	flex: 1;
`;
const SliderContainer = styled(FlexBox)`
	position: relative;
	flex: 1;
	margin: 0 10px 0 0;
	padding: 10px;
	height: 100%;
	box-sizing: border-box;
	background: rgba(0,0,0,.5);
`;
const ChurchContent = styled(FlexBox)`
	flex: 1;
	width: 100%;
	height: 100%;
	overflow: hidden;
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
const Church = ({
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
  const [actionChType, setActionChType] = useState("");
  const entries = React.useMemo(() => {
    return sData.entry.map((entryIdx) => {
      return {
        ...sData.ch[entryIdx],
        slotIdx: entryIdx,
      };
    });
  }, [sData]);
  const [rangeValue, setRangeValue] = useState(0);
  const [showCal, setShowCal] = useState(false);
  const actionChIdx = React.useMemo(() => {
    if (!actionChType) return "";
    return sData.actionCh[actionChType].idx <= entries.length - 1 ? sData.actionCh[actionChType].idx : "";
  }, [entries, sData, actionChType]);
  const saveCh = React.useMemo(() => entries[actionChIdx] || {}, [entries, actionChIdx]);
  const [greeting, setGreeting] = useState(gameData.shop.church.greeting[lang]);
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <>
			<Wrap direction="column">
				<Npc imgSet={imgSet} shopType={'church'} gameData={gameData} lang={lang} selectTab={selectTab} setSelectTab={setSelectTab} navigate={navigate} onClick={() => {
          setSelectTab("");
          
          const randomIdx = Math.floor(Math.random() * gameData.shop.church.randomText.length);
          setGreeting(gameData.shop.church.randomText[randomIdx][lang]);
				}} onMenuClick={(idx) => {
          changeSaveData(prev => {
            return {
              ...prev,
              actionCh: {
                ...prev.actionCh,
                [actionChType]: {
                  idx: "",
                }
              }
            }
          });
          setActionChType(`church${idx}`);
        }}/>
        <WorkArea frameBack={imgSet.etc.frameChBack}direction="column" alignItems="center" justifyContent="center">
					{selectTab === "" ? <GreetingText code="t4" color="main" wordBreak="keep-all">{greeting}</GreetingText> : 
					actionChIdx !== "" && <WorkHeader direction="row" justifyContent="space-between" alignItems="center">
            {selectTab === 0 && <>
              <Morality>
                <Text font="point" lineHeight={1} className="lvupText" code="t5" color="main" weight="600">{gameData.msg.info.moral[lang]} {sData.info.morality}</Text>
              </Morality>
            </>}
          </WorkHeader>}
          {selectTab === 0 && <ChurchContent direction="row" justifyContent="center" alignItems="flex-start" onClick={() => {
          }}>
            <SliderContainer direction="column">
              <RangeSlider min={0} max={sData.info.money} step={1} value={0} pirce={1} setValue={setRangeValue} showCal={setShowCal}/>
            </SliderContainer>
          </ChurchContent>}
        </WorkArea>
        <UserContainer justifyContent="space-between">
          <InfoGroup>
					</InfoGroup>
					<ActionPic onClick={() => {
            if (selectTab === "") {
              setMsg(gameData.msg.sentence.noneSelectAction[lang]);
              setMsgOn(true);
              return;
            };
            setPopupInfo({
              ch: entries,
              actionChIdx: actionChIdx,
              type: actionChType,
              setMsg: setMsg,
              setMsgOn: setMsgOn,
            });
            setPopupType('selectCh');
            setPopupOn(true);
          }}>
						<MergedPic isAbsolute pic="card" idx={40 + (saveCh?.grade || 0)} />
						{!actionChIdx && <NoneChText code="t1" color="red">{gameData.msg.sentence.noneSelectCh[lang]}</NoneChText>}
						<Img imgurl={imgSet.images.transparent800} />
						<ActionChDisplay type={actionChType} chList={entries} gameData={gameData} actionChIdx={actionChIdx} imgSet={imgSet}/>
					</ActionPic>
        </UserContainer>
        {showCal && <Calculator value={rangeValue} max={sData.info.money} setValue={setRangeValue} showCal={setShowCal}/>}
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

export default Church;