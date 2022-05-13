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
  set_element: () => {
    this.el.popup = document.querySelector('.popup');
    this.el.modal = document.querySelector('.modal');
  },
  // modal: (obj, type) => {//awb.fn.modal('하하하');
  //   type = type ? type : 'alert';
  //   this.el.modal.classList.add('on');
  //   let tag = '';
  //   switch(type){
  //     case 'prompt':
  //       tag += '<p>'+obj.txt+'</p><input type="text" placeholder="'+obj.hint+'"/>';
  //       tag += '<div class="bt_box" flex>';
  //       obj.bt.forEach((v)=>{
  //         tag += '<button msg>'+v.txt+'</button>';
  //       });
  //       tag += '</div>';
  //       break;
  //     case 'confirm':
  //       tag += '<p>'+obj.txt+'</p>';
  //       tag += '<div class="bt_box" flex>';
  //       obj.bt.forEach((v)=>{
  //         tag += '<button msg>'+v.txt+'</button>';
  //       });
  //       tag += '</div>';
  //       break;
  //     case 'alert':
  //       tag += '<p>'+obj.txt+'</p>';
  //       tag += '<div class="bt_box" flex>';
  //       obj.bt.forEach((v)=>{
  //         tag += '<button msg>'+v.txt+'</button>';
  //       });
  //       tag += '</div>';
  //       break;
  //     default:
  //       break;
  //   }
  //   let html = '<div flex-h-center class="modal_cont"><div class="msg_box">'+tag+'</div></div>'+
  //               '<div class="modal_close"><span></span><span></span></div>';
  //   this.el.modal.innerHTML = html;
    
  //   switch(type){
  //     case 'prompt':
  //       let msg = this.el.modal.querySelector('input');
  //       msg.addEventListener('click',(e)=>{
  //         e.stopPropagation();
  //       });
  //       this.el.modal.querySelectorAll('button').forEach((el,idx)=>{
  //         el.addEventListener('click',(e)=>{
  //           e.stopPropagation();
  //           if(obj.itemData){
  //             awb.data.userData.items[obj.itemData.type].splice(obj.itemData.idx,1);//인벤에서 아이템 제거
  //           }
  //           this[obj.bt[idx].fn](msg.value);
  //         });
  //       });
  //       break;
  //     case 'confirm':
  //       this.el.modal.querySelectorAll('button').forEach((el,idx)=>{
  //         el.addEventListener('click',(e)=>{
  //           e.stopPropagation();
  //           if(obj.gachaData){//가챠팝업
  //             if(obj.gachaData.type === 'dia'){//발바닥일때
  //               if(awb.data.userData.info.diamond > obj.gachaData.price){
  //                 awb.data.userData.info.diamond -= obj.gachaData.price;
  //               }else{
  //                 this.modal({txt:'발바닥이 부족합니다.',bt:[{txt:'확인',fn:'popClose'}]},'alert');
  //                 return;
  //               }
  //             }else{//골드일때
  //               if(awb.data.userData.info.money > obj.gachaData.price){
  //                 awb.data.userData.info.money -= obj.gachaData.price;
  //               }else{
  //                 this.modal({txt:'골드가 부족합니다.',bt:[{txt:'확인',fn:'popClose'}]},'alert');
  //                 return;
  //               }
  //             }
  //             awb.data.save_data();
  //             awb.header.set_info();
  //             this[obj.bt[idx].fn](obj.gachaData.num,obj.gachaData.type);
  //             if(idx === 0){//확인 눌렀을때
  //               awb.main.el.root.classList.add('noback');
  //             }
  //           }
  //         });
  //       });
  //       break;
  //     default:
  //       break;
  //   }
  //   this.el.modal.querySelector('.modal_cont').addEventListener('click',()=>{
  //     this.el.modal.classList.remove('on');
  //   });
  // },
  // openPop: (arr) => {
  //   const type = arr[0],
  //       n = arr[1];
  //   let tag = '',
  //       idx,items,hole,ch_idx,eitems_,hitems_;
  //   switch(type){
  //     case 'relation':
  //       const member = gameData[type][n].member;
  //       tag += '<ul flex-center class="people">';
  //       member.forEach((idx)=>{
  //         const p_data = gameData.ch[idx];
  //         tag += '<li style="background:url(./images/ring/ring'+p_data.element+'.png);background-size:cover;box-shadow:0 0 13px '+gameData.chGradeColor[p_data.grade]+', 0 0 8px '+gameData.chGradeColor[p_data.grade]+', 0 0 5px '+gameData.chGradeColor[p_data.grade]+', 0 0 2px '+gameData.chGradeColor[p_data.grade]+'"><img src="./images/ring/ring_.png"><span class="ch" style="background:url(./images/ch/ch'+p_data.display+'.png);background-size:85%;background-position:center -10%;"></span><span class="ch_style" style="background:url(./images/ch_style/ch_style'+p_data.style+'.png);background-size:100%;background-position:center 20%;"></span><span class="name">'+p_data.na1+'</span></li>';
  //       });
  //       break;
  //     case 'equip':
  //       idx = arr[2];
  //       items = gameData.items.equip[n];//능력치 등 아이템 정보
  //       hole = gameData.items.hole;
  //       ch_idx = awb.ch.ch_idx;
  //       eitems_ = awb.data.userData.ch[ch_idx].items[idx];//장착 lv, upgrade 등 캐릭터에 의한 정보
  //       hitems_ = awb.data.userData.items.equip[idx];//소지 lv, upgrade 등 캐릭터에 의한 정보
  //       tag += '<ul class="items">';
  //       tag += '<li>';
  //       tag += '<span class="item_grade" style="color:'+gameData.itemGrade.color[items.grade]+'">'+gameData.itemGrade.txt_e[items.grade]+' ('+gameData.itemGrade.txt_k[items.grade]+')</span>';
  //       tag += '<span class="item_price">'+items.price+'</span>';
  //       tag += '<span class="item_lv">LV.'+eitems_.lv+' \"'+items.na+'\"'+(eitems_.upgrade > 0 ? '+'+eitems_.upgrade : '')+'</span>';
  //       tag += '<span class="item_txt">'+items.txt+'</span>';
  //       tag += '</li>';
  //       tag += '<li class="item_eff">';
  //       items.eff.forEach((v)=>{
  //         tag += '<span>'+awb.util.getEffectType(v.type)+' '+v.num[eitems_.upgrade]+'</span>';
  //       });
  //       tag += '</li>';
  //       tag += '<li class="item_hole">';
  //       eitems_.hole.forEach((v,index)=>{
  //         tag += '<span>홀 '+(index+1)+' : '+hole[v].na+'<img src="./images/item/hole'+hole[v].idx+'.png"/></span>';
  //       });
  //       tag += '</li>';
  //       tag += '<li class="item_set">';
  //       let e_set = gameData.items.set_type[items.set];
  //       tag += '<span class="item_setNa">'+e_set.na+'</span>';
  //       e_set.part.forEach((v)=>{
  //         tag += '<span class="item_set_piece '+awb.ch.getSetChk(awb.data.userData.ch[ch_idx].items,v)+'">'+gameData.items.equip[v].na+'</span>';
  //       });
  //       tag += '</li>';
  //       tag += '<li flex>';
  //       tag += '<button text data-buttontype="item_release">해제</button>';
  //       tag += '</li>';
  //       break;
  //     case 'hequip':
  //       idx = arr[2];
  //       items = gameData.items.equip[n];//능력치 등 아이템 정보
  //       hole = gameData.items.hole;
  //       ch_idx = localStorage.ch_idx;
  //       eitems_ = awb.data.userData.ch[ch_idx].items[idx];//장착 lv, upgrade 등 캐릭터에 의한 정보
  //       hitems_ = awb.data.userData.items.equip[idx];//소지 lv, upgrade 등 캐릭터에 의한 정보
  //       tag += '<ul class="items">';
  //       tag += '<li>';
  //       tag += '<span class="item_grade" style="color:'+gameData.itemGrade.color[items.grade]+'">'+gameData.itemGrade.txt_e[items.grade]+' ('+gameData.itemGrade.txt_k[items.grade]+')</span>';
  //       tag += '<span class="item_price">'+items.price+'</span>';
  //       tag += '<span class="item_lv">LV.'+hitems_.lv+' \"'+items.na+'\"'+(hitems_.upgrade > 0 ? '+'+hitems_.upgrade : '')+'</span>';
  //       tag += '<span class="item_txt">'+items.txt+'</span>';
  //       tag += '</li>';
  //       tag += '<li class="item_eff">';
  //       items.eff.forEach((v)=>{
  //         tag += '<span class="item_eff">'+awb.util.getEffectType(v.type)+' '+v.num[hitems_.upgrade]+'</span>';
  //       });
  //       tag += '</li>';
  //       tag += '<li class="item_hole">';
  //       hitems_.hole.forEach((v,index)=>{
  //         tag += '<span>홀 '+(index+1)+' : '+hole[v].na+'<img src="./images/item/hole'+hole[v].idx+'.png"/></span>';
  //       });
  //       tag += '</li>';
  //       tag += '<li class="item_set">';
  //       const h_set = gameData.items.set_type[items.set];
  //       tag += '<span class="item_set">'+h_set.na+'</span>';
  //       h_set.part.forEach((v)=>{
  //         tag += '<span class="item_set_piece '+awb.ch.getSetChk(awb.data.userData.ch[ch_idx].items,v)+'">'+gameData.items.equip[v].na+'</span>';
  //       });
  //       tag += '</li>';
  //       tag += '<li flex>';
  //       tag += '<button text data-buttontype="item_enhancement">강화</button>';
  //       tag += '<button text data-buttontype="item_equip">장착</button>';
  //       tag += '<button text data-buttontype="item_sell">판매</button>';
  //       tag += '</li>';
  //       break;
  //     case 'hole':
  //       idx = arr[2],
  //       items = gameData.items.hole[n];//능력치 등 아이템 정보
  //       tag += '<ul flex-center class="items">';
  //       tag += '<li>';
  //       tag += '<span class="item_grade" style="color:'+gameData.itemGrade.color[items.grade]+'">'+gameData.itemGrade.txt_e[items.grade]+' ('+gameData.itemGrade.txt_k[items.grade]+')</span>';
  //       tag += '<span class="item_price">'+items.price+'</span>';
  //       tag += '<span class="item_lv">\"'+items.na+'\"</span>';
  //       tag += '</li>';
  //       tag += '<li class="item_eff">';
  //       items.eff.forEach((v)=>{
  //         tag += '<span>'+awb.util.getEffectType(v.type)+' '+v.num+'</span>';
  //       });
  //       tag += '</li>';
  //       tag += '<li flex>';
  //       tag += '<button text data-buttontype="hole_equip">장착</button>';
  //       tag += '<button text data-buttontype="item_sell">판매</button>';
  //       tag += '</li>';
  //       break;
  //     case 'upgrade':
  //       idx = arr[2];
  //       items = gameData.items.upgrade[n];//능력치 등 아이템 정보
  //       tag += '<ul flex-center class="items">';
  //       tag += '<li>';
  //       tag += '<span class="item_grade" style="color:'+gameData.itemGrade.color[items.grade]+'">'+gameData.itemGrade.txt_e[items.grade]+' ('+gameData.itemGrade.txt_k[items.grade]+')</span>';
  //       tag += '<span class="item_price">'+items.price+'</span>';
  //       tag += '<span class="item_lv">\"'+items.na+'\"</span>';
  //       tag += '<span class="item_eff">'+items.txt+'</span>';
  //       tag += '</li>';
  //       tag += '<li flex>';
  //       tag += '<button text data-buttontype="item_use">사용</button>';
  //       tag += '<button text data-buttontype="item_sell">판매</button>';
  //       tag += '</li>';
  //       break;
  //     case 'material':
  //       idx = arr[2];
  //       items = gameData.items.material[n];//능력치 등 아이템 정보
  //       tag += '<ul flex-center class="items">';
  //       tag += '<li>';
  //       tag += '<span class="item_grade" style="color:'+gameData.itemGrade.color[items.grade]+'">'+gameData.itemGrade.txt_e[items.grade]+' ('+gameData.itemGrade.txt_k[items.grade]+')</span>';
  //       tag += '<span class="item_price">'+items.price+'</span>';
  //       tag += '<span class="item_lv">\"'+items.na+'\"</span>';
  //       tag += '<span class="item_eff">'+items.txt+'</span>';
  //       tag += '</li>';
  //       tag += '<li flex>';
  //       tag += '<button text data-buttontype="item_sell">판매</button>';
  //       tag += '</li>';
  //       break;
  //     case 'etc':
  //       idx = arr[2];
  //       items = gameData.items.etc[n];//능력치 등 아이템 정보
  //       tag += '<ul flex-center class="items">';
  //       tag += '<li>';
  //       tag += '<span class="item_grade" style="color:'+gameData.itemGrade.color[items.grade]+'">'+gameData.itemGrade.txt_e[items.grade]+' ('+gameData.itemGrade.txt_k[items.grade]+')</span>';
  //       tag += '<span class="item_price">'+items.price+'</span>';
  //       tag += '<span class="item_lv">\"'+items.na+'\"</span>';
  //       tag += '<span class="item_eff">'+items.txt+'</span>';
  //       tag += '</li>';
  //       tag += '<li flex>';
  //       tag += '<button text data-buttontype="item_use">사용</button>';
  //       tag += '<button text data-buttontype="item_sell">판매</button>';
  //       tag += '</li>';
  //     default:
  //       break;
  //   }
  //   tag += '</ul>'
  //   const html = '<div flex-h-center class="popup_cont">'+tag+'</div>'+
  //               '<div class="popup_close"><span></span><span></span></div>';
  //   this.el.popup.classList.add('on');
  //   this.el.popup.innerHTML = html;
    
  //   //이벤트 바인딩
  //   this.el.popup.querySelector('.popup_cont').addEventListener('click',()=>{
  //     this.el.popup.classList.remove('on');
  //   });
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
  // popClose: () => {
  //   this.el.modal.classList.remove('on');
  // },
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
  saveLvState: (saveSlot) => {//카드 획득시 레벨당 능력치 저장
    const gameData = util.loadData("gamedata");
    const saveData = util.loadData("savedata");
    const stateArr = gameData.stateName;
    let saveChSlot = saveData.ch[saveSlot];
    stateArr.forEach((el,index)=>{
      const st = gameData.ch[saveChSlot.idx]['st'+index],//실제 능력치
      per_current = gameData.stateType[saveChSlot.stateType].arr[saveChSlot.lv-1]*0.01,//성장타입에 따른 LV당 %
      stateCurrent = Math.round(st*per_current),//성장타입에 따른 LV당 능력치
      stateMax = Math.round(gameData.stateType[saveChSlot.stateType].arr[49]*0.01*st);//성장타입에 따른 최대 능력치
      saveChSlot = {
        ...saveChSlot,
        ['rSt'+index]: stateCurrent, //레벨당 현재능력치
        ['maxSt'+index]: stateMax, //레벨당 최대능력치
      }
    });
    let saveCh = [
      ...saveData.ch,
    ]
    saveCh[saveSlot] = saveChSlot;

    util.saveData("savedata", {
      ...saveData,
      ch: saveCh,
    });
  },
  loadImage: () => {
    let img_tag = '',
        preload = document.querySelector('.preload');
    let arr = {
      ch:21,
      ch_style:21,
      ring:[0,1,2,3,4,5,6],
      sring:[1,2,3,4,5,6],
      ssring:[1,2,3,4,5,6,7,8,10],
      card:['_back','_frame','_lv','_name'],
      frame:['_chback'],
      back:5,
    }
    for(let i in arr){
      let arr_length,
          extension = 'png';
      if(i.indexOf('back') > -1){
        extension = 'jpg'
      }
      if(typeof arr[i] === 'number'){
        arr_length = arr[i];
        for(let j = 0; j <= arr_length; ++j){
          img_tag += '<img src="./images/'+i+'/'+i+j+'.'+extension+'"/>';
        }
      }else{
        arr_length = arr[i].length;
        for(let j = 0; j < arr_length; ++j){
          img_tag += '<img src="./images/'+i+'/'+i+arr[i][j]+'.'+extension+'"/>';
        }
      }
    }
    preload.innerHTML = img_tag;
  },
  getEffectType: (n) => {
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
    return arr[n];
  },
  getPercentColor: (max, num) => {
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
  getPercent: (total, current) => {
    if(current === 0){
      return 0;
    }else{
        return Math.round(current/total*100);
    }
  },
  setNumber: (n) => {
    const sn = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
    return sn;
  },
  getBattleLineup: (n) => {
    return n;
  },
  getEffectArea: (type, n) => {//type: 효과타입, n: 사용위치(0~24)
    let num = [];
    switch(type){
      case 1: //단일
        num = [n];
        break;
      case 2: //가로2
        if(n%5 === 4){
          num = [n,n-1];
        }else{
          num = [n,n+1];
        }
        break;
      case 3://가로3
        if(n%5 === 3){
          num = [n,n+1,n-1];
        }else if(n%5 === 4){
          num = [n,n-1,n-2];
        }else{
          num = [n,n+1,n+2];
        }
        break;
      case 4: //세로2
        if(n > 19){
          num = [n,n-5];
        }else{
          num = [n,n+5];
        }
        break;
      case 5://세로3
        if(n > 19){
          num = [n,n-5,n-10];
        }else if(n > 14){
          num = [n,n+5,n-5];
        }else{
          num = [n,n+5,n+10];
        }
        break;
      case 6: //가로행
        if(n < 5){
          num = [0,1,2,3,4];
        }else if(n < 10){
          num = [5,6,7,8,9];
        }else if(n < 15){
          num = [10,11,12,13,14];
        }else if(n < 20){
          num = [15,16,17,18,19];
        }else{
          num = [20,21,22,23,24];
        }
        break;
      case 7: //세로열
        if(n%5 === 0){
          num = [0,5,10,15,20];
        }else if(n%5 === 1){
          num = [1,6,11,16,21];
        }else if(n%5 === 2){
          num = [2,7,12,17,22];
        }else if(n%5 === 3){
          num = [3,8,13,18,23];
        }else{
          num = [4,9,14,19,24];
        }
        break;
      case 8: //십자5
        if(n<5){
          if(n === 0){
            num = [n,n+1,n+5];
          }else if(n === 4){
            num = [n,n-1,n+5];
          }else{
            num = [n,n-1,n+1,n+5];
          }
        }else if(n>19){
          if(n === 20){
            num = [n,n+1,n-5];
          }else if(n === 24){
            num = [n,n-1,n-5];
          }else{
            num = [n,n-1,n+1,n-5];
          }
        }else{
          if(n%5 === 0){
            num = [n,n-5,n+5,n+1];
          }else if(n%5 === 4){
            num = [n,n-5,n+5,n-1];
          }else{
            num = [n,n-5,n+5,n+1,n-1];
          }
        }
        num = []
        break;
      case 9: //십자9
        num = [12,2,7,10,11,13,14,17,22];
        break;
      case 10: //대각선
        if(n === 0 || n === 6 || n === 12 || n === 18 || n === 24){
          num = [0,6,12,18,24];
        }else if(n === 1 || n === 7 || n === 13 || n === 19){
          num = [1,7,13,19];
        }else if(n === 5 || n === 11 || n === 17 || n === 23){
          num = [5,11,17,23];
        }else if(n === 2 || n === 8 || n === 14){
          num = [2,8,14];
        }else if(n === 10 || n === 16 || n === 22){
          num = [10,16,22];
        }else if(n === 3 || n === 9){
          num = [3,9];
        }else if(n === 15 || n === 21){
          num = [15,21];
        }else if(n === 4){
          num = [4];
        }else{
          num = [20];
        }
        break;
      case 11: //반대 대각선
        if(n === 4 || n === 8 || n === 12 || n === 16 || n === 20){
          num = [4,8,12,16,20];
        }else if(n === 3 || n === 7 || n === 11 || n === 15){
          num = [3,7,11,15];
        }else if(n === 9 || n === 13 || n === 17 || n === 21){
          num = [9,13,17,21];
        }else if(n === 2 || n === 6 || n === 10){
          num = [2,6,10];
        }else if(n === 14 || n === 18 || n === 22){
          num = [14,18,22];
        }else if(n === 1 || n === 5){
          num = [1,5];
        }else if(n === 19 || n === 23){
          num = [19,23];
        }else if(n === 0){
          num = [0];
        }else{
          num = [24];
        }
        break;
      case 15: //└┐
        num = [0,5,10,11,12,13,14,19,24];
        break;
      case 16: //┌┘
        num = [4,9,14,13,12,11,10,15,20];
        break;
      case 17: //卍
        num = [0,1,2,4,7,9,11,12,13,14,15,17,20,22,23,24];
        break;
      case 20: //전체
        num = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
        break;
      case 21: //정사각형9
        if(n === 0 || n === 1 || n === 2 || n === 5 || n === 10){
          num = [0,1,2,5,6,7,10,11,12];
        }else if(n === 3 || n === 4 || n === 9 || n === 14){
          num = [2,3,4,7,8,9,12,13,14];
        }else if(n === 6 || n === 7 || n === 8 || n === 11 || n === 12 || n === 13 || n === 16 || n === 17 || n === 18){
          num = [6,7,8,11,12,13,16,17,18];
        }else if(n === 15 || n === 20 || n === 21 || n === 22){
          num = [10,11,12,15,16,17,20,21,22];
        }else{
          num = [12,13,14,17,18,19,22,23,24];
        }
        break;
      case 22: //정사각형4
        if(n === 0 || n === 1 || n === 5 || n === 6){
          num = [0,1,5,6];
        }else if(n === 2 || n === 7){
          num = [1,2,6,7];
        }else if(n === 3 || n === 8){
          num = [2,3,7,8];
        }else if(n === 4 || n === 9){
          num = [3,4,8,9];
        }else if(n === 10 || n === 11){
          num = [5,6,10,11];
        }else if(n === 12){
          num = [6,7,11,12];
        }else if(n === 13){
          num = [7,8,12,13];
        }else if(n === 14){
          num = [8,9,13,14];
        }else if(n === 15 || n === 16){
          num = [10,11,15,16];
        }else if(n === 17){
          num = [11,12,16,17];
        }else if(n === 18){
          num = [12,13,17,18];
        }else if(n === 19){
          num = [13,14,18,19];
        }else if(n === 20 || n === 21){
          num = [15,16,20,21];
        }else if(n === 22){
          num = [16,17,21,22];
        }else if(n === 23){
          num = [17,18,22,23];
        }else{
          num = [18,19,23,24];
        }
        break;
      default:
        break;
    }
    return num;
  },
}