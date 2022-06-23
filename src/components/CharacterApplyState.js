import React, { useState } from 'react';
import styled from 'styled-components';
import { util } from 'components/Libs';

const ApplyState = styled.div`
  display:none;
  &{
    dd{position:relative;padding:5px;}
    ul{}
    li{display:flex;margin:0 0 10px 0;justify-content:space-between;}
    li .name{padding:0 0 0 5px;width:22%;font-size:11px;color:#999;text-align:left;}
    li .name b{display:block;font-size:14px;color:#fff;font-weight:600;}
    li .current{width:48%;font-size:16px;font-weight:600;color:#0b7;text-align:center;letter-spacing:-1px;}
    li .current b{font-size:14px;color:#0b7;text-align:center;}
    li .total{padding:0 5px 0 0;width:30%;font-size:24px;font-weight:600;color:#0b7;text-align:right;}
    li:last-of-type{margin:0;}
  }
`;

const CharacterApplyState = ({
  saveData,
  slotIdx,
}) => {
  const BattleStateName = [{ko:'체력',en:'HP'},{ko:'행동',en:'SP'},{ko:'행동회복',en:'RSP'},{ko:'공격',en:'ATK'},{ko:'방어',en:'DEF'},{ko:'술법공격',en:'MAK'},{ko:'술법방어',en:'MDF'},{ko:'체력회복',en:'RCV'},{ko:'속도',en:'SPD'},{ko:'행운',en:'LUK'}];
  return (
    <>
      <ApplyState className="apply_state">
        <dl className="info_group ach_group">
          <dt>TOTAL STATE<span>(총스탯)</span></dt>
          <dd className="scroll-y">
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
      </ApplyState>
    </>
  );
}

export default CharacterApplyState;
