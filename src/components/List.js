import { AppContext } from 'App';
import { useContext } from 'react';
import styled from 'styled-components';

const ListContainer = styled.ul`
  ${({theme, frameBack, transparentBack}) => {
    return transparentBack ? `
      color: ${theme.color.sub};
    ` : `
      padding: 15px;
      background: rgba(0,0,0,.8);
      box-sizing: border-box;
      border: 5px solid transparent;
      border-image: url(${frameBack}) 5 round;
      color: ${theme.color.main};
    `;
  }}
`;
// .ch_info > div{position:absolute;padding:10px 20px;width:100%;height:100%;box-sizing:border-box;pointer-events:none;opacity:0;z-index:1;
const List = styled.li`
  margin: 0 0 10px 0;
  color: inherit;
  &:last-of-type{
    margin: 0;
  }
`;
const ListTitle = styled.div`
  margin: 0 0 5px 0;
  color: inherit;
  font-size: 16px;
`;
const ListCont = styled.div`
  padding: 0 10px;
  font-size: 12px;
`;
const ListWrap = ({
  type,
  children,
  transparentBack,
  ...rest
}) => {
  const imgSet = useContext(AppContext).images;
  return (
    <ListContainer transparentBack={transparentBack} frameBack={imgSet.etc.frameChBack} {...rest}>
      {children}
    </ListContainer>
  );
}
ListWrap.defaultProps = {
  type: 'normal',
}

const ListItem = ({
  title,
  children,
  ...rest
}) => {
  return (
    <List {...rest}>
      <ListTitle>{title}</ListTitle>
      <ListCont>{children}</ListCont>
    </List>
  )
}
export { ListWrap, ListItem };
