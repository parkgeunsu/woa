import { util } from 'components/Libs';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

////etc 0, hole 100, colorance 200, upgrade 300, material 400
const StyledItemPic = styled.span`
  display: inline-block;
  width: 100%;
  height: 100%;
  ${({startIdx}) => {
    if (startIdx === '') { //equip일 경우
      return `
        svg{
          width: 100%;
          height: 100%;
        }
      `;
    }
  }}
`;

const ItemPic = ({
  type,
  idx,
  pic,
  children,
  ...rest
}) => {
  const startIdx = React.useMemo(() => {
    return type ==='equip' || !type ? '' : util.typeTostartIdx(type);
  }, [type]);
  const picSize = useCallback((node) => {
    if (node !== null) {
      const size = node.getBoundingClientRect().width;
      node.style.background = `url(${pic}) no-repeat -${(idx % 10) * size}px -${Math.floor(idx / 10) * size + size * startIdx}px`;
      node.style.backgroundSize = `${size * 10}px`;
    }
  }, [pic, idx, startIdx]);
  return (
    <StyledItemPic ref={picSize} startIdx={startIdx} className="pic" itemPic={pic} idx={idx} {...rest}>
      {children}
    </StyledItemPic>
  )
}

const MarkWrap = styled.span`
  display: inline-block;
  position: relative;
  margin: 0 5px 0 0;
  width: 30px;
  height: 30px;
  box-sizing: border-box;
  border: 2px solid #895910;
  background-color: #ffc719;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0px 4px 10px #000;
  z-index: 1;
  &:nth-of-type(2) {
    transform: translate(-20px,0);
  }
  &:nth-of-type(3) {
    transform: translate(-40px,0);
  }
  &:nth-of-type(4) {
    transform: translate(-60px,0);
  }
  span {
    ${({pic, size, idx}) => {
      return `
        background: url(${pic}) no-repeat -${(idx % 10) * size}px -${Math.floor(idx / 10) * size}px;
        background-size: ${size * 10}px;
      `;
    }}
  }
`;
const MarkImg = styled.span`
  display: inline-block;
  position: absolute;
  width: 80%;
  height: 80%;
  ${({type}) => {
    switch(type) {
      case 'front':
        return `
          left: 10%;
          top: 10%;
          z-index: 2;
          filter: brightness(0.7);
        `;
      case 'light':
        return `
          left: 7%;
          top: 7%;
          z-index: 1;
        `;
      case 'shadow':
        return `
          left: 13%;
          top: 13%;
          z-index: 1;
          filter: invert(1);
        `;
      default:
        break;
    }
  }}
`;
const MarkPic = ({
  length,
  pic,
  idx,
}) => {
  const [size, setSize] = useState(0);
  const picSize = useCallback((node) => {
    if (node !== null) {
      setSize(Math.floor(node.getBoundingClientRect().width * 0.8));
    }
  }, []);
  const mark = React.useMemo(() => Array.from({length: length}, () => ''), [length]);
  return (
    mark.map((markData, markIdx) => {
      return <MarkWrap ref={picSize} size={size} pic={pic} idx={idx} key={`markIdx${markIdx}`}>
        <MarkImg type="light"/>
        <MarkImg type="front"/>
        <MarkImg type="shadow"/>
      </MarkWrap>
    })
  )
}

const SkillMarkWrap = styled.span`
  display: inline-block;
  position: absolute;
  right: ${({posIdx}) => posIdx * 15}px;
  bottom: 0;
  width: 30px;
  height: 30px;
  box-sizing: border-box;
  border: 2px solid #db8624;
  background-color: #704615;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0px 4px 10px #000;
  z-index: 1;
  vertical-align: bottom;
  ${({type}) => {
    switch(type) {
      case 10:
        return `
          margin: 0;
          width: 40px;
          height: 40px;
          border: 2px solid #895910;
          background-color: #ffc719;
          border-radius: 25px;
        `;
      case 5:
        return `
          margin:0;
          width:35px;
          height:35px;
          border:2px solid #ddd;
          background-color:#666;
          border-radius:25px;
        `;
      default:
        break;
    }
  }}
  span {
    ${({pic, size, idx}) => {
      return `
        background: url(${pic}) no-repeat -${(idx % 10) * size}px -${Math.floor(idx / 10) * size}px;
        background-size: ${size * 10}px;
      `;
    }}
  }
`;
const SkillMark = ({
  point,
  pic,
  idx,
}) => {
  const [size, setSize] = useState(0);
  const picSize = useCallback((node) => {
    if (node !== null) {
      setSize(Math.floor(node.getBoundingClientRect().width * 0.8));
    }
  }, []);
  const mark = React.useMemo(() => {
    const arrLength = [];
    arrLength[0] = Math.floor(point / 10);
    arrLength[1] = Math.floor((point - arrLength[0] * 10) / 5);
    arrLength[2] = point % 5;
    return Array.from({length: arrLength[0]}, () => 10).concat(Array.from({length: arrLength[1]}, () => 5).concat(Array.from({length: arrLength[2]}, () => 1)));
  }, [point]);
  return (
    mark.map((markData, markIdx) => 
      <SkillMarkWrap key={`markIdx${markIdx}`} ref={picSize} size={size} type={markData} pic={pic} idx={idx} posIdx={markIdx}>
        <MarkImg type="light"/>
        <MarkImg type="front"/>
        <MarkImg type="shadow"/>
      </SkillMarkWrap>
    )
  )
}
export { ItemPic, MarkPic, SkillMark };
