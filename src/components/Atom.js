import styled from 'styled-components';

const StyledText = styled.div`
  display: ${({inline}) => inline ? "inline-block" : "block"};
  font-family: ${({font}) => font === "point" ? `'myFont_number', 'myFont', 'myFont_e', 'myFont_j', sans-serif` : "sans-serif"};
  line-height: ${({lineHeight}) => lineHeight || 1.5};
  font-size: ${({theme, code}) => theme.font[code] || theme.font.t1};
  color: ${({theme, rgbColor, color}) => rgbColor ? color : theme.color[color] || theme.color.sub};
  font-weight: ${({weight}) => weight};
  text-align: ${({align}) => align};
  ${({isDynamic}) => isDynamic && `
    white-space: pre-wrap;
  `}
  word-break: ${({wordBreak}) => wordBreak ? wordBreak : "break-word"};
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
  font,
  weight,
  lineHeight,
  children,
  borderColor,
  isDynamic,
  wordBreak,
  inline=false,
  ...rest
}) => {
  const rgbColor = (typeof color === 'string') &&
  (color.includes('#') || color.includes('rgb') || color.includes('hsl'));

  return (
    <StyledText font={font} lineHeight={lineHeight} code={code} rgbColor={rgbColor} wordBreak={wordBreak} inline={inline} color={color} borderColor={borderColor} align={align} weight={weight} isDynamic={isDynamic} {...rest}>{children}</StyledText>
  )
}

export { Text };

