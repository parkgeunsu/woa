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
    `padding: 10px 0`;
  }};
  background: rgba(0,0,0,.7);
  border-radius: 20px;
  color: #fff;
  font-size: ${({size, theme}) => {
    return size === 'large' ? theme.font.t5 : '';
  }};
  text-align: center;
`;

const Button = ({
  type,
  width,
  size,
  children,
  ...rest
}) => {
  return (
    <>
      {type === 'menu' ? (
        <LinkButton width={width} size={size} {...rest}>
          {children}
        </LinkButton>
      ) : (
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
}) => {
  return (
    <IconBtn size={size} icon={icon} onClick={() => {
      onClick && onClick();
    }}>{children}</IconBtn>
  )
}
export { Button, IconButton };

