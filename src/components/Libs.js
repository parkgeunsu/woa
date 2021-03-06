import { forwardRef } from "react"

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
    //????????? ?????? ?????? ?????????
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
    element.forEach((elData, index) => {
      enemy = {
        ...enemy,
        ['el' + elData]: Math.round(enemy['el' + elData] + 50 * (enemyData.grade / 6)),
      }
    });
    enemy = {
      ...enemy,
      stateLuk: battleState_[8],
    }
    return enemy;
  },
  saveLvState: (saveSlot, obj, saveData, gameData) => {//?????? ????????? ????????? ????????? ??????(????????? ????????? ????????????, {????????????, ????????? ????????????...})
    const stateArr = gameData.stateName;
    let battleState_ = [];
    let saveChSlot = saveData.ch[saveSlot] || obj.newState;
    stateArr.forEach((el,index)=>{
      const st = gameData.ch[saveChSlot.idx]['st'+index],//?????? ?????????
        per_current = gameData.stateType[saveChSlot.stateType].arr[saveChSlot.lv-1]*0.01,//??????????????? ?????? LV??? %
        stateCurrent = Math.round(st*per_current),//??????????????? ?????? LV??? ?????????
        stateMax = Math.round(gameData.stateType[saveChSlot.stateType].arr[49]*0.01*st);//??????????????? ?????? ?????? ?????????
      saveChSlot = {
        ...saveChSlot,
        ['rSt' + index]: stateCurrent, //????????? ???????????????
        ['maxSt' + index]: stateMax, //????????? ???????????????
      }
      battleState_[index] = stateCurrent;
    });
    battleState_[7] = gameData.ch[saveChSlot.idx].st3 + gameData.ch[saveChSlot.idx].st5 + gameData.ch[saveChSlot.idx].st6;
    battleState_[8] = saveChSlot.stateLuk;
    //????????? ?????? ?????? ?????????
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
      saveChSlot = {
        ...saveChSlot,
        ['el' + elData]: Math.round(saveChSlot['el' + elData] + 50 * (obj.grade / 6)),
      }
    });
    saveChSlot = {
      ...saveChSlot,
      itemEff: obj.itemEff,
      grade: obj.grade || gameData.ch[saveChSlot.idx].grade, //????????? ??????
    }
    return saveChSlot;
  },
  saveCharacter: (dataObj) => { //????????? ????????? ????????????
    // console.log(dataObj);
    const gameData = dataObj.gameData;
    const saveData = dataObj.saveData;
    const gameItem = dataObj.gameData.items;
    let saveCh = [
      ...dataObj.saveData.ch,
    ];
    if (typeof dataObj.slotIdx === "number") { //??????????????? ?????? ?????? ????????? ??????
      const itemEff = util.getItemEff(dataObj.slotIdx, saveCh, gameItem);
      saveCh[dataObj.slotIdx] = util.saveLvState(dataObj.slotIdx, {
        itemEff: itemEff,
        grade: gameData.ch[saveCh[dataObj.slotIdx].idx].grade,
        newState: {},
      }, saveData, gameData)
    } else if (dataObj.slotIdx === "all") { //??????????????? ????????? ?????? ?????? ??????
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
    //eff type(?????? dmg_type&buff_type) ??????HP(0), ??????SP(1), ????????????RSP(2), ???ATK(3), ???DEF(4), ??????MAK(5), ??????MDF(6), ??????RCV(7), ??????SPD(8), ?????????(10),?????????(11),??????(12),??????(13),?????????(14), ???(20),???(21),???(22),???(23),???(24),???(25), ??????(100)
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
        item.hole.forEach((holeNum)=>{//stone ??????
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
    const ConvertlineupStIdx = save.lineup.save_slot.map((data, idx) => { // ????????? lineup eff??????
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
          });//????????? ?????? ??????
          lineNum.push(line);
          peopleLength[idx] ++;
        } else {
          lineNum.push('');
        }
      });
      return lineNum;
    });
    //lineupSt ??????
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
    changeSaveData(save);//????????? ?????? ????????? ??????
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
  getPercentColor: (max, num) => { //????????? ???????????? ????????????
    const co = num/max*765;
    if(co < 255){
      return 'rgb('+co+',0,0)';
    } else if (co < 510) {
      return 'rgb(255,'+co%255+',0)';
    }else{
      return 'rgb(255,255,'+co%510+')';
    }
  },
  getPercent: (total, current) => { //????????? ??????
    if(current === 0){
      return 0;
    }else{
        return Math.round(current/total*100);
    }
  },
  getEffectType: (num) => {
    //eff type(?????? dmg_type&buff_type) ?????????(0),?????????(1),??????(2),??????(3),?????????(4),???(11),???(12),???(13),???(14),???(15),???(16),???(17), ???(21),???(22),??????(23),??????(24),HP(25),SP(26),RSP(27),??????(28),??????(29),??????(100)
    let arr = ['??????(HP)','?????????(SP)','???????????????(RSP)','?????????ATK','?????????(DEF)','???????????????(MAK)','???????????????(MDF)','?????????(RCV)','??????(SPD)','??????(LUK)','?????????','?????????','??????','??????','?????????','','','','','','',
    '???','???','???','???','???','???','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','??????'];

    //eff type(?????? dmg_type&buff_type) ??????HP(0), ??????SP(1), ????????????RSP(2), ???ATK(3), ???DEF(4), ??????MAK(5), ??????MDF(6), ??????RCV(7), ??????SPD(8), ?????????(10),?????????(11),??????(12),??????(13),?????????(14), ???(20),???(21),???(22),???(23),???(24),???(25), ??????(100)
  
    arr[100] = '??????';
    return arr[num];
  },
  getEnemySkill: (data, gameData) => {
    const chData = gameData.ch[data.idx],
      animalSkill = gameData.animal_type[chData.animal_type].skill,
      jobSkill = gameData.job[chData.job].skill,
      skillArr = [2, ...animalSkill, ...jobSkill];
    const skillNums = [3,6,9,12,15],
      skillLength = skillNums[Math.floor(data.lv / 10) - 1];
    let skill = [{idx:1,lv:1,},{idx:2,lv:1,}]; //??????, ?????? ?????? ??????
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
          skillElement.innerHTML = `<div class="skillName newName1">${skill.na || '?????????'} ??????</div><div class="skillName newName2">${skill.na || '?????????'} ??????</div>`;
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
          skillElement.innerHTML = `<div class="skillName oldName">LV.${hasSkill.lv} ${skill.na || '?????????'}<div class="skillExp"><em class="gradient_dark" style="width:${hasSkill.exp}%"></em></div></div>`;
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
  getEffectArea: (type, n) => {//type: ????????????, n: ????????????(0~24)
    let num = [];
    switch(type){
      case 1: //??????
        num = [n];
        break;
      case 2: //??????2
        if(n%5 === 4){
          num = [n,n-1];
        }else{
          num = [n,n+1];
        }
        break;
      case 3://??????3
        if(n%5 === 3){
          num = [n,n+1,n-1];
        }else if(n%5 === 4){
          num = [n,n-1,n-2];
        }else{
          num = [n,n+1,n+2];
        }
        break;
      case 4: //??????2
        if(n > 19){
          num = [n,n-5];
        }else{
          num = [n,n+5];
        }
        break;
      case 5://??????3
        if(n > 19){
          num = [n,n-5,n-10];
        }else if(n > 14){
          num = [n,n+5,n-5];
        }else{
          num = [n,n+5,n+10];
        }
        break;
      case 6: //?????????
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
      case 7: //?????????
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
      case 8: //??????5
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
      case 9: //??????9
        num = [12,2,7,10,11,13,14,17,22];
        break;
      case 10: //?????????
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
      case 11: //?????? ?????????
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
      case 15: //??????
        num = [0,5,10,11,12,13,14,19,24];
        break;
      case 16: //??????
        num = [4,9,14,13,12,11,10,15,20];
        break;
      case 17: //???
        num = [0,1,2,4,7,9,11,12,13,14,15,17,20,22,23,24];
        break;
      case 20: //??????
        num = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
        break;
      case 21: //????????????9
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
      case 22: //????????????4
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
      case 23: //??????
          num = [n];
      default:
        break;
    }
    return num;
  },
  setItemColor: (svgData, colorSet) => {
    let svg = svgData;
    const idPattern = new RegExp("==id==","g");
    svg = svg.replace(idPattern, Math.random().toString(36).substring(2, 11));
    colorSet.forEach((data, idx) => {
      const pattern = new RegExp("=="+idx+"==","g");
      svg = svg.replace(pattern, data);
    })
    return svg;
  },
}