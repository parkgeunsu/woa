import React from "react";
import styled from 'styled-components';

const ChListWrap = styled.div`
  ${({type}) => {
    switch(type) {
      case 'list':
        return `
          position: relative;
          width: 100%;
          height: 100%;
          li {
            &.g1 {
              box-shadow: 0 5px 0 #fff;
            }
            &.g2 {
              box-shadow: 0 5px 0 #00a90c;
            }
            &.g3 {
              box-shadow: 0 5px 0 #0090ff;
            }
            &.g4 {
              box-shadow: 0 5px 0 #a800ff;
            }
            &.g5 {
              box-shadow: 0 5px 0 #f4ea19;
            }
            &.g6 {
              box-shadow: 0 5px 0 #ff2a00;
            }
            &.g7 {
              box-shadow: 0 5px 0 #ff8000;
            }
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
            &.g1 {
              background-color: #fff;
            }
            &.g2 {
              background-color: #00a90c;
            }
            &.g3 {
              background-color: #0090ff;
            }
            &.g4 {
              background-color: #a800ff;
            }
            &.g5 {
              background-color: #f4ea19;
            }
            &.g6 {
              background-color: #ff2a00;
            }
            &.g7 {
              background-color: #ff8000;
            }
            & > div {
              opacity: 0.5;
            }
            &.on {
              transform: scale(1.2);
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
            &.g1 {
              background-color: #fff;
            }
            &.g2 {
              background-color: #00a90c;
            }
            &.g3 {
              background-color: #0090ff;
            }
            &.g4 {
              background-color: #a800ff;
            }
            &.g5 {
              background-color: #f4ea19;
            }
            &.g6 {
              background-color: #ff2a00;
            }
            &.g7 {
              background-color: #ff8000;
            }
          }
        `;
      default:
        return '';
  }}}
  li {
    &.g1.on {
      outline: 2px solid #fff;
    }
    &.g2.on {
      outline: 2px solid #00a90c;
    }
    &.g3.on {
      outline: 2px solid #0090ff;
    }
    &.g4.on {
      outline: 2px solid #a800ff;
    }
    &.g5.on {
      outline: 2px solid #f4ea19;
    }
    &.g6.on {
      outline: 2px solid #ff2a00;
    }
    &.g7.on {
      outline: 2px solid #ff8000;
    }
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