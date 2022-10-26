import { chImg, itemHole, ringImg } from 'components/ImgSet';
import { AppContext } from 'App';
import { util } from 'components/Libs';
import PopupContainer from 'components/PopupContainer';
import imgRing from 'images/ring/ring_.png';
import React, {useContext, useLayoutEffect, useState} from 'react';
import styled from 'styled-components';

  //   //이벤트 바인딩
  //   this.el.popup.querySelectorAll('button').forEach((el)=>{
  //     el.addEventListener('click',(e)=>{
  //       e.stopPropagation();
  //       const bt_type = el.dataset.buttontype,
  //             ch_idx = awb.ch.ch_idx,
  //             type_ = type === 'hequip' ? 'equip' : type;
  //       switch(bt_type){
  //         case 'item_enhancement':
  //           this.el.popup.classList.remove('on');
  //           awb.ch.enhanceItem(items,awb.data.userData.items['equip'][idx]);
  //           break;
  //         case 'item_equip':
  //           this.el.popup.classList.remove('on');
  //           awb.ch.equipItem(items,ch_idx,idx);
  //           break;
  //         case 'item_release':
  //           this.el.popup.classList.remove('on');
  //           awb.ch.releaseItem(ch_idx,idx);
  //           break;
  //         case 'item_use'://action 아이디변경(1), 장비강화(10), 스킬제거(11), 골드변경(99), 랜덤뽑기(100)
  //           //value 아이템 정보, idx 인벤토리 아이템 순번, type 아이템 종류
  //           this.el.popup.classList.remove('on');
  //           switch(items.action){
  //             case 1:
  //               awb.fn.modal({txt:'변경할 사용자 아이디를 입력하세요.',hint:'아이디 입력',bt:[{txt:'변경',fn:'changeId'},{txt:'취소',fn:'popClose'}],itemData:{type:type,idx:idx}},'prompt');
  //               break;
  //             case 10:
  //               awb.ch.enhanceItem();
  //               break;
  //             case 99:
  //               awb.ch.sellItem(items,type_,idx);
  //               break;
  //             case 100:
  //               console.log('랜덤뽑기',value);
  //               break;
  //             default:
  //               console.log('error');
  //               break;
  //           }
  //           break;
  //         case 'item_sell':
  //           this.el.popup.classList.remove('on');
  //           awb.ch.sellItem(items,type_,idx);
  //           break;
  //         case 'hole_equip':
  //           this.el.popup.classList.remove('on');
  //           awb.ch.enhanceItem();
  //           break;
  //         default:
  //           this.el.popup.classList.remove('on');
  //           break;
  //       }
  //       e.stopPropagation();
  //     });
  //   });
  // },
