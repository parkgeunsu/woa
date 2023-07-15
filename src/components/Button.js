import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LinkButton = styled(Link)`
  display: block;
  padding: 10px 0;
  width: 100%;
  background: rgba(0,0,0,.7);
  border-radius: 20px;
  color: #fff;
  font-size: ${({size}) => {
    return size === 'large' ? '20px' : '';
  }};
  text-align: center;
`;
const ActiveButton = styled.button`
  display: block;
  padding: 10px 0;
  width: 100%;
  background: rgba(0,0,0,.7);
  border-radius: 20px;
  color: #fff;
  font-size: ${({size}) => {
    return size === 'large' ? '20px' : '';
  }};
  text-align: center;
`;

const Button = ({
  type,
  size,
  children,
  ...rest
}) => {
  return (
    <>
      {type === 'menu' ? (
        <LinkButton size={size} {...rest}>
          {children}
        </LinkButton>
      ) : (
        <ActiveButton size={size} {...rest}>
          {children}
        </ActiveButton>
      )}
    </>
  )
}

export { Button };

