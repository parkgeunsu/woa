import { items } from "gamedata/items"

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
  getEnemyState: (enemyData, gameData) => {
    const stateArr = gameData.stateName;
    let battleState_ = [];
    let enemy = {};
    const itemEff = util.getItemEff('', enemyData, gameData.items, true);
    stateArr.forEach((el,index)=>{
      const st = gameData.ch[enemyData.idx]['st'+index],
        per_current = gameData.stateType[2].arr[enemyData.lv-1]*0.01,
        stateCurrent = Math.round(st*per_current);
      battleState_[index] = stateCurrent;
    });
    battleState_[7] = gameData.ch[enemyData.idx].st3 + gameData.ch[enemyData.idx].st5 + gameData.ch[enemyData.idx].st6;
    battleState_[8] = Math.round(Math.random()*200);
    const battleState = util.getTotalState(battleState_);
    //등급에 따른 추가 능력치
    let addGradePercent = 1;
    for (let i = gameData.ch[enemyData.idx].grade; i < enemyData.grade; ++i) {
      addGradePercent *= gameData.addGradeArr[i];
    }
    battleState.forEach((bState, index) => {
      const iSt = util.compileState(bState, itemEff[index]);
      enemy = {
        ...enemy,
        ['iSt' + index]: iSt,
        ['bSt' + index]: (index !== 1 && index !== 2 && index !== 8 && index !== 9) ? Math.round(bState * addGradePercent) : bState,
      }
    });
    gameData.element.forEach((elData, index) => {
      enemy = {
        ...enemy,
        ['el' + index]: gameData.animal_type[gameData.ch[enemyData.idx].animal_type].element[index],
      }
    });
    const element = enemyData.element || gameData.ch[enemyData.idx].element;
    element.forEach((elData) => {
      if (elData === 6) { //빛속성 경우
        enemy = {
          ...enemy,
          el7: Math.round(enemy.el7 - 50 * (enemyData.grade / 5)),
        }
      } else if (elData === 7) { //암속성 경우
        enemy = {
          ...enemy,
          el6: Math.round(enemy.el6 - 50 * (enemyData.grade / 5)),
        }
      } else if (elData === 8) { //수속성 경우
        enemy = {
          ...enemy,
          el8: Math.round(enemy.el8 + 20 * (enemyData.grade / 5)),
          el9: Math.round(enemy.el9 + 50 * (enemyData.grade / 5)),
        }
      } else if (elData === 9) { //화속성 경우
        enemy = {
          ...enemy,
          el9: Math.round(enemy.el9 + 20 * (enemyData.grade / 5)),
          el10: Math.round(enemy.el10 + 50 * (enemyData.grade / 5)),
        }
      } else if (elData === 10) { //바람속성 경우
        enemy = {
          ...enemy,
          el10: Math.round(enemy.el10 + 20 * (enemyData.grade / 5)),
          el11: Math.round(enemy.el11 + 50 * (enemyData.grade / 5)),
        }
      } else if (elData === 11) { //땅속성 경우
        enemy = {
          ...enemy,
          el11: Math.round(enemy.el11 + 20 * (enemyData.grade / 5)),
          el8: Math.round(enemy.el8 + 50 * (enemyData.grade / 5)),
        }
      }
    });
    enemy = {
      ...enemy,
      stateLuk: battleState_[8],
    }
    return enemy;
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
    battleState_[8] = saveChSlot.stateLuk;
    //등급에 따른 추가 능력치
    let addGradePercent = 1;
    for (let i = gameData.ch[saveChSlot.idx].grade; i < obj.grade; ++i) {
      addGradePercent *= gameData.addGradeArr[i];
    }
    const battleState = util.getTotalState(battleState_);
    battleState.forEach((bState, index) => {
      const iSt = util.compileState(bState, obj.itemEff[index]);
      saveChSlot = {
        ...saveChSlot,
        ['iSt' + index]: iSt,
        ['bSt' + index]: (index !== 1 && index !== 2 && index !== 8 && index !== 9) ? Math.round(bState * addGradePercent) : bState,
      }
    });
    // console.log(saveChSlot);//animal_type
    gameData.element.forEach((elData, index) => {
      saveChSlot = {
        ...saveChSlot,
        ['el' + index]: gameData.animal_type[gameData.ch[saveChSlot.idx].animal_type].element[index],
      }
    });
    const element = saveChSlot.element || gameData.ch[saveChSlot.idx].element;
    element.forEach((elData, index) => {
      if (elData === 6) { //빛속성 경우
        saveChSlot = {
          ...saveChSlot,
          el7: Math.round(saveChSlot.el7 - 50 * (obj.grade / 5)),
        }
      } else if (elData === 7) { //암속성 경우
        saveChSlot = {
          ...saveChSlot,
          el6: Math.round(saveChSlot.el6 - 50 * (obj.grade / 5)),
        }
      } else if (elData === 8) { //수속성 경우
        saveChSlot = {
          ...saveChSlot,
          el8: Math.round(saveChSlot.el8 + 20 * (obj.grade / 5)),
          el9: Math.round(saveChSlot.el9 + 50 * (obj.grade / 5)),
        }
      } else if (elData === 9) { //화속성 경우
        saveChSlot = {
          ...saveChSlot,
          el9: Math.round(saveChSlot.el9 + 20 * (obj.grade / 5)),
          el10: Math.round(saveChSlot.el10 + 50 * (obj.grade / 5)),
        }
      } else if (elData === 10) { //바람속성 경우
        saveChSlot = {
          ...saveChSlot,
          el10: Math.round(saveChSlot.el10 + 20 * (obj.grade / 5)),
          el11: Math.round(saveChSlot.el11 + 50 * (obj.grade / 5)),
        }
      } else if (elData === 11) { //땅속성 경우
        saveChSlot = {
          ...saveChSlot,
          el11: Math.round(saveChSlot.el11 + 20 * (obj.grade / 5)),
          el8: Math.round(saveChSlot.el8 + 50 * (obj.grade / 5)),
        }
      }
    });
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
          grade: saveCh[idx].grade || gameData.ch[saveCh[idx].idx].grade,
          newState: {},
        }, saveData, gameData);
      });
    }
    return {
      ...saveData,
      ch: saveCh,
    }
  },
  getItemEff: (idx, saveCh, gameItem, enemy) => {
    let saveItems = {};
    if (enemy) {
      saveItems = saveCh.items;
    } else {
      saveItems = typeof idx === 'number' ? saveCh[idx].items : [{}, {}, {}, {}, {}, {}, {}, {}];
    }
    //eff type(효과 dmg_type&buff_type) 체력HP(0), 행동SP(1), 행동회복RSP(2), 공ATK(3), 방DEF(4), 술공MAK(5), 술방MDF(6), 회복RCV(7), 속도SPD(8), 찌르기(10),할퀴기(11),물기(12),치기(13),누르기(14), 명(20),암(21),수(22),화(23),풍(24),지(25), 진형(100)
    let effData = [];
    saveItems.forEach((item) => {
      if(Object.keys(item).length !== 0){
        item.baseEff.forEach((eff) => {
          if(effData[eff.type] === undefined) {
            effData[eff.type] = {percent:0, number:0};
          }
          if(eff.num[item.grade - 1].indexOf('%') > 0){
            effData[eff.type].percent = effData[eff.type].percent + parseInt(eff.num[item.grade - 1]);
          }else{
            effData[eff.type].number = effData[eff.type].number + parseInt(eff.num[item.grade - 1]);
          }
        });
        item.addEff.forEach((eff) => {
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
    for ( let i = 0; i < 10; ++i ) {
      let num = 0;
      switch(i){
        case 0://HP
          num = state[1]*5+state[0]*3;
          break;
        case 1://SP
          num = state[7]*.2;
          break;
        case 2://RSP
          num = (state[7]*.2+2)*.2;
          break;
        case 3://ATK
          num = state[2]*3+state[0]*1.5;
          break;
        case 4://DEF
          num = state[0]*2+state[3]*2;
          break;
        case 5://MAK
          num = state[4]*2.5+state[5];
          break;
        case 6://MDF
          num = state[5]*2+state[3]*2;
          break;
        case 7://RCV
          num = state[6]+(state[0]*1.5+state[5]*1.5)*.2;
          break;
        case 8://SPD
          num = state[3]+state[0]*.3;
          break;
        case 9://LUK
          num = state[8];
          break;
        default:
          break;  
      }
      stateArr[i] = Math.round(num);
    }
    return stateArr;
  },
  getLineupSt: (lineupType, lineupNum, ch, peopleLength, gameData) => {
    let effArr = [];
    if (!ch) {
      effArr.push([[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]);
    } else {
      let arr = [0,0,0,0,0,0,0,0,0,0];
      const eff = gameData.lineup[lineupType].eff[lineupNum];
      const peopleNum = peopleLength - 1 < 0 ? 0 : peopleLength - 1;
      for(let v in eff){
        switch(v){
          case 'HP':
            arr[0] += eff[v][peopleNum];
            break;
          case 'SP':
            arr[1] += eff[v][peopleNum];
            break;
          case 'RSP':
            arr[3] += eff[v][peopleNum];
            break;
          case 'ATK':
            arr[3] += eff[v][peopleNum];
            break;
          case 'DEF':
            arr[4] += eff[v][peopleNum];
            break;
          case 'MAK':
            arr[5] += eff[v][peopleNum];
            break;
          case 'MDF':
            arr[6] += eff[v][peopleNum];
            break;
          case 'RCV':
            arr[7] += eff[v][peopleNum];
            break;
          case 'SPD':
            arr[8] += eff[v][peopleNum];
            break;
          case 'LUK':
            arr[9] += eff[v][peopleNum];
            break;
        }
      }
      let effNum = [];
      arr.forEach((effData, idx) => {
        effNum[idx] = [[], []];
        effNum[idx][0] = effData;
        effNum[idx][1] = effData * ((ch['bSt' + idx] + ch['iSt' + idx]) / 100);
        if(effData === NaN) console.log('pgs');
      })
      effArr.push(effNum);
    }
    return effArr;
  },
  setLineupSt: (dataObj, gameData, saveData, changeSaveData) => {
    let save = {...saveData};
    save.lineup.save_slot[dataObj.saveSlot].no = dataObj.lineupType;
    save.lineup.save_slot[dataObj.saveSlot].entry = dataObj.useList;
    let peopleLength = [0,0,0,0,0,0,0,0];
    const ConvertlineupStIdx = save.lineup.save_slot.map((data, idx) => { // 슬롯당 lineup eff번호
      const lineSlot = data.no;
      const lineupArea = gameData.lineup[lineSlot];
      let lineNum = [];
      data.entry.forEach((entry_data, entry_idx) => {
        if (entry_data !== '') {
          let line = '';
          lineupArea.entry.forEach((line_data, line_idx) => {
            line_data.forEach((lineData) => {
              if (lineData === entry_idx) {
                line = line_idx;
                return;
              }
            });
          });//엔트리 라인 확인
          lineNum.push(line);
          peopleLength[idx] ++;
        } else {
          lineNum.push('');
        }
      });
      return lineNum;
    });
    //lineupSt 저장
    let saveLineupSlot = [
      ...save.lineup.save_slot,
    ];
    ConvertlineupStIdx.forEach((data, idx) => {
      save.lineup.save_slot[idx].num = peopleLength[idx];
      const lineupType = save.lineup.save_slot[idx].no;
      saveLineupSlot[idx].eff = [];
      data.forEach((lineupData, lineupIdx) => {
        const chIdx = save.lineup.save_slot[idx].entry[lineupIdx];
        const ch = save.ch[chIdx];
        saveLineupSlot[idx].eff.push(...util.getLineupSt(lineupType, lineupData, ch, peopleLength[idx], gameData));
      });
    });
    save.lineup.save_slot = saveLineupSlot;
    changeSaveData(save);//라인업 캐릭 능력치 저장
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
    const co = num/max*765;
    if(co < 255){
      return 'rgb('+co+',0,0)';
    } else if (co < 510) {
      return 'rgb(255,'+co%255+',0)';
    }else{
      return 'rgb(255,255,'+co%510+')';
    }
  },
  getPercent: (total, current) => { //퍼센트 계산
    if(current === 0){
      return 0;
    }else{
        return Math.round(current/total*100);
    }
  },
  getEffectType: (num, type) => {
    //eff type(효과 dmg_type&buff_type) 찌르기(0),할퀴기(1),물기(2),치기(3),누르기(4),독(11),명(12),암(13),수(14),화(15),풍(16),지(17), 공(21),방(22),술공(23),술방(24),HP(25),SP(26),RSP(27),속도(28),명중(29),진형(100)
    let arr = ['체력(HP)','행동력(SP)','행동회복력(RSP)','공격력(ATK)','방어력(DEF)','술법공격력(MAK)','술법방어력(MDF)','회복력(RCV)','속도(SPD)','행운(LUK)','찌르기','할퀴기','물기','치기','누르기','던지기','','','','','',
    '빛','어둠','물','불','바람','땅','빛 강화','어둠 강화','물 강화','불 강화',
    '바람 강화','땅 강화','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','진형'];
    let arr_ko = ['체력','행동력','행동회복력','공격력','방어력','술법공격력','술법방어력','회복력','속도','행운','찌르기','할퀴기','물기','치기','누르기','던지기','','','','','',
    '빛','어둠','물','불','바람','땅','어둠 강화','물 강화','불 강화',
    '바람 강화','땅 강화','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','진형'];
    let arr_en = ['HP','SP','RSP','ATK','DEF','MAK','MDF','RCV','SPD','LUK','Sting','Claw','Bite','Hit','Crush','Throw','','','','','',
    'Light','Darkness','Water','Fire','Wind','Earth','Enhancement Light','Enhancement Darkness','Enhancement Water','Enhancement Fire',
    'Enhancement Wind','Enhancement Earth','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','Formation'];

    //eff type(효과 dmg_type&buff_type) 체력HP(0), 행동SP(1), 행동회복RSP(2), 공ATK(3), 방DEF(4), 술공MAK(5), 술방MDF(6), 회복RCV(7), 속도SPD(8), 찌르기(10),할퀴기(11),물기(12),치기(13),누르기(14), 명(20),암(21),수(22),화(23),풍(24),지(25), 진형(100)
  
    if (type === 'en') {
      return arr_en[num];
    } else if (type === 'ko') {
      return arr_ko[num];
    } else {
      return arr[num];
    }
  },
  getEnemySkill: (data, gameData) => {
    const chData = gameData.ch[data.idx],
      animalSkill = gameData.animal_type[chData.animal_type].skill0,
      jobSkill = gameData.job[chData.job[0]].skill,
      skillArr = [2, ...animalSkill, ...jobSkill];
    const skillNums = [3,6,9,12,15],
      skillLength = skillNums[Math.floor(data.lv / 10) - 1];
    let skill = [{idx:1,lv:1,},{idx:2,lv:1,}]; //공격, 방어 기본 장착
    for(let i = 0; i < skillLength; ++i) {
      const Num = Math.floor(Math.random() * skillArr.length),
      skillIdx = skillArr[Num];
      let hasSkill = '';
      skill.forEach((data, idx) => {
        if (data.idx === skillIdx) {
          data.lv += 1;
          data.lv = data.lv > 5 ? 5 : data.lv;
          hasSkill = data;
          return;
        }
      });
      if (!hasSkill) {
        skill.push({
          idx: skillIdx,
          lv: 1,
        });
      }
    }
    return skill;
  },
  getSkill: (gameData, ch, slotIdx, saveData, changeSaveData) => {
    const chData = gameData.ch[ch.idx],
      animalSkill = gameData.animal_type[chData.animal_type].skill,
      jobSkill = gameData.job[chData.job].skill,
      skillArr = [...animalSkill, ...jobSkill];
    const skillNum = Math.floor(Math.random() * skillArr.length),
      skillIdx = skillArr[skillNum];
    const lvExp = [100,50,25,25];
    let hasSkill = '';
    saveData.ch[slotIdx].sk.forEach((data, idx) => {
      if (data.idx === skillIdx) {
        data.exp += lvExp[data.lv - 1];
        if (data.exp >= 100) {
          data.exp -= 100;
          data.lv += 1;
        }
        hasSkill = data;
        return;
      }
    });
    util.effect.skill(gameData.skill[skillIdx], hasSkill);
    if (!hasSkill) {
      saveData.ch[slotIdx].sk.push({
        idx: skillIdx,
        lv: 1,
        exp: 0,
      });
    }
    changeSaveData(saveData);
  },
  effect: {
    lvUp: () => {
      const lvUpContainer = document.getElementsByClassName('ch_card')[0];
      const lvElement = document.createElement('div');
      lvElement.setAttribute('class', 'lvEffect');
      if (lvUpContainer) {
        lvUpContainer.appendChild(lvElement);
        lvElement.innerHTML = '<span></span><span></span><span></span><span></span><span></span><span></span><span></span>';
      };
      setTimeout(() => {
        lvElement.classList.add("on");
        setTimeout(() => {
          const element = document.getElementsByClassName('lvEffect')[0];
          if(element) {
            element.remove();
          }
        }, 1600);
      }, 200);
    },
    skill: (skill, hasSkill) => {
      const skillContainer = document.getElementsByClassName('content')[0];
      const skillElement = document.createElement('div');
      skillElement.setAttribute('class', `skillEffect effect${skill.element_type}`);
      if (skillContainer) {
        skillContainer.appendChild(skillElement);
        if(!hasSkill){
          skillElement.innerHTML = `<div class="skillName newName1">${skill.na || '나몰라'} 획득</div><div class="skillName newName2">${skill.na || '나몰라'} 획득</div>`;
          setTimeout(() => {
            skillElement.classList.add("on");
            setTimeout(() => {
              skillElement.classList.add("fadeOut");
              setTimeout(() => {
                const element = document.getElementsByClassName('skillEffect')[0];
                if(element) {
                  element.remove();
                }
              }, 1000);
            }, 1200);
          }, 200);
        } else {
          skillElement.innerHTML = `<div class="skillName oldName">LV.${hasSkill.lv} ${skill.na || '나몰라'}<div class="skillExp"><em class="gradient_dark" style="width:${hasSkill.exp}%"></em></div></div>`;
          setTimeout(() => {
            skillElement.classList.add("fadeIn");
            setTimeout(() => {
              skillElement.classList.add("fadeOut");
              setTimeout(() => {
                const element = document.getElementsByClassName('skillEffect')[0];
                if(element) {
                  element.remove();
                }
              }, 1000);
            }, 1200);
          }, 200);
        }
      }
    }
  },
  // setNumber: (n) => {
  //   const sn = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
  //   return sn;
  // },
  // getBattleLineup: (n) => {
  //   return n;
  // },
  getStateName: (type) => {
    switch (type) {
      case 0:
        return 'HP';
      case 1:
        return 'SP';
      case 2:
        return 'RSP';
      case 3:
        return 'ATK';
      case 4:
        return 'DEF';
      case 5:
        return 'MAK';
      case 6:
        return 'MDF';
      case 7:
        return 'RCV';
      case 8:
        return 'SPD';
      case 9:
        return 'LUK';
      case 50:
        return 'BLEEDING';
      case 51:
        return 'ADDICTED';
      case 52:
        return 'PETRIFICATION';
      case 53:
        return 'CONFUSION';
      case 54:
        return 'FAINT';
      case 55:
        return 'TRANSFORM';
      case 100:
        return 'FORMATION';
      default:
        break;
    }
  },
  getMagicState: (type) => {
    switch (type) {
      case 0:
        return 'HP';
      case 1:
        return 'SP';
      case 2:
        return 'RSP';
      case 3:
        return 'ATK';
      case 4:
        return 'DEF';
      case 5:
        return 'MAK';
      case 6:
        return 'MDF';
      case 7:
        return 'RCV';
      case 8:
        return 'SPD';
      case 9:
        return 'ATK';
      case 10:
        return 'ATK';
      case 11:
        return 'ATK';
      case 12:
        return 'ATK';
      case 13:
        return 'ATK';
      case 14:
        return 'ATK';
      case 20:
        return 'ATK';
      case 16:
        return 'ATK';
      case 17:
        return 'ATK';
      case 18:
        return 'ATK';
      default:
        break;
    }
  },
  getPercentNumber: (plusNum, nowNum) => {
    if (plusNum.indexOf('%') > 0) {
      return nowNum * (parseInt(plusNum) / 100);
    } else {
      return nowNum + plusNum;
    }
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
      case 23: //자신
          num = [n];
      default:
        break;
    }
    return num;
  },
  setItemColor: (svgData, colorSet, id) => {
    let svg = svgData;
    const idPattern = new RegExp("==id==","g");
    svg = svg.replace(idPattern, id);
    colorSet.forEach((data, idx) => {
      const pattern = new RegExp("=="+idx+"==","g");
      svg = svg.replace(pattern, data);
    })
    return svg;
  },
  getRandomColor: () => {
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);
    return `rgba(${r},${g},${b},1)`;
  },
  getItemGrade: () => {
    const gradeNum = Math.random();
    if (gradeNum < 0.05) { //에픽등급
      return 4;
    } else if (gradeNum < 0.2) { //레어등급
      return 3;
    } else if (gradeNum < 0.7) { //매직등급
      return 2;
    } else {
      return 1;
    }
  },
  getItem: (saveData, gameData, changeSaveData, option, Save, lang) => {
    let save = {...saveData};//장비 아이템 복사
    let itemLv = option.lv;
    const type = option.type || 'equip';
    let item = '',
      itemData = {},
      itemLength = 0,
      weaponType = 0;
    if (typeof option.items === 'object') {//object["3-4-3","3-4-8"]
      item = option.items[Math.floor(Math.random() * option.items.length)];
      if (type === 'equip') {
        const items = item.split('-');
        itemData = items[0] === "3" ? gameData.items[type][items[0]][items[1]][0][items[2]] : gameData.items[type][items[0]][0][0][items[1]];
        if (items[0] === "3") {
          weaponType = items[1];
        }
      } else {
        itemData = gameData.items[type][item];
      }
    } else if (typeof option.items === 'string'){//string"3-4-3"
      item = option.items;
      if (type === 'equip') {
        const items = item.split('-');
        itemData = items[0] === "3" ? gameData.items[type][items[0]][items[1]][0][items[2]] : gameData.items[type][items[0]][0][0][items[1]];
        if (items[0] === "3") {
          weaponType = items[1];
        }
      } else {
        itemData = gameData.items[type][item];
      }
    } else {//number(그룹중 선택)34
      if (type === 'equip') {//장비일 경우
        const cate = String(option.items);
        if (cate.length > 1) {
          if(cate[0] === "3") {//무기일 경우
            itemLength = gameData.items[type][cate[0]][cate[1]][0].length;
            itemData = gameData.items[type][cate[0]][cate[1]][0][Math.floor(Math.random() * itemLength)];
            weaponType = cate[1];
          } else {//무기가 아닐 경우
            itemLength = gameData.items[type][option.items][0].length;
            itemData = gameData.items[type][option.items][0][Math.floor(Math.random() * itemLength)];
          }
        } else {
          const itemTypeLength = gameData.items[type][cate].length,
            itemType = String(Math.floor(Math.random() * itemTypeLength));
          if(cate === "3") {//무기일 경우
            itemLength = gameData.items[type][cate][itemType][0].length;
            itemData = gameData.items[type][cate][itemType][0][Math.floor(Math.random() * itemLength)];
            weaponType = itemType;
          } else {
            itemLength = gameData.items[type][cate][0][0].length;
            itemData = gameData.items[type][cate][0][0][Math.floor(Math.random() * itemLength)];
            weaponType = itemType;
          }
        }
      } else {//장비가 아닐 경우
        itemLength = gameData.items[type].length;
        itemData = gameData.items[type][Math.floor(Math.random() * itemLength)];
      }
    }
    // if (type === 'equip') {
    //   const items = item.split('-');//아이템 부위(장비만 해당)
    //   itemData = items[0] === 3 ? gameData.items[type][items[0]][0][items[1]][items[2]] : gameData.items[type][items[0]][0][0][items[1]];
    // } else {
    //   item = option.items;
    // }
    // const itemIdx = Math.floor(Math.random() * item.length),//아이템 번호
    //const selectItem = item[itemIdx];
    const id = Math.random().toString(36).substring(2, 11);
    const selectItem = itemData;
    if (option.sealed) {
      const itemObj = {
        id:id,
        idx:selectItem.idx,
        part:selectItem.part,
        grade:util.getItemGrade(),
        itemLv:option.lv,
        slot:0,//아이템 홀착용 갯수
        hole:[],
        color:selectItem.color,
        baseEff:[{
          type:selectItem.eff[0].type,
          num:selectItem.eff[0].num[0] + ' ~ ' + selectItem.eff[0].num[1],
        }],
        addEff:[],
        mark:'',
        markNum:0,
        modifier:{ko:'미개봉',en:'Sealed'},
        weaponType:weaponType,
        sealed:true,
      }
      save.items[type].push(itemObj);
      changeSaveData(save);
      return;
    }
    const grade = (option.grade > 1 ? option.grade : util.getItemGrade()) || util.getItemGrade();
    const slotNum = Math.round(Math.random() * selectItem.socket);
    let hole = new Array(slotNum).fill(0);
    let colorArr = Math.random() < .5 ? [gameData.items.item_point_light, gameData.items.item_point_dark] : [gameData.items.item_point_dark, gameData.items.item_point_light];
    const color = selectItem.color.map((data, idx) => {
      if (idx < 2) {
        const pointColor = Math.floor(Math.random() * colorArr[idx].length);
        return colorArr[idx][pointColor];
      } else {
        return util.getRandomColor();
      }
      // if (idx === 1) {
      //   light = light > 0 ? 0 : 155;
      // }
      // if (idx > 1) {
      //   ranNum = 155;
      //   light = 0;
      // }
      // for (let i = 0; i < 3; ++i) {
      //   colorArr[i] = Math.round(Math.random() * (100 + ranNum) + light);
      // }
      // console.log(`rgba(${colorArr[0]},${colorArr[1]},${colorArr[2]},1)`);
      // return gameData.items.item_point_color[pointColor];
      //util.getRandomColor();
    });
    const baseEff = selectItem.eff.map((data) => {
      let num = [];
      num[0] = String(Math.round(Math.random() * (Number(data.num[1]) - Number(data.num[0]))) + (Number(data.num[1]) - Number(data.num[0])));
      for (let i = 1; i < 4; ++i) {
        num[i] = String(Number(num[i - 1]) + Math.round(Number(data.num[0]) * 0.25 + Math.random() * (Number(data.num[0]) * .25)));
      }
      return {
        type: data.type,
        num: num,
      }
    });
    const addEff = [];
    const getAddEff = (grade) => {
      const effList = [// 레어, 에픽, 매직
        [[100,200],[200,400],[100,1000]], //체력
        [[1,10],[10,20],[1,30]], //행동력
        [[1,3],[3,6],[1,15]], //행동회복력
        [[50,100],[100,200],[50,400]], //공격력
        [[50,100],[100,200],[50,400]], //방어력
        [[50,100],[100,200],[50,400]], //술공
        [[50,100],[100,200],[50,400]], //술방
        [[10,30],[30,60],[10,100]], //회복력
        [[1,10],[10,25],[1,40]], //속도
        [[10,20],[20,50],[10,100]], //행운
        [[1,15],[5,15],[1,20]], //찌르기
        [[1,15],[5,15],[1,20]], //할퀴기
        [[1,15],[5,15],[1,20]], //물기
        [[1,15],[5,15],[1,20]], //치기
        [[1,15],[5,15],[1,20]], //누르기
        [[1,15],[5,15],[1,20]], //던지기
        [[1,15],[5,15],[1,20]], //빛
        [[1,15],[5,15],[1,20]], //어둠
        [[1,15],[5,15],[1,20]], //물
        [[1,15],[5,15],[1,20]], //불
        [[1,15],[5,15],[1,20]], //바람
        [[1,15],[5,15],[1,20]], //땅
        [[1,10],[5,10],[1,15]], //빛 강화
        [[1,10],[5,10],[1,15]], //어둠 강화
        [[1,10],[5,10],[1,15]], //물 강화
        [[1,10],[5,10],[1,15]], //불 강화
        [[1,10],[5,10],[1,15]], //바람 강화
        [[1,10],[5,10],[1,15]], //땅 강화
      ]
      const effType = Math.round(Math.random()*(Math.random() < .3 ? 27 : 21));//마법 강화 확률 30퍼센트 이하
      let effRandomNum = [];
      if (grade === 2) {
        effRandomNum = effList[effType][2];
      } else if (grade === 3) {
        effRandomNum = effList[effType][0];
      } else if (grade === 4) {
        effRandomNum = effList[effType][1];
      }
      const effNum = Math.floor(Math.random()*(effRandomNum[1] - effRandomNum[0])) + effRandomNum[0];
      return {
        type: effType > 15 ? effType + 5 : effType,
        num: [String(effNum)],
      }
    }
    if (grade === 2) {
      const addEffLength = Math.floor(itemLv / 30);
      for (let i = 0; i < addEffLength; ++i) {
        if (itemLv > 30) {
          itemLv -= 30;
          addEff.push(getAddEff(grade));
        } else {
          break;
        }
      }
    } else if (grade === 3) {
      const addEffLength = Math.floor(itemLv / 20);
      for (let i = 0; i < addEffLength; ++i) {
        if (itemLv > 20) {
          itemLv -= 20;
          addEff.push(getAddEff(grade));
        } else {
          break;
        }
      }
    } else if (grade === 4) {
      const addEffLength = Math.floor(itemLv / 15);
      for (let i = 0; i < addEffLength; ++i) {
        if (itemLv > 15) {
          itemLv -= 15;
          addEff.push(getAddEff(grade));
        } else {
          break;
        }
      }
    }
    const mark = Math.random() < .8 ? Math.round(Math.random() * 24) : '';
    const markNum = mark === '' ? 0 : (() => {
      const randomCount = Math.random();
      if (randomCount < .1) {
        return 4;
      } else if (randomCount < .3) {
        return 3;
      } else if (randomCount < .6) {
        return 2;
      } else {
        return 1;
      }
    })();
    const animalModifier = [`${mark !== '' ? gameData.animal_type[mark].na.ko : ''}${gameData.items.markModifier.ko[markNum]}`,`${gameData.items.markModifier.en[markNum]} ${mark !== '' ? gameData.animal_type[mark].na.en : ''}${markNum > 1 ? 's' : ''}`];
    const modifier = {ko:gameData.items.slotModifier.ko[slotNum] + ' ' + animalModifier[0],en:gameData.items.slotModifier.en[slotNum] + ' ' + animalModifier[1]};
    itemLv -= slotNum * 5;
    const itemObj = {
      id:id,
      idx:selectItem.idx,
      part:selectItem.part,
      grade:grade,
      slot:slotNum,//아이템 홀착용 갯수
      hole:hole,
      color:color,
      baseEff:baseEff,
      addEff:addEff,
      mark:mark,
      markNum:markNum,
      modifier:modifier,
      weaponType:weaponType,
      sealed:false,
    }
    if (Save) {
      if (typeof option.unpackSlot === 'number') {
        save.items[type].splice(option.unpackSlot,1,itemObj);
      } else {
        save.items[type].push(itemObj);
      }
      changeSaveData(save);
    } else {
      return itemObj;
    }
  },
  getAnimalPoint: (items, animal, addMark) => {
    let mark = 0;
    items.forEach((item) => {
      if (Object.keys(item).length !== 0 && animal === item.mark) {
        mark += item.markNum;
      }
    });
    return mark + addMark;
  },
  getTimeGap: (saveData, changeSaveData) => {
    const time = new Date();
    if (localStorage.getItem('closeTime')) {
      const timeGap = Math.floor((time.getTime() - new Date(localStorage.getItem('closeTime')).getTime())/1000);//마지막 접속시간과 현재시간과 차이
      saveData.ch.forEach((data) => {
        data.actionPoint += Math.floor(timeGap / 50);
        data.pointTime -= timeGap;
      });
      changeSaveData(saveData);
      console.log(saveData, timeGap);
      localStorage.setItem('closeTime', time);
    } else {
      localStorage.setItem('closeTime', time);
    }
  },
  getAnimalSkill: () => {
    
  },
  buttonEvent: (dataObj) => {
    dataObj.event.stopPropagation();
    console.log(dataObj);
    const gameData = dataObj.gameData;
    let sData = {...dataObj.saveData};
    if (dataObj.type === 'itemEnhancement') {

    } else if (dataObj.type === 'itemEquip') { //아이템 착용
      const invenPart = dataObj.data.saveItemData.part;
      let overlapCheck = true;
      const saveCh = sData.ch[dataObj.data.slotIdx];
      //아이템 무게 측정
      let currentKg = 0;
      let itemSubmit = false;
      const totalKg = Math.floor(gameData.ch[saveCh.idx].st1 / 0.3)/10;
      saveCh.items.forEach((item) => {
        if (Object.keys(item).length !== 0) {
          const itemsGrade = item.grade < 5 ? 0 : item.grade - 5;
          currentKg += item.part === 3 ? gameData.items.equip[item.part][item.weaponType][itemsGrade][item.idx].kg : gameData.items.equip[item.part][0][itemsGrade][item.idx].kg;
        }
      });
      const chType = gameData.ch[saveCh.idx].animal_type;
      if (dataObj.data.saveItemData.sealed) { //개봉된 아이템인지 확인
        dataObj.showMsg(true);
        dataObj.msgText("미개봉 아이템입니다.");
        return;
      }
      if (!dataObj.data.gameItem.limit[saveCh.job]) { //직업 착용가능 확인
        dataObj.showMsg(true);
        dataObj.msgText("착용이 불가능한 직업입니다.");
        return;
      }
      saveCh.items.forEach((item, itemSlot)=>{
        if (invenPart === gameData.animal_type[chType].equip[itemSlot] && overlapCheck) {//해당파트와 같은파트인지? && 빈칸인지? && 같은파트가 비었을경우 한번만 발생하게 
          if (item.idx === undefined) { //해당 슬롯이 비었을 비었을 경우
            currentKg += dataObj.data.gameItem.kg
            if (currentKg > totalKg) { //가능 무게를 넘어 갈 경우
              dataObj.showMsg(true);
              dataObj.msgText("착용하려는 장비가 무겁습니다.");
            } else { //착용 가능 무게일 경우
              saveCh.items[itemSlot] = {...dataObj.saveData.items['equip'][dataObj.data.itemSaveSlot]};//캐릭에 아이템 넣기
              if (dataObj.data.saveItemData.mark === gameData.ch[saveCh.idx].animal_type) {//동물 뱃지 수정
                saveCh.animalBeige += dataObj.data.saveItemData.markNum;
              }
              if (dataObj.data.gameItem.actionType !== '') {
                saveCh.newActionType = dataObj.data.gameItem.actionType;
              }
              sData.items['equip'].splice(dataObj.data.itemSaveSlot, 1);//인벤에서 아이템 제거
              overlapCheck = false;
              dataObj.changeSaveData(util.saveCharacter({//데이터 저장
                saveData: sData,
                slotIdx: dataObj.data.slotIdx,
                gameData: gameData,
              }));
              dataObj.showPopup(false);
              itemSubmit = true;
              return;
            }
          }
        }
      });
      if (!itemSubmit) { //해당 슬롯에 아이템이 있을 경우, 아이템 다른부위로 적용된 경우 파악
        dataObj.showMsg(true);
        dataObj.msgText("같은 부위에 이미 다른 아이템이 착용 중입니다.");
      }
    } else if (dataObj.type === 'itemRelease') { //아이템 해제
      const saveCh = sData.ch[dataObj.data.slotIdx];
      sData.items['equip'].push(dataObj.data.saveItemData);//인벤에 아이템 넣기
      sData.ch[dataObj.data.slotIdx].items[dataObj.data.itemSaveSlot] = {}; //아이템 삭제
      if (dataObj.data.saveItemData.mark === gameData.ch[saveCh.idx].animal_type) {//동물 뱃지 수정
        saveCh.animalBeige = util.getAnimalPoint(saveCh.items, gameData.ch[saveCh.idx].animal_type, saveCh.mark);
      }
      saveCh.animalSkill = saveCh.animalSkill.map((skGroup) => {//동물 스킬 초기화
        return skGroup.map((skData) => {
          if (Object.keys(skData).length !== 0) {
            return {
              idx:skData.idx,
              lv:0,
            }
          } else {
            return {}
          }
        });
      });
      saveCh.newActionType = [saveCh.actionType];
      saveCh.items.forEach((item, itemSlot) => {
        const chType = gameData.ch[saveCh.idx].animal_type;
        if (gameData.animal_type[chType].equip[itemSlot] === 3 && item.idx !== undefined) {
          const anotherWeaponActionType = gameData.items.equip[item.part][item.weaponType][0][item.idx].actionType;
          saveCh.newActionType = anotherWeaponActionType === '' ? [saveCh.actionType] : anotherWeaponActionType;
        }
      });
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
    } else if (dataObj.type === 'itemBuy') { //아이템 구입
      if (dataObj.data.type === 'equip') {
        sData.info.money -= (dataObj.data.gameItem.price < 1000 ? 1000 : dataObj.data.gameItem.price) * 2 * dataObj.data.gameItem.grade;
      } else if (dataObj.data.type === 'hole') {
        sData.info.money -= dataObj.data.gameItem.price * 2;
      } else {
        sData.info.money -= dataObj.data.gameItem.price;//돈 계산
      }
      sData.items[dataObj.data.type].push(dataObj.data.saveItemData);//아이템 추가
      dataObj.changeSaveData(sData);//데이터 저장
      dataObj.showPopup(false);
    }else if (dataObj.type === 'itemSell') { //아이템 판매
      console.log(dataObj.data.type);
      if (dataObj.data.type === 'equip' || dataObj.data.type === 'hole') {
        console.log(dataObj.data.gameItem.price, dataObj.data.gameItem.grade);
        sData.info.money += dataObj.data.gameItem.price * dataObj.data.gameItem.grade;//돈 계산
      } else {
        sData.info.money += dataObj.data.gameItem.price;//돈 계산
      }
      sData.items[dataObj.data.type].splice(dataObj.data.itemSaveSlot,1);//인벤에서 아이템 제거
      dataObj.changeSaveData(sData);//데이터 저장
      dataObj.showPopup(false);
    } else if (dataObj.type === 'itemUnpack') { //아이템 확인
      //sData.items[dataObj.data.type].splice(dataObj.data.itemSaveSlot,1);//인벤에서 아이템 제거
      const itemInfo = dataObj.data.saveItemData.part === 3 ? `${dataObj.data.saveItemData.part}-${dataObj.data.saveItemData.weaponType}-${dataObj.data.saveItemData.idx}` : `${dataObj.data.saveItemData.part}-${dataObj.data.saveItemData.idx}`;
      const option = {
        type:'equip',
        items:itemInfo,
        //아이템종류, 세부종류(검,단검), 매직등급
        grade:dataObj.data.saveItemData.grade,
        lv:dataObj.data.saveItemData.itemLv,
        sealed:false,
        unpackSlot:dataObj.data.itemSaveSlot,
      }
      util.getItem(sData, gameData, dataObj.changeSaveData, option, true, dataObj.lang);
      //dataObj.changeSaveData(sData);//데이터 저장
      // dataObj.showPopup(false);
    } else if (dataObj.type === 'holeEquip') {
      dataObj.showPopup(false);
    }
  }
}