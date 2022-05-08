import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import backImg from 'images/back/back2.jpg';

const ContentMainWarp = styled.div`
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background:url(${backImg});
  background-size: cover;
  padding: 44px 0 0 0;
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
    .menu a{display:block;padding:10px 0;width:100%;background:rgba(0,0,0,.7);border-radius:20px;color:#fff;text-align:center;}
    .menu.white a{background:rgba(255,255,255,.5);color:#000;}
  }
`;
const Main = () => {
  return (
    <>
      <ContentMainWarp className="main_wrap">
        <ContentMenu className="main_menu transition">
          <ul className="menu">
            <li><Link to="/character">Character</Link></li>
            <li><Link to="/gacha">Gacha</Link></li>
            <li><Link to="/lineup">Lineup</Link></li>
            <li><Link to="/battle">Battle</Link></li>
          </ul>
        </ContentMenu>  
      </ContentMainWarp>
    </>
  );
}


export default Main;
