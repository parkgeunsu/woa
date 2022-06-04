import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';

import iconBack from 'images/ico/ico_back.png';
import iconChat from 'images/ico/ico_chat.png';
import iconSetup from 'images/ico/ico_setup.png';
import iconLv from 'images/ico/ico_lv.png';
import iconDia from 'images/ico/ico_dia.png';
import iconGold from 'images/ico/ico_gold.png';
import iconAllview from 'images/ico/ico_allview.png';
import iconLargeview from 'images/ico/ico_largeview.png';
import bar0 from 'images/etc/frame/bar0.png';
import bar1 from 'images/etc/frame/bar1.png';
import frame from 'images/etc/frame/frame_main.png';

const Header = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  min-height:44px;
  z-index: 2;
  & {
    .default{display:flex;justify-content:space-between;padding:0 20px 0 10px;overflow:hidden;}
    .default > li{position:relative;float:left;margin:0 0 0 5px;padding:5px 0;}
    .default > li:first-of-type{margin:0;}
    li .ico{display:inline-block;width:40px;height:40px;background-size:40px;background-repeat:no-repeat;background-position:center center;}
    li .txt{display:block;margin:7px 0 7px 24px;padding:0 5px 0 8px;height:25px;background:url(${bar0}) repeat-x 0 center;background-size:100% 22px;border-radius:5px;border:3px solid transparent;border-image:url(${frame}) 6 stretch;line-height:19px;box-sizing:border-box;overflow:hidden;}
    li.back{flex-grow:0;}
    li.back .ico{background-image:url(${iconBack});}
    li.chat{float:right;}
    li.chat .ico{background-image:url(${iconChat});}
    li.setup{float:right;margin:0;}
    li.setup .ico{background-image:url(${iconSetup});}
    li.lv{flex-grow:1;}
    li.lv .ico{position:absolute;background-image:url(${iconLv});text-align:center;line-height:32px;z-index:2;}
    li.lv .ico .txt{display:inline-block;margin:0;padding:0;background:none;border:none;line-height:25px;}
    li.lv > .txt{text-align:center;}
    li.diamond{flex-grow:0;}
    li.diamond .ico{position:absolute;background-image:url(${iconDia});}
    li.diamond .txt{width:60px;text-align:right;}
    li.money{flex-grow:0;}
    li.money .ico{position:absolute;background-image:url(${iconGold});}
    li.money .txt{width:80px;text-align:right;}
    li.menu{float:right;overflow:hidden;}
    li.menu li{position:relative;float:left;visibility:hidden;height:100%;text-align:center;}
    li.menu li.used{visibility:visible;}
    li.menu li.view_type{margin:0 5px 0 0;width:20px;height:33px;background:url(${iconAllview}) no-repeat center center;background-size:50px;}
    li.menu li:last-of-type{margin:0;}
    li.menu li.view_type.on{background-image:url(${iconLargeview});background-size:50px;}
  }
`;

const Menu = ({
  saveData,
  changePage,
}) => {
  return (
    <>
      <Header className="header">
        <ul className="default">
          <li className="back"><Link to="/" onClick={() => {
            changePage("main");
          }} ><span className="ico"></span></Link></li>
          <li className="lv"><span className="ico">
            <span className="txt number">{saveData.info.lv}</span></span><span className="txt">{saveData.info.id}</span>
          </li>
          <li className="diamond">
            <span className="ico"></span><span className="txt won number_w">{saveData.info.diamond}</span>
          </li>
          <li className="money">
            <span className="ico"></span><span className="txt won number_w">{saveData.info.money}</span>
          </li>
          <li className="setup">
            <span className="ico"></span>
          </li>
          <li className="chat">
            <span className="ico"></span>
          </li>
          {/* <span class="frame_bar"><span class="bar"></span><span class="txt number_w">80</span></span> */}
        </ul>
      </Header>
    </>
  );
}

export default Menu;
