export const fn = { //this.el = {};this.set_element();this.prototype();
  canvas: () => {
    CanvasRenderingContext2D.prototype.roundedRectangle = function(x, y, width, height, rounded) {
      // const radiansInCircle = 2 * Math.PI
      const halfRadians = (2 * Math.PI)/2
      const quarterRadians = (2 * Math.PI)/4  
      
      // top left arc
      this.arc(rounded + x, rounded + y, rounded, -quarterRadians, halfRadians, true)
      
      // line from top left to bottom left
      this.lineTo(x, y + height - rounded)
    
      // bottom left arc  
      this.arc(rounded + x, height - rounded + y, rounded, halfRadians, quarterRadians, true)  
      
      // line from bottom left to bottom right
      this.lineTo(x + width - rounded, y + height)
    
      // bottom right arc
      this.arc(x + width - rounded, y + height - rounded, rounded, quarterRadians, 0, true)  
      
      // line from bottom right to top right
      this.lineTo(x + width, y + rounded)  
    
      // top right arc
      this.arc(x + width - rounded, y + rounded, rounded, 0, -quarterRadians, true)  
      
      // line from top right to top left
      this.lineTo(x + rounded, y)  
    }
  },
  
  // changeId: (id) => {
  //   awb.data.userData.info.id = id;
  //   awb.data.save_data();
  //   awb.header.set_info();
  //   awb.ch.display();
  //   this.el.modal.classList.remove('on');
  // },
  // gacha: (n,type) => {
  //   awb.gacha.startGacha(n,type);
  //   this.el.modal.classList.remove('on');
  // }
}

