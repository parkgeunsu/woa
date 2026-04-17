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
          overflow-y: auto;
        `;
      case 'paging':
        return `
          position: absolute;
          bottom: 4%;
          left: 20px;
          right: 20px;
          height: 10.4vh;
          z-index: 1;
          overflow-x: auto;
        `;
      case 'action_list':
        return `
          position: relative;
          padding: 10px;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          overflow-y: auto;
        `;
      default:
        return '';
    }
  }}
`;

const ChList = React.forwardRef(({
  type,
  children,
  ...rest
}, ref) => {
  return (
    <ChListWrap ref={ref} type={type} {...rest}>
      {children}
    </ChListWrap>
  );
});

export default ChList;