const PopupRelationList = styled.li`
  background-image:url(${({ringDisplay}) => ringDisplay});
  background-size:cover;
  box-shadow:${({gameData, chData}) => (
      `0 0 13px ${gameData.chGradeColor[chData.grade]}, 0 0 8px ${gameData.chGradeColor[chData.grade]}, 0 0 5px ${gameData.chGradeColor[chData.grade]}, 0 0 2px ${gameData.chGradeColor[chData.grade]}`
  )};
`;
const PopupRelationListCh = styled.span`
  position:absolute;left:0;right:0;bottom:0;top:0;
  background-image:url(${({chDisplay}) => chDisplay});
  background-size:100%;background-position:center -10%;
`;
const Img = styled.img.attrs(
  ({imgurl}) => ({
    src: imgurl 
  })
)``;
const PopupItemContainer = styled.ul`
  border:5px solid transparent;
  border-image:url(${({frameBack}) => frameBack}) 5 round;
  .item_header{border:5px solid transparent;
  border-image:url(${({frameBack}) => frameBack}) 5 round;
  }
  .item_name{color:${({ color }) => color};text-shadow:-1px -1px 1px rgba(255,255,255,.5), 1px 1px 1px #000;}
  .item_footer{border:5px solid transparent;
  border-image:url(${({frameBack}) => frameBack}) 5 round;}
`;
const PopupItemPic = styled.div`
  &:after{background-image:url(${({itemPic}) => itemPic});background-size:100%;background-repeat:no-repeat;}
`;
const PopupItemName = styled.div`
  .item_grade{color:${({ color }) => color};}
`;
const SkillImg = styled.div`
  background:url(${({ frameImg }) => frameImg}), radial-gradient(closest-side at 40% 40%, #ddd, #333);background-size:100%;
  ${({skillCate, skillIcon, skillScene, skillFrame}) => {
    if (skillCate === 2) {
      return `
        &:before{background:url(${skillIcon});background-size:100%;}
        &:after{background:url(${skillIcon});background-size:100%;}
      `;
    } else if (skillCate === 4) {
      return `
        &:before{background:url(${skillIcon});background-size:contain;}
        &:after{background:url(${skillIcon});background-size:contain;}
      `;
    } else {
      return `
        &:before{background:url(${skillIcon});}
        &:after{background:url(${skillIcon});background-size:500% auto;background-position:${skillScene%5 * 25}% ${Math.floor(skillScene/5) * 100/(Math.floor((skillFrame - 1) / 5))}%};
      `;
    }
  }}
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
  //imgSet.animalType[animalIdx]
}
const typeAsContent = (type, dataObj, saveData, changeSaveData, gameData, imgSet, msgText, showMsg, showPopup, lang) => {
	if (type === 'relation') {
    const member = dataObj.relation.member;
		return (
			<ul flex-center="true" className="people">
        {member && member.map((data ,idx) => {
          const chData = gameData.ch[idx];
          return (
            <PopupRelationList className="people_list" key={idx} gameData={gameData} chData={chData} ringDisplay={ringImg[chData.element]}>
              <Img imgurl={imgRing} />
              <PopupRelationListCh chDisplay={chImg[chData.display]} className="ch" />
              <span className="name">{chData.na1}</span>
            </PopupRelationList>
          )
        })}
			</ul>
		);
	} else if (type === 'equip') {
    const itemsGrade = dataObj.saveItemData.grade < 5 ? 0 : dataObj.saveItemData.grade - 5;
    const items = dataObj.saveItemData.part === 3 ? gameData.items.equip[dataObj.saveItemData.part][dataObj.saveItemData.weaponType][itemsGrade][dataObj.saveItemData.idx] : gameData.items.equip[dataObj.saveItemData.part][0][itemsGrade][dataObj.saveItemData.idx];
    const saveItems = dataObj.saveItemData;
    const grade = saveItems.grade || items.grade;
    const setsInfo = gameData.items.set_type[items.set];
    //아이템 기본, 추가, 홀 효과
    const totalEff = util.getTotalEff(saveItems, gameData);
		return (
			<PopupItemContainer className="items" frameBack={imgSet.etc.frameChBack} color={gameData.itemGrade.color[grade]}>
        <li className="item_header" flex-center="true"><span className="item_name" dangerouslySetInnerHTML={{__html: `${saveItems.colorantSet ? util.getColorant(saveItems.colorantSet, gameData).na[lang] : ''} ${saveItems.modifier[lang]}<br/>${items.na[lang]}`}}></span></li>
        <li flex="true">
          <PopupItemPic className={`item item${items.part} ${gameData.itemGrade.txt_e[saveItems.grade].toLowerCase()}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[items.display], saveItems.color, saveItems.svgColor || saveItems.id)}}>
            </svg>
          </PopupItemPic>
          <div flex-h="true" style={{flex: 1,}}>
            <PopupItemName className="item_cont" color={gameData.itemGrade.color[grade]}>
              <div className="item_top">
                <span className="item_grade">{lang === 'ko' ? gameData.itemGrade.txt_k[grade] : gameData.itemGrade.txt_e[grade]}</span> <span className="item_type">{gameData.itemType[items.part][lang]}</span>
              </div>
              <div className="item_description" dangerouslySetInnerHTML={{__html: `"${items.txt[lang]}"`}}></div>
              <div className="item_kg">{items.kg}kg</div>
            </PopupItemName>
            {/* ${gameData.itemGrade.txt_e[items.grade]}  */}
          </div>
        </li>
        <li className="item_list item_typeSlot" flex="true">
          <div className="item_type" dangerouslySetInnerHTML={{__html: makeMark(saveItems.markNum, imgSet.animalType[saveItems.mark])}}>
          </div>
          <div className="item_slot">
            {saveItems.hole.map((holeData, idx) => {
              const holePic = holeData !== 0 ? gameData.items.hole[holeData.idx].display : 0;
              return (
                <div key={`hole${idx}`} className={`item_holes ${holePic !== 0 ? 'fixed': ''}`}><span className="item_holeback"><Img imgurl={imgSet.itemHole[holePic]} /></span></div>
              )
            })}
          </div>
        </li>
        <li className="item_list item_eff">
          <div className="item_title">{lang === 'ko' ? '아이템 효과' : 'Item effect'}</div>
          {totalEff.map((eff, idx) => {
            return (
              <div key={idx} className="item_effs"><span className="cate">{util.getEffectType(eff.type, lang)}</span>{eff.base > 0 && <span className="base">{eff.base}</span>}{eff.add > 0 && <span className="add">{eff.add}</span>}{eff.hole > 0 && <span className="hole">{eff.hole}</span>}<span className="total">{eff.base + eff.add + eff.hole}</span></div>
            )
          })}
        </li>
        <div style={{width:"100%"}} className="scroll-y">
          {saveItems.baseEff.length > 0 && (
            <li className="item_list item_eff">
              <div className="item_title">{lang === 'ko' ? '기본 효과' : 'Base effect'}</div>
              {saveItems.baseEff.map((data, idx) => {
                const grade = saveItems.grade > 3 ? 3 : saveItems.grade - 1;
                return (
                  <div key={idx} className="item_effs">{`${util.getEffectType(data.type, lang)} ${data.num[grade]}`}</div>
                ) 
              })}
            </li>
          )}
          {saveItems.addEff.length > 0 && (
            <li className="item_list item_eff">
              <div className="item_title">{lang === 'ko' ? '추가 효과' : 'Additional effect'}</div>
              {saveItems.addEff.map((data, idx) => {
                const grade = saveItems.grade > 3 ? 3 : saveItems.grade - 1;
                return (
                  <div key={idx} className="item_effs add">{`${util.getEffectType(data.type, lang)} ${data.num[0]}`}</div>
                ) 
              })}
            </li>
          )}
          {saveItems.hole.length > 0 && (
            <li className="item_list item_hole">
              <div className="item_title">{lang === 'ko' ? '소켓 효과' : 'Socket effect'}</div>
              {totalEff.map((data, idx) => {
                if (data.hole > 0) {
                  return (
                    <div key={idx} className="item_effs hole">{`${util.getEffectType(data.type, lang)} ${data.hole}`}</div>
                  )
                }
              })}
            </li>
          )}
          <li className="item_list item_set">
            <div className="item_setNa">{setsInfo.na}</div>
            {setsInfo.part && setsInfo.part.map((data, idx) => {
              return (
                <div key={idx} className={`item_set_piece ${getSetChk(saveData.ch[dataObj.slotIdx].items, data)}`}>{gameData.items.equip[data].na}</div>
              ) 
            })}
          </li>
        </div>
        <li className="item_footer" flex="true">
          <div className="item_price"><span>{lang === 'ko' ? '판매가:' : 'Selling Price'}</span><em>{`₩${items.price * saveItems.grade}`}</em></div>
          <div className="item_button" flex="true">
            <button text="true" onClick={(e) => {
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
              })
            }} data-buttontype="itemRelease">{lang === 'ko' ? '해제' : 'Release'}</button>
          </div>
        </li>
      </PopupItemContainer>
		);
	} else if (type === 'hequip') {
    const itemsGrade = dataObj.saveItemData.grade < 5 ? 0 : dataObj.saveItemData.grade - 5;
    const items = dataObj.saveItemData.part === 3 ? gameData.items.equip[dataObj.saveItemData.part][dataObj.saveItemData.weaponType][itemsGrade][dataObj.saveItemData.idx] : gameData.items.equip[dataObj.saveItemData.part][0][itemsGrade][dataObj.saveItemData.idx];
    const saveItems = dataObj.saveItemData;
    const grade = saveItems.grade || items.grade;
    const setsInfo = gameData.items.set_type[items.set];
    const sealed = dataObj.saveItemData.sealed;
    //아이템 기본, 추가, 홀 효과
    const totalEff = util.getTotalEff(saveItems, gameData);
    return (
      <PopupItemContainer className="items" frameBack={imgSet.etc.frameChBack} color={gameData.itemGrade.color[grade]}>
        <li className="item_header" flex-center="true"><span className="item_name" dangerouslySetInnerHTML={{__html: `${saveItems.colorantSet ? util.getColorant(saveItems.colorantSet, gameData).na[lang] : ''} ${saveItems.modifier[lang]}<br/>${items.na[lang]}`}}></span></li>
        <li flex="true">
          <PopupItemPic className={`item item${items.part} ${gameData.itemGrade.txt_e[saveItems.grade].toLowerCase()} ${dataObj.saveItemData.sealed ? "sealed" : ""}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[items.display], saveItems.color, saveItems.svgColor || saveItems.id)}}>
            </svg>
          </PopupItemPic>
          <div flex-h="true" style={{flex: 1,}}>
            <PopupItemName className="item_cont" color={gameData.itemGrade.color[grade]}>
              <div className="item_top">
                <span className="item_grade">{lang === 'ko' ? gameData.itemGrade.txt_k[grade] : gameData.itemGrade.txt_e[grade]}</span> <span className="item_type">{gameData.itemType[items.part][lang]}</span>
              </div>
              <div className="item_description" dangerouslySetInnerHTML={{__html: `"${items.txt[lang]}"`}}></div>
              <div className="item_kg">{items.kg}kg</div>
            </PopupItemName>
            {/* ${gameData.itemGrade.txt_e[items.grade]}  */}
          </div>
        </li>
        <li className="item_list item_typeSlot" flex="true">
          <div className="item_type" dangerouslySetInnerHTML={{__html: makeMark(saveItems.markNum, imgSet.animalType[saveItems.mark])}}>
          </div>
          <div className="item_slot">
            {saveItems.hole.map((holeData, idx) => {
              const holePic = holeData !== 0 ? gameData.items.hole[holeData.idx].display : 0;
              return (
                <div key={`hole${idx}`} className={`item_holes ${holePic !== 0 ? 'fixed': ''}`}><span className="item_holeback"><Img imgurl={imgSet.itemHole[holePic]} /></span></div>
              )
            })}
          </div>
        </li>
        <li className="item_list item_eff">
          <div className="item_title">{lang === 'ko' ? '아이템 효과' : 'Item effect'}</div>
          {totalEff.map((eff, idx) => {
            return (
              <div key={idx} className="item_effs"><span className="cate">{util.getEffectType(eff.type, lang)}</span>{eff.base > 0 && <span className="base">{eff.base}</span>}{eff.add > 0 && <span className="add">{eff.add}</span>}{eff.hole > 0 && <span className="hole">{eff.hole}</span>}<span className="total">{sealed ? eff.base : eff.base + eff.add + eff.hole}</span></div>
            )
          })}
        </li>
        <div style={{width:"100%"}} className="scroll-y">
          {!sealed && (
            <li className="item_list item_eff">
              <div className="item_title">{lang === 'ko' ? '기본 효과' : 'Base effect'}</div>
              {saveItems.baseEff && saveItems.baseEff.map((data, idx) => {
                const grade = saveItems.grade > 3 ? 3 : saveItems.grade - 1;
                return (
                  <div key={idx} className="item_effs">{`${util.getEffectType(data.type, lang)} ${data.num[grade]}`}</div>
                ) 
              })}
            </li>
          )}
          {saveItems.addEff.length > 0 && (
            <li className="item_list item_eff">
              <div className="item_title">{lang === 'ko' ? '추가 효과' : 'Additional effect'}</div>
              {saveItems.addEff.map((data, idx) => {
                const grade = saveItems.grade > 3 ? 3 : saveItems.grade - 1;
                return (
                  <div key={idx} className="item_effs add">{`${util.getEffectType(data.type, lang)} ${data.num[0]}`}</div>
                ) 
              })}
            </li>
          )}
          {saveItems.hole.length > 0 && (
            <li className="item_list item_hole">
              <div className="item_title">{lang === 'ko' ? '소켓 효과' : 'Socket effect'}</div>
              {totalEff.map((data, idx) => {
                if (data.hole > 0) {
                  return (
                    <div key={idx} className="item_effs hole">{`${util.getEffectType(data.type, lang)} ${data.hole}`}</div>
                  )
                }
              })}
            </li>
          )}
          <li className="item_list item_set">
            <div className="item_setNa">{setsInfo.na}</div>
            {setsInfo.part && setsInfo.part.map((data, idx) => {
              return (
                <div key={idx} className={`item_set_piece ${getSetChk(saveData.ch[dataObj.slotIdx].items, data)}`}>{gameData.items.equip[data].na}</div>
              ) 
            })}
          </li>
        </div>
        <li className="item_footer" flex="true">
          <div className="item_price"><span>{lang === 'ko' ? '판매가:' : 'Selling Price'}</span><em>{`₩${items.price * saveItems.grade}`}</em></div>
            {sealed && (
              <div className="item_button" flex="true">
                <button text="true" onClick={(e) => {
                  util.buttonEvent({
                    event: e,
                    type: 'itemUnpack',
                    data: dataObj,
                    saveData: saveData,
                    changeSaveData: changeSaveData,
                    gameData: gameData,
                    msgText: msgText,
                    showMsg: showMsg,
                    showPopup: showPopup,
                    lang: lang,
                  })
                }} data-buttontype="itemUnpack">{lang === 'ko' ? '확인' : 'Unpack'}</button>
                <button text="true" onClick={(e) => {
                  util.buttonEvent({
                    event: e,
                    type: 'itemSell',
                    data: dataObj,
                    saveData: saveData,
                    changeSaveData: changeSaveData,
                    gameData: gameData,
                    msgText: msgText,
                    showMsg: showMsg,
                    showPopup: showPopup,
                    lang: lang,
                  })
                }} data-buttontype="itemSell">{lang === 'ko' ? '판매' : 'Sell'}</button>
              </div>
            )}
            {!sealed && (
              <div className="item_button" flex="true">
                <button text="true" onClick={(e) => {
                  util.buttonEvent({
                    event: e,
                    type: 'itemEnhancement',
                    data: dataObj,
                    saveData: saveData,
                    changeSaveData: changeSaveData,
                    gameData: gameData,
                    msgText: msgText,
                    showMsg: showMsg,
                    showPopup: showPopup,
                    lang: lang,
                  })
                }} data-buttontype="itemEnhancement">{lang === 'ko' ? '강화' : 'Enhance'}</button>
                <button text="true" onClick={(e) => {
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
                  })
                }} data-buttontype="itemEquip">{lang === 'ko' ? '장착' : 'Equip'}</button>
                <button text="true" onClick={(e) => {
                  util.buttonEvent({
                    event: e,
                    type: 'itemSell',
                    data: dataObj,
                    saveData: saveData,
                    changeSaveData: changeSaveData,
                    gameData: gameData,
                    msgText: msgText,
                    showMsg: showMsg,
                    showPopup: showPopup,
                    lang: lang,
                  })
                }} data-buttontype="itemSell">{lang === 'ko' ? '판매' : 'Sell'}</button>
              </div>
            )}
        </li>
      </PopupItemContainer>
    );
  } else if (type === 'hole') {
    const items = gameData.items.hole[dataObj.saveItemData.idx];
    const saveItems = dataObj.saveItemData;
    return (
			<PopupItemContainer className="items" frameBack={imgSet.etc.frameChBack} color={gameData.itemGrade.color[items.grade]}>
        <li className="item_header" flex-center="true"><span className="item_name">{items.na[lang]}</span></li>
        <li flex="true">
          <PopupItemPic  className="item item11" itemPic={imgSet.itemHole[items.display]} />
          <div flex-h="true" style={{flex: 1,}}>
            <PopupItemName className="item_cont" color={gameData.itemGrade.color[items.grade]}>
              <div className="item_top">
                <span className="item_grade">{lang === 'ko' ? gameData.itemGrade.txt_k[items.grade] : gameData.itemGrade.txt_e[items.grade]}</span> <span className="item_type">{lang === 'ko' ? '소켓보석' : 'Socket Jewelry'}</span>
              </div>
              <div className="item_description" dangerouslySetInnerHTML={{__html: `"${items.txt[lang]}"`}}></div>
            </PopupItemName>
            {/* ${gameData.itemGrade.txt_e[items.grade]}  */}
          </div>
        </li>
        <li className="item_list item_eff">
          <div className="item_title">{lang === 'ko' ? '기본 효과' : 'Base effect'}</div>
          {saveItems.baseEff && saveItems.baseEff.map((data, idx) => {
            return (
              <div key={idx} className="item_effs">{`${util.getEffectType(data.type, lang)} ${data.num[0]}`}</div>
            ) 
          })}
        </li>
        {saveItems.addEff.length > 0 && (
          <li className="item_list item_eff">
            <div className="item_title">{lang === 'ko' ? '추가 효과' : 'Additional effect'}</div>
            {saveItems.addEff.map((data, idx) => {
              return (
                <div key={idx} className="item_effs add">{`${util.getEffectType(data.type, lang)} ${data.num[0]}`}</div>
              ) 
            })}
          </li>
        )}
        <li className="item_footer" flex="true">
          <div className="item_price"><span>{lang === 'ko' ? '판매가:' : 'Selling Price'}</span><em>{`₩${items.price}`}</em></div>
          <div className="item_button" flex="true">
            <button text="true" onClick={(e) => {
              util.buttonEvent({
                event: e,
                type: 'holeEquip',
                data: dataObj,
                saveData: saveData,
                changeSaveData: changeSaveData,
                gameData: gameData,
                msgText: msgText,
                showMsg: showMsg,
                showPopup: showPopup,
                lang: lang,
              })
            }} data-buttontype="holeEquip">{lang === 'ko' ? '장착' : 'Equip'}</button>
            <button text="true" onClick={(e) => {
              util.buttonEvent({
                event: e,
                type: 'itemSell',
                data: dataObj,
                saveData: saveData,
                changeSaveData: changeSaveData,
                gameData: gameData,
                msgText: msgText,
                showMsg: showMsg,
                showPopup: showPopup,
                lang: lang,
              })
            }} data-buttontype="itemSell">{lang === 'ko' ? '판매' : 'Sell'}</button>
          </div>
        </li>
      </PopupItemContainer>
    )
  } else if (type === 'upgrade') {
    const items = gameData.items.upgrade[dataObj.saveItemData.idx];
    return (
			<PopupItemContainer className="items" frameBack={imgSet.etc.frameChBack} color={gameData.itemGrade.color[items.grade]}>
        <li className="item_header" flex-center="true"><span className="item_name">{items.na[lang]}</span></li>
        <li flex="true">
          <PopupItemPic className="item item12" itemPic={imgSet.itemUpgrade[items.display]} />
          <div flex-h="true" style={{flex: 1,}}>
            <PopupItemName className="item_cont" color={gameData.itemGrade.color[items.grade]}>
              <div className="item_top">
                <span className="item_grade">{lang === 'ko' ? gameData.itemGrade.txt_k[items.grade] : gameData.itemGrade.txt_e[items.grade]}</span> <span className="item_type">{lang === 'ko' ? '강화재료' : 'Reinforced material'}</span>
              </div>
              <div className="item_description" dangerouslySetInnerHTML={{__html: `"${items.txt[lang]}"`}}></div>
            </PopupItemName>
            {/* ${gameData.itemGrade.txt_e[items.grade]}  */}
          </div>
        </li>
        <li className="item_footer" flex="true">
          <div className="item_price"><span>{lang === 'ko' ? '판매가:' : 'Selling Price'}</span><em>{`₩${items.price}`}</em></div>
          <div className="item_button" flex="true">
            <button text="true" onClick={(e) => {
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
            }} data-buttontype="itemUse">{lang === 'ko' ? '사용' : 'Use'}</button>
            <button text="true" onClick={(e) => {
              util.buttonEvent({
                event: e,
                type: 'itemSell',
                data: dataObj,
                saveData: saveData,
                changeSaveData: changeSaveData,
                gameData: gameData,
                msgText: msgText,
                showMsg: showMsg,
                showPopup: showPopup,
                lang: lang,
              })
            }} data-buttontype="itemSell">{lang === 'ko' ? '판매' : 'Sell'}</button>
          </div>
        </li>
      </PopupItemContainer>
    )
  } else if (type === 'material') {
    const items = gameData.items.material[dataObj.saveItemData.idx];
    return (
			<PopupItemContainer className="items" frameBack={imgSet.etc.frameChBack} color={gameData.itemGrade.color[items.grade]}>
        <li className="item_header" flex-center="true"><span className="item_name">{items.na[lang]}</span></li>
        <li flex="true">
          <PopupItemPic className="item item14" itemPic={imgSet.itemMaterial[items.display]} />
          <div flex-h="true" style={{flex: 1,}}>
            <PopupItemName className="item_cont" color={gameData.itemGrade.color[items.grade]}>
              <div className="item_top">
                <span className="item_grade">{lang === 'ko' ? gameData.itemGrade.txt_k[items.grade] : gameData.itemGrade.txt_e[items.grade]}</span> <span className="item_type">{lang === 'ko' ? '재료' : 'Material'}</span>
              </div>
              <div className="item_description" dangerouslySetInnerHTML={{__html: `"${items.txt[lang]}"`}}></div>
            </PopupItemName>
            {/* ${gameData.itemGrade.txt_e[items.grade]}  */}
          </div>
        </li>
        <li className="item_footer" flex="true">
          <div className="item_price"><span>{lang === 'ko' ? '판매가:' : 'Selling Price'}</span><em>{`₩${items.price}`}</em></div>
          <div className="item_button" flex="true">
            <button text="true" onClick={(e) => {
              util.buttonEvent({
                event: e,
                type: 'itemSell',
                data: dataObj,
                saveData: saveData,
                changeSaveData: changeSaveData,
                gameData: gameData,
                msgText: msgText,
                showMsg: showMsg,
                showPopup: showPopup,
                lang: lang,
              })
            }} data-buttontype="itemSell">{lang === 'ko' ? '판매' : 'Sell'}</button>
          </div>
        </li>
      </PopupItemContainer>
    )
  } else if (type === 'etc') {
    const items = gameData.items.etc[dataObj.saveItemData.idx];
    return (
			<PopupItemContainer className="items" frameBack={imgSet.etc.frameChBack} color={gameData.itemGrade.color[items.grade]}>
        <li className="item_header" flex-center="true"><span className="item_name">{items.na[lang]}</span></li>
        <li flex="true">
          <PopupItemPic className="item item13" itemPic={imgSet.itemEtc[items.display]} />
          <div flex-h="true" style={{flex: 1,}}>
            <PopupItemName className="item_cont" color={gameData.itemGrade.color[items.grade]}>
              <div className="item_top">
                <span className="item_grade">{lang === 'ko' ? gameData.itemGrade.txt_k[items.grade] : gameData.itemGrade.txt_e[items.grade]}</span> <span className="item_type">{lang === 'ko' ? '기타' : 'Etc'}</span>
              </div>
              <div className="item_description" dangerouslySetInnerHTML={{__html: `"${items.txt[lang]}"`}}></div>
            </PopupItemName>
            {/* ${gameData.itemGrade.txt_e[items.grade]}  */}
          </div>
        </li>
        <li className="item_footer" flex="true">
          <div className="item_price"><span>{lang === 'ko' ? '판매가:' : 'Selling Price'}</span><em>{`₩${items.price}`}</em></div>
          <div className="item_button" flex="true">
            <button text="true" onClick={(e) => {
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
            }} data-buttontype="itemUse">{lang === 'ko' ? '사용' : 'Use'}</button>
            <button text="true" onClick={(e) => {
              util.buttonEvent({
                event: e,
                type: 'itemSell',
                data: dataObj,
                saveData: saveData,
                changeSaveData: changeSaveData,
                gameData: gameData,
                msgText: msgText,
                showMsg: showMsg,
                showPopup: showPopup,
                lang: lang,
              })
            }} data-buttontype="itemSell">{lang === 'ko' ? '판매' : 'Sell'}</button>
          </div>
        </li>
      </PopupItemContainer>
    )
  } else if (type === 'guide') {
    const guide_txt = dataObj.data.txt[lang];
    return (
      <div className="guide">
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
      </div>
    );
  } else if (type === 'skillDescription') {
    const replaceArr = dataObj.sk.txt[lang].match(/[$][(]\d[)]*/g) || [];
    const replaceArr_ = dataObj.sk.txt[lang].match(/[$][<]\d[>]*/g) || [];
    let replaceText = dataObj.sk.txt[lang];
    replaceArr.forEach((data, idx) => {
      const skillLv = dataObj.skData.lv - 1;
      replaceText = replaceText.replace(data, dataObj.sk.eff[idx].num[skillLv >= 0 ? skillLv : 0]);
    });
    replaceArr_.forEach((data, idx) => {
      const skillLv = dataObj.skData.lv - 1;
      replaceText = replaceText.replace(data, dataObj.sk.buff[idx].num[skillLv >= 0 ? skillLv : 0]);
    });
    return (
      <div className="skill_description">
        <SkillImg className={`skill_icon cate${dataObj.skillCate}`} skillCate={dataObj.skillCate} skillIcon={dataObj.skillIcon} skillScene={dataObj.skillScene} skillFrame={dataObj.skillFrame} frameImg={dataObj.frameImg}></SkillImg>
        <dl>
          <dt>{`${dataObj.skData.lv > 0 ? 'Lv.' + dataObj.skData.lv : lang === 'ko' ? '(미습득)' : '(Item not acquired)'} ${dataObj.sk.na[lang]}`}</dt>
          <dd dangerouslySetInnerHTML={{__html: replaceText}}></dd>
        </dl>
        <ul className="skill_eff">
          {(dataObj.skillCate === 5 || dataObj.skillCate === 6) && dataObj.sk.buff.map((skillEff) => {
            return skillEff.num.map((eff, idx) => {
              return (
                <li className="skill_eff_list" key={idx}>{`Lv.${idx + 1}: ${util.getEffectType(skillEff.type, lang)} ${eff}`}</li>
              )
            });
          })}
          {dataObj.skillCate !== 5 && dataObj.skillCate !== 6 && dataObj.skillCate !== 10 && dataObj.sk.eff.map((skillEff) => {
            return skillEff.num.map((eff, idx) => {
              return (
                <li className="skill_eff_list" key={idx}>{`Lv.${idx + 1}: ${dataObj.sk.cate[0] !== 3 ? util.getEffectType(skillEff.type, lang) : ''} ${eff}`}</li>
              )
            });
          })}
          {dataObj.skillCate === 10 && dataObj.sk.buff.map((skillEff) => {
            return skillEff.num.map((eff, idx) => {
              return (
                <li className="skill_eff_list" key={idx}>{`Lv.${idx + 1}: ${lang === "ko" ? "확률" : "Percent"} ${eff}`}</li>
              )
            });
          })}
        </ul>
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
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
	const setting = useContext(AppContext).setting,
    lang = setting.lang;
  const [content, setContent] = useState(typeAsContent(type, dataObj, saveData, changeSaveData, gameData, imgSet, msgText, showMsg, showPopup, lang));
  useLayoutEffect(() => {
    if (dataObj.saveItemData.sealed) {
      setContent(typeAsContent(type, {
        ...dataObj,
        saveItemData: saveData.items[dataObj.type][dataObj.itemSaveSlot],
      }, saveData, changeSaveData, gameData, imgSet, msgText, showMsg, showPopup, lang));
    }
  }, [saveData]);
	return (
    <>
      <PopupContainer>
        <div className="popup transition">
          <div className="popup_cont" onClick={(e) => {
            showPopup(false);
          }}>
            {content}
          </div>
          <div className="popup_close">
            <span></span><span></span>
          </div>
        </div>
      </PopupContainer>
    </>
	)
}

export default Popup;
