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
}) => {
  const gameData = useContext(AppContext).gameData;
	const setting = useContext(AppContext).setting,
		gameSpd = setting.speed,
		lang = setting.lang;
  const imgSet = useContext(AppContext).images;
  return (
    <>
      <ContentMainWarp className="main_wrap">
        <ContentMenu className="main_menu transition" type={type}>
          <ul className="menu">
            {type === 'new' ?
              <>
                <li><Button type="menu" to="/start" onClick={() => {changePage("start");}}>{gameData.msg.menu['startingGame'][lang]}</Button></li>
                <li><Button type="menu" to="/setting" onClick={() => {changePage("setting");}}>{gameData.msg.menu['setting'][lang]}</Button></li>
                <li><Button type="menu" to="/character" onClick={() => {changePage("character");}}>{gameData.msg.menu['character'][lang]}</Button></li>
              </>
            :
              <>
                <li><Button type="menu" to="/character" onClick={() => {changePage("character");}}>{gameData.msg.menu['character'][lang]}</Button></li>
                <li><Button type="menu" to="/inven" onClick={() => {changePage("inven");}}>{gameData.msg.menu['inven'][lang]}</Button></li>
                <li><Button type="menu" to="/equipmentShop" onClick={() => {changePage("equipmentShop");}}>{gameData.msg.menu['equipmentShop'][lang]}</Button></li>
                <li><Button type="menu" to="/toolShop" onClick={() => {changePage("toolShop");}}>{gameData.msg.menu['toolShop'][lang]}</Button></li>
                <li><Button type="menu" to="/shipyard" onClick={() => {changePage("shipyard");}}>{gameData.msg.menu['shipyard'][lang]}</Button></li>
                <li><Button type="menu" to="/tradingPost" onClick={() => {changePage("tradingPost");}}>{gameData.msg.menu['tradingPost'][lang]}</Button></li>
                <li><Button type="menu" to="/characterEnhancement" onClick={() => {changePage("characterEnhancement");}}>{gameData.msg.menu['characterEnhancement'][lang]}</Button></li>
                <li><Button type="menu" to="/itemEnhancement" onClick={() => {changePage("itemEnhancement");}}>{gameData.msg.menu['itemEnhancement'][lang]}</Button></li>
                <li><Button type="menu" to="/combinedItem" onClick={() => {changePage("combinedItem");}}>{gameData.msg.menu['combinedItem'][lang]}</Button></li>
                <li><Button type="menu" to="/recruitment" onClick={() => {changePage("gacha");}}>{gameData.msg.menu['recruitment'][lang]}</Button></li>
                <li><Button type="menu" to="/lineup" onClick={() => {changePage("lineup");}}>{gameData.msg.menu['lineup'][lang]}</Button></li>
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
