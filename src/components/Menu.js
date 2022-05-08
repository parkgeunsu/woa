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
    .default{flex:1;padding:0 10px;}
    .default > li{position:relative;float:left;margin:0 0 0 5px;padding:5px 0;}
    .default > li:first-of-type{margin:0;}
    li .ico{display:inline-block;width:39px;height:34px;}
    li .txt{display:inline-block;}
    li.back .ico{width:30px;background:url(${iconBack}) no-repeat center center;background-size:39px;}
    li.id{width:110px;height:34px;}
    li.id{font-weight:bold;font-family:'Noto Sans Black';font-size: 14px;line-height:34px;background:-webkit-linear-gradient(#ffcd9b, #e17000);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
    li.id .txt1{}
    li.id .txt2{margin:0 5px;}
    li.chat{float:right;}
    li.chat .ico{width:37px;background:url(${iconChat}) no-repeat center center;background-size:45px;}
    li.setup{float:right;margin:0;}
    li.setup .ico{width:30px;background:url(${iconSetup}) no-repeat center center;background-size:45px;}
    li.lv{float:right;}
    li.lv .ico{position:absolute;width:28px;background:url(${iconLv}) no-repeat center center;background-size:39px;text-align:center;line-height:32px;z-index:2;}
    li.lv .frame_bar{display:inline-block;position:relative;width:50px;height:19px;margin:4px 0 0 10px;padding:0 5px 0 8px;background:url(${bar0}) repeat-x 0 center;background-size:100% 22px;border-radius:5px;border:3px solid transparent;border-image:url(${frame}) 6 stretch;}
    li.lv .txt{}
    li.lv .ico .txt{margin:-4px 0 0 0;}
    li.lv .frame_bar .bar{display:inline-block;position:absolute;margin:auto 0;left:0;right:0;top:0;bottom:0;width:50%;height:90%;background:url(${bar1}) repeat-x 0 center;}
    li.lv .frame_bar .txt{position:absolute;left:20px;top:1px;}
    li.diamond{float:right;}
    li.diamond .ico{position:absolute;width:26px;background:url(${iconDia}) no-repeat center center;background-size:42px;}
    li.diamond .txt{margin:4px 0 0 10px;padding:0 5px 0 15px;width:49px;height:19px;background:url(${bar0}) repeat-x 0 center;background-size:100% 22px;border-radius:5px;border:3px solid transparent;border-image:url(${frame}) 6 stretch;text-align:right;}
    li.money{float:right;}
    li.money .ico{position:absolute;width:26px;background:url(${iconGold}) no-repeat center center;background-size:42px;}
    li.money .txt{margin:4px 0 0 10px;padding:0 5px 0 15px;width:77px;height:19px;background:url(${bar0}) repeat-x 0 center;background-size:100% 22px;border-radius:5px;border:3px solid transparent;border-image:url(${frame}) 6 stretch;text-align:right;}
    li.menu{float:right;overflow:hidden;}
    li.menu li{position:relative;float:left;visibility:hidden;height:100%;text-align:center;}
    li.menu li.used{visibility:visible;}
    li.menu li.view_type{margin:0 5px 0 0;width:20px;height:33px;background:url(${iconAllview}) no-repeat center center;background-size:50px;}
    li.menu li:last-of-type{margin:0;}
    li.menu li.view_type.on{background-image:url(${iconLargeview});background-size:50px;}
  }
`;

const Menu = () => {
  return (
    <>
      <Header className="header">
        <ul className="default">
          <li className="back"><Link to="/"><span className="ico"></span></Link></li>
          <li className="lv"><span className="ico"><span className="txt number">11</span></span><span className="txt">ID</span></li>
          <li className="diamond"><span className="ico"></span><span className="txt won number_w">91991</span></li>
          <li className="money"><span className="ico"></span><span className="txt won number_w">987</span></li>
          <li className="setup"><span className="ico"></span></li>
          <li className="chat"><span className="ico"></span></li>
          {/* <span class="frame_bar"><span class="bar"></span><span class="txt number_w">80</span></span> */}
        </ul>
      </Header>
    </>
  );
}

export default Menu;
