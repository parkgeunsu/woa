import React from 'react';
import PopupContinaer from 'components/PopupContainer';
import styled from 'styled-components';
import { util, fn } from 'components/Libs';

import { chImg, chStyleImg, ringImg, itemHole } from 'components/ImgSet';
import imgRing from 'images/ring/ring_.png';

const PopupArea = styled.div`
	position:fixed;left:0;right:0;top:0;bottom:0;z-index:10;
	&:after{
		content:'';position:absolute;left:0;right:0;top:0;bottom:0;background:rgba(0,0,0,.7);
	}
`;
const PopupCont = styled.div`
	position:absolute;left:0;right:0;top:0;bottom:0;z-index:2;
  display:flex;flex-direction:column;align-items:center;
	&{
		ul{margin:auto auto;width:80%;}

		button{margin:10px 3px;padding:5px 10px;border-radius:10px;background-image:-webkit-linear-gradient(bottom, rgba(0,0,0,0.075), rgba(255,255,255,0.5));background-image: linear-gradient(to top, rgba(0, 0, 0, 0.75), rgba(255,255,255,0.5));box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.5), 0 0 1px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0,0,0,1);border-radius: 20px;color:rgba(255,255,255,0.9);line-height:1;}
	}
`;
const PopupClose = styled.div`
	position:absolute;right:5px;top:10px;z-index:1;
	&{
		span{display:block;position:absolute;right:10px;top:20px;width:30px;height:5px;background:#fff;box-shadow:0 0 10px #fff;}
		span:first-of-type{transform-origin:50% 50%;transform:rotate(135deg);}
		span:last-of-type{transform-origin:50% 50%;transform:rotate(45deg);}
	}
`;
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
const PopupRelationContainer = styled.ul`
  margin:auto auto;width:80%;flex-flow:wrap;
  & {
    li img{width:100%;}
    li .name{position:absolute;z-index:1;left:0;right:0;top:50%;padding:5px;text-align:center;font-size:12px;line-height:12px;letter-spacing:-1px;color:#000;font-weight:600;background:rgba(255,255,255,.4);}
  }
`;
const PopupRelationList = styled.li`
  position:relative;margin:5px;padding-top:calc(33.3% - 10px);width:calc(33.3% - 10px);height:0;border-radius:100px;font-size:0;overflow:hidden;
  background-image:url(${({ringDisplay}) => ringDisplay});
  background-size:cover;
  box-shadow:${({gameData, chData}) => (
      `0 0 13px ${gameData.chGradeColor[chData.grade]}, 0 0 8px ${gameData.chGradeColor[chData.grade]}, 0 0 5px ${gameData.chGradeColor[chData.grade]}, 0 0 2px ${gameData.chGradeColor[chData.grade]}`
  )}
`;
const PopupRelationListCh = styled.span`
  position:absolute;left:0;right:0;bottom:0;top:0;
  background-image:url(${({chDisplay}) => chDisplay});
  background-size:85%;background-position:center -10%;
`;
const PopupRelationListChStyle = styled.span`
  position:absolute;left:0;right:0;bottom:0;top:0;
  background-image:url(${({styleDisplay}) => styleDisplay});
  background-size:100%;background-position:center 20%;
`;
const Img = styled.img.attrs(
  ({imgurl}) => ({
    src: imgurl 
  })
)``;

