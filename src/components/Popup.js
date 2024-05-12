import { AppContext } from 'App';
import { Text } from 'components/Atom';
import { Button } from 'components/Button';
import { ChPic, IconPic, ItemPic, MarkPic } from 'components/ImagePic';
import { util } from 'components/Libs';
import PopupContainer from 'components/PopupContainer';
import CharacterCard from 'pages/CharacterCard';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledIconPic = styled(IconPic)`
  position: absolute;
  left: 15%;
  top: 15%;
  width: 70%;
  height: 70%;
  z-index: 1;
`;
const PopupRelation = styled.ul`
  margin: auto auto;
  width: 80%;
  flex-flow: wrap;
  li img{
    width: 100%;
  }
  li .name{
    position:absolute;
    z-index:1;
    left:0;
    right:0;
    top:50%;
    padding:5px;
    text-align:center;
    font-size:0.75rem;
    line-height:12px;
    letter-spacing:-1px;
    color:#000;
    font-weight:600;
    background:rgba(255,255,255,.4);
  }
  .people_list{
    position:relative;
    margin:5px;
    padding-top:calc(33.3% - 10px);
    width:calc(33.3% - 10px);
    height:0;
    border-radius:100px;
    font-size:0;
    overflow:hidden;}
`;
const PopupRelationList = styled.li`
  ${'' /* background-image:url(${({ringDisplay}) => ringDisplay}); */}
  background-size:cover;
  box-shadow:${({gameData, chData}) => (
      `0 0 13px ${gameData.chGradeColor[chData.grade]}, 0 0 8px ${gameData.chGradeColor[chData.grade]}, 0 0 5px ${gameData.chGradeColor[chData.grade]}, 0 0 2px ${gameData.chGradeColor[chData.grade]}`
  )};
`;
const PopupRelationListCh = styled.span`
  position:absolute;
  left:0;
  right:0;
  bottom:0;
  top:0;
  background-image:url(${({chDisplay}) => chDisplay});
  background-size:100%;background-position:center -10%;
`;
const PopupApplyState = styled.ul`
  margin: auto auto;
  width: 80%;
`;
const StateList = styled.li`
  display: flex;
  margin: 0 0 10px 0;
  justify-content: space-between;
  .name{padding:0 0 0 5px;width:22%;font-size:0.688rem;color:#999;text-align:left;}
  .name b{display:block;font-size:0.875rem;color:#fff;font-weight:600;}
  .current{width:48%;font-size:1rem;font-weight:600;color:#0b7;text-align:center;letter-spacing:-1px;}
  .current b{font-size:0.875rem;color:#0b7;text-align:center;}
  .total{padding:0 5px 0 0;width:30%;font-size:1.5rem;font-weight:600;color:#0b7;text-align:right;}
  &:last-of-type{
    margin: 0;
  }
`;
const Img = styled.img.attrs(
  ({imgurl}) => ({
    src: imgurl 
  })
)``;
const StyledButton = styled(Button)`
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.75), rgba(255,255,255,0.5));
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.5), 0 0 1px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0,0,0,1);
  border-radius: 20px;
  color:rgba(255,255,255,0.9);
  line-height:1;
`;
const PopupWrap = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,.8);
  }
  &.none_back:after {
    display: none;
  }
`;
const PopupCont = styled.div`
  display:flex;
  position:absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;
  z-index:2;
  flex-direction:column;
  align-items:center;
`;
const PopupClose = styled.div`
  position:absolute;
  right:5px;
  top:10px;
  z-index:1;
  span {
      display:block;
      position:absolute;
      right:10px;
      top:20px;
      width:30px;
      height:5px;
      background:#fff;
      box-shadow:0 0 10px #fff;
    &:first-of-type {
      transform-origin:50% 50%;transform:rotate(135deg);
    }
    &:last-of-type {
      transform-origin:50% 50%;transform:rotate(45deg);
    }
  }
`;
const PopupItemContainer = styled.ul`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  margin: auto auto;
  width: 80%;
  max-height: 80%;
  background: rgba(0,0,0,.7);
  border: 5px solid transparent;
  border-image: url(${({frameBack}) => frameBack}) 5 round;
`;
const PopupItemList = styled.li`
  display: flex;
  margin: 5px 0 0 0;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  ${({type, frameBack}) => {
    switch(type) {
      case 'header':
        return `
          padding: 5px 10px;
          text-align: center;
          background: rgba(0,0,0,.7);
          background-image: radial-gradient(at 50%, #930 0%, #691500 40%, #000 80%);
          border-bottom: 5px solid transparent;
          border-image: url(${frameBack}) 5 round;
          justify-content: center;
        `;
      case 'footer':
        return `
          justify-content: space-between;
          align-items: center;
          background: rgba(0,0,0,.7);
          border-top: 5px solid transparent;
          border-image: url(${frameBack}) 5 round;
          button {
            margin: 0;
          }
        `;
      case 'animalCoin_slot':
        return `
          margin: 0 0 5px 0;
          padding: 0 10px;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        `;
      case 'eff':
        return `
          flex-direction: column;
        `;
      case 'hole':
        return `
        `;
      default:
        break;
    }
  }};
`;
const PopupItemName = styled.span`
  color: ${({ grade }) => grade};
  text-shadow: -1px -1px 1px rgba(255,255,255,.5), 1px 1px 1px #000;
  line-height:1.2;font-size:0.938rem;font-weight:600;
`;
const PopupItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 0 10px;
  flex: 1;
  span{display:inline-block;vertical-align:middle;}
  .item_top{display:flex;justify-content:space-between;margin:0 0 15px 0;color:#bbb;font-size:0.75rem;}
  .item_bottom{margin:0 0 10px 0;}
  .item_description{
    flex:1;
    font-family:serif;
    line-height:1.2;
    font-size:0.688rem;
    color:#d3a859;
    font-weight:600;
  }
  .item_kg{text-align:right;font-weight:600;color:#bbb;}
  .item_grade {
    color: ${({ color }) => color};
  }
`;
const PopupItemTitle = styled(Text)`
  margin: 0 0 5px 0;
`;
const PopupItem = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border: 5px double #c80;
  &:after{
    display:block;
    content:'';
    width:100%;
    height:100%;
  }
  ${({sealed}) => sealed ? `
    svg {
      filter: brightness(0.3) drop-shadow(0px 0px 1px #fff);
    }
    &:before{
        content: '?';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        z-index: 1;
        font-size: 2.5rem;
      }
  `: ''}
  ${({part, grade}) => {
    if (grade) {
      switch (grade) {
        case 'normal':
          return `
            background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-normal) 100%);
          `;
        case 'magic':
          return `
            background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-magic) 100%);
          `;
        case 'rare':
          return `
            background-image:radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-rare) 100%);
          `;
        case 'epic':
          return `
            background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-epic) 100%);
          `;
        case 'set':
          return `
            background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-set) 100%);
          `;
        case 'unique':
          return `
            background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-unique) 100%);
          `;
        case 'legend':
          return `
            background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-legend) 100%);
          `;
        default:
          break;
      }
    } else {
      switch(part) {
        case "1":
          return `
            background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-red) 100%);`;
        case "2":
          return `
            background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-green) 100%);
          `;
        case "3":
          return `
            background-image:radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-blue) 100%);
          `;
        case "4":
          return `
            background-image:radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-lightblue) 100%);
          `;
        case "5":
          return `
            background-image:radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-yellow) 100%);
          `;
        case "10":
          return `
            background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-grey) 100%);
          `;
        case "11":
          return `
            background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-point1) 100%);
          `;
        case "12":
          return `
            background-image: radial-gradient(at 30% 30%,rgba(255,255,255,.5) 0%,var(--color-b) 100%);
          `;
        case "13":
          return `
            background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-point5) 100%);
          `;
        case "14":
          return `
            background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-point5) 100%);
          `;
        default:
          break;
      }
    }
  }}
