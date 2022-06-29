import React from 'react';
import styled from 'styled-components';

const CharacterApplyState = ({
  saveData,
  slotIdx,
}) => {
  const BattleStateName = [{ko:'체력',en:'HP'},{ko:'행동',en:'SP'},{ko:'행동회복',en:'RSP'},{ko:'공격',en:'ATK'},{ko:'방어',en:'DEF'},{ko:'술법공격',en:'MAK'},{ko:'술법방어',en:'MDF'},{ko:'체력회복',en:'RCV'},{ko:'속도',en:'SPD'},{ko:'행운',en:'LUK'}];
  const scrollMove = (e) => {
    //e.stopPropagation();
  }
  return (
    <>
      <div className="apply_state scroll-y">
        <dl className="info_group ach_group">
          <dt>TOTAL STATE<span>(총스탯)</span></dt>
          <dd className="scroll-y" onTouchMove={(e) => {
            scrollMove(e);
          }}>
            <ul className="total_states">
              { BattleStateName && BattleStateName.map((bData, idx) => {
                return (
                  <li key={idx} className={BattleStateName[idx].en.toLowerCase()}>
                    <span className="name">{BattleStateName[idx].ko}<b>{BattleStateName[idx].en}</b></span>
                    <span className="current">{`${saveData.ch[slotIdx]['bSt'+idx]} + `}<b>{`${saveData.ch[slotIdx]['iSt'+idx]}`}</b></span>
                    <span className="total">{saveData.ch[slotIdx]['bSt'+idx] + saveData.ch[slotIdx]['iSt'+idx]}</span>
                  </li>
                )
              })}
            </ul>
          </dd>
        </dl>
      </div>
    </>
  );
}

export default CharacterApplyState;
