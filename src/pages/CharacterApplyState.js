import { AppContext } from 'App';
import { FlexBox } from 'components/Container';
import InfoGroup from 'components/InfoGroup';
import Popup from 'components/Popup';
import PopupContainer from 'components/PopupContainer';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';

const Wrap = styled(FlexBox)`
  dd{position:relative;padding:5px;}
  li{display:flex;margin:0 0 10px 0;justify-content:space-between;}
  li .name{padding:0 0 0 5px;width:22%;font-size:0.688rem;color:#999;text-align:left;}
  li .name b{display:block;font-size:0.875rem;color:#fff;font-weight:600;}
  li .current{width:48%;font-size:1rem;font-weight:600;color:#0b7;text-align:center;letter-spacing:-1px;}
  li .current b{font-size:0.875rem;color:#0b7;text-align:center;}
  li .total{padding:0 5px 0 0;width:30%;font-size:1.5rem;font-weight:600;color:#0b7;text-align:right;}
  li:last-of-type{margin:0;}
`;

const CharacterApplyState = ({
  saveData,
  slotIdx,
  lang,
}) => {
  // const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
  const [popupOn, setPopupOn] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [popupInfo, setPopupInfo] = useState({});
  const BattleStateName = React.useMemo(() => ['hp','sp','rsp','atk','def','mak','mdf','rcv','spd','luk'], []);
  return (
    <>
      <Wrap className="apply_state scroll-y">
        <InfoGroup title={gameData.msg.menu.totalState[lang]} guideClick={() => {
          setPopupType('guide');
          setPopupOn(true);
          setPopupInfo({
            data:gameData.guide["characterTotalState"],
          });
        }}>
          <ul className="total_states">
            {BattleStateName && BattleStateName.map((bData, idx) => {
              return (
                <li key={idx} className={bData}>
                  <span className="name">{gameData.msg.state[bData].ko}<b>{gameData.msg.state[bData].en}</b></span>
                  <span className="current">{`${saveData.ch[slotIdx]['bSt'+idx]} + `}<b>{`${saveData.ch[slotIdx]['iSt'+idx]}`}</b></span>
                  <span className="total">{saveData.ch[slotIdx]['bSt'+idx] + saveData.ch[slotIdx]['iSt'+idx]}</span>
                </li>
              )
            })}
          </ul>
        </InfoGroup>
      </Wrap>
      <PopupContainer>
        {popupOn && <Popup type={popupType} dataObj={popupInfo} showPopup={setPopupOn} lang={lang} />}
      </PopupContainer>
    </>
  );
}

export default CharacterApplyState;
