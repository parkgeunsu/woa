import GuideQuestion from 'components/GuideQuestion';
import styled from 'styled-components';

const InfoGroupContainer = styled.dl`
  display: flex;
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
`;
const InfoContent = styled.dd`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const InfoGroup = ({
  hasGuide,
  children,
  title,
  guideClick,
  ...rest
}) => {
  return (
    <InfoGroupContainer {...rest}>
      <InfoTitle>{title}
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

InfoGroup.defaultProps = {
  hasGuide: true,
};

export default InfoGroup;