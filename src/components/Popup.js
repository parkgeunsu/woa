import { Text } from 'components/Atom';
import { Button } from 'components/Button';
import { FlexBox } from 'components/Container';
import { ChPic, IconPic, ItemPic, MarkPic, MergedPic } from 'components/ImagePic';
import { util } from 'components/Libs';
import PopupContainer from 'components/PopupContainer';
import { AppContext } from 'contexts/app-context';
import CharacterCard from 'pages/CharacterCard';
import ChList from 'pages/ChList';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ChHeroCard = styled.div`
  position: relative;
  transition: all 0.5s;
  ${({frameBack}) => `
    width: 90%;
    border: 5px solid transparent;
    border-image: url(${frameBack}) 5 round;
  `};
  overflow: hidden;
  font-size: 0;
  & > img {
    width: 100%;
    pointer-events: none;
  }
`;

const StyledIconPic = styled(IconPic)`
  position: absolute;
  z-index: 1;
`;
const ActionChWrap = styled(FlexBox)`
  position: relative;
  margin: auto auto;
  width: 80%;
  height: 80%;
`;
const ActionCh = styled(FlexBox)`
  position: relative;
  margin: 0 0 20px 0;
  width: 100%;
  height: calc(50% - 20px);
`;
const ChDisplay = styled.div`
  display: inline-block;
  position: relative;
  width: 50%;
  img {
    width: 100%;
  }
`;
const ChCard = styled(CharacterCard)`
  position: absolute;
  top: 5%;
  left: 5%;
  width: 90%;
  height: 90%;
`;
const ChBack = styled(MergedPic)`
  position: absolute;
  top: 0;
`;
const ChSkillActionPoint = styled(FlexBox)`
  position: relative;
  margin: 0 0 10px 0;
  width: 100%;
  height: 10%;
`;
const UpIcon = styled(IconPic)`
  width: 50px;
  height: 50px;
`;
const ChSkill = styled(FlexBox)`
`;
const ChActionPoint = styled(FlexBox)`
`;
const ActionSkillIcon = styled.div`
  margin: 0 5px 0 0;
  width: 40px;
  height: 40px;
`;
const StateContainer = styled(FlexBox)`
  margin: 0 0 0 10px;
  padding: 5px;
  width: 40%;
  height: 100%;
  border-radius: 10px;
  border: 2px solid var(--color-b);
  background: rgba(255,255,255,.3);
  box-sizing: border-box;
  flex-wrap: wrap;
`;
const StateGroup = styled(FlexBox)`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  height: auto;
`;
const StateIcon = styled(IconPic)`
  width: 25px;
  height: 25px;
`;
const StateInner = styled(FlexBox)`
  padding: 1px 5px 1px 10px;
  width: auto;
  border-radius: 15px;
  box-sizing: border-box;
`;
const StateText = styled(Text)`
  line-height: 1 !important;
  letter-spacing: 2px;
`;
const TextTotal = styled(Text)`
  margin: 0 0 0 5px;
  width: 30px;
  line-height: 1 !important;
  white-space: nowrap;
`;
const ButtonArea = styled(FlexBox)`
  position: relative;
  height: 10%;
  width: 100%;
`;
const ChUl = styled.ul``;
const ChLi = styled.li`
  display: inline-block;
  position: relative;
  margin: 0 4px 4px 0;
  width: calc(25% - 5px);
  padding-top: calc(25% - 5px);
  border-radius: 10px;
  overflow: hidden;
  ${({select, theme}) => select && `
    outline: 2px solid ${theme.color.point2};
    box-shadow: 0 0 10px ${theme.color.point2}, 0 0 20px ${theme.color.point2};
  `}
  ${({hasSkill}) => !hasSkill && `
    filter: grayscale(1);
  `}
  ${({grade}) => {
    switch(grade) {
      case 1:
        return `
          box-shadow: 0 0 10px #fff, 0 0 20px #fff;
        `;
      case 2:
        return `
          box-shadow: 0 0 10px #00a90c, 0 0 20px #00a90c;
        `;
      case 3:
        return `
          box-shadow: 0 0 10px #0090ff, 0 0 20px #0090ff;
        `;
      case 4:
        return `
          box-shadow: 0 0 10px #a800ff, 0 0 20px #a800ff;
        `;
      case 5:
        return `
          box-shadow: 0 0 10px #ffcc15, 0 0 20px #ffcc15;
        `;
      case 6:
        return `
          box-shadow: 0 0 10px #ff2a00, 0 0 20px #ff2a00;
        `;
      case 7:
        return `
          box-shadow: 0 0 10px #ff8000, 0 0 20px #ff8000;
        `;
      default:
        return ``;
    }
  }}
`;
const NoneSkill = styled(Text)`
  margin: 10px 0 0 0;
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
  width: 90%;
  max-height: 90%;
  background: rgba(0,0,0,.9);
  border: 5px solid transparent;
  border-image: url(${({frameBack}) => frameBack}) 5 round;
  box-sizing: border-box;
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
      default:
        break;
    }
  }};
  &.item_hole {
    padding: 0 10px;
  }
  &.item_set {
    margin: 0 0 10px 0;
    padding: 0 10px;
  }
  .item_holes {
    margin: 0 0 5px 0;
  }
  .item_holes img {
    margin: 2px 0 0 0;
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
  .item_setNa {
    margin: 0 0 10px 0;
    color: #0f0;
    font-size: 0.875rem;
  }
  .item_set_piece {
    margin: 0 0 5px 15px;
    color: #555;
  }
  .item_set_piece:last-of-type {
    margin: 0 0 0 15px;
  }
  .item_set_piece.on {
    color: #fff;
    font-weight: 600;
  }
`;
const PopupItemCoin = styled(FlexBox)``;
const PopupItemSlot = styled(FlexBox)``;
const PopupItemHoleBack = styled(FlexBox)`
  display: inline-block;
  border-radius: 20px;
  width: 40px;
  height: 40px;
  text-align: center;
  background-image: ${({fixed}) => fixed ? `
    radial-gradient(at 50%, #000 30%, rgba(255, 172, 47, 0.7) 100%);
  ` : `
    radial-gradient(at 50%, #000 30%, #888 100%)
  `}
`;
const PopupItemName = styled(Text)`
  color: ${({ grade }) => grade};
  text-shadow: -1px -1px 1px rgba(255,255,255,.5), 1px 1px 1px #000;
  line-height:1.2;
`;
const PopupItemInfo = styled(FlexBox)`
  margin: 0 0 0 10px;
  width: calc(100% - 10px);
`;
const PopupItemTop = styled(FlexBox)`
  height: auto;
`;
const PopupItemGrade = styled(Text)`
  color: ${({ color }) => color};
`;
const PopupItemType = styled(Text)``;
const PopupItemDescription = styled(Text)`
  color: ${({ color }) => color};
  line-height: 1.2;
  text-align: left;
`;
const PopupItemKg = styled(Text)`
  width: 100%;
  color: ${({ color }) => color};
`;
const PopupItemTitle = styled(Text)`
  margin: 0 0 5px 0;
  line-height: 1;
`;
/*
&:after{
    display:block;
    content:'';
    width:100%;
    height:100%;
  }
*/
const PopupItem = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border: 5px double #c80;
  ${({sealed}) => sealed ? `
    filter: brightness(0.3) drop-shadow(0px 0px 1px #fff);
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
        case 1:
          return `
            background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-normal) 100%);
          `;
        case 2:
          return `
            background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-magic) 100%);
          `;
        case 3:
          return `
            background-image:radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-rare) 100%);
          `;
        case 4:
          return `
            background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-epic) 100%);
          `;
        case 5:
          return `
            background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-set) 100%);
          `;
        case 6:
          return `
            background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-unique) 100%);
          `;
        case 7:
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
const PopupItemEffs = styled(FlexBox)`
  margin: 0 0 3px 0;
  width: auto;
  ${({color}) => color ? `color: ${color}` : ''}
