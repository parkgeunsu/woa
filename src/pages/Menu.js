import { AppContext } from 'App';
import { Button } from 'components/Button';
import React, { useContext } from 'react';
import styled from 'styled-components';

const ContentMainWarp = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-size: cover;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ContentMenu = styled.div`
  ${({type}) => {
    return type === 'new' ? `
      flex-grow: 0;
      width: 80%;
      & {
        .menu{padding:0 20px;}
        .menu li{margin:0 0 10px 0;}
        .menu li:last-of-type{margin:0;}
      }
    ` :
    `
    `
  }}
`;
const Menu = ({
  type,
}) => {
  const context = useContext(AppContext);
  const lang = React.useMemo(() => {
    return context.setting.lang;
  }, [context]);
  const gameData = React.useMemo(() => {
    return context.gameData;
  }, [context]);
  // const imgSet = React.useMemo(() => {
  //   return context.images;
  // }, [context]);
  return (
    <>
      <ContentMainWarp className="main_wrap">
        <ContentMenu className="main_menu transition" type={type}>
          <ul className="menu">
            {type === 'new' ?
              <>
                <li><Button type="menu" to="/start" onClick={() => {console.log("start");}}>{gameData.msg.button['startingGame'][lang]}</Button></li>
                <li><Button type="menu" to="/setup" onClick={() => {console.log("setup");}}>{gameData.msg.button['setup'][lang]}</Button></li>
              </>
            :
              <>
                <li><Button type="menu" to="/cards" onClick={() => {console.log("card");}}>{gameData.msg.menu['card'][lang]}</Button></li>
                <li><Button type="menu" to="/inven" onClick={() => {console.log("inven");}}>{gameData.msg.menu['inven'][lang]}</Button></li>
                <li><Button type="menu" to="/shop" onClick={() => {console.log("shop");}}>{gameData.msg.menu['shop'][lang]}</Button></li>
                <li><Button type="menu" to="/tool" onClick={() => {console.log("tool");}}>{gameData.msg.menu['tool'][lang]}</Button></li>
                <li><Button type="menu" to="/shipyard" onClick={() => {console.log("shipyard");}}>{gameData.msg.menu['shipyard'][lang]}</Button></li>
                <li><Button type="menu" to="/tradingPost" onClick={() => {console.log("tradingPost");}}>{gameData.msg.menu['tradingPost'][lang]}</Button></li>
                <li><Button type="menu" to="/enhancingCards" onClick={() => {console.log("enhancingCards");}}>{gameData.msg.menu['enhancingCards'][lang]}</Button></li>
                <li><Button type="menu" to="/enhancingStickers" onClick={() => {console.log("enhancingStickers");}}>{gameData.msg.menu['enhancingStickers'][lang]}</Button></li>
                <li><Button type="menu" to="/composite" onClick={() => {console.log("composite");}}>{gameData.msg.menu['composite'][lang]}</Button></li>
                <li><Button type="menu" to="/recruitment" onClick={() => {console.log("gacha");}}>{gameData.msg.menu['recruitment'][lang]}</Button></li>
                <li><Button type="menu" to="/cardPlacement" onClick={() => {console.log("cardPlacement");}}>{gameData.msg.menu['cardPlacement'][lang]}</Button></li>
                <li><Button type="menu" to="/battle" onClick={() => {console.log("battle");}}>{gameData.msg.menu['battle'][lang]}</Button></li>
                <li><Button type="menu" to="/map" onClick={() => {console.log("map");}}>{gameData.msg.menu['sail'][lang]}</Button></li>
              </>
            }
          </ul>
        </ContentMenu>
      </ContentMainWarp>
    </>
  );
}


export default Menu;
