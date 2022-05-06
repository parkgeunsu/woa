'use strict';

class Fn{
  constructor(){
    this.el = {}
    this.set_element();
    this.prototype();
  }
  prototype(){
    CanvasRenderingContext2D.prototype.roundedRectangle = function(x, y, width, height, rounded) {
      const radiansInCircle = 2 * Math.PI
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
  }
  set_element(){
    this.el.popup = document.querySelector('.popup');
    this.el.modal = document.querySelector('.modal');
  }
  modal(obj,type){//awb.fn.modal('하하하');
    type = type ? type : 'alert';
    this.el.modal.classList.add('on');
    let tag = '';
    switch(type){
      case 'prompt':
        tag += '<p>'+obj.txt+'</p><input type="text" placeholder="'+obj.hint+'"/>';
        tag += '<div class="bt_box" flex>';
        obj.bt.forEach((v)=>{
          tag += '<button msg>'+v.txt+'</button>';
        });
        tag += '</div>';
        break;
      case 'confirm':
        tag += '<p>'+obj.txt+'</p>';
        tag += '<div class="bt_box" flex>';
        obj.bt.forEach((v)=>{
          tag += '<button msg>'+v.txt+'</button>';
        });
        tag += '</div>';
        break;
      case 'alert':
        tag += '<p>'+obj.txt+'</p>';
        tag += '<div class="bt_box" flex>';
        obj.bt.forEach((v)=>{
          tag += '<button msg>'+v.txt+'</button>';
        });
        tag += '</div>';
        break;
      default:
        break;
    }
    let html = '<div flex-h-center class="modal_cont"><div class="msg_box">'+tag+'</div></div>'+
                '<div class="modal_close"><span></span><span></span></div>';
    this.el.modal.innerHTML = html;
    
    switch(type){
      case 'prompt':
        let msg = this.el.modal.querySelector('input');
        msg.addEventListener('click',(e)=>{
          e.stopPropagation();
        });
        this.el.modal.querySelectorAll('button').forEach((el,idx)=>{
          el.addEventListener('click',(e)=>{
            e.stopPropagation();
            if(obj.itemData){
              awb.data.userData.items[obj.itemData.type].splice(obj.itemData.idx,1);//인벤에서 아이템 제거
            }
            this[obj.bt[idx].fn](msg.value);
          });
        });
        break;
      case 'confirm':
        this.el.modal.querySelectorAll('button').forEach((el,idx)=>{
          el.addEventListener('click',(e)=>{
            e.stopPropagation();
            if(obj.gachaData){//가챠팝업
              if(obj.gachaData.type === 'dia'){//발바닥일때
                if(awb.data.userData.info.diamond > obj.gachaData.price){
                  awb.data.userData.info.diamond -= obj.gachaData.price;
                }else{
                  this.modal({txt:'발바닥이 부족합니다.',bt:[{txt:'확인',fn:'popClose'}]},'alert');
                  return;
                }
              }else{//골드일때
                if(awb.data.userData.info.money > obj.gachaData.price){
                  awb.data.userData.info.money -= obj.gachaData.price;
                }else{
                  this.modal({txt:'골드가 부족합니다.',bt:[{txt:'확인',fn:'popClose'}]},'alert');
                  return;
                }
              }
              awb.data.save_data();
              awb.header.set_info();
              this[obj.bt[idx].fn](obj.gachaData.num,obj.gachaData.type);
              if(idx === 0){//확인 눌렀을때
                awb.main.el.root.classList.add('noback');
              }
            }
          });
        });
        break;
      default:
        break;
    }
    this.el.modal.querySelector('.modal_cont').addEventListener('click',()=>{
      this.el.modal.classList.remove('on');
    });
  }
  openPop(arr){
    const type = arr[0],
        n = arr[1];
    let tag = '',
        idx,items,hole,ch_idx,eitems_,hitems_;
    switch(type){
      case 'relation':
        const member = gameData[type][n].member;
        tag += '<ul flex-center class="people">';
        member.forEach((idx)=>{
          const p_data = gameData.ch[idx];
          tag += '<li style="background:url(./images/ring/ring'+p_data.element+'.png);background-size:cover;box-shadow:0 0 13px '+gameData.chGradeColor[p_data.grade]+', 0 0 8px '+gameData.chGradeColor[p_data.grade]+', 0 0 5px '+gameData.chGradeColor[p_data.grade]+', 0 0 2px '+gameData.chGradeColor[p_data.grade]+'"><img src="./images/ring/ring_.png"><span class="ch" style="background:url(./images/ch/ch'+p_data.display+'.png);background-size:85%;background-position:center -10%;"></span><span class="ch_style" style="background:url(./images/ch_style/ch_style'+p_data.style+'.png);background-size:100%;background-position:center 20%;"></span><span class="name">'+p_data.na1+'</span></li>';
        });
        break;
      case 'equip':
        idx = arr[2];
        items = gameData.items.equip[n];//능력치 등 아이템 정보
        hole = gameData.items.hole;
        ch_idx = awb.ch.ch_idx;
        eitems_ = awb.data.userData.ch[ch_idx].items[idx];//장착 lv, upgrade 등 캐릭터에 의한 정보
        hitems_ = awb.data.userData.items.equip[idx];//소지 lv, upgrade 등 캐릭터에 의한 정보
        tag += '<ul class="items">';
        tag += '<li>';
        tag += '<span class="item_grade" style="color:'+gameData.itemGrade.color[items.grade]+'">'+gameData.itemGrade.txt_e[items.grade]+' ('+gameData.itemGrade.txt_k[items.grade]+')</span>';
        tag += '<span class="item_price">'+items.price+'</span>';
        tag += '<span class="item_lv">LV.'+eitems_.lv+' \"'+items.na+'\"'+(eitems_.upgrade > 0 ? '+'+eitems_.upgrade : '')+'</span>';
        tag += '<span class="item_txt">'+items.txt+'</span>';
        tag += '</li>';
        tag += '<li class="item_eff">';
        items.eff.forEach((v)=>{
          tag += '<span>'+awb.util.getEffectType(v.type)+' '+v.num[eitems_.upgrade]+'</span>';
        });
        tag += '</li>';
        tag += '<li class="item_hole">';
        eitems_.hole.forEach((v,index)=>{
          tag += '<span>홀 '+(index+1)+' : '+hole[v].na+'<img src="./images/item/hole'+hole[v].idx+'.png"/></span>';
        });
        tag += '</li>';
        tag += '<li class="item_set">';
        let e_set = gameData.items.set_type[items.set];
        tag += '<span class="item_setNa">'+e_set.na+'</span>';
        e_set.part.forEach((v)=>{
          tag += '<span class="item_set_piece '+awb.ch.getSetChk(awb.data.userData.ch[ch_idx].items,v)+'">'+gameData.items.equip[v].na+'</span>';
        });
        tag += '</li>';
        tag += '<li flex>';
        tag += '<button text data-buttontype="item_release">해제</button>';
        tag += '</li>';
        break;
      case 'hequip':
        idx = arr[2];
        items = gameData.items.equip[n];//능력치 등 아이템 정보
        hole = gameData.items.hole;
        ch_idx = localStorage.ch_idx;
        eitems_ = awb.data.userData.ch[ch_idx].items[idx];//장착 lv, upgrade 등 캐릭터에 의한 정보
        hitems_ = awb.data.userData.items.equip[idx];//소지 lv, upgrade 등 캐릭터에 의한 정보
        tag += '<ul class="items">';
        tag += '<li>';
        tag += '<span class="item_grade" style="color:'+gameData.itemGrade.color[items.grade]+'">'+gameData.itemGrade.txt_e[items.grade]+' ('+gameData.itemGrade.txt_k[items.grade]+')</span>';
        tag += '<span class="item_price">'+items.price+'</span>';
        tag += '<span class="item_lv">LV.'+hitems_.lv+' \"'+items.na+'\"'+(hitems_.upgrade > 0 ? '+'+hitems_.upgrade : '')+'</span>';
        tag += '<span class="item_txt">'+items.txt+'</span>';
        tag += '</li>';
        tag += '<li class="item_eff">';
        items.eff.forEach((v)=>{
          tag += '<span class="item_eff">'+awb.util.getEffectType(v.type)+' '+v.num[hitems_.upgrade]+'</span>';
        });
        tag += '</li>';
        tag += '<li class="item_hole">';
        hitems_.hole.forEach((v,index)=>{
          tag += '<span>홀 '+(index+1)+' : '+hole[v].na+'<img src="./images/item/hole'+hole[v].idx+'.png"/></span>';
        });
        tag += '</li>';
        tag += '<li class="item_set">';
        const h_set = gameData.items.set_type[items.set];
        tag += '<span class="item_set">'+h_set.na+'</span>';
        h_set.part.forEach((v)=>{
          tag += '<span class="item_set_piece '+awb.ch.getSetChk(awb.data.userData.ch[ch_idx].items,v)+'">'+gameData.items.equip[v].na+'</span>';
        });
        tag += '</li>';
        tag += '<li flex>';
        tag += '<button text data-buttontype="item_enhancement">강화</button>';
        tag += '<button text data-buttontype="item_equip">장착</button>';
        tag += '<button text data-buttontype="item_sell">판매</button>';
        tag += '</li>';
        break;
      case 'hole':
        idx = arr[2],
        items = gameData.items.hole[n];//능력치 등 아이템 정보
        tag += '<ul flex-center class="items">';
        tag += '<li>';
        tag += '<span class="item_grade" style="color:'+gameData.itemGrade.color[items.grade]+'">'+gameData.itemGrade.txt_e[items.grade]+' ('+gameData.itemGrade.txt_k[items.grade]+')</span>';
        tag += '<span class="item_price">'+items.price+'</span>';
        tag += '<span class="item_lv">\"'+items.na+'\"</span>';
        tag += '</li>';
        tag += '<li class="item_eff">';
        items.eff.forEach((v)=>{
          tag += '<span>'+awb.util.getEffectType(v.type)+' '+v.num+'</span>';
        });
        tag += '</li>';
        tag += '<li flex>';
        tag += '<button text data-buttontype="hole_equip">장착</button>';
        tag += '<button text data-buttontype="item_sell">판매</button>';
        tag += '</li>';
        break;
      case 'upgrade':
        idx = arr[2];
        items = gameData.items.upgrade[n];//능력치 등 아이템 정보
        tag += '<ul flex-center class="items">';
        tag += '<li>';
        tag += '<span class="item_grade" style="color:'+gameData.itemGrade.color[items.grade]+'">'+gameData.itemGrade.txt_e[items.grade]+' ('+gameData.itemGrade.txt_k[items.grade]+')</span>';
        tag += '<span class="item_price">'+items.price+'</span>';
        tag += '<span class="item_lv">\"'+items.na+'\"</span>';
        tag += '<span class="item_eff">'+items.txt+'</span>';
        tag += '</li>';
        tag += '<li flex>';
        tag += '<button text data-buttontype="item_use">사용</button>';
        tag += '<button text data-buttontype="item_sell">판매</button>';
        tag += '</li>';
        break;
      case 'material':
        idx = arr[2];
        items = gameData.items.material[n];//능력치 등 아이템 정보
        tag += '<ul flex-center class="items">';
        tag += '<li>';
        tag += '<span class="item_grade" style="color:'+gameData.itemGrade.color[items.grade]+'">'+gameData.itemGrade.txt_e[items.grade]+' ('+gameData.itemGrade.txt_k[items.grade]+')</span>';
        tag += '<span class="item_price">'+items.price+'</span>';
        tag += '<span class="item_lv">\"'+items.na+'\"</span>';
        tag += '<span class="item_eff">'+items.txt+'</span>';
        tag += '</li>';
        tag += '<li flex>';
        tag += '<button text data-buttontype="item_sell">판매</button>';
        tag += '</li>';
        break;
      case 'etc':
        idx = arr[2];
        items = gameData.items.etc[n];//능력치 등 아이템 정보
        tag += '<ul flex-center class="items">';
        tag += '<li>';
        tag += '<span class="item_grade" style="color:'+gameData.itemGrade.color[items.grade]+'">'+gameData.itemGrade.txt_e[items.grade]+' ('+gameData.itemGrade.txt_k[items.grade]+')</span>';
        tag += '<span class="item_price">'+items.price+'</span>';
        tag += '<span class="item_lv">\"'+items.na+'\"</span>';
        tag += '<span class="item_eff">'+items.txt+'</span>';
        tag += '</li>';
        tag += '<li flex>';
        tag += '<button text data-buttontype="item_use">사용</button>';
        tag += '<button text data-buttontype="item_sell">판매</button>';
        tag += '</li>';
      default:
        break;
    }
    tag += '</ul>'
    const html = '<div flex-h-center class="popup_cont">'+tag+'</div>'+
                '<div class="popup_close"><span></span><span></span></div>';
    this.el.popup.classList.add('on');
    this.el.popup.innerHTML = html;
    
    //이벤트 바인딩
    this.el.popup.querySelector('.popup_cont').addEventListener('click',()=>{
      this.el.popup.classList.remove('on');
    });
    this.el.popup.querySelectorAll('button').forEach((el)=>{
      el.addEventListener('click',(e)=>{
        e.stopPropagation();
        const bt_type = el.dataset.buttontype,
              ch_idx = awb.ch.ch_idx,
              type_ = type === 'hequip' ? 'equip' : type;
        switch(bt_type){
          case 'item_enhancement':
            this.el.popup.classList.remove('on');
            awb.ch.enhanceItem(items,awb.data.userData.items['equip'][idx]);
            break;
          case 'item_equip':
            this.el.popup.classList.remove('on');
            awb.ch.equipItem(items,ch_idx,idx);
            break;
          case 'item_release':
            this.el.popup.classList.remove('on');
            awb.ch.releaseItem(ch_idx,idx);
            break;
          case 'item_use'://action 아이디변경(1), 장비강화(10), 스킬제거(11), 골드변경(99), 랜덤뽑기(100)
            //value 아이템 정보, idx 인벤토리 아이템 순번, type 아이템 종류
            this.el.popup.classList.remove('on');
            switch(items.action){
              case 1:
                awb.fn.modal({txt:'변경할 사용자 아이디를 입력하세요.',hint:'아이디 입력',bt:[{txt:'변경',fn:'changeId'},{txt:'취소',fn:'popClose'}],itemData:{type:type,idx:idx}},'prompt');
                break;
              case 10:
                awb.ch.enhanceItem();
                break;
              case 99:
                awb.ch.sellItem(items,type_,idx);
                break;
              case 100:
                console.log('랜덤뽑기',value);
                break;
              default:
                console.log('error');
                break;
            }
            break;
          case 'item_sell':
            this.el.popup.classList.remove('on');
            awb.ch.sellItem(items,type_,idx);
            break;
          case 'hole_equip':
            this.el.popup.classList.remove('on');
            awb.ch.enhanceItem();
            break;
          default:
            this.el.popup.classList.remove('on');
            break;
        }
        e.stopPropagation();
      });
    });
  }
  popClose(){
    this.el.modal.classList.remove('on');
  }
  changeId(id){
    awb.data.userData.info.id = id;
    awb.data.save_data();
    awb.header.set_info();
    awb.ch.display();
    this.el.modal.classList.remove('on');
  }
  gacha(n,type){
    awb.gacha.startGacha(n,type);
    this.el.modal.classList.remove('on');
  }
}

class Util{
  constructor(){
    this.loadImage();
  }
  loadImage(){
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
  }
  getEffectType(n){
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
  }
  getPercentColor(max,num){
    let co = num/max*510,
        co_ = 0;
    if(co/255 > 1){
      co_ = 255 - co%255;
      co = 255;
    }else{
      co_ = 255;
    }
    return 'rgb('+co_+','+co+',0)';
  }
  getPercent(total,current){
    if(current === 0){
      return 0;
    }else{
        return Math.round(current/total*100);
    }
  }
  setNumber(n){
    sn = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
    return sn;
  }
  getBattleLineup(n){

    return n;
  }
  getEffectArea(type,n){//type: 효과타입, n: 사용위치(0~24)
    var num = [];
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
  }
}
class Touch{
  constructor(){
    this.el = {}
    this.type = '';
    this.set_element();
  }
  set_element(){
    this.el.hammertime = new Hammer(document.querySelector('.content'));
  }
  set_touch(type){
    this.reset();
    this.type = type;
    this.touch_event();
  }
  touch_event(){
    switch(this.type){
      case 'ch':
        this.el.hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
        this.el.hammertime.on('swiperight',(e)=>{
          awb.ch.changeChIdx('minus');
        }).on('swipeleft',(e)=>{
          awb.ch.changeChIdx('plus');
        }).on('swipeup',(e)=>{
          if(localStorage.ch_page === '0'){
            awb.ch.changePage('plus');
          }else{
            
          }
        }).on('swipedown',(e)=>{
          if(localStorage.ch_page === '0'){
          }else{
            awb.ch.changePage(0);
          }
        });
        break;
      case 'gacha':
        break;
      case 'battle':
        break;
      case 'lineup':
        break;
      default:
        break;
    }
  }
  reset(){
    this.el.hammertime.off('swiperight');
    this.el.hammertime.off('swipeleft');
    this.el.hammertime.off('swipeup');
    this.el.hammertime.off('swipedown');
  }
}

class Data{//1
  constructor(data){
    if(!data || Object.keys(data).length === 0){
      data = this.load_data();
    }
    this.first_data(data);
    this.userData = {};
  }
  load_data(){
    let data = {};
    data.ch = JSON.parse(localStorage.getItem('ch'));
    data.items = JSON.parse(localStorage.getItem('items'));
    data.info = JSON.parse(localStorage.getItem('info'));
    data.lineup = JSON.parse(localStorage.getItem('lineup'));
    if(data.lineup === 'undefined' || data.lineup === null){
      data.lineup = {
        "select":0,
        "save_slot":[
          {"no":0,"entry":{}},{"no":0,"entry":{}},{"no":0,"entry":{}},{"no":0,"entry":{}},{"no":0,"entry":{}},{"no":0,"entry":{}},{"no":0,"entry":{}},{"no":0,"entry":{}}
        ]
      }
    }
    return data;
  }
  first_data(data){
    let _d = [];
    data.ch.forEach((v,index)=>{
      _d[index] = {...gameData.ch[v.idx]};
      _d[index].stateType = v.stateType;
      _d[index].lv = v.lv;
      _d[index].hasExp = v.hasExp;
      _d[index].exp = v.exp;
      _d[index].actionPoint = v.actionPoint;
      _d[index].sk = v.sk;
      _d[index].items = v.items;
    });
    let _i = {...data.items}
    //storage셋팅
    localStorage.setItem('ch',JSON.stringify(_d));//최초 인물데이터 넣기
    localStorage.setItem('ch_idx',0);//index순번 초기화
    localStorage.setItem('ch_length',_d.length);//보유 인물 갯수
    localStorage.setItem('ch_page',0);//인물 데이터 페이지
    localStorage.setItem('info',JSON.stringify(data.info));//인물 데이터 페이지
    localStorage.setItem('items',JSON.stringify(_i));//보유 아이템 목록
    localStorage.setItem('lineup',JSON.stringify(data.lineup));//진형 목록
  }
  add_ch(arr){
    let data = this.get_data();
    let save_idx = [];
    const ch_length = data.ch.length;
    arr.forEach((v,idx)=>{
      let _d = {...gameData.ch[v]};
      _d.stateType = Math.floor(Math.random()*4);//성장타입
      _d.lv = 1;
      _d.hasExp = 0;
      _d.exp = 0;
      _d.actionPoint = 0;
      _d.sk = [];
      _d.items = [];
      save_idx.push(ch_length+idx);
      data.ch.push(_d);
    });
    this.save_data(data);
    return save_idx;
  }
  get_data(){
    let data = {}
    data.ch = JSON.parse(localStorage.getItem('ch'));
    data.items = JSON.parse(localStorage.getItem('items'));
    data.info = JSON.parse(localStorage.getItem('info'));
    data.lineup = JSON.parse(localStorage.getItem('lineup'));
    return data;
  }
  save_data(data){
    let _data = {};
    if(!data){
      _data.info = this.userData.info;
      _data.ch = this.userData.ch;
      _data.items = this.userData.items;
      _data.lineup = this.userData.lineup;
    }else{
      _data = data;
    }
    localStorage.setItem('info',JSON.stringify(_data.info));
    localStorage.setItem('ch',JSON.stringify(_data.ch));
    localStorage.setItem('items',JSON.stringify(_data.items));
    localStorage.setItem('lineup',JSON.stringify(_data.lineup));
    this.userData.info = _data.info;
    this.userData.ch = _data.ch;
    this.userData.items = _data.items;
    this.userData.lineup = _data.lineup;
  }
}

class Header{//2
  constructor(){
    this.el = {}
    this.set_element();
    this.set_info();
    awb.fn = new Fn();
    awb.util = new Util();
    awb.menu = new Menu('main');
    awb.main = new Main();
  }
  set_element(){
    this.el.id = document.querySelector('.header .lv > .txt');
    this.el.lv = document.querySelector('.header .lv .ico .txt');
    this.el.money = document.querySelector('.header .money .txt');
    this.el.diamond = document.querySelector('.header .diamond .txt');
  }
  set_info(){
    let info = JSON.parse(localStorage.getItem('info'))
    this.el.id.innerHTML = info.id;//아이디 셋팅
    this.el.lv.innerHTML = info.lv;//레벨 셋팅
    this.el.diamond.innerHTML = info.diamond;//다이아 셋팅
    this.el.money.innerHTML = info.money;//돈 셋팅
  }
}

class Menu{//3
  constructor(type){
    this.el = {};
    this.set_element();
    this.set_type(type);
    this.el.back.addEventListener('click',()=>{
      awb.menu.set_type('main');
    });
  }
  set_type(type){
    this.type = type;
    this.el.root.classList.value = this.el.root.classList[0]+' '+this.type;
  }
  set_element(){
    this.el.root = document.querySelector('.root');
    this.el.back = document.querySelector('.header .back');
  }
}

class Main{//3
  constructor(){
    this.el = {}
    this.set_element();
    this.main_bt();
    awb.touch = new Touch();
    awb.data.userData = awb.data.get_data();
    awb.ch = new Ch();

    awb.gacha = new Gacha();
    awb.lineup = new Lineup();
    awb.battle = new Battle();
  }
  set_element(){
    this.el.root = document.querySelector('.root');
    this.el.container = document.querySelector('.main_wrap'); 
    this.el.main_menu = this.el.container.querySelector('.main_menu');
    this.el.main_menu.style.height = (this.el.main_menu.querySelectorAll('li').length*45)+'px';
    this.el.main_bt = this.el.main_menu.querySelectorAll('button');
  }
  main_bt(){
    this.el.main_bt.forEach((el,idx)=>{
      el.addEventListener('click',(e)=>{
        switch(idx){
          case 0:
            awb.ch.reset();
            awb.menu.set_type('ch');
            awb.touch.set_touch('ch');
            awb.ch.set_data(awb.data.get_data());
            break;
          case 1:
            awb.gacha.reset();
            awb.menu.set_type('gacha');
            awb.touch.set_touch('gacha');
            break;
          case 2:
            awb.lineup.reset();
            awb.menu.set_type('lineup');
            awb.touch.set_touch('lineup');
            //awb.battle(data);
            break;
          case 3:
            awb.battle.reset();
            awb.menu.set_type('battle');
            awb.touch.set_touch('battle');
            //awb.battle(data);
            break;
          default:
            break;
        }
      });
    });
  }
}

class Ch{//4
  constructor(){
    this.el = {};
    this.data = awb.data.userData;
    this.ch_idx = 0;
    this.ch_length = awb.data.userData.ch.length;//전체 캐릭터 갯수
    this.cardW = window.innerHeight * 0.05;
    new Promise((res,rej)=>{//element 구성
      this.set_element();
      res();
    }).then(()=>{//메뉴 셋팅 및 버튼 이벤트
      this.set_menu(1);
      this.el.menuBt.forEach((el,idx)=>{
        el.addEventListener('click',(e)=>{
          this.el.menuBt.forEach((_el)=>{
            _el.classList.remove('on');
          });
          e.target.classList.add('on');
          localStorage.setItem('ch_page',idx);
          this.el.container.classList.value = this.el.container.classList[0]+' page'+idx;
        });
      });
    }).then(()=>{
      this.display();
      for(let i = 0; i < this.ch_length; ++i){//능력치 rst,ist,tst 만들기
        awb.ch.set_st(i);
      }
    });
    window.addEventListener('resize', this.reset.bind(this), false);
  }
  reset(){
    this.data = awb.data.userData;
    this.ch_idx = 0;
    this.ch_length = this.data.ch.length;
    this.cardW = window.innerHeight * 0.05;
    this.set_menu(0);
    //카드 리스트 생성
    this.card_list();
    this.changeChIdx(0);
  }
  set_element(){
    this.el.container = document.querySelector('.ch_wrap');
    this.el.menuBt = this.el.container.querySelectorAll('.ch_menu button');

    this.el.card = this.el.container.querySelector('.ch_card');
    this.el.name = this.el.container.querySelector('.content .name_lv .name');
    this.el.name_ = this.el.container.querySelector('.content .name_lv .name_');
    this.el.ch = this.el.container.querySelector('.content .ch');
    this.el.ch_style = this.el.container.querySelector('.content .ch_style');
    this.el.element = this.el.container.querySelector('.content .element');
    this.el.element_1 = this.el.container.querySelector('.content .element_1');
    this.el.element_2 = this.el.container.querySelector('.content .element_2');
    this.el.lv = this.el.container.querySelector('.content .name_lv .lv');
    this.el.star = this.el.container.querySelector('.content .star');
    this.el.state = this.el.container.querySelectorAll('.content .ch_info .st');//능력치
    this.el.stType_acPoint = this.el.container.querySelector('.content .stateType_actionPoint');
    this.el.st_type = this.el.stType_acPoint.querySelector('.state_type');//성장타입
    this.el.ac_point = this.el.stType_acPoint.querySelector('.action_point');//행동포인트
    this.el.ac_current = this.el.ac_point.querySelector('.current');
    this.el.ac_max = this.el.ac_point.querySelector('.max');
    this.el.exp = this.el.container.querySelector('.content .exp');//경험치
    this.el.exp_bar = this.el.exp.querySelector('.exp_bar span');
    this.el.exp_current = this.el.exp.querySelector('.current');
    this.el.exp_max = this.el.exp.querySelector('.max');
    this.el.has_exp = this.el.container.querySelector('.content .has_exp');//누적경험치
    this.el.has_expBar = this.el.has_exp.querySelector('.exp_bar span');
    this.el.has_expCurrent = this.el.has_exp.querySelector('.current');
    this.el.has_expMax = this.el.has_exp.querySelector('.max');

    this.el.ch_info = this.el.container.querySelector('.content .ch_info');
    this.el.skill = this.el.ch_info.querySelector('.skill .sk_group dd');//스킬
    this.el.relation = this.el.ch_info.querySelector('.relation .rt_group dd');
    this.el.item_pic = this.el.ch_info.querySelector('.items .it_group .animal_item_pic');
    this.el.eitems = this.el.ch_info.querySelector('.items .it_group .e_items');
    this.el.hitems = this.el.ch_info.querySelector('.items .it_group .h_items');
    this.el.applyState = this.el.ch_info.querySelector('.apply_state .ach_group dd .total_states');

    this.el.item_enhance = this.el.container.querySelector('.content .item_enhance');
    this.el.enhance_hole = this.el.item_enhance.querySelector('.hole_item');
    this.el.enhance_target = this.el.item_enhance.querySelector('.item_target');
    this.el.enhance_info = this.el.enhance_hole.querySelector('.item_info');
    this.el.enhance_items = this.el.item_enhance.querySelector('.has_items .h_items');
    this.el.enhance_stones = this.el.item_enhance.querySelector('.has_stones .h_items');
    this.el.ch_list = this.el.container.querySelector('.ch_list');
    this.el.ch_list_card = null;
  }
  display(){
    const idx = this.ch_idx;//현재 캐릭터 순번
    let html = {};
    this.el.name.innerHTML = this.data.ch[idx].na1 + ' ' +this.data.ch[idx].na2;
    this.el.name_.innerHTML = this.data.ch[idx].na3;
    this.el.ch.style = 'background-image:url(./images/ch/ch'+this.data.ch[idx].display+'.png);';
    this.el.ch_style.style = 'background-image:url(./images/ch_style/ch_style'+this.data.ch[idx].style+'.png);';
    if(this.data.ch[idx].lv === 50){
      this.el.element.style = 'background-image:url(./images/ring/ring'+this.data.ch[idx].element+'.png);';
      this.el.element_1.style = 'background-image:url(./images/sring/sring'+this.data.ch[idx].element+'.png);';
      this.el.element_2.style = 'background-image:url(./images/ssring/ssring'+this.data.ch[idx].element+'.png);';
    }else if(this.data.ch[idx].lv > 30){
      this.el.element.style = 'background-image:url(./images/ring/ring'+this.data.ch[idx].element+'.png);';
      this.el.element_1.style = 'background-image:url(./images/sring/sring'+this.data.ch[idx].element+'.png);';
      this.el.element_2.style = '';
    }else{
      this.el.element.style = 'background-image:url(./images/ring/ring'+this.data.ch[idx].element+'.png);';
      this.el.element_1.style = '';
      this.el.element_2.style = '';
    }
    this.el.lv.innerHTML = this.data.ch[idx].lv;
    this.el.star.innerHTML = this.makeStar(this.data.ch[idx].grade*1);

    this.el.st_type.innerHTML = gameData.stateType[this.data.ch[idx].stateType].na;
    this.el.ac_current.innerHTML = this.data.ch[idx].actionPoint;
    this.el.ac_max.innerHTML = this.data.ch[idx].st7;

    const exp = {current:this.data.ch[idx].exp,max:gameData.exp['grade'+this.data.ch[idx].grade][this.data.ch[idx].lv-1]};
    this.el.exp_bar.style.width = awb.util.getPercent(exp.max,exp.current)+'%';
    this.el.exp_current.innerHTML = exp.current;
    this.el.exp_max.innerHTML = exp.max;
    
    const has_exp = {current:this.data.ch[idx].hasExp,max:gameData.hasMaxExp[this.data.ch[idx].grade]};
    this.el.has_expBar.style.width = awb.util.getPercent(has_exp.max,has_exp.current)+'%';
    this.el.has_expCurrent.innerHTML = has_exp.current;
    this.el.has_expMax.innerHTML = has_exp.max;

    this.data.item_eff = [];//아이템 효과 초기화

    //state
    this.el.state.forEach((el,index)=>{
      const total = el.querySelector('.total_bar'),
          max = total.querySelector('.frame_bar'),
          max_ = total.querySelector('.back_bar'),
          current = max.querySelector('.bar'),
          txt_current = el.querySelector('.txt_current'),
          txt_total = el.querySelector('.txt_total'),
          per_st_max = Number((gameData.stateType[this.data.ch[idx].stateType].arr[49]*0.01).toFixed(2)),//성장타입에 따른 최대능력치 %

          st = this.data.ch[idx]['st'+index],//실제 능력치
          per_current = gameData.stateType[this.data.ch[idx].stateType].arr[this.data.ch[idx].lv-1]*0.01,//성장타입에 따른 LV당 %
          stateCurrent = Math.round(st*per_current),//성장타입에 따른 LV당 능력치

          real_st = Math.round(per_st_max*st),//성장치 적용된 최대LV능력치
          stateMax = gameData.stateMax[index],//능력치 한계치
          per_max = (real_st/stateMax)*100;//성장 최대 능력치 %


      max.style.width = per_max+'%';
      max_.style.width = (100-per_max)+'%';
      current.style.width = (stateCurrent/real_st)*100+'%';
      
      txt_total.innerHTML = stateCurrent;
      txt_total.style.color = awb.util.getPercentColor(stateMax,stateCurrent);
      this.data.ch[idx]['rst'+index] = stateCurrent;//실 능력치 데이터 저장
    });

    //skill
    const sk = this.data.ch[idx].sk,
        sk_length = sk.length;
    html.skill = '';
    for(var i = 0; i < sk_length; ++i){
      const sk_ = gameData.skill[sk[i].idx];
      const cate = sk_.cate.reduce((v1,v2)=>v1+v2);
      html.skill += '<div class="sk" flex-h cate'+cate+'><div class="sk_info" flex><span class="sk_element" el'+sk_.dmg_type+'></span>'+'<span class="name">'+sk_.na+'</span>'+'<span class="txt">'+sk_.txt+'</span></div><div flex class="lv_exp">'+'<span class="lv">LV.'+sk[i].lv+'</span>'+'<span class="exp"><span class="gradient_dark" style="width:'+(sk[i].exp || 0)+'%;"></span></span>'+'</div></div>';
    }
    this.el.skill.innerHTML = html.skill;

    //relation
    const rt = this.data.ch[idx].relation,
        rt_length = rt.length;
    html.relation = '';
    for(var i = 0; i < rt_length; ++i){
      const rt_ = gameData.relation[rt[i].idx];
      html.relation += '<div class="rt" flex><span class="name">'+rt_.tag+'</span>'+'<span class="txt">'+rt_.txt+'</span></div>';
    }
    this.el.relation.innerHTML = html.relation;

    //items
    const ite = this.data.ch[idx].items,
        ite_length = ite.length,
        ith = this.data.items,
        animal_idx = gameData.ch[this.data.ch[idx].idx].animal_type;
    //equip
    html.eitems = '';
    this.el.item_pic.classList.value = '';
    this.el.item_pic.classList.add('animal_item_pic','animal_type'+animal_idx);
    this.el.item_pic.style.background = 'url(./images/item/animal_item'+animal_idx+'.png) no-repeat center center';
    this.el.item_pic.style.backgroundSize = '100%';
    for(let i = 0; i < 8; ++i){
      if(ite_length > i && Object.keys(ite[i]).length !== 0){
        const ite_ = gameData.items.equip[ite[i].idx];
        const hole_length = ite[i].hole.length;
        html.eitems += '<li class="item item'+gameData.animal_type[animal_idx].equip[i]+'"><em link="equip_'+ite[i].idx+'_'+i+'"><span class="pic" style="background:url(./images/item/equip'+ite_.display+'.png) no-repeat center center;background-size:100%"></span><span class="lv">'+ite[i].lv+'</span><span class="hole" flex-center>';
        for(let j = 0; j < hole_length; ++j){
          let stone_color = gameData.items.hole[ite[i].hole[j]].stone;
          html.eitems += '<span class="hole_slot hole'+j+' stone_'+stone_color+'"></span>';
        }
        html.eitems += '</span></em></li>';
        this.saveItemEff(ite_,i);//아이템효과 저장
        this.data.ch[this.ch_idx].item_eff = this.data.item_eff;
      }else{
        this.data.ch[this.ch_idx].items[i] = {};
        html.eitems += '<li class="item item'+gameData.animal_type[animal_idx].equip[i]+'"></li>';
      }
    }
    this.el.eitems.innerHTML = html.eitems;
    
    //has items
    html.hitems = '';
    for(let n in ith){
      for(let i = 0; i < ith[n].length;++i){
        const it_idx = ith[n][i].idx,
          ith_info = gameData.items[n][it_idx],
          ith_save = this.data.items[n];
        let item_color = '';
        //1투구, 2옷, 3장비, 4반지, 5목걸이, 10짐, 보석11, 업그레이드12, 기타13
        switch(n){
          case 'equip':
            item_color = ith_info.part;
            html.hitems += '<li class="item item'+item_color+'" data-itemNum="'+n+'_'+it_idx+'"><em link="h'+n+'_'+it_idx+'_'+i+'">';
            html.hitems += '<span class="pic" style="background-image:url(./images/item/'+n+ith_info.display+'.png);background-size:100%;"></span>';
            html.hitems += '<span class="lv">'+ith_save[i].lv+'</span><span class="hole" flex-center>';
            const hole_length = ith_save[i].hole.length;
            for(let j = 0; j < hole_length; ++j){
              const stone_color = gameData.items.hole[ith_save[i].hole[j]].stone;
              html.hitems += '<span class="hole_slot hole'+j+' stone_'+stone_color+'"></span>';
            };
            html.hitems += '</span>';
            break;
          case 'hole':
            item_color = 11;
            html.hitems += '<li class="item item'+item_color+'" data-itemNum="'+n+'_'+it_idx+'"><em link="'+n+'_'+it_idx+'_'+i+'">';
            html.hitems += '<span class="pic" style="background-image:url(./images/item/'+n+ith_info.display+'.png);background-size:100%;"></span>';
            break;
          case 'upgrade':
            item_color = 12;
            html.hitems += '<li class="item item'+item_color+'" data-itemNum="'+n+'_'+it_idx+'"><em link="'+n+'_'+it_idx+'_'+i+'">';
            html.hitems += '<span class="pic" style="background-image:url(./images/item/'+n+ith_info.display+'.png);background-size:100%;"></span>';
            break;
          case 'material':
            item_color = 13;
            html.hitems += '<li class="item item'+item_color+'" data-itemNum="'+n+'_'+it_idx+'"><em link="'+n+'_'+it_idx+'_'+i+'">';
            html.hitems += '<span class="pic" style="background-image:url(./images/item/'+n+ith_info.display+'.png);background-size:100%;"></span>';
            break;
          case 'etc':
            item_color = 13;
            html.hitems += '<li class="item item'+item_color+'" data-itemNum="'+n+'_'+it_idx+'"><em link="'+n+'_'+it_idx+'_'+i+'">';
            html.hitems += '<span class="pic" style="background-image:url(./images/item/'+n+ith_info.display+'.png);background-size:100%;"></span>';
            break;
          default:
        }
        html.hitems += '</em></li>';
      }
    }
    this.el.hitems.innerHTML = html.hitems;

    //enhance items
    html.en_items = '';
    //enhance stone
    html.en_stones = '';
    for(let n in ith){
      for(let i = 0; i < ith[n].length;++i){
        const it_idx = ith[n][i].idx,
            ith_info = gameData.items[n][it_idx],
            ith_save = this.data.items[n];
        let item_color = '';
        //1투구, 2옷, 3장비, 4반지, 5목걸이, 10짐, 보석11, 업그레이드12, 기타13
        switch(n){
          case 'equip':
            item_color = ith_info.part;
            html.en_items += '<li class="item item'+item_color+'" data-itemNum="'+n+'_'+it_idx+'">';
            html.en_items += '<span class="pic" style="background-image:url(./images/item/'+n+ith_info.display+'.png);background-size:100%;"></span>';
            html.en_items += '<span class="lv">'+ith_save[i].lv+'</span><span class="hole" flex-center>';
            const hole_length = ith_save[i].hole.length;
            for(let j = 0; j < hole_length; ++j){
              let stone_color = gameData.items.hole[ith_save[i].hole[j]].stone;
              html.en_items += '<span class="hole_slot hole'+j+' stone_'+stone_color+'"></span>';
            };
            html.en_items += '</span>';
            html.en_items += '</li>';
            break;
          case 'hole':
            item_color = 11;
            html.en_stones += '<li class="item item'+item_color+'" data-itemNum="'+n+'_'+it_idx+'">';
            html.en_stones += '<span class="pic" style="background-image:url(./images/item/'+n+ith_info.display+'.png);background-size:100%;"></span>';
            html.en_stones += '</li>';
            break;
          case 'upgrade':
            item_color = 12;
            html.en_stones += '<li class="item item'+item_color+'" data-itemNum="'+n+'_'+it_idx+'">';
            html.en_stones += '<span class="pic" style="background-image:url(./images/item/'+n+ith_info.display+'.png);background-size:100%;"></span>';
            html.en_stones += '</li>';
            break;
          default:
        }
      }
    }
    this.el.enhance_items.innerHTML = html.en_items;
    this.el.enhance_stones.innerHTML = html.en_stones;
    this.el.enhance_items.querySelectorAll('.item').forEach((el,item_idx)=>{
      el.addEventListener('click',(e)=>{
        this.enhanceItem(gameData.items.equip[this.data.items.equip[item_idx].idx],this.data.items.equip[item_idx]);
      });
    });
    //applyState
    html.applyState = '';
    
    let state_arr = [];
    for(let i = 0; i < 7; ++i){
      state_arr[i] = this.data.ch[this.ch_idx]['rst'+i];
    }
    state_arr[7] = this.data.ch[this.ch_idx]['st'+3] + this.data.ch[this.ch_idx]['st'+5] + this.data.ch[this.ch_idx]['st'+6];
    
    for(let i = 0; i < 9; ++i){
      const state_txt = this.getTotalState(i,state_arr),
          item_state = this.compileState(state_txt.n,this.data.item_eff[i]);
      this.data.ch[this.ch_idx]['ist'+i] = item_state;
      this.data.ch[this.ch_idx]['tst'+i] = state_txt.n+item_state;
      html.applyState += '<li class="'+state_txt.txt_e.toLowerCase()+'">'

      html.applyState += '<span class="name">'+state_txt.txt_k+'<b>'+state_txt.txt_e+'</b></span><span class="current">'+state_txt.n+' <b>+ '+item_state+'</b></span><span class="total">'+(state_txt.n+item_state)+'</span>';

      html.applyState += '</li>';
    }
    this.el.applyState.innerHTML = html.applyState;

    localStorage.setItem('ch',JSON.stringify(this.data.ch));//storage에 저장

    //popup 셋팅
    const pop = document.querySelectorAll('em');
    pop.forEach((el)=>{
      const n = el.getAttribute('link').split('_');
      el.addEventListener('click',()=>{
        awb.fn.openPop(n);
      });
    });
    awb.data.save_data(this.data);
  }
  set_st(idx){
    //rst
    this.el.state.forEach((el,index)=>{
      const st = this.data.ch[idx]['st'+index],//실제 능력치
          per_current = gameData.stateType[this.data.ch[idx].stateType].arr[this.data.ch[idx].lv-1]*0.01,//성장타입에 따른 LV당 %
          stateCurrent = Math.round(st*per_current);//성장타입에 따른 LV당 능력치
      this.data.ch[idx]['rst'+index] = stateCurrent;//실 능력치 데이터 저장
    });

    this.data.item_eff = [];
    //item_eff
    const ite = this.data.ch[idx].items,
          ite_length = ite.length;
    for(let i = 0; i < 8; ++i){
      if(ite_length > i && Object.keys(ite[i]).length !== 0){
        const ite_ = gameData.items.equip[ite[i].idx];
        this.saveItemEff(ite_,i,idx);//아이템효과 저장
        this.data.ch[idx].item_eff = this.data.item_eff;
      }else{
        this.data.ch[idx].items[i] = {};
      }
    }

    //tst,ist,lst
    let state_arr = [];
    for(let i = 0; i < 7; ++i){
      state_arr[i] = this.data.ch[idx]['rst'+i];
    }
    state_arr[7] = this.data.ch[idx]['st'+3] + this.data.ch[idx]['st'+5] + this.data.ch[idx]['st'+6];

    for(let i = 0; i < 9; ++i){
      const state_txt = this.getTotalState(i,state_arr),
            item_state = this.compileState(state_txt.n,this.data.item_eff[i]);
      this.data.ch[idx]['ist'+i] = item_state;
      this.data.ch[idx]['tst'+i] = state_txt.n+item_state;
      if(this.data.ch[idx]['lst'+i] === undefined){
        this.data.ch[idx]['lst'+i] = 0;
      }
    }
  }
  card_list(){
    let html = '';
    html = '<ul style="width:'+Math.ceil((this.cardW)*this.ch_length)+'px">';
    this.data.ch.forEach((v,_idx)=>{
      html += '<li onclick="awb.ch.changeChIdx('+_idx+');" class="g'+v.grade+'"><span class="list_ring"></span><span class="list_ch" style="background-image:url(./images/ch/ch'+v.display+'.png);"></span><span class="list_chstyle" style="background-image:url(./images/ch_style/ch_style'+v.style+'.png);"></span></li>';
    });
    html += '</ul>';
    this.el.ch_list.innerHTML = html;
    this.el.ch_list_card = this.el.ch_list.querySelectorAll('li');
  }
  set_data(data){
    this.data = data;
  }
  set_menu(idx){
    this.el.menuBt.forEach((bt)=>{
      bt.classList.remove('on');
    });
    this.el.menuBt[idx].classList.add('on');
  }
  changePage(n){
    if(this.el.card.classList.contains('rotate')){
      this.el.card.classList.remove('rotate');
    }else{
      this.el.card.classList.add('rotate');
    }
    let idx = Number(localStorage.ch_page);
    if(n === 'minus'){
      idx -= 1;
      idx = idx < 0 ? 4 : idx;
    }else if(n === 'plus'){
      idx += 1;
      idx = idx > 4 ? 0 : idx;
    }else{
      idx = n;
    }
    localStorage.setItem('ch_page',idx);
    this.el.container.classList.value = this.el.container.classList[0]+' page'+idx;
    this.set_menu(idx);
  }
  changeChIdx(n){
    let idx = this.ch_idx;
    this.el.ch_list_card[idx].classList.remove('on');
    const ch_length = awb.data.userData.ch.length -1;
      if(n === 'minus'){
        idx -= 1;
        idx = idx < 0 ? ch_length : idx;
      }else if(n === 'plus'){
        idx += 1;
        idx = idx > ch_length ? 0 : idx;
      }else{
        idx = n;
      }
      if(this.el.card.classList.contains('rotate')){
        this.el.card.classList.remove('rotate');
      }else{
        this.el.card.classList.add('rotate');
      }
      localStorage.setItem('ch_idx',idx);
      awb.ch.ch_idx = idx;
      this.setIdx(idx);

      this.el.ch_list_card[idx].classList.add('on');
      const ch_list_half = this.el.ch_list.getBoundingClientRect().width*.5,
            card_half_num = Math.floor(ch_list_half/this.cardW);
      this.el.ch_list.scrollTo(this.cardW*(idx-card_half_num),0);//캐릭터 미니맵 스크롤 위치 잡기
  }
  makeStar(n){//별 처리
    let tag = '';
    for(var i =0; i< n; ++i){
      tag += '<span></span>';
    }
    return tag;
  }
  setIdx(n){//캐릭 순번 셋팅
    awb.ch.idx = n;
    localStorage.setItem('ch_idx',awb.ch.idx);
    awb.ch.display();
  }
  saveItemEff(v,idx,ch_idx){
    const _ch_idx = ch_idx ? ch_idx : this.ch_idx; 
    const item = this.data.ch[_ch_idx].items[idx];//캐릭 자체 정보(hole)
    item.hole.forEach((n)=>{//stone 정보
      const stone = gameData.items.hole[n];
      if(stone.idx !== 0){
        stone.eff.forEach((eff)=>{
          if(!this.data.item_eff[eff.type]){
            this.data.item_eff[eff.type] = {p:0,n:0};
          }
          if(eff.num.indexOf('%') > 0){
            this.data.item_eff[eff.type].p = this.data.item_eff[eff.type].p + parseInt(eff.num);
          }else{
            this.data.item_eff[eff.type].n = this.data.item_eff[eff.type].n + parseInt(eff.num);
          }
        });
      }
    });
    v.eff.forEach((eff)=>{
      if(!this.data.item_eff[eff.type]){
        this.data.item_eff[eff.type] = {p:0,n:0};
      }
      if(eff.num[item.upgrade].indexOf('%') > 0){
        this.data.item_eff[eff.type].p = this.data.item_eff[eff.type].p + parseInt(eff.num[item.upgrade]);
      }else{
        this.data.item_eff[eff.type].n = this.data.item_eff[eff.type].n + parseInt(eff.num[item.upgrade]);
      }
    });
    this.data.ch[_ch_idx].item_eff = this.data.item_eff;
    awb.data.save_data(this.data);
    //localStorage.setItem('ch',JSON.stringify(awb.save.ch));//storage에 저장
  }
  getTotalState(n,state){
    const arr = [{k:'체력',e:'HP'},{k:'행동',e:'SP'},{k:'행동회복',e:'RSP'},{k:'공격',e:'ATK'},{k:'방어',e:'DEF'},{k:'술법공격',e:'MAK'},{k:'술법방어',e:'MDF'},{k:'체력회복',e:'RCV'},{k:'속도',e:'SPD'}];
    let num = 0;
    switch(n){
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
    return {'txt_e':arr[n].e,'txt_k':arr[n].k,'n':Math.round(num)};
  }
  compileState(current_s, item_s){
    if(item_s === undefined){
      return 0;
    }else{
      if(item_s.p !== 0){
        return Math.round(current_s*(item_s.p/100));
      }else{
        return item_s.n;
      }
    }
  }
  getSetChk(has_item,n){//셋트 아이템 체크
    let chk = false;
    has_item.forEach((v)=>{
      if(v.idx === n){
        chk = true;
      }
    });
    return chk ? 'on' : '';
  }
  equipItem(value,ch_idx,idx){
    const part = value.part;
    let overlap_chk = true;
    this.el.eitems.querySelectorAll('li').forEach((v,item_slot_idx)=>{
      const _part = v.classList.value.split('item item')[1]*1;
      if(part === _part && Object.keys(this.data.ch[ch_idx].items[item_slot_idx]).length === 0 && overlap_chk){//해당파트와 같은파트인지? && 빈칸인지? && 같은파트가 비었을경우 한번만 발생하게
        this.data.ch[ch_idx].items[item_slot_idx] = this.data.items['equip'][idx];//캐릭에 아이템 넣기
        this.data.items['equip'].splice(idx,1);//인벤에서 아이템 제거
        awb.data.save_data();
        this.display();
        overlap_chk = false;
      }
    });
  }
  releaseItem(ch_idx,idx){//아이템 해제
    this.data.items['equip'].push(this.data.ch[ch_idx].items[idx]);//인벤에 아이템 넣기
    this.data.ch[ch_idx].items[idx] = {};//캐릭 아이템 제거
    awb.data.save_data();
    awb.ch.display();
  }
  sellItem(value,type,idx){//아이템 판매
    awb.data.userData.info.money += value.price;
    awb.data.userData.items[type].splice(idx,1);//인벤에서 아이템 제거
    awb.data.save_data();
    this.display();
    awb.header.set_info();
    console.log('골드변경',value.price);
  }
  enhanceItem(gData,saveData){
    awb.ch.el.container.classList.value = 'ch_wrap page6';
    gData = gData ? gData : gameData.items.equip[awb.data.userData.items.equip[0].idx];
    saveData = saveData ? saveData : awb.data.userData.items.equip[0];
    const hole = gameData.items.hole;
    let tag = '',
        ta = '';
    ta += '<div class="item item'+gData.part+'"><span class="pic" style="background-image:url(./images/item/equip'+gData.display+'.png);background-size:100%;"></span>';
    ta += '<span class="item_lv">LV.'+saveData.lv+'</span><span class="hole" flex-center>';
    let hole_length = saveData.hole.length;
    for(let i = 0; i < hole_length; ++i){
      let stone_color = gameData.items.hole[saveData.hole[i]].stone;
      ta += '<span class="hole_slot hole'+i+' stone_'+stone_color+'"></span>';
    };
    ta += '</span></div>';
    ta += '<div class="item_name" style="color:'+gameData.itemGrade.color[gData.grade]+'">\"'+gData.na+'\"'+(saveData.upgrade > 0 ? '+'+saveData.upgrade : '')+'</div>';
    this.el.enhance_target.innerHTML = ta;
    // ta += '<li class="+'" data-itemNum="'+n+'_'+it_idx+'">';

    tag += '<ul>';
    tag += '<li>';
    // tag += '<span class="item_grade" style="color:'+awb.gameData.itemGrade.color[gameData.grade]+'">'+awb.gameData.itemGrade.txt_e[gameData.grade]+' ('+awb.gameData.itemGrade.txt_k[gameData.grade]+')</span>';
    // tag += '<span class="item_price">'+gameData.price+'</span>';
    
    // tag += '<span class="item_txt">'+gameData.txt+'</span>';
    tag += '</li>';
    tag += '<li class="item_eff">';
    gData.eff.forEach((v)=>{
      tag += '<span class="item_eff">'+awb.util.getEffectType(v.type)+' '+v.num[saveData.upgrade]+'</span>';
    });
    tag += '</li>';
    tag += '<li class="item_hole">';

    saveData.hole.forEach((v,index)=>{
      tag += '<span>홀 '+(index+1)+' : '+hole[v].na+'<img src="./images/item/hole'+hole[v].idx+'.png"/></span>';
    });
    tag += '</li>';
    tag += '</ul>';
    // tag += '<li class="item_set">';
    // let h_set = awb.gameData.items.set_type[items.set];
    // tag += '<span class="item_set">'+h_set.na+'</span>';
    // h_set.part.forEach((v)=>{
    //   tag += '<span class="item_set_piece '+awb.util.getSetChk(awb.save.ch[ch_idx].items,v)+'">'+awb.gameData.items.equip[v].na+'</span></li></ul>';
    // });
    this.el.enhance_info.innerHTML = tag;
    console.log('장비강화',gData);
  }
}

class Gacha{
  constructor(){
    this.el = {}
    this.setT = null;
    this.gacha_list = [
      {na:'Premium 10',type:'p10',num:10,price:1400},
      {na:'Premium 1',type:'p1',num:1,price:150},
      {na:'Normal 10',type:'n10',num:10,price:20000},
      {na:'Normal 1',type:'n1',num:1,price:2000}
    ]
    this.separation_grade();
    this.set_element();
    this.display();
    this.selectCard = 0;
    this.arr_ch = [];
    this.ch_saveIdx = [];
    this.el.touch.addEventListener('click',(e)=>{
      this.openCard(this);
    });
    this.el.gacha_info.addEventListener('click',(e)=>{
      this.el.gacha_info.classList.remove('on');
    });
    window.addEventListener('resize', this.reset.bind(this), false);
  }
  separation_grade(){
    for(const v of gameData.ch){
      gameData.chOfGrade[v.grade-1].push(v);
    }
  }
  set_element(){
    this.el.container = document.querySelector('.gacha_wrap');
    this.el.gacha_menu = this.el.container.querySelector('.gacha_menu');
    this.el.gacha_area = this.el.container.querySelector('.gacha_area');
    this.el.gacha_cards = this.el.gacha_area.querySelector('.cards');
    this.el.gacha_eff = this.el.gacha_area.querySelector('.effect');
    this.el.touch = this.el.gacha_area.querySelector('.touch');
    this.el.gacha_box = this.el.gacha_area.querySelector('.card_box');
    this.el.gacha_info = this.el.container.querySelector('.gacha_info');
    this.el.gacha_infoCard = this.el.gacha_info.querySelector('.ch_detail');
    this.el.gacha_infoGraph = this.el.gacha_info.querySelector('.ch_graph');
    this.el.gacha_can = this.el.gacha_infoGraph.querySelector('canvas');
    this.el.gacha_infoState = this.el.gacha_info.querySelector('.ch_state');
  }
  display(){
    let html_bt = '';
    html_bt += '<ul class="menu white">';
    this.gacha_list.forEach((v)=>{
      html_bt += '<li><button>'+v.na+' Gacha <span class="price '+(v.type.indexOf('p') < 0 ? 'gold' : 'dia')+'">'+v.price+'</span></button></li>';
    });
    html_bt += '</ul>';
    this.el.gacha_menu.innerHTML = html_bt;
    this.el.gacha_bt = this.el.gacha_menu.querySelectorAll('button');
    this.el.gacha_bt.forEach((el,idx)=>{
      el.addEventListener('click',(e)=>{
        let gacha_type = this.gacha_list[idx];
        this.chkMoney(gacha_type);
      });
    });
    this.el.gacha_menu.style.height = this.gacha_list.length*45-10+'px';
  }
  reset(){
    clearTimeout(this.setT);
    this.el.container.classList.value = 'gacha_wrap';
    this.el.gacha_cards.classList.value = 'cards';
    this.el.gacha_cards.innerHTML = '';
    this.el.gacha_eff.classList.value = 'effect';
    this.el.touch.classList.remove('on');
    this.arr_ch = [];
    this.selectCard = 0;
  }
  chkMoney(gacha_type){
    const type = (gacha_type.type.indexOf('p') >= 0) ? 'dia' : 'gold',
        price = gacha_type.price,
        num = gacha_type.num;
    if(type >= 0){
      awb.fn.modal({txt:'발바닥 '+price+'을 사용하시겠습니까?',bt:[{txt:'사용',fn:'gacha'},{txt:'취소',fn:'popClose'}],gachaData:{type:type,num:num,price:price}},'confirm');
    }else{
      awb.fn.modal({txt:'골드 '+price+'을 사용하시겠습니까?',bt:[{txt:'사용',fn:'gacha'},{txt:'취소',fn:'popClose'}],gachaData:{type:type,num:num,price:price}},'confirm');
    }
  }
  startGacha(n,type){
    const gacha_list = this.getGrade(n,type);
    this.el.container.classList.add('start');
    this.el.gacha_cards.innerHTML = this.makeCard(n,gacha_list.arr);
      this.el.card = this.el.gacha_cards.querySelectorAll('.card');
      this.setT = setTimeout(()=>{
        this.el.card.forEach((el)=>{
          el.classList.add('ready');
        });
      },500);
      this.el.card.forEach((el,idx)=>{
        this.setT = setTimeout(()=>{
          el.classList.add('on');
        },200*idx+1000);
      });
      new Promise((res,rej)=>{
        this.setT = setTimeout(()=>{
          this.el.gacha_eff.classList.add('grade'+gacha_list.maxGrade);
          res();
        },n*200+1500);
      }).then(()=>{
        if(n === 1){
          this.el.gacha_cards.classList.add('pos_one');
        }else{
          this.el.gacha_cards.classList.add('pos');
        }
        this.el.touch.classList.add('on');
      }).then(()=>{
        this.el.card.forEach((el)=>{
          el.classList.remove('on');
        });
      });
  }
  openCard(){
    if(this.el.card[this.selectCard]){
      if(this.el.card[this.selectCard].dataset['grade'] > 5){//고급 등급 효과 추가
        this.el.card[this.selectCard].classList.add('special');
      }
      this.el.card[this.selectCard].classList.add('open');
      this.selectCard++;
    }else{
      this.el.touch.classList.remove('on');
      awb.main.el.root.classList.remove('noback');
      this.el.card.forEach((el,card_idx)=>{
        el.addEventListener('click',(e)=>{
          this.el.gacha_info.classList.add('on');
          this.popCard(this.ch_saveIdx[card_idx]);
        });
      });
    }
  }
  popCard(idx){
    const ch_data = awb.data.userData.ch[idx];
    let html = {};
    html.card = '';
    html.card += '<li class="name_lv">';
    html.card +=   '<img class="img" src="./images/card/card_name.png">';
    html.card +=   '<span class="lv">1</span>';
    html.card +=   '<span class="name_">'+ch_data.na3+'</span>';
    html.card +=   '<span class="name">'+ch_data.na1+' '+ch_data.na2+'</span>';
    html.card += '</li>';
    html.card += '<li class="ch transition" style="background-image: url(./images/ch/ch'+ch_data.display+'.png);"></li>';
    html.card += '<li class="ch_style transition" style="background-image: url(./images/ch_style/ch_style'+ch_data.style+'.png);"></li>';
    html.card += '<li class="ring"></li>';
    html.card += '<li class="element" style="background-image: url(./images/ring/ring'+ch_data.element+'.png);"></li>';
    html.card += '<li class="star">'+awb.ch.makeStar(ch_data.grade)+'</li>';
    html.card += '<li class="frame"></li>';
    this.el.gacha_infoCard.innerHTML = html.card;

    const state_per = [125,200,200,100,200,100,100],
          st_t = ['통솔','체력','무력','민첩','지력','정치','매력'],
          st_c = ['#037ace','#f3004e','#ff5326','#77b516','#f9c215','#5f3dc4','#ce20c2'],
          ctx_w = this.el.gacha_infoGraph.getBoundingClientRect().width,
          arc_r = Math.PI*2/7,
          ctx_c = ctx_w*.5,
          circle_r = ctx_c*.75,
          ctx = this.el.gacha_can.getContext('2d');
    let arc_c = 0,
        arr = [{},{},{},{},{},{},{}],
        st = [];
    this.el.gacha_can.setAttribute('width',ctx_w+'px');
    this.el.gacha_can.setAttribute('height',ctx_w+'px');
    let grd = ctx.createLinearGradient(15, ctx_w-30, ctx_w-30, 15);
    grd.addColorStop(0, "rgb(0,147,255)");
    grd.addColorStop(1, "rgb(0,255,199)");
    for(let i = 0; i < 7; ++i){
      st[i] = ch_data['st'+i];
      arc_c = st[i]/state_per[i]*circle_r;
      arr[i].x = Math.cos(arc_r*i)*arc_c+ctx_c;
      arr[i].y = Math.sin(arc_r*i)*arc_c+ctx_c;
      arr[i].x_ = Math.cos(arc_r*i)*ctx_c;
      arr[i].y_ = Math.sin(arc_r*i)*ctx_c;
    }

    //배경1
    ctx.beginPath();
    ctx.fillStyle = 'rgb(50,50,50)';
    for(let i = 0; i < 7; ++i){
      const tx = arr[i].x_+ctx_c,
            ty = arr[i].y_+ctx_c;
      ctx.lineTo(tx,ty);
    }
    ctx.lineTo(arr[0].x_+ctx_c,arr[0].y_+ctx_c);
    ctx.closePath();
    ctx.fill();

    //배경2
    ctx.beginPath();
    ctx.fillStyle = 'rgb(25,25,25)';
    for(let i = 0; i < 7; ++i){
      const tx = arr[i].x_*.9+ctx_c,
            ty = arr[i].y_*.9+ctx_c;
      ctx.lineTo(tx,ty);
    }
    ctx.lineTo(arr[0].x_*.9+ctx_c,arr[0].y_*.9+ctx_c);
    ctx.closePath();
    ctx.fill();

    //배경3
    ctx.beginPath();
    ctx.fillStyle = 'rgb(0,0,0)';
    for(let i = 0; i < 7; ++i){
      const tx = arr[i].x_*.8+ctx_c,
            ty = arr[i].y_*.8+ctx_c;
      ctx.lineTo(tx,ty);
    }
    ctx.lineTo(arr[0].x_*.8+ctx_c,arr[0].y_*.8+ctx_c);
    ctx.closePath();
    ctx.fill();

    //능력치 면
    ctx.beginPath();
    ctx.fillStyle = grd;
    for(let i = 0; i < 7; ++i){
      ctx.lineTo(arr[i].x,arr[i].y);
    }
    ctx.lineTo(arr[0].x,arr[0].y);
    ctx.fill();

    //색상 라인
    // ctx.lineWidth = 1;
    // for(let i = 0; i < 7; ++i){
    //   ctx.beginPath();
    //   ctx.strokeStyle = st_c[i];
    //   ctx.moveTo(ctx_c,ctx_c);
    //   ctx.lineTo(arr[i].x,arr[i].y);
    //   ctx.stroke();
    // }

    //글씨 배경
    ctx.shadowColor = '#000';
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 4;
    for(let i = 0; i < 7; ++i){
      ctx.beginPath();
      ctx.fillStyle = st_c[i];
      const tx = arr[i].x_*.85+ctx_c,
            ty = arr[i].y_*.85+ctx_c;
      ctx.roundedRectangle(tx-13,ty-9,26,16,8);
      ctx.fill();
    }

    //원형
    ctx.fillStyle = '#fff';
    for(let i = 0; i < 7; ++i){
      ctx.beginPath();
      ctx.fillStyle = st_c[i];
      ctx.arc(arr[i].x,arr[i].y,2.5,0,Math.PI*2);
      ctx.fill();
    }
    ctx.restore();

    //글씨
    ctx.beginPath();
    ctx.font = '11px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#fff';
    for(let i = 0; i < 7; ++i){
      const tx = arr[i].x_*.85+ctx_c,
            ty = arr[i].y_*.85+ctx_c;
      ctx.fillText(st_t[i],tx,ty);
    }

    // ctx.beginPath();
    // ctx.font = '13px Arial';
    // ctx.fillStyle = '#f60';
    // ctx.textAlign = 'center';
    // for(let i = 0; i < 7; ++i){
    //   ctx.fillText(st[i],arr[i].x,arr[i].y);//능력치 글씨
    // }
    
    html.state = '';
    html.state += '<ul>';
    html.state += '<li><dl>';
    html.state +=   '<dt>State (능력치)</dt>';
    html.state +=   '<dd>';
    for(let i = 0;i < 7; ++i){
      html.state +=   '<span class="st st'+i+'">'+ch_data['st'+i]+' ('+st_t[i]+')</span>';
    }
    html.state +=   '</dd>';
    html.state += '</dt></li>';
    html.state += '</li>';
    html.state += '<li><dl>';
    html.state +=   '<dt>Growth (성장)</dt>';
    html.state +=   '<dd><span>'+gameData.stateType[ch_data.stateType].na+'</span></dd>';
    html.state += '</dt></li>';
    html.state += '</li>';
    html.state += '<li><dl>';
    html.state +=   '<dt>Relation (인연)</dt>';
    html.state +=   '<dd>';
    ch_data.relation.forEach((v)=>{
      html.state += '<span>'+gameData.relation[v.idx].na +'</span>';
    });
    html.state +=   '</dd>';
    html.state += '</li>';
    html.state += '<li><dl>';
    html.state +=   '<dt>Skill (스킬)</dt>';
    html.state +=   '<dd><span>스킬1</span></dd>';
    html.state += '</li>';
    html.state += '</ul>';
    this.el.gacha_infoState.innerHTML = html.state;
  }
  getGrade(n,type){
    let arr;
    if(type === 'dia'){
      arr = [3,10,21,38,63,88];//2,4,9,15,29,25,25
    }else if(type === 'gold'){
      arr = [2,6,15,30,50,75];//3,7,11,17,25,25
    }
    let ch_arr = [];
    for(let i = 0 ; i < n ; ++i){
      const ran_count = Math.random()*100;
      let result_grade = 0;
      if(ran_count < arr[0]){//7등급
        result_grade = 6;
      }else if(ran_count < arr[1]){//6등급
        result_grade = 5;
      }else if(ran_count < arr[2]){//5등급
        result_grade = 4;
      }else if(ran_count < arr[3]){//4등급
        result_grade = 3;
      }else if(ran_count < arr[4]){//3등급
        result_grade = 2;
      }else if(ran_count < arr[5]){//2등급
        result_grade = 1;
      }else{//1등급
        result_grade = 0;
      }
      ch_arr.push(result_grade);
    }
    const clone_arr = ch_arr.slice();
    const maxGrade = ch_arr.sort((a,b)=>b-a)[0];
    return {arr:clone_arr,maxGrade:maxGrade < 3 ? 3 : maxGrade};
  }
  makeCard(n,arr){
    let html = '';
    const ww = 30,
        hh = 30*1.481;
    for(let i = 0 ; i < n ; i++){
      const idx = this.getCardIdx(arr[i]);
      this.arr_ch.push(idx);
      html += '<div class="card" data-grade="'+gameData.ch[idx].grade+'" style="left:'+Math.random()*100+'%;top:'+(Math.random()*40+60)+'%;width:'+ww+'%;padding-top:'+hh+'%;transform:translate(-50%,-50%) rotateX(45deg) rotateZ('+Math.random()*360+'deg);"><div class="front" style="box-shadow:0 0 40px '+gameData.chGradeColor[gameData.ch[idx].grade*1]+',0 0 10px '+gameData.chGradeColor[gameData.ch[idx].grade*1]+',0 0 3px '+gameData.chGradeColor[gameData.ch[idx].grade*1]+'">';
      html += '<ul>';
      html += '<li class="name_lv">';
      html +=   '<img class="img" src="./images/card/card_name.png"/>';
      html +=   '<span class="lv">1</span><span class="name">'+gameData.ch[idx].na1+'</span>';
      html += '</li>';
      html += '<li class="ch" style="background-image:url(./images/ch/ch'+gameData.ch[idx].display+'.png);"></li>';
      html += '<li class="ch_style" style="background-image:url(./images/ch_style/ch_style'+gameData.ch[idx].style+'.png);"></li>';
      html += '<li class="ring"></li>';
      html += '<li class="element" style="background-image:url(./images/ring/ring'+gameData.ch[idx].element+'.png);"></li>';
      html += '<li class="star">'+awb.ch.makeStar(gameData.ch[idx].grade*1)+'</li>';
      html += '<li class="frame"></li>';
      html += '</li></ul>';
      html += '</div><div class="back"></div></div>';
    }
    this.ch_saveIdx = awb.data.add_ch(this.arr_ch);//캐릭 데이터 저장
    return html;
  }
  getCardIdx(n){
    const length = gameData.chOfGrade[n].length,
          ran = Math.floor(Math.random()*length);
    return gameData.chOfGrade[n][ran].idx;
  }
}

class Lineup{
  constructor(){
    this.el = {};
    this.targetCh = null;
    this.slot_idx = 0;
    this.slot = {};
    this.cateNum = 0;
    new Promise((res,rej)=>{
      this.set_element();
      res();
    }).then(()=>{
      this.el.lineup_save.forEach((el,idx)=>{//슬롯 버튼 이벤트
        el.addEventListener('click',(e)=>{
          this.el.lineup_save.forEach((_el)=>{
            _el.classList.remove('on');
          });
          e.currentTarget.classList.add('on');
          awb.data.userData.lineup.select = idx;
          this.set_area();
        });
      });
      this.el.lineup_saveBt.addEventListener('click',()=>{//슬롯 저장 이벤트
        this.save_map();
      });
      this.el.lineup_cate.forEach((el,idx)=>{//진형 종류 이벤트
        el.addEventListener('click',(e)=>{
          this.set_area(idx);
        });
      });
      this.el.lineup_mapCh.forEach((el)=>{//맵 타겟 설정
        el.addEventListener('click',(e)=>{
          const ta = e.currentTarget;
          const chk = ta.classList.contains('on');
          this.targetCh = ta;
          this.el.lineup_mapCh.forEach((_el)=>{
            _el.classList.remove('on');
          });
          ta.classList.add('on');
          if(ta.classList.contains('has') && chk){
            const slot_num = awb.data.userData.lineup.select,
                  slot = awb.data.userData.lineup.save_slot[slot_num];
            this.targetCh.classList.remove('has');
            ta.innerHTML = '<span class="mapCh_"></span>';
            this.el.lineup_chList[ta.dataset.idx].classList.remove('selected');
            ta.dataset.idx = '';
            slot.num --;
          }
          this.set_lineupInfo(ta);
        });
      });
    }).then(()=>{
      this.display();
      this.set_area();
    });
    window.addEventListener('resize', this.reset.bind(this), false);
  }
  reset(){
    this.display();
    this.set_area();
  }
  set_element(){
    this.el.container = document.querySelector('.lineup_wrap');
    this.el.lineup_save = this.el.container.querySelectorAll('.lineup_save li');
    this.el.lineup_saveBt = this.el.container.querySelector('.save_submit');
    this.el.lineup_cate = this.el.container.querySelectorAll('.lineup_cate');
    this.el.lineup_map = this.el.container.querySelector('.lineup_map');
    this.el.lineup_mapCh = this.el.lineup_map.querySelectorAll('.mapCh');
    this.el.lineup_ch = this.el.container.querySelector('.lineup_ch');
    this.el.lineup_chList = null;
    this.el.lineup_info = this.el.container.querySelector('.lineup_info .lineup_na');
    this.el.lineup_cost = this.el.container.querySelector('.lineup_info .lineup_cost');
    this.el.lineup_cost_current = this.el.lineup_cost.querySelector('.cost_current');
    this.el.lineup_cost_total = this.el.lineup_cost.querySelector('.cost_total');
    this.el.lineup_chInfo = this.el.container.querySelectorAll('.lineup_chInfo li');
    this.el.lineup_chInfo_txt = this.el.container.querySelectorAll('.lineup_chInfo li .txt');
    this.el.lineup_chInfo_add = this.el.container.querySelectorAll('.lineup_chInfo li .add_txt');
  }
  set_lineupInfo(ta){
    if(!ta){
      return;
    }
    const idx = ta.dataset.idx;
    if(idx !== ''){
      const ch = awb.data.userData.ch[idx];
      this.set_lst(idx);
      let lst = '';
      this.el.lineup_chInfo_txt.forEach((el,_idx)=>{//인포창에 능력치 입력
        el.innerHTML = ch['tst_'+_idx];
      });
      this.el.lineup_chInfo_add.forEach((el,_idx)=>{
        lst = ch['lst'+_idx];
        if(ch['lst'+_idx] > 0){
          this.el.lineup_chInfo[_idx].classList.value = 'up';
        }else if(ch['lst'+_idx] < 0){
          this.el.lineup_chInfo[_idx].classList.value = 'down';
        }else{
          this.el.lineup_chInfo[_idx].classList.value = 'none';
        }
        el.innerHTML = lst;
      });
    }else{
      for(let i = 0;i < 9;++i){
        this.el.lineup_chInfo_txt[i].innerHTML = '';
        this.el.lineup_chInfo_add[i].innerHTML = '';
        this.el.lineup_chInfo[i].classList.value = '';
      }
    }
    this.set_cost();
  }
  set_cost(){
    const leader_map = gameData.lineup[this.slot.no].entry[0],
          leader_idx = this.el.lineup_mapCh[leader_map].dataset.idx;
    let cost_count = 0,
        leader_cost = 0;
    if(leader_idx !== ''){
      leader_cost = awb.data.userData.ch[leader_idx].rst0;
      this.el.lineup_cost_total.innerHTML = leader_cost//리더 통솔력
    }else{
      this.el.lineup_cost_total.innerHTML = 0; 
    }
    this.el.lineup_mapCh.forEach((el)=>{
      let ch_idx = el.dataset.idx;
      if(ch_idx !== ''){
        cost_count += awb.data.userData.ch[ch_idx].cost;
      }
    });
    this.el.lineup_cost_current.innerHTML = cost_count;//진형 이름
    if(cost_count > leader_cost){
      this.el.lineup_cost.classList.add('error');
    }else{
      this.el.lineup_cost.classList.remove('error');
    }
  }
  set_lst(idx){
    this.slot_idx = awb.data.userData.lineup.select;
    this.slot = awb.data.userData.lineup.save_slot[this.slot_idx];
    const lineup_idx = this.slot.no,//진형넘버
          lineup_num = this.slot.num,//인원수
          lineup_data = gameData.lineup[lineup_idx],
          lineup_entry = lineup_data.entry,
          lineup_eff = lineup_data.eff,
          map_idx = Number(this.targetCh.dataset.mapnum);
    let map_group;
    
    lineup_entry.forEach((arr,arr_idx)=>{
      arr.map((v)=>{
        if(v === map_idx){
          map_group = arr_idx;
          return;
        }
      });
    });
    const lst_arr = st(lineup_eff[map_group],lineup_num);

    // lineup_name,lineup_entry,lineup_eff
    for(let i = 0; i < 9; ++i){//lineup state(라인업 능력치)
      awb.data.userData.ch[idx]['lst'+i] = lst_arr[i];
    }
    for(let i = 0; i < 9; ++i){//last state(라인업 + 아이템 최종 능력치)
      awb.data.userData.ch[idx]['tst_'+i] = Math.round(awb.data.userData.ch[idx]['tst'+i] + (awb.data.userData.ch[idx]['tst'+i] * 0.01 * awb.data.userData.ch[idx]['lst'+i]));
    }
    function st(obj,lineupnum){
      let arr = [0,0,0,0,0,0,0,0,0];
      const num = lineupnum - 1;
      for(let v in obj){
        switch(v){
          case 'HP':
            arr[0] += obj[v][num];
            break;
          case 'SP':
            arr[1] += obj[v][num];
            break;
          case 'RSP':
            arr[3] += obj[v][num];
            break;
          case 'ATK':
            arr[3] += obj[v][num];
            break;
          case 'DEF':
            arr[4] += obj[v][num];
            break;
          case 'MAK':
            arr[5] += obj[v][num];
            break;
          case 'MDF':
            arr[6] += obj[v][num];
            break;
          case 'RCV':
            arr[7] += obj[v][num];
            break;
          case 'SPD':
            arr[8] += obj[v][num];
            break;
        }
      }
      return arr;
    }
  }
  set_area(idx){
    this.slot_idx = awb.data.userData.lineup.select;
    this.slot = awb.data.userData.lineup.save_slot[this.slot_idx];
    const _idx = idx !== undefined ? idx : this.slot.no;
    this.el.lineup_save[this.slot_idx].classList.add('on');
    this.el.lineup_map.classList.value = 'lineup_map lineup_pos lineup'+_idx;
    this.slot.no = _idx;
    
    this.el.lineup_info.innerHTML = gameData.lineup[this.slot.no].na;//진형 이름
    this.el.lineup_mapCh.forEach((el)=>{
      el.querySelector('.mapCh_').innerHTML = '';
      el.classList.remove('has');
      el.dataset['idx'] = '';
    });
    for (let v in this.slot.entry) {//빈 entry 삭제
      if (this.slot.entry[v] === null || this.slot.entry[v] === undefined || this.slot.entry[v] === '') {
        delete this.slot.entry[v];
      }
    }
    this.el.lineup_chList.forEach((el)=>{
      el.classList.remove('selected');
    });
    this.slot.num = 0;
    for(let v in this.slot.entry){
      const ch_idx = this.slot.entry[v];
      this.el.lineup_chList[ch_idx].classList.add('selected');
      this.slot.num++;
    }
    for(let v in this.slot.entry){//맵 캐릭 셋팅
      const ch_idx = this.slot.entry[v],
            el = this.el.lineup_mapCh[v];
      el.classList.add('has');
      el.dataset['idx'] = ch_idx;
      el.querySelector('.mapCh_').innerHTML = this.createMapCh(awb.data.userData.ch[ch_idx]);
    }
    this.cateNum = _idx;
    this.el.lineup_cate.forEach((_el)=>{
      _el.classList.remove('on');
    });
    this.el.lineup_cate[_idx].classList.add('on');
  }
  save_map(){
    this.slot_idx = awb.data.userData.lineup.select;
    this.slot = awb.data.userData.lineup.save_slot[this.slot_idx];
    this.el.lineup_mapCh.forEach((v,idx)=>{
      this.slot.entry[idx] = v.dataset.idx;
    });
    this.slot.no = this.cateNum;
    let data = awb.data.get_data();
    data.ch = awb.data.userData.ch;
    data.lineup = awb.data.userData.lineup;
    awb.data.save_data(data);
  }
  createMapCh(v){
    const ch = gameData.ch[v.idx];
    let html = '';
    html +=   '<span class="lv" style="background-color:'+gameData.chGradeColor[ch.grade]+'">'+v.lv+'</span>';
    html +=   '<span class="ch" style="background-image:url(./images/ch/ch'+ch.display+'.png"></span>';
    html +=   '<span class="ch_style" style="background-image:url(./images/ch_style/ch_style'+ch.style+'.png"></span>';
    html +=   '<span class="ring"></span>';
    if(v.lv === 50){
      html +=   '<span class="element" style="background-image:url(./images/ring/ring'+ch.element+'.png"></span>';
      html +=   '<span class="element_1" style="background-image:url(./images/sring/sring'+ch.element+'.png"></span>';
      html +=   '<span class="element_2" style="background-image:url(./images/ssring/ssring'+ch.element+'.png"></span>';
    }else if(v.lv > 30){
      html +=   '<span class="element" style="background-image:url(./images/ring/ring'+ch.element+'.png"></span>';
      html +=   '<span class="element_1" style="background-image:url(./images/sring/sring'+ch.element+'.png"></span>';
    }else{
      html +=   '<span class="element" style="background-image:url(./images/ring/ring'+ch.element+'.png"></span>';
    }
    html +=   '<span class="frame"></span>';
    return html;
  }
  display(){
    let html = '';
    html += '<ul>';
    awb.data.userData.ch.forEach((v,idx)=>{
      html += '<li data-idx="'+idx+'">';
      html += this.createMapCh(v);
      html += '</li>';
    });
    html += '</ul>';
    this.el.lineup_ch.innerHTML = html;
    this.el.lineup_chList = this.el.lineup_ch.querySelectorAll('li');
    this.el.lineup_chList.forEach((el)=>{
      el.addEventListener('click',(e)=>{//캐릭 카드 클릭시 동작
        const ta = e.currentTarget,
              chk = ta.classList.contains('selected'),
              slot_num = awb.data.userData.lineup.select,
              slot = awb.data.userData.lineup.save_slot[slot_num];
        if(this.targetCh && !chk){//선택된 맵 타겟이 있나 확인
          const v = awb.data.userData.ch[ta.dataset.idx]
          if(this.targetCh.querySelector('.ch')){
            this.el.lineup_chList[this.targetCh.dataset.idx].classList.remove('selected');
            slot.num --;
          }
          this.targetCh.classList.add('has');
          this.targetCh.querySelector('.mapCh_').innerHTML = this.createMapCh(v);//맵 타겟에 카드셋팅
          this.targetCh.dataset.idx = ta.dataset.idx;//맵 타겟 idx부여
          ta.classList.add('selected');//하단 카드 선택상태
          slot.num ++;
        }
        this.set_lineupInfo(this.targetCh);
      });
    });
  }
}

class Battle{
  constructor(){
    this.el = {};
    this.unit_w = Math.floor((window.innerHeight-44)*.45);
    this.set_element();
    this.display();
    window.addEventListener('resize', this.reset.bind(this), false);
  }
  set_element(){
    this.el.container = document.querySelector('.battle_wrap');
    this.el.area = this.el.container.querySelector('.battle_area');
    this.el.units = this.el.area.querySelector('.battle_units');
    this.el.ally = this.el.units.querySelector('.units_ally');
    this.el.enemy = this.el.units.querySelector('.units_enemy');
    this.el.land = this.el.area.querySelector('.battle_land');
    this.el.ally_l = this.el.land.querySelector('.land_ally');
    this.el.enemy_l = this.el.land.querySelector('.land_enemy');
  }
  reset(){
    this.unit_w = Math.floor((window.innerHeight-44)*.45);
    this.display();
  }
  display(){
    this.set_unit();
  }
  set_unit(){
    const lineup = awb.data.userData.lineup.save_slot[awb.data.userData.lineup.select];
    let ally_html = '',
        enemy_html  ='',
        allyLand_html = '',
        enemyLand_html = '';
    for(let i = 0; i < 25; ++i){
      const left = i%5*20,
            top = Math.floor(i/5)*15,
            left_ = i%5-2,
            battle_top = Math.abs(left_)*3,
            ally_top = (2-Math.abs(left_))*3;
      if(lineup.entry[i]){
        const ch = awb.data.userData.ch[lineup.entry[i]];
        ally_html += '<div class="battle_ch" data-ch="'+ch.display+'" data-idx="'+i+'"style="left:'+(left+left_)+'%;top:'+(top+ally_top)+'%;z-index:'+(i+1)+';">';
        ally_html +=   '<div class="ch_box">';
        ally_html +=     '<span class="ring_back" style="background-image:url(./images/ring/back.png),url(./images/ring/ring'+ch.element+'.png);"></span>';
        ally_html +=     '<span class="ring_style"><span style="background-image:url(./images/ssring/ssring'+ch.element+'.png);"></span></span>';
        ally_html +=     '<span class="ch_style" style="background-image:url(./images/ch_style/ch_style'+ch.style+'.png),url(./images/ch/ch'+ch.display+'.png);"></span>';
        ally_html +=   '</div>';
        ally_html += '</div>';
      }else{
        ally_html += '<div class="battle_ch" data-idx="'+i+'"style="left:'+(left+left_)+'%;top:'+(top+ally_top)+'%;">';
        ally_html +=   '<div class="ch_box"></div>';
        ally_html += '</div>';
      }
      const ll = Math.floor(Math.random()*4);
      allyLand_html += '<div class="land l'+ll+'" style="left:'+(left+left_)+'%;top:'+(top+ally_top+12)+'%;"></div>';

      enemy_html += '<div class="battle_ch" data-idx="'+i+'" style="left:'+(80-left-left_)+'%;top:'+(60-top+battle_top+8)+'%;z-index:'+(25-i)+';">';
      enemy_html +=   '<div class="ch_box">';
      enemy_html +=     '<span class="ring_back" style="background-image:url(./images/ring/back.png),url(./images/ring/ring3.png);"></span>';
      enemy_html +=     '<span class="ring_style"><span style="background-image:url(./images/ssring/ssring3.png);"></span></span>';
      enemy_html +=     '<span class="ch_style" style="background-image:url(./images/ch_style/ch_style1.png),url(./images/ch/ch0.png);"></span>';
      enemy_html +=   '</div>';
      enemy_html += '</div>';
      enemyLand_html += '<div class="land" style="left:'+(80-left-left_)+'%;top:'+(60-top+battle_top+20)+'%;"></div>';
    }
    this.el.ally.style.width = this.el.ally.style.height = this.el.enemy.style.width = this.el.enemy.style.height = this.el.ally_l.style.width = this.el.ally_l.style.height = this.el.enemy_l.style.width = this.el.enemy_l.style.height = this.unit_w+'px';
    this.el.ally.innerHTML = ally_html;
    this.el.enemy.innerHTML = enemy_html;
    this.el.ally_l.innerHTML = allyLand_html;
    this.el.enemy_l.innerHTML = enemyLand_html;
  }
}