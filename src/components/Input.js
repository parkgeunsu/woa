import { useState } from 'react';
import styled from 'styled-components';

const makeID = () => {
  return Math.random().toString(36).substring(2, 18);
};
const Label = styled.label`
  margin: 0 5px 0 0;
  vertical-align: middle;
`;
const Check = styled.input.attrs({
  type: 'checkbox'
})``;

const CheckBox = ({
  children,
}) => {
  const newId = makeID();
  return (
    <>
      <Label for={newId}>{children}</Label>
      <Check id={newId} />
    </>
  );
}
const RadioWrap = styled.span`
  position: relative;
  margin:0 10px 0 0;
  &:last-of-type{
    margin: 0;
  }
`;
const Radio = styled.input.attrs({
  type: 'radio'
})`
  margin: 0;
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
      <Label for={newId}>{children}</Label>
      <Radio onChange={(e) => {
        change(idx);
        onChange && onChange();
      }} checked={selected} name={groupId} id={newId} />
    </RadioWrap>
  );
};

const TextWrap = styled.input.attrs({
  type: 'text'
})`
  padding: 5px;
  vertical-align: middle;
  font-size: 0.75rem;
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
  font-size: 0.75rem;
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
}) => {
  const [value, setValue] = useState(text);
  return multi ? (
    <TextMultiWrap onChange={(e) => {
      setValue(e.target.value);
      onChange && onChange();
    }} placeholder={placeholder} transparent={transparent} value={value} />
  ) : (
    <TextWrap onChange={(e) => {
      setValue(e.target.value);
      onChange && onChange();
    }} placeholder={placeholder} transparent={transparent} value={value} />
  )
}

export { CheckBox, RadioBox, TextField };
