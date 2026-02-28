import styled from 'styled-components';

const StyledText = styled.div`
  line-height: 1.5;
  font-size: ${({theme, code}) => theme.font[code] || theme.font.t1};
  color: ${({theme, rgbColor, color}) => rgbColor ? color : theme.color[color] || theme.color.sub};
  font-weight: ${({weight}) => weight};
  text-align: ${({align}) => align};
  ${({isDynamic}) => isDynamic && `
    white-space: pre-wrap;
  `}
  ${({theme, borderColor}) => borderColor ? `
    text-shadow: -1px 0 ${theme.color[borderColor]},
    0 1px ${theme.color[borderColor]},
    1px 0 ${theme.color[borderColor]},
    0 -1px ${theme.color[borderColor]};
  ` : ''}
`;

const Text = ({
  code="t1",
  color="sub",
  align="center",
  weight,
  children,
  borderColor,
  isDynamic,
  ...rest
}) => {
  const rgbColor = (typeof color === 'string') &&
  (color.includes('#') || color.includes('rgb') || color.includes('hsl'));

  return (
    <StyledText code={code} rgbColor={rgbColor} color={color} borderColor={borderColor} align={align} weight={weight} isDynamic={isDynamic} {...rest}>{children}</StyledText>
  )
}

export { Text };

