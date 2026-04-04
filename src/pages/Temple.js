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
const TempleContent = styled(FlexBox)`
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
const Temple = ({
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
  const gameItem = React.useMemo(() => {
    return gameData.items;
  }, [gameData]);
  const sData = React.useMemo(() => Object.keys(saveData).length === 0 ? util.loadData('saveData') : saveData, [saveData]);
  const [popupOn, setPopupOn] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [popupInfo, setPopupInfo] = useState({});
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");
  const entries = React.useMemo(() => {
    return sData.entry.map((entryIdx) => {
      return sData.ch[entryIdx];
    });
  }, [sData]);
  const actionChIdx = React.useMemo(() => {
    return sData.actionCh.temple.idx <= entries.length - 1 ? sData.actionCh.temple.idx : "";
  }, [entries, sData]);
  const saveCh = React.useMemo(() => entries[actionChIdx] || {}, [entries, actionChIdx]);
  const [greeting, setGreeting] = useState(gameData.shop.temple.greeting[lang]);
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <>
			<Wrap direction="column">
				<Npc imgSet={imgSet} shopType={'temple'} gameData={gameData} lang={lang} selectTab={selectTab} setSelectTab={setSelectTab} navigate={navigate} onClick={() => {
          setSelectTab("");
          const randomIdx = Math.floor(Math.random() * gameData.shop.temple.randomText.length);
          setGreeting(gameData.shop.temple.randomText[randomIdx][lang]);
				}}/>
        <WorkArea frameBack={imgSet.etc.frameChBack}direction="column" alignItems="center" justifyContent="center">
          {selectTab === "" ? <GreetingText code="t4" color="main" wordBreak="keep-all">{greeting}</GreetingText> : 
          actionChIdx !== "" && <WorkHeader direction="row" justifyContent="space-between" alignItems="center">

          </WorkHeader>}
          {selectTab === 0 && <TempleContent direction="row" justifyContent="center" alignItems="flex-start" onClick={() => {
            }}>

          </TempleContent>}
        </WorkArea>
        <UserContainer justifyContent="space-between">
          <InfoGroup>
          </InfoGroup>
          <ActionPic onClick={() => {
              setPopupInfo({
                ch: entries,
                actionChIdx: actionChIdx,
                type: 'temple',
                setMsg: setMsg,
                setMsgOn: setMsgOn,
              });
              setPopupType('selectCh');
              setPopupOn(true);
            }}>
            <MergedPic isAbsolute pic="card" idx={40 + (saveCh?.grade || 0)} />
            {!actionChIdx && <NoneChText code="t1" color="red">{gameData.msg.sentence.noneSelectCh[lang]}</NoneChText>}
            <Img imgurl={imgSet.images.transparent800} />
            <ActionChDisplay type={'temple'} saveData={sData} gameData={gameData} actionChIdx={actionChIdx} imgSet={imgSet}/>
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

export default Temple;