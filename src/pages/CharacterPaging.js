import { util } from 'components/Libs';
import CharacterCard from 'pages/CharacterCard';
import ChList from 'pages/ChList';
import React, { useCallback } from 'react';
import styled from 'styled-components';

const ChUl = styled.ul`
  padding: 5px;
  width: 100%;
  white-space: nowrap;
  width: ${({chSize, chLength}) => Math.ceil(chSize) * chLength}px !important;
`;
const ChLi = styled.li`
  display: inline-block;
  position: relative;
  width: 5vh;
  height: 5vh;
  transform-origin: center bottom;
  font-size: 0;
  transform: translate(0, calc(50% + 2vh));
  transition: all 0.3s;
`;
const CharacterPaging = ({
  chList,
  saveData,
  slotIdx,
  changeChSlot,
}) => {
  const cardWidth = React.useMemo(() => window.innerWidth * 0.1, []);

  const scrollMove = useCallback((node) => {
    if (node !== null) {
      const listHalfSize = node.getBoundingClientRect().width * .5;
      const cardHalfNum = Math.floor(listHalfSize / cardWidth);
      node.scrollTo(cardWidth * (slotIdx - cardHalfNum), 0);
    }
  }, [slotIdx, cardWidth]);
  return (
    <ChList ref={scrollMove} type="paging">
      <ChUl chSize={cardWidth} chLength={chList.length}>
        {chList && chList.map((data, idx) => {
          const charKey = data.id || `paging-${data.idx}-${idx}`;
          return (
            <ChLi className={`g${data.grade} ${slotIdx === idx ? 'on' : ''}`} key={charKey} onClick={() => {
              const currentHistory = util.loadData('historyParam') || {};
              util.saveData('historyParam', {
                ...currentHistory,
                cards: {
                  selectIdx: idx,
                }
              });
              changeChSlot(idx);
            }}>
              <CharacterCard usedType="paging" saveData={saveData} saveCharacter={data} />
            </ChLi>
          )
        })}
      </ChUl>
    </ChList>
  );
}

export default CharacterPaging;
