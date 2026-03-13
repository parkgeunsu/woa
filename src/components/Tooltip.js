import { Text } from 'components/Atom';
import TooltipContainer from 'components/TooltipContainer';
// import { util } from 'components/Libs';
import { useState } from 'react';
import styled from 'styled-components';
const Wrap = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 30;
`;
const TooltipCont = styled.div`
  position: fixed;
  padding: 2px 8px;
  max-width: 100px;
  border-radius: 4px;
  background: ${({theme, isDark}) => isDark ? theme.color.grey2 : theme.color.shadow};
  ${({size, pos, direction}) => {
    return direction === "left" ? `
      left: ${pos.left - (size - pos.width) / 2}px;
      top: ${pos.height + pos.top}px;
    ` : `
      right: ${window.screen.width - pos.right - (size - pos.width) / 2}px;
      top: ${pos.height + pos.top}px;
    `;
  }}
`;
const Tooltip = ({
  text,
  showTooltip,
  pos,
  isDark,
}) => {
  const [size, setSize] = useState(100);
	return (
    <>
      <TooltipContainer>
        <Wrap onClick={(e) => {
            showTooltip(false);
          }}>
          <TooltipCont ref={(node) => {
            if (node) {
              setSize(node.offsetWidth);
            }
          }} size={size} direction={pos.left < window.screen.width * 0.5 ? "left" : "right"} pos={pos} isDark={isDark}>
            {typeof text === 'object' ? 
              <>
                <Text code="t2" color={isDark ? "sub" : "main"}>
                  {text[0]}
                </Text>
                {text[1] && <Text code="t2" color="yellow">
                  {text[1]}
                </Text>}
                <Text code="t1" color="legend">
                  {text[2]}
                </Text>
              </>
            :
              <Text code="t2" color={isDark ? "sub" : "main"} dangerouslySetInnerHTML={{__html: text}}/>
            }
          </TooltipCont>
        </Wrap>
      </TooltipContainer>
    </>
	)
}

export default Tooltip;
