import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from 'App';
import { Link } from 'react-router-dom';

const ContentMainWarp = styled.div`
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background:url(${({ backImg }) => backImg});
  background-size: cover;
  padding: 50px 0 0 0;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
`;
const ContentMenu = styled.div`
  flex-grow: 0;
  overflow: hidden;
  & {
    .menu{padding:0 20px;}
    .menu li{margin:0 0 10px 0;}
    .menu li:last-of-type{margin:0;}
  }
`;
const MenuButton = styled(Link)`
  display:block;padding:10px 0;width:100%;background:rgba(0,0,0,.7);border-radius:20px;color:#fff;text-align:center;
`;
const Main = ({
  changePage,
}) => {
  const imgSet = useContext(AppContext).images;
  return (
    <>
      <ContentMainWarp className="main_wrap" backImg={imgSet.back[2]}>
        <ContentMenu className="main_menu transition">
          <ul className="menu">
            <li><MenuButton to="/character" onClick={() => {changePage("character");}}>Character</MenuButton></li>
            <li><MenuButton to="/inven" onClick={() => {changePage("inven");}}>Inven</MenuButton></li>
            <li><MenuButton to="/equipmentShop" onClick={() => {changePage("equipmentShop");}}>Equipment Shop</MenuButton></li>
            <li><MenuButton to="/toolShop" onClick={() => {changePage("toolShop");}}>Tool Shop</MenuButton></li>
            <li><MenuButton to="/shipyard" onClick={() => {changePage("shipyard");}}>Shipyard</MenuButton></li>
            <li><MenuButton to="/tradingPost" onClick={() => {changePage("tradingPost");}}>Trading Post</MenuButton></li>
            <li><MenuButton to="/characterEnhancement" onClick={() => {changePage("characterEnhancement");}}>Character Enhancement</MenuButton></li>
            <li><MenuButton to="/itemEnhancement" onClick={() => {changePage("itemEnhancement");}}>Item Enhancement</MenuButton></li>
            <li><MenuButton to="/combinedItem" onClick={() => {changePage("combinedItem");}}>Combined Item</MenuButton></li>
            <li><MenuButton to="/gacha" onClick={() => {changePage("gacha");}}>Gacha</MenuButton></li>
            <li><MenuButton to="/lineup" onClick={() => {changePage("lineup");}}>Lineup</MenuButton></li>
            <li><MenuButton to="/battle" onClick={() => {changePage("battle");}}>Battle</MenuButton></li>
            <li><MenuButton to="/map" onClick={() => {changePage("map");}}>Map</MenuButton></li>
          </ul>
        </ContentMenu>
      </ContentMainWarp>
    </>
  );
}


export default Main;
