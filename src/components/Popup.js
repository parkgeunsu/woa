import { chImg, itemHole, ringImg } from 'components/ImgSet';
import { util } from 'components/Libs';
import PopupContinaer from 'components/PopupContainer';
import imgRing from 'images/ring/ring_.png';
import React from 'react';
import styled from 'styled-components';


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
  display:flex;position:relative;flex-direction:column;align-items:center;
  margin:auto auto;width:80%;
  border:5px solid transparent;
  border-image:url(${({frameBack}) => frameBack}) 5 round;
  background:rgba(0,0,0,.7);
  & > li {
    padding:10px;width:100%;box-sizing:border-box;
  }
  .item_header{padding:5px 10px;border:5px solid transparent;
  border-image:url(${({frameBack}) => frameBack}) 5 round;
  background:rgba(0,0,0,.7);text-align:center;background-image:radial-gradient(at 50%, #930 0%, #691500 40%, #000 80%);}
  .item_upgrade{margin:0 0 0 5px;font-weight:600;color:#fff;font-size:14px;text-shadow:0 0 5px #fff;}
  .item_name{color:${({ color }) => color};font-size:15px;font-weight:600;}
  .item_footer{justify-content:space-between;align-items:center;border:5px solid transparent;
  border-image:url(${({frameBack}) => frameBack}) 5 round;
  background:rgba(0,0,0,.7);}
  .item_price span{display:inline-block;margin:0 5px 0 0;font-size:14px;color:#c80;}
  .item_price em{font-size:14px;color:#fff;vertical-align:middle;}
  .item_footer button{margin:0;}
`;
const PopupItemPic = styled.div`
  width:80px;height:80px;border:5px double #c80;
  &:after{display:block;content:"";width:100%;height:100%;background-image:url(${({itemPic}) => itemPic});background-size:100%;background-repeat:no-repeat;}
  svg{width:100%;height:100%;}
`;
const PopupItemName = styled.div`
  margin:0 0 0 10px;flex:1;
  span{display:inline-block;vertical-align:middle;}
  .item_top{display:flex;justify-content:space-between;margin:0 0 15px 0;color:#bbb;font-size:12px;}
  .item_grade{color:${({ color }) => color};}
  .item_bottom{margin:0 0 10px 0;}
  .item_description{font-family:serif;line-height:1.2;font-size:13px;color:#d3a859;font-weight:600;}
`;
const PopupItemList = styled.li`
  display:flex;margin:5px 0 0 0;flex-direction:column;
  .item_title{margin:0 0 5px 0;font-size:14px;color:#ddd;}
  .item_effs{margin:0 0 5px 15px;color:#2f73ff;font-weight:600;}
  &.item_eff{padding:0 10px;}
  .item_holes{margin:0 0 5px 5px;}
  .item_holeback{display:inline-block;background-image:radial-gradient(at 50%, #000 30%, #888 100%);border-radius:30px;margin-left:5px;width:24px;height:24px;text-align:center;}
  &.item_hole{padding:0 10px;}
  .item_holes img{margin:2px 0 0 0;width:20px;height:20px;vertical-align:middle;}
  .item_holeName{display:inline-block;margin:0 0 0 5px;color:#e14040;font-weight:600;}
  &.item_set{margin:0 0 10px 0;padding:0 10px;}
  .item_setNa{margin:0 0 10px 0;color:#0f0;font-size:14px;}
  .item_set_piece{margin:0 0 5px 15px;color:#555;}
  .item_set_piece:last-of-type{margin:0 0 0 15px;}
  .item_set_piece.on{color:#fff;font-weight:600;}
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
const buttonEvent = (dataObj) => {
  const gameData = dataObj.gameData;
  console.log(dataObj);
  let sData = {...dataObj.saveData};
  if (dataObj.type === 'item_enhancement') {

  } else if (dataObj.type === 'itemEquip') { //아이템 착용
    const invenPart = dataObj.data.gameItem.part;
    let overlapCheck = true;
    const saveCh = sData.ch[dataObj.data.slotIdx];
    saveCh.items.forEach((item, itemSlot)=>{
      const chType = gameData.ch[saveCh.idx].animal_type;
      if (invenPart === gameData.animal_type[chType].equip[itemSlot] && overlapCheck && item.idx === undefined) {//해당파트와 같은파트인지? && 빈칸인지? && 같은파트가 비었을경우 한번만 발생하게
        saveCh.items[itemSlot] = {...dataObj.saveData.items['equip'][dataObj.data.itemSaveSlot]};//캐릭에 아이템 넣기
        sData.items['equip'].splice(dataObj.data.itemSaveSlot, 1);//인벤에서 아이템 제거
        overlapCheck = false;
        dataObj.changeSaveData(util.saveCharacter({//데이터 저장
          saveData: sData,
          slotIdx: dataObj.data.slotIdx,
          gameData: gameData,
        }));
        return;
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
  } else if (dataObj.type === 'itemSell') { //아이템 판매
    sData.info.money += dataObj.data.gameItem.price;//돈 계산
    sData.items[dataObj.data.type].splice(dataObj.data.itemSaveSlot,1);//인벤에서 아이템 제거
    dataObj.changeSaveData(sData);//데이터 저장
  } else if (dataObj.type === 'holeEquip') {
    
  }
}
const typeAsContent = (type, dataObj, saveData, changeSaveData, gameData, imgSet) => {
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
			<PopupItemContainer className="items" frameBack={imgSet.etc.frameChBack} color={gameData.itemGrade.color[items.grade]}>
        <li className="item_header" flex-center="true"><span className="item_name">{items.na}</span><span className="item_upgrade">{`+${saveItems.upgrade > 0 ? saveItems.upgrade : ''}`}</span></li>
        <li flex="true">
          <PopupItemPic className={`item item${items.part}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[items.display], saveItems.color)}}>
            </svg>
          </PopupItemPic>
          <div flex-h="true" style={{flex: 1,}}>
            <PopupItemName color={gameData.itemGrade.color[items.grade]}>
              <div className="item_top">
                <span className="item_grade">{gameData.itemGrade.txt_k[items.grade]}</span> <span className="item_type">{gameData.itemType[items.part]}</span>
              </div>
              <div className="item_description" dangerouslySetInnerHTML={{__html: `"${items.txt}"`}}></div>
            </PopupItemName>
            {/* ${gameData.itemGrade.txt_e[items.grade]}  */}
          </div>
        </li>
        <PopupItemList className="item_eff">
          <div className="item_title">아이템 효과</div>
          {items.eff && items.eff.map((data, idx) => {
            return (
              <div key={idx} className="item_effs">{`${util.getEffectType(data.type)} +${data.num[saveItems.upgrade]}`}</div>
            ) 
          })}
        </PopupItemList>
        {saveItems.hole.length > 0 && (
          <PopupItemList className="item_hole">
            <div className="item_title">소켓 효과</div>
            {saveItems.hole.map((data, idx) => {
              return (
                <div key={idx} className="item_holes"><span className="item_holeback"><Img imgurl={itemHole[data]} /></span><span className="item_holeName">{`${gameData.items.hole[data].na}`}</span></div>
              ) 
            })}
          </PopupItemList>
        )}
        <PopupItemList className="item_set">
          <div className="item_setNa">{setsInfo.na}</div>
          {setsInfo.part && setsInfo.part.map((data, idx) => {
            return (
              <div key={idx} className={`item_set_piece ${getSetChk(saveData.ch[dataObj.slotIdx].items, data)}`}>{gameData.items.equip[data].na}</div>
            ) 
          })}
        </PopupItemList>
        <li className="item_footer" flex="true">
          <div className="item_price"><span>판매가:</span><em>{`₩${items.price}`}</em></div>
          <div className="item_button" flex="true">
            <button text="true" onClick={() => {buttonEvent({
              type: 'itemRelease',
              data: dataObj,
              saveData: saveData,
              changeSaveData: changeSaveData,
              gameData: gameData,
            })}} data-buttontype="itemRelease">해제</button>
          </div>
        </li>
      </PopupItemContainer>
		);
	} else if (type === 'hequip') {
    const items = gameData.items.equip[dataObj.saveItemData.idx];
    const saveItems = dataObj.saveItemData;
    const setsInfo = gameData.items.set_type[items.set];
    return (
      <PopupItemContainer className="items" frameBack={imgSet.etc.frameChBack} color={gameData.itemGrade.color[items.grade]}>
        <li className="item_header" flex-center="true"><span className="item_name">{items.na}</span><span className="item_upgrade">{`+${saveItems.upgrade > 0 ? saveItems.upgrade : ''}`}</span></li>
        <li flex="true">
          <PopupItemPic className={`item item${items.part}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[items.display], saveItems.color)}}>
            </svg>
          </PopupItemPic>
          <div flex-h="true" style={{flex: 1,}}>
            <PopupItemName color={gameData.itemGrade.color[items.grade]}>
              <div className="item_top">
                <span className="item_grade">{gameData.itemGrade.txt_k[items.grade]}</span> <span className="item_type">{gameData.itemType[items.part]}</span>
              </div>
              <div className="item_description" dangerouslySetInnerHTML={{__html: `"${items.txt}"`}}></div>
            </PopupItemName>
            {/* ${gameData.itemGrade.txt_e[items.grade]}  */}
          </div>
        </li>
        <PopupItemList className="item_eff">
          <div className="item_title">아이템 효과</div>
          {items.eff && items.eff.map((data, idx) => {
            return (
              <div key={idx} className="item_effs">{`${util.getEffectType(data.type)} +${data.num[saveItems.upgrade]}`}</div>
            ) 
          })}
        </PopupItemList>
        {saveItems.hole.length > 0 && (
          <PopupItemList className="item_hole">
            <div className="item_title">소켓 효과</div>
            {saveItems.hole.map((data, idx) => {
              return (
                <div key={idx} className="item_holes"><span className="item_holeback"><Img imgurl={itemHole[data]} /></span><span className="item_holeName">{`${gameData.items.hole[data].na}`}</span></div>
              ) 
            })}
          </PopupItemList>
        )}
        <PopupItemList className="item_set">
          <div className="item_setNa">{setsInfo.na}</div>
          {setsInfo.part && setsInfo.part.map((data, idx) => {
            return (
              <div key={idx} className={`item_set_piece ${getSetChk(saveData.ch[dataObj.slotIdx].items, data)}`}>{gameData.items.equip[data].na}</div>
            ) 
          })}
        </PopupItemList>
        <li className="item_footer" flex="true">
          <div className="item_price"><span>판매가:</span><em>{`₩${items.price}`}</em></div>
          <div className="item_button" flex="true">
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
          </div>
        </li>
      </PopupItemContainer>
    );
  } else if (type === 'hole') {
    const items = gameData.items.hole[dataObj.saveItemData.idx];
    return (
			<PopupItemContainer className="items" frameBack={imgSet.etc.frameChBack} color={gameData.itemGrade.color[items.grade]}>
        <li className="item_header" flex-center="true"><span className="item_name">{items.na}</span></li>
        <li flex="true">
          <PopupItemPic  className="item item11" itemPic={imgSet.itemHole[items.display]} />
          <div flex-h="true" style={{flex: 1,}}>
            <PopupItemName color={gameData.itemGrade.color[items.grade]}>
              <div className="item_top">
                <span className="item_grade">{gameData.itemGrade.txt_k[items.grade]}</span> <span className="item_type">소켓보석</span>
              </div>
              <div className="item_description" dangerouslySetInnerHTML={{__html: `"${items.txt}"`}}></div>
            </PopupItemName>
            {/* ${gameData.itemGrade.txt_e[items.grade]}  */}
          </div>
        </li>
        <PopupItemList className="item_eff">
          <div className="item_title">아이템 효과</div>
          {items.eff && items.eff.map((data, idx) => {
            return (
              <div key={idx} className="item_effs">{`${util.getEffectType(data.type)} +${data.num}`}</div>
            ) 
          })}
        </PopupItemList>
        <li className="item_footer" flex="true">
          <div className="item_price"><span>판매가:</span><em>{`₩${items.price}`}</em></div>
          <div className="item_button" flex="true">
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
            <PopupItemName color={gameData.itemGrade.color[items.grade]}>
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
            <PopupItemName color={gameData.itemGrade.color[items.grade]}>
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
            <button text="true" onClick={() => {buttonEvent({
              type: 'itemSell',
              data: dataObj,
              saveData: saveData,
              changeSaveData: changeSaveData,
              gameData: gameData,
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
            <PopupItemName color={gameData.itemGrade.color[items.grade]}>
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
          </div>
        </li>
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
  imgSet,
}) => {
	return (
		<PopupContinaer>
			<PopupArea className="popup transition">
				<PopupCont className="popup_cont" onClick={() => {onClose()}}>
					{typeAsContent(type, dataObj, saveData, changeSaveData, gameData, imgSet)}
				</PopupCont>
				<PopupClose>
					<span></span><span></span>
				</PopupClose>
			</PopupArea>
		</PopupContinaer>
	)
}

export default Popup;