export const util = { //this.loadImage();
  saveData: (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  },
  loadData: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
  saveLvState: (saveSlot, obj, saveData, gameData) => {//카드 획득시 레벨당 능력치 저장(캐릭터 저장된 슬롯번호, {카드등급, 아이템 이펙트등...})
    const stateArr = gameData.stateName;
    let battleState_ = [];
    let saveChSlot = saveData.ch[saveSlot] || obj.newState;
    stateArr.forEach((el,index)=>{
      const st = gameData.ch[saveChSlot.idx]['st'+index],//실제 능력치
      per_current = gameData.stateType[saveChSlot.stateType].arr[saveChSlot.lv-1]*0.01,//성장타입에 따른 LV당 %
      stateCurrent = Math.round(st*per_current),//성장타입에 따른 LV당 능력치
      stateMax = Math.round(gameData.stateType[saveChSlot.stateType].arr[49]*0.01*st);//성장타입에 따른 최대 능력치
      saveChSlot = {
        ...saveChSlot,
        ['rSt' + index]: stateCurrent, //레벨당 현재능력치
        ['maxSt' + index]: stateMax, //레벨당 최대능력치
      }
      battleState_[index] = stateCurrent;
    });
    battleState_[7] = gameData.ch[saveChSlot.idx].st3 + gameData.ch[saveChSlot.idx].st5 + gameData.ch[saveChSlot.idx].st6;
    const battleState = util.getTotalState(battleState_);
    battleState.forEach((bState, index) => {
      const iSt = util.compileState(bState, obj.itemEff[index]);
      saveChSlot = {
        ...saveChSlot,
        ['iSt' + index]: iSt,
        ['bSt' + index]: bState,
      }
    });
    // console.log(obj.grade);
    saveChSlot = {
      ...saveChSlot,
      itemEff: obj.itemEff,
      grade: obj.grade || gameData.ch[saveChSlot.idx].grade, //캐릭터 등급
    }
    return saveChSlot;
  },
  saveCharacter: (dataObj) => { //아이템 변경시 스텟저장
    // console.log(dataObj);
    const gameData = dataObj.gameData;
    const saveData = dataObj.saveData;
    const gameItem = dataObj.gameData.items;
    let saveCh = [
      ...dataObj.saveData.ch,
    ];
    if (typeof dataObj.slotIdx === "number") { //슬롯설정이 되면 개별 캐릭만 실행
      const itemEff = util.getItemEff(dataObj.slotIdx, saveCh, gameItem);
      saveCh[dataObj.slotIdx] = util.saveLvState(dataObj.slotIdx, {
        itemEff: itemEff,
        grade: gameData.ch[saveCh[dataObj.slotIdx].idx].grade,
        newState: {},
      }, saveData, gameData)
    } else if (dataObj.slotIdx === "all") { //슬롯설정이 없으면 전체 캐릭 실행
      saveCh.forEach((chData, idx) => {
        const itemEff = util.getItemEff(idx, saveCh, gameItem);
        saveCh[idx] = util.saveLvState(idx, {
          itemEff: itemEff,
          grade: gameData.ch[saveCh[idx].idx].grade,
          newState: {},
        }, saveData, gameData);
      });
    }
    return {
      ...saveData,
      ch: saveCh,
    }
  },
  getItemEff: (idx, saveCh, gameItem) => {
    const saveItems = typeof idx === 'number' ? saveCh[idx].items : [{}, {}, {}, {}, {}, {}, {}, {}];
    //eff type(효과 dmg_type&buff_type) 체력HP(0), 행동SP(1), 행동회복RSP(2), 공ATK(3), 방DEF(4), 술공MATK(5), 술방MDEF(6), 회복RCV(7), 속도SPD(8), 찌르기(10),할퀴기(11),물기(12),치기(13),누르기(14), 명(20),암(21),수(22),화(23),풍(24),지(25), 진형(100)
    let effData = [];
    saveItems.forEach((item) => {
      if(item.idx !== undefined){
        gameItem.equip[item.idx].eff.forEach((eff)=>{
          if(effData[eff.type] === undefined) {
            effData[eff.type] = {percent:0, number:0};
          }
          if(eff.num[item.upgrade].indexOf('%') > 0){
            effData[eff.type].percent = effData[eff.type].percent + parseInt(eff.num[item.upgrade]);
          }else{
            effData[eff.type].number = effData[eff.type].number + parseInt(eff.num[item.upgrade]);
          }
        });
      }
      if(item.hole){
        item.hole.forEach((holeNum)=>{//stone 정보
          const stone = gameItem.hole[holeNum];
          if(holeNum !== 0){
            stone.eff.forEach((eff)=>{
              if(effData[eff.type] === undefined) {
                effData[eff.type] = {percent:0, number:0};
              }
              if(eff.num.indexOf('%') > 0){
                effData[eff.type].percent = effData[eff.type].percent + parseInt(eff.num);
              }else{
                effData[eff.type].number = effData[eff.type].number + parseInt(eff.num);
              }
            });
          }
        });
      }
    });
    return effData;
  },
  getTotalState: (state) => {
    let stateArr = [];
    for ( let i = 0; i < 9; ++i ) {
      let num = 0;
      switch(i){
        case 0://HP
          num = state[1]*4+state[0]*2;
          break;
        case 1://SP
          num = state[7]*.2;
          break;
        case 2://RSP
          num = (state[7]*.2+2)*.2;
          break;
        case 3://ATK
          num = state[2]*1.5+state[0]*.5;
          break;
        case 4://DEF
          num = state[0]+state[3]*.2;
          break;
        case 5://MAK
          num = state[4]*1.5+state[5]*.5;
          break;
        case 6://MDF
          num = state[5]+state[3]*.2;
          break;
        case 7://RCV
          num = state[6]+(state[0]+state[5])*.2;
          break;
        case 8://SPD
          num = state[3]+state[0]*.3;
          break;
        default:
          break;  
      }
      stateArr[i] = Math.round(num);
    }
    return stateArr;
  },
  compileState: (currentState, itemState) => {
    if (itemState !== undefined && itemState !== null) {
      if(itemState.percent !== 0){
        return Math.round(currentState * (itemState.percent / 100));
      }else{
        return itemState.number;
      }
    } else {
      return 0;
    }
  },
  getPercentColor: (max, num) => { //능력치 높고낮음 처리컬러
    let co = num/max*510,
        co_ = 0;
    if(co/255 > 1){
      co_ = 255 - co%255;
      co = 255;
    }else{
      co_ = 255;
    }
    return 'rgb('+co_+','+co+',0)';
  },
  getPercent: (total, current) => { //퍼센트 계산
    if(current === 0){
      return 0;
    }else{
        return Math.round(current/total*100);
    }
  },
  getEffectType: (num) => {
    //eff type(효과 dmg_type&buff_type) 찌르기(0),할퀴기(1),물기(2),치기(3),누르기(4),독(11),명(12),암(13),수(14),화(15),풍(16),지(17), 공(21),방(22),술공(23),술방(24),HP(25),SP(26),RSP(27),속도(28),명중(29),진형(100)
    let arr = ['체력HP','행동SP','행동회복RSP','공ATK','방DEF','술공MATK','술방MDEF','회복RCV','속도SPD','',
                '찌르기','할퀴기','물기','치기','누르기','','','','','','',
                '명','암','수','화','풍','지','','','','',
                '','','','','','','','','','',
                '','','','','','','','','','',
                '','','','','','','','','','',
                '','','','','','','','','','',
                '','','','','','','','','','',
                '','','','','','','','','','',
                '','','','','','','','','','진형'];

    //eff type(효과 dmg_type&buff_type) 체력HP(0), 행동SP(1), 행동회복RSP(2), 공ATK(3), 방DEF(4), 술공MATK(5), 술방MDEF(6), 회복RCV(7), 속도SPD(8), 찌르기(10),할퀴기(11),물기(12),치기(13),누르기(14), 명(20),암(21),수(22),화(23),풍(24),지(25), 진형(100)
  
    arr[100] = '진형';
    return arr[num];
  },
  // loadImage: () => {
  //   let img_tag = '',
  //       preload = document.querySelector('.preload');
  //   let arr = {
  //     ch:21,
  //     ch_style:21,
  //     ring:[0,1,2,3,4,5,6],
  //     sring:[1,2,3,4,5,6],
  //     ssring:[1,2,3,4,5,6,7,8,10],
  //     card:['_back','_frame','_lv','_name'],
  //     frame:['_chback'],
  //     back:5,
  //   }
  //   for(let i in arr){
  //     let arr_length,
  //         extension = 'png';
  //     if(i.indexOf('back') > -1){
  //       extension = 'jpg'
  //     }
  //     if(typeof arr[i] === 'number'){
  //       arr_length = arr[i];
  //       for(let j = 0; j <= arr_length; ++j){
  //         img_tag += '<img src="./images/'+i+'/'+i+j+'.'+extension+'"/>';
  //       }
  //     }else{
  //       arr_length = arr[i].length;
  //       for(let j = 0; j < arr_length; ++j){
  //         img_tag += '<img src="./images/'+i+'/'+i+arr[i][j]+'.'+extension+'"/>';
  //       }
  //     }
  //   }
  //   preload.innerHTML = img_tag;
  // },
  // setNumber: (n) => {
  //   const sn = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
  //   return sn;
  // },
  // getBattleLineup: (n) => {
  //   return n;
  // },
  // getEffectArea: (type, n) => {//type: 효과타입, n: 사용위치(0~24)
  //   let num = [];
  //   switch(type){
  //     case 1: //단일
  //       num = [n];
  //       break;
  //     case 2: //가로2
  //       if(n%5 === 4){
  //         num = [n,n-1];
  //       }else{
  //         num = [n,n+1];
  //       }
  //       break;
  //     case 3://가로3
  //       if(n%5 === 3){
  //         num = [n,n+1,n-1];
  //       }else if(n%5 === 4){
  //         num = [n,n-1,n-2];
  //       }else{
  //         num = [n,n+1,n+2];
  //       }
  //       break;
  //     case 4: //세로2
  //       if(n > 19){
  //         num = [n,n-5];
  //       }else{
  //         num = [n,n+5];
  //       }
  //       break;
  //     case 5://세로3
  //       if(n > 19){
  //         num = [n,n-5,n-10];
  //       }else if(n > 14){
  //         num = [n,n+5,n-5];
  //       }else{
  //         num = [n,n+5,n+10];
  //       }
  //       break;
  //     case 6: //가로행
  //       if(n < 5){
  //         num = [0,1,2,3,4];
  //       }else if(n < 10){
  //         num = [5,6,7,8,9];
  //       }else if(n < 15){
  //         num = [10,11,12,13,14];
  //       }else if(n < 20){
  //         num = [15,16,17,18,19];
  //       }else{
  //         num = [20,21,22,23,24];
  //       }
  //       break;
  //     case 7: //세로열
  //       if(n%5 === 0){
  //         num = [0,5,10,15,20];
  //       }else if(n%5 === 1){
  //         num = [1,6,11,16,21];
  //       }else if(n%5 === 2){
  //         num = [2,7,12,17,22];
  //       }else if(n%5 === 3){
  //         num = [3,8,13,18,23];
  //       }else{
  //         num = [4,9,14,19,24];
  //       }
  //       break;
  //     case 8: //십자5
  //       if(n<5){
  //         if(n === 0){
  //           num = [n,n+1,n+5];
  //         }else if(n === 4){
  //           num = [n,n-1,n+5];
  //         }else{
  //           num = [n,n-1,n+1,n+5];
  //         }
  //       }else if(n>19){
  //         if(n === 20){
  //           num = [n,n+1,n-5];
  //         }else if(n === 24){
  //           num = [n,n-1,n-5];
  //         }else{
  //           num = [n,n-1,n+1,n-5];
  //         }
  //       }else{
  //         if(n%5 === 0){
  //           num = [n,n-5,n+5,n+1];
  //         }else if(n%5 === 4){
  //           num = [n,n-5,n+5,n-1];
  //         }else{
  //           num = [n,n-5,n+5,n+1,n-1];
  //         }
  //       }
  //       num = []
  //       break;
  //     case 9: //십자9
  //       num = [12,2,7,10,11,13,14,17,22];
  //       break;
  //     case 10: //대각선
  //       if(n === 0 || n === 6 || n === 12 || n === 18 || n === 24){
  //         num = [0,6,12,18,24];
  //       }else if(n === 1 || n === 7 || n === 13 || n === 19){
  //         num = [1,7,13,19];
  //       }else if(n === 5 || n === 11 || n === 17 || n === 23){
  //         num = [5,11,17,23];
  //       }else if(n === 2 || n === 8 || n === 14){
  //         num = [2,8,14];
  //       }else if(n === 10 || n === 16 || n === 22){
  //         num = [10,16,22];
  //       }else if(n === 3 || n === 9){
  //         num = [3,9];
  //       }else if(n === 15 || n === 21){
  //         num = [15,21];
  //       }else if(n === 4){
  //         num = [4];
  //       }else{
  //         num = [20];
  //       }
  //       break;
  //     case 11: //반대 대각선
  //       if(n === 4 || n === 8 || n === 12 || n === 16 || n === 20){
  //         num = [4,8,12,16,20];
  //       }else if(n === 3 || n === 7 || n === 11 || n === 15){
  //         num = [3,7,11,15];
  //       }else if(n === 9 || n === 13 || n === 17 || n === 21){
  //         num = [9,13,17,21];
  //       }else if(n === 2 || n === 6 || n === 10){
  //         num = [2,6,10];
  //       }else if(n === 14 || n === 18 || n === 22){
  //         num = [14,18,22];
  //       }else if(n === 1 || n === 5){
  //         num = [1,5];
  //       }else if(n === 19 || n === 23){
  //         num = [19,23];
  //       }else if(n === 0){
  //         num = [0];
  //       }else{
  //         num = [24];
  //       }
  //       break;
  //     case 15: //└┐
  //       num = [0,5,10,11,12,13,14,19,24];
  //       break;
  //     case 16: //┌┘
  //       num = [4,9,14,13,12,11,10,15,20];
  //       break;
  //     case 17: //卍
  //       num = [0,1,2,4,7,9,11,12,13,14,15,17,20,22,23,24];
  //       break;
  //     case 20: //전체
  //       num = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
  //       break;
  //     case 21: //정사각형9
  //       if(n === 0 || n === 1 || n === 2 || n === 5 || n === 10){
  //         num = [0,1,2,5,6,7,10,11,12];
  //       }else if(n === 3 || n === 4 || n === 9 || n === 14){
  //         num = [2,3,4,7,8,9,12,13,14];
  //       }else if(n === 6 || n === 7 || n === 8 || n === 11 || n === 12 || n === 13 || n === 16 || n === 17 || n === 18){
  //         num = [6,7,8,11,12,13,16,17,18];
  //       }else if(n === 15 || n === 20 || n === 21 || n === 22){
  //         num = [10,11,12,15,16,17,20,21,22];
  //       }else{
  //         num = [12,13,14,17,18,19,22,23,24];
  //       }
  //       break;
  //     case 22: //정사각형4
  //       if(n === 0 || n === 1 || n === 5 || n === 6){
  //         num = [0,1,5,6];
  //       }else if(n === 2 || n === 7){
  //         num = [1,2,6,7];
  //       }else if(n === 3 || n === 8){
  //         num = [2,3,7,8];
  //       }else if(n === 4 || n === 9){
  //         num = [3,4,8,9];
  //       }else if(n === 10 || n === 11){
  //         num = [5,6,10,11];
  //       }else if(n === 12){
  //         num = [6,7,11,12];
  //       }else if(n === 13){
  //         num = [7,8,12,13];
  //       }else if(n === 14){
  //         num = [8,9,13,14];
  //       }else if(n === 15 || n === 16){
  //         num = [10,11,15,16];
  //       }else if(n === 17){
  //         num = [11,12,16,17];
  //       }else if(n === 18){
  //         num = [12,13,17,18];
  //       }else if(n === 19){
  //         num = [13,14,18,19];
  //       }else if(n === 20 || n === 21){
  //         num = [15,16,20,21];
  //       }else if(n === 22){
  //         num = [16,17,21,22];
  //       }else if(n === 23){
  //         num = [17,18,22,23];
  //       }else{
  //         num = [18,19,23,24];
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  //   return num;
  // },
}