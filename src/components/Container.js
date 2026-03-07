import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: ${({direction}) => direction};
  align-items: ${({alignItems}) => alignItems};
  align-content: ${({alignContent}) => alignContent};
  justify-content: ${({justifyContent}) => justifyContent};
  line-height: inherit;
  font-size: inherit;
  color: inherit;
  flex-wrap: ${({flexWrap}) => flexWrap};
`;

const FlexBox = ({
  alignItems="center",
  justifyContent="center",
  direction="row",
  flexWrap="nowrap",
  alignContent="stretch",
  children,
  ...rest
}) => {
  return (
    <FlexContainer direction={direction} alignItems={alignItems} alignContent={alignContent} justifyContent={justifyContent} flexWrap={flexWrap} {...rest}>
      {children}
    </FlexContainer>
  )
}

const TitleContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  color: ${({theme}) => theme.color.point5};
  font-size: ${({theme}) => theme.font.t5};
  font-weight: 600;
  &:before{
    content: '';
    position: absolute;
    left: 0;
    bottom: -3px;
    background: ${({theme}) => theme.color.point5};
    width: 100%;
    height: 2px;
  }
  &:after{
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    background: ${({theme}) => theme.color.point5};
    width: 100%;
    height: 1px;
  }
`;
const TitleBox = ({
  children,
  ...rest
}) => {
  return <TitleContainer {...rest}>{children}</TitleContainer>
}

export { FlexBox, TitleBox };

