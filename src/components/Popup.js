import { AppContext } from 'App';
import { chImg, ringImg } from 'components/ImgSet';
import { util } from 'components/Libs';
import PopupContainer from 'components/PopupContainer';
import imgRing from 'images/ring/ring_.png';
import CharacterCard from 'pages/CharacterCard';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

const ListCh = styled.span`
  background-image:url(${({chDisplay}) => chDisplay});background-size:100%;
`;
const ListJob = styled.span`
  background-image:url(${({jobIcon}) => jobIcon});background-size:100%;
`;
const ListActionType = styled.span`
  background-image:url(${({actionType}) => actionType});background-size:100%;
`;
const ListRing = styled.span`
  background-image:url(${({ringBack}) => ringBack});
  background-size:85%;
`;
const ListElement = styled.span`
  background-image:url(${({ringDisplay}) => ringDisplay});
  background-size:100%;
`;
const ListFrame = styled.span`
  background: url(${({ cardFrame }) => cardFrame});background-size:100% 100%;
`;
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
  background:url(${({ frameImg }) => frameImg});background-size:100%;
  ${({skillCate, skillIcon, skillScene, skillFrame}) => {
    if (skillCate === 2 || skillCate === 11) {
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
const typeAsContent = (type, dataObj, saveData, changeSaveData, gameData, imgSet, msgText, showMsg, showPopup, lang, navigate) => {
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
          <div className="item_title">{gameData.msg.itemInfo.itemEffect[lang]}</div>
          {totalEff.map((eff, idx) => {
            return (
              <div key={idx} className="item_effs"><span className="cate">{util.getEffectType(eff.type, lang)}</span>{eff.base > 0 && <span className="base">{eff.base}</span>}{eff.add > 0 && <span className="add">{eff.add}</span>}{eff.hole > 0 && <span className="hole">{eff.hole}</span>}<span className="total">{eff.base + eff.add + eff.hole}</span></div>
            )
          })}
        </li>
        <div style={{width:"100%"}} className="scroll-y">
          {saveItems.baseEff.length > 0 && (
            <li className="item_list item_eff">
              <div className="item_title">{gameData.msg.itemInfo.basicEffect[lang]}</div>
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
              <div className="item_title">{gameData.msg.itemInfo.addEffect[lang]}</div>
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
              <div className="item_title">{gameData.msg.itemInfo.socketEffect[lang]}</div>
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
          <div className="item_price"><span>{gameData.msg.itemInfo.sellPrice[lang]}</span><em>{`₩${items.price * saveItems.grade}`}</em></div>
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
            }} data-buttontype="itemRelease">{gameData.msg.button.release[lang]}</button>
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
          <div className="item_title">{gameData.msg.itemInfo.itemEffect[lang]}</div>
          {totalEff.map((eff, idx) => {
            return (
              <div key={idx} className="item_effs"><span className="cate">{util.getEffectType(eff.type, lang)}</span>{eff.base > 0 && <span className="base">{eff.base}</span>}{eff.add > 0 && <span className="add">{eff.add}</span>}{eff.hole > 0 && <span className="hole">{eff.hole}</span>}<span className="total">{sealed ? eff.base : eff.base + eff.add + eff.hole}</span></div>
            )
          })}
        </li>
        <div style={{width:"100%"}} className="scroll-y">
          {!sealed && (
            <li className="item_list item_eff">
              <div className="item_title">{gameData.msg.itemInfo.basicEffect[lang]}</div>
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
              <div className="item_title">{gameData.msg.itemInfo.addEffect[lang]}</div>
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
              <div className="item_title">{gameData.msg.itemInfo.socketEffect[lang]}</div>
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
          <div className="item_price"><span>{gameData.msg.itemInfo.sellPrice[lang]}</span><em>{`₩${items.price * saveItems.grade}`}</em></div>
            {sealed && (
              <div className="item_button" flex="true">
                <button text="true" onClick={(e) => {
                  navigate('/inven');
                  // 확인
                  // util.buttonEvent({
                  //   event: e,
                  //   type: 'itemEvaluate',
                  //   data: dataObj,
                  //   saveData: saveData,
                  //   changeSaveData: changeSaveData,
                  //   gameData: gameData,
                  //   msgText: msgText,
                  //   showMsg: showMsg,
                  //   showPopup: showPopup,
                  //   lang: lang,
                  // })
                }} data-buttontype="itemEvaluate">{gameData.msg.button.evaluate[lang]}</button>
                <button text="true" onClick={(e) => {
                  navigate('/equipmentShop');
                  // 판매
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
                }} data-buttontype="itemSell">{gameData.msg.button.sell[lang]}</button>
              </div>
            )}
            {!sealed && (
              <div className="item_button" flex="true">
                <button text="true" onClick={(e) => {
                  navigate('/itemEnhancement');
                  // 강화
                  // util.buttonEvent({
                  //   event: e,
                  //   type: 'itemEnhancement',
                  //   data: dataObj,
                  //   saveData: saveData,
                  //   changeSaveData: changeSaveData,
                  //   gameData: gameData,
                  //   msgText: msgText,
                  //   showMsg: showMsg,
                  //   showPopup: showPopup,
                  //   lang: lang,
                  // })
                }} data-buttontype="itemEnhancement">{gameData.msg.button.enhance[lang]}</button>
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
                }} data-buttontype="itemEquip">{gameData.msg.button.equip[lang]}</button>
                <button text="true" onClick={(e) => {
                  navigate('/equipmentShop');
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
                }} data-buttontype="itemSell">{gameData.msg.button.sell[lang]}</button>
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
                <span className="item_grade">{lang === 'ko' ? gameData.itemGrade.txt_k[items.grade] : gameData.itemGrade.txt_e[items.grade]}</span> <span className="item_type">{gameData.msg.title.socketJewelry[lang]}</span>
              </div>
              <div className="item_description" dangerouslySetInnerHTML={{__html: `"${items.txt[lang]}"`}}></div>
            </PopupItemName>
            {/* ${gameData.itemGrade.txt_e[items.grade]}  */}
          </div>
        </li>
        <li className="item_list item_eff">
          <div className="item_title">{gameData.msg.itemInfo.basicEffect[lang]}</div>
          {saveItems.baseEff && saveItems.baseEff.map((data, idx) => {
            return (
              <div key={idx} className="item_effs">{`${util.getEffectType(data.type, lang)} ${data.num[0]}`}</div>
            ) 
          })}
        </li>
        {saveItems.addEff.length > 0 && (
          <li className="item_list item_eff">
            <div className="item_title">{gameData.msg.itemInfo.addEffect[lang]}</div>
            {saveItems.addEff.map((data, idx) => {
              return (
                <div key={idx} className="item_effs add">{`${util.getEffectType(data.type, lang)} ${data.num[0]}`}</div>
              ) 
            })}
          </li>
        )}
        <li className="item_footer" flex="true">
          <div className="item_price"><span>{gameData.msg.itemInfo.sellPrice[lang]}</span><em>{`₩${items.price}`}</em></div>
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
            }} data-buttontype="holeEquip">{gameData.msg.button.equip[lang]}</button>
            <button text="true" onClick={(e) => {
              navigate('/equipmentShop');
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
            }} data-buttontype="itemSell">{gameData.msg.button.sell[lang]}</button>
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
                <span className="item_grade">{lang === 'ko' ? gameData.itemGrade.txt_k[items.grade] : gameData.itemGrade.txt_e[items.grade]}</span> <span className="item_type">{gameData.msg.title.reinforcedMaterial[lang]}</span>
              </div>
              <div className="item_description" dangerouslySetInnerHTML={{__html: `"${items.txt[lang]}"`}}></div>
            </PopupItemName>
            {/* ${gameData.itemGrade.txt_e[items.grade]}  */}
          </div>
        </li>
        <li className="item_footer" flex="true">
          <div className="item_price"><span>{gameData.msg.itemInfo.sellPrice[lang]}</span><em>{`₩${items.price}`}</em></div>
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
            }} data-buttontype="itemUse">{gameData.msg.button.use[lang]}</button>
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
            }} data-buttontype="itemSell">{gameData.msg.button.sell[lang]}</button>
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
                <span className="item_grade">{lang === 'ko' ? gameData.itemGrade.txt_k[items.grade] : gameData.itemGrade.txt_e[items.grade]}</span> <span className="item_type">{gameData.msg.title.material[lang]}</span>
              </div>
              <div className="item_description" dangerouslySetInnerHTML={{__html: `"${items.txt[lang]}"`}}></div>
            </PopupItemName>
            {/* ${gameData.itemGrade.txt_e[items.grade]}  */}
          </div>
        </li>
        <li className="item_footer" flex="true">
          <div className="item_price"><span>{gameData.msg.itemInfo.sellPrice[lang]}</span><em>{`₩${items.price}`}</em></div>
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
            }} data-buttontype="itemSell">{gameData.msg.button.sell[lang]}</button>
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
                <span className="item_grade">{lang === 'ko' ? gameData.itemGrade.txt_k[items.grade] : gameData.itemGrade.txt_e[items.grade]}</span> <span className="item_type">{gameData.msg.title.etc[lang]}</span>
              </div>
              <div className="item_description" dangerouslySetInnerHTML={{__html: `"${items.txt[lang]}"`}}></div>
            </PopupItemName>
            {/* ${gameData.itemGrade.txt_e[items.grade]}  */}
          </div>
        </li>
        <li className="item_footer" flex="true">
          <div className="item_price"><span>{gameData.msg.itemInfo.sellPrice[lang]}</span><em>{`₩${items.price}`}</em></div>
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
            }} data-buttontype="itemUse">{gameData.msg.button.use[lang]}</button>
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
            }} data-buttontype="itemSell">{gameData.msg.button.sell[lang]}</button>
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
        <div style={{flex:1}} flex-v="true">
          <dl>
            <dt>{`${dataObj.skData.lv > 0 ? 'Lv.' + dataObj.skData.lv : lang === 'ko' ? '(미습득)' : '(Item not acquired)'} ${dataObj.sk.na[lang]}`}</dt>
            <dd dangerouslySetInnerHTML={{__html: replaceText}}></dd>
          </dl>
          <ul className="skill_eff">
            {(dataObj.skillCate === 5 || dataObj.skillCate === 6) && dataObj.sk.buff.map((skillEff) => {
              return skillEff.num.map((eff, idx) => {
                return (
                  <li className={`skill_eff_list ${dataObj.skData.lv === idx + 1 ? 'on' : ''}`} key={idx}>{`Lv.${idx + 1}: ${util.getEffectType(skillEff.type, lang)} ${eff}`}</li>
                )
              });
            })}
            {dataObj.skillCate !== 5 && dataObj.skillCate !== 6 && dataObj.skillCate !== 10 && dataObj.skillCate !== 11 && dataObj.sk.eff[0].num.map((skillEff, skillIdx) => {
              let skill = '';
              return dataObj.sk.eff.map((eff, idx) => {
                if(idx === 0) {
                  if (dataObj.sk.eff.length !== 1) {
                    skill += `Lv.${skillIdx + 1}: ${dataObj.sk.cate[0] !== 3 ? util.getEffectType(eff.type, lang) : ''} ${dataObj.sk.eff[idx].num[skillIdx]}, `;
                  } else {
                    skill += `Lv.${skillIdx + 1}: ${dataObj.sk.cate[0] !== 3 ? util.getEffectType(eff.type, lang) : ''} ${dataObj.sk.eff[idx].num[skillIdx]}`;
                  }
                } else {
                  skill += `${dataObj.sk.cate[0] !== 3 ? util.getEffectType(eff.type, lang) : ''} ${dataObj.sk.eff[idx].num[skillIdx]}`;
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
            {dataObj.skillCate === 10 && dataObj.sk.buff.map((skillEff) => {
              return skillEff.num.map((eff, idx) => {
                return (
                  <li className={`skill_eff_list ${dataObj.skData.lv === idx + 1 ? 'on' : ''}`} key={idx}>{`Lv.${idx + 1}: ${gameData.msg.info.percent[lang]} ${eff}`}</li>
                )
              });
            })}
            {dataObj.skillCate === 11 && dataObj.sk.eff.map((skillEff) => {
              return skillEff.num.map((eff, idx) => {
                return (
                  <li className={`skill_eff_list ${dataObj.skData.lv === idx + 1 ? 'on' : ''}`} key={idx}>{`Lv.${idx + 1}: ${gameData.msg.info[skillEff.type][lang]} ${eff}%`}</li>
                )
              });
            })}
          </ul>
        </div>
      </div>
    );
  } else if (type === 'selectCh') {
    const chData = dataObj.ch;
    let skillIdx = '',
      possibleCh = 0;
    switch(dataObj.type) {
      case 'tradingPost':
      case 'equipmentShop':
      case 'toolShop':
        skillIdx = 201;
        break;
      case 'shipyard':
        skillIdx = 202;
        break;
      case 'combinedItem':
        skillIdx = 206;
        break;
      case 'itemEnhancement1':
        skillIdx = 203;
        break;
      case 'itemEnhancement2':
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
            <Img imgurl={imgSet.etc.imgRing} />
            <CharacterCard saveData={saveData} slotIdx={dataObj.selectIdx} />
          </div>
          <div className="select_rBox" flex-v="true">
            <Img imgurl={imgSet.passive[gameData.skill[skillIdx].effAnimation]} />
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
            const chData = gameData.ch[saveCh.idx];
            if (hasSkill) {
              possibleCh ++;
              return (
                <li className={`g${saveCh.grade} ${dataObj.selectIdx === idx ? 'select' : ''}`} key={idx} onClick={(e) => {
                  e.stopPropagation();
                  dataObj.setSelectIdx(idx);
                }}>
                  <ListRing className="list_ring" ringBack={imgSet.etc.imgRingBack} />
                  <ListElement className="list_element" ringDisplay={imgSet.ringImg[chData.element]} />
                  <ListCh className="list_ch" chDisplay={imgSet.chImg[`ch${chData.display}`]} />
                  <div className="list_job_actiontype">
                    <ListJob jobIcon={imgSet.job[saveCh.job]} className="list_job"/>
                    {saveCh.newActionType.map((data, idx) => {
                      return (
                        <ListActionType key={'action'+idx} actionType={imgSet.element[data + 1]} className="list_action_type"/>
                      )
                    })}
                  </div>
                  <ListFrame className="list_frame" cardFrame={imgSet.etc.imgCardFrame} />
                  <div className="list_actionPoint">{`${saveCh.actionPoint} / ${saveCh.actionMax}`}</div>
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
  navigate,
}) => {
  const imgSet = useContext(AppContext).images;
  const gameData = useContext(AppContext).gameData;
	const setting = useContext(AppContext).setting,
    lang = setting.lang;
  const [selectIdx, setSelectIdx] = useState(0);
  const [content, setContent] = useState();
  useEffect(() => {
    if (type === 'selectCh') {
      dataObj.selectIdx = selectIdx;
      dataObj.setSelectIdx = setSelectIdx;
    }
    setContent(typeAsContent(type, dataObj, saveData, changeSaveData, gameData, imgSet, msgText, showMsg, showPopup, lang, navigate));
  }, [selectIdx]);
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