const PopupItemContainer = styled.ul`
  display:flex;flex-direction:column;align-items:center;
  margin:auto auto;width:80%;
`;
const PopupItemList = styled.li`
  display:flex;flex-direction:column;align-items:center;
  &.item_eff{margin:5px 0 0 0;padding:5px 10px;min-width:50%;box-sizing:border-box;border:1px solid #fff;}
  &.item_hole img{margin-left:5px;height:15px;vertical-align:middle;}
  &.item_eff span{margin-bottom:5px;}
  &.item_eff span:last-of-type{margin-bottom:0;}
  &.item_set{margin:5px 0 0 0;padding:5px 10px;min-width:50%;box-sizing:border-box;border:1px solid #fff;}
  & {
    span{color:#fff;}
    .item_grade{font-weight:600;color:#fff;text-align:center;}
    .item_lv{margin:2px 0 5px 0;font-weight:600;color:#fff;font-size:16px;text-shadow:0 0 5px #fff;text-align:center;}
    .item_set_piece.on{color:#f00;}
  }
`;
const ItemGrade = styled.span`
  color: ${({ color }) => color}
`;
const getSetChk = (has_item,n) => {//셋트 아이템 체크
  let chk = false;
  has_item.forEach((v)=>{
    if(v.idx === n){
      chk = true;
    }
  });
  return chk ? 'on' : '';
}
const buttonEvent = (dataObj) => {
  const gameData = dataObj.gameData;
  console.log(dataObj);
  if (dataObj.type === 'item_enhancement') {

  } else if (dataObj.type === 'itemEquip') { //아이템 착용
    let sData = {...dataObj.saveData};
    const invenPart = dataObj.data.gameItem.part;
    let overlapCheck = true;
    const saveCh = sData.ch[dataObj.data.slotIdx];
    saveCh.items.forEach((item, itemSlot)=>{
      const chType = gameData.ch[saveCh.idx].animal_type;
      if (invenPart === gameData.animal_type[chType].equip[itemSlot] && overlapCheck && item.idx === undefined) {//해당파트와 같은파트인지? && 빈칸인지? && 같은파트가 비었을경우 한번만 발생하게
        saveCh.items[itemSlot] = {...dataObj.saveData.items['equip'][dataObj.data.itemSaveSlot]};//캐릭에 아이템 넣기
        sData.items['equip'].splice(dataObj.data.itemSaveSlot, 1);//인벤에서 아이템 제거
        overlapCheck = false;
        dataObj.changeSaveData(sData);
        return;
      }
    });
  } else if (dataObj.type === 'itemRelease') { //아이템 해제
    let sData = {...dataObj.saveData};
    sData.items['equip'].push(dataObj.data.saveItemData);//인벤에 아이템 넣기
    sData.ch[dataObj.data.slotIdx].items[dataObj.data.itemSaveSlot] = {}; //아이템 삭제
    dataObj.changeSaveData(sData);
  } else if (dataObj.type === 'itemUse') { //아이템 사용
    
  } else if (dataObj.type === 'itemSell') { //아이템 판매
    let sData = {...dataObj.saveData};
    sData.info.money += dataObj.data.gameItem.price;//돈 계산
    sData.items[dataObj.data.type].splice(dataObj.data.itemSaveSlot,1);//인벤에서 아이템 제거
    dataObj.changeSaveData(sData);
  } else if (dataObj.type === 'holeEquip') {
    
  }
}
const typeAsContent = (type, dataObj, saveData, changeSaveData, gameData) => {
	if (type === 'relation') {
    const member = dataObj.relation.member;
		return (
			<PopupRelationContainer flex-center="true" className="people">
        {member && member.map((data ,idx) => {
          const chData = gameData.ch[idx];
          return (
            <PopupRelationList key={idx} gameData={gameData} chData={chData} ringDisplay={ringImg[chData.element]}>
              <Img imgurl={imgRing} />
              <PopupRelationListCh chDisplay={chImg[chData.display]} className="ch" />
              <PopupRelationListChStyle classNAme="ch_style" styleDisplay={chStyleImg[chData.style]} />
              <span className="name">{chData.na1}</span>
            </PopupRelationList>
          )
        })}
			</PopupRelationContainer>
		);
	} else if (type === 'equip') {
    const items = gameData.items.equip[dataObj.saveItemData.idx];
    const saveItems = dataObj.saveItemData;
    const setsInfo = gameData.items.set_type[items.set];
		return (
			<PopupItemContainer className="items">
        <PopupItemList>
          <ItemGrade className="item_grade" color={gameData.itemGrade.color[items.grade]}>{`${gameData.itemGrade.txt_e[items.grade]} (${gameData.itemGrade.txt_k[items.grade]})`}</ItemGrade>
          <span className="item_price">{`₩ ${items.price}`} </span>
          <span className="item_lv">
          {`LV.${saveItems.lv} "${items.na}"+${saveItems.upgrade > 0 ? saveItems.upgrade : ''}`}
          </span>
          <span className="item_txt" dangerouslySetInnerHTML={{__html: items.txt}}></span>
        </PopupItemList>
        <PopupItemList className="item_eff">
          {items.eff && items.eff.map((data, idx) => {
            return (
              <span key={idx}>{`${util.getEffectType(data.type)} ${data.num[saveItems.upgrade]}`}</span>
            ) 
          })}
        </PopupItemList>
        <PopupItemList className="item_hole">
          {saveItems.hole && saveItems.hole.map((data, idx) => {
            return (
              <span key={idx}>{`홀 ${idx+1} : ${gameData.items.hole[data].na}`}<Img imgurl={itemHole[data]} /></span>
            ) 
          })}
        </PopupItemList>
        <PopupItemList className="item_set">
          <span className="item_setNa">{setsInfo.na}</span>
          {setsInfo.part && setsInfo.part.map((data, idx) => {
            return (
              <span key={idx} className={`item_set_piece ${getSetChk(saveData.ch[dataObj.slotIdx].items, data)}`}>{gameData.items.equip[data].na}</span>
            ) 
          })}
        </PopupItemList>
        <PopupItemList style={{flexDirection: 'row'}}>
          <button text="true" onClick={() => {buttonEvent({
            type: 'itemRelease',
            data: dataObj,
            saveData: saveData,
            changeSaveData: changeSaveData,
            gameData: gameData,
          })}} data-buttontype="itemRelease">해제</button>
        </PopupItemList>
      </PopupItemContainer>
		);
	} else if (type === 'hequip') {
    const items = gameData.items.equip[dataObj.saveItemData.idx];
    const saveItems = dataObj.saveItemData;
    const setsInfo = gameData.items.set_type[items.set];
    return (
			<PopupItemContainer className="items">
        <PopupItemList>
          <ItemGrade className="item_grade" color={gameData.itemGrade.color[items.grade]}>{`${gameData.itemGrade.txt_e[items.grade]} (${gameData.itemGrade.txt_k[items.grade]})`}</ItemGrade>
          <span className="item_price">{`₩ ${items.price}`} </span>
          <span className="item_lv">
          {`LV.${saveItems.lv} "${items.na}"+${saveItems.upgrade > 0 ? saveItems.upgrade : ''}`}
          </span>
          <span className="item_txt" dangerouslySetInnerHTML={{__html: items.txt}}></span>
        </PopupItemList>
        <PopupItemList className="item_eff">
          {items.eff && items.eff.map((data, idx) => {
            return (
              <span key={idx}>{`${util.getEffectType(data.type)} ${data.num[saveItems.upgrade]}`}</span>
            ) 
          })}
        </PopupItemList>
        <PopupItemList className="item_hole">
          {saveItems.hole && saveItems.hole.map((data, idx) => {
            return (
              <span key={idx}>{`홀 ${idx+1} : ${gameData.items.hole[data].na}`}<Img imgurl={itemHole[data]} /></span>
            ) 
          })}
        </PopupItemList>
        <PopupItemList className="item_set">
          <span className="item_setNa">{setsInfo.na}</span>
          {setsInfo.part && setsInfo.part.map((data, idx) => {
            return (
              <span key={idx} className={`item_set_piece ${getSetChk(saveData.ch[dataObj.slotIdx].items, data)}`}>{gameData.items.equip[data].na}</span>
            ) 
          })}
        </PopupItemList>
        <PopupItemList style={{flexDirection: 'row'}}>
          <button text="true" onClick={() => {buttonEvent({
            type: 'itemEnhancement',
            data: dataObj,
            saveData: saveData,
            changeSaveData: changeSaveData,
            gameData: gameData,
          })}} data-buttontype="itemEnhancement">강화</button>
          <button text="true" onClick={() => {buttonEvent({
            type: 'itemEquip',
            data: dataObj,
            saveData: saveData,
            changeSaveData: changeSaveData,
            gameData: gameData,
          })}} data-buttontype="itemEquip">장착</button>
          <button text="true" onClick={() => {buttonEvent({
            type: 'itemSell',
            data: dataObj,
            saveData: saveData,
            changeSaveData: changeSaveData,
            gameData: gameData,
          })}} data-buttontype="itemSell">판매</button>
        </PopupItemList>
      </PopupItemContainer>
    );
  } else if (type === 'hole') {
    const items = gameData.items.hole[dataObj.saveItemData.idx];
    return (
			<PopupItemContainer className="items">
        <PopupItemList>
          <ItemGrade className="item_grade" color={gameData.itemGrade.color[items.grade]}>{`${gameData.itemGrade.txt_e[items.grade]} (${gameData.itemGrade.txt_k[items.grade]})`}</ItemGrade><span className="item_price">{`₩ ${items.price}`} </span>
          <span className="item_lv">{`"${items.na}"`}</span>
          <span className="item_txt" dangerouslySetInnerHTML={{__html: items.txt}}></span>
        </PopupItemList>
        <PopupItemList className="item_eff">
          {items.eff && items.eff.map((data, idx) => {
            return (
              <span key={idx}>{`${util.getEffectType(data.type)} ${data.num}`}</span>
            ) 
          })}
        </PopupItemList>
        <PopupItemList style={{flexDirection: 'row'}}>
          <button text="true" onClick={() => {buttonEvent({
            type: 'holeEquip',
            data: dataObj,
            saveData: saveData,
            changeSaveData: changeSaveData,
            gameData: gameData,
          })}} data-buttontype="holeEquip">장착</button>
          <button text="true" onClick={() => {buttonEvent({
            type: 'itemSell',
            data: dataObj,
            saveData: saveData,
            changeSaveData: changeSaveData,
            gameData: gameData,
          })}} data-buttontype="itemSell">판매</button>
        </PopupItemList>
      </PopupItemContainer>
    )
  } else if (type === 'upgrade') {
    const items = gameData.items.upgrade[dataObj.saveItemData.idx];
    return (
			<PopupItemContainer className="items">
        <PopupItemList>
          <ItemGrade className="item_grade" color={gameData.itemGrade.color[items.grade]}>{`${gameData.itemGrade.txt_e[items.grade]} (${gameData.itemGrade.txt_k[items.grade]})`}</ItemGrade><span className="item_price">{`₩ ${items.price}`} </span>
          <span className="item_lv">{`"${items.na}"`}</span>
          <span className="item_eff" dangerouslySetInnerHTML={{__html: items.txt}}></span>
        </PopupItemList>
        <PopupItemList style={{flexDirection: 'row'}}>
          <button text="true" onClick={() => {buttonEvent({
            type: 'itemUse',
            data: dataObj,
            saveData: saveData,
            changeSaveData: changeSaveData,
            gameData: gameData,
          })}} data-buttontype="itemUse">사용</button>
          <button text="true" onClick={() => {buttonEvent({
            type: 'itemSell',
            data: dataObj,
            saveData: saveData,
            changeSaveData: changeSaveData,
            gameData: gameData,
          })}} data-buttontype="itemSell">판매</button>
        </PopupItemList>
      </PopupItemContainer>
    )
  } else if (type === 'material') {
    const items = gameData.items.material[dataObj.saveItemData.idx];
    return (
			<PopupItemContainer className="items">
        <PopupItemList>
          <ItemGrade className="item_grade" color={gameData.itemGrade.color[items.grade]}>{`${gameData.itemGrade.txt_e[items.grade]} (${gameData.itemGrade.txt_k[items.grade]})`}</ItemGrade><span className="item_price">{`₩ ${items.price}`} </span>
          <span className="item_lv">{`"${items.na}"`}</span>
          <span className="item_eff" dangerouslySetInnerHTML={{__html: items.txt}}></span>
        </PopupItemList>
        <PopupItemList style={{flexDirection: 'row'}}>
          <button text="true" onClick={() => {buttonEvent({
            type: 'itemSell',
            data: dataObj,
            saveData: saveData,
            changeSaveData: changeSaveData,
            gameData: gameData,
          })}} data-buttontype="itemSell">판매</button>
        </PopupItemList>
      </PopupItemContainer>
    )
  } else if (type === 'etc') {
    const items = gameData.items.etc[dataObj.saveItemData.idx];
    return (
			<PopupItemContainer className="items">
        <PopupItemList>
          <ItemGrade className="item_grade" color={gameData.itemGrade.color[items.grade]}>{`${gameData.itemGrade.txt_e[items.grade]} (${gameData.itemGrade.txt_k[items.grade]})`}</ItemGrade><span className="item_price">{`₩ ${items.price}`} </span>
          <span className="item_lv">{`"${items.na}"`}</span>
          <span className="item_eff" dangerouslySetInnerHTML={{__html: items.txt}}></span>
        </PopupItemList>
        <PopupItemList style={{flexDirection: 'row'}}>
          <button text="true" onClick={() => {buttonEvent({
            type: 'itemUse',
            data: dataObj,
            saveData: saveData,
            changeSaveData: changeSaveData,
            gameData: gameData,
          })}} data-buttontype="itemUse">사용</button>
          <button text="true" onClick={() => {buttonEvent({
            type: 'itemSell',
            data: dataObj,
            saveData: saveData,
            changeSaveData: changeSaveData,
            gameData: gameData,
          })}} data-buttontype="itemSell">판매</button>
        </PopupItemList>
      </PopupItemContainer>
    )
  }
}

const Popup = ({ 
	onClose,
	type,
  saveData,
  changeSaveData,
	dataObj,
  gameData,
}) => {
	return (
		<PopupContinaer>
			<PopupArea className="popup transition">
				<PopupCont className="popup_cont" onClick={() => {onClose()}}>
					{typeAsContent(type, dataObj, saveData, changeSaveData, gameData)}
				</PopupCont>
				<PopupClose>
					<span></span><span></span>
				</PopupClose>
			</PopupArea>
		</PopupContinaer>
	)
}

export default Popup;
