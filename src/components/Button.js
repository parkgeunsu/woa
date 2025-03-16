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
  width: 100%;
  height: 100%;
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
  background: url(${({icon}) => icon}) no-repeat center center;
  background-size: 100%;
  text-align: center;
`;

const IconButton = ({
  size,
  icon,
  onClick,
  ...rest
}) => {
  return (
    <IconBtn size={size} icon={icon} {...rest} onClick={() => {
      onClick && onClick();
    }}>
      <IconPic type="commonBtn" pic="icon100" idx={23} />
    </IconBtn>
  )
}
export { Button, IconButton };

