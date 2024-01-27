import styled from 'styled-components';

const StyledText = styled.div`
  line-height: 1.5;
  font-size: ${({theme, code}) => theme.font[code] || theme.font.t1};
  color: ${({theme, color}) => theme.color[color] || theme.color.sub};
  font-weight: ${({weight}) => weight};
  text-align: ${({align}) => align};
`;

const Text = ({
  code,
  color,
  align,
  weight,
  children,
  ...rest
}) => {
  return (
    <StyledText code={code} color={color} align={align} weight={weight} {...rest}>{children}</StyledText>
  )
}

Text.defaultProps = {
  code: 't1',
  color: 'sub',
  align: 'center',
}

const StyledIcon = styled.div`
  display: inline-block;
  width: ${({size}) => size}px;
  height: ${({size}) => size}px;
  background: url(${({url}) => url}) no-repeat center center;
  background-size: ${({backSize}) => backSize};
`;
const Icon = ({
  size,
  url,
  backSize,
  ...rest
}) => {
  return (
    <StyledIcon url={url} size={size} {...rest} backSize={backSize}/>
  )
}

Icon.defaultProps = {
  size: 20,
  backSize: '100% 100%',
}

export { Icon, Text };

