import { AppContext } from 'App';
import { util } from 'components/Libs';
import React, { forwardRef, useCallback, useContext, useState } from 'react';
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
  const context = useContext(AppContext);
  const imgSet = React.useMemo(() => {
    return context.images;
  }, [context]);
  const startIdx = React.useMemo(() => {
    return type ==='equip' || !type ? '' : util.typeToStartIdx(type);
  }, [type]);
  const picSize = useCallback((node) => {
    if (node !== null) {
      const size = node.getBoundingClientRect().width;
      node.style.background = `url(${imgSet.images[pic]}) no-repeat -${(idx % 10) * size}px -${Math.floor(idx / 10) * size + size * startIdx}px`;
      node.style.backgroundSize = `${size * 10}px`;
    }
  }, [pic, idx, imgSet, startIdx]);
  return (
    <StyledItemPic ref={picSize} startIdx={startIdx} className="pic" itemPic={pic} idx={idx} {...rest}>
      {children}
    </StyledItemPic>
  )
}

//menu0, element1-2, 
const StyledIconPic = styled.div`
  display: inline-block;
  ${({itemPic, startIdx, idx, whNum, urlImg}) => {
    if (urlImg) {
      return `
        background: url(${itemPic}) no-repeat 0% 0%;
        background-size: ${whNum[0] * 100}%;
      `;
    } else {
      return `
      \
        background: url(${itemPic}) no-repeat ${(idx % whNum[0]) * (100 / (whNum[0] - 1))}% ${Math.floor(idx / whNum[0]) * (100 / (whNum[1] - 1)) + (100 / (whNum[1] - 1)) * startIdx}%;
        background-size: ${whNum[0] * 100}%;
      `;
    }
  }}
  ${({isAbsolute}) => isAbsolute ? `
    position: absolute;
    left: 0;
    top: 0;
  `: ''}
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
const IconPic = forwardRef(({
  type,
  idx,
  pic,
  urlImg,
  isAbsolute,
  children,
  ...rest
}, ref) => {
  const context = useContext(AppContext);
  const imgSet = React.useMemo(() => {
    return context.images;
  }, [context]);
  const whNum = React.useMemo(() => {
    return urlImg ? [1, 1] : util.iconHNum(pic);
  }, [pic, urlImg]);
  const startIdx = React.useMemo(() => {
    return !type ? 0 : util.iconToStartIdx(type);
  }, [type]);
  return (
    <StyledIconPic {...ref ? ref={ref} : '' } isAbsolute={isAbsolute} whNum={whNum} startIdx={startIdx} className="pic" itemPic={urlImg ? pic : imgSet.images[pic]} idx={idx} urlImg={urlImg} {...rest}>
      {children}
    </StyledIconPic>
  )
});
IconPic.defaultProps = {
  isAbsolute: false,
}

const StyledPic = styled.div`
  width: 100%;
  height: 100%;
  ${({chPic, type, startIdx, idx, whNum, isThumb, absoluteSize}) => {
    const posY = Math.floor((absoluteSize ? idx + 10 : idx) / whNum[0]) * (100 / (whNum[1] - 1)) + (100 / (whNum[1] - 1)) * startIdx - (
      isThumb ?
        type ? 0.6745 * startIdx : Math.floor(idx / whNum[0]) - 1.4825 
      : absoluteSize ? 6.1 : 0);
    return `
      background: url(${chPic}) no-repeat ${((absoluteSize ? idx + 10 : idx) % whNum[0]) * (100 / (whNum[0] - 1))}% ${posY}%;
      background-size: ${whNum[0] * 100}%;
    `;
    //0.6745, 1.4825
  }}
`;
const ChPic = ({
  idx,
  pic,
  type,
  isThumb,
  absoluteSize,
  children,
  ...rest
}) => {
  const context = useContext(AppContext);
  const imgSet = React.useMemo(() => {
    return context.images;
  }, [context]);
  const whNum = React.useMemo(() => {
    return util.iconHNum(pic);
  }, [pic]);
  const startIdx = React.useMemo(() => {
    return !type ? 0 : util.iconToStartIdx(type);
  }, [type]);
  return (typeof idx === "number" && <StyledPic startIdx={startIdx} absoluteSize={absoluteSize} type={type} whNum={whNum} isThumb={isThumb} chPic={imgSet.images[pic]} idx={idx} {...rest}>
      {children}
    </StyledPic>
  )
}
ChPic.defaultProps = {
  isThumb: false,
  wNum: 10,
  hNum: 6,
  type: '',
}

const MarkWrap = styled.div`
  display: inline-block;
  position: relative;
  margin: 0 5px 0 0;
  width: 40px;
  height: 40px;
  box-sizing: border-box;
  border: 2px solid #895910;
  background-color: #ffc719;
  border-radius: 20px;
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
`;
const MarkPic = ({
  length,
  pic,
  idx,
}) => {
  // const context = useContext(AppContext);
  const [size, setSize] = useState(0);
  const picSize = useCallback((node) => {
    if (node !== null) {
      setSize(Math.floor(node.getBoundingClientRect().width * 0.8));
    }
  }, []);
  const mark = React.useMemo(() => Array.from({length: length}, () => ''), [length]);
  return (
    mark.map((markData, markIdx) => {
      return (
        <MarkWrap ref={picSize} size={size} key={`markIdx${markIdx}`}>
          <IconPic pic={pic} type="animalType" idx={idx} />
        </MarkWrap>
      )
    })
  )
}

const SkillMarkWrap = styled.div`
  display: inline-block;
  position: absolute;
  right: ${({posIdx}) => posIdx * 15}px;
  bottom: 0;
  box-sizing: border-box;
  border-radius: 50%;
  text-align: center;
  box-shadow: 0px 4px 10px #000;
  z-index: 1;
  vertical-align: bottom;
  ${({type}) => {
    switch(type) {
      case 10:
        return `
          margin: 0;
          width: 50px;
          height: 50px;
        `;
      case 5:
        return `
          margin: 0;
          width: 35px;
          height: 35px;
        `;
      default:
        return `
          margin: 0;
          width: 25px;
          height: 25px;
        `;
    }
  }}
`;
const SkillMark = ({
  point,
  idx,
}) => {
  const mark = React.useMemo(() => {
    const arrLength = [];
    arrLength[0] = Math.floor(point / 10);
    arrLength[1] = Math.floor((point - arrLength[0] * 10) / 5);
    arrLength[2] = point % 5;
    return Array.from({length: arrLength[0]}, () => 10).concat(Array.from({length: arrLength[1]}, () => 5).concat(Array.from({length: arrLength[2]}, () => 1)));
  }, [point]);
  return (
    mark.map((markData, markIdx) => {
      return <SkillMarkWrap key={`markIdx${markIdx}`} type={markData} posIdx={markIdx}>
        <IconPic type={`animalCoin${Math.floor(markData / 5) + 1}`} pic="icon200" idx={idx}/>
      </SkillMarkWrap>
    })
  )
}

export { ChPic, IconPic, ItemPic, MarkPic, SkillMark };

