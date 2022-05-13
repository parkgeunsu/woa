import React, { useState } from 'react';
import styled from 'styled-components';
import { util } from 'components/Libs';

const Relation = styled.div`
  display:none;
  &{
    .name{margin:auto 5px;width:80px;font-size:12px;color:#fff;font-weight:600;}
    .txt{margin:auto 0;flex:1;font-size:12px;word-break:keep-all;}
  }
`;

const CharacterRelation = ({
  slotIdx,
}) => {
  const gameData = util.loadData("gamedata");
  const saveData = util.loadData("savedata");
  const gameRelation = gameData.ch[saveData.ch[slotIdx].idx].relation;
  return (
    <>
      <Relation className="relation">
        <dl className="info_group rt_group">
          <dt>RELATION<span>(인연)</span></dt>
          <dd className="scroll-y">
            { gameRelation && gameRelation.forEach((rtData, idx) => {
              const rtData_ = gameData.relation[rtData.idx];
              console.log(rtData_);
              return (
                <div className="rt" flex="true">
                  <span className="name">{rtData_.tag}</span>
                  <span className="txt">{rtData_.txt}</span>
                </div>
              )
            })}
          </dd>
        </dl>
      </Relation>
    </>
  );
}

export default CharacterRelation;
