import React, { useLayoutEffect, useState, useContext } from 'react';
import { AppContext } from 'App';
import styled from 'styled-components';
import { util } from 'components/Libs';
import PopupContainer from 'components/PopupContainer';
import Popup from 'components/Popup';

const Relation = styled.div`
  display:none;
  &{
    .name{margin:auto 5px;width:80px;font-size:12px;color:#fff;font-weight:600;}
    .txt{margin:auto 0;flex:1;font-size:12px;word-break:keep-all;}
  }
`;

const CharacterRelation = ({
  saveData,
  slotIdx,
}) => {
  const gameData = useContext(AppContext).gameData;
  const gameRelation = gameData.ch[saveData.ch[slotIdx].idx].relation;

  const [popupOn, setPopupOn] = useState(false);
  const [relationInfo, setRelationInfo] = useState({});
  const handlePopup = (relation) => {
    if( relation ){
      setRelationInfo({
        relation: relation
      });
    }
    setPopupOn(!popupOn);
  }
  return (
    <>
      <Relation className="relation">
        <dl className="info_group rt_group">
          <dt>RELATION<span>(인연)</span></dt>
          <dd className="scroll-y">
            { gameRelation && gameRelation.map((rtData, idx) => {
              const relationData = gameData.relation[rtData.idx];
              return (
                <div key={idx} onClick={() => {handlePopup(relationData);}} className="rt" flex="true">
                  <span className="name" dangerouslySetInnerHTML={{__html: relationData.tag}} />
                  <span className="txt" dangerouslySetInnerHTML={{__html: relationData.txt}} />
                </div>
              )
            })}
          </dd>
        </dl>
      </Relation>
      <PopupContainer>
        {popupOn && <Popup type={'relation'} dataObj={relationInfo} onClose={() => {handlePopup()}} />}
      </PopupContainer>
    </>
  );
}

export default CharacterRelation;
