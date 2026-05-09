import { FlexBox } from 'components/Container';
import { IconPic } from 'components/ImagePic';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LinkButton = styled(Link)`
  display: inline-block;
  padding: 10px 0;
  width: ${({width}) =>  width ? `${width}px` : '100%'};
  background: rgba(0,0,0,.7);
  border-radius: 20px;
  color: #fff;
  font-size: ${({size, theme}) => {
    return size === 'large' ? theme.font.t5 : '';
  }};
  text-align: center;
`;
const ActiveButton = styled.button`
  display: inline-block;
  width: ${({width}) =>  width ? 
    width === '100%' ? 
      width : 
      `${width}px` : 
  'auto'};
  ${({type, size}) => {
    return type === 'icon' ? 
      `padding: 5px;
       width: 40px;
       height: 40px;`
     : size === 'small' ? 
      `height: 25px;` : 
      `padding: 10px 15px`;
  }};
  background: rgba(0,0,0,.7);
  color: #fff;
  font-size: ${({size, theme}) => {
    if (size === 'small') {
      return '';
    } else if (size === 'large') {
      return theme.font.t5;
    } else {
      return theme.font.t3;
    }
  }};
  ${({btnImg}) => {
    return !btnImg ? `
      border-radius: 20px;
    ` : '';
  }}
  text-align: center;
`;

const ButtonText = styled.span`
  flex-shrink: 1;
  line-height: inherit;
  font-size: inherit;
`;
const StyledIconPic = styled(IconPic)`
  display: inline-block;
  ${({isChildren}) => isChildren ? `margin: 0 5px 0 0;` : ''}
  width: 40px;
  height: 40px;
  flex-shrink: 0;
`;
const Button = ({
  type,
  width,
  size,
  children,
  icon,
  ...rest
}) => {
  const isChildren = React.useMemo(() => children ? true : false, [children]);
  return (
    <>
      {type === 'menu' && (
        <LinkButton width={width} size={size} {...rest}>
          {children}
        </LinkButton>
      )}
      {type === 'icon' && (
        <ActiveButton type={type} width={width} size={size} {...rest}>
          <FlexBox>
            <StyledIconPic type={icon.type} pic={icon.pic} idx={icon.idx} isChildren={isChildren} />
            {isChildren && <ButtonText>{children}</ButtonText>}
          </FlexBox>
        </ActiveButton>
      )}
      {!type && (
        <ActiveButton width={width} size={size} {...rest}>
          {children}
        </ActiveButton>
      )}
    </>
  )
}

const IconBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  width: ${({size}) => size}px;
  height: ${({size}) => size}px;
  text-align: center;
`;

const IconButton = ({
  size,
  icon,
  onClick,
  ...rest
}) => {
  const urlImg = icon.indexOf("png") >= 0;
  return (
    <IconBtn size={size} icon={icon} {...rest} onClick={() => {
      onClick && onClick();
    }}>
      <IconPic urlImg={urlImg} type={urlImg ? "" : "commonBtn"} pic={icon ? icon : "icon100"} idx={urlImg ? 0 : 23} />
    </IconBtn>
  )
}

const StyledTextButton = styled.button`
  ${({type}) => type === "big" && `
    margin: 5px 3px;
    padding: 8px 14px;
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.75), rgba(255, 255, 255, 0.5));
    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 0 1px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 1);
  `}
  ${({type}) => type === "small" && `
    margin: 5px 3px;
    padding: 5px 10px;
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.75), rgba(255, 255, 255, 0.5));
    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 0 1px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 1);
    border-radius: 20px;
  `}
  border-radius: 20px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1;
  font-size: 1rem;
  border: none;
  outline: none;
`;
const TextButton = ({
  type,
  children,
  ...rest
}) => {
  return <StyledTextButton type={type} {...rest}>
    {children}
  </StyledTextButton>
}

export { Button, IconButton, TextButton };