`;
const PopupItemEffText = styled(Text)`
  ${({type}) => type === "skill" ? `
    &:first-of-type {
      flex: 1;
      text-align: left;
    }
    &:nth-of-type(2) {
      flex: 2;
      text-align: right;
    }
    &:nth-of-type(3) {
      flex: 2;
      text-align: right;
    }
    &:last-of-type {
      flex: 2;
      text-align: right;
    }
  ` : `
    &:first-of-type {
      flex: 2;
      text-align: left;
    }
    &:nth-of-type(2) {
      flex: 1;
      text-align: center;
    }
    &:nth-of-type(3) {
      flex: 1;
      text-align: center;
    }
    &:nth-of-type(4) {
      flex: 1;
      text-align: center;
    }
    &:last-of-type {
      flex: 2;
      text-align: right;
    }
  `}
  margin: ${({margin}) => margin ? `0 ${margin}px 0 0` : 0};
  line-height: 1;
`;
const PopupItemPrice = styled(FlexBox)``;
const PopupItemButton = styled(FlexBox)``;
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
const PopupGuide = styled.div`
  margin:auto auto;width:80%;flex-flow:wrap;
  .guide_title{margin:0 0 10px 0;font-size:1.125rem;font-weight:600;text-align:center;}
  .guide_cont{font-size:0.875rem;line-height:1.5;}
  .guide_cont ul{width:100%;}
  .guide_cont li{position:relative;margin:0 0 10px 0;padding:0 0 0 15px;line-height:1.4;}
  .guide_cont li:before{content:"";position:absolute;left:0;top:8px;width:7px;height:2px;background:#fff;}
`;
const PopupDescription = styled.div`
  display: flex;
  margin: auto auto;
  width: 80%;
  flex-flow: wrap;
  dl {
    flex:1;
  }
  dt {
    margin: 0 0 10px 0;
    text-align: center;
  }
  dd {
    line-height:1.2;
    text-align:center;
  }
  .skill_eff {
    margin: 10px 0 0 0;
    width: 100%;
  }
`;
const SkillLimit = styled(Text)`
  display: inline-block;
  margin: 0 0 5px 0;
`;
const SkillTitle = styled(Text)``;
const SkillDescription = styled(Text)``;
const SkillEff = styled(Text)`
  text-align:center;
`;
const holeEffectText = ({
  gameData, holeData, theme, lang
}) => {
  let eff = [],
    effText = `${gameData.items.hole[holeData.idx].na[lang]}<br/>`;
  gameData.items.hole[holeData.idx]?.eff?.forEach((data) => {
    if (eff[data.type]) {
      eff[data.type] += Number(data.num);
    } else {
      eff[data.type] = Number(data.num);
    }
  });
  holeData?.baseEff?.forEach((data) => {
    if (eff[data.type]) {
      eff[data.type] += Number(data.num);
    } else {
      eff[data.type] = Number(data.num);
    }
  });
  holeData?.addEff?.forEach((data) => {
    if (eff[data.type]) {
      eff[data.type] += Number(data.num);
    } else {
      eff[data.type] = Number(data.num);
    }
  });
  eff.forEach((data, idx) => {
    effText += `<span style="color: ${theme.color[`st${idx}`]};">${util.getEffectType(idx, lang)}: ${data}</span><br/>`;
  });
  effText = effText.slice(0, -5);
  return effText;
}
const typeAsContent = ({type, dataObj, saveData, changeSaveData, chPage, setChPage, gameData, imgSet, msgText, showMsg, setTooltip, setTooltipPos, setTooltipOn, showPopup, theme, lang, navigate, timeoutRef}) => {
  const isMoveEvent = dataObj.isMoveEvent;
	if (type === 'relation') {
    const member = dataObj.relation.member;
		return (
			<PopupRelation flex-center="true" className="people">
        {member && member.map((data ,idx) => {
          const chData = gameData.ch?.[idx];
          if (!chData) return null;
          return (
            <PopupRelationList className="people_list" key={idx} gameData={gameData} chData={chData} >
            {/* ringDisplay={ringImg[chData.element]} */}
              <Img imgurl={imgSet?.images?.transparent800} />
              <PopupRelationListCh>
                <ChPic pic={`ch${chData?.display}`} />
              </PopupRelationListCh>
              <span className="name">{chData.na1[lang]}</span>
            </PopupRelationList>
          )
        })}
			</PopupRelation>
		);
	} else if (type === 'equip') {
    const itemsGrade = dataObj.saveItemData.grade < 5 ? 0 : dataObj.saveItemData.grade - 5;
    const items = dataObj.saveItemData.part === 3 ? 
      gameData.items?.equip?.[dataObj.saveItemData.part]?.[dataObj.saveItemData.weaponType]?.[itemsGrade]?.[dataObj.saveItemData.idx] : 
      gameData.items?.equip?.[dataObj.saveItemData.part]?.[0]?.[itemsGrade]?.[dataObj.saveItemData.idx];
    
    if (!items) return null;

    const saveItems = dataObj.saveItemData;
    const grade = saveItems.grade || items.grade;
    const setsInfo = gameData.items?.set_type?.[items.set] || {};
    const totalEff = util.getTotalEff({
      saveItems: saveItems,
      gameData: gameData,
      cate: "",
    });
		return (
			<PopupItemContainer frameBack={imgSet.etc.frameChBack}>
        <PopupItemList frameBack={imgSet.etc.frameChBack} type="header">
          <PopupItemName code="t3" grade={gameData.itemGrade.color[grade]} color="main" weight="600" dangerouslySetInnerHTML={{__html: `${saveItems.colorantSet ? util.getColorant(saveItems.colorantSet, gameData).na[lang] : ''} ${saveItems.modifier[lang]}<br/>${items.na[lang]}`}}>
          </PopupItemName>
        </PopupItemList>
        <PopupItemList>
          <PopupItem part={items.part} grade={saveItems.grade}>
            <ItemPic type="equip" pic="equip" idx={items.display} />
          </PopupItem>
          <div flex-h="true" style={{flex: 1,}}>
            <PopupItemInfo direction="column" justifyContent="space-between">
              <PopupItemTop justifyContent="space-between" className="item_top">
                <PopupItemGrade code="t1"  color={gameData.itemGrade.color[grade]}>{lang === 'ko' ? gameData.itemGrade.txt_k[grade] : gameData.itemGrade.txt_e[grade]}</PopupItemGrade><PopupItemType code="t1"  color="#bbb">{gameData.itemType[items.part][lang]}</PopupItemType>
              </PopupItemTop>
              <PopupItemDescription code="t1"  color="#d3a859" weight="600" dangerouslySetInnerHTML={{__html: `"${items.txt[lang]}"`}}></PopupItemDescription>
              <PopupItemKg code="t2"  weight="600" color="#bbb" align="right">{items.kg || 0}kg</PopupItemKg>
            </PopupItemInfo>
          </div>
        </PopupItemList>
        <PopupItemList type="animalCoin_slot">
          <PopupItemCoin justifyContent="flex-start">
            <MarkPic length={saveItems.markNum} pic="icon100" idx={saveItems.mark} />
          </PopupItemCoin>
          <PopupItemSlot justifyContent="flex-end">
            {saveItems.hole.map((holeData, idx) => {
              const holePic = holeData !== 0 ? gameData.items.hole[holeData.idx].display : 0;
              return (
                <div key={`hole${idx}`}>
                  <PopupItemHoleBack fixed={holePic !== 0} onClick={(e) => {
										e.stopPropagation();
										if (!holeData) {
											return;
										}
                    setTooltipPos(e.target.getBoundingClientRect());
                    setTooltip(holeEffectText({
                      gameData: gameData,
                      holeData: holeData,
                      theme: theme,
                      lang: lang
                    }));
                    setTooltipOn(true);
									}}>
                    <ItemPic pic="itemEtc" type="hole" idx={holePic} />
                  </PopupItemHoleBack>
                </div>
              )
            })}
          </PopupItemSlot>
        </PopupItemList>
        <PopupItemList type="eff">
          <PopupItemTitle align="left"  code="t1" color="grey">{gameData.msg.itemInfo.itemEffect[lang]}</PopupItemTitle>
          {totalEff.map((eff, idx) => {
            if (eff.type === 100) {
              return (
                <PopupItemEffs justifyContent="space-between" alignItems="center" key={idx}>
                  <PopupItemEffText type="skill" code="t1" weight="600" color={`st${eff.type}`}>{util.getEffectType(eff.type, lang)}</PopupItemEffText>
                  {eff.skList.map((sk, skIndex) => {
                    return (
                      <PopupItemEffText type="skill" code="t2" align="right"  color="main" key={`skIndex${skIndex}`}>{`${gameData.skill?.[sk.idx]?.na?.[lang]} LV.${sk.lv}`}</PopupItemEffText>
                    )
                  })}
                </PopupItemEffs>
              )
            } else {
              return (
                <PopupItemEffs alignItems="center" justifyContent="space-between" key={idx}>
                  <PopupItemEffText code="t2" weight="600" color={`st${eff.type}`}>{util.getEffectType(eff.type, lang)}</PopupItemEffText>
                  <PopupItemEffText code="t2"  margin={5}  weight="600" color="main">{eff.base || "-"}</PopupItemEffText>
                  <PopupItemEffText code="t2" margin={5}  weight="600" color="grey1">{eff.add ? `+ ${eff.add}` : "-"}</PopupItemEffText>
                  <PopupItemEffText code="t2" margin={5}  weight="600" color="grey2">{eff.hole ? `+ ${eff.hole}` : "-"}</PopupItemEffText>
                  <PopupItemEffText code="t3"  align="right" weight="600" color={`st${eff.type}`}>{eff.base + eff.add + eff.hole}</PopupItemEffText>
                </PopupItemEffs>
              )
            }
          })}
        </PopupItemList>
        <div style={{width:"100%"}} className="scroll-y">
          {setsInfo.part && <PopupItemList type="set">
            <div className="item_setNa">{setsInfo.na}</div>
            {setsInfo.part.map((data, idx) => {
              return (
                <div key={idx} className={`item_set_piece ${dataObj.chSlotIdx ? getSetChk(saveData.ch?.[dataObj.chSlotIdx]?.items || [], data) : ''}`}>{gameData.items?.equip?.[data]?.na}</div>
              ) 
            })}
          </PopupItemList>}
        </div>
        <PopupItemList frameBack={imgSet.etc.frameChBack} type="footer">
          <PopupItemPrice justifyContent="flex-start">
            <PopupItemEffText code="t2" color="#c80">{gameData.msg.itemInfo.sellPrice[lang]}</PopupItemEffText>
            <PopupItemEffText code="t2" margin={10} color="main">{`₩${items.price * saveItems.grade}`}</PopupItemEffText>
          </PopupItemPrice>
          {!dataObj.noneButton && <PopupItemButton justifyContent="flex-end">
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
          </PopupItemButton>}
        </PopupItemList>
      </PopupItemContainer>
		);
	} else if (type === 'hequip') {
    const itemsGrade = dataObj.saveItemData.grade < 5 ? 0 : dataObj.saveItemData.grade - 5;
    const items = dataObj.saveItemData.part === 3 ? 
      gameData.items?.equip?.[dataObj.saveItemData.part]?.[dataObj.saveItemData.weaponType]?.[itemsGrade]?.[dataObj.saveItemData.idx] : 
      gameData.items?.equip?.[dataObj.saveItemData.part]?.[0]?.[itemsGrade]?.[dataObj.saveItemData.idx];
    
    if (!items) return null;

    const saveItems = dataObj.saveItemData;
    const grade = saveItems.grade || items.grade;
    const setsInfo = gameData.items?.set_type?.[items.set] || {};
    const sealed = dataObj.saveItemData.sealed;
    const hasSocket = dataObj.saveItemData.slot;
    //아이템 기본, 추가, 홀 효과
    const totalEff = util.getTotalEff({
      saveItems: saveItems,
      gameData: gameData,
      cate: "",
    });
    return (
      <PopupItemContainer frameBack={imgSet.etc.frameChBack}>
        <PopupItemList type="header" frameBack={imgSet.etc.frameChBack}>
          <PopupItemName code="t3"  color="main" weight="600" grade={gameData.itemGrade.color[grade]} dangerouslySetInnerHTML={{__html: `${saveItems.colorantSet ? util.getColorant(saveItems.colorantSet, gameData).na[lang] : ''} ${saveItems.modifier[lang]}<br/>${items.na[lang]}`}}></PopupItemName>
        </PopupItemList>
        <PopupItemList>
          <PopupItem part={items.part} grade={saveItems.grade} sealed={sealed}>
            <ItemPic type="equip" pic="equip" idx={items.display} mergeColor={saveItems.color} />
          </PopupItem>
          <div flex-h="true" style={{flex: 1,}}>
            <PopupItemInfo direction="column" justifyContent="space-between">
              <PopupItemTop justifyContent="space-between" className="item_top">
                <PopupItemGrade code="t1"  color={gameData.itemGrade.color[grade]}>{lang === 'ko' ? gameData.itemGrade.txt_k[grade] : gameData.itemGrade.txt_e[grade]}</PopupItemGrade><PopupItemType code="t1"  color="#bbb">{gameData.itemType[items.part][lang]}</PopupItemType>
              </PopupItemTop>
              <PopupItemDescription code="t1"  color="#d3a859" weight="600" dangerouslySetInnerHTML={{__html: `"${items.txt[lang]}"`}}></PopupItemDescription>
              <PopupItemKg code="t2"  weight="600" color="#bbb" align="right">{items.kg}kg</PopupItemKg>
            </PopupItemInfo>
          </div>
        </PopupItemList>
        <PopupItemList type="animalCoin_slot">
          <PopupItemCoin justifyContent="flex-start">
            <MarkPic length={saveItems.markNum} pic="icon100" idx={saveItems.mark} />
          </PopupItemCoin>
          <PopupItemSlot justifyContent="flex-end">
            {saveItems.hole.map((holeData, holeIdx) => {
              const holePic = holeData !== 0 ? gameData.items.hole[holeData.idx].display : 0;
              return (
                <div key={`hole${holeIdx}`}>
                  <PopupItemHoleBack fixed={holePic !== 0} onClick={(e) => {
										e.stopPropagation();
										if (!holeData) {
											return;
										}
                    setTooltipPos(e.target.getBoundingClientRect());
                    setTooltip(holeEffectText({
                      gameData: gameData,
                      holeData: holeData,
                      theme: theme,
                      lang: lang
                    }));
                    setTooltipOn(true);
									}}>
                    <ItemPic pic="itemEtc" type="hole" idx={holePic} />
                  </PopupItemHoleBack>
                </div>
              )
            })}
          </PopupItemSlot>
        </PopupItemList>
        <PopupItemList type="eff">
          {totalEff.map((eff, idx) => {
            if (eff.type === 100) {
              return (
                <PopupItemEffs alignItems="center" justifyContent="space-between" key={idx}>
                  <PopupItemEffText type="skill" code="t1"  weight="600" color={`st${eff.type}`} className="cate">{util.getEffectType(eff.type, lang)}</PopupItemEffText>
                  {eff.skList.map((sk, skIndex) => {
                    return (
                      <PopupItemEffText type="skill" code="t2"  weight="600" color="main" key={`skIndex${skIndex}`} className="total">{`${gameData.skill[sk.idx].na[lang]} LV.${sk.lv}`}</PopupItemEffText>
                    )
                  })}
                </PopupItemEffs>
              )
            } else {
              return (
                <PopupItemEffs alignItems="center" justifyContent="space-between" key={idx}>
                  <PopupItemEffText code="t2"  weight="600" color={`st${eff.type}`}>{util.getEffectType(eff.type, lang)}</PopupItemEffText>
                  <PopupItemEffText code="t2"  weight="600" color="main">{eff.base || "-"}</PopupItemEffText>
                  <PopupItemEffText code="t2"  weight="600" color="grey1">{eff.add ? `+ ${eff.add}` : "-"}</PopupItemEffText>
                  <PopupItemEffText code="t2"  weight="600" color="grey2">{eff.hole ? `+ ${eff.hole}` : "-"}</PopupItemEffText>
                  <PopupItemEffText code="t3"  weight="600" color={`st${eff.type}`}>{sealed ? eff.base : eff.base + eff.add + eff.hole}</PopupItemEffText>
                </PopupItemEffs>
              )
            }
          })}
        </PopupItemList>
        <div style={{width:"100%"}} className="scroll-y">
          {setsInfo.part && <PopupItemList className="item_set" type="set">
            <div className="item_setNa">{setsInfo.na}</div>
            {setsInfo.part.map((data, idx) => {
              return (
                <div key={idx} className={`item_set_piece ${dataObj.chSlotIdx ? getSetChk(saveData.ch?.[dataObj.chSlotIdx]?.items || [], data) : ''}`}>{gameData.items?.equip?.[data]?.na}</div>
              ) 
            })}
          </PopupItemList>}
        </div>
        <PopupItemList frameBack={imgSet.etc.frameChBack} type="footer">
          <PopupItemPrice justifyContent="flex-start">
            <PopupItemEffText code="t2" color="#c80">{gameData.msg.itemInfo.sellPrice[lang]}</PopupItemEffText>
            <PopupItemEffText code="t2" margin={10} color="main">{`₩${items.price * saveItems.grade}`}</PopupItemEffText>
          </PopupItemPrice>
          {sealed ? (//밀봉
            !dataObj.noneButton && <ButtonArea justifyContent="flex-end">
              <StyledButton type="icon" icon={{type:'commonBtn', pic:'icon100', idx:25}} onClick={() => {//감정
                showMsg(true);
                msgText(gameData.msg.sentence.goLab[lang]);
                timeoutRef.current = setTimeout(() => {
                  util.saveHistory({
                    location: 'composite',
                    navigate: navigate,
                    callback: () => {},
                    state: {},
                    isNavigate: true,
                  });
                }, 1800);
              }} data-buttontype="itemEvaluate" />
              {!isMoveEvent && <StyledButton type="icon" icon={{type:'commonBtn', pic:'icon100', idx:23}} onClick={() => {//판매
                if (dataObj.saveItemData.part < 4) {
                  showMsg(true);
                  msgText(gameData.msg.sentence.goShop[lang]);
                  timeoutRef.current = setTimeout(() => {
                    util.saveHistory({
                      location: 'equipment',
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
              }} data-buttontype="itemSell" />}
            </ButtonArea>
          ) : (//개봉
            !dataObj.noneButton && <ButtonArea justifyContent="flex-end">
              {!dataObj.onlyInven && <StyledButton type="icon" icon={{type:'commonBtn', pic:'icon100', idx:20}} onClick={(e) => {//장착
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
              }} data-buttontype="itemEquip" />}
              {!isMoveEvent && <StyledButton type="icon" icon={{type:'commonBtn', pic:'icon100', idx:21}} onClick={() => {//강화
                showMsg(true);
                msgText(gameData.msg.sentence.goForge[lang]);
                timeoutRef.current = setTimeout(() => {
                  util.saveHistory({
                    location: 'blacksmith',
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
              }} data-buttontype="training" />}
              {!isMoveEvent && hasSocket > 0 && <StyledButton type="icon" icon={{type:'commonBtn', pic:'icon100', idx:22}} onClick={(e) => {//소켓
                showMsg(true);
                msgText(gameData.msg.sentence.goForge[lang]);
                timeoutRef.current = setTimeout(() => {
                  util.saveHistory({
                    location: 'blacksmith',
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
              {!isMoveEvent && <StyledButton type="icon" icon={{type:'commonBtn', pic:'icon100', idx:23}} onClick={(e) => {//판매
                if (dataObj.saveItemData.part < 4) {
                  showMsg(true);
                  msgText(gameData.msg.sentence.goShop[lang]);
                  timeoutRef.current = setTimeout(() => {
                    util.saveHistory({
                      location: 'equipment',
                      navigate: navigate,
                      callback: () => {},
                      state: {
                        dataObj: {
                          ...dataObj,
                          selectTab: 3,
                          selectSlot: dataObj.saveItemData.slot,
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
                      location: 'accessory',
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
              }} data-buttontype="itemSell" />}
            </ButtonArea>
          )}
        </PopupItemList>
      </PopupItemContainer>
    );
  } else if (type === 'hole') {
    const items = gameData.items?.hole?.[dataObj.saveItemData.idx];
    if (!items) return null;
    const saveItems = dataObj.saveItemData;
    return (
			<PopupItemContainer frameBack={imgSet.etc.frameChBack}>
        <PopupItemList type="header" frameBack={imgSet.etc.frameChBack}>
          <PopupItemName code="t3"  color="main" weight="600" grade={gameData.itemGrade.color[items.grade]}>{items.na[lang]}</PopupItemName>
        </PopupItemList>
        <PopupItemList>
          <PopupItem part="11">
            <ItemPic pic="itemEtc" type="hole" idx={items.display} />
          </PopupItem>
          <div flex-h="true" style={{flex: 1,}}>
            <PopupItemInfo direction="column" justifyContent="space-between">
              <PopupItemTop justifyContent="space-between" className="item_top">
                <PopupItemGrade code="t1"  color={gameData.itemGrade.color[items.grade]}>{lang === 'ko' ? gameData.itemGrade.txt_k[items.grade] : gameData.itemGrade.txt_e[items.grade]}</PopupItemGrade><PopupItemType code="t1"  color="#bbb">{gameData.msg.title.socketJewelry[lang]}</PopupItemType>
              </PopupItemTop>
              <PopupItemDescription code="t1"  color="#d3a859" weight="600" dangerouslySetInnerHTML={{__html: `"${items.txt[lang]}"`}}></PopupItemDescription>
            </PopupItemInfo>
            {/* ${gameData.itemGrade.txt_e[items.grade]}  */}
          </div>
        </PopupItemList>
        <PopupItemList type="eff">
          <PopupItemTitle align="left"  code="t1" color="grey">{gameData.msg.itemInfo.basicEffect[lang]}</PopupItemTitle>
          {saveItems.baseEff && saveItems.baseEff.map((data, idx) => {
            return (
              <PopupItemEffs alignItems="center" justifyContent="space-between" key={idx}>
                <PopupItemEffText code="t1" weight="600" color="#2f73ff">
                  {util.getEffectType(data.type, lang)}
                </PopupItemEffText>
                <PopupItemEffText code="t2" align="right"  color="#2f73ff" key={`skIndex${idx}`}>
                  {data.num[0]}
                </PopupItemEffText>
              </PopupItemEffs>
            ) 
          })}
        </PopupItemList>
        {saveItems.addEff?.length > 0 && (
          <PopupItemList type="eff">
            <PopupItemTitle align="left"  code="t1" color="grey">{gameData.msg.itemInfo.addEffect[lang]}</PopupItemTitle>
            {saveItems.addEff.map((data, idx) => {
              return (
                <PopupItemEffs alignItems="center" justifyContent="space-between" color="#ffac2f" key={idx}>
                  <PopupItemEffText code="t1" weight="600" color="#ffac2f">
                    {util.getEffectType(data.type, lang)}
                  </PopupItemEffText>
                  <PopupItemEffText code="t2" align="right"  color="#ffac2f" key={`skIndex${idx}`}>
                    {data.num[0]}
                  </PopupItemEffText>
                </PopupItemEffs>
              ) 
            })}
          </PopupItemList>
        )}
        <PopupItemList frameBack={imgSet.etc.frameChBack} type="footer">
          <PopupItemPrice justifyContent="flex-start">
            <PopupItemEffText code="t2" color="#c80">{gameData.msg.itemInfo.sellPrice[lang]}</PopupItemEffText>
            <PopupItemEffText code="t2" margin={10} color="main">{`₩${items.price}`}</PopupItemEffText>
          </PopupItemPrice>
          <ButtonArea justifyContent="flex-end">
            {!isMoveEvent && <StyledButton type="icon" icon={{type:'commonBtn', pic:'icon100', idx:22}} onClick={() => {//소켓
              showMsg(true);
              msgText(gameData.msg.sentence.goForge[lang]);
              timeoutRef.current = setTimeout(() => {
                util.saveHistory({
                  location: 'training',
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
            }} data-buttontype="itemSocket" />}
            {!isMoveEvent && <StyledButton type="icon" icon={{type:'commonBtn', pic:'icon100', idx:23}} onClick={(e) => {//판매
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
            }} data-buttontype="itemSell" />}
          </ButtonArea>
        </PopupItemList>
      </PopupItemContainer>
    )
  } else if (type === 'upgrade') {
    const items = gameData.items?.upgrade?.[dataObj.saveItemData.idx];
    if (!items) return null;
    return (
			<PopupItemContainer frameBack={imgSet.etc.frameChBack}>
        <PopupItemList type="header" frameBack={imgSet.etc.frameChBack}>
          <PopupItemName code="t3"  color="main" weight="600" grade={gameData.itemGrade.color[items.grade]}>{items.na[lang]}</PopupItemName>
        </PopupItemList>
        <PopupItemList>
          <PopupItem part="12">
            <ItemPic pic="itemEtc" type="upgrade" idx={items.display} />
          </PopupItem>
          <div flex-h="true" style={{flex: 1,}}>
            <PopupItemInfo direction="column" justifyContent="space-between">
              <PopupItemTop justifyContent="space-between" className="item_top">
                <PopupItemGrade code="t1"  color={gameData.itemGrade.color[items.grade]}>{lang === 'ko' ? gameData.itemGrade.txt_k[items.grade] : gameData.itemGrade.txt_e[items.grade]}</PopupItemGrade><PopupItemType code="t1"  color="#bbb">{gameData.msg.title.reinforcedMaterial[lang]}</PopupItemType>
              </PopupItemTop>
              <PopupItemDescription code="t1"  color="#d3a859" weight="600" dangerouslySetInnerHTML={{__html: `"${items.txt[lang]}"`}}></PopupItemDescription>
            </PopupItemInfo>
            {/* ${gameData.itemGrade.txt_e[items.grade]}  */}
          </div>
        </PopupItemList>
        <PopupItemList frameBack={imgSet.etc.frameChBack} type="footer">
          <PopupItemPrice justifyContent="flex-start">
            <PopupItemEffText code="t2" color="#c80">{gameData.msg.itemInfo.sellPrice[lang]}</PopupItemEffText>
            <PopupItemEffText code="t2" margin={10} color="main">{`₩${items.price}`}</PopupItemEffText>
          </PopupItemPrice>
          <ButtonArea justifyContent="flex-end">
            {!isMoveEvent && <StyledButton type="icon" icon={{type:'commonBtn', pic:'icon100', idx:21}} onClick={() => {//강화
              showMsg(true);
              msgText(gameData.msg.sentence.goForge[lang]);
              timeoutRef.current = setTimeout(() => {
                util.saveHistory({
                  location: 'training',
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
            }} data-buttontype="training" />}
            {!isMoveEvent && <StyledButton type="icon" icon={{type:'commonBtn', pic:'icon100', idx:23}} onClick={(e) => {//판매
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
            }} data-buttontype="itemSell" />}
          </ButtonArea>
        </PopupItemList>
      </PopupItemContainer>
    )
  } else if (type === 'material') {
    const items = gameData.items?.material?.[dataObj.saveItemData.idx];
    if (!items) return null;
    return (
			<PopupItemContainer frameBack={imgSet.etc.frameChBack}>
        <PopupItemList type="header" frameBack={imgSet.etc.frameChBack}>
          <PopupItemName code="t3"  color="main" weight="600" grade={gameData.itemGrade.color[items.grade]}>{items.na[lang]}</PopupItemName>
        </PopupItemList>
        <PopupItemList>
          <PopupItem part="14">
            <ItemPic pic="material" type="material" idx={items.display} />
          </PopupItem>
          <div flex-h="true" style={{flex: 1,}}>
            <PopupItemInfo direction="column" justifyContent="space-between">
              <PopupItemTop justifyContent="space-between" className="item_top">
                <PopupItemGrade code="t1"  color={gameData.itemGrade.color[items.grade]}>{lang === 'ko' ? gameData.itemGrade.txt_k[items.grade] : gameData.itemGrade.txt_e[items.grade]}</PopupItemGrade><PopupItemType code="t1"  color="#bbb">{gameData.msg.title.material[lang]}</PopupItemType>
              </PopupItemTop>
              <PopupItemDescription code="t1"  color="#d3a859" weight="600" dangerouslySetInnerHTML={{__html: `"${items.txt[lang]}"`}}></PopupItemDescription>
            </PopupItemInfo>
            {/* ${gameData.itemGrade.txt_e[items.grade]}  */}
          </div>
        </PopupItemList>
        <PopupItemList frameBack={imgSet.etc.frameChBack} type="footer">
          <PopupItemPrice justifyContent="flex-start">
            <PopupItemEffText code="t2" color="#c80">{gameData.msg.itemInfo.sellPrice[lang]}</PopupItemEffText>
            <PopupItemEffText code="t2" margin={10} color="main">{`₩${items.price}`}</PopupItemEffText>
          </PopupItemPrice>
          <ButtonArea justifyContent="flex-end">
            {!isMoveEvent && <StyledButton type="icon" icon={{type:'commonBtn', pic:'icon100', idx:23}} onClick={(e) => {//판매
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
            }} data-buttontype="itemSell" />}
          </ButtonArea>
        </PopupItemList>
      </PopupItemContainer>
    )
  } else if (type === 'etc') {
    const items = gameData.items?.etc?.[dataObj.saveItemData.idx];
    if (!items) return null;
    return (
			<PopupItemContainer frameBack={imgSet.etc.frameChBack}>
        <PopupItemList type="header" frameBack={imgSet.etc.frameChBack}>
          <PopupItemName code="t3"  color="main" weight="600" grade={gameData.itemGrade.color[items.grade]}>{items.na[lang]}</PopupItemName>
        </PopupItemList>
        <PopupItemList>
          <PopupItem part="13">
            <ItemPic pic="itemEtc" type="etc" idx={items.display} />
          </PopupItem>
          <div flex-h="true" style={{flex: 1,}}>
            <PopupItemInfo direction="column" justifyContent="space-between">
              <PopupItemTop justifyContent="space-between" className="item_top">
                <PopupItemGrade code="t1"  color={gameData.itemGrade.color[items.grade]}>{lang === 'ko' ? gameData.itemGrade.txt_k[items.grade] : gameData.itemGrade.txt_e[items.grade]}</PopupItemGrade><PopupItemType code="t1"  color="#bbb">{gameData.msg.title.etc[lang]}</PopupItemType>
              </PopupItemTop>
              <PopupItemDescription code="t1"  color="#d3a859" weight="600" dangerouslySetInnerHTML={{__html: `"${items.txt[lang]}"`}}></PopupItemDescription>
            </PopupItemInfo>
            {/* ${gameData.itemGrade.txt_e[items.grade]}  */}
          </div>
        </PopupItemList>
        <PopupItemList frameBack={imgSet.etc.frameChBack} type="footer">
          <PopupItemPrice justifyContent="flex-start">
            <PopupItemEffText code="t2" color="#c80">{gameData.msg.itemInfo.sellPrice[lang]}</PopupItemEffText>
            <PopupItemEffText code="t2" margin={10} color="main">{`₩${items.price}`}</PopupItemEffText>
          </PopupItemPrice>
          <ButtonArea justifyContent="flex-end">
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
            {!isMoveEvent && <Button type="icon" icon={{type:'commonBtn', pic:'icon100', idx:23}} onClick={(e) => {
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
            }} data-buttontype="itemSell" />}
          </ButtonArea>
        </PopupItemList>
      </PopupItemContainer>
    )
  } else if (type === 'guide') {
    const guide_txt = dataObj.data?.txt?.[lang];
    return (
      <PopupGuide>
        <dl>
          <dt className="guide_title">{dataObj.data?.title?.[lang]}</dt>
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
      skillLv = dataObj.skData.lv,
      skillLimit = dataObj.skData.lvLimit,
      chLv = dataObj.chLv,
      requiredSkillName = dataObj.requiredSkill ? dataObj.requiredSkill.na[lang] : "",
      activeRequired = dataObj.activeRequired;
    const {skillText, skillType, skillCate} = util.getSkillText({
      skill: skData,
      lv: skillLv,
      lang: lang,
    });
    return (
      <PopupDescription>
        <SkillImg className="skill_icon">
          <StyledIconPic pic="skill" idx={skData.idx} />
        </SkillImg>
        <div style={{flex:1}} flex-v="true">
          <dl>
            <dt>
              {(skillLv <= 0 && activeRequired && chLv >= skillLimit) && <SkillLimit code="t2" color="grey">
                {gameData.msg.sentence?.learnSkillPossible?.[lang]}
              </SkillLimit>}
              {(skillLv <= 0 && !activeRequired && !requiredSkillName && chLv >= skillLimit) && 
                <>
                  <SkillLimit code="t2" color="grey">
                    {gameData.msg.sentence?.learnSkillPossible?.[lang]}
                  </SkillLimit>
                </>
              }
              {(skillLv <= 0 && !activeRequired && requiredSkillName && chLv >= skillLimit) && 
                <>
                  <SkillLimit code="t2" color="red">
                    {gameData.msg.sentenceFn.limitRequiredSkill(lang, requiredSkillName)}
                  </SkillLimit>
                  <SkillLimit code="t2" color="grey">
                    {gameData.msg.sentenceFn.limitLvSkill(lang, skillLimit)}
                  </SkillLimit>
                </>
              }
              {(skillLv <= 0 && !activeRequired && !requiredSkillName && chLv < skillLimit) &&
                <>
                  <SkillLimit code="t2" color="red">
                    {gameData.msg.sentenceFn.limitLvSkill(lang, skillLimit)}
                  </SkillLimit>
                </>
              }
              {(skillLv <= 0 && !activeRequired && requiredSkillName && chLv < skillLimit) &&
                <>
                  <SkillLimit code="t2" color="red">
                    {gameData.msg.sentenceFn.limitRequiredSkill(lang, requiredSkillName)}
                  </SkillLimit>
                  <SkillLimit code="t2" color="red">
                    {gameData.msg.sentenceFn.limitLvSkill(lang, skillLimit)}
                  </SkillLimit>
                </>
              }
              {(skillLv <= 0 && activeRequired && chLv < skillLimit) &&
                <>
                  <SkillLimit code="t2" color="grey">
                    {gameData.msg.sentenceFn.limitRequiredSkill(lang, requiredSkillName)}
                  </SkillLimit>
                  <SkillLimit code="t2" color="red">
                    {gameData.msg.sentenceFn.limitLvSkill(lang, skillLimit)}
                  </SkillLimit>
                </>
              }
              <SkillTitle code="t3" color="main" weight="600">
                {`${skillLv > 0 ? 'Lv.' + skillLv : '(' + gameData.msg.info.unlearned[lang]+')'} ${dataObj.sk.na[lang]}`}
              </SkillTitle>
            </dt>
            <dd>
              <SkillDescription dangerouslySetInnerHTML={{__html: skillText}} code="t2"  color="main" />
            </dd>
          </dl>
          <ul className="skill_eff">
            {(skillCate === 2 || skillCate === 4 || skillCate === 5 || skillCate === 6 || skillCate === 12) && dataObj.sk.buff.map((skillEff) => {
              return skillEff.num.map((eff, idx) => {
                return (
                  <li key={idx}>
                    <SkillEff  {...skillLv === idx + 1 ? {
                      "code": "t3",
                      "color": "red",
                      "weight": "600",
                      "font": "info",
                    } : {
                      "code": "t2",
                      "color": "grey",
                      "font": "info",
                    }}>{`Lv.${idx + 1}: ${util.getEffectType(skillEff.type, lang)} ${eff}`}</SkillEff>
                  </li>
                )
              });
            })}
            {skillCate !== 2 && skillCate !== 4 && skillCate !== 5 && skillCate !== 6 && skillCate !== 10 && skillCate !== 11 && skillCate !== 12 && skillCate !== 13 && dataObj.sk.eff[0].num.map((skillEff, skillIdx) => {
              let skill = '';
              return dataObj.sk.eff.map((eff, idx) => {
                skill += `Lv.${skillIdx + 1}: ${dataObj.sk.cate !== 3 ? util.getEffectType(eff.type, lang) : ''} ${dataObj.sk.eff[idx].num[skillIdx]}${idx === 0 && dataObj.sk.eff.length !== 1 ? "," : ""} `;
                if(idx === dataObj.sk.eff.length - 1) {
                  return <li key={idx}>
                    <SkillEff {...skillLv === skillIdx + 1 ? {
                      "code": "t3",
                      "color": "red",
                      "weight": "600",
                      "font": "info",
                    } : {
                      "code": "t2",
                      "color": "grey",
                      "font": "info",
                    }}>{skill}
                    </SkillEff>
                  </li>
                }
              })
            })}
            {skillCate === 13 && dataObj.sk.eff[0].num.map((skillEff, skillIdx) => {
              let skill = '';
              return dataObj.sk.eff.map((eff, idx) => {
                skill += `Lv.${skillIdx + 1}: ${dataObj.sk.cate !== 3 ? util.getEffectType(eff.type, lang) : ''} ${dataObj.sk.eff[idx].num[skillIdx]}${idx === 0 && dataObj.sk.eff.length !== 1 ? "," : ""} `;
                if(idx === dataObj.sk.eff.length - 1) {
                  return <li key={idx}>
                    <SkillEff {...skillLv === skillIdx + 1 ? {
                      "code": "t3",
                      "color": "red",
                      "weight": "600",
                      "font": "info",
                    } : {
                      "code": "t2",
                      "color": "grey",
                      "font": "info",
                    }}>{skill}
                    </SkillEff>
                  </li>
                }
              })
            })}
            {skillCate === 10 && dataObj.sk.buff.map((skillEff) => {
              return skillEff.num.map((eff, idx) => {
                return (
                  <li key={idx}>
                    <SkillEff {...skillLv === idx + 1 ? {
                      "code": "t3",
                      "color": "red",
                      "weight": "600",
                      "font": "info",
                    } : {
                      "code": "t2",
                      "color": "grey",
                      "font": "info",
                    }}>
                      {`Lv.${idx + 1}: ${gameData.msg.info.percent[lang]} ${eff}`}
                    </SkillEff>
                  </li>
                )
              });
            })}
            {skillCate === 11 && dataObj.sk.eff.map((skillEff) => {
              return skillEff.num.map((eff, idx) => {
                return (
                  <li className={`skill_eff_list ${skillLv === idx + 1 ? 'on' : ''}`} key={idx}>
                  <SkillEff code="t2"  color="grey">
                    {`Lv.${idx + 1}: ${gameData.msg.state[util.getStateName(skillEff.type)][lang]} ${eff}%`}
                  </SkillEff>
                </li>
                )
              });
            })}
          </ul>
        </div>
      </PopupDescription>
    );
  } else if (type === 'selectCh') {
    let possibleCh = 0;
    const skillIdx = util.getActionTypeSkill(dataObj.type);
    const saveCh = dataObj.ch[dataObj.selectIdx];
    const skillLv = saveCh ? saveCh?.sk.find((skill) => skill.idx === skillIdx)?.lv || 0 : 0,
      possibleLvUp = saveCh ? saveCh.lv < 50 && saveCh.hasExp > gameData.exp[`grade${saveCh.grade}`][saveCh.lv] : false,
      possibleGradeUp = saveCh ? saveCh.grade < 7 && gameData.gradeUp[saveCh.grade] <= saveData.hasHeroNum[saveCh.idx]: false,
      possibleSkillUp = saveCh ? saveCh?.animalBadge > 0 : false;
		return (
      <ActionChWrap direction="column">
        <ActionCh>
          <ChDisplay>
            <Img imgurl={imgSet.images.transparent800} />
            <ChCard usedType="actionCh" saveCharacter={saveCh} saveData={dataObj.ch} slotIdx={dataObj.selectIdx} />
            <ChBack type="cardBack" pic="card" idx={0} />
          </ChDisplay>
          <StateContainer direction="column" justifyContent="space-around" alignItems="center">
            {gameData.stateName.map((data, idx) => {
              const { stateColor } = util.getPercentColor(gameData.stateMax[idx], saveCh ? saveCh?.['st' + idx] : 0);
              return (
                <StateGroup key={`chst${idx}`} justifyContent="flex-start">
                  <StateIcon type="state" pic="icon100" idx={idx} />
                  <StateInner>
                    <StateText code="t2" color="main">{gameData.msg.state[data][lang]}</StateText>
                    <TextTotal code="t4" weight="600" color={stateColor}>
                      {saveCh ? saveCh?.['st' + idx] : 0}
                    </TextTotal>
                  </StateInner>
                </StateGroup>
              )
            })}
          </StateContainer>
        </ActionCh>
        {saveCh && <ChSkillActionPoint dirction="row" justifyContent="space-between">
          {dataObj.type !== "training" && dataObj.type !== "mystery" && <ChSkill justifyContent="flex-start">
            <ActionSkillIcon><IconPic type="skill" pic="skill" idx={skillIdx} /></ActionSkillIcon>
            <Text code="t4" color="main" weight="600">{`${gameData.skill[skillIdx].na[lang]} Lv.${skillLv}`}</Text>
          </ChSkill>}
          {dataObj.type === "mystery" && <ChSkill justifyContent="flex-start">
            <Text code="t4" color="main" weight="600">{`${gameData.msg.info.hasExp[lang]}: ${saveCh.hasExp}`}</Text>
          </ChSkill>}
          {dataObj.type === "training" && <ChSkill justifyContent="flex-start">
            {possibleLvUp && <UpIcon type="commonIcon" pic="icon200" idx={1} />}
            {possibleGradeUp && <UpIcon type="commonIcon" pic="icon200" idx={9} />}
            {possibleSkillUp && <UpIcon type="commonIcon" pic="icon200" idx={7} />}
          </ChSkill>}
          <ChActionPoint justifyContent="flex-end">
            <Text code="t4" color="main" weight="600">{`${saveCh.actionPoint} / ${saveCh.actionMax}`}</Text>
          </ChActionPoint>
        </ChSkillActionPoint>}
        <ChList type="action_list">
          <ChUl>
          {dataObj.ch.map((data, idx) => {
            let hasSkill = false;
            for (const [idx, skillData] of data.sk.entries()) {
              if (skillData.idx === skillIdx) {
                hasSkill = true;
                break;
              };
            };
            //const chData = gameData.ch[saveCh.idx];
            if (hasSkill) {
              possibleCh ++;
            }
            return (
              <ChLi select={dataObj.selectIdx === idx} hasSkill={hasSkill} grade={data.grade} key={`chLi_${idx}`} onClick={(e) => {
                e.stopPropagation();
                if (hasSkill) {
                  dataObj.setSelectIdx(idx);
                } else {
                  dataObj.setMsg(gameData.msg.sentenceFn.selectSkillCh(lang, gameData.skill[skillIdx].na));
                  dataObj.setMsgOn(true);
                }
              }}>
                <CharacterCard usedType="thumb" saveData={dataObj.ch} saveCharacter={data} />
              </ChLi>
            )
          })}
          </ChUl>
          {possibleCh === 0 && <NoneSkill code="t2" color="red" weight="600">{gameData.msg.sentenceFn.noneHaveSkill(lang, gameData.skill[skillIdx].na)}</NoneSkill>}
        </ChList>
        <ButtonArea justifyContent="flex-end">
          <button className="button_big" text="true" onClick={(e) => {
            e.stopPropagation();
            let sData = JSON.parse(JSON.stringify(saveData));
            if (sData.actionCh?.[dataObj.type]) {
              sData.actionCh[dataObj.type].idx = dataObj.selectIdx;
              changeSaveData(sData);
            }
            showPopup(false);
          }} data-buttontype="itemUse">{gameData.msg.button.confirm[lang]}</button>
        </ButtonArea>
      </ActionChWrap>
		);
  } else if (type === 'hero') {
    const slotIdx = saveData.ch.length - 1;
    return <FlexBox direction="column">
      <ChHeroCard gradeUp={saveData.ch[slotIdx]?.gradeUp} chPage={chPage} frameBack={imgSet.etc.frameChBack}>
        <Img imgurl={imgSet.images.transparent800} />
        <CharacterCard saveData={saveData} slotIdx={slotIdx} />
      </ChHeroCard>
    </FlexBox>
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
  setTooltip,
  setTooltipPos,
  setTooltipOn,
  theme,
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
  const [selectIdx, setSelectIdx] = useState(dataObj.actionChIdx);
  const [content, setContent] = useState();
  const timeoutRef = useRef(null);
  useEffect(() => {
    if (type === 'selectCh') {
      dataObj.selectIdx = selectIdx;
      dataObj.setSelectIdx = setSelectIdx;
    }
    setContent(typeAsContent({
      type: type,
      dataObj: dataObj,
      saveData: saveData,
      changeSaveData: changeSaveData,
      gameData: gameData,
      imgSet: imgSet,
      msgText: msgText,
      showMsg: showMsg,
      setTooltip: setTooltip,
      setTooltipPos: setTooltipPos,
      setTooltipOn: setTooltipOn,
      showPopup: showPopup,
      theme: theme,
      lang: lang,
      navigate: navigate,
      timeoutRef: timeoutRef
    }));
  }, [saveData, dataObj, selectIdx]);
  useEffect(() => {
    // if (dataObj?.saveItemData?.sealed) {
    //   setContent(typeAsContent(type, {
    //     ...dataObj,
    //     saveItemData: saveData.items[dataObj.type][dataObj.itemSaveSlot],
    //   }, saveData, changeSaveData, gameData, imgSet, msgText, showMsg, showPopup, lang));
    // }
  }, []);
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