`;
const PopupItemPrice = styled.div`
  span{display:inline-block;margin:0 5px 0 0;font-size:0.875rem;color:#c80;}
  em{font-size:0.875rem;color:#fff;vertical-align:middle;}
`;
const SkillImg = styled.div`
  position: relative;
  margin: 0 10px 0 0;
  width: 100px;
  height: 100px;
  font-size: 0;
  border-radius: 40px;
  box-shadow: 3px 3px 5px #000;
`;
const getSetChk = (has_item, n) => {//셋트 아이템 체크
  let chk = false;
  has_item.forEach((v)=>{
    if(v.idx === n){
      chk = true;
    }
  });
  return chk ? 'on' : '';
}
const makeMark = (markNum, img) => {
  let markTag = '';
  for (let i = 0; i < markNum; ++i) {
    markTag += `<span><img src="${img}" class="light"/><img src="${img}" class="front"/><img src="${img}" class="shadow"/></span>`
  }
  return markTag;
}
const PopupGuide = styled.div`
  margin:auto auto;width:80%;flex-flow:wrap;
  .guide_title{margin:0 0 10px 0;font-size:1.125rem;font-weight:600;text-align:center;}
  .guide_cont{font-size:0.875rem;line-height:1.5;}
  .guide_cont ul{width:100%;}
  .guide_cont li{position:relative;margin:0 0 10px 0;padding:0 0 0 15px;line-height:1.4;}
  .guide_cont li:before{content:"";position:absolute;left:0;top:8px;width:7px;height:2px;background:#fff;}
`;
const PopupDescription = styled.div`
  display:flex;margin:auto auto;width:80%;flex-flow:wrap;
  .skill_icon:before{content:"";display:block;position:absolute;top:13%;left:13%;width:80%;height:80%;background-repeat:no-repeat;filter:brightness(0);}
  .skill_icon:after{content:"";display:block;position:absolute;top:10%;left:10%;width:80%;height:80%;background-repeat:no-repeat;}
  .skill_icon.cate2:before{content:"";display:block;position:absolute;top:13%;left:13%;width:80%;height:80%;background-repeat:no-repeat;background-position:center center;filter:brightness(0);}
  .skill_icon.cate2:after{content:"";display:block;position:absolute;top:10%;left:10%;width:80%;height:80%;background-repeat:no-repeat;background-position:center center;}
  .skill_icon.cate4:before{content:"";display:block;position:absolute;top:13%;left:13%;width:80%;height:80%;background-repeat:no-repeat;background-position:center center;filter:brightness(0);}
  .skill_icon.cate4:after{content:"";display:block;position:absolute;top:10%;left:10%;width:80%;height:80%;background-repeat:no-repeat;background-position:center center;}
  dl{flex:1;}
  dt{margin:0 0 10px 0;text-align:center;font-size:0.938rem;font-weight:600;}
  dd{line-height:1.2;text-align:center;}
  .skill_eff{margin:10px 0 0 0;width:100%;}
  .skill_eff_list{margin:0 0 5px 0;font-size:0.875rem;text-align:center;}
  .skill_eff_list.on{font-size:1rem;font-weight:600;color:#ff2a00;text-shadow:0 0 10px #ff2a00;}
`;
const typeAsContent = (type, dataObj, saveData, changeSaveData, gameData, imgSet, msgText, showMsg, showPopup, lang, navigate, timeoutRef) => {
	if (type === 'relation') {
    const member = dataObj.relation.member;
		return (
			<PopupRelation flex-center="true" className="people">
        {member && member.map((data ,idx) => {
          const chData = gameData.ch[idx];
          return (
            <PopupRelationList className="people_list" key={idx} gameData={gameData} chData={chData} >
            {/* ringDisplay={ringImg[chData.element]} */}
              <Img imgurl={imgSet.images.transparent800} />
              <PopupRelationListCh>
                <ChPic pic="ch" idx={chData.display} />
              </PopupRelationListCh>
              <span className="name">{chData.na1}</span>
            </PopupRelationList>
          )
        })}
			</PopupRelation>
		);
	} else if (type === 'applyState') {
    return (
      <PopupApplyState>
        {gameData.battleStateName.map((bData, idx) => {
          return (
            <StateList key={idx} className={bData}>
              <span className="name">{gameData.msg.state[bData][lang]}<b>{gameData.msg.state[bData].en}</b></span>
              <span className="current">{`${saveData.ch[dataObj.chSlotIdx]['bSt'+idx]} + `}<b>{`${saveData.ch[dataObj.chSlotIdx]['iSt'+idx]}`}</b></span>
              <span className="total">{saveData.ch[dataObj.chSlotIdx]['bSt'+idx] + saveData.ch[dataObj.chSlotIdx]['iSt'+idx]}</span>
            </StateList>
          )
        })}
      </PopupApplyState>
    )
  } else if (type === 'equip') {
    const itemsGrade = dataObj.saveItemData.grade < 5 ? 0 : dataObj.saveItemData.grade - 5;
    const items = dataObj.saveItemData.part === 3 ? gameData.items.equip[dataObj.saveItemData.part][dataObj.saveItemData.weaponType][itemsGrade][dataObj.saveItemData.idx] : gameData.items.equip[dataObj.saveItemData.part][0][itemsGrade][dataObj.saveItemData.idx];
    const saveItems = dataObj.saveItemData;
    const grade = saveItems.grade || items.grade;
    const setsInfo = gameData.items.set_type[items.set];
    const totalEff = util.getTotalEff(saveItems, gameData);
		return (
			<PopupItemContainer className="items" frameBack={imgSet.etc.frameChBack}>
        <PopupItemList frameBack={imgSet.etc.frameChBack} type="header" grade={gameData.itemGrade.color[grade]}>
          <PopupItemName dangerouslySetInnerHTML={{__html: `${saveItems.colorantSet ? util.getColorant(saveItems.colorantSet, gameData).na[lang] : ''} ${saveItems.modifier[lang]}<br/>${items.na[lang]}`}}>
          </PopupItemName>
        </PopupItemList>
        <PopupItemList flex="true">
          <PopupItem part={items.part} grade={gameData.itemGrade.txt_e[saveItems.grade].toLowerCase()}>
            <ItemPic type="equip">
              <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[items.display], saveItems.color, saveItems.svgColor || saveItems.id)}}>
              </svg>
            </ItemPic>  
          </PopupItem>
          <div flex-h="true" style={{flex: 1,}}>
            <PopupItemInfo className="item_cont" color={gameData.itemGrade.color[grade]}>
              <div className="item_top">
                <span className="item_grade">{lang === 'ko' ? gameData.itemGrade.txt_k[grade] : gameData.itemGrade.txt_e[grade]}</span> <span className="item_type">{gameData.itemType[items.part][lang]}</span>
              </div>
              <div className="item_description" dangerouslySetInnerHTML={{__html: `"${items.txt[lang]}"`}}></div>
              <div className="item_kg">{items.kg}kg</div>
            </PopupItemInfo>
            {/* ${gameData.itemGrade.txt_e[items.grade]}  */}
          </div>
        </PopupItemList>
        <PopupItemList className="item_list item_typeSlot" type="animalCoin_slot">
          <div className="item_type">
            <MarkPic length={saveItems.markNum} pic="animalType" idx={saveItems.mark} />
          </div>
          <div className="item_slot">
            {saveItems.hole.map((holeData, idx) => {
              const holePic = holeData !== 0 ? gameData.items.hole[holeData.idx].display : 0;
              return (
                <div key={`hole${idx}`} className={`item_holes ${holePic !== 0 ? 'fixed': ''}`}>
                  <span className="item_holeback">
                    <ItemPic pic="itemEtc" type="hole" idx={holePic} />
                  </span>
                </div>
              )
            })}
          </div>
        </PopupItemList>
        <PopupItemList className="item_list item_eff" type="eff">
          <PopupItemTitle align="left" code="t1" color="grey">{gameData.msg.itemInfo.itemEffect[lang]}</PopupItemTitle>
          {totalEff.map((eff, idx) => {
            if (eff.type === 100) {
              return (
                <div key={idx} className="item_effs">
                  <span className="cate">{util.getEffectType(eff.type, lang)}</span>
                  {eff.skList.map((sk, skIndex) => {
                    return (
                      <span key={`skIndex${skIndex}`} className="total">{`${gameData.skill[sk.idx].na[lang]} LV.${sk.lv}`}</span>
                    )
                  })}
                </div>
              )
            } else {
              return (
                <div key={idx} className="item_effs">
                  <span className="cate">{util.getEffectType(eff.type, lang)}</span>
                  {eff.base > 0 && <span className="base">{eff.base}</span>}
                  {eff.add > 0 && <span className="add">{eff.add}</span>}
                  {eff.hole > 0 && <span className="hole">{eff.hole}</span>}
                  <span className="total">{eff.base + eff.add + eff.hole}</span>
                </div>
              )
            }
          })}
        </PopupItemList>
        <div style={{width:"100%"}} className="scroll-y">
          {saveItems.baseEff.length > 0 && (
            <PopupItemList className="item_list item_eff" type="eff">
              <PopupItemTitle align="left" code="t1" color="grey">{gameData.msg.itemInfo.basicEffect[lang]}</PopupItemTitle>
              {saveItems.baseEff.map((data, idx) => {
                const grade = saveItems.grade > 3 ? 3 : saveItems.grade - 1;
                return (
                  <div key={idx} className="item_effs">{`${util.getEffectType(data.type, lang)} ${data.num[grade]}`}</div>
                ) 
              })}
            </PopupItemList>
          )}
          {saveItems.addEff.length > 0 && (
            <PopupItemList className="item_list item_eff" type="eff">
              <PopupItemTitle align="left" code="t1" color="grey">{gameData.msg.itemInfo.addEffect[lang]}</PopupItemTitle>
              {saveItems.addEff.map((data, idx) => {
                const grade = saveItems.grade > 3 ? 3 : saveItems.grade - 1;
                if (data.type === 100) {
                  return (
                    <div key={idx} className="item_effs add">{`${util.getEffectType(data.type, lang)} ${gameData.skill[data.skIdx].na[lang]} LV.${data.skLv}`}</div>
                  )
                } else {
                  return (
                    <div key={idx} className="item_effs add">{`${util.getEffectType(data.type, lang)} ${data.num[0]}`}</div>
                  )
                } 
              })}
            </PopupItemList>
          )}
          {saveItems.hole.length > 0 && (
            <PopupItemList className="item_list item_hole" type="hole">
              <PopupItemTitle align="left" code="t1" color="grey">{gameData.msg.itemInfo.socketEffect[lang]}</PopupItemTitle>
              {totalEff.map((data, idx) => {
                if (data.hole > 0) {
                  return (
                    <div key={idx} className="item_effs hole">{`${util.getEffectType(data.type, lang)} ${data.hole}`}</div>
                  )
                }
              })}
            </PopupItemList>
          )}
          <PopupItemList className="item_list item_set" type="set">
            <div className="item_setNa">{setsInfo.na}</div>
            {setsInfo.part && setsInfo.part.map((data, idx) => {
              return (
                <div key={idx} className={`item_set_piece ${dataObj.chSlotIdx ? getSetChk(saveData.ch[dataObj.chSlotIdx].items, data) : ''}`}>{gameData.items.equip[data].na}</div>
              ) 
            })}
          </PopupItemList>
        </div>
        <PopupItemList frameBack={imgSet.etc.frameChBack} type="footer">
          <PopupItemPrice>
            <span>{gameData.msg.itemInfo.sellPrice[lang]}</span>
            <em>{`₩${items.price * saveItems.grade}`}</em>
          </PopupItemPrice>
          <div className="item_button" flex="true">
            <StyledButton type="icon" icon={{type:'commonBtn', pic:'icon100', idx:27}} onClick={(e) => {//해제
              util.buttonEvent({
                event: e,
                type: 'itemRelease',
                data: dataObj,
                saveData: saveData,
                changeSaveData: changeSaveData,
                gameData: gameData,
                msgText: msgText,
                showMsg: showMsg,
                showPopup: showPopup,
                lang: lang,
              });
              navigate('../cards', {state: {
                dataObj: {
                  chSlotIdx: dataObj.chSlotIdx,
                  chTabIdx: 5,
                  invenOpened: true,
                }
              }});
            }} data-buttontype="itemRelease" />
          </div>
        </PopupItemList>
      </PopupItemContainer>
		);
	} else if (type === 'hequip') {
    const itemsGrade = dataObj.saveItemData.grade < 5 ? 0 : dataObj.saveItemData.grade - 5;
    const items = dataObj.saveItemData.part === 3 ? gameData.items.equip[dataObj.saveItemData.part][dataObj.saveItemData.weaponType][itemsGrade][dataObj.saveItemData.idx] : gameData.items.equip[dataObj.saveItemData.part][0][itemsGrade][dataObj.saveItemData.idx];
    const saveItems = dataObj.saveItemData;
    const grade = saveItems.grade || items.grade;
    const setsInfo = gameData.items.set_type[items.set];
    const sealed = dataObj.saveItemData.sealed;
    const hasSocket = dataObj.saveItemData.slot;
    //아이템 기본, 추가, 홀 효과
    const totalEff = util.getTotalEff(saveItems, gameData);
    return (
      <PopupItemContainer className="items" frameBack={imgSet.etc.frameChBack}>
        <PopupItemList type="header" frameBack={imgSet.etc.frameChBack}>
          <PopupItemName grade={gameData.itemGrade.color[grade]} dangerouslySetInnerHTML={{__html: `${saveItems.colorantSet ? util.getColorant(saveItems.colorantSet, gameData).na[lang] : ''} ${saveItems.modifier[lang]}<br/>${items.na[lang]}`}}></PopupItemName>
        </PopupItemList>
        <PopupItemList flex="true">
          <PopupItem part={items.part} grade={gameData.itemGrade.txt_e[saveItems.grade].toLowerCase()} sealed={sealed}>
            <ItemPic type="equip">
              <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[items.display], saveItems.color, saveItems.svgColor || saveItems.id)}}>
              </svg>
            </ItemPic>
          </PopupItem>
          <div flex-h="true" style={{flex: 1,}}>
            <PopupItemInfo className="item_cont" color={gameData.itemGrade.color[grade]}>
              <div className="item_top">
                <span className="item_grade">{lang === 'ko' ? gameData.itemGrade.txt_k[grade] : gameData.itemGrade.txt_e[grade]}</span> <span className="item_type">{gameData.itemType[items.part][lang]}</span>
              </div>
              <div className="item_description" dangerouslySetInnerHTML={{__html: `"${items.txt[lang]}"`}}></div>
              <div className="item_kg">{items.kg}kg</div>
            </PopupItemInfo>
            {/* ${gameData.itemGrade.txt_e[items.grade]}  */}
          </div>
        </PopupItemList>
        <PopupItemList className="item_list item_typeSlot" type="animalCoin_slot">
          <div className="item_type">
            <MarkPic length={saveItems.markNum} pic="animalType" idx={saveItems.mark} />
          </div>
          <div className="item_slot">
            {saveItems.hole.map((holeData, idx) => {
              const holePic = holeData !== 0 ? gameData.items.hole[holeData.idx].display : 0;
              return (
                <div key={`hole${idx}`} className={`item_holes ${holePic !== 0 ? 'fixed': ''}`}>
                  <span className="item_holeback">
                    <ItemPic pic="itemEtc" type="hole" idx={holePic} />
                  </span>
                </div>
              )
            })}
          </div>
        </PopupItemList>
        <PopupItemList className="item_list item_eff" type="eff">
          <PopupItemTitle align="left" code="t1" color="grey">{gameData.msg.itemInfo.itemEffect[lang]}</PopupItemTitle>
          {totalEff.map((eff, idx) => {
            if (eff.type === 100) {
              return (
                <div key={idx} className="item_effs">
                  <span className="cate">{util.getEffectType(eff.type, lang)}</span>
                  {eff.skList.map((sk, skIndex) => {
                    return (
                      <span key={`skIndex${skIndex}`} className="total">{`${gameData.skill[sk.idx].na[lang]} LV.${sk.lv}`}</span>
                    )
                  })}
                </div>
              )
            } else {
              return (
                <div key={idx} className="item_effs">
                  <span className="cate">{util.getEffectType(eff.type, lang)}</span>
                  {eff.base > 0 && <span className="base">{eff.base}</span>}
                  {eff.add > 0 && <span className="add">{eff.add}</span>}
                  {eff.hole > 0 && <span className="hole">{eff.hole}</span>}
                  <span className="total">{sealed ? eff.base : eff.base + eff.add + eff.hole}</span>
                </div>
              )
            }
          })}
        </PopupItemList>
        <div style={{width:"100%"}} className="scroll-y">
          {!sealed && (
            <PopupItemList className="item_list item_eff" type="eff">
              <PopupItemTitle align="left" code="t1" color="grey">{gameData.msg.itemInfo.basicEffect[lang]}</PopupItemTitle>
              {saveItems.baseEff && saveItems.baseEff.map((data, idx) => {
                const grade = saveItems.grade > 3 ? 3 : saveItems.grade - 1;
                return (
                  <div key={idx} className="item_effs">{`${util.getEffectType(data.type, lang)} ${data.num[grade]}`}</div>
                ) 
              })}
            </PopupItemList>
          )}
          {saveItems.addEff.length > 0 && (
            <PopupItemList className="item_list item_eff" type="eff">
              <PopupItemTitle align="left" code="t1" color="grey">{gameData.msg.itemInfo.addEffect[lang]}</PopupItemTitle>
              {saveItems.addEff.map((data, idx) => {
                const grade = saveItems.grade > 3 ? 3 : saveItems.grade - 1;
                if (data.type === 100) {
										return (
											<div key={idx} className="item_effs add">{`${util.getEffectType(data.type, lang)} ${gameData.skill[data.skIdx].na[lang]} LV.${data.skLv}`}</div>
										)
                } else {
                  return (
                    <div key={idx} className="item_effs add">{`${util.getEffectType(data.type, lang)} ${data.num[0]}`}</div>
                  )
                }
              })}
            </PopupItemList>
          )}
          {saveItems.hole.length > 0 && (
            <PopupItemList className="item_list item_hole" type="hole">
              <PopupItemTitle align="left" code="t1" color="grey">{gameData.msg.itemInfo.socketEffect[lang]}</PopupItemTitle>
              {totalEff.map((data, idx) => {
                if (data.hole > 0) {
                  return (
                    <div key={idx} className="item_effs hole">{`${util.getEffectType(data.type, lang)} ${data.hole}`}</div>
                  )
                }
              })}
            </PopupItemList>
          )}
          <PopupItemList className="item_list item_set" type="set">
            <div className="item_setNa">{setsInfo.na}</div>
            {setsInfo.part && setsInfo.part.map((data, idx) => {
              return (
                <div key={idx} className={`item_set_piece ${dataObj.chSlotIdx ? getSetChk(saveData.ch[dataObj.chSlotIdx].items, data) : ''}`}>{gameData.items.equip[data].na}</div>
              ) 
            })}
          </PopupItemList>
        </div>
        <PopupItemList frameBack={imgSet.etc.frameChBack} type="footer">
          <PopupItemPrice>
            <span>{gameData.msg.itemInfo.sellPrice[lang]}</span>
            <em>{`₩${items.price * saveItems.grade}`}</em>
          </PopupItemPrice>
          {sealed ? (//밀봉
            <div className="item_button" flex="true">
              <StyledButton type="icon" icon={{type:'commonBtn', pic:'icon100', idx:25}} onClick={() => {//감정
                showMsg(true);
                msgText(gameData.msg.sentence.goInven[lang]);
                timeoutRef.current = setTimeout(() => {
                  util.saveHistory({
                    location: 'inven',
                    navigate: navigate,
                    callback: () => {},
                    state: {
                      dataObj: {
                        ...dataObj,
                        selectTab: 'equip',
                        selectSlot: 1,
                      }
                    },
                    isNavigate: true,
                  });
                }, 1800);
              }} data-buttontype="itemEvaluate" />
              <StyledButton type="icon" icon={{type:'commonBtn', pic:'icon100', idx:23}} onClick={() => {//판매
                if (dataObj.saveItemData.part < 4) {
                  showMsg(true);
                  msgText(gameData.msg.sentence.goShop[lang]);
                  timeoutRef.current = setTimeout(() => {
                    util.saveHistory({
                      location: 'shop',
                      navigate: navigate,
                      callback: () => {},
                      state: {
                        dataObj: {
                          ...dataObj,
                          selectTab: 'inven',
                          selectSlot: 1,
                        }
                      },
                      isNavigate: true,
                    });
                  }, 1800);
                } else {
                  showMsg(true);
                  msgText(gameData.msg.sentence.goTool[lang]);
                  timeoutRef.current = setTimeout(() => {
                    util.saveHistory({
                      location: 'tool',
                      navigate: navigate,
                      callback: () => {},
                      state: {
                        dataObj: {
                          ...dataObj,
                          selectTab: 'inven',
                          selectSlot: 1,
                        }
                      },
                      isNavigate: true,
                    });
                  }, 1800);
                }
              }} data-buttontype="itemSell" />
            </div>
          ) : (//개봉
            <div className="item_button" flex="true">
              <StyledButton type="icon" icon={{type:'commonBtn', pic:'icon100', idx:20}} onClick={(e) => {//장착
                util.buttonEvent({
                  event: e,
                  type: 'itemEquip',
                  data: dataObj,
                  saveData: saveData,
                  changeSaveData: changeSaveData,
                  gameData: gameData,
                  msgText: msgText,
                  showMsg: showMsg,
                  showPopup: showPopup,
                  lang: lang,
                });
                navigate('../cards', {state: {
                  dataObj: {
                    chSlotIdx: dataObj.chSlotIdx,
                    chTabIdx: 5,
                    invenOpened: true,
                  }
                }});
              }} data-buttontype="itemEquip" />
              <StyledButton type="icon" icon={{type:'commonBtn', pic:'icon100', idx:21}} onClick={() => {//강화
                showMsg(true);
                msgText(gameData.msg.sentence.goForge[lang]);
                timeoutRef.current = setTimeout(() => {
                  util.saveHistory({
                    location: 'enhancingStickers',
                    navigate: navigate,
                    callback: () => {},
                    state: {
                      dataObj: {
                        gameItem: dataObj.gameItem,
                        saveItemData: dataObj.saveItemData,
                        itemSaveSlot: dataObj.itemSaveSlot,
                      },
                      tabIdx: 1
                    },
                    isNavigate: true,
                  });
                }, 1800);
              }} data-buttontype="enhancingStickers" />
              {hasSocket > 0 && <StyledButton type="icon" icon={{type:'commonBtn', pic:'icon100', idx:22}} onClick={(e) => {//소켓
                showMsg(true);
                msgText(gameData.msg.sentence.goForge[lang]);
                timeoutRef.current = setTimeout(() => {
                  util.saveHistory({
                    location: 'enhancingStickers',
                    navigate: navigate,
                    callback: () => {},
                    state: {
                      dataObj: {
                        gameItem: dataObj.gameItem,
                        saveItemData: dataObj.saveItemData,
                        itemSaveSlot: dataObj.itemSaveSlot,
                      },
                      tabIdx: 0
                    },
                    isNavigate: true,
                  });
                }, 1800);
              }} data-buttontype="itemSocket" />}
              <StyledButton type="icon" icon={{type:'commonBtn', pic:'icon100', idx:23}} onClick={(e) => {//판매
                if (dataObj.saveItemData.part < 4) {
                  showMsg(true);
                  msgText(gameData.msg.sentence.goShop[lang]);
                  timeoutRef.current = setTimeout(() => {
                    util.saveHistory({
                      location: 'shop',
                      navigate: navigate,
                      callback: () => {},
                      state: {
                        dataObj: {
                          ...dataObj,
                          selectTab: 'inven',
                          selectSlot: 1,
                        }
                      },
                      isNavigate: true,
                    });
                  }, 1800);
                } else {
                  showMsg(true);
                  msgText(gameData.msg.sentence.goTool[lang]);
                  timeoutRef.current = setTimeout(() => {
                    util.saveHistory({
                      location: 'tool',
                      navigate: navigate,
                      callback: () => {},
                      state: {
                        dataObj: {
                          ...dataObj,
                          selectTab: 'inven',
                          selectSlot: 1,
                        }
                      },
                      isNavigate: true,
                    });
                  }, 1800);
                }
              }} data-buttontype="itemSell" />
            </div>
          )}
        </PopupItemList>
      </PopupItemContainer>
    );
  } else if (type === 'hole') {
    const items = gameData.items.hole[dataObj.saveItemData.idx];
    const saveItems = dataObj.saveItemData;
    return (
			<PopupItemContainer className="items" frameBack={imgSet.etc.frameChBack}>
        <PopupItemList type="header" frameBack={imgSet.etc.frameChBack}>
          <PopupItemName grade={gameData.itemGrade.color[items.grade]}>{items.na[lang]}</PopupItemName>
        </PopupItemList>
        <PopupItemList flex="true">
          <PopupItem part="11" className="item">
            <ItemPic pic="itemEtc" type="hole" idx={items.display} />
          </PopupItem>
          <div flex-h="true" style={{flex: 1,}}>
            <PopupItemInfo className="item_cont" color={gameData.itemGrade.color[items.grade]}>
              <div className="item_top">
                <span className="item_grade">{lang === 'ko' ? gameData.itemGrade.txt_k[items.grade] : gameData.itemGrade.txt_e[items.grade]}</span> <span className="item_type">{gameData.msg.title.socketJewelry[lang]}</span>
              </div>
              <div className="item_description" dangerouslySetInnerHTML={{__html: `"${items.txt[lang]}"`}}></div>
            </PopupItemInfo>
            {/* ${gameData.itemGrade.txt_e[items.grade]}  */}
          </div>
        </PopupItemList>
        <PopupItemList className="item_list item_eff" type="eff">
          <PopupItemTitle align="left" code="t1" color="grey">{gameData.msg.itemInfo.basicEffect[lang]}</PopupItemTitle>
          {saveItems.baseEff && saveItems.baseEff.map((data, idx) => {
            return (
              <div key={idx} className="item_effs">{`${util.getEffectType(data.type, lang)} ${data.num[0]}`}</div>
            ) 
          })}
        </PopupItemList>
        {saveItems.addEff?.length > 0 && (
          <PopupItemList className="item_list item_eff" type="eff">
            <PopupItemTitle align="left" code="t1" color="grey">{gameData.msg.itemInfo.addEffect[lang]}</PopupItemTitle>
            {saveItems.addEff.map((data, idx) => {
              return (
                <div key={idx} className="item_effs add">{`${util.getEffectType(data.type, lang)} ${data.num[0]}`}</div>
              ) 
            })}
          </PopupItemList>
        )}
        <PopupItemList frameBack={imgSet.etc.frameChBack} type="footer">
          <PopupItemPrice>
            <span>{gameData.msg.itemInfo.sellPrice[lang]}</span>
            <em>{`₩${items.price}`}</em>
          </PopupItemPrice>
          <div className="item_button" flex="true">
            <StyledButton type="icon" icon={{type:'commonBtn', pic:'icon100', idx:22}} onClick={() => {//소켓
              showMsg(true);
              msgText(gameData.msg.sentence.goForge[lang]);
              timeoutRef.current = setTimeout(() => {
                util.saveHistory({
                  location: 'enhancingStickers',
                  navigate: navigate,
                  callback: () => {},
                  state: {
                    dataObj: {
                      gameItem: dataObj.gameItem,
                      saveItemData: dataObj.saveItemData,
                      itemSaveSlot: 0,
                    },
                    tabIdx: 0,
                  },
                  isNavigate: true,
                });
              }, 1800);
              // util.buttonEvent({
              //   event: e,
              //   type: 'holeEquip',
              //   data: dataObj,
              //   saveData: saveData,
              //   changeSaveData: changeSaveData,
              //   gameData: gameData,
              //   msgText: msgText,
              //   showMsg: showMsg,
              //   showPopup: showPopup,
              //   lang: lang,
              // });
            }} data-buttontype="itemSocket" />
            <StyledButton type="icon" icon={{type:'commonBtn', pic:'icon100', idx:23}} onClick={(e) => {//판매
              showMsg(true);
              msgText(gameData.msg.sentence.goTool[lang]);
              timeoutRef.current = setTimeout(() => {
                util.saveHistory({
                  location: 'tool',
                  navigate: navigate,
                  callback: () => {},
                  state: {
                    dataObj: {
                      ...dataObj,
                      selectTab: 'inven',
                      selectSlot: 1,
                    }
                  },
                  isNavigate: true,
                });
              }, 1800);
              // util.buttonEvent({
              //   event: e,
              //   type: 'itemSell',
              //   data: dataObj,
              //   saveData: saveData,
              //   changeSaveData: changeSaveData,
              //   gameData: gameData,
              //   msgText: msgText,
              //   showMsg: showMsg,
              //   showPopup: showPopup,
              //   lang: lang,
              // })
            }} data-buttontype="itemSell" />
          </div>
        </PopupItemList>
      </PopupItemContainer>
    )
  } else if (type === 'upgrade') {
    const items = gameData.items.upgrade[dataObj.saveItemData.idx];
    return (
			<PopupItemContainer className="items" frameBack={imgSet.etc.frameChBack}>
        <PopupItemList type="header" frameBack={imgSet.etc.frameChBack}>
          <PopupItemName grade={gameData.itemGrade.color[items.grade]}>{items.na[lang]}</PopupItemName>
        </PopupItemList>
        <PopupItemList flex="true">
          <PopupItem part="12">
            <ItemPic pic="itemEtc" type="upgrade" idx={items.display} />
          </PopupItem>
          <div flex-h="true" style={{flex: 1,}}>
            <PopupItemInfo className="item_cont" color={gameData.itemGrade.color[items.grade]}>
              <div className="item_top">
                <span className="item_grade">{lang === 'ko' ? gameData.itemGrade.txt_k[items.grade] : gameData.itemGrade.txt_e[items.grade]}</span> <span className="item_type">{gameData.msg.title.reinforcedMaterial[lang]}</span>
              </div>
              <div className="item_description" dangerouslySetInnerHTML={{__html: `"${items.txt[lang]}"`}}></div>
            </PopupItemInfo>
            {/* ${gameData.itemGrade.txt_e[items.grade]}  */}
          </div>
        </PopupItemList>
        <PopupItemList frameBack={imgSet.etc.frameChBack} type="footer">
          <PopupItemPrice>
            <span>{gameData.msg.itemInfo.sellPrice[lang]}</span>
            <em>{`₩${items.price}`}</em>
          </PopupItemPrice>
          <div className="item_button" flex="true">
            <StyledButton type="icon" icon={{type:'commonBtn', pic:'icon100', idx:21}} onClick={() => {//강화
              showMsg(true);
              msgText(gameData.msg.sentence.goForge[lang]);
              timeoutRef.current = setTimeout(() => {
                util.saveHistory({
                  location: 'enhancingStickers',
                  navigate: navigate,
                  callback: () => {},
                  state: {
                    dataObj: {
                      gameItem: dataObj.gameItem,
                      saveItemData: dataObj.saveItemData,
                      itemSaveSlot: 0,
                    },
                    tabIdx: 1
                  },
                  isNavigate: true,
                });
              }, 1800);
              // util.buttonEvent({
              //   event: e,
              //   type: 'itemUse',
              //   data: dataObj,
              //   saveData: saveData,
              //   changeSaveData: changeSaveData,
              //   gameData: gameData,
              //   msgText: msgText,
              //   showMsg: showMsg,
              //   showPopup: showPopup,
              //   lang: lang,
              // })
            }} data-buttontype="enhancingStickers" />
            <StyledButton type="icon" icon={{type:'commonBtn', pic:'icon100', idx:23}} onClick={(e) => {//판매
              showMsg(true);
              msgText(gameData.msg.sentence.goTool[lang]);
              timeoutRef.current = setTimeout(() => {
                util.saveHistory({
                  location: 'tool',
                  navigate: navigate,
                  callback: () => {},
                  state: {
                    dataObj: {
                      ...dataObj,
                      selectTab: 'inven',
                      selectSlot: 1,
                    }
                  },
                  isNavigate: true,
                });
              }, 1800);
              // util.buttonEvent({
              //   event: e,
              //   type: 'itemSell',
              //   data: dataObj,
              //   saveData: saveData,
              //   changeSaveData: changeSaveData,
              //   gameData: gameData,
              //   msgText: msgText,
              //   showMsg: showMsg,
              //   showPopup: showPopup,
              //   lang: lang,
              // })
            }} data-buttontype="itemSell" />
          </div>
        </PopupItemList>
      </PopupItemContainer>
    )
  } else if (type === 'material') {
    const items = gameData.items.material[dataObj.saveItemData.idx];
    return (
			<PopupItemContainer className="items" frameBack={imgSet.etc.frameChBack}>
        <PopupItemList type="header" frameBack={imgSet.etc.frameChBack}>
          <PopupItemName grade={gameData.itemGrade.color[items.grade]}>{items.na[lang]}</PopupItemName>
        </PopupItemList>
        <PopupItemList flex="true">
          <PopupItem part="14">
            <ItemPic pic="itemEtc" type="material" idx={items.display} />
          </PopupItem>
          <div flex-h="true" style={{flex: 1,}}>
            <PopupItemInfo className="item_cont" color={gameData.itemGrade.color[items.grade]}>
              <div className="item_top">
                <span className="item_grade">{lang === 'ko' ? gameData.itemGrade.txt_k[items.grade] : gameData.itemGrade.txt_e[items.grade]}</span> <span className="item_type">{gameData.msg.title.material[lang]}</span>
              </div>
              <div className="item_description" dangerouslySetInnerHTML={{__html: `"${items.txt[lang]}"`}}></div>
            </PopupItemInfo>
            {/* ${gameData.itemGrade.txt_e[items.grade]}  */}
          </div>
        </PopupItemList>
        <PopupItemList frameBack={imgSet.etc.frameChBack} type="footer">
          <PopupItemPrice>
            <span>{gameData.msg.itemInfo.sellPrice[lang]}</span>
            <em>{`₩${items.price}`}</em>
          </PopupItemPrice>
          <div className="item_button" flex="true">
            <StyledButton type="icon" icon={{type:'commonBtn', pic:'icon100', idx:23}} onClick={(e) => {//판매
              showMsg(true);
              msgText(gameData.msg.sentence.goTrade[lang]);
              timeoutRef.current = setTimeout(() => {
                util.saveHistory({
                  location: 'tradingPost',
                  navigate: navigate,
                  callback: () => {},
                  state: {
                    dataObj: dataObj
                  },
                  isNavigate: true,
                });
              }, 1800);
              // util.buttonEvent({
              //   event: e,
              //   type: 'itemSell',
              //   data: dataObj,
              //   saveData: saveData,
              //   changeSaveData: changeSaveData,
              //   gameData: gameData,
              //   msgText: msgText,
              //   showMsg: showMsg,
              //   showPopup: showPopup,
              //   lang: lang,
              // })
            }} data-buttontype="itemSell" />
          </div>
        </PopupItemList>
      </PopupItemContainer>
    )
  } else if (type === 'etc') {
    const items = gameData.items.etc[dataObj.saveItemData.idx];
    return (
			<PopupItemContainer className="items" frameBack={imgSet.etc.frameChBack}>
        <PopupItemList type="header" frameBack={imgSet.etc.frameChBack}>
          <PopupItemName grade={gameData.itemGrade.color[items.grade]}>{items.na[lang]}</PopupItemName>
        </PopupItemList>
        <PopupItemList flex="true">
          <PopupItem part="13" className="item">
            <ItemPic pic="itemEtc" type="etc" idx={items.display} />
          </PopupItem>
          <div flex-h="true" style={{flex: 1,}}>
            <PopupItemInfo className="item_cont" color={gameData.itemGrade.color[items.grade]}>
              <div className="item_top">
                <span className="item_grade">{lang === 'ko' ? gameData.itemGrade.txt_k[items.grade] : gameData.itemGrade.txt_e[items.grade]}</span> <span className="item_type">{gameData.msg.title.etc[lang]}</span>
              </div>
              <div className="item_description" dangerouslySetInnerHTML={{__html: `"${items.txt[lang]}"`}}></div>
            </PopupItemInfo>
            {/* ${gameData.itemGrade.txt_e[items.grade]}  */}
          </div>
        </PopupItemList>
        <PopupItemList frameBack={imgSet.etc.frameChBack} type="footer">
          <PopupItemPrice>
            <span>{gameData.msg.itemInfo.sellPrice[lang]}</span>
            <em>{`₩${items.price}`}</em>
          </PopupItemPrice>
          <div className="item_button" flex="true">
            <StyledButton type="icon" icon={{type:'commonBtn', pic:'icon100', idx:26}} onClick={(e) => {//사용
              util.buttonEvent({
                event: e,
                type: 'itemUse',
                data: dataObj,
                saveData: saveData,
                changeSaveData: changeSaveData,
                gameData: gameData,
                msgText: msgText,
                showMsg: showMsg,
                showPopup: showPopup,
                lang: lang,
              })
            }} data-buttontype="itemUse" />
            <Button type="icon" icon={{type:'commonBtn', pic:'icon100', idx:23}} onClick={(e) => {
              showMsg(true);
              msgText(gameData.msg.sentence.goTool[lang]);
              timeoutRef.current = setTimeout(() => {
                util.saveHistory({
                  location: 'tool',
                  navigate: navigate,
                  callback: () => {},
                  state: {
                    dataObj: {
                      ...dataObj,
                      selectTab: 'inven',
                      selectSlot: 1,
                    }
                  },
                  isNavigate: true,
                });
              }, 1800);
              // util.buttonEvent({
              //   event: e,
              //   type: 'itemSell',
              //   data: dataObj,
              //   saveData: saveData,
              //   changeSaveData: changeSaveData,
              //   gameData: gameData,
              //   msgText: msgText,
              //   showMsg: showMsg,
              //   showPopup: showPopup,
              //   lang: lang,
              // })
            }} data-buttontype="itemSell" />
          </div>
        </PopupItemList>
      </PopupItemContainer>
    )
  } else if (type === 'guide') {
    const guide_txt = dataObj.data.txt[lang];
    return (
      <PopupGuide>
        <dl>
          <dt className="guide_title">{dataObj.data.title[lang]}</dt>
          <dd className="guide_cont">
            <ul>
            {guide_txt && guide_txt.map((txt, idx) => {
              return (
                <li key={idx}>{txt}</li>
              )
            })}
            </ul>
          </dd>
        </dl>
      </PopupGuide>
    );
  } else if (type === 'skillDescription') {
    const skData = dataObj.sk,
      skillLv = dataObj.skData.lv - 1;;
      const {skillText, skillType, skillCate} = util.getSkillText({
      skill: skData,
      lv: skillLv,
      lang: lang,
    });
    return (
      <PopupDescription>
        <SkillImg className="skill_icon">
          {(skillCate === 2 || skillCate === 11) ? ( //passive, job
            <IconPic pic="skill" idx={skData.idx} />
          ) : (
            <>
              <IconPic type="skillBack" pic="icon200" idx={util.idxToSkillBack(skillCate)} />
              <StyledIconPic pic="skill" idx={skData.idx} />
            </>
          )}
        </SkillImg>
        <div style={{flex:1}} flex-v="true">
          <dl>
            <dt>{`${dataObj.skData.lv > 0 ? 'Lv.' + dataObj.skData.lv : '(' + gameData.msg.info.unlearned[lang]+')'} ${dataObj.sk.na[lang]}`}</dt>
            <dd dangerouslySetInnerHTML={{__html: skillText}}></dd>
          </dl>
          <ul className="skill_eff">
            {(skillCate === 5 || skillCate === 6) && dataObj.sk.buff.map((skillEff) => {
              return skillEff.num.map((eff, idx) => {
                return (
                  <li className={`skill_eff_list ${dataObj.skData.lv === idx + 1 ? 'on' : ''}`} key={idx}>{`Lv.${idx + 1}: ${util.getEffectType(skillEff.type, lang)} ${eff}`}</li>
                )
              });
            })}
            {skillCate !== 5 && skillCate !== 6 && skillCate !== 10 && skillCate !== 11 && dataObj.sk.eff[0].num.map((skillEff, skillIdx) => {
              let skill = '';
              return dataObj.sk.eff.map((eff, idx) => {
                if(idx === 0) {
                  if (dataObj.sk.eff.length !== 1) {
                    skill += `Lv.${skillIdx + 1}: ${dataObj.sk.cate !== 3 ? util.getEffectType(eff.type, lang) : ''} ${dataObj.sk.eff[idx].num[skillIdx]}, `;
                  } else {
                    skill += `Lv.${skillIdx + 1}: ${dataObj.sk.cate !== 3 ? util.getEffectType(eff.type, lang) : ''} ${dataObj.sk.eff[idx].num[skillIdx]}`;
                  }
                } else {
                  skill += `${dataObj.sk.cate !== 3 ? util.getEffectType(eff.type, lang) : ''} ${dataObj.sk.eff[idx].num[skillIdx]}`;
                }
                if(idx === dataObj.sk.eff.length - 1) {
                  if (dataObj.skData.lv === skillIdx + 1) {
                    return <li className="skill_eff_list on" key={idx}>{skill}</li>
                  } else {
                    return <li className="skill_eff_list" key={idx}>{skill}</li>
                  }
                }
              })
            })}
            {skillCate === 10 && dataObj.sk.buff.map((skillEff) => {
              return skillEff.num.map((eff, idx) => {
                return (
                  <li className={`skill_eff_list ${dataObj.skData.lv === idx + 1 ? 'on' : ''}`} key={idx}>{`Lv.${idx + 1}: ${gameData.msg.info.percent[lang]} ${eff}`}</li>
                )
              });
            })}
            {skillCate === 11 && dataObj.sk.eff.map((skillEff) => {
              return skillEff.num.map((eff, idx) => {
                return (
                  <li className={`skill_eff_list ${dataObj.skData.lv === idx + 1 ? 'on' : ''}`} key={idx}>{`Lv.${idx + 1}: ${gameData.msg.state[util.getStateName(skillEff.type)][lang]} ${eff}%`}</li>
                )
              });
            })}
          </ul>
        </div>
      </PopupDescription>
    );
  } else if (type === 'selectCh') {
    const chData = dataObj.ch;
    let skillIdx = '',
      possibleCh = 0;
    switch(dataObj.type) {
      case 'tradingPost':
      case 'shop':
      case 'tool':
        skillIdx = 201;
        break;
      case 'shipyard':
        skillIdx = 202;
        break;
      case 'composite':
        skillIdx = 206;
        break;
      case 'enhancingStickers1':
        skillIdx = 203;
        break;
      case 'enhancingStickers2':
        skillIdx = 207;
        break;
      case 'recruitment':
        skillIdx = 208;
        break;
      default:
        break;
    }
		return (
      <div className="select_character">
        <div className="select_chInfo">
          <div className="select_chDisplay">
            <Img imgurl={imgSet.images.transparent800} />
            <CharacterCard saveData={saveData} slotIdx={dataObj.selectIdx} />
          </div>
          <div className="select_rBox" flex-v="true">
            {/* <Img imgurl={imgSet.passive[gameData.skill[skillIdx].effAnimation]} /> */}
            {dataObj.selectIdx !== '' ? <ul className="select_chState">
              <li>통솔: {saveData.ch[dataObj.selectIdx].rSt0}</li>
              <li>체력: {saveData.ch[dataObj.selectIdx].rSt1}</li>
              <li>완력: {saveData.ch[dataObj.selectIdx].rSt2}</li>
              <li>민첩: {saveData.ch[dataObj.selectIdx].rSt3}</li>
              <li>지력: {saveData.ch[dataObj.selectIdx].rSt4}</li>
              <li>정신: {saveData.ch[dataObj.selectIdx].rSt5}</li>
              <li>매력: {saveData.ch[dataObj.selectIdx].rSt6}</li>
              <li>행운: {saveData.ch[dataObj.selectIdx].bSt9}</li>
            </ul> : 
            <ul className="select_chState">
              <li>통솔: 0</li>
              <li>체력: 0</li>
              <li>완력: 0</li>
              <li>민첩: 0</li>
              <li>지력: 0</li>
              <li>정신: 0</li>
              <li>매력: 0</li>
              <li>행운: 0</li>
            </ul>}
          </div>
        </div>
        <div className="ch_list scroll-y action_list">
          <ul>
          {chData.map((data, idx) => {
            const saveCh = saveData.ch[idx];
            let hasSkill = false;
            for (const [idx, skillData] of saveCh.hasSkill.entries()) {
              if (skillData.idx === skillIdx) {
                hasSkill = true;
                break;
              };
            };
            //const chData = gameData.ch[saveCh.idx];
            if (hasSkill) {
              possibleCh ++;
              return (
                <li className={`g${saveCh.grade} ${dataObj.selectIdx === idx ? 'select' : ''}`} key={idx} onClick={(e) => {
                  e.stopPropagation();
                  dataObj.setSelectIdx(idx);
                }}>
                  <CharacterCard usedType="popup" saveData={saveData} saveCharacter={saveCh} />
                </li>
              )
            }
          })}
          </ul>
          {possibleCh === 0 && <div className="none_skill">{gameData.msg.sentenceFn.noneHaveSkill(lang, gameData.skill[skillIdx].na)}</div>}
        </div>
        <div className="item_button" flex="true">
          <button className="button_big" text="true" onClick={(e) => {
            e.stopPropagation();
            let sData = {...saveData};
            sData.actionCh[dataObj.type].idx = dataObj.selectIdx;
            changeSaveData(sData);
            showPopup(false);
          }} data-buttontype="itemUse">{gameData.msg.button.confirm[lang]}</button>
        </div>
      </div>
		);
  }
}

const Popup = ({ 
	showPopup,
	type,
  saveData,
  changeSaveData,
	dataObj,
  msgText,
  showMsg,
}) => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const lang = React.useMemo(() => {
    return context.setting.lang;
  }, [context]);
  const imgSet = React.useMemo(() => {
    return context.images;
  }, [context]);
  const gameData = React.useMemo(() => {
    return context.gameData;
  }, [context]);
  const [selectIdx, setSelectIdx] = useState(0);
  const [content, setContent] = useState();
  const timeoutRef = useRef(null);
  useEffect(() => {
    if (type === 'selectCh') {
      dataObj.selectIdx = selectIdx;
      dataObj.setSelectIdx = setSelectIdx;
    }
    setContent(typeAsContent(type, dataObj, saveData, changeSaveData, gameData, imgSet, msgText, showMsg, showPopup, lang, navigate, timeoutRef));
  }, [saveData, dataObj, selectIdx]);
  useEffect(() => {
    if (saveData && Object.keys(saveData).length !== 0) {
      if (type === 'selectCh') {
        setSelectIdx(dataObj.actionCh);
      }
    }
    // if (dataObj?.saveItemData?.sealed) {
    //   setContent(typeAsContent(type, {
    //     ...dataObj,
    //     saveItemData: saveData.items[dataObj.type][dataObj.itemSaveSlot],
    //   }, saveData, changeSaveData, gameData, imgSet, msgText, showMsg, showPopup, lang));
    // }
  }, [saveData]);
	return (
    <>
      <PopupContainer>
        <PopupWrap className="transition">
          <PopupCont className="popup_cont" onClick={(e) => {
            showPopup(false);
          }}>
            {content}
          </PopupCont>
          <PopupClose className="popup_close">
            <span></span><span></span>
          </PopupClose>
        </PopupWrap>
      </PopupContainer>
    </>
	)
}

export default Popup;
