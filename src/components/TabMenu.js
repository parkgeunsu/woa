import { AppContext } from 'App';
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
  ` : `
    padding: 0 20px;
  `}
  ${({type}) => type === 'shipyard' ? `
    li.on button{
      background: rgb(174, 216, 255);
      color: #000;
    }
  `: ''}
`;
const TabList = styled.li`
  ${({direction}) => direction === 'vertical' ? `
    flex:unset;
  ` : `
    flex:1;
  `}
`;
const TabButton = styled.button`
  display: block;
  padding: 10px 0 5px 0;
  width: 100%;
  text-align: center;
  ${({selected}) => selected ? `
    background-color: rgba(0,0,0,.5);
    color: #fff;
    font-weight: 600;
  ` : `
    background: rgba(255,255,255,.5);
    color: #000;
  `}
  .menu{padding:0 20px;}
  ${({direction}) => direction === 'vertical' ? `
    border-radius: 20px 0 0 20px;
  ` : `
    border-radius: 20px 20px 0 0;
  `}
`;
const TabName = styled.span`
  display: inline-block;
  vertical-align: middle;
`;
const TabIcon = styled.span`
  display: inline-block;
  position: relative;
  margin: 0 0 0 10px;
  width: 20px;
  height: 20px;
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
              <TabName>{gameData.msg.menu[data.na][lang]}</TabName>
              <TabIcon>
                <IconPic type="commonBtn" pic="icon100" idx={data.icon} />
              </TabIcon>
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
