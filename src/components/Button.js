import { FlexBox } from 'components/Container';
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
  width: ${({width}) =>  width ? `${width}px` : '100%'};
  ${({size}) => {
    return size === 'small' ? 
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
const ButtonIcon = styled.span`
  display: inline-block;
  margin: 0 5px 0 0;
  width: 16px;
  height: 16px;
  background: url(${({icon}) => icon}) no-repeat center center !important;
  background-size: 100% 100% !important;
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
  return (
    <>
      {type === 'menu' && (
        <LinkButton width={width} size={size} {...rest}>
          {children}
        </LinkButton>
      )}
      {type === 'icon' && (
        <ActiveButton style={{paddingLeft: "20px"}} width={width} size={size} {...rest}>
          <FlexBox>
            <ButtonIcon icon={icon} />
            <ButtonText>{children}</ButtonText>
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
  children,
  ...rest
}) => {
  return (
    <IconBtn size={size} icon={icon} {...rest} onClick={() => {
      onClick && onClick();
    }}>{children}</IconBtn>
  )
}
export { Button, IconButton };

