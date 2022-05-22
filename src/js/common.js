'use strict';
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
}
class Ch{//4
  constructor(){
    this.el = {};
    this.data = awb.data.userData;
    this.ch_idx = 0;
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
  display(){
    const idx = this.ch_idx;//현재 캐릭터 순번

    this.el.st_type.innerHTML = gameData.stateType[this.data.ch[idx].stateType].na;
    this.el.ac_current.innerHTML = this.data.ch[idx].actionPoint;
    this.el.ac_max.innerHTML = this.data.ch[idx].st7;
    

    this.data.item_eff = [];//아이템 효과 초기화

    //items
    const ite = this.data.ch[idx].items,
        ite_length = ite.length,

    //equip
    for(let i = 0; i < 8; ++i){
      if(ite_length > i && Object.keys(ite[i]).length !== 0){
        this.saveItemEff(ite_,i);//아이템효과 저장
        this.data.ch[this.ch_idx].item_eff = this.data.item_eff;
    }
    
    //has items

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
    this.separation_grade();
    this.set_element();
    this.display();
    this.selectCard = 0;
    this.arr_ch = [];
    this.ch_saveIdx = [];
    this.el.gacha_info.addEventListener('click',(e)=>{
      this.el.gacha_info.classList.remove('on');
    });
    window.addEventListener('resize', this.reset.bind(this), false);
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