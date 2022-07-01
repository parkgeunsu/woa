import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from 'App';

const Header = styled.div`
  li .txt{background:url(${({ bar}) => bar}) repeat-x 0 center;background-size:100% 22px;border-image:url(${({ frameMain}) => frameMain}) 6 stretch;}
  li.back .ico{background-image:url(${({ iconBack }) => iconBack});}
  li.chat{float:right;}
  li.chat .ico{background-image:url(${({ iconChat }) => iconChat});}
  li.setup{float:right;margin:0;}
  li.setup .ico{background-image:url(${({ iconSetup }) => iconSetup});}
  li.lv .ico{position:absolute;background-image:url(${({ iconLv }) => iconLv});text-align:center;line-height:32px;z-index:2;}
  li.diamond .ico{position:absolute;background-image:url(${({ iconDia }) => iconDia});}
  li.money .ico{position:absolute;background-image:url(${({ iconGold }) => iconGold});}
  li.menu li.view_type{margin:0 5px 0 0;width:20px;height:33px;background:url(${({ iconAllview }) => iconAllview}) no-repeat center center;background-size:50px;}
  li.menu li.view_type.on{background-image:url(${({ iconLargeview }) => iconLargeview});background-size:50px;}
`;

const Menu = ({
  navigate,
  saveData,
  changePage,
}) => {
  const imgSet = useContext(AppContext).images;
  return (
    <>
      <Header className="header" iconBack={imgSet.icon.iconBack} iconChat={imgSet.icon.iconChat} iconSetup={imgSet.icon.iconSetup} iconLv={imgSet.icon.iconLv} iconDia={imgSet.icon.iconDia} iconGold={imgSet.icon.iconGold} iconAllview={imgSet.icon.iconAllview} iconLargeview={imgSet.icon.iconLargeview} bar={imgSet.etc.bar0} frameMain={imgSet.etc.frameMain}>
        <ul className="default">
          <li className="back"><span className="ico" onClick={() => {
            navigate('/');
            changePage("main");
          }}></span></li>
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
