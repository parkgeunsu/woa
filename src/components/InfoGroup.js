import { Text } from 'components/Atom';
import GuideQuestion from 'components/GuideQuestion';
import styled from 'styled-components';

const InfoGroupContainer = styled.dl`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;
const InfoTitle = styled.dt`
  padding: 0 0 10px;
  font-size: 1rem;
  color: #fff;
  text-align: center;
  strong {
    font-size: 1.25rem;
  }
`;
const InfoContent = styled.dd`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const InfoGroup = ({
  hasGuide=true,
  children,
  title,
  pointTitle,
  guideClick,
  ...rest
}) => {
  return (
    <InfoGroupContainer {...rest}>
      <InfoTitle>
        {pointTitle && <Text inline font="point" code="t3" color="main" weight="600">{pointTitle}</Text>} <Text inline code="t1" color="main" weight="600">{title}</Text>
          {hasGuide && 
            <GuideQuestion size={20} pos={["right","top"]} colorSet={"black"} onclick={() => {
              guideClick && guideClick();
            }} />
          }
      </InfoTitle>
      <InfoContent className="scroll-y" flex-h="true">
        {children}
      </InfoContent>
    </InfoGroupContainer>
  );
}

export default InfoGroup;