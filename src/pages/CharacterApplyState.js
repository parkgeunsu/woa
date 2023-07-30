import { AppContext } from 'App';
import GuideQuestion from 'components/GuideQuestion';
import Popup from 'components/Popup';
import PopupContainer from 'components/PopupContainer';
import { useContext, useRef, useState } from 'react';

const CharacterApplyState = ({
  saveData,
  slotIdx,
  lang,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
  const [popupOn, setPopupOn] = useState(false);
  const popupType = useRef('');
  const [popupInfo, setPopupInfo] = useState({});
  const BattleStateName = ['hp','sp','rsp','atk','def','mak','mdf','rcv','spd','luk'];
  const scrollMove = (e) => {
    //e.stopPropagation();
  }
  return (
    <>
      <div className="apply_state scroll-y">
        <dl className="info_group ach_group">
          <dt>TOTAL STATE<span>({gameData.msg.menu.totalState[lang]})</span>
            <GuideQuestion size={20} pos={["right","top"]} colorSet={"black"} onclick={() => {
              popupType.current = 'guide';
              setPopupOn(true);
              setPopupInfo({
                data:gameData.guide["characterTotalState"],
              });
            }} />
          </dt>
          <dd className="scroll-y" onTouchMove={(e) => {
            scrollMove(e);
          }}>
            <ul className="total_states">
              { BattleStateName && BattleStateName.map((bData, idx) => {
                return (
                  <li key={idx} className={bData}>
                    <span className="name">{gameData.msg.state[bData].ko}<b>{gameData.msg.state[bData].en}</b></span>
                    <span className="current">{`${saveData.ch[slotIdx]['bSt'+idx]} + `}<b>{`${saveData.ch[slotIdx]['iSt'+idx]}`}</b></span>
                    <span className="total">{saveData.ch[slotIdx]['bSt'+idx] + saveData.ch[slotIdx]['iSt'+idx]}</span>
                  </li>
                )
              })}
            </ul>
          </dd>
        </dl>
      </div>
      <PopupContainer>
        {popupOn && <Popup type={popupType.current} dataObj={popupInfo} showPopup={setPopupOn} lang={lang} />}
      </PopupContainer>
    </>
  );
}

export default CharacterApplyState;
