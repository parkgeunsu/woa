import { Text } from 'components/Atom';
import TooltipContainer from 'components/TooltipContainer';
// import { util } from 'components/Libs';
import { AppContext } from 'contexts/app-context';
import React, { useContext, useState } from 'react';
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
  padding: 5px 8px;
  max-width: 100px;
  border-radius: 4px;
  box-sizing: border-box;
  background: ${({theme, isDark}) => isDark ? theme.color.menu : theme.color.land0};
  ${({size, pos, direction}) => {
    return direction === "left" ? `
      left: ${pos.left - (size - pos.width) / 2}px;
      top: ${pos.height + pos.top}px;
    ` : `
      right: ${window.screen.width - pos.right - (size - pos.width) / 2}px;
      top: ${pos.height + pos.top}px;
    `;
  }};
  ${({frameBack}) => `
    border: 5px solid transparent;
    border-image: url(${frameBack}) 5 round;
  `}
`;
const Tooltip = ({
  text,
  setShowTooltip,
  pos,
  isDark,
}) => {
  const context = useContext(AppContext);
  const imgSet = React.useMemo(() => {
    return context.images;
  }, [context]);
  const [size, setSize] = useState(100);
	return (
    <>
      <TooltipContainer>
        <Wrap onClick={(e) => {
            setShowTooltip(false);
          }}>
          <TooltipCont frameBack={imgSet.etc.frameChBack} ref={(node) => {
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
              <Text code="t2" {...isDark && {borderColor: "sub"}} weight={600} lineHeight={1.2} color={isDark ? "unique" : "menu"} dangerouslySetInnerHTML={{__html: text}}/>
            }
          </TooltipCont>
        </Wrap>
      </TooltipContainer>
    </>
	)
}

export default Tooltip;
