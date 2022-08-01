import { chImg, itemHole, ringImg } from 'components/ImgSet';
import { util } from 'components/Libs';
import PopupContainer from 'components/PopupContainer';
import imgRing from 'images/ring/ring_.png';
import React, {useState} from 'react';
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
    markTag += `<span><img src="${img}"/></span>`
  }
  return markTag; 
  //imgSet.animalType[animalIdx]
}
const buttonEvent = (dataObj) => {
  dataObj.event.stopPropagation();
  console.log(dataObj);
  const gameData = dataObj.gameData;
  let sData = {...dataObj.saveData};
  if (dataObj.type === 'item_enhancement') {

  } else if (dataObj.type === 'itemEquip') { //아이템 착용
    const invenPart = dataObj.data.saveItemData.part;
    let overlapCheck = true;
    const saveCh = sData.ch[dataObj.data.slotIdx];
    //아이템 무게 측정
    let currentKg = 0;
    const totalKg = Math.floor(gameData.ch[saveCh.idx].st1 / 0.3)/10;
    saveCh.items.forEach((item) => {
      if (Object.keys(item).length !== 0) {
        currentKg += gameData.items.equip[item.part][item.idx].kg;
      }
    });
    saveCh.items.forEach((item, itemSlot)=>{
      const chType = gameData.ch[saveCh.idx].animal_type;
      if (invenPart === gameData.animal_type[chType].equip[itemSlot] && overlapCheck) {//해당파트와 같은파트인지? && 빈칸인지? && 같은파트가 비었을경우 한번만 발생하게
        if (item.idx === undefined) { //해당 슬롯이 비었을 비었을 경우
          currentKg += dataObj.data.gameItem.kg
          if (currentKg > totalKg) { //가능 무게를 넘어 갈 경우
            dataObj.showMsg(true);
            dataObj.msgText("착용할려는 장비가 무겁습니다.");
          } else { //착용 가능 무게일 경우
            saveCh.items[itemSlot] = {...dataObj.saveData.items['equip'][dataObj.data.itemSaveSlot]};//캐릭에 아이템 넣기
            sData.items['equip'].splice(dataObj.data.itemSaveSlot, 1);//인벤에서 아이템 제거
            overlapCheck = false;
            dataObj.changeSaveData(util.saveCharacter({//데이터 저장
              saveData: sData,
              slotIdx: dataObj.data.slotIdx,
              gameData: gameData,
            }));
            dataObj.showPopup(false);
            return;
          }
        } else { //해당 슬롯에 아이템이 있을 경우
          dataObj.showMsg(true);
          dataObj.msgText("같은 부위에 이미 다른 아이템이 착용 중입니다.");
        }
      }
    });
  } else if (dataObj.type === 'itemRelease') { //아이템 해제
    sData.items['equip'].push(dataObj.data.saveItemData);//인벤에 아이템 넣기
    sData.ch[dataObj.data.slotIdx].items[dataObj.data.itemSaveSlot] = {}; //아이템 삭제
    dataObj.changeSaveData(util.saveCharacter({//데이터 저장
      saveData: sData,
      slotIdx: dataObj.data.slotIdx,
      gameData: gameData,
    }));
    dataObj.showPopup(false);
  } else if (dataObj.type === 'itemUse') { //아이템 사용
    const saveCh = sData.ch[dataObj.data.slotIdx];
    switch (dataObj.data.gameItem.action) {
      case 99: //골드 획득
        sData.info.money += dataObj.data.gameItem.price;//돈 계산
        break;
      case 98: //경험치 획득
        if(saveCh.lv >= 50) {
          const hasMaxExp = gameData.hasMaxExp[saveCh.grade];
          saveCh.hasExp += dataObj.data.gameItem.eff;
          saveCh.hasExp += saveCh.exp;
          saveCh.lv = 50;
          saveCh.exp = 0;
          if (saveCh.hasExp > hasMaxExp) {
            saveCh.hasExp = hasMaxExp;
          }
        } else {
          saveCh.exp += dataObj.data.gameItem.eff;
        }
        const lvUp = (ch, dataObj) => {
          const maxExp = gameData.exp['grade'+ch.grade][ch.lv-1];
          dataObj.changeSaveData(util.saveCharacter({//데이터 저장
            saveData: sData,
            slotIdx: dataObj.data.slotIdx,
            gameData: gameData,
          }));
          if (ch.exp >= maxExp) { //레벨업
            util.effect.lvUp();
            if (ch.lv <= 50) {
              ch.lv += 1;
              ch.exp -= maxExp;
              setTimeout(() => {
                lvUp(ch, dataObj);
              }, 300);
              if(ch.lv % 10 === 0) {
                util.getSkill(gameData, ch, dataObj.data.slotIdx, dataObj.saveData, dataObj.changeSaveData);
              }
            }
          }
        }
        lvUp(saveCh, dataObj);
        break;
      default:
        break;
    } //사용 타입
    sData.items[dataObj.data.type].splice(dataObj.data.itemSaveSlot,1);//인벤에서 아이템 제거
    dataObj.changeSaveData(sData);//데이터 저장
    dataObj.showPopup(false);
  } else if (dataObj.type === 'itemSell') { //아이템 판매
    sData.info.money += dataObj.data.gameItem.price;//돈 계산
    sData.items[dataObj.data.type].splice(dataObj.data.itemSaveSlot,1);//인벤에서 아이템 제거
    dataObj.changeSaveData(sData);//데이터 저장
    dataObj.showPopup(false);
  } else if (dataObj.type === 'holeEquip') {
    dataObj.showPopup(false);
  }
}
const typeAsContent = (type, dataObj, saveData, changeSaveData, gameData, imgSet, msgText, showMsg, showPopup) => {
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
    const items = gameData.items.equip[dataObj.saveItemData.part][dataObj.saveItemData.idx];
    const saveItems = dataObj.saveItemData;
    const grade = saveItems.grade || items.grade;
    const setsInfo = gameData.items.set_type[items.set];
    //아이템 기본, 추가, 홀 효과
    let totalEff = [];
    saveItems.baseEff.forEach((data, idx) => {
      if (totalEff[data.type] === undefined) {
        totalEff[data.type] = {type: data.type, base: 0, add:0, hole:0};
      }
      totalEff[data.type].base += parseInt(data.num[grade - 1]);
    });
    saveItems.addEff.forEach((data, idx) => {
      if (totalEff[data.type] === undefined) {
        totalEff[data.type] = {type: data.type, base: 0, add:0, hole:0};
      }
      totalEff[data.type].add += parseInt(data.num[0]);
    });
    saveItems.hole.forEach((data, idx) => {
      const holeItem = gameData.items.hole[data].eff;
      holeItem.forEach((holeData, idx) => {
        if (totalEff[holeData.type] === undefined) {
          totalEff[holeData.type] = {type: holeData.type, base: 0, add:0, hole:0};
        }
        totalEff[holeData.type].hole += parseInt(holeData.num);
      });
    });
		return (
			<PopupItemContainer className="items" frameBack={imgSet.etc.frameChBack} color={gameData.itemGrade.color[grade]}>
        <li className="item_header" flex-center="true"><span className="item_name" dangerouslySetInnerHTML={{__html: `${saveItems.modifier}<br/>${items.na}`}}></span></li>
        <li flex="true">
          <PopupItemPic className={`item item${items.part} ${gameData.itemGrade.txt_e[saveItems.grade].toLowerCase()}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[items.display], saveItems.color)}}>
            </svg>
          </PopupItemPic>
          <div flex-h="true" style={{flex: 1,}}>
            <PopupItemName className="item_cont" color={gameData.itemGrade.color[grade]}>
              <div className="item_top">
                <span className="item_grade">{gameData.itemGrade.txt_k[grade]}</span> <span className="item_type">{gameData.itemType[items.part]}</span>
              </div>
              <div className="item_description" dangerouslySetInnerHTML={{__html: `"${items.txt}"`}}></div>
              <div className="item_kg">{items.kg}kg</div>
            </PopupItemName>
            {/* ${gameData.itemGrade.txt_e[items.grade]}  */}
          </div>
        </li>
        <li className="item_list item_typeSlot" flex="true">
          <div className="item_type" dangerouslySetInnerHTML={{__html: makeMark(saveItems.markNum, imgSet.animalType[saveItems.mark])}}>
          </div>
          <div className="item_slot">
            {saveItems.hole.map((data, idx) => {
              return (
                <div key={idx} className="item_holes"><span className="item_holeback"><Img imgurl={itemHole[data]} /></span></div>
              )
            })}
          </div>
        </li>
        <li className="item_list item_eff">
          <div className="item_title">아이템 효과</div>
          {totalEff.map((eff, idx) => {
            return (
              <div key={idx} className="item_effs"><span className="cate">{util.getEffectType(eff.type)}</span>{eff.base > 0 && <span className="base">{eff.base}</span>}{eff.add > 0 && <span className="add">{eff.add}</span>}{eff.hole > 0 && <span className="hole">{eff.hole}</span>}<span className="total">{eff.base + eff.add + eff.hole}</span></div>
            )
          })}
        </li>
        <div style={{width:"100%"}} className="scroll-y">
          {saveItems.baseEff.length > 0 && (
            <li className="item_list item_eff">
              <div className="item_title">기본 효과</div>
              {saveItems.baseEff.map((data, idx) => {
                const grade = saveItems.grade > 3 ? 3 : saveItems.grade - 1;
                return (
                  <div key={idx} className="item_effs">{`${util.getEffectType(data.type, "ko")} ${data.num[grade]}`}</div>
                ) 
              })}
            </li>
          )}
          {saveItems.addEff.length > 0 && (
            <li className="item_list item_eff">
              <div className="item_title">추가 효과</div>
              {saveItems.addEff.map((data, idx) => {
                const grade = saveItems.grade > 3 ? 3 : saveItems.grade - 1;
                return (
                  <div key={idx} className="item_effs add">{`${util.getEffectType(data.type, "ko")} ${data.num[0]}`}</div>
                ) 
              })}
            </li>
          )}
          {saveItems.hole.length > 0 && (
            <li className="item_list item_hole">
              <div className="item_title">소켓 효과</div>
              {totalEff.map((data, idx) => {
                if (data.hole > 0) {
                  return (
                    <div key={idx} className="item_effs hole">{`${util.getEffectType(data.type, "ko")} ${data.hole}`}</div>
                  )
                }
              })}
              {/* {saveItems.hole.map((data, idx) => {
                return (
                  <div key={idx} className="item_holes"><span className="item_holeback"><Img imgurl={itemHole[data]} /></span><span className="item_holeName">{`${gameData.items.hole[data].na}`}</span></div>
                ) 
              })} */}
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
          <div className="item_price"><span>판매가:</span><em>{`₩${items.price * saveItems.grade}`}</em></div>
          <div className="item_button" flex="true">
            <button text="true" onClick={(e) => {buttonEvent({
              event: e,
              type: 'itemRelease',
              data: dataObj,
              saveData: saveData,
              changeSaveData: changeSaveData,
              gameData: gameData,
              msgText: msgText,
              showMsg: showMsg,
              showPopup: showPopup,
            })}} data-buttontype="itemRelease">해제</button>
          </div>
        </li>
      </PopupItemContainer>
		);
	} else if (type === 'hequip') {
    const items = gameData.items.equip[dataObj.saveItemData.part][dataObj.saveItemData.idx];
    const saveItems = dataObj.saveItemData;
    const grade = saveItems.grade || items.grade;
    const setsInfo = gameData.items.set_type[items.set];
    //아이템 기본, 추가, 홀 효과
    let totalEff = [];
    saveItems.baseEff.forEach((data, idx) => {
      if (totalEff[data.type] === undefined) {
        totalEff[data.type] = {type: data.type, base: 0, add:0, hole:0};
      }
      totalEff[data.type].base += parseInt(data.num[grade - 1]);
    });
    saveItems.addEff.forEach((data, idx) => {
      if (totalEff[data.type] === undefined) {
        totalEff[data.type] = {type: data.type, base: 0, add:0, hole:0};
      }
      totalEff[data.type].add += parseInt(data.num[0]);
    });
    saveItems.hole.forEach((data, idx) => {
      const holeItem = gameData.items.hole[data].eff;
      holeItem.forEach((holeData, idx) => {
        if (totalEff[holeData.type] === undefined) {
          totalEff[holeData.type] = {type: holeData.type, base: 0, add:0, hole:0};
        }
        totalEff[holeData.type].hole += parseInt(holeData.num);
      });
    });
    return (
      <PopupItemContainer className="items" frameBack={imgSet.etc.frameChBack} color={gameData.itemGrade.color[grade]}>
        <li className="item_header" flex-center="true"><span className="item_name" dangerouslySetInnerHTML={{__html: `${saveItems.modifier}<br/>${items.na}`}}></span></li>
        <li flex="true">
          <PopupItemPic className={`item item${items.part} ${gameData.itemGrade.txt_e[saveItems.grade].toLowerCase()}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[items.display], saveItems.color)}}>
            </svg>
          </PopupItemPic>
          <div flex-h="true" style={{flex: 1,}}>
            <PopupItemName className="item_cont" color={gameData.itemGrade.color[grade]}>
              <div className="item_top">
                <span className="item_grade">{gameData.itemGrade.txt_k[grade]}</span> <span className="item_type">{gameData.itemType[items.part]}</span>
              </div>
              <div className="item_description" dangerouslySetInnerHTML={{__html: `"${items.txt}"`}}></div>
              <div className="item_kg">{items.kg}kg</div>
            </PopupItemName>
            {/* ${gameData.itemGrade.txt_e[items.grade]}  */}
          </div>
        </li>
        <li className="item_list item_typeSlot" flex="true">
          <div className="item_type" dangerouslySetInnerHTML={{__html: makeMark(saveItems.markNum, imgSet.animalType[saveItems.mark])}}>
          </div>
          <div className="item_slot">
            {saveItems.hole.map((data, idx) => {
              return (
                <div key={idx} className="item_holes"><span className="item_holeback"><Img imgurl={itemHole[data]} /></span></div>
              )
            })}
          </div>
        </li>
        <li className="item_list item_eff">
          <div className="item_title">아이템 효과</div>
          {totalEff.map((eff, idx) => {
            return (
              <div key={idx} className="item_effs"><span className="cate">{util.getEffectType(eff.type)}</span>{eff.base > 0 && <span className="base">{eff.base}</span>}{eff.add > 0 && <span className="add">{eff.add}</span>}{eff.hole > 0 && <span className="hole">{eff.hole}</span>}<span className="total">{eff.base + eff.add + eff.hole}</span></div>
            )
          })}
        </li>
        <div style={{width:"100%"}} className="scroll-y">
          <li className="item_list item_eff">
            <div className="item_title">기본 효과</div>
            {saveItems.baseEff && saveItems.baseEff.map((data, idx) => {
              const grade = saveItems.grade > 3 ? 3 : saveItems.grade - 1;
              return (
                <div key={idx} className="item_effs">{`${util.getEffectType(data.type, "ko")} ${data.num[grade]}`}</div>
              ) 
            })}
          </li>
          {saveItems.addEff.length > 0 && (
            <li className="item_list item_eff">
              <div className="item_title">추가 효과</div>
              {saveItems.addEff.map((data, idx) => {
                const grade = saveItems.grade > 3 ? 3 : saveItems.grade - 1;
                return (
                  <div key={idx} className="item_effs add">{`${util.getEffectType(data.type, "ko")} ${data.num[0]}`}</div>
                ) 
              })}
            </li>
          )}
          {saveItems.hole.length > 0 && (
            <li className="item_list item_hole">
              <div className="item_title">소켓 효과</div>
              {totalEff.map((data, idx) => {
                if (data.hole > 0) {
                  return (
                    <div key={idx} className="item_effs hole">{`${util.getEffectType(data.type, "ko")} ${data.hole}`}</div>
                  )
                }
              })}
              {/* {saveItems.hole.map((data, idx) => {
                return (
                  <div key={idx} className="item_holes"><span className="item_holeback"><Img imgurl={itemHole[data]} /></span><span className="item_holeName">{`${gameData.items.hole[data].na}`}</span></div>
                ) 
              })} */}
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
          <div className="item_price"><span>판매가:</span><em>{`₩${items.price * saveItems.grade}`}</em></div>
          <div className="item_button" flex="true">
            <button text="true" onClick={(e) => {buttonEvent({
              event: e,
              type: 'itemEnhancement',
              data: dataObj,
              saveData: saveData,
              changeSaveData: changeSaveData,
              gameData: gameData,
              msgText: msgText,
              showMsg: showMsg,
              showPopup: showPopup,
            })}} data-buttontype="itemEnhancement">강화</button>
            <button text="true" onClick={(e) => {buttonEvent({
              event: e,
              type: 'itemEquip',
              data: dataObj,
              saveData: saveData,
              changeSaveData: changeSaveData,
              gameData: gameData,
              msgText: msgText,
              showMsg: showMsg,
              showPopup: showPopup,
            })}} data-buttontype="itemEquip">장착</button>
            <button text="true" onClick={(e) => {buttonEvent({
              event: e,
              type: 'itemSell',
              data: dataObj,
              saveData: saveData,
              changeSaveData: changeSaveData,
              gameData: gameData,
              msgText: msgText,
              showMsg: showMsg,
              showPopup: showPopup,
            })}} data-buttontype="itemSell">판매</button>
          </div>
        </li>
      </PopupItemContainer>
    );
  } else if (type === 'hole') {
    const items = gameData.items.hole[dataObj.saveItemData.idx];
    const saveItems = dataObj.saveItemData;
    return (
			<PopupItemContainer className="items" frameBack={imgSet.etc.frameChBack} color={gameData.itemGrade.color[items.grade]}>
        <li className="item_header" flex-center="true"><span className="item_name">{items.na}</span></li>
        <li flex="true">
          <PopupItemPic  className="item item11" itemPic={imgSet.itemHole[items.display]} />
          <div flex-h="true" style={{flex: 1,}}>
            <PopupItemName className="item_cont" color={gameData.itemGrade.color[items.grade]}>
              <div className="item_top">
                <span className="item_grade">{gameData.itemGrade.txt_k[items.grade]}</span> <span className="item_type">소켓보석</span>
              </div>
              <div className="item_description" dangerouslySetInnerHTML={{__html: `"${items.txt}"`}}></div>
            </PopupItemName>
            {/* ${gameData.itemGrade.txt_e[items.grade]}  */}
          </div>
        </li>
        <li className="item_list item_eff">
          <div className="item_title">기본 효과</div>
          {saveItems.baseEff && saveItems.baseEff.map((data, idx) => {
            return (
              <div key={idx} className="item_effs">{`${util.getEffectType(data.type, "ko")} ${data.num[0]}`}</div>
            ) 
          })}
        </li>
        {saveItems.addEff.length > 0 && (
          <li className="item_list item_eff">
            <div className="item_title">추가 효과</div>
            {saveItems.addEff.map((data, idx) => {
              return (
                <div key={idx} className="item_effs add">{`${util.getEffectType(data.type, "ko")} ${data.num[0]}`}</div>
              ) 
            })}
          </li>
        )}
        <li className="item_footer" flex="true">
          <div className="item_price"><span>판매가:</span><em>{`₩${items.price * saveItems.grade}`}</em></div>
          <div className="item_button" flex="true">
            <button text="true" onClick={(e) => {buttonEvent({
              event: e,
              type: 'holeEquip',
              data: dataObj,
              saveData: saveData,
              changeSaveData: changeSaveData,
              gameData: gameData,
              msgText: msgText,
              showMsg: showMsg,
              showPopup: showPopup,
            })}} data-buttontype="holeEquip">장착</button>
            <button text="true" onClick={(e) => {buttonEvent({
              event: e,
              type: 'itemSell',
              data: dataObj,
              saveData: saveData,
              changeSaveData: changeSaveData,
              gameData: gameData,
              msgText: msgText,
              showMsg: showMsg,
              showPopup: showPopup,
            })}} data-buttontype="itemSell">판매</button>
          </div>
        </li>
      </PopupItemContainer>
    )
  } else if (type === 'upgrade') {
    const items = gameData.items.upgrade[dataObj.saveItemData.idx];
    return (
			<PopupItemContainer className="items" frameBack={imgSet.etc.frameChBack} color={gameData.itemGrade.color[items.grade]}>
        <li className="item_header" flex-center="true"><span className="item_name">{items.na}</span></li>
        <li flex="true">
          <PopupItemPic className="item item12" itemPic={imgSet.itemUpgrade[items.display]} />
          <div flex-h="true" style={{flex: 1,}}>
            <PopupItemName className="item_cont" color={gameData.itemGrade.color[items.grade]}>
              <div className="item_top">
                <span className="item_grade">{gameData.itemGrade.txt_k[items.grade]}</span> <span className="item_type">강화재료</span>
              </div>
              <div className="item_description" dangerouslySetInnerHTML={{__html: `"${items.txt}"`}}></div>
            </PopupItemName>
            {/* ${gameData.itemGrade.txt_e[items.grade]}  */}
          </div>
        </li>
        <li className="item_footer" flex="true">
          <div className="item_price"><span>판매가:</span><em>{`₩${items.price}`}</em></div>
          <div className="item_button" flex="true">
            <button text="true" onClick={(e) => {buttonEvent({
              event: e,
              type: 'itemUse',
              data: dataObj,
              saveData: saveData,
              changeSaveData: changeSaveData,
              gameData: gameData,
              msgText: msgText,
              showMsg: showMsg,
              showPopup: showPopup,
            })}} data-buttontype="itemUse">사용</button>
            <button text="true" onClick={(e) => {buttonEvent({
              event: e,
              type: 'itemSell',
              data: dataObj,
              saveData: saveData,
              changeSaveData: changeSaveData,
              gameData: gameData,
              msgText: msgText,
              showMsg: showMsg,
              showPopup: showPopup,
            })}} data-buttontype="itemSell">판매</button>
          </div>
        </li>
      </PopupItemContainer>
    )
  } else if (type === 'material') {
    const items = gameData.items.material[dataObj.saveItemData.idx];
    return (
			<PopupItemContainer className="items" frameBack={imgSet.etc.frameChBack} color={gameData.itemGrade.color[items.grade]}>
        <li className="item_header" flex-center="true"><span className="item_name">{items.na}</span></li>
        <li flex="true">
          <PopupItemPic className="item item14" itemPic={imgSet.itemMaterial[items.display]} />
          <div flex-h="true" style={{flex: 1,}}>
            <PopupItemName className="item_cont" color={gameData.itemGrade.color[items.grade]}>
              <div className="item_top">
                <span className="item_grade">{gameData.itemGrade.txt_k[items.grade]}</span> <span className="item_type">재료</span>
              </div>
              <div className="item_description" dangerouslySetInnerHTML={{__html: `"${items.txt}"`}}></div>
            </PopupItemName>
            {/* ${gameData.itemGrade.txt_e[items.grade]}  */}
          </div>
        </li>
        <li className="item_footer" flex="true">
          <div className="item_price"><span>판매가:</span><em>{`₩${items.price}`}</em></div>
          <div className="item_button" flex="true">
            <button text="true" onClick={(e) => {buttonEvent({
              event: e,
              type: 'itemSell',
              data: dataObj,
              saveData: saveData,
              changeSaveData: changeSaveData,
              gameData: gameData,
              msgText: msgText,
              showMsg: showMsg,
              showPopup: showPopup,
            })}} data-buttontype="itemSell">판매</button>
          </div>
        </li>
      </PopupItemContainer>
    )
  } else if (type === 'etc') {
    const items = gameData.items.etc[dataObj.saveItemData.idx];
    return (
			<PopupItemContainer className="items" frameBack={imgSet.etc.frameChBack} color={gameData.itemGrade.color[items.grade]}>
        <li className="item_header" flex-center="true"><span className="item_name">{items.na}</span></li>
        <li flex="true">
          <PopupItemPic className="item item13" itemPic={imgSet.itemEtc[items.display]} />
          <div flex-h="true" style={{flex: 1,}}>
            <PopupItemName className="item_cont" color={gameData.itemGrade.color[items.grade]}>
              <div className="item_top">
                <span className="item_grade">{gameData.itemGrade.txt_k[items.grade]}</span> <span className="item_type">기타</span>
              </div>
              <div className="item_description" dangerouslySetInnerHTML={{__html: `"${items.txt}"`}}></div>
            </PopupItemName>
            {/* ${gameData.itemGrade.txt_e[items.grade]}  */}
          </div>
        </li>
        <li className="item_footer" flex="true">
          <div className="item_price"><span>판매가:</span><em>{`₩${items.price}`}</em></div>
          <div className="item_button" flex="true">
            <button text="true" onClick={(e) => {buttonEvent({
              event: e,
              type: 'itemUse',
              data: dataObj,
              saveData: saveData,
              changeSaveData: changeSaveData,
              gameData: gameData,
              msgText: msgText,
              showMsg: showMsg,
              showPopup: showPopup,
            })}} data-buttontype="itemUse">사용</button>
            <button text="true" onClick={(e) => {buttonEvent({
              event: e,
              type: 'itemSell',
              data: dataObj,
              saveData: saveData,
              changeSaveData: changeSaveData,
              gameData: gameData,
              msgText: msgText,
              showMsg: showMsg,
              showPopup: showPopup,
            })}} data-buttontype="itemSell">판매</button>
          </div>
        </li>
      </PopupItemContainer>
    )
  }
}

const Popup = ({ 
	showPopup,
	type,
  saveData,
  changeSaveData,
	dataObj,
  gameData,
  imgSet,
  msgText,
  showMsg,
}) => {
	return (
    <>
      <PopupContainer>
        <div className="popup transition">
          <div className="popup_cont" onClick={(e) => {
            showPopup(false);
          }}>
            {typeAsContent(type, dataObj, saveData, changeSaveData, gameData, imgSet, msgText, showMsg, showPopup)}
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
