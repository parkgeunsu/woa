import React, { useState } from 'react';
import styled from 'styled-components';

const ChList = styled.div`
  position:absolute;bottom:4%;left:20px;right:20px;height:10.2vh;
  &{
    ul{padding:5px;width:100%;height:100%;}
    ul li{display:inline-block;position:relative;width:5vh;height:calc(5vh * 1.3);transform-origin:center bottom;background: url(../images/card/card_frame.png);background-size:100% 100%;font-size:0;transform:translate(0,50%);transition:all .3s;}
    ul li span{position:absolute;left:0;right:0;top:0;bottom:0;background-size:100%;background-repeat:no-repeat;background-position:center 0;}
    ul li .list_ch{z-index:1;}
    ul li .list_chstyle{z-index:2;}
    ul li .list_ring{background-image:url(../images/ring/back.png);}
    ul li.g1{background-color:#fff;}
    ul li.g2{background-color:#00a90c;}
    ul li.g3{background-color:#0090ff;}
    ul li.g4{background-color:#f4ea19;}
    ul li.g5{background-color:#a800ff;}
    ul li.g6{background-color:#ff8000;}
    ul li.g7{background-color:#ff2a00;}
    ul li.on{transform:translate(0,10%);z-index:1;}
    ul li.g1.on{box-shadow:0 0 8px #fff,0 0 3px #fff;}
    ul li.g2.on{box-shadow:0 0 8px #00a90c,0 0 3px #00a90c;}
    ul li.g3.on{box-shadow:0 0 8px #0090ff,0 0 3px #0090ff;}
    ul li.g4.on{box-shadow:0 0 8px #f4ea19,0 0 3px #f4ea19;}
    ul li.g5.on{box-shadow:0 0 8px #a800ff,0 0 3px #a800ff;}
    ul li.g6.on{box-shadow:0 0 8px #ff8000,0 0 3px #ff8000;}
    ul li.g7.on{box-shadow:0 0 8px #ff2a00,0 0 3px #ff2a00;}
  } 
`;

const ChracterHeader = () => {
  return (
    <>
      <ChList className="ch_list scroll-x"></ChList>
    </>
  );
}

export default ChracterHeader;
