import React, { useState } from 'react';
import styled from 'styled-components';

const ItemEnhance = styled.div`
  display:block;position:absolute;left:0;right:0;top:100%;bottom:0;padding:10px 20px;background:rgba(0,0,0,.8);box-sizing:border-box;border:5px solid transparent;border-image:url(../images/frame/frame_chback.png) 5 round;z-index:3;
  &{
    .info_group{display:flex;flex-direction:column;width:100%;height:100%;box-sizing:border-box;}
    .info_group dt{padding:0 0 10px;font-size:1rem;color:#fff;text-align:center;}
    .info_group dt span{display:inline-block;margin:0 0 0 5px;color:#999;}
    .info_group dd{display:flex;overflow:hidden;}

    .hole_item{position:relative;flex:1;}
    .hole_item .item{position:relative;margin:0 4.5px 4.5px 0;padding-top:100%;width:100%;height:0;box-sizing:border-box;border:1px solid #fff;background-position:center center;background-repeat:no-repeat;}
    .hole_item .item .pic{position:absolute;left:0;right:0;bottom:0;top:0;width:100%;background-repeat:no-repeat;}
    .hole_item .item_lv{position:absolute;left:0;top:0;padding:5px;z-index:2;background:rgba(0,0,0,.5);text-align:left;font-size:0.875rem;font-weight:600;}
    .hole_item .item_name{margin:2px 0 5px 0;font-weight:600;color:#fff;font-size:0.75rem;text-align:center;}
    .hole{left:15%;right:15%;width:70%;}
    .item_info li{display:flex;flex-direction:column;align-items:center;}
    .item_info li span{color:#fff;}
    .item_info li .item_grade{font-weight:600;color:#fff;text-align:center;}
    .item_info li.item_eff{padding:5px 10px;box-sizing:border-box;border:1px solid #fff;}
    .item_info li.item_hole{padding:5px 10px;box-sizing:border-box;border:1px solid #fff;}
    .item_info li.item_hole img{margin-left:5px;height:15px;vertical-align:middle;}
    .item_info li.item_eff span{margin-bottom:5px;}
    .item_info li.item_eff span:last-of-type{margin-bottom:0;}

    .has_items{flex:.7;margin:0 0 0 5px;}
    .has_items .item{margin:0 5px 5px 0;padding-top:calc(50% - 2.5px);width:calc(50% - 2.5px);}
    .has_items .item:nth-of-type(2n){margin:0 0 5px 0;}
    .h_items{display:flex;flex-flow:wrap;width:100%;}
    .has_stones{flex:.7;margin:0 0 0 5px;}
    .has_stones .item{margin:0 5px 5px 0;padding-top:calc(50% - 2.5px);width:calc(50% - 2.5px);}
    .has_stones .item:nth-of-type(2n){margin:0 0 5px 0;}
    dd{position:relative;}
  }
`;

const CharacterItemEnhance = () => {
  return (
    <>
      <ItemEnhance className="item_enhance transition">
        <dl className="info_group it_group">
          <dt>ITEM<span>(아이템 강화)</span></dt>
          <dd>
            <div className="hole_item" flex-h="true">
              <div className="item_target"></div>
              <div className="item_info scroll-y"></div>
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
                <li className="item1"></li>
                <li className="item2"></li>
                <li className="item4"></li>
                <li className="item5"></li>
                <li className="item5"></li>
                <li className="item3"></li>
                <li className="item2"></li>
                <li className="item5"></li>
                <li className="item3"></li>
                <li className="item2"></li>
                <li className="item5"></li>
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
            <div className="has_stones scroll-y">
              <ul className="h_items">
                <li className="item1"></li>
                <li className="item1"></li>
                <li className="item2"></li>
                <li className="item4"></li>
                <li className="item5"></li>
                <li className="item5"></li>
                <li className="item3"></li>
                <li className="item1"></li>
                <li className="item1"></li>
                <li className="item2"></li>
                <li className="item4"></li>
                <li className="item5"></li>
                <li className="item5"></li>
                <li className="item3"></li>
                <li className="item2"></li>
                <li className="item1"></li>
                <li className="item1"></li>
                <li className="item2"></li>
                <li className="item4"></li>
                <li className="item5"></li>
                <li className="item5"></li>
                <li className="item3"></li>
                <li className="item2"></li>
                <li className="item1"></li>
                <li className="item1"></li>
                <li className="item2"></li>
                <li className="item4"></li>
                <li className="item5"></li>
                <li className="item5"></li>
                <li className="item3"></li>
                <li className="item2"></li>
                <li className="item1"></li>
                <li className="item1"></li>
                <li className="item2"></li>
                <li className="item4"></li>
                <li className="item5"></li>
                <li className="item5"></li>
                <li className="item3"></li>
                <li className="item2"></li>
                <li className="item2"></li>
                <li className="item5"></li>
              </ul>
            </div>
          </dd>
        </dl>
      </ItemEnhance>
    </>
  );
}

export default CharacterItemEnhance;
