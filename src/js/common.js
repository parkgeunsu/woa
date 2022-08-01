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