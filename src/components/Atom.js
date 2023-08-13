import styled from 'styled-components';

const StyledText = styled.div`
  line-height: 1.5;
  font-size: ${({theme, code}) => theme.font[code] || theme.font.t1};
  color: ${({theme, color}) => theme.color[color] || theme.color.sub};
  text-align: ${({align}) => align};
`;

const Text = ({
  code,
  color,
  align,
  children,
}) => {
  return (
    <StyledText code={code} color={color} align={align}>{children}</StyledText>
  )
}

Text.defaultProps = {
  code: 't1',
  color: 'sub',
  align: 'center',
}

export { Text };
