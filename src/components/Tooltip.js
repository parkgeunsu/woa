import { Text } from 'components/Atom';
import TooltipContainer from 'components/TooltipContainer';
// import { util } from 'components/Libs';
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
  padding: 5px;
  width: 100px;
  border-radius: 10px;
  background: ${({theme}) => theme.color.shadow};
  ${({pos, direction}) => {
    return direction === "left" ? `
      left: ${pos.left - (100 - pos.width) / 2}px;
      top: ${pos.top}px;
    ` : `
      right: ${window.screen.width - pos.right - (100 - pos.width) / 2}px;
      top: ${pos.top}px;
    `;
  }}
`;
const Tooltip = ({
  text,
  showTooltip,
  pos,
}) => {
	return (
    <>
      <TooltipContainer>
        <Wrap onClick={(e) => {
            showTooltip(false);
          }}>
          <TooltipCont direction={pos.left < window.screen.width * 0.5 ? "left" : "right"} pos={pos}>
            {typeof text === 'object' ? 
              <>
                <Text code="t3" color="main">
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
              <Text code="t3" color="main">
                {text}
              </Text>
            }
          </TooltipCont>
        </Wrap>
      </TooltipContainer>
    </>
	)
}

export default Tooltip;
