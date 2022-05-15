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
            { gameRelation && gameRelation.map((rtData, idx) => {
              const rtData_ = gameData.relation[rtData.idx];
              return (
                <div key={idx} className="rt" flex="true">
                  <span className="name" dangerouslySetInnerHTML={{__html: rtData_.tag}} />
                  <span className="txt" dangerouslySetInnerHTML={{__html: rtData_.txt}} />
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
