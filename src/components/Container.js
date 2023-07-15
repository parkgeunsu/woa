import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: ${({direction}) => direction};
  align-items: ${({alignItems}) => alignItems};
  justify-content: ${({justifyContent}) => justifyContent};
`;

const FlexBox = ({
  alignItems,
  justifyContent,
  direction,
  children,
  ...rest
}) => {
  return (
    <FlexContainer direction={direction} alignItems={alignItems} justifyContent={justifyContent} {...rest}>
      {children}
    </FlexContainer>
  )
}

FlexBox.propTypes = {

}
FlexBox.defaultProps = {
  direction: 'row',
  alignItems: 'center',
  justifyContent: 'center',
}

const TitleContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  color: ${({theme}) => theme.color.point5};
  font-size: 20px;
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

export { TitleBox, FlexBox };
