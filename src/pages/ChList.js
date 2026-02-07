import React from "react";
import styled from 'styled-components';

const gradeColors = {
  g1: { color: '#fff', shadow: '0 5px 0 #fff', outline: '2px solid #fff' },
  g2: { color: '#00a90c', shadow: '0 5px 0 #00a90c', outline: '2px solid #00a90c' },
  g3: { color: '#0090ff', shadow: '0 5px 0 #0090ff', outline: '2px solid #0090ff' },
  g4: { color: '#a800ff', shadow: '0 5px 0 #a800ff', outline: '2px solid #a800ff' },
  g5: { color: '#ffcc15', shadow: '0 5px 0 #ffcc15', outline: '2px solid #ffcc15' },
  g6: { color: '#ff2a00', shadow: '0 5px 0 #ff2a00', outline: '2px solid #ff2a00' },
  g7: { color: '#ff8000', shadow: '0 5px 0 #ff8000', outline: '2px solid #ff8000' },
};

const ChListWrap = styled.div`
  ${({type}) => {
    switch(type) {
      case 'list':
        return `
          position: relative;
          width: 100%;
          height: 100%;
          li {
            ${Object.entries(gradeColors).map(([g, style]) => `&.${g} { box-shadow: ${style.shadow}; }`).join('\n')}
          }
        `;
      case 'paging':
        return `
          position: absolute;
          bottom: 4%;
          left: 20px;
          right: 20px;
          height: 10.4vh;
          z-index: 1;
          li {
            border-radius: 50%;
            overflow: hidden;
            ${Object.entries(gradeColors).map(([g, style]) => `&.${g} { background-color: ${style.color}; }`).join('\n')}
            & > div {
              opacity: 0.5;
            }
            &.on {
              transform: scale(1.15);
              transform-origin: center 0;
              z-index: 1;
              & > div {
                opacity: 1;
              }
            }
          }
        `;
      case 'action_list':
        return `
          position: relative;
          padding: 10px;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          li {
            ${Object.entries(gradeColors).map(([g, style]) => `&.${g} { background-color: ${style.color}; }`).join('\n')}
          }
        `;
      default:
        return '';
    }
  }}
  li {
    ${Object.entries(gradeColors).map(([g, style]) => `&.${g}.on { outline: ${style.outline}; }`).join('\n')}
  }
`;

const ChList = React.forwardRef(({
  type,
  children,
}, ref) => {
  return (
    <ChListWrap ref={ref} type={type} className={type === "paging" ? "scroll-x" : "scroll-y"}>
      {children}
    </ChListWrap>
  );
});

export default ChList;