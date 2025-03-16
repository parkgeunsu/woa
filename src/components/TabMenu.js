import { AppContext } from 'App';
import { Text } from 'components/Atom';
import { IconPic } from 'components/ImagePic';
import React, { useContext } from 'react';
import styled from 'styled-components';

const TabMenuContainer = styled.div`
  display: flex;
  flex-grow: 0;
  ${({direction}) => direction === 'vertical' ? `
    padding: 0;
    flex-direction: column;
    justify-content: flex-start;
  ` : ``}
  ${({type}) => type === 'shipyard' ? `
    li.on button{
      background: rgb(174, 216, 255);
      color: #000;
    }
  `: ''}
`;
const TabList = styled.li`
  max-width: 60px;
  ${({direction}) => direction === 'vertical' ? `
    flex:unset;
  ` : `
    flex:1;
  `}
`;
const TabButton = styled.button`
  display: block;
  padding: 3px 0 0 0;
  width: 100%;
  text-align: center;
  border-radius: 50% 50% 0;
  ${({selected}) => selected ? `
    background-color: rgba(0,0,0,.5);
    color: #fff;
    font-weight: 600;
  ` : `
    background: rgba(255,255,255,.5);
    color: #000;
  `}
  .menu{padding:0 20px;}
`;
const TabName = styled.span`
  display: inline-block;
  vertical-align: middle;
`;
const TabIcon = styled.div`
  position: relative;
  margin: 0 auto;
  width: 30px;
  height: 30px;
`;
/*common tab*/

const TabMenu = ({
  list,
  type,
  selectTab,
  setSelectTab,
  direction,
  onClick,
  children,
  ...rest
}) => {
  const context = useContext(AppContext);
  const lang = React.useMemo(() => {
    return context.setting.lang;
  }, [context]);
  // const imgSet = React.useMemo(() => {
  //   return context.images;
  // }, [context]);
  const gameData = React.useMemo(() => {
    return context.gameData;
  }, [context]);
  return (
    <TabMenuContainer direction={direction} {...rest}>
      {list && list.map((data, idx) => {
        return (
          <TabList key={`inven_${idx}`} direction={direction} onClick={() => {
            setSelectTab(idx);
            onClick && onClick(idx);
          }}>
            <TabButton selected={idx === selectTab} direction={direction}>
              <TabIcon>
                <IconPic type="commonBtn" pic="icon100" idx={data.icon} />
              </TabIcon>
              <Text color={"main"} code="t2">{gameData.msg.menu[data.na][lang]}</Text>
            </TabButton>
          </TabList>
        );
      })}
      {children}
    </TabMenuContainer>
  ) 
}

TabMenu.defaultProps = {
  type: 'normal',
}

export default TabMenu;
