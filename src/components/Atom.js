import styled from 'styled-components';

const StyledText = styled.div`
  line-height: 1.5;
  font-size: ${({theme, code}) => theme.font[code] || theme.font.t1};
  color: ${({theme, isRgbColor, color}) => isRgbColor ? color : theme.color[color] || theme.color.sub};
  font-weight: ${({weight}) => weight};
  text-align: ${({align}) => align};
  ${({theme, borderColor}) => borderColor ? `
    text-shadow: -1px 0 ${theme.color[borderColor]},
    0 1px ${theme.color[borderColor]},
    1px 0 ${theme.color[borderColor]},
    0 -1px ${theme.color[borderColor]};
  ` : ''}
`;

const Text = ({
  code,
  color,
  align,
  weight,
  children,
  borderColor,
  ...rest
}) => {
  const isRgbColor = color.indexOf('#') >= 0 || color.indexOf('rgb') >= 0 || color.indexOf('hsl') >= 0; 
  return (
    <StyledText code={code} isRgbColor={isRgbColor} color={color} borderColor={borderColor} align={align} weight={weight} {...rest}>{children}</StyledText>
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

