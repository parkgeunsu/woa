import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const makeID = () => {
  return Math.random().toString(36).substring(2, 18);
};
const Label = styled.label`
  margin: 0 0 0 5px;
  vertical-align: middle;
`;
const Check = styled.input.attrs({
  type: 'checkbox'
})`
  vertical-align: middle;
`;

const CheckBox = ({
  children,
}) => {
  const newId = makeID();
  return (
    <>
      <Check id={newId} />
      <Label htmlFor={newId}>{children}</Label>
    </>
  );
}
const RadioWrap = styled.span`
  position: relative;
  margin: 0 10px 0 0;
  &:last-of-type{
    margin: 0;
  }
`;
const Radio = styled.input.attrs({
  type: 'radio'
})`
  margin: 0;
  vertical-align: middle;
`;
const RadioBox = ({
  groupId,
  selected,
  idx,
  children,
  change,
  onChange,
}) => {
  const newId = makeID();
  return (
    <RadioWrap>
      <Radio onChange={(e) => {
        change(idx);
        onChange && onChange();
      }} checked={selected} name={groupId} id={newId} />
      <Label htmlFor={newId}>{children}</Label>
    </RadioWrap>
  );
};

const TextWrap = styled.input.attrs({
  type: 'text'
})`
  padding: 5px;
  width: ${({width}) => width}px;
  vertical-align: middle;
  font-size: ${({theme}) => theme.font.t1};
  ${({theme, transparent}) => {
    return transparent ? `
      border: none;
      border-bottom: 1px solid ${theme.color.grey};
      background: transparent;
      color: ${theme.color.point5};
    ` : `
      border: 1px solid ${theme.color.grey};
      border-radius: 5px;
      box-shadow: 0 0 5px #000;
      background: #000;
      color: #fff;
    `;
  }}
`;
const TextMultiWrap = styled.textarea`
  padding: 5px;
  font-size: ${({theme}) => theme.font.t1};
  ${({theme, transparent}) => {
    return transparent ? `
      color: ${theme.color.point5};
    ` : `
      border: 1px solid  ${theme.color.grey};
      border-radius: 5px;
      box-shadow: 0 0 5px #000;
      background: #000;
      color: #fff;
    `;
  }}
`;
const TextField = ({
  placeholder,
  text,
  multi,
  transparent,
  onChange,
  width,
  ...rest
}) => {
  return multi ? (
    <TextMultiWrap
      onChange={(e) => {
        onChange && onChange(e.target.value);
      }} 
      placeholder={placeholder} width={width} transparent={transparent} value={text} {...rest} />
  ) : (
    <TextWrap
      onChange={(e) => {
        onChange && onChange(e.target.value);
      }} 
      placeholder={placeholder} width={width} transparent={transparent} value={text} {...rest} />
  )
}

const SelectText = styled.div`
  color: ${({theme}) => theme.color.point5};
  font-size: ${({theme}) => theme.font.t2};
`;
const SelectOptionArea = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
`;
const SelectShadow = styled.div`
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: ${({theme}) => theme.color.shadow};
  z-index: 10;
`;
const SelectOptionGroupBox = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -100%;
  z-index: 1;
  transition: all 0.5s;
  z-index: 11;
  &.on{
    bottom: 0;
  }
`;
const SelectOptionGroupTitle = styled.div`
  display: inline-block;
  padding: 15px 40px 5px 15px;
  border-radius: 0 40px 0 0;
  background: ${({theme}) => theme.color.main};
  color: ${({theme}) => theme.color.sub};
  font-size: ${({theme}) => theme.font.t4};
`;
const SelectOptionGroup = styled.div`
  padding: 0 0 10px;
  max-height: calc(100vh - 50px);
  border-radius: 0 10px 0 0;
  background: ${({theme}) => theme.color.main};
`;
const SelectOption = styled.li`
  display: flex;
  position: relative;
  padding: 15px 0;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: ${({theme}) => theme.font.t3};
  color: ${({theme}) => theme.color.point5};
  border-radius: 0 10px 0 0;
  &.select{
    font-size: ${({theme}) => theme.font.t4};
    color: ${({theme}) => theme.color.main};
    background: ${({theme}) => `linear-gradient(${theme.color.point5}, transparent)`};
  }
  &:last-of-type:after{
    display: none;
  }
`;
const CloseButton = styled.div`
  position: absolute;
  right: 5px;
  top: 0;
  width: 38px;
  height: 38px;
  &:before{
    position: absolute;
    left: 50%;
    top: 50%;
    content:'';
    width: 30px;
    height: 5px;
    border-radius: 3px;
    background: ${({theme}) => theme.color.main};
    transform-origin: center center;
    transform: translate(-50%, -50%) rotate(45deg);
  }
  &:after{
    position: absolute;
    left: 50%;
    top: 50%;
    content:'';
    width: 30px;
    height: 5px;
    border-radius: 3px;
    background: ${({theme}) => theme.color.main};
    transform-origin: center center;
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;
const Select = ({
  title,
  selectIdx,
  setSelectIdx,
  selectOption,
  onClick,
  ...rest
}) => {
  const timeoutRef = useRef(null);
  const [showOption, setShowOption] = useState(false);
  const [animation, setAnimation] = useState(false);
  const selectHide = useCallback(() => {
    setAnimation(false);
    timeoutRef.current = setTimeout(() => {
      setShowOption(false);
    }, 500);
  });
  const selectShow = useCallback(() => {
    setShowOption(true);
    timeoutRef.current = setTimeout(() => {
      setAnimation(true);
    }, 10);
  });
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);
  return (
    <>
      <SelectText {...rest} onClick={() => {
        selectShow();
      }}>{selectIdx !== "" ? selectOption[selectIdx] : title}</SelectText>
      {showOption && 
        <SelectOptionArea>
          <SelectOptionGroupBox className={animation ? 'on' : ''}>
            <SelectOptionGroupTitle>{title}</SelectOptionGroupTitle>
            <SelectOptionGroup ref={(node) => {
              if (node !== null) {
                const nodeHeight = node.children[0].children[0].getBoundingClientRect().height;
                node.scrollTo(0, selectIdx * nodeHeight);
              }
            }} className="scroll-y">
              <ul>
                {selectOption.map((data, idx) => {
                  return (
                    <SelectOption className={selectIdx === idx ? 'select' : ''} key={`option${idx}`} onClick={() => {
                      setSelectIdx(idx);
                      onClick && onClick(idx);
                      selectHide();
                    }}>{data}</SelectOption>
                  )
                })}
              </ul>
            </SelectOptionGroup>
            <CloseButton onClick={() => {
              selectHide();
            }}/>
          </SelectOptionGroupBox>
          <SelectShadow onClick={() => {
            selectHide();
          }}/>
        </SelectOptionArea>
      }
    </>
  );
}

export { CheckBox, RadioBox, Select, TextField };

