import React, { useState } from 'react';
import styled from 'styled-components';
import { util } from 'components/Libs';

const Items = styled.div`
  display:none;
  &{
    dd{position:relative;}
    .animal_item_pic{position:relative;margin:0 auto;width:60%;padding-top:60%;}
    .animal_item_pic .line{}
    .animal_item_pic .line span{position:absolute;width:0;height:2px;background:transparent;border-top:1px solid #fff;border-bottom:1px solid #fff;}
    .equip_items{position:relative;width:100%;}
    .has_items{padding:5px 0;}
    .h_items{display:flex;flex-flow:wrap;width:100%;}
  }
`;

const CharacterItems = ({
  slotIdx,
}) => {
  const gameData = util.loadData("gamedata");
  const saveData = util.loadData("savedata");
  return (
    <>
      <Items className="items">
        <dl className="info_group it_group">
          <dt>ITEM<span>(아이템 착용)</span></dt>
          <dd>
            <div className="equip_items">
              <div className="animal_item_pic">
                <span className="line line1"><span className="l1"></span><span className="l2"></span><span className="dot"></span></span>
                <span className="line line2"><span className="l1"></span><span className="l2"></span><span className="dot"></span></span>
                <span className="line line3"><span className="l1"></span><span className="l2"></span><span className="dot"></span></span>
                <span className="line line4"><span className="l1"></span><span className="l2"></span><span className="dot"></span></span>
                <span className="line line5"><span className="l1"></span><span className="l2"></span><span className="dot"></span></span>
                <span className="line line6"><span className="l1"></span><span className="l2"></span><span className="dot"></span></span>
                <span className="line line7"><span className="l1"></span><span className="l2"></span><span className="dot"></span></span>
                <span className="line line8"><span className="l1"></span><span className="l2"></span><span className="dot"></span></span>
              </div>
              <ul className="e_items">
                <li className="item0"></li>
                <li className="item1"></li>
                <li className="item2"></li>
                <li className="item3"></li>
                <li className="item4"></li>
                <li className="item5"></li>
                <li className="item6"></li>
                <li className="item7"></li>
              </ul>
            </div>
            <div className="has_items scroll-y">
              <ul className="h_items">
                <li className="item1"></li>
                <li className="item1"></li>
                <li className="item2"></li>
                <li className="item4"></li>
                <li className="item5"></li>
                <li className="item5"></li>
                <li className="item3"></li>
                <li className="item2"></li>
                <li className="item5"></li>
              </ul>
            </div>
          </dd>
        </dl>
      </Items>
    </>
  );
}

export default CharacterItems;
