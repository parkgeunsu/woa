import { AppContext } from 'App';
import { Button } from 'components/Button';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
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
const MenuButton = styled(Link)`
  display: block;
  padding: 10px 0;
  width: 100%;
  background: rgba(0,0,0,.7);
  border-radius: 20px;
  color: #fff;
  text-align: center;
`;
const Menu = ({
  type,
  changePage,
  lang,
}) => {
  const gameData = useContext(AppContext).gameData;
  const imgSet = useContext(AppContext).images;
  return (
    <>
      <ContentMainWarp className="main_wrap">
        <ContentMenu className="main_menu transition" type={type}>
          <ul className="menu">
            {type === 'new' ?
              <>
                <li><Button type="menu" to="/start" onClick={() => {changePage("start");}}>{gameData.msg.button['startingGame'][lang]}</Button></li>
                <li><Button type="menu" to="/setup" onClick={() => {changePage("setup");}}>{gameData.msg.button['setup'][lang]}</Button></li>
              </>
            :
              <>
                <li><Button type="menu" to="/cards" onClick={() => {changePage("card");}}>{gameData.msg.menu['card'][lang]}</Button></li>
                <li><Button type="menu" to="/inven" onClick={() => {changePage("inven");}}>{gameData.msg.menu['inven'][lang]}</Button></li>
                <li><Button type="menu" to="/stickerShop" onClick={() => {changePage("stickerShop");}}>{gameData.msg.menu['stickerShop'][lang]}</Button></li>
                <li><Button type="menu" to="/toolShop" onClick={() => {changePage("toolShop");}}>{gameData.msg.menu['toolShop'][lang]}</Button></li>
                <li><Button type="menu" to="/shipyard" onClick={() => {changePage("shipyard");}}>{gameData.msg.menu['shipyard'][lang]}</Button></li>
                <li><Button type="menu" to="/tradingPost" onClick={() => {changePage("tradingPost");}}>{gameData.msg.menu['tradingPost'][lang]}</Button></li>
                <li><Button type="menu" to="/enhancingCards" onClick={() => {changePage("enhancingCards");}}>{gameData.msg.menu['enhancingCards'][lang]}</Button></li>
                <li><Button type="menu" to="/enhancingStickers" onClick={() => {changePage("enhancingStickers");}}>{gameData.msg.menu['enhancingStickers'][lang]}</Button></li>
                <li><Button type="menu" to="/composite" onClick={() => {changePage("composite");}}>{gameData.msg.menu['composite'][lang]}</Button></li>
                <li><Button type="menu" to="/recruitment" onClick={() => {changePage("gacha");}}>{gameData.msg.menu['recruitment'][lang]}</Button></li>
                <li><Button type="menu" to="/cardPlacement" onClick={() => {changePage("cardPlacement");}}>{gameData.msg.menu['cardPlacement'][lang]}</Button></li>
                <li><Button type="menu" to="/battle" onClick={() => {changePage("battle");}}>{gameData.msg.menu['battle'][lang]}</Button></li>
                <li><Button type="menu" to="/map" onClick={() => {changePage("map");}}>{gameData.msg.menu['sail'][lang]}</Button></li>
              </>
            }
          </ul>
        </ContentMenu>
      </ContentMainWarp>
    </>
  );
}


export default Menu;